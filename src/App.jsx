import { useState, useMemo, useEffect, useCallback } from "react";
import Icon from "./ui/Icon.jsx";
import { ToastProvider } from "./ui/kit.jsx";
import { useEngine, useRoute, navigate, useAccounts, useCloud } from "./lib/hooks.js";
import { getStoredTheme, applyTheme } from "./lib/prefs.js";
import {
  computeTodayPlan, overallStats, cardsForTopic, cardsOfBlock, buildDrill,
  shuffleOptions, subscribe, isLearned, availableQuiz, blockOfCard, isLessonSeen,
  pasoConContenido, pendingLessons, quizOfBlock
} from "./lib/engine.js";
import { getActiveUser } from "./lib/accounts.js";
import { startCloud, getCloudStatus } from "./lib/cloud.js";

import Today from "./screens/Today.jsx";
import Browse from "./screens/Browse.jsx";
import Mock from "./screens/Mock.jsx";
import Progress from "./screens/Progress.jsx";
import Info from "./screens/Info.jsx";
import Account from "./screens/Account.jsx";
import { SessionRunner, MockRunner } from "./screens/Runner.jsx";

const NAV = [
  { id: "hoy", label: "Hoy", icon: "hoy" },
  { id: "repasar", label: "Temario", icon: "repasar" },
  { id: "simulacro", label: "Simulacro", icon: "simulacro" },
  { id: "progreso", label: "Progreso", icon: "progreso" },
  { id: "info", label: "Guía", icon: "info" }
];

/* Cada sesión que se abre recibe un número: sirve de `key` para que el
   ejecutor se reinicie de cero cuando se encadena otra ronda de práctica. */
let sesionSeq = 0;

export default function App() {
  return (
    <ToastProvider>
      <Shell />
    </ToastProvider>
  );
}

