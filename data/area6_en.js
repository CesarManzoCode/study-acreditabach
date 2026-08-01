const AREA6_EN_TOPICS = [
  {
    id: "6.5.1",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Tiempo presente",
    note: "El presente simple se usa para hábitos, rutinas y hechos generales. Fórmula: Sujeto + verbo (+s/es si el sujeto es he/she/it). Para negar se usa don't/doesn't + verbo base, y para preguntar Do/Does + sujeto + verbo base. El presente continuo se usa para acciones que ocurren justo en este momento. Fórmula: Sujeto + am/is/are + verbo-ing. Ejemplo presente simple: 'She works in a hospital.' (Ella trabaja en un hospital). Ejemplo presente continuo: 'They are studying English right now.' (Ellos están estudiando inglés ahora mismo). No confundas ambos: el simple es para costumbres, el continuo es para el momento presente exacto.",
    flashcards: [
      { front: "Presente simple - regla de la tercera persona singular", back: "Con he/she/it se agrega -s o -es al verbo: He plays. She watches. (Él juega. Ella mira/ve.)" },
      { front: "Presente continuo - fórmula", back: "Sujeto + am/is/are + verbo-ing: I am reading a book. (Estoy leyendo un libro.)" }
    ],
    quiz: [
      { q: "My sister ___ to school every day.", options: ["go", "goes", "going"], correct: 1, explanation: "En presente simple, con sujeto en tercera persona singular (she), el verbo lleva -s: goes." },
      { q: "Look! The children ___ in the park right now.", options: ["play", "plays", "are playing"], correct: 2, explanation: "La frase 'right now' indica una acción en progreso en este momento, por lo que se usa presente continuo: are playing." }
    ]
  },
  {
    id: "6.5.2",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Tiempo pasado",
    note: "El pasado simple describe acciones terminadas en un momento específico del pasado. Fórmula: Sujeto + verbo en pasado (verbos regulares +ed; los irregulares cambian de forma, como go→went). Negación: didn't + verbo base. Pregunta: Did + sujeto + verbo base. El pasado continuo describe una acción que estaba en progreso en el pasado, muchas veces interrumpida por otra acción. Fórmula: Sujeto + was/were + verbo-ing. Ejemplo pasado simple: 'I visited my grandmother last weekend.' (Visité a mi abuela el fin de semana pasado). Ejemplo pasado continuo: 'She was cooking when the phone rang.' (Ella estaba cocinando cuando sonó el teléfono).",
    flashcards: [
      { front: "Pasado simple - verbos regulares", back: "Se agrega -ed al verbo: walk → walked, watch → watched. (caminar → caminó, ver → vio)" },
      { front: "Pasado continuo - uso principal", back: "was/were + verbo-ing, para una acción interrumpida por otra: I was sleeping when you called. (Estaba durmiendo cuando llamaste.)" }
    ],
    quiz: [
      { q: "Yesterday, we ___ a movie at the cinema.", options: ["watch", "watched", "watching"], correct: 1, explanation: "La palabra 'yesterday' indica una acción terminada en el pasado, por lo que se usa pasado simple: watched." },
      { q: "While I ___ dinner, the lights went out.", options: ["cooked", "was cooking", "cook"], correct: 1, explanation: "El pasado continuo (was cooking) describe la acción en progreso que fue interrumpida por otra acción en pasado simple (went out)." }
    ]
  },
  {
    id: "6.5.3",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Tiempo futuro",
    note: "Para hablar del futuro en inglés se usan principalmente dos estructuras. 'Will' se usa para decisiones espontáneas, promesas y predicciones sin evidencia clara. Fórmula: Sujeto + will + verbo base. 'Going to' se usa para planes ya decididos antes de hablar, o predicciones con evidencia visible en el presente. Fórmula: Sujeto + am/is/are + going to + verbo base. Ejemplo con will: 'I will call you tomorrow.' (Te llamaré mañana, decisión espontánea). Ejemplo con going to: 'They are going to travel to Cancún next month.' (Ellos van a viajar a Cancún el próximo mes, plan ya decidido).",
    flashcards: [
      { front: "will - uso principal", back: "Decisiones rápidas y promesas: I will help you. (Te ayudaré.)" },
      { front: "going to - uso principal", back: "Planes ya decididos con anterioridad: We are going to visit Paris. (Vamos a visitar París.)" }
    ],
    quiz: [
      { q: "Look at those dark clouds! It ___ rain soon.", options: ["will", "is going to", "would"], correct: 1, explanation: "Hay evidencia visible en el presente (las nubes) que permite predecir, por eso se usa 'going to'." },
      { q: "I promise I ___ finish the report by Friday.", options: ["am going to", "will", "was"], correct: 1, explanation: "Una promesa espontánea se expresa con 'will', no con 'going to'." }
    ]
  },
  {
    id: "6.5.4",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Presente perfecto",
    note: "El presente perfecto conecta el pasado con el presente: se usa para acciones que ocurrieron en un tiempo no especificado, experiencias de vida, o acciones que empezaron en el pasado y continúan. Fórmula: Sujeto + have/has + participio pasado (verbo en su tercera forma, ej. eaten, gone, finished). Se usa 'has' con he/she/it, y 'have' con I/you/we/they. Ejemplo: 'I have visited London twice.' (He visitado Londres dos veces, no importa cuándo exactamente). Otro ejemplo: 'She has already finished her homework.' (Ella ya terminó su tarea, y eso es relevante ahora).",
    flashcards: [
      { front: "Presente perfecto - fórmula", back: "have/has + participio pasado: They have eaten. (Ellos han comido.)" },
      { front: "have vs has", back: "has se usa con he/she/it; have se usa con I/you/we/they: He has arrived. (Él ha llegado.)" }
    ],
    quiz: [
      { q: "We ___ never been to Japan.", options: ["have", "has", "had"], correct: 0, explanation: "El sujeto 'we' requiere 'have' en presente perfecto, no 'has' (que es solo para he/she/it)." },
      { q: "She ___ already finished her project.", options: ["has", "have", "having"], correct: 0, explanation: "El sujeto 'she' es tercera persona singular, por lo que en presente perfecto se usa 'has'." }
    ]
  },
  {
    id: "6.5.5",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Pasado perfecto",
    note: "El pasado perfecto se usa para indicar que una acción ocurrió antes que otra acción en el pasado; es decir, marca la acción 'más antigua' de dos acciones pasadas. Fórmula: Sujeto + had + participio pasado. Se usa 'had' con todos los sujetos, sin cambiar de forma. Ejemplo: 'When I arrived, the train had already left.' (Cuando llegué, el tren ya había salido; primero salió el tren, después llegué yo). Otro ejemplo: 'She had studied English before she moved to Canada.' (Ella había estudiado inglés antes de mudarse a Canadá).",
    flashcards: [
      { front: "Pasado perfecto - fórmula", back: "had + participio pasado: They had left before we arrived. (Ellos se habían ido antes de que llegáramos.)" },
      { front: "¿Cuándo se usa el pasado perfecto?", back: "Para la acción que ocurrió primero, antes de otra acción también en pasado." }
    ],
    quiz: [
      { q: "By the time she called, I ___ already left the office.", options: ["have", "had", "has"], correct: 1, explanation: "La acción de salir ocurrió antes que otra acción pasada (she called), por lo que se usa pasado perfecto: had left." },
      { q: "Gonzalo Guerrero ___ adopted a Mayan lifestyle by 1519.", options: ["has", "had", "have"], correct: 1, explanation: "La acción se completó antes de un momento específico del pasado (1519), lo cual requiere pasado perfecto: had adopted." }
    ]
  },
  {
    id: "6.5.6",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Preguntas wh-",
    note: "Las palabras interrogativas 'wh-' sirven para pedir información específica. Who pregunta por una persona (¿quién?), what pregunta por una cosa o acción (¿qué?), where pregunta por un lugar (¿dónde?), y whose pregunta por posesión (¿de quién?). Fórmula general: Wh-word + auxiliar (do/does/did/is/are) + sujeto + verbo base. Cuando 'who' es el sujeto de la pregunta, no se usa auxiliar. Ejemplo: 'Where do you live?' (¿Dónde vives?). Ejemplo: 'Whose book is this?' (¿De quién es este libro?). Ejemplo sin auxiliar: 'Who called you?' (¿Quién te llamó?).",
    flashcards: [
      { front: "who vs whose", back: "who pregunta por la persona (¿quién?); whose pregunta por posesión (¿de quién?): Who is she? / Whose car is that?" },
      { front: "Fórmula de la pregunta wh-", back: "Wh-word + auxiliar + sujeto + verbo base: What do you want? (¿Qué quieres?)" }
    ],
    quiz: [
      { q: "___ is your favorite color?", options: ["Who", "What", "Whose"], correct: 1, explanation: "Se pregunta por una cosa (un color), no por una persona ni por posesión, así que se usa 'what'." },
      { q: "___ left this jacket on the chair?", options: ["What", "Where", "Who"], correct: 2, explanation: "Se pregunta por la persona que realizó la acción, por lo que se usa 'who' como sujeto de la pregunta." }
    ]
  },
  {
    id: "6.5.7",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Relaciones de comparación",
    note: "Para comparar dos cosas se usa el comparativo, y para comparar tres o más se usa el superlativo. Con adjetivos cortos (una sílaba, o dos terminados en -y): comparativo = adjetivo + -er + than; superlativo = the + adjetivo + -est. Con adjetivos largos (dos o más sílabas): comparativo = more + adjetivo + than; superlativo = the most + adjetivo. Ejemplo comparativo: 'This book is more interesting than that one.' (Este libro es más interesante que ese). Ejemplo superlativo: 'She is the tallest student in the class.' (Ella es la estudiante más alta de la clase).",
    flashcards: [
      { front: "Comparativo - adjetivos cortos", back: "adjetivo + -er + than: bigger than, faster than. (más grande que, más rápido que)" },
      { front: "Superlativo - adjetivos largos", back: "the most + adjetivo: the most expensive. (el más caro)" }
    ],
    quiz: [
      { q: "This exercise is ___ than the last one.", options: ["difficult", "more difficult", "most difficult"], correct: 1, explanation: "El adjetivo 'difficult' es largo (más de una sílaba), así que el comparativo se forma con 'more + adjetivo + than'." },
      { q: "Mount Everest is ___ mountain in the world.", options: ["higher", "the highest", "high"], correct: 1, explanation: "El superlativo con adjetivos cortos se forma con 'the' + adjetivo + -est: the highest." }
    ]
  },
  {
    id: "6.5.8",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Verbos modales",
    note: "Los verbos modales van antes de un verbo base (sin 'to') y no cambian de forma. Can expresa habilidad o permiso (poder). Should expresa consejo o recomendación (debería). Must expresa obligación fuerte o prohibición en negativo (deber, es obligatorio). Might expresa posibilidad (podría, tal vez). Fórmula: Sujeto + modal + verbo base. Ejemplo con should: 'You should drink more water.' (Deberías tomar más agua). Ejemplo con must: 'Students must wear a uniform.' (Los estudiantes deben usar uniforme). Ejemplo con might: 'It might rain tomorrow.' (Podría llover mañana).",
    flashcards: [
      { front: "can vs must", back: "can = habilidad o permiso (I can swim); must = obligación fuerte (I must study). (Puedo nadar / Debo estudiar)" },
      { front: "might - uso", back: "Expresa posibilidad, no certeza: It might rain tomorrow. (Podría llover mañana.)" }
    ],
    quiz: [
      { q: "You ___ smoke in the hospital; it's forbidden.", options: ["can", "must not", "might"], correct: 1, explanation: "Una prohibición fuerte se expresa con 'must not' (no debes / está prohibido)." },
      { q: "She ___ speak three languages fluently.", options: ["can", "should", "must"], correct: 0, explanation: "La habilidad de hacer algo se expresa con el modal 'can' (puede)." }
    ]
  },
  {
    id: "6.5.9",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Estructuras condicionales",
    note: "El primer condicional se usa para situaciones reales o posibles en el futuro. Fórmula: If + presente simple, will + verbo base. El segundo condicional se usa para situaciones hipotéticas o poco probables en el presente/futuro. Fórmula: If + pasado simple, would + verbo base (con el verbo 'be' se usa 'were' para todas las personas). Ejemplo primer condicional: 'If it rains, I will stay home.' (Si llueve, me quedaré en casa; es posible). Ejemplo segundo condicional: 'If I had more money, I would buy a new car.' (Si tuviera más dinero, compraría un auto nuevo; es hipotético).",
    flashcards: [
      { front: "Primer condicional - fórmula", back: "If + presente simple, will + verbo base: If you study, you will pass. (Si estudias, aprobarás.)" },
      { front: "Segundo condicional - fórmula", back: "If + pasado simple, would + verbo base: If I won the lottery, I would travel. (Si ganara la lotería, viajaría.)" }
    ],
    quiz: [
      { q: "If she ___ hard, she will pass the exam.", options: ["studies", "studied", "will study"], correct: 0, explanation: "En el primer condicional, después de 'if' se usa presente simple, no futuro: studies." },
      { q: "If I ___ a bird, I would fly everywhere.", options: ["am", "was", "were"], correct: 2, explanation: "En el segundo condicional, con el verbo 'be' se usa 'were' para todas las personas, incluso con 'I': If I were." }
    ]
  },
  {
    id: "6.5.10",
    area: 6,
    lang: "en",
    subarea: "6.5 Estructura gramatical del idioma inglés",
    tema: "Voz pasiva",
    note: "La voz pasiva se usa cuando el objeto de la acción es más importante que quien la realiza, o cuando no se sabe quién la hizo. En presente: Sujeto + am/is/are + participio pasado. En pasado: Sujeto + was/were + participio pasado. El verbo original cambia a su tercera forma (participio). Ejemplo presente: 'This cake is made every day.' (Este pastel se hace/es hecho todos los días). Ejemplo pasado: 'The house was built in 1990.' (La casa fue construida en 1990). Si se quiere mencionar quién realizó la acción, se agrega 'by' + persona.",
    flashcards: [
      { front: "Voz pasiva - presente", back: "am/is/are + participio pasado: The letter is written by Maria. (La carta es escrita por María.)" },
      { front: "Voz pasiva - pasado", back: "was/were + participio pasado: The windows were cleaned yesterday. (Las ventanas fueron limpiadas ayer.)" }
    ],
    quiz: [
      { q: "This book ___ by millions of people every year.", options: ["reads", "is read", "was read"], correct: 1, explanation: "La voz pasiva en presente se forma con is/are + participio pasado: is read." },
      { q: "The bridge ___ in 1937.", options: ["built", "was built", "is built"], correct: 1, explanation: "La acción ocurrió en un momento específico del pasado (1937), por lo que la voz pasiva usa was/were + participio pasado: was built." }
    ]
  }
];
