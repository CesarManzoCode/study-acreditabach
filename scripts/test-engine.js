// Comprobación del motor de estudio. La regla que protege este archivo es la
// que se rompió cuando el temario creció: NADA se pregunta antes de haberse
// enseñado. Se ejecuta con `npm run test:motor` (y dentro de `npm run check`).
//
// El motor está escrito para el navegador, así que aquí se le da un
// localStorage de mentiras y se cargan los data/*.js —que declaran con `const`
// y no se vuelven propiedades de window— copiándolos a globalThis.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// localStorage de mentiras, en memoria.
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k)
};
globalThis.window = { addEventListener() {}, location: { hash: "" } };

// Los data/*.js declaran con const, así que se ejecutan y se copian a globalThis.
let src = "";
for (const f of fs.readdirSync(path.join(ROOT, "data")).filter((f) => f.endsWith(".js"))) src += fs.readFileSync(path.join(ROOT, "data") + "/" + f, "utf8") + "\n";
for (const f of fs.readdirSync(path.join(ROOT, "data/extra"))) src += fs.readFileSync(path.join(ROOT, "data/extra") + "/" + f, "utf8") + "\n";
for (const f of fs.readdirSync(path.join(ROOT, "data/extra2"))) src += fs.readFileSync(path.join(ROOT, "data/extra2") + "/" + f, "utf8") + "\n";
for (const f of fs.readdirSync(path.join(ROOT, "data/formato"))) src += fs.readFileSync(path.join(ROOT, "data/formato") + "/" + f, "utf8") + "\n";
const NOMBRES = [
  "AREA_META", "SESSION_META", "INFO_SECTIONS", "BIBLIOGRAFIA", "TOTAL_REACTIVOS",
  "AREA1_TOPICS", "AREA2_TOPICS", "AREA3_TOPICS", "AREA4_TOPICS", "AREA5_TOPICS",
  "AREA6_ES_TOPICS", "AREA6_EN_TOPICS", "AREA7_TOPICS",
  ...[1, 2, 3, 4, 5, 6, 7].flatMap((n) => [`AREA${n}_EXTRA`, `AREA${n}_EXTRA2`, `AREA${n}_FORMATO`])
];
src += ";" + NOMBRES.map((n) => `try{globalThis.${n}=${n}}catch(e){}`).join(";");
const ctx = { console, globalThis };
vm.createContext(ctx);
ctx.globalThis = globalThis;
vm.runInContext(src, ctx);

const E = await import(pathToFileURL(path.join(ROOT, "src/lib/engine.js")).href);

let fallos = 0;
const check = (ok, msg) => {
  console.log((ok ? "  ok   " : "  FALLA ") + msg);
  if (!ok) fallos++;
};

const ID = "1.1.1";
const topic = E.topicsById()[ID];

console.log("\n1) Bloques del tema " + ID + " (" + topic.tema + ")");
console.log("   " + topic.blocks.map((b) => `${b.nombre}: fc${b.fcFrom}-${b.fcTo - 1}, quiz ${b.qFrom}-${b.qTo - 1}`).join(" | "));
check(topic.blocks.length === 3, "tiene los tres bloques (base + dos ampliaciones)");
check(topic.blocks[0].fcFrom === 0 && topic.blocks[0].fcTo === 2, "el bloque base sigue siendo fc0 y fc1 (los índices no se movieron)");

console.log("\n2) Al conocer el tema solo se programa el bloque base para hoy");
E.introduceTopic(ID);
const hoy = E.toISO(E.todayDate());
const vencenHoy = E.cardsForTopic(ID).filter((c) => E.peekCard(c).due <= hoy);
check(vencenHoy.length === 2, `hoy vencen ${vencenHoy.length} tarjetas (esperado 2, las de la nota)`);
check(E.cardsForTopic(ID).length === topic.flashcards.length, "las demás quedan programadas, no perdidas");

console.log("\n2b) Un bloque con lección propia no se toca hasta leerla");
const conLeccion = E.getAllTopics().find((t) => (t.blocks || []).some((b, i) => i > 0 && b.leccion));
const bIdx = conLeccion.blocks.findIndex((b, i) => i > 0 && b.leccion);
const bLec = conLeccion.blocks[bIdx];
E.introduceTopic(conLeccion.id);
check(!E.isLessonSeen(conLeccion.id, bLec, bIdx), `${conLeccion.id}/${bLec.nombre}: la lección empieza sin leer`);
check(!E.blockUnlocked(conLeccion, bLec, bIdx), "y el bloque arranca cerrado aunque tenga tarjetas pendientes");
const bancoCerrado = E.availableQuiz(conLeccion).length;
E.cardsOfBlock(conLeccion.id, bLec).forEach((c) => E.learnCard(c));
check(
  !E.blockUnlocked(conLeccion, bLec, bIdx),
  "aprender las tarjetas NO basta: sin lección el bloque sigue cerrado"
);
check(E.availableQuiz(conLeccion).length === bancoCerrado, "y sus reactivos siguen fuera del banco");
E.markLessonSeen(conLeccion.id, bLec.nombre);
check(E.blockUnlocked(conLeccion, bLec, bIdx), "al leer la lección (y con las tarjetas vistas) el bloque se abre");
check(E.availableQuiz(conLeccion).length > bancoCerrado, "y entonces sí entran sus reactivos");

