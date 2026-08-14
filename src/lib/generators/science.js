/* ============================================================
   Generadores de reactivos de CIENCIAS NATURALES (área 5)

   Mismo contrato que math.js: devuelven { q, options, correct, explanation }
   o null si la combinación de números no da un reactivo limpio.

   Las constantes se declaran explícitamente en el enunciado (g = 10 m/s²,
   k = 9×10⁹ N·m²/C², c = 3×10⁸ m/s) para que el problema se pueda resolver
   sin tablas, igual que en el examen.
   ============================================================ */

import { fmt } from "../rng.js";

/* ============================================================
   5.1 La materia y sus interacciones
   ============================================================ */

export function conservacionMateria(h) {
  const modo = h.pick(["balanceMasa", "ecuacionBalanceada", "sistemaCerrado"]);

  if (modo === "balanceMasa") {
    const a = h.int(8, 60);
    const b = h.int(8, 60);
    const c = h.int(5, Math.min(a + b - 5, 70));
    const d = a + b - c;
    if (d <= 0) return null;
    const opts = h.choice3(d + " g", [a + b + " g", Math.abs(a - b) + " g", c + " g"]);
    if (!opts) return null;
    return {
      q: `En un recipiente cerrado reaccionan ${a} g de una sustancia con ${b} g de otra. Si se forman ${c} g de uno de los productos, ¿cuánta masa tiene el otro producto?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Por la ley de conservación de la materia, la masa total no cambia: ${a} + ${b} = ${a + b} g de reactivos, así que los productos también suman ${a + b} g. ${a + b} - ${c} = ${d} g.`
    };
  }

  if (modo === "sistemaCerrado") {
    const m = h.int(20, 90);
    const opts = h.choice3(`${m} g, la masa no cambia`, [
      `Menos de ${m} g, porque parte se convierte en energía`,
      `Más de ${m} g, porque se incorpora oxígeno del aire`,
      `No se puede saber sin conocer los productos`
    ]);
    if (!opts) return null;
    return {
      q: `Dentro de un matraz sellado se colocan ${m} g de reactivos y se deja que reaccionen por completo. ¿Cuánta masa habrá dentro del matraz al terminar la reacción?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `En un sistema cerrado nada entra ni sale: los átomos solo se reacomodan. La masa se conserva, así que siguen siendo ${m} g (ley de Lavoisier).`
    };
  }

  const casos = [
    ["2H₂ + O₂ → 2H₂O", "4 átomos de H y 2 de O de cada lado", ["4 átomos de H y 1 de O de cada lado", "2 átomos de H y 2 de O de cada lado"]],
    ["CH₄ + 2O₂ → CO₂ + 2H₂O", "1 C, 4 H y 4 O de cada lado", ["1 C, 4 H y 2 O de cada lado", "1 C, 2 H y 4 O de cada lado"]],
    ["2Na + Cl₂ → 2NaCl", "2 átomos de Na y 2 de Cl de cada lado", ["1 átomo de Na y 2 de Cl de cada lado", "2 átomos de Na y 1 de Cl de cada lado"]],
    ["N₂ + 3H₂ → 2NH₃", "2 átomos de N y 6 de H de cada lado", ["2 átomos de N y 3 de H de cada lado", "1 átomo de N y 6 de H de cada lado"]]
  ];
  const [ec, ans, dis] = h.pick(casos);
  const opts = h.choice3(ans, dis);
  if (!opts) return null;
  return {
    q: `La ecuación ${ec} está balanceada. ¿Qué significa exactamente?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Una ecuación balanceada tiene el mismo número de átomos de cada elemento antes y después de la flecha: ${ans}. Eso es la ley de conservación de la materia aplicada a las reacciones.`
  };
}

export function escalasTermometricas(h) {
  const modo = h.pick(["CaF", "FaC", "CaK", "KaC"]);
  const c = h.int(-8, 20) * 5; // múltiplo de 5 → conversión exacta

  if (modo === "CaF") {
    const f = (c * 9) / 5 + 32;
    const opts = h.choice3(`${fmt(f)} °F`, [`${fmt((c * 5) / 9 + 32)} °F`, `${fmt(c + 32)} °F`, `${fmt((c * 9) / 5)} °F`]);
    if (!opts) return null;
    return {
      q: `Convierte ${c} °C a grados Fahrenheit.`,
      options: opts.options,
      correct: opts.correct,
      explanation: `°F = (°C × 9/5) + 32 = (${c} × 1.8) + 32 = ${fmt((c * 9) / 5)} + 32 = ${fmt(f)} °F.`
    };
  }

  if (modo === "FaC") {
    const f = (c * 9) / 5 + 32;
    const opts = h.choice3(`${fmt(c)} °C`, [`${fmt(((f - 32) * 9) / 5)} °C`, `${fmt(f - 32)} °C`, `${fmt((f * 5) / 9)} °C`]);
    if (!opts) return null;
    return {
      q: `Convierte ${fmt(f)} °F a grados Celsius.`,
      options: opts.options,
      correct: opts.correct,
      explanation: `°C = (°F - 32) × 5/9 = (${fmt(f)} - 32) × 5/9 = ${fmt(f - 32)} × 5/9 = ${fmt(c)} °C.`
    };
  }

  if (modo === "CaK") {
    const k = c + 273;
    const opts = h.choice3(`${fmt(k)} K`, [`${fmt(c - 273)} K`, `${fmt(273 - c)} K`, `${fmt((c * 9) / 5 + 32)} K`]);
    if (!opts) return null;
    return {
      q: `Convierte ${c} °C a kelvin.`,
      options: opts.options,
      correct: opts.correct,
      explanation: `K = °C + 273 = ${c} + 273 = ${fmt(k)} K. La escala Kelvin usa el mismo tamaño de grado que Celsius, solo cambia el punto de partida (el cero absoluto).`
    };
  }

  const k = c + 273;
  if (k < 0) return null;
  const opts = h.choice3(`${fmt(c)} °C`, [`${fmt(k + 273)} °C`, `${fmt(273 - k)} °C`, `${fmt(k)} °C`]);
  if (!opts) return null;
  return {
    q: `Convierte ${fmt(k)} K a grados Celsius.`,
    options: opts.options,
    correct: opts.correct,
    explanation: `°C = K - 273 = ${fmt(k)} - 273 = ${fmt(c)} °C.`
  };
}

export function leyCoulomb(h) {
  const modo = h.pick(["numerico", "proporcion", "signo"]);

  if (modo === "numerico") {
    const q1 = h.int(1, 9);
    const q2 = h.int(1, 9);
    const r = h.pick([0.1, 0.2, 0.3, 0.5, 1]);
    // F = k·q1·q2/r² con cargas en microcoulomb: 9e9 · 1e-12 = 9e-3
    const F = (0.009 * q1 * q2) / (r * r);
    const ans = Math.round(F * 1000) / 1000;
    if (ans > 100) return null;
    const opts = h.choice3(`${fmt(ans, 3)} N`, [
      `${fmt(Math.round((0.009 * q1 * q2 * 1000) / r) / 1000, 3)} N`,
      `${fmt(Math.round(ans * 2000) / 1000, 3)} N`,
      `${fmt(Math.round((ans / 2) * 1000) / 1000, 3)} N`
    ]);
    if (!opts) return null;
    return {
      q: `Dos cargas de ${q1} µC y ${q2} µC están separadas ${r} m. Con k = 9×10⁹ N·m²/C², ¿cuál es la fuerza eléctrica entre ellas?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `F = k·q₁·q₂/r² = 9×10⁹ × (${q1}×10⁻⁶)(${q2}×10⁻⁶) / ${r}² = ${fmt(0.009 * q1 * q2, 4)} / ${fmt(r * r, 4)} = ${fmt(ans, 3)} N.`
    };
  }

  if (modo === "proporcion") {
    const casos = [
      ["se duplica la distancia entre las cargas", "Se reduce a la cuarta parte", ["Se reduce a la mitad", "Se duplica", "Se cuadruplica"]],
      ["se reduce la distancia a la mitad", "Se cuadruplica", ["Se duplica", "Se reduce a la mitad", "No cambia"]],
      ["se triplica la distancia", "Se reduce a la novena parte", ["Se reduce a la tercera parte", "Se triplica", "No cambia"]],
      ["se duplica una de las cargas", "Se duplica", ["Se cuadruplica", "Se reduce a la mitad", "No cambia"]],
      ["se duplican ambas cargas", "Se cuadruplica", ["Se duplica", "Se reduce a la cuarta parte", "No cambia"]]
    ];
    const [cambio, ans, dis] = h.pick(casos);
    const opts = h.choice3(ans, dis);
    if (!opts) return null;
    return {
      q: `Según la ley de Coulomb, ¿qué le pasa a la fuerza entre dos cargas si ${cambio}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `F = k·q₁·q₂/r²: la fuerza es directamente proporcional al producto de las cargas e inversamente proporcional al CUADRADO de la distancia. Por eso, si ${cambio}, la respuesta es: ${ans.toLowerCase()}.`
    };
  }

  const casos = [
    ["dos cargas positivas", "Se repelen", ["Se atraen", "No se ejercen fuerza"]],
    ["dos cargas negativas", "Se repelen", ["Se atraen", "No se ejercen fuerza"]],
    ["una carga positiva y una negativa", "Se atraen", ["Se repelen", "No se ejercen fuerza"]]
  ];
  const [par, ans, dis] = h.pick(casos);
  const opts = h.choice3(ans, dis);
  if (!opts) return null;
  return {
    q: `¿Qué ocurre entre ${par} colocadas cerca una de la otra?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Cargas del mismo signo se repelen y cargas de signo contrario se atraen. Por eso ${par} ${ans.toLowerCase()}.`
  };
}

/* ============================================================
   5.2 Energía
   ============================================================ */

const ESPECTRO = [
  ["ondas de radio", 1],
  ["microondas", 2],
  ["infrarrojo", 3],
  ["luz visible", 4],
  ["ultravioleta", 5],
  ["rayos X", 6],
  ["rayos gamma", 7]
];

export function luzVisible(h) {
  const modo = h.pick(["frecuencia", "colores", "espectro"]);

  if (modo === "frecuencia") {
    const lambda = h.pick([400, 450, 500, 600, 750]);
    const f = 3e17 / lambda; // Hz, con c = 3×10⁸ m/s y λ en nm
    const enE14 = Math.round((f / 1e14) * 100) / 100;
    const opts = h.choice3(`${fmt(enE14)}×10¹⁴ Hz`, [
      `${fmt(Math.round((lambda / 3) * 100) / 100)}×10¹⁴ Hz`,
      `${fmt(Math.round(enE14 * 200) / 100)}×10¹⁴ Hz`,
      `${fmt(Math.round((enE14 / 2) * 100) / 100)}×10¹⁴ Hz`
    ]);
    if (!opts) return null;
    return {
      q: `Una luz tiene una longitud de onda de ${lambda} nm. Con c = 3×10⁸ m/s, ¿cuál es su frecuencia?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `f = c/λ = 3×10⁸ m/s ÷ ${lambda}×10⁻⁹ m = ${fmt(enE14)}×10¹⁴ Hz.`
    };
  }

  if (modo === "colores") {
    const casos = [
      ["el color con MAYOR longitud de onda dentro del espectro visible", "Rojo", ["Violeta", "Verde", "Azul"]],
      ["el color con MENOR longitud de onda dentro del espectro visible", "Violeta", ["Rojo", "Amarillo", "Verde"]],
      ["el color con MAYOR frecuencia dentro del espectro visible", "Violeta", ["Rojo", "Naranja", "Verde"]],
      ["el color con MENOR energía dentro del espectro visible", "Rojo", ["Violeta", "Azul", "Verde"]]
    ];
    const [pide, ans, dis] = h.pick(casos);
    const opts = h.choice3(ans, dis);
    if (!opts) return null;
    return {
      q: `¿Cuál es ${pide}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `En el visible, el rojo tiene la mayor longitud de onda (≈700 nm) y por tanto la menor frecuencia y energía; el violeta (≈400 nm) es el opuesto. Respuesta: ${ans}.`
    };
  }

  const par = h.sample(ESPECTRO, 2);
  if (par[0][1] === par[1][1]) return null;
  const mayor = par[0][1] > par[1][1] ? par[0] : par[1];
  const menor = par[0][1] > par[1][1] ? par[1] : par[0];
  const pideEnergia = h.chance(0.5);
  const ans = pideEnergia ? mayor[0] : menor[0];
  const otro = pideEnergia ? menor[0] : mayor[0];
  /* Solo se ofrecen las dos opciones mencionadas más el empate: meter una
     tercera radiación que no aparece en la pregunta se lee como error. */
  const opts = h.choice3(ans, [otro, "Las dos por igual"]);
  if (!opts) return null;
  return {
    q: `Entre ${menor[0]} y ${mayor[0]}, ¿cuál tiene ${pideEnergia ? "mayor energía por fotón" : "mayor longitud de onda"}?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `En el espectro electromagnético, a menor longitud de onda corresponde mayor frecuencia y mayor energía. El orden de menor a mayor energía es: radio, microondas, infrarrojo, visible, ultravioleta, rayos X y rayos gamma. Respuesta: ${ans}.`
  };
}

const MATERIALES = [
  ["agua", 4180],
  ["aluminio", 900],
  ["hierro", 450],
  ["cobre", 385],
  ["vidrio", 840]
];

export function calorEspecifico(h) {
  const modo = h.pick(["calcularQ", "calcularDeltaT", "comparar"]);
  const [mat, c] = h.pick(MATERIALES);

  if (modo === "calcularQ") {
    const m = h.int(1, 6);
    const dT = h.pick([10, 15, 20, 25, 30, 40, 50]);
    const Q = m * c * dT;
    const opts = h.choice3(`${fmt(Q)} J`, [`${fmt(m * c)} J`, `${fmt(c * dT)} J`, `${fmt(Q / 2)} J`]);
    if (!opts) return null;
    return {
      q: `¿Cuánto calor se necesita para elevar ${dT} °C la temperatura de ${m} kg de ${mat}? (calor específico del ${mat} = ${c} J/kg·°C)`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Q = m·c·ΔT = ${m} kg × ${c} J/kg·°C × ${dT} °C = ${fmt(Q)} J.`
    };
  }

  if (modo === "calcularDeltaT") {
    const m = h.int(1, 5);
    const dT = h.pick([10, 20, 25, 40]);
    const Q = m * c * dT;
    const opts = h.choice3(`${fmt(dT)} °C`, [`${fmt(Q / c)} °C`, `${fmt(dT * 2)} °C`, `${fmt(dT / 2)} °C`]);
    if (!opts) return null;
    return {
      q: `Se entregan ${fmt(Q)} J de calor a ${m} kg de ${mat} (c = ${c} J/kg·°C). ¿Cuánto sube su temperatura?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `De Q = m·c·ΔT se despeja ΔT = Q/(m·c) = ${fmt(Q)} ÷ (${m} × ${c}) = ${fmt(dT)} °C.`
    };
  }

  const dos = h.sample(MATERIALES, 2);
  if (dos[0][1] === dos[1][1]) return null;
  const alto = dos[0][1] > dos[1][1] ? dos[0] : dos[1];
  const bajo = dos[0][1] > dos[1][1] ? dos[1] : dos[0];
  const opts = h.choice3(`El ${bajo[0]}, porque tiene menor calor específico`, [
    `El ${alto[0]}, porque tiene mayor calor específico`,
    `Los dos se calientan igual, porque tienen la misma masa`,
    `El ${alto[0]}, porque absorbe menos calor`
  ]);
  if (!opts) return null;
  return {
    q: `Se entrega la misma cantidad de calor a 1 kg de ${alto[0]} (c = ${alto[1]} J/kg·°C) y a 1 kg de ${bajo[0]} (c = ${bajo[1]} J/kg·°C). ¿Cuál sube más de temperatura?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Con la misma masa y el mismo calor, ΔT = Q/(m·c): entre menor sea el calor específico, mayor es el aumento de temperatura. El ${bajo[0]} (c = ${bajo[1]}) se calienta más que el ${alto[0]} (c = ${alto[1]}).`
  };
}

export function energiaCineticaPotencial(h) {
  const modo = h.pick(["cinetica", "potencial", "conservacion", "comparar"]);
  const g = 10;

  if (modo === "cinetica") {
    const m = h.int(1, 12);
    const v = h.pick([2, 4, 6, 8, 10, 12, 20]);
    const Ek = 0.5 * m * v * v;
    const opts = h.choice3(`${fmt(Ek)} J`, [`${fmt(m * v)} J`, `${fmt(m * v * v)} J`, `${fmt(0.5 * m * v)} J`]);
    if (!opts) return null;
    return {
      q: `Un cuerpo de ${m} kg se mueve a ${v} m/s. ¿Cuál es su energía cinética?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Ec = ½mv² = ½ × ${m} × ${v}² = ½ × ${m} × ${v * v} = ${fmt(Ek)} J.`
    };
  }

  if (modo === "potencial") {
    const m = h.int(1, 20);
    const alt = h.pick([2, 3, 5, 8, 10, 15, 20]);
    const Ep = m * g * alt;
    const opts = h.choice3(`${fmt(Ep)} J`, [`${fmt(m * alt)} J`, `${fmt(0.5 * m * alt * alt)} J`, `${fmt(m * g)} J`]);
    if (!opts) return null;
    return {
      q: `Un objeto de ${m} kg está a ${alt} m de altura. Con g = ${g} m/s², ¿cuál es su energía potencial gravitatoria?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Ep = m·g·h = ${m} × ${g} × ${alt} = ${fmt(Ep)} J.`
    };
  }

  if (modo === "conservacion") {
    const m = h.int(1, 8);
    const alt = h.pick([5, 10, 20, 45, 80]);
    const v = Math.sqrt(2 * g * alt);
    if (!Number.isInteger(v)) return null;
    const opts = h.choice3(`${fmt(v)} m/s`, [`${fmt(2 * g * alt)} m/s`, `${fmt(g * alt)} m/s`, `${fmt(v * 2)} m/s`]);
    if (!opts) return null;
    return {
      q: `Un cuerpo de ${m} kg se deja caer desde ${alt} m. Con g = ${g} m/s² y sin fricción, ¿con qué rapidez llega al suelo?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Toda la energía potencial se convierte en cinética: m·g·h = ½mv². La masa se cancela, así que v = √(2gh) = √(2 × ${g} × ${alt}) = √${2 * g * alt} = ${fmt(v)} m/s.`
    };
  }

  const m1 = h.int(2, 6);
  const v1 = h.pick([4, 6, 8]);
  const m2 = m1 * 2;
  const v2 = v1 / 2;
  const Ek1 = 0.5 * m1 * v1 * v1;
  const Ek2 = 0.5 * m2 * v2 * v2;
  if (Ek1 === Ek2) return null;
  const mayor = Ek1 > Ek2 ? "A" : "B";
  const opts = h.choice3(`El cuerpo ${mayor}`, [`El cuerpo ${mayor === "A" ? "B" : "A"}`, "Los dos tienen la misma energía cinética", "No se puede saber sin conocer la altura"]);
  if (!opts) return null;
  return {
    q: `El cuerpo A tiene masa ${m1} kg y rapidez ${v1} m/s; el cuerpo B tiene masa ${m2} kg y rapidez ${v2} m/s. ¿Cuál tiene mayor energía cinética?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Ec = ½mv². A: ½×${m1}×${v1 * v1} = ${fmt(Ek1)} J. B: ½×${m2}×${v2 * v2} = ${fmt(Ek2)} J. La rapidez pesa al cuadrado, por eso duplicar la masa no compensa reducir la velocidad a la mitad.`
  };
}

/* ============================================================
   5.4 Reacciones químicas
   ============================================================ */

const MASAS = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5, Zn: 65 };

