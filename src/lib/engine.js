/* ============================================================
   ACREDITA-BACH · motor de datos, repetición espaciada y calendario

   IMPORTANTE: el formato guardado (llave `acreditabach_v1`) es exactamente
   el mismo que en la versión anterior del sitio. El rediseño no migra ni
   reescribe nada: el progreso que ya existe en el navegador se sigue
   leyendo igual. Cualquier cambio aquí debe mantener esa compatibilidad.
   ============================================================ */

const STORAGE_KEY = "acreditabach_v1";

/* Fechas del plan (ajusta aquí si el plan cambia) */
export const STUDY_START = new Date(2026, 7, 1);      // 1 de agosto de 2026
export const LAST_STUDY_DAY = new Date(2026, 10, 21); // 21 de noviembre de 2026
export const EXAM_DATE = new Date(2026, 10, 22);      // 22 de noviembre de 2026
const REVIEW_PHASE_DAYS = 12; // últimos N días antes del examen: simulacros + repaso

export function dateOnly(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
export function toISO(d) {
  const dd = dateOnly(d);
  return dd.getFullYear() + "-" + String(dd.getMonth() + 1).padStart(2, "0") + "-" + String(dd.getDate()).padStart(2, "0");
}
export function fromISO(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }
export function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
export function daysBetween(a, b) { return Math.round((dateOnly(b) - dateOnly(a)) / 86400000); }
export function todayDate() { return dateOnly(new Date()); }
function clampDate(d, lo, hi) { return d < lo ? lo : (d > hi ? hi : d); }

export const LEARNING_END = addDays(LAST_STUDY_DAY, -REVIEW_PHASE_DAYS);

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const MESES_CORTO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function fmtDateLong(d) {
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}
export function fmtDateShort(d) {
  return `${d.getDate()} ${MESES_CORTO[d.getMonth()]}`;
}

/* ---------------- Estado persistente ---------------- */

function defaultState() {
  return {
    version: 1,
    cards: {},              // cardId -> {interval, repetitions, ef, due (ISO), lastReview (ISO)}
    topicsIntroduced: {},   // topicId -> ISO date first introduced
    quizStats: {},          // topicId -> {seen, correct}
    learningOrder: null,    // array of topic ids, computed once
    sessionLog: {},         // ISO date -> {cardsReviewed, newTopics, quizAnswered, quizCorrect}
    streak: 0,
    lastStudyDate: null,
    dismissedWelcome: false,
    createdAt: toISO(new Date())
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch (e) {
    console.warn("No se pudo leer el progreso guardado, se reinicia.", e);
    return defaultState();
  }
}

export let STATE = loadState();

/* Suscripción mínima para que React se entere de los cambios del motor. */
const listeners = new Set();
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
let revision = 0;
export function getRevision() { return revision; }

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
  } catch (e) {
    console.warn("No se pudo guardar el progreso.", e);
  }
  revision++;
  listeners.forEach((fn) => fn());
}

export function resetProgress() {
  STATE = defaultState();
  TOPIC_INDEX = null;
  saveState();
}

/** Copia del progreso lista para descargar (respaldo manual). */
export function exportProgress() {
  return JSON.stringify({ app: "acreditabach", exportedAt: new Date().toISOString(), state: STATE }, null, 2);
}

/** Restaura un respaldo creado con exportProgress(). Devuelve true si funcionó. */
export function importProgress(json) {
  try {
    const parsed = JSON.parse(json);
    const incoming = parsed && parsed.state ? parsed.state : parsed;
    if (!incoming || typeof incoming !== "object" || !incoming.cards) return false;
    STATE = Object.assign(defaultState(), incoming);
    TOPIC_INDEX = null;
    saveState();
    return true;
  } catch (e) {
    return false;
  }
}

/* ---------------- Catálogo de temas ---------------- */

/* Los archivos data/*.js son scripts clásicos que declaran los catálogos con
   `const`. Ojo: un `const` de nivel superior NO se vuelve propiedad de window,
   vive en el ámbito léxico global, así que aquí se leen por identificador
   (con guarda `typeof`) y se re-exportan con otro nombre local. */

