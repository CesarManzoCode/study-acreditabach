import { useMemo } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Card, Ring, Bar, Badge, Stat, Reveal } from "../ui/kit.jsx";
import { navigate, useCountUp } from "../lib/hooks.js";
import {
  STATE, saveState, fmtDateLong, fmtDateShort, daysBetween, todayDate,
  STUDY_START, EXAM_DATE, weakestTopics, upcomingLoad, dismissContentUpdate, dismissPoda
} from "../lib/engine.js";
import { areaStyle } from "../lib/areas.js";

export default function Today({ plan, stats, onStart }) {
  const days = Math.max(0, plan.daysToExam);
  const animatedDays = useCountUp(days);
  const showWelcome = !STATE.dismissedWelcome && stats.introducedCount === 0;

  const timeline = useMemo(() => {
    const total = Math.max(1, daysBetween(STUDY_START, EXAM_DATE));
    const done = Math.min(total, Math.max(0, daysBetween(STUDY_START, todayDate())));
    return Math.round((done / total) * 100);
  }, [plan.today]);

  const nextDue = useMemo(() => upcomingLoad(8).slice(1).find((d) => d.count > 0), [stats, plan]);
  const weak = useMemo(() => weakestTopics(3).filter((w) => w.mastery < 60), [stats]);

  const items = [
    {
      key: "review",
      icon: "cards",
      color: "var(--brand)",
      title: "Repaso espaciado",
      desc: "Tarjetas que hoy están por olvidarse",
      count: plan.reviewCards.length
    },
    {
      key: "lesson",
      icon: "info",
      color: "var(--brand-3, var(--brand))",
      title: "Lecciones de ampliación",
      desc: plan.blockLessons.length
        ? plan.blockLessons.map((b) => b.topic.tema).slice(0, 2).join(" · ") + (plan.blockLessons.length > 2 ? " …" : "")
        : "Explicación del material que aún no se te ha enseñado",
      count: plan.blockLessons.length
    },
    {
      key: "learn",
      icon: "cards",
      color: "var(--brand-2, var(--brand))",
      title: "Material nuevo",
      desc: plan.learnPending > plan.learnCards.length
        ? `Se enseña con la respuesta a la vista · quedan ${plan.learnPending - plan.learnCards.length} para después`
        : "Tarjetas que se enseñan con la respuesta a la vista",
      count: plan.learnCards.length
    },
    {
      key: "new",
      icon: "sparkles",
      color: "var(--success)",
      title: "Temas nuevos",
      desc: plan.newTopics.length ? plan.newTopics.map((t) => t.tema).slice(0, 2).join(" · ") + (plan.newTopics.length > 2 ? " …" : "") : "Nada nuevo por hoy",
      count: plan.newTopics.length
    },
    {
      key: "quiz",
      icon: "target",
      color: "var(--warn)",
      title: "Práctica tipo examen",
      desc: "Preguntas de opción múltiple con explicación",
      count: plan.quizQuestions.length
    }
  ];

  return (
    <div className="stack">
      <Reveal>
        <section className="card hero">
          <div className="hero-top">
            <span className="hero-eyebrow"><Icon name="target" size={14} strokeWidth={2} /> Cuenta regresiva</span>
            {stats.streak > 0 && (
              <span className="hero-note" style={{ margin: 0 }}>
                <Icon name="flame" size={15} strokeWidth={2} />
                {stats.streak} {stats.streak === 1 ? "día" : "días"} de racha
              </span>
            )}
          </div>

          <div className="hero-count">
            <span className="hero-num">{animatedDays}</span>
            <span className="hero-unit">{days === 1 ? "día para el examen" : "días para el examen"}</span>
          </div>
          <div className="hero-date">{fmtDateLong(EXAM_DATE)} · dos sesiones, 180 reactivos</div>

          <PhaseNote plan={plan} />

          <div className="hero-track">
            <Bar value={timeline} height={6} />
            <div className="hero-track-labels">
              <span>{fmtDateShort(STUDY_START)}</span>
              <span>{timeline}% del calendario recorrido</span>
              <span>{fmtDateShort(EXAM_DATE)}</span>
            </div>
          </div>
        </section>
      </Reveal>

      {showWelcome && (
        <Reveal delay={60}>
          <Welcome />
        </Reveal>
      )}

      {STATE.contentUpdate && (
        <Reveal delay={60}>
          <ContentUpdateNote update={STATE.contentUpdate} />
        </Reveal>
      )}

      {STATE.poda && (
        <Reveal delay={60}>
          <PodaNote poda={STATE.poda} />
        </Reveal>
      )}

      {plan.areaEnRiesgo && (
        <Reveal delay={70}>
          <AvisoAreaEnRiesgo area={plan.areaEnRiesgo} />
        </Reveal>
      )}

      <Reveal delay={showWelcome ? 120 : 60}>
        <Card className="plan-card">
          <div className="plan-head">
            <div>
              <h3>Tu sesión de hoy</h3>
              <p className="faint" style={{ margin: "2px 0 0" }}>
                {plan.totalSteps > 0
                  ? <>≈ {Math.max(5, plan.estMinutes)} min · {plan.totalSteps} pasos</>
                  : "Sin pendientes por ahora"}
              </p>
            </div>
            <Ring
              value={plan.totalSteps ? 0 : 100}
              size={54}
              stroke={6}
              label={plan.totalSteps ? String(plan.totalSteps) : "✓"}
              sublabel={plan.totalSteps ? "pasos" : "libre"}
            />
          </div>

          <div className="plan-items">
            {items.map((it) => (
              <div key={it.key} className={`plan-item${it.count === 0 ? " is-empty" : ""}`} style={{ "--c": it.color }}>
                <span className="plan-item-icon"><Icon name={it.icon} size={18} /></span>
                <span className="plan-item-body">
                  <b>{it.title}</b>
                  <span>{it.desc}</span>
                </span>
                <span className="plan-item-count tnum">{it.count}</span>
              </div>
            ))}
          </div>

          {plan.totalSteps > 0 ? (
            <Button variant="primary" size="lg" block icon="play" onClick={onStart}>
              Comenzar sesión
            </Button>
          ) : (
            <div className="stack" style={{ gap: 10 }}>
              <p className="muted" style={{ margin: 0 }}>
                {nextDue
                  ? <>Tu próximo repaso llega el <strong>{fmtDateShort(nextDue.date)}</strong>. Mientras tanto puedes repasar libre o hacer un simulacro.</>
                  : "Hoy no hay nada programado. Puedes adelantar temas o practicar con un simulacro."}
              </p>
              <div className="chips">
                <Button variant="solid" icon="repasar" onClick={() => navigate("repasar")}>Repasar libre</Button>
                <Button variant="solid" icon="simulacro" onClick={() => navigate("simulacro")}>Hacer un simulacro</Button>
              </div>
            </div>
          )}
        </Card>
      </Reveal>

      <Reveal delay={180}>
        <Card>
          <div className="card-title-row">
            <h3>Avance general</h3>
            <Badge tone={stats.coverage >= 100 ? "success" : "brand"}>
              {stats.introducedCount} / {stats.total} temas
            </Badge>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16 }}>
            <Ring value={stats.coverage} size={78} stroke={8} label={`${stats.coverage}%`} sublabel="visto" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="bar-row">
                <span className="lbl">Temas firmes (85 % o más)</span>
                <span className="val">{stats.mastered}</span>
              </div>
              <Bar value={stats.total ? (stats.mastered / stats.total) * 100 : 0} color="var(--success)" />
              <div className="bar-row" style={{ marginTop: 12 }}>
                <span className="lbl">Aciertos en práctica</span>
                <span className="val">{stats.accuracy == null ? "—" : stats.accuracy + "%"}</span>
              </div>
              <Bar value={stats.accuracy || 0} color="var(--warn)" />
            </div>
          </div>

          <div className="stats">
            <Stat value={stats.studyDays} label="días de estudio" />
            <Stat value={stats.totalCardsReviewed} label="tarjetas repasadas" />
            <Stat value={stats.quizAnswered} label="preguntas resueltas" />
          </div>
        </Card>
      </Reveal>

      {weak.length > 0 && (
        <Reveal delay={240}>
          <Card>
            <div className="card-title-row">
              <h3>Conviene reforzar</h3>
              <Button variant="ghost" size="sm" iconRight="chevronRight" onClick={() => navigate("progreso")}>Ver todo</Button>
            </div>
            <div className="topic-list">
              {weak.map(({ topic, mastery }) => (
                <button
                  key={topic.id}
                  className="topic-row"
                  style={areaStyle(topic.area)}
                  onClick={() => navigate(`repasar/t/${topic.id}`)}
                >
                  <span className="topic-dot" />
                  <span className="topic-name">
                    {topic.tema}
                    <small>{topic.subarea}</small>
                  </span>
                  <Badge tone={mastery >= 40 ? "warn" : "danger"}>{mastery}%</Badge>
                </button>
              ))}
            </div>
          </Card>
        </Reveal>
      )}

      {plan.notIntroducedCount === 0 && stats.total > 0 && (
        <Reveal delay={300}>
          <Card>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span className="empty-icon" style={{ margin: 0, width: 44, height: 44 }}>
                <Icon name="check" size={22} />
              </span>
              <div>
                <h3 style={{ marginBottom: 4 }}>Ya viste todo el temario</h3>
                <p className="muted" style={{ margin: 0 }}>
                  De aquí al examen lo que más suma es repasar las tarjetas pendientes y hacer simulacros completos.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      )}
    </div>
  );
}