const COMPUESTOS = [
  ["H₂O", "agua", [["H", 2], ["O", 1]]],
  ["CO₂", "dióxido de carbono", [["C", 1], ["O", 2]]],
  ["NaCl", "cloruro de sodio", [["Na", 1], ["Cl", 1]]],
  ["CaCO₃", "carbonato de calcio", [["Ca", 1], ["C", 1], ["O", 3]]],
  ["H₂SO₄", "ácido sulfúrico", [["H", 2], ["S", 1], ["O", 4]]],
  ["NH₃", "amoniaco", [["N", 1], ["H", 3]]],
  ["CH₄", "metano", [["C", 1], ["H", 4]]],
  ["C₆H₁₂O₆", "glucosa", [["C", 6], ["H", 12], ["O", 6]]],
  ["NaOH", "hidróxido de sodio", [["Na", 1], ["O", 1], ["H", 1]]],
  ["HCl", "ácido clorhídrico", [["H", 1], ["Cl", 1]]],
  ["CaO", "óxido de calcio", [["Ca", 1], ["O", 1]]],
  ["MgO", "óxido de magnesio", [["Mg", 1], ["O", 1]]],
  ["KOH", "hidróxido de potasio", [["K", 1], ["O", 1], ["H", 1]]],
  ["Fe₂O₃", "óxido férrico", [["Fe", 2], ["O", 3]]],
  ["C₂H₆O", "etanol", [["C", 2], ["H", 6], ["O", 1]]],
  ["HNO₃", "ácido nítrico", [["H", 1], ["N", 1], ["O", 3]]]
];

