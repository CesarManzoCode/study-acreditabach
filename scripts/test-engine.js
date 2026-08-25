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
  // El mapa de la poda: sin él la migración del progreso no corre (ni aquí ni
  // en el navegador, que fue justo el error que dejó pasos en blanco).
  "PODA_FRONTS_PREVIOS",
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


/* ------------------------------------------------------------------
   15) El progreso sobrevive a un temario que cambia

   Este es el grupo que cubre la falla que dejó la sesión en blanco: al podar
   el temario, las tarjetas de un tema se recorren y los identificadores
   guardados (`tema::fcN`) quedan apuntando a otra tarjeta —o a ninguna—. Un
   paso de la sesión sin contenido no pinta nada y la sesión se atora ahí.

   Se comprueba lo mismo por los dos caminos: la migración de una sola vez con
   el mapa de la poda, y la reconciliación permanente por huella del frente.
   ------------------------------------------------------------------ */
console.log("\n15) El progreso sobrevive a un temario que cambia");
{
  const previos = globalThis.PODA_FRONTS_PREVIOS;
  check(!!previos, "el mapa de la poda llega al motor (data/poda.js cargado)");

  /* Se buscan en el temario real los tres casos que importan. */
  let fantasma = null;   // índice viejo que hoy se sale del arreglo
  let movida = null;     // frente que hoy vive en otra posición
  let sobrevive = null;  // frente que no se movió
  Object.keys(previos || {}).forEach((id) => {
    const t = E.topicsById()[id];
    if (!t) return;
    const fronts = (t.flashcards || []).map((f) => f.front);
    previos[id].forEach((front, i) => {
      const j = fronts.indexOf(front);
      if (!fantasma && i >= fronts.length) fantasma = { id, i };
      if (!movida && j >= 0 && j !== i) movida = { id, i, j, front };
      if (!sobrevive && j >= 0 && j === i) sobrevive = { id, i, front };
    });
  });
  check(!!fantasma, `la poda dejó identificadores fuera de rango (p. ej. ${fantasma && fantasma.id}::fc${fantasma && fantasma.i})`);
  check(!!movida, `y tarjetas que cambiaron de posición (${movida && movida.id}: fc${movida && movida.i} → fc${movida && movida.j})`);

  /* Progreso como el que tenía un sustentante ANTES de la poda. */
  const antesDeLaPoda = {
    createdAt: "2026-08-01",
    topicsIntroduced: { [fantasma.id]: "2026-08-02", [movida.id]: "2026-08-02", [sobrevive.id]: "2026-08-02" },
    sessionLog: { "2026-08-02": { cardsReviewed: 3 } },
    cards: {
      [fantasma.id + "::fc" + fantasma.i]: { interval: 7, repetitions: 3, ef: 2.5, due: "2026-08-10", lastReview: "2026-08-03" },
      [movida.id + "::fc" + movida.i]: { interval: 21, repetitions: 5, ef: 2.6, due: "2026-08-24", lastReview: "2026-08-03" },
      [sobrevive.id + "::fc" + sobrevive.i]: { interval: 4, repetitions: 2, ef: 2.4, due: "2026-08-07", lastReview: "2026-08-03" }
    }
  };
  E.replaceState(antesDeLaPoda);

  check(
    !E.peekCard(fantasma.id + "::fc" + fantasma.i),
    "la tarjeta que la poda quitó ya no queda guardada apuntando a la nada"
  );
  const destino = E.peekCard(movida.id + "::fc" + movida.j);
  check(!!destino && destino.interval === 21, "la que cambió de posición se movió con su intervalo intacto (21 días)");
  check(!E.peekCard(movida.id + "::fc" + movida.i), "y ya no queda una copia en la posición vieja");
  const quieta = E.peekCard(sobrevive.id + "::fc" + sobrevive.i);
  check(!!quieta && quieta.interval === 4, "la que no se movió se queda exactamente donde estaba");

  /* Lo que de verdad se rompió: pasos de sesión sin nada que mostrar. */
  const huerfanas = Object.keys(E.STATE.cards).filter((cid) => !E.flashcardOf(cid));
  check(huerfanas.length === 0, `no queda ninguna tarjeta guardada sin contenido (quedaron ${huerfanas.length})`);

  const planP = E.computeTodayPlan();
  const pasos = planP.reviewCards.concat(planP.learnCards)
    .map((c) => ({ type: "review", cardId: c.cardId }));
  const vacios = pasos.filter((p) => !E.pasoConContenido(p)).length;
  check(vacios === 0, `ningún paso del plan del día se queda en blanco (había ${vacios})`);

  /* Y el aviso se lo cuenta al sustentante, en vez de que el número de
     tarjetas cambie sin explicación. */
  check(
    !!E.STATE.poda && E.STATE.poda.quitadas > 0,
    "se avisa cuántas tarjetas se dieron de baja al ajustar el temario"
  );
}

