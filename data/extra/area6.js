/* Contenido adicional del área 6 · Lengua y comunicación (Español e Inglés)
   Se CONCATENA al final de flashcards y quiz de cada tema (ver engine.js). */

const AREA6_EXTRA = {
  /* ---------------- 6.1 Comprensión lectora ---------------- */

  "6.1.1": {
    flashcards: [
      { front: "¿Qué diferencia hay entre tema, idea principal y título?", back: "El **tema** es el asunto en pocas palabras; la **idea principal** es la afirmación central sobre ese asunto; el **título** anuncia el tema de forma breve y atractiva." },
      { front: "¿Cómo se descarta un título incorrecto?", back: "Si solo cubre un párrafo o un dato aislado, es demasiado estrecho; si podría encabezar cualquier texto del tema, es demasiado amplio." }
    ],
    quiz: [
      { q: "Un texto explica qué es el reciclaje, cómo se separa la basura y qué beneficios trae. ¿Cuál sería el mejor título?", options: ["El reciclaje: separación de residuos y sus beneficios", "Los camiones de basura de la ciudad", "El medio ambiente"], correct: 0, explanation: "Abarca todo el contenido sin quedarse en un detalle ni volverse tan general que no diga nada." },
      { q: "¿Por qué un título como 'La historia del planeta' sería inadecuado para un texto sobre el deshielo del Ártico?", options: ["Porque es demasiado amplio y no refleja el contenido específico", "Porque es demasiado específico", "Porque no menciona a ningún autor"], correct: 0, explanation: "Un buen título debe corresponder al alcance real del texto, ni más ni menos." },
      { q: "En un texto expositivo, ¿dónde suele estar la idea principal de cada párrafo?", options: ["Con frecuencia en la primera oración, que después se desarrolla", "Siempre en la última palabra", "Nunca aparece explícita"], correct: 0, explanation: "La oración temática suele abrir el párrafo; el resto la explica, la ejemplifica o la matiza." }
    ]
  },

  "6.1.2": {
    flashcards: [
      { front: "¿Qué conectores marcan contraste?", back: "Sin embargo, no obstante, pero, en cambio, por el contrario, aunque. Anuncian que lo que sigue matiza o se opone a lo anterior." },
      { front: "¿Qué conectores marcan consecuencia?", back: "Por lo tanto, en consecuencia, así que, de modo que, por eso. Introducen el efecto de lo dicho antes." }
    ],
    quiz: [
      { q: "\"Estudió toda la semana; ______, aprobó el examen sin dificultad.\" ¿Qué conector completa la relación?", options: ["por lo tanto", "sin embargo", "aunque"], correct: 0, explanation: "Hay una relación de causa-consecuencia: estudiar produjo el resultado." },
      { q: "\"El proyecto era prometedor; ______, no consiguió financiamiento.\" ¿Qué conector corresponde?", options: ["sin embargo", "por lo tanto", "además"], correct: 0, explanation: "La segunda idea contradice la expectativa que crea la primera: es contraste." },
      { q: "\"Muchos animales hibernan en invierno: los osos, las marmotas y algunos murciélagos.\" ¿Qué relación lógica hay?", options: ["Ejemplificación", "Causalidad", "Contraste"], correct: 0, explanation: "Los dos puntos introducen casos concretos que ilustran la afirmación anterior." },
      { q: "La expresión \"debido a\" introduce:", options: ["Una causa", "Una consecuencia", "Un ejemplo"], correct: 0, explanation: "Señala el motivo de lo enunciado; 'por lo tanto' señalaría el efecto." }
    ]
  },

  "6.1.3": {
    flashcards: [
      { front: "¿Qué son las palabras de enlace en un mapa conceptual?", back: "Las que se escriben sobre las líneas para explicar la relación entre dos conceptos ('se divide en', 'produce', 'requiere'). Sin ellas el mapa es solo un esquema." },
      { front: "¿En qué se diferencia un mapa conceptual de un mapa mental?", back: "El **conceptual** organiza conceptos jerárquicamente con relaciones explícitas; el **mental** irradia ideas libres desde un centro, con más apoyo visual y menos jerarquía formal." }
    ],
    quiz: [
      { q: "En un mapa conceptual sobre 'Estados de la materia', ¿qué concepto va en el nivel superior?", options: ["Materia", "Hielo", "Sólido"], correct: 0, explanation: "Es el concepto más general: los estados se desprenden de él y el hielo es un ejemplo del sólido." },
      { q: "Se tienen los conceptos: vertebrados, animales, mamíferos y perro. ¿Cuál es el orden jerárquico correcto?", options: ["Animales → vertebrados → mamíferos → perro", "Perro → mamíferos → vertebrados → animales", "Vertebrados → animales → perro → mamíferos"], correct: 0, explanation: "Se va de lo más general (animales) a lo más particular (perro), y cada nivel está contenido en el anterior." },
      { q: "¿Qué función cumplen las líneas y las palabras de enlace en un mapa conceptual?", options: ["Explicitan qué tipo de relación existe entre los conceptos", "Solo decoran el mapa", "Indican el orden de lectura del texto original"], correct: 0, explanation: "Sin ellas no se sabe si un concepto es causa, parte, ejemplo o consecuencia del otro." }
    ]
  },

  "6.1.4": {
    flashcards: [
      { front: "¿En qué se distinguen reseña y comentario crítico?", back: "La **reseña** describe la obra e informa de qué trata; el **comentario crítico** además valora y argumenta si es buena o mala y por qué." },
      { front: "¿Qué NO debe llevar un resumen?", back: "Opiniones, ejemplos propios ni información que no esté en el texto original. Su función es condensar de forma objetiva." }
    ],
    quiz: [
      { q: "Un estudiante escribe: \"La novela aborda la migración con un lenguaje sencillo, aunque los personajes secundarios quedan poco desarrollados\". ¿Qué forma textual es?", options: ["Comentario crítico", "Resumen", "Relato simple"], correct: 0, explanation: "Además de describir, emite un juicio argumentado sobre la calidad de la obra." },
      { q: "¿Cuál es la característica esencial de un resumen?", options: ["Ser objetivo y condensar solo las ideas principales del original", "Incluir la opinión personal del autor", "Ampliar el texto con ejemplos nuevos"], correct: 0, explanation: "El resumen reduce sin interpretar ni valorar." },
      { q: "Un texto que narra en orden lo que ocurrió durante una excursión escolar, sin analizarlo, es:", options: ["Un relato simple", "Una reseña", "Un comentario crítico"], correct: 0, explanation: "Cuenta hechos en secuencia sin valorarlos ni examinar una obra." }
    ]
  },

  /* ---------------- 6.2 Análisis literario ---------------- */

  "6.2.2": {
    flashcards: [
      { front: "¿Cómo se enuncia un tema central?", back: "Con un sustantivo abstracto o una frase breve: 'la pérdida de la inocencia', 'el peso de la culpa'. Si se enuncia como sucesos concretos, se está describiendo la trama." },
      { front: "¿Puede un texto tener más de un tema?", back: "Sí: suele haber un tema central y varios temas secundarios que lo acompañan y lo matizan." }
    ],
    quiz: [
      { q: "¿Cuál es la diferencia entre el tema y la trama?", options: ["El tema es la idea general; la trama, la secuencia concreta de sucesos", "Son sinónimos", "El tema son los personajes y la trama el lugar"], correct: 0, explanation: "Dos historias con tramas muy distintas pueden compartir el mismo tema." },
      { q: "Un cuento narra cómo un joven abandona su pueblo, fracasa en la ciudad y regresa cambiado. ¿Cuál podría ser su tema central?", options: ["La búsqueda de identidad y el regreso a los orígenes", "Un viaje en autobús", "La descripción de la ciudad"], correct: 0, explanation: "El tema formula la idea de fondo, no los hechos concretos que la vehiculan." },
      { q: "¿Cuál de estos enunciados expresa un TEMA y no una trama?", options: ["El sacrificio por la familia", "Un padre trabaja de noche para pagar la escuela de su hija", "La hija se gradúa y agradece a su padre"], correct: 0, explanation: "Los otros dos describen acontecimientos concretos; el primero nombra la idea que los une." }
    ]
  },

  "6.2.3": {
    flashcards: [
      { front: "¿Qué es el clímax de una narración?", back: "El punto de máxima tensión, dentro del nudo, justo antes de que el conflicto empiece a resolverse." },
      { front: "¿Qué es una trama in medias res?", back: "La que comienza en pleno conflicto, sin planteamiento previo, y luego recupera los antecedentes mediante recuerdos o diálogos." }
    ],
    quiz: [
      { q: "¿Qué parte de la trama presenta a los personajes y la situación inicial?", options: ["El planteamiento", "El nudo", "El desenlace"], correct: 0, explanation: "Es la sección que da el contexto necesario antes de que aparezca el conflicto." },
      { q: "En un relato, el protagonista finalmente decide confesar y todo se resuelve. Esa parte es:", options: ["El desenlace", "El planteamiento", "El clímax"], correct: 0, explanation: "El desenlace cierra el conflicto y muestra la nueva situación." },
      { q: "¿Qué caracteriza al conflicto de una narración?", options: ["La oposición entre fuerzas o deseos que impulsa la historia", "La descripción del lugar", "El número de personajes"], correct: 0, explanation: "Sin conflicto no hay trama: es la tensión que hace avanzar los sucesos." }
    ]
  },

  "6.2.4": {
    flashcards: [
      { front: "¿Qué es un personaje redondo y uno plano?", back: "El **redondo** es complejo y evoluciona a lo largo de la historia; el **plano** se define por uno o dos rasgos fijos y no cambia." },
      { front: "¿Qué es el antagonista?", back: "El personaje o fuerza que se opone al protagonista. No siempre es una persona: puede ser la sociedad, la naturaleza o un conflicto interno." }
    ],
    quiz: [
      { q: "\"Doña Elena revisó tres veces la cerradura, contó el dinero dos veces y volvió sobre sus pasos para comprobar la estufa.\" ¿Qué caracterización se usa?", options: ["Indirecta: sus acciones muestran que es desconfiada o ansiosa", "Directa: se dice explícitamente cómo es", "No hay caracterización"], correct: 0, explanation: "El narrador no la califica: deja que el lector infiera el rasgo a partir de la conducta." },
      { q: "Un personaje que cambia profundamente por lo que vive a lo largo del relato es:", options: ["Un personaje redondo o dinámico", "Un personaje plano", "El antagonista siempre"], correct: 0, explanation: "La evolución interna es la marca del personaje redondo." },
      { q: "¿Cuál es un ejemplo de caracterización DIRECTA?", options: ["\"Era un hombre desconfiado y avaro.\"", "\"Escondió las monedas bajo el colchón antes de abrir la puerta.\"", "\"Nunca prestaba sus herramientas.\""], correct: 0, explanation: "El narrador enuncia el rasgo en vez de mostrarlo mediante acciones." }
    ]
  },

  "6.2.5": {
    flashcards: [
      { front: "¿Qué es el narrador equisciente?", back: "Un narrador en tercera persona que conoce los pensamientos de **un solo** personaje, no de todos. Está entre el omnisciente y el observador." },
      { front: "¿Cómo se distingue al narrador protagonista del testigo?", back: "Los dos usan 'yo'. El **protagonista** cuenta su propia historia; el **testigo** cuenta la de otro del que fue observador." }
    ],
    quiz: [
      { q: "\"Vi cómo Andrés dejaba la carta sobre la mesa y salía sin despedirse. Nunca supe qué decía.\" ¿Qué tipo de narrador es?", options: ["Testigo", "Omnisciente", "Protagonista"], correct: 0, explanation: "Narra en primera persona, pero la historia es de otro y su conocimiento está limitado a lo que observó." },
      { q: "\"Ricardo entró al cuarto. Cerró la puerta. Se sentó frente a la ventana.\" ¿Qué narrador es?", options: ["Objetivo u observador", "Omnisciente", "Protagonista"], correct: 0, explanation: "Solo registra lo visible, como una cámara: no accede a pensamientos ni emociones." },
      { q: "El narrador omnisciente se reconoce porque:", options: ["Conoce los pensamientos y sentimientos de todos los personajes", "Narra siempre en primera persona", "Solo describe lo que se puede ver y oír"], correct: 0, explanation: "Su saber no tiene límites dentro del mundo narrado." }
    ]
  },

  "6.2.6": {
    flashcards: [
      { front: "¿Qué diferencia hay entre espacio y ambiente?", back: "El **espacio** es el lugar físico donde ocurre la acción; el **ambiente** es la atmósfera emocional y social que se respira en él (opresivo, festivo, decadente)." },
      { front: "¿Qué es el contexto histórico de una narración?", back: "La época en que transcurre y las circunstancias sociales que la rodean: guerra, revolución, crisis. Condiciona lo que los personajes pueden o no hacer." }
    ],
    quiz: [
      { q: "\"Las paredes húmedas devolvían el eco de cada paso; la única ventana daba a un patio sin sol.\" ¿Qué ambiente se construye?", options: ["Opresivo y sombrío", "Festivo y luminoso", "Rural y apacible"], correct: 0, explanation: "Los detalles sensoriales (humedad, eco, falta de sol) crean una atmósfera de encierro." },
      { q: "El ámbito de una narración incluye:", options: ["El espacio físico y también el entorno social en que viven los personajes", "Únicamente el tiempo en que ocurre", "Solo el nombre de la ciudad"], correct: 0, explanation: "Abarca lo geográfico y lo social: barrio, clase, época, costumbres." },
      { q: "¿Por qué el ámbito influye en la historia?", options: ["Porque condiciona las posibilidades y los conflictos de los personajes", "Porque determina quién narra", "Porque decide el número de capítulos"], correct: 0, explanation: "Un mismo conflicto se resuelve de forma distinta en un pueblo aislado que en una gran ciudad." }
    ]
  },

  "6.2.7": {
    flashcards: [
      { front: "¿Qué es una prolepsis o anticipación?", back: "Un salto hacia el futuro de la historia: adelanta un hecho que ocurrirá después. Es lo contrario de la analepsis o flashback." },
      { front: "¿Qué es el tiempo del relato frente al tiempo de la historia?", back: "El **tiempo de la historia** es la duración real de los hechos; el **tiempo del relato** es cuánto espacio les dedica la narración. Un instante puede ocupar páginas y un año, una línea." }
    ],
    quiz: [
      { q: "\"Años después, frente al pelotón de fusilamiento, el coronel habría de recordar aquella tarde remota.\" ¿Qué recurso temporal se emplea?", options: ["Anticipación o prolepsis", "Retrospección o flashback", "Tiempo lineal"], correct: 0, explanation: "La narración adelanta un hecho futuro antes de volver al pasado del personaje." },
      { q: "Un relato que cuenta los hechos exactamente en el orden en que sucedieron tiene tiempo:", options: ["Lineal o cronológico", "Retrospectivo", "Circular"], correct: 0, explanation: "No hay saltos: la narración sigue la secuencia real de los acontecimientos." },
      { q: "El flashback sirve para:", options: ["Aportar antecedentes que explican el presente de la historia", "Adelantar el final", "Acelerar la narración"], correct: 0, explanation: "Interrumpe el presente narrativo para iluminar lo que está ocurriendo con información del pasado." }
    ]
  },

  /* ---------------- 6.3 Composición de textos ---------------- */

  "6.3.1": {
    flashcards: [
      { front: "¿Qué es la tesis de un ensayo?", back: "La afirmación central que se va a defender, enunciada normalmente al final de la introducción. Todo el desarrollo debe sostenerla." },
      { front: "¿Qué se hace en la etapa de revisión?", back: "Releer para corregir coherencia, cohesión, ortografía y redacción, y verificar que cada argumento realmente apoye la tesis. Es la etapa que más se omite y más mejora el texto." }
    ],
    quiz: [
      { q: "¿Qué debe hacerse ANTES de empezar a redactar un ensayo?", options: ["Organizar las ideas en un esquema o borrador", "Escribir la conclusión", "Elegir la tipografía"], correct: 0, explanation: "Sin esquema previo el texto pierde orden y se repite; planear es parte del proceso de escritura." },
      { q: "La introducción de un ensayo debe:", options: ["Presentar el tema y enunciar la tesis que se defenderá", "Resumir todas las conclusiones", "Incluir la bibliografía"], correct: 0, explanation: "Sitúa al lector y anuncia la postura; los argumentos vienen en el desarrollo." },
      { q: "Un ensayo que solo repite en la conclusión lo dicho en la introducción falla porque:", options: ["No muestra qué se ganó con la argumentación desarrollada", "Es demasiado breve", "No cita fuentes"], correct: 0, explanation: "La conclusión debe retomar la tesis a la luz de lo argumentado, no copiarla tal cual." }
    ]
  },

  "6.3.2": {
    flashcards: [
      { front: "¿Cómo se evalúa la confiabilidad de una fuente?", back: "Revisando autoría y credenciales, fecha de publicación, si cita evidencia verificable, si tiene intereses en el tema y si otras fuentes independientes coinciden." },
      { front: "¿Qué es el plagio y cómo se evita?", back: "Presentar ideas o palabras ajenas como propias. Se evita citando la fuente y entrecomillando lo textual, aun cuando se parafrasee." }
    ],
    quiz: [
      { q: "Una entrevista grabada a un sobreviviente de un terremoto es una fuente:", options: ["Primaria", "Secundaria", "Terciaria"], correct: 0, explanation: "Es un testimonio directo, sin intermediarios que lo interpreten." },
      { q: "Una enciclopedia que resume artículos de varios especialistas es una fuente:", options: ["Terciaria", "Primaria", "Secundaria"], correct: 0, explanation: "Sintetiza material ya elaborado por otros: está a dos pasos de la información original." },
      { q: "Un artículo académico que analiza tres novelas de un autor es una fuente:", options: ["Secundaria", "Primaria", "Terciaria"], correct: 0, explanation: "Las novelas son las fuentes primarias; el análisis que las interpreta es secundario." },
      { q: "Parafrasear una idea ajena sin mencionar de dónde salió es:", options: ["Plagio, aunque se cambien las palabras", "Una cita correcta", "Un resumen válido"], correct: 0, explanation: "Lo que se debe acreditar es la idea, no solo la redacción literal." }
    ]
  },

  "6.3.3": {
    flashcards: [
      { front: "¿Qué es la tilde diacrítica?", back: "La que distingue palabras iguales con función distinta: **él** (pronombre) / el (artículo), **tú** / tu, **sí** / si, **más** / mas, **té** / te, **sé** / se, **dé** / de." },
      { front: "¿Cuándo se acentúan qué, cómo, cuándo, dónde?", back: "Cuando son interrogativos o exclamativos, sea en pregunta directa o indirecta: ¿Qué quieres? / No sé qué quiere. Sin ese valor, van sin tilde." }
    ],
    quiz: [
      { q: "¿Cuál de estas palabras está correctamente acentuada?", options: ["fácil", "facíl", "facil"], correct: 0, explanation: "Es grave y termina en 'l', así que lleva tilde en la penúltima sílaba." },
      { q: "La palabra 'música' lleva tilde porque:", options: ["Es esdrújula y todas las esdrújulas se acentúan", "Es aguda terminada en vocal", "Es grave terminada en 's'"], correct: 0, explanation: "La fuerza cae en la antepenúltima sílaba: mú-si-ca." },
      { q: "En la oración \"No sé si vendrá\", la palabra 'sé' lleva tilde porque:", options: ["Es el verbo saber, y la tilde lo distingue del pronombre 'se'", "Es una palabra aguda", "Es esdrújula"], correct: 0, explanation: "Es tilde diacrítica: distingue dos palabras que se escriben igual." },
      { q: "¿Cuál palabra es aguda y NO debe llevar tilde?", options: ["reloj", "cantó", "café"], correct: 0, explanation: "Es aguda pero termina en 'j', así que no cumple la condición de llevar tilde (n, s o vocal)." }
    ]
  },

  "6.3.4": {
    flashcards: [
      { front: "¿Se pone coma antes de 'y' en una enumeración?", back: "Normalmente no: 'compré pan, leche y huevos'. Sí se usa cuando la 'y' une oraciones con sujetos distintos o cuando evita ambigüedad." },
      { front: "¿Qué son las comas de inciso?", back: "Las que encierran una aclaración que se puede quitar sin romper la oración: 'Mi hermano, que vive en Puebla, llegará el lunes'. Siempre van en pareja." }
    ],
    quiz: [
      { q: "¿Cuál oración está correctamente puntuada?", options: ["Mi tía, que vive en Oaxaca, viene mañana.", "Mi tía que vive en Oaxaca, viene mañana.", "Mi tía, que vive en Oaxaca viene mañana."], correct: 0, explanation: "El inciso explicativo debe ir entre dos comas: abrir sin cerrar es el error más común." },
      { q: "¿Qué signo anuncia una enumeración o una explicación?", options: ["Los dos puntos", "El punto y coma", "Los paréntesis"], correct: 0, explanation: "'Necesito tres cosas: tiempo, dinero y paciencia'." },
      { q: "El punto y coma se usa principalmente para:", options: ["Separar ideas relacionadas pero independientes, o elementos de una lista que ya llevan comas", "Terminar un párrafo", "Iniciar un diálogo"], correct: 0, explanation: "Marca una pausa mayor que la coma y menor que el punto." },
      { q: "En español, los signos de interrogación:", options: ["Se abren y se cierran siempre (¿…?)", "Solo se cierran, como en inglés", "Son opcionales"], correct: 0, explanation: "El signo de apertura es obligatorio en español y ayuda a leer correctamente la entonación." }
    ]
  },

  "6.3.5": {
    flashcards: [
      { front: "¿Cómo se identifica el sujeto de una oración?", back: "Preguntando '¿quién o qué realiza la acción?' y comprobando la concordancia: si se cambia el verbo a plural, el sujeto también cambia." },
      { front: "¿Qué es el sujeto tácito?", back: "El que no aparece escrito pero se deduce del verbo: en 'Llegamos temprano', el sujeto es 'nosotros' aunque no se enuncie." }
    ],
    quiz: [
      { q: "En \"Los alumnos entregaron sus trabajos al maestro\", ¿cuál es el complemento indirecto?", options: ["al maestro", "sus trabajos", "los alumnos"], correct: 0, explanation: "Responde a '¿a quién?' y puede sustituirse por 'le': los alumnos le entregaron sus trabajos." },
      { q: "En \"Marta compró flores ayer en el mercado\", el complemento circunstancial de lugar es:", options: ["en el mercado", "ayer", "flores"], correct: 0, explanation: "'Ayer' es circunstancial de tiempo y 'flores' es el complemento directo." },
      { q: "¿Cuál es el sujeto de la oración \"Ayer llegaron los paquetes de la tienda\"?", options: ["los paquetes", "ayer", "de la tienda"], correct: 0, explanation: "Concuerda con el verbo en plural: si fuera 'el paquete', el verbo sería 'llegó'." },
      { q: "El complemento directo se reconoce porque:", options: ["Se puede sustituir por lo, la, los o las", "Se puede sustituir por le o les", "Siempre indica tiempo"], correct: 0, explanation: "'Compró flores' → 'las compró': esa sustitución confirma el complemento directo." }
    ]
  },

  "6.3.6": {
    flashcards: [
      { front: "¿Qué diferencia hay entre coherencia y cohesión?", back: "La **coherencia** es la unidad de sentido del texto; la **cohesión** son los recursos que enlazan las frases: conectores, pronombres, sinónimos y repeticiones controladas." },
      { front: "¿Qué es un referente en un texto?", back: "La palabra a la que remite un pronombre o un sinónimo. Si el referente no queda claro, el texto pierde cohesión: 'Juan vio a Luis y él sonrió' (¿quién sonrió?)." }
    ],
    quiz: [
      { q: "Un texto donde cada párrafo trata un tema distinto sin relación entre sí carece de:", options: ["Coherencia", "Ortografía", "Adecuación"], correct: 0, explanation: "La coherencia es la unidad temática y lógica del conjunto." },
      { q: "Para ordenar párrafos desordenados, ¿qué pista es más útil?", options: ["Los conectores y las referencias a información ya mencionada", "La longitud de cada párrafo", "El orden alfabético"], correct: 0, explanation: "Un párrafo que empieza con 'por esa razón' necesariamente va después del que expone la causa." },
      { q: "En \"María llegó tarde. Ella se disculpó con el grupo\", el pronombre 'ella' aporta:", options: ["Cohesión, al enlazar la segunda oración con la primera", "Coherencia temática exclusivamente", "Adecuación al registro"], correct: 0, explanation: "La sustitución pronominal es uno de los mecanismos de cohesión más frecuentes." }
    ]
  },

  "6.3.7": {
    flashcards: [
      { front: "¿Qué elementos definen el registro adecuado?", back: "El **destinatario** (a quién se escribe), el **propósito** (qué se busca) y el **canal o contexto** (oficio, chat, examen). Los tres deciden el nivel de formalidad." },
      { front: "¿Qué es un tecnicismo y cuándo conviene?", back: "Una palabra propia de una disciplina. Es adecuado entre especialistas, pero ante público general hay que definirlo o sustituirlo." }
    ],
    quiz: [
      { q: "¿Cuál sería el inicio adecuado de una carta dirigida a un director escolar?", options: ["Estimado director: por medio de la presente…", "¿Qué onda, profe? Le escribo para…", "Hola, va rápido esto:"], correct: 0, explanation: "El contexto institucional pide registro formal y trato de usted." },
      { q: "Un texto científico dirigido al público general debe:", options: ["Explicar los tecnicismos indispensables con lenguaje accesible", "Usar la mayor cantidad de tecnicismos posible", "Eliminar todo dato preciso"], correct: 0, explanation: "La adecuación exige ajustar el vocabulario al conocimiento previo del destinatario sin perder rigor." },
      { q: "Usar lenguaje excesivamente rebuscado en un mensaje a un amigo cercano es un problema de:", options: ["Adecuación", "Ortografía", "Coherencia"], correct: 0, explanation: "La inadecuación funciona en los dos sentidos: por exceso y por falta de formalidad." }
    ]
  },

  /* ---------------- 6.4 Comunicación oral ---------------- */

  "6.4.1": {
    flashcards: [
      { front: "¿Qué es la comunicación no verbal en una exposición?", back: "Postura, gestos, contacto visual y desplazamiento. Refuerzan o contradicen lo que se dice: leer de espaldas al público resta credibilidad al mejor contenido." },
      { front: "¿Cómo deben ser los apoyos gráficos?", back: "Legibles y con poco texto: ideas clave, imágenes o datos. Si el público lee la diapositiva, deja de escuchar a quien expone." }
    ],
    quiz: [
      { q: "¿Cuál es el error más común al usar diapositivas en una exposición?", options: ["Saturarlas de texto y leerlas en voz alta", "Incluir una imagen por diapositiva", "Usar letra grande"], correct: 0, explanation: "El apoyo visual debe complementar el discurso, no sustituirlo." },
      { q: "Antes de exponer, ensayar en voz alta sirve principalmente para:", options: ["Ajustar el tiempo y detectar partes poco claras", "Memorizar el texto palabra por palabra", "Elegir el color de las diapositivas"], correct: 0, explanation: "El ensayo revela dónde sobra o falta contenido y ayuda a controlar la duración." },
      { q: "Mantener contacto visual con el público durante una exposición:", options: ["Aumenta la conexión y permite notar si están siguiendo la explicación", "Es irrelevante si el contenido es bueno", "Distrae al expositor y debe evitarse"], correct: 0, explanation: "La retroalimentación no verbal del público permite ajustar el ritmo y el énfasis sobre la marcha." }
    ]
  },

  "6.4.2": {
    flashcards: [
      { front: "¿Qué es la escucha activa?", back: "Atender realmente a lo que dice el otro: no interrumpir, hacer preguntas de seguimiento y parafrasear para confirmar que se entendió." },
      { front: "¿Qué es una pregunta abierta?", back: "La que no se responde con sí o no y obliga a desarrollar ('¿cómo lo resolviste?'). Las cerradas sirven para confirmar datos puntuales." }
    ],
    quiz: [
      { q: "¿Cuál de estas es una pregunta detonadora adecuada para iniciar un diálogo?", options: ["¿Qué opinas sobre el uso del celular en clase?", "¿Tienes celular?", "¿Ya terminaste?"], correct: 0, explanation: "Es abierta e invita a desarrollar una postura, en vez de cerrarse con un sí o un no." },
      { q: "Un intercambio en el que cada quien expone su idea sin atender a lo que dijo el otro:", options: ["No es un verdadero diálogo, sino monólogos alternados", "Es el modelo ideal de diálogo", "Es un debate formal"], correct: 0, explanation: "El diálogo exige construir sobre lo que aporta el interlocutor." },
      { q: "Parafrasear lo que dijo la otra persona antes de responder sirve para:", options: ["Confirmar que se comprendió correctamente", "Ganar tiempo sin escuchar", "Cambiar de tema"], correct: 0, explanation: "Es una técnica de escucha activa: verifica el entendimiento antes de contestar." }
    ]
  },

  "6.4.3": {
    flashcards: [
      { front: "¿Cuál es la función del moderador en un debate?", back: "Dar y controlar los turnos, vigilar el tiempo, mantener el respeto y encauzar la discusión hacia el tema. No opina ni toma partido." },
      { front: "¿Qué es una falacia en un debate?", back: "Un argumento que parece válido pero no lo es: atacar a la persona en vez de su idea (ad hominem), apelar a la mayoría o deformar la postura contraria (hombre de paja)." }
    ],
    quiz: [
      { q: "Un participante responde: \"No hay que hacerle caso, ni siquiera terminó la carrera\". ¿Qué falacia comete?", options: ["Ataque a la persona (ad hominem)", "Apelación a la mayoría", "Falsa causa"], correct: 0, explanation: "Descalifica a quien habla en lugar de refutar su argumento." },
      { q: "¿Qué distingue a un debate de un diálogo?", options: ["El debate confronta posturas opuestas; el diálogo busca entendimiento conjunto", "El debate es escrito y el diálogo oral", "En el debate no se usan argumentos"], correct: 0, explanation: "Los dos son formas orales, pero su finalidad comunicativa es distinta." },
      { q: "En un debate formal, la parte donde cada equipo responde a los argumentos del contrario se llama:", options: ["Refutación", "Introducción", "Conclusión"], correct: 0, explanation: "La refutación somete a examen las razones ajenas; sin ella el debate se vuelve exposición paralela." }
    ]
  },

  "6.4.4": {
    flashcards: [
      { front: "¿Qué función cumple la entrevista como forma oral?", back: "Obtener información de una persona mediante preguntas planeadas. A diferencia del diálogo espontáneo, tiene un objetivo y una estructura previa." },
      { front: "¿Qué es la mesa redonda?", back: "Una forma oral en la que varios especialistas exponen sus puntos de vista sobre un tema ante un público, coordinados por un moderador, sin confrontación directa." }
    ],
    quiz: [
      { q: "Un periodista prepara preguntas para conocer la experiencia de una científica. ¿Qué forma oral emplea?", options: ["La entrevista", "El debate", "La mesa redonda"], correct: 0, explanation: "Hay un entrevistador que pregunta con un objetivo previo y un entrevistado que aporta la información." },
      { q: "La función principal del debate es:", options: ["Argumentativa y persuasiva: defender una postura frente a otra", "Colaborativa: construir una conclusión conjunta", "Narrativa: contar hechos en orden"], correct: 0, explanation: "El diálogo busca entendimiento; el debate, sostener una posición con razones." },
      { q: "Cuando varias personas exponen posturas distintas ante un público, coordinadas por un moderador y sin buscar vencerse, se trata de:", options: ["Una mesa redonda", "Un debate", "Un monólogo"], correct: 0, explanation: "La mesa redonda expone la pluralidad de enfoques, no la confrontación." }
    ]
  },

  /* ---------------- 6.5 Inglés ---------------- */

  "6.5.1": {
    flashcards: [
      { front: "¿Con qué adverbios se usa el presente simple?", back: "Con los de frecuencia: always, usually, often, sometimes, rarely, never, every day. Señalan hábito, no momento presente." },
      { front: "¿Qué verbos no se usan normalmente en presente continuo?", back: "Los de estado: like, love, want, need, know, believe, understand, have (posesión). Se dice 'I know', no 'I am knowing'." }
    ],
    quiz: [
      { q: "Choose the correct sentence:", options: ["She doesn't work on Sundays.", "She don't works on Sundays.", "She doesn't works on Sundays."], correct: 0, explanation: "Con doesn't el verbo va en forma base, sin -s: doesn't work." },
      { q: "\"Look! The baby ______ right now.\" Complete the sentence.", options: ["is sleeping", "sleeps", "sleep"], correct: 0, explanation: "'Right now' indica una acción en curso: corresponde el presente continuo." },
      { q: "Which sentence expresses a habit?", options: ["I go to the gym every Monday.", "I am going to the gym at this moment.", "I went to the gym yesterday."], correct: 0, explanation: "'Every Monday' marca rutina, y el presente simple es el tiempo de los hábitos." },
      { q: "Complete: \"My brother ______ English and French.\"", options: ["speaks", "speak", "is speak"], correct: 0, explanation: "Con tercera persona del singular (he/she/it), el presente simple lleva -s." }
    ]
  },

  "6.5.2": {
    flashcards: [
      { front: "Verbos irregulares frecuentes en pasado", back: "go→went, have→had, do→did, see→saw, take→took, come→came, buy→bought, make→made, get→got, say→said." },
      { front: "¿Qué expresiones de tiempo acompañan al pasado simple?", back: "Yesterday, last night/week/year, two days ago, in 2010, when I was a child. Todas apuntan a un momento terminado." }
    ],
    quiz: [
      { q: "Complete: \"They ______ to the beach last summer.\"", options: ["went", "go", "have gone"], correct: 0, explanation: "'Last summer' es un momento pasado concreto: corresponde el pasado simple; 'go' es irregular y da 'went'." },
      { q: "Choose the correct question:", options: ["Did you finish your homework?", "Did you finished your homework?", "Do you finished your homework?"], correct: 0, explanation: "Después de 'did' el verbo principal va en forma base." },
      { q: "Complete: \"While I ______ dinner, someone knocked on the door.\"", options: ["was cooking", "cooked", "have cooked"], correct: 0, explanation: "El pasado continuo describe la acción en desarrollo que otra acción interrumpe." },
      { q: "What is the past form of \"buy\"?", options: ["bought", "buyed", "buied"], correct: 0, explanation: "Es un verbo irregular: no admite la terminación -ed." }
    ]
  },

  "6.5.3": {
    flashcards: [
      { front: "¿Cuándo se usa el presente continuo para el futuro?", back: "Para planes ya agendados con fecha y hora: 'I'm meeting the doctor at five'. Es aún más concreto que 'going to'." },
      { front: "Forma negativa e interrogativa de will", back: "Negativo: won't (will not) + verbo base. Pregunta: Will + sujeto + verbo base. 'Will you help me?'" }
    ],
    quiz: [
      { q: "\"Look at those dark clouds! It ______ rain.\" Complete the sentence.", options: ["is going to", "will", "would"], correct: 0, explanation: "Hay evidencia visible en el presente, así que corresponde 'going to'." },
      { q: "The phone is ringing. \"Don't worry, I ______ answer it.\"", options: ["will", "am going to", "was"], correct: 0, explanation: "Es una decisión espontánea tomada en el momento de hablar: se usa 'will'." },
      { q: "Choose the correct sentence:", options: ["We are going to visit our grandparents next weekend.", "We are going to visiting our grandparents next weekend.", "We going to visit our grandparents next weekend."], correct: 0, explanation: "La estructura es be + going to + verbo base, y el verbo 'be' no puede omitirse." },
      { q: "Which sentence expresses a promise?", options: ["I will always support you.", "I am supporting you now.", "I supported you."], correct: 0, explanation: "'Will' se usa para promesas y compromisos, además de decisiones espontáneas y predicciones." }
    ]
  },

  "6.5.4": {
    flashcards: [
      { front: "Diferencia entre for y since en presente perfecto", back: "**For** indica duración: for three years. **Since** indica el punto de partida: since 2019, since I was a child." },
      { front: "¿Qué diferencia hay entre already, yet y just?", back: "**Already** (ya, afirmativo), **yet** (todavía/ya, en negativas y preguntas, al final) y **just** (recién, acaba de)." }
    ],
    quiz: [
      { q: "Complete: \"I have lived here ______ five years.\"", options: ["for", "since", "ago"], correct: 0, explanation: "'Five years' es una duración, así que corresponde 'for'; con una fecha se usaría 'since'." },
      { q: "Choose the correct sentence:", options: ["She has already finished the report.", "She has already finish the report.", "She have already finished the report."], correct: 0, explanation: "Con 'she' se usa 'has' y el verbo va en participio pasado: finished." },
      { q: "Which sentence is correct in the present perfect?", options: ["Have you ever been to Canada?", "Have you ever went to Canada?", "Did you ever been to Canada?"], correct: 0, explanation: "El participio de 'go' en esta construcción de experiencia es 'been'." },
      { q: "\"I ______ my keys. I can't open the door.\" Complete the sentence.", options: ["have lost", "lost yesterday", "am losing"], correct: 0, explanation: "La acción pasada tiene consecuencia en el presente: es el uso típico del presente perfecto." }
    ]
  },

  "6.5.5": {
    flashcards: [
      { front: "¿Qué conectores acompañan al pasado perfecto?", back: "Before, after, when, by the time, already. Ayudan a ordenar cuál de las dos acciones pasadas ocurrió primero." },
      { front: "¿Cuándo NO hace falta el pasado perfecto?", back: "Cuando el orden ya queda claro por los conectores y la secuencia: 'I had breakfast and then I left' no lo necesita." }
    ],
    quiz: [
      { q: "Complete: \"By the time we arrived, the movie ______.\"", options: ["had already started", "already started", "has already started"], correct: 0, explanation: "La película empezó ANTES de que llegáramos: la acción anterior va en pasado perfecto." },
      { q: "Choose the correct sentence:", options: ["She had studied French before she moved to Paris.", "She has studied French before she moved to Paris.", "She had study French before she moved to Paris."], correct: 0, explanation: "El pasado perfecto se forma con 'had' + participio, y marca la acción más antigua." },
      { q: "In \"When I got home, my brother had cooked dinner\", which action happened FIRST?", options: ["My brother cooked dinner", "I got home", "Both at the same time"], correct: 0, explanation: "El pasado perfecto ('had cooked') siempre señala el hecho anterior." },
      { q: "The past perfect is formed with:", options: ["had + past participle", "have + past participle", "was + verb-ing"], correct: 0, explanation: "'Had' es igual para todos los sujetos, sin variación." }
    ]
  },

  "6.5.6": {
    flashcards: [
      { front: "¿Para qué sirven when, why, how y which?", back: "**When** (cuándo), **why** (por qué), **how** (cómo) y **which** (cuál, entre opciones definidas)." },
      { front: "Combinaciones con how", back: "How much (cantidad incontable/precio), how many (cantidad contable), how long (duración), how often (frecuencia), how far (distancia)." }
    ],
    quiz: [
      { q: "\"______ do you go to the gym?\" \"Three times a week.\"", options: ["How often", "How much", "How long"], correct: 0, explanation: "La respuesta indica frecuencia, y esa es la pregunta con 'how often'." },
      { q: "Choose the correct question:", options: ["Where does she work?", "Where she works?", "Where does she works?"], correct: 0, explanation: "Con el auxiliar 'does', el verbo principal va en forma base." },
      { q: "\"______ car is parked outside?\" Complete the question.", options: ["Whose", "Who's", "Who"], correct: 0, explanation: "'Whose' pregunta por posesión; 'who's' es la contracción de 'who is'." },
      { q: "Which question does NOT need an auxiliary verb?", options: ["Who broke the window?", "Where do you live?", "When did she arrive?"], correct: 0, explanation: "Cuando 'who' funciona como sujeto de la pregunta, no se usa auxiliar." }
    ]
  },

  "6.5.7": {
    flashcards: [
      { front: "Comparativos y superlativos irregulares", back: "good → better → the best; bad → worse → the worst; far → farther/further → the farthest/furthest; little → less → the least." },
      { front: "¿Cómo se expresa la igualdad en inglés?", back: "Con as + adjetivo + as: 'She is as tall as her sister'. En negativo: 'not as tall as'." }
    ],
    quiz: [
      { q: "Complete: \"This exercise is ______ than the last one.\"", options: ["easier", "more easy", "easiest"], correct: 0, explanation: "'Easy' es un adjetivo corto terminado en -y: la 'y' cambia a 'i' y se agrega -er." },
      { q: "Choose the correct sentence:", options: ["He is the best player on the team.", "He is the most good player on the team.", "He is the better player on the team."], correct: 0, explanation: "'Good' es irregular: better (comparativo) y the best (superlativo)." },
      { q: "Complete: \"My house is ______ expensive ______ yours.\" (they cost the same)", options: ["as / as", "more / than", "the most / of"], correct: 0, explanation: "Para expresar igualdad se usa la estructura as + adjetivo + as." },
      { q: "Which sentence is correct?", options: ["Mexico City is more crowded than Monterrey.", "Mexico City is crowdeder than Monterrey.", "Mexico City is most crowded than Monterrey."], correct: 0, explanation: "'Crowded' tiene dos sílabas y no termina en -y, así que forma el comparativo con 'more'." }
    ]
  },

  "6.5.8": {
    flashcards: [
      { front: "Diferencia entre must y have to", back: "**Must** expresa una obligación que siente quien habla; **have to** expresa una obligación externa (una regla). En negativo cambian: mustn't = prohibido, don't have to = no es necesario." },
      { front: "¿Qué expresan could y may?", back: "**Could**: habilidad en el pasado o petición cortés. **May**: posibilidad o permiso formal ('May I come in?')." }
    ],
    quiz: [
      { q: "\"You ______ smoke in the hospital.\" (it is forbidden)", options: ["mustn't", "don't have to", "might not"], correct: 0, explanation: "'Mustn't' indica prohibición; 'don't have to' significaría que no es necesario." },
      { q: "Choose the correct sentence:", options: ["You should see a doctor.", "You should to see a doctor.", "You should seeing a doctor."], correct: 0, explanation: "Después de un verbo modal siempre va el verbo en forma base, sin 'to' y sin -ing." },
      { q: "\"It ______ rain later, so take an umbrella just in case.\"", options: ["might", "must", "should"], correct: 0, explanation: "'Might' expresa posibilidad no confirmada, que es lo que pide 'just in case'." },
      { q: "Which modal expresses ability?", options: ["can", "should", "must"], correct: 0, explanation: "'Can' expresa habilidad o permiso: 'I can swim'." }
    ]
  },

  "6.5.9": {
    flashcards: [
      { front: "¿Qué es el condicional cero?", back: "Se usa para verdades generales: If + presente simple, presente simple. 'If you heat water to 100 °C, it boils'." },
      { front: "¿Qué es el tercer condicional?", back: "Habla de situaciones imposibles del pasado: If + past perfect, would have + participio. 'If I had studied, I would have passed'." }
    ],
    quiz: [
      { q: "Complete: \"If it ______ tomorrow, we will cancel the trip.\"", options: ["rains", "will rain", "rained"], correct: 0, explanation: "En el primer condicional, la cláusula con 'if' va en presente simple aunque hable del futuro." },
      { q: "Complete: \"If I ______ you, I would apologize.\"", options: ["were", "am", "will be"], correct: 0, explanation: "En el segundo condicional se usa 'were' para todas las personas en situaciones hipotéticas." },
      { q: "Which sentence expresses a hypothetical, unlikely situation?", options: ["If I won the lottery, I would travel the world.", "If I win the lottery, I will travel the world.", "If I have money, I travel."], correct: 0, explanation: "El segundo condicional (past simple + would) marca lo improbable o imaginario." },
      { q: "\"If you mix blue and yellow, you ______ green.\"", options: ["get", "will get", "would get"], correct: 0, explanation: "Es una verdad general: condicional cero, con presente simple en ambas partes." }
    ]
  },

  "6.5.10": {
    flashcards: [
      { front: "¿Cómo se pasa una oración de activa a pasiva?", back: "El objeto de la activa se vuelve sujeto, el verbo pasa a be + participio en el mismo tiempo, y el sujeto original va al final con 'by' (si se menciona)." },
      { front: "¿Cuándo conviene usar la voz pasiva?", back: "Cuando el agente es desconocido, obvio o irrelevante, o cuando interesa destacar la acción o su receptor: 'The window was broken'." }
    ],
    quiz: [
      { q: "Change to passive: \"They built the bridge in 2005.\"", options: ["The bridge was built in 2005.", "The bridge is built in 2005.", "The bridge has built in 2005."], correct: 0, explanation: "La activa está en pasado simple, así que la pasiva usa was/were + participio." },
      { q: "Choose the correct passive sentence:", options: ["The letters are delivered every morning.", "The letters are deliver every morning.", "The letters delivering every morning."], correct: 0, explanation: "La pasiva en presente se forma con am/is/are + participio pasado." },
      { q: "In the sentence \"The cake was made by my grandmother\", the word \"by\" introduces:", options: ["The agent who performed the action", "The place of the action", "The time of the action"], correct: 0, explanation: "'By' señala quién realiza la acción cuando se decide mencionarlo." },
      { q: "Why is the passive voice used in \"My wallet was stolen yesterday\"?", options: ["Because the person who did it is unknown", "Because the action is unimportant", "Because it happened in the future"], correct: 0, explanation: "Se desconoce al agente, así que el foco recae en lo que le ocurrió al objeto." }
    ]
  }
};