const _AREA_META = typeof AREA_META !== "undefined" ? AREA_META : {};
const _SESSION_META = typeof SESSION_META !== "undefined" ? SESSION_META : {};
const _INFO_SECTIONS = typeof INFO_SECTIONS !== "undefined" ? INFO_SECTIONS : [];
const _BIBLIOGRAFIA = typeof BIBLIOGRAFIA !== "undefined" ? BIBLIOGRAFIA : {};
const _TOTAL_REACTIVOS = typeof TOTAL_REACTIVOS !== "undefined" ? TOTAL_REACTIVOS : 180;

export {
  _AREA_META as AREA_META,
  _SESSION_META as SESSION_META,
  _INFO_SECTIONS as INFO_SECTIONS,
  _BIBLIOGRAFIA as BIBLIOGRAFIA,
  _TOTAL_REACTIVOS as TOTAL_REACTIVOS
};

export function getAllTopics() {
  const groups = [
    typeof AREA1_TOPICS !== "undefined" ? AREA1_TOPICS : [],
    typeof AREA2_TOPICS !== "undefined" ? AREA2_TOPICS : [],
    typeof AREA3_TOPICS !== "undefined" ? AREA3_TOPICS : [],
    typeof AREA4_TOPICS !== "undefined" ? AREA4_TOPICS : [],
    typeof AREA5_TOPICS !== "undefined" ? AREA5_TOPICS : [],
    typeof AREA6_ES_TOPICS !== "undefined" ? AREA6_ES_TOPICS : [],
    typeof AREA6_EN_TOPICS !== "undefined" ? AREA6_EN_TOPICS : [],
    typeof AREA7_TOPICS !== "undefined" ? AREA7_TOPICS : []
  ];
  return [].concat(...groups);
}

let TOPIC_INDEX = null;
export function topicsById() {
  if (TOPIC_INDEX) return TOPIC_INDEX;
  TOPIC_INDEX = {};
  getAllTopics().forEach((t) => { TOPIC_INDEX[t.id] = t; });
  return TOPIC_INDEX;
}

export function areaNumbers() {
  return Object.keys(AREA_META).map(Number).sort((a, b) => a - b);
}

export function topicsOfArea(areaNum) {
  return getAllTopics().filter((t) => t.area === areaNum);
}

/* Interleaving proporcional: reparte los temas de las 7-8 fuentes
   de manera entrelazada según su peso, en vez de estudiar un área
   completa antes de pasar a la siguiente. */
function buildLearningOrder() {
  const topics = getAllTopics();
  const byArea = {};
  topics.forEach((t) => {
    const key = t.area + (t.lang ? ":" + t.lang : "");
    (byArea[key] = byArea[key] || []).push(t.id);
  });
  const streams = Object.values(byArea);
  // Reparto proporcional (similar a Bresenham): a cada tema le asignamos una
  // posición normalizada dentro de su propia área y ordenamos todo por esa
  // posición para entrelazar las áreas de forma pareja.
  const withKey = [];
  streams.forEach((stream) => {
    stream.forEach((id, i) => {
      withKey.push({ id, key: (i + 0.5) / stream.length });
    });
  });
  withKey.sort((a, b) => a.key - b.key || (a.id > b.id ? 1 : -1));
  return withKey.map((x) => x.id);
}

export function getLearningOrder() {
  const total = getAllTopics().length;
  if (!STATE.learningOrder || STATE.learningOrder.length !== total) {
    STATE.learningOrder = buildLearningOrder();
    saveState();
  }
  return STATE.learningOrder;
}

/* ---------------- Repetición espaciada (SM-2 simplificado, 3 botones) ---------------- */
/* Basado en el algoritmo SM-2 (SuperMemo) usado por Anki, adaptado a 3 niveles
   de respuesta para simplificar la interfaz: 0=otra vez, 1=costó, 2=bien. */

function newCardState() {
  return { interval: 0, repetitions: 0, ef: 2.5, due: toISO(todayDate()), lastReview: null };
}

