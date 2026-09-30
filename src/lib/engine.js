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
       ignoraría sin romperse. Lo mismo vale para las de este motor: `lapses`
       en la tarjeta; `w`, `c`, `d` y `r` en `quizStats` (aciertos recientes y
       últimas preguntas); `checks` y `mock` en la bitácora del día. Un progreso
       que no las trae se lee igual y las va creando al usarse.
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
/* El reloj se puede sustituir: las pruebas simulan semanas de estudio (y de
   ausencia) sin esperar a que pasen. En la app nunca se toca. */
let RELOJ = null;
export function setClock(fn) { RELOJ = typeof fn === "function" ? fn : null; }
export function todayDate() { return dateOnly(RELOJ ? RELOJ() : new Date()); }
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
    createdAt: toISO(todayDate()),
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
   de respuesta para simplificar la interfaz: 0=otra vez, 1=costó, 2=bien.

   SM-2 puro supone dos cosas que en la vida real no pasan, y aquí se corrigen
   sin tocar lo que ya hay guardado (intervalo, repeticiones, facilidad):

     · Que cada repaso ocurre justo el día programado. Tras unos días sin
       estudiar, una tarjeta recordada con 10 días de retraso ha resistido
       mucho más que su intervalo, y SM-2 ni se entera. Aquí el retraso cuenta
       a medias (`+ retraso/2`, como Anki). En sentido contrario, repasar una
       tarjeta ANTES de su fecha no demuestra nada nuevo: no sube la escalera.
       Sin esto, repetir tarjetas el mismo día inflaba intervalos y dominio.

     · Que las tarjetas nacen sueltas. Las que se aprenden juntas comparten
       intervalo, así que vuelven juntas para siempre y forman picos de
       cientos de repasos un solo día. Los intervalos largos llevan una
       variación determinista de ±10 % (misma tarjeta, misma variación: los
       botones y la agenda siempre coinciden).

   Y un tercer supuesto ausente: hay un examen. Ninguna tarjeta se programa
   más allá de lo que deja repasarla otra vez antes del último día. */

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
  registrar({ cardsLearned: 1 });
  saveState();
  return card;
}

/** Cuánto se puede alejar un repaso: siempre queda margen para volver a verla antes del último día de estudio. */
function topeDeIntervalo(hoy) {
  const resto = daysBetween(hoy, LAST_STUDY_DAY);
  if (resto <= 1) return 1;
  return Math.min(resto, Math.max(2, Math.floor(resto * 0.65)));
}

/** Variación determinista (±10 %) de los intervalos de 4 días o más. */
function conVariacion(interval, cardId, repeticiones) {
  if (interval < 4 || !cardId) return interval;
  const h = hashSeed(cardId + "#" + repeticiones) % 21; // 0..20
  return Math.max(3, Math.round(interval * (0.9 + h / 100)));
}

/**
 * Cómo queda una tarjeta tras calificarla. Es una función pura: la usan
 * `gradeCard` (que guarda el resultado) y `nextIntervalPreview` (que solo lo
 * muestra en los botones), así que lo que dice el botón es lo que ocurre.
 */
/* La práctica con reactivos también es recuperación, y la app pide mucha más
   que repaso: las tarjetas pueden espaciarse más que en SM-2 puro. Medio
   intervalo más desde la tercera repetición y cinco días (no tres) en la
   segunda. */
const EXPANSION = 1.5;

export function programarRepaso(card, quality, hoy, cardId) {
  const reps0 = card.repetitions || 0;
  const iv0 = Math.max(1, card.interval || 1);
  const ef0 = card.ef || 2.5;
  const lapses0 = card.lapses || 0;
  const diff = card.due ? daysBetween(fromISO(card.due), hoy) : 0; // > 0: tarde · < 0: antes de tiempo

  if (quality === 0) {
    return { repetitions: 0, interval: 1, ef: Math.max(1.3, ef0 - 0.2), lapses: lapses0 + 1, due: toISO(addDays(hoy, 1)), adelantado: false };
  }
  /* Recordarla antes de su fecha no demuestra que resista más: ni sube
     repeticiones ni alarga el intervalo. */
  if (diff < 0) {
    return { repetitions: reps0, interval: iv0, ef: ef0, lapses: lapses0, due: card.due, adelantado: true };
  }

  const retraso = diff;
  const repetitions = reps0 + 1;
  let interval, ef;
  if (quality === 1) {
    ef = Math.max(1.3, ef0 - 0.15);
    interval = repetitions <= 1 ? 1 : Math.max(1, Math.round((iv0 + retraso / 4) * 1.2));
  } else {
    ef = ef0 + 0.1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 5;
    else interval = Math.round((iv0 + retraso / 2) * ef0 * EXPANSION);
  }
  interval = Math.max(1, Math.min(conVariacion(interval, cardId, repetitions), topeDeIntervalo(hoy)));
  return { repetitions, interval, ef, lapses: lapses0, due: toISO(addDays(hoy, interval)), adelantado: false };
}

export function gradeCard(cardId, quality) {
  const card = getCard(cardId);
  const today = todayDate();
  const r = programarRepaso(card, quality, today, cardId);
  card.learned = true;
  card.repetitions = r.repetitions;
  card.interval = r.interval;
  card.ef = r.ef;
  card.due = r.due;
  if (r.lapses) card.lapses = r.lapses;
  card.lastReview = toISO(today);
  registrar({ cardsReviewed: 1 });
  saveState();
  return card;
}

/**
 * Comprobación dentro de la sesión: la tarjeta que acaba de enseñarse, o la que
 * se falló hace unos pasos, vuelve a preguntarse. No reprograma nada —la fecha
 * de la tarjeta ya quedó fijada— pero deja constancia del trabajo hecho y, si
 * la tarjeta todavía no tenía ninguna repetición y esta vez se recordó, cuenta
 * como su primera: recordar algo unos minutos después de haberlo visto (o
 * fallado) es exactamente lo que hace el primer paso de la escalera, así que
 * mañana no hace falta repetirlo otro día más antes de alargar el intervalo.
 * `quality`: 0 no se recordó, 1 costó, 2 bien.
 */
export function recallCheck(cardId, quality) {
  const card = peekCard(cardId);
  if (card && quality > 0 && (card.repetitions || 0) === 0) {
    card.repetitions = 1;
    card.lastReview = toISO(todayDate());
  }
  registrar({ checks: 1 });
  saveState();
  return card;
}