/* ------------------------------------------------------------------
   16) La red permanente: la huella del frente

   La migración de la poda corre una sola vez. Lo que impide que la próxima
   edición del temario vuelva a dejar pasos en blanco es que cada tarjeta
   guarda la huella de su frente y se deja seguir hasta donde esté hoy.
   ------------------------------------------------------------------ */
console.log("\n16) Cada tarjeta guardada sigue a su contenido");
{
  const t = E.topicsById()["1.1.1"];
  const fronts = (t.flashcards || []).map((f) => f.front);

  E.replaceState({
    createdAt: "2026-09-01",            // progreso posterior a la poda
    podaAplicada: true,
    topicsIntroduced: { "1.1.1": "2026-09-01" },
    cards: {
      // huella del frente que hoy vive en fc0, pero guardada en fc3
      "1.1.1::fc3": { interval: 15, repetitions: 4, ef: 2.5, due: "2026-09-20", lastReview: "2026-09-05", h: E.huellaDeFrente(fronts[0]) },
      // huella de un frente que ya no existe en el temario
      "1.1.1::fc1": { interval: 9, repetitions: 3, ef: 2.5, due: "2026-09-15", lastReview: "2026-09-05", h: E.huellaDeFrente("Una tarjeta que ya no existe") },
      // sin huella y fuera de rango: no hay forma de saber qué era
      "1.1.1::fc99": { interval: 2, repetitions: 1, ef: 2.5, due: "2026-09-10", lastReview: "2026-09-05" }
    }
  });

  const seguida = E.peekCard("1.1.1::fc0");
  check(!!seguida && seguida.interval === 15, "una tarjeta se sigue por la huella de su frente hasta su posición actual");
  /* La que perdió su contenido se da de baja; como el tema sigue visto, esa
     posición se reprograma después como tarjeta nueva, sin heredar el
     intervalo de la que se fue. */
  const perdida = E.peekCard("1.1.1::fc1");
  check(!perdida || perdida.interval !== 9, "la tarjeta cuyo frente desapareció del temario no hereda su intervalo");
  check(!perdida || perdida.h === E.huellaDeFrente(fronts[1]), "y esa posición queda con la huella de lo que hay ahí ahora");
  check(!E.peekCard("1.1.1::fc99"), "y un índice que ya no existe tampoco se queda guardado");

  /* Las tarjetas nuevas nacen con huella, para que esto siga funcionando. */
  E.introduceTopic("1.1.2");
  const nueva = E.peekCard("1.1.2::fc0");
  check(!!nueva && !!nueva.h, "las tarjetas que se dan de alta guardan la huella de su frente");

  /* Un progreso viejo (sin huellas) no se toca: adopta la posición que tiene. */
  E.replaceState({
    createdAt: "2026-09-01",
    podaAplicada: true,
    topicsIntroduced: { "1.1.1": "2026-09-01" },
    cards: { "1.1.1::fc1": { interval: 6, repetitions: 2, ef: 2.5, due: "2026-09-12", lastReview: "2026-09-06" } }
  });
  const adoptada = E.peekCard("1.1.1::fc1");
  check(!!adoptada && adoptada.interval === 6, "un progreso sin huellas conserva su posición y su intervalo");
  check(adoptada && adoptada.h === E.huellaDeFrente(fronts[1]), "y se le pone la huella de lo que hay en esa posición");
}

