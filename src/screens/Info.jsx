import { useState, useMemo } from "react";
import Icon from "../ui/Icon.jsx";
import { Card, Badge, SectionTitle, Reveal, Stat } from "../ui/kit.jsx";
import { areaVisual } from "../lib/areas.js";
import Figura from "../ui/Figura.jsx";
import {
  INFO_SECTIONS, BIBLIOGRAFIA, NOTA_BIBLIOGRAFIA, SESSION_META, TOTAL_REACTIVOS,
  TOTAL_FISICOS, EXAM_DATE, areaNumbers, fmtDateLong
} from "../lib/engine.js";

export default function Info() {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const sections = useMemo(() => INFO_SECTIONS || [], []);

  return (
    <div className="stack">
      <SectionTitle hint="Lo que dice la guía oficial del sustentante (Ceneval, junio 2026), organizado para consulta rápida. Confirma siempre fechas y requisitos en ceneval.edu.mx: cambian por convocatoria.">
        Guía del examen
      </SectionTitle>

      <Reveal>
        <Card>
          <div className="stats">
            <Stat value={TOTAL_REACTIVOS} label="reactivos que puntúan" />
            <Stat value={TOTAL_FISICOS} label="reactivos que contestas" tone="brand" />
            <Stat value="1000" label="puntos mínimos por área" tone="success" />
          </div>
          <p className="faint" style={{ textAlign: "center", marginTop: 14, marginBottom: 0 }}>
            180 cuentan para tu calificación y 25 son piloto: no sabes cuáles y los contestas igual.
            <br />
            Fecha objetivo: {fmtDateLong(EXAM_DATE)}
          </p>
        </Card>
      </Reveal>

      <Reveal delay={60}>
        <Card>
          <h3>Las dos sesiones</h3>
          <div className="stack" style={{ gap: 10 }}>
            {[1, 2].map((s) => {
              const meta = SESSION_META[s];
              if (!meta) return null;
              return (
                <div key={s} className="plan-item" style={{ "--c": "var(--brand)" }}>
                  <span className="plan-item-icon"><Icon name="simulacro" size={18} /></span>
                  <span className="plan-item-body">
                    <b>{meta.name} · {meta.duracion}</b>
                    <span>{meta.areas.map((a) => areaVisual(a).short).join(" · ")}</span>
                    <span className="faint">{meta.reactivos} que puntúan + {meta.piloto} piloto</span>
                  </span>
                  <span className="plan-item-count tnum">{meta.fisicos || meta.reactivos}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </Reveal>

      {sections.map((sec, i) => (
        <Reveal key={sec.id} delay={Math.min(120 + i * 30, 320)}>
          <Card className={`accordion${open.has(sec.id) ? " is-open" : ""}`}>
            <button
              className="accordion-head"
              onClick={() => toggle(sec.id)}
              aria-expanded={open.has(sec.id)}
            >
              <span className="accordion-icon" aria-hidden="true">{sec.icon}</span>
              <span>{sec.title}</span>
              <Icon name="chevronDown" size={18} className="chev" />
            </button>
            <div className="accordion-wrap">
              <div className="accordion-inner">
                {/* Contenido propio del proyecto (data/info.js), no entrada de usuario. */}
                <div className="accordion-body" dangerouslySetInnerHTML={{ __html: sec.html }} />
              </div>
            </div>
          </Card>
        </Reveal>
      ))}

      {/* La hoja se lee con lector óptico y se llena a lápiz: un mal llenado
          puede costar reactivos que sí sabías. Aquí se ve cómo debe quedar. */}
      <Reveal delay={330}>
        <Card className={`accordion${open.has("hoja") ? " is-open" : ""}`}>
          <button className="accordion-head" onClick={() => toggle("hoja")} aria-expanded={open.has("hoja")}>
            <span className="accordion-icon" aria-hidden="true">✏️</span>
            <span>Cómo se llena la hoja de respuestas</span>
            <Icon name="chevronDown" size={18} className="chev" />
          </button>
          <div className="accordion-wrap">
            <div className="accordion-inner">
              <div className="accordion-body">
                <p>
                  El examen es impreso y la hoja se procesa con un <strong>lector óptico</strong>. Así se ve
                  un llenado correcto: el círculo relleno por completo, con presión suficiente, y una sola
                  marca por reactivo.
                </p>
                <Figura spec={{
                  tipo: "hoja",
                  caption: "Llenado correcto: un solo círculo, relleno por completo",
                  filas: [
                    { n: 1, marca: "B" },
                    { n: 2, marca: "A" },
                    { n: 3, marca: "C" }
                  ]
                }} />
                <p>Y así se ve lo que el lector puede no registrar:</p>
                <Figura spec={{
                  tipo: "hoja",
                  caption: "Marcas problemáticas: rellenado a medias (4) y tachada en vez de borrada (5)",
                  filas: [
                    { n: 4, marca: "A", mal: "parcial" },
                    { n: 5, marca: "C", mal: "tachada" }
                  ]
                }} />
                <ul>
                  <li>Usa <strong>exclusivamente lápiz del 2 o 2½</strong>. Con pluma la hoja no se puede corregir y el lector puede fallar.</li>
                  <li>Para cambiar una respuesta, <strong>borra bien</strong> la marca original y rellena el círculo nuevo. No la taches ni la encierres.</li>
                  <li><strong>No dobles ni arrugues</strong> la hoja: el lector la rechaza.</li>
                  <li>No anotes nada más en la hoja. Si necesitas hacer cuentas, hazlas en el <strong>cuadernillo de preguntas</strong>.</li>
                  <li>Verifica siempre que el <strong>número del círculo coincida con el número de la pregunta</strong> que estás contestando. Es el error más caro: si te recorres una fila, pierdes todas las que siguen.</li>
                  <li>Al final, revisa que <strong>no quede ninguna pregunta sin contestar</strong>. No hay penalización por error, así que nunca dejes una en blanco.</li>
                </ul>
                <p className="faint">
                  Esta app no puede reproducir la hoja física. Si puedes, imprime una cuadrícula de 205 filas
                  con tres círculos y practica al menos un simulacro completo pasando tus respuestas a lápiz.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={340}>
        <Card className={`accordion${open.has("biblio") ? " is-open" : ""}`}>
          <button className="accordion-head" onClick={() => toggle("biblio")} aria-expanded={open.has("biblio")}>
            <span className="accordion-icon" aria-hidden="true">📚</span>
            <span>Bibliografía recomendada por área</span>
            <Icon name="chevronDown" size={18} className="chev" />
          </button>
          <div className="accordion-wrap">
            <div className="accordion-inner">
              <div className="accordion-body">
                {areaNumbers().map((a) => {
                  const v = areaVisual(a);
                  return (
                    <div key={a} style={{ marginBottom: 16 }}>
                      <h4 style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
                        <span className="topic-dot" style={{ "--c": v.color }} />
                        {v.name}
                      </h4>
                      <ul>
                        {(BIBLIOGRAFIA[a] || []).map((b, i) =>
                          b.startsWith("—")
                            ? <li key={i} className="faint" style={{ listStyle: "none", marginLeft: "-1.2em" }}>{b}</li>
                            : <li key={i}>{b}</li>
                        )}
                      </ul>
                    </div>
                  );
                })}
                <p className="faint">{NOTA_BIBLIOGRAFIA}</p>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={380}>
        <Card className="card-flat">
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Badge tone="warn" icon="alert">Importante</Badge>
          </div>
          <p className="muted" style={{ marginTop: 10, marginBottom: 0 }}>
            Esta app es una herramienta de estudio independiente: no está afiliada al Ceneval ni avalada por él,
            y no puede garantizar ningún resultado. El temario y este apartado salen de la guía oficial; las
            explicaciones y los reactivos de práctica los redactó la app. Trámites, fechas, requisitos y costos
            se confirman siempre en la convocatoria vigente y en www.ceneval.edu.mx.
          </p>
        </Card>
      </Reveal>
    </div>
  );
}
