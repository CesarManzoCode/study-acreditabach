import { useState, useEffect, useMemo, useRef } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Meter, Badge, Figures, Figure, Modal, Stack, Section, Mark } from "../ui/kit.jsx";
import Calculator from "../ui/Calculator.jsx";
import Figura from "../ui/Figura.jsx";
import { RichText, Inline } from "../lib/text.jsx";
import { needsCalculator } from "../lib/calcNeed.js";
import { useKeys, useScrollLock, navigate } from "../lib/hooks.js";
import { areaStyle, areaVisual } from "../lib/areas.js";
import {
  topicsById, gradeCard, learnCard, nextIntervalPreview, introduceTopic, recordQuizAnswer,
  logSessionProgress, computeTodayPlan, areaNumbers, markLessonSeen, pasoConContenido
} from "../lib/engine.js";

/* El examen real presenta tres opciones: A, B y C (guía del sustentante, p. 25). */
const LETTERS = ["A", "B", "C"];

/* Enunciado del reactivo.

   Los formatos de "relación de elementos" y de "jerarquización" traen listas
   debajo de la instrucción. Se parte en la primera línea para que la
   instrucción conserve el tamaño de título y las listas se lean como cuerpo de
   texto, en vez de un bloque enorme en tipografía de display. */
function QuestionStem({ text, figura }) {
  const salto = String(text).indexOf("\n");
  const cuerpo = salto < 0 ? null : String(text).slice(salto + 1);
  return (
    <>
      <h2 className="quiz-q"><Inline>{salto < 0 ? text : String(text).slice(0, salto)}</Inline></h2>
      {figura && <Figura spec={figura} />}
      {cuerpo && <div className="quiz-detail"><Inline>{cuerpo}</Inline></div>}
    </>
  );
}

/* La burbuja de la hoja de lector óptico. Es el gesto que el sustentante hace
   el día del examen —rellenar un círculo con lápiz— y aquí se usa igual: la
   opción elegida se rellena. */
function Bubble({ letter }) {
  return <span className="bubble" aria-hidden="true">{letter}</span>;
}

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
          <Meter value={pct} height={3} label="Avance de la sesión" />
        </div>
        <button className="btn btn-ghost btn-icon" onClick={tryExit} aria-label="Salir de la sesión">
          <Icon name="x" size={19} />
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
  const [stats, setStats] = useState({ cardsReviewed: 0, cardsLearned: 0, lessons: 0, newTopics: 0, quizAnswered: 0, quizCorrect: 0 });
  const steps = session.steps;
  const step = steps[Math.min(idx, steps.length - 1)];

  const advance = () => setIdx((i) => Math.min(i + 1, steps.length - 1));

  /* Última red contra la pantalla en blanco: si un paso se quedó sin contenido
     —el temario cambió debajo del identificador guardado— se salta solo en vez
     de dejar la sesión atorada en un paso que no pinta nada. El resumen es
     siempre el último paso, así que el salto siempre termina en algún lado. */
  useEffect(() => {
    if (!pasoConContenido(step)) advance();
  }, [idx, step]);

  const bump = (patch) => setStats((s) => {
    const next = { ...s };
    Object.keys(patch).forEach((k) => { next[k] = (next[k] || 0) + patch[k]; });
    return next;
  });

  const isSummary = step.type === "summary";
  const vacio = !pasoConContenido(step);

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
        {vacio && <SkippedStep onNext={advance} />}
        {!vacio && step.type === "review" && (
          <ReviewStep
            step={step}
            onGraded={() => { bump({ cardsReviewed: 1 }); advance(); }}
          />
        )}
        {!vacio && step.type === "learn" && (
          <LearnStep
            step={step}
            onLearned={() => { bump({ cardsLearned: 1 }); advance(); }}
          />
        )}
        {!vacio && step.type === "lesson" && (
          <LessonStep step={step} onNext={() => { bump({ lessons: 1 }); advance(); }} />
        )}
        {!vacio && step.type === "intro" && (
          <IntroStep topic={step.topic} onNext={() => { bump({ newTopics: 1 }); advance(); }} />
        )}
        {!vacio && step.type === "quiz" && (
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
        {!vacio && isSummary && <SummaryStep stats={stats} kind={session.kind} onExit={onExit} onAgain={onAgain} />}
      </div>
    </RunnerShell>
  );
}