export function getCard(cardId) {
  if (!STATE.cards[cardId]) STATE.cards[cardId] = newCardState();
  return STATE.cards[cardId];
}

export function gradeCard(cardId, quality) {
  const card = getCard(cardId);
  const today = todayDate();
  if (quality === 0) {
    card.repetitions = 0;
    card.interval = 1;
    card.ef = Math.max(1.3, card.ef - 0.2);
  } else if (quality === 1) {
    card.repetitions += 1;
    card.ef = Math.max(1.3, card.ef - 0.15);
    card.interval = card.repetitions <= 1 ? 1 : Math.max(1, Math.round(card.interval * 1.2));
  } else {
    card.repetitions += 1;
    if (card.repetitions === 1) card.interval = 1;
    else if (card.repetitions === 2) card.interval = 3;
    else card.interval = Math.round(card.interval * card.ef);
    card.ef = card.ef + 0.1;
  }
  card.due = toISO(addDays(today, card.interval));
  card.lastReview = toISO(today);
  saveState();
  return card;
}

/** Texto humano del próximo repaso según la calificación, para mostrar en los botones. */
export function nextIntervalPreview(cardId, quality) {
  const card = STATE.cards[cardId] || newCardState();
  let interval;
  if (quality === 0) {
    interval = 1;
  } else if (quality === 1) {
    const reps = card.repetitions + 1;
    interval = reps <= 1 ? 1 : Math.max(1, Math.round(card.interval * 1.2));
  } else {
    const reps = card.repetitions + 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 3;
    else interval = Math.round(card.interval * card.ef);
  }
  if (interval <= 1) return "mañana";
  if (interval < 30) return `en ${interval} días`;
  const months = Math.round(interval / 30);
  return months <= 1 ? "en 1 mes" : `en ${months} meses`;
}

export function cardsForTopic(topicId) {
  const t = topicsById()[topicId];
  if (!t) return [];
  return t.flashcards.map((fc, i) => topicId + "::fc" + i);
}

/* ---------------- Progreso por tema / área ---------------- */

export function isIntroduced(topicId) { return !!STATE.topicsIntroduced[topicId]; }

export function introduceTopic(topicId) {
  if (!STATE.topicsIntroduced[topicId]) {
    STATE.topicsIntroduced[topicId] = toISO(todayDate());
    cardsForTopic(topicId).forEach((cid) => getCard(cid)); // inicializa tarjetas
    saveState();
  }
}

export function quizStatsFor(topicId) {
  return STATE.quizStats[topicId] || { seen: 0, correct: 0 };
}

export function recordQuizAnswer(topicId, correct) {
  const s = STATE.quizStats[topicId] || { seen: 0, correct: 0 };
  s.seen += 1;
  if (correct) s.correct += 1;
  STATE.quizStats[topicId] = s;
  saveState();
}

export function topicMastery(topicId) {
  if (!isIntroduced(topicId)) return 0;
  const cids = cardsForTopic(topicId);
  const reps = cids.map((cid) => Math.min(5, getCard(cid).repetitions));
  const avgRep = reps.length ? reps.reduce((a, b) => a + b, 0) / reps.length / 5 : 0;
  const qs = quizStatsFor(topicId);
  const acc = qs.seen ? qs.correct / qs.seen : 0.5;
  return Math.round((0.6 * avgRep + 0.4 * acc) * 100);
}

export function areaStats(areaNum) {
  const topics = topicsOfArea(areaNum);
  const introduced = topics.filter((t) => isIntroduced(t.id));
  const coverage = topics.length ? Math.round((introduced.length / topics.length) * 100) : 0;
  const mastery = introduced.length
    ? Math.round(introduced.reduce((sum, t) => sum + topicMastery(t.id), 0) / introduced.length)
    : 0;
  return { total: topics.length, introducedCount: introduced.length, coverage, mastery };
}

export function weakestTopics(n) {
  const introduced = getAllTopics().filter((t) => isIntroduced(t.id));
  return introduced
    .map((t) => ({ topic: t, mastery: topicMastery(t.id) }))
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, n);
}

