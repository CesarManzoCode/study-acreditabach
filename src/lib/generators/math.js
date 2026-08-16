/* ============================================================
   Generadores de reactivos de MATEMÁTICAS (área 1)

   Cada generador recibe los ayudantes de rng.js y devuelve
   { q, options, correct, explanation } o null si los números que salieron
   no cumplen los criterios (opciones repetidas, resultados feos, división
   entre cero...). Quien llama reintenta con otra semilla, así que devolver
   null es la forma normal de rechazar un caso inválido.

   Reglas que respetan todos los generadores:
     · exactamente 3 opciones distintas entre sí (formato del examen real);
     · la respuesta correcta siempre está entre las opciones;
     · los distractores son errores plausibles, no números al azar;
     · rangos moderados, para que el problema se pueda resolver a mano.
   ============================================================ */

import { fmt, money, frac, gcd, lcm } from "../rng.js";

/* Potencias con superíndices para que se lea bien en texto plano. */
const SUP = { 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶" };
function pw(base, n) {
  if (n === 0) return "";
  if (n === 1) return base;
  return base + (SUP[n] || "^" + n);
}
/** Término con signo para encadenar polinomios: "+ 3x", "- 5". */
function term(coef, varPart) {
  if (coef === 0) return "";
  const sign = coef > 0 ? " + " : " - ";
  const a = Math.abs(coef);
  const num = a === 1 && varPart ? "" : String(a);
  return sign + num + varPart;
}
function poly(terms) {
  // terms: [[coef, varPart], ...] de mayor a menor grado
  let out = "";
  for (const [c, v] of terms) {
    if (c === 0) continue;
    if (!out) {
      const a = Math.abs(c) === 1 && v ? (c < 0 ? "-" : "") : String(c);
      out = a + v;
    } else {
      out += term(c, v);
    }
  }
  return out || "0";
}
function signed(n) {
  return n < 0 ? "(" + n + ")" : String(n);
}

/** "3/6 = 1/2" cuando hay algo que simplificar, y solo "5/12" cuando no. */
function simpl(num, den) {
  const s = frac(num, den);
  return s === `${num}/${den}` ? s : `${num}/${den} = ${s}`;
}

/* ============================================================
   1.1 Pensamiento estadístico
   ============================================================ */

const VARIABLE_POOL = [
  ["el número de hermanos de cada estudiante", 0],
  ["la cantidad de autos que cruzan un semáforo por hora", 0],
  ["el número de mensajes que envía una persona al día", 0],
  ["la cantidad de habitaciones de cada vivienda", 0],
  ["el número de goles anotados en cada partido", 0],
  ["la cantidad de mascotas por familia", 0],
  ["la estatura de cada jugador en centímetros", 1],
  ["el tiempo que tarda un corredor en llegar a la meta", 1],
  ["la temperatura registrada cada mediodía", 1],
  ["el peso de cada paquete en kilogramos", 1],
  ["la cantidad de litros de gasolina que carga un auto", 1],
  ["la longitud de una hoja en milímetros", 1],
  ["el color favorito de cada encuestado", 2],
  ["el tipo de sangre de cada donante", 2],
  ["el estado civil de cada persona", 2],
  ["la marca de teléfono que usa cada estudiante", 2],
  ["la carrera que quiere estudiar cada alumno", 2],
  ["el municipio de nacimiento de cada encuestado", 2]
];
const VARIABLE_TIPOS = ["Cuantitativa discreta", "Cuantitativa continua", "Cualitativa"];
const VARIABLE_RAZON = [
  "se cuenta en números enteros, no admite valores intermedios",
  "se mide y puede tomar cualquier valor dentro de un intervalo, incluidos decimales",
  "describe una categoría o cualidad, no una cantidad numérica"
];

export function tiposDeVariable(h) {
  const [texto, tipo] = h.pick(VARIABLE_POOL);
  const options = h.shuffle(VARIABLE_TIPOS);
  return {
    q: `En un estudio se registra ${texto}. ¿Qué tipo de variable es?`,
    options,
    correct: options.indexOf(VARIABLE_TIPOS[tipo]),
    explanation: `Es ${VARIABLE_TIPOS[tipo].toLowerCase()}: ${VARIABLE_RAZON[tipo]}.`
  };
}

const MUESTRA_POOL = [
  ["se revisa una pieza de cada {n} que salen de la línea de producción", 0],
  ["se encuesta a cada {n}º cliente que entra a la tienda", 0],
  ["de una lista ordenada de socios se elige uno de cada {n}", 0],
  ["se llama por teléfono a cada {n}º número de un directorio", 0],
  ["se divide a los empleados por antigüedad y se toma una parte de cada grupo", 1],
  ["se separa a la población por rango de edad y se encuesta proporcionalmente a cada rango", 1],
  ["se agrupa a los alumnos por grado escolar y se elige una muestra de cada grado", 1],
  ["se clasifica a los pacientes por sexo y se toma el mismo porcentaje de cada grupo", 1],
  ["se eligen al azar {n} colonias completas y se encuesta a todos sus habitantes", 2],
  ["se seleccionan al azar {n} escuelas y se aplica el examen a todos sus estudiantes", 2],
  ["se sortean {n} manzanas de la ciudad y se visita cada casa de esas manzanas", 2]
];
const MUESTRA_TIPOS = ["Muestreo sistemático", "Muestreo estratificado", "Muestreo por conglomerados"];
const MUESTRA_RAZON = [
  "se eligen elementos a intervalos fijos dentro de una lista",
  "se divide la población en grupos con una característica común y se toma una muestra de cada uno",
  "se eligen al azar grupos completos ya existentes y se estudia a todos sus integrantes"
];

export function tiposDeMuestra(h) {
  const [plantilla, tipo] = h.pick(MUESTRA_POOL);
  const texto = plantilla.replace("{n}", String(h.int(3, 25)));
  const options = h.shuffle(MUESTRA_TIPOS);
  return {
    q: `Para elegir una muestra, ${texto}. ¿De qué tipo de muestreo se trata?`,
    options,
    correct: options.indexOf(MUESTRA_TIPOS[tipo]),
    explanation: `Es ${MUESTRA_TIPOS[tipo].toLowerCase()}: ${MUESTRA_RAZON[tipo]}.`
  };
}

const DATASET_CONTEXTOS = [
  ["las calificaciones de {n} estudiantes", ""],
  ["las edades de {n} personas", " años"],
  ["los goles anotados en {n} partidos", ""],
  ["el número de clientes atendidos en {n} días", ""],
  ["las temperaturas registradas en {n} días", " °C"],
  ["los minutos de retraso de {n} camiones", " min"]
];

export function tendenciaCentral(h) {
  const modo = h.pick(["media", "mediana", "moda"]);
  const [ctx, unidad] = h.pick(DATASET_CONTEXTOS);
  let datos;

  if (modo === "media") {
    // Se construye para que la media sea exacta (entero).
    const n = h.pick([5, 6, 8]);
    const media = h.int(6, 30);
    const desv = [];
    let suma = 0;
    for (let i = 0; i < n - 1; i++) {
      const d = h.int(-4, 4);
      desv.push(d);
      suma += d;
    }
    desv.push(-suma);
    datos = desv.map((d) => media + d);
    if (datos.some((v) => v < 0)) return null;
    const opts = h.choice3(media, [media + h.int(1, 3), media - h.int(1, 3), media + h.int(4, 6)]);
    if (!opts) return null;
    const total = datos.reduce((a, b) => a + b, 0);
    return {
      q: `Se registran ${ctx.replace("{n}", String(n))}: ${datos.join(", ")}${unidad}. ¿Cuál es la media?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `La media es la suma entre el número de datos: ${total} ÷ ${n} = ${fmt(media)}.`
    };
  }

  if (modo === "mediana") {
    const n = h.pick([5, 7, 6]);
    datos = [];
    for (let i = 0; i < n; i++) datos.push(h.int(4, 40));
    const orden = datos.slice().sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    const mediana = n % 2 ? orden[mid] : (orden[mid - 1] + orden[mid]) / 2;
    if (!Number.isInteger(mediana * 2)) return null;
    const media = datos.reduce((a, b) => a + b, 0) / n;
    const opts = h.choice3(mediana, [orden[0], orden[n - 1], Math.round(media), mediana + h.int(1, 4)]);
    if (!opts) return null;
    return {
      q: `Se tienen ${ctx.replace("{n}", String(n))}: ${datos.join(", ")}${unidad}. ¿Cuál es la mediana?`,
      options: opts.options,
      correct: opts.correct,
      explanation:
        `Se ordenan los datos: ${orden.join(", ")}. ` +
        (n % 2
          ? `Con ${n} datos, la mediana es el valor central: ${fmt(mediana)}.`
          : `Con ${n} datos (par), se promedian los dos centrales: (${orden[mid - 1]} + ${orden[mid]}) ÷ 2 = ${fmt(mediana)}.`)
    };
  }

  // moda: se fuerza una moda única
  const n = 7;
  const moda = h.int(5, 25);
  datos = [moda, moda, moda];
  const usados = new Set([moda]);
  while (datos.length < n) {
    const v = h.int(3, 30);
    if (usados.has(v)) continue;
    usados.add(v);
    datos.push(v);
  }
  datos = h.shuffle(datos);
  const otros = datos.filter((v) => v !== moda);
  const opts = h.choice3(moda, [otros[0], otros[1], Math.max(...datos)]);
  if (!opts) return null;
  return {
    q: `Se registran ${ctx.replace("{n}", String(n))}: ${datos.join(", ")}${unidad}. ¿Cuál es la moda?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `La moda es el valor que más se repite: ${moda} aparece 3 veces y los demás solo una.`
  };
}

export function dispersion(h) {
  // Datos con media entera y varianza exacta.
  const n = h.pick([5, 8]);
  const media = h.int(8, 30);
  const cuadrado = h.pick([1, 4, 9, 16]); // para que la desviación estándar sea entera
  const d = Math.sqrt(cuadrado);
  let desv;
  if (n === 5) desv = h.shuffle([d, -d, d, -d, 0]);
  else desv = h.shuffle([d, -d, d, -d, d, -d, d, -d]);
  const datos = desv.map((x) => media + x);
  if (datos.some((v) => v < 0)) return null;
  const sumaCuad = desv.reduce((a, b) => a + b * b, 0);
  const varianza = sumaCuad / n;
  const desvEst = Math.sqrt(varianza);
  const pedirDesv = h.chance(0.5) && Number.isInteger(desvEst);

  if (pedirDesv) {
    const opts = h.choice3(desvEst, [varianza, desvEst + 1, Math.round(desvEst * 2), desvEst + 2]);
    if (!opts) return null;
    return {
      q: `Los datos ${datos.join(", ")} tienen media ${media}. ¿Cuál es su desviación estándar?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `La suma de las diferencias al cuadrado es ${fmt(sumaCuad)}; entre ${n} datos la varianza es ${fmt(varianza)}, y la desviación estándar es √${fmt(varianza)} = ${fmt(desvEst)}.`
    };
  }
  const opts = h.choice3(varianza, [desvEst, sumaCuad, varianza + h.int(1, 4), varianza * 2]);
  if (!opts) return null;
  return {
    q: `Los datos ${datos.join(", ")} tienen media ${media}. ¿Cuál es su varianza?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Se resta la media a cada dato, se elevan al cuadrado y se suman: ${fmt(sumaCuad)}. Dividido entre ${n} datos da una varianza de ${fmt(varianza)}.`
  };
}

/* ============================================================
   1.2 Pensamiento probabilístico
   ============================================================ */

function factorial(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
function nPr(n, r) {
  let x = 1;
  for (let i = 0; i < r; i++) x *= n - i;
  return x;
}
function nCr(n, r) {
  return nPr(n, r) / factorial(r);
}

const CONTEO_ORDEN = [
  ["En una carrera con {n} participantes, ¿de cuántas formas distintas se pueden repartir los lugares 1º, 2º y 3º?", 3],
  ["Un club de {n} socios debe elegir presidente, secretario y tesorero (cargos distintos). ¿De cuántas formas puede hacerlo?", 3],
  ["Con {n} libros diferentes en un estante, ¿de cuántas maneras se pueden acomodar los primeros {r} lugares?", 0]
];
const CONTEO_SINORDEN = [
  ["De un grupo de {n} amigos se eligen {r} para formar un equipo. ¿Cuántos equipos distintos se pueden formar?", 0],
  ["Una pizzería ofrece {n} ingredientes y permite elegir {r} distintos. ¿Cuántas combinaciones de ingredientes hay?", 0],
  ["De {n} jugadores se seleccionan {r} para la fotografía, sin importar el orden. ¿De cuántas formas se puede hacer?", 0]
];

export function tecnicasConteo(h) {
  const importaOrden = h.chance(0.5);
  const n = h.int(5, 9);
  if (importaOrden) {
    const [plantilla, rFijo] = h.pick(CONTEO_ORDEN);
    const r = rFijo || h.int(2, 3);
    if (r >= n) return null;
    const ans = nPr(n, r);
    const opts = h.choice3(ans, [nCr(n, r), factorial(n) / factorial(r), Math.pow(n, r), ans - n]);
    if (!opts) return null;
    return {
      q: plantilla.replace("{n}", String(n)).replace("{r}", String(r)),
      options: opts.options,
      correct: opts.correct,
      explanation: `El orden sí importa, así que es una permutación: ${n}P${r} = ${n}!/(${n}-${r})! = ${fmt(ans)}.`
    };
  }
  const [plantilla] = h.pick(CONTEO_SINORDEN);
  const r = h.int(2, 3);
  if (r >= n) return null;
  const ans = nCr(n, r);
  const opts = h.choice3(ans, [nPr(n, r), ans * 2, n * r, ans + n]);
  if (!opts) return null;
  return {
    q: plantilla.replace("{n}", String(n)).replace("{r}", String(r)),
    options: opts.options,
    correct: opts.correct,
    explanation: `El orden no importa, así que es una combinación: ${n}C${r} = ${n}!/(${r}!·(${n}-${r})!) = ${fmt(ans)}.`
  };
}

const COLORES = [
  ["rojas", "azules", "verdes"],
  ["blancas", "negras", "amarillas"],
  ["rojas", "amarillas", "azules"]
];

export function probabilidadSimple(h) {
  const modo = h.pick(["urna", "dado", "urnaCompuesta"]);

  if (modo === "dado") {
    const evento = h.pick([
      ["un número par", 3],
      ["un número mayor que 4", 2],
      ["un número menor que 3", 2],
      ["un múltiplo de 3", 2],
      ["un número primo", 3]
    ]);
    const favorables = evento[1];
    const ans = frac(favorables, 6);
    const opts = h.choice3(ans, [frac(6, favorables), frac(favorables, 12), frac(favorables + 1, 6), frac(6 - favorables, 6)]);
    if (!opts) return null;
    return {
      q: `Se lanza un dado común de seis caras. ¿Cuál es la probabilidad de obtener ${evento[0]}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Hay ${favorables} casos favorables de 6 posibles: ${simpl(favorables, 6)}.`
    };
  }

  const [c1, c2, c3] = h.pick(COLORES);
  const a = h.int(2, 8);
  const b = h.int(2, 8);
  const c = h.int(2, 8);
  const total = a + b + c;

  if (modo === "urna") {
    const ans = frac(a, total);
    const opts = h.choice3(ans, [frac(b, total), frac(a, total - a), frac(a + b, total), frac(total - a, total)]);
    if (!opts) return null;
    return {
      q: `Una bolsa tiene ${a} canicas ${c1}, ${b} ${c2} y ${c} ${c3}. Se saca una al azar. ¿Cuál es la probabilidad de que sea ${c1}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Casos favorables entre casos posibles: ${simpl(a, total)}.`
    };
  }

  const fav = a + b;
  const ans = frac(fav, total);
  const opts = h.choice3(ans, [frac(a, total), frac(b, total), frac(c, total), frac(fav, total - c)]);
  if (!opts) return null;
  return {
    q: `Una bolsa tiene ${a} canicas ${c1}, ${b} ${c2} y ${c} ${c3}. Se saca una al azar. ¿Cuál es la probabilidad de que NO sea ${c3}?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Las que no son ${c3} son ${a} + ${b} = ${fav}, de ${total} en total: ${simpl(fav, total)}.`
  };
}

export function probabilidadCondicional(h) {
  const modo = h.pick(["tabla", "sinReemplazo"]);

  if (modo === "sinReemplazo") {
    const a = h.int(3, 7);
    const b = h.int(3, 7);
    const total = a + b;
    // P(2ª roja | 1ª roja) = (a-1)/(total-1)
    const ans = frac(a - 1, total - 1);
    const opts = h.choice3(ans, [frac(a, total), frac(a - 1, total), frac(a, total - 1), frac(b, total - 1)]);
    if (!opts) return null;
    return {
      q: `Una caja tiene ${a} plumas rojas y ${b} azules. Se saca una pluma roja y NO se regresa. ¿Cuál es la probabilidad de que la siguiente también sea roja?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Al no regresarla quedan ${a - 1} rojas de ${total - 1} plumas: ${simpl(a - 1, total - 1)}.`
    };
  }

  const hm = h.int(10, 30);
  const hf = h.int(10, 30);
  const mm = h.int(10, 30);
  const mf = h.int(10, 30);
  const totalH = hm + hf;
  const ans = frac(hm, totalH);
  const opts = h.choice3(ans, [
    frac(hm, hm + mm),
    frac(hm, hm + hf + mm + mf),
    frac(hf, totalH),
    frac(mm, mm + mf)
  ]);
  if (!opts) return null;
  return {
    q:
      `En un grupo, ${hm} hombres y ${mm} mujeres usan transporte público; ${hf} hombres y ${mf} mujeres van en auto. ` +
      `Si se elige un hombre al azar, ¿cuál es la probabilidad de que use transporte público?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `La condición reduce el espacio a los hombres: ${totalH} en total, de los cuales ${hm} usan transporte público: ${simpl(hm, totalH)}.`
  };
}

/* ============================================================
   1.3 Pensamiento algebraico
   ============================================================ */

/* Ojo con la redacción: "el triple de un número disminuido en 5" se puede leer
   como 3x − 5 o como 3(x − 5), y el distractor era justamente la otra lectura.
   Un reactivo cuya respuesta depende de cómo se lea la frase no mide álgebra,
   mide adivinanza. Todas las frases dicen ahora el orden de las operaciones. */
const FRASES = [
  { t: (a, b) => `el triple de un número y, al resultado, se le restan ${b}`, e: (a, b) => `3x - ${b}`, d: (a, b) => [`3(x - ${b})`, `x/3 - ${b}`, `3x + ${b}`] },
  { t: (a, b) => `el doble de la suma de un número con ${b}`, e: (a, b) => `2(x + ${b})`, d: (a, b) => [`2x + ${b}`, `2x - ${b}`, `x + 2(${b})`] },
  { t: (a, b) => `${a} veces un número y, al resultado, se le suman ${b}`, e: (a, b) => `${a}x + ${b}`, d: (a, b) => [`${a}(x + ${b})`, `${a}x - ${b}`, `x + ${a * b}`] },
  { t: (a, b) => `un número aumentado en ${b} y todo eso multiplicado por ${a}`, e: (a, b) => `${a}(x + ${b})`, d: (a, b) => [`${a}x + ${b}`, `${a}x - ${b}`, `x + ${a * b}`] },
  { t: (a, b) => `la mitad de un número y, al resultado, se le suman ${b}`, e: (a, b) => `x/2 + ${b}`, d: (a, b) => [`2x + ${b}`, `(x + ${b})/2`, `x/2 - ${b}`] },
  { t: (a, b) => `el cuadrado de un número y, al resultado, se le restan ${b}`, e: (a, b) => `x² - ${b}`, d: (a, b) => [`(x - ${b})²`, `2x - ${b}`, `x² + ${b}`] },
  { t: (a, b) => `${b} menos el doble de un número`, e: (a, b) => `${b} - 2x`, d: (a, b) => [`2x - ${b}`, `2(${b} - x)`, `${b} + 2x`] },
  { t: (a, b) => `la suma de un número con su consecutivo`, e: () => `x + (x + 1)`, d: () => [`x + 1`, `x(x + 1)`, `2x + 2`] },
  { t: (a, b) => `el ${a}% de un número`, e: (a) => `${a}x/100`, d: (a) => [`${a}x`, `100x/${a}`, `x + ${a}`] }
];

export function expresionesAlgebraicas(h) {
  const f = h.pick(FRASES);
  const a = h.pick([3, 4, 5, 6, 7]);
  const b = h.int(2, 12);
  const ans = f.e(a, b);
  const opts = h.choice3(ans, h.shuffle(f.d(a, b)));
  if (!opts) return null;
  return {
    q: `Si x representa un número desconocido, ¿qué expresión algebraica corresponde a "${f.t(a, b)}"?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `"${f.t(a, b)}" se traduce directamente como ${ans}.`
  };
}

export function factorizacion(h) {
  const tipo = h.pick(["diferencia", "comun", "trinomio"]);

  if (tipo === "diferencia") {
    const a = h.int(1, 6);
    const b = h.int(2, 9);
    const expr = poly([[a * a, pw("x", 2)], [-(b * b), ""]]);
    const ans = a === 1 ? `(x + ${b})(x - ${b})` : `(${a}x + ${b})(${a}x - ${b})`;
    const opts = h.choice3(ans, [
      a === 1 ? `(x + ${b})²` : `(${a}x + ${b})²`,
      a === 1 ? `(x - ${b})²` : `(${a}x - ${b})²`,
      a === 1 ? `(x + ${b * b})(x - 1)` : `(${a}x + ${b * b})(x - 1)`
    ]);
    if (!opts) return null;
    return {
      q: `Factoriza la expresión ${expr}.`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Es una diferencia de cuadrados: ${expr} = (${a === 1 ? "" : a}x)² - ${b}², y se factoriza como ${ans}.`
    };
  }

  if (tipo === "comun") {
    const f = h.int(2, 7);
    const p = h.int(2, 6);
    const q = h.int(2, 6);
    if (p === q) return null;
    const expr = poly([[f * p, pw("x", 2)], [f * q, "x"]]);
    const ans = `${f}x(${p}x + ${q})`;
    const opts = h.choice3(ans, [`${f}(${p}x² + ${q}x)`, `x(${f * p}x + ${f * q})`, `${f}x(${p}x + ${q * f})`]);
    if (!opts) return null;
    return {
      q: `Factoriza por completo la expresión ${expr}.`,
      options: opts.options,
      correct: opts.correct,
      explanation: `El factor común de ${f * p}x² y ${f * q}x es ${f}x. Al sacarlo queda ${ans}.`
    };
  }

  const r1 = h.int(1, 8);
  const r2 = h.int(1, 8);
  if (r1 === r2) return null;
  const s1 = h.chance(0.5) ? 1 : -1;
  const s2 = h.chance(0.5) ? 1 : -1;
  const p = s1 * r1;
  const q = s2 * r2;
  const b = p + q;
  const c = p * q;
  if (b === 0) return null;
  const expr = poly([[1, pw("x", 2)], [b, "x"], [c, ""]]);
  const fac = (v) => (v >= 0 ? `(x + ${v})` : `(x - ${-v})`);
  const ans = fac(p) + fac(q);
  const opts = h.choice3(ans, [fac(-p) + fac(-q), fac(p) + fac(-q), fac(b) + fac(c)]);
  if (!opts) return null;
  return {
    q: `Factoriza el trinomio ${expr}.`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Se buscan dos números que multiplicados den ${c} y sumados den ${b}: ${p} y ${q}. Por eso ${expr} = ${ans}.`
  };
}

/* Guía 1.3.3: el tema se llama "Producto notable de binomios", pero la
   orientación dice "Cálculo de los valores de OPTIMIZACIÓN de funciones
   polinomiales de segundo grado". Es el mismo procedimiento visto de otro lado:
   se completa el cuadrado con el binomio al cuadrado y el resultado es el valor
   máximo o mínimo. El generador anterior solo desarrollaba binomios y nunca
   llegaba a la optimización, que es lo que se evalúa.

   Es la vía algebraica; la vía con derivada es el tema 1.6.6. */
export function productosNotables(h) {
  const tipo = h.pick(["optimiza", "optimiza", "completaCuadrado", "binomioCuadrado", "conjugados"]);
  const a = h.int(2, 9);

  if (tipo === "optimiza") {
    const h0 = h.int(2, 9);          // vértice en x = h0
    const k = h.signedInt(1, 12);    // valor óptimo
    const haciaArriba = h.chance(0.65);
    const s = haciaArriba ? 1 : -1;
    /* f(x) = s(x − h0)² + k  →  desarrollada */
    const b = -2 * h0 * s;
    const c = h0 * h0 * s + k;
    const expr = poly([[s, pw("x", 2)], [b, "x"], [c, ""]]);
    const cual = haciaArriba ? "mínimo" : "máximo";
    const opts = h.choice3(`${cual === "mínimo" ? "Mínimo" : "Máximo"} de ${fmt(k)} en x = ${fmt(h0)}`, [
      `${cual === "mínimo" ? "Mínimo" : "Máximo"} de ${fmt(h0)} en x = ${fmt(k)}`,
      `${cual === "mínimo" ? "Máximo" : "Mínimo"} de ${fmt(k)} en x = ${fmt(h0)}`,
      `${cual === "mínimo" ? "Mínimo" : "Máximo"} de ${fmt(c)} en x = 0`
    ]);
    if (!opts) return null;
    return {
      q: `¿Cuál es el valor de optimización de la función f(x) = ${expr} y en qué x ocurre?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Se completa el cuadrado: f(x) = ${s < 0 ? "−" : ""}(x − ${fmt(h0)})² ${k >= 0 ? "+" : "−"} ${Math.abs(k)}. Como el coeficiente de x² es ${haciaArriba ? "positivo" : "negativo"}, la parábola abre hacia ${haciaArriba ? "arriba y tiene un MÍNIMO" : "abajo y tiene un MÁXIMO"}: vale ${fmt(k)} y ocurre en x = ${fmt(h0)}.`
    };
  }

  if (tipo === "completaCuadrado") {
    const h0 = h.int(2, 8);
    const k = h.signedInt(1, 10);
    const b = -2 * h0;
    const c = h0 * h0 + k;
    const expr = poly([[1, pw("x", 2)], [b, "x"], [c, ""]]);
    const ans = `(x − ${fmt(h0)})² ${k >= 0 ? "+" : "−"} ${Math.abs(k)}`;
    const opts = h.choice3(ans, [
      `(x + ${fmt(h0)})² ${k >= 0 ? "+" : "−"} ${Math.abs(k)}`,
      `(x − ${fmt(h0)})² ${k >= 0 ? "−" : "+"} ${Math.abs(k)}`,
      `(x − ${fmt(c)})² ${k >= 0 ? "+" : "−"} ${Math.abs(h0)}`
    ]);
    if (!opts) return null;
    return {
      q: `¿Cuál es la forma de cuadrado completado de ${expr}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `La mitad del coeficiente de x es ${fmt(b)} ÷ 2 = ${fmt(-h0)}, y su cuadrado es ${fmt(h0 * h0)}. Entonces ${expr} = (x − ${fmt(h0)})² ${k >= 0 ? "+" : "−"} ${Math.abs(k)}. De ahí se lee el valor óptimo: ${fmt(k)} en x = ${fmt(h0)}.`
    };
  }

  if (tipo === "binomioCuadrado") {
    const neg = h.chance(0.5);
    const s = neg ? -1 : 1;
    const expr = neg ? `(x - ${a})²` : `(x + ${a})²`;
    const ans = poly([[1, pw("x", 2)], [2 * a * s, "x"], [a * a, ""]]);
    const opts = h.choice3(ans, [
      poly([[1, pw("x", 2)], [a * a, ""]]),
      poly([[1, pw("x", 2)], [2 * a * s, "x"], [-(a * a), ""]]),
      poly([[1, pw("x", 2)], [a * s, "x"], [a * a, ""]])
    ]);
    if (!opts) return null;
    return {
      q: `Desarrolla el producto notable ${expr}.`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Binomio al cuadrado: el primero al cuadrado, más el doble producto, más el segundo al cuadrado → x² ${s > 0 ? "+" : "-"} ${2 * a}x + ${a * a}.`
    };
  }

  if (tipo === "conjugados") {
    const expr = `(x + ${a})(x - ${a})`;
    const ans = poly([[1, pw("x", 2)], [-(a * a), ""]]);
    const opts = h.choice3(ans, [
      poly([[1, pw("x", 2)], [a * a, ""]]),
      poly([[1, pw("x", 2)], [2 * a, "x"], [-(a * a), ""]]),
      poly([[1, pw("x", 2)], [-2 * a, "x"], [a * a, ""]])
    ]);
    if (!opts) return null;
    return {
      q: `Desarrolla el producto ${expr}.`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Binomios conjugados: el resultado es la diferencia de cuadrados x² - ${a}² = ${ans}.`
    };
  }

  const b = h.int(2, 9);
  if (a === b) return null;
  const expr = `(x + ${a})(x + ${b})`;
  const ans = poly([[1, pw("x", 2)], [a + b, "x"], [a * b, ""]]);
  const opts = h.choice3(ans, [
    poly([[1, pw("x", 2)], [a * b, "x"], [a + b, ""]]),
    poly([[1, pw("x", 2)], [a + b, "x"], [a + b, ""]]),
    poly([[1, pw("x", 2)], [a * b, ""]])
  ]);
  if (!opts) return null;
  return {
    q: `Desarrolla el producto ${expr}.`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Binomios con término común: x² + (${a} + ${b})x + (${a}·${b}) = ${ans}.`
  };
}

const LINEAL_CONTEXTOS = [
  "Resuelve la ecuación",
  "¿Cuál es el valor de x en la ecuación",
  "Encuentra el valor de x que satisface"
];

export function ecuacionLineal(h) {
  const x = h.int(-9, 12);
  const a = h.int(2, 9);
  let c = h.int(1, 8);
  if (c === a) c = a + 1;
  const b = h.int(-15, 15);
  const d = a * x + b - c * x;
  const izq = poly([[a, "x"], [b, ""]]);
  const der = poly([[c, "x"], [d, ""]]);
  const opts = h.choice3(x, [x + h.int(1, 4), x - h.int(1, 4), -x, Math.round((b + d) / a)]);
  if (!opts) return null;
  const ctx = h.pick(LINEAL_CONTEXTOS);
  return {
    q: `${ctx} ${izq} = ${der}${ctx.startsWith("¿") ? "?" : "."}`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Se agrupan las x de un lado: ${a}x - ${c}x = ${d} - ${b} → ${a - c}x = ${d - b} → x = ${x}.`
  };
}

export function ecuacionCuadratica(h) {
  const r1 = h.int(-8, 8);
  const r2 = h.int(-8, 8);
  if (r1 === r2) return null;
  const b = -(r1 + r2);
  const c = r1 * r2;
  if (c === 0) return null;
  const expr = poly([[1, pw("x", 2)], [b, "x"], [c, ""]]) + " = 0";
  const lo = Math.min(r1, r2);
  const hi = Math.max(r1, r2);
  const par = (p, q) => `x = ${Math.min(p, q)} y x = ${Math.max(p, q)}`;
  const ans = par(lo, hi);
  /* Los distractores se comparan como CONJUNTO: con raíces simétricas
     (x² - 49 = 0) invertir los signos daría otra vez la respuesta correcta. */
  const candidatos = [par(-lo, -hi), par(lo, -hi), par(-lo, hi), par(b, c), par(lo + 1, hi + 1)]
    .filter((p) => p !== ans);
  const opts = h.choice3(ans, candidatos);
  if (!opts) return null;
  return {
    q: `¿Cuáles son las soluciones de la ecuación ${expr}?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Se factoriza buscando dos números que sumen ${b} y multipliquen ${c}: ${expr.replace(" = 0", "")} = (x ${-r1 >= 0 ? "+ " + -r1 : "- " + r1})(x ${-r2 >= 0 ? "+ " + -r2 : "- " + r2}), así que ${ans}.`
  };
}

export function sistemaEcuaciones(h) {
  const x = h.int(-6, 9);
  const y = h.int(-6, 9);
  const a = h.int(1, 5);
  const b = h.int(1, 5);
  const c = h.int(1, 5);
  const d = h.int(1, 5);
  const det = a * d - b * c;
  if (det === 0) return null;
  const e = a * x + b * y;
  const f = c * x + d * y;
  const pedirX = h.chance(0.5);
  const ans = pedirX ? x : y;
  const opts = h.choice3(ans, [pedirX ? y : x, ans + h.int(1, 4), ans - h.int(1, 4), -ans]);
  if (!opts) return null;
  return {
    q: `Resuelve el sistema  ${a}x + ${b}y = ${e}  y  ${c}x + ${d}y = ${f}. ¿Cuánto vale ${pedirX ? "x" : "y"}?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Por eliminación o sustitución se llega a x = ${x} y y = ${y}; comprobando en la primera ecuación: ${a}(${signed(x)}) + ${b}(${signed(y)}) = ${e}. Por lo tanto ${pedirX ? "x" : "y"} = ${ans}.`
  };
}

export function interesSimple(h) {
  const capital = h.pick([5000, 8000, 10000, 12000, 15000, 20000, 25000]);
  const tasa = h.pick([4, 5, 6, 8, 10, 12]);
  const anios = h.int(2, 5);
  const interes = (capital * tasa * anios) / 100;
  const pedirMonto = h.chance(0.4);
  const ans = pedirMonto ? capital + interes : interes;
  const opts = h.choice3(money(ans), [
    money(pedirMonto ? interes : capital + interes),
    money((capital * tasa) / 100),
    money(capital * Math.pow(1 + tasa / 100, anios) - (pedirMonto ? 0 : capital)),
    money(ans + capital * 0.1)
  ]);
  if (!opts) return null;
  return {
    q: `Se invierten ${money(capital)} a una tasa de interés simple del ${tasa}% anual durante ${anios} años. ¿${pedirMonto ? "Cuál es el monto final" : "Cuánto se gana de interés"}?`,
    options: opts.options,
    correct: opts.correct,
    explanation:
      `Interés simple: I = C·i·t = ${money(capital)} × ${tasa / 100} × ${anios} = ${money(interes)}.` +
      (pedirMonto ? ` El monto final es C + I = ${money(capital)} + ${money(interes)} = ${money(ans)}.` : "")
  };
}

export function interesCompuesto(h) {
  const capital = h.pick([5000, 10000, 20000, 8000, 15000]);
  const tasa = h.pick([5, 10, 20, 8]);
  const anios = h.int(2, 3);
  const monto = capital * Math.pow(1 + tasa / 100, anios);
  const simple = capital + (capital * tasa * anios) / 100;
  const r2 = Math.round(monto * 100) / 100;
  const opts = h.choice3(money(r2), [money(simple), money(capital * (1 + (tasa * anios) / 100) + 100), money(capital * Math.pow(1 + tasa / 100, anios + 1))]);
  if (!opts) return null;
  return {
    q: `Se depositan ${money(capital)} a una tasa de interés compuesto del ${tasa}% anual durante ${anios} años. ¿Cuál es el monto acumulado?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `M = C(1 + i)^t = ${money(capital)} × (1 + ${tasa / 100})^${anios} = ${money(r2)}. Con interés simple habrían sido solo ${money(simple)}: la diferencia es el interés que generan los intereses.`
  };
}

/* ============================================================
   1.4 Pensamiento aritmético
   ============================================================ */

const MCM_CONTEXTOS = [
  "Dos camiones salen de la misma terminal: uno cada {a} minutos y otro cada {b} minutos. Si salen juntos a las 8:00, ¿dentro de cuántos minutos vuelven a salir al mismo tiempo?",
  "Dos focos parpadean, uno cada {a} segundos y otro cada {b} segundos. Si parpadean juntos ahora, ¿en cuántos segundos volverán a coincidir?",
  "¿Cuál es el mínimo común múltiplo de {a} y {b}?"
];

export function mcm(h) {
  const a = h.int(4, 18);
  const b = h.int(4, 18);
  if (a === b) return null;
  const ans = lcm(a, b);
  const opts = h.choice3(ans, [a * b, gcd(a, b), ans + h.int(1, 6), Math.abs(a - b)]);
  if (!opts) return null;
  const ctx = h.pick(MCM_CONTEXTOS).replace("{a}", String(a)).replace("{b}", String(b));
  return {
    q: ctx,
    options: opts.options,
    correct: opts.correct,
    explanation: `Se busca el mínimo común múltiplo: mcm(${a}, ${b}) = ${ans}${a * b !== ans ? ` (no ${a * b}, porque comparten el factor ${gcd(a, b)})` : ""}.`
  };
}

const MCD_CONTEXTOS = [
  "Se quieren cortar dos listones de {a} cm y {b} cm en trozos iguales lo más grandes posible, sin desperdicio. ¿De cuántos centímetros debe ser cada trozo?",
  "Se tienen {a} lápices y {b} plumas para repartir en bolsas iguales sin que sobre nada. ¿Cuál es el mayor número de bolsas posible?",
  "¿Cuál es el máximo común divisor de {a} y {b}?"
];

export function mcd(h) {
  const g = h.int(2, 12);
  const p = h.int(2, 9);
  const q = h.int(2, 9);
  if (gcd(p, q) !== 1) return null;
  const a = g * p;
  const b = g * q;
  const ans = gcd(a, b);
  if (ans !== g) return null;
  const opts = h.choice3(ans, [lcm(a, b), Math.abs(a - b), ans * 2, Math.min(a, b)]);
  if (!opts) return null;
  const ctx = h.pick(MCD_CONTEXTOS).replace("{a}", String(a)).replace("{b}", String(b));
  return {
    q: ctx,
    options: opts.options,
    correct: opts.correct,
    explanation: `Se busca el máximo común divisor: ${a} = ${g}×${p} y ${b} = ${g}×${q}, así que mcd(${a}, ${b}) = ${ans}.`
  };
}

/* Guía 1.4.3: "Identificación de la razón aritmética o geométrica correspondiente
   a una SUCESIÓN numérica".

   El generador anterior producía reparto en razón dada —regla de tres—, que es
   el tema 1.4.4. Ni un solo problema de los que generaba correspondía a lo que
   este tema evalúa. Ahora genera sucesiones y pide su razón. */
export function razones(h) {
  const geometrica = h.chance(0.45);
  const largo = 4;

  if (geometrica) {
    const r = h.pick([2, 3, 4, 5]);
    const a0 = h.pick([1, 2, 3, 5, 6]);
    const decreciente = h.chance(0.25);
    const terminos = [];
    if (decreciente) {
      /* Se construye al revés para que todos los términos sean enteros. */
      let v = a0 * Math.pow(r, largo - 1);
      for (let i = 0; i < largo; i++) { terminos.push(v); v = v / r; }
    } else {
      let v = a0;
      for (let i = 0; i < largo; i++) { terminos.push(v); v = v * r; }
    }
    if (terminos.some((t) => !Number.isInteger(t) || t > 100000)) return null;
    const razonMostrada = decreciente ? `1/${r}` : String(r);
    const opts = h.choice3(`Geométrica, de razón ${razonMostrada}`, [
      `Aritmética, de razón ${fmt(terminos[1] - terminos[0])}`,
      `Geométrica, de razón ${r + 1}`,
      `Aritmética, de razón ${r}`
    ]);
    if (!opts) return null;
    return {
      q: `¿Cuál es la razón de la sucesión ${terminos.join(", ")}…?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Cada término se obtiene MULTIPLICANDO por el mismo número: ${fmt(terminos[1])} ÷ ${fmt(terminos[0])} = ${razonMostrada} y ${fmt(terminos[2])} ÷ ${fmt(terminos[1])} = ${razonMostrada}. Como se multiplica, la sucesión es geométrica y su razón es ${razonMostrada}. No es aritmética porque la diferencia entre términos no se mantiene constante.`
    };
  }

  const d = h.signedInt(2, 9);
  const a0 = h.int(3, 40);
  const terminos = [];
  let v = a0;
  for (let i = 0; i < largo; i++) { terminos.push(v); v = v + d; }
  if (terminos.some((t) => t < 0)) return null;
  const opts = h.choice3(`Aritmética, de razón ${fmt(d)}`, [
    `Geométrica, de razón ${fmt(d)}`,
    `Aritmética, de razón ${fmt(a0)}`,
    `Aritmética, de razón ${fmt(-d)}`
  ]);
  if (!opts) return null;
  return {
    q: `¿Cuál es la razón de la sucesión ${terminos.join(", ")}…?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Cada término se obtiene SUMANDO siempre la misma cantidad: ${fmt(terminos[1])} − ${fmt(terminos[0])} = ${fmt(d)} y ${fmt(terminos[2])} − ${fmt(terminos[1])} = ${fmt(d)}. Como se suma, la sucesión es aritmética y su razón es ${fmt(d)}.`
  };
}

export function proporcionalidad(h) {
  const directa = h.chance(0.5);

  if (directa) {
    const unidad = h.int(3, 20);
    const n1 = h.int(2, 9);
    const n2 = h.int(3, 15);
    if (n1 === n2) return null;
    const p1 = unidad * n1;
    const ans = unidad * n2;
    const ctx = h.pick([
      `Si ${n1} kilogramos de manzana cuestan ${money(p1)}, ¿cuánto cuestan ${n2} kilogramos al mismo precio?`,
      `Si ${n1} cuadernos cuestan ${money(p1)}, ¿cuánto costarán ${n2} cuadernos iguales?`,
      `Un auto recorre ${p1} km con ${n1} litros de gasolina. ¿Cuántos kilómetros recorre con ${n2} litros?`
    ]);
    const esDinero = !ctx.includes("km");
    const val = (x) => (esDinero ? money(x) : fmt(x) + " km");
    const opts = h.choice3(val(ans), [val(p1 * n2), val(p1 + n2), val(Math.round((p1 * n1) / n2))]);
    if (!opts) return null;
    return {
      q: ctx,
      options: opts.options,
      correct: opts.correct,
      explanation: `Es proporcionalidad directa: el valor unitario es ${p1} ÷ ${n1} = ${unidad}. Entonces ${n2} × ${unidad} = ${fmt(ans)}.`
    };
  }

  const trabajo = h.pick([24, 36, 48, 60, 72, 120]);
  const a = h.pick([2, 3, 4, 6]);
  const b = h.pick([2, 3, 4, 6, 8]);
  if (a === b || trabajo % a || trabajo % b) return null;
  const dias1 = trabajo / a;
  const ans = trabajo / b;
  const opts = h.choice3(ans, [dias1, Math.round((dias1 * b) / a), dias1 + (b - a), Math.round(dias1 / 2)]);
  if (!opts) return null;
  return {
    q: `${a} trabajadores terminan una obra en ${dias1} días. Trabajando al mismo ritmo, ¿en cuántos días la terminarían ${b} trabajadores?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Es proporcionalidad inversa: más trabajadores, menos días. El trabajo total es ${a} × ${dias1} = ${trabajo} jornadas, así que ${trabajo} ÷ ${b} = ${fmt(ans)} días.`
  };
}

export function porcentajes(h) {
  const modo = h.pick(["directo", "aumento", "descuento", "inverso"]);
  const p = h.pick([5, 10, 12, 15, 20, 25, 30, 40]);
  const base = h.pick([120, 250, 340, 480, 600, 850, 1200, 1500, 2400]);

  if (modo === "directo") {
    const ans = (base * p) / 100;
    const opts = h.choice3(ans, [base - ans, base + ans, (base * p) / 10, ans / 2]);
    if (!opts) return null;
    return {
      q: `¿Cuánto es el ${p}% de ${fmt(base)}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `El ${p}% equivale a multiplicar por ${p / 100}: ${fmt(base)} × ${p / 100} = ${fmt(ans)}.`
    };
  }

  if (modo === "aumento") {
    const ans = base * (1 + p / 100);
    const opts = h.choice3(money(ans), [money((base * p) / 100), money(base * (1 - p / 100)), money(base + p)]);
    if (!opts) return null;
    return {
      q: `Un producto cuesta ${money(base)} y su precio sube ${p}%. ¿Cuál es el nuevo precio?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Subir ${p}% es multiplicar por ${1 + p / 100}: ${money(base)} × ${1 + p / 100} = ${money(ans)}.`
    };
  }

  if (modo === "descuento") {
    const ans = base * (1 - p / 100);
    const opts = h.choice3(money(ans), [money((base * p) / 100), money(base * (1 + p / 100)), money(base - p)]);
    if (!opts) return null;
    return {
      q: `Una chamarra de ${money(base)} tiene ${p}% de descuento. ¿Cuánto se paga por ella?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Pagar con ${p}% de descuento es pagar el ${100 - p}%: ${money(base)} × ${(100 - p) / 100} = ${money(ans)}.`
    };
  }

  // inverso: se conoce el precio ya rebajado
  const pagado = base * (1 - p / 100);
  if (!Number.isInteger(pagado)) return null;
  const opts = h.choice3(money(base), [money(pagado * (1 + p / 100)), money(pagado + (pagado * p) / 100 + 10), money(pagado + p)]);
  if (!opts) return null;
  return {
    q: `Después de un descuento del ${p}%, un artículo se pagó en ${money(pagado)}. ¿Cuál era su precio original?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Lo pagado es el ${100 - p}% del original: ${money(pagado)} ÷ ${(100 - p) / 100} = ${money(base)}. Ojo: sumarle el ${p}% al precio rebajado NO regresa al original.`
  };
}