function PhaseNote({ plan }) {
  let text = "Vas al día con el plan.";
  let warn = false;
  let icon = "check";

  if (plan.phase === "before") { text = `Tu plan arranca el ${fmtDateLong(STUDY_START)}.`; icon = "clock"; }
  else if (plan.phase === "after") { text = "El periodo de estudio ya terminó. ¡Mucho éxito!"; icon = "sparkles"; }
  else if (plan.phase === "review") { text = "Última recta: repasos y simulacros completos."; icon = "target"; }
  else if (plan.behind) { text = "Vas algo atrasado: hoy toca un poco más para recuperar el ritmo."; warn = true; icon = "alert"; }

  return (
    <div className={`hero-note${warn ? " is-warn" : ""}`}>
      <Icon name={icon} size={15} strokeWidth={2} />
      {text}
    </div>
  );
}

/* Aviso de que el temario creció: explica por qué bajó el porcentaje de dominio. */
/* El examen se aprueba área por área: reprobar tres significa volver a
   empezar. Cuando una va claramente por debajo, decirlo en la primera pantalla
   vale más que cualquier estadística enterrada en Progreso: la sesión de hoy ya
   viene cargada hacia esa área, y conviene saber por qué. */
function AvisoAreaEnRiesgo({ area }) {
  const pct = area.acierto === null ? null : Math.round(area.acierto * 100);
  return (
    <Card className="aviso-riesgo">
      <div className="aviso-riesgo-head">
        <Icon name="alert" size={17} />
        <strong>{area.nombre} es la que te puede reprobar</strong>
      </div>
      <p>
        {pct === null
          ? `Todavía no has respondido lo suficiente de esta área para saber cómo vas. Son ${area.reactivos} reactivos del examen y hay que acreditarla por separado.`
          : `Llevas ${pct}% de aciertos y la meta de trabajo es ${Math.round(area.objetivo * 100)}%. Son ${area.reactivos} reactivos y se acredita por separado: no basta con ir bien en las demás.`}
      </p>
      <p className="faint">La sesión de hoy ya trae más práctica de esta área.</p>
      <Button variant="ghost" onClick={() => navigate(`repasar/a/${area.area}`)}>
        Practicar {area.nombre}
      </Button>
    </Card>
  );
}

