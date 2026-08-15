/* Refuerzo del área 6 · Lengua y comunicación

   EL CAMBIO IMPORTANTE DE TODO EL TEMARIO ESTÁ AQUÍ.

   Los temas 6.1.1, 6.1.2 y los seis de 6.2 son entre ocho y diez de los 31
   reactivos del área, y en el examen real vienen COLGADOS DE UN TEXTO que hay
   que leer completo. El banco los practicaba con fragmentos de uno o dos
   renglones, y a veces ni siquiera eso: describía el texto en vez de mostrarlo
   ("Un texto explica que el reciclaje reduce la basura… ¿cuál sería el mejor
   título?"). Eso entrena la teoría del análisis literario, no el acto de leer
   trescientas palabras bajo presión y responder seis preguntas sobre ellas.

   Aquí van textos completos —narrativos y expositivos, de 250 a 350 palabras—
   con varias preguntas colgadas de cada uno, como en el examen. El texto va
   dentro del enunciado del reactivo, igual que en el cuadernillo.

   Se suman los huecos que dejó la poda: el NUDO de 6.2.3, el tiempo
   RETROSPECTIVO de 6.2.7, las graves y sobreesdrújulas de 6.3.3 y el "what"
   de 6.5.6. */

/* ---------------------------------------------------------------
   TEXTO NARRATIVO A · "La carta de Nicolasa"
   Sirve a 6.2.2 (tema), 6.2.3 (nudo), 6.2.4 (personajes),
   6.2.5 (narrador), 6.2.6 (ámbito) y 6.2.7 (tiempo narrativo).
   --------------------------------------------------------------- */
const TEXTO_A = `**Lea el siguiente texto y responda.**

Nicolasa guardaba la carta en el fondo del ropero, debajo de las cobijas de invierno, desde hacía once años. La sacaba cada 3 de febrero, la leía completa sin mover los labios y la devolvía a su sitio antes de que amaneciera.

La casa era de adobe y tenía el patio partido por un mezquite que su marido había sembrado el año en que se fueron todos al norte. En el pueblo quedaban ochenta personas, casi todas mayores de sesenta años, y la escuela llevaba cerrada seis. Cuando pasaba el camión de la leche, los martes, Nicolasa salía a la puerta y saludaba con la mano al chofer, que era el único que todavía la llamaba por su nombre.

Aquel febrero, sin embargo, la carta no estaba. Nicolasa vació el ropero sobre la cama, sacudió cada cobija, revisó bajo el colchón y detrás del espejo. Al mediodía se sentó en el escalón del patio, con las manos quietas sobre las rodillas, y entendió que su nieta Rosaura había estado en la casa la semana anterior, buscando papeles del terreno.

No fue a buscarla. Tampoco preguntó. Durante tres días barrió el patio, dio de comer a las gallinas y no habló con nadie. Al cuarto día tomó el camión de la leche hasta la cabecera municipal, entró a la papelería y compró un sobre y una hoja rayada.

Escribió con letra grande y lenta. No contó lo que decía la carta perdida ni reclamó nada. Puso la fecha, el nombre de Rosaura y una sola línea: "Aquí sigue tu casa, y aquí sigue tu abuela." Pagó el timbre, la echó al buzón y regresó en el mismo camión.

El mezquite del patio floreció ese año más tarde que de costumbre.`;

/* ---------------------------------------------------------------
   TEXTO EXPOSITIVO B · El agua en el Valle de México
   Sirve a 6.1.1 (título) y 6.1.2 (relaciones lógicas).
   --------------------------------------------------------------- */
