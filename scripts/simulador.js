// Simulador de un sustentante: sigue el plan del día con el motor real, sobre un
// reloj falso, y responde con una memoria que se olvida como la de una persona.
// Sirve para las pruebas de ausencia, atraso masivo y drenaje del backlog.
import { E, fijarDia, diaSiguiente } from "./harness.js";
export { fijarDia, diaSiguiente };

/** PRNG determinista, para que una simulación se repita igual. */
export function rngSim(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Probabilidad de acordarse de una tarjeta: cae con el retraso respecto a su intervalo. */
function pRecuerdo(card, hoy) {
  const ultimo = card.lastReview ? E.fromISO(card.lastReview) : E.fromISO(card.due);
  const pasados = Math.max(0, E.daysBetween(ultimo, hoy));
  const s = Math.max(1, card.interval || 1);
  return Math.min(0.98, 0.92 * Math.pow(0.88, Math.max(0, pasados - s) / s + 0) * Math.pow(0.97, Math.max(0, pasados - s)));
}

/**
 * Hace la sesión de hoy completa con el ejecutor del motor (o el paso a paso
 * clásico si el plan aún no trae `steps`). Devuelve un resumen de lo hecho.
 */
export function estudiarHoy(rng, { extra = false, abandonarEn = Infinity, precision = 0.72 } = {}) {
  const plan = E.computeTodayPlan(extra ? { extra: true } : undefined);
  const hoy = E.todayDate();
  const pasos = plan.steps;
  const hecho = { pasos: 0, repasos: 0, aprendidas: 0, temas: 0, lecciones: 0, quiz: 0, plan };
  const cola = pasos.slice();
  let i = 0;
  const reencolados = {};
  while (i < cola.length) {
    if (hecho.pasos >= abandonarEn) break;
    const p = cola[i++];
    hecho.pasos++;
    if (p.type === "review") {
      const c = E.STATE.cards[p.cardId];
      const pr = pRecuerdo(c, hoy);
      const q = rng() < pr ? (rng() < 0.8 ? 2 : 1) : 0;
      if (p.check) E.recallCheck(p.cardId, q); else { E.gradeCard(p.cardId, q); hecho.repasos++; }
      if (q === 0 && (reencolados[p.cardId] || 0) < 2) {
        reencolados[p.cardId] = (reencolados[p.cardId] || 0) + 1;
        cola.splice(Math.min(cola.length, i + 5), 0, { type: "review", cardId: p.cardId, topicId: p.topicId, check: true });
      }
    } else if (p.type === "learn") { E.learnCard(p.cardId); hecho.aprendidas++; }
    else if (p.type === "lesson") { E.markLessonSeen(p.topic.id, p.bloque); hecho.lecciones++; }
    else if (p.type === "intro") { E.introduceTopic(p.topic.id); hecho.temas++; }
    else if (p.type === "quiz") { E.recordQuizAnswer(p.topic.id, rng() < precision, p.question); hecho.quiz++; }
  }
  return hecho;
}

export function vencidasHoy() {
  const hoy = E.toISO(E.todayDate());
  return Object.keys(E.STATE.cards).filter((id) => E.STATE.cards[id].due <= hoy && E.flashcardOf(id) && E.isLearned(id) && E.isIntroduced(id.split("::")[0])).length;
}