/* ============================================================
   1.5 Pensamiento geométrico
   ============================================================ */

/* Guía 1.5.1: "Cálculo del área de triángulos y trapecios". Antes generaba
   además rectángulos, cuadrados y círculos, que la orientación no evalúa: tres
   de cada cinco problemas caían fuera del examen. */
export function areaFiguras(h) {
  const figura = h.pick(["triangulo", "trapecio", "despeje"]);

  /* Problema inverso: se da el área y falta una medida. El examen lo pregunta
     en los dos sentidos, y despejar es donde se equivoca la mayoría. */
  if (figura === "despeje") {
    const B = h.int(8, 20);
    const bMenor = h.int(3, B - 2);
    const altura = h.pick([4, 6, 8, 10, 12]);
    const area = ((B + bMenor) / 2) * altura;
    if (!Number.isInteger(area)) return null;
    const opts = h.choice3(`${fmt(B)} cm`, [`${fmt(bMenor)} cm`, `${fmt(B + bMenor)} cm`, `${fmt(Math.round(area / altura))} cm`]);
    if (!opts) return null;
    return {
      q: `Un trapecio tiene un área de ${fmt(area)} cm², una altura de ${altura} cm y una base menor de ${bMenor} cm. ¿Cuánto mide su base mayor?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `De área = ((B + b) ÷ 2) × altura se despeja: ${fmt(area)} ÷ ${altura} = ${fmt(area / altura)}, así que (B + ${bMenor}) ÷ 2 = ${fmt(area / altura)}. Entonces B + ${bMenor} = ${fmt((area / altura) * 2)} y B = ${fmt(B)} cm.`
    };
  }

  if (figura === "rectangulo") {
    const b = h.int(4, 25);
    const a = h.int(3, 20);
    if (a === b) return null;
    const ans = a * b;
    const opts = h.choice3(ans, [2 * (a + b), (a * b) / 2, a + b]);
    if (!opts) return null;
    return {
      q: `Un rectángulo mide ${b} cm de base y ${a} cm de altura. ¿Cuál es su área en cm²?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Área del rectángulo = base × altura = ${b} × ${a} = ${fmt(ans)} cm². (${2 * (a + b)} sería el perímetro.)`
    };
  }

  if (figura === "cuadrado") {
    const l = h.int(4, 20);
    const ans = l * l;
    const opts = h.choice3(ans, [4 * l, 2 * l, ans / 2]);
    if (!opts) return null;
    return {
      q: `Un cuadrado tiene lados de ${l} cm. ¿Cuál es su área en cm²?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Área del cuadrado = lado² = ${l}² = ${fmt(ans)} cm². (${4 * l} cm sería el perímetro.)`
    };
  }

  if (figura === "triangulo") {
    const b = h.pick([4, 6, 8, 10, 12, 14, 16, 18, 20]);
    const a = h.int(3, 18);
    const ans = (b * a) / 2;
    const opts = h.choice3(ans, [b * a, b + a, ans * 2 + 1]);
    if (!opts) return null;
    return {
      q: `Un triángulo tiene una base de ${b} cm y una altura de ${a} cm. ¿Cuál es su área en cm²?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Área del triángulo = (base × altura) ÷ 2 = (${b} × ${a}) ÷ 2 = ${fmt(ans)} cm².`
    };
  }

  if (figura === "circulo") {
    const r = h.int(2, 12);
    const ans = Math.round(3.14 * r * r * 100) / 100;
    const opts = h.choice3(ans, [Math.round(2 * 3.14 * r * 100) / 100, Math.round(3.14 * 2 * r * r * 100) / 100, Math.round(3.14 * r * 100) / 100]);
    if (!opts) return null;
    return {
      q: `Un círculo tiene radio de ${r} cm. Usando π ≈ 3.14, ¿cuál es su área en cm²?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Área del círculo = πr² = 3.14 × ${r}² = 3.14 × ${r * r} = ${fmt(ans)} cm². (${fmt(Math.round(2 * 3.14 * r * 100) / 100)} sería la circunferencia.)`
    };
  }

  const B = h.int(10, 24);
  const b = h.int(4, 9);
  const a = h.pick([4, 6, 8, 10, 12]);
  const ans = ((B + b) * a) / 2;
  const opts = h.choice3(ans, [(B + b) * a, B * a, ((B - b) * a) / 2]);
  if (!opts) return null;
  return {
    q: `Un trapecio tiene bases de ${B} cm y ${b} cm, y altura de ${a} cm. ¿Cuál es su área en cm²?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Área del trapecio = ((B + b) × h) ÷ 2 = ((${B} + ${b}) × ${a}) ÷ 2 = ${fmt(ans)} cm².`
  };
}

/* Guía 1.5.2: "propiedades de semejanza entre TRIÁNGULOS de acuerdo con sus
   medidas". La variante de razón entre áreas de polígonos quedó fuera. */
export function semejanza(h) {
  const modo = h.pick(["ladoFaltante", "sombra"]);
  const k = h.pick([2, 3, 4, 1.5, 2.5]);
  const a = h.int(3, 12);
  const b = h.int(4, 15);
  const A = a * k;
  const B = b * k;
  if (!Number.isInteger(A) || !Number.isInteger(B)) return null;

  if (modo === "ladoFaltante") {
    const opts = h.choice3(B, [b * (k + 1), b + (A - a), Math.round(B / 2)]);
    if (!opts) return null;
    return {
      q: `Dos triángulos son semejantes. En el primero, dos lados miden ${a} cm y ${b} cm. En el segundo, el lado correspondiente al de ${a} cm mide ${A} cm. ¿Cuánto mide el lado correspondiente al de ${b} cm?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `En figuras semejantes los lados correspondientes son proporcionales: la razón es ${A} ÷ ${a} = ${fmt(k)}. Entonces ${b} × ${fmt(k)} = ${fmt(B)} cm.`
    };
  }

  if (modo === "sombra") {
    const hPersona = h.pick([150, 160, 170, 180]);
    const sPersona = h.pick([50, 60, 75, 90]);
    const sArbol = sPersona * h.int(3, 8);
    const ans = (hPersona * sArbol) / sPersona;
    if (!Number.isInteger(ans)) return null;
    const opts = h.choice3(ans, [sArbol, ans / 2, hPersona + sArbol]);
    if (!opts) return null;
    return {
      q: `Una persona de ${hPersona} cm proyecta una sombra de ${sPersona} cm. A la misma hora, un árbol proyecta una sombra de ${sArbol} cm. ¿Cuánto mide el árbol en cm?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Los triángulos formados son semejantes: ${hPersona}/${sPersona} = x/${sArbol}, de donde x = ${fmt(ans)} cm.`
    };
  }

  const kk = h.pick([2, 3, 4]);
  const ans = kk * kk;
  const opts = h.choice3(`${ans} veces mayor`, [`${kk} veces mayor`, `${kk * kk * kk} veces mayor`, `${kk * 2} veces mayor`]);
  if (!opts) return null;
  return {
    q: `Dos polígonos son semejantes y la razón entre sus lados es ${kk}:1. ¿Cómo es el área del polígono grande respecto a la del pequeño?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Si los lados están en razón ${kk}:1, las áreas están en razón ${kk}²:1 = ${ans}:1. El área crece con el cuadrado de la razón de semejanza.`
  };
}

