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
  }
};
