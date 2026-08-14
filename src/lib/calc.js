/* ============================================================
   Motor de la calculadora científica

   Analiza y evalúa una expresión escrita como texto, igual que una
   calculadora de examen: jerarquía de operaciones, paréntesis, funciones
   trigonométricas en grados o radianes, potencias, raíces y factorial.

   No usa eval() ni Function(): todo pasa por un tokenizador y un
   analizador descendente recursivo, así que una expresión mal escrita
   devuelve un error controlado y nunca ejecuta código.

   Gramática:
     expr    := term (('+' | '−') term)*
     term    := unary (('×' | '÷' | 'mod' | implícita) unary)*
     unary   := ('−' | '+') unary | power
     power   := postfix ('^' unary)?            (asociativa por la derecha)
     postfix := primary ('!' | '²' | '³' | '%')*
     primary := número | constante | '(' expr ')' | función(...) | √primary
   ============================================================ */

/* Multiplicación implícita: 2π, 3(4+1), 2√9, (1+2)(3+4). */

const FUNCS = {
  sin: (x, deg) => Math.sin(toRad(x, deg)),
  sen: (x, deg) => Math.sin(toRad(x, deg)),
  cos: (x, deg) => Math.cos(toRad(x, deg)),
  tan: (x, deg) => Math.tan(toRad(x, deg)),
  asin: (x, deg) => fromRad(Math.asin(x), deg),
  asen: (x, deg) => fromRad(Math.asin(x), deg),
  acos: (x, deg) => fromRad(Math.acos(x), deg),
  atan: (x, deg) => fromRad(Math.atan(x), deg),
  senh: (x) => Math.sinh(x),
  sinh: (x) => Math.sinh(x),
  cosh: (x) => Math.cosh(x),
  tanh: (x) => Math.tanh(x),
  ln: (x) => Math.log(x),
  log: (x) => Math.log10(x),
  log2: (x) => Math.log2(x),
  exp: (x) => Math.exp(x),
  sqrt: (x) => Math.sqrt(x),
  raiz: (x) => Math.sqrt(x),
  cbrt: (x) => Math.cbrt(x),
  abs: (x) => Math.abs(x),
  round: (x) => Math.round(x),
  floor: (x) => Math.floor(x),
  ceil: (x) => Math.ceil(x)
};

const FUNC_NAMES = Object.keys(FUNCS).sort((a, b) => b.length - a.length);

function toRad(x, deg) { return deg ? (x * Math.PI) / 180 : x; }
function fromRad(x, deg) { return deg ? (x * 180) / Math.PI : x; }

/* ---------------- Tokenizador ---------------- */

/** Normaliza los símbolos bonitos de la pantalla a algo uniforme. */
function normalize(src) {
  return String(src)
    .replace(/\s+/g, "")
    .replace(/[×·∙]/g, "*")
    .replace(/[÷:]/g, "/")
    .replace(/[−–—]/g, "-")
    .replace(/,/g, ".")
    .replace(/\[/g, "(")
    .replace(/\]/g, ")");
}

const NUM_START = /[0-9.]/;
const LETTER = /[a-zA-Z]/;

