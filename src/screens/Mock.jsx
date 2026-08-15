import { useMemo } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Card, Badge, SectionTitle, Reveal, useToast } from "../ui/kit.jsx";
import { useEngine } from "../lib/hooks.js";
import { areaVisual } from "../lib/areas.js";
import { buildMockExam, countMockQuestions, mockMinutes, SESSION_META } from "../lib/engine.js";

const OPTIONS = [
  {
    key: "quick",
    icon: "sparkles",
    title: "Repaso relámpago",
    desc: "20 preguntas mezcladas de todo lo que ya viste. Ideal para un rato libre.",
    areas: [1, 2, 3, 4, 5, 6, 7],
    onlyIntroduced: true,
    limit: 20,
    tag: "≈ 10 min"
  },
  {
    key: "s1intro",
    icon: "target",
    title: "Sesión 1 · solo lo que has visto",
    desc: "Pensamiento matemático, cultura digital, conciencia histórica y humanidades.",
    areas: [1, 2, 3, 4],
    onlyIntroduced: true,
    tag: "adaptado a tu avance"
  },
  {
    key: "s2intro",
    icon: "target",
    title: "Sesión 2 · solo lo que has visto",
    desc: "Ciencias naturales, lengua y comunicación, y ciencias sociales.",
    areas: [5, 6, 7],
    onlyIntroduced: true,
    tag: "adaptado a tu avance"
  },
  {
    key: "s1full",
    icon: "simulacro",
    title: "Sesión 1 completa",
    desc: "Como el examen real: mismo número de reactivos por área, con cronómetro, e incluye temas que quizá todavía no estudias.",
    areas: [1, 2, 3, 4],
    onlyIntroduced: false,
    tag: "92 reactivos · 4 h 30 min con reloj"
  },
  {
    key: "s2full",
    icon: "simulacro",
    title: "Sesión 2 completa",
    desc: "Como el examen real: mismo número de reactivos por área, con cronómetro, e incluye temas que quizá todavía no estudias.",
    areas: [5, 6, 7],
    onlyIntroduced: false,
    tag: "88 reactivos · 4 h con reloj"
  }
];

export default function Mock({ onStart }) {
  const rev = useEngine();
  const toast = useToast();

  const counts = useMemo(
    () => Object.fromEntries(OPTIONS.map((o) => [o.key, countMockQuestions(o.areas, o.onlyIntroduced)])),
    [rev]
  );

  const start = (o) => {
    const questions = buildMockExam(o.areas, o.onlyIntroduced, o.limit);
    if (!questions.length) {
      toast("Aún no hay preguntas disponibles para esta opción", { tone: "danger", icon: "alert" });
      return;
    }
    /* El cronómetro solo corre en los simulacros completos: en los parciales,
       que se adaptan a lo que ya estudiaste, un reloj del examen real no mide
       nada. */
    const minutes = o.onlyIntroduced ? 0 : mockMinutes(o.areas);
    onStart({ title: o.title, questions, minutes });
  };

  return (
    <div className="stack">
      <SectionTitle hint="Mismo formato del examen real: opción múltiple con tres respuestas y sin retroalimentación hasta el final.">
        Simulacros
      </SectionTitle>

      <Reveal>
        <Card className="card-flat">
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span className="mock-icon"><Icon name="info" size={20} /></span>
            <div>
              <p className="muted" style={{ margin: 0 }}>
                El examen se aplica en <strong>dos sesiones</strong>: {SESSION_META[1]?.reactivos || 92} reactivos
                en {SESSION_META[1]?.duracion || "4 h 30 min"} y {SESSION_META[2]?.reactivos || 88} en {SESSION_META[2]?.duracion || "4 h"}.
                El porcentaje que ves aquí es una referencia de estudio, no el Índice Ceneval oficial.
              </p>
            </div>
          </div>
        </Card>
      </Reveal>

      {OPTIONS.map((o, i) => {
        const available = counts[o.key] || 0;
        const shown = o.limit ? Math.min(available, o.limit) : available;
        const disabled = available === 0;
        return (
          <Reveal key={o.key} delay={60 + i * 45}>
            <Card className="mock-card">
              <div className="mock-head">
                <span className="mock-icon"><Icon name={o.icon} size={20} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mock-title">{o.title}</div>
                  <p className="mock-desc">{o.desc}</p>
                  <div className="mock-tags">
                    <Badge tone={disabled ? "neutral" : "brand"}>
                      {disabled ? "sin preguntas aún" : `${shown} ${shown === 1 ? "pregunta" : "preguntas"}`}
                    </Badge>
                    <Badge>{o.tag}</Badge>
                    {o.areas.length <= 4 && o.areas.map((a) => (
                      <Badge key={a}>
                        <span className="topic-dot" style={{ "--c": areaVisual(a).color, width: 6, height: 6, boxShadow: "none" }} />
                        {areaVisual(a).short}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                variant={i === 0 ? "primary" : "solid"}
                block
                icon="play"
                disabled={disabled}
                onClick={() => start(o)}
              >
                {disabled ? "Estudia algunos temas primero" : "Comenzar"}
              </Button>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
