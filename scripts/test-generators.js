/* ============================================================
   Prueba de los generadores de reactivos.

   Por cada tema con generador se producen miles de reactivos con semillas
   distintas y se verifica que TODOS cumplan el contrato:
     · 3 opciones no vacías y distintas entre sí;
     · índice `correct` válido;
     · sin NaN, undefined, Infinity ni marcadores de plantilla sin sustituir;
     · explicación presente.
   También se mide cuántos enunciados distintos produce cada tema (variación).

   Uso: node scripts/test-generators.js [--muestra] [--tema 1.3.4]
   ============================================================ */

import { generateQuestion, valid, GENERATED_TOPIC_IDS } from "../src/lib/generators/index.js";

const args = process.argv.slice(2);
const MOSTRAR_MUESTRA = args.includes("--muestra");
const soloTema = args.includes("--tema") ? args[args.indexOf("--tema") + 1] : null;

const N = Number(process.env.N || 3000);
const MIN_UNICOS = 12; // cada tema debe producir al menos esta variedad de enunciados

const temas = soloTema ? [soloTema] : GENERATED_TOPIC_IDS;
let fallas = 0;
let totalGenerados = 0;

console.log(`Probando ${temas.length} temas con generador · ${N} reactivos por tema\n`);

for (const id of temas) {
  const enunciados = new Set();
  const problemas = [];
  let nulos = 0;

  for (let i = 0; i < N; i++) {
    const q = generateQuestion(id, i * 2654435761);
    if (!q) {
      nulos++;
      continue;
    }
    totalGenerados++;
    if (!valid(q)) {
      if (problemas.length < 3) problemas.push("reactivo inválido: " + JSON.stringify(q));
      continue;
    }
    if (q.options[q.correct] === undefined) {
      if (problemas.length < 3) problemas.push("índice correct fuera de rango: " + JSON.stringify(q));
    }
    enunciados.add(q.q);
  }

  const unicos = enunciados.size;
  if (nulos > 0) problemas.push(`${nulos} intentos no lograron generar reactivo (deberían ser 0)`);
  if (unicos < MIN_UNICOS) problemas.push(`solo ${unicos} enunciados distintos, se esperaban al menos ${MIN_UNICOS}`);

  if (problemas.length) {
    fallas += problemas.length;
    console.log(`[${id}] ✗`);
    problemas.forEach((p) => console.log("    - " + p));
  } else {
    console.log(`[${id}] OK — ${unicos} enunciados distintos de ${N} intentos`);
  }

  if (MOSTRAR_MUESTRA) {
    for (let i = 0; i < 3; i++) {
      const q = generateQuestion(id, 1000 + i * 7777777);
      if (!q) continue;
      console.log(`\n    · ${q.q}`);
      q.options.forEach((o, oi) => console.log(`        ${oi === q.correct ? "→" : " "} ${o}`));
      console.log(`        ${q.explanation}`);
    }
    console.log("");
  }
}

console.log(`\n${totalGenerados} reactivos generados en total.`);
console.log(fallas === 0 ? "TODO OK" : `TOTAL DE PROBLEMAS: ${fallas}`);
process.exit(fallas === 0 ? 0 : 1);
