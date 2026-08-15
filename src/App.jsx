import { useState, useMemo, useEffect, useCallback } from "react";
import Icon from "./ui/Icon.jsx";
import { ToastProvider } from "./ui/kit.jsx";
import { useEngine, useRoute, navigate, useAccounts, useCloud } from "./lib/hooks.js";
import { getStoredTheme, applyTheme } from "./lib/prefs.js";
import {
  computeTodayPlan, overallStats, cardsForTopic, cardsOfBlock, buildDrill,
  shuffleOptions, subscribe, isLearned, availableQuiz
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
  { id: "repasar", label: "Repasar", icon: "repasar" },
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

  /* Orden de la sesión: primero se repasa lo ya sabido, luego se ENSEÑA el
     material nuevo (frente y reverso a la vista, sin calificar), después los
     temas nuevos y al final la práctica. La regla que sostiene todo esto es que
     nada se pregunta antes de haberse mostrado. */
  const startStudy = useCallback(() => {
    const steps = [];
    plan.reviewCards.forEach((rc) => steps.push({ type: "review", cardId: rc.cardId, topicId: rc.topicId }));
    plan.learnCards.forEach((lc) => steps.push({ type: "learn", cardId: lc.cardId, topicId: lc.topicId }));
    plan.newTopics.forEach((t) => {
      steps.push({ type: "intro", topic: t });
      // Solo el bloque base: es lo que acaba de explicar la nota. Las
      // ampliaciones del tema llegan escalonadas en los días siguientes.
      const base = t.blocks && t.blocks.length ? cardsOfBlock(t.id, t.blocks[0]) : cardsForTopic(t.id);
      base.forEach((cid) => steps.push({ type: "learn", cardId: cid, topicId: t.id, isNew: true }));
    });
    plan.quizQuestions.forEach((qq) => steps.push({ type: "quiz", topic: qq.topic, question: qq.question }));
    if (!steps.length) return;
    steps.push({ type: "summary" });
    setRunner({ seq: ++sesionSeq, kind: "study", title: "Sesión de hoy", steps });
  }, [plan]);

  const startTopicPractice = useCallback((topic) => {
    const steps = availableQuiz(topic).map((q, i) => ({
      type: "quiz",
      topic,
      question: shuffleOptions(q, topic.id + "|" + i + "|" + Date.now())
    }));
    if (!steps.length) return;
    steps.push({ type: "summary" });
    setRunner({ seq: ++sesionSeq, kind: "practice", title: topic.tema, steps });
  }, []);

  /* Práctica infinita: en los temas con generador, los números cambian en
     cada problema, así que se puede seguir practicando sin repetir. */
  const startTopicDrill = useCallback((topic, n = 10) => {
    const items = buildDrill(topic.id, n);
    if (!items.length) return;
    const steps = items.map((it) => ({ type: "quiz", topic: it.topic, question: it.question }));
    steps.push({ type: "summary" });
    setRunner({ seq: ++sesionSeq, kind: "practice", title: topic.tema, steps, drillTopicId: topic.id });
  }, []);

  /* Repasar las tarjetas de un tema a mano: las que nunca se han visto se
     presentan (paso "aprender") en vez de pedir que las adivines. */
  const startTopicCards = useCallback((topic) => {
    const steps = cardsForTopic(topic.id).map((cid) => ({
      type: isLearned(cid) ? "review" : "learn",
      cardId: cid,
      topicId: topic.id
    }));
    if (!steps.length) return;
    steps.push({ type: "summary" });
    setRunner({ seq: ++sesionSeq, kind: "practice", title: topic.tema, steps });
  }, []);

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

  return (
    <div className="shell">
      <Rail active={route.name} pending={pending} streak={stats.streak} theme={theme} onTheme={setTheme} />

      <div className="main">
        <header className="topbar">
          <BrandMark />
          <div className="topbar-spacer" />
          <AccountButton active={route.name === "cuenta"} />
          <ThemeToggle theme={theme} onChange={setTheme} compact />
        </header>

        <main className="content">
          <div className="route-fade" key={route.name}>{screen}</div>
        </main>
      </div>

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

function BrandMark() {
  return (
    <div className="brand">
      <span className="brand-mark"><Icon name="cap" size={18} strokeWidth={1.9} /></span>
      <span className="brand-text">
        <b>ACREDITA-BACH</b>
        <span>Plan de estudio</span>
      </span>
    </div>
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
        <Icon name="user" size={19} />
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

function Rail({ active, pending, streak, theme, onTheme }) {
  return (
    <aside className="rail">
      <BrandMark />

      <nav className="rail-nav" aria-label="Secciones">
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`rail-item${active === item.id ? " is-active" : ""}`}
            onClick={() => navigate(item.id)}
            aria-current={active === item.id ? "page" : undefined}
          >
            <Icon name={item.icon} size={19} />
            {item.label}
            {item.id === "hoy" && pending > 0 && <span className="rail-count tnum">{pending}</span>}
          </button>
        ))}
      </nav>

      <div className="rail-foot">
        <button
          className={`rail-item${active === "cuenta" ? " is-active" : ""}`}
          onClick={() => navigate("cuenta")}
        >
          <Icon name="user" size={19} />
          Cuenta
          <SyncDot />
        </button>
        <div className="rail-streak">
          <Icon name="flame" size={20} />
          <div>
            <b className="tnum">{streak}</b>
            <span>{streak === 1 ? "día seguido" : "días seguidos"}</span>
          </div>
        </div>
        <ThemeToggle theme={theme} onChange={onTheme} />
      </div>
    </aside>
  );
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
          <span className="tab-dot" />
          <Icon name={item.icon} size={21} />
          <span>{item.label}</span>
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

function ThemeToggle({ theme, onChange, compact }) {
  if (compact) {
    const idx = THEMES.findIndex((t) => t.value === theme);
    const current = THEMES[idx < 0 ? 0 : idx];
    const next = THEMES[(idx + 1) % THEMES.length];
    return (
      <button
        className="btn btn-ghost btn-icon"
        onClick={() => onChange(next.value)}
        aria-label={`Tema: ${current.label}. Cambiar a ${next.label.toLowerCase()}`}
        title={`Tema ${current.label.toLowerCase()}`}
      >
        <Icon name={current.icon} size={19} />
      </button>
    );
  }
  return (
    <div className="segmented" role="group" aria-label="Tema de la interfaz">
      {THEMES.map((t) => (
        <button
          key={t.value}
          className={`segmented-item${theme === t.value ? " is-active" : ""}`}
          onClick={() => onChange(t.value)}
          aria-pressed={theme === t.value}
          title={t.label}
        >
          <Icon name={t.icon} size={15} />
          <span className="sr-only">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