const TEXTO_B = `**Lea el siguiente texto y responda.**

La Ciudad de México se levanta sobre lo que fue un sistema de lagos. Durante siglos, sus habitantes convivieron con el agua mediante chinampas, calzadas y diques que regulaban las crecidas. A partir del siglo XVII, sin embargo, la estrategia cambió: en lugar de administrar el agua se decidió expulsarla, y se abrieron canales de desagüe para secar el valle.

El resultado fue una ciudad que hoy padece dos problemas opuestos al mismo tiempo. Por un lado se inunda: al desaparecer los lagos y pavimentarse el suelo, la lluvia no se filtra y corre por las calles hasta saturar el drenaje. Por otro lado le falta agua; debido a que las fuentes superficiales se agotaron, más de la mitad del abasto proviene de pozos profundos y del sistema Cutzamala, que la trae desde otra cuenca.

La extracción del acuífero tiene una consecuencia adicional y menos visible: el hundimiento del terreno. Al retirarse el agua, las arcillas del antiguo lecho lacustre se comprimen y la superficie desciende. Algunas zonas del oriente de la ciudad se hunden hasta cuarenta centímetros al año, lo que fractura tuberías, banquetas y cimientos.

Ese hundimiento agrava, a su vez, el problema original. Las fugas en la red de distribución llegan a representar cerca del cuarenta por ciento del agua que se inyecta, de modo que buena parte de lo que se extrae con tanto esfuerzo nunca llega a las casas. Se extrae más para compensar la pérdida, el suelo se hunde más y aparecen nuevas fugas.

Especialistas en gestión hídrica proponen invertir el enfoque de los últimos cuatro siglos: captar la lluvia donde cae, recuperar zonas de recarga y reparar la red antes que buscar fuentes cada vez más lejanas. La discusión ya no es técnica, sostienen, sino de prioridades presupuestales.`;