const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];

export function pitagoras(h) {
  const [a0, b0, c0] = h.pick(TRIPLES);
  const k = h.pick([1, 1, 1, 2, 3]);
  const a = a0 * k;
  const b = b0 * k;
  const c = c0 * k;
  const buscarHipotenusa = h.chance(0.6);

  if (buscarHipotenusa) {
    const opts = h.choice3(c, [a + b, Math.round(Math.sqrt(b * b - a * a)), c + h.int(1, 3)]);
    if (!opts) return null;
    const ctx = h.pick([
      `Un triángulo rectángulo tiene catetos de ${a} cm y ${b} cm. ¿Cuánto mide la hipotenusa?`,
      `Una escalera se apoya en una pared: la base está a ${a} m del muro y alcanza una altura de ${b} m. ¿Cuánto mide la escalera?`,
      `Un terreno rectangular mide ${a} m por ${b} m. ¿Cuánto mide su diagonal?`
    ]);
    return {
      q: ctx,
      options: opts.options,
      correct: opts.correct,
      explanation: `Teorema de Pitágoras: c² = a² + b² = ${a * a} + ${b * b} = ${c * c}, así que c = √${c * c} = ${c}.`
    };
  }

  const opts = h.choice3(a, [c - b, Math.round(Math.sqrt(c * c + b * b)), a + h.int(1, 3)]);
  if (!opts) return null;
  return {
    q: `En un triángulo rectángulo la hipotenusa mide ${c} cm y uno de los catetos mide ${b} cm. ¿Cuánto mide el otro cateto?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Se despeja: a² = c² - b² = ${c * c} - ${b * b} = ${a * a}, así que a = √${a * a} = ${a}. (Restar ${c} - ${b} es el error más común.)`
  };
}

