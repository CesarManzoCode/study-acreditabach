/* ============================================================
   Segunda poda: quitar lo que no aporta información nueva.

   La primera poda quitó lo que la guía no evalúa. Esta quita lo que sí se
   evalúa pero ya está cubierto por otra cosa mejor. Dos reglas:

   A) REACTIVOS NUMÉRICOS EN TEMAS CON GENERADOR.
      45 temas de matemáticas y ciencias tienen un generador que produce
      problemas nuevos con números distintos cada vez. Un reactivo numérico
      fijo en esos temas no agrega nada: entrena el mismo procedimiento y
      además se puede memorizar por su respuesta en vez de resolverse. El
      generador lo hace mejor y sin repetirse nunca.

      Se conservan los reactivos CONCEPTUALES de esos temas ("¿qué se conserva
      entre figuras semejantes?"), porque el generador solo produce cálculo.

   B) REACTIVOS CASI IDÉNTICOS.
      Mismo enunciado en lo esencial y misma respuesta correcta, en temas sin
      generador. Se conserva el de la capa más temprana (base > extra >
      extra2 > refuerzo) y se quita el resto.

   Solo toca reactivos, nunca tarjetas: los reactivos no guardan progreso
   individual —solo aciertos por tema— así que no hace falta migrar nada.

   Uso:  node scripts/podar-redundancia.cjs [--dry]
   ============================================================ */

const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry");

/* ---------------- Temas con generador ---------------- */

const idsDe = (archivo) =>
  [...fs.readFileSync(path.join(RAIZ, archivo), "utf8").matchAll(/^\s{2}"(\d\.\d+\.\d+)":/gm)].map((m) => m[1]);

const CON_GENERADOR = new Set([
  ...idsDe("src/lib/generators/math.js"),
  ...idsDe("src/lib/generators/science.js")
]);

/* ---------------- Utilidades de texto ---------------- */

const norm = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ").replace(/\s+/g, " ").trim();

const VACIAS = new Set(
  "el la los las un una unos unas de del al y o e u en que se su sus lo a con por para es son era fue cual cuales como le les mas pero sin".split(" ")
);
const tokens = (s) => new Set(norm(s).split(" ").filter((w) => w.length > 3 && !VACIAS.has(w)));
const jaccard = (a, b) => {
  let i = 0;
  for (const x of a) if (b.has(x)) i++;
  const u = a.size + b.size - i;
  return u ? i / u : 0;
};

/** ¿Es un problema de cálculo, de los que el generador rehace con otros números?

    Ojo con dos falsos positivos que costaron caro al escribir esto:
    · Los reactivos de relación de elementos y de jerarquización tienen opciones
      como "1b, 2c, 3a", llenas de dígitos, y NO son problemas de cálculo. El
      generador no produce ese formato, así que quitarlos sería perder justo lo
      que más falta hacía.
    · Un reactivo conceptual puede citar un número de paso ("la ley cero de la
      termodinámica"); por eso se exige que las OPCIONES sean numéricas. */
const FORMATO_RELACION = /^\s*\d\s*[a-e](\s*,\s*\d\s*[a-e])+\s*$/;

function esNumerico(q) {
  if (!/\d/.test(q.q)) return false;
  if (/^(Relacione|Relaciona|Ordene|Ordena|Clasifique|Clasifica)/i.test(q.q)) return false;
  const opciones = q.options || [];
  if (opciones.some((o) => FORMATO_RELACION.test(String(o)))) return false;
  /* Numérico de verdad: al menos dos opciones que sean esencialmente un número
     (con su unidad o su signo), no una frase que contenga un número. */
  const soloNumero = (o) => /^[^a-zA-ZñÑ]*-?\d[\d.,\s×^⁻⁰¹²³⁴⁵⁶⁷⁸⁹/]*\s*[^\s\d]{0,12}$/.test(String(o).trim());
  return opciones.filter(soloNumero).length >= 2;
}