function ContentUpdateNote({ update }) {
  return (
    <Card className="update-note">
      <span className="update-icon"><Icon name="sparkles" size={20} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ margin: "0 0 4px" }}>El temario creció</h3>
        <p className="muted" style={{ margin: 0 }}>
          Se agregaron <strong>{update.newCards} tarjetas nuevas</strong> a temas que ya habías visto, repartidas
          entre los próximos {update.dias || 21} días. Cada una se te enseña con la respuesta a la vista antes de
          entrar al repaso, y sus reactivos no aparecen hasta entonces. Tu porcentaje de dominio bajó a propósito:
          vuelve a subir conforme estudies el material nuevo. Nada de lo que ya llevabas se borró.
        </p>
      </div>
      <button
        className="btn btn-ghost btn-icon"
        aria-label="Entendido"
        onClick={() => dismissContentUpdate()}
      >
        <Icon name="x" size={17} />
      </button>
    </Card>
  );
}

/* Aviso de la reconciliación: el temario cambió y las tarjetas guardadas se
   movieron a su nueva posición (o se quitaron, si su contenido ya no existe).
   Se explica porque el número de tarjetas y el porcentaje de dominio cambian
   de un día para otro sin que el sustentante haya hecho nada. */
function PodaNote({ poda }) {
  return (
    <Card className="update-note">
      <span className="update-icon"><Icon name="check" size={20} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ margin: "0 0 4px" }}>Se ajustó tu progreso al temario</h3>
        <p className="muted" style={{ margin: 0 }}>
          {poda.movidas > 0 && (
            <>Se reacomodaron <strong>{poda.movidas} tarjetas</strong> que cambiaron de lugar en el temario,
            con sus repasos y sus intervalos intactos. </>
          )}
          {poda.quitadas > 0 && (
            <>Se dieron de baja <strong>{poda.quitadas}</strong> que ya no forman parte del contenido. </>
          )}
          Nada de lo que estudiaste se perdió: solo dejó de aparecer lo que el temario ya no incluye.
        </p>
      </div>
      <button
        className="btn btn-ghost btn-icon"
        aria-label="Entendido"
        onClick={() => dismissPoda()}
      >
        <Icon name="x" size={17} />
      </button>
    </Card>
  );
}

