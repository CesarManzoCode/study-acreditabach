import { useState, useMemo } from "react";
import Icon from "../ui/Icon.jsx";
import { Card, Badge, SectionTitle, Reveal, Stat } from "../ui/kit.jsx";
import { areaVisual } from "../lib/areas.js";
import {
  INFO_SECTIONS, BIBLIOGRAFIA, SESSION_META, TOTAL_REACTIVOS, EXAM_DATE,
  areaNumbers, fmtDateLong
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
      <SectionTitle hint="Todo lo que dice la guía oficial del sustentante (Ceneval, junio 2026), organizado para consulta rápida.">
        Guía del examen
      </SectionTitle>

      <Reveal>
        <Card>
          <div className="stats">
            <Stat value={TOTAL_REACTIVOS} label="reactivos en total" />
            <Stat value="2" label="sesiones de examen" tone="brand" />
            <Stat value="1000" label="puntos mínimos por área" tone="success" />
          </div>
          <p className="faint" style={{ textAlign: "center", marginTop: 14, marginBottom: 0 }}>
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
                  </span>
                  <span className="plan-item-count tnum">{meta.reactivos}</span>
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
                        {(BIBLIOGRAFIA[a] || []).map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  );
                })}
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
            Este sitio es una herramienta de estudio independiente. Los trámites, fechas y costos oficiales
            siempre se confirman en la guía y el portal del Ceneval.
          </p>
        </Card>
      </Reveal>
    </div>
  );
}
