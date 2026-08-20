import { useMemo } from "react";
import Icon from "../ui/Icon.jsx";
import { Button } from "../ui/kit.jsx";
import { navigate } from "../lib/hooks.js";
import {
  STATE, saveState, fmtDateLong, fmtDateShort, daysBetween,
  STUDY_START, EXAM_DATE, LEARNING_END, LAST_STUDY_DAY,
  weakestTopics, upcomingLoad, areaStats, dismissContentUpdate, dismissPoda
} from "../lib/engine.js";
import { areaStyle, areaVisual, masteryLabel } from "../lib/areas.js";

/* Pantalla Hoy · el cuaderno de trabajo.

   La página se lee de arriba abajo como una jornada de estudio:

     1. LA HOJA DE HOY. Lo único que hay que hacer hoy, con el reparto del
        trabajo a la vista (repasar / aprender / practicar) y el botón de
        arranque dentro de la misma hoja. Es lo más grande y lo más oscuro
        de la pantalla: no hay duda de por dónde se empieza.
     2. LA REGLETA. El recorrido de agosto al examen dibujado como una regla
        graduada: arriba los días, abajo el temario visto. Comparar las dos
        longitudes responde "¿voy al ritmo?" sin leer un solo número.
     3. Refuerzo y materias. Qué tema está flojo y cómo va cada una de las
        siete áreas, que es como se acredita el examen.

   Las cifras nunca encabezan un bloque: primero va la lectura en palabras y
   el número queda detrás, como evidencia. */

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

