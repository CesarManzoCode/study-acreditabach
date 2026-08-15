// Validación de los archivos data/areaX.js: sintaxis, conteo de temas, forma del esquema.
// Uso: node scripts/validate-data.js
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EXPECTED = [
  { file: "area1.js", varName: "AREA1_TOPICS", count: 30, area: 1 },
  { file: "area2.js", varName: "AREA2_TOPICS", count: 18, area: 2 },
  { file: "area3.js", varName: "AREA3_TOPICS", count: 21, area: 3 },
  { file: "area4.js", varName: "AREA4_TOPICS", count: 20, area: 4 },
  { file: "area5.js", varName: "AREA5_TOPICS", count: 32, area: 5 },
  { file: "area6_es.js", varName: "AREA6_ES_TOPICS", count: 21, area: 6 },
  { file: "area6_en.js", varName: "AREA6_EN_TOPICS", count: 10, area: 6 },
  { file: "area7.js", varName: "AREA7_TOPICS", count: 25, area: 7 }
];

let totalErrors = 0;
const allIds = new Set();

/* Contenido acumulado por tema, para las revisiones que cruzan archivos.
   La más importante: que ninguna tarjeta repita el frente de otra del mismo
   tema. Dos tarjetas con la misma pregunta son dos tarjetas independientes en
   el repaso espaciado, así que el mismo texto sale dos veces para siempre. */
const porTema = new Map();

function registrar(id, origen, entry) {
  const acc = porTema.get(id) || { flashcards: [], quiz: [] };
  (entry.flashcards || []).forEach((fc, i) => acc.flashcards.push({ origen, i, fc }));
  (entry.quiz || []).forEach((q, i) => acc.quiz.push({ origen, i, q }));
  porTema.set(id, acc);
}

for (const spec of EXPECTED) {
  const fp = path.join(__dirname, "..", "data", spec.file);
  const errors = [];
  let arr;
  try {
    const code = fs.readFileSync(fp, "utf8");
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(code + `\n;this.__OUT__ = ${spec.varName};`, sandbox);
    arr = sandbox.__OUT__;
  } catch (e) {
    console.log(`[${spec.file}] ERROR DE SINTAXIS: ${e.message}`);
    totalErrors++;
    continue;
  }
  if (!Array.isArray(arr)) { errors.push(`no exporta un array llamado ${spec.varName}`); }
  else {
    if (arr.length !== spec.count) errors.push(`esperaba ${spec.count} temas, tiene ${arr.length}`);
    arr.forEach((t, i) => {
      const pre = `item[${i}] (${t && t.id})`;
      if (!t || typeof t !== "object") { errors.push(`${pre}: no es un objeto`); return; }
      if (!t.id) errors.push(`${pre}: falta id`);
      if (allIds.has(t.id)) errors.push(`${pre}: id duplicado en todo el catálogo`);
      allIds.add(t.id);
      if (t.area !== spec.area) errors.push(`${pre}: area=${t.area}, esperaba ${spec.area}`);
      if (!t.subarea) errors.push(`${pre}: falta subarea`);
      if (!t.tema) errors.push(`${pre}: falta tema`);
      if (!t.note || t.note.length < 20) errors.push(`${pre}: note ausente o muy corto`);
      if (!Array.isArray(t.flashcards) || t.flashcards.length !== 2) errors.push(`${pre}: flashcards debe tener exactamente 2 (tiene ${t.flashcards ? t.flashcards.length : 0})`);
      else t.flashcards.forEach((fc, fi) => {
        if (!fc.front || !fc.back) errors.push(`${pre}: flashcard[${fi}] incompleta`);
      });
      if (!Array.isArray(t.quiz) || t.quiz.length !== 2) errors.push(`${pre}: quiz debe tener exactamente 2 (tiene ${t.quiz ? t.quiz.length : 0})`);
      else t.quiz.forEach((q, qi) => {
        if (!q.q) errors.push(`${pre}: quiz[${qi}] sin pregunta`);
        if (!Array.isArray(q.options) || q.options.length !== 3) errors.push(`${pre}: quiz[${qi}] debe tener exactamente 3 opciones`);
        if (typeof q.correct !== "number" || q.correct < 0 || q.correct > 2) errors.push(`${pre}: quiz[${qi}].correct inválido (${q.correct})`);
        if (!q.explanation) errors.push(`${pre}: quiz[${qi}] sin explanation`);
      });
      registrar(t.id, spec.file, t);
    });
  }
  if (errors.length) {
    console.log(`\n[${spec.file}] ${errors.length} problema(s):`);
    errors.slice(0, 40).forEach(e => console.log("  - " + e));
    if (errors.length > 40) console.log(`  ... y ${errors.length - 40} más`);
    totalErrors += errors.length;
  } else {
    console.log(`[${spec.file}] OK — ${arr.length} temas`);
  }
}

/* ---------------- Paquetes de contenido adicional ----------------
   data/extra/areaN.js declara AREAn_EXTRA = { "tema.id": {flashcards, quiz} }.
   Se concatenan al final de los arreglos originales, así que aquí se revisa
   que la forma sea correcta y que los ids existan en el catálogo base. */

const EXTRA_DIRS = [
  { dir: "extra", suffix: "EXTRA" },
  { dir: "extra2", suffix: "EXTRA2" }
];
const EXTRA_SPECS = EXTRA_DIRS.flatMap(({ dir, suffix }) =>
  [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    file: `${dir}/area${n}.js`,
    varName: `AREA${n}_${suffix}`
  }))
);

let extraFlashcards = 0;
let extraQuiz = 0;
let temasConExtra = 0;