/* Guía 1.5.4: "Cálculo del área de CUADRADOS y triángulos rectángulos en el
   plano cartesiano". Antes generaba rectángulos de lados distintos; ahora el
   caso de cuatro vértices es un cuadrado, como dice la orientación. */
export function areaPlanoCartesiano(h) {
  const modo = h.pick(["cuadrado", "triangulo"]);
  const x0 = h.int(-6, 3);
  const y0 = h.int(-6, 3);
  const w = h.int(3, 9);
  const t = modo === "cuadrado" ? w : h.int(3, 9);

  if (modo === "cuadrado") {
    const ans = w * w;
    const opts = h.choice3(ans, [4 * w, 2 * w, ans - w]);
    if (!opts) return null;
    return {
      q: `Un cuadrado tiene vértices en (${x0}, ${y0}), (${x0 + w}, ${y0}), (${x0 + w}, ${y0 + w}) y (${x0}, ${y0 + w}). ¿Cuál es su área en unidades cuadradas?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `El lado va de x = ${x0} a x = ${x0 + w}, es decir ${w} unidades, y lo mismo en vertical. Área del cuadrado = lado² = ${w}² = ${fmt(ans)}. (${4 * w} sería el perímetro.)`
    };
  }

  const ans = (w * t) / 2;
  const opts = h.choice3(ans, [w * t, w + t, ans * 2 + 1]);
  if (!opts) return null;
  return {
    q: `Un triángulo tiene vértices en (${x0}, ${y0}), (${x0 + w}, ${y0}) y (${x0}, ${y0 + t}). ¿Cuál es su área en unidades cuadradas?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Es un triángulo rectángulo con base ${w} (horizontal) y altura ${t} (vertical): área = (${w} × ${t}) ÷ 2 = ${fmt(ans)}.`
  };
}

/* ============================================================
   1.6 Pensamiento variacional
   ============================================================ */

export function intervalos(h) {
  const modo = h.pick(["desigualdadAIntervalo", "resolver", "intervaloADesigualdad"]);
  const a = h.int(-8, 5);
  const b = a + h.int(2, 10);

  if (modo === "desigualdadAIntervalo") {
    const tipo = h.pick([
      [`${a} ≤ x < ${b}`, `[${a}, ${b})`, [`(${a}, ${b})`, `[${a}, ${b}]`, `(${a}, ${b}]`]],
      [`${a} < x ≤ ${b}`, `(${a}, ${b}]`, [`[${a}, ${b})`, `[${a}, ${b}]`, `(${a}, ${b})`]],
      [`${a} < x < ${b}`, `(${a}, ${b})`, [`[${a}, ${b}]`, `[${a}, ${b})`, `(${a}, ${b}]`]],
      [`x ≥ ${a}`, `[${a}, ∞)`, [`(${a}, ∞)`, `(-∞, ${a}]`, `(-∞, ${a})`]]
    ]);
    const opts = h.choice3(tipo[1], tipo[2]);
    if (!opts) return null;
    return {
      q: `¿Qué intervalo representa la desigualdad ${tipo[0]}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `El corchete [ ] incluye el extremo (≤ o ≥) y el paréntesis ( ) lo excluye (< o >). Por eso ${tipo[0]} se escribe ${tipo[1]}.`
    };
  }

  if (modo === "intervaloADesigualdad") {
    const tipo = h.pick([
      [`[${a}, ${b}]`, `${a} ≤ x ≤ ${b}`, [`${a} < x < ${b}`, `${a} ≤ x < ${b}`, `x ≥ ${a}`]],
      [`(${a}, ${b}]`, `${a} < x ≤ ${b}`, [`${a} ≤ x ≤ ${b}`, `${a} ≤ x < ${b}`, `${a} < x < ${b}`]],
      [`(-∞, ${b})`, `x < ${b}`, [`x ≤ ${b}`, `x > ${b}`, `x ≥ ${b}`]]
    ]);
    const opts = h.choice3(tipo[1], tipo[2]);
    if (!opts) return null;
    return {
      q: `¿Qué desigualdad representa el intervalo ${tipo[0]}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `El intervalo ${tipo[0]} corresponde a ${tipo[1]}: el corchete incluye el extremo y el paréntesis no.`
    };
  }

  // resolver una desigualdad lineal
  const m = h.int(2, 7);
  const c = h.int(-10, 10);
  const x = h.int(-6, 8);
  const rhs = m * x + c;
  const negativo = h.chance(0.35);
  if (negativo) {
    const ans = `x > ${x}`;
    const opts = h.choice3(ans, [`x < ${x}`, `x ≥ ${x}`, `x > ${-x}`]);
    if (!opts) return null;
    return {
      q: `Resuelve la desigualdad -${m}x ${c >= 0 ? "+ " + c : "- " + -c} < ${-m * x + c}.`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Se pasa ${c} restando y queda -${m}x < ${-m * x}. Al dividir entre un número NEGATIVO se invierte el sentido de la desigualdad: x > ${x}.`
    };
  }
  const ans = `x < ${x}`;
  const opts = h.choice3(ans, [`x > ${x}`, `x ≤ ${x}`, `x < ${rhs}`]);
  if (!opts) return null;
  return {
    q: `Resuelve la desigualdad ${m}x ${c >= 0 ? "+ " + c : "- " + -c} < ${rhs}.`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Se resta ${c}: ${m}x < ${rhs - c}. Al dividir entre ${m} (positivo) el sentido no cambia: x < ${x}.`
  };
}

/* Guía 1.6.2: "determinar sus valores máximos y mínimos, así como su concavidad
   y su comportamiento creciente o decreciente". El corte con el eje Y no está en
   la orientación; la pendiente sí, porque es el signo del crecimiento. */
export function graficasFunciones(h) {
  const modo = h.pick(["pendiente", "vertice", "vertice", "tipo"]);

  if (modo === "pendiente") {
    const x1 = h.int(-6, 3);
    const y1 = h.int(-8, 8);
    const dx = h.int(1, 6);
    const m = h.signedInt(1, 5);
    const x2 = x1 + dx;
    const y2 = y1 + m * dx;
    const ans = frac(y2 - y1, x2 - x1);
    const opts = h.choice3(ans, [frac(x2 - x1, y2 - y1), frac(y2 + y1, x2 + x1), frac(-(y2 - y1), x2 - x1)]);
    if (!opts) return null;
    return {
      q: `¿Cuál es la pendiente de la recta que pasa por los puntos (${x1}, ${y1}) y (${x2}, ${y2})?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `m = (y₂ - y₁)/(x₂ - x₁) = (${y2} - ${y1})/(${x2} - ${x1}) = ${simpl(y2 - y1, x2 - x1)}.`
    };
  }

  if (modo === "ordenada") {
    const m = h.signedInt(1, 6);
    const b = h.signedInt(1, 9);
    const ans = `(0, ${b})`;
    const opts = h.choice3(ans, [`(${b}, 0)`, `(0, ${m})`, `(${m}, ${b})`]);
    if (!opts) return null;
    return {
      q: `¿En qué punto corta al eje Y la recta y = ${poly([[m, "x"], [b, ""]])}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `El corte con el eje Y ocurre cuando x = 0: y = ${b}. El punto es (0, ${b}), que es justo la ordenada al origen de y = mx + b.`
    };
  }

  if (modo === "vertice") {
    const hx = h.signedInt(1, 5);
    const k = h.signedInt(1, 9);
    const a = h.pick([1, 1, 2, -1]);
    // y = a(x - hx)² + k  →  y = ax² - 2a·hx·x + (a·hx² + k)
    const b = -2 * a * hx;
    const c = a * hx * hx + k;
    const expr = poly([[a, pw("x", 2)], [b, "x"], [c, ""]]);
    const ans = `(${hx}, ${k})`;
    const opts = h.choice3(ans, [`(${-hx}, ${k})`, `(${k}, ${hx})`, `(${hx}, ${-k})`]);
    if (!opts) return null;
    return {
      q: `¿Cuál es el vértice de la parábola y = ${expr}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `x del vértice = -b/(2a) = ${-b}/(2·${a}) = ${hx}. Sustituyendo: y = ${k}. El vértice es (${hx}, ${k}).`
    };
  }

  const casos = [
    ["y = 3x - 5", "Una recta", ["Una parábola", "Una hipérbola"]],
    ["y = x² + 2x - 1", "Una parábola", ["Una recta", "Una circunferencia"]],
    ["y = 2ˣ", "Una curva exponencial creciente", ["Una recta con pendiente 2", "Una parábola"]],
    ["y = -x² + 4", "Una parábola que abre hacia abajo", ["Una parábola que abre hacia arriba", "Una recta descendente"]]
  ];
  const [expr, ansTxt, dis] = h.pick(casos);
  const opts = h.choice3(ansTxt, dis);
  if (!opts) return null;
  return {
    q: `¿Qué figura describe la gráfica de ${expr}?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `${expr} corresponde a ${ansTxt.toLowerCase()}: el grado y el signo del término principal determinan la forma de la gráfica.`
  };
}

/* Guía 1.6.3: "Cálculo de límites de funciones cuadráticas". El modo "racional"
   producía límites al infinito de funciones racionales, que la orientación no
   contempla; se quitó junto con los reactivos estáticos equivalentes. */
export function limites(h) {
  const modo = h.pick(["directo", "indeterminado"]);

  if (modo === "directo") {
    const a = h.int(1, 5);
    const b = h.signedInt(1, 6);
    const c = h.signedInt(1, 9);
    const x = h.int(-3, 4);
    const ans = a * x * x + b * x + c;
    const expr = poly([[a, pw("x", 2)], [b, "x"], [c, ""]]);
    const opts = h.choice3(ans, [ans + h.int(1, 5), a * x + b * x + c, 2 * a * x + b]);
    if (!opts) return null;
    return {
      q: `Calcula el límite: lím(x→${x}) (${expr}).`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Es un polinomio, así que basta sustituir: ${a}(${signed(x)})² ${b >= 0 ? "+" : "-"} ${Math.abs(b)}(${signed(x)}) ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${fmt(ans)}.`
    };
  }

  if (modo === "indeterminado") {
    const a = h.int(2, 9);
    const ans = 2 * a;
    const opts = h.choice3(ans, [a, 0, a * a, "No existe"]);
    if (!opts) return null;
    return {
      q: `Calcula el límite: lím(x→${a}) (x² - ${a * a})/(x - ${a}).`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Al sustituir queda 0/0, así que se factoriza: (x² - ${a * a}) = (x + ${a})(x - ${a}). Se cancela (x - ${a}) y queda lím(x→${a}) (x + ${a}) = ${fmt(ans)}.`
    };
  }

  return null;
}

export function derivadasPolinomiales(h) {
  const a = h.int(2, 9);
  const n = h.int(2, 5);
  const b = h.signedInt(1, 8);
  const m = h.int(1, n - 1) || 1;
  const c = h.signedInt(1, 12);
  const expr = poly([[a, pw("x", n)], [b, m === 1 ? "x" : pw("x", m)], [c, ""]]);
  const dTerms = [[a * n, m === 1 && n - 1 === 1 ? "x" : pw("x", n - 1)], [b * m, m - 1 === 0 ? "" : m - 1 === 1 ? "x" : pw("x", m - 1)]];
  const ans = poly(dTerms);
  const malo1 = poly([[a * n, pw("x", n)], [b * m, m === 1 ? "x" : pw("x", m)]]);
  const malo2 = poly([[a, pw("x", n - 1)], [b, m - 1 === 0 ? "" : pw("x", m - 1)], [c, ""]]);
  const malo3 = poly([[a * n, pw("x", n - 1)], [b * m, m - 1 === 0 ? "" : m - 1 === 1 ? "x" : pw("x", m - 1)], [c, ""]]);
  const opts = h.choice3(ans, [malo3, malo1, malo2]);
  if (!opts) return null;
  return {
    q: `Deriva la función f(x) = ${expr}.`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Regla de la potencia: baja el exponente como factor y réstale 1. ${a}x${SUP[n] || "^" + n} → ${a * n}x${n - 1 === 1 ? "" : SUP[n - 1] || "^" + (n - 1)}; la constante ${c} se deriva como 0. Resultado: ${ans}.`
  };
}