/* --- Paso sin contenido ---

   No debería verse nunca: el efecto de arriba lo salta en cuanto se pinta. Está
   por si el salto no puede darse (por ejemplo, si fuera el último paso), para
   que quede un botón en pantalla en vez de un hueco en blanco. */

function SkippedStep({ onNext }) {
  useKeys({ Enter: onNext, " ": onNext }, []);
  return (
    <Stack>
      <div className="lesson">
        <h2 className="lesson-title" style={{ marginTop: 0 }}>Este paso ya no está en el temario</h2>
        <p className="muted" style={{ margin: 0 }}>
          La tarjeta que tocaba aquí se quitó al ajustar el contenido. Tu progreso no se perdió:
          sigue con lo que falta de la sesión.
        </p>
      </div>
      <Button variant="primary" size="lg" block iconRight="arrowRight" onClick={onNext}>
        Continuar
      </Button>
    </Stack>
  );
}

/* --- Paso: lección de un bloque de ampliación ---

   La nota del tema explica el bloque base y nada más. Cuando un paquete de
   ampliación agrega conceptos que esa nota no menciona —el costo de oportunidad
   en un tema sobre necesidades, el coeficiente de Gini en uno sobre reparto de
   la riqueza—, trae su propia lección y se lee aquí. Hasta que este paso pasa,
   ni las tarjetas ni los reactivos de ese bloque entran a la sesión. */

const TITULO_BLOQUE = {
  ampliacion: "Ampliación del tema",
  ampliacion2: "Más sobre este tema"
};

function LessonStep({ step, onNext }) {
  const { topic } = step;
  const v = areaVisual(topic.area);
  const listo = () => { markLessonSeen(topic.id, step.bloque); onNext(); };
  useKeys({ Enter: listo, " ": listo }, [topic.id, step.bloque]);

  return (
    <Stack>
      <div className="lesson" style={areaStyle(topic.area)}>
        <div className="badge-row">
          <Badge tone="area"><Mark />{v.short}</Badge>
          <Badge tone="accent">{TITULO_BLOQUE[step.bloque] || "Ampliación del tema"}</Badge>
        </div>
        <h2 className="lesson-title">{topic.tema}</h2>
        <p className="lesson-sub">{topic.subarea}</p>
        <div className="lesson-note">
          <RichText>{step.leccion}</RichText>
        </div>
        <p className="flash-hint">
          Esto es lo que se te va a preguntar de aquí en adelante
          <span className="kbd-only"> · <span className="kbd">espacio</span></span>
        </p>
      </div>
      <Button variant="primary" size="lg" block iconRight="arrowRight" onClick={listo}>
        Ya entendí
      </Button>
    </Stack>
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
      <div className="flash" style={areaStyle(topic.area)}>
        <div className="flash-tag">
          <Badge tone="area"><Mark />{v.short}</Badge>
          <Badge tone="accent">material nuevo</Badge>
        </div>

        <div className="flash-front"><Inline>{fc.front}</Inline></div>
        <div className="flash-rule" />
        <div className="flash-back"><Inline>{fc.back}</Inline></div>

        <p className="flash-hint">
          Solo léela. Mañana te toca recordarla
          <span className="kbd-only"> · <span className="kbd">espacio</span></span>
        </p>
      </div>

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
      <div className="flash" style={areaStyle(topic.area)}>
        <div className="flash-tag">
          <Badge tone="area"><Mark />{v.short}</Badge>
          {step.isNew && <Badge tone="success">nuevo</Badge>}
        </div>

        <div className="flash-front"><Inline>{fc.front}</Inline></div>

        {revealed && (
          <>
            <div className="flash-rule" />
            <div className="flash-back"><Inline>{fc.back}</Inline></div>
          </>
        )}

        {!revealed && (
          <p className="flash-hint">
            Intenta responder de memoria antes de ver la respuesta
            <span className="kbd-only"> · <span className="kbd">espacio</span></span>
          </p>
        )}
      </div>

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
          <p className="faint kbd-only" style={{ textAlign: "center", margin: 0 }}>
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
      <div className="lesson" style={areaStyle(topic.area)}>
        <div className="badge-row">
          <Badge tone="area">
            <Mark />
            {v.short}{topic.lang ? ` · ${topic.lang === "en" ? "Inglés" : "Español"}` : ""}
          </Badge>
          <Badge tone="accent">tema nuevo</Badge>
        </div>
        <h2 className="lesson-title">{topic.tema}</h2>
        <p className="lesson-sub">{topic.subarea}</p>
        <div className="lesson-note">
          <RichText>{topic.note}</RichText>
          {topic.figura && <Figura spec={topic.figura} />}
        </div>
      </div>
      <Button variant="primary" size="lg" block iconRight="arrowRight" onClick={onNext}>
        Ya entendí, a practicar
      </Button>
    </Stack>
  );
}

