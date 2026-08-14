import { Fragment } from "react";

/* Formato ligero del contenido: **negritas** y saltos de línea.
   Devuelve nodos de React, así que nunca se inyecta HTML del temario. */
export function RichText({ children, className = "", as: Tag = "div" }) {
  const source = String(children == null ? "" : children);
  const paragraphs = source.split(/\n{2,}/);
  return (
    <Tag className={`rich ${className}`}>
      {paragraphs.map((para, pi) => (
        <p key={pi}>
          {para.split("\n").map((line, li, arr) => (
            <Fragment key={li}>
              {bold(line)}
              {li < arr.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      ))}
    </Tag>
  );
}

/** Versión en línea (sin párrafos), para preguntas y opciones. */
export function Inline({ children }) {
  const source = String(children == null ? "" : children);
  return (
    <>
      {source.split("\n").map((line, i, arr) => (
        <Fragment key={i}>
          {bold(line)}
          {i < arr.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

function bold(line) {
  const parts = line.split(/\*\*(.+?)\*\*/g);
  return parts.map((chunk, i) => (i % 2 === 1 ? <strong key={i}>{chunk}</strong> : <Fragment key={i}>{chunk}</Fragment>));
}
