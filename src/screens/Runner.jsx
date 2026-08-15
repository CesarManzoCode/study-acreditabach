import { useState, useEffect, useMemo, useRef } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Card, Bar, Badge, Ring, Stat, Modal, Stack } from "../ui/kit.jsx";
import Calculator from "../ui/Calculator.jsx";
import { RichText, Inline } from "../lib/text.jsx";
import { needsCalculator } from "../lib/calcNeed.js";
import { useKeys, useScrollLock, navigate } from "../lib/hooks.js";
import { areaStyle, areaVisual } from "../lib/areas.js";
import {
  topicsById, gradeCard, learnCard, nextIntervalPreview, introduceTopic, recordQuizAnswer,
  logSessionProgress, computeTodayPlan, areaNumbers
} from "../lib/engine.js";

const LETTERS = ["A", "B", "C", "D"];

/* ============================================================
   Contenedor común
   ============================================================ */

function RunnerShell({ title, step, total, onExit, children, footer, exitConfirm }) {
  const [confirming, setConfirming] = useState(false);
  useScrollLock(true);

  const tryExit = () => (exitConfirm ? setConfirming(true) : onExit());
  useKeys({ Escape: tryExit }, [exitConfirm]);

  const pct = total ? Math.round((step / total) * 100) : 0;

  return (
    <div className="runner">
      <header className="runner-head">
        <div className="runner-progress">
          <div className="runner-step">
            <span>{title}</span>
            <span className="tnum">{Math.min(step + 1, total)} / {total}</span>
          </div>
          <Bar value={pct} height={5} />
        </div>
        <button className="btn btn-ghost btn-icon" onClick={tryExit} aria-label="Salir de la sesión">
          <Icon name="x" size={20} />
        </button>
      </header>

      <div className="runner-body">
        <div className="runner-inner">{children}</div>
      </div>

      {footer && (
        <footer className="runner-foot">
          <div className="runner-foot-inner">{footer}</div>
        </footer>
      )}

      <Modal
        open={confirming}
        title="¿Salir de la sesión?"
        description="Lo que ya calificaste se guardó. Lo que falta seguirá pendiente para hoy."
        onClose={() => setConfirming(false)}
        actions={
          <>
            <Button variant="ghost" onClick={() => setConfirming(false)}>Seguir estudiando</Button>
            <Button variant="danger" onClick={onExit}>Salir</Button>
          </>
        }
      />
    </div>
  );
}

/* ============================================================
   Sesión guiada (repaso + temas nuevos + práctica)
   ============================================================ */

export function SessionRunner({ session, onExit, onAgain }) {
  const [idx, setIdx] = useState(0);
  const [stats, setStats] = useState({ cardsReviewed: 0, cardsLearned: 0, newTopics: 0, quizAnswered: 0, quizCorrect: 0 });
  const steps = session.steps;
  const step = steps[Math.min(idx, steps.length - 1)];

  const advance = () => setIdx((i) => Math.min(i + 1, steps.length - 1));
  const bump = (patch) => setStats((s) => {
    const next = { ...s };
    Object.keys(patch).forEach((k) => { next[k] = (next[k] || 0) + patch[k]; });
    return next;
  });

  const isSummary = step.type === "summary";

  return (
    <RunnerShell
      title={session.title}
      step={idx}
      total={steps.length}
      onExit={onExit}
      exitConfirm={!isSummary && idx > 0}
      footer={null}
    >
      <div className="step-anim" key={idx}>
        {step.type === "review" && (
          <ReviewStep
            step={step}
            onGraded={() => { bump({ cardsReviewed: 1 }); advance(); }}
          />
        )}
        {step.type === "learn" && (
          <LearnStep
            step={step}
            onLearned={() => { bump({ cardsLearned: 1 }); advance(); }}
          />
        )}
        {step.type === "intro" && (
          <IntroStep topic={step.topic} onNext={() => { bump({ newTopics: 1 }); advance(); }} />
        )}
        {step.type === "quiz" && (
          <QuizStep
            topic={step.topic}
            question={step.question}
            onAnswered={(correct) => {
              recordQuizAnswer(step.topic.id, correct);
              bump({ quizAnswered: 1, quizCorrect: correct ? 1 : 0 });
            }}
            onNext={advance}
          />
        )}
        {isSummary && <SummaryStep stats={stats} kind={session.kind} onExit={onExit} onAgain={onAgain} />}
      </div>
    </RunnerShell>
  );
}