/* ---------------- Carga de los archivos ---------------- */

const CAPAS = [
  { ruta: "data/area1.js", variable: "AREA1_TOPICS", capa: "base", lista: true },
  { ruta: "data/area2.js", variable: "AREA2_TOPICS", capa: "base", lista: true },
  { ruta: "data/area3.js", variable: "AREA3_TOPICS", capa: "base", lista: true },
  { ruta: "data/area4.js", variable: "AREA4_TOPICS", capa: "base", lista: true },
  { ruta: "data/area5.js", variable: "AREA5_TOPICS", capa: "base", lista: true },
  { ruta: "data/area6_es.js", variable: "AREA6_ES_TOPICS", capa: "base", lista: true },
  { ruta: "data/area6_en.js", variable: "AREA6_EN_TOPICS", capa: "base", lista: true },
  { ruta: "data/area7.js", variable: "AREA7_TOPICS", capa: "base", lista: true }
];
for (const [dir, suf] of [["extra", "EXTRA"], ["extra2", "EXTRA2"], ["formato", "FORMATO"], ["refuerzo", "REFUERZO"]]) {
  for (const n of [1, 2, 3, 4, 5, 6, 7]) {
    const base = n === 6 ? "area6" : "area" + n;
    const ruta = `data/${dir}/${base}.js`;
    if (fs.existsSync(path.join(RAIZ, ruta))) {
      CAPAS.push({ ruta, variable: `AREA${n}_${suf}`, capa: dir, lista: false });
    }
  }
}

const ORDEN_CAPA = { base: 0, extra: 1, extra2: 2, formato: 3, refuerzo: 4 };

function cargar(c) {
  const src = fs.readFileSync(path.join(RAIZ, c.ruta), "utf8");
  return { src, datos: eval(src + ";" + c.variable) };
}

const cargadas = CAPAS.map((c) => ({ ...c, ...cargar(c) }));

/* ---------------- Regla A ---------------- */

const quitar = new Map(); // "ruta|id|indice" -> motivo
const marcar = (ruta, id, i, motivo) => quitar.set(`${ruta}|${id}|${i}`, motivo);

/* La capa base NO se toca: sus dos reactivos por tema son los ejemplos
   resueltos que acompañan a la lección, lo primero que se practica después de
   leerla. El desperdicio estaba en las ampliaciones, que apilaban cinco o seis
   variantes numéricas más encima de un generador infinito. */
for (const c of cargadas) {
  if (c.capa === "base") continue;
  for (const id of Object.keys(c.datos)) {
    if (!CON_GENERADOR.has(id)) continue;
    (c.datos[id].quiz || []).forEach((q, i) => {
      if (esNumerico(q)) marcar(c.ruta, id, i, "generador");
    });
  }
}

/* ---------------- Regla B ---------------- */

const porTema = {};
for (const c of cargadas) {
  const temas = c.lista ? c.datos : Object.keys(c.datos).map((id) => ({ id, ...c.datos[id] }));
  for (const t of temas) {
    (t.quiz || []).forEach((q, i) => {
      (porTema[t.id] = porTema[t.id] || []).push({
        ruta: c.ruta, capa: c.capa, i, q,
        tk: tokens(q.q), resp: norm(q.options[q.correct])
      });
    });
  }
}

for (const id in porTema) {
  const L = porTema[id].sort((a, b) => ORDEN_CAPA[a.capa] - ORDEN_CAPA[b.capa] || a.i - b.i);
  for (let i = 0; i < L.length; i++) {
    if (quitar.has(`${L[i].ruta}|${id}|${L[i].i}`)) continue;
    for (let j = i + 1; j < L.length; j++) {
      if (quitar.has(`${L[j].ruta}|${id}|${L[j].i}`)) continue;
      const mismaRespuesta = L[i].resp === L[j].resp || jaccard(tokens(L[i].resp), tokens(L[j].resp)) > 0.7;
      if (mismaRespuesta && jaccard(L[i].tk, L[j].tk) >= 0.75) {
        marcar(L[j].ruta, id, L[j].i, "duplicado");
      }
    }
  }
}