function Shell() {
  const rev = useEngine();
  useAccounts();
  useCloud();
  const route = useRoute();
  const [runner, setRunner] = useState(null);
  const [theme, setTheme] = useState(getStoredTheme);

  const plan = useMemo(() => computeTodayPlan(), [rev]);
  const stats = useMemo(() => overallStats(), [rev]);

  useEffect(() => { applyTheme(theme); }, [theme]);

  // El guardado en la nube se engancha una sola vez: al abrir baja el progreso
  // de la cuenta y luego sube cada cambio. En modo invitado no hace nada.
  useEffect(() => { startCloud(subscribe); }, []);

  // Al cambiar de pantalla, volvemos arriba (sin brincos bruscos).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
  }, [route.name, route.params.join("/")]);

  /* Ningún paso sin contenido llega al ejecutor. Si el temario cambió debajo de
     un identificador guardado, ese paso se cae de la sesión en vez de pintarse
     en blanco y dejar la pantalla atorada. El resumen se agrega aquí, una sola
     vez, cuando queda algo que hacer. */
  const abrirSesion = useCallback((info) => {
    const steps = (info.steps || []).filter(pasoConContenido);
    if (!steps.length) return;
    setRunner({ ...info, seq: ++sesionSeq, steps: steps.concat({ type: "summary" }) });
  }, []);

  /* Orden de la sesión: primero se repasa lo ya sabido, luego se ENSEÑA el
     material nuevo (frente y reverso a la vista, sin calificar), después los
     temas nuevos y al final la práctica. La regla que sostiene todo esto es que
     nada se pregunta antes de haberse explicado.

     Cuando una tarjeta pertenece a un bloque de ampliación cuya lección todavía
     no se ha leído, la lección se inserta JUSTO ANTES de esa tarjeta. Así el
     material nuevo llega explicado y no como una pregunta suelta. */
  const startStudy = useCallback(() => {
    const steps = [];
    const leccionDe = {};
    plan.blockLessons.forEach((bl) => { leccionDe[bl.topicId + "::" + bl.bloque] = bl; });
    const dadas = new Set();

    const conLeccion = (cardId, empuja) => {
      const bc = blockOfCard(cardId);
      const key = bc ? bc.topic.id + "::" + bc.block.nombre : null;
      const bl = key && !dadas.has(key) ? leccionDe[key] : null;
      if (bl) {
        dadas.add(key);
        steps.push({ type: "lesson", topic: bl.topic, bloque: bl.bloque, leccion: bl.leccion });
      }
      empuja();
    };

    plan.reviewCards.forEach((rc) => conLeccion(rc.cardId, () =>
      steps.push({ type: "review", cardId: rc.cardId, topicId: rc.topicId })));
    plan.learnCards.forEach((lc) => conLeccion(lc.cardId, () =>
      steps.push({ type: "learn", cardId: lc.cardId, topicId: lc.topicId })));
    plan.newTopics.forEach((t) => {
      steps.push({ type: "intro", topic: t });
      // Solo el bloque base: es lo que acaba de explicar la nota. Las
      // ampliaciones del tema llegan escalonadas en los días siguientes.
      const base = t.blocks && t.blocks.length ? cardsOfBlock(t.id, t.blocks[0]) : cardsForTopic(t.id);
      base.forEach((cid) => steps.push({ type: "learn", cardId: cid, topicId: t.id, isNew: true }));
    });

    /* Lecciones de bloques que no tienen tarjetas donde engancharse —los de
       `formato` y `refuerzo` solo traen reactivos—. Van antes de la práctica
       porque es justo su banco el que abren: si no se emitieran aquí, el plan
       las contaría, la sesión no las mostraría y su lección jamás se marcaría
       como leída. */
    plan.blockLessons.forEach((bl) => {
      const key = bl.topicId + "::" + bl.bloque;
      if (dadas.has(key)) return;
      dadas.add(key);
      steps.push({ type: "lesson", topic: bl.topic, bloque: bl.bloque, leccion: bl.leccion });
    });

    plan.quizQuestions.forEach((qq) => steps.push({ type: "quiz", topic: qq.topic, question: qq.question }));
    abrirSesion({ kind: "study", title: "Sesión de hoy", steps });
  }, [plan, abrirSesion]);

  /* Practicar un tema a mano. Los bloques que solo esperan su lección —los que
     traen reactivos y ninguna tarjeta— la reciben aquí mismo y entran a la
     práctica: si no, su banco solo podría abrirse en la sesión del día. */
  const startTopicPractice = useCallback((topic) => {
    const steps = [];
    const banco = availableQuiz(topic).slice();
    pendingLessons(topic).forEach((pl) => {
      steps.push({ type: "lesson", topic, bloque: pl.bloque, leccion: pl.leccion });
      quizOfBlock(topic, pl.block).forEach((q) => banco.push(q));
    });
    banco.forEach((q, i) => steps.push({
      type: "quiz",
      topic,
      question: shuffleOptions(q, topic.id + "|" + i + "|" + Date.now())
    }));
    abrirSesion({ kind: "practice", title: topic.tema, steps });
  }, [abrirSesion]);

  /* Práctica infinita: en los temas con generador, los números cambian en
     cada problema, así que se puede seguir practicando sin repetir. */
  const startTopicDrill = useCallback((topic, n = 10) => {
    const items = buildDrill(topic.id, n);
    if (!items.length) return;
    const steps = items.map((it) => ({ type: "quiz", topic: it.topic, question: it.question }));
    abrirSesion({ kind: "practice", title: topic.tema, steps, drillTopicId: topic.id });
  }, [abrirSesion]);

  /* Repasar las tarjetas de un tema a mano: las que nunca se han visto se
     presentan (paso "aprender") en vez de pedir que las adivines, y las de un
     bloque cuya lección no se ha leído la reciben primero. */
  const startTopicCards = useCallback((topic) => {
    const steps = [];
    const dadas = new Set();
    cardsForTopic(topic.id).forEach((cid) => {
      const bc = blockOfCard(cid);
      if (bc && !isLessonSeen(topic.id, bc.block, bc.index) && !dadas.has(bc.block.nombre)) {
        dadas.add(bc.block.nombre);
        steps.push({ type: "lesson", topic, bloque: bc.block.nombre, leccion: bc.block.leccion });
      }
      steps.push({ type: isLearned(cid) ? "review" : "learn", cardId: cid, topicId: topic.id });
    });
    abrirSesion({ kind: "practice", title: topic.tema, steps });
  }, [abrirSesion]);

  const startMock = useCallback((mock) => setRunner({ seq: ++sesionSeq, kind: "mock", ...mock }), []);
  const closeRunner = useCallback(() => setRunner(null), []);

  const screen = (() => {
    switch (route.name) {
      case "repasar": return <Browse route={route} onPractice={startTopicPractice} onCards={startTopicCards} onDrill={startTopicDrill} />;
      case "simulacro": return <Mock onStart={startMock} />;
      case "progreso": return <Progress plan={plan} stats={stats} />;
      case "info": return <Info />;
      case "cuenta": return <Account />;
      default: return <Today plan={plan} stats={stats} onStart={startStudy} />;
    }
  })();

  const pending = plan.totalSteps;
  /* Hoy y Progreso reparten la pantalla en dos columnas y piden todo el ancho.
     Las demás son listas y texto: se leen mejor en una medida corta. */
  const ancho = route.name === "hoy" || route.name === "progreso";

  return (
    <div className="shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <Masthead active={route.name} pending={pending} streak={stats.streak} theme={theme} onTheme={setTheme} />

      <main className="content" id="contenido">
        <div className={`page route-fade${ancho ? " is-wide" : ""}`} key={route.name}>{screen}</div>
      </main>

      <TabBar active={route.name} pending={pending} />

      {runner && runner.kind === "mock" && <MockRunner key={runner.seq} mock={runner} onExit={closeRunner} />}
      {runner && runner.kind !== "mock" && (
        <SessionRunner
          key={runner.seq}
          session={runner}
          onExit={closeRunner}
          onAgain={runner.drillTopicId ? () => startTopicDrill({ id: runner.drillTopicId, tema: runner.title }) : null}
        />
      )}
    </div>
  );
}

