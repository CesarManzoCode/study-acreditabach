import { useState, useMemo, useEffect, useCallback } from "react";
import Icon from "./ui/Icon.jsx";
import { ToastProvider } from "./ui/kit.jsx";
import { useEngine, useRoute, navigate } from "./lib/hooks.js";
import { getStoredTheme, applyTheme } from "./lib/prefs.js";
import { computeTodayPlan, overallStats, cardsForTopic } from "./lib/engine.js";

import Today from "./screens/Today.jsx";
import Browse from "./screens/Browse.jsx";
import Mock from "./screens/Mock.jsx";
import Progress from "./screens/Progress.jsx";
import Info from "./screens/Info.jsx";
import { SessionRunner, MockRunner } from "./screens/Runner.jsx";

const NAV = [
  { id: "hoy", label: "Hoy", icon: "hoy" },
  { id: "repasar", label: "Repasar", icon: "repasar" },
  { id: "simulacro", label: "Simulacro", icon: "simulacro" },
  { id: "progreso", label: "Progreso", icon: "progreso" },
  { id: "info", label: "Guía", icon: "info" }
];

export default function App() {
  return (
    <ToastProvider>
      <Shell />
    </ToastProvider>
  );
}

function Shell() {
  const rev = useEngine();
  const route = useRoute();
  const [runner, setRunner] = useState(null);
  const [theme, setTheme] = useState(getStoredTheme);

  const plan = useMemo(() => computeTodayPlan(), [rev]);
  const stats = useMemo(() => overallStats(), [rev]);

  useEffect(() => { applyTheme(theme); }, [theme]);

  // Al cambiar de pantalla, volvemos arriba (sin brincos bruscos).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
  }, [route.name, route.params.join("/")]);

  const startStudy = useCallback(() => {
    const steps = [];
    plan.reviewCards.forEach((rc) => steps.push({ type: "review", cardId: rc.cardId, topicId: rc.topicId }));
    plan.newTopics.forEach((t) => {
      steps.push({ type: "intro", topic: t });
      cardsForTopic(t.id).forEach((cid) => steps.push({ type: "review", cardId: cid, topicId: t.id, isNew: true }));
    });
    plan.quizQuestions.forEach((qq) => steps.push({ type: "quiz", topic: qq.topic, question: qq.question }));
    if (!steps.length) return;
    steps.push({ type: "summary" });
    setRunner({ kind: "study", title: "Sesión de hoy", steps });
  }, [plan]);

  const startTopicPractice = useCallback((topic) => {
    const steps = topic.quiz.map((q) => ({ type: "quiz", topic, question: q }));
    if (!steps.length) return;
    steps.push({ type: "summary" });
    setRunner({ kind: "practice", title: topic.tema, steps });
  }, []);

  const startTopicCards = useCallback((topic) => {
    const steps = cardsForTopic(topic.id).map((cid) => ({ type: "review", cardId: cid, topicId: topic.id }));
    if (!steps.length) return;
    steps.push({ type: "summary" });
    setRunner({ kind: "practice", title: topic.tema, steps });
  }, []);

  const startMock = useCallback((mock) => setRunner({ kind: "mock", ...mock }), []);
  const closeRunner = useCallback(() => setRunner(null), []);

  const screen = (() => {
    switch (route.name) {
      case "repasar": return <Browse route={route} onPractice={startTopicPractice} onDrill={startTopicCards} />;
      case "simulacro": return <Mock onStart={startMock} />;
      case "progreso": return <Progress plan={plan} stats={stats} />;
      case "info": return <Info />;
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
          <ThemeToggle theme={theme} onChange={setTheme} compact />
        </header>

        <main className="content">
          <div className="route-fade" key={route.name}>{screen}</div>
        </main>
      </div>

      <TabBar active={route.name} pending={pending} />

      {runner && runner.kind === "mock" && <MockRunner mock={runner} onExit={closeRunner} />}
      {runner && runner.kind !== "mock" && <SessionRunner session={runner} onExit={closeRunner} />}
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
