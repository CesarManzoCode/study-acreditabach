const AREA6_ES_TOPICS = [
  {
    id: "6.1.1",
    area: 6,
    lang: "es",
    subarea: "6.1 Estrategias de comprensión lectora",
    tema: "Título del texto expositivo",
    note: "Un buen título resume la idea principal del texto, no un detalle secundario ni una anécdota del primer párrafo. Para encontrarlo: lee todo el texto, identifica de qué tema tratan **todos** los párrafos en conjunto (no solo uno) y busca la opción que cubra ese tema general sin ser tan amplia que pierda especificidad ni tan estrecha que deje fuera partes del texto. Descarta títulos que solo mencionen un ejemplo o un dato aislado: esos son pistas, no el asunto central.",
    flashcards: [
      { front: "¿Qué debe reflejar el título de un texto expositivo?", back: "La idea principal o tema general que atraviesa **todo** el texto, no un detalle aislado." },
      { front: "¿Qué error común hay que evitar al elegir título?", back: "Elegir un título basado solo en el primer párrafo o en un ejemplo secundario, ignorando el resto del texto." }
    ],
    quiz: [
      {
        q: "Un texto explica que el reciclaje reduce la basura, ahorra energía y disminuye la contaminación del agua, usando como ejemplo una fábrica de papel. ¿Cuál es el título más adecuado?",
        options: ["Los beneficios del reciclaje", "Cómo funciona una fábrica de papel", "La contaminación del agua"],
        correct: 0,
        explanation: "El texto trata varios beneficios del reciclaje en general; la fábrica de papel es solo un ejemplo, y el agua es un beneficio, no el tema completo."
      },
      {
        q: "¿Por qué un título demasiado específico (basado en un solo dato) suele ser incorrecto para un texto expositivo completo?",
        options: [
          "Porque deja fuera las demás ideas que desarrolla el texto",
          "Porque los títulos siempre deben ser preguntas",
          "Porque los textos expositivos no llevan título"
        ],
        correct: 0,
        explanation: "Un título debe cubrir la idea general de todo el texto; si solo toma un dato puntual, no representa el resto del contenido."
      }
    ]
  },
  {
    id: "6.1.2",
    area: 6,
    lang: "es",
    subarea: "6.1 Estrategias de comprensión lectora",
    tema: "Tipos de relaciones lógicas entre oraciones",
    note: "Las oraciones de un texto se conectan con relaciones lógicas que debes reconocer para entender el argumento. Las más comunes en el examen son: **ejemplificación** (una oración ilustra la anterior con un caso concreto: 'por ejemplo', 'como', 'tal es el caso de') y **causalidad** (una oración es consecuencia de la otra: 'por lo tanto', 'debido a', 'como resultado', 'ya que'). También existen relaciones de contraste ('sin embargo', 'pero') y de adición ('además', 'asimismo'). Identificar el conector clave te dice qué tipo de relación hay entre dos ideas.",
    flashcards: [
      { front: "¿Qué conectores indican relación de ejemplificación?", back: "'Por ejemplo', 'como', 'tal es el caso de', 'a saber'." },
      { front: "¿Qué conectores indican relación de causalidad?", back: "'Por lo tanto', 'debido a', 'ya que', 'como consecuencia', 'por eso'." }
    ],
    quiz: [
      {
        q: "\"El agua de ese río está muy contaminada; por lo tanto, los peces han desaparecido.\" ¿Qué relación lógica existe entre las dos oraciones?",
        options: ["Causalidad", "Ejemplificación", "Contraste"],
        correct: 0,
        explanation: "El conector 'por lo tanto' señala que la segunda oración es consecuencia (efecto) de la primera (causa)."
      },
      {
        q: "\"Muchos animales hibernan en invierno; el oso, por ejemplo, duerme varios meses.\" ¿Qué relación lógica hay entre ambas oraciones?",
        options: ["Ejemplificación", "Causalidad", "Adición"],
        correct: 0,
        explanation: "La segunda oración ilustra la afirmación general con un caso concreto, señalado por 'por ejemplo'."
      }
    ]
  },
  {
    id: "6.1.3",
    area: 6,
    lang: "es",
    subarea: "6.1 Estrategias de comprensión lectora",
    tema: "Jerarquía de la información en mapas conceptuales",
    note: "En un mapa conceptual la información se organiza de lo **general a lo particular**: arriba (o al centro) va el concepto más amplio, y de él se desprenden ramas con subtemas cada vez más específicos, hasta llegar a ejemplos o detalles concretos. Para resolver estos reactivos, primero identifica cuál idea engloba a las demás (esa va en el nivel superior) y luego ordena el resto según qué tan específicas sean: una idea que depende de otra para tener sentido siempre va en un nivel inferior a ella.",
    flashcards: [
      { front: "¿Cómo se ordena la información en un mapa conceptual?", back: "De lo general (arriba/centro) a lo particular (ramas y detalles hacia abajo/afuera)." },
      { front: "¿Cómo identificar qué concepto va en el nivel superior?", back: "Es el que engloba o incluye a todos los demás; los demás son casos, partes o ejemplos de él." }
    ],
    quiz: [
      {
        q: "En un mapa conceptual sobre 'Los mamíferos', que incluye 'perros', 'animales de sangre caliente' y 'labrador', ¿cuál va en el nivel más alto?",
        options: ["Animales de sangre caliente", "Perros", "Labrador"],
        correct: 0,
        explanation: "Es la categoría más general: los mamíferos son animales de sangre caliente; 'perros' es más específico y 'labrador' es aún más particular (una raza de perro)."
      },
      {
        q: "¿Qué concepto debería ir en el nivel más bajo (más específico) del ejemplo anterior?",
        options: ["Labrador", "Animales de sangre caliente", "Mamíferos"],
        correct: 0,
        explanation: "'Labrador' es una raza particular de perro, el nivel más específico de la jerarquía."
      }
    ]
  },
  {
    id: "6.1.4",
    area: 6,
    lang: "es",
    subarea: "6.1 Estrategias de comprensión lectora",
    tema: "Tipos de formas textuales de comunicación (resumen, relato simple, reseña y comentario crítico)",
    note: "Cuatro formas de comunicar información sobre un texto u obra: el **resumen** condensa las ideas principales de forma objetiva y breve, sin opiniones. El **relato simple** narra hechos o sucesos en orden, como una historia, sin analizarlos. La **reseña** describe y presenta una obra (libro, película) de forma objetiva, con datos generales, sin juicio profundo. El **comentario crítico** va más allá: incluye la opinión y valoración argumentada del autor sobre la obra, señalando aciertos o defectos.",
    flashcards: [
      { front: "¿Qué distingue al resumen del comentario crítico?", back: "El resumen es objetivo y condensa ideas principales; el comentario crítico incluye opinión y valoración argumentada." },
      { front: "¿Qué diferencia hay entre relato simple y reseña?", back: "El relato simple narra hechos en orden sin analizarlos; la reseña describe una obra con datos generales de forma objetiva." }
    ],
    quiz: [
      {
        q: "Un texto dice: \"El autor logra construir personajes creíbles, aunque el ritmo de la trama decae en el tercer capítulo.\" ¿Qué tipo de forma textual es?",
        options: ["Comentario crítico", "Resumen", "Relato simple"],
        correct: 0,
        explanation: "Incluye una valoración argumentada (aciertos y defectos) sobre la obra, propia del comentario crítico."
      },
      {
        q: "Un texto dice: \"Juan salió de su casa, caminó hasta la estación y tomó el tren de las ocho.\" ¿Qué forma textual ejemplifica mejor?",
        options: ["Relato simple", "Comentario crítico", "Reseña"],
        correct: 0,
        explanation: "Narra hechos en orden cronológico sin opinión ni análisis, característica del relato simple."
      }
    ]
  },
  {
    id: "6.2.2",
    area: 6,
    lang: "es",
    subarea: "6.2 Recursos del análisis literario",
    tema: "Tema central del texto literario narrativo",
    note: "El tema central es la idea o asunto general que da sentido a toda la narración, distinto de la trama (los sucesos concretos). Para hallarlo pregúntate: ¿de qué habla realmente la historia más allá de lo que pasa? Ejemplo: 'Marta guardó silencio durante años sobre el secreto de su padre. Cuando por fin lo confesó a su hermano, sintió que un peso enorme se desprendía de su pecho, aunque también temió perder su cariño.' Los sucesos son 'confesar un secreto', pero el tema central es algo más amplio, como el peso de guardar secretos o el miedo a ser juzgado.",
    flashcards: [
      { front: "¿Qué diferencia hay entre tema central y trama?", back: "El tema es la idea general de fondo (de qué trata realmente la historia); la trama son los sucesos concretos que ocurren." },
      { front: "¿Cómo identificar el tema central de un relato?", back: "Preguntando qué idea o mensaje general conecta y explica todos los sucesos de la historia." }
    ],
    quiz: [
      {
        q: "\"Después de perder su empleo, Ramiro pasó meses sin decírselo a su esposa, fingiendo salir a trabajar cada mañana.\" ¿Cuál es el tema central más probable de este fragmento?",
        options: ["La vergüenza y el miedo a decepcionar a otros", "Cómo se consigue empleo en la ciudad", "La rutina diaria de las mañanas"],
        correct: 0,
        explanation: "El suceso concreto (fingir que trabaja) refleja un tema más amplio: la vergüenza o el temor a decepcionar a un ser querido."
      },
      {
        q: "En el fragmento sobre Marta y el secreto de su padre, ¿cuál sería el tema central más adecuado?",
        options: ["El peso emocional de guardar un secreto", "La relación entre padre e hija", "El horario en que Marta habló con su hermano"],
        correct: 0,
        explanation: "El tema central trasciende el suceso puntual y refiere a la idea general de fondo: la carga de mantener algo oculto."
      }
    ]
  },
  {
    id: "6.2.3",
    area: 6,
    lang: "es",
    subarea: "6.2 Recursos del análisis literario",
    tema: "Trama del texto literario narrativo",
    note: "La trama es la secuencia de sucesos y conflictos que se desarrollan en la historia. Tiene planteamiento (presentación de personajes y situación), nudo (el conflicto central, el momento de mayor tensión) y desenlace (la resolución). El **nudo** es la parte donde el conflicto se complica al máximo. Ejemplo: 'Ana descubrió que su mejor amiga había mentido sobre el accidente. Confrontarla significaba arriesgar la amistad, pero callar la hacía sentir cómplice.' Ese dilema sin resolver es el nudo de la trama.",
    flashcards: [
      { front: "¿Qué partes tiene la trama de un relato?", back: "Planteamiento, nudo (conflicto central) y desenlace (resolución)." },
      { front: "¿Cómo se reconoce el nudo de una trama?", back: "Es el momento de mayor tensión o conflicto, cuando el problema central se complica y aún no se resuelve." }
    ],
    quiz: [
      {
        q: "\"El barco se quedó sin combustible en medio del océano. El capitán debía decidir entre esperar ayuda o intentar llegar a nado a la costa más cercana, arriesgando la vida de la tripulación.\" ¿Qué parte de la trama representa este fragmento?",
        options: ["El nudo", "El planteamiento", "El desenlace"],
        correct: 0,
        explanation: "Es el momento de mayor conflicto y tensión, sin resolución todavía: el nudo de la trama."
      },
      {
        q: "En el fragmento de Ana y su amiga, ¿qué elemento constituye el nudo de la trama?",
        options: ["El dilema entre confrontar a la amiga o callar", "La descripción de cómo era la amistad antes", "El lugar donde ocurrió el accidente"],
        correct: 0,
        explanation: "El conflicto sin resolver —confrontar o callar— es el punto de mayor tensión, es decir, el nudo."
      }
    ]
  },
  {
    id: "6.2.4",
    area: 6,
    lang: "es",
    subarea: "6.2 Recursos del análisis literario",
    tema: "Características y acciones de los personajes del texto literario narrativo",
    note: "Los personajes se caracterizan de dos formas: **directa** (el narrador dice explícitamente cómo es: 'era muy generoso') e **indirecta** (se infiere por sus acciones, palabras o decisiones). Presta atención a lo que el personaje hace, no solo a lo que se dice de él. Ejemplo: 'Aunque el sueldo apenas le alcanzaba, Don Efraín compartía su comida con el perro callejero cada tarde, sin decir palabra a nadie.' Aquí no se dice 'era generoso'; se infiere de la acción, es caracterización indirecta.",
    flashcards: [
      { front: "¿Qué es la caracterización directa de un personaje?", back: "Cuando el narrador describe explícitamente los rasgos del personaje ('era honesto', 'tenía mal carácter')." },
      { front: "¿Qué es la caracterización indirecta de un personaje?", back: "Cuando el rasgo se infiere a partir de sus acciones, palabras o decisiones, sin que se diga de forma explícita." }
    ],
    quiz: [
      {
        q: "\"Don Efraín compartía su comida con el perro callejero cada tarde, sin decir palabra a nadie.\" ¿Qué rasgo se infiere de esta acción?",
        options: ["Generosidad discreta", "Tacañería", "Timidez con los animales"],
        correct: 0,
        explanation: "La acción de compartir comida sin buscar reconocimiento revela generosidad, inferida indirectamente por lo que hace, no por una descripción explícita."
      },
      {
        q: "\"Era un hombre impaciente y de mal genio\", escribe el narrador sobre un personaje. ¿Qué tipo de caracterización es?",
        options: ["Directa", "Indirecta", "Ambigua"],
        correct: 0,
        explanation: "El narrador afirma explícitamente el rasgo del personaje, sin que el lector tenga que inferirlo de una acción."
      }
    ]
  },
  {
    id: "6.2.5",
    area: 6,
    lang: "es",
    subarea: "6.2 Recursos del análisis literario",
    tema: "Características del narrador en el texto literario narrativo",
    note: "Tipos de narrador clave: **protagonista** (narra en primera persona su propia historia: 'yo hice...'), **testigo** (primera persona, pero cuenta lo que le pasa a otro: 'yo vi cómo él hacía...'), **omnisciente** (tercera persona, conoce pensamientos y sentimientos de todos los personajes) y **narrador objetivo/observador** (tercera persona, solo describe lo que se ve y oye, sin acceder a la mente de nadie). Ejemplo: 'Pedro sintió que el corazón se le encogía, aunque intentó disimularlo frente a su hermano.' Como se conoce el sentimiento interno de Pedro sin que él lo cuente, es narrador omnisciente.",
    flashcards: [
      { front: "¿Cómo se reconoce a un narrador omnisciente?", back: "Narra en tercera persona y conoce pensamientos, sentimientos e información interna de todos los personajes." },
      { front: "¿Qué diferencia hay entre narrador protagonista y narrador testigo?", back: "Ambos narran en primera persona, pero el protagonista vive los hechos centrales; el testigo cuenta lo que le sucede a otro personaje." }
    ],
    quiz: [
      {
        q: "\"Pedro sintió que el corazón se le encogía, aunque intentó disimularlo frente a su hermano.\" ¿Qué tipo de narrador presenta este fragmento?",
        options: ["Omnisciente", "Protagonista", "Testigo"],
        correct: 0,
        explanation: "El narrador conoce el sentimiento interno de Pedro sin que este lo exprese; eso es propio del narrador omnisciente."
      },
      {
        q: "\"Yo vi cómo mi vecino discutía a gritos con el cartero, aunque nunca supe por qué.\" ¿Qué tipo de narrador es este?",
        options: ["Testigo", "Protagonista", "Omnisciente"],
        correct: 0,
        explanation: "Narra en primera persona pero cuenta algo que le sucede a otro personaje (el vecino), no a sí mismo: es narrador testigo."
      }
    ]
  },
  {
    id: "6.2.6",
    area: 6,
    lang: "es",
    subarea: "6.2 Recursos del análisis literario",
    tema: "Ámbito de la narración en el texto literario narrativo",
    note: "El ámbito (o espacio) es el lugar físico y social donde ocurre la historia: puede ser un espacio abierto o cerrado, urbano o rural, real o imaginario, y también incluye el ambiente social (pobreza, riqueza, guerra, etc.). Identificarlo ayuda a entender el contexto de los personajes. Ejemplo: 'El mercado bullía de gente regateando entre puestos de fruta y especias, mientras un carro tirado por mulas se abría paso a duras penas.' El ámbito aquí es un mercado popular, espacio abierto, urbano y de ambiente humilde o tradicional.",
    flashcards: [
      { front: "¿Qué es el ámbito de la narración?", back: "El espacio físico y social donde transcurre la historia (lugar, época, ambiente urbano/rural, social)." },
      { front: "¿Qué información aporta identificar el ámbito de un relato?", back: "Ayuda a comprender el contexto social y físico en que actúan los personajes, y a interpretar sus decisiones." }
    ],
    quiz: [
      {
        q: "\"El mercado bullía de gente regateando entre puestos de fruta y especias, mientras un carro tirado por mulas se abría paso a duras penas.\" ¿Qué ámbito describe este fragmento?",
        options: ["Un mercado popular, urbano y tradicional", "Un bosque solitario", "Una oficina moderna"],
        correct: 0,
        explanation: "Los elementos descritos (puestos, regateo, mulas) sitúan la acción en un mercado popular de ambiente urbano y tradicional."
      },
      {
        q: "\"Las máquinas zumbaban sin parar en la fábrica, y el humo cubría el cielo gris sobre la ciudad industrial.\" ¿Qué tipo de ámbito se presenta?",
        options: ["Urbano e industrial", "Rural y agrícola", "Marino"],
        correct: 0,
        explanation: "Los elementos (fábrica, máquinas, ciudad industrial) describen un ámbito urbano de tipo industrial."
      }
    ]
  },
  {
    id: "6.2.7",
    area: 6,
    lang: "es",
    subarea: "6.2 Recursos del análisis literario",
    tema: "Tipos de tiempo narrativo en el texto literario narrativo",
    note: "El tiempo narrativo puede ser **lineal** (los hechos se cuentan en el orden en que ocurrieron, de principio a fin) o **retrospectivo** (la narración se interrumpe para contar algo del pasado, un recuerdo o un flashback, antes de continuar con el presente de la historia). Ejemplo: 'Caminaba hacia la escuela cuando de pronto recordó aquella tarde de su niñez en que se perdió en la feria y lloró hasta que su madre lo encontró.' Ese salto al recuerdo de la niñez es tiempo retrospectivo.",
    flashcards: [
      { front: "¿Qué es el tiempo narrativo lineal?", back: "Cuando los hechos se narran en el mismo orden cronológico en que sucedieron, sin saltos al pasado." },
      { front: "¿Qué es el tiempo narrativo retrospectivo?", back: "Cuando la narración interrumpe el presente de la historia para contar un hecho anterior (recuerdo o flashback)." }
    ],
    quiz: [
      {
        q: "\"Caminaba hacia la escuela cuando de pronto recordó aquella tarde de su niñez en que se perdió en la feria.\" ¿Qué tipo de tiempo narrativo se emplea?",
        options: ["Retrospectivo", "Lineal", "Simultáneo"],
        correct: 0,
        explanation: "La narración se detiene para contar un recuerdo del pasado (la niñez), interrumpiendo el orden cronológico presente: es retrospectivo."
      },
      {
        q: "\"Se levantó temprano, desayunó, tomó el autobús y llegó puntual a su primer día de trabajo.\" ¿Qué tipo de tiempo narrativo presenta este fragmento?",
        options: ["Lineal", "Retrospectivo", "Circular"],
        correct: 0,
        explanation: "Los hechos se cuentan en el orden exacto en que ocurrieron, sin saltos al pasado: es tiempo narrativo lineal."
      }
    ]
  },
  {
    id: "6.3.1",
    area: 6,
    lang: "es",
    subarea: "6.3 Procesos de composición de textos",
    tema: "Etapas para la composición de un ensayo",
    note: "Escribir un ensayo sigue un orden lógico: 1) **selección del tema** (elegir de qué se hablará), 2) **propósito** (definir qué se quiere lograr: persuadir, informar, analizar), 3) **consulta de fuentes** (investigar información confiable), 4) **organización de ideas** (hacer un esquema o borrador de puntos clave), 5) **estructura** (introducción, desarrollo y conclusión) y 6) **redacción** (escribir el texto final aplicando todo lo anterior). Saltarse pasos (por ejemplo, redactar sin organizar ideas antes) produce ensayos desordenados.",
    flashcards: [
      { front: "¿Cuál es el orden correcto de las etapas de un ensayo?", back: "Selección del tema, propósito, consulta de fuentes, organización de ideas, estructura y redacción." },
      { front: "¿Qué ocurre si se redacta un ensayo sin organizar ideas antes?", back: "El texto resulta desordenado, sin coherencia clara entre introducción, desarrollo y conclusión." }
    ],
    quiz: [
      {
        q: "Después de elegir el tema de un ensayo y definir su propósito, ¿cuál es el siguiente paso recomendado?",
        options: ["Consultar fuentes de información confiables", "Redactar directamente la conclusión", "Publicar el ensayo"],
        correct: 0,
        explanation: "Antes de organizar ideas y redactar, es necesario investigar y consultar fuentes que respalden el contenido del ensayo."
      },
      {
        q: "¿Qué etapa del proceso de composición consiste en definir si el ensayo busca persuadir, informar o analizar?",
        options: ["Definición del propósito", "Redacción final", "Consulta de fuentes"],
        correct: 0,
        explanation: "El propósito establece la intención comunicativa del texto, lo cual guía las decisiones posteriores de contenido y tono."
      }
    ]
  },
  {
    id: "6.3.2",
    area: 6,
    lang: "es",
    subarea: "6.3 Procesos de composición de textos",
    tema: "Tipos de fuentes de información (primarias, secundarias y terciarias)",
    note: "Una fuente **primaria** ofrece información de primera mano, original, sin intermediarios (un diario personal, una carta, un poema del propio autor, un testimonio directo). Una fuente **secundaria** reorganiza, analiza o resume información basada en fuentes primarias (una reseña de una novela, un artículo que comenta un poema). Una fuente **terciaria** organiza o sintetiza fuentes secundarias (una enciclopedia, un catálogo bibliográfico, un índice de artículos). Entre más 'pasos' de análisis tenga la información antes de llegar a ti, más lejos está de ser primaria.",
    flashcards: [
      { front: "¿Qué es una fuente primaria? Da un ejemplo.", back: "Información de primera mano y original. Ejemplo: una carta escrita por su propio autor, o el testimonio directo de quien vivió un hecho." },
      { front: "¿Qué diferencia hay entre fuente secundaria y terciaria?", back: "La secundaria analiza o resume fuentes primarias (una reseña); la terciaria organiza o sintetiza fuentes secundarias (una enciclopedia o índice)." }
    ],
    quiz: [
      {
        q: "El testimonio autobiográfico de un sobreviviente de un terremoto, escrito por él mismo, es una fuente:",
        options: ["Primaria", "Secundaria", "Terciaria"],
        correct: 0,
        explanation: "Es información de primera mano, dada directamente por quien vivió el hecho, sin intermediarios."
      },
      {
        q: "Una enciclopedia que resume y organiza artículos ya publicados sobre la Revolución Mexicana es una fuente:",
        options: ["Terciaria", "Primaria", "Secundaria"],
        correct: 0,
        explanation: "Sintetiza y organiza información que ya fue analizada previamente en fuentes secundarias, característica de las fuentes terciarias."
      }
    ]
  },
  {
    id: "6.3.3",
    area: 6,
    lang: "es",
    subarea: "6.3 Procesos de composición de textos",
    tema: "Reglas de acentuación",
    note: "Las palabras se clasifican según dónde cae la fuerza de voz (sílaba tónica). **Agudas**: acento en la última sílaba, llevan tilde si terminan en n, s o vocal (ej. 'camión', 'café', 'jamás'). **Graves (o llanas)**: acento en la penúltima sílaba, llevan tilde si NO terminan en n, s o vocal (ej. 'árbol', 'lápiz', 'azúcar'). **Esdrújulas**: acento en la antepenúltima sílaba, SIEMPRE llevan tilde (ej. 'médico', 'número', 'música'). **Sobreesdrújulas**: acento antes de la antepenúltima, SIEMPRE llevan tilde (ej. 'cómetelo', 'dígaselo').",
    flashcards: [
      { front: "¿Cuándo lleva tilde una palabra aguda? Ejemplo.", back: "Cuando termina en n, s o vocal. Ejemplo: 'camión', 'jamás', 'café'." },
      { front: "¿Cuándo lleva tilde una palabra grave (llana)? Ejemplo.", back: "Cuando NO termina en n, s o vocal. Ejemplo: 'árbol', 'lápiz', 'azúcar'." }
    ],
    quiz: [
      {
        q: "¿Cuál de las siguientes palabras es esdrújula y por lo tanto siempre lleva tilde?",
        options: ["Médico", "Camión", "Azúcar"],
        correct: 0,
        explanation: "'Médico' tiene el acento en la antepenúltima sílaba (MÉ-di-co), lo que la hace esdrújula; estas siempre llevan tilde."
      },
      {
        q: "La palabra 'lapiz' (sin tilde) es grave y termina en consonante distinta de n o s. ¿Cómo debe escribirse correctamente?",
        options: ["Lápiz, con tilde", "Lapiz, sin tilde", "Lapíz, con tilde en la última sílaba"],
        correct: 0,
        explanation: "Las palabras graves llevan tilde cuando terminan en consonante distinta de n o s; 'lápiz' termina en z, por eso requiere tilde en la penúltima sílaba."
      }
    ]
  },
  {
    id: "6.3.4",
    area: 6,
    lang: "es",
    subarea: "6.3 Procesos de composición de textos",
    tema: "Reglas de puntuación",
    note: "La puntuación organiza el sentido de un texto. La **coma** separa elementos de una lista o incisos ('Compré manzanas, peras y uvas'). El **punto** cierra una idea completa. Los **dos puntos** anuncian una enumeración, cita o explicación ('Necesito tres cosas: tiempo, dinero y paciencia'). El **punto y coma** separa ideas relacionadas pero independientes, o elementos de una lista compleja. Los **signos de interrogación y exclamación** en español se abren y cierran (¿...? ¡...!). En diálogos, la **raya** (—) indica el cambio de hablante.",
    flashcards: [
      { front: "¿Para qué se usan los dos puntos?", back: "Para anunciar una enumeración, una cita textual o una explicación de lo dicho antes." },
      { front: "¿Qué signo se usa para marcar cambio de hablante en un diálogo en español?", back: "La raya (—), no el guion corto ni las comillas." }
    ],
    quiz: [
      {
        q: "\"Necesito comprar___ pan, leche y huevos.\" ¿Qué signo de puntuación falta en el espacio?",
        options: ["Dos puntos (:)", "Punto y coma (;)", "Coma (,)"],
        correct: 0,
        explanation: "Los dos puntos se usan para anunciar una enumeración que sigue a la oración; en este caso, la lista de productos."
      },
      {
        q: "En el diálogo: \"___Ya llegué, dijo Marta.\" ¿Qué signo falta al inicio para marcar que Marta está hablando?",
        options: ["Raya (—)", "Comillas (\" \")", "Punto y coma (;)"],
        correct: 0,
        explanation: "En español, la raya se usa para introducir y marcar el cambio de interlocutor en un diálogo narrativo."
      }
    ]
  },
  {
    id: "6.3.5",
    area: 6,
    lang: "es",
    subarea: "6.3 Procesos de composición de textos",
    tema: "Función de unidades sintácticas",
    note: "Una oración se organiza en **sujeto** (quién realiza la acción) y **predicado** (lo que se dice del sujeto, incluye el verbo). Dentro del predicado hay complementos: el **complemento directo** (CD) recibe la acción directamente del verbo (responde a '¿qué?'; se puede sustituir por 'lo/la/los/las'), el **complemento indirecto** (CI) es el destinatario de la acción (responde a '¿a quién?' o '¿para quién?'; se sustituye por 'le/les') y el **complemento circunstancial** (CC) indica modo, tiempo, lugar o causa. Ejemplo: 'Ana (sujeto) le regaló un libro (CD) a su hermano (CI) ayer (CC de tiempo).'",
    flashcards: [
      { front: "¿Cómo se identifica el complemento directo (CD) en una oración?", back: "Responde a la pregunta '¿qué?' hecha al verbo, y puede sustituirse por lo/la/los/las." },
      { front: "¿Cómo se identifica el complemento indirecto (CI)?", back: "Responde a '¿a quién?' o '¿para quién?' y puede sustituirse por le/les." }
    ],
    quiz: [
      {
        q: "En la oración \"Ana le regaló un libro a su hermano\", ¿cuál es el complemento directo?",
        options: ["Un libro", "A su hermano", "Ana"],
        correct: 0,
        explanation: "'Un libro' responde a la pregunta '¿qué regaló?' y puede sustituirse por 'lo' ('Ana se lo regaló'), lo que confirma que es el complemento directo."
      },
      {
        q: "En la oración \"El profesor explicó la lección con paciencia\", ¿qué función cumple 'con paciencia'?",
        options: ["Complemento circunstancial de modo", "Sujeto", "Complemento directo"],
        correct: 0,
        explanation: "'Con paciencia' indica cómo se realizó la acción, por lo que es un complemento circunstancial de modo."
      }
    ]
  },
  {
    id: "6.3.6",
    area: 6,
    lang: "es",
    subarea: "6.3 Procesos de composición de textos",
    tema: "Coherencia de un texto",
    note: "Un texto es coherente cuando sus ideas siguen un orden lógico: cada párrafo se conecta con el anterior y prepara el siguiente, sin saltos confusos ni información contradictoria. Para ordenar párrafos desordenados, busca: el párrafo que **presenta** el tema (va primero), los que **desarrollan** con datos o argumentos (van en medio, en orden lógico de causa-efecto o cronológico) y el que **concluye** o cierra la idea (va al final). Fíjate en conectores ('primero', 'después', 'finalmente') y en referencias a información ya mencionada como pistas del orden.",
    flashcards: [
      { front: "¿Qué hace que un texto sea coherente?", back: "Que sus ideas sigan un orden lógico, conectadas entre sí, sin contradicciones ni saltos confusos." },
      { front: "¿Qué pistas ayudan a ordenar párrafos desordenados?", back: "Conectores como 'primero', 'después', 'finalmente', y referencias a información ya mencionada en párrafos anteriores." }
    ],
    quiz: [
      {
        q: "Al ordenar un texto desordenado, ¿qué párrafo debe ir primero?",
        options: ["El que presenta el tema general", "El que contiene la conclusión", "El que da el ejemplo más específico"],
        correct: 0,
        explanation: "El párrafo introductorio presenta el tema y da contexto; sin él, los demás párrafos pierden sentido al leerse."
      },
      {
        q: "Un párrafo comienza con \"Finalmente, se puede concluir que...\". ¿En qué posición del texto debe colocarse?",
        options: ["Al final", "Al principio", "En cualquier parte"],
        correct: 0,
        explanation: "El conector 'finalmente' indica que ese párrafo cierra las ideas expuestas antes, por lo que debe ir al final del texto."
      }
    ]
  },
  {
    id: "6.3.7",
    area: 6,
    lang: "es",
    subarea: "6.3 Procesos de composición de textos",
    tema: "Adecuación de un texto",
    note: "La adecuación es usar el registro (formal o informal) y el vocabulario apropiados según la situación comunicativa: destinatario, propósito y contexto. Un texto formal (carta a una autoridad, ensayo académico) evita modismos, groserías o lenguaje coloquial y usa 'usted'. Un texto informal (mensaje a un amigo) puede usar frases coloquiales y tuteo. Un error de adecuación es, por ejemplo, usar '¿Qué onda, profe?' en una solicitud oficial, o ser demasiado rígido y formal al escribirle a un amigo cercano.",
    flashcards: [
      { front: "¿Qué es la adecuación de un texto?", back: "Usar el vocabulario y el registro (formal/informal) apropiados según el destinatario, el propósito y el contexto." },
      { front: "Da un ejemplo de falta de adecuación.", back: "Usar frases coloquiales como '¿Qué onda?' en una carta formal dirigida a una autoridad." }
    ],
    quiz: [
      {
        q: "¿Cuál de las siguientes frases es adecuada para iniciar una carta formal dirigida al director de una escuela?",
        options: ["Estimado director, por medio de la presente...", "Qué onda, director, le escribo para...", "Hola profe, nomás le quería decir..."],
        correct: 0,
        explanation: "El registro formal exige un saludo respetuoso y estructurado, sin coloquialismos, adecuado para dirigirse a una autoridad."
      },
      {
        q: "En un mensaje de texto a un amigo cercano, ¿qué opción resulta más adecuada al contexto?",
        options: ["Oye, ¿nos vemos al rato?", "Por medio del presente mensaje, le solicito de la manera más atenta que...", "Distinguido amigo, tengo el honor de comunicarle que..."],
        correct: 0,
        explanation: "Entre amigos, lo natural y adecuado es un registro informal y directo, no un lenguaje excesivamente formal."
      }
    ]
  },
  {
    id: "6.4.1",
    area: 6,
    lang: "es",
    subarea: "6.4 Formas orales de la comunicación",
    tema: "Elementos de la exposición oral",
    note: "Una buena exposición oral requiere: **planeación** (investigar y organizar el contenido antes), **apoyos gráficos** (láminas, diapositivas o imágenes que refuercen lo dicho, sin saturarlas de texto), **manejo de voz** (volumen, entonación y ritmo que mantengan la atención), **uso del espacio** (moverse con naturalidad, mantener contacto visual con el público) y **control del tiempo** (ajustarse a la duración asignada sin extenderse ni quedarse corto). Fallar en cualquiera de estos elementos afecta la claridad y el impacto del mensaje.",
    flashcards: [
      { front: "¿Cuáles son los 5 elementos clave de una exposición oral?", back: "Planeación, apoyos gráficos, manejo de voz, uso del espacio y control del tiempo." },
      { front: "¿Qué error común afecta el 'apoyo gráfico' de una exposición?", back: "Saturar las diapositivas con demasiado texto en lugar de usarlas como refuerzo visual breve." }
    ],
    quiz: [
      {
        q: "Un expositor termina su presentación en la mitad del tiempo asignado porque no calculó bien sus contenidos. ¿Qué elemento de la exposición oral falló?",
        options: ["El control del tiempo", "El manejo de voz", "Los apoyos gráficos"],
        correct: 0,
        explanation: "No ajustar la duración de la presentación al tiempo disponible es una falla en el control del tiempo."
      },
      {
        q: "Durante una exposición, el ponente habla mirando siempre al piso y sin moverse del atril. ¿Qué elemento de la exposición oral está descuidando?",
        options: ["El uso del espacio", "La planeación", "El control del tiempo"],
        correct: 0,
        explanation: "No moverse con naturalidad ni mantener contacto visual con el público refleja un mal uso del espacio durante la exposición."
      }
    ]
  },
  {
    id: "6.4.2",
    area: 6,
    lang: "es",
    subarea: "6.4 Formas orales de la comunicación",
    tema: "Características del diálogo",
    note: "El diálogo es un intercambio de información entre dos o más personas que respetan turnos para hablar. Se apoya en **preguntas detonadoras** (preguntas que abren o dirigen la conversación hacia un tema), en el **intercambio de información** (cada participante aporta y recibe datos, ideas u opiniones) y en el respeto al **turno de la palabra** (esperar a que el otro termine antes de hablar, sin interrumpir constantemente). Un diálogo efectivo no es una serie de monólogos alternados, sino una construcción conjunta del tema.",
    flashcards: [
      { front: "¿Qué es una pregunta detonadora en un diálogo?", back: "Una pregunta que abre o dirige la conversación hacia un tema específico, generando participación." },
      { front: "¿Por qué es importante respetar el turno de la palabra?", back: "Porque permite un intercambio ordenado de información, evita interrupciones y facilita que ambas partes se comprendan." }
    ],
    quiz: [
      {
        q: "En una entrevista, el conductor pregunta: \"¿Qué te motivó a estudiar medicina?\" para iniciar la conversación. ¿Qué función cumple esta pregunta?",
        options: ["Es una pregunta detonadora", "Es un cierre del diálogo", "Es una interrupción"],
        correct: 0,
        explanation: "Abre y dirige la conversación hacia un tema específico, función propia de una pregunta detonadora."
      },
      {
        q: "Dos personas hablan pero ninguna deja terminar a la otra, interrumpiéndose constantemente. ¿Qué característica esencial del diálogo se está rompiendo?",
        options: ["El respeto al turno de la palabra", "El uso de preguntas detonadoras", "El apoyo gráfico"],
        correct: 0,
        explanation: "Interrumpir constantemente impide el intercambio ordenado de información, violando el respeto al turno de la palabra."
      }
    ]
  },
  {
    id: "6.4.3",
    area: 6,
    lang: "es",
    subarea: "6.4 Formas orales de la comunicación",
    tema: "Elementos del debate",
    note: "El debate es una forma oral donde dos o más posturas se confrontan con argumentos. Sus elementos son: **exposición de posturas** (cada parte presenta su punto de vista inicial con claridad), **contraposición de ideas** (se señalan las diferencias y desacuerdos entre las posturas) y **desarrollo de argumentos** (cada parte sustenta su postura con razones, datos o ejemplos, no solo opiniones). A diferencia del diálogo, el debate busca defender una posición frente a otra, no necesariamente llegar a un acuerdo.",
    flashcards: [
      { front: "¿Qué diferencia al debate del diálogo?", back: "El debate confronta posturas opuestas defendiendo cada una con argumentos; el diálogo busca un intercambio colaborativo de información." },
      { front: "¿Qué son los 'argumentos' en un debate?", back: "Razones, datos o ejemplos que sustentan una postura, distintos de una simple opinión sin fundamento." }
    ],
    quiz: [
      {
        q: "En un debate sobre el uso de uniformes escolares, un participante dice: \"Estoy en contra, porque limita la expresión individual de los estudiantes, como muestran estudios de psicología educativa.\" ¿Qué elemento del debate representa mejor esta intervención?",
        options: ["Desarrollo de argumentos", "Exposición de posturas sin justificar", "Turno de la palabra"],
        correct: 0,
        explanation: "La intervención sustenta la postura con una razón y una referencia a estudios, es decir, desarrolla un argumento, no solo enuncia una opinión."
      },
      {
        q: "Cuando un participante señala las debilidades del argumento contrario para reforzar su propia postura, ¿qué elemento del debate está aplicando?",
        options: ["Contraposición de ideas", "Exposición de posturas", "Preguntas detonadoras"],
        correct: 0,
        explanation: "Confrontar y señalar diferencias entre las posturas es precisamente la contraposición de ideas, propia del debate."
      }
    ]
  },
  {
    id: "6.4.4",
    area: 6,
    lang: "es",
    subarea: "6.4 Formas orales de la comunicación",
    tema: "Funciones de las formas orales de la comunicación",
    note: "El **diálogo** cumple una función principalmente colaborativa: intercambiar información, aclarar dudas o construir conocimiento en conjunto entre dos o más personas. El **debate** cumple una función argumentativa y persuasiva: defender una postura ante otra, buscando convencer o exponer diferencias de opinión de forma estructurada. Ambas formas orales sirven para comunicar, pero mientras el diálogo busca el entendimiento mutuo, el debate busca sostener y defender un punto de vista frente a posturas contrarias.",
    flashcards: [
      { front: "¿Cuál es la función principal del diálogo?", back: "Intercambiar información y construir conocimiento de forma colaborativa entre los participantes." },
      { front: "¿Cuál es la función principal del debate?", back: "Defender y argumentar una postura frente a otra, con fines persuasivos, evidenciando diferencias de opinión." }
    ],
    quiz: [
      {
        q: "Dos compañeros conversan para ponerse de acuerdo sobre cómo dividir las tareas de un proyecto escolar. ¿Qué función oral están usando principalmente?",
        options: ["La función colaborativa del diálogo", "La función persuasiva del debate", "La función de exposición oral"],
        correct: 0,
        explanation: "Buscan intercambiar información y llegar a un acuerdo conjunto, función característica del diálogo."
      },
      {
        q: "En un torneo escolar, dos equipos defienden posturas opuestas sobre si debe reducirse el uso de celulares en clase, cada uno tratando de convencer al jurado. ¿Qué función oral predomina?",
        options: ["La función argumentativa y persuasiva del debate", "La función colaborativa del diálogo", "La función descriptiva de la reseña"],
        correct: 0,
        explanation: "Se busca defender una postura y persuadir a un jurado frente a una postura contraria, función propia del debate."
      }
    ]
  }
];