/* ---------------- Aplicar ---------------- */

function lit(v) {
  return JSON.stringify(v)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function serializarTema(t, sangria) {
  const s = " ".repeat(sangria);
  const partes = [];
  if (t.note) partes.push(`${s}  note: ${lit(t.note)}`);
  if (t.leccion) partes.push(`${s}  leccion: ${lit(t.leccion)}`);
  if (t.flashcards && t.flashcards.length) {
    partes.push(`${s}  flashcards: [\n` + t.flashcards.map((f) => `${s}    { front: ${lit(f.front)}, back: ${lit(f.back)} }`).join(",\n") + `\n${s}  ]`);
  }
  if (t.quiz && t.quiz.length) {
    partes.push(`${s}  quiz: [\n` + t.quiz.map((q) =>
      `${s}    { q: ${lit(q.q)}, options: ${lit(q.options)}, correct: ${q.correct}, explanation: ${lit(q.explanation)} }`
    ).join(",\n") + `\n${s}  ]`);
  }
  return partes;
}

function cabeceraDe(src) {
  const m = src.match(/^\s*\/\*[\s\S]*?\*\//);
  return m ? m[0].trim() : "";
}

let total = 0;
const resumen = [];

for (const c of cargadas) {
  let quitados = 0;
  const filtrar = (id, quiz) => {
    if (!quiz) return quiz;
    const out = quiz.filter((_, i) => !quitar.has(`${c.ruta}|${id}|${i}`));
    quitados += quiz.length - out.length;
    return out;
  };

  if (c.lista) {
    c.datos.forEach((t) => { t.quiz = filtrar(t.id, t.quiz); });
  } else {
    for (const id of Object.keys(c.datos)) {
      c.datos[id].quiz = filtrar(id, c.datos[id].quiz);
      const t = c.datos[id];
      if (!(t.flashcards || []).length && !(t.quiz || []).length && !t.leccion) delete c.datos[id];
    }
  }

  total += quitados;
  if (quitados) resumen.push(`${c.ruta}: −${quitados} reactivos`);

  if (!DRY && quitados) {
    let texto;
    if (c.lista) {
      const cuerpo = c.datos.map((t) => {
        const campos = [`    id: ${lit(t.id)}`, `    area: ${t.area}`, `    subarea: ${lit(t.subarea)}`, `    tema: ${lit(t.tema)}`]
          .concat(serializarTema(t, 2).map((x) => x.replace(/^ {2}/, "  ")));
        return `  {\n${campos.join(",\n")}\n  }`;
      }).join(",\n");
      texto = `${cabeceraDe(c.src)}\n\nconst ${c.variable} = [\n${cuerpo}\n];\n`;
    } else {
      const ids = Object.keys(c.datos);
      const cuerpo = ids.map((id, k) =>
        `  ${lit(id)}: {\n${serializarTema(c.datos[id], 2).join(",\n")}\n  }${k === ids.length - 1 ? "" : ","}`
      ).join("\n");
      texto = `${cabeceraDe(c.src)}\n\nconst ${c.variable} = {\n${cuerpo}\n};\n`;
    }
    fs.writeFileSync(path.join(RAIZ, c.ruta), texto, "utf8");
  }
}

const porMotivo = { generador: 0, duplicado: 0 };
for (const m of quitar.values()) porMotivo[m]++;

console.log(resumen.join("\n"));
console.log(`\nPor generador (el problema se rehace con otros números): ${porMotivo.generador}`);
console.log(`Duplicados exactos en tema sin generador: ${porMotivo.duplicado}`);
console.log(`Total: −${total} reactivos${DRY ? "  (simulación)" : ""}`);
