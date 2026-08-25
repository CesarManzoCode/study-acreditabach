/* ============================================================
   ACREDITA-BACH · motor de datos, repetición espaciada y calendario

   IMPORTANTE — COMPATIBILIDAD DEL PROGRESO
   ----------------------------------------
   El formato guardado sigue siendo exactamente el mismo desde la primera
   versión del sitio, en la llave `acreditabach_v1`. Reglas que no se rompen:

     · Nada se migra, renombra ni reescribe: las llaves que ya existían
       (cards, topicsIntroduced, quizStats, sessionLog, streak…) se leen igual.
     · Las tarjetas se identifican por `temaId::fcN`, donde N es la posición
       de la flashcard. Por eso el contenido nuevo SIEMPRE se agrega al final
       del arreglo: fc0 y fc1 siguen siendo las mismas tarjetas de antes.
     · Cuando el temario SÍ tiene que perder tarjetas, el progreso no se deja
       apuntando a un índice que ya no existe: cada tarjeta guarda la huella
       de su frente (`h`) y se la sigue hasta su nueva posición, o se da de
       baja si su contenido desapareció (ver "El progreso contra un temario
       que cambia"). Sin eso, la sesión pinta pasos en blanco.
     · Las llaves nuevas (contentRevision, contentUpdate, lastQuiz, y la `h`
       de cada tarjeta) son aditivas; una versión vieja del sitio las
       ignoraría sin romperse.
     · Con cuentas creadas, cada una guarda en `acreditabach_v1__<cuenta>`
       y la llave histórica se queda intacta como respaldo.
   ============================================================ */

import { progressKeyFor, getActiveSlug, subscribeAccounts } from "./accounts.js";
import { hasGenerator, generateQuestion, generateSet } from "./generators/index.js";
import { makeRng, hashSeed, randomSeed } from "./rng.js";

/* Se incrementa cuando se agrega contenido nuevo al temario. Al detectar un
   número mayor que el guardado, el motor da de alta las tarjetas nuevas de
   los temas que ya estaban vistos (ver applyContentUpdate). */
export const CONTENT_REVISION = 3;

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

let STORAGE_KEY = progressKeyFor(getActiveSlug());

export function currentStorageKey() { return STORAGE_KEY; }

function defaultState() {
  return {
    version: 1,
    cards: {},              // cardId -> {interval, repetitions, ef, due (ISO), lastReview (ISO)}
    topicsIntroduced: {},   // topicId -> ISO date first introduced
    lessonsSeen: {},        // "topicId::bloque" -> ISO date en que se leyó la lección del bloque
    quizStats: {},          // topicId -> {seen, correct}
    learningOrder: null,    // array of topic ids, computed once
    sessionLog: {},         // ISO date -> {cardsReviewed, newTopics, quizAnswered, quizCorrect}
    streak: 0,
    lastStudyDate: null,
    dismissedWelcome: false,
    createdAt: toISO(new Date()),
    contentRevision: 0,     // revisión del temario ya incorporada a este progreso
    contentUpdate: null,    // {at, newCards} del último crecimiento del temario
    podaAplicada: false,    // ¿ya se migró el progreso tras podar el temario?
    poda: null              // {at, quitadas, movidas} del aviso de la poda
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
function emit() {
  revision++;
  listeners.forEach((fn) => fn());
}

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
  } catch (e) {
    console.warn("No se pudo guardar el progreso.", e);
  }
  emit();
}

/* Al cambiar de cuenta se recarga el progreso de esa cuenta. */
subscribeAccounts(() => {
  const key = progressKeyFor(getActiveSlug());
  if (key === STORAGE_KEY) { emit(); return; }
  STORAGE_KEY = key;
  STATE = loadState();
  applyContentUpdate();
  emit();
});

export function resetProgress() {
  STATE = defaultState();
  STATE.contentRevision = CONTENT_REVISION;
  saveState();
}