export function masaMolar(h) {
  const [formula, nombre, comp] = h.pick(COMPUESTOS);
  const total = comp.reduce((s, [el, n]) => s + MASAS[el] * n, 0);
  const detalle = comp.map(([el, n]) => `${n} × ${MASAS[el]} (${el})`).join(" + ");
  const modo = h.pick(["masaMolar", "gramosAMoles"]);

  if (modo === "masaMolar") {
    const opts = h.choice3(`${fmt(total)} g/mol`, [
      `${fmt(comp.reduce((s, [el]) => s + MASAS[el], 0))} g/mol`,
      `${fmt(total + h.int(2, 12))} g/mol`,
      `${fmt(total / 2)} g/mol`
    ]);
    if (!opts) return null;
    return {
      q: `¿Cuál es la masa molar del ${nombre} (${formula})?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Se suma la masa atómica de cada elemento multiplicada por su cantidad: ${detalle} = ${fmt(total)} g/mol.`
    };
  }

  const moles = h.pick([2, 3, 4, 0.5]);
  const gramos = Math.round(total * moles * 100) / 100;
  const opts = h.choice3(`${fmt(gramos)} g`, [`${fmt(total)} g`, `${fmt(total / moles)} g`, `${fmt(gramos * 2)} g`]);
  if (!opts) return null;
  return {
    q: `La masa molar del ${nombre} (${formula}) es ${fmt(total)} g/mol. ¿Cuántos gramos hay en ${fmt(moles)} moles?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `masa = moles × masa molar = ${fmt(moles)} mol × ${fmt(total)} g/mol = ${fmt(gramos)} g.`
  };
}

/* ============================================================
   5.5 Energía en la vida diaria
   ============================================================ */

export function choques(h) {
  const modo = h.pick(["identificar", "perfectamenteInelastico", "concepto"]);

  if (modo === "identificar") {
    const casos = [
      ["dos vagones de tren quedan enganchados después de chocar", "Perfectamente inelástico", ["Elástico", "Inelástico parcial"]],
      ["dos bolas de billar chocan y se separan casi sin perder energía", "Elástico", ["Perfectamente inelástico", "Inelástico parcial"]],
      ["una bala se incrusta en un bloque de madera", "Perfectamente inelástico", ["Elástico", "Inelástico parcial"]],
      ["dos autos chocan, se abollan y siguen unidos", "Perfectamente inelástico", ["Elástico", "Inelástico parcial"]],
      ["dos moléculas de un gas ideal chocan y conservan toda su energía cinética", "Elástico", ["Perfectamente inelástico", "Inelástico parcial"]]
    ];
    const [caso, ans, dis] = h.pick(casos);
    const opts = h.choice3(ans, dis);
    if (!opts) return null;
    return {
      q: `¿Qué tipo de choque ocurre cuando ${caso}?`,
      options: opts.options,
      correct: opts.correct,
      explanation:
        ans === "Elástico"
          ? `En un choque elástico se conservan tanto el momento lineal como la energía cinética total, y los cuerpos se separan.`
          : `Cuando los cuerpos quedan unidos después del choque es perfectamente inelástico: se conserva el momento lineal, pero parte de la energía cinética se transforma en calor y deformación.`
    };
  }

  if (modo === "perfectamenteInelastico") {
    const m1 = h.pick([2, 3, 4, 5, 6]);
    const m2 = h.pick([2, 3, 4, 6]);
    const v1 = h.pick([4, 6, 8, 10, 12]);
    const p = m1 * v1;
    const v = p / (m1 + m2);
    if (!Number.isInteger(v * 100)) return null;
    const ans = Math.round(v * 100) / 100;
    const opts = h.choice3(`${fmt(ans)} m/s`, [`${fmt(v1)} m/s`, `${fmt(v1 / 2)} m/s`, `${fmt(p)} m/s`]);
    if (!opts) return null;
    return {
      q: `Un carrito de ${m1} kg que viaja a ${v1} m/s choca con otro de ${m2} kg que está en reposo y quedan unidos. ¿Con qué rapidez se mueven juntos?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Se conserva el momento lineal: m₁v₁ = (m₁+m₂)v → ${m1}×${v1} = ${fmt(p)} = ${m1 + m2}·v, así que v = ${fmt(p)} ÷ ${m1 + m2} = ${fmt(ans)} m/s.`
    };
  }

  const casos = [
    ["¿Qué se conserva SIEMPRE en cualquier choque, elástico o inelástico?", "El momento lineal total", ["La energía cinética total", "La velocidad de cada cuerpo"]],
    ["¿Qué distingue a un choque elástico de uno inelástico?", "En el elástico se conserva la energía cinética total", ["En el elástico se conserva el momento y en el inelástico no", "En el elástico los cuerpos quedan unidos"]],
    ["En un choque inelástico, ¿en qué se transforma la energía cinética que se pierde?", "En calor, sonido y deformación", ["En momento lineal", "En masa adicional"]]
  ];
  const [preg, ans, dis] = h.pick(casos);
  const opts = h.choice3(ans, dis);
  if (!opts) return null;
  return {
    q: preg,
    options: opts.options,
    correct: opts.correct,
    explanation: `El momento lineal se conserva en todo choque de un sistema aislado; la energía cinética total solo se conserva en los choques elásticos. Respuesta: ${ans.toLowerCase()}.`
  };
}

export function momentoLineal(h) {
  const modo = h.pick(["calcular", "comparar", "conservacion"]);

  if (modo === "calcular") {
    const m = h.int(2, 60);
    const v = h.pick([2, 3, 4, 5, 8, 10, 15, 20]);
    const p = m * v;
    const opts = h.choice3(`${fmt(p)} kg·m/s`, [`${fmt(m + v)} kg·m/s`, `${fmt(0.5 * m * v * v)} kg·m/s`, `${fmt(p / 2)} kg·m/s`]);
    if (!opts) return null;
    return {
      q: `¿Cuál es el momento lineal de un cuerpo de ${m} kg que se mueve a ${v} m/s?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `p = m·v = ${m} kg × ${v} m/s = ${fmt(p)} kg·m/s.`
    };
  }

  if (modo === "comparar") {
    const m1 = h.int(2, 10);
    const v1 = h.int(2, 12);
    const m2 = h.int(2, 10);
    const v2 = h.int(2, 12);
    const p1 = m1 * v1;
    const p2 = m2 * v2;
    if (p1 === p2) return null;
    const mayor = p1 > p2 ? "A" : "B";
    const opts = h.choice3(`El cuerpo ${mayor}`, [`El cuerpo ${mayor === "A" ? "B" : "A"}`, "Los dos tienen el mismo momento", "El que tiene mayor masa, sin importar la velocidad"]);
    if (!opts) return null;
    return {
      q: `El cuerpo A tiene masa ${m1} kg y velocidad ${v1} m/s; el cuerpo B, ${m2} kg y ${v2} m/s. ¿Cuál tiene mayor momento lineal?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `p = m·v. A: ${m1}×${v1} = ${fmt(p1)} kg·m/s. B: ${m2}×${v2} = ${fmt(p2)} kg·m/s. El mayor es el cuerpo ${mayor}.`
    };
  }

  const m1 = h.pick([1, 2, 3]);
  const m2 = h.pick([4, 6, 8, 10]);
  const v1 = h.pick([4, 6, 8, 12]);
  const v2 = (m1 * v1) / m2;
  if (!Number.isInteger(v2 * 100) || v2 === v1) return null;
  const ans = Math.round(v2 * 100) / 100;
  const opts = h.choice3(`${fmt(ans)} m/s`, [`${fmt(v1)} m/s`, `${fmt(m1 * v1)} m/s`, `${fmt(v1 * 2)} m/s`]);
  if (!opts) return null;
  return {
    q: `Dos patinadores están en reposo sobre hielo. Se empujan: el de ${m1} kg sale a ${v1} m/s. ¿Con qué rapidez sale el de ${m2} kg en sentido contrario?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `El momento total inicial es cero, así que m₁v₁ = m₂v₂: ${m1}×${v1} = ${m2}×v₂, de donde v₂ = ${fmt(m1 * v1)} ÷ ${m2} = ${fmt(ans)} m/s.`
  };
}

