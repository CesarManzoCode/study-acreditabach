/* ============================================================
   ¿Este reactivo se resuelve con calculadora?

   El ACREDITA-BACH permite calculadora científica no programable. Aquí se
   decide cuándo ofrecerla dentro de la pregunta: solo en los temas donde
   realmente se opera con números (matemáticas, física y química), y solo
   si el reactivo tiene datos numéricos que valga la pena calcular.

   Un reactivo conceptual ("¿qué tipo de variable es el color de cabello?")
   no muestra la calculadora aunque sea del área 1.
   ============================================================ */

/* Áreas donde el cálculo es la norma. */
const QUANT_AREAS = new Set([1]);

/* Temas cuantitativos fuera del área 1 (física y química del área 5, y las
   conversiones de unidades de almacenamiento del área 2). */
const QUANT_TOPICS = new Set([
  // Área 5 · física
  "5.1.4", // escalas termométricas
  "5.1.5", // ley de Coulomb
  "5.2.1", // luz visible (frecuencia y longitud de onda)
  "5.2.2", // calor específico
  "5.2.4", // energía cinética y potencial
  "5.2.5", // leyes de la termodinámica (eficiencia)
  "5.5.1", // choques
  "5.5.2", // momento lineal
  "5.5.3", // ondas electromagnéticas
  "5.5.4", // caída libre
  // Área 5 · química
  "5.1.3", // conservación de la materia
  "5.4.1", // masa molar
  "5.4.2", // tipos de reacciones (balanceo)
  "5.4.3", // reacciones nucleares
  // Área 5 · biología con proporciones
  "5.3.5", // productividad de un ecosistema
  "5.7.3", // cuadros de Punnett
  // Área 2 · fórmulas de la hoja de cálculo
  "2.3.1"
]);

/** Temas donde la calculadora tiene sentido, independientemente del reactivo. */
export function isQuantTopic(topic) {
  if (!topic) return false;
  if (QUANT_TOPICS.has(topic.id)) return true;
  return QUANT_AREAS.has(topic.area);
}

/* Números con dos o más cifras, decimales, fracciones, potencias o unidades:
   señales de que hay algo que operar y no solo un dato suelto. */
const NUMBER = /-?\d+(?:[.,]\d+)?/g;
const OPERACION = /[+\-×÷*/^=√%]|\b(?:por ciento|entre|elevado|raíz|promedio|suma|resta|producto|cociente)\b/i;

function countNumbers(text) {
  const m = String(text || "").match(NUMBER);
  return m ? m.length : 0;
}

/**
 * ¿Conviene mostrar la calculadora en este reactivo?
 * @param {object} topic tema al que pertenece
 * @param {object} question reactivo {q, options, explanation}
 */
export function needsCalculator(topic, question) {
  if (!isQuantTopic(topic) || !question) return false;

  const enunciado = String(question.q || "");
  const opciones = (question.options || []).join(" · ");

  const numsEnunciado = countNumbers(enunciado);
  const numsOpciones = countNumbers(opciones);

  // Con dos o más datos en el enunciado casi siempre hay que operar.
  if (numsEnunciado >= 2) return true;
  // Un dato en el enunciado y respuestas numéricas: también se calcula.
  if (numsEnunciado >= 1 && numsOpciones >= 2) return true;
  // Enunciado con símbolos de operación explícitos.
  if (numsEnunciado >= 1 && OPERACION.test(enunciado)) return true;

  return false;
}
