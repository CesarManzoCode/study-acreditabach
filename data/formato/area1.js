/* Reactivos con FIGURA para el área 1.

   La guía es explícita en dos temas y la app los planteaba solo con palabras:

   · 1.6.1 «Identificación de la desigualdad correspondiente a un intervalo
     representado EN UNA GRÁFICA». Sin recta numérica dibujada no se practica
     la tarea que pide el examen, se practica otra.
   · 1.6.2 «Interpretación de GRÁFICAS de funciones para determinar sus valores
     máximos y mínimos, así como su concavidad y su comportamiento creciente o
     decreciente». Lo mismo: hay que ver la curva.

   Se añade también 1.5.4, área de figuras en el plano cartesiano, porque la
   orientación habla del plano y leerlo dibujado es justo la dificultad.

   Solo llevan `quiz`: no introducen conceptos nuevos, replantean con la figura
   lo que la nota base del tema ya explica. */

const AREA1_FORMATO = {
  "1.6.1": {
    quiz: [
      {
        q: "¿Qué desigualdad corresponde al intervalo representado en la recta?",
        figura: { tipo: "recta", min: -5, max: 5, a: -2, b: 3, abiertoA: false, abiertoB: true },
        options: ["−2 ≤ x < 3", "−2 < x ≤ 3", "−2 < x < 3"],
        correct: 0,
        explanation: "El punto **relleno** en −2 significa que ese valor SÍ entra (≤ o ≥); el punto **hueco** en 3 significa que no entra (< o >). Como el segmento va de −2 incluido hasta 3 excluido: −2 ≤ x < 3."
      },
      {
        q: "¿Qué desigualdad corresponde al intervalo representado en la recta?",
        figura: { tipo: "recta", min: -5, max: 5, a: 1, b: 4, abiertoA: true, abiertoB: false },
        options: ["1 < x ≤ 4", "1 ≤ x ≤ 4", "1 ≤ x < 4"],
        correct: 0,
        explanation: "En 1 el círculo está hueco, así que el 1 queda fuera: 1 < x. En 4 el círculo está relleno, así que el 4 entra: x ≤ 4. Juntos: 1 < x ≤ 4."
      },
      {
        q: "¿Qué desigualdad corresponde al intervalo representado en la recta?",
        figura: { tipo: "recta", min: -6, max: 6, a: -6, b: 2, abiertoB: true, infinito: "izq" },
        options: ["x < 2", "x ≤ 2", "x > 2"],
        correct: 0,
        explanation: "La línea se extiende sin fin hacia la izquierda y termina en un círculo hueco sobre el 2: todos los valores menores que 2, sin incluirlo. En notación de intervalo sería (−∞, 2)."
      },
      {
        q: "¿Qué intervalo, en notación de intervalos, corresponde a la gráfica?",
        figura: { tipo: "recta", min: -5, max: 5, a: -1, b: 4, abiertoA: false, abiertoB: false },
        options: ["[−1, 4]", "(−1, 4)", "(−1, 4]"],
        correct: 0,
        explanation: "Los dos extremos están rellenos, así que ambos se incluyen. El corchete cuadrado [ ] incluye el extremo y el paréntesis ( ) lo excluye: [−1, 4]."
      }
    ]
  },

  "1.6.2": {
    quiz: [
      {
        q: "Observa la gráfica. ¿Qué se puede afirmar de la función?",
        figura: {
          tipo: "plano", xmin: -5, xmax: 5, ymin: -5, ymax: 5,
          puntos: [[-3, 4], [-2, 1], [-1.5, -0.25], [-1, -1], [0, -1.5], [1, -1], [1.5, -0.25], [2, 1], [3, 4]],
          marcas: [{ x: 0, y: -1.5, txt: "mínimo" }],
          caption: "Gráfica de la función"
        },
        options: [
          "Tiene un mínimo en x = 0 y su concavidad es hacia arriba",
          "Tiene un máximo en x = 0 y su concavidad es hacia abajo",
          "Es creciente en todo su dominio"
        ],
        correct: 0,
        explanation: "La curva baja hasta x = 0 y a partir de ahí sube: ese punto más bajo es el **mínimo**. Como la parábola abre hacia arriba, la concavidad es hacia arriba. Una función así es decreciente antes del mínimo y creciente después."
      },
      {
        q: "Observa la gráfica. ¿En qué intervalo es DECRECIENTE la función?",
        figura: {
          tipo: "plano", xmin: -5, xmax: 5, ymin: -5, ymax: 5,
          puntos: [[-3, -4], [-2, -1], [-1, 1], [0, 2], [1, 1], [2, -1], [3, -4]],
          marcas: [{ x: 0, y: 2, txt: "máximo" }],
          caption: "Gráfica de la función"
        },
        options: ["De x = 0 en adelante", "De x = −3 a x = 0", "En todo su dominio"],
        correct: 0,
        explanation: "Una función es decreciente donde, al avanzar hacia la derecha, la curva **baja**. Aquí sube hasta el máximo en x = 0 y desde ahí desciende: es creciente antes de 0 y decreciente después."
      },
      {
        q: "Observa la gráfica. ¿Cuál es su valor máximo y qué concavidad tiene?",
        figura: {
          tipo: "plano", xmin: -5, xmax: 5, ymin: -5, ymax: 5,
          puntos: [[-2, -3], [-1, 1], [-0.5, 2.25], [0, 3], [0.5, 2.25], [1, 1], [2, -3]],
          caption: "Gráfica de la función"
        },
        options: ["Máximo y = 3, concavidad hacia abajo", "Máximo y = 0, concavidad hacia arriba", "No tiene máximo"],
        correct: 0,
        explanation: "El punto más alto de la curva está en y = 3 (cuando x = 0): ese es el valor máximo. La parábola abre hacia abajo, así que su concavidad es hacia abajo. Ojo: el máximo es el valor de **y**, no el de x."
      },
      {
        q: "Observa la gráfica. ¿Qué tipo de comportamiento muestra?",
        figura: {
          tipo: "plano", xmin: -5, xmax: 5, ymin: -5, ymax: 5,
          puntos: [[-4, -4], [-2, -2.5], [0, -1], [2, 0.5], [4, 2]],
          caption: "Gráfica de la función"
        },
        options: [
          "Creciente en todo su dominio, sin máximos ni mínimos",
          "Decreciente, con un mínimo en x = 0",
          "Creciente y luego decreciente"
        ],
        correct: 0,
        explanation: "Es una recta con pendiente positiva: al avanzar hacia la derecha, la curva sube siempre. No cambia de dirección en ningún punto, así que no tiene máximos ni mínimos locales."
      }
    ]
  },

  "1.5.4": {
    quiz: [
      {
        q: "Observa el triángulo rectángulo dibujado en el plano. ¿Cuál es su área?",
        figura: {
          tipo: "plano", xmin: -1, xmax: 7, ymin: -1, ymax: 7,
          puntos: [[1, 1], [5, 1], [1, 4], [1, 1]],
          marcas: [{ x: 1, y: 1, txt: "(1,1)" }, { x: 5, y: 1, txt: "(5,1)" }, { x: 1, y: 4, txt: "(1,4)" }],
          caption: "Triángulo en el plano cartesiano"
        },
        options: ["6 u²", "12 u²", "7 u²"],
        correct: 0,
        explanation: "La base va de (1,1) a (5,1): mide 5 − 1 = 4. La altura va de (1,1) a (1,4): mide 4 − 1 = 3. Área = base × altura ÷ 2 = 4 × 3 ÷ 2 = **6 u²**. Cuando los catetos son paralelos a los ejes, se cuentan restando coordenadas."
      },
      {
        q: "Observa el cuadrado dibujado en el plano. ¿Cuál es su área?",
        figura: {
          tipo: "plano", xmin: -1, xmax: 7, ymin: -1, ymax: 7,
          puntos: [[2, 2], [5, 2], [5, 5], [2, 5], [2, 2]],
          marcas: [{ x: 2, y: 2, txt: "(2,2)" }, { x: 5, y: 5, txt: "(5,5)" }],
          caption: "Cuadrado en el plano cartesiano"
        },
        options: ["9 u²", "12 u²", "6 u²"],
        correct: 0,
        explanation: "El lado va de x = 2 a x = 5, así que mide 3. El área de un cuadrado es lado × lado = 3 × 3 = **9 u²**. Cuidado con la opción 12: ese es el perímetro (4 × 3), que es lo que se responde por error cuando se lee rápido el enunciado."
      }
    ]
  }
};