for (const spec of EXTRA_SPECS) {
  const fp = path.join(__dirname, "..", "data", spec.file);
  if (!fs.existsSync(fp)) continue;
  const errors = [];
  let pack;
  try {
    const code = fs.readFileSync(fp, "utf8");
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(code + `\n;this.__OUT__ = ${spec.varName};`, sandbox);
    pack = sandbox.__OUT__;
  } catch (e) {
    console.log(`[${spec.file}] ERROR DE SINTAXIS: ${e.message}`);
    totalErrors++;
    continue;
  }

  if (!pack || typeof pack !== "object") {
    console.log(`[${spec.file}] no exporta un objeto llamado ${spec.varName}`);
    totalErrors++;
    continue;
  }

  for (const id of Object.keys(pack)) {
    const entry = pack[id];
    const pre = `${id}`;
    if (!allIds.has(id)) errors.push(`${pre}: el tema no existe en el catálogo base`);
    temasConExtra++;
    const fcs = entry.flashcards || [];
    const qs = entry.quiz || [];
    if (!Array.isArray(fcs) || !Array.isArray(qs)) { errors.push(`${pre}: flashcards y quiz deben ser arreglos`); continue; }
    if (!fcs.length && !qs.length) errors.push(`${pre}: el paquete no agrega nada`);
    fcs.forEach((fc, i) => {
      if (!fc || !fc.front || !fc.back) errors.push(`${pre}: flashcard[${i}] incompleta`);
    });
    qs.forEach((q, i) => {
      if (!q || !q.q) errors.push(`${pre}: quiz[${i}] sin pregunta`);
      else if (!Array.isArray(q.options) || q.options.length !== 3) errors.push(`${pre}: quiz[${i}] debe tener exactamente 3 opciones`);
      else if (new Set(q.options).size !== 3) errors.push(`${pre}: quiz[${i}] tiene opciones repetidas`);
      if (!q || typeof q.correct !== "number" || q.correct < 0 || q.correct > 2) errors.push(`${pre}: quiz[${i}].correct inválido`);
      if (!q || !q.explanation) errors.push(`${pre}: quiz[${i}] sin explanation`);
      if (q && Object.prototype.hasOwnProperty.call(q, "back")) errors.push(`${pre}: quiz[${i}] tiene una propiedad "back" (parece una flashcard mal colocada)`);
    });
    extraFlashcards += fcs.length;
    extraQuiz += qs.length;
    registrar(id, spec.file, entry);
  }

  if (errors.length) {
    console.log(`\n[${spec.file}] ${errors.length} problema(s):`);
    errors.slice(0, 40).forEach(e => console.log("  - " + e));
    if (errors.length > 40) console.log(`  ... y ${errors.length - 40} más`);
    totalErrors += errors.length;
  } else {
    const temas = Object.keys(pack).length;
    const fc = Object.values(pack).reduce((s, e) => s + (e.flashcards || []).length, 0);
    const qz = Object.values(pack).reduce((s, e) => s + (e.quiz || []).length, 0);
    console.log(`[${spec.file}] OK — ${temas} temas · +${fc} tarjetas · +${qz} reactivos`);
  }
}

console.log(`\nContenido adicional: ${temasConExtra} temas ampliados · +${extraFlashcards} tarjetas · +${extraQuiz} reactivos`);

/* ---------------- Revisiones que cruzan los archivos ----------------

   Un tema se arma con su archivo base más los paquetes de ampliación, y hasta
   ahora nada comprobaba que las tres partes encajaran entre sí. Aquí se revisa
   lo que solo se ve al juntarlas. */

const cruzados = [];
const norm = (s) => String(s).toLowerCase().replace(/\s+/g, " ").trim();

for (const [id, acc] of porTema) {
  const frentes = new Map();
  acc.flashcards.forEach(({ origen, i, fc }) => {
    if (!fc || !fc.front) return;
    const k = norm(fc.front);
    const prev = frentes.get(k);
    if (prev) {
      cruzados.push(
        `${id}: la tarjeta "${fc.front}" está dos veces ` +
        `(${prev.origen}[flashcards[${prev.i}]] y ${origen}[flashcards[${i}]]). ` +
        `Cada copia es una tarjeta aparte en el repaso: cámbiale el enfoque a una de las dos.`
      );
    } else {
      frentes.set(k, { origen, i });
    }
  });

  const reactivos = new Map();
  acc.quiz.forEach(({ origen, i, q }) => {
    if (!q || !q.q || !Array.isArray(q.options)) return;
    const k = norm(q.q) + "||" + q.options.map(norm).join("|");
    const prev = reactivos.get(k);
    if (prev) {
      cruzados.push(
        `${id}: el reactivo "${q.q}" está dos veces con las mismas opciones ` +
        `(${prev.origen}[quiz[${prev.i}]] y ${origen}[quiz[${i}]]).`
      );
    } else {
      reactivos.set(k, { origen, i });
    }
  });
}

if (cruzados.length) {
  console.log(`\n[revisión entre archivos] ${cruzados.length} problema(s):`);
  cruzados.slice(0, 60).forEach((e) => console.log("  - " + e));
  if (cruzados.length > 60) console.log(`  ... y ${cruzados.length - 60} más`);
  totalErrors += cruzados.length;
} else {
  console.log("[revisión entre archivos] OK — sin tarjetas ni reactivos repetidos dentro de un mismo tema");
}

console.log(totalErrors === 0 ? "\nTODO OK" : `\nTOTAL DE PROBLEMAS: ${totalErrors}`);
process.exit(totalErrors === 0 ? 0 : 1);