const AREA6_REFUERZO = {
  /* ---------- Comprensión lectora sobre texto expositivo ---------- */

  // Guía: "Identificación del título que debe tener un texto expositivo a partir
  // de sus ideas principales."
  "6.1.1": {
    quiz: [
      {
        q: `${TEXTO_B}\n\n¿Cuál es el título más adecuado para este texto?`,
        options: [
          "El agua en la Ciudad de México: inundación, escasez y hundimiento",
          "La historia de los lagos del Valle de México",
          "El sistema Cutzamala y su funcionamiento"
        ],
        correct: 0,
        explanation: "El título debe cubrir todo el contenido y nada más. El texto desarrolla tres problemas encadenados —inundación, escasez y hundimiento— y la primera opción los nombra. La segunda se queda en el antecedente histórico, que es solo el primer párrafo, y la tercera toma un dato secundario mencionado de paso."
      },
      {
        q: `${TEXTO_B}\n\n¿Por qué el título «El drenaje profundo de la Ciudad de México» sería inadecuado para este texto?`,
        options: [
          "Porque es más específico que el contenido: el texto abarca abasto, hundimiento y fugas, no solo el drenaje",
          "Porque el drenaje no se menciona en ningún momento",
          "Porque el título debe ser siempre una pregunta"
        ],
        correct: 0,
        explanation: "Un título demasiado estrecho promete menos de lo que el texto entrega. El drenaje aparece, pero solo dentro del problema de las inundaciones; dejaría fuera la escasez, el hundimiento y las fugas."
      },
      {
        q: `${TEXTO_B}\n\n¿Cuál es la idea principal del cuarto párrafo?`,
        options: [
          "El hundimiento provoca fugas, que obligan a extraer más agua, lo que hunde más el suelo",
          "El sistema Cutzamala trae agua de otra cuenca",
          "Las chinampas regulaban las crecidas del lago"
        ],
        correct: 0,
        explanation: "El cuarto párrafo describe un círculo vicioso: hundimiento → fugas → más extracción → más hundimiento. Las otras dos opciones son ideas de otros párrafos."
      }
    ]
  },

  // Guía: "Reconocimiento de relaciones de ejemplificación o causalidad entre oraciones."
  "6.1.2": {
    quiz: [
      {
        q: `${TEXTO_B}\n\nEn el segundo párrafo se lee: «le falta agua; **debido a que** las fuentes superficiales se agotaron, más de la mitad del abasto proviene de pozos profundos». ¿Qué relación lógica establece el conector destacado?`,
        options: ["Causalidad", "Ejemplificación", "Contraste"],
        correct: 0,
        explanation: "«Debido a que» introduce la causa de lo que se afirma: las fuentes se agotaron, y por eso el abasto depende de pozos profundos. No presenta un caso particular ni opone dos ideas."
      },
      {
        q: `${TEXTO_B}\n\nEn el tercer párrafo: «Al retirarse el agua, las arcillas se comprimen **y** la superficie desciende. **Algunas zonas del oriente se hunden hasta cuarenta centímetros al año**». ¿Qué relación guarda la oración destacada con la anterior?`,
        options: [
          "Ejemplificación: presenta un caso concreto del fenómeno enunciado antes",
          "Causalidad: explica por qué se comprimen las arcillas",
          "Contraste: se opone a lo dicho previamente"
        ],
        correct: 0,
        explanation: "Primero se enuncia el fenómeno general —la superficie desciende— y después se ofrece un caso medible que lo ilustra. Ese movimiento de lo general al caso concreto es la ejemplificación."
      },
      {
        q: `${TEXTO_B}\n\n«Las fugas representan cerca del cuarenta por ciento del agua inyectada, **de modo que** buena parte de lo que se extrae nunca llega a las casas.» ¿Qué relación establece el conector destacado?`,
        options: ["Consecuencia, que es una forma de causalidad", "Ejemplificación", "Adición"],
        correct: 0,
        explanation: "«De modo que» introduce el efecto que se sigue del dato anterior. Consecuencia y causa son las dos caras de la relación causal: una parte de la causa y llega al efecto, la otra al revés."
      }
    ]
  },

  /* ---------- Análisis literario sobre un texto narrativo completo ---------- */

  // Guía: "Identificación del tema central en un texto literario narrativo."
  "6.2.2": {
    quiz: [
      {
        q: `${TEXTO_A}\n\n¿Cuál es el tema central del texto?`,
        options: [
          "La dignidad de quien se queda y sostiene el vínculo pese al abandono",
          "El robo de un documento entre familiares",
          "La despoblación del campo mexicano"
        ],
        correct: 0,
        explanation: "El tema es la idea general que atraviesa la obra, no lo que pasa. Lo que pasa —la carta perdida, el pueblo vacío— sirve para mostrar a una mujer que responde al despojo reafirmando el vínculo, no rompiéndolo. El robo es un suceso de la trama y la despoblación es el ámbito."
      },
      {
        q: `${TEXTO_A}\n\n¿Cuál de estos enunciados expresa el TEMA del texto y no su trama?`,
        options: [
          "La permanencia del afecto frente al abandono",
          "Una anciana descubre que su nieta se llevó una carta y le escribe otra",
          "Nicolasa vacía el ropero y revisa detrás del espejo"
        ],
        correct: 0,
        explanation: "El tema se enuncia como idea abstracta, casi siempre con un sustantivo: la permanencia del afecto. Las otras dos opciones narran hechos concretos en secuencia, que es justamente la trama."
      }
    ]
  },

  // Guía: "Identificación del NUDO en un texto literario narrativo."
  "6.2.3": {
    quiz: [
      {
        q: `${TEXTO_A}\n\n¿Cuál es el nudo de este texto?`,
        options: [
          "El descubrimiento de que la carta no está y de que Rosaura se la llevó",
          "La descripción de la casa de adobe y del pueblo con ochenta habitantes",
          "El envío del sobre con la frase «Aquí sigue tu casa, y aquí sigue tu abuela»"
        ],
        correct: 0,
        explanation: "El nudo es el momento en que aparece el conflicto y la situación inicial se rompe. Aquí es la desaparición de la carta y lo que Nicolasa entiende a partir de ella. La descripción del pueblo es el planteamiento y el envío del sobre, el desenlace."
      },
      {
        q: `${TEXTO_A}\n\nRelacione cada parte de la trama con el pasaje del texto que le corresponde.\n**Parte:** 1. Planteamiento · 2. Nudo · 3. Desenlace\n**Pasaje:** a) Nicolasa compra un sobre, escribe una línea y la envía · b) Nicolasa guarda la carta y la lee cada 3 de febrero en el pueblo casi vacío · c) La carta no aparece y ella comprende que su nieta se la llevó`,
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El planteamiento (1) presenta a la protagonista, su rutina y el lugar (b). El nudo (2) instala el conflicto: la carta desaparecida (c). El desenlace (3) resuelve con la carta nueva (a)."
      },
      {
        q: "En una narración, ¿qué caracteriza al nudo frente al planteamiento y al desenlace?",
        options: [
          "Es donde surge el conflicto que rompe la situación inicial y sostiene la tensión del relato",
          "Es donde se presenta a los personajes y el lugar donde viven",
          "Es donde el conflicto queda resuelto"
        ],
        correct: 0,
        explanation: "El planteamiento presenta, el nudo complica y el desenlace resuelve. El nudo es el corazón del relato: sin conflicto no hay historia, solo descripción."
      }
    ]
  },

  // Guía: "Identificación de las características de personajes en un texto narrativo."
  "6.2.4": {
    quiz: [
      {
        q: `${TEXTO_A}\n\n«No fue a buscarla. Tampoco preguntó. Durante tres días barrió el patio, dio de comer a las gallinas y no habló con nadie.» ¿Qué rasgo de Nicolasa se infiere de estas acciones?`,
        options: [
          "Su contención: procesa el agravio en silencio en vez de confrontarlo",
          "Su indiferencia ante la pérdida de la carta",
          "Su incapacidad para moverse de la casa"
        ],
        correct: 0,
        explanation: "El texto no dice que Nicolasa sea contenida: lo muestra con lo que hace y calla. Eso es caracterización indirecta. No es indiferencia, porque antes vació el ropero entero buscando la carta, ni incapacidad, porque al cuarto día toma el camión."
      },
      {
        q: `${TEXTO_A}\n\n¿Qué tipo de caracterización predomina en la construcción del personaje de Nicolasa?`,
        options: [
          "Indirecta: el lector deduce sus rasgos a partir de sus acciones y sus silencios",
          "Directa: el narrador enumera explícitamente sus cualidades morales",
          "No hay caracterización: el personaje carece de rasgos definidos"
        ],
        correct: 0,
        explanation: "En ningún momento el narrador dice «era una mujer digna y paciente». Muestra que guarda la carta once años, que busca sin reclamar y que responde escribiendo. El lector arma el retrato con esos actos: caracterización indirecta."
      }
    ]
  },

  // Guía: "Reconocimiento de las características del narrador en un texto narrativo."
  "6.2.5": {
    quiz: [
      {
        q: `${TEXTO_A}\n\n¿Qué tipo de narrador presenta el texto?`,
        options: [
          "Omnisciente en tercera persona: conoce lo que Nicolasa entiende y siente, aunque ella no lo diga",
          "Protagonista: narra en primera persona su propia historia",
          "Testigo: relata solo lo que pudo ver desde fuera"
        ],
        correct: 0,
        explanation: "El narrador habla en tercera persona y accede al interior del personaje: «entendió que su nieta Rosaura había estado en la casa». Un narrador testigo no podría saber lo que ella entendió, solo lo que hizo."
      },
      {
        q: `${TEXTO_A}\n\n¿Qué fragmento demuestra que el narrador es omnisciente y no meramente observador?`,
        options: [
          "«se sentó en el escalón del patio… y entendió que su nieta Rosaura había estado en la casa»",
          "«La casa era de adobe y tenía el patio partido por un mezquite»",
          "«Pagó el timbre, la echó al buzón y regresó en el mismo camión»"
        ],
        correct: 0,
        explanation: "Las otras dos frases describen hechos observables desde fuera. Solo la primera entra en la conciencia del personaje y reporta una comprensión interna, que es la marca del narrador omnisciente."
      }
    ]
  },

  // Guía: "Identificación de las características del ámbito en un texto narrativo."
  "6.2.6": {
    quiz: [
      {
        q: `${TEXTO_A}\n\n¿Qué ámbito construye el texto?`,
        options: [
          "Un pueblo rural despoblado por la migración, con población envejecida y servicios cerrados",
          "Una ciudad industrial en expansión",
          "Una comunidad costera dedicada a la pesca"
        ],
        correct: 0,
        explanation: "El ámbito es el espacio físico más el entorno social. El texto los da con datos precisos: casa de adobe, ochenta habitantes casi todos mayores de sesenta, escuela cerrada hace seis años y «se fueron todos al norte»."
      },
      {
        q: `${TEXTO_A}\n\n¿Cómo influye el ámbito en el conflicto del relato?`,
        options: [
          "El despoblamiento explica el aislamiento de Nicolasa y da peso al vínculo que la carta representa",
          "El ámbito es decorativo y no afecta a la historia",
          "El ámbito provoca directamente que Rosaura se lleve la carta"
        ],
        correct: 0,
        explanation: "El ámbito condiciona las posibilidades del personaje: en un pueblo donde solo el chofer de la leche la llama por su nombre, una carta guardada once años pesa mucho más. No causa el robo, pero explica lo que está en juego."
      }
    ]
  },

  // Guía: "Reconocimiento del tiempo RETROSPECTIVO y el tiempo LINEAL."
  "6.2.7": {
    quiz: [
      {
        q: `${TEXTO_A}\n\n¿Qué tipo de tiempo narrativo predomina en el texto a partir del tercer párrafo?`,
        options: [
          "Lineal o cronológico: los hechos se cuentan en el orden en que ocurrieron",
          "Retrospectivo: la narración regresa continuamente al pasado",
          "Circular: el relato termina en la misma escena en que empezó"
        ],
        correct: 0,
        explanation: "De la desaparición de la carta en adelante, los hechos avanzan en orden: busca, se sienta, comprende, deja pasar tres días, al cuarto toma el camión, compra, escribe, envía, regresa. Eso es tiempo lineal."
      },
      {
        q: `${TEXTO_A}\n\n«el año en que su marido lo había sembrado» y «desde hacía once años» son referencias a hechos anteriores al presente del relato. ¿Qué recurso temporal emplean?`,
        options: [
          "Tiempo retrospectivo: la narración vuelve a un momento previo al presente de la historia",
          "Tiempo lineal: los hechos siguen su orden natural",
          "Anticipación: se adelanta un hecho futuro"
        ],
        correct: 0,
        explanation: "El tiempo retrospectivo lleva la narración hacia atrás para aportar antecedentes que explican el presente. Aquí sirven para medir cuánto tiempo llevaba Nicolasa sola y cuánto valía la carta."
      },
      {
        q: "¿Qué distingue al tiempo retrospectivo del tiempo lineal en una narración?",
        options: [
          "El retrospectivo interrumpe el presente para contar hechos anteriores; el lineal respeta el orden en que ocurrieron",
          "El retrospectivo se usa solo en novelas y el lineal solo en cuentos",
          "El retrospectivo narra en primera persona y el lineal en tercera"
        ],
        correct: 0,
        explanation: "La diferencia es el ORDEN de los hechos, no la extensión ni la persona gramatical. En el lineal, el orden del relato coincide con el de la historia; en el retrospectivo, la narración retrocede."
      }
    ]
  },

  // Guía: "Reconocimiento de las características del resumen, el relato simple,
  // la reseña y el comentario crítico."
  "6.1.4": {
    quiz: [
      {
        q: "Relacione cada forma textual con su característica.\n**Forma:** 1. Resumen · 2. Reseña · 3. Comentario crítico\n**Característica:** a) Expone brevemente el contenido de una obra y ofrece una valoración para orientar al lector · b) Condensa de forma objetiva las ideas principales del original, sin agregar opiniones · c) Argumenta una interpretación y sostiene una postura propia sobre la obra",
        options: ["1b, 2a, 3c", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El resumen (1) es objetivo y condensa (b). La reseña (2) informa y valora para orientar (a). El comentario crítico (3) va más lejos: argumenta una interpretación propia (c). La escala va de menos a más presencia del autor."
      }
    ]
  },

  /* ---------- Composición y gramática ---------- */

  // Guía: "Aplicación de las reglas de acentuación para palabras agudas, graves,
  // esdrújulas y sobreesdrújulas."
  "6.3.3": {
    quiz: [
      {
        q: "Relacione cada palabra con su clasificación por la posición del acento.\n**Palabra:** 1. Camión · 2. Árbol · 3. Página\n**Clasificación:** a) Esdrújula · b) Aguda · c) Grave o llana",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "En camión (1) la fuerza cae en la última sílaba: aguda (b). En árbol (2), en la penúltima: grave o llana (c). En página (3), en la antepenúltima: esdrújula (a)."
      },
      {
        q: "¿Por qué «árbol» lleva tilde?",
        options: [
          "Porque es grave y no termina en n, s ni vocal",
          "Porque todas las palabras graves llevan tilde",
          "Porque es esdrújula"
        ],
        correct: 0,
        explanation: "Las graves solo se acentúan cuando NO terminan en n, s o vocal. «Árbol» termina en l, así que lleva tilde; «arbolito», que termina en vocal, no la lleva."
      },
      {
        q: "¿Cuál de estas palabras graves NO debe llevar tilde?",
        options: ["examen", "lápiz", "árbol"],
        correct: 0,
        explanation: "«Examen» es grave y termina en n, así que no se acentúa. «Lápiz» termina en z y «árbol» en l: ambas graves terminadas en consonante distinta de n o s, así que sí llevan tilde."
      },
      {
        q: "«Devuélvemelo» es una palabra sobreesdrújula. ¿Qué regla de acentuación le aplica?",
        options: [
          "Todas las sobreesdrújulas llevan tilde, sin excepción",
          "Solo llevan tilde si terminan en vocal",
          "Nunca llevan tilde porque son palabras compuestas"
        ],
        correct: 0,
        explanation: "Las sobreesdrújulas —fuerza de voz antes de la antepenúltima sílaba— se acentúan siempre, igual que las esdrújulas. Suelen formarse al añadir pronombres a un verbo: dí-me-lo, cuén-ta-me-lo, de-vuél-ve-me-lo."
      },
      {
        q: "Relacione cada regla con el grupo de palabras al que corresponde.\n**Regla:** 1. Llevan tilde solo si terminan en n, s o vocal · 2. Llevan tilde solo si NO terminan en n, s o vocal · 3. Llevan tilde siempre\n**Grupo:** a) Graves o llanas · b) Esdrújulas y sobreesdrújulas · c) Agudas",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Las agudas (1) se acentúan si terminan en n, s o vocal: canción, compás, sofá (c). Las graves (2) al revés, solo si NO terminan así: árbol, lápiz (a). Las esdrújulas y sobreesdrújulas (3) siempre (b)."
      }
    ]
  },

  // Guía: "Reconocimiento de sujeto y predicado, así como complemento directo,
  // indirecto y circunstancial."
  "6.3.5": {
    quiz: [
      {
        q: "En la oración «El maestro entregó los exámenes a los alumnos el lunes por la mañana», relacione cada fragmento con su función sintáctica.\n**Fragmento:** 1. El maestro · 2. los exámenes · 3. a los alumnos · 4. el lunes por la mañana\n**Función:** a) Complemento directo · b) Complemento circunstancial · c) Sujeto · d) Complemento indirecto",
        options: ["1c, 2a, 3d, 4b", "1a, 2c, 3b, 4d", "1c, 2d, 3a, 4b"],
        correct: 0,
        explanation: "«El maestro» (1) realiza la acción: sujeto (c). «Los exámenes» (2) es lo entregado y se sustituye por «los»: complemento directo (a). «A los alumnos» (3) recibe lo entregado y se sustituye por «les»: complemento indirecto (d). «El lunes por la mañana» (4) indica cuándo: circunstancial (b)."
      }
    ]
  },

  // Guía: "Reconocimiento del proceso de planeación, la incorporación de apoyos
  // gráficos, el manejo de la voz, el uso del espacio y el control del tiempo en
  // ejemplos de exposición oral."
  "6.4.1": {
    quiz: [
      {
        q: "Relacione cada elemento de la exposición oral con la conducta que lo ejemplifica.\n**Elemento:** 1. Manejo de la voz · 2. Uso del espacio · 3. Control del tiempo\n**Conducta:** a) El expositor se desplaza al frente sin darle la espalda al público · b) Ensaya para ajustar la duración a los diez minutos asignados · c) Varía el volumen y hace pausas para marcar las ideas importantes",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Variar volumen y pausas (1) es manejo de la voz (c). Desplazarse sin dar la espalda (2) es uso del espacio (a). Ensayar para ajustar la duración (3) es control del tiempo (b)."
      },
      {
        q: "Ordene las etapas de una exposición oral bien preparada.\n1. Ensayar en voz alta y ajustar el tiempo\n2. Delimitar el tema y el propósito ante ese público\n3. Elaborar los apoyos gráficos\n4. Organizar las ideas en introducción, desarrollo y cierre",
        options: ["2, 4, 3, 1", "1, 2, 3, 4", "3, 2, 4, 1"],
        correct: 0,
        explanation: "Primero se define qué se va a decir y a quién (2), luego se estructura (4), después se producen los apoyos que refuerzan esa estructura (3) y al final se ensaya para ajustar el tiempo (1). Hacer las diapositivas antes de decidir la estructura es el error más común."
      }
    ]
  },

  /* ---------- Inglés ---------- */

  // Guía: "Uso de las palabras who, what, where y whose en preguntas simples."
  "6.5.6": {
    quiz: [
      {
        q: "Complete: «______ is your favorite subject at school?» — «Mathematics.»",
        options: ["What", "Who", "Whose"],
        correct: 0,
        explanation: "«What» pregunta por una cosa o una información no personal. «Who» pregunta por una persona y «whose» por el poseedor de algo."
      },
      {
        q: "Complete: «______ did you do last weekend?» — «I visited my grandparents.»",
        options: ["What", "Where", "Whose"],
        correct: 0,
        explanation: "La respuesta describe una acción, así que la pregunta debe ser por la cosa o actividad: «What did you do?». «Where» pediría un lugar y «whose», un poseedor."
      },
      {
        q: "Relacione cada palabra interrogativa con lo que pregunta.\n**Palabra:** 1. Who · 2. What · 3. Whose · 4. Where\n**Pregunta por:** a) El poseedor de algo · b) Un lugar · c) Una persona · d) Una cosa o información",
        options: ["1c, 2d, 3a, 4b", "1a, 2b, 3c, 4d", "1d, 2c, 3b, 4a"],
        correct: 0,
        explanation: "Who (1) pregunta por una persona (c). What (2) por una cosa o información (d). Whose (3) por el poseedor (a). Where (4) por un lugar (b)."
      }
    ]
  },

  // Guía: "Uso de los verbos modales can, should, must y might."
  "6.5.8": {
    quiz: [
      {
        q: "Relacione cada verbo modal con lo que expresa.\n**Modal:** 1. Can · 2. Should · 3. Must · 4. Might\n**Expresa:** a) Obligación o prohibición fuerte · b) Posibilidad incierta · c) Habilidad o capacidad · d) Consejo o recomendación",
        options: ["1c, 2d, 3a, 4b", "1a, 2b, 3c, 4d", "1d, 2c, 3b, 4a"],
        correct: 0,
        explanation: "Can (1) expresa habilidad (c). Should (2), consejo (d). Must (3), obligación o prohibición fuerte (a). Might (4), posibilidad incierta (b)."
      }
    ]
  },

  // Guía: "Identificación de la construcción correcta de oraciones condicionales
  // haciendo uso del primer y segundo condicional."
  "6.5.9": {
    quiz: [
      {
        q: "Relacione cada oración con el tipo de condicional que emplea.\n**Oración:** 1. If you heat ice, it melts · 2. If it rains tomorrow, we will cancel the trip · 3. If I were rich, I would buy a house by the sea\n**Condicional:** a) Primer condicional · b) Segundo condicional · c) Condicional cero",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El condicional cero (1) expresa una verdad general: present + present (c). El primero (2) una condición real y probable: if + present, will + verbo (a). El segundo (3) una situación hipotética o improbable: if + past, would + verbo (b)."
      }
    ]
  }
};