/* ------------------------------------------------------------------
   17) Ninguna lección queda inalcanzable

   La compuerta que impide preguntar antes de explicar es la lección del
   bloque: mientras no se lea, ni sus tarjetas ni sus reactivos entran. Pero
   el plan del día sacaba las lecciones pendientes SOLO de las tarjetas
   vencidas, así que un bloque que únicamente trae reactivos —los de `formato`
   y `refuerzo`, justo los dos que el modo esencial conserva además del base—
   no podía enseñar su lección jamás y su banco quedaba cerrado para siempre.

   Por eso esos paquetes se escribieron dando por hecho que no introducen nada
   nuevo: era la única forma de que sus reactivos llegaran a verse.
   ------------------------------------------------------------------ */
console.log("\n17) Ninguna lección queda inalcanzable");
{
  E.replaceState({ createdAt: "2026-09-01", podaAplicada: true });
  E.setModoEsencial(false);

  /* Un bloque con lección propia y sin tarjetas: el caso que no se podía abrir. */
  let objetivo = null;
  E.getAllTopics().forEach((t) => {
    (t.blocks || []).forEach((b, i) => {
      if (objetivo || i === 0 || !b.leccion || b.fcTo > b.fcFrom || b.qTo === b.qFrom) return;
      objetivo = { topic: t, block: b, index: i };
    });
  });
  check(!!objetivo, "el temario tiene bloques que solo traen reactivos y una lección propia");

  E.introduceTopic(objetivo.topic.id);
  const cerrado = E.availableQuiz(objetivo.topic).length;
  check(
    !E.blockUnlocked(objetivo.topic, objetivo.block, objetivo.index),
    `${objetivo.topic.id}/${objetivo.block.nombre}: arranca cerrado esperando su lección`
  );

  const planL = E.computeTodayPlan();
  const agendada = planL.blockLessons.some(
    (bl) => bl.topicId === objetivo.topic.id && bl.bloque === objetivo.block.nombre
  );
  check(agendada, "y la sesión del día sí la agenda, aunque el bloque no tenga ni una tarjeta");
  check(
    planL.blockLessons.every((bl) => !!bl.leccion),
    "ninguna lección del plan llega vacía"
  );

  E.markLessonSeen(objetivo.topic.id, objetivo.block.nombre);
  check(
    E.availableQuiz(objetivo.topic).length === cerrado + (objetivo.block.qTo - objetivo.block.qFrom),
    `al leerla entran sus ${objetivo.block.qTo - objetivo.block.qFrom} reactivos, ni uno más`
  );

  /* Y a lo ancho del temario: todo bloque con lección propia y sin tarjetas
     tiene que aparecer entre las lecciones pendientes de su tema. Si alguno no
     apareciera, su banco no podría abrirse nunca y su contenido sería
     inalcanzable, que es exactamente el caso que se corrigió. */
  const inalcanzables = [];
  let conLeccionSinTarjetas = 0;
  E.getAllTopics().forEach((t) => {
    const candidatos = (t.blocks || []).filter((b, i) => i > 0 && E.bloqueEnPlan(b) && b.leccion && b.fcTo === b.fcFrom);
    if (!candidatos.length) return;
    conLeccionSinTarjetas += candidatos.length;
    E.introduceTopic(t.id);
    const pendientes = new Set(E.pendingLessons(t).map((pl) => pl.bloque));
    candidatos.forEach((b) => {
      if (!E.isLessonSeen(t.id, b, t.blocks.indexOf(b)) && !pendientes.has(b.nombre)) {
        inalcanzables.push(t.id + "/" + b.nombre);
      }
    });
  });
  check(conLeccionSinTarjetas > 0, `hay ${conLeccionSinTarjetas} bloques con lección y sin tarjetas que revisar`);
  check(inalcanzables.length === 0, `ninguno queda sin manera de abrirse (${inalcanzables.join(", ") || "0"})`);

  /* La práctica manual de un tema también enseña antes de preguntar: los
     bloques que solo esperan su lección la reciben ahí mismo. */
  E.replaceState({ createdAt: "2026-09-01", podaAplicada: true });
  E.introduceTopic(objetivo.topic.id);
  const pend = E.pendingLessons(objetivo.topic);
  check(
    pend.some((pl) => pl.bloque === objetivo.block.nombre),
    "la práctica manual del tema encuentra la lección pendiente de ese bloque"
  );
  check(
    pend.every((pl) => !!pl.leccion && pl.block.fcTo === pl.block.fcFrom),
    "y solo propone las de bloques sin tarjetas, que son las que nadie más agenda"
  );

  E.setModoEsencial(true);
}