function Welcome() {
  const steps = [
    {
      title: "Repaso espaciado",
      body: "Tarjetas de temas anteriores justo cuando estás por olvidarlas (algoritmo SM-2, el mismo de Anki)."
    },
    {
      title: "Pocos temas nuevos, mezclados",
      body: "Cada día entran temas de áreas distintas (interleaving), no bloques largos de una sola materia."
    },
    {
      title: "Práctica con el formato real",
      body: "Preguntas de opción múltiple con tres respuestas y explicación inmediata (recuperación activa)."
    }
  ];
  return (
    <Card>
      <div className="card-title-row">
        <h3>Cómo funciona este plan</h3>
        <Badge tone="brand" icon="sparkles">3 pasos</Badge>
      </div>
      <div className="welcome-steps">
        {steps.map((s, i) => (
          <div className="welcome-step" key={s.title}>
            <span className="welcome-step-num">{i + 1}</span>
            <div>
              <b>{s.title}</b>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="muted" style={{ marginBottom: 16 }}>
        El calendario se ajusta solo: si un día no estudias, lo pendiente se reparte entre los días que quedan.
      </p>
      <Button
        variant="soft"
        block
        icon="check"
        onClick={() => { STATE.dismissedWelcome = true; saveState(); }}
      >
        Entendido, empecemos
      </Button>
    </Card>
  );
}