/** Reemplaza el progreso completo (lo usan el respaldo manual y la sincronización). */
export function replaceState(next) {
  STATE = Object.assign(defaultState(), next);
  applyContentUpdate();
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
    replaceState(incoming);
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
const _NOTA_BIBLIOGRAFIA = typeof NOTA_BIBLIOGRAFIA !== "undefined" ? NOTA_BIBLIOGRAFIA : "";
const _TOTAL_REACTIVOS = typeof TOTAL_REACTIVOS !== "undefined" ? TOTAL_REACTIVOS : 180;
const _TOTAL_PILOTO = typeof TOTAL_PILOTO !== "undefined" ? TOTAL_PILOTO : 25;
const _TOTAL_FISICOS = typeof TOTAL_FISICOS !== "undefined" ? TOTAL_FISICOS : 205;

export {
  _AREA_META as AREA_META,
  _SESSION_META as SESSION_META,
  _INFO_SECTIONS as INFO_SECTIONS,
  _BIBLIOGRAFIA as BIBLIOGRAFIA,
  _NOTA_BIBLIOGRAFIA as NOTA_BIBLIOGRAFIA,
  _TOTAL_REACTIVOS as TOTAL_REACTIVOS,
  _TOTAL_PILOTO as TOTAL_PILOTO,
  _TOTAL_FISICOS as TOTAL_FISICOS
};

/* Paquetes de contenido adicional (data/extra/*.js, data/extra2/*.js): más
   flashcards y más reactivos por tema. Se CONCATENAN al final de los arreglos
   originales para no mover los índices de las tarjetas que ya tienen progreso.

   Cada paquete forma un BLOQUE dentro del tema. El bloque importa porque marca
   qué se enseña junto: los reactivos de un bloque no se preguntan hasta que sus
   tarjetas ya se estudiaron (ver availableQuiz). Antes no había bloques y el
   banco completo quedaba disponible desde el primer día, así que el repaso
   preguntaba material que la app todavía no había mostrado.

   LECCIÓN POR BLOQUE
   ------------------
   Enseñar una tarjeta —mostrarla un momento con su reverso— no es lo mismo que
   explicar el tema. La única explicación que da la app es la `note` del tema, y
   los paquetes de ampliación le colgaron conceptos que esa nota nunca menciona:
   la lección de 7.1.1 habla de necesidades vitales y el paquete pregunta por el
   costo de oportunidad, la pirámide de Maslow o los bienes libres. Por eso
   seguían apareciendo cosas «que nunca me enseñaron» aunque la tarjeta ya
   hubiera pasado por el paso de aprendizaje.

   Ahora cada bloque puede traer su propia `leccion`. Mientras esa lección no se
   haya leído, el bloque entero está cerrado: ni sus tarjetas ni sus reactivos
   entran a la sesión. El bloque base no necesita lección porque su lección es
   la nota del tema. */

export const BLOQUES = ["base", "ampliacion", "ampliacion2", "formato", "refuerzo"];

/* ---------------- Modo esencial ----------------

   Los bloques no valen lo mismo de cara al examen:

     · `base`     — la nota del tema, escrita desde la orientación de la guía.
     · `formato`  — los formatos que la guía marca (relación, jerarquización)
                    y las figuras que el cuadernillo trae impresas.
     · `refuerzo` — lo que la guía nombra por su nombre y no tenía reactivo.

   Esos tres son el examen. Los otros dos, `ampliacion` y `ampliacion2`, son
   ampliación de cultura general: útil, a veces excelente, pero fuera de lo que
   las orientaciones piden, y cuestan la mayor parte del tiempo de estudio.

   El MODO ESENCIAL (activado por omisión) deja fuera del plan diario esos dos
   bloques: ni sus tarjetas nuevas ni sus reactivos entran. Quien tenga tiempo
   de sobra puede apagarlo y estudiarlo todo.

   Importante: apagar o encender el modo NO borra nada. Las tarjetas de
   ampliación que ya se hayan programado siguen guardadas con su intervalo y sus
   repasos; simplemente dejan de proponerse mientras el modo esté activo. Por eso
   la preferencia vive en su propia llave de localStorage y jamás toca
   `acreditabach_v1`. */

const BLOQUES_ESENCIALES = new Set(["base", "formato", "refuerzo"]);
const MODO_KEY = "acreditabach_modo_esencial";

let MODO_ESENCIAL = (() => {
  try {
    const v = localStorage.getItem(MODO_KEY);
    return v === null ? true : v === "1";   // por omisión, esencial
  } catch (e) {
    return true;
  }
})();

export function isModoEsencial() { return MODO_ESENCIAL; }

export function setModoEsencial(on) {
  const antes = MODO_ESENCIAL;
  MODO_ESENCIAL = !!on;
  try { localStorage.setItem(MODO_KEY, MODO_ESENCIAL ? "1" : "0"); } catch (e) {}
  /* Al apagarlo, los temas ya vistos necesitan que se den de alta las tarjetas
     de ampliación que nunca se programaron; si no, quedarían invisibles para
     siempre. Se reparten en el tiempo para no soltarlas todas de golpe. */
  if (antes && !MODO_ESENCIAL) programarTarjetasFaltantes();
  emit();
}

function programarTarjetasFaltantes() {
  const today = todayDate();
  const REPARTO = 21;
  let n = 0;
  Object.keys(STATE.topicsIntroduced).forEach((topicId) => {
    const t = topicsById()[topicId];
    if (!t) return;
    (t.flashcards || []).forEach((fc, i) => {
      const cid = topicId + "::fc" + i;
      if (STATE.cards[cid]) return;
      STATE.cards[cid] = nuevaTarjeta(cid, toISO(addDays(today, n++ % REPARTO)));
    });
  });
  if (n) STATE.contentUpdate = { at: toISO(today), newCards: n, dias: REPARTO };
  saveState();
}

/** ¿Este bloque entra hoy en el plan de estudio? */
export function bloqueEnPlan(block) {
  if (!MODO_ESENCIAL) return true;
  return BLOQUES_ESENCIALES.has(block && block.nombre);
}

function packGroups() {
  /* data/formato/*.js: reactivos con los formatos de relación de elementos y de
     jerarquización que la guía oficial marca para ciertos temas. No traen
     tarjetas —no agregan conceptos, replantean con otro formato lo que la nota
     base ya explica—, así que su bloque queda abierto desde el principio. */
  /* data/refuerzo/*.js: lo que la poda dejó descubierto y los formatos que
     faltaban. Repone los elementos que la guía nombra por su nombre y no
     tenían ni un reactivo, y trae los textos completos de comprensión lectora
     del área 6, que el examen sí presenta y el banco solo describía. Tampoco
     traen tarjetas, así que su bloque queda abierto desde el principio. */
  const refuerzo = [
    typeof AREA1_REFUERZO !== "undefined" ? AREA1_REFUERZO : null,
    typeof AREA2_REFUERZO !== "undefined" ? AREA2_REFUERZO : null,
    typeof AREA3_REFUERZO !== "undefined" ? AREA3_REFUERZO : null,
    typeof AREA4_REFUERZO !== "undefined" ? AREA4_REFUERZO : null,
    typeof AREA5_REFUERZO !== "undefined" ? AREA5_REFUERZO : null,
    typeof AREA6_REFUERZO !== "undefined" ? AREA6_REFUERZO : null,
    typeof AREA7_REFUERZO !== "undefined" ? AREA7_REFUERZO : null
  ].filter(Boolean);

  const formato = [
    typeof AREA1_FORMATO !== "undefined" ? AREA1_FORMATO : null,
    typeof AREA2_FORMATO !== "undefined" ? AREA2_FORMATO : null,
    typeof AREA3_FORMATO !== "undefined" ? AREA3_FORMATO : null,
    typeof AREA4_FORMATO !== "undefined" ? AREA4_FORMATO : null,
    typeof AREA5_FORMATO !== "undefined" ? AREA5_FORMATO : null,
    typeof AREA6_FORMATO !== "undefined" ? AREA6_FORMATO : null,
    typeof AREA7_FORMATO !== "undefined" ? AREA7_FORMATO : null
  ].filter(Boolean);

  const grupo = (sufijo) => [
    typeof AREA1_EXTRA !== "undefined" && sufijo === "" ? AREA1_EXTRA : null,
    typeof AREA2_EXTRA !== "undefined" && sufijo === "" ? AREA2_EXTRA : null,
    typeof AREA3_EXTRA !== "undefined" && sufijo === "" ? AREA3_EXTRA : null,
    typeof AREA4_EXTRA !== "undefined" && sufijo === "" ? AREA4_EXTRA : null,
    typeof AREA5_EXTRA !== "undefined" && sufijo === "" ? AREA5_EXTRA : null,
    typeof AREA6_EXTRA !== "undefined" && sufijo === "" ? AREA6_EXTRA : null,
    typeof AREA7_EXTRA !== "undefined" && sufijo === "" ? AREA7_EXTRA : null,
    typeof AREA1_EXTRA2 !== "undefined" && sufijo === "2" ? AREA1_EXTRA2 : null,
    typeof AREA2_EXTRA2 !== "undefined" && sufijo === "2" ? AREA2_EXTRA2 : null,
    typeof AREA3_EXTRA2 !== "undefined" && sufijo === "2" ? AREA3_EXTRA2 : null,
    typeof AREA4_EXTRA2 !== "undefined" && sufijo === "2" ? AREA4_EXTRA2 : null,
    typeof AREA5_EXTRA2 !== "undefined" && sufijo === "2" ? AREA5_EXTRA2 : null,
    typeof AREA6_EXTRA2 !== "undefined" && sufijo === "2" ? AREA6_EXTRA2 : null,
    typeof AREA7_EXTRA2 !== "undefined" && sufijo === "2" ? AREA7_EXTRA2 : null
  ].filter(Boolean);

  return [
    { nombre: "ampliacion", packs: grupo("") },
    { nombre: "ampliacion2", packs: grupo("2") },
    { nombre: "formato", packs: formato },
    { nombre: "refuerzo", packs: refuerzo }
  ];
}

/** Lo que un grupo de paquetes aporta a un tema (un tema vive en un solo paquete por grupo). */
function aporteDe(packs, id) {
  const out = { flashcards: [], quiz: [], leccion: "" };
  packs.forEach((p) => {
    if (!p || !p[id]) return;
    out.flashcards = out.flashcards.concat(p[id].flashcards || []);
    out.quiz = out.quiz.concat(p[id].quiz || []);
    if (p[id].leccion) out.leccion = out.leccion ? out.leccion + "\n\n" + p[id].leccion : p[id].leccion;
  });
  return out;
}

let TOPICS_CACHE = null;

export function getAllTopics() {
  if (TOPICS_CACHE) return TOPICS_CACHE;
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
  const base = [].concat(...groups);
  const grupos = packGroups();

  TOPICS_CACHE = base.map((t) => {
    let flashcards = (t.flashcards || []).slice();
    let quiz = (t.quiz || []).slice();
    const blocks = [{
      nombre: "base",
      leccion: t.note || "",
      fcFrom: 0, fcTo: flashcards.length,
      qFrom: 0, qTo: quiz.length
    }];

    grupos.forEach((g) => {
      const ap = aporteDe(g.packs, t.id);
      if (!ap.flashcards.length && !ap.quiz.length) return;
      blocks.push({
        nombre: g.nombre,
        leccion: ap.leccion || "",
        fcFrom: flashcards.length, fcTo: flashcards.length + ap.flashcards.length,
        qFrom: quiz.length, qTo: quiz.length + ap.quiz.length
      });
      flashcards = flashcards.concat(ap.flashcards);
      quiz = quiz.concat(ap.quiz);
    });

    return Object.assign({}, t, { flashcards, quiz, blocks });
  });
  return TOPICS_CACHE;
}

let TOPIC_INDEX = null;
export function topicsById() {
  if (TOPIC_INDEX) return TOPIC_INDEX;
  TOPIC_INDEX = {};
  getAllTopics().forEach((t) => { TOPIC_INDEX[t.id] = t; });
  return TOPIC_INDEX;
}

export function areaNumbers() {
  return Object.keys(_AREA_META).map(Number).sort((a, b) => a - b);
}

export function topicsOfArea(areaNum) {
  return getAllTopics().filter((t) => t.area === areaNum);
}

/** Cuánto contenido tiene el temario ahora mismo (para la pantalla de progreso). */
export function contentStats() {
  const topics = getAllTopics();
  let flashcards = 0;
  let quiz = 0;
  let conGenerador = 0;
  topics.forEach((t) => {
    flashcards += (t.flashcards || []).length;
    quiz += (t.quiz || []).length;
    if (hasGenerator(t.id)) conGenerador++;
  });
  return { topics: topics.length, flashcards, quiz, conGenerador };
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

/* ---------------- Crecimiento del temario ----------------

   Cuando se agrega contenido nuevo, los temas que YA estaban vistos ganan
   tarjetas que nunca se han repasado. Se dan de alta aquí y se reparten
   entre los próximos días para no llenar la sesión de un solo golpe.
   Efecto buscado: el dominio baja y hay que repasar lo nuevo para recuperarlo.
   ------------------------------------------------------------ */

/* ---------------- El progreso contra un temario que cambia ----------------

   Las tarjetas se guardan por posición (`5.1.4::fc7`). Mientras el contenido
   solo crece por el final, esa posición es estable. Al PODAR deja de serlo: si
   un tema pierde dos tarjetas de en medio, la que era `fc7` pasa a ser `fc5`,
   y el progreso guardado queda apuntando a otra tarjeta —o a ninguna, cuando
   el índice se sale del arreglo—.

   Una tarjeta cuyo índice ya no existe es un paso VACÍO en la sesión: el
   runner no tiene nada que pintar y la pantalla se queda en blanco. Es
   exactamente lo que pasó al publicar la poda del temario.

   Aquí hay dos piezas:

     1. `applyPoda` — migración de una sola vez para el progreso anterior a la
        poda, con el orden viejo de cada tema (data/poda.js) para reencontrar
        cada tarjeta por el texto de su frente.

     2. `reconciliarTarjetas` — la red permanente, que corre en CADA arranque.
        Cada tarjeta guarda desde ahora la huella de su frente; si el contenido
        se mueve, la tarjeta se sigue hasta su nueva posición, y si desapareció
        del temario se descarta. Sin esto, cualquier edición futura del temario
        vuelve a dejar pasos en blanco.
   ------------------------------------------------------------ */

/** Huella corta y estable del frente de una tarjeta (para seguirla si se mueve). */
export function huellaDeFrente(front) { return hashSeed(String(front)).toString(36); }

/** Estado inicial de una tarjeta, con la huella de su contenido. */
function nuevaTarjeta(cardId, due) {
  const fc = cardId ? flashcardOf(cardId) : null;
  const card = {
    interval: 0,
    repetitions: 0,
    ef: 2.5,
    due: due || toISO(todayDate()),
    lastReview: null
  };
  if (fc) card.h = huellaDeFrente(fc.card.front);
  return card;
}

/* La poda se publicó el 15 de agosto de 2026. Un progreso empezado después ya
   nació con los índices nuevos: pasarlo por el mapa viejo lo estropearía. */
const PODA_ISO = "2026-08-15";

function progresoPrevioALaPoda() {
  const fechas = [STATE.createdAt]
    .concat(Object.keys(STATE.sessionLog || {}))
    .concat(Object.values(STATE.topicsIntroduced || {}))
    .filter(Boolean)
    .sort();
  return fechas.length > 0 && fechas[0] < PODA_ISO;
}

function applyPoda() {
  if (STATE.podaAplicada) return null;
  const previos = typeof PODA_FRONTS_PREVIOS !== "undefined" ? PODA_FRONTS_PREVIOS : null;
  if (!previos) return null; // sin el mapa no se toca nada
  /* Un progreso posterior a la poda ya nació con los índices nuevos: no se
     migra, solo se marca para no volver a revisarlo. */
  if (!progresoPrevioALaPoda()) { STATE.podaAplicada = true; return { movidas: 0, quitadas: 0 }; }

  const cards = {};
  let migradas = 0;
  let podadas = 0;

  Object.keys(STATE.cards).forEach((cid) => {
    const sep = String(cid).lastIndexOf("::fc");
    if (sep < 0) { cards[cid] = STATE.cards[cid]; return; }
    const topicId = cid.slice(0, sep);
    const viejoIdx = Number(cid.slice(sep + 4));
    const frentesViejos = previos[topicId];
    const topic = topicsById()[topicId];
    if (!frentesViejos || !topic) { cards[cid] = STATE.cards[cid]; return; }

    /* Un tema conocido DESPUÉS de la poda ya se dio de alta con los índices
       nuevos: sus tarjetas no pasan por el mapa viejo. */
    const visto = STATE.topicsIntroduced[topicId];
    if (visto && visto >= PODA_ISO) { cards[cid] = STATE.cards[cid]; return; }

    const front = frentesViejos[viejoIdx];
    if (front === undefined) { podadas++; return; }
    const nuevoIdx = (topic.flashcards || []).findIndex((f) => f.front === front);
    if (nuevoIdx < 0) { podadas++; return; } // la tarjeta salió del temario
    const destino = topicId + "::fc" + nuevoIdx;
    const card = STATE.cards[cid];
    card.h = huellaDeFrente(front);
    if (!cards[destino] || cardIsNewer(card, cards[destino])) cards[destino] = card;
    if (nuevoIdx !== viejoIdx) migradas++;
  });

  STATE.cards = cards;
  STATE.podaAplicada = true;
  return { movidas: migradas, quitadas: podadas };
}

/* Sigue cada tarjeta guardada hasta donde esté hoy su contenido.

   · con huella y el frente cambió de sitio  -> se mueve, conservando intervalo
   · con huella y el frente ya no existe     -> se descarta
   · sin huella (progreso viejo) y hay tarjeta en esa posición -> se le pone la
     huella de lo que hay ahí y se queda como está
   · sin huella y la posición ya no existe   -> se descarta

   Descartar es lo que evita el paso en blanco: una tarjeta sin contenido no se
   puede enseñar ni repasar, así que tampoco puede entrar al plan del día. */
function reconciliarTarjetas() {
  const enSitio = {};
  const porMover = [];
  let quitadas = 0;
  let marcadas = 0;

  Object.keys(STATE.cards).forEach((cid) => {
    const sep = String(cid).lastIndexOf("::fc");
    if (sep < 0) { enSitio[cid] = STATE.cards[cid]; return; } // llave desconocida: no se toca
    const topicId = cid.slice(0, sep);
    const idx = Number(cid.slice(sep + 4));
    const topic = topicsById()[topicId];
    const card = STATE.cards[cid];
    const fcs = (topic && topic.flashcards) || null;
    if (!fcs) { quitadas++; return; } // el tema salió del temario

    const aqui = fcs[idx];
    if (!card.h) {
      if (!aqui) { quitadas++; return; }
      card.h = huellaDeFrente(aqui.front);
      marcadas++;
      enSitio[cid] = card;
      return;
    }
    if (aqui && huellaDeFrente(aqui.front) === card.h) { enSitio[cid] = card; return; }

    const nuevo = fcs.findIndex((f) => huellaDeFrente(f.front) === card.h);
    if (nuevo < 0) { quitadas++; return; }
    porMover.push({ destino: topicId + "::fc" + nuevo, card });
  });

  /* Las movidas se colocan al final para que nunca pisen a una tarjeta que ya
     estaba en su sitio; si dos caen en la misma casilla, gana la más avanzada. */
  const cards = enSitio;
  let movidas = 0;
  porMover.forEach(({ destino, card }) => {
    if (!cards[destino] || cardIsNewer(card, cards[destino])) cards[destino] = card;
    movidas++;
  });

  STATE.cards = cards;
  return { movidas, quitadas, marcadas };
}

/** Quita el aviso de "se ajustó el temario" de la pantalla de inicio. */
export function dismissPoda() {
  STATE.poda = null;
  saveState();
}

function applyContentUpdate() {
  const poda = applyPoda();
  const rec = reconciliarTarjetas();
  const movidas = (poda ? poda.movidas : 0) + rec.movidas;
  const quitadas = (poda ? poda.quitadas : 0) + rec.quitadas;
  /* El aviso solo aparece cuando algo cambió de sitio o se dio de baja; poner
     la huella por primera vez no es noticia, pero sí hay que guardarla. */
  if (movidas || quitadas) STATE.poda = { at: toISO(todayDate()), quitadas, movidas };
  if (poda || movidas || quitadas || rec.marcadas) saveState();
  if (STATE.contentRevision === CONTENT_REVISION) return;
  const primeraVez = Object.keys(STATE.topicsIntroduced).length === 0;
  const today = todayDate();
  const nuevas = [];

  Object.keys(STATE.topicsIntroduced).forEach((topicId) => {
    cardsForTopic(topicId).forEach((cid) => {
      if (!STATE.cards[cid]) nuevas.push(cid);
    });
  });

  const REPARTO = 21; // días entre los que se reparten las tarjetas nuevas
  nuevas.forEach((cid, i) => {
    STATE.cards[cid] = nuevaTarjeta(cid, toISO(addDays(today, i % REPARTO)));
  });

  STATE.contentRevision = CONTENT_REVISION;
  STATE.contentUpdate = primeraVez || !nuevas.length ? null : { at: toISO(today), newCards: nuevas.length, dias: REPARTO };
  saveState();
}

/** Quita el aviso de "se agregó contenido nuevo" de la pantalla de inicio. */
export function dismissContentUpdate() {
  STATE.contentUpdate = null;
  saveState();
}

/* ---------------- Repetición espaciada (SM-2 simplificado, 3 botones) ---------------- */
/* Basado en el algoritmo SM-2 (SuperMemo) usado por Anki, adaptado a 3 niveles
   de respuesta para simplificar la interfaz: 0=otra vez, 1=costó, 2=bien. */

export function getCard(cardId) {
  if (!STATE.cards[cardId]) STATE.cards[cardId] = nuevaTarjeta(cardId);
  return STATE.cards[cardId];
}

/** Lectura sin efectos secundarios: no da de alta la tarjeta si no existe. */
export function peekCard(cardId) {
  return STATE.cards[cardId] || null;
}

/* ¿La tarjeta ya se mostró alguna vez con su respuesta a la vista?

   `learned` es una llave nueva y aditiva. Para el progreso guardado desde antes
   de que existiera, cualquier tarjeta con repasos o con fecha de último repaso
   cuenta como aprendida: ya se vio, no hay que volver a presentarla. */
export function isLearned(cardId) {
  const c = STATE.cards[cardId];
  if (!c) return false;
  return c.learned === true || (c.repetitions || 0) > 0 || !!c.lastReview;
}

/** Presentación de una tarjeta nueva: se enseña, no se califica. */
export function learnCard(cardId) {
  const card = getCard(cardId);
  card.learned = true;
  card.interval = 1;
  card.due = toISO(addDays(todayDate(), 1));
  saveState();
  return card;
}

export function gradeCard(cardId, quality) {
  const card = getCard(cardId);
  const today = todayDate();
  card.learned = true;
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
  const card = STATE.cards[cardId] || nuevaTarjeta(cardId);
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

/** Las tarjetas del tema que hoy cuentan para el plan y para el porcentaje.
    En modo esencial se dejan fuera las de los bloques de ampliación; las que ya
    estuvieran programadas siguen guardadas y vuelven al apagar el modo. */
export function cardsForTopic(topicId) {
  const t = topicsById()[topicId];
  if (!t) return [];
  const todas = (t.flashcards || []).map((fc, i) => topicId + "::fc" + i);
  if (!MODO_ESENCIAL || !t.blocks || !t.blocks.length) return todas;
  const out = [];
  t.blocks.forEach((b) => {
    if (!bloqueEnPlan(b)) return;
    for (let i = b.fcFrom; i < b.fcTo; i++) if (todas[i]) out.push(todas[i]);
  });
  return out;
}

/** Las tarjetas de un bloque concreto del tema. */
export function cardsOfBlock(topicId, block) {
  const out = [];
  for (let i = block.fcFrom; i < block.fcTo; i++) out.push(topicId + "::fc" + i);
  return out;
}

/** Los reactivos de un bloque concreto del tema. */
export function quizOfBlock(topic, block) {
  const bank = (topic && topic.quiz) || [];
  const out = [];
  for (let q = block.qFrom; q < block.qTo; q++) if (bank[q]) out.push(bank[q]);
  return out;
}

/* ---------------- Lección de cada bloque ----------------

   Un bloque con `leccion` no se toca hasta haberla leído. Es la llave nueva
   `lessonsSeen`, aditiva como las demás: un progreso guardado antes de esta
   versión simplemente no tiene ninguna lección marcada, así que la app se las
   presenta antes de volver a preguntar ese material. Nada se borra ni se
   reinicia; las tarjetas conservan su intervalo y sus repasos. */

export function lessonKey(topicId, nombreBloque) { return topicId + "::" + nombreBloque; }

/** ¿Un bloque tiene una lección propia que leer? El base no: su lección es la nota. */
export function blockHasLesson(block, index) {
  return index !== 0 && !!(block && block.leccion);
}

export function isLessonSeen(topicId, block, index) {
  if (!blockHasLesson(block, index)) return true;
  return !!STATE.lessonsSeen[lessonKey(topicId, block.nombre)];
}

export function markLessonSeen(topicId, nombreBloque) {
  STATE.lessonsSeen[lessonKey(topicId, nombreBloque)] = toISO(todayDate());
  saveState();
}

/** El bloque al que pertenece una tarjeta, con su índice dentro del tema. */
export function blockOfCard(cardId) {
  const [topicId, tail] = String(cardId).split("::");
  const t = topicsById()[topicId];
  if (!t || !t.blocks) return null;
  const idx = Number(String(tail).replace("fc", ""));
  const i = t.blocks.findIndex((b) => idx >= b.fcFrom && idx < b.fcTo);
  return i < 0 ? null : { topic: t, block: t.blocks[i], index: i };
}

/* Un bloque de ampliación se abre cuando su lección ya se leyó y sus tarjetas ya
   se enseñaron. El bloque base se abre al conocer el tema, porque su contenido
   es justo el de la nota que se muestra en la introducción. */
export function blockUnlocked(topic, block, index) {
  if (index === 0) return true; // lo cubre la nota del tema, que siempre se puede leer
  if (!isLessonSeen(topic.id, block, index)) return false;
  const cards = cardsOfBlock(topic.id, block);
  if (!cards.length) return true;
  return cards.every(isLearned);
}

/** Los reactivos que hoy es justo preguntar de este tema. */
export function availableQuiz(topic) {
  if (!topic) return [];
  const bank = topic.quiz || [];
  const blocks = topic.blocks;
  if (!blocks || !blocks.length) return bank;
  const out = [];
  blocks.forEach((b, i) => {
    if (!bloqueEnPlan(b)) return;
    if (!blockUnlocked(topic, b, i)) return;
    for (let q = b.qFrom; q < b.qTo; q++) if (bank[q]) out.push(bank[q]);
  });
  return out;
}

/** Bloques del tema que solo esperan su lección para abrirse.

   Son los que no traen tarjetas: su única condición es que la lección se lea.
   La sesión del día los agenda, y la práctica manual de un tema los enseña
   antes de preguntar, para que su banco no quede inalcanzable. */
export function pendingLessons(topic) {
  if (!topic || !topic.blocks) return [];
  const out = [];
  topic.blocks.forEach((b, i) => {
    if (!bloqueEnPlan(b)) return;
    if (b.fcTo > b.fcFrom) return;
    if (isLessonSeen(topic.id, b, i)) return;
    out.push({ topicId: topic.id, topic, bloque: b.nombre, leccion: b.leccion, block: b, index: i });
  });
  return out;
}

/** Cuánto del banco de un tema está abierto (para mostrarlo en pantalla). */
export function quizProgress(topicId) {
  const t = topicsById()[topicId];
  if (!t) return { disponibles: 0, total: 0 };
  return { disponibles: availableQuiz(t).length, total: (t.quiz || []).length };
}

/** Datos de la flashcard a partir de su id (`tema::fcN`). */
export function flashcardOf(cardId) {
  const [topicId, tail] = String(cardId).split("::");
  const t = topicsById()[topicId];
  if (!t) return null;
  const idx = Number(String(tail).replace("fc", ""));
  const fc = (t.flashcards || [])[idx];
  return fc ? { topic: t, card: fc, index: idx } : null;
}

/* ¿Este paso de la sesión tiene algo que mostrar?

   Los pasos de tarjeta se arman con un identificador (`tema::fcN`), no con el
   contenido: si el temario cambió y ese identificador ya no apunta a nada, el
   paso se quedaría en blanco y la sesión se atoraría ahí, sin botón ni texto.
   Se comprueba al armar la sesión y otra vez al pintarla. */
export function pasoConContenido(step) {
  if (!step) return false;
  if (step.type === "review" || step.type === "learn") return !!flashcardOf(step.cardId);
  if (step.type === "lesson") return !!(step.topic && step.leccion);
  if (step.type === "intro") return !!step.topic;
  if (step.type === "quiz") return !!(step.topic && step.question && step.question.options);
  return true; // summary y cualquier paso futuro sin contenido propio
}

/* ---------------- Progreso por tema / área ---------------- */

export function isIntroduced(topicId) { return !!STATE.topicsIntroduced[topicId]; }

/* Días entre un bloque y el siguiente al conocer un tema. El bloque base se
   estudia el mismo día (es lo que explica la nota); las ampliaciones llegan
   escalonadas, cada una con su propio paso de aprendizaje. */
const DIAS_ENTRE_BLOQUES = 2;

export function introduceTopic(topicId) {
  if (STATE.topicsIntroduced[topicId]) return;
  STATE.topicsIntroduced[topicId] = toISO(todayDate());
  const t = topicsById()[topicId];
  const today = todayDate();
  const blocks = (t && t.blocks) || [];

  if (!blocks.length) {
    cardsForTopic(topicId).forEach((cid) => getCard(cid));
  } else {
    blocks.forEach((b, i) => {
      if (!bloqueEnPlan(b)) return;
      cardsOfBlock(topicId, b).forEach((cid) => {
        if (STATE.cards[cid]) return;
        STATE.cards[cid] = nuevaTarjeta(cid, toISO(addDays(today, i * DIAS_ENTRE_BLOQUES)));
      });
    });
  }
  saveState();
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

/* Dominio de un tema.

   El cálculo penaliza dos cosas a propósito:
     · las tarjetas del tema que todavía no se repasan cuentan como 0, así que
       al crecer el temario el dominio baja y hay que repasar lo nuevo;
     · las preguntas acertadas solo valen del todo cuando hay suficientes
       intentos para ese tema (`confianza`): con un banco más grande se piden
       más respuestas antes de dar el crédito completo.
   Sin intentos de quiz, la parte de preguntas vale 0.5 (neutra), igual que antes. */

const MASTERY_TARGET_REPS = 5;

export function masteryDetail(topicId) {
  if (!isIntroduced(topicId)) {
    return { mastery: 0, repScore: 0, quizScore: 0, confianza: 0, cardsPendientes: 0, totalCards: 0 };
  }
  const cids = cardsForTopic(topicId);
  let suma = 0;
  let pendientes = 0;
  cids.forEach((cid) => {
    const c = STATE.cards[cid];
    const reps = c ? Math.min(MASTERY_TARGET_REPS, c.repetitions) : 0;
    if (!c || c.repetitions === 0) pendientes++;
    suma += reps;
  });
  const repScore = cids.length ? suma / cids.length / MASTERY_TARGET_REPS : 0;

  const t = topicsById()[topicId];
  const banco = (t && t.quiz ? t.quiz.length : 0) + (hasGenerator(topicId) ? 4 : 0);
  const exigidos = Math.min(Math.max(banco, 2), 5);
  const qs = quizStatsFor(topicId);
  const confianza = Math.min(1, qs.seen / exigidos);
  const acierto = qs.seen ? qs.correct / qs.seen : 0.5;
  const quizScore = acierto * confianza + 0.5 * (1 - confianza);

  return {
    mastery: Math.round((0.6 * repScore + 0.4 * quizScore) * 100),
    repScore,
    quizScore,
    confianza,
    cardsPendientes: pendientes,
    totalCards: cids.length
  };
}

export function topicMastery(topicId) {
  return masteryDetail(topicId).mastery;
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

/* ---------------- Riesgo por área ----------------

   El examen no se aprueba en promedio: se aprueba área por área. Hay que
   alcanzar 1 000 puntos del Índice Ceneval en CADA una de las siete, y
   reprobar tres o más significa volver a empezar (guía, p. 45).

   Eso cambia por completo el reparto del esfuerzo. Repartir el tiempo parejo
   entre las siete es lo que hacía la app, y es lo peor que se puede hacer
   cuando una área va por debajo de la línea: subir de 85 % a 90 % en un área
   que ya pasa no vale nada, y subir de 55 % a 65 % en la que no pasa lo vale
   todo.

   NO se intenta predecir el Índice Ceneval: la guía no publica cómo convierte
   los aciertos a esa escala y cualquier número que se inventara aquí sería
   falsa precisión. Lo que se estima es el porcentaje de aciertos, que sí se
   mide, y se compara contra un objetivo con margen.

   El margen no es igual para todas: es más grande en las áreas con menos
   reactivos. Con 19 preguntas, la suerte pesa más que con 32 —la desviación
   típica de la proporción de aciertos es de unos 11 puntos contra 8—, así que
   la misma habilidad real cae por debajo de la línea más seguido en un área
   chica. Cultura digital y humanidades necesitan más colchón que ciencias
   naturales, no por ser más difíciles, sino por ser más cortas.
   ------------------------------------------------------------ */

/* Acierto de referencia con el que se calcula el margen. No es el punto de
   corte oficial —ese no se publica en aciertos— sino un objetivo de trabajo
   deliberadamente por encima de lo que haría falta. */
const OBJETIVO_BASE = 0.70;

/** Aciertos acumulados de un área, sumando los de todos sus temas. */
function aciertosDeArea(areaNum) {
  let seen = 0, correct = 0;
  topicsOfArea(areaNum).forEach((t) => {
    const s = quizStatsFor(t.id);
    seen += s.seen;
    correct += s.correct;
  });
  return { seen, correct, acierto: seen ? correct / seen : null };
}

/** Margen extra que pide un área por ser corta (más varianza, menos preguntas). */
function margenPorTamano(reactivos) {
  const n = Math.max(1, reactivos || 1);
  /* Desviación típica de la proporción de aciertos con p ≈ 0.65, redondeada a
     un margen de trabajo: ~0.11 con n = 19 y ~0.08 con n = 32. */
  return Math.sqrt(0.65 * 0.35 / n);
}

/**
 * Estado de cada área frente al objetivo, ordenadas de mayor a menor riesgo.
 * `riesgo` va de 0 (fuera de peligro) a 1 (muy por debajo).
 */
export function areaReadiness() {
  return areaNumbers().map((n) => {
    const meta = _AREA_META[n] || {};
    const stats = areaStats(n);
    const { seen, correct, acierto } = aciertosDeArea(n);
    const objetivo = Math.min(0.9, OBJETIVO_BASE + margenPorTamano(meta.reactivos));

    /* Sin respuestas suficientes no se puede juzgar el acierto, así que manda
       la cobertura: un área sin estudiar es riesgo alto por definición. */
    const minRespuestas = Math.max(8, Math.round((meta.reactivos || 20) / 2));
    const confianza = Math.min(1, seen / minRespuestas);
    const faltaCobertura = 1 - stats.coverage / 100;

    const brecha = acierto === null ? 1 : Math.max(0, objetivo - acierto) / objetivo;
    const riesgo = Math.min(1, confianza * brecha + (1 - confianza) * Math.max(faltaCobertura, brecha * 0.5));

    return {
      area: n,
      nombre: meta.short || meta.name || String(n),
      reactivos: meta.reactivos || 0,
      sesion: meta.session,
      cobertura: stats.coverage,
      dominio: stats.mastery,
      respondidos: seen,
      aciertos: correct,
      acierto,                                   // null si aún no hay datos
      objetivo,                                  // el listón con margen incluido
      confiable: confianza >= 1,                 // ¿ya hay respuestas suficientes?
      riesgo,
      nivel: riesgo >= 0.45 ? "alto" : riesgo >= 0.2 ? "medio" : "bajo"
    };
  }).sort((a, b) => b.riesgo - a.riesgo);
}

/** Peso de cada área al repartir la práctica del día. Más riesgo, más turno. */
function pesosPorArea() {
  const pesos = {};
  areaReadiness().forEach((a) => { pesos[a.area] = 1 + 2 * a.riesgo; });
  return pesos;
}

export function weakestTopics(n) {
  const introduced = getAllTopics().filter((t) => isIntroduced(t.id));
  return introduced
    .map((t) => ({ topic: t, mastery: topicMastery(t.id) }))
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, n);
}

/* ---------------- Selección variada de preguntas ----------------

   Antes se mostraba siempre la misma pregunta (`quiz[seen % 2]`). Ahora:
     · los temas con generador producen un reactivo nuevo cada vez;
     · los demás rotan por su banco con una semilla que depende del tema, del
       día y de cuántas veces se ha respondido, así que la pregunta cambia
       conforme avanzas y no se repite dos días seguidos.
   ------------------------------------------------------------ */

const PROB_GENERADA = 0.6;

function seedFor(topicId, salt) {
  return hashSeed(topicId + "|" + salt);
}

/** Un reactivo del tema. `salt` fija la variante (por día, por intento, aleatorio). */
/**
 * Devuelve el reactivo con las opciones revueltas y el índice de la correcta
 * ya corregido. Sin esto, la respuesta correcta cae casi siempre en la misma
 * posición y se aprende el patrón en vez del contenido. La semilla hace que
 * el orden sea estable mientras se contesta esa pregunta.
 */
export function shuffleOptions(question, salt) {
  if (!question || !Array.isArray(question.options) || question.options.length < 2) return question;
  const seed = typeof salt === "number" ? salt >>> 0 : hashSeed(String(salt === undefined ? randomSeed() : salt));
  const rng = makeRng(seed);
  const idx = question.options.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const correct = idx.indexOf(question.correct);
  if (correct < 0) return question;
  return Object.assign({}, question, { options: idx.map((i) => question.options[i]), correct });
}

export function pickQuestion(topic, salt) {
  if (!topic) return null;
  const bank = availableQuiz(topic);
  const key = salt === undefined ? String(randomSeed()) : String(salt);
  const seed = seedFor(topic.id, key);
  const rng = makeRng(seed);
  const puedeGenerar = hasGenerator(topic.id);

  const mezclar = (q) => shuffleOptions(q, (seed ^ 0x9e3779b9) >>> 0);

  if (puedeGenerar && (bank.length === 0 || rng() < PROB_GENERADA)) {
    const q = generateQuestion(topic.id, seed);
    if (q) return mezclar(q);
  }
  if (!bank.length) {
    const q = puedeGenerar ? generateQuestion(topic.id, seed) : null;
    return q ? mezclar(q) : null;
  }
  return mezclar(bank[Math.floor(rng() * bank.length)]);
}

/** Semilla estable del día: la pregunta no cambia sola, pero sí al responderla. */
function saltDelDia(topicId) {
  return toISO(todayDate()) + "|" + quizStatsFor(topicId).seen;
}

/* ---------------- Plan de hoy / ritmo adaptativo ---------------- */

/* Tope de tarjetas nuevas que se enseñan en un mismo día. Sin tope, un paquete
   de contenido recién agregado convertiría la sesión en una lectura larguísima. */
const MAX_APRENDER_POR_DIA = 12;

/* Tope de lecciones de ampliación por día. Un progreso que viene de antes de
   que existieran tiene todas pendientes de golpe; sin tope, la primera sesión
   se convertiría en una lectura interminable. */
const MAX_LECCIONES_POR_DIA = 4;

/* Piso de temas nuevos por sesión. El reparto por calendario divide lo que
   falta entre los días que quedan, así que ir adelantado lo hace bajar hasta
   un solo tema por día: el plan se frena justo cuando hay ritmo de sobra.
   Mientras queden temas sin conocer, la sesión trae al menos estos dos. */
const MIN_TEMAS_NUEVOS_POR_DIA = 2;

/* Tope de temas nuevos por sesión, para que un atraso grande no convierta un
   día en una maratón de notas. */
const MAX_TEMAS_NUEVOS_POR_DIA = 8;

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
    const porCalendario = Math.ceil(notIntroduced.length / daysLeft);
    quota = Math.min(
      MAX_TEMAS_NUEVOS_POR_DIA,
      Math.max(MIN_TEMAS_NUEVOS_POR_DIA, porCalendario),
      notIntroduced.length
    );
  }
  /* Qué temas nuevos entran hoy. El orden base entrelaza las siete áreas de
     forma pareja, pero el examen se aprueba área por área: si una va por
     debajo de la línea, sus temas pendientes pasan al frente. Se toma una
     ventana de los siguientes y dentro de ella manda el riesgo, para no
     desarmar el reparto ni dejar un área sin avanzar durante semanas. */
  const riesgoPorArea = {};
  areaReadiness().forEach((a) => { riesgoPorArea[a.area] = a.riesgo; });
  const ventana = notIntroduced.slice(0, Math.max(quota, quota * 4));
  const priorizados = ventana
    .map((id, pos) => ({ id, pos, riesgo: riesgoPorArea[(topicsById()[id] || {}).area] || 0 }))
    .sort((a, b) => b.riesgo - a.riesgo || a.pos - b.pos)
    .map((x) => x.id);
  const newTopics = priorizados.slice(0, quota).map((id) => topicsById()[id]).filter(Boolean);

  const todayISO = toISO(rawToday);
  const vencidas = [];
  Object.keys(STATE.cards).forEach((cardId) => {
    const topicId = cardId.split("::")[0];
    if (!isIntroduced(topicId)) return;
    if (newTopics.some((t) => t.id === topicId)) return; // los nuevos se repasan en su propia introducción
    /* Una tarjeta cuyo contenido ya no existe no se puede enseñar ni repasar:
       si entrara al plan, la sesión tendría un paso en blanco. La
       reconciliación del arranque las quita, esto es la red por si acaso. */
    if (!flashcardOf(cardId)) return;
    /* Y una tarjeta de un bloque que hoy no está en el plan tampoco sale. El
       modo esencial promete que las tarjetas de ampliación ya programadas
       "dejan de proponerse mientras el modo esté activo" —guardadas, con su
       intervalo intacto, pero fuera de la sesión—. Sin esta comprobación
       seguían apareciendo en cuanto vencían, que es material de ampliación
       colándose en un plan que dice no incluirlo. */
    const bloque = blockOfCard(cardId);
    if (bloque && !bloqueEnPlan(bloque.block)) return;
    const card = STATE.cards[cardId];
    if (card.due > todayISO) return;
    vencidas.push({ cardId, topicId, due: card.due });
  });
  vencidas.sort((a, b) => (a.due < b.due ? -1 : 1));

  /* Las tarjetas de un bloque cuya lección todavía no se ha leído no pueden
     salir hoy… salvo que hoy toque justamente esa lección. Se eligen las de las
     tarjetas más atrasadas y el resto espera su turno: preguntar antes de
     explicar es exactamente lo que se quiere evitar.

     Un bloque SIN tarjetas también necesita su turno. Antes las lecciones se
     sacaban solo de las tarjetas vencidas, así que un bloque que únicamente
     trae reactivos —los de `formato` y `refuerzo`, que son justo los que el
     modo esencial conserva— no podía enseñar su lección nunca: `blockUnlocked`
     la pedía, la sesión no la ofrecía y su banco quedaba cerrado para siempre.
     Eso dejaba a esos paquetes sin manera de explicar lo que preguntan, que es
     la razón por la que se escribieron dando por hecho que no introducen nada
     nuevo. Ahora se recorren también los bloques sin tarjetas de los temas ya
     conocidos, después de las lecciones que sí tienen tarjetas atrasadas. */
  const leccionesPendientes = [];
  const vistaHoy = new Set();
  const apuntarLeccion = (topicId, topic, block, index) => {
    if (!bloqueEnPlan(block)) return;
    if (isLessonSeen(topicId, block, index)) return;
    const key = lessonKey(topicId, block.nombre);
    if (vistaHoy.has(key)) return;
    vistaHoy.add(key);
    if (leccionesPendientes.length < MAX_LECCIONES_POR_DIA) {
      leccionesPendientes.push({ topicId, topic, bloque: block.nombre, leccion: block.leccion });
    }
  };
  vencidas.forEach((e) => {
    const bc = blockOfCard(e.cardId);
    if (!bc) return;
    apuntarLeccion(e.topicId, bc.topic, bc.block, bc.index);
  });
  getAllTopics().forEach((t) => {
    if (!isIntroduced(t.id)) return;
    if (newTopics.some((nt) => nt.id === t.id)) return; // hoy ya trae bastante con su nota
    (t.blocks || []).forEach((b, i) => {
      if (b.fcTo > b.fcFrom) return;   // los de tarjetas ya pasaron por el recorrido de arriba
      apuntarLeccion(t.id, t, b, i);
    });
  });
  const seEnseñaHoy = new Set(leccionesPendientes.map((l) => lessonKey(l.topicId, l.bloque)));
  const conLeccion = (e) => {
    const bc = blockOfCard(e.cardId);
    if (!bc || isLessonSeen(e.topicId, bc.block, bc.index)) return true;
    return seEnseñaHoy.has(lessonKey(e.topicId, bc.block.nombre));
  };

  const dueCardEntries = [];
  const learnCardEntries = [];
  vencidas.forEach((e) => {
    if (!conLeccion(e)) return;
    // Una tarjeta que nunca se ha visto no se examina: primero se enseña.
    if (isLearned(e.cardId)) dueCardEntries.push(e);
    else learnCardEntries.push(e);
  });
  const learnCards = learnCardEntries.slice(0, MAX_APRENDER_POR_DIA);

  // Quiz de refuerzo: prioriza temas con menor precisión o pocos intentos.
  const eligibleForQuiz = getAllTopics().filter((t) => {
    if (!isIntroduced(t.id)) return false;
    if (newTopics.some((nt) => nt.id === t.id)) return false;
    return true;
  });
  /* Antes se ordenaba solo por el acierto del tema, y eso repartía la práctica
     por igual entre las siete áreas. Ahora pesa también el riesgo del área a la
     que pertenece: subir de 85 % a 90 % donde ya se pasa no acerca a aprobar;
     subir de 55 % a 65 % donde no se pasa, sí. */
  const pesos = pesosPorArea();
  const urgencia = (t) => {
    const s = quizStatsFor(t.id);
    const acierto = s.seen ? s.correct / s.seen : 0.35; // sin datos, se asume flojo
    return (1 - acierto) * (pesos[t.area] || 1);
  };
  eligibleForQuiz.sort((a, b) => urgencia(b) - urgencia(a));

  /* Aun priorizando, ninguna área se queda sin práctica: las cuatro primeras
     plazas se reservan a temas de áreas distintas para no encerrar la sesión
     entera en una sola. */
  const quizTopics = [];
  const areasVistas = new Set();
  eligibleForQuiz.forEach((t) => {
    if (quizTopics.length >= 4 || areasVistas.has(t.area)) return;
    areasVistas.add(t.area);
    quizTopics.push(t);
  });
  eligibleForQuiz.forEach((t) => {
    if (quizTopics.length < 10 && !quizTopics.includes(t)) quizTopics.push(t);
  });
  const quizQuestions = [];
  quizTopics.forEach((t) => {
    const question = pickQuestion(t, saltDelDia(t.id));
    if (question) quizQuestions.push({ topic: t, question });
  });

  const estMinutes = Math.round(
    dueCardEntries.length * 0.5 + learnCards.length * 0.8 + newTopics.length * 6 +
    leccionesPendientes.length * 2 + quizQuestions.length * 1.2
  );

  const readiness = areaReadiness();

  return {
    phase,
    today: rawToday,
    daysToExam: daysBetween(rawToday, EXAM_DATE),
    readiness,
    areaEnRiesgo: readiness.find((a) => a.nivel === "alto") || null,
    reviewCards: dueCardEntries,
    learnCards,
    learnPending: learnCardEntries.length,
    blockLessons: leccionesPendientes,
    newTopics,
    quizQuestions,
    estMinutes,
    behind: phase === "learning" && notIntroduced.length > 0 && daysBetween(today, LEARNING_END) <= 0,
    notIntroducedCount: notIntroduced.length,
    get totalSteps() {
      return this.reviewCards.length + this.learnCards.length + this.blockLessons.length +
        this.newTopics.length + this.quizQuestions.length;
    }
  };
}

export function logSessionProgress(patch) {
  const iso = toISO(todayDate());
  const entry = STATE.sessionLog[iso] || { cardsReviewed: 0, cardsLearned: 0, lessons: 0, newTopics: 0, quizAnswered: 0, quizCorrect: 0 };
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
  /* Umbral del contador de temas "firmes". Se subió de 75 a 85 para que la
     etiqueta no se lea como "ya lo tengo para el examen": este porcentaje mide
     el repaso dentro de la app y no equivale al Índice Ceneval. */
  const mastered = getAllTopics().filter((t) => isIntroduced(t.id) && topicMastery(t.id) >= 85).length;
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

/* ---------------- Simulacros y práctica ---------------- */

/* El simulacro debe traer tantos reactivos por área como el examen real.

   Antes tomaba uno por tema, y eso no daba la cuenta: la guía lista 177 temas
   pero 180 reactivos, porque cultura digital tiene 18 temas y 19 reactivos, y
   conciencia histórica 21 temas y 23. La sesión 1 salía de 89 reactivos
   mientras la pantalla anunciaba 92. Ceneval no dice qué temas se repiten, así
   que los reactivos sobrantes se sortean entre los temas de esa misma área. */
export function buildMockExam(areaNums, onlyIntroduced, limit) {
  const semilla = randomSeed();
  const items = [];
  const elegibles = [];
  let n = 0;

  areaNums.forEach((area) => {
    const topics = getAllTopics().filter(
      (t) => t.area === area && (!onlyIntroduced || isIntroduced(t.id)) && puedeExaminar(t)
    );
    if (!topics.length) return;
    elegibles.push(...topics);

    /* Uno por tema, que es el piso: todo tema evaluado aparece al menos una vez. */
    topics.forEach((t) => {
      const question = pickQuestion(t, semilla + "|" + n++);
      if (question) items.push({ topic: t, question });
    });

    /* Y los reactivos que al área le faltan para llegar a su cuota real. */
    const cuota = onlyIntroduced ? 0 : (_AREA_META[area] || {}).reactivos || 0;
    const faltan = cuota - topics.length;
    if (faltan > 0) {
      shuffle(topics)
        .slice(0, faltan)
        .forEach((t) => {
          const question = pickQuestion(t, semilla + "|" + n++);
          if (question) items.push({ topic: t, question });
        });
    }
  });

  if (limit && items.length > limit) return shuffle(items).slice(0, limit);

  /* Bloque piloto. En el examen real se contestan 14 reactivos más en la
     sesión uno y 11 en la dos que NO cuentan para la calificación, y el
     sustentante no sabe cuáles son (guía, p. 21). Simular solo los 92 y los 88
     calificados regalaba ~15 % y ~12.5 % más de tiempo por pregunta y dejaba
     fuera la parte de resistencia. Aquí se añaden como bloque al final, sin
     avisar cuáles son: se responden igual y se descuentan al calificar. */
  const piloto = pilotoDe(areaNums);
  if (piloto > 0 && elegibles.length) {
    for (let i = 0; i < piloto; i++) {
      const t = elegibles[(i * 7 + 3) % elegibles.length];
      const question = pickQuestion(t, semilla + "|piloto|" + n++);
      if (question) items.push({ topic: t, question, piloto: true });
    }
  }
  return items;
}

/** Reactivos piloto que le tocan a una sesión completa (0 si no es una sesión entera). */
export function pilotoDe(areaNums) {
  const sesiones = new Set(areaNums.map((a) => (_AREA_META[a] || {}).session).filter(Boolean));
  if (sesiones.size !== 1) return 0;
  const s = _SESSION_META[[...sesiones][0]];
  if (!s) return 0;
  /* Solo cuando el simulacro cubre TODAS las áreas de esa sesión. */
  const completas = (s.areas || []).every((a) => areaNums.includes(a));
  return completas ? (s.piloto || 0) : 0;
}

/** Cuánto dura la sesión de simulacro que cubre esas áreas, en minutos. */
export function mockMinutes(areaNums) {
  const sesiones = new Set(areaNums.map((a) => (_AREA_META[a] || {}).session).filter(Boolean));
  if (sesiones.size !== 1) return 0;
  const s = _SESSION_META[[...sesiones][0]];
  if (!s) return 0;
  /* SESSION_META guarda la duración como texto ("4 h 30 min"). */
  const m = String(s.duracion).match(/(\d+)\s*h(?:\s*(\d+)\s*min)?/);
  return m ? Number(m[1]) * 60 + Number(m[2] || 0) : 0;
}

function puedeExaminar(t) {
  return availableQuiz(t).length > 0 || hasGenerator(t.id);
}

/** Cuántas preguntas tendría un simulacro con esos filtros. */
export function countMockQuestions(areaNums, onlyIntroduced) {
  const calificados = areaNums.reduce((total, area) => {
    const temas = getAllTopics().filter(
      (t) => t.area === area && (!onlyIntroduced || isIntroduced(t.id)) && puedeExaminar(t)
    ).length;
    if (!temas) return total;
    const cuota = onlyIntroduced ? 0 : (_AREA_META[area] || {}).reactivos || 0;
    return total + Math.max(temas, cuota);
  }, 0);
  if (onlyIntroduced || !calificados) return calificados;
  return calificados + pilotoDe(areaNums);
}

/**
 * Serie de práctica de un solo tema. En los temas con generador sale un
 * problema distinto cada vez; en los demás rota por todo el banco.
 */
export function buildDrill(topicId, n = 10) {
  const t = topicsById()[topicId];
  if (!t) return [];
  const bank = availableQuiz(t);
  const out = [];

  if (hasGenerator(topicId)) {
    const cuantas = bank.length ? Math.max(1, Math.ceil(n * 0.6)) : n;
    generateSet(topicId, cuantas).forEach((q) => out.push(q));
  }
  shuffle(bank).forEach((q) => { if (out.length < n) out.push(q); });
  if (out.length < n && hasGenerator(topicId)) {
    generateSet(topicId, n - out.length, randomSeed()).forEach((q) => out.push(q));
  }
  return shuffle(out)
    .slice(0, n)
    .map((question) => ({ topic: t, question: shuffleOptions(question, randomSeed()) }));
}

/** Cuántas preguntas distintas puede ofrecer un tema (∞ si tiene generador). */
export function drillSize(topicId) {
  const t = topicsById()[topicId];
  if (!t) return 0;
  if (hasGenerator(topicId)) return Infinity;
  return availableQuiz(t).length;
}

export function topicHasGenerator(topicId) {
  return hasGenerator(topicId);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------- Mezcla de dos progresos (sincronización) ----------------

   Regla de oro: la mezcla NUNCA pierde avance. Ante la duda se conserva el
   dato más avanzado de cada lado.
   ------------------------------------------------------------ */

function cardIsNewer(a, b) {
  if (!b) return true;
  if (!a) return false;
  const la = a.lastReview || "";
  const lb = b.lastReview || "";
  if (la !== lb) return la > lb;
  if ((a.repetitions || 0) !== (b.repetitions || 0)) return (a.repetitions || 0) > (b.repetitions || 0);
  return (a.due || "") > (b.due || "");
}

function recomputeStreak(sessionLog) {
  const days = Object.keys(sessionLog).sort();
  if (!days.length) return { streak: 0, lastStudyDate: null };
  const set = new Set(days);
  const last = days[days.length - 1];
  let streak = 1;
  let cursor = fromISO(last);
  for (;;) {
    const prev = toISO(addDays(cursor, -1));
    if (!set.has(prev)) break;
    streak++;
    cursor = fromISO(prev);
  }
  return { streak, lastStudyDate: last };
}

export function mergeStates(a, b) {
  if (!a) return b ? Object.assign(defaultState(), b) : defaultState();
  if (!b) return Object.assign(defaultState(), a);
  const out = Object.assign(defaultState(), a);

  // Tarjetas: unión, conservando la versión más avanzada de cada una.
  out.cards = Object.assign({}, a.cards || {});
  Object.keys(b.cards || {}).forEach((id) => {
    if (cardIsNewer(b.cards[id], out.cards[id])) out.cards[id] = b.cards[id];
  });

  // Temas vistos: unión, con la fecha más antigua (fue cuando se estudió).
  out.topicsIntroduced = Object.assign({}, a.topicsIntroduced || {});
  Object.keys(b.topicsIntroduced || {}).forEach((id) => {
    const prev = out.topicsIntroduced[id];
    const next = b.topicsIntroduced[id];
    out.topicsIntroduced[id] = !prev || next < prev ? next : prev;
  });

  // Lecciones de bloque leídas: unión, con la fecha más antigua.
  out.lessonsSeen = Object.assign({}, a.lessonsSeen || {});
  Object.keys(b.lessonsSeen || {}).forEach((k) => {
    const prev = out.lessonsSeen[k];
    const next = b.lessonsSeen[k];
    out.lessonsSeen[k] = !prev || next < prev ? next : prev;
  });

  // Quiz: se queda el lado con más intentos registrados.
  out.quizStats = Object.assign({}, a.quizStats || {});
  Object.keys(b.quizStats || {}).forEach((id) => {
    const prev = out.quizStats[id];
    const next = b.quizStats[id];
    if (!prev || (next.seen || 0) > (prev.seen || 0)) out.quizStats[id] = next;
  });

  // Bitácora diaria: por día se toma el máximo de cada contador.
  out.sessionLog = {};
  const dias = new Set(Object.keys(a.sessionLog || {}).concat(Object.keys(b.sessionLog || {})));
  dias.forEach((d) => {
    const ea = (a.sessionLog || {})[d] || {};
    const eb = (b.sessionLog || {})[d] || {};
    out.sessionLog[d] = {
      cardsReviewed: Math.max(ea.cardsReviewed || 0, eb.cardsReviewed || 0),
      cardsLearned: Math.max(ea.cardsLearned || 0, eb.cardsLearned || 0),
      lessons: Math.max(ea.lessons || 0, eb.lessons || 0),
      newTopics: Math.max(ea.newTopics || 0, eb.newTopics || 0),
      quizAnswered: Math.max(ea.quizAnswered || 0, eb.quizAnswered || 0),
      quizCorrect: Math.max(ea.quizCorrect || 0, eb.quizCorrect || 0)
    };
  });

  const racha = recomputeStreak(out.sessionLog);
  out.streak = racha.streak;
  out.lastStudyDate = racha.lastStudyDate;

  out.learningOrder = (a.learningOrder && a.learningOrder.length) ? a.learningOrder : (b.learningOrder || null);
  out.dismissedWelcome = !!(a.dismissedWelcome || b.dismissedWelcome);
  out.contentRevision = Math.max(a.contentRevision || 0, b.contentRevision || 0);
  out.contentUpdate = a.contentUpdate || b.contentUpdate || null;
  const ca = a.createdAt || "";
  const cb = b.createdAt || "";
  out.createdAt = ca && cb ? (ca < cb ? ca : cb) : (ca || cb || toISO(new Date()));
  return out;
}

/** Copia del estado para mandar a sincronizar. */
export function stateSnapshot() {
  return JSON.parse(JSON.stringify(STATE));
}

/** Aplica un estado remoto mezclándolo con el local. Devuelve cuántas tarjetas cambiaron. */
export function mergeIntoState(remote) {
  const antes = Object.keys(STATE.cards).length;
  const merged = mergeStates(STATE, remote);
  STATE = merged;
  applyContentUpdate();
  saveState();
  return Object.keys(STATE.cards).length - antes;
}

/* ---------------- Búsqueda ---------------- */

function normalize(s) {
  return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
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

/* Al arrancar: incorporar contenido nuevo al progreso existente. */
applyContentUpdate();
