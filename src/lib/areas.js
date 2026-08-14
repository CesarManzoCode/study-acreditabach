/* Identidad visual de cada área: color base, color de apoyo para los degradados
   y una etiqueta corta. Los nombres y el número de reactivos siguen viniendo de
   data/meta.js (AREA_META), que es la fuente de verdad del contenido. */

import { AREA_META } from "./engine.js";

const VISUALS = {
  1: { from: "#6366f1", to: "#818cf8", emoji: "∑" },
  2: { from: "#06b6d4", to: "#22d3ee", emoji: "⌘" },
  3: { from: "#f59e0b", to: "#fbbf24", emoji: "⌛" },
  4: { from: "#a855f7", to: "#c084fc", emoji: "✒" },
  5: { from: "#10b981", to: "#34d399", emoji: "⚗" },
  6: { from: "#f43f5e", to: "#fb7185", emoji: "¶" },
  7: { from: "#84cc16", to: "#a3e635", emoji: "◎" }
};

const FALLBACK = { from: "#6366f1", to: "#818cf8", emoji: "•" };

export function areaVisual(areaNum) {
  const v = VISUALS[areaNum] || FALLBACK;
  const meta = AREA_META[areaNum] || {};
  return {
    ...v,
    color: meta.color || v.from,
    gradient: `linear-gradient(135deg, ${v.from}, ${v.to})`,
    name: meta.name || `Área ${areaNum}`,
    short: meta.short || `Área ${areaNum}`,
    reactivos: meta.reactivos || 0,
    session: meta.session || 1
  };
}

/** Variables CSS que colorean una tarjeta o pastilla según su área. */
export function areaStyle(areaNum) {
  const v = areaVisual(areaNum);
  return { "--c": v.from, "--c2": v.to };
}

export function masteryLabel(m) {
  if (m >= 75) return { text: "Dominado", tone: "success" };
  if (m >= 40) return { text: "En progreso", tone: "warn" };
  return { text: "Aprendiendo", tone: "danger" };
}
