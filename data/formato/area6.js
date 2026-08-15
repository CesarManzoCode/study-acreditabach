/* Reactivos con los formatos que la guía oficial marca para estos temas
   (Ceneval, junio 2026): relación de elementos y ordenamiento. */

const AREA6_FORMATO = {
  // Guía: "Identificación del orden jerárquico que debe llevar la información
  // en un mapa conceptual, de lo general a lo particular."
  "6.1.3": {
    quiz: [
      {
        q: "Ordene los conceptos según el nivel que les corresponde en un mapa conceptual, del más general al más particular.\n1. Perro labrador\n2. Ser vivo\n3. Mamífero\n4. Animal",
        options: ["2, 4, 3, 1", "4, 2, 3, 1", "2, 3, 4, 1"],
        correct: 0,
        explanation: "El mapa va de lo general a lo particular: «ser vivo» (2) engloba a «animal» (4), que engloba a «mamífero» (3), que engloba al «perro labrador» (1)."
      },
      {
        q: "Ordene los conceptos según su nivel jerárquico en un mapa conceptual sobre los estados de la materia.\n1. Hielo\n2. Sólido\n3. Materia\n4. Estados de agregación",
        options: ["3, 4, 2, 1", "3, 2, 4, 1", "4, 3, 2, 1"],
        correct: 0,
        explanation: "«Materia» (3) es el concepto más amplio; de él se desprenden los «estados de agregación» (4), uno de los cuales es el «sólido» (2), y un ejemplo concreto de sólido es el «hielo» (1)."
      }
    ]
  },

  // Guía: "Relación de las etapas para la composición de un ensayo (…) con las
  // situaciones que las ejemplifican."
  "6.3.1": {
    quiz: [
      {
        q: "Relacione cada etapa de la composición de un ensayo con la situación que la ejemplifica.\n**Etapa:** 1. Consulta de fuentes · 2. Organización de las ideas · 3. Establecimiento del propósito\n**Situación:** a) El autor decide que su texto buscará convencer al lector de reducir el uso de plásticos · b) El autor arma un esquema con los puntos que tratará y en qué orden · c) El autor revisa artículos y libros sobre contaminación marina y toma notas",
        options: ["1c, 2b, 3a", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "Revisar artículos y tomar notas (c) es la consulta de fuentes (1). Armar el esquema de puntos y su orden (b) es la organización de las ideas (2). Decidir que el texto buscará convencer (a) es el establecimiento del propósito (3)."
      },
      {
        q: "Ordene las etapas de la composición de un ensayo.\n1. Consulta de fuentes\n2. Redacción del texto\n3. Selección del tema\n4. Organización de las ideas",
        options: ["3, 1, 4, 2", "1, 3, 4, 2", "3, 4, 1, 2"],
        correct: 0,
        explanation: "Primero se elige el tema (3), luego se investiga en fuentes confiables (1), después se organizan las ideas en un esquema (4) y al final se redacta el texto (2)."
      }
    ]
  },

  // Guía: "Identificación del orden que deben llevar los párrafos de un escrito
  // para que sea coherente."
  "6.3.6": {
    quiz: [
      {
        q: "Ordene los enunciados de manera que formen un párrafo coherente.\n1. Por eso hoy se le considera el instrumento más confiable para medir la profundidad del océano.\n2. El sonar fue desarrollado a principios del siglo XX.\n3. Su funcionamiento se basa en emitir un sonido y medir cuánto tarda el eco en regresar.\n4. Con ese tiempo y la velocidad del sonido en el agua se calcula la distancia al fondo.",
        options: ["2, 3, 4, 1", "3, 2, 4, 1", "2, 4, 3, 1"],
        correct: 0,
        explanation: "El enunciado 2 presenta el tema; el 3 explica el principio de funcionamiento; el 4 continúa esa explicación con el cálculo, y el 1 cierra con la conclusión, señalada por el conector «por eso»."
      },
      {
        q: "Ordene los enunciados de manera que formen un párrafo coherente.\n1. Después, esa humedad se eleva y se condensa al enfriarse.\n2. Finalmente, las gotas caen de nuevo como lluvia y el ciclo vuelve a empezar.\n3. El agua de los ríos y los mares se evapora por el calor del Sol.\n4. Al condensarse forma las nubes.",
        options: ["3, 1, 4, 2", "1, 3, 4, 2", "3, 4, 1, 2"],
        correct: 0,
        explanation: "El orden lo marcan la secuencia del ciclo y los conectores: la evaporación abre el párrafo (3), «después» encadena la elevación y condensación (1), de ahí se forman las nubes (4) y «finalmente» cierra con la lluvia (2)."
      }
    ]
  },

  // Guía: "Relación del uso de preguntas detonadoras, el intercambio de
  // información y el turno de la palabra en un diálogo con sus
  // correspondientes ejemplos."
  "6.4.2": {
    quiz: [
      {
        q: "Relacione cada elemento del diálogo con el ejemplo que le corresponde.\n**Elemento:** 1. Pregunta detonadora · 2. Intercambio de información · 3. Turno de la palabra\n**Ejemplo:** a) «Déjame terminar la idea y enseguida te escucho» · b) «¿Qué crees que pasaría si la escuela cambiara el horario?» · c) «Yo leí que sube el rendimiento; ¿tú qué encontraste sobre eso?»",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La pregunta detonadora (1) abre o dirige la conversación hacia un tema (b). El intercambio de información (2) ocurre cuando cada participante aporta y pide datos (c). El turno de la palabra (3) es respetar que cada quien termine antes de hablar (a)."
      }
    ]
  }
};