export function ondasElectromagneticas(h) {
  const modo = h.pick(["dispositivo", "calculo", "orden"]);

  if (modo === "dispositivo") {
    const casos = [
      ["el horno de microondas calienta la comida", "Microondas", ["Rayos X", "Ondas de radio", "Luz ultravioleta"]],
      ["el control remoto de la televisión envía la señal", "Infrarrojo", ["Ultravioleta", "Rayos gamma", "Microondas"]],
      ["una radiografía muestra los huesos", "Rayos X", ["Infrarrojo", "Microondas", "Ondas de radio"]],
      ["el wifi conecta la computadora a internet", "Microondas", ["Rayos X", "Infrarrojo", "Rayos gamma"]],
      ["el bloqueador solar protege la piel", "Ultravioleta", ["Infrarrojo", "Ondas de radio", "Microondas"]],
      ["una estación de FM transmite música", "Ondas de radio", ["Rayos X", "Ultravioleta", "Rayos gamma"]],
      ["una cámara térmica detecta el calor corporal", "Infrarrojo", ["Ultravioleta", "Rayos X", "Ondas de radio"]]
    ];
    const [uso, ans, dis] = h.pick(casos);
    const opts = h.choice3(ans, dis);
    if (!opts) return null;
    return {
      q: `¿Qué tipo de onda electromagnética se aprovecha cuando ${uso}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Ese uso corresponde a ${ans.toLowerCase()}. Todas son ondas electromagnéticas y viajan a 3×10⁸ m/s en el vacío; lo que cambia es su frecuencia y su energía.`
    };
  }

  if (modo === "calculo") {
    const lambda = h.pick([1, 2, 3, 5, 10, 100, 300]);
    const f = 3e8 / lambda;
    const enMHz = Math.round((f / 1e6) * 100) / 100;
    const opts = h.choice3(`${fmt(enMHz)} MHz`, [`${fmt(lambda * 3)} MHz`, `${fmt(enMHz * 2)} MHz`, `${fmt(enMHz / 2)} MHz`]);
    if (!opts) return null;
    return {
      q: `Una onda de radio tiene una longitud de onda de ${lambda} m. Con c = 3×10⁸ m/s, ¿cuál es su frecuencia?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `c = λ·f, así que f = c/λ = 3×10⁸ ÷ ${lambda} = ${fmt(f / 1e6)}×10⁶ Hz = ${fmt(enMHz)} MHz.`
    };
  }

  const tres = h.sample(ESPECTRO, 3);
  const niveles = tres.map((x) => x[1]);
  if (new Set(niveles).size !== 3) return null;
  const orden = tres.slice().sort((a, b) => a[1] - b[1]);
  const ans = orden.map((x) => x[0]).join(" → ");
  const inv = orden.slice().reverse().map((x) => x[0]).join(" → ");
  const mezcla = [orden[1], orden[0], orden[2]].map((x) => x[0]).join(" → ");
  const opts = h.choice3(ans, [inv, mezcla]);
  if (!opts) return null;
  return {
    q: `Ordena de MENOR a MAYOR frecuencia: ${tres.map((x) => x[0]).join(", ")}.`,
    options: opts.options,
    correct: opts.correct,
    explanation: `El espectro electromagnético va, de menor a mayor frecuencia: ondas de radio, microondas, infrarrojo, luz visible, ultravioleta, rayos X y rayos gamma. Por eso: ${ans}.`
  };
}

export function caidaLibre(h) {
  const modo = h.pick(["velocidad", "altura", "tiempo", "concepto"]);
  const g = 10;

  if (modo === "velocidad") {
    const t = h.int(1, 8);
    const v = g * t;
    const opts = h.choice3(`${fmt(v)} m/s`, [`${fmt(0.5 * g * t * t)} m/s`, `${fmt(t * t)} m/s`, `${fmt(v / 2)} m/s`]);
    if (!opts) return null;
    return {
      q: `Un objeto se deja caer desde el reposo. Con g = ${g} m/s² y sin resistencia del aire, ¿qué rapidez tiene a los ${t} segundos?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `v = g·t = ${g} × ${t} = ${fmt(v)} m/s.`
    };
  }

  if (modo === "altura") {
    const t = h.int(1, 6);
    const alt = 0.5 * g * t * t;
    const opts = h.choice3(`${fmt(alt)} m`, [`${fmt(g * t)} m`, `${fmt(alt * 2)} m`, `${fmt(g * t * t)} m`]);
    if (!opts) return null;
    return {
      q: `Un objeto cae libremente desde el reposo durante ${t} s. Con g = ${g} m/s², ¿qué distancia recorre?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `h = ½·g·t² = ½ × ${g} × ${t}² = ½ × ${g} × ${t * t} = ${fmt(alt)} m.`
    };
  }

  if (modo === "tiempo") {
    const t = h.int(1, 6);
    const alt = 0.5 * g * t * t;
    const opts = h.choice3(`${fmt(t)} s`, [`${fmt(alt / g)} s`, `${fmt(t * 2)} s`, `${fmt(Math.round((alt / 10) * 100) / 100)} s`]);
    if (!opts) return null;
    return {
      q: `Un objeto se deja caer desde ${fmt(alt)} m de altura. Con g = ${g} m/s², ¿cuánto tarda en llegar al suelo?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `De h = ½gt² se despeja t = √(2h/g) = √(2×${fmt(alt)}/${g}) = √${fmt((2 * alt) / g)} = ${fmt(t)} s.`
    };
  }

  const casos = [
    ["dos objetos de distinta masa se dejan caer al mismo tiempo en el vacío", "Llegan al suelo al mismo tiempo", ["Llega primero el más pesado", "Llega primero el más ligero"], "En caída libre la aceleración es la misma para todos los cuerpos (g), sin importar su masa. Solo la resistencia del aire hace la diferencia en la vida real."],
    ["un objeto cae libremente", "Su velocidad aumenta 10 m/s cada segundo", ["Su velocidad se mantiene constante", "Su aceleración aumenta con el tiempo"], "En caída libre la aceleración es constante (g ≈ 10 m/s²): lo que aumenta de forma uniforme es la velocidad, no la aceleración."],
    ["se lanza una pelota verticalmente hacia arriba, en el punto más alto", "Su velocidad es cero, pero su aceleración sigue siendo g", ["Su velocidad y su aceleración son cero", "Su aceleración cambia de sentido"], "En el punto más alto la pelota se detiene un instante (v = 0), pero la gravedad sigue actuando hacia abajo con g."]
  ];
  const [caso, ans, dis, why] = h.pick(casos);
  const opts = h.choice3(ans, dis);
  if (!opts) return null;
  return {
    q: `¿Qué ocurre cuando ${caso}?`,
    options: opts.options,
    correct: opts.correct,
    explanation: why
  };
}