export default function Today({ plan, stats, onStart }) {
  const hoy = plan.today;
  const showWelcome = !STATE.dismissedWelcome && stats.introducedCount === 0;

  const nextDue = useMemo(() => upcomingLoad(8).slice(1).find((d) => d.count > 0), [stats, plan]);
  const weak = useMemo(() => weakestTopics(4).filter((w) => w.mastery < 85), [stats]);

  /* Los cinco tipos de trabajo del motor se agrupan en las tres cosas que de
     verdad se hacen en una sesión. El detalle de cada grupo sigue siendo el
     dato real del plan, sin sumar ni inventar nada. */
  const repasar = plan.reviewCards.length;
  const aprender = plan.blockLessons.length + plan.learnCards.length + plan.newTopics.length;
  const practicar = plan.quizQuestions.length;

  const grupos = [
    {
      key: "repasar",
      titulo: "Repasar",
      icon: "refresh",
      total: repasar,
      unidad: repasar === 1 ? "tarjeta" : "tarjetas",
      resumen: "Tarjetas de días anteriores que hoy están por olvidarse.",
      vacio: "Ninguna tarjeta vence hoy.",
      detalle: []
    },
    {
      key: "aprender",
      titulo: "Aprender",
      icon: "cap",
      total: aprender,
      unidad: aprender === 1 ? "cosa nueva" : "cosas nuevas",
      resumen: "Material nuevo, siempre explicado antes de preguntarte.",
      vacio: "Hoy no entra material nuevo.",
      detalle: [
        plan.newTopics.length && {
          etiqueta: `${plan.newTopics.length} ${plan.newTopics.length === 1 ? "tema nuevo" : "temas nuevos"}`,
          temas: plan.newTopics.map((t) => ({ id: t.id, nombre: t.tema, area: t.area }))
        },
        plan.blockLessons.length && {
          etiqueta: `${plan.blockLessons.length} ${plan.blockLessons.length === 1 ? "lección de ampliación" : "lecciones de ampliación"}`,
          temas: plan.blockLessons.map((b) => ({ id: b.topicId + b.bloque, nombre: b.topic.tema, area: b.topic.area }))
        },
        plan.learnCards.length && {
          etiqueta: `${plan.learnCards.length} ${plan.learnCards.length === 1 ? "tarjeta se te enseña" : "tarjetas se te enseñan"}`,
          nota: plan.learnPending > plan.learnCards.length
            ? `quedan ${plan.learnPending - plan.learnCards.length} para los próximos días`
            : null
        }
      ].filter(Boolean)
    },
    {
      key: "practicar",
      titulo: "Practicar",
      icon: "simulacro",
      total: practicar,
      unidad: practicar === 1 ? "reactivo" : "reactivos",
      resumen: "Opción múltiple con el formato del examen y explicación al momento.",
      vacio: "Sin práctica programada.",
      detalle: []
    }
  ];

  return (
    <>
      {(STATE.contentUpdate || STATE.poda) && (
        <div className="avisos">
          {STATE.contentUpdate && <ContentUpdateNote update={STATE.contentUpdate} />}
          {STATE.poda && <PodaNote poda={STATE.poda} />}
        </div>
      )}

      <div className="hoy">
        {/* ---------- 1. La hoja de hoy ---------- */}
        <section className="hoja" aria-labelledby="hoja-titulo">
          <div className="hoja-cab">
            <p className="fecha">
              {DIAS[hoy.getDay()]} {hoy.getDate()} de {fmtDateLong(hoy).split(" de ")[1]}
            </p>
            <h1 id="hoja-titulo">
              {plan.totalSteps > 0 ? (
                <>Hoy toca <mark>{tituloDelDia(repasar, aprender, practicar)}</mark></>
              ) : (
                <>Hoy no tienes <mark>nada pendiente</mark></>
              )}
            </h1>
            {plan.totalSteps > 0 && (
              <p className="hoja-tiempo">
                <b className="tnum">≈ {Math.max(5, plan.estMinutes)} min</b>
                <span>de estudio · {plan.totalSteps} {plan.totalSteps === 1 ? "paso" : "pasos"}</span>
              </p>
            )}
          </div>

          {plan.totalSteps > 0 ? (
            <>
              <Reparto repasar={repasar} aprender={aprender} practicar={practicar} />

              <div className="hoja-arranque">
                <Button variant="primary" size="lg" block iconRight="arrowRight" onClick={onStart}>
                  Comenzar sesión
                </Button>
                <p className="hoja-pista">Puedes parar cuando quieras: lo que respondas queda guardado.</p>
              </div>

              <ol className="trabajo">
                {grupos.map((g) => (
                  <li key={g.key} className={`trabajo-item t-${g.key}${g.total === 0 ? " is-vacio" : ""}`}>
                    <span className="trabajo-marca" aria-hidden="true"><Icon name={g.icon} size={17} /></span>
                    <div className="trabajo-cuerpo">
                      <h2>
                        {g.titulo}
                        {g.total > 0 && <b className="tnum">{g.total}</b>}
                        {g.total > 0 && <span className="trabajo-unidad">{g.unidad}</span>}
                      </h2>
                      <p>{g.total === 0 ? g.vacio : g.resumen}</p>
                      {g.total > 0 && g.detalle.length > 0 && (
                        <ul className="trabajo-detalle">
                          {g.detalle.map((d) => (
                            <li key={d.etiqueta}>
                              <span className="detalle-etiqueta">{d.etiqueta}</span>
                              {d.nota && <span className="detalle-nota">{d.nota}</span>}
                              {d.temas && (
                                <span className="chips">
                                  {d.temas.map((t) => (
                                    <span className="chip" key={t.id} style={areaStyle(t.area)}>{t.nombre}</span>
                                  ))}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <div className="hoja-libre">
              <p>
                {nextDue
                  ? <>Tu próximo repaso llega el <strong>{fmtDateShort(nextDue.date)}</strong>. Mientras tanto puedes adelantar temas o hacer un simulacro.</>
                  : "No hay nada programado. Puedes adelantar temas del temario o medirte con un simulacro."}
              </p>
              <div className="row-gap">
                <Button variant="primary" size="lg" icon="repasar" onClick={() => navigate("repasar")}>Abrir el temario</Button>
                <Button variant="solid" size="lg" icon="simulacro" onClick={() => navigate("simulacro")}>Hacer un simulacro</Button>
              </div>
            </div>
          )}
        </section>

        {/* ---------- Columna de apoyo ---------- */}
        <aside className="apoyo" aria-label="Cómo vas">
          {plan.areaEnRiesgo && <AvisoAreaEnRiesgo area={plan.areaEnRiesgo} />}

          {weak.length > 0 && (
            <section className="bloque" aria-labelledby="reforzar">
              <div className="bloque-cab">
                <h2 id="reforzar">Conviene reforzar</h2>
                <button className="link-btn" onClick={() => navigate("progreso")}>Ver todos</button>
              </div>
              <p className="bloque-nota">Los temas que llevas más flojos de todo lo que ya viste.</p>
              <div className="fichas">
                {weak.map(({ topic, mastery }) => {
                  const nivel = masteryLabel(mastery);
                  const v = areaVisual(topic.area);
                  return (
                    <button
                      key={topic.id}
                      className="ficha"
                      style={areaStyle(topic.area)}
                      onClick={() => navigate(`repasar/t/${topic.id}`)}
                    >
                      <span className="ficha-area">{v.short}</span>
                      <span className="ficha-tema">{topic.tema}</span>
                      <span className="ficha-barra" aria-hidden="true">
                        <span style={{ width: Math.max(3, mastery) + "%" }} />
                      </span>
                      <span className="ficha-pie">
                        <span className={`ficha-nivel n-${nivel.tone}`}>{nivel.text}</span>
                        <span className="ficha-pct tnum">{mastery}%</span>
                        <span className="ficha-ir">Ver tema <Icon name="arrowRight" size={14} /></span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {showWelcome && <Welcome />}

          {plan.notIntroducedCount === 0 && stats.total > 0 && (
            <div className="nota nota-ok">
              <Icon name="check" size={18} />
              <div>
                <h3>Ya viste todo el temario</h3>
                <p>De aquí al examen lo que más suma es repasar las tarjetas pendientes y hacer simulacros completos.</p>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ---------- 2. La regleta ---------- */}
      <Regleta plan={plan} stats={stats} />

      {/* ---------- 3. Las siete áreas ---------- */}
      <Materias readiness={plan.readiness} />

      {/* ---------- Constancia ---------- */}
      <Constancia stats={stats} />
    </>
  );
}

function tituloDelDia(repasar, aprender, practicar) {
  const partes = [];
  if (repasar) partes.push("repasar");
  if (aprender) partes.push("aprender");
  if (practicar) partes.push("practicar");
  if (partes.length === 3) return "repasar, aprender y practicar";
  if (partes.length === 2) return partes.join(" y ");
  return partes[0] || "estudiar";
}

/* Reparto del día: una sola barra dice de un vistazo cuánto es repaso, cuánto
   material nuevo y cuánta práctica. El color de cada tramo es el mismo que
   lleva su bloque más abajo, así que se lee sin leyenda aparte. */
function Reparto({ repasar, aprender, practicar }) {
  const total = repasar + aprender + practicar;
  const partes = [
    { key: "repasar", n: repasar, label: "Repasar" },
    { key: "aprender", n: aprender, label: "Aprender" },
    { key: "practicar", n: practicar, label: "Practicar" }
  ].filter((p) => p.n > 0);

  return (
    <div className="reparto">
      <div className="reparto-barra" role="img" aria-label={partes.map((p) => `${p.label}: ${p.n}`).join(", ")}>
        {partes.map((p) => {
          const pct = (p.n / total) * 100;
          return (
            <span key={p.key} className={`tramo t-${p.key}`} style={{ flexGrow: p.n }}>
              <b className="tnum">{p.n}</b>
              {pct >= 22 && <span className="tramo-label">{p.label}</span>}
            </span>
          );
        })}
      </div>
      <ul className="reparto-leyenda">
        {partes.map((p) => (
          <li key={p.key} className={`t-${p.key}`}>
            <span className="punto" aria-hidden="true" />
            {p.label}
            <b className="tnum">{Math.round((p.n / total) * 100)}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* LA REGLETA · el elemento propio de esta app.

   Una regla graduada del 1 de agosto al día del examen. La cinta de arriba
   son los días (los transcurridos van entintados, el de hoy lleva su banderilla
   y el examen cierra la regla). La cinta de abajo es el temario visto, dibujada
   sobre el mismo eje y a la misma escala: si llega más lejos que el día de hoy,
   vas por delante del calendario; si se queda corta, vas por detrás. Eso es
   todo lo que hay que mirar para saber si se llega a tiempo. */
function Regleta({ plan, stats }) {
  const datos = useMemo(() => {
    const total = Math.max(1, daysBetween(STUDY_START, EXAM_DATE));
    const transcurridos = clamp(daysBetween(STUDY_START, plan.today), 0, total);
    const diasAprendizaje = Math.max(1, daysBetween(STUDY_START, LEARNING_END));
    /* Cuánto del temario "debería" estar visto hoy: el plan reparte los temas
       nuevos entre el arranque y el final de la fase de aprendizaje. */
    const esperado = clamp(Math.round((transcurridos / diasAprendizaje) * 100), 0, 100);

    const meses = [];
    let cursor = new Date(STUDY_START.getFullYear(), STUDY_START.getMonth(), 1);
    while (cursor <= EXAM_DATE) {
      const inicio = cursor < STUDY_START ? STUDY_START : cursor;
      meses.push({
        nombre: cursor.toLocaleDateString("es-MX", { month: "short" }).replace(".", ""),
        pos: (daysBetween(STUDY_START, inicio) / total) * 100
      });
      cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
    }

    return {
      total,
      transcurridos,
      pctDias: (transcurridos / total) * 100,
      pctAprendizaje: (daysBetween(STUDY_START, LEARNING_END) / total) * 100,
      pctUltimoDia: (daysBetween(STUDY_START, LAST_STUDY_DAY) / total) * 100,
      esperado,
      meses
    };
  }, [plan.today]);

  const dias = Math.max(0, plan.daysToExam);
  const veredicto = leerRitmo(plan, stats, datos.esperado);

  return (
    <section className="regleta-zona" aria-labelledby="regleta-titulo">
      <header className="regleta-cab">
        <p className="rotulo">De aquí al examen</p>
        <p className="cuenta">
          <b className="tnum">{dias}</b>
          <span>{dias === 1 ? "día para el\nexamen" : "días para el\nexamen"}</span>
        </p>
        <div className="veredicto-bloque">
          <h2 id="regleta-titulo" className={`veredicto v-${veredicto.tono}`}>
            <Icon name={veredicto.icon} size={20} strokeWidth={2} />
            {veredicto.titulo}
          </h2>
          <p className="veredicto-detalle">{veredicto.detalle}</p>
        </div>
      </header>

      <div className="regleta" style={{ "--dia": 100 / datos.total + "%" }}>
        <div className="regleta-cuerpo">
        <div
          className={`regleta-pin${datos.pctDias < 9 ? " is-inicio" : datos.pctDias > 91 ? " is-final" : ""}`}
          style={{ left: datos.pctDias + "%" }}
        >
          <span className="pin-etiqueta">Hoy</span>
          <span className="pin-linea" aria-hidden="true" />
        </div>

        <div className="cinta cinta-dias">
          <div className="cinta-fondo" aria-hidden="true" />
          <div className="cinta-llena" style={{ width: datos.pctDias + "%" }} aria-hidden="true" />
          <span className="corte" style={{ left: datos.pctAprendizaje + "%" }} aria-hidden="true" />
          <span className="corte" style={{ left: datos.pctUltimoDia + "%" }} aria-hidden="true" />
          <span className="marca-examen" aria-hidden="true" />
          <span className="sr-only">
            Día {datos.transcurridos} de {datos.total} del calendario de estudio.
          </span>
        </div>

        <div className="regleta-fases" aria-hidden="true">
          <span style={{ width: datos.pctAprendizaje + "%" }}>Aprender el temario</span>
          <span style={{ width: (datos.pctUltimoDia - datos.pctAprendizaje) + "%" }}>Repaso final</span>
          <span className="fase-examen">Examen</span>
        </div>

        <div className="cinta cinta-temario">
          <div className="cinta-fondo" aria-hidden="true" />
          <div
            className="cinta-llena"
            style={{ width: Math.max(1.2, stats.coverage) + "%" }}
            role="progressbar"
            aria-valuenow={stats.coverage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Temario visto"
          />
        </div>
        </div>

        <div className="regleta-pies">
          <p className="pie-temario">
            Temario visto · <b className="tnum">{stats.introducedCount}</b> de {stats.total} temas
            <b className="tnum pie-pct">{stats.coverage}%</b>
          </p>
          <p className="pie-examen">
            <span className="bandera" aria-hidden="true" />
            {fmtDateLong(EXAM_DATE)} · dos sesiones · 180 reactivos que puntúan
          </p>
        </div>

        <div className="regleta-meses" aria-hidden="true">
          {datos.meses.map((m) => (
            <span key={m.nombre + m.pos} style={{ left: m.pos + "%" }}>{m.nombre}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* La lectura del ritmo sale solo de datos reales: la fase del plan, el aviso
   de atraso del motor y la comparación entre el temario visto y lo que el
   calendario de aprendizaje lleva recorrido. Nada más. */
function leerRitmo(plan, stats, esperado) {
  if (plan.phase === "before") {
    return {
      tono: "espera", icon: "clock",
      titulo: "Tu plan arranca pronto",
      detalle: `El calendario empieza el ${fmtDateLong(STUDY_START)}. Puedes ir explorando el temario mientras tanto.`
    };
  }
  if (plan.phase === "after") {
    return {
      tono: "espera", icon: "sparkles",
      titulo: "El periodo de estudio terminó",
      detalle: "Mucho éxito en el examen."
    };
  }
  if (plan.behind) {
    return {
      tono: "atras", icon: "alert",
      titulo: "Vas algo atrasado",
      detalle: `Quedan temas por ver y la fase de aprendizaje ya se acabó: las sesiones vienen más cargadas para recuperar el ritmo.`
    };
  }
  if (plan.phase === "review") {
    return {
      tono: "ok", icon: "target",
      titulo: "Última recta",
      detalle: `Ya no entran temas nuevos: de aquí al ${fmtDateShort(EXAM_DATE)} todo es repasar lo pendiente y hacer simulacros completos.`
    };
  }
  const holgura = stats.coverage - esperado;
  if (stats.introducedCount === 0) {
    return {
      tono: "espera", icon: "play",
      titulo: "Empiezas hoy",
      detalle: `Quedan ${Math.max(0, plan.daysToExam)} días y ${stats.total} temas por ver. La sesión de hoy ya trae los primeros.`
    };
  }
  if (holgura >= 5) {
    return {
      tono: "ok", icon: "check",
      titulo: "Vas por delante del calendario",
      detalle: `Llevas ${stats.coverage}% del temario visto y el calendario de aprendizaje va en ${esperado}%.`
    };
  }
  if (holgura >= -5) {
    return {
      tono: "ok", icon: "check",
      titulo: "Vas al día",
      detalle: `Llevas ${stats.coverage}% del temario visto, justo lo que marca el calendario a estas alturas (${esperado}%).`
    };
  }
  return {
    tono: "atras", icon: "alert",
    titulo: "Vas por detrás del calendario",
    detalle: `Llevas ${stats.coverage}% del temario visto y a estas alturas tocaría ${esperado}%. Cada sesión que completes acorta la diferencia.`
  };
}

/* Las siete áreas. No es un gráfico: es el índice de materias del examen, con
   su color, cuánto llevas visto de cada una y qué tan urgente está. Se acredita
   área por área, así que cada una vale como puerta de entrada al temario. */
function Materias({ readiness }) {
  const orden = useMemo(() => [...readiness].sort((a, b) => a.area - b.area), [readiness]);
  const ETIQUETA = {
    alto: { texto: "Necesita trabajo", tono: "alto" },
    medio: { texto: "Hay que vigilarla", tono: "medio" },
    bajo: { texto: "En ruta", tono: "bajo" }
  };

  return (
    <section className="materias-zona" aria-labelledby="materias-titulo">
      <div className="zona-cab">
        <p className="rotulo">Las siete áreas</p>
        <h2 id="materias-titulo">El examen se acredita área por área</h2>
        <p className="zona-nota">
          No se aprueba en promedio: hay que pasar cada una por separado. Toca un área para estudiar sus temas.
        </p>
      </div>

      <div className="materias">
        {orden.map((a) => {
          const v = areaVisual(a.area);
          const et = ETIQUETA[a.nivel];
          const st = areaStats(a.area);
          return (
            <button
              key={a.area}
              className="materia"
              style={areaStyle(a.area)}
              onClick={() => navigate(`repasar/a/${a.area}`)}
            >
              <span className="materia-tab" aria-hidden="true" />
              <span className="materia-num tnum">{v.num}</span>
              <span className="materia-nombre">{a.nombre}</span>
              <span className="materia-barra" aria-hidden="true">
                <span style={{ height: Math.max(2, a.cobertura) + "%" }} />
              </span>
              <span className="materia-datos">
                <b className="tnum">{st.introducedCount}</b> de {st.total} temas vistos
              </span>
              <span className={`materia-estado e-${et.tono}`}>{et.texto}</span>
              <span className="materia-reactivos">{a.reactivos} reactivos</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* Constancia: lo que ya hiciste. Primero la lectura, después la cifra. */
function Constancia({ stats }) {
  const lineas = [
    {
      k: "racha",
      titulo: stats.streak > 1
        ? `Llevas ${stats.streak} días seguidos`
        : stats.streak === 1 ? "Estudiaste hoy" : "Aún no arrancas la racha",
      dato: `${stats.studyDays} ${stats.studyDays === 1 ? "día activo" : "días activos"} en total`
    },
    {
      k: "repaso",
      titulo: stats.totalCardsReviewed > 0
        ? "Tarjetas que ya has repasado"
        : "Todavía no repasas tarjetas",
      dato: `${stats.totalCardsReviewed} ${stats.totalCardsReviewed === 1 ? "repaso" : "repasos"} · ${stats.mastered} ${stats.mastered === 1 ? "tema firme" : "temas firmes"}`
    },
    {
      k: "practica",
      titulo: stats.accuracy == null
        ? "Aún no hay práctica suficiente para medirte"
        : stats.accuracy >= 85 ? "Tu práctica está siendo sólida"
        : stats.accuracy >= 70 ? "Tu práctica va razonable"
        : "Tu práctica todavía falla mucho",
      dato: stats.accuracy == null
        ? "responde reactivos para ver tu porcentaje"
        : `${stats.accuracy}% de aciertos en ${stats.quizAnswered} reactivos`
    }
  ];

  return (
    <section className="constancia" aria-label="Tu constancia">
      {lineas.map((l) => (
        <p key={l.k}>
          <b>{l.titulo}</b>
          <span>{l.dato}</span>
        </p>
      ))}
      <button className="link-btn" onClick={() => navigate("progreso")}>
        Ver todo el progreso <Icon name="arrowRight" size={14} />
      </button>
    </section>
  );
}

/* El examen se aprueba área por área: reprobar tres significa volver a
   empezar. Cuando una va claramente por debajo, decirlo en la primera pantalla
   vale más que cualquier estadística enterrada en Progreso. */
function AvisoAreaEnRiesgo({ area }) {
  const pct = area.acierto === null ? null : Math.round(area.acierto * 100);
  return (
    <div className="nota nota-riesgo" style={areaStyle(area.area)}>
      <Icon name="alert" size={18} />
      <div>
        <h3>{area.nombre} es la que te puede reprobar</h3>
        <p>
          {pct === null
            ? `Todavía no has respondido lo suficiente de esta área para saber cómo vas. Son ${area.reactivos} reactivos del examen y hay que acreditarla por separado.`
            : `Llevas ${pct}% de aciertos y la meta de trabajo es ${Math.round(area.objetivo * 100)}%. Son ${area.reactivos} reactivos y se acredita por separado: no basta con ir bien en las demás.`}
        </p>
        <p className="nota-pie">La sesión de hoy ya trae más práctica de esta área.</p>
        <Button variant="solid" size="sm" iconRight="arrowRight" onClick={() => navigate(`repasar/a/${area.area}`)}>
          Practicar {area.nombre}
        </Button>
      </div>
    </div>
  );
}

/* Aviso de que el temario creció: explica por qué bajó el porcentaje de dominio. */
function ContentUpdateNote({ update }) {
  return (
    <div className="nota nota-info">
      <Icon name="sparkles" size={18} />
      <div>
        <h3>El temario creció</h3>
        <p>
          Se agregaron <strong>{update.newCards} tarjetas nuevas</strong> a temas que ya habías visto, repartidas
          entre los próximos {update.dias || 21} días. Cada una se te enseña con la respuesta a la vista antes de
          entrar al repaso, y sus reactivos no aparecen hasta entonces. Tu porcentaje de dominio bajó a propósito:
          vuelve a subir conforme estudies el material nuevo. Nada de lo que ya llevabas se borró.
        </p>
      </div>
      <button className="nota-cerrar" aria-label="Entendido" onClick={() => dismissContentUpdate()}>
        <Icon name="x" size={16} />
      </button>
    </div>
  );
}

/* Aviso de la reconciliación: el temario cambió y las tarjetas guardadas se
   movieron a su nueva posición (o se quitaron, si su contenido ya no existe). */
function PodaNote({ poda }) {
  return (
    <div className="nota nota-ok">
      <Icon name="check" size={18} />
      <div>
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
      <button className="nota-cerrar" aria-label="Entendido" onClick={() => dismissPoda()}>
        <Icon name="x" size={16} />
      </button>
    </div>
  );
}

function Welcome() {
  const pasos = [
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
    <section className="bloque" aria-labelledby="como-funciona">
      <div className="bloque-cab">
        <h2 id="como-funciona">Cómo funciona este plan</h2>
      </div>
      <ol className="pasos">
        {pasos.map((s, i) => (
          <li key={s.title}>
            <span className="pasos-num tnum">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <b>{s.title}</b>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="bloque-nota">
        El calendario se ajusta solo: si un día no estudias, lo pendiente se reparte entre los días que quedan.
      </p>
      <Button variant="solid" block icon="check" onClick={() => { STATE.dismissedWelcome = true; saveState(); }}>
        Entendido, empecemos
      </Button>
    </section>
  );
}
