// Validación de los archivos data/areaX.js: sintaxis, conteo de temas, forma del esquema.
// Uso: node scripts/validate-data.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

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

console.log(totalErrors === 0 ? "\nTODO OK" : `\nTOTAL DE PROBLEMAS: ${totalErrors}`);
process.exit(totalErrors === 0 ? 0 : 1);