/* ============================================================
   5.7 Herencia
   ============================================================ */

const RASGOS = [
  ["color café de ojos", "color azul de ojos", "C", "c"],
  ["pelo rizado", "pelo lacio", "R", "r"],
  ["flor púrpura", "flor blanca", "P", "p"],
  ["semilla lisa", "semilla rugosa", "L", "l"],
  ["planta alta", "planta enana", "A", "a"],
  ["capacidad de enrollar la lengua", "lengua sin enrollar", "E", "e"]
];

export function cuadrosPunnett(h) {
  const [dom, rec, D, r] = h.pick(RASGOS);
  const cruza = h.pick(["heteroXhetero", "heteroXrec", "homoXrec", "homoXhetero"]);

  if (cruza === "heteroXhetero") {
    const preg = h.pick([
      [`¿Qué porcentaje de la descendencia mostrará ${rec}?`, "25%", ["50%", "75%", "0%"], `Del cruce ${D}${r} × ${D}${r} salen ${D}${D}, ${D}${r}, ${r}${D} y ${r}${r}. Solo ${r}${r} (1 de 4 = 25%) muestra el rasgo recesivo.`],
      [`¿Qué porcentaje de la descendencia mostrará ${dom}?`, "75%", ["25%", "50%", "100%"], `Del cruce ${D}${r} × ${D}${r}, tres de cada cuatro (${D}${D}, ${D}${r}, ${r}${D}) tienen al menos un alelo dominante: 75%.`],
      [`¿Cuál es la proporción genotípica esperada?`, `1 ${D}${D} : 2 ${D}${r} : 1 ${r}${r}`, [`3 ${D}${D} : 1 ${r}${r}`, `1 ${D}${r} : 1 ${r}${r}`, `2 ${D}${D} : 2 ${r}${r}`], `El cuadro de Punnett de ${D}${r} × ${D}${r} da 1 ${D}${D}, 2 ${D}${r} y 1 ${r}${r}: la clásica proporción genotípica 1:2:1 (fenotípica 3:1).`],
      [`¿Qué porcentaje de la descendencia será heterocigota?`, "50%", ["25%", "75%", "100%"], `De las cuatro casillas de ${D}${r} × ${D}${r}, dos son ${D}${r}: 50% heterocigotas.`]
    ]);
    const opts = h.choice3(preg[1], preg[2]);
    if (!opts) return null;
    return {
      q: `Se cruzan dos organismos heterocigotos (${D}${r} × ${D}${r}) para el rasgo "${dom}", que es dominante sobre "${rec}". ${preg[0]}`,
      options: opts.options,
      correct: opts.correct,
      explanation: preg[3]
    };
  }

  if (cruza === "heteroXrec") {
    const preg = h.pick([
      [`¿Qué porcentaje mostrará ${rec}?`, "50%", ["25%", "75%", "100%"], `${D}${r} × ${r}${r} produce ${D}${r} y ${r}${r} en partes iguales: la mitad muestra el rasgo recesivo.`],
      [`¿Cuál es la proporción fenotípica esperada?`, `1 ${dom} : 1 ${rec}`, [`3 ${dom} : 1 ${rec}`, `todos ${dom}`, `todos ${rec}`], `Es un cruce de prueba: ${D}${r} × ${r}${r} da 50% ${D}${r} (${dom}) y 50% ${r}${r} (${rec}), es decir 1:1.`]
    ]);
    const opts = h.choice3(preg[1], preg[2]);
    if (!opts) return null;
    return {
      q: `Se cruza un heterocigoto (${D}${r}) con un homocigoto recesivo (${r}${r}) para el rasgo "${dom}", dominante sobre "${rec}". ${preg[0]}`,
      options: opts.options,
      correct: opts.correct,
      explanation: preg[3]
    };
  }

  if (cruza === "homoXrec") {
    const opts = h.choice3(`100% ${dom}, todos ${D}${r}`, [`50% ${dom} y 50% ${rec}`, `75% ${dom} y 25% ${rec}`, `100% ${rec}`]);
    if (!opts) return null;
    return {
      q: `Se cruza un homocigoto dominante (${D}${D}) con un homocigoto recesivo (${r}${r}) para el rasgo "${dom}". ¿Cómo será la primera generación?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Cada progenitor aporta un alelo: ${D} de uno y ${r} del otro. Toda la descendencia es ${D}${r}, heterocigota, y muestra el rasgo dominante "${dom}" (100%).`
    };
  }

  const opts = h.choice3("100%", ["75%", "50%", "25%"]);
  if (!opts) return null;
  return {
    q: `Se cruza un homocigoto dominante (${D}${D}) con un heterocigoto (${D}${r}) para el rasgo "${dom}". ¿Qué porcentaje de la descendencia mostrará el rasgo dominante?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Las combinaciones posibles son ${D}${D}, ${D}${r}, ${D}${D} y ${D}${r}: todas llevan al menos un alelo ${D}, así que el 100% muestra "${dom}" (aunque la mitad sean portadoras del alelo ${r}).`
  };
}

