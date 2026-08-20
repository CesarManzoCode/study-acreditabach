import { useMemo } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Section, Meter, MeterBlock, Badge, Figures, Figure } from "../ui/kit.jsx";
import { navigate } from "../lib/hooks.js";
import {
  STATE, saveState, fmtDateLong, fmtDateShort, daysBetween, todayDate,
  STUDY_START, EXAM_DATE, weakestTopics, upcomingLoad, dismissContentUpdate, dismissPoda
} from "../lib/engine.js";
import { areaStyle } from "../lib/areas.js";

/* Pantalla Hoy.

   Una sola pregunta manda aquí: ¿qué tengo que estudiar hoy y cuándo empiezo?
   Por eso la cuenta regresiva encabeza la página como el membrete de un
   documento —fija el contexto y se quita de en medio— y el panel de la sesión
   ocupa la columna ancha con su botón de arranque abajo. Todo lo demás
   (avance, temas flojos, cómo funciona el plan) acompaña en la columna
   estrecha: informa, no compite. */

export default function Today({ plan, stats, onStart }) {
  const days = Math.max(0, plan.daysToExam);
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
      title: "Repaso espaciado",
      desc: "Tarjetas que hoy están por olvidarse",
      count: plan.reviewCards.length
    },
    {
      key: "lesson",
      title: "Lecciones de ampliación",
      desc: plan.blockLessons.length
        ? plan.blockLessons.map((b) => b.topic.tema).slice(0, 2).join(" · ") + (plan.blockLessons.length > 2 ? " …" : "")
        : "Explicación del material que aún no se te ha enseñado",
      count: plan.blockLessons.length
    },
    {
      key: "learn",
      title: "Material nuevo",
      desc: plan.learnPending > plan.learnCards.length
        ? `Se enseña con la respuesta a la vista · quedan ${plan.learnPending - plan.learnCards.length} para después`
        : "Tarjetas que se enseñan con la respuesta a la vista",
      count: plan.learnCards.length
    },
    {
      key: "new",
      title: "Temas nuevos",
      desc: plan.newTopics.length
        ? plan.newTopics.map((t) => t.tema).slice(0, 2).join(" · ") + (plan.newTopics.length > 2 ? " …" : "")
        : "Nada nuevo por hoy",
      count: plan.newTopics.length
    },
    {
      key: "quiz",
      title: "Práctica tipo examen",
      desc: "Reactivos de opción múltiple con explicación",
      count: plan.quizQuestions.length
    }
  ];

  return (
    <>
      <header className="band">
        <h1 className="band-count">
          <span className="band-num tnum">{days}</span>
          <span className="band-unit">{days === 1 ? "día para el examen" : "días para el examen"}</span>
        </h1>

        <div className="band-side">
          <p className="band-date">
            <b>{fmtDateLong(EXAM_DATE)}</b>
            dos sesiones · 180 reactivos que puntúan
          </p>
          <Meter value={timeline} label="Avance del calendario de estudio" />
          <div className="band-track-labels">
            <span>{fmtDateShort(STUDY_START)}</span>
            <span>{timeline}% del calendario</span>
            <span>{fmtDateShort(EXAM_DATE)}</span>
          </div>
        </div>

        <PhaseNote plan={plan} />
      </header>

      {(STATE.contentUpdate || STATE.poda) && (
        <div className="stack" style={{ marginBottom: 26 }}>
          {STATE.contentUpdate && <ContentUpdateNote update={STATE.contentUpdate} />}
          {STATE.poda && <PodaNote poda={STATE.poda} />}
        </div>
      )}

      <div className="today-grid">
        <div>
          <section className="session" aria-labelledby="sesion-hoy">
            <div className="session-head">
              <div style={{ minWidth: 0 }}>
                <h2 id="sesion-hoy">Sesión de hoy</h2>
                <p className="session-sub">
                  {plan.totalSteps > 0
                    ? `≈ ${Math.max(5, plan.estMinutes)} min de estudio`
                    : "Sin pendientes por ahora"}
                </p>
              </div>
              {plan.totalSteps > 0 && (
                <div className="session-total">
                  <b>{plan.totalSteps}</b>
                  <span>pasos</span>
                </div>
              )}
            </div>

            <div className="session-list">
              {items.map((it) => (
                <div key={it.key} className={`session-row${it.count === 0 ? " is-empty" : ""}`}>
                  <div>
                    <b>{it.title}</b>
                    <span>{it.desc}</span>
                  </div>
                  <span className="session-row-count">{it.count}</span>
                </div>
              ))}
            </div>

            <div className="session-foot">
              {plan.totalSteps > 0 ? (
                <Button variant="primary" size="lg" block icon="play" onClick={onStart}>
                  Comenzar sesión
                </Button>
              ) : (
                <div className="stack" style={{ gap: 14 }}>
                  <p style={{ margin: 0 }}>
                    {nextDue
                      ? <>Tu próximo repaso llega el <strong>{fmtDateShort(nextDue.date)}</strong>. Mientras tanto puedes adelantar temas o hacer un simulacro.</>
                      : "Hoy no hay nada programado. Puedes adelantar temas o practicar con un simulacro."}
                  </p>
                  <div className="row-gap">
                    <Button variant="solid" icon="repasar" onClick={() => navigate("repasar")}>Abrir el temario</Button>
                    <Button variant="solid" icon="simulacro" onClick={() => navigate("simulacro")}>Hacer un simulacro</Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <div>
          {plan.areaEnRiesgo && (
            <div className="aside-block">
              <AvisoAreaEnRiesgo area={plan.areaEnRiesgo} />
            </div>
          )}

          {showWelcome && (
            <div className="aside-block">
              <Welcome />
            </div>
          )}

          <div className="aside-block">
            <Section
              title="Avance general"
              action={<Badge tone={stats.coverage >= 100 ? "success" : "neutral"}>{stats.introducedCount} / {stats.total} temas</Badge>}
            >
              <MeterBlock
                label="Temario visto"
                value={stats.coverage}
                display={`${stats.coverage}%`}
              />
              <MeterBlock
                label="Temas firmes (85 % o más)"
                value={stats.total ? (stats.mastered / stats.total) * 100 : 0}
                display={stats.mastered}
                color="var(--ok)"
              />
              <MeterBlock
                label="Aciertos en práctica"
                value={stats.accuracy || 0}
                display={stats.accuracy == null ? "—" : stats.accuracy + "%"}
                color="var(--accent)"
              />

              <Figures>
                <Figure value={stats.studyDays} label="días de estudio" />
                <Figure value={stats.totalCardsReviewed} label="tarjetas repasadas" />
                <Figure value={stats.quizAnswered} label="reactivos resueltos" />
              </Figures>
            </Section>
          </div>

          {weak.length > 0 && (
            <div className="aside-block">
              <Section
                title="Conviene reforzar"
                action={
                  <Button variant="ghost" size="sm" iconRight="chevronRight" onClick={() => navigate("progreso")}>
                    Ver todo
                  </Button>
                }
              >
                <div className="topic-list">
                  {weak.map(({ topic, mastery }) => (
                    <button
                      key={topic.id}
                      className="topic-row"
                      style={areaStyle(topic.area)}
                      onClick={() => navigate(`repasar/t/${topic.id}`)}
                    >
                      <span className="topic-name">
                        {topic.tema}
                        <small>{topic.subarea}</small>
                      </span>
                      <span className="topic-value">{mastery}%</span>
                      <Icon name="chevronRight" size={15} className="icon-chev" />
                    </button>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {plan.notIntroducedCount === 0 && stats.total > 0 && (
            <div className="aside-block">
              <div className="notice notice-ok">
                <Icon name="check" size={18} />
                <div className="notice-body">
                  <h3>Ya viste todo el temario</h3>
                  <p>
                    De aquí al examen lo que más suma es repasar las tarjetas pendientes y hacer
                    simulacros completos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
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
    <p className={`band-note${warn ? " is-warn" : ""}`}>
      <Icon name={icon} size={15} strokeWidth={2} />
      {text}
    </p>
  );
}

/* El examen se aprueba área por área: reprobar tres significa volver a
   empezar. Cuando una va claramente por debajo, decirlo en la primera pantalla
   vale más que cualquier estadística enterrada en Progreso: la sesión de hoy ya
   viene cargada hacia esa área, y conviene saber por qué. */
function AvisoAreaEnRiesgo({ area }) {
  const pct = area.acierto === null ? null : Math.round(area.acierto * 100);
  return (
    <div className="notice notice-danger" style={areaStyle(area.area)}>
      <Icon name="alert" size={18} />
      <div className="notice-body">
        <h3>{area.nombre} es la que te puede reprobar</h3>
        <p>
          {pct === null
            ? `Todavía no has respondido lo suficiente de esta área para saber cómo vas. Son ${area.reactivos} reactivos del examen y hay que acreditarla por separado.`
            : `Llevas ${pct}% de aciertos y la meta de trabajo es ${Math.round(area.objetivo * 100)}%. Son ${area.reactivos} reactivos y se acredita por separado: no basta con ir bien en las demás.`}
        </p>
        <p className="faint" style={{ marginBottom: 10 }}>La sesión de hoy ya trae más práctica de esta área.</p>
        <Button variant="solid" size="sm" onClick={() => navigate(`repasar/a/${area.area}`)}>
          Practicar {area.nombre}
        </Button>
      </div>
    </div>
  );
}

/* Aviso de que el temario creció: explica por qué bajó el porcentaje de dominio. */
function ContentUpdateNote({ update }) {
  return (
    <div className="notice notice-accent">
      <Icon name="sparkles" size={18} />
      <div className="notice-body">
        <h3>El temario creció</h3>
        <p>
          Se agregaron <strong>{update.newCards} tarjetas nuevas</strong> a temas que ya habías visto, repartidas
          entre los próximos {update.dias || 21} días. Cada una se te enseña con la respuesta a la vista antes de
          entrar al repaso, y sus reactivos no aparecen hasta entonces. Tu porcentaje de dominio bajó a propósito:
          vuelve a subir conforme estudies el material nuevo. Nada de lo que ya llevabas se borró.
        </p>
      </div>
      <button
        className="btn btn-ghost btn-icon btn-sm notice-close"
        aria-label="Entendido"
        onClick={() => dismissContentUpdate()}
      >
        <Icon name="x" size={16} />
      </button>
    </div>
  );
}

/* Aviso de la reconciliación: el temario cambió y las tarjetas guardadas se
   movieron a su nueva posición (o se quitaron, si su contenido ya no existe).
   Se explica porque el número de tarjetas y el porcentaje de dominio cambian
   de un día para otro sin que el sustentante haya hecho nada. */
function PodaNote({ poda }) {
  return (
    <div className="notice notice-ok">
      <Icon name="check" size={18} />
      <div className="notice-body">
        <h3>Se ajustó tu progreso al temario</h3>
        <p>
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
        className="btn btn-ghost btn-icon btn-sm notice-close"
        aria-label="Entendido"
        onClick={() => dismissPoda()}
      >
        <Icon name="x" size={16} />
      </button>
    </div>
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
      body: "Reactivos de opción múltiple con tres respuestas y explicación inmediata (recuperación activa)."
    }
  ];
  return (
    <Section title="Cómo funciona este plan">
      <div className="welcome-list">
        {steps.map((s, i) => (
          <div className="welcome-step" key={s.title}>
            <span className="welcome-num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <b>{s.title}</b>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="faint" style={{ margin: "14px 0 14px" }}>
        El calendario se ajusta solo: si un día no estudias, lo pendiente se reparte entre los días que quedan.
      </p>
      <Button
        variant="solid"
        block
        icon="check"
        onClick={() => { STATE.dismissedWelcome = true; saveState(); }}
      >
        Entendido, empecemos
      </Button>
    </Section>
  );
}
