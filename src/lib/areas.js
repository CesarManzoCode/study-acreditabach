/* Identidad visual de cada área.

   El examen se acredita ÁREA POR ÁREA: reprobar tres significa volver a
   empezar. Por eso el color de la interfaz está reservado casi por completo
   para las siete áreas (y para el acierto/error de un reactivo): todo lo
   demás es tinta sobre papel. Cuando aparece un color, significa algo.

   El tono concreto vive en CSS (`--a1` … `--a7` en styles.css), que es donde
   se ajusta para el tema claro y el oscuro. Aquí solo se apunta a él, así el
   color de un área nunca queda quemado en el JS con un valor de un solo tema.

   Los nombres y el número de reactivos siguen viniendo de data/meta.js
   (AREA_META), que es la fuente de verdad del contenido. */

import { AREA_META } from "./engine.js";

export function areaVisual(areaNum) {
  const n = Number(areaNum);
  const meta = AREA_META[n] || {};
  const token = n >= 1 && n <= 7 ? `var(--a${n})` : "var(--ink-3)";
  return {
    color: token,
    /* Número del área en dos cifras: así se alinea en las listas del temario,
       igual que la numeración de la guía. */
    num: String(n).padStart(2, "0"),
    name: meta.name || `Área ${n}`,
    short: meta.short || `Área ${n}`,
    reactivos: meta.reactivos || 0,
    session: meta.session || 1
  };
}

/** Variable CSS que colorea la marca de área de una fila o una ficha. */
export function areaStyle(areaNum) {
  const n = Number(areaNum);
  return { "--c": n >= 1 && n <= 7 ? `var(--a${n})` : "var(--ink-3)" };
}

/* Etiquetas del porcentaje interno de estudio.

   Antes decían "Dominado" a partir del 75 %, y eso se leía como "ya lo tengo
   para el examen". No lo es: este porcentaje mide repaso espaciado y aciertos
   en el banco de esta app, y no tiene ninguna equivalencia con el Índice
   Ceneval (700-1300, mínimo 1000 por área), cuya escala no es pública. Las
   etiquetas describen el estado del repaso y nada más, y el umbral alto se
   subió para no dar por cerrado un tema demasiado pronto. */
export function masteryLabel(m) {
  if (m >= 85) return { text: "Firme", tone: "success" };
  if (m >= 50) return { text: "En progreso", tone: "warn" };
  return { text: "Aprendiendo", tone: "danger" };
}