/* ============================================================
   Temas conceptuales con banco rotatorio
   ============================================================ */

const ORGANELOS = [
  ["mitocondria", "produce la mayor parte del ATP mediante la respiración celular"],
  ["ribosoma", "sintetiza las proteínas a partir del ARN mensajero"],
  ["cloroplasto", "realiza la fotosíntesis en las células vegetales"],
  ["núcleo", "guarda el material genético y dirige la actividad celular"],
  ["aparato de Golgi", "empaqueta, modifica y distribuye las proteínas"],
  ["lisosoma", "digiere desechos y material celular con enzimas"],
  ["retículo endoplásmico rugoso", "transporta proteínas y tiene ribosomas adheridos"],
  ["vacuola", "almacena agua, nutrientes y desechos, sobre todo en células vegetales"],
  ["membrana celular", "regula qué entra y qué sale de la célula"],
  ["pared celular", "da rigidez y protección en células vegetales, hongos y bacterias"]
];

export function organelos(h) {
  const [org, funcion] = h.pick(ORGANELOS);
  const otros = h.sample(ORGANELOS.filter((o) => o[0] !== org), 2);
  const preguntaPorFuncion = h.chance(0.5);

  if (preguntaPorFuncion) {
    const opts = h.choice3(org, otros.map((o) => o[0]));
    if (!opts) return null;
    return {
      q: `¿Qué organelo ${funcion}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `Es ${org === "núcleo" || org === "ribosoma" ? "el" : "la"} ${org}: ${funcion}.`
    };
  }
  const opts = h.choice3(funcion.charAt(0).toUpperCase() + funcion.slice(1), otros.map((o) => o[1].charAt(0).toUpperCase() + o[1].slice(1)));
  if (!opts) return null;
  return {
    q: `¿Cuál es la función principal de la estructura celular llamada "${org}"?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `La función del organelo "${org}" es que ${funcion}.`
  };
}

const NIVELES = ["átomo", "molécula", "organelo", "célula", "tejido", "órgano", "sistema", "organismo", "población", "comunidad", "ecosistema", "bioma", "biosfera"];

export function nivelesOrganizacion(h) {
  const i = h.int(1, NIVELES.length - 2);
  const modo = h.pick(["siguiente", "anterior", "orden"]);

  if (modo === "siguiente") {
    const ans = NIVELES[i + 1];
    const opts = h.choice3(ans, [NIVELES[i - 1], NIVELES[Math.min(i + 3, NIVELES.length - 1)], NIVELES[Math.max(0, i - 2)]]);
    if (!opts) return null;
    return {
      q: `En los niveles de organización biológica, ¿qué nivel sigue inmediatamente después de "${NIVELES[i]}"?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `El orden de menor a mayor complejidad es: ${NIVELES.join(" → ")}. Después de ${NIVELES[i]} viene ${ans}.`
    };
  }

  if (modo === "anterior") {
    const ans = NIVELES[i - 1];
    const opts = h.choice3(ans, [NIVELES[i + 1], NIVELES[Math.min(i + 2, NIVELES.length - 1)], NIVELES[Math.max(0, i - 3)]]);
    if (!opts) return null;
    return {
      q: `En los niveles de organización biológica, ¿qué nivel está inmediatamente ANTES de "${NIVELES[i]}"?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `El orden de menor a mayor complejidad es: ${NIVELES.join(" → ")}. Antes de ${NIVELES[i]} está ${ans}.`
    };
  }

  const tres = h.sample(NIVELES, 3);
  const idx = tres.map((t) => NIVELES.indexOf(t));
  if (new Set(idx).size !== 3) return null;
  const orden = tres.slice().sort((a, b) => NIVELES.indexOf(a) - NIVELES.indexOf(b));
  const ans = orden.join(" → ");
  const opts = h.choice3(ans, [orden.slice().reverse().join(" → "), [orden[1], orden[0], orden[2]].join(" → ")]);
  if (!opts) return null;
  return {
    q: `Ordena del nivel más simple al más complejo: ${tres.join(", ")}.`,
    options: opts.options,
    correct: opts.correct,
    explanation: `El orden completo es: ${NIVELES.join(" → ")}. Por eso la secuencia correcta es ${ans}.`
  };
}

const TROFICOS = [
  ["productor", "elabora su propio alimento mediante la fotosíntesis", ["una planta de maíz", "el pasto", "un alga"]],
  ["consumidor primario", "se alimenta directamente de los productores", ["un conejo", "un saltamontes", "una vaca"]],
  ["consumidor secundario", "se alimenta de los consumidores primarios", ["una rana que come insectos", "una serpiente que come ratones", "un pájaro insectívoro"]],
  ["consumidor terciario", "se alimenta de consumidores secundarios y suele estar en la cima de la cadena", ["un águila", "un puma", "un tiburón"]],
  ["descomponedor", "degrada la materia orgánica muerta y devuelve nutrientes al suelo", ["un hongo", "una bacteria del suelo", "el moho"]]
];

export function redesTroficas(h) {
  const [nivel, definicion, ejemplos] = h.pick(TROFICOS);
  const otros = h.sample(TROFICOS.filter((t) => t[0] !== nivel), 2);
  const porEjemplo = h.chance(0.5);

  if (porEjemplo) {
    const ej = h.pick(ejemplos);
    const opts = h.choice3(nivel.charAt(0).toUpperCase() + nivel.slice(1), otros.map((o) => o[0].charAt(0).toUpperCase() + o[0].slice(1)));
    if (!opts) return null;
    return {
      q: `En una red trófica, ¿qué nivel ocupa ${ej}?`,
      options: opts.options,
      correct: opts.correct,
      explanation: `${ej.charAt(0).toUpperCase() + ej.slice(1)} es un ${nivel}: ${definicion}.`
    };
  }
  const opts = h.choice3(nivel.charAt(0).toUpperCase() + nivel.slice(1), otros.map((o) => o[0].charAt(0).toUpperCase() + o[0].slice(1)));
  if (!opts) return null;
  return {
    q: `¿Qué nivel trófico ${definicion}?`,
    options: opts.options,
    correct: opts.correct,
    explanation: `Es el ${nivel}: ${definicion}. Ejemplo típico: ${ejemplos[0]}.`
  };
}

export const SCIENCE_GENERATORS = {
  "5.1.3": [conservacionMateria],
  "5.1.4": [escalasTermometricas],
  "5.1.5": [leyCoulomb],
  "5.2.1": [luzVisible],
  "5.2.2": [calorEspecifico],
  "5.2.4": [energiaCineticaPotencial],
  "5.3.3": [redesTroficas],
  "5.4.1": [masaMolar],
  "5.5.1": [choques],
  "5.5.2": [momentoLineal],
  "5.5.3": [ondasElectromagneticas],
  "5.5.4": [caidaLibre],
  "5.6.1": [organelos],
  "5.6.2": [nivelesOrganizacion],
  "5.7.3": [cuadrosPunnett]
};
