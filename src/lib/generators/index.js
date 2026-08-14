/* ============================================================
   Registro de generadores de reactivos

   Un generador convierte un tema en una fuente infinita de problemas:
   los números cambian en cada intento, pero la estructura y el nivel se
   mantienen. Se usan en el repaso diario, en los simulacros y en el modo
   de práctica infinita.

   generateQuestion() reintenta varias veces porque los generadores pueden
   devolver null cuando la combinación de números no cumple los criterios
   (opciones repetidas, resultados no enteros, divisiones entre cero...).
   ============================================================ */

import { makeRng, helpers, hashSeed, randomSeed } from "../rng.js";
import { MATH_GENERATORS } from "./math.js";
import { SCIENCE_GENERATORS } from "./science.js";

const REGISTRY = Object.assign({}, MATH_GENERATORS, SCIENCE_GENERATORS);

export const GENERATED_TOPIC_IDS = Object.keys(REGISTRY);

export function hasGenerator(topicId) {
  return Object.prototype.hasOwnProperty.call(REGISTRY, topicId);
}

const MAX_INTENTOS = 40;

/**
 * Genera un reactivo para un tema.
 * @param {string} topicId
 * @param {number|string} [seed] semilla; con la misma semilla sale el mismo problema.
 * @returns {{q, options, correct, explanation, generated, seed}|null}
 */
export function generateQuestion(topicId, seed) {
  const fns = REGISTRY[topicId];
  if (!fns || !fns.length) return null;
  const base = seed === undefined ? randomSeed() : typeof seed === "number" ? seed : hashSeed(seed);

  for (let intento = 0; intento < MAX_INTENTOS; intento++) {
    const rng = makeRng((base + intento * 7919) >>> 0);
    const h = helpers(rng);
    const fn = fns[Math.floor(rng() * fns.length)];
    let out = null;
    try {
      out = fn(h);
    } catch (e) {
      out = null;
    }
    if (!valid(out)) continue;
    return {
      q: out.q,
      options: out.options,
      correct: out.correct,
      explanation: out.explanation,
      generated: true,
      seed: (base + intento * 7919) >>> 0
    };
  }
  return null;
}

/** Varios reactivos distintos del mismo tema (para la práctica infinita). */
export function generateSet(topicId, n, seed) {
  const base = seed === undefined ? randomSeed() : typeof seed === "number" ? seed : hashSeed(seed);
  const out = [];
  const vistos = new Set();
  for (let i = 0; out.length < n && i < n * 12; i++) {
    const q = generateQuestion(topicId, (base + i * 104729) >>> 0);
    if (!q) break;
    if (vistos.has(q.q)) continue;
    vistos.add(q.q);
    out.push(q);
  }
  return out;
}

/** Comprobación de que el reactivo cumple el formato del examen. */
export function valid(out) {
  if (!out || typeof out !== "object") return false;
  if (typeof out.q !== "string" || out.q.length < 10) return false;
  if (!Array.isArray(out.options) || out.options.length !== 3) return false;
  if (!out.options.every((o) => typeof o === "string" && o.length > 0)) return false;
  if (new Set(out.options).size !== 3) return false;
  if (typeof out.correct !== "number" || out.correct < 0 || out.correct > 2) return false;
  if (typeof out.explanation !== "string" || out.explanation.length < 10) return false;
  const texto = out.q + " " + out.options.join(" ") + " " + out.explanation;
  if (/NaN|undefined|Infinity|\{n\}|\{a\}|\{b\}|\{r\}/.test(texto)) return false;
  return true;
}