/* ---------------- Plan de hoy / ritmo adaptativo ---------------- */

export function planPhase(today) {
  if (today < STUDY_START) return "before";
  if (today > LAST_STUDY_DAY) return "after";
  if (today > LEARNING_END) return "review";
  return "learning";
}

export function computeTodayPlan() {
  const rawToday = todayDate();
  const today = clampDate(rawToday, STUDY_START, LAST_STUDY_DAY);
  const phase = planPhase(rawToday);
  const order = getLearningOrder();
  const notIntroduced = order.filter((id) => !isIntroduced(id));

  let quota;
  if (phase === "after") {
    quota = 0;
  } else if (phase === "review") {
    quota = Math.min(3, notIntroduced.length); // por si va atrasado, para no dejar temas fuera
  } else {
    const daysLeft = Math.max(1, daysBetween(today, LEARNING_END) + 1);
    quota = Math.min(8, Math.max(1, Math.ceil(notIntroduced.length / daysLeft)));
    if (notIntroduced.length === 0) quota = 0;
  }
  const newTopics = notIntroduced.slice(0, quota).map((id) => topicsById()[id]).filter(Boolean);

  const todayISO = toISO(rawToday);
  const dueCardEntries = [];
  Object.keys(STATE.cards).forEach((cardId) => {
    const topicId = cardId.split("::")[0];
    if (!isIntroduced(topicId)) return;
    if (newTopics.some((t) => t.id === topicId)) return; // los nuevos se repasan en su propia introducción
    const card = STATE.cards[cardId];
    if (card.due <= todayISO) dueCardEntries.push({ cardId, topicId, due: card.due });
  });
  dueCardEntries.sort((a, b) => (a.due < b.due ? -1 : 1));

  // Quiz de refuerzo: prioriza temas con menor precisión o pocos intentos.
  const eligibleForQuiz = getAllTopics().filter((t) => {
    if (!isIntroduced(t.id)) return false;
    if (newTopics.some((nt) => nt.id === t.id)) return false;
    return true;
  });
  eligibleForQuiz.sort((a, b) => {
    const sa = quizStatsFor(a.id), sb = quizStatsFor(b.id);
    const accA = sa.seen ? sa.correct / sa.seen : -1;
    const accB = sb.seen ? sb.correct / sb.seen : -1;
    return accA - accB;
  });
  const quizTopics = eligibleForQuiz.slice(0, 10);
  const quizQuestions = [];
  quizTopics.forEach((t) => {
    if (t.quiz && t.quiz.length) {
      const idx = quizStatsFor(t.id).seen % t.quiz.length;
      quizQuestions.push({ topic: t, question: t.quiz[idx] });
    }
  });

  const estMinutes = Math.round(dueCardEntries.length * 0.5 + newTopics.length * 6 + quizQuestions.length * 1.2);

  return {
    phase,
    today: rawToday,
    daysToExam: daysBetween(rawToday, EXAM_DATE),
    reviewCards: dueCardEntries,
    newTopics,
    quizQuestions,
    estMinutes,
    behind: phase === "learning" && notIntroduced.length > 0 && daysBetween(today, LEARNING_END) <= 0,
    notIntroducedCount: notIntroduced.length,
    get totalSteps() { return this.reviewCards.length + this.newTopics.length + this.quizQuestions.length; }
  };
}

export function logSessionProgress(patch) {
  const iso = toISO(todayDate());
  const entry = STATE.sessionLog[iso] || { cardsReviewed: 0, newTopics: 0, quizAnswered: 0, quizCorrect: 0 };
  Object.keys(patch).forEach((k) => { entry[k] = (entry[k] || 0) + patch[k]; });
  STATE.sessionLog[iso] = entry;
  if (STATE.lastStudyDate !== iso) {
    const yestISO = toISO(addDays(todayDate(), -1));
    STATE.streak = (STATE.lastStudyDate === yestISO) ? STATE.streak + 1 : 1;
    STATE.lastStudyDate = iso;
  }
  saveState();
}

