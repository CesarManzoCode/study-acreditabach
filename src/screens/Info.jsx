import { useState, useMemo } from "react";
import Icon from "../ui/Icon.jsx";
import { PageHead, Section, Figures, Figure, Mark } from "../ui/kit.jsx";
import { areaVisual, areaStyle } from "../lib/areas.js";
import Figura from "../ui/Figura.jsx";
import {
  INFO_SECTIONS, BIBLIOGRAFIA, NOTA_BIBLIOGRAFIA, SESSION_META, TOTAL_REACTIVOS,
  TOTAL_FISICOS, EXAM_DATE, areaNumbers, fmtDateLong
} from "../lib/engine.js";

/* Pantalla Guía: material de consulta, no de estudio. Se lee como el índice
   de la guía oficial —secciones numeradas que se abren— porque así es como se
   busca aquí: se viene por un dato concreto, no a leerlo de corrido. */

export default function Info() {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const sections = useMemo(() => INFO_SECTIONS || [], []);

  /* Las secciones del temario más las dos que redacta la app: la hoja de
     respuestas y la bibliografía. Se numeran juntas para que el índice se lea
     como uno solo. */
  const entradas = [
    ...sections.map((sec) => ({ id: sec.id, title: sec.title, html: sec.html })),
    { id: "hoja", title: "Cómo se llena la hoja de respuestas", render: () => <HojaRespuestas /> },
    { id: "biblio", title: "Bibliografía recomendada por área", render: () => <Bibliografia /> }
  ];

  return (
    <>
      <PageHead title="Guía del examen">
        Lo que dice la guía oficial del sustentante (Ceneval, junio 2026), organizado para consulta rápida.
        Confirma siempre fechas y requisitos en ceneval.edu.mx: cambian por convocatoria.
      </PageHead>

      <Figures className="figures-lead">
        <Figure value={TOTAL_REACTIVOS} label="reactivos que puntúan" />
        <Figure value={TOTAL_FISICOS} label="reactivos que contestas" />
        <Figure value="1000" label="puntos mínimos por área" />
        <Figure value="7" label="áreas que se acreditan por separado" />
      </Figures>

      <p className="faint" style={{ margin: "-18px 0 30px" }}>
        Fecha objetivo de este plan: {fmtDateLong(EXAM_DATE)}. La convocatoria manda: confírmala siempre.
      </p>

      <Section
        title="Las dos sesiones"
        note="Se aplican el mismo día, con receso de hora y media. 180 reactivos cuentan para tu calificación y 25 son piloto: no sabes cuáles y los contestas igual."
      >
        <div className="index">
          {[1, 2].map((s) => {
            const meta = SESSION_META[s];
            if (!meta) return null;
            return (
              <div key={s} className="index-row" style={{ cursor: "default" }}>
                <span className="index-num">{String(s).padStart(2, "0")}</span>
                <span className="index-body">
                  <span className="index-name">{meta.name} · {meta.duracion}</span>
                  <span className="index-meta">
                    {meta.areas.map((a) => areaVisual(a).short).join(" · ")}
                  </span>
                </span>
                <span className="index-tail">
                  <span className="index-value">{meta.fisicos || meta.reactivos}</span>
                </span>
              </div>
            );
          })}
        </div>
        <p className="faint" style={{ marginTop: 10 }}>
          {SESSION_META[1]?.reactivos} + {SESSION_META[1]?.piloto} piloto en la primera;
          {" "}{SESSION_META[2]?.reactivos} + {SESSION_META[2]?.piloto} piloto en la segunda.
        </p>
      </Section>

      <Section title="Índice de consulta">
        <div className="toc">
          {entradas.map((sec, i) => (
            <div key={sec.id} className={`toc-item${open.has(sec.id) ? " is-open" : ""}`}>
              <h3>
                <button
                  className="toc-head"
                  onClick={() => toggle(sec.id)}
                  aria-expanded={open.has(sec.id)}
                >
                  <span className="toc-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{sec.title}</span>
                  <Icon name="chevronDown" size={17} className="chev" />
                </button>
              </h3>
              <div className="toc-wrap">
                <div className="toc-inner">
                  <div className="toc-body prose">
                    {sec.render
                      ? sec.render()
                      /* Contenido propio del proyecto (data/info.js), no entrada de usuario. */
                      : <div dangerouslySetInnerHTML={{ __html: sec.html }} />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="nota nota-aviso" style={{ marginTop: 30 }}>
        <Icon name="alert" size={18} />
        <div>
          <h3>Herramienta independiente</h3>
          <p>
            Esta app no está afiliada al Ceneval ni avalada por él, y no puede garantizar ningún resultado.
            El temario y este apartado salen de la guía oficial; las explicaciones y los reactivos de práctica
            los redactó la app. Trámites, fechas, requisitos y costos se confirman siempre en la convocatoria
            vigente y en www.ceneval.edu.mx.
          </p>
        </div>
      </div>
    </>
  );
}

/* La hoja se lee con lector óptico y se llena a lápiz: un mal llenado puede
   costar reactivos que sí sabías. Aquí se ve cómo debe quedar. */
function HojaRespuestas() {
  return (
    <>
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
    </>
  );
}

function Bibliografia() {
  return (
    <>
      {areaNumbers().map((a) => {
        const v = areaVisual(a);
        return (
          <div key={a} style={{ ...areaStyle(a), marginBottom: 18 }}>
            <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Mark />
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
    </>
  );
}