/* --- Paso: reactivo con retroalimentación --- */

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
      <div className="quiz" style={areaStyle(topic.area)}>
        <div className="quiz-head">
          <Badge tone="area"><Mark />{v.short}</Badge>
          <span className="faint">{topic.tema}</span>
        </div>

        <QuestionStem text={question.q} figura={question.figura} />

        {withCalc && !calcOpen && (
          <button className="calc-open" onClick={() => setCalcOpen(true)}>
            <Icon name="calc" size={16} />
            Abrir calculadora
            <span className="kbd kbd-only">C</span>
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
                <Bubble letter={LETTERS[i]} />
                <span className="option-text"><Inline>{opt}</Inline></span>
                {chosen !== null && i === question.correct && (
                  <Icon name="check" size={17} className="option-flag" />
                )}
                {chosen === i && i !== question.correct && (
                  <Icon name="x" size={17} className="option-flag" />
                )}
              </button>
            );
          })}
        </div>

        {chosen === null && (
          <p className="faint kbd-only" style={{ textAlign: "center", marginTop: 14, marginBottom: 0 }}>
            <span className="kbd">1</span> <span className="kbd">2</span> <span className="kbd">3</span> para responder
          </p>
        )}

        {chosen !== null && (
          <div className={`feedback ${correct ? "is-ok" : "is-bad"}`}>
            <div className="feedback-head">
              <Icon name={correct ? "check" : "x"} size={17} strokeWidth={2.2} />
              {correct ? "Correcto" : `Era la ${LETTERS[question.correct]}`}
            </div>
            <RichText>{question.explanation}</RichText>
          </div>
        )}
      </div>

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
    if (stats.cardsReviewed || stats.cardsLearned || stats.lessons || stats.newTopics || stats.quizAnswered) logSessionProgress(stats);
  }, [stats]);

  const plan = useMemo(() => computeTodayPlan(), []);
  const accuracy = stats.quizAnswered ? Math.round((stats.quizCorrect / stats.quizAnswered) * 100) : null;
  useKeys({ Enter: onExit }, []);

  return (
    <Stack gap={26}>
      <div className="summary">
        <div className="summary-mark is-ok"><Icon name="check" size={26} strokeWidth={2.4} /></div>
        <h2 className="summary-title">
          {kind === "practice" ? "Práctica terminada" : "Sesión completada"}
        </h2>
        <p>
          {kind === "practice"
            ? "Cada intento refuerza el recuerdo, aunque falles."
            : `Faltan ${Math.max(0, plan.daysToExam)} días para el examen. Nos vemos mañana.`}
        </p>
      </div>

      <Figures>
        <Figure value={stats.cardsReviewed} label="tarjetas repasadas" />
        <Figure value={stats.cardsLearned} label="tarjetas aprendidas" />
        <Figure value={stats.newTopics} label="temas nuevos" />
        <Figure
          value={accuracy == null ? "—" : accuracy + "%"}
          label="aciertos"
          tone={accuracy != null && accuracy >= 70 ? "success" : undefined}
        />
      </Figures>

      {onAgain ? (
        <div className="row-gap">
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

/* ============================================================
   Cronómetro del simulacro

   El examen real son 4 h 30 min la sesión uno y 4 h la dos, con receso de hora
   y media entre ambas (guía, p. 21). Ocho horas y media en un día son tanto un
   problema de resistencia y de reparto del tiempo como de conocimiento, y sin
   reloj el simulacro no entrenaba ninguno de los dos.

   No interrumpe ni bloquea al llegar a cero: en el examen tampoco se responde
   mejor por un aviso. Solo cambia de color en los últimos treinta minutos y
   deja de contar en negativo para que se vea cuánto se pasó uno.
   ============================================================ */

function ExamTimer({ minutes, total, answered }) {
  const [left, setLeft] = useState(minutes * 60);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, []);

  const over = left < 0;
  const abs = Math.abs(left);
  const hh = Math.floor(abs / 3600);
  const mm = String(Math.floor((abs % 3600) / 60)).padStart(2, "0");
  const ss = String(abs % 60).padStart(2, "0");
  const reloj = (over ? "+" : "") + (hh ? hh + ":" : "") + mm + ":" + ss;

  /* Ritmo: cuántos reactivos deberías llevar a estas alturas. */
  const usados = minutes * 60 - left;
  const esperados = Math.min(total, Math.floor((usados / (minutes * 60)) * total));
  const atrasado = answered < esperados - 2;

  const tono = over || left < 1800 ? "danger" : atrasado ? "warn" : "";

  return (
    <div className={"exam-timer " + tono} aria-live="off">
      <Icon name="clock" size={15} />
      <strong>{reloj}</strong>
      <span className="exam-timer-pace">
        {over
          ? "tiempo cumplido"
          : atrasado
            ? `vas ${esperados - answered} reactivos atrás del ritmo`
            : `ritmo al día`}
      </span>
    </div>
  );
}

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
  /* Los reactivos piloto se contestan igual que los demás —en el examen real
     no se distinguen— pero no cuentan para el resultado. */

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
      {mock.minutes > 0 && (
        <ExamTimer minutes={mock.minutes} total={questions.length} answered={answers.length} />
      )}
      <div className="step-anim" key={idx}>
        <div className="quiz" style={areaStyle(topic.area)}>
          <div className="quiz-head">
            <Badge tone="area"><Mark />{v.short}</Badge>
            <span className="faint">reactivo {idx + 1} de {questions.length}</span>
          </div>
          <QuestionStem text={question.q} figura={question.figura} />
          {withCalc && !calcOpen && (
            <button className="calc-open" onClick={() => setCalcOpen(true)}>
              <Icon name="calc" size={16} />
              Abrir calculadora
              <span className="kbd kbd-only">C</span>
            </button>
          )}
          <div className="options">
            {question.options.map((opt, i) => (
              <button key={i} className="option" onClick={() => answer(i)}>
                <Bubble letter={LETTERS[i]} />
                <span className="option-text"><Inline>{opt}</Inline></span>
              </button>
            ))}
          </div>
          <p className="faint" style={{ textAlign: "center", marginTop: 14, marginBottom: 0 }}>
            Como en el examen real: las respuestas se revisan al final
          </p>
        </div>
        <Calculator open={calcOpen} onClose={() => setCalcOpen(false)} />
      </div>
    </RunnerShell>
  );
}