/* La cabecera es la cabecera de un documento: marca, secciones subrayadas y
   los dos controles que hacen falta. No hay barra lateral: el temario se
   consulta a ancho completo y el móvil manda su propia barra abajo. */
function Masthead({ active, pending, streak, theme, onTheme }) {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <a
          className="brand"
          href="#/hoy"
          onClick={(e) => { e.preventDefault(); navigate("hoy"); }}
        >
          <span className="brand-mark"><Icon name="cap" size={17} strokeWidth={1.8} /></span>
          <span className="brand-text">
            <b>ACREDITA-BACH</b>
            <span>Plan de estudio</span>
          </span>
        </a>

        <nav className="mast-nav" aria-label="Secciones">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`mast-item${active === item.id ? " is-active" : ""}`}
              onClick={() => navigate(item.id)}
              aria-current={active === item.id ? "page" : undefined}
            >
              {item.label}
              {item.id === "hoy" && pending > 0 && (
                <span className="mast-count">{pending}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="mast-tools">
          {streak > 0 && (
            <p className="streak" title={`${streak} ${streak === 1 ? "día seguido" : "días seguidos"} de estudio`}>
              <b>{streak}</b> {streak === 1 ? "día seguido" : "días seguidos"}
            </p>
          )}
          <ThemeToggle theme={theme} onChange={onTheme} />
          <AccountButton active={active === "cuenta"} />
        </div>
      </div>
    </header>
  );
}

/* Botón de cuenta en la barra superior (móvil y escritorio). */
function AccountButton({ active }) {
  const user = getActiveUser();
  return (
    <button
      className={`account-btn${active ? " is-active" : ""}`}
      onClick={() => navigate("cuenta")}
      title={user ? `Cuenta: ${user.nombre}` : "Iniciar sesión o crear cuenta"}
      aria-label={user ? `Cuenta de ${user.nombre}` : "Iniciar sesión o crear cuenta"}
    >
      {user ? (
        <span className="avatar avatar-sm">
          {String(user.nombre).trim().charAt(0).toUpperCase()}
        </span>
      ) : (
        <Icon name="user" size={18} />
      )}
      <SyncDot />
    </button>
  );
}

/* Punto de estado del guardado: solo aparece si hay algo que decir. */
function SyncDot() {
  const { modo } = getCloudStatus();
  if (modo === "invitado") return null;
  return <span className={`sync-dot sync-dot-${modo}`} aria-hidden="true" />;
}

function TabBar({ active, pending }) {
  return (
    <nav className="tabbar" aria-label="Secciones">
      {NAV.map((item) => (
        <button
          key={item.id}
          className={`tab${active === item.id ? " is-active" : ""}`}
          onClick={() => navigate(item.id)}
          aria-current={active === item.id ? "page" : undefined}
        >
          <Icon name={item.icon} size={20} />
          <span>{item.label}</span>
          {item.id === "hoy" && pending > 0 && (
            <span className="tab-count" aria-label={`${pending} pendientes`}>{pending}</span>
          )}
        </button>
      ))}
    </nav>
  );
}

const THEMES = [
  { value: "auto", icon: "monitor", label: "Automático" },
  { value: "light", icon: "sun", label: "Claro" },
  { value: "dark", icon: "moon", label: "Oscuro" }
];

function ThemeToggle({ theme, onChange }) {
  const idx = THEMES.findIndex((t) => t.value === theme);
  const current = THEMES[idx < 0 ? 0 : idx];
  const next = THEMES[(idx < 0 ? 0 : idx + 1) % THEMES.length];
  return (
    <button
      className="btn btn-ghost btn-icon"
      onClick={() => onChange(next.value)}
      aria-label={`Tema: ${current.label}. Cambiar a ${next.label.toLowerCase()}`}
      title={`Tema ${current.label.toLowerCase()}`}
    >
      <Icon name={current.icon} size={18} />
    </button>
  );
}