export function derivadasTrascendentes(h) {
  const k = h.int(2, 7);
  const casos = [
    [`f(x) = sen(x)`, `cos(x)`, [`-cos(x)`, `sen(x)`, `-sen(x)`], `La derivada de sen(x) es cos(x).`],
    [`f(x) = cos(x)`, `-sen(x)`, [`sen(x)`, `cos(x)`, `-cos(x)`], `La derivada de cos(x) es -sen(x) (el signo negativo es el error más común).`],
    [`f(x) = e^x`, `e^x`, [`x·e^(x-1)`, `e^(x-1)`, `1/e^x`], `La función exponencial e^x es su propia derivada.`],
    [`f(x) = ln(x)`, `1/x`, [`ln(x)/x`, `x`, `1/ln(x)`], `La derivada de ln(x) es 1/x.`],
    [`f(x) = e^(${k}x)`, `${k}e^(${k}x)`, [`e^(${k}x)`, `${k}x·e^(${k}x)`, `e^(${k}x)/${k}`], `Regla de la cadena: se deriva la exponencial y se multiplica por la derivada del exponente (${k}).`],
    [`f(x) = sen(${k}x)`, `${k}cos(${k}x)`, [`cos(${k}x)`, `${k}sen(${k}x)`, `-${k}cos(${k}x)`], `Regla de la cadena: la derivada de sen(u) es cos(u)·u', con u = ${k}x y u' = ${k}.`],
    [`f(x) = ${k}ln(x)`, `${k}/x`, [`1/x`, `${k}x`, `ln(${k}x)`], `La constante ${k} multiplica a la derivada de ln(x), que es 1/x.`],
    [`f(x) = x·e^x`, `e^x(x + 1)`, [`e^x`, `x·e^x`, `e^x(x - 1)`], `Regla del producto: (x)'·e^x + x·(e^x)' = e^x + x·e^x = e^x(x + 1).`]
  ];
  const [fx, ansTxt, dis, why] = h.pick(casos);
  const opts = h.choice3(ansTxt, dis);
  if (!opts) return null;
  return {
    q: `Deriva la función ${fx}.`,
    options: opts.options,
    correct: opts.correct,
    explanation: why
  };
}