function MockResults({ mock, answers, onExit }) {
  const [review, setReview] = useState(false);
  /* El resultado se calcula SOLO con los reactivos calificados, igual que el
     examen: el bloque piloto se contesta pero no puntúa. */
  const contados = answers.filter((a) => !a.piloto);
  const pilotos = answers.length - contados.length;
  const total = contados.length;
  const correct = contados.filter((a) => a.correct).length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const missed = answers.filter((a) => !a.correct);

  const byArea = useMemo(() => {
    const map = {};
    contados.forEach((a) => {
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
          <Meter value={100} height={3} label="Simulacro terminado" />
        </div>
        <button className="btn btn-ghost btn-icon" onClick={onExit} aria-label="Cerrar resultados">
          <Icon name="x" size={19} />
        </button>
      </header>

      <div className="runner-body">
        <div className="runner-inner">
          <Stack gap={30}>
            <div className="summary">
              <div className={`summary-mark${pct >= 60 ? " is-ok" : ""}`}>
                <Icon name={pct >= 60 ? "check" : "target"} size={26} strokeWidth={2.2} />
              </div>
              <div className="result-score tnum">{pct}%</div>
              <p>
                {correct} de {total} correctas
                {pilotos > 0 && ` · ${pilotos} reactivos piloto contestados que no puntúan`}
              </p>
            </div>

            <Section title="Desempeño por área">
              {areaNumbers().filter((a) => byArea[a]).map((a) => {
                const st = byArea[a];
                const p = Math.round((st.correct / st.total) * 100);
                const v = areaVisual(a);
                return (
                  <div key={a} style={areaStyle(a)} className="meter-block">
                    <div className="meter-row">
                      <span className="meter-label">
                        <Mark />
                        {v.short}
                        {p < 56 && <Badge tone="danger">reforzar</Badge>}
                      </span>
                      <span className="meter-value tnum">{st.correct}/{st.total} · {p}%</span>
                    </div>
                    <Meter value={p} color={v.color} label={`Aciertos en ${v.short}`} />
                  </div>
                );
              })}
              <p className="faint" style={{ marginTop: 14 }}>
                Este porcentaje es una referencia de estudio: <strong>no es</strong> el Índice Ceneval ni se convierte a él.
                El Ceneval califica cada área de 700 a 1300 puntos y pide 1000 para acreditarla, con una escala que no se hace
                pública. Un 70 % aquí no equivale a 1000 puntos allá.
              </p>
            </Section>

            {missed.length > 0 && (
              <Section
                title="Reactivos fallados"
                action={
                  <Button
                    variant="ghost"
                    size="sm"
                    iconRight={review ? "chevronDown" : "chevronRight"}
                    onClick={() => setReview(!review)}
                  >
                    {review ? "Ocultar" : `Revisar ${missed.length}`}
                  </Button>
                }
              >
                {review && (
                  <div>
                    {missed.map((a, i) => (
                      <div key={i} className="missed-item" style={areaStyle(a.topic.area)}>
                        <p className="faint" style={{ margin: 0 }}>{a.topic.tema}</p>
                        <p className="missed-q"><Inline>{a.question.q}</Inline></p>
                        {a.question.figura && <Figura spec={a.question.figura} />}
                        <p className="missed-answer">
                          <b>Correcta {LETTERS[a.question.correct]}</b>{" · "}
                          <Inline>{a.question.options[a.question.correct]}</Inline>
                        </p>
                        <RichText>{a.question.explanation}</RichText>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
            )}

            <div className="row-gap">
              <Button variant="primary" icon="check" onClick={onExit}>Terminar</Button>
              <Button variant="solid" icon="repasar" onClick={() => { onExit(); navigate("repasar"); }}>
                Ir al temario
              </Button>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}