function tokenize(src) {
  const s = normalize(src);
  const out = [];
  let i = 0;

  while (i < s.length) {
    const c = s[i];

    if (NUM_START.test(c)) {
      let j = i;
      let dots = 0;
      while (j < s.length && NUM_START.test(s[j])) {
        if (s[j] === ".") dots++;
        j++;
      }
      if (dots > 1) throw new CalcError("Número mal escrito");
      // Notación científica escrita a mano: 1e-9, 6.02e23 (con "e" seguida de
      // dígitos). Si después de la "e" no hay número, la "e" es la constante.
      let end = j;
      if (s[j] === "e" || s[j] === "E") {
        let k = j + 1;
        if (s[k] === "+" || s[k] === "-") k++;
        if (k < s.length && /[0-9]/.test(s[k])) {
          while (k < s.length && /[0-9]/.test(s[k])) k++;
          end = k;
        }
      }
      const text = s.slice(i, end);
      j = end;
      const value = Number(text);
      if (!isFinite(value)) throw new CalcError("Número mal escrito");
      out.push({ t: "num", v: value });
      i = j;
      continue;
    }

    if (c === "π") { out.push({ t: "num", v: Math.PI }); i++; continue; }
    if (c === "√") { out.push({ t: "sqrt" }); i++; continue; }
    if (c === "²") { out.push({ t: "pow2" }); i++; continue; }
    if (c === "³") { out.push({ t: "pow3" }); i++; continue; }

    if (LETTER.test(c)) {
      const rest = s.slice(i).toLowerCase();
      const fn = FUNC_NAMES.find((n) => rest.startsWith(n));
      if (fn) { out.push({ t: "func", v: fn }); i += fn.length; continue; }
      if (rest.startsWith("mod")) { out.push({ t: "op", v: "mod" }); i += 3; continue; }
      if (rest.startsWith("ans")) { out.push({ t: "ans" }); i += 3; continue; }
      if (rest.startsWith("pi")) { out.push({ t: "num", v: Math.PI }); i += 2; continue; }
      if (rest[0] === "e") { out.push({ t: "num", v: Math.E }); i++; continue; }
      throw new CalcError(`No entiendo "${c}"`);
    }

    if ("+-*/^".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    if (c === "(") { out.push({ t: "(" }); i++; continue; }
    if (c === ")") { out.push({ t: ")" }); i++; continue; }
    if (c === "!") { out.push({ t: "fact" }); i++; continue; }
    if (c === "%") { out.push({ t: "pct" }); i++; continue; }

    throw new CalcError(`No entiendo "${c}"`);
  }

  return out;
}

export class CalcError extends Error {}

/* ---------------- Analizador ---------------- */

function parse(tokens, opts) {
  let pos = 0;
  const deg = !!opts.deg;
  const ans = Number(opts.ans) || 0;

  const peek = () => tokens[pos];
  const eat = () => tokens[pos++];

  function expr() {
    let left = term();
    while (peek() && peek().t === "op" && (peek().v === "+" || peek().v === "-")) {
      const op = eat().v;
      const right = term();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  function startsPrimary(tk) {
    return tk && (tk.t === "num" || tk.t === "(" || tk.t === "func" || tk.t === "sqrt" || tk.t === "ans");
  }

  function term() {
    let left = unary();
    for (;;) {
      const tk = peek();
      if (tk && tk.t === "op" && (tk.v === "*" || tk.v === "/" || tk.v === "mod")) {
        eat();
        const right = unary();
        if (tk.v === "*") left = left * right;
        else if (tk.v === "/") {
          if (right === 0) throw new CalcError("No se puede dividir entre 0");
          left = left / right;
        } else {
          if (right === 0) throw new CalcError("No se puede dividir entre 0");
          left = left % right;
        }
        continue;
      }
      // Multiplicación implícita: 2π, 3(4+1), 2√9, (1+2)(3+4)
      if (startsPrimary(tk)) { left = left * unary(); continue; }
      return left;
    }
  }

  function unary() {
    const tk = peek();
    if (tk && tk.t === "op" && (tk.v === "-" || tk.v === "+")) {
      eat();
      const v = unary();
      return tk.v === "-" ? -v : v;
    }
    return power();
  }

  function power() {
    const base = postfix();
    const tk = peek();
    if (tk && tk.t === "op" && tk.v === "^") {
      eat();
      const exponent = unary(); // asociativa por la derecha: 2^3^2 = 2^(3^2)
      const r = Math.pow(base, exponent);
      if (Number.isNaN(r)) throw new CalcError("Potencia sin resultado real");
      return r;
    }
    return base;
  }

  function postfix() {
    let v = primary();
    for (;;) {
      const tk = peek();
      if (!tk) return v;
      if (tk.t === "fact") { eat(); v = factorial(v); continue; }
      if (tk.t === "pow2") { eat(); v = v * v; continue; }
      if (tk.t === "pow3") { eat(); v = v * v * v; continue; }
      if (tk.t === "pct") { eat(); v = v / 100; continue; }
      return v;
    }
  }

  function primary() {
    const tk = eat();
    if (!tk) throw new CalcError("Falta un número al final");

    if (tk.t === "num") return tk.v;
    if (tk.t === "ans") return ans;

    if (tk.t === "(") {
      const v = expr();
      const close = eat();
      if (!close || close.t !== ")") throw new CalcError("Falta cerrar un paréntesis");
      return v;
    }

    if (tk.t === "sqrt") {
      const v = unaryArg();
      if (v < 0) throw new CalcError("Raíz de un número negativo");
      return Math.sqrt(v);
    }

    if (tk.t === "func") {
      const v = unaryArg();
      const r = FUNCS[tk.v](v, deg);
      if (Number.isNaN(r)) throw new CalcError(`${tk.v}() fuera de rango`);
      if (!isFinite(r)) throw new CalcError(`${tk.v}() no está definida ahí`);
      return r;
    }

    if (tk.t === "op" && (tk.v === "-" || tk.v === "+")) {
      const v = primary();
      return tk.v === "-" ? -v : v;
    }

    throw new CalcError("Expresión incompleta");
  }

  /* Argumento de una función o de √: con paréntesis toma todo el bloque;
     sin paréntesis toma solo el siguiente factor (√9+1 = 4, no √10). */
  function unaryArg() {
    const tk = peek();
    if (tk && tk.t === "(") return primary();
    return postfix();
  }

  const value = expr();
  if (pos < tokens.length) throw new CalcError("Sobra algo en la expresión");
  return value;
}

function factorial(n) {
  if (n < 0 || Math.abs(n - Math.round(n)) > 1e-9) throw new CalcError("El factorial pide un entero ≥ 0");
  const k = Math.round(n);
  if (k > 170) throw new CalcError("Factorial demasiado grande");
  let r = 1;
  for (let i = 2; i <= k; i++) r *= i;
  return r;
}

/* ---------------- API ---------------- */

/**
 * Evalúa una expresión.
 * @param {string} src expresión tal como se ve en la pantalla
 * @param {{deg?:boolean, ans?:number}} [opts]
 * @returns {{ok:true, value:number, text:string} | {ok:false, error:string}}
 */
export function evaluate(src, opts = {}) {
  const text = String(src || "").trim();
  if (!text) return { ok: false, error: "" };
  try {
    const value = parse(tokenize(text), opts);
    if (Number.isNaN(value)) return { ok: false, error: "Resultado indefinido" };
    if (!isFinite(value)) return { ok: false, error: "Resultado infinito" };
    return { ok: true, value, text: formatNumber(value) };
  } catch (e) {
    return { ok: false, error: e instanceof CalcError ? e.message : "Expresión inválida" };
  }
}

/** Redondea a n cifras significativas para quitar la basura del punto flotante. */
export function roundSig(x, sig = 12) {
  if (x === 0 || !isFinite(x)) return x;
  const d = Math.ceil(Math.log10(Math.abs(x)));
  const power = sig - d;
  const mag = Math.pow(10, power);
  return Math.round(x * mag) / mag;
}

/** Número listo para mostrar: sin ruido binario y con notación científica solo si hace falta. */
export function formatNumber(x) {
  if (!isFinite(x)) return Number.isNaN(x) ? "Error" : (x > 0 ? "∞" : "−∞");
  const r = roundSig(x, 12);
  if (r === 0) return "0";
  const a = Math.abs(r);
  if (a >= 1e12 || a < 1e-9) {
    const [mant, exp] = r.toExponential(8).split("e");
    const clean = mant.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
    return `${clean}×10^${Number(exp)}`.replace(/-/g, "−");
  }
  let s = String(r);
  if (s.includes("e")) s = r.toFixed(10);
  if (s.includes(".")) s = s.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  return s.replace(/-/g, "−");
}

/** Vuelve a convertir un número mostrado (con − y ×10^) en texto insertable. */
export function toInputText(shown) {
  return String(shown).replace(/−/g, "-").replace(/×10\^(−?\d+)/g, (_, e) => "*10^(" + e.replace("−", "-") + ")");
}

/** Paréntesis que faltan por cerrar, para poder previsualizar mientras se escribe. */
export function autoClose(src) {
  let open = 0;
  for (const c of String(src)) {
    if (c === "(") open++;
    else if (c === ")") open--;
  }
  return src + ")".repeat(Math.max(0, open));
}
