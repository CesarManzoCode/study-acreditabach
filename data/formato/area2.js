/* Reactivos con los formatos que la guía oficial marca para estos temas
   (Ceneval, junio 2026, p. 26): relación de elementos y jerarquización u
   ordenamiento. El banco de la app era casi todo cuestionamiento directo,
   así que estos formatos casi no se practicaban aunque el examen los usa.

   Solo llevan `quiz`: no agregan conceptos nuevos, ponen a prueba con otro
   formato lo que ya explica la nota base del tema. */

const AREA2_FORMATO = {
  // Guía: "Relación de herramientas digitales de uso colaborativo o de
  // aprendizaje con las funciones que les corresponden."
  "2.2.3": {
    quiz: [
      {
        q: "Relacione cada herramienta digital con su función principal.\n**Herramienta:** 1. Kahoot · 2. Google Drive · 3. Canva\n**Función:** a) Diseñar carteles, gráficos e infografías · b) Crear cuestionarios y juegos interactivos para evaluar en tiempo real · c) Almacenar y compartir archivos en la nube",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Kahoot (1) sirve para crear cuestionarios y juegos interactivos de evaluación en tiempo real (b). Google Drive (2) almacena y comparte archivos en la nube (c). Canva (3) se usa para diseñar carteles, gráficos e infografías (a)."
      },
      {
        q: "Relacione cada situación con la herramienta digital adecuada.\n**Situación:** 1. Un equipo redacta un informe al mismo tiempo desde casas distintas · 2. Una maestra quiere una presentación con animaciones e interacción · 3. Un grupo debe reunirse a distancia para discutir un proyecto\n**Herramienta:** a) Zoom · b) Google Docs · c) Genially",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2b, 3a"],
        correct: 0,
        explanation: "Google Docs (b) permite la edición colaborativa simultánea de un texto (1). Genially (c) crea presentaciones dinámicas e interactivas (2). Zoom (a) es para videollamadas y reuniones a distancia (3)."
      }
    ]
  },

  // Guía: "Relación de conceptos de dato, variable, constante, expresión,
  // operador lógico, operador relacional, operador aritmético, estructura
  // repetitiva y estructura selectiva con sus definiciones correspondientes."
  "2.4.1": {
    quiz: [
      {
        q: "Relacione cada concepto del lenguaje algorítmico con su definición.\n**Concepto:** 1. Estructura selectiva · 2. Operador relacional · 3. Operador lógico\n**Definición:** a) Símbolo que compara dos valores y devuelve verdadero o falso · b) Palabra que combina condiciones para formar una condición compuesta · c) Instrucción que elige por cuál camino sigue el algoritmo según una condición",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "La estructura selectiva (1) decide por cuál alternativa sigue el flujo según el resultado de evaluar una condición (c). El operador relacional (2) compara valores y da un resultado booleano (a). El operador lógico (3) combina condiciones en una condición compuesta (b)."
      },
      {
        q: "Relacione cada concepto con el ejemplo que le corresponde.\n**Concepto:** 1. Constante · 2. Variable · 3. Expresión · 4. Estructura repetitiva\n**Ejemplo:** a) edad = 15, y más adelante edad = 16 · b) mientras contador < 10, repetir · c) PI = 3.1416 · d) a + b × 2",
        options: ["1c, 2a, 3d, 4b", "1a, 2c, 3b, 4d", "1c, 2d, 3a, 4b"],
        correct: 0,
        explanation: "La constante (1) no cambia durante el algoritmo, como PI = 3.1416 (c). La variable (2) guarda un valor que puede cambiar (a). La expresión (3) combina valores y operadores para producir un resultado (d). La estructura repetitiva (4) repite un bloque mientras se cumpla una condición (b)."
      }
    ]
  },

  // Guía: "Organización de los pasos de un algoritmo para la resolución de un
  // problema."
  "2.4.2": {
    quiz: [
      {
        q: "Ordene los pasos del algoritmo que calcula el área de un rectángulo.\n1. Mostrar «área»\n2. Multiplicar base por altura y guardar en «área»\n3. Leer la base y la altura",
        options: ["3, 2, 1", "1, 3, 2", "2, 3, 1"],
        correct: 0,
        explanation: "Todo algoritmo sigue el orden entrada → proceso → salida: primero se leen los datos (3), después se hace el cálculo (2) y al final se muestra el resultado (1)."
      },
      {
        q: "Ordene los pasos del algoritmo que decide si una persona es mayor de edad.\n1. Si la edad es mayor o igual a 18, mostrar «es mayor de edad»; si no, mostrar «es menor de edad»\n2. Leer la edad\n3. Inicio\n4. Fin",
        options: ["3, 2, 1, 4", "3, 1, 2, 4", "2, 3, 1, 4"],
        correct: 0,
        explanation: "El algoritmo abre con el inicio (3), captura el dato de entrada (2), evalúa la condición y muestra el resultado (1), y cierra con el fin (4)."
      }
    ]
  },

  /* Guía 2.3.2: "Identificación de los ICONOS para insertar tablas, ajustar
     márgenes y dividir texto en software de procesamiento de texto."
     El examen muestra los iconos impresos; aquí van dibujados. Son esquemas:
     conservan la forma con la que se reconocen en cualquier cinta de
     opciones, sin reproducir la marca de ningún programa. */
  "2.3.2": {
    quiz: [
      {
        q: "¿Cuál de estos iconos sirve para INSERTAR UNA TABLA en un documento?",
        figura: { tipo: "iconos", items: ["margenes", "tabla", "columnas"] },
        options: ["El B", "El A", "El C"],
        correct: 0,
        explanation: "El icono de tabla es una cuadrícula: un rectángulo dividido en filas y columnas. El A, con la hoja y el marco punteado por dentro, es el de márgenes; el C, con dos bloques de texto lado a lado, es el de columnas."
      },
      {
        q: "¿Cuál de estos iconos AJUSTA LOS MÁRGENES de la página?",
        figura: { tipo: "iconos", items: ["tabla", "saltoPagina", "margenes"] },
        options: ["El C", "El A", "El B"],
        correct: 0,
        explanation: "El icono de márgenes representa la hoja completa con un marco punteado dentro: ese marco es el área de texto y lo que queda fuera es el margen. El A es insertar tabla y el B, con la línea punteada entre dos hojas, es salto de página."
      },
      {
        q: "¿Cuál de estos iconos DIVIDE EL TEXTO EN COLUMNAS?",
        figura: { tipo: "iconos", items: ["vinetas", "columnas", "interlineado"] },
        options: ["El B", "El A", "El C"],
        correct: 0,
        explanation: "El icono de columnas muestra dos bloques verticales de texto uno junto al otro. El A, con puntos y renglones, es viñetas; el C, con flechas verticales junto a los renglones, es interlineado."
      },
      {
        q: "Relacione cada icono con la función que realiza en un procesador de texto.",
        figura: { tipo: "iconos", items: ["tabla", "vinetas", "saltoPagina"], etiquetas: ["1", "2", "3"] },
        options: ["1 insertar tabla, 2 viñetas, 3 salto de página", "1 viñetas, 2 salto de página, 3 insertar tabla", "1 salto de página, 2 insertar tabla, 3 viñetas"],
        correct: 0,
        explanation: "La cuadrícula (1) inserta una tabla. Los puntos con renglones al lado (2) aplican viñetas a una lista. Las dos hojas separadas por una línea punteada (3) insertan un salto de página."
      }
    ]
  },

  /* Guía 2.3.3: "Identificación de los ICONOS para insertar gráficos, tablas,
     cuestionarios o imágenes de WordArt en software de presentaciones
     electrónicas." */
  "2.3.3": {
    quiz: [
      {
        q: "En un software de presentaciones, ¿cuál de estos iconos INSERTA UN GRÁFICO?",
        figura: { tipo: "iconos", items: ["imagen", "grafico", "tabla"] },
        options: ["El B", "El A", "El C"],
        correct: 0,
        explanation: "El icono de gráfico muestra barras de distinta altura sobre unos ejes. El A, con el marco, el sol y las montañas, inserta una imagen; el C, la cuadrícula, inserta una tabla."
      },
      {
        q: "¿Cuál de estos iconos inserta un texto decorativo tipo WORDART?",
        figura: { tipo: "iconos", items: ["grafico", "wordart", "hipervinculo"] },
        options: ["El B", "El A", "El C"],
        correct: 0,
        explanation: "El icono de WordArt es una letra grande —normalmente una A— con un efecto curvo o de sombra debajo: lo que anuncia es texto con estilo gráfico. El C, con los dos eslabones, inserta un hipervínculo."
      },
      {
        q: "¿Cuál de estos iconos corresponde a insertar un CUESTIONARIO o formulario de preguntas?",
        figura: { tipo: "iconos", items: ["cuestionario", "tabla", "transicion"] },
        options: ["El A", "El B", "El C"],
        correct: 0,
        explanation: "El icono de cuestionario muestra una hoja con opciones marcables: círculos a la izquierda y renglones a la derecha, como una lista de preguntas de opción múltiple. El C, con dos diapositivas y una flecha entre ellas, es el de transición."
      },
      {
        q: "Relacione cada icono con lo que inserta en una presentación.",
        figura: { tipo: "iconos", items: ["wordart", "imagen", "grafico"], etiquetas: ["1", "2", "3"] },
        options: ["1 WordArt, 2 imagen, 3 gráfico", "1 imagen, 2 gráfico, 3 WordArt", "1 gráfico, 2 WordArt, 3 imagen"],
        correct: 0,
        explanation: "La letra grande con el trazo curvo (1) es WordArt. El marco con el sol y las montañas (2) inserta una imagen. Las barras sobre los ejes (3) insertan un gráfico."
      }
    ]
  }
};