/* ------------------------------------------------------------------
   18) Los reactivos generados no se adelantan a la nota

   Un reactivo del banco vive dentro de un bloque y espera su lección. Un
   reactivo GENERADO no pasa por esa compuerta: sale directo del tema, y en
   modo esencial la nota del tema es lo ÚNICO que se ha explicado. Por eso
   cada generador declara lo que da por sabido y la nota tiene que enseñarlo
   (`npm run validate` lo comprueba término por término).
   ------------------------------------------------------------------ */
console.log("\n18) Los reactivos generados no se adelantan a la nota");
{
  const { CONCEPTOS_GENERADOS, GENERATED_TOPIC_IDS } = await import(
    pathToFileURL(path.join(ROOT, "src/lib/generators/index.js")).href
  );
  const sinDeclarar = GENERATED_TOPIC_IDS.filter((id) => !CONCEPTOS_GENERADOS[id]);
  check(sinDeclarar.length === 0, `los ${GENERATED_TOPIC_IDS.length} temas con generador declaran lo que dan por sabido (${sinDeclarar.join(", ")})`);

  const sinTema = Object.keys(CONCEPTOS_GENERADOS).filter((id) => !E.topicsById()[id]);
  check(sinTema.length === 0, `y todos apuntan a un tema que existe (${sinTema.join(", ")})`);
}

/* ------------------------------------------------------------------
   19) Ir adelantado no frena el plan

   El reparto por calendario divide los temas que faltan entre los días que
   quedan. Adelantarse hace que esa división caiga por debajo de 1 y la sesión
   se quedaba con un solo tema nuevo: justo cuando hay ritmo de sobra, el plan
   se ponía a la mitad de velocidad. Mientras queden temas por conocer, la
   sesión trae al menos dos.
   ------------------------------------------------------------------ */
console.log("\n19) Ir adelantado no frena el plan");
{
  const todos = E.getAllTopics().map((t) => t.id);

  const temasNuevosCon = (porConocer) => {
    E.resetProgress();
    todos.slice(0, todos.length - porConocer).forEach((id) => E.introduceTopic(id));
    return E.computeTodayPlan().newTopics.length;
  };

  /* Muy adelantado: quedan 3 temas y más de 3 días, así que el calendario
     pediría 1. */
  const conTres = temasNuevosCon(3);
  const conDos = temasNuevosCon(2);
  check(conTres === 2, `con 3 temas por conocer la sesión trae 2 (trajo ${conTres})`);
  check(conDos === 2, `con 2 por conocer trae los 2 (trajo ${conDos})`);

  /* El piso nunca inventa temas: si solo queda uno, la sesión trae uno. */
  const conUno = temasNuevosCon(1);
  const conCero = temasNuevosCon(0);
  check(conUno === 1, `con 1 por conocer trae 1 (trajo ${conUno})`);
  check(conCero === 0, `con el temario conocido no trae ninguno (trajo ${conCero})`);

  /* Y el tope sigue puesto: un atraso grande no convierte el día en maratón. */
  const atrasado = temasNuevosCon(todos.length);
  check(atrasado <= 8, `arrancando de cero no pasa de 8 temas nuevos (trajo ${atrasado})`);
  check(atrasado >= 2, `y desde luego no baja del piso (trajo ${atrasado})`);

  E.resetProgress();
}

console.log(fallos === 0 ? "\nTODO OK" : `\nFALLAS: ${fallos}`);
process.exit(fallos === 0 ? 0 : 1);