/* Refuerzo del área 1 · Pensamiento matemático

   Dos cosas que faltaban:

   1. FORMATO. La guía (p. 26) dice que el examen usa cuatro formatos y el
      banco era 94 % cuestionamiento directo. Aquí entran reactivos de
      relación de elementos y de jerarquización para los temas cuya
      orientación enumera varios elementos que hay que discriminar.

   2. HUECOS. Al podar lo que estaba fuera de orientación quedaron temas sin
      cobertura de lo que sí se evalúa. El caso peor era 1.4.3: la orientación
      pide la razón de una SUCESIÓN y el paquete solo traía regla de tres.

   Solo llevan `quiz`: no introducen conceptos nuevos, replantean con otro
   formato lo que la nota base del tema ya explica. */

const AREA1_REFUERZO = {
  // Guía: "Reconocimiento de variables cuantitativas, cualitativas y categóricas."
  "1.1.1": {
    quiz: [
      {
        q: "Relacione cada variable con el tipo que le corresponde.\n**Variable:** 1. Número de hermanos · 2. Estatura en metros · 3. Color de los ojos\n**Tipo:** a) Cualitativa o categórica · b) Cuantitativa discreta · c) Cuantitativa continua",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El número de hermanos (1) se cuenta con enteros, así que es cuantitativa discreta (b). La estatura (2) admite decimales, así que es cuantitativa continua (c). El color de ojos (3) describe una cualidad, no una cantidad: es cualitativa o categórica (a)."
      },
      {
        q: "Relacione cada dato de un censo con el tipo de variable.\n**Dato:** 1. Personas que habitan la vivienda · 2. Material del techo · 3. Metros cuadrados de construcción\n**Tipo:** a) Cuantitativa continua · b) Cuantitativa discreta · c) Categórica",
        options: ["1b, 2c, 3a", "1a, 2c, 3b", "1c, 2b, 3a"],
        correct: 0,
        explanation: "Las personas por vivienda (1) se cuentan una por una: discreta (b). El material del techo (2) es una categoría (c). Los metros cuadrados (3) se miden y admiten decimales: continua (a)."
      }
    ]
  },

  // Guía: "Identificación de muestreos sistemáticos, estratificados y por
  // conglomerados en ejemplos de recolección de datos."
  "1.1.2": {
    quiz: [
      {
        q: "Relacione cada procedimiento con el tipo de muestreo que emplea.\n**Procedimiento:** 1. De una lista de 2 000 clientes se encuesta a uno de cada 20 · 2. Se eligen al azar 5 colonias y se encuesta a todos sus habitantes · 3. Se divide a los alumnos por grado y se toma una parte proporcional de cada grado\n**Muestreo:** a) Estratificado · b) Sistemático · c) Por conglomerados",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Elegir uno de cada 20 (1) es a intervalos fijos: sistemático (b). Elegir colonias completas al azar (2) es por conglomerados (c). Dividir por grado y tomar parte de cada uno (3) es estratificado (a)."
      },
      {
        q: "Un investigador quiere estudiar a los estudiantes de bachillerato de un estado. Selecciona al azar 12 planteles de la lista oficial y aplica el cuestionario a TODOS los alumnos de esos planteles. ¿Qué tipo de muestreo aplicó?",
        options: ["Por conglomerados", "Estratificado", "Sistemático"],
        correct: 0,
        explanation: "El muestreo por conglomerados elige al azar grupos completos que ya existen —planteles, colonias, manzanas— y estudia a todos sus integrantes. No se toma una parte de cada grupo, como en el estratificado, ni se avanza a intervalos fijos, como en el sistemático."
      },
      {
        q: "¿Qué diferencia al muestreo por conglomerados del estratificado?",
        options: [
          "En conglomerados se eligen grupos completos al azar; en estratificado se toma una parte de cada grupo",
          "En conglomerados se avanza a intervalos fijos; en estratificado se sortea",
          "En conglomerados la muestra siempre es más grande"
        ],
        correct: 0,
        explanation: "Los dos parten de grupos, y ahí está la confusión. En el estratificado entran TODOS los grupos, pero solo una parte de cada uno. En el de conglomerados entran SOLO algunos grupos, pero completos."
      }
    ]
  },

  // Guía: "Cálculo de la media, la mediana y la moda."
  "1.1.3": {
    quiz: [
      {
        q: "Relacione cada medida de tendencia central con la forma de calcularla.\n**Medida:** 1. Media · 2. Mediana · 3. Moda\n**Cálculo:** a) El valor que más se repite · b) La suma de los datos entre el número de datos · c) El valor central al ordenar los datos de menor a mayor",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La media (1) es la suma entre el número de datos (b). La mediana (2) es el valor de en medio con los datos ordenados (c). La moda (3) es el valor más frecuente (a)."
      }
    ]
  },

  // Guía: "Identificación de la razón aritmética o geométrica correspondiente
  // a una SUCESIÓN numérica."  ← el paquete anterior solo traía regla de tres.
  "1.4.3": {
    quiz: [
      {
        q: "¿Cuál es la razón de la sucesión 7, 12, 17, 22, 27…?",
        options: ["Aritmética, de razón 5", "Geométrica, de razón 5", "Aritmética, de razón 7"],
        correct: 0,
        explanation: "Cada término se obtiene sumando siempre la misma cantidad: 12 − 7 = 5, 17 − 12 = 5. Como se suma, la sucesión es aritmética y su razón es 5."
      },
      {
        q: "¿Cuál es la razón de la sucesión 2, 6, 18, 54, 162…?",
        options: ["Geométrica, de razón 3", "Aritmética, de razón 4", "Geométrica, de razón 2"],
        correct: 0,
        explanation: "Cada término se obtiene multiplicando por la misma cantidad: 6 ÷ 2 = 3, 18 ÷ 6 = 3. Como se multiplica, la sucesión es geométrica y su razón es 3."
      },
      {
        q: "Relacione cada sucesión con su razón.\n**Sucesión:** 1. 3, 9, 27, 81 · 2. 40, 34, 28, 22 · 3. 5, 10, 15, 20\n**Razón:** a) Aritmética, −6 · b) Aritmética, 5 · c) Geométrica, 3",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "En 3, 9, 27, 81 (1) cada término se multiplica por 3: geométrica de razón 3 (c). En 40, 34, 28, 22 (2) se resta 6 cada vez: aritmética de razón −6 (a). En 5, 10, 15, 20 (3) se suma 5: aritmética de razón 5 (b)."
      },
      {
        q: "En la sucesión 100, 50, 25, 12.5… ¿cuál es la razón?",
        options: ["Geométrica, de razón 0.5", "Aritmética, de razón −50", "Geométrica, de razón 2"],
        correct: 0,
        explanation: "50 ÷ 100 = 0.5 y 25 ÷ 50 = 0.5: cada término es la mitad del anterior. Es geométrica de razón 0.5. No es aritmética porque la diferencia no es constante (−50, luego −25, luego −12.5)."
      },
      {
        q: "Ordene los pasos para determinar si una sucesión es aritmética o geométrica.\n1. Si la diferencia es constante, es aritmética y esa diferencia es la razón\n2. Restar a cada término el anterior\n3. Si no lo es, dividir cada término entre el anterior\n4. Si el cociente es constante, es geométrica y ese cociente es la razón",
        options: ["2, 1, 3, 4", "1, 2, 3, 4", "3, 4, 2, 1"],
        correct: 0,
        explanation: "Primero se resta (2) porque la aritmética es la más simple de descartar. Si la diferencia se repite, ya está (1). Si no, se divide (3) y se revisa si el cociente se repite (4)."
      }
    ]
  },

  // Guía: "Cálculo del área de triángulos y trapecios."
  "1.5.1": {
    quiz: [
      {
        q: "Un trapecio tiene bases de 18 cm y 10 cm y una altura de 6 cm. ¿Cuál es su área?",
        options: ["84 cm²", "108 cm²", "168 cm²"],
        correct: 0,
        explanation: "Área del trapecio = ((base mayor + base menor) ÷ 2) × altura = ((18 + 10) ÷ 2) × 6 = 14 × 6 = 84 cm²."
      },
      {
        q: "Un triángulo tiene una base de 16 m y una altura de 7.5 m. ¿Cuál es su área?",
        options: ["60 m²", "120 m²", "30 m²"],
        correct: 0,
        explanation: "Área del triángulo = (base × altura) ÷ 2 = (16 × 7.5) ÷ 2 = 120 ÷ 2 = 60 m²."
      },
      {
        q: "Un terreno en forma de trapecio tiene un área de 90 m², una altura de 9 m y una base menor de 8 m. ¿Cuánto mide su base mayor?",
        options: ["12 m", "10 m", "14 m"],
        correct: 0,
        explanation: "De 90 = ((B + 8) ÷ 2) × 9 se despeja: 90 ÷ 9 = 10, así que (B + 8) ÷ 2 = 10, entonces B + 8 = 20 y B = 12 m."
      },
      {
        q: "Relacione cada figura con la fórmula de su área.\n**Figura:** 1. Triángulo · 2. Trapecio\n**Fórmula:** a) ((base mayor + base menor) ÷ 2) × altura · b) (base × altura) ÷ 2",
        options: ["1b, 2a", "1a, 2b", "1b, 2b"],
        correct: 0,
        explanation: "El triángulo (1) se divide entre 2 porque es medio rectángulo: (base × altura) ÷ 2 (b). El trapecio (2) promedia sus dos bases antes de multiplicar por la altura (a)."
      },
      {
        q: "En un triángulo cuya base mide 12 cm, ¿qué medida se necesita además para calcular su área?",
        options: [
          "La altura, medida perpendicular a esa base",
          "La longitud del lado inclinado más largo",
          "El perímetro completo"
        ],
        correct: 0,
        explanation: "La altura es la distancia perpendicular (a 90°) entre la base y el vértice opuesto. Confundirla con el lado inclinado es el error más frecuente del tema: el lado inclinado siempre es más largo que la altura y da un área mayor a la real."
      }
    ]
  },

  // Guía: "Interpretación de gráficas de funciones para determinar sus valores
  // máximos y mínimos, así como su concavidad y su comportamiento creciente o
  // decreciente."
  "1.6.2": {
    quiz: [
      {
        q: "Relacione cada comportamiento de una gráfica con lo que se observa en ella.\n**Comportamiento:** 1. Creciente · 2. Decreciente · 3. Cóncava hacia arriba\n**Se observa:** a) La curva abre como un tazón y su pendiente aumenta · b) Al avanzar hacia la derecha, la curva sube · c) Al avanzar hacia la derecha, la curva baja",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Creciente (1) es que al moverse a la derecha la curva sube (b). Decreciente (2) es que baja (c). Cóncava hacia arriba (3) es la forma de tazón, con la pendiente en aumento (a)."
      }
    ]
  }
};