/* --- Paso: tarjeta nueva (se enseña, no se califica) ---

   Una tarjeta que nunca se ha mostrado no se puede "recordar". Aquí aparece con
   la respuesta a la vista y un solo botón: se lee y pasa al repaso espaciado a
   partir del día siguiente. Antes estas tarjetas entraban directo como repaso,
   con el texto "intenta responder de memoria", y por eso la sesión preguntaba
   cosas que la app nunca había explicado. */

function LearnStep({ step, onLearned }) {
  const topic = topicsById()[step.topicId];
  const fcIndex = Number(step.cardId.split("::fc")[1]);
  const fc = topic?.flashcards?.[fcIndex];

  const listo = () => { learnCard(step.cardId); onLearned(); };
  useKeys({ " ": listo, Enter: listo }, [step.cardId]);

  if (!fc) return null;
  const v = areaVisual(topic.area);

  return (
    <Stack>
      <Card className="flash is-learning" style={areaStyle(topic.area)}>
        <div className="flash-tag">
          <Badge tone="area">{v.short}</Badge>
          <Badge tone="brand" icon="sparkles">material nuevo</Badge>
        </div>

        <div className="flash-front"><Inline>{fc.front}</Inline></div>
        <div className="flash-divider" />
        <div className="flash-back"><Inline>{fc.back}</Inline></div>

        <p className="flash-hint">
          Solo léela. Mañana te toca recordarla · <span className="kbd">espacio</span>
        </p>
      </Card>

      <Button variant="primary" size="lg" block iconRight="arrowRight" onClick={listo}>
        Entendido
      </Button>
    </Stack>
  );
}

/* --- Paso: tarjeta de repaso --- */

function ReviewStep({ step, onGraded }) {
  const [revealed, setRevealed] = useState(false);
  const topic = topicsById()[step.topicId];
  const fcIndex = Number(step.cardId.split("::fc")[1]);
  const fc = topic?.flashcards?.[fcIndex];

  useEffect(() => { setRevealed(false); }, [step.cardId]);

  const grade = (q) => { gradeCard(step.cardId, q); onGraded(); };

  useKeys(
    revealed
      ? { 1: () => grade(0), 2: () => grade(1), 3: () => grade(2) }
      : { " ": () => setRevealed(true), Enter: () => setRevealed(true) },
    [revealed, step.cardId]
  );

  if (!fc) return null;
  const v = areaVisual(topic.area);

  return (
    <Stack>
      <Card className="flash" style={areaStyle(topic.area)}>
        <div className="flash-tag">
          <Badge tone="area">{v.short}</Badge>
          {step.isNew && <Badge tone="success" icon="sparkles">nuevo</Badge>}
        </div>

        <div className="flash-front"><Inline>{fc.front}</Inline></div>

        {revealed && (
          <>
            <div className="flash-divider" />
            <div className="flash-back"><Inline>{fc.back}</Inline></div>
          </>
        )}

        {!revealed && (
          <p className="flash-hint">
            Intenta responder de memoria antes de ver la respuesta · <span className="kbd">espacio</span>
          </p>
        )}
      </Card>

      {!revealed ? (
        <Button variant="primary" size="lg" block onClick={() => setRevealed(true)}>
          Mostrar respuesta
        </Button>
      ) : (
        <>
          <div className="grade-row">
            <button className="grade grade-0" onClick={() => grade(0)}>
              Otra vez
              <small>{nextIntervalPreview(step.cardId, 0)}</small>
            </button>
            <button className="grade grade-1" onClick={() => grade(1)}>
              Costó
              <small>{nextIntervalPreview(step.cardId, 1)}</small>
            </button>
            <button className="grade grade-2" onClick={() => grade(2)}>
              Bien
              <small>{nextIntervalPreview(step.cardId, 2)}</small>
            </button>
          </div>
          <p className="faint" style={{ textAlign: "center", margin: 0 }}>
            <span className="kbd">1</span> <span className="kbd">2</span> <span className="kbd">3</span> para calificar
          </p>
        </>
      )}
    </Stack>
  );
}