/** Texto humano del próximo repaso según la calificación, para mostrar en los botones. */
export function nextIntervalPreview(cardId, quality) {
  const card = STATE.cards[cardId] || nuevaTarjeta(cardId);
  const today = todayDate();
  const r = programarRepaso(card, quality, today, cardId);
  const interval = Math.max(1, daysBetween(today, fromISO(r.due)));
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
  const k = lessonKey(topicId, nombreBloque);
  if (!STATE.lessonsSeen[k]) registrar({ lessons: 1 });
  STATE.lessonsSeen[k] = STATE.lessonsSeen[k] || toISO(todayDate());
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
  registrar({ newTopics: 1 });
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

/* ---------------- Aciertos recientes ----------------

   `quizStats` guarda el total de toda la vida (`seen`, `correct`) y eso sigue
   igual. Pero un total de toda la vida es una mala medida de cómo vas HOY: con
   cien respuestas acumuladas, diez fallos seguidos apenas mueven el porcentaje,
   y un tema que llevas un mes sin practicar sigue luciendo igual de firme.

   Junto al total, cada tema guarda ahora un acumulado con olvido (`w` respuestas
   pesadas, `c` aciertos pesados, `d` último día). Cada respuesta nueva pesa
   uno; las anteriores pierden 10 % por respuesta y la mitad cada dos semanas.
   El resultado es un acierto que reacciona en pocas respuestas y una confianza
   que se apaga sola cuando pasa el tiempo sin practicar.

   Un progreso guardado antes de esto no trae `w` ni `c`: se toma su historial
   como a lo sumo ocho respuestas de peso. Nada se migra ni se reescribe. */

const VIDA_MEDIA_DIAS = 14;
const OLVIDO_POR_RESPUESTA = 0.9;
const PESO_HISTORICO_MAX = 8;
const RECIENTES_GUARDADAS = 6;

/** Respuestas pesadas y aciertos pesados de un tema, con el olvido aplicado hasta hoy. */
export function quizRecent(topicId) {
  const s = STATE.quizStats[topicId];
  if (!s || !s.seen) return { peso: 0, aciertos: 0, acierto: null, ultimo: null };
  if (s.w == null) {
    const peso = Math.min(s.seen, PESO_HISTORICO_MAX);
    const aciertos = (s.correct / s.seen) * peso;
    return { peso, aciertos, acierto: s.correct / s.seen, ultimo: s.d || null };
  }
  const dias = s.d ? Math.max(0, daysBetween(fromISO(s.d), todayDate())) : 0;
  const f = Math.pow(0.5, dias / VIDA_MEDIA_DIAS);
  const peso = s.w * f;
  return { peso, aciertos: s.c * f, acierto: s.w > 0 ? s.c / s.w : null, ultimo: s.d || null };
}

/** Huella de un reactivo, para no repetir el mismo dos veces seguidas. */
export function huellaDePregunta(question) {
  return question && question.q ? huellaDeFrente(question.q) : "";
}

/** Las huellas de los últimos reactivos de fijos que se contestaron de ese tema. */
export function preguntasRecientes(topicId) {
  const s = STATE.quizStats[topicId];
  return (s && s.r) || [];
}

export function recordQuizAnswer(topicId, correct, question, opts) {
  const s = STATE.quizStats[topicId] || { seen: 0, correct: 0 };
  const antes = quizRecent(topicId);
  s.w = antes.peso * OLVIDO_POR_RESPUESTA + 1;
  s.c = antes.aciertos * OLVIDO_POR_RESPUESTA + (correct ? 1 : 0);
  s.d = toISO(todayDate());
  s.seen += 1;
  if (correct) s.correct += 1;
  const h = huellaDePregunta(question);
  if (h) s.r = [h].concat((s.r || []).filter((x) => x !== h)).slice(0, RECIENTES_GUARDADAS);
  STATE.quizStats[topicId] = s;
  /* Un simulacro cuenta como día de estudio, pero no gasta el tiempo del día:
     el plan sigue pidiendo sus repasos. */
  registrar(opts && opts.simulacro ? { mock: 1 } : { quizAnswered: 1, quizCorrect: correct ? 1 : 0 });
  saveState();
}

/* Dominio de un tema.

   El cálculo penaliza tres cosas a propósito:
     · las tarjetas del tema que todavía no se repasan cuentan como 0, así que
       al crecer el temario el dominio baja y hay que repasar lo nuevo;
     · las tarjetas atrasadas pierden fuerza según cuánto se pasó su fecha
       (más rápido las de intervalo corto): dejar de estudiar se nota;
     · las preguntas acertadas solo valen del todo cuando hay suficientes
       intentos RECIENTES para ese tema (`confianza`): con un banco más grande
       se piden más respuestas, y la confianza se apaga con los días sin practicar.
   Sin intentos de quiz, la parte de preguntas vale 0.5 (neutra), igual que antes. */

const MASTERY_TARGET_REPS = 5;

/** Fuerza de una tarjeta de 0 a 1: cuánto ha resistido, menos lo que ya se le pasó. */
function fuerzaDeTarjeta(c, hoy) {
  if (!c || !(c.repetitions > 0)) return 0;
  const base = Math.min(MASTERY_TARGET_REPS, c.repetitions) / MASTERY_TARGET_REPS;
  const retraso = c.due ? Math.max(0, daysBetween(fromISO(c.due), hoy)) : 0;
  const R = Math.pow(0.9, retraso / Math.max(1, c.interval || 1));
  return base * (0.35 + 0.65 * R);
}

export function masteryDetail(topicId) {
  if (!isIntroduced(topicId)) {
    return { mastery: 0, repScore: 0, quizScore: 0, confianza: 0, cardsPendientes: 0, totalCards: 0 };
  }
  const hoy = todayDate();
  const cids = cardsForTopic(topicId);
  let suma = 0;
  let pendientes = 0;
  cids.forEach((cid) => {
    const c = STATE.cards[cid];
    if (!c || c.repetitions === 0) pendientes++;
    suma += fuerzaDeTarjeta(c, hoy);
  });
  const repScore = cids.length ? suma / cids.length : 0;

  const t = topicsById()[topicId];
  const banco = (t && t.quiz ? t.quiz.length : 0) + (hasGenerator(topicId) ? 4 : 0);
  const exigidos = Math.min(Math.max(banco, 2), 5);
  const rec = quizRecent(topicId);
  const confianza = Math.min(1, rec.peso / exigidos);
  const acierto = rec.peso > 0 ? rec.aciertos / rec.peso : 0.5;
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

/** Aciertos de un área, sumando los de todos sus temas: de toda la vida y recientes. */
function aciertosDeArea(areaNum) {
  let seen = 0, correct = 0, peso = 0, aciertosPesados = 0;
  topicsOfArea(areaNum).forEach((t) => {
    const s = quizStatsFor(t.id);
    seen += s.seen;
    correct += s.correct;
    const r = quizRecent(t.id);
    peso += r.peso;
    aciertosPesados += r.aciertos;
  });
  return {
    seen, correct, peso,
    /* El acierto que decide es el reciente: refleja cómo vas ahora, no el
       promedio de todo lo que has contestado desde agosto. */
    acierto: peso > 0 ? aciertosPesados / peso : null
  };
}

/** Margen extra que pide un área por ser corta (más varianza, menos preguntas). */
function margenPorTamano(reactivos) {
  const n = Math.max(1, reactivos || 1);
  /* Desviación típica de la proporción de aciertos con p ≈ 0.65, redondeada a
     un margen de trabajo: ~0.11 con n = 19 y ~0.08 con n = 32. */
  return Math.sqrt(0.65 * 0.35 / n);
}

/** Qué fracción del temario debería estar vista hoy según el calendario de aprendizaje. */
function coberturaEsperada() {
  const hoy = clampDate(todayDate(), STUDY_START, LEARNING_END);
  return Math.min(1, daysBetween(STUDY_START, hoy) / Math.max(1, daysBetween(STUDY_START, LEARNING_END)));
}

/**
 * Estado de cada área frente al objetivo, ordenadas de mayor a menor riesgo.
 * `riesgo` va de 0 (fuera de peligro) a 1 (muy por debajo).
 *
 * El riesgo es relativo al calendario: un área con el 10 % visto no es un
 * problema en la primera semana y sí lo es a un mes del examen.
 */
export function areaReadiness() {
  const esperada = coberturaEsperada();
  /* Cuánto pesa no tener datos: nada en agosto, casi todo cuando ya debería
     haber práctica de sobra. */
  const avance = Math.min(1, Math.max(0.3, esperada * 2));
  return areaNumbers().map((n) => {
    const meta = _AREA_META[n] || {};
    const stats = areaStats(n);
    const { seen, correct, peso, acierto } = aciertosDeArea(n);
    const objetivo = Math.min(0.9, OBJETIVO_BASE + margenPorTamano(meta.reactivos));

    /* Sin respuestas suficientes no se puede juzgar el acierto, así que manda
       la cobertura frente a lo que el calendario ya pedía. */
    const minRespuestas = Math.max(8, Math.round((meta.reactivos || 20) / 2));
    const confianza = Math.min(1, peso / minRespuestas);
    const faltaCobertura = Math.max(0, esperada - stats.coverage / 100) / Math.max(esperada, 0.25);

    const brecha = acierto === null ? 1 : Math.max(0, objetivo - acierto) / objetivo;
    const riesgo = Math.min(1, confianza * brecha + (1 - confianza) * Math.max(faltaCobertura, brecha * 0.5 * avance));

    return {
      area: n,
      nombre: meta.short || meta.name || String(n),
      reactivos: meta.reactivos || 0,
      sesion: meta.session,
      cobertura: stats.coverage,
      dominio: stats.mastery,
      respondidos: seen,
      aciertos: correct,
      acierto,                                   // reciente; null si aún no hay datos
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
  const abiertas = availableQuiz(topic);
  /* Sin repetir lo que se acaba de contestar: con un banco de cuatro o cinco
     reactivos por tema, sacar el mismo dos días seguidos enseña la pregunta y
     no el concepto. Si ya se contestaron todos, vale cualquiera. */
  const recientes = preguntasRecientes(topic.id);
  const frescas = abiertas.filter((q) => !recientes.includes(huellaDePregunta(q)));
  const bank = frescas.length ? frescas : abiertas;
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

/* ---------------- Plan de hoy / ritmo adaptativo ----------------

   El plan del día es UNA lista de pasos, construida dentro del motor, y la app
   la recorre tal cual. Antes eran cinco listas sueltas que la pantalla juntaba
   por su cuenta, y por eso el plan decía un número de pasos y la sesión otro
   (al conocer un tema se le sumaban después sus tarjetas base).

   Un plan tiene tres reglas que antes no tenía:

   1. UN PRESUPUESTO DE TIEMPO. Cada paso cuesta minutos (`COSTO`) y el día tiene
      una duración objetivo. Los repasos ya no entran todos por estar vencidos:
      tras una semana sin estudiar había 260 tarjetas «para hoy» y 3 horas de
      sesión, que no es un plan sino un abandono asegurado. Las que no caben
      siguen vencidas y entran, en orden de urgencia, en los días siguientes.
      El presupuesto crece un poco cuando el calendario aprieta (van atrasados
      los temas nuevos) y nunca pasa de un tope.

   2. CUENTA DEL DÍA. Lo ya hecho hoy —guardado al instante, no al final de la
      sesión— se descuenta. Terminar la sesión deja el día en «nada pendiente»
      y abandonarla a la mitad deja lo que falta, ni más ni menos.

   3. EL ATRASO SE DRENA, NO SE ACUMULA. Con más vencidas de las que caben, la
      sesión pasa a modo recuperación: entra un solo tema nuevo (si el
      calendario lo permite) y el tiempo va a repasar, lo más olvidable primero.
   ------------------------------------------------------------ */

/* Tope de tarjetas nuevas que se enseñan en un mismo día. Sin tope, un paquete
   de contenido recién agregado convertiría la sesión en una lectura larguísima. */
const MAX_APRENDER_POR_DIA = 6;

/* Tope de lecciones de ampliación por día. Un progreso que viene de antes de
   que existieran tiene todas pendientes de golpe; sin tope, la primera sesión
   se convertiría en una lectura interminable. */
const MAX_LECCIONES_POR_DIA = 2;

/* Piso de temas nuevos por sesión. El reparto por calendario divide lo que
   falta entre los días que quedan, así que ir adelantado lo hace bajar hasta
   un solo tema por día: el plan se frena justo cuando hay ritmo de sobra.
   Mientras queden temas sin conocer, la sesión trae al menos estos dos. */
const MIN_TEMAS_NUEVOS_POR_DIA = 2;

/* Tope de temas nuevos por sesión, para que un atraso grande no convierta un
   día en una maratón de notas. */
const MAX_TEMAS_NUEVOS_POR_DIA = 8;

/* Minutos que cuesta cada cosa (estimación de estudio real, no de lectura
   veloz). `nota` es leer la explicación de un tema nuevo. */
export const COSTO = { repaso: 0.5, aprender: 0.8, comprobar: 0.35, leccion: 2, nota: 3, reactivo: 1.2 };

/* Duración objetivo de un día y el máximo al que puede estirarse si el
   calendario lo pide. */
export const MINUTOS_SESION = 30;
export const MINUTOS_TOPE = 45;

/* Menos minutos que estos y el día se da por cumplido: no vale la pena abrir
   una sesión de tres tarjetas. */
const MINUTOS_MINIMOS = 6;

export const MIN_REPASOS = 8;  // aunque haya mucho material nuevo, el recuerdo no se descuida
export const MAX_REPASOS = 30;  // ni un día de recuperación pasa de aquí
export const REPASOS_EXTRA = 20; // una ronda opcional para seguir con el atraso
export const UMBRAL_ATRASO = 40; // más vencidas que esto: modo recuperación
const EXTRA_POR_ATRASO = 5;   // minutos extra que pide un atraso muy profundo
export const REACTIVOS_POR_DIA = 12; // práctica diaria con reactivos
export const REACTIVOS_FASE_FINAL = 24; // en el repaso final, la práctica con el formato del examen pesa el doble
const REACTIVOS_MIN = 6;      // piso cuando el repaso se come el día
const CHECK_MAX_INTENTOS = 2; // cuántas veces se le vuelve a preguntar en la sesión una tarjeta fallada

export function planPhase(today) {
  if (today < STUDY_START) return "before";
  if (today > LAST_STUDY_DAY) return "after";
  if (today > LEARNING_END) return "review";
  return "learning";
}

/** Lo que se ha hecho hoy (`sessionLog` se escribe al instante, paso a paso). */
function hechoHoy() {
  return STATE.sessionLog[toISO(todayDate())] || {};
}

/** Minutos de estudio ya gastados hoy. La práctica de más y los simulacros no le quitan tiempo al repaso. */
export function minutosHechosHoy(reactivosTope = REACTIVOS_POR_DIA) {
  const h = hechoHoy();
  return (h.cardsReviewed || 0) * COSTO.repaso + (h.cardsLearned || 0) * COSTO.aprender +
    (h.checks || 0) * COSTO.comprobar + (h.lessons || 0) * COSTO.leccion + (h.newTopics || 0) * COSTO.nota +
    Math.min(h.quizAnswered || 0, reactivosTope) * COSTO.reactivo;
}

/** Cuánto vale un paso, en minutos. */
export function costoDePaso(step) {
  switch (step && step.type) {
    case "review": return step.check ? COSTO.comprobar : COSTO.repaso;
    case "learn": return COSTO.aprender;
    case "lesson": return COSTO.leccion;
    case "intro": return COSTO.nota;
    case "quiz": return COSTO.reactivo;
    default: return 0;
  }
}

/** Minutos que suman los pasos de una sesión. */
export function minutosDeSesion(steps) {
  return (steps || []).reduce((n, st) => n + costoDePaso(st), 0);
}

/* Qué tan urgente es repasar una tarjeta.

   Antes se ordenaban por fecha de vencimiento y nada más. Ahora pesan:

     · lo olvidable que está: la probabilidad de recordarla cae con el tiempo
       desde su último repaso, en proporción a su intervalo. Una tarjeta de un
       día con cinco de retraso se ha olvidado; una de un mes con uno de
       retraso sigue firme;
     · su fragilidad: facilidad baja y caídas previas (`lapses`);
     · cómo va el tema en la práctica reciente;
     · y el riesgo del área a la que pertenece: el examen se acredita por área. */
function retencionAlRepasar(card, hoy) {
  const iv = Math.max(1, card.interval || 1);
  const desde = card.lastReview ? fromISO(card.lastReview) : addDays(fromISO(card.due), -iv);
  return Math.pow(0.9, Math.max(0, daysBetween(desde, hoy)) / iv);
}

function prioridadDeRepaso(card, hoy, ctx) {
  const R = retencionAlRepasar(card, hoy);
  /* Lo más urgente NO es lo más olvidado. Una tarjeta con la probabilidad de
     recuerdo por los suelos ya casi hay que volver a aprenderla, y si con poco
     tiempo se atiende siempre primero lo más perdido, se gasta el día en
     fallar tarjetas que mañana vuelven a fallar mientras las recién falladas
     —que sí se recuerdan y solo necesitan un repaso más— se pudren esperando.
     El valor de repasar sube al caer la probabilidad, llega a su máximo hacia el
     30 % y baja desde ahí. */
  const urgencia = (1 - R) * Math.min(1, 0.15 + 3 * R);
  /* Terminar lo empezado: una tarjeta que se aprendió o se falló hace pocos
     días y aún no sale del primer escalón es la forma más barata de convertir
     tiempo en recuerdo. */
  const reciente = card.lastReview ? daysBetween(fromISO(card.lastReview), hoy) <= 4 : false;
  const empezada = (card.repetitions || 0) <= 1 && (card.interval || 1) <= 1 && reciente ? 4 : 1;
  const ef = card.ef || 2.5;
  const fragilidad = 1 + 0.4 * Math.max(0, Math.min(1, (2.5 - ef) / 1.2)) + 0.12 * Math.min(3, card.lapses || 0);
  return urgencia * empezada * fragilidad * (1 + 0.5 * (1 - ctx.aciertoTema)) * (1 + 0.6 * ctx.riesgoArea);
}

/** Acierto reciente de un tema, suavizado con una respuesta imaginaria del 60 % para no fiarse de dos intentos. */
function aciertoSuavizado(topicId, previo) {
  const r = quizRecent(topicId);
  return (r.aciertos + previo) / (r.peso + 1);
}

/* Reordena una lista respetando el orden de prioridad lo más posible, pero sin
   dejar juntos dos elementos con la misma clave. Es el entrelazado
   (interleaving) dentro de la sesión: tarjetas del mismo tema se llaman entre
   sí, y ver cuatro de la misma materia seguidas es estudiar en bloque.

   `claves` va de la más importante a la menos: primero se busca el siguiente
   elemento que difiera del anterior en TODAS; si no hay, en las primeras, y así
   hasta la primera. Si ni eso, se sigue el orden de prioridad. */
function entrelazar(items, claves) {
  const resto = items.slice();
  const out = [];
  while (resto.length) {
    const prev = out[out.length - 1];
    let i = -1;
    if (prev) {
      for (let k = claves.length; k >= 1 && i < 0; k--) {
        const cs = claves.slice(0, k);
        i = resto.findIndex((x) => cs.every((clave) => clave(x) !== clave(prev)));
      }
    }
    out.push(resto.splice(i < 0 ? 0 : i, 1)[0]);
  }
  return out;
}

/** El costo en minutos de conocer un tema: su nota y sus tarjetas base (enseñarlas y comprobarlas). */
function costoDeTema(t) {
  const base = t.blocks && t.blocks.length ? cardsOfBlock(t.id, t.blocks[0]).length : cardsForTopic(t.id).length;
  return COSTO.nota + base * (COSTO.aprender + COSTO.comprobar);
}

/* Arma la sesión como una sola lista.

   Orden y por qué:
     · Los repasos se reparten en tandas y entre tanda y tanda entra material
       nuevo. Ni cincuenta tarjetas seguidas antes de tocar algo nuevo ni un
       maratón de lectura: se alterna recuperar y aprender, y lo nuevo llega
       con la cabeza todavía fresca.
     · Cada unidad de material nuevo (un tema con sus tarjetas base, o las
       tarjetas de ampliación que tocan hoy) se COMPRUEBA un poco después, en
       la misma sesión: se lee, se hace otra cosa, y se pregunta. Es el primer
       recuerdo, el que más cuesta y el que más fija.
     · Una lección va justo antes de la primera tarjeta de su bloque; las de
       bloques sin tarjetas, antes de la práctica.
     · La práctica va al final, entrelazada por área.
   Y nada se pregunta antes de haberse enseñado: los repasos son de tarjetas
   ya vistas, las comprobaciones vienen después de su paso de aprendizaje y la
   práctica solo usa reactivos de bloques ya abiertos. */
function armarPasos({ repasos, unidades, lecciones, preguntas }) {
  const M = unidades.length;
  const tanda = M ? Math.min(20, Math.max(1, Math.ceil(repasos.length / (M + 1)))) : repasos.length;
  const reviewStep = (e) => ({ type: "review", cardId: e.cardId, topicId: e.topicId });
  const comprobaciones = (u) => u.pasos.filter((p) => p.type === "learn")
    .map((p) => ({ type: "review", cardId: p.cardId, topicId: p.topicId, check: true }));

  const out = [];
  let r = 0;
  const tomar = (n) => { for (let i = 0; i < n && r < repasos.length; i++) out.push(reviewStep(repasos[r++])); };
  unidades.forEach((u, k) => {
    tomar(tanda);
    out.push(...u.pasos);
    if (k >= 1) out.push(...comprobaciones(unidades[k - 1]));
  });
  tomar(repasos.length);
  if (M) out.push(...comprobaciones(unidades[M - 1]));

  /* Cada lección, justo antes de la primera tarjeta de su bloque. */
  const pendientes = new Map(lecciones.map((l) => [l.topicId + "::" + l.bloque, l]));
  const conLecciones = [];
  out.forEach((p) => {
    if (p.type === "review" || p.type === "learn") {
      const bc = blockOfCard(p.cardId);
      const key = bc ? bc.topic.id + "::" + bc.block.nombre : null;
      const l = key && pendientes.get(key);
      if (l) {
        pendientes.delete(key);
        conLecciones.push({ type: "lesson", topic: l.topic, bloque: l.bloque, leccion: l.leccion });
      }
    }
    conLecciones.push(p);
  });
  /* Las que no tienen tarjeta donde engancharse (bloques de solo reactivos). */
  pendientes.forEach((l) => conLecciones.push({ type: "lesson", topic: l.topic, bloque: l.bloque, leccion: l.leccion }));

  preguntas.forEach((qq) => conLecciones.push({ type: "quiz", topic: qq.topic, question: qq.question }));
  return conLecciones;
}

/**
 * El plan de hoy.
 *
 * `opts.extra`: una ronda opcional de repaso atrasado, para cuando el día ya se
 * cumplió y todavía quedan tarjetas vencidas. No trae nada nuevo ni práctica.
 */
export function computeTodayPlan(opts) {
  const extra = !!(opts && opts.extra);
  const rawToday = todayDate();
  const today = clampDate(rawToday, STUDY_START, LAST_STUDY_DAY);
  const phase = planPhase(rawToday);
  const order = getLearningOrder();
  const hecho = hechoHoy();
  const nuevosHoy = hecho.newTopics || 0;
  const notIntroduced = order.filter((id) => !isIntroduced(id));

  /* ---- Tarjetas vencidas ---- */
  const todayISO = toISO(rawToday);
  const vencidas = [];
  Object.keys(STATE.cards).forEach((cardId) => {
    const topicId = cardId.split("::")[0];
    if (!isIntroduced(topicId)) return;
    /* Una tarjeta cuyo contenido ya no existe no se puede enseñar ni repasar:
       si entrara al plan, la sesión tendría un paso en blanco. La
       reconciliación del arranque las quita, esto es la red por si acaso. */
    if (!flashcardOf(cardId)) return;
    /* Y una tarjeta de un bloque que hoy no está en el plan tampoco sale. El
       modo esencial promete que las tarjetas de ampliación ya programadas
       "dejan de proponerse mientras el modo esté activo" —guardadas, con su
       intervalo intacto, pero fuera de la sesión—. */
    const bloque = blockOfCard(cardId);
    if (bloque && !bloqueEnPlan(bloque.block)) return;
    const card = STATE.cards[cardId];
    if (card.due > todayISO) return;
    vencidas.push({ cardId, topicId, due: card.due });
  });
  vencidas.sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : a.cardId < b.cardId ? -1 : 1));

  /* El atraso se mide AL AMANECER: lo que ya se repasó hoy ya no está vencido,
     y si el modo del día dependiera de lo que queda, terminar los repasos de una
     sesión de recuperación la convertiría, a media mañana, en un día normal con
     temas nuevos que la sesión nunca prometió. */
  const vencidasAprendidas = vencidas.filter((e) => isLearned(e.cardId)).length + (hecho.cardsReviewed || 0);

  /* ---- Cuántos temas nuevos toca el día (por calendario) ----
     Se calcula con los temas que había por conocer al AMANECER: los que ya se
     conocieron hoy cuentan, si no el cupo del día se recalcularía a la baja
     con cada tema y la sesión nunca terminaría. */
  const porConocer = notIntroduced.length + nuevosHoy;
  let cupoDelDia;
  let porCalendario = 0;
  if (phase === "after") {
    cupoDelDia = 0;
  } else if (phase === "review") {
    /* Ya no es fase de aprender, pero si quedan temas sin ver hay que repartirlos
       en los días que quedan (dejando el último para repasar), no dejarlos fuera. */
    const diasHastaElUltimo = Math.max(1, daysBetween(rawToday, LAST_STUDY_DAY) - 1);
    porCalendario = Math.ceil(porConocer / diasHastaElUltimo);
    cupoDelDia = Math.min(MAX_TEMAS_NUEVOS_POR_DIA, porCalendario, porConocer);
  } else {
    const daysLeft = Math.max(1, daysBetween(today, LEARNING_END) + 1);
    porCalendario = Math.ceil(porConocer / daysLeft);
    cupoDelDia = Math.min(MAX_TEMAS_NUEVOS_POR_DIA, Math.max(MIN_TEMAS_NUEVOS_POR_DIA, porCalendario), porConocer);
  }
  /* Cuánto aprieta el calendario: con más de tres temas al día ya se pide más
     tiempo, hasta el tope cuando hay que meter ocho. */
  const presion = cupoDelDia > 3 ? Math.min(1, (cupoDelDia - 3) / (MAX_TEMAS_NUEVOS_POR_DIA - 3)) : 0;
  /* Un atraso profundo pide un poco más de tiempo: con 200 tarjetas de sobra,
     45 minutos al día tardarían semanas en ponerlas al día. Se suma hasta un
     cuarto de hora, y solo mientras el atraso siga siendo profundo. */
  const atrasoProfundo = extra ? 0 : Math.min(1, Math.max(0, (vencidasAprendidas - UMBRAL_ATRASO) / (3 * UMBRAL_ATRASO)));
  const minutosDelDia = Math.min(MINUTOS_TOPE, MINUTOS_SESION + presion * (MINUTOS_TOPE - MINUTOS_SESION) + atrasoProfundo * EXTRA_POR_ATRASO);
  /* A medida que se acerca el examen el peso pasa de aprender a practicar: en
     el repaso final ya no queda temario que ver (o casi) y lo que más se parece
     al examen es contestar reactivos. */
  const reactivosDia = phase === "review" ? REACTIVOS_FASE_FINAL : REACTIVOS_POR_DIA;
  const disponible = extra ? Infinity : minutosDelDia - minutosHechosHoy(reactivosDia);
  const diaCumplido = !extra && disponible < MINUTOS_MINIMOS;

  /* ---- Contexto de riesgo: una sola vez ---- */
  const readiness = areaReadiness();
  const riesgoPorArea = {};
  readiness.forEach((a) => { riesgoPorArea[a.area] = a.riesgo; });
  const pesos = {};
  readiness.forEach((a) => { pesos[a.area] = 1 + 2 * a.riesgo; });
  const aciertoDe = {};
  const aciertoTema = (topicId) => {
    if (aciertoDe[topicId] === undefined) aciertoDe[topicId] = aciertoSuavizado(topicId, 0.6);
    return aciertoDe[topicId];
  };

  const enRecuperacion = !extra && vencidasAprendidas > UMBRAL_ATRASO;

  /* ---- Temas nuevos que entran hoy ----
     El orden base entrelaza las siete áreas de forma pareja, pero el examen se
     aprueba área por área: si una va por debajo de la línea, sus temas
     pendientes pasan al frente. Se toma una ventana de los siguientes y dentro
     de ella manda el riesgo, para no desarmar el reparto ni dejar un área sin
     avanzar durante semanas. */
  let cupo = extra || diaCumplido ? 0 : Math.max(0, Math.min(cupoDelDia - nuevosHoy, notIntroduced.length));
  /* En recuperación se quita el piso de temas nuevos y se avanza con un tema
     menos de lo que pide el calendario (al menos uno): primero se pone al día lo
     que ya se sabía y se está olvidando. Lo que así se retrasa el calendario lo
     recupera solo, porque el cupo diario se recalcula con lo que falta. */
  if (enRecuperacion) cupo = Math.min(cupo, Math.max(0, Math.max(1, porCalendario - 1) - nuevosHoy));
  const ventana = notIntroduced.slice(0, Math.max(cupo, cupo * 4));
  const priorizados = ventana
    .map((id, pos) => ({ id, pos, riesgo: riesgoPorArea[(topicsById()[id] || {}).area] || 0 }))
    .sort((a, b) => b.riesgo - a.riesgo || a.pos - b.pos)
    .map((x) => topicsById()[x.id])
    .filter(Boolean);

  /* ---- Práctica: cuántas preguntas quedan por hacer hoy ---- */

  /* ---- Lecciones ----
     Las tarjetas de un bloque cuya lección todavía no se ha leído no pueden
     salir hoy… salvo que hoy toque justamente esa lección. Se eligen las de las
     tarjetas más atrasadas y el resto espera su turno: preguntar antes de
     explicar es exactamente lo que se quiere evitar.

     Un bloque SIN tarjetas también necesita su turno: uno que únicamente trae
     reactivos —los de `formato` y `refuerzo`— no podría enseñar su lección
     nunca si solo se sacaran de las tarjetas vencidas, y su banco quedaría
     cerrado para siempre. Se recorren también los bloques sin tarjetas de los
     temas ya conocidos, después de las lecciones que sí tienen tarjetas
     atrasadas. */
  const nuevosIds = new Set(priorizados.slice(0, cupo).map((t) => t.id));
  const topesLecciones = extra || diaCumplido ? 0 : Math.max(0, (enRecuperacion ? 1 : MAX_LECCIONES_POR_DIA) - (hecho.lessons || 0));
  const leccionesPendientes = [];
  const vistaHoy = new Set();
  const apuntarLeccion = (topicId, topic, block, index) => {
    if (!bloqueEnPlan(block)) return;
    if (isLessonSeen(topicId, block, index)) return;
    const key = lessonKey(topicId, block.nombre);
    if (vistaHoy.has(key)) return;
    vistaHoy.add(key);
    if (leccionesPendientes.length < topesLecciones) {
      leccionesPendientes.push({ topicId, topic, bloque: block.nombre, leccion: block.leccion, conTarjetas: block.fcTo > block.fcFrom });
    }
  };
  /* Un tema que se conoció hoy ya tuvo su nota; sus lecciones de ampliación
     esperan a mañana (si no, cada tema nuevo abriría más lecciones ese mismo día). */
  const deHoy = (id) => nuevosIds.has(id) || STATE.topicsIntroduced[id] === todayISO;
  vencidas.forEach((e) => {
    if (deHoy(e.topicId)) return;
    const bc = blockOfCard(e.cardId);
    if (!bc) return;
    apuntarLeccion(e.topicId, bc.topic, bc.block, bc.index);
  });
  if (!extra) {
    getAllTopics().forEach((t) => {
      if (!isIntroduced(t.id) || deHoy(t.id)) return; // hoy ya trae bastante con su nota
      (t.blocks || []).forEach((b, i) => {
        if (b.fcTo > b.fcFrom) return;   // los de tarjetas ya pasaron por el recorrido de arriba
        apuntarLeccion(t.id, t, b, i);
      });
    });
  }
  const seEnseñaHoy = new Set(leccionesPendientes.map((l) => lessonKey(l.topicId, l.bloque)));
  const conLeccion = (e) => {
    const bc = blockOfCard(e.cardId);
    if (!bc || isLessonSeen(e.topicId, bc.block, bc.index)) return true;
    return seEnseñaHoy.has(lessonKey(e.topicId, bc.block.nombre));
  };

  const candidatas = vencidas.filter((e) => !nuevosIds.has(e.topicId) && conLeccion(e));
  const pool = candidatas.filter((e) => isLearned(e.cardId));
  // Una tarjeta que nunca se ha visto no se examina: primero se enseña.
  const sinVer = candidatas.filter((e) => !isLearned(e.cardId));

  /* ---- Práctica: qué temas ---- */
  /* Los temas que se conocieron hoy no entran a la práctica de hoy: ya tienen su
     nota y su comprobación, y el tamaño del día se fija con los temas de ayer
     hacia atrás (si no, cada tema nuevo abriría más práctica y el día nunca
     terminaría). */
  const eligibleForQuiz = getAllTopics().filter((t) => isIntroduced(t.id) && !nuevosIds.has(t.id) && STATE.topicsIntroduced[t.id] !== todayISO);
  /* Cuántos reactivos toca hoy: los que pide la fase, sin pasar de los temas
     que hay para preguntar (un reactivo por tema y día). Se descuentan los que
     ya se contestaron; si quedan menos de tres, no vale la pena otra tanda. */
  const objetivoPractica = Math.min(reactivosDia, eligibleForQuiz.length);
  let reactivosRestantes = extra || diaCumplido ? 0 : Math.max(0, objetivoPractica - (hecho.quizAnswered || 0));
  if (reactivosRestantes < 3 && objetivoPractica >= 3) reactivosRestantes = 0;

  /* La práctica se reparte por riesgo de área (subir de 85 % a 90 % donde ya
     se pasa no acerca a aprobar; de 55 % a 65 % donde no se pasa, sí), por el
     acierto RECIENTE del tema y por cuánto hace que no se practica: un tema
     flojo que se acaba de practicar puede esperar un par de días. */
  const frescura = (t) => {
    const r = quizRecent(t.id);
    if (!r.ultimo) return 1;
    const dias = Math.max(0, daysBetween(fromISO(r.ultimo), rawToday));
    return Math.min(1, (dias + 0.5) / 3);
  };
  const urgencia = (t) => (1 - aciertoSuavizado(t.id, 0.35)) * (pesos[t.area] || 1) * frescura(t);
  const conUrgencia = eligibleForQuiz.map((t) => ({ t, u: urgencia(t) })).sort((a, b) => b.u - a.u).map((x) => x.t);

  /* Aun priorizando, ninguna área se queda sin práctica: las cuatro primeras
     plazas se reservan a temas de áreas distintas para no encerrar la sesión
     entera en una sola. */
  const quizTopics = [];
  const areasVistas = new Set();
  conUrgencia.forEach((t) => {
    if (quizTopics.length >= 4 || areasVistas.has(t.area)) return;
    areasVistas.add(t.area);
    quizTopics.push(t);
  });
  conUrgencia.forEach((t) => {
    if (quizTopics.length < reactivosDia && !quizTopics.includes(t)) quizTopics.push(t);
  });

  /* ---- Reparto del tiempo ----
     El día se reparte por partes, no por orden de llegada: si el repaso se
     llevara todo lo que tiene vencido, la práctica con reactivos —que es lo
     que el examen pide— y lo nuevo se quedarían sin tiempo justo cuando más
     falta hacen. Normal: mucha más práctica que repaso —unos 12 reactivos contra
     10 o 12 tarjetas—, un tercio a lo nuevo y el repaso con lo que sobre. En
     recuperación el repaso crece, sin desaparecer la práctica.
     Lo que una parte no usa lo aprovecha la siguiente. */
  /* El atraso pesa de forma gradual, no de golpe: con 20 vencidas apenas se
     nota y con 80 el repaso ya es lo principal. Un umbral duro hacía que el
     día alternara entre «casi solo práctica» y «casi solo repaso». */
  const carga = extra ? 0 : Math.min(1, Math.max(0, (vencidasAprendidas - 20) / 60));
  const mezcla = (a, b) => a + (b - a) * carga;
  const parte = phase === "review" ? { nuevo: 0.15, practica: 0.55 }
    : { nuevo: mezcla(0.3, 0.12), practica: mezcla(0.48, 0.3) };
  const hayPractica = reactivosRestantes > 0 && quizTopics.length > 0;
  const maxReactivos = Math.min(reactivosRestantes, quizTopics.length);
  const pisoPractica = hayPractica ? Math.min(REACTIVOS_MIN, maxReactivos) * COSTO.reactivo : 0;
  const metaPractica = hayPractica
    ? Math.min(maxReactivos * COSTO.reactivo, Math.max(pisoPractica, disponible * parte.practica))
    : 0;
  const pisoRepasos = Math.min(pool.length, MIN_REPASOS) * COSTO.repaso;

  /* Temas nuevos: mandan el calendario y el riesgo del área, pero no pueden
     comerse más del 60 % de lo que queda tras los mínimos de repaso y práctica. */
  const paraTemas = Math.max(0, disponible - pisoRepasos - pisoPractica) * 0.6;
  const newTopics = [];
  let gastoTemas = 0;
  for (const t of priorizados) {
    if (newTopics.length >= cupo) break;
    const c = costoDeTema(t);
    /* El primero entra siempre que quepa en el día; los demás, solo si caben en su parte. */
    if (newTopics.length ? gastoTemas + c > paraTemas : c > disponible) break;
    newTopics.push(t);
    gastoTemas += c;
  }

  /* Lecciones y goteo de tarjetas nuevas (ampliaciones y tarjetas que quedaron
     sin enseñar). Toman lo que queda de la parte de lo nuevo después de los
     temas. Una lección que hace falta para mostrar una tarjeta siempre entra:
     sin ella la tarjeta no podría salir. */
  const leccionesSinTarjeta = leccionesPendientes.filter((l) => !l.conTarjetas);
  /* La parte de lo nuevo se mide sobre el día completo, restando lo nuevo que ya
     se hizo hoy; medirla sobre lo que queda haría que, al terminar la sesión,
     siempre sobrara un poco «de lo nuevo» y el día nunca acabara. */
  const nuevoHecho = (hecho.newTopics || 0) * COSTO.nota +
    (hecho.cardsLearned || 0) * (COSTO.aprender + COSTO.comprobar) + (hecho.lessons || 0) * COSTO.leccion;
  const parteGoteo = extra || diaCumplido
    ? 0
    : Math.max(minutosDelDia * parte.nuevo - nuevoHecho - gastoTemas, leccionesSinTarjeta.length && !(hecho.lessons > 0) ? COSTO.leccion : 0);
  const leccionesUsadas = [];
  const usadas = new Set();
  let gastoGoteo = 0;
  const usarLeccion = (key) => {
    if (usadas.has(key)) return 0;
    const l = leccionesPendientes.find((x) => lessonKey(x.topicId, x.bloque) === key);
    if (!l) return 0;
    usadas.add(key);
    leccionesUsadas.push(l);
    return COSTO.leccion;
  };
  const llaveDeBloque = (cardId) => {
    const bc = blockOfCard(cardId);
    return bc && !isLessonSeen(bc.topic.id, bc.block, bc.index) ? lessonKey(bc.topic.id, bc.block.nombre) : null;
  };

  /* Primero las lecciones de bloques que solo traen reactivos: abren el banco
     con el formato del examen y no tienen otro camino para enseñarse. */
  for (const l of leccionesSinTarjeta) {
    if (gastoGoteo + COSTO.leccion > parteGoteo) break;
    gastoGoteo += usarLeccion(lessonKey(l.topicId, l.bloque));
  }
  const learnCards = [];
  const topeAprender = enRecuperacion ? 0 : MAX_APRENDER_POR_DIA;
  /* Las tarjetas base de los temas que se conocieron hoy no cuentan contra el
     tope: ese tope es del goteo de ampliaciones. */
  const hoyISO = toISO(rawToday);
  let baseDeHoy = 0;
  Object.keys(STATE.topicsIntroduced).forEach((id) => {
    if (STATE.topicsIntroduced[id] !== hoyISO) return;
    const t = topicsById()[id];
    if (!t) return;
    (t.blocks && t.blocks.length ? cardsOfBlock(id, t.blocks[0]) : cardsForTopic(id)).forEach((cid) => { if (isLearned(cid)) baseDeHoy++; });
  });
  const topeGoteo = extra || diaCumplido ? 0 : Math.max(0, topeAprender - Math.max(0, (hecho.cardsLearned || 0) - baseDeHoy));
  /* Las tarjetas base de un tema cuya nota ya se leyó van primero y no se
     regatean, ni siquiera en recuperación: el tema ya se dio por conocido y
     dejarlas sin enseñar es dejarlo a medias. */
  const esBase = (e) => { const bc = blockOfCard(e.cardId); return !!bc && bc.index === 0; };
  const conBase = sinVer.filter(esBase).concat(sinVer.filter((e) => !esBase(e)));
  const topeBase = extra || diaCumplido ? 0 : 8;
  let basesPlaneadas = 0;
  for (const e of conBase) {
    const base = esBase(e);
    if (base) {
      if (basesPlaneadas >= topeBase) continue;
      basesPlaneadas++;
    } else if (learnCards.length - basesPlaneadas >= topeGoteo) {
      break;
    }
    const llave = llaveDeBloque(e.cardId);
    const costo = COSTO.aprender + COSTO.comprobar + (llave && !usadas.has(llave) ? COSTO.leccion : 0);
    if (!base && gastoGoteo + costo > parteGoteo) break;
    if (llave) gastoGoteo += usarLeccion(llave);
    gastoGoteo += COSTO.aprender + COSTO.comprobar;
    learnCards.push(e);
  }
  const gastoNuevo = gastoTemas + gastoGoteo;

  /* Repasos: los más urgentes que caben, con un piso para que el recuerdo no
     se descuide aunque haya mucho material nuevo. */
  const priorizadas = pool
    .map((e) => {
      const topic = topicsById()[e.topicId];
      const prio = prioridadDeRepaso(STATE.cards[e.cardId], rawToday, {
        aciertoTema: aciertoTema(e.topicId),
        riesgoArea: riesgoPorArea[topic ? topic.area : 0] || 0
      });
      return Object.assign({}, e, { prioridad: prio, area: topic ? topic.area : 0 });
    })
    .sort((a, b) => b.prioridad - a.prioridad || (a.due < b.due ? -1 : a.due > b.due ? 1 : a.cardId < b.cardId ? -1 : 1));

  const presupuestoRepasos = extra ? Infinity : diaCumplido ? 0 : disponible - gastoNuevo - metaPractica;
  /* Fuera de recuperación el repaso nunca pesa más que la práctica: como
     mucho tantas tarjetas como reactivos (y no menos de un piso pequeño). En
     un atraso, en cambio, sí hace crecer el repaso, porque no se pone al día con práctica. */
  /* Fuera de recuperación el repaso no pesa más que la práctica: si se reparten
     los minutos que quedan entre r tarjetas y r reactivos, r = restante / 1.7
     (0.5 + 1.2 min). Un atraso real sí puede pasar de ahí. */
  const tarjetasEquilibradas = Math.max(MIN_REPASOS, Math.floor(Math.max(0, disponible - gastoNuevo) / (COSTO.repaso + COSTO.reactivo)));
  const topeRepasos = extra ? REPASOS_EXTRA : diaCumplido ? 0
    : Math.min(MAX_REPASOS, Math.round(mezcla(Math.max(MIN_REPASOS, maxReactivos), MAX_REPASOS)),
        enRecuperacion ? MAX_REPASOS : tarjetasEquilibradas);
  const pisoCartas = extra || diaCumplido ? 0 : MIN_REPASOS;
  const seleccion = [];
  let gastoRepasos = 0;
  for (const e of priorizadas) {
    if (seleccion.length >= topeRepasos) break;
    const llave = llaveDeBloque(e.cardId);
    const costo = COSTO.repaso + (llave && !usadas.has(llave) ? COSTO.leccion : 0);
    if (seleccion.length >= pisoCartas && gastoRepasos + costo > presupuestoRepasos) break;
    if (llave) { usarLeccion(llave); gastoRepasos += COSTO.leccion; }
    gastoRepasos += COSTO.repaso;
    seleccion.push(e);
  }
  const reviewCards = entrelazar(seleccion, [(e) => e.topicId, (e) => e.area]);
  const atrasadas = priorizadas.length - reviewCards.length;

  /* La práctica se lleva el tiempo que sobre, con su piso. */
  let quizQuestions = [];
  if (hayPractica) {
    const sobra = disponible - gastoNuevo - gastoRepasos;
    const n = Math.max(Math.min(REACTIVOS_MIN, maxReactivos), Math.min(maxReactivos, Math.floor(sobra / COSTO.reactivo)));
    quizTopics.slice(0, n).forEach((t) => {
      const question = pickQuestion(t, saltDelDia(t.id));
      if (question) quizQuestions.push({ topic: t, question });
    });
    quizQuestions = entrelazar(quizQuestions, [(x) => x.topic.area, (x) => x.topic.id]);
  }

  /* ---- La sesión, como una sola lista ---- */
  const unidades = [];
  if (learnCards.length) {
    unidades.push({ pasos: learnCards.map((e) => ({ type: "learn", cardId: e.cardId, topicId: e.topicId })) });
  }
  newTopics.forEach((t) => {
    // Solo el bloque base: es lo que acaba de explicar la nota. Las ampliaciones
    // del tema llegan escalonadas en los días siguientes.
    const base = t.blocks && t.blocks.length ? cardsOfBlock(t.id, t.blocks[0]) : cardsForTopic(t.id);
    unidades.push({
      pasos: [{ type: "intro", topic: t }].concat(base.map((cid) => ({ type: "learn", cardId: cid, topicId: t.id, isNew: true })))
    });
  });
  const steps = armarPasos({
    repasos: reviewCards,
    unidades,
    lecciones: leccionesUsadas,
    preguntas: quizQuestions
  }).filter(pasoConContenido);

  const conteo = (f) => steps.filter(f).length;
  return {
    phase,
    today: rawToday,
    daysToExam: daysBetween(rawToday, EXAM_DATE),
    readiness,
    areaEnRiesgo: readiness.find((a) => a.nivel === "alto") || null,
    steps,
    reviewCards,
    learnCards,
    learnPending: sinVer.length,
    blockLessons: leccionesUsadas,
    newTopics,
    quizQuestions,
    totalSteps: steps.length,
    estMinutes: Math.round(minutosDeSesion(steps)),
    /* Cuántas tarjetas ya vencidas no caben hoy y esperan su turno. */
    atrasadas,
    enRecuperacion,
    diaCumplido,
    /* Lo que se ve en pantalla: cada paso cae en exactamente un grupo. */
    resumen: {
      repasar: conteo((p) => p.type === "review" && !p.check),
      aprender: conteo((p) => p.type === "lesson" || p.type === "intro" || p.type === "learn" || (p.type === "review" && p.check)),
      practicar: conteo((p) => p.type === "quiz")
    },
    behind: notIntroduced.length > 0 && (phase === "review" || (phase === "learning" && (porCalendario > MAX_TEMAS_NUEVOS_POR_DIA || daysBetween(today, LEARNING_END) <= 0))),
    notIntroducedCount: notIntroduced.length
  };
}

/**
 * Una tarjeta fallada vuelve a preguntarse unos pasos después, dentro de la
 * misma sesión. Devuelve la nueva lista de pasos (no toca la original).
 * `intentos` es cuántas veces se ha reencolado ya esa tarjeta: tras dos, se
 * deja en paz —quien la falla tres veces seguidas necesita mañana, no otra
 * vuelta—. El resumen, si lo hay, sigue siendo el último paso.
 */
export function reinsertarRepaso(steps, idx, step, intentos) {
  const n = intentos || 0;
  if (n >= CHECK_MAX_INTENTOS) return steps;
  const tope = steps.length - (steps.length && steps[steps.length - 1].type === "summary" ? 1 : 0);
  const pos = Math.max(idx + 1, Math.min(tope, idx + 1 + 4 + n));
  const next = steps.slice();
  next.splice(pos, 0, { type: "review", cardId: step.cardId, topicId: step.topicId, check: true, retry: true });
  return next;
}

/* Todo lo que se hace en la sesión se anota AL INSTANTE, no al llegar al
   resumen. Antes la bitácora, la racha y las estadísticas dependían de llegar
   a la última pantalla: quien cerraba a la mitad perdía el día entero de
   estadísticas aunque sus tarjetas sí quedaran calificadas. */
function registrar(patch) {
  const iso = toISO(todayDate());
  const entry = STATE.sessionLog[iso] || { cardsReviewed: 0, cardsLearned: 0, lessons: 0, newTopics: 0, quizAnswered: 0, quizCorrect: 0 };
  Object.keys(patch).forEach((k) => { entry[k] = (entry[k] || 0) + patch[k]; });
  STATE.sessionLog[iso] = entry;
  if (STATE.lastStudyDate !== iso) {
    const yestISO = toISO(addDays(todayDate(), -1));
    STATE.streak = (STATE.lastStudyDate === yestISO) ? STATE.streak + 1 : 1;
    STATE.lastStudyDate = iso;
  }
}

export function logSessionProgress(patch) {
  registrar(patch);
  saveState();
}

function rachaVigente() {
  const hoy = todayDate();
  const ultimo = STATE.lastStudyDate;
  return ultimo === toISO(hoy) || ultimo === toISO(addDays(hoy, -1)) ? STATE.streak : 0;
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
    /* Una racha de cinco días con el último estudio hace cuatro no es una racha:
       solo cuenta si se estudió hoy o ayer. */
    streak: rachaVigente(),
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
    const load = e ? (e.cardsReviewed || 0) + (e.cardsLearned || 0) + (e.newTopics || 0) * 3 + (e.quizAnswered || 0) + (e.mock || 0) : 0;
    out.push({ date: d, iso, load, entry: e || null });
  }
  return out;
}

/* Repasos que caben en un día normal: lo que queda de la sesión tras lo nuevo y
   la práctica. Es solo para proyectar la carga; el plan real decide cada día. */
const REPASOS_TIPICOS = 25;

/**
 * Cuántas tarjetas tocará repasar cada uno de los próximos `days` días.
 *
 * Es una proyección honesta, no el calendario bruto: lo vencido no cabe entero
 * hoy, así que se reparte en los días siguientes al ritmo que el plan permite.
 * `pendiente` es lo que queda atrasado al final de la ventana.
 */
export function upcomingLoad(days = 14) {
  const today = todayDate();
  const buckets = [];
  for (let i = 0; i < days; i++) buckets.push({ date: addDays(today, i), count: 0 });
  const porDia = new Array(days).fill(0);
  let vencidas = 0;
  const todayISO = toISO(today);
  Object.keys(STATE.cards).forEach((cardId) => {
    const topicId = cardId.split("::")[0];
    if (!isIntroduced(topicId)) return;
    const due = STATE.cards[cardId].due;
    if (due <= todayISO) { vencidas++; return; }
    const idx = daysBetween(today, fromISO(due));
    if (idx >= 0 && idx < days) porDia[idx]++;
  });
  let cola = vencidas;
  for (let i = 0; i < days; i++) {
    cola += porDia[i];
    const hoy = Math.min(cola, REPASOS_TIPICOS);
    buckets[i].count = hoy;
    cola -= hoy;
  }
  buckets.pendiente = cola;
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
    const entrada = { cardsReviewed: 0, cardsLearned: 0, lessons: 0, newTopics: 0, quizAnswered: 0, quizCorrect: 0 };
    new Set(Object.keys(ea).concat(Object.keys(eb))).forEach((k) => {
      entrada[k] = Math.max(ea[k] || 0, eb[k] || 0);
    });
    out.sessionLog[d] = entrada;
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
  out.createdAt = ca && cb ? (ca < cb ? ca : cb) : (ca || cb || toISO(todayDate()));
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
