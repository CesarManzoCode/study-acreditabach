// Arnés compartido por las pruebas del motor. El motor está escrito para el
// navegador: aquí se le da un localStorage de mentiras y se cargan los
// data/*.js —que declaran con `const` y no se vuelven propiedades de window—
// copiándolos a globalThis. También trae un reloj falso para simular días.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

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
const leer = (dir) => {
  for (const f of fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.endsWith(".js"))) {
    src += fs.readFileSync(path.join(ROOT, dir, f), "utf8") + "\n";
  }
};
["data", "data/extra", "data/extra2", "data/formato", "data/refuerzo"].forEach(leer);
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

export const E = await import(pathToFileURL(path.join(ROOT, "src/lib/engine.js")).href);

/** Contador de comprobaciones: `check(ok, mensaje)` y `terminar()`. */
export function pruebas() {
  let fallos = 0;
  return {
    check(ok, msg) {
      console.log((ok ? "  ok   " : "  FALLA ") + msg);
      if (!ok) fallos++;
    },
    terminar() {
      console.log(fallos === 0 ? "\nTODO OK" : `\nFALLAS: ${fallos}`);
      process.exit(fallos === 0 ? 0 : 1);
    }
  };
}
