/* ============================================================
   Generador de números pseudoaleatorios y utilidades de formato

   Se usa un PRNG con semilla (mulberry32) en vez de Math.random para que
   una pregunta generada sea REPRODUCIBLE: la misma semilla siempre produce
   el mismo problema. Eso permite que la pregunta del día no cambie sola en
   cada re-render y que las pruebas puedan barrer miles de casos.
   ============================================================ */

export function hashSeed(str) {
  let h = 2166136261 >>> 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export function makeRng(seed) {
  let a = (typeof seed === "number" ? seed : hashSeed(seed)) >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomSeed() {
  return (Math.floor(Math.random() * 0xffffffff) >>> 0);
}

/* ---------------- Ayudantes construidos sobre un rng ---------------- */

export function helpers(rng) {
  const int = (a, b) => a + Math.floor(rng() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const sample = (arr, n) => shuffle(arr).slice(0, n);
  const chance = (p) => rng() < p;

  /** Entero distinto de cero en [-b,-a] ∪ [a,b]. */
  const signedInt = (a, b) => int(a, b) * (chance(0.5) ? 1 : -1);

  /**
   * Arma las tres opciones a partir de la respuesta y una lista de
   * distractores candidatos. Devuelve null si no se juntan dos distractores
   * distintos: el generador se reintenta con otros números.
   */
  const choice3 = (answer, candidates) => {
    const a = fmtAny(answer);
    if (a === "" || a === "NaN" || a.includes("Infinity") || a.includes("undefined")) return null;
    const seen = new Set([a]);
    const dis = [];
    for (const c of candidates) {
      const s = fmtAny(c);
      if (!s || s === "NaN" || s.includes("Infinity") || s.includes("undefined")) continue;
      if (seen.has(s)) continue;
      seen.add(s);
      dis.push(s);
      if (dis.length === 2) break;
    }
    if (dis.length < 2) return null;
    const options = shuffle([a, dis[0], dis[1]]);
    return { options, correct: options.indexOf(a) };
  };

  return { rng, int, pick, shuffle, sample, chance, signedInt, choice3, fmt, money, frac, gcd, lcm };
}

/* ---------------- Formato de números ---------------- */

function groupThousands(intPart) {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Número legible: hasta 2 decimales, sin ceros de relleno, con separador de miles. */
export function fmt(n, decimals = 2) {
  if (typeof n !== "number" || !isFinite(n)) return String(n);
  const rounded = Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
  let s = rounded.toFixed(decimals);
  if (decimals > 0) s = s.replace(/\.?0+$/, "");
  const neg = s.startsWith("-");
  if (neg) s = s.slice(1);
  const [i, d] = s.split(".");
  return (neg ? "-" : "") + groupThousands(i) + (d ? "." + d : "");
}

export function money(n) {
  const neg = n < 0;
  const s = Math.abs(n).toFixed(2).replace(/\.00$/, "");
  const [i, d] = s.split(".");
  return (neg ? "-$" : "$") + groupThousands(i) + (d ? "." + d : "");
}

function fmtAny(v) {
  return typeof v === "number" ? fmt(v) : String(v);
}

/* ---------------- Aritmética de apoyo ---------------- */

export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a, b) {
  if (!a || !b) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/** Fracción simplificada como texto ("3/4", "2", "-1/5"). */
export function frac(num, den) {
  if (den === 0) return "indefinido";
  let n = num;
  let d = den;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  n /= g;
  d /= g;
  return d === 1 ? String(n) : n + "/" + d;
}