export function optimizacion(h) {
  const modo = h.pick(["perimetro", "vertice", "proyectil"]);

  if (modo === "perimetro") {
    const per = h.pick([40, 60, 80, 100, 120, 200]);
    const lado = per / 4;
    const ans = lado * lado;
    const opts = h.choice3(ans, [per * per, (per / 2) * (per / 2), lado * (per / 2 - lado) + 10]);
    if (!opts) return null;
    return {
      q: `Con ${per} metros de malla se quiere cercar un terreno rectangular. ¿Cuál es la mayor área posible, en m²?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Si el perímetro es ${per}, entonces x + y = ${per / 2} y el área A = x(${per / 2} - x). La derivada A' = ${per / 2} - 2x se anula en x = ${lado}: el rectángulo de área máxima es el cuadrado de lado ${lado}, con área ${fmt(ans)} m².`
    };
  }

  if (modo === "vertice") {
    const a = h.pick([1, 2, -1, -2]);
    const hx = h.signedInt(1, 6);
    const k = h.signedInt(2, 12);
    const b = -2 * a * hx;
    const c = a * hx * hx + k;
    const expr = poly([[a, pw("x", 2)], [b, "x"], [c, ""]]);
    const esMin = a > 0;
    const ans = k;
    const opts = h.choice3(ans, [hx, -k, c]);
    if (!opts) return null;
    return {
      q: `¿Cuál es el valor ${esMin ? "mínimo" : "máximo"} de la función f(x) = ${expr}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `f'(x) = ${poly([[2 * a, "x"], [b, ""]])} se hace cero en x = ${hx}. Como a = ${a} ${esMin ? "> 0, la parábola abre hacia arriba y ahí hay un mínimo" : "< 0, la parábola abre hacia abajo y ahí hay un máximo"}: f(${hx}) = ${fmt(ans)}.`
    };
  }

  const v = h.pick([20, 30, 40, 25]);
  const g = 10;
  const t = v / g;
  const alturaMax = (v * v) / (2 * g);
  const opts = h.choice3(alturaMax, [v, t, v * t]);
  if (!opts) return null;
  return {
    q: `Un objeto se lanza hacia arriba y su altura es h(t) = ${v}t - 5t² (metros, con t en segundos). ¿Cuál es la altura máxima que alcanza?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `h'(t) = ${v} - 10t se anula en t = ${fmt(t)} s. Sustituyendo: h(${fmt(t)}) = ${v}(${fmt(t)}) - 5(${fmt(t)})² = ${fmt(alturaMax)} m.`
  };
}

