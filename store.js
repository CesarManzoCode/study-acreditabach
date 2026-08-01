/* ============================================================
   ACREDITA-BACH · motor de datos, repetición espaciada y calendario
   Sin dependencias externas. Todo vive en localStorage.
   ============================================================ */

const STORAGE_KEY = "acreditabach_v1";

/* Fechas del plan (ajusta aquí si el plan cambia) */
const STUDY_START = new Date(2026, 7, 1);   // 1 de agosto de 2026
const LAST_STUDY_DAY = new Date(2026, 10, 21); // 21 de noviembre de 2026
const EXAM_DATE = new Date(2026, 10, 22);   // 22 de noviembre de 2026
const REVIEW_PHASE_DAYS = 12; // últimos N días antes del examen: enfocados en simulacros + repaso

function dateOnly(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function toISO(d) {
  const dd = dateOnly(d);
  return dd.getFullYear() + "-" + String(dd.getMonth() + 1).padStart(2, "0") + "-" + String(dd.getDate()).padStart(2, "0");
}
function fromISO(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function daysBetween(a, b) { return Math.round((dateOnly(b) - dateOnly(a)) / 86400000); }
function todayDate() { return dateOnly(new Date()); }
function clampDate(d, lo, hi) { return d < lo ? lo : (d > hi ? hi : d); }

const LEARNING_END = addDays(LAST_STUDY_DAY, -REVIEW_PHASE_DAYS);

function fmtDateLong(d) {
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

/* ---------------- Estado persistente ---------------- */

function defaultState() {
  return {
    version: 1,
    cards: {},              // cardId -> {interval, repetitions, ef, due (ISO), lastReview (ISO)}
    topicsIntroduced: {},   // topicId -> ISO date first introduced
    quizStats: {},          // topicId -> {seen, correct}
    learningOrder: null,    // array of topic ids, computed once
    sessionLog: {},         // ISO date -> {cardsReviewed, newTopics, quizAnswered, quizCorrect, minutes}
    streak: 0,
    lastStudyDate: null,
    dismissedWelcome: false,
    createdAt: toISO(new Date())
  };
}

let STATE = loadState();

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

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
}

function resetProgress() {
  STATE = defaultState();
  saveState();
}

/* ---------------- Catálogo de temas ---------------- */

function getAllTopics() {
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
function topicsById() {
  if (TOPIC_INDEX) return TOPIC_INDEX;
  TOPIC_INDEX = {};
  getAllTopics().forEach(t => { TOPIC_INDEX[t.id] = t; });
  return TOPIC_INDEX;
}

/* Interleaving proporcional: reparte los temas de las 7-8 fuentes
   de manera entrelazada según su peso (núm. de reactivos), en vez
   de estudiar un área completa antes de pasar a la siguiente. */
function buildLearningOrder() {
  const topics = getAllTopics();
  const byArea = {};
  topics.forEach(t => {
    const key = t.area + (t.lang ? ":" + t.lang : "");
    (byArea[key] = byArea[key] || []).push(t.id);
  });
  const streams = Object.values(byArea);
  const total = topics.length;
  // Técnica de reparto proporcional (similar a Bresenham): a cada tema
  // le asignamos una posición normalizada dentro de su propia área y
  // ordenamos todo por esa posición para entrelazar las áreas de forma pareja.
  const withKey = [];
  streams.forEach(stream => {
    stream.forEach((id, i) => {
      withKey.push({ id, key: (i + 0.5) / stream.length });
    });
  });
  withKey.sort((a, b) => a.key - b.key || (a.id > b.id ? 1 : -1));
  return withKey.map(x => x.id);
}

function getLearningOrder() {
  const total = getAllTopics().length;
  if (!STATE.learningOrder || STATE.learningOrder.length !== total) {
    STATE.learningOrder = buildLearningOrder();
    saveState();
  }
  return STATE.learningOrder;
}

/* ---------------- Repetición espaciada (SM-2 simplificado, 3 botones) ---------------- */
/* Basado en el algoritmo SM-2 (SuperMemo) usado por Anki, adaptado a 3 niveles
   de respuesta para simplificar la interfaz: 0=otra vez, 1=costó, 2=bien/fácil. */

function newCardState() {
  return { interval: 0, repetitions: 0, ef: 2.5, due: toISO(todayDate()), lastReview: null };
}

function getCard(cardId) {
  if (!STATE.cards[cardId]) STATE.cards[cardId] = newCardState();
  return STATE.cards[cardId];
}

function gradeCard(cardId, quality) {
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

function cardsForTopic(topicId) {
  const t = topicsById()[topicId];
  if (!t) return [];
  return t.flashcards.map((fc, i) => topicId + "::fc" + i);
}

/* ---------------- Progreso por tema / área ---------------- */

function isIntroduced(topicId) { return !!STATE.topicsIntroduced[topicId]; }

function introduceTopic(topicId) {
  if (!STATE.topicsIntroduced[topicId]) {
    STATE.topicsIntroduced[topicId] = toISO(todayDate());
    cardsForTopic(topicId).forEach(cid => getCard(cid)); // inicializa tarjetas
    saveState();
  }
}

function quizStatsFor(topicId) {
  return STATE.quizStats[topicId] || { seen: 0, correct: 0 };
}

function recordQuizAnswer(topicId, correct) {
  const s = STATE.quizStats[topicId] || { seen: 0, correct: 0 };
  s.seen += 1;
  if (correct) s.correct += 1;
  STATE.quizStats[topicId] = s;
  saveState();
}

function topicMastery(topicId) {
  if (!isIntroduced(topicId)) return 0;
  const cids = cardsForTopic(topicId);
  const reps = cids.map(cid => Math.min(5, getCard(cid).repetitions));
  const avgRep = reps.length ? reps.reduce((a, b) => a + b, 0) / reps.length / 5 : 0;
  const qs = quizStatsFor(topicId);
  const acc = qs.seen ? qs.correct / qs.seen : 0.5;
  return Math.round((0.6 * avgRep + 0.4 * acc) * 100);
}

function areaStats(areaNum) {
  const topics = getAllTopics().filter(t => t.area === areaNum);
  const introduced = topics.filter(t => isIntroduced(t.id));
  const coverage = topics.length ? Math.round((introduced.length / topics.length) * 100) : 0;
  const mastery = introduced.length
    ? Math.round(introduced.reduce((sum, t) => sum + topicMastery(t.id), 0) / introduced.length)
    : 0;
  return { total: topics.length, introducedCount: introduced.length, coverage, mastery };
}

function weakestTopics(n) {
  const introduced = getAllTopics().filter(t => isIntroduced(t.id));
  return introduced
    .map(t => ({ topic: t, mastery: topicMastery(t.id) }))
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, n);
}

/* ---------------- Plan de hoy / ritmo adaptativo ---------------- */

function planPhase(today) {
  if (today < STUDY_START) return "before";
  if (today > LAST_STUDY_DAY) return "after";
  if (today > LEARNING_END) return "review";
  return "learning";
}

function computeTodayPlan() {
  const rawToday = todayDate();
  const today = clampDate(rawToday, STUDY_START, LAST_STUDY_DAY);
  const phase = planPhase(rawToday);
  const order = getLearningOrder();
  const notIntroduced = order.filter(id => !isIntroduced(id));

  let quota;
  if (phase === "after") {
    quota = 0;
  } else if (phase === "review") {
    quota = Math.min(3, notIntroduced.length); // por si va atrasado, mete algunos para no dejar temas fuera
  } else {
    const daysLeft = Math.max(1, daysBetween(today, LEARNING_END) + 1);
    quota = Math.min(8, Math.max(1, Math.ceil(notIntroduced.length / daysLeft)));
    if (notIntroduced.length === 0) quota = 0;
  }
  const newTopics = notIntroduced.slice(0, quota).map(id => topicsById()[id]);

  const todayISO = toISO(rawToday);
  const dueCardEntries = [];
  Object.keys(STATE.cards).forEach(cardId => {
    const topicId = cardId.split("::")[0];
    if (!isIntroduced(topicId)) return;
    if (newTopics.some(t => t.id === topicId)) return; // los nuevos se revisan dentro de su propia introducción
    const card = STATE.cards[cardId];
    if (card.due <= todayISO) dueCardEntries.push({ cardId, topicId, due: card.due });
  });
  dueCardEntries.sort((a, b) => (a.due < b.due ? -1 : 1));

  // Quiz de refuerzo: prioriza temas introducidos hace >=1 día con menor precisión o pocos intentos.
  const eligibleForQuiz = getAllTopics().filter(t => {
    if (!isIntroduced(t.id)) return false;
    if (newTopics.some(nt => nt.id === t.id)) return false;
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
  quizTopics.forEach(t => {
    if (t.quiz && t.quiz.length) {
      const idx = (quizStatsFor(t.id).seen) % t.quiz.length;
      quizQuestions.push({ topic: t, question: t.quiz[idx] });
    }
  });

  const estMinutes = Math.round(dueCardEntries.length * 0.5 + newTopics.length * 6 + quizQuestions.length * 1.2);

  return {
    phase, today: rawToday,
    daysToExam: daysBetween(rawToday, EXAM_DATE),
    reviewCards: dueCardEntries,
    newTopics,
    quizQuestions,
    estMinutes,
    behind: phase === "learning" && notIntroduced.length > 0 && daysBetween(today, LEARNING_END) <= 0,
    notIntroducedCount: notIntroduced.length
  };
}

function logSessionProgress(patch) {
  const iso = toISO(todayDate());
  const entry = STATE.sessionLog[iso] || { cardsReviewed: 0, newTopics: 0, quizAnswered: 0, quizCorrect: 0 };
  Object.keys(patch).forEach(k => { entry[k] = (entry[k] || 0) + patch[k]; });
  STATE.sessionLog[iso] = entry;
  if (STATE.lastStudyDate !== iso) {
    const yestISO = toISO(addDays(todayDate(), -1));
    STATE.streak = (STATE.lastStudyDate === yestISO) ? STATE.streak + 1 : 1;
    STATE.lastStudyDate = iso;
  }
  saveState();
}

function overallStats() {
  const total = getAllTopics().length;
  const introducedCount = Object.keys(STATE.topicsIntroduced).length;
  let totalCardsReviewed = 0, totalMinutesEst = 0;
  Object.values(STATE.sessionLog).forEach(e => { totalCardsReviewed += e.cardsReviewed || 0; });
  const studyDays = Object.keys(STATE.sessionLog).length;
  return { total, introducedCount, coverage: total ? Math.round((introducedCount / total) * 100) : 0, totalCardsReviewed, studyDays, streak: STATE.streak };
}