/* --- Paso: tema nuevo --- */

function IntroStep({ topic, onNext }) {
  const v = areaVisual(topic.area);
  useEffect(() => { introduceTopic(topic.id); }, [topic.id]);
  useKeys({ Enter: onNext, " ": onNext }, [topic.id]);

  return (
    <Stack>
      <Card className="intro-card" style={areaStyle(topic.area)}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Badge tone="area">{v.short}{topic.lang ? ` · ${topic.lang === "en" ? "Inglés" : "Español"}` : ""}</Badge>
          <Badge tone="brand" icon="sparkles">tema nuevo</Badge>
        </div>
        <h2 className="intro-title">{topic.tema}</h2>
        <p className="intro-sub">{topic.subarea}</p>
        <div className="intro-note">
          <RichText>{topic.note}</RichText>
        </div>
      </Card>
      <Button variant="primary" size="lg" block iconRight="arrowRight" onClick={onNext}>
        Ya entendí, a practicar
      </Button>
    </Stack>
  );
}

/* --- Paso: pregunta con retroalimentación --- */

function QuizStep({ topic, question, onAnswered, onNext }) {
  const [chosen, setChosen] = useState(null);
  const [calcOpen, setCalcOpen] = useState(false);
  const answeredRef = useRef(false);
  const v = areaVisual(topic.area);
  const correct = chosen === question.correct;
  const withCalc = needsCalculator(topic, question);

  useEffect(() => { setChosen(null); answeredRef.current = false; }, [question]);

  const choose = (i) => {
    if (answeredRef.current) return;
    answeredRef.current = true;
    setChosen(i);
    onAnswered(i === question.correct);
  };

  /* Con la calculadora abierta, el teclado escribe números en vez de
     contestar: los atajos 1/2/3 se apagan mientras tanto. */
  useKeys(
    calcOpen
      ? {}
      : chosen === null
        ? { 1: () => choose(0), 2: () => choose(1), 3: () => choose(2), c: () => withCalc && setCalcOpen(true) }
        : { Enter: onNext, " ": onNext },
    [chosen, question, calcOpen, withCalc]
  );

  return (
    <Stack>
      <Card style={areaStyle(topic.area)}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Badge tone="area">{v.short}</Badge>
          <span className="faint">{topic.tema}</span>
        </div>

        <h2 className="quiz-q"><Inline>{question.q}</Inline></h2>

        {withCalc && !calcOpen && (
          <button className="calc-open" onClick={() => setCalcOpen(true)}>
            <Icon name="calc" size={17} />
            Abrir calculadora
            <span className="kbd">C</span>
          </button>
        )}

        <div className="options">
          {question.options.map((opt, i) => {
            let cls = "option";
            if (chosen !== null) {
              if (i === question.correct) cls += " is-correct";
              else if (i === chosen) cls += " is-wrong";
              else cls += " is-dim";
            }
            return (
              <button key={i} className={cls} onClick={() => choose(i)} disabled={chosen !== null}>
                <span className="option-letter">{LETTERS[i]}</span>
                <span className="option-text"><Inline>{opt}</Inline></span>
                {chosen !== null && i === question.correct && <Icon name="check" size={18} />}
              </button>
            );
          })}
        </div>

        {chosen === null && (
          <p className="faint" style={{ textAlign: "center", marginTop: 14, marginBottom: 0 }}>
            <span className="kbd">1</span> <span className="kbd">2</span> <span className="kbd">3</span> para responder
          </p>
        )}

        {chosen !== null && (
          <div className={`feedback ${correct ? "is-ok" : "is-bad"}`}>
            <div className="feedback-head">
              <Icon name={correct ? "check" : "x"} size={18} strokeWidth={2.2} />
              {correct ? "Correcto" : `Era la ${LETTERS[question.correct]}`}
            </div>
            <RichText>{question.explanation}</RichText>
          </div>
        )}
      </Card>

      {chosen !== null && (
        <Button variant="primary" size="lg" block iconRight="arrowRight" onClick={onNext}>
          Siguiente
        </Button>
      )}

      <Calculator open={calcOpen} onClose={() => setCalcOpen(false)} />
    </Stack>
  );
}

