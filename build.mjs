/* ============================================================
   Build del sitio: empaqueta la app de React con esbuild y
   genera el index.html con los nombres de archivo versionados.

   node build.mjs           -> build de producción
   node build.mjs --dev     -> build sin minificar, con sourcemap
   node build.mjs --watch   -> reconstruye al guardar
   node build.mjs --serve   -> servidor local en http://localhost:5173
   ============================================================ */

import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUTDIR = path.join(ROOT, "assets");
const args = new Set(process.argv.slice(2));
const DEV = args.has("--dev") || args.has("--serve");
const WATCH = args.has("--watch");
const SERVE = args.has("--serve");

/* Los archivos de data/ se cargan como scripts clásicos (definen globals
   AREA1_TOPICS, AREA_META, INFO_SECTIONS...). No se empaquetan a propósito:
   así el validador de contenido (scripts/validate-data.js) los sigue leyendo
   tal cual y editar el temario no obliga a recompilar. */
const DATA_SCRIPTS = [
  "data/meta.js",
  "data/info.js",
  "data/area1.js",
  "data/area2.js",
  "data/area3.js",
  "data/area4.js",
  "data/area5.js",
  "data/area6_es.js",
  "data/area6_en.js",
  "data/area7.js",
  /* Paquetes de contenido adicional: más tarjetas y más reactivos por tema.
     Se cargan después de los catálogos base y el motor los concatena. */
  "data/extra/area1.js",
  "data/extra/area2.js",
  "data/extra/area3.js",
  "data/extra/area4.js",
  "data/extra/area5.js",
  "data/extra/area6.js",
  "data/extra/area7.js",
  /* Segundo paquete de ampliación (data/extra2): triplica el banco de
     reactivos y de tarjetas de cada tema de las 7 áreas. */
  "data/extra2/area1.js",
  "data/extra2/area2.js",
  "data/extra2/area3.js",
  "data/extra2/area4.js",
  "data/extra2/area5.js",
  "data/extra2/area6.js",
  "data/extra2/area7.js",
  /* Reactivos con los formatos de relación de elementos y de jerarquización
     que la guía oficial marca para ciertos temas (data/formato). */
  "data/formato/area2.js",
  "data/formato/area3.js",
  "data/formato/area4.js",
  "data/formato/area6.js",
  "data/formato/area7.js"
];

function cleanOutdir() {
  fs.rmSync(OUTDIR, { recursive: true, force: true });
  fs.mkdirSync(OUTDIR, { recursive: true });
}

function relOut(file) {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

/** Escribe index.html a partir de la plantilla, insertando los assets con hash. */
function writeHtml(metafile) {
  const outputs = Object.keys(metafile.outputs);
  const js = outputs.find((f) => f.endsWith(".js"));
  const css = outputs.find((f) => f.endsWith(".css"));
  if (!js) throw new Error("El build no generó ningún archivo .js");

  const tpl = fs.readFileSync(path.join(ROOT, "src", "index.html"), "utf8");
  const dataTags = DATA_SCRIPTS.map((s) => `<script defer src="${s}"></script>`).join("\n  ");

  const html = tpl
    .replace("{{CSS}}", css ? relOut(path.join(ROOT, css)) : "")
    .replace("{{JS}}", relOut(path.join(ROOT, js)))
    .replace("{{DATA_SCRIPTS}}", dataTags);

  fs.writeFileSync(path.join(ROOT, "index.html"), html);
  return { js, css };
}

/** Plugin que regenera el index.html después de cada build. */
const htmlPlugin = {
  name: "html",
  setup(build) {
    build.onEnd((result) => {
      if (result.errors.length || !result.metafile) return;
      const { js, css } = writeHtml(result.metafile);
      const size = (f) => (fs.statSync(path.join(ROOT, f)).size / 1024).toFixed(1) + " kB";
      console.log(`✓ ${js} (${size(js)})${css ? `  ·  ${css} (${size(css)})` : ""}`);
    });
  }
};

const options = {
  entryPoints: [path.join(ROOT, "src", "main.jsx")],
  bundle: true,
  format: "esm",
  target: ["es2020", "chrome90", "firefox90", "safari15"],
  jsx: "automatic",
  outdir: OUTDIR,
  entryNames: DEV ? "[name]" : "[name]-[hash]",
  minify: !DEV,
  sourcemap: DEV,
  metafile: true,
  legalComments: "none",
  // Las fuentes viven en /fonts y se referencian con rutas relativas desde el CSS.
  external: ["*.woff2"],
  define: { "process.env.NODE_ENV": DEV ? '"development"' : '"production"' },
  logLevel: "warning",
  plugins: [htmlPlugin]
};

cleanOutdir();

if (WATCH || SERVE) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  if (SERVE) {
    const { host, port } = await ctx.serve({ servedir: ROOT, port: 5173 });
    console.log(`\n  Servidor listo en http://${host === "0.0.0.0" ? "localhost" : host}:${port}\n`);
  } else {
    console.log("\n  Observando cambios…\n");
  }
} else {
  await esbuild.build(options);
}