export function overallStats() {
  const total = getAllTopics().length;
  const introducedCount = Object.keys(STATE.topicsIntroduced).length;
  let totalCardsReviewed = 0, quizAnswered = 0, quizCorrect = 0;
  Object.values(STATE.sessionLog).forEach((e) => {
    totalCardsReviewed += e.cardsReviewed || 0;
    quizAnswered += e.quizAnswered || 0;
    quizCorrect += e.quizCorrect || 0;
  });
  const studyDays = Object.keys(STATE.sessionLog).length;
  const mastered = getAllTopics().filter((t) => isIntroduced(t.id) && topicMastery(t.id) >= 75).length;
  return {
    total,
    introducedCount,
    coverage: total ? Math.round((introducedCount / total) * 100) : 0,
    totalCardsReviewed,
    studyDays,
    streak: STATE.streak,
    mastered,
    accuracy: quizAnswered ? Math.round((quizCorrect / quizAnswered) * 100) : null,
    quizAnswered
  };
}

/** Actividad de los últimos `days` días, para el mapa de calor de Progreso. */
export function activityCalendar(days = 84) {
  const out = [];
  const today = todayDate();
  for (let i = days - 1; i >= 0; i--) {
    const d = addDays(today, -i);
    const iso = toISO(d);
    const e = STATE.sessionLog[iso];
    const load = e ? (e.cardsReviewed || 0) + (e.newTopics || 0) * 3 + (e.quizAnswered || 0) : 0;
    out.push({ date: d, iso, load, entry: e || null });
  }
  return out;
}

/** Cuántas tarjetas vencen cada uno de los próximos `days` días. */
export function upcomingLoad(days = 14) {
  const today = todayDate();
  const buckets = [];
  for (let i = 0; i < days; i++) buckets.push({ date: addDays(today, i), count: 0 });
  const todayISO = toISO(today);
  Object.keys(STATE.cards).forEach((cardId) => {
    const topicId = cardId.split("::")[0];
    if (!isIntroduced(topicId)) return;
    const due = STATE.cards[cardId].due;
    if (due <= todayISO) { buckets[0].count++; return; }
    const idx = daysBetween(today, fromISO(due));
    if (idx >= 0 && idx < days) buckets[idx].count++;
  });
  return buckets;
}

/* ---------------- Simulacros ---------------- */

export function buildMockExam(areaNums, onlyIntroduced, limit) {
  const topics = getAllTopics().filter(
    (t) => areaNums.includes(t.area) && (!onlyIntroduced || isIntroduced(t.id)) && t.quiz && t.quiz.length
  );
  let items = topics.map((t, i) => ({
    topic: t,
    question: t.quiz[(i + Math.floor(Math.random() * t.quiz.length)) % t.quiz.length]
  }));
  if (limit && items.length > limit) items = shuffle(items).slice(0, limit);
  return items;
}

/** Cuántas preguntas tendría un simulacro con esos filtros. */
export function countMockQuestions(areaNums, onlyIntroduced) {
  return getAllTopics().filter(
    (t) => areaNums.includes(t.area) && (!onlyIntroduced || isIntroduced(t.id)) && t.quiz && t.quiz.length
  ).length;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------- Búsqueda ---------------- */

function normalize(s) {
  return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function searchTopics(query, limit = 40) {
  const q = normalize(query).trim();
  if (q.length < 2) return [];
  const words = q.split(/\s+/);
  const results = [];
  getAllTopics().forEach((t) => {
    const hayTema = normalize(t.tema);
    const haySub = normalize(t.subarea);
    const hayNote = normalize(t.note);
    let score = 0;
    for (const w of words) {
      if (hayTema.startsWith(w)) score += 10;
      else if (hayTema.includes(w)) score += 6;
      else if (haySub.includes(w)) score += 3;
      else if (hayNote.includes(w)) score += 1;
      else { score = -1; break; }
    }
    if (score > 0) results.push({ topic: t, score });
  });
  results.sort((a, b) => b.score - a.score || a.topic.id.localeCompare(b.topic.id));
  return results.slice(0, limit).map((r) => r.topic);
}
