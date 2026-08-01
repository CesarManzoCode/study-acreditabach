const AREA4_TOPICS = [
  {
    id: "4.1.1",
    area: 4,
    subarea: "4.1 Fundamentos del pensamiento filosófico",
    tema: "Filosofía, mito y ciencia",
    note: "Son tres formas distintas de explicar el mundo. El **mito** explica la realidad con relatos de dioses o seres sobrenaturales, sin buscar pruebas. La **filosofía** usa la razón y el cuestionamiento constante ('¿por qué?') para buscar la verdad, sin necesitar experimentos. La **ciencia** también usa la razón, pero exige comprobar todo con **método, observación y experimentos**. En el examen: si algo se explica con dioses o leyendas, es mito; si se explica reflexionando con la razón pero sin comprobar nada, es filosofía; si se comprueba con datos y experimentos, es ciencia.",
    flashcards: [
      { front: "¿Qué caracteriza al pensamiento mítico?", back: "Explica la realidad mediante relatos con dioses o fuerzas sobrenaturales, sin pruebas ni comprobación." },
      { front: "¿Qué distingue a la ciencia de la filosofía?", back: "La ciencia comprueba sus explicaciones con método y experimentos; la filosofía razona y reflexiona sin necesidad de comprobación experimental." }
    ],
    quiz: [
      {
        q: "Una persona explica que llueve porque un dios está llorando. Este tipo de explicación es propia del pensamiento:",
        options: ["Mítico", "Científico", "Filosófico"],
        correct: 0,
        explanation: "Recurrir a dioses o seres sobrenaturales para explicar fenómenos naturales es característico del pensamiento mítico."
      },
      {
        q: "Un investigador mide la temperatura del agua antes y después de un experimento para confirmar su hipótesis. Esto es propio del pensamiento:",
        options: ["Mítico", "Científico", "Filosófico"],
        correct: 1,
        explanation: "El pensamiento científico se caracteriza por comprobar sus afirmaciones mediante observación y método experimental."
      }
    ]
  },
  {
    id: "4.1.2",
    area: 4,
    subarea: "4.1 Fundamentos del pensamiento filosófico",
    tema: "Pensamiento crítico",
    note: "Pensar críticamente significa **no creer todo lo que se dice** sin analizarlo primero. Es cuestionar, buscar evidencias, comparar fuentes y evaluar argumentos antes de aceptar una idea como verdadera. No es ser negativo ni desconfiar de todo por sistema; es analizar con razones. En la vida diaria se ve cuando alguien revisa si una noticia es real antes de compartirla, compara precios y calidad antes de comprar, o pregunta '¿de dónde sacaste ese dato?' en una discusión. Lo opuesto es aceptar información sin cuestionarla, solo porque la dijo alguien con autoridad o porque 'todos lo dicen'.",
    flashcards: [
      { front: "¿Qué es el pensamiento crítico?", back: "La capacidad de analizar, cuestionar y evaluar información y argumentos con razones y evidencia antes de aceptarlos como verdaderos." },
      { front: "Ejemplo cotidiano de pensamiento crítico", back: "Verificar en varias fuentes si una noticia es cierta antes de compartirla en redes sociales." }
    ],
    quiz: [
      {
        q: "¿Cuál situación ejemplifica mejor el pensamiento crítico?",
        options: [
          "Compartir una noticia sin verificarla porque la publicó un amigo",
          "Comparar varias fuentes y datos antes de decidir si una noticia es verdadera",
          "Creer una afirmación solo porque la dijo una persona famosa"
        ],
        correct: 1,
        explanation: "El pensamiento crítico implica analizar y contrastar información antes de aceptarla como verdadera."
      },
      {
        q: "Un estudiante recibe un argumento y pregunta '¿qué pruebas tienes de eso?' antes de aceptarlo. Esta actitud refleja:",
        options: ["Pensamiento mítico", "Pensamiento crítico", "Aceptación pasiva"],
        correct: 1,
        explanation: "Exigir evidencias y razones antes de aceptar una idea es una manifestación de pensamiento crítico."
      }
    ]
  },
  {
    id: "4.1.3",
    area: 4,
    subarea: "4.1 Fundamentos del pensamiento filosófico",
    tema: "Pensamiento existencialista",
    note: "El existencialismo dice que **cada persona es libre y responsable de darle sentido a su propia vida**, mediante sus decisiones. No hay un destino ya escrito: 'la existencia precede a la esencia', es decir, primero existimos y luego, con nuestras elecciones, nos definimos. Una postura existencialista se nota cuando alguien asume la responsabilidad total de sus decisiones, sin culpar al destino, la suerte o la sociedad, y busca su propio sentido de vida aunque sea difícil o angustiante. Ejemplo cotidiano: alguien deja un trabajo estable para dedicarse a lo que realmente le da sentido, aceptando la incertidumbre y la responsabilidad de esa elección.",
    flashcards: [
      { front: "Idea central del existencialismo", back: "El ser humano es libre y responsable de construir el sentido de su propia vida mediante sus decisiones." },
      { front: "¿Qué significa 'la existencia precede a la esencia'?", back: "Que primero existimos, sin un propósito fijo, y después nos definimos a nosotros mismos a través de nuestras elecciones." }
    ],
    quiz: [
      {
        q: "¿Cuál situación refleja una postura existencialista?",
        options: [
          "Aceptar que el destino ya decidió el rumbo de tu vida",
          "Asumir con libertad y responsabilidad las consecuencias de tus propias decisiones",
          "Seguir siempre lo que la mayoría considera correcto sin cuestionarlo"
        ],
        correct: 1,
        explanation: "El existencialismo pone el énfasis en la libertad y la responsabilidad individual sobre las propias elecciones."
      },
      {
        q: "Una persona decide cambiar de carrera profesional a los 40 años, asumiendo el riesgo por completo, porque considera que debe darle un nuevo sentido a su vida. Esto ejemplifica:",
        options: ["Pensamiento mítico", "Determinismo total", "Pensamiento existencialista"],
        correct: 2,
        explanation: "Tomar decisiones libres y responsables para dar sentido a la propia existencia es característico del existencialismo."
      }
    ]
  },
  {
    id: "4.1.4",
    area: 4,
    subarea: "4.1 Fundamentos del pensamiento filosófico",
    tema: "Doxa y episteme",
    note: "Son dos tipos de conocimiento que distinguió la filosofía griega. La **doxa** es la opinión común, basada en la apariencia, el sentido común o lo que 'se dice', sin fundamento riguroso: puede ser cierta o falsa. La **episteme** es el conocimiento verdadero, fundamentado, comprobado y razonado, como el conocimiento científico. Ejemplo de doxa: pensar que el sol 'sale' y 'se mete' porque así se ve a simple vista. Ejemplo de episteme: saber, con base astronómica comprobada, que es la Tierra la que gira alrededor del Sol. En el examen, doxa = opinión/creencia sin sustento; episteme = conocimiento demostrado y fundamentado.",
    flashcards: [
      { front: "¿Qué es la doxa?", back: "La opinión común o creencia basada en la apariencia y el sentido común, sin comprobación rigurosa." },
      { front: "¿Qué es la episteme?", back: "El conocimiento verdadero, fundamentado y comprobado mediante la razón o el método científico." }
    ],
    quiz: [
      {
        q: "Alguien afirma que la Tierra es plana porque 'así se ve' desde donde vive. Esta afirmación es un ejemplo de:",
        options: ["Episteme", "Doxa", "Método científico"],
        correct: 1,
        explanation: "Basarse solo en la apariencia sin comprobación rigurosa es característico de la doxa, la opinión común."
      },
      {
        q: "Un científico concluye, tras mediciones y cálculos comprobados, que la Tierra es geoide (casi esférica). Este conocimiento corresponde a:",
        options: ["Doxa", "Mito", "Episteme"],
        correct: 2,
        explanation: "El conocimiento fundamentado y comprobado mediante método riguroso corresponde a la episteme."
      }
    ]
  },
  {
    id: "4.2.1",
    area: 4,
    subarea: "4.2 Elementos para el desarrollo del pensamiento y de la argumentación",
    tema: "Funciones de la lengua",
    note: "La lengua tiene distintas funciones según la intención del hablante. La **función instrumental** (o apelativa) busca que el receptor haga algo: da órdenes, pide o influye en su conducta ('Cierra la puerta', 'Vota por mí'). La **función emotiva** (expresiva) expresa sentimientos o el estado de ánimo del emisor ('¡Qué feliz estoy!', '¡Qué dolor tan grande!'). También existen la referencial (informar hechos), la poética (cuidar la forma del mensaje) y la fática (mantener el contacto, como 'aló', '¿me escuchas?'). En el examen, identifica si la frase busca **provocar una acción** (instrumental) o **expresar una emoción** (emotiva).",
    flashcards: [
      { front: "¿Para qué sirve la función instrumental del lenguaje?", back: "Para influir en el receptor y lograr que haga algo, mediante órdenes, peticiones o mandatos." },
      { front: "¿Qué expresa la función emotiva del lenguaje?", back: "Los sentimientos, emociones o el estado de ánimo del emisor." }
    ],
    quiz: [
      {
        q: "La frase '¡Por favor, apaga la luz al salir!' cumple principalmente la función:",
        options: ["Instrumental", "Emotiva", "Poética"],
        correct: 0,
        explanation: "La frase busca que el receptor realice una acción, lo cual es propio de la función instrumental o apelativa."
      },
      {
        q: "La frase '¡Qué alegría tan enorme siento hoy!' cumple principalmente la función:",
        options: ["Referencial", "Emotiva", "Instrumental"],
        correct: 1,
        explanation: "La frase expresa el sentimiento del emisor, lo que corresponde a la función emotiva del lenguaje."
      }
    ]
  },
  {
    id: "4.2.2",
    area: 4,
    subarea: "4.2 Elementos para el desarrollo del pensamiento y de la argumentación",
    tema: "Premisas y conclusión del argumento",
    note: "Un argumento tiene dos partes: las **premisas**, que son los enunciados que dan apoyo o razones (el 'porque'), y la **conclusión**, que es la idea principal que se quiere probar o defender (lo que se sostiene). Por ejemplo: 'Todos los mamíferos respiran aire (premisa). El delfín es mamífero (premisa). Por lo tanto, el delfín respira aire (conclusión)'. Para identificarlas en un texto, busca palabras clave: 'porque', 'ya que', 'dado que' suelen introducir premisas; 'por lo tanto', 'en consecuencia', 'así que' suelen introducir la conclusión. La conclusión es la afirmación central que las premisas sostienen.",
    flashcards: [
      { front: "¿Qué es la premisa de un argumento?", back: "El enunciado que sirve de razón o apoyo para sostener la conclusión." },
      { front: "¿Qué palabras suelen anunciar la conclusión de un argumento?", back: "'Por lo tanto', 'en consecuencia', 'así que', entre otras que indican el resultado del razonamiento." }
    ],
    quiz: [
      {
        q: "En el texto: 'Hace mucho frío y está nublado, por lo tanto, probablemente llueva hoy', la conclusión es:",
        options: ["Hace mucho frío", "Está nublado", "Probablemente llueva hoy"],
        correct: 2,
        explanation: "La conclusión es la afirmación que se sostiene a partir de las razones dadas, introducida aquí por 'por lo tanto'."
      },
      {
        q: "En el argumento 'Como todos los estudiantes deben presentar el examen y tú eres estudiante, debes presentarlo', ¿cuál enunciado es una premisa?",
        options: ["Debes presentarlo", "Todos los estudiantes deben presentar el examen", "Ninguno de los anteriores"],
        correct: 1,
        explanation: "Esta afirmación es una de las razones que sostienen la conclusión, por lo que funciona como premisa."
      }
    ]
  },
  {
    id: "4.2.3",
    area: 4,
    subarea: "4.2 Elementos para el desarrollo del pensamiento y de la argumentación",
    tema: "Argumentos deductivos, inductivos y analógicos",
    note: "El argumento **deductivo** va de lo general a lo particular y, si las premisas son verdaderas, la conclusión es necesariamente verdadera ('Todos los perros son mamíferos; Firulais es perro; por lo tanto, es mamífero'). El **inductivo** va de casos particulares a una conclusión general probable, no segura ('He visto 100 cisnes blancos, por lo tanto todos los cisnes son blancos'). El **analógico** compara dos casos parecidos para concluir que lo válido para uno aplica al otro ('Ese medicamento funcionó en ratones, por lo tanto podría funcionar en humanos, porque ambos son mamíferos'). Clave: deductivo = certeza general→particular; inductivo = generalización a partir de casos; analógico = comparación entre casos similares.",
    flashcards: [
      { front: "¿Cómo funciona un argumento deductivo?", back: "Parte de una regla o premisa general y, con certeza, llega a una conclusión particular." },
      { front: "¿Cómo funciona un argumento analógico?", back: "Compara dos situaciones similares y concluye que lo que aplica a una también aplica a la otra." }
    ],
    quiz: [
      {
        q: "'He probado 5 mangos de este árbol y todos estaban dulces, por lo tanto todos los mangos del árbol son dulces.' Este es un argumento:",
        options: ["Deductivo", "Inductivo", "Analógico"],
        correct: 1,
        explanation: "Se generaliza una conclusión probable a partir de varios casos particulares observados, lo cual es propio del razonamiento inductivo."
      },
      {
        q: "'Este tratamiento funcionó bien en un país con clima similar al nuestro, por lo tanto probablemente funcione aquí también.' Este es un argumento:",
        options: ["Deductivo", "Analógico", "Inductivo"],
        correct: 1,
        explanation: "Se compara una situación con otra similar para trasladar una conclusión, lo que caracteriza al razonamiento analógico."
      }
    ]
  },
  {
    id: "4.2.4",
    area: 4,
    subarea: "4.2 Elementos para el desarrollo del pensamiento y de la argumentación",
    tema: "Tipos de discurso argumentativo (debate, mayéutica, ensayo o deliberación)",
    note: "El **debate** es una confrontación de posturas opuestas, cada parte defiende su punto de vista para convencer a un público o jurado. La **mayéutica** (método socrático) consiste en hacer preguntas sucesivas para que el otro descubra por sí mismo la verdad o las contradicciones de su pensamiento, sin imponer una respuesta. El **ensayo** es un texto escrito donde el autor expone y defiende su propia postura con argumentos, de forma libre y personal. La **deliberación** es un proceso de análisis conjunto de opciones antes de tomar una decisión, sopesando ventajas y desventajas, buscando acuerdo más que ganar. Identifica el contexto: ¿hay confrontación pública? Debate. ¿Preguntas guiadas? Mayéutica. ¿Texto escrito individual? Ensayo. ¿Se busca decidir en conjunto? Deliberación.",
    flashcards: [
      { front: "¿En qué consiste la mayéutica?", back: "En hacer preguntas sucesivas para que la otra persona descubra por sí misma la verdad o sus contradicciones, método usado por Sócrates." },
      { front: "¿Qué caracteriza a la deliberación?", back: "El análisis conjunto de opciones, ventajas y desventajas, para llegar a una decisión, más que confrontar posturas." }
    ],
    quiz: [
      {
        q: "Un profesor hace preguntas sucesivas a un alumno hasta que este se da cuenta por sí mismo de un error en su razonamiento. Esto ejemplifica:",
        options: ["Debate", "Mayéutica", "Ensayo"],
        correct: 1,
        explanation: "Guiar mediante preguntas para que el otro descubra la verdad por sí mismo es el método mayéutico de Sócrates."
      },
      {
        q: "Un grupo de vecinos se reúne para analizar juntos las ventajas y desventajas de instalar cámaras de seguridad antes de decidir. Este proceso es un ejemplo de:",
        options: ["Deliberación", "Ensayo", "Debate"],
        correct: 0,
        explanation: "Analizar opciones en conjunto para tomar una decisión, sopesando pros y contras, corresponde a la deliberación."
      }
    ]
  },
  {
    id: "4.3.1",
    area: 4,
    subarea: "4.3 Construcción de la persona para la convivencia",
    tema: "Postulados de las teorías éticas",
    note: "El **hedonismo** sostiene que el bien supremo es el placer y evitar el dolor; se actúa bien cuando se busca el disfrute o el bienestar personal inmediato. El **estoicismo** propone alcanzar la felicidad controlando las pasiones y deseos mediante la razón, aceptando con serenidad lo que no se puede cambiar ('lo que no depende de mí no debe alterarme'). El **utilitarismo** afirma que una acción es buena si produce el mayor bienestar o felicidad para el mayor número de personas posible (el bien colectivo por encima del individual). Para identificarlos: si se prioriza el placer propio, es hedonismo; si se prioriza el autocontrol y la aceptación racional, es estoicismo; si se prioriza el beneficio de la mayoría, es utilitarismo.",
    flashcards: [
      { front: "¿Qué propone el hedonismo?", back: "Que el bien supremo es buscar el placer y evitar el dolor o sufrimiento." },
      { front: "¿Qué propone el utilitarismo?", back: "Que una acción es correcta si genera el mayor bienestar posible para el mayor número de personas." }
    ],
    quiz: [
      {
        q: "Un gobierno decide construir un hospital porque beneficiará a la mayor cantidad de ciudadanos posible, aunque afecte a unos pocos. Esta decisión refleja principios:",
        options: ["Hedonistas", "Utilitaristas", "Estoicos"],
        correct: 1,
        explanation: "Buscar el mayor beneficio para el mayor número de personas es el principio central del utilitarismo."
      },
      {
        q: "Una persona enfrenta una pérdida difícil y decide aceptarla con calma, pues entiende que no está en sus manos cambiarla, y se enfoca en controlar su reacción. Esta actitud refleja:",
        options: ["Estoicismo", "Hedonismo", "Utilitarismo"],
        correct: 0,
        explanation: "Aceptar con serenidad lo que no se puede controlar y regular las pasiones mediante la razón es propio del estoicismo."
      }
    ]
  },
  {
    id: "4.3.2",
    area: 4,
    subarea: "4.3 Construcción de la persona para la convivencia",
    tema: "Los valores y su definición",
    note: "Los valores son principios que guían la conducta. Algunos clave: **justicia** (dar a cada quien lo que le corresponde), **respeto** (reconocer y valorar al otro tal como es), **empatía** (ponerse en el lugar del otro y comprender lo que siente), **honestidad** (actuar y decir la verdad, sin engañar), **tolerancia** (aceptar y respetar diferencias, aunque no se compartan), **solidaridad** (apoyar a otros, especialmente en dificultades, sin esperar nada a cambio), **integridad** (actuar conforme a los propios principios, siempre igual), **responsabilidad** (cumplir con las obligaciones y afrontar las consecuencias de los actos), **igualdad** (mismos derechos y oportunidades para todos), **libertad** (poder decidir y actuar sin coacción, respetando al otro) y **prudencia** (actuar con cautela y buen juicio, midiendo consecuencias). El examen suele pedir relacionar la situación descrita con el valor correspondiente.",
    flashcards: [
      { front: "Definición de empatía", back: "La capacidad de ponerse en el lugar del otro y comprender lo que siente." },
      { front: "Definición de solidaridad", back: "Apoyar a otras personas, sobre todo en momentos difíciles, sin esperar nada a cambio." }
    ],
    quiz: [
      {
        q: "Varios vecinos organizan una colecta para ayudar a una familia que perdió su casa en un incendio, sin esperar recompensa. Este acto ejemplifica el valor de la:",
        options: ["Prudencia", "Solidaridad", "Igualdad"],
        correct: 1,
        explanation: "Ayudar a otros en dificultades sin esperar nada a cambio es una expresión del valor de la solidaridad."
      },
      {
        q: "Un juez dicta una sentencia dando a cada parte lo que legalmente le corresponde, sin favoritismos. Esto refleja el valor de la:",
        options: ["Justicia", "Empatía", "Tolerancia"],
        correct: 0,
        explanation: "Dar a cada quien lo que le corresponde según lo justo es la definición del valor de la justicia."
      }
    ]
  },
  {
    id: "4.3.3",
    area: 4,
    subarea: "4.3 Construcción de la persona para la convivencia",
    tema: "Tipos de normas",
    note: "Las normas regulan la conducta humana y son de distintos tipos. Las **normas jurídicas** son leyes creadas por el Estado, de cumplimiento obligatorio, con sanciones legales si se incumplen (ej. no robar, pagar impuestos). Las **normas morales** provienen de la conciencia individual sobre lo bueno y lo malo, su sanción es el remordimiento (ej. no mentir a un amigo). Las **normas sociales** son reglas de comportamiento aceptadas por un grupo o cultura, cuya sanción es el rechazo social (ej. saludar, no interrumpir). Las **normas religiosas** provienen de creencias y doctrinas de una fe, y su incumplimiento se sanciona según esa religión (ej. guardar un día de descanso religioso). Clave: identifica quién sanciona el incumplimiento para saber el tipo de norma.",
    flashcards: [
      { front: "¿Qué caracteriza a las normas jurídicas?", back: "Son leyes creadas por el Estado, de cumplimiento obligatorio, con sanciones legales establecidas." },
      { front: "¿Qué sanciona el incumplimiento de una norma social?", back: "El rechazo o la desaprobación del grupo social, no una ley ni la conciencia individual." }
    ],
    quiz: [
      {
        q: "No pagar impuestos y recibir una multa del gobierno es una consecuencia de incumplir una norma:",
        options: ["Moral", "Jurídica", "Social"],
        correct: 1,
        explanation: "Las normas jurídicas son creadas por el Estado y su incumplimiento conlleva sanciones legales como multas."
      },
      {
        q: "Una persona se siente culpable después de mentirle a un amigo, aunque nadie más lo sepa. Esta sanción interna corresponde al incumplimiento de una norma:",
        options: ["Jurídica", "Social", "Moral"],
        correct: 2,
        explanation: "Las normas morales provienen de la conciencia individual y su sanción es el remordimiento personal."
      }
    ]
  },
  {
    id: "4.4.1",
    area: 4,
    subarea: "4.4 Reflexión política y participación ciudadana",
    tema: "Autonomía y heteronomía",
    note: "La **autonomía** es la capacidad de una persona de decidir y darse sus propias normas de conducta usando su propio juicio y razón, sin depender de una autoridad externa. La **heteronomía** ocurre cuando las normas de conducta vienen impuestas desde afuera (otra persona, la ley, la tradición o la autoridad) y se obedecen sin cuestionarlas ni haberlas elegido libremente. Ejemplo de autonomía: alguien decide no copiar en un examen porque considera, por convicción propia, que es incorrecto. Ejemplo de heteronomía: alguien no copia solo por miedo a ser castigado por el profesor. La clave está en si la decisión nace de la propia reflexión (autonomía) o de una imposición externa (heteronomía).",
    flashcards: [
      { front: "¿Qué es la autonomía en la toma de decisiones?", back: "La capacidad de decidir y regirse por normas propias, basadas en el propio juicio y razón, sin depender de una autoridad externa." },
      { front: "¿Qué es la heteronomía?", back: "Actuar conforme a normas impuestas desde afuera, obedeciendo por autoridad o imposición externa, sin decisión propia." }
    ],
    quiz: [
      {
        q: "Un joven decide no fumar porque, tras reflexionar, considera que dañaría su salud, y no porque sus padres se lo prohíban. Esta decisión refleja:",
        options: ["Heteronomía", "Autonomía", "Obediencia ciega"],
        correct: 1,
        explanation: "Decidir con base en la propia reflexión y convicción, sin imposición externa, es un ejemplo de autonomía."
      },
      {
        q: "Un empleado solo llega puntual al trabajo por miedo a ser despedido, sin creer realmente en la importancia de la puntualidad. Esta conducta refleja:",
        options: ["Autonomía", "Heteronomía", "Prudencia"],
        correct: 1,
        explanation: "Actuar únicamente por una norma o autoridad externa, sin convicción propia, es un ejemplo de heteronomía."
      }
    ]
  },
  {
    id: "4.4.2",
    area: 4,
    subarea: "4.4 Reflexión política y participación ciudadana",
    tema: "Discurso político",
    note: "El discurso político es el mensaje que emiten actores públicos (candidatos, gobernantes, partidos) para **persuadir a la ciudadanía**, defender ideas, proponer soluciones o justificar decisiones de gobierno. Suele usar recursos como apelar a las emociones del público, promesas de campaña, críticas a los adversarios, y datos o cifras (a veces exagerados) para respaldar su postura. Su función principal es influir en la opinión pública y ganar apoyo o votos. En el examen, identifica un discurso político por su intención de convencer sobre temas de gobierno, propuestas de campaña o defensa de una gestión pública, dirigido a la ciudadanía.",
    flashcards: [
      { front: "¿Cuál es la función principal del discurso político?", back: "Persuadir a la ciudadanía, defender ideas o propuestas y ganar apoyo u opinión favorable sobre temas de gobierno." },
      { front: "¿Qué recursos suele usar el discurso político?", back: "Apelaciones emocionales, promesas de campaña, cifras o datos y crítica a los adversarios políticos." }
    ],
    quiz: [
      {
        q: "Un candidato, en un mitin, promete mejorar la seguridad y el empleo si es elegido, y pide el voto de los asistentes. Este mensaje es un ejemplo de:",
        options: ["Discurso científico", "Discurso político", "Discurso poético"],
        correct: 1,
        explanation: "Un mensaje que busca persuadir a la ciudadanía con propuestas de campaña y pedir su apoyo es un discurso político."
      },
      {
        q: "¿Cuál es el objetivo principal de un discurso político?",
        options: [
          "Informar exclusivamente datos técnicos sin intención de persuadir",
          "Persuadir a la ciudadanía y ganar apoyo para una postura o propuesta",
          "Expresar sentimientos personales sin relación con la sociedad"
        ],
        correct: 1,
        explanation: "El discurso político busca ante todo convencer y ganar el respaldo de la ciudadanía hacia una idea o propuesta."
      }
    ]
  },
  {
    id: "4.5.1",
    area: 4,
    subarea: "4.5 La humanidad ante los desafíos contemporáneos",
    tema: "Principios de bioética",
    note: "La bioética evalúa decisiones sobre la vida y la salud con cuatro principios clave. **Autonomía**: respetar la capacidad del paciente de decidir sobre su propio cuerpo y tratamiento. **Justicia**: distribuir los recursos de salud de forma equitativa, sin discriminación. **Beneficencia**: hacer el bien activamente, actuar buscando el beneficio del paciente o de otros (por ejemplo, ayudar a quien lo necesita). **No maleficencia**: no causar daño, evitar perjudicar al paciente o a terceros. Para el examen: si se respeta la decisión de alguien sobre su cuerpo, es autonomía; si se reparten recursos con equidad, es justicia; si se hace el bien de forma activa (donar, ayudar), es beneficencia; si se evita causar un daño, es no maleficencia.",
    flashcards: [
      { front: "¿Qué es el principio de beneficencia en bioética?", back: "Actuar de forma activa buscando el bien o el beneficio de otras personas, como ayudar o donar." },
      { front: "¿Qué es el principio de no maleficencia?", back: "Evitar causar daño al paciente o a terceras personas en las decisiones y acciones médicas." }
    ],
    quiz: [
      {
        q: "Una empresa dona alimentos de forma regular a personas en situación de calle para mejorar su bienestar. Esto ejemplifica el principio de:",
        options: ["No maleficencia", "Beneficencia", "Autonomía"],
        correct: 1,
        explanation: "Actuar activamente en busca del bien de otras personas, como donar alimentos, corresponde al principio de beneficencia."
      },
      {
        q: "Un médico respeta la decisión de un paciente adulto de rechazar un tratamiento, aunque él no esté de acuerdo. Esto refleja el principio de:",
        options: ["Justicia", "Autonomía", "No maleficencia"],
        correct: 1,
        explanation: "Respetar la capacidad de decisión del paciente sobre su propio cuerpo es el principio de autonomía."
      }
    ]
  },
  {
    id: "4.5.2",
    area: 4,
    subarea: "4.5 La humanidad ante los desafíos contemporáneos",
    tema: "Principios éticos aplicados a la sustentabilidad",
    note: "La sustentabilidad desde una postura ética implica cuidar el planeta pensando en **el bienestar de las futuras generaciones**, no solo en el beneficio inmediato. Se basa en principios como la responsabilidad (asumir las consecuencias del propio impacto ambiental), la justicia intergeneracional (no comprometer los recursos que necesitarán quienes vengan después) y el equilibrio entre desarrollo económico, social y ambiental. Ejemplo: una fábrica que decide invertir en tecnología limpia, aunque cueste más, para no contaminar el agua que usa la comunidad, está actuando desde una ética de la sustentabilidad, priorizando el bienestar colectivo y futuro sobre la ganancia inmediata.",
    flashcards: [
      { front: "¿Qué busca la ética aplicada a la sustentabilidad?", back: "Cuidar el ambiente y los recursos pensando en el bienestar de las generaciones futuras, no solo en el beneficio inmediato." },
      { front: "¿Qué es la justicia intergeneracional en sustentabilidad?", back: "No comprometer ni agotar los recursos naturales que necesitarán las generaciones futuras." }
    ],
    quiz: [
      {
        q: "Una fábrica invierte en tecnología limpia, aunque sea más cara, para no contaminar el agua que la comunidad usará en el futuro. Esta decisión refleja una postura ética de:",
        options: ["Hedonismo", "Sustentabilidad", "Heteronomía"],
        correct: 1,
        explanation: "Priorizar el cuidado ambiental pensando en las futuras generaciones es una postura ética de sustentabilidad."
      },
      {
        q: "¿Cuál principio se relaciona directamente con la ética de la sustentabilidad?",
        options: [
          "Buscar la máxima ganancia inmediata sin importar el impacto ambiental",
          "No comprometer los recursos que necesitarán las generaciones futuras",
          "Actuar únicamente según las tradiciones religiosas de una comunidad"
        ],
        correct: 1,
        explanation: "La sustentabilidad ética busca preservar los recursos para el bienestar de las generaciones futuras."
      }
    ]
  },
  {
    id: "4.5.3",
    area: 4,
    subarea: "4.5 La humanidad ante los desafíos contemporáneos",
    tema: "Perspectiva de género",
    note: "La perspectiva de género analiza cómo la sociedad asigna roles, expectativas y trato distinto a hombres y mujeres, muchas veces de forma desigual. Los **roles de género** son las conductas que la sociedad 'espera' según el sexo (ej. que las mujeres cuiden el hogar y los hombres trabajen fuera). El **patriarcado** es un sistema social donde el poder y la autoridad se concentran principalmente en los hombres, generando desigualdad hacia las mujeres. Los **micromachismos** son actitudes cotidianas, sutiles y a veces 'normalizadas', que refuerzan la desigualdad de género sin ser violencia física evidente (ej. interrumpir constantemente a una mujer en una reunión, o suponer que solo ella debe encargarse de los hijos).",
    flashcards: [
      { front: "¿Qué son los roles de género?", back: "Las conductas y expectativas que la sociedad asigna a las personas según su sexo, muchas veces de forma desigual." },
      { front: "¿Qué son los micromachismos?", back: "Actitudes cotidianas y sutiles, normalizadas socialmente, que refuerzan la desigualdad de género sin ser violencia física evidente." }
    ],
    quiz: [
      {
        q: "En una reunión de trabajo, a una mujer se le interrumpe constantemente cuando habla, mientras a los hombres se les escucha completo. Esto es un ejemplo de:",
        options: ["Micromachismo", "Patriarcado institucional", "Rol de género tradicional"],
        correct: 0,
        explanation: "Los micromachismos son actitudes sutiles y cotidianas que refuerzan la desigualdad de género, como interrumpir sistemáticamente a las mujeres."
      },
      {
        q: "Un sistema social donde el poder y las decisiones importantes están concentradas principalmente en manos de los hombres se conoce como:",
        options: ["Patriarcado", "Matriarcado", "Igualdad de género"],
        correct: 0,
        explanation: "El patriarcado es el sistema social en el que el poder y la autoridad se concentran mayoritariamente en los hombres."
      }
    ]
  },
  {
    id: "4.5.4",
    area: 4,
    subarea: "4.5 La humanidad ante los desafíos contemporáneos",
    tema: "Reconocimiento de la alteridad",
    note: "La alteridad es reconocer al **otro como persona distinta a mí, con su propia dignidad y valor**, sin verlo como inferior ni intentar que sea igual a uno mismo. Reconocer la alteridad significa aceptar y respetar las diferencias (culturales, físicas, de pensamiento) sin excluir ni discriminar. Frente a problemas de exclusión social (discriminación a migrantes, personas con discapacidad, comunidades indígenas, etc.), la solución basada en el reconocimiento de la alteridad implica **incluir activamente al otro, escuchar su perspectiva y valorar su diferencia como algo legítimo**, en vez de ignorarlo o forzarlo a adaptarse por completo. Ejemplo: una escuela que adapta sus instalaciones y métodos para incluir a estudiantes con discapacidad, reconociendo y respetando su forma distinta de participar.",
    flashcards: [
      { front: "¿Qué es la alteridad?", back: "El reconocimiento del otro como persona distinta, con su propia dignidad y valor, sin verlo como inferior." },
      { front: "¿Cómo se soluciona la exclusión social mediante la alteridad?", back: "Incluyendo activamente al otro, respetando y valorando sus diferencias en vez de ignorarlas o forzarlo a adaptarse." }
    ],
    quiz: [
      {
        q: "Una escuela adapta sus instalaciones y métodos de enseñanza para incluir a estudiantes con discapacidad, respetando su forma de participar. Esta acción refleja:",
        options: ["Exclusión social", "Reconocimiento de la alteridad", "Heteronomía"],
        correct: 1,
        explanation: "Incluir y respetar activamente al otro en su diferencia es una expresión del reconocimiento de la alteridad."
      },
      {
        q: "¿Cuál actitud refleja el reconocimiento de la alteridad frente a una comunidad indígena?",
        options: [
          "Exigir que abandonen sus costumbres para 'integrarse' completamente",
          "Ignorar sus tradiciones porque no coinciden con la mayoría",
          "Escuchar y valorar sus tradiciones como legítimas y distintas a las propias"
        ],
        correct: 2,
        explanation: "Reconocer la alteridad implica valorar y respetar las diferencias del otro, no obligarlo a adaptarse ni ignorarlo."
      }
    ]
  },
  {
    id: "4.5.5",
    area: 4,
    subarea: "4.5 La humanidad ante los desafíos contemporáneos",
    tema: "Relación entre humanos y otros seres vivos",
    note: "El humanismo reflexiona sobre cómo deben tratarse los seres humanos frente a los demás seres vivos (animales, plantas, ecosistemas). Una postura humanista frente a estos dilemas defiende un trato ético y responsable: evitar el sufrimiento innecesario de los animales, cuidar la biodiversidad y reconocer que, aunque el ser humano tiene capacidades distintas (razón, lenguaje), esto no le da derecho a explotar o maltratar a otros seres vivos sin límite. Ejemplo de dilema: el uso de animales en experimentos científicos; una postura humanista busca minimizar el sufrimiento animal y solo justificarlo cuando exista un beneficio real y no haya alternativas, priorizando siempre el respeto a la vida.",
    flashcards: [
      { front: "¿Qué defiende una postura humanista sobre el trato a los animales?", back: "Un trato ético y responsable que evite el sufrimiento innecesario y respete la vida, aunque el humano tenga capacidades distintas." },
      { front: "Ejemplo de dilema ético entre humanos y otros seres vivos", back: "El uso de animales en experimentos científicos, donde se debe buscar minimizar el sufrimiento y justificar solo lo estrictamente necesario." }
    ],
    quiz: [
      {
        q: "Un laboratorio decide usar animales en pruebas solo cuando no existe otra alternativa, y busca minimizar su sufrimiento. Esta postura es:",
        options: ["Utilitarista extrema", "Humanista", "Indiferente"],
        correct: 1,
        explanation: "Buscar minimizar el sufrimiento animal y justificar su uso solo cuando es necesario refleja una postura humanista y ética."
      },
      {
        q: "¿Cuál principio guía una postura humanista sobre la relación entre humanos y otros seres vivos?",
        options: [
          "Los animales pueden ser explotados sin límite porque carecen de razón",
          "El respeto a la vida y evitar el sufrimiento innecesario de otros seres vivos",
          "Solo importa el bienestar humano, sin considerar a otros seres vivos"
        ],
        correct: 1,
        explanation: "El humanismo defiende el respeto a la vida y evitar el sufrimiento innecesario, más allá del propio beneficio humano."
      }
    ]
  },
  {
    id: "4.6.1",
    area: 4,
    subarea: "4.6 Reflexiones sobre el arte, el sentimiento y la sensibilidad",
    tema: "Categorías estéticas",
    note: "Son formas en que percibimos y valoramos el arte o la realidad. Lo **bello** genera placer, armonía y agrado a los sentidos. Lo **grotesco** es lo deforme, exagerado o feo de forma llamativa, que puede causar rechazo o extrañeza. Lo **cómico** provoca risa, por lo absurdo, exagerado o incongruente de una situación. Lo **trágico** provoca dolor o compasión ante un sufrimiento inevitable, generalmente con un final funesto que el personaje no puede evitar. Lo **sublime** causa una admiración mezclada con asombro o incluso temor, ante algo que supera la comprensión o la escala humana (ej. una tormenta gigantesca, un paisaje inmenso). Identifica la emoción que provoca la obra o situación para clasificar la categoría.",
    flashcards: [
      { front: "¿Qué provoca lo trágico como categoría estética?", back: "Dolor o compasión ante un sufrimiento inevitable, generalmente con un desenlace funesto que el personaje no puede evitar." },
      { front: "¿Qué caracteriza a lo sublime?", back: "Una admiración mezclada con asombro o temor ante algo que supera la comprensión o escala humana, como un paisaje inmenso." }
    ],
    quiz: [
      {
        q: "Una persona observa una tormenta gigantesca en el mar y siente una mezcla de asombro y pequeñez frente a su magnitud. Esta experiencia corresponde a la categoría de:",
        options: ["Lo cómico", "Lo sublime", "Lo grotesco"],
        correct: 1,
        explanation: "La admiración mezclada con asombro o temor ante algo que supera la escala humana corresponde a lo sublime."
      },
      {
        q: "Un personaje de una obra de teatro muere inevitablemente al final, a pesar de sus esfuerzos, generando compasión en el público. Esta obra pertenece a la categoría de:",
        options: ["Lo trágico", "Lo cómico", "Lo bello"],
        correct: 0,
        explanation: "Un sufrimiento inevitable que provoca dolor y compasión en el espectador es característico de lo trágico."
      }
    ]
  },
  {
    id: "4.6.2",
    area: 4,
    subarea: "4.6 Reflexiones sobre el arte, el sentimiento y la sensibilidad",
    tema: "Definición de hermenéutica",
    note: "La hermenéutica es la **disciplina o el arte de interpretar textos y símbolos** para comprender su sentido más profundo, más allá de lo literal. Se usa para interpretar obras literarias, textos religiosos, leyes o cualquier mensaje que requiera entender su contexto, intención y significado oculto. No se queda solo en 'qué dicen las palabras', sino que busca entender 'qué quiso decir' el autor y qué sentido tiene para quien lo interpreta, considerando el contexto histórico y cultural. En el examen, si la pregunta habla de 'interpretar el sentido profundo de un texto o símbolo', se refiere a la hermenéutica.",
    flashcards: [
      { front: "¿Qué es la hermenéutica?", back: "La disciplina que se encarga de interpretar textos y símbolos para comprender su sentido profundo, más allá del significado literal." },
      { front: "¿En qué se enfoca la hermenéutica además del significado literal?", back: "En el contexto, la intención del autor y el sentido más profundo del mensaje o símbolo." }
    ],
    quiz: [
      {
        q: "Un especialista analiza un texto religioso antiguo considerando su contexto histórico para comprender su verdadero sentido, más allá de las palabras literales. Esta actividad corresponde a:",
        options: ["La retórica", "La hermenéutica", "La mayéutica"],
        correct: 1,
        explanation: "Interpretar el sentido profundo de un texto considerando su contexto es la tarea propia de la hermenéutica."
      },
      {
        q: "¿Cuál es la definición más precisa de hermenéutica?",
        options: [
          "La técnica de memorizar textos literarios sin analizarlos",
          "La disciplina de interpretar textos y símbolos para comprender su sentido profundo",
          "El estudio exclusivo de la gramática y la ortografía"
        ],
        correct: 1,
        explanation: "La hermenéutica se define como la disciplina dedicada a la interpretación de textos y símbolos para captar su significado profundo."
      }
    ]
  }
];
