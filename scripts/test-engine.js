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
for (const f of fs.readdirSync(path.join(ROOT, "data/refuerzo"))) src += fs.readFileSync(path.join(ROOT, "data/refuerzo") + "/" + f, "utf8") + "\n";
const NOMBRES = [
  "AREA_META", "SESSION_META", "INFO_SECTIONS", "BIBLIOGRAFIA", "TOTAL_REACTIVOS",
  "AREA1_TOPICS", "AREA2_TOPICS", "AREA3_TOPICS", "AREA4_TOPICS", "AREA5_TOPICS",
  "AREA6_ES_TOPICS", "AREA6_EN_TOPICS", "AREA7_TOPICS",
  ...[1, 2, 3, 4, 5, 6, 7].flatMap((n) => [`AREA${n}_EXTRA`, `AREA${n}_EXTRA2`, `AREA${n}_FORMATO`, `AREA${n}_REFUERZO`])
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

/* Las pruebas de bloques recorren también los de ampliación, así que corren en
   MODO COMPLETO. El modo esencial —el de fábrica— tiene su propio grupo al
   final. */
E.setModoEsencial(false);

const ID = "1.1.1";
const topic = E.topicsById()[ID];

console.log("\n1) Bloques del tema " + ID + " (" + topic.tema + ")");
console.log("   " + topic.blocks.map((b) => `${b.nombre}: fc${b.fcFrom}-${b.fcTo - 1}, quiz ${b.qFrom}-${b.qTo - 1}`).join(" | "));
check(topic.blocks[0].nombre === "base", "el primer bloque es siempre el base");
check(
  topic.blocks.every((b) => E.BLOQUES.includes(b.nombre)),
  "y todos los bloques son de un tipo conocido (" + topic.blocks.map((b) => b.nombre).join(", ") + ")"
);
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
// Abiertos desde el principio: el bloque base y los que no traen tarjetas ni
// lección propia (formato y refuerzo replantean con otro formato lo que la nota
// base ya explicó, así que no hay nada que enseñar antes).
const abiertosDeInicio = topic.blocks
  .filter((b, i) => i === 0 || (!b.leccion && b.fcTo === b.fcFrom))
  .reduce((n, b) => n + (b.qTo - b.qFrom), 0);
const antes = E.availableQuiz(topic).length;
check(
  antes === abiertosDeInicio,
  `${antes} de ${topic.quiz.length} reactivos disponibles: base y formatos abiertos, ampliaciones esperando su lección`
);

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
check(
  despues === antes + (topic.blocks[1].qTo - topic.blocks[1].qFrom),
  "se abrió exactamente el bloque cuya lección se dio, ni uno más"
);

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

/* ------------------------------------------------------------------
   El simulacro completo debe traer tantos reactivos como el examen real.

   La guía lista 177 temas pero 180 reactivos: cultura digital tiene 18 temas
   y 19 reactivos, y conciencia histórica 21 y 23. Cuando el simulacro tomaba
   uno por tema salía de 89 en la sesión uno, aunque la pantalla prometía 92.

   Y esos 92 tampoco son la carga del día: el examen añade un bloque de 14
   reactivos piloto en la sesión uno y 11 en la dos, que no puntúan pero que
   hay que contestar sin saber cuáles son (guía, p. 21). El simulacro completo
   arma 106 y 99, y descuenta el bloque piloto al calificar.
   ------------------------------------------------------------------ */
console.log("\n11) El simulacro completo tiene el número real de reactivos");
{
  const s1 = E.buildMockExam([1, 2, 3, 4], false);
  const s2 = E.buildMockExam([5, 6, 7], false);
  check(s1.length === 106, `la sesión 1 arma 106 reactivos físicos (armó ${s1.length})`);
  check(s2.length === 99, `la sesión 2 arma 99 reactivos físicos (armó ${s2.length})`);
  check(s1.length + s2.length === 205, "entre las dos sesiones suman los 205 que se contestan");

  const cal1 = s1.filter((i) => !i.piloto).length;
  const cal2 = s2.filter((i) => !i.piloto).length;
  check(cal1 === 92 && cal2 === 88, `de esos, 92 y 88 puntúan (fueron ${cal1} y ${cal2})`);
  check(cal1 + cal2 === 180, "que son los 180 reactivos calificados del examen");
  check(
    s1.filter((i) => i.piloto).length === 14 && s2.filter((i) => i.piloto).length === 11,
    "y el bloque piloto trae 14 y 11 reactivos"
  );

  check(
    E.countMockQuestions([1, 2, 3, 4], false) === 106 && E.countMockQuestions([5, 6, 7], false) === 99,
    "y la pantalla anuncia exactamente esa cantidad"
  );

  /* Un simulacro parcial —solo lo ya estudiado— no lleva bloque piloto: ahí
     el piloto no simula nada, solo alarga la sesión. */
  check(E.pilotoDe([1, 2]) === 0, "un simulacro que no cubre la sesión completa no lleva piloto");

  /* Todo tema evaluado debe aparecer al menos una vez: los reactivos de más
     se sortean encima, nunca sustituyen a un tema. */
  const temas1 = new Set(s1.map((i) => i.topic.id));
  check(temas1.size === 89, `los 89 temas de la sesión 1 aparecen todos (aparecieron ${temas1.size})`);
}

/* ------------------------------------------------------------------
   La duración del simulacro sale de la guía, no de un número inventado.
   ------------------------------------------------------------------ */
console.log("\n12) El cronómetro usa la duración oficial de cada sesión");
{
  check(E.mockMinutes([1, 2, 3, 4]) === 270, "la sesión 1 dura 4 h 30 min (270 minutos)");
  check(E.mockMinutes([5, 6, 7]) === 240, "la sesión 2 dura 4 h (240 minutos)");
  check(E.mockMinutes([1, 5]) === 0, "y un simulacro que mezcla sesiones no lleva reloj del examen");
}


/* ------------------------------------------------------------------
   13) Modo esencial

   Por omisión la app estudia solo lo que las orientaciones de la guía evalúan:
   la nota del tema (`base`), los formatos que el examen usa (`formato`) y los
   reactivos que reponen lo que la guía nombra (`refuerzo`). Los bloques de
   ampliación quedan fuera del plan hasta que se pida el modo completo.

   Lo que no puede pasar nunca: que cambiar de modo borre progreso.
   ------------------------------------------------------------------ */
console.log("\n13) El modo esencial estudia solo lo que la guía evalúa");
{
  const ID2 = "1.1.2";
  const t2 = E.topicsById()[ID2];
  const tieneAmpliacion = t2.blocks.some((b) => b.nombre === "ampliacion" || b.nombre === "ampliacion2");
  check(tieneAmpliacion, "el tema de prueba tiene bloques de ampliación que dejar fuera");

  E.setModoEsencial(false);
  const completoCards = E.cardsForTopic(ID2).length;

  E.setModoEsencial(true);
  const esencialCards = E.cardsForTopic(ID2).length;
  check(esencialCards < completoCards, `en modo esencial el tema pide menos tarjetas (${esencialCards} < ${completoCards})`);

  check(
    t2.blocks.filter((b) => E.bloqueEnPlan(b)).every((b) => ["base", "formato", "refuerzo"].includes(b.nombre)),
    "y los bloques que quedan en el plan son base, formato y refuerzo"
  );
  check(
    !E.bloqueEnPlan({ nombre: "ampliacion" }) && !E.bloqueEnPlan({ nombre: "ampliacion2" }),
    "los bloques de ampliación quedan fuera del plan"
  );

  /* Ningún reactivo del banco disponible puede venir de un bloque de ampliación. */
  const banco = E.availableQuiz(t2);
  const deAmpliacion = t2.blocks
    .filter((b) => b.nombre.startsWith("ampliacion"))
    .flatMap((b) => (t2.quiz || []).slice(b.qFrom, b.qTo));
  check(
    banco.every((q) => !deAmpliacion.includes(q)),
    "y ningún reactivo del banco disponible sale de un bloque de ampliación"
  );

  /* Nada se pierde: al volver al modo completo, las tarjetas reaparecen. */
  E.setModoEsencial(false);
  check(E.cardsForTopic(ID2).length === completoCards, "al volver al modo completo reaparecen todas las tarjetas");

  /* Y el simulacro completo sigue armando la carga real en cualquiera de los dos. */
  E.setModoEsencial(true);
  const s1e = E.buildMockExam([1, 2, 3, 4], false);
  check(s1e.length === 106, `el simulacro completo sigue armando 106 reactivos en modo esencial (armó ${s1e.length})`);
  E.setModoEsencial(false);
}

/* ------------------------------------------------------------------
   El esfuerzo se reparte por riesgo de área, no por partes iguales.

   El examen se aprueba área por área: hay que llegar a 1 000 puntos en cada
   una de las siete y reprobar tres significa volver a empezar. Repartir el
   tiempo parejo es lo peor que se puede hacer cuando una área va por debajo.
   ------------------------------------------------------------------ */
console.log("\n14) El plan prioriza el área que va por debajo de la línea");
{
  const areas = E.areaNumbers();
  areas.forEach((n) => E.topicsOfArea(n).forEach((t) => E.introduceTopic(t.id)));

  /* Se simula un sustentante sólido en todo menos en cultura digital. */
  const FLOJA = 2;
  E.getAllTopics().forEach((t) => {
    const aciertos = t.area === FLOJA ? 2 : 9;
    for (let i = 0; i < 10; i++) E.recordQuizAnswer(t.id, i < aciertos);
  });

  const r = E.areaReadiness();
  check(r[0].area === FLOJA, `el área más floja encabeza el riesgo (encabezó ${r[0].nombre})`);
  check(r[0].nivel === "alto", `y queda marcada como riesgo alto (quedó "${r[0].nivel}")`);
  check(
    r[r.length - 1].riesgo < r[0].riesgo,
    "las áreas que van bien quedan con menos riesgo que la floja"
  );

  /* El objetivo con margen es más exigente en las áreas cortas, porque con
     menos reactivos la suerte pesa más. */
  const digital = r.find((a) => a.area === 2);      // 19 reactivos
  const naturales = r.find((a) => a.area === 5);    // 32 reactivos
  check(
    digital.objetivo > naturales.objetivo,
    `un área de ${digital.reactivos} reactivos pide más margen que una de ${naturales.reactivos}`
  );

  const plan = E.computeTodayPlan();
  check(plan.areaEnRiesgo && plan.areaEnRiesgo.area === FLOJA, "el plan del día señala esa área");
  const deLaFloja = plan.quizQuestions.filter((q) => q.topic.area === FLOJA).length;
  check(deLaFloja > 0, `la práctica del día incluye reactivos de esa área (incluyó ${deLaFloja})`);
  const areasEnPractica = new Set(plan.quizQuestions.map((q) => q.topic.area)).size;
  check(areasEnPractica >= 3, `sin encerrarse en una sola área (aparecieron ${areasEnPractica})`);

}

console.log(fallos === 0 ? "\nTODO OK" : `\nFALLAS: ${fallos}`);
process.exit(fallos === 0 ? 0 : 1);