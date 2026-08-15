/* ============================================================
   Aplica las decisiones de script./poda.decisiones.cjs a los
   paquetes data/extra/*.js y data/extra2/*.js.

   Reescribe los archivos quitando los ítems marcados y genera
   data/poda.js con el mapa de migración: como las tarjetas se
   identifican por su posición (`tema::fcN`), borrar una corre a
   todas las siguientes. El mapa dice, para cada tema, qué
   `front` tenía cada índice antes de podar, y el motor lo usa
   una sola vez para reubicar el progreso ya guardado.

   Uso:  node scripts/podar.cjs          (aplica)
         node scripts/podar.cjs --dry    (solo reporta)
   ============================================================ */

const fs = require("fs");
const path = require("path");
const DECISIONES = require("./poda.decisiones.cjs");

const RAIZ = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry");

const ARCHIVOS = [];
for (const n of [1, 2, 3, 4, 5, 6, 7]) {
  const base = n === 6 ? "area6" : "area" + n;
  ARCHIVOS.push({ ruta: `data/extra/${base}.js`, variable: `AREA${n}_EXTRA`, tag: "A" });
  ARCHIVOS.push({ ruta: `data/extra2/${base}.js`, variable: `AREA${n}_EXTRA2`, tag: "B" });
}

/* Los paquetes son literales JS con comentarios; se evalúan tal cual. */
function cargar(ruta, variable) {
  const src = fs.readFileSync(path.join(RAIZ, ruta), "utf8");
  return { src, datos: eval(src + ";" + variable) };
}

/* Índices a quitar de un tema, separados por paquete y por tipo. */
function objetivos(topicId, tag) {
  const d = DECISIONES[topicId];
  if (!d) return { fc: new Set(), q: new Set() };
  const fc = new Set();
  const q = new Set();
  for (const etiqueta of d.drop) {
    if (etiqueta[0] !== tag) continue;
    const i = Number(etiqueta.slice(2));
    (etiqueta[1] === "f" ? fc : q).add(i);
  }
  return { fc, q };
}

/* Serializa un valor como literal JS legible, al estilo de los paquetes.
   U+2028 y U+2029 son saltos de linea validos en JS pero rompen el parseo,
   asi que se escapan para que el archivo generado siga siendo cargable. */
function lit(v) {
  return JSON.stringify(v)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function serializar(datos, variable, cabecera) {
  const partes = [cabecera, "", `const ${variable} = {`];
  const ids = Object.keys(datos);
  ids.forEach((id, idx) => {
    const t = datos[id];
    const bloques = [];
    if (t.leccion) bloques.push(`    leccion: ${lit(t.leccion)}`);
    if (t.flashcards && t.flashcards.length) {
      const fcs = t.flashcards.map((f) => `      { front: ${lit(f.front)}, back: ${lit(f.back)} }`);
      bloques.push(`    flashcards: [\n${fcs.join(",\n")}\n    ]`);
    }
    if (t.quiz && t.quiz.length) {
      const qs = t.quiz.map(
        (q) =>
          `      { q: ${lit(q.q)}, options: ${lit(q.options)}, correct: ${q.correct}, explanation: ${lit(q.explanation)} }`
      );
      bloques.push(`    quiz: [\n${qs.join(",\n")}\n    ]`);
    }
    partes.push(`  ${lit(id)}: {\n${bloques.join(",\n")}\n  }${idx === ids.length - 1 ? "" : ","}`);
  });
  partes.push("};", "");
  return partes.join("\n");
}

/* Cabecera original del archivo (el comentario de bloque inicial). */
function cabeceraDe(src) {
  const m = src.match(/^\s*\/\*[\s\S]*?\*\//);
  return m ? m[0].trim() : "";
}

const migracion = {};   // topicId -> [front, front, ...] en el orden ANTERIOR a la poda
const resumen = [];
let totalFc = 0;
let totalQ = 0;

/* Primero se registra el orden viejo de flashcards de cada tema (base + A + B).
   La capa base no se poda, así que basta con recorrerla para llegar al offset. */
const BASES = [
  ["data/area1.js", "AREA1_TOPICS"],
  ["data/area2.js", "AREA2_TOPICS"],
  ["data/area3.js", "AREA3_TOPICS"],
  ["data/area4.js", "AREA4_TOPICS"],
  ["data/area5.js", "AREA5_TOPICS"],
  ["data/area6_es.js", "AREA6_ES_TOPICS"],
  ["data/area6_en.js", "AREA6_EN_TOPICS"],
  ["data/area7.js", "AREA7_TOPICS"]
];

const frontsBase = {};
for (const [ruta, variable] of BASES) {
  for (const t of cargar(ruta, variable).datos) {
    frontsBase[t.id] = (t.flashcards || []).map((f) => f.front);
  }
}

const frontsExtra = {};   // topicId -> {A: [...], B: [...]}
for (const { ruta, variable, tag } of ARCHIVOS) {
  const { datos } = cargar(ruta, variable);
  for (const id of Object.keys(datos)) {
    frontsExtra[id] = frontsExtra[id] || { A: [], B: [] };
    frontsExtra[id][tag] = (datos[id].flashcards || []).map((f) => f.front);
  }
}

for (const id of Object.keys(frontsBase)) {
  const e = frontsExtra[id] || { A: [], B: [] };
  migracion[id] = [].concat(frontsBase[id], e.A, e.B);
}

/* Ahora sí, la poda. */
for (const { ruta, variable, tag } of ARCHIVOS) {
  const { src, datos } = cargar(ruta, variable);
  let quitadasFc = 0;
  let quitadosQ = 0;

  for (const id of Object.keys(datos)) {
    const { fc, q } = objetivos(id, tag);
    if (!fc.size && !q.size) continue;
    const t = datos[id];
    if (t.flashcards) {
      const antes = t.flashcards.length;
      t.flashcards = t.flashcards.filter((_, i) => !fc.has(i));
      quitadasFc += antes - t.flashcards.length;
    }
    if (t.quiz) {
      const antes = t.quiz.length;
      t.quiz = t.quiz.filter((_, i) => !q.has(i));
      quitadosQ += antes - t.quiz.length;
    }
    /* Un tema que se queda sin nada no debe dejar un bloque vacío. */
    if (!(t.flashcards || []).length && !(t.quiz || []).length) delete datos[id];
  }

  totalFc += quitadasFc;
  totalQ += quitadosQ;
  resumen.push(`${ruta}: −${quitadasFc} tarjetas · −${quitadosQ} reactivos`);

  if (!DRY) {
    fs.writeFileSync(path.join(RAIZ, ruta), serializar(datos, variable, cabeceraDe(src)), "utf8");
  }
}

/* Validación: toda etiqueta de las decisiones debe haber existido. */
const huerfanas = [];
for (const id of Object.keys(DECISIONES)) {
  if (!migracion[id]) huerfanas.push(id + " (tema inexistente)");
}
if (huerfanas.length) {
  console.error("Decisiones que no corresponden a ningún tema:", huerfanas.join(", "));
  process.exit(1);
}

if (!DRY) {
  const cabecera = `/* Mapa de migración de la poda del temario.

   Al quitar tarjetas de los paquetes de ampliación, los identificadores
   posicionales (\`tema::fcN\`) de las tarjetas siguientes se recorren. Aquí
   queda el orden que tenían ANTES de podar: el motor lo usa una sola vez
   para mover el progreso guardado a su nueva posición, emparejando por el
   texto del frente. Después de esa migración este archivo ya no se usa,
   pero se conserva para que la operación sea auditable y repetible.

   Generado por scripts/podar.cjs. No editar a mano. */`;
  const cuerpo = Object.keys(migracion)
    .map((id) => `  ${lit(id)}: ${lit(migracion[id])}`)
    .join(",\n");
  fs.writeFileSync(
    path.join(RAIZ, "data/poda.js"),
    `${cabecera}\n\nconst PODA_FRONTS_PREVIOS = {\n${cuerpo}\n};\n`,
    "utf8"
  );
}

console.log(resumen.join("\n"));
console.log(`\nTotal: −${totalFc} tarjetas · −${totalQ} reactivos${DRY ? "  (simulación)" : ""}`);