/* --- Paso: resumen --- */

function SummaryStep({ stats, kind, onExit, onAgain }) {
  const loggedRef = useRef(false);
  useEffect(() => {
    if (loggedRef.current) return;
    loggedRef.current = true;
    if (stats.cardsReviewed || stats.cardsLearned || stats.newTopics || stats.quizAnswered) logSessionProgress(stats);
  }, [stats]);

  const plan = useMemo(() => computeTodayPlan(), []);
  const accuracy = stats.quizAnswered ? Math.round((stats.quizCorrect / stats.quizAnswered) * 100) : null;
  useKeys({ Enter: onExit }, []);

  return (
    <Stack>
      <Card className="summary-hero">
        <div className="summary-emoji"><Icon name="check" size={30} strokeWidth={2.4} /></div>
        <h2 className="summary-title">
          {kind === "practice" ? "Práctica terminada" : "Sesión completada"}
        </h2>
        <p className="muted">
          {kind === "practice"
            ? "Cada intento refuerza el recuerdo, aunque falles."
            : `Faltan ${Math.max(0, plan.daysToExam)} días para el examen. Nos vemos mañana.`}
        </p>
      </Card>

      <Card>
        <div className="stats">
          <Stat value={stats.cardsReviewed} label="tarjetas repasadas" />
          <Stat value={stats.cardsLearned} label="tarjetas aprendidas" tone="brand" />
          <Stat value={stats.newTopics} label="temas nuevos" tone="brand" />
          <Stat value={accuracy == null ? "—" : accuracy + "%"} label="aciertos" tone={accuracy != null && accuracy >= 70 ? "success" : undefined} />
        </div>
      </Card>

      {onAgain ? (
        <div className="chips">
          <Button variant="primary" size="lg" icon="infinity" onClick={onAgain}>Otra ronda</Button>
          <Button variant="solid" size="lg" onClick={onExit}>Listo</Button>
        </div>
      ) : (
        <Button variant="primary" size="lg" block onClick={onExit}>Listo</Button>
      )}
    </Stack>
  );
}

/* ============================================================
   Simulacro (formato examen: sin retroalimentación inmediata)
   ============================================================ */

export function MockRunner({ mock, onExit }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [calcOpen, setCalcOpen] = useState(false);
  const questions = mock.questions;
  const done = idx >= questions.length;

  const answer = (i) => {
    const item = questions[idx];
    const isCorrect = i === item.question.correct;
    recordQuizAnswer(item.topic.id, isCorrect);
    setAnswers((a) => [...a, { ...item, chosen: i, correct: isCorrect }]);
    setIdx((n) => n + 1);
  };

  useKeys(
    done || calcOpen ? {} : { 1: () => answer(0), 2: () => answer(1), 3: () => answer(2), c: () => setCalcOpen(true) },
    [idx, done, calcOpen]
  );

  if (done) return <MockResults mock={mock} answers={answers} onExit={onExit} />;

  const { topic, question } = questions[idx];
  const v = areaVisual(topic.area);
  const withCalc = needsCalculator(topic, question);

  return (
    <RunnerShell
      title={mock.title}
      step={idx}
      total={questions.length}
      onExit={onExit}
      exitConfirm={idx > 0}
    >
      <div className="step-anim" key={idx}>
        <Card style={areaStyle(topic.area)}>
          <Badge tone="area">{v.short}</Badge>
          <h2 className="quiz-q"><Inline>{question.q}</Inline></h2>
          {withCalc && !calcOpen && (
            <button className="calc-open" onClick={() => setCalcOpen(true)}>
              <Icon name="calc" size={17} />
              Abrir calculadora
              <span className="kbd">C</span>
            </button>
          )}
          <div className="options">
            {question.options.map((opt, i) => (
              <button key={i} className="option" onClick={() => answer(i)}>
                <span className="option-letter">{LETTERS[i]}</span>
                <span className="option-text"><Inline>{opt}</Inline></span>
              </button>
            ))}
          </div>
          <p className="faint" style={{ textAlign: "center", marginTop: 14, marginBottom: 0 }}>
            Como en el examen real: las respuestas se revisan al final
          </p>
        </Card>
        <Calculator open={calcOpen} onClose={() => setCalcOpen(false)} />
      </div>
    </RunnerShell>
  );
}

