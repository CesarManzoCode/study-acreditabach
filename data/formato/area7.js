/* Reactivos con el formato que la guía oficial marca para este tema
   (Ceneval, junio 2026): relación de elementos. */

const AREA7_FORMATO = {
  // Guía: "Relación de los conceptos de clase social, grupo social, comunidad e
  // institución con sus respectivas definiciones."
  "7.3.1": {
    quiz: [
      {
        q: "Relacione cada tipo de organización social con su definición.\n**Tipo:** 1. Familia · 2. Comunidad · 3. Clase social\n**Definición:** a) Grupos de personas que pueden apropiarse del trabajo de otros y ocupan puestos distintos en un régimen económico · b) Unidad social básica en la que se apoya el desarrollo de un Estado · c) Agrupación de individuos que comparten un espacio geográfico, un lenguaje y hábitos culturales",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La familia (1) es la unidad social básica sobre la que se apoya el desarrollo de un Estado (b). La comunidad (2) reúne a individuos que comparten territorio, lenguaje y hábitos culturales (c). Las clases sociales (3) ocupan posiciones distintas en el régimen económico (a)."
      },
      {
        q: "Relacione cada situación con el tipo de organización social que ejemplifica.\n**Situación:** 1. Los habitantes de un pueblo organizan cada año la fiesta patronal con las mismas tradiciones · 2. Un conjunto de compañeros forma un equipo para competir en un torneo escolar · 3. La escuela establece normas, horarios y funciones estables para todos\n**Tipo:** a) Grupo social · b) Institución · c) Comunidad",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El pueblo con tradiciones compartidas (1) es una comunidad (c). El equipo formado por intereses y metas comunes (2) es un grupo social (a). La escuela, con normas y estructuras estables (3), es una institución (b)."
      }
    ]
  },

  /* Guía 7.2.4: la orientación nombra SEP, Conadis, Sedatu e Inaes, pero la
     pregunta muestra oficial del área tiene como respuesta al CENAPRED, que el
     banco solo usaba una vez como distractor. */
  "7.2.4": {
    quiz: [
      {
        q: "En una ciudad se produjeron grandes lluvias que provocaron que varias avenidas se inundaran y el agua entrara a las casas habitación. ¿A qué institución le corresponde atender el problema del riesgo de desastre?",
        options: ["Cenapred", "Semarnat", "SICT"],
        correct: 0,
        explanation: "El Centro Nacional de Prevención de Desastres (Cenapred) investiga, monitorea y analiza peligros y vulnerabilidades, y promueve la política pública de gestión integral del riesgo de desastres. La Semarnat regula el medio ambiente y la SICT construye infraestructura de comunicaciones y transportes: ninguna de las dos tiene esa atribución."
      },
      {
        q: "Relacione cada problemática con la institución que la atiende.\n**Problemática:** 1. Un comercio se niega a respetar el precio anunciado · 2. Una tienda despide a una trabajadora sin liquidarla · 3. Una comunidad necesita mapas de riesgo por deslaves antes de la temporada de lluvias\n**Institución:** a) Profedet · b) Cenapred · c) Profeco",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "La Profeco (c) defiende a las personas consumidoras (1). La Profedet (a) orienta y representa gratuitamente a las personas trabajadoras (2). El Cenapred (b) elabora los mapas de riesgo y la información sobre peligros naturales (3)."
      },
      {
        q: "Una persona es rechazada en una vacante por su origen étnico. ¿Ante qué institución puede presentar una queja por discriminación?",
        options: ["Conapred", "Inaes", "Sedatu"],
        correct: 0,
        explanation: "El Conapred (Consejo Nacional para Prevenir la Discriminación) recibe y atiende quejas por actos discriminatorios. El Inaes apoya cooperativas y economía social; la Sedatu atiende el ordenamiento territorial y la vivienda. No confundas el Conapred con el Conadis, que se ocupa específicamente de la inclusión de personas con discapacidad."
      }
    ]
  },

  /* Guía 7.3.6: "Reconocimiento de las CONSECUENCIAS del Plan de San Luis, la
     crisis económica de 1982, el movimiento estudiantil de 1968 y el
     levantamiento del EZLN en la sociedad mexicana." El banco tenía muy poca
     práctica de las consecuencias, que es lo que se evalúa. */
  "7.3.6": {
    quiz: [
      {
        q: "Relacione cada acontecimiento con su principal consecuencia para la sociedad mexicana.\n**Acontecimiento:** 1. Plan de San Luis (1910) · 2. Movimiento estudiantil de 1968 · 3. Crisis económica de 1982 · 4. Levantamiento del EZLN (1994)\n**Consecuencia:** a) El endeudamiento y la caída del petróleo forzaron el giro al modelo neoliberal, con privatizaciones y recorte del gasto social · b) Desconoció las elecciones y llamó a las armas: detonó la Revolución mexicana · c) Colocó los derechos y la autonomía de los pueblos indígenas en el centro del debate nacional · d) La represión de Tlatelolco deslegitimó al régimen y abrió el ciclo de demandas de apertura democrática",
        options: ["1b, 2d, 3a, 4c", "1a, 2b, 3c, 4d", "1c, 2a, 3d, 4b"],
        correct: 0,
        explanation: "El Plan de San Luis (1) desconoció la reelección de Díaz y convocó al levantamiento del 20 de noviembre de 1910 (b). El 68 (2) terminó en la matanza de Tlatelolco y marcó el quiebre de legitimidad del presidencialismo (d). La crisis del 82 (3) llevó al abandono del modelo proteccionista (a). El EZLN (4) puso el tema indígena en la agenda nacional y llevó a los Acuerdos de San Andrés (c)."
      },
      {
        q: "¿Cuál fue una consecuencia social directa de la crisis económica de 1982 en México?",
        options: [
          "La caída del poder adquisitivo y el crecimiento del empleo informal como refugio de quienes perdieron su trabajo",
          "La creación del Estado de bienestar mexicano",
          "El reparto agrario más grande del siglo XX"
        ],
        correct: 0,
        explanation: "La devaluación, la inflación y el recorte del gasto público hundieron los salarios reales durante años. Al no haber empleo formal suficiente, buena parte de la población se refugió en el comercio y los servicios informales, un rasgo que persiste hasta hoy."
      },
      {
        q: "¿Qué consecuencia de largo plazo tuvo el movimiento estudiantil de 1968?",
        options: [
          "Impulsó las demandas de apertura democrática y la crítica pública al presidencialismo autoritario",
          "Provocó la caída inmediata del gobierno en turno",
          "Logró que se aprobara el voto de las mujeres"
        ],
        correct: 0,
        explanation: "El movimiento no derribó al gobierno —fue reprimido—, pero la matanza del 2 de octubre rompió la imagen de estabilidad del régimen y formó a una generación que impulsó las reformas políticas de los años setenta y la lucha por elecciones competidas. El voto femenino se había obtenido en 1953."
      }
    ]
  },

  /* Guía 7.3.7: la orientación nombra desplazamiento forzado, migración
     ESTATAL y migración rural-urbana. La estatal no se practicaba. */
  "7.3.7": {
    quiz: [
      {
        q: "Relacione cada situación con el tipo de migración que ejemplifica.\n**Situación:** 1. Una familia de Oaxaca se muda a Nuevo León porque el padre consiguió empleo en una planta armadora · 2. Una comunidad abandona su pueblo tras las amenazas de un grupo armado · 3. Una joven deja su ranchito y se va a la capital del estado a buscar trabajo y estudiar\n**Tipo:** a) Desplazamiento forzado · b) Migración rural-urbana · c) Migración estatal",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Mudarse de una entidad federativa a otra dentro del país (1) es migración estatal o interestatal (c). Irse por amenazas, sin haberlo elegido (2), es desplazamiento forzado (a). Dejar el campo por la ciudad (3) es migración rural-urbana (b)."
      },
      {
        q: "Un profesionista se traslada de Yucatán a Querétaro porque le ofrecieron un mejor puesto. ¿Qué tipo de migración es?",
        options: ["Migración estatal, porque cruza el límite de una entidad federativa sin salir del país", "Migración internacional, porque cambia de región", "Desplazamiento forzado, porque lo motiva el trabajo"],
        correct: 0,
        explanation: "Lo determinante es que se cruza un límite estatal dentro del mismo país: es migración interna de tipo estatal o interestatal. No es internacional porque no se cruza una frontera entre países, ni forzada porque la persona elige irse."
      }
    ]
  }
};