console.log("\n2c) La sesión nunca pone una tarjeta antes de la lección de su bloque");
// Se reconstruye la sesión igual que App.jsx y se recorre en orden.
{
  const plan = E.computeTodayPlan();
  const leccionDe = {};
  plan.blockLessons.forEach((bl) => { leccionDe[bl.topicId + "::" + bl.bloque] = bl; });
  const pasos = [];
  const dadas = new Set();
  const empujar = (entry, tipo) => {
    const bc = E.blockOfCard(entry.cardId);
    const key = bc ? bc.topic.id + "::" + bc.block.nombre : null;
    if (key && !dadas.has(key) && leccionDe[key]) { dadas.add(key); pasos.push({ type: "lesson", key }); }
    pasos.push({ type: tipo, cardId: entry.cardId, key });
  };
  plan.reviewCards.forEach((e) => empujar(e, "review"));
  plan.learnCards.forEach((e) => empujar(e, "learn"));

  const leidas = new Set();
  let adelantadas = 0;
  pasos.forEach((p) => {
    if (p.type === "lesson") { leidas.add(p.key); return; }
    const bc = E.blockOfCard(p.cardId);
    if (!bc) return;
    const necesita = !E.isLessonSeen(bc.topic.id, bc.block, bc.index);
    if (necesita && !leidas.has(p.key)) adelantadas++;
  });
  check(adelantadas === 0, `${adelantadas} tarjetas saldrían antes de la lección de su bloque`);
  check(plan.blockLessons.length <= 4, `las lecciones del día están topadas (${plan.blockLessons.length})`);
}

console.log("\n3) La compuerta del banco de reactivos");
const antes = E.availableQuiz(topic).length;
check(antes === topic.blocks[0].qTo, `solo ${antes} de ${topic.quiz.length} reactivos disponibles (el resto espera a su lección)`);

console.log("\n4) Ninguna pregunta sale de un bloque bloqueado");
const permitidas = new Set(E.availableQuiz(topic).map((q) => q.q));
let intrusas = 0;
for (let i = 0; i < 400; i++) {
  const q = E.pickQuestion(topic, "prueba" + i);
  if (q && !q.generated && !permitidas.has(q.q)) intrusas++;
}
check(intrusas === 0, `${intrusas} preguntas de material no enseñado en 400 intentos`);

console.log("\n5) Al aprender las tarjetas de un bloque, se abren sus reactivos");
E.cardsOfBlock(ID, topic.blocks[1]).forEach((c) => E.learnCard(c));
const despues = E.availableQuiz(topic).length;
check(despues > antes, `el banco pasó de ${antes} a ${despues} reactivos`);
check(despues === topic.blocks[1].qTo, "se abrió exactamente el bloque cuya lección se dio");

console.log("\n6) El plan del día separa aprender de repasar");
const plan = E.computeTodayPlan();
const learn = plan.learnCards.map((c) => c.cardId);
const review = plan.reviewCards.map((c) => c.cardId);
check(learn.every((c) => !E.isLearned(c)), "en «aprender» solo hay tarjetas nunca vistas");
check(review.every((c) => E.isLearned(c)), "en «repasar» solo hay tarjetas ya enseñadas");
check(plan.learnCards.length <= 12, `el material nuevo del día está topado (${plan.learnCards.length})`);

console.log("\n7) El progreso viejo no se re-enseña");
const viejo = ID + "::fc0";
E.gradeCard(viejo, 2);
check(E.isLearned(viejo), "una tarjeta ya calificada cuenta como aprendida");
delete E.STATE.cards[viejo].learned;
check(E.isLearned(viejo), "y sigue contando aunque el progreso venga de antes de esta versión");

console.log("\n8) El simulacro completo no se queda vacío");
check(E.countMockQuestions([1, 2, 3, 4, 5, 6, 7], false) > 150, "el simulacro de todo el temario conserva sus reactivos");

console.log("\n9) El bloque de formato (relación y ordenamiento) está abierto desde el principio");
// Los reactivos de data/formato no traen tarjetas: replantean con el formato del
// examen lo que la nota base ya explica, así que no hay nada que desbloquear.
const CON_FORMATO = ["2.2.3", "2.4.1", "2.4.2", "3.2.1", "4.3.2", "6.1.3", "6.3.1", "6.3.6", "6.4.2", "7.3.1"];
let sinBloque = 0;
let cerrados = 0;
CON_FORMATO.forEach((id) => {
  const t = E.topicsById()[id];
  const b = (t.blocks || []).find((x) => x.nombre === "formato");
  if (!b) { sinBloque++; return; }
  if (!E.blockUnlocked(t, b, t.blocks.indexOf(b))) cerrados++;
});
check(sinBloque === 0, `los ${CON_FORMATO.length} temas que la guía marca con relación u ordenamiento tienen su bloque de formato`);
check(cerrados === 0, "y ninguno queda cerrado esperando tarjetas que no existen");

console.log("\n10) Los reactivos de formato sí se ofrecen");
const tf = E.topicsById()["4.3.2"];
const bancoF = E.availableQuiz(tf);
check(bancoF.some((q) => /^Relacione/.test(q.q)), "un tema con bloque de formato ofrece sus reactivos de relación de elementos");
check(
  bancoF.every((q) => Array.isArray(q.options) && q.options.length === 3),
  "todos los reactivos traen tres opciones, como el examen real (guía, p. 25)"
);

console.log(fallos === 0 ? "\nTODO OK" : `\nFALLAS: ${fallos}`);
process.exit(fallos === 0 ? 0 : 1);
