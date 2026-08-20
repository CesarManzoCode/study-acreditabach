import { useMemo } from "react";
import { Button, Badge, PageHead, Section, Sheet, useToast } from "../ui/kit.jsx";
import { useEngine } from "../lib/hooks.js";
import { buildMockExam, countMockQuestions, mockMinutes, SESSION_META } from "../lib/engine.js";

/* Pantalla Simulacro.

   Hay dos cosas distintas aquí y antes se veían iguales: la práctica que se
   adapta a lo que ya estudiaste y la simulación de la jornada real, con su
   carga física y su reloj. Se separan en dos grupos porque se usan en momentos
   distintos del plan, y las completas pesan más porque son las que de verdad
   entrenan el examen. */

const OPTIONS = [
  {
    key: "quick",
    grupo: "adaptado",
    title: "Repaso relámpago",
    desc: "20 reactivos mezclados de todo lo que ya viste. Ideal para un rato libre.",
    areas: [1, 2, 3, 4, 5, 6, 7],
    onlyIntroduced: true,
    limit: 20,
    tag: "≈ 10 min"
  },
  {
    key: "s1intro",
    grupo: "adaptado",
    title: "Sesión 1 · solo lo que has visto",
    desc: "Pensamiento matemático, cultura digital, conciencia histórica y humanidades.",
    areas: [1, 2, 3, 4],
    onlyIntroduced: true,
    tag: "adaptado a tu avance"
  },
  {
    key: "s2intro",
    grupo: "adaptado",
    title: "Sesión 2 · solo lo que has visto",
    desc: "Ciencias naturales, lengua y comunicación, y ciencias sociales.",
    areas: [5, 6, 7],
    onlyIntroduced: true,
    tag: "adaptado a tu avance"
  },
  {
    key: "s1full",
    grupo: "completo",
    title: "Sesión 1 completa",
    desc: "La carga real de ese día: 92 reactivos que puntúan más el bloque de 14 piloto que también hay que contestar. No sabrás cuáles son los piloto, igual que en la sede.",
    areas: [1, 2, 3, 4],
    onlyIntroduced: false,
    tag: "106 reactivos · 4 h 30 min con reloj"
  },
  {
    key: "s2full",
    grupo: "completo",
    title: "Sesión 2 completa",
    desc: "La carga real de ese día: 88 reactivos que puntúan más el bloque de 11 piloto que también hay que contestar. No sabrás cuáles son los piloto, igual que en la sede.",
    areas: [5, 6, 7],
    onlyIntroduced: false,
    tag: "99 reactivos · 4 h con reloj"
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
      toast("Aún no hay reactivos disponibles para esta opción", { tone: "danger", icon: "alert" });
      return;
    }
    /* El cronómetro solo corre en los simulacros completos: en los parciales,
       que se adaptan a lo que ya estudiaste, un reloj del examen real no mide
       nada. */
    const minutes = o.onlyIntroduced ? 0 : mockMinutes(o.areas);
    onStart({ title: o.title, questions, minutes });
  };

  const fila = (o, destacado) => {
    const available = counts[o.key] || 0;
    const shown = o.limit ? Math.min(available, o.limit) : available;
    const disabled = available === 0;
    return (
      <div key={o.key} className={`mock-row${destacado ? " is-full" : ""}`}>
        <div>
          <h3>{o.title}</h3>
          <p>{o.desc}</p>
          <div className="mock-tags">
          <Badge tone={disabled ? "neutral" : "accent"}>
            {disabled ? "sin reactivos aún" : `${shown} ${shown === 1 ? "reactivo" : "reactivos"}`}
          </Badge>
          <Badge>{o.tag}</Badge>
          </div>
        </div>
        <Button
          variant={destacado ? "primary" : "solid"}
          icon="play"
          disabled={disabled}
          onClick={() => start(o)}
        >
          {disabled ? "Estudia algunos temas primero" : "Comenzar"}
        </Button>
      </div>
    );
  };

  return (
    <>
      <PageHead title="Simulacros">
        Opción múltiple con tres respuestas y sin retroalimentación hasta el final, como en el examen.
        Lo que no se puede simular aquí son las imágenes impresas del cuadernillo ni la hoja de lector óptico.
      </PageHead>

      <Sheet tone="quiet" style={{ marginBottom: 30 }}>
        <p style={{ maxWidth: "72ch" }}>
          El examen se aplica en <strong>dos sesiones</strong> el mismo día, con receso de hora y media.
          Se contestan <strong>{SESSION_META[1]?.fisicos || 106} reactivos</strong> en {SESSION_META[1]?.duracion || "4 h 30 min"}
          {" "}y <strong>{SESSION_META[2]?.fisicos || 99}</strong> en {SESSION_META[2]?.duracion || "4 h"}: 205 en total,
          de los cuales <strong>180 puntúan</strong> y 25 son piloto. Los simulacros completos usan esa cuenta física,
          que es la que marca el ritmo por reactivo.
        </p>
        <p className="faint" style={{ maxWidth: "72ch", marginTop: 8 }}>
          El porcentaje que ves al terminar es una referencia de estudio: no es el Índice Ceneval ni se convierte a él.
        </p>
      </Sheet>

      <Section
        title="Práctica adaptada a tu avance"
        note="Solo pregunta temas que ya estudiaste. Sin reloj: aquí lo que se mide es el recuerdo, no el ritmo."
      >
        {OPTIONS.filter((o) => o.grupo === "adaptado").map((o) => fila(o, false))}
      </Section>

      <Section
        title="La jornada completa"
        note="Todo el temario del área, con la carga física y el reloj del día del examen. Reserva la tarde."
      >
        {OPTIONS.filter((o) => o.grupo === "completo").map((o) => fila(o, true))}
      </Section>
    </>
  );
}