/* ============================================================
   Registro: id de tema → generadores disponibles
   ============================================================ */

export const MATH_GENERATORS = {
  "1.1.1": [tiposDeVariable],
  "1.1.2": [tiposDeMuestra],
  "1.1.3": [tendenciaCentral],
  "1.1.4": [dispersion],
  "1.2.1": [tecnicasConteo],
  "1.2.2": [probabilidadSimple],
  "1.2.3": [probabilidadCondicional],
  "1.3.1": [expresionesAlgebraicas],
  "1.3.2": [factorizacion],
  "1.3.3": [productosNotables],
  "1.3.4": [ecuacionLineal],
  "1.3.5": [ecuacionCuadratica],
  "1.3.6": [sistemaEcuaciones],
  "1.3.7": [interesSimple],
  "1.3.8": [interesCompuesto],
  "1.4.1": [mcm],
  "1.4.2": [mcd],
  "1.4.3": [razones],
  "1.4.4": [proporcionalidad],
  "1.4.5": [porcentajes],
  "1.5.1": [areaFiguras],
  "1.5.2": [semejanza],
  "1.5.3": [pitagoras],
  "1.5.4": [areaPlanoCartesiano],
  "1.6.1": [intervalos],
  "1.6.2": [graficasFunciones],
  "1.6.3": [limites],
  "1.6.4": [derivadasPolinomiales],
  "1.6.5": [derivadasTrascendentes],
  "1.6.6": [optimizacion]
};
