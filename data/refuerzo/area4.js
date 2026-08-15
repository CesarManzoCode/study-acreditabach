/* Refuerzo del área 4 · Humanidades

   Aquí estaban los dos huecos más graves de todo el temario:

   · 4.5.3 evalúa roles de género, PATRIARCADO y MICROMACHISMOS, y el paquete
     no preguntaba por ninguno de los tres: enseñaba brecha salarial, techo de
     cristal y acciones afirmativas.
   · 4.3.1 evalúa hedonismo, ESTOICISMO y utilitarismo, y el estoicismo no
     tenía un solo reactivo: el paquete se había ido a Kant y Aristóteles.

   Se suman los reactivos de relación de elementos que piden las orientaciones
   con listas largas: los once valores de 4.3.2, los cuatro tipos de norma de
   4.3.3, las cinco categorías estéticas de 4.6.1 y los cuatro principios
   bioéticos de 4.5.1. */

const AREA4_REFUERZO = {
  // Guía: "Reconocimiento de las características del pensamiento filosófico,
  // el mítico y el científico."
  "4.1.1": {
    quiz: [
      {
        q: "Relacione cada forma de pensamiento con su característica.\n**Pensamiento:** 1. Mítico · 2. Filosófico · 3. Científico\n**Característica:** a) Examina los conceptos y los supuestos mediante la razón y el argumento, sin recurrir al experimento · b) Explica el mundo mediante relatos sobre dioses y fuerzas sobrenaturales, aceptados por tradición · c) Formula hipótesis y las somete a comprobación empírica, de modo que puedan refutarse",
        options: ["1b, 2a, 3c", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El mítico (1) explica por relatos sagrados transmitidos por tradición (b). El filosófico (2) argumenta racionalmente sobre conceptos y supuestos (a). El científico (3) contrasta hipótesis con evidencia y admite ser refutado (c)."
      }
    ]
  },

  // Guía: "Identificación de frases que ejemplifican la función INSTRUMENTAL y
  // la función EMOTIVA de la lengua."   ← solo dos funciones se evalúan.
  "4.2.1": {
    quiz: [
      {
        q: "Relacione cada frase con la función de la lengua que ejemplifica.\n**Frase:** 1. «¡Qué susto me diste!» · 2. «Entrega el reporte antes del viernes» · 3. «El agua hierve a 100 grados al nivel del mar»\n**Función:** a) Instrumental · b) Informativa · c) Emotiva",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "«¡Qué susto me diste!» (1) expresa el estado de ánimo del emisor: función emotiva (c). «Entrega el reporte» (2) busca que el receptor actúe: función instrumental (a). El dato del agua (3) informa un hecho: función informativa (b)."
      },
      {
        q: "«Obra solo según aquella máxima por la cual al mismo tiempo puedas querer que se convierta en ley universal.» ¿Qué función de la lengua predomina?",
        options: ["Instrumental", "Emotiva", "Informativa"],
        correct: 0,
        explanation: "Está en imperativo: «obra». La función instrumental busca una reacción del receptor y se manifiesta en órdenes, peticiones, preguntas y argumentos. No expresa una emoción del emisor ni informa un hecho."
      },
      {
        q: "¿Cuál de estas frases cumple la función INSTRUMENTAL de la lengua?",
        options: [
          "«Vota por quien defienda tu derecho a la salud»",
          "«Me llena de nostalgia volver a este lugar»",
          "«La capital del estado tiene dos millones de habitantes»"
        ],
        correct: 0,
        explanation: "La función instrumental busca influir en la conducta del receptor: aquí se le pide que vote de cierta manera. La segunda expresa un sentimiento (emotiva) y la tercera comunica un dato (informativa)."
      },
      {
        q: "¿Cuál de estas frases cumple la función EMOTIVA de la lengua?",
        options: [
          "«¡Qué alegría tan grande verte de nuevo!»",
          "«Cierra la ventana, por favor»",
          "«El examen se aplica en dos sesiones»"
        ],
        correct: 0,
        explanation: "La función emotiva o expresiva manifiesta el estado de ánimo de quien habla. La segunda pide una acción (instrumental) y la tercera comunica información (informativa)."
      }
    ]
  },

  // Guía: "Identificación de planteamientos correspondientes a debate, mayéutica,
  // ensayo y deliberación."
  "4.2.4": {
    quiz: [
      {
        q: "Relacione cada tipo de discurso argumentativo con la situación que lo ejemplifica.\n**Discurso:** 1. Mayéutica · 2. Debate · 3. Deliberación\n**Situación:** a) Una asamblea sopesa tres opciones de gasto y elige la mejor tras discutir ventajas y desventajas · b) Un maestro pregunta una y otra vez hasta que el alumno descubre por sí mismo la contradicción de su definición · c) Dos equipos defienden posturas contrarias ante un moderador y un público",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La mayéutica (1) es el método socrático de preguntar hasta que el interlocutor examina sus propias creencias (b). El debate (2) confronta posturas opuestas ante un moderador (c). La deliberación (3) busca decidir en conjunto sopesando opciones (a)."
      },
      {
        q: "Relacione cada rasgo con el discurso argumentativo al que corresponde.\n**Rasgo:** 1. Busca vencer a la postura contraria · 2. Busca llegar a una decisión conjunta · 3. Sostiene por escrito una tesis propia con argumentos\n**Discurso:** a) Ensayo · b) Debate · c) Deliberación",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Vencer al contrario (1) es propio del debate (b). Decidir en conjunto (2) es la deliberación (c). Sostener por escrito una tesis propia (3) es el ensayo (a)."
      }
    ]
  },

  // Guía: "Reconocimiento de los postulados del hedonismo, el ESTOICISMO y el
  // utilitarismo."   ← el estoicismo no tenía ni un reactivo.
  "4.3.1": {
    quiz: [
      {
        q: "Relacione cada teoría ética con su postulado central.\n**Teoría:** 1. Hedonismo · 2. Estoicismo · 3. Utilitarismo\n**Postulado:** a) Una acción es buena si produce el mayor bienestar para el mayor número de personas · b) El bien supremo es el placer y la ausencia de dolor · c) La felicidad se alcanza dominando las pasiones con la razón y aceptando con serenidad lo que no depende de uno",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El hedonismo (1) pone el placer como bien supremo (b). El estoicismo (2) busca la serenidad mediante el autocontrol racional (c). El utilitarismo (3) mide la bondad de un acto por el bienestar colectivo que produce (a)."
      },
      {
        q: "Una persona pierde su empleo y decide concentrarse solo en lo que sí está en sus manos —prepararse, buscar otro trabajo— y dejar de angustiarse por lo que no puede controlar. ¿Qué postura ética refleja?",
        options: ["El estoicismo", "El hedonismo", "El utilitarismo"],
        correct: 0,
        explanation: "La distinción entre lo que depende de nosotros y lo que no es el núcleo del estoicismo: la serenidad viene de aceptar racionalmente lo segundo y actuar sobre lo primero. No busca placer ni calcula el beneficio de la mayoría."
      },
      {
        q: "Según el estoicismo, ¿cuál es el camino a la felicidad?",
        options: [
          "Dominar las pasiones mediante la razón y vivir conforme a la naturaleza",
          "Maximizar el placer y minimizar el dolor",
          "Elegir siempre la opción que beneficie al mayor número de personas"
        ],
        correct: 0,
        explanation: "Para los estoicos las pasiones descontroladas son la causa del sufrimiento, y la razón es la herramienta para gobernarlas. Vivir conforme a la naturaleza y a la razón produce la imperturbabilidad, que es su idea de felicidad."
      },
      {
        q: "Un gobierno decide destinar el presupuesto de salud al tratamiento que salvará más vidas, aunque deje sin cubrir a un grupo pequeño con una enfermedad rara y costosa. ¿Qué postura ética refleja esa decisión?",
        options: ["El utilitarismo", "El estoicismo", "El hedonismo"],
        correct: 0,
        explanation: "El criterio es el mayor bienestar para el mayor número, que es la fórmula utilitarista. Y ahí aparece también su crítica clásica: puede justificar el perjuicio de una minoría en nombre del beneficio agregado."
      }
    ]
  },

  // Guía: "Relación de los valores de justicia, respeto, empatía, honestidad,
  // tolerancia, solidaridad, integridad, responsabilidad, igualdad, libertad y
  // prudencia con sus respectivas definiciones."   ← once valores.
  "4.3.2": {
    quiz: [
      {
        q: "Relacione cada valor con su definición.\n**Valor:** 1. Justicia · 2. Prudencia · 3. Responsabilidad\n**Definición:** a) Asumir las consecuencias de los propios actos y cumplir los compromisos adquiridos · b) Actuar con moderación y reflexión, valorando las consecuencias antes de decidir · c) Dar a cada quien lo que le corresponde, juzgando desde una perspectiva imparcial",
        options: ["1c, 2b, 3a", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "La justicia (1) da a cada quien lo suyo con imparcialidad (c). La prudencia (2) es la moderación reflexiva antes de actuar (b). La responsabilidad (3) es hacerse cargo de los propios actos (a)."
      },
      {
        q: "Relacione cada valor con su definición.\n**Valor:** 1. Tolerancia · 2. Empatía · 3. Igualdad\n**Definición:** a) Reconocer a todas las personas el mismo valor y los mismos derechos · b) Respetar la existencia de ideas y formas de vida distintas de la propia · c) Comprender lo que siente otra persona poniéndose en su lugar",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La tolerancia (1) admite lo distinto (b). La empatía (2) es ponerse en el lugar del otro (c). La igualdad (3) reconoce el mismo valor y los mismos derechos a todos (a)."
      },
      {
        q: "Relacione cada valor con su definición.\n**Valor:** 1. Libertad · 2. Integridad · 3. Solidaridad\n**Definición:** a) Actuar conforme a los propios principios de manera constante, se esté o no bajo observación · b) Apoyar a otros reconociendo una necesidad compartida · c) Capacidad de decidir y actuar por uno mismo, asumiendo las consecuencias",
        options: ["1c, 2a, 3b", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "La libertad (1) es la capacidad de decidir por uno mismo (c). La integridad (2) es la coherencia constante con los propios principios (a). La solidaridad (3) es el apoyo a otros ante una necesidad compartida (b)."
      }
    ]
  },

  // Guía: "Identificación de ejemplos de normas religiosas, morales, jurídicas y sociales."
  "4.3.3": {
    quiz: [
      {
        q: "Relacione cada situación con el tipo de norma que la rige.\n**Situación:** 1. Pagar el impuesto sobre la renta · 2. Guardar silencio durante un funeral · 3. Ayunar en una fecha marcada por el calendario litúrgico\n**Norma:** a) Religiosa · b) Jurídica · c) Social",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El impuesto (1) lo impone el Estado y su incumplimiento tiene sanción legal: norma jurídica (b). El silencio en un funeral (2) es una convención social (c). El ayuno litúrgico (3) responde a una norma religiosa (a)."
      },
      {
        q: "Relacione cada tipo de norma con su rasgo distintivo.\n**Norma:** 1. Jurídica · 2. Moral · 3. Social\n**Rasgo:** a) La persona la asume por convicción propia y su sanción es el remordimiento · b) La impone el Estado y puede hacerse cumplir por la fuerza · c) La sostiene la costumbre del grupo y su sanción es el rechazo o la burla",
        options: ["1b, 2a, 3c", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La norma jurídica (1) es coercible: el Estado la hace cumplir (b). La moral (2) es autónoma y su sanción es interna (a). La social (3) descansa en la costumbre y su sanción es la desaprobación del grupo (c)."
      }
    ]
  },

  // Guía: "Reconocimiento de los principios de autonomía, justicia, beneficencia
  // y no maleficencia en situaciones hipotéticas."
  "4.5.1": {
    quiz: [
      {
        q: "Relacione cada situación con el principio de bioética que aplica.\n**Situación:** 1. Un hospital fija criterios clínicos transparentes para repartir camas escasas · 2. Un médico explica riesgos y alternativas y acepta que el paciente rechace la cirugía · 3. Un médico suspende un tratamiento cuyos efectos secundarios superan el beneficio\n**Principio:** a) Autonomía · b) No maleficencia · c) Justicia",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Repartir un recurso escaso con criterios equitativos (1) es justicia (c). Respetar la decisión informada del paciente (2) es autonomía (a). Evitar un daño mayor al beneficio (3) es no maleficencia (b)."
      },
      {
        q: "Relacione cada principio bioético con lo que ordena.\n**Principio:** 1. Beneficencia · 2. No maleficencia · 3. Autonomía\n**Ordena:** a) Respetar la decisión libre e informada de la persona · b) Actuar procurando activamente el bien del paciente · c) Ante todo, no causar daño",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La beneficencia (1) obliga a hacer el bien de forma activa (b). La no maleficencia (2) obliga primero a no dañar (c). La autonomía (3) obliga a respetar la voluntad informada de la persona (a). Beneficencia y no maleficencia se confunden: la primera manda actuar, la segunda manda abstenerse."
      }
    ]
  },

  // Guía: "Conocimiento de las definiciones de los conceptos de ROLES DE GÉNERO,
  // PATRIARCADO y MICROMACHISMOS."   ← ninguno de los tres tenía reactivos.
  "4.5.3": {
    quiz: [
      {
        q: "Relacione cada concepto de la perspectiva de género con su definición.\n**Concepto:** 1. Roles de género · 2. Patriarcado · 3. Micromachismos\n**Definición:** a) Sistema social en el que la autoridad y el poder se concentran en los hombres, produciendo desigualdad hacia las mujeres · b) Conductas cotidianas, sutiles y normalizadas que refuerzan la desigualdad sin ser violencia evidente · c) Conductas y tareas que la sociedad espera de una persona según su sexo",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Los roles de género (1) son las conductas esperadas según el sexo (c). El patriarcado (2) es el sistema que concentra el poder en los hombres (a). Los micromachismos (3) son las prácticas cotidianas y sutiles que sostienen esa desigualdad (b)."
      },
      {
        q: "En una junta de trabajo, cada vez que una compañera empieza a hablar alguien la interrumpe o repite su idea atribuyéndosela. ¿Qué concepto describe esa conducta?",
        options: ["Micromachismo", "Patriarcado", "Rol de género"],
        correct: 0,
        explanation: "El micromachismo es precisamente eso: una práctica cotidiana, de baja intensidad y socialmente normalizada, que resta autoridad a la mujer sin llegar a la agresión abierta. El patriarcado es el sistema al que pertenece, no el acto concreto."
      },
      {
        q: "¿Qué se entiende por patriarcado en la perspectiva de género?",
        options: [
          "Un sistema social e histórico en el que la autoridad, los recursos y las decisiones se concentran en los varones",
          "Cualquier acto individual de discriminación cometido por un hombre",
          "La preferencia de una familia por tener hijos varones"
        ],
        correct: 0,
        explanation: "El patriarcado no es un acto sino una estructura: un ordenamiento social sostenido en el tiempo que reparte de forma desigual el poder, los recursos y la voz pública entre hombres y mujeres. Los actos individuales son sus manifestaciones."
      },
      {
        q: "Que se espere que una niña juegue a la cocinita y un niño al futbol es un ejemplo de:",
        options: ["Roles de género", "Micromachismo", "Patriarcado"],
        correct: 0,
        explanation: "Son las expectativas de conducta que la sociedad asigna según el sexo, es decir, roles de género. Se aprenden desde la infancia y varían entre culturas y épocas, lo que muestra que son construcción social y no naturaleza."
      }
    ]
  },

  // Guía: "Identificación de las características de lo grotesco, lo bello,
  // lo cómico, lo trágico y lo sublime."   ← cinco categorías.
  "4.6.1": {
    quiz: [
      {
        q: "Relacione cada categoría estética con su característica.\n**Categoría:** 1. Lo sublime · 2. Lo grotesco · 3. Lo cómico\n**Característica:** a) Deforma y exagera hasta lo monstruoso, produciendo extrañeza e incomodidad · b) Provoca risa por lo absurdo o lo incongruente de la situación · c) Produce admiración y sobrecogimiento a la vez, ante algo que desborda la medida humana",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Lo sublime (1) mezcla admiración y sobrecogimiento ante lo inmenso (c). Lo grotesco (2) deforma hasta lo monstruoso (a). Lo cómico (3) provoca risa por lo incongruente (b)."
      },
      {
        q: "Relacione cada categoría estética con su característica.\n**Categoría:** 1. Lo bello · 2. Lo trágico\n**Característica:** a) Presenta a un personaje de talla enfrentado a un destino adverso que lo lleva a la caída pese a sus esfuerzos · b) Produce agrado sereno por la armonía, la proporción y el equilibrio de la obra",
        options: ["1b, 2a", "1a, 2b", "1b, 2b"],
        correct: 0,
        explanation: "Lo bello (1) es el agrado sereno que nace de la armonía y la proporción (b). Lo trágico (2) es la caída inevitable de un personaje de grandeza (a). Lo sublime se distingue de lo bello justamente porque no es sereno: sobrecoge."
      },
      {
        q: "Un espectador contempla una tormenta desde un acantilado y siente al mismo tiempo fascinación y pequeñez. ¿Qué categoría estética corresponde?",
        options: ["Lo sublime", "Lo bello", "Lo grotesco"],
        correct: 0,
        explanation: "Lo sublime aparece ante lo que desborda la medida humana —la inmensidad, la fuerza natural— y produce esa mezcla de atracción y sobrecogimiento. Lo bello, en cambio, agrada sin inquietar."
      }
    ]
  }
};