function MockResults({ mock, answers, onExit }) {
  const [review, setReview] = useState(false);
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const missed = answers.filter((a) => !a.correct);

  const byArea = useMemo(() => {
    const map = {};
    answers.forEach((a) => {
      const k = a.topic.area;
      map[k] = map[k] || { total: 0, correct: 0 };
      map[k].total++;
      if (a.correct) map[k].correct++;
    });
    return map;
  }, [answers]);

  useScrollLock(true);
  useKeys({ Escape: onExit }, [onExit]);

  return (
    <div className="runner">
      <header className="runner-head">
        <div className="runner-progress">
          <div className="runner-step"><span>{mock.title}</span><span>resultado</span></div>
          <Bar value={100} height={5} />
        </div>
        <button className="btn btn-ghost btn-icon" onClick={onExit} aria-label="Cerrar resultados">
          <Icon name="x" size={20} />
        </button>
      </header>

      <div className="runner-body">
        <div className="runner-inner">
          <Stack>
            <Card className="summary-hero">
              <div className="summary-emoji" style={{ background: pct >= 60 ? "linear-gradient(135deg,var(--success),var(--brand-3))" : undefined }}>
                <Icon name={pct >= 60 ? "check" : "target"} size={30} strokeWidth={2.2} />
              </div>
              <div className="result-score">{pct}%</div>
              <p className="muted" style={{ marginTop: 6 }}>{correct} de {total} correctas</p>
            </Card>

            <Card>
              <h3>Desempeño por área</h3>
              {areaNumbers().filter((a) => byArea[a]).map((a) => {
                const st = byArea[a];
                const p = Math.round((st.correct / st.total) * 100);
                const v = areaVisual(a);
                return (
                  <div key={a} style={{ marginBottom: 14 }}>
                    <div className="bar-row">
                      <span className="lbl">
                        <span className="topic-dot" style={{ "--c": v.color }} />
                        {v.short}
                        {p < 56 && <Badge tone="danger">reforzar</Badge>}
                      </span>
                      <span className="val">{st.correct}/{st.total} · {p}%</span>
                    </div>
                    <Bar value={p} color={v.color} />
                  </div>
                );
              })}
              <p className="faint" style={{ marginTop: 4 }}>
                Este porcentaje es una referencia de estudio, no el Índice Ceneval oficial (700–1300 puntos, mínimo 1000 por área).
              </p>
            </Card>

            {missed.length > 0 && (
              <Card>
                <div className="card-title-row">
                  <h3>Preguntas falladas</h3>
                  <Button variant="ghost" size="sm" iconRight={review ? "chevronDown" : "chevronRight"} onClick={() => setReview(!review)}>
                    {review ? "Ocultar" : `Revisar ${missed.length}`}
                  </Button>
                </div>
                {review && (
                  <div className="stack" style={{ gap: 12 }}>
                    {missed.map((a, i) => (
                      <div key={i} className="intro-note" style={areaStyle(a.topic.area)}>
                        <div className="faint" style={{ marginBottom: 6 }}>{a.topic.tema}</div>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}><Inline>{a.question.q}</Inline></div>
                        <div className="muted" style={{ marginBottom: 6 }}>
                          <strong>Correcta:</strong> {LETTERS[a.question.correct]}) <Inline>{a.question.options[a.question.correct]}</Inline>
                        </div>
                        <RichText>{a.question.explanation}</RichText>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            <div className="chips">
              <Button variant="primary" icon="check" onClick={onExit}>Terminar</Button>
              <Button variant="solid" icon="repasar" onClick={() => { onExit(); navigate("repasar"); }}>
                Ir a repasar
              </Button>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}
