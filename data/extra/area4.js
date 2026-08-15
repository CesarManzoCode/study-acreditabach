/* Contenido adicional del área 4 · Humanidades
   Se CONCATENA al final de flashcards y quiz de cada tema (ver engine.js). */

const AREA4_EXTRA = {
  "4.1.1": {
    flashcards: [
      { front: "¿Qué es el paso 'del mito al logos'?", back: "El giro del pensamiento griego (siglo VI a. C.) que dejó de explicar la naturaleza con relatos de dioses y empezó a buscar causas racionales: es el nacimiento de la filosofía." },
      { front: "¿Qué comparten la filosofía y la ciencia?", back: "Las dos usan la razón y exigen argumentos. La diferencia es que la ciencia comprueba sus afirmaciones con método experimental y la filosofía trabaja preguntas que no se resuelven midiendo." },
      { front: "¿Por qué el mito no es simplemente 'una mentira'?", back: "Porque cumple funciones sociales reales: da identidad, explica el origen del grupo y transmite valores. Lo que no busca es demostración empírica." }
    ],
    quiz: [
      { q: "¿Qué caracteriza al conocimiento científico frente al filosófico?", options: ["Que se somete a comprobación empírica y puede refutarse con datos","Que no usa la razón","Que nunca cambia sus conclusiones"], correct: 0, explanation: "Ambos son racionales; lo distintivo de la ciencia es la verificación mediante observación y experimento." },
      { q: "La pregunta '¿qué hace que una acción sea justa?' pertenece principalmente al campo de:", options: ["La filosofía","La física experimental","La mitología"], correct: 0, explanation: "Es una pregunta normativa que no se resuelve midiendo: se argumenta racionalmente, que es el terreno de la filosofía." },
      { q: "¿Qué función social cumplía el mito en las sociedades antiguas?", options: ["Dar identidad al grupo y explicar su origen y sus normas","Predecir resultados experimentales","Sustituir a las matemáticas"], correct: 0, explanation: "Más que explicar la naturaleza, el mito cohesionaba a la comunidad y justificaba su orden social." },
      { q: "Una persona sostiene que un remedio funciona 'porque siempre se ha usado así'. ¿Qué le falta a esa afirmación para ser científica?", options: ["Evidencia obtenida mediante observación controlada y experimentación","Un relato sobre su origen","Mayor antigüedad"], correct: 0, explanation: "La tradición no equivale a prueba: la ciencia exige contrastar la afirmación con datos." }
    ]
  },
  "4.1.2": {
    leccion: "El principal obstáculo del pensamiento crítico tiene nombre: el **sesgo de confirmación**, la tendencia a buscar y aceptar solo la información que confirma lo que ya creemos, ignorando la que la contradice. Reconocerlo es parte del método. Para **evaluar la credibilidad de una fuente** se revisa quién la firma y con qué autoridad, si cita evidencia verificable, si tiene intereses en el tema y si otras fuentes independientes coinciden con ella.",
    flashcards: [
      { front: "¿Qué es el sesgo de confirmación?", back: "La tendencia a buscar y aceptar solo la información que confirma lo que ya creemos, ignorando la que la contradice. Es el principal enemigo del pensamiento crítico." },
      { front: "¿Cómo se evalúa la credibilidad de una fuente?", back: "Revisando quién la firma y con qué autoridad, si cita evidencia verificable, si tiene intereses en el tema y si otras fuentes independientes coinciden." }
    ],
    quiz: [
      { q: "Una persona solo lee noticias de medios que coinciden con su opinión y descarta las demás sin leerlas. ¿Qué obstáculo del pensamiento crítico muestra?", options: ["Sesgo de confirmación","Pensamiento analógico","Método científico"], correct: 0, explanation: "Selecciona la evidencia que le conviene: así nunca pone a prueba lo que ya cree." },
      { q: "¿Cuál de estas actitudes NO forma parte del pensamiento crítico?", options: ["Rechazar cualquier información que venga de una autoridad, sin analizarla","Comparar varias fuentes antes de opinar","Reconocer que uno puede estar equivocado"], correct: 0, explanation: "Pensar críticamente no es desconfiar por sistema, sino evaluar razones y evidencia caso por caso." },
      { q: "Antes de compartir una imagen alarmante recibida por mensajería, ¿qué haría alguien con pensamiento crítico?", options: ["Verificar el origen y la fecha de la imagen en fuentes confiables","Compartirla de inmediato por si acaso es cierta","Borrarla sin leerla"], correct: 0, explanation: "La verificación previa evita difundir desinformación; compartir 'por si acaso' la propaga." },
      { q: "Aceptar una afirmación solo porque la dice una persona famosa es un ejemplo de:", options: ["Falacia de apelación a la autoridad","Argumento deductivo válido","Razonamiento inductivo"], correct: 0, explanation: "La fama no es evidencia: si la autoridad no es experta en el tema ni aporta razones, el argumento no se sostiene." }
    ]
  },
  "4.1.3": {
    flashcards: [
      { front: "¿Qué quiso decir Sartre con que estamos 'condenados a ser libres'?", back: "Que no podemos evitar elegir: incluso no decidir es una decisión. Por eso la libertad viene acompañada de angustia y de responsabilidad total sobre lo que hacemos." },
      { front: "¿Qué es la 'mala fe' en el existencialismo?", back: "Engañarse a uno mismo negando la propia libertad: decir 'no tuve opción' o esconderse en un papel social para no asumir la responsabilidad de elegir." }
    ],
    quiz: [
      { q: "¿Qué significa que 'la existencia precede a la esencia'?", options: ["Primero existimos y luego, con nuestras decisiones, definimos quiénes somos","Nacemos con un destino ya escrito que debemos descubrir","La esencia humana es fija e inmutable"], correct: 0, explanation: "No hay una naturaleza humana previa que determine la vida: cada quien se construye eligiendo." },
      { q: "Una persona justifica su conducta diciendo 'yo soy así, no puedo cambiar'. Desde el existencialismo, esa actitud es:", options: ["Mala fe: niega su propia libertad para no asumir la responsabilidad","Un ejemplo de autenticidad","Una demostración de autonomía"], correct: 0, explanation: "Refugiarse en una supuesta esencia fija es el modo típico de evadir la responsabilidad de elegir." },
      { q: "¿Por qué el existencialismo asocia la libertad con la angustia?", options: ["Porque al no haber reglas dadas de antemano, cada quien carga con el peso de sus decisiones","Porque la libertad es una ilusión","Porque nadie puede elegir realmente"], correct: 0, explanation: "Sin un fundamento externo que garantice la elección correcta, la responsabilidad recae entera en la persona." },
      { q: "¿Cuál de estas figuras se asocia con el pensamiento existencialista?", options: ["Jean-Paul Sartre","Auguste Comte","Isaac Newton"], correct: 0, explanation: "Sartre, junto con Simone de Beauvoir, Camus y Kierkegaard, son referencias centrales del existencialismo." }
    ]
  },
  "4.1.4": {
    leccion: "Dos precisiones sobre doxa y episteme. La **alegoría de la caverna de Platón** es la imagen con la que se explica la diferencia: unos prisioneros encadenados toman las sombras proyectadas en el muro por la realidad, y salir de la caverna representa pasar de la **doxa** (las apariencias) a la **episteme** (el conocimiento verdadero). Y ojo con un error frecuente: **no toda doxa es falsa**. La doxa puede ser cierta, pero es una creencia sin fundamento demostrado; lo que le falta no es verdad, sino justificación: quien la sostiene no puede explicar por qué es verdadera.",
    flashcards: [
      { front: "¿Qué era la alegoría de la caverna de Platón?", back: "La imagen de unos prisioneros que toman las sombras por la realidad. Salir de la caverna representa pasar de la doxa (apariencias) a la episteme (conocimiento verdadero)." },
      { front: "¿Toda doxa es falsa?", back: "No. La doxa puede ser cierta, pero es una creencia sin fundamento demostrado: quien la sostiene no puede justificar por qué es verdadera." }
    ],
    quiz: [
      { q: "En la alegoría de la caverna, las sombras proyectadas en la pared representan:", options: ["La doxa: el conocimiento aparente basado en los sentidos","La episteme comprobada","El método científico"], correct: 0, explanation: "Los prisioneros creen que las sombras son la realidad; salir a la luz simboliza acceder al conocimiento verdadero." },
      { q: "Un estudiante afirma que un remedio casero cura la gripe porque a su familia 'siempre le ha funcionado'. Esa afirmación es:", options: ["Doxa, pues se basa en la experiencia inmediata sin fundamento comprobado","Episteme, porque hay evidencia","Un argumento deductivo válido"], correct: 0, explanation: "Es una creencia razonable, pero sin comprobación sistemática sigue siendo opinión." },
      { q: "¿Qué se necesita para que una creencia pase de doxa a episteme?", options: ["Justificación y comprobación que la sostengan","Que la comparta mucha gente","Que sea antigua"], correct: 0, explanation: "Lo determinante no es cuántos la creen ni cuánto lleva creyéndose, sino la razón que la fundamenta." },
      { q: "Los sondeos de opinión pública recogen, en términos filosóficos, sobre todo:", options: ["Doxa, es decir, lo que la gente opina","Episteme, es decir, conocimiento demostrado","Datos experimentales de laboratorio"], correct: 0, explanation: "Miden opiniones, no verdades demostradas; su valor es describir lo que se cree, no lo que es." }
    ]
  },
  "4.2.1": {
    flashcards: [
      { front: "¿Qué es la función referencial del lenguaje?", back: "La que informa sobre hechos o datos del mundo, centrada en el contexto: 'El agua hierve a 100 °C al nivel del mar'." }
    ],
    quiz: [
      { q: "'El examen se aplicará el 22 de noviembre en dos sesiones' cumple la función:", options: ["Referencial","Apelativa","Poética"], correct: 0, explanation: "Transmite información verificable sobre la realidad, sin buscar una reacción emotiva ni una acción." }
    ]
  },
  "4.2.2": {
    flashcards: [
      { front: "¿Qué es una premisa implícita?", back: "Una razón que el argumento da por supuesta sin enunciarla. En 'Es mexicano, así que habla español' se supone que todos los mexicanos hablan español." },
      { front: "¿Qué diferencia hay entre un argumento válido y uno verdadero?", back: "La **validez** es la relación correcta entre premisas y conclusión; la **verdad** es que las premisas coincidan con la realidad. Un argumento válido puede partir de premisas falsas." }
    ],
    quiz: [
      { q: "En 'Deberíamos usar transporte público porque contamina menos y reduce el tráfico', la conclusión es:", options: ["Deberíamos usar transporte público","Contamina menos","Reduce el tráfico"], correct: 0, explanation: "Lo que se quiere sostener es la recomendación; los dos hechos son las premisas que la apoyan." },
      { q: "¿Qué palabra suele introducir una premisa?", options: ["Porque","Por lo tanto","En conclusión"], correct: 0, explanation: "'Porque', 'ya que' y 'dado que' anuncian razones; 'por lo tanto' y 'en conclusión' anuncian la conclusión." },
      { q: "'Todos los cuervos que he visto son negros; por lo tanto, no existen cuervos blancos.' ¿Qué problema tiene este argumento?", options: ["La conclusión afirma más de lo que las premisas garantizan","No tiene conclusión","Las premisas son contradictorias"], correct: 0, explanation: "De una muestra limitada no se sigue con certeza una afirmación universal: la conclusión excede la evidencia." },
      { q: "Un argumento puede ser válido y tener una conclusión falsa cuando:", options: ["Alguna de sus premisas es falsa","Su estructura lógica es incorrecta","No tiene premisas"], correct: 0, explanation: "La validez garantiza que si las premisas fueran verdaderas la conclusión también lo sería; no garantiza que lo sean." }
    ]
  },
  "4.2.3": {
    flashcards: [
      { front: "¿Por qué la inducción nunca da certeza absoluta?", back: "Porque generaliza a partir de casos observados: siempre puede aparecer un caso nuevo que contradiga la conclusión, como el cisne negro frente a 'todos los cisnes son blancos'." },
      { front: "¿De qué depende la fuerza de un argumento analógico?", back: "De que las semejanzas entre los dos casos sean **relevantes** para lo que se concluye. Si se parecen en algo que no viene al caso, la analogía es débil." }
    ],
    quiz: [
      { q: "'Todos los metales conducen electricidad; el cobre es un metal; por lo tanto, el cobre conduce electricidad.' Este argumento es:", options: ["Deductivo","Inductivo","Analógico"], correct: 0, explanation: "Va de una ley general a un caso particular y la conclusión se sigue necesariamente de las premisas." },
      { q: "¿Qué hace débil a esta analogía: 'Una empresa debe dirigirse como un ejército, porque ambos tienen jefes'?", options: ["La semejanza señalada no es relevante para las diferencias entre ambos contextos","Que el ejército no tiene jefes","Que no compara dos casos"], correct: 0, explanation: "Tener jerarquías no basta: los fines, los medios y la relación con las personas son distintos, y ahí falla la comparación." },
      { q: "Un médico observa que 40 de sus pacientes con cierto síntoma tenían la misma enfermedad y concluye que ese síntoma la indica. Su razonamiento es:", options: ["Inductivo","Deductivo","Puramente analógico"], correct: 0, explanation: "Parte de casos particulares para formular una regla general probable." },
      { q: "¿Qué tipo de razonamiento predomina en la investigación científica cuando se formulan hipótesis a partir de observaciones?", options: ["El inductivo","El deductivo puro","El mítico"], correct: 0, explanation: "La observación de regularidades sugiere hipótesis generales, que después se ponen a prueba deductivamente." }
    ]
  },
  "4.2.4": {
    flashcards: [
      { front: "¿Cuál es la estructura básica de un ensayo argumentativo?", back: "Introducción con la tesis, desarrollo con argumentos y evidencia (incluida la respuesta a las objeciones) y conclusión que retoma la tesis a la luz de lo argumentado." },
      { front: "¿Qué distingue a la deliberación del debate?", back: "El debate busca **vencer** defendiendo una postura fija; la deliberación busca **decidir bien**, y quienes participan pueden cambiar de opinión durante el proceso." }
    ],
    quiz: [
      { q: "Un estudiante escribe un texto donde plantea su postura sobre la eutanasia, la sostiene con razones y responde objeciones. ¿Qué tipo de discurso argumentativo produce?", options: ["Un ensayo","Un debate","Una mayéutica"], correct: 0, explanation: "Es un texto escrito, individual y con postura propia argumentada: la definición de ensayo." },
      { q: "En un debate escolar formal, ¿qué papel cumple la refutación?", options: ["Responder a los argumentos del equipo contrario mostrando sus fallas","Repetir la propia postura sin cambios","Presentar la conclusión final del jurado"], correct: 0, explanation: "Refutar es atacar razones ajenas con argumentos, no solo insistir en la posición propia." },
      { q: "Sócrates preguntaba a sus interlocutores hasta que ellos mismos descubrían las contradicciones de sus definiciones. Ese método se llama:", options: ["Mayéutica","Deliberación","Retórica publicitaria"], correct: 0, explanation: "La mayéutica 'da a luz' el conocimiento mediante preguntas, sin imponer la respuesta." },
      { q: "El consejo técnico de una escuela analiza en conjunto tres opciones de horario y elige la mejor tras sopesar ventajas y desventajas. Este proceso es:", options: ["Una deliberación","Un debate competitivo","Un ensayo colectivo"], correct: 0, explanation: "El objetivo es tomar una decisión razonada en común, no ganarle a otro equipo." }
    ]
  },
  "4.3.1": {
    leccion: "Dos teorías éticas más que se suman al hedonismo y al estoicismo. La **ética deontológica de Kant** sostiene que una acción es buena por el deber que la motiva y no por sus consecuencias; su criterio es el **imperativo categórico**: actuar solo según aquello que quisieras que se convirtiera en ley universal. La **ética de la virtud de Aristóteles** desplaza la pregunta de la acción al carácter: lo importante es formar buenos hábitos, y cada virtud es el **punto medio** entre dos excesos (la valentía está entre la cobardía y la temeridad).",
    quiz: [
      { q: "¿Cuál es la principal crítica al utilitarismo?", options: ["Que puede justificar perjudicar a una minoría si eso beneficia a la mayoría","Que ignora por completo las consecuencias","Que prohíbe cualquier cálculo de beneficios"], correct: 0, explanation: "Al medir solo el bienestar agregado, corre el riesgo de sacrificar derechos individuales." },
      { q: "Alguien organiza su vida en torno a maximizar su disfrute y evitar todo malestar. Esta postura corresponde al:", options: ["Hedonismo","Estoicismo","Deontologismo"], correct: 0, explanation: "El hedonismo pone el placer y la ausencia de dolor como bien supremo." }
    ]
  },
  "4.3.2": {
    flashcards: [
      { front: "¿Qué diferencia hay entre tolerancia y respeto?", back: "La **tolerancia** soporta lo distinto sin impedirlo; el **respeto** reconoce activamente el valor y la dignidad del otro. El respeto va un paso más allá." },
      { front: "¿Qué es la equidad frente a la igualdad?", back: "La **igualdad** da lo mismo a todos; la **equidad** da a cada quien según su situación, para que todos alcancen las mismas oportunidades reales." }
    ],
    quiz: [
      { q: "Un empleado devuelve la cartera que encontró, con todo el dinero, aunque nadie lo vio. Su acto refleja el valor de la:", options: ["Honestidad","Prudencia","Tolerancia"], correct: 0, explanation: "Actuar con verdad y sin apropiarse de lo ajeno, incluso sin testigos, es honestidad." },
      { q: "Escuchar a alguien que piensa distinto e intentar comprender por qué lo hace es una muestra de:", options: ["Respeto y empatía","Indiferencia","Sumisión"], correct: 0, explanation: "Reconocer la perspectiva del otro y darle valor combina respeto con empatía." },
      { q: "Una persona actúa igual cuando la observan que cuando está sola, conforme a sus principios. Ese valor es:", options: ["La integridad","La solidaridad","La libertad"], correct: 0, explanation: "La integridad es la coherencia entre lo que se cree y lo que se hace, con o sin testigos." }
    ]
  },
  "4.3.3": {
    flashcards: [
      { front: "¿Qué caracteriza a una norma jurídica frente a las demás?", back: "Es **heterónoma** (impuesta por el Estado), **bilateral** (crea derechos y obligaciones), **coercible** (puede imponerse por la fuerza) y **externa** (juzga la conducta, no la intención)." },
      { front: "¿Qué significa que la norma moral sea unilateral?", back: "Que impone un deber pero no da a otro el derecho de exigir su cumplimiento: cumplir una promesa moral obliga a quien la hizo, sin que exista una acción legal para reclamarla." }
    ],
    quiz: [
      { q: "Formarse en la fila del banco y no meterse antes que otros corresponde a una norma:", options: ["Social","Jurídica","Religiosa"], correct: 0, explanation: "No hay ley que lo sancione ni remordimiento de conciencia obligado: lo que opera es la desaprobación del grupo." },
      { q: "¿Qué característica distingue a las normas jurídicas de las morales?", options: ["La coercibilidad: pueden hacerse cumplir por la fuerza del Estado","Que las jurídicas son internas","Que las morales tienen sanción legal"], correct: 0, explanation: "La moral apela a la conciencia; el derecho puede imponerse mediante la autoridad." },
      { q: "Ayunar en una fecha determinada por convicción de fe corresponde a una norma:", options: ["Religiosa","Jurídica","Social"], correct: 0, explanation: "Proviene de la doctrina de una religión y su cumplimiento se valora dentro de esa fe." },
      { q: "Una misma conducta, como no robar, puede estar regulada al mismo tiempo por normas:", options: ["Jurídicas, morales y religiosas","Solo jurídicas","Solo sociales"], correct: 0, explanation: "Los distintos tipos de norma pueden coincidir sobre una misma conducta con fundamentos y sanciones diferentes." }
    ]
  },
  "4.4.1": {
    flashcards: [
      { front: "¿Qué relación tiene la autonomía con la ética de Kant?", back: "Para Kant solo es moral la acción autónoma: la que la persona se da a sí misma por razón. Obedecer por miedo o costumbre es heteronomía, aunque el resultado sea correcto." },
      { front: "¿Ser autónomo significa no seguir ninguna norma?", back: "No. Significa asumir las normas tras examinarlas y hacerlas propias, no rechazarlas. Lo contrario de la autonomía es la obediencia irreflexiva, no la existencia de reglas." }
    ],
    quiz: [
      { q: "Un ciudadano paga impuestos porque está convencido de que financian servicios que todos usan. Su conducta es:", options: ["Autónoma","Heterónoma","Anómica"], correct: 0, explanation: "La razón de su conducta es una convicción propia, no el temor a la sanción." },
      { q: "¿Por qué el desarrollo de la autonomía es un fin de la educación?", options: ["Porque busca formar personas capaces de decidir con criterio propio y responsabilizarse","Porque busca que obedezcan sin preguntar","Porque elimina la necesidad de normas"], correct: 0, explanation: "Educar para la autonomía es dar herramientas de juicio, no solo hábitos de obediencia." },
      { q: "Un adolescente sigue la moda del grupo solo para no ser excluido. Esta conducta es principalmente:", options: ["Heterónoma","Autónoma","Deliberativa"], correct: 0, explanation: "La norma viene de fuera (la presión del grupo) y se acata sin examinarla." },
      { q: "Según Kant, una acción tiene valor moral cuando:", options: ["Se realiza por deber, a partir del propio juicio racional","Produce el mayor placer posible","Se realiza por temor al castigo"], correct: 0, explanation: "Actuar por miedo o por conveniencia puede coincidir con el deber, pero para Kant no le da valor moral." }
    ]
  },
  "4.4.2": {
    leccion: "Dos deformaciones y precisiones del discurso político. La **demagogia** es el uso de promesas y apelaciones emocionales para ganar apoyo popular sin sustento real ni intención de cumplir: es una degradación del discurso político, no un sinónimo de él. Y conviene no confundir dos cosas que la ley trata distinto: la **propaganda** difunde ideas para ganar adhesión ideológica, mientras que la **publicidad política** promueve a un candidato o partido en campaña y está sujeta a reglas y tiempos regulados por la ley electoral.",
    flashcards: [
      { front: "¿Qué es la demagogia?", back: "El uso de promesas y apelaciones emocionales para ganar apoyo popular, sin sustento real ni intención de cumplir. Es una degradación del discurso político." },
      { front: "¿Qué son la propaganda y la publicidad política?", back: "La **propaganda** difunde ideas para ganar adhesión ideológica; la **publicidad política** promueve a un candidato o partido en campaña, con reglas y tiempos regulados por la ley electoral." }
    ],
    quiz: [
      { q: "Un candidato promete resolver todos los problemas del país en seis meses sin explicar cómo. Esto ejemplifica:", options: ["Demagogia","Deliberación","Rendición de cuentas"], correct: 0, explanation: "Ofrece lo que sabe que no puede cumplir apelando a la emoción, sin propuesta verificable." },
      { q: "¿Qué recurso retórico se usa cuando un discurso apela al miedo del público para ganar apoyo?", options: ["Apelación emocional","Argumento deductivo","Refutación lógica"], correct: 0, explanation: "El miedo es una de las emociones más usadas para movilizar apoyo sin discutir razones." },
      { q: "¿Cómo puede la ciudadanía evaluar críticamente un discurso político?", options: ["Contrastando las promesas con datos verificables y con la trayectoria de quien las hace","Confiando en quien hable con más seguridad","Aceptando las cifras que se citan sin revisarlas"], correct: 0, explanation: "La verificación de datos y del historial de cumplimiento es lo que distingue el juicio informado del entusiasmo." },
      { q: "El informe anual de gobierno, en el que un mandatario justifica su gestión ante la ciudadanía, es un ejemplo de discurso político porque:", options: ["Busca persuadir a la ciudadanía sobre el desempeño de una gestión pública","Es un texto exclusivamente informativo sin intención persuasiva","No está dirigido a la ciudadanía"], correct: 0, explanation: "Aunque incluye datos, su función es defender una gestión y construir apoyo: es persuasivo." }
    ]
  },
  "4.5.1": {
    leccion: "El **consentimiento informado** es la aplicación práctica del principio de autonomía: la aceptación libre de un tratamiento después de haber recibido información clara sobre riesgos, beneficios y alternativas. Sin esa información previa, no hay consentimiento válido. Cuando un recurso médico escasea entra en juego el principio de **justicia**, que exige repartirlo con criterios claros y no discriminatorios —el pronóstico clínico, la urgencia— y nunca según la capacidad de pago o la posición social del paciente.",
    flashcards: [
      { front: "¿Qué es el consentimiento informado?", back: "La aceptación libre de un tratamiento después de recibir información clara sobre riesgos, beneficios y alternativas. Es la aplicación práctica del principio de autonomía." },
      { front: "¿Cómo se aplican los principios bioéticos cuando escasea un recurso médico?", back: "El principio de **justicia** exige criterios claros y no discriminatorios para repartirlo, como el pronóstico clínico y la urgencia, nunca la capacidad de pago o la posición social." }
    ],
    quiz: [
      { q: "Un hospital establece criterios clínicos transparentes para asignar camas de terapia intensiva durante una emergencia. Aplica el principio de:", options: ["Justicia","Autonomía","Beneficencia"], correct: 0, explanation: "El reparto equitativo de recursos escasos con criterios no discriminatorios corresponde a la justicia." },
      { q: "Un médico suspende un tratamiento cuyos efectos secundarios superan los beneficios para el paciente. Actúa según el principio de:", options: ["No maleficencia","Autonomía","Justicia"], correct: 0, explanation: "Ante todo, no dañar: si el tratamiento perjudica más de lo que ayuda, debe detenerse." },
      { q: "¿Qué principio bioético fundamenta el consentimiento informado?", options: ["La autonomía","La beneficencia","La justicia"], correct: 0, explanation: "Reconoce que la persona decide sobre su propio cuerpo, siempre que cuente con información suficiente." },
      { q: "¿Qué conflicto bioético aparece cuando un paciente rechaza un tratamiento que le salvaría la vida?", options: ["La autonomía del paciente frente a la beneficencia del médico","La justicia frente a la no maleficencia","La igualdad frente a la libertad de comercio"], correct: 0, explanation: "El médico quiere hacer el bien, pero la decisión sobre el propio cuerpo corresponde al paciente competente." }
    ]
  },
  "4.5.2": {
    flashcards: [
      { front: "¿Cuáles son las tres dimensiones del desarrollo sustentable?", back: "La **ambiental** (no agotar ni degradar los ecosistemas), la **social** (equidad y bienestar) y la **económica** (viabilidad). El desarrollo sustentable exige equilibrio entre las tres." },
      { front: "¿Qué es el principio precautorio?", back: "Ante el riesgo de un daño ambiental grave o irreversible, la falta de certeza científica plena no debe usarse como excusa para posponer medidas de protección." }
    ],
    quiz: [
      { q: "La definición clásica de desarrollo sustentable (Informe Brundtland, 1987) señala que es aquel que:", options: ["Satisface las necesidades del presente sin comprometer las de las generaciones futuras","Prioriza siempre el crecimiento económico","Prohíbe todo uso de recursos naturales"], correct: 0, explanation: "El eje del concepto es la justicia intergeneracional: no hipotecar los recursos de quienes vienen después." },
      { q: "Una empresa presume acciones ecológicas menores mientras mantiene su principal fuente de contaminación. Esta práctica se conoce como:", options: ["Greenwashing o lavado verde","Principio precautorio","Justicia intergeneracional"], correct: 0, explanation: "Se construye una imagen ambiental favorable sin cambios de fondo en el impacto real." },
      { q: "Un gobierno regula una sustancia cuyos efectos sobre la salud aún se investigan, ante la posibilidad de un daño grave. Aplica:", options: ["El principio precautorio","El principio de beneficencia","La regla de la mayoría"], correct: 0, explanation: "Se actúa antes de la certeza científica plena para evitar un daño potencialmente irreversible." },
      { q: "La justicia ambiental señala que los daños ecológicos:", options: ["Afectan de manera desproporcionada a las comunidades más pobres y vulnerables","Se reparten de forma equitativa entre todos los sectores","Solo afectan a los países desarrollados"], correct: 0, explanation: "Vertederos, contaminación e industrias sucias suelen instalarse donde hay menos capacidad de defensa." }
    ]
  },
  "4.5.3": {
    leccion: "Tres conceptos con los que el examen plantea casos de desigualdad. La distinción básica es entre **sexo**, que alude a características biológicas, y **género**, que es la construcción social de roles, expectativas y conductas que cada cultura asigna. La **brecha salarial de género** es la diferencia promedio de ingresos entre hombres y mujeres por trabajos de igual valor, resultado de la segregación ocupacional, del trabajo de cuidados no remunerado y de la discriminación. Y el **techo de cristal** es la barrera invisible que limita el ascenso de las mujeres a los puestos de mayor responsabilidad pese a tener la misma preparación: se llama «de cristal» porque no está escrita en ninguna regla.",
    flashcards: [
      { front: "¿Qué diferencia hay entre sexo y género?", back: "El **sexo** alude a características biológicas; el **género** es la construcción social de roles, expectativas y conductas que cada cultura asigna a esas categorías." }
    ],
    quiz: [
      { q: "¿Cuál es la diferencia entre sexo y género?", options: ["El sexo remite a lo biológico y el género a la construcción social de roles y expectativas","Son sinónimos exactos","El género es biológico y el sexo cultural"], correct: 0, explanation: "El género varía entre culturas y épocas justamente porque es una construcción social." }
    ]
  },
  "4.5.4": {
    flashcards: [
      { front: "¿Qué diferencia hay entre multiculturalidad e interculturalidad?", back: "La **multiculturalidad** describe que varias culturas conviven en un mismo territorio; la **interculturalidad** exige además diálogo, intercambio y relaciones equitativas entre ellas." },
      { front: "¿Qué es la asimilación cultural?", back: "Exigir que un grupo minoritario abandone su cultura para integrarse a la dominante. Es lo contrario del reconocimiento de la alteridad." }
    ],
    quiz: [
      { q: "Un municipio ofrece trámites en la lengua indígena de la región además del español. Esta medida corresponde a:", options: ["Un enfoque intercultural que reconoce la alteridad","Una política de asimilación","Una restricción de derechos"], correct: 0, explanation: "Adaptar la institución a la diferencia, en lugar de exigir que la persona se adapte, reconoce al otro como legítimo." },
      { q: "¿Qué actitud NIEGA la alteridad?", options: ["Exigir a un grupo migrante que abandone su lengua y costumbres para ser aceptado","Escuchar la perspectiva de una comunidad antes de decidir un proyecto en su territorio","Adaptar un espacio público para personas con discapacidad"], correct: 0, explanation: "La asimilación forzada trata la diferencia como un defecto que hay que borrar." },
      { q: "El etnocentrismo consiste en:", options: ["Juzgar otras culturas usando como medida la propia, considerándola superior","Reconocer el valor de todas las culturas","Estudiar una cultura desde dentro"], correct: 0, explanation: "Es el obstáculo principal para reconocer la alteridad: convierte lo distinto en inferior." },
      { q: "Reconocer la alteridad implica principalmente:", options: ["Aceptar al otro como un igual en dignidad, con derecho a ser diferente","Tolerar al otro siempre que se comporte como uno","Ignorar las diferencias culturales"], correct: 0, explanation: "No se trata de borrar la diferencia ni de soportarla, sino de reconocerla como legítima." }
    ]
  },
  "4.5.5": {
    leccion: "Tres posturas sobre el trato a otros seres vivos. El **antropocentrismo** coloca al ser humano en el centro y considera a la naturaleza un recurso a su servicio; se le opone el **biocentrismo**, que reconoce valor propio a todos los seres vivos. El **especismo** es discriminar a un ser vivo solo por pertenecer a otra especie, del mismo modo que el racismo discrimina por origen; el término lo popularizó Peter Singer. En el terreno práctico están las **tres erres de la experimentación animal**: **reemplazar** a los animales por métodos alternativos cuando sea posible, **reducir** su número al mínimo y **refinar** los procedimientos para disminuir el sufrimiento.",
    flashcards: [
      { front: "¿Qué es el antropocentrismo?", back: "La postura que coloca al ser humano en el centro y considera a la naturaleza un recurso a su servicio. Se le opone el biocentrismo, que reconoce valor propio a todos los seres vivos." },
      { front: "¿Qué son las tres erres de la experimentación animal?", back: "**Reemplazar** los animales por métodos alternativos cuando sea posible, **reducir** su número al mínimo y **refinar** los procedimientos para disminuir el sufrimiento." },
      { front: "¿Qué es el especismo?", back: "Discriminar a un ser vivo solo por pertenecer a otra especie, del mismo modo que el racismo discrimina por origen. El término lo popularizó Peter Singer." }
    ],
    quiz: [
      { q: "Una postura que reconoce valor propio a todos los seres vivos, no solo utilidad para el ser humano, se llama:", options: ["Biocentrismo","Antropocentrismo","Etnocentrismo"], correct: 0, explanation: "El biocentrismo amplía la consideración moral más allá de la especie humana." },
      { q: "El criterio de las 'tres erres' en investigación con animales busca:", options: ["Reemplazar, reducir y refinar el uso de animales para minimizar su sufrimiento","Repetir, registrar y reportar los experimentos","Reciclar los materiales del laboratorio"], correct: 0, explanation: "Es el estándar ético internacional para la experimentación animal." },
      { q: "La pérdida de biodiversidad plantea un dilema ético porque:", options: ["Compromete tanto el equilibrio de los ecosistemas como el bienestar de las generaciones futuras","Solo afecta a los animales silvestres","No tiene relación con la actividad humana"], correct: 0, explanation: "La extinción de especies es irreversible y afecta servicios ecosistémicos de los que depende la vida humana." },
      { q: "¿Qué argumento usaría una postura humanista frente al maltrato animal en la ganadería industrial?", options: ["Que la capacidad de sufrir de un ser vivo obliga a evitarle dolor innecesario","Que los animales no importan porque no razonan","Que cualquier uso de animales debe prohibirse sin excepción"], correct: 0, explanation: "El criterio central es la sensibilidad al dolor: evitar el sufrimiento evitable, sin negar todo uso legítimo." }
    ]
  },
  "4.6.1": {
    flashcards: [
      { front: "¿Qué relación hay entre lo sublime y lo bello?", back: "Lo **bello** agrada por su armonía y proporción; lo **sublime** desborda: impone por su inmensidad o poder y mezcla admiración con temor. Kant fue quien más trabajó esa distinción." },
      { front: "¿Es objetiva la belleza?", back: "Es una discusión abierta. La postura objetivista la ve en la proporción y armonía de la obra; la subjetivista, en la experiencia de quien la contempla, mediada por su cultura y su época." }
    ],
    quiz: [
      { q: "Una escultura deliberadamente deforme que produce incomodidad y extrañeza pertenece a la categoría de:", options: ["Lo grotesco","Lo bello","Lo sublime"], correct: 0, explanation: "Lo grotesco juega con la deformidad y la exageración para provocar rechazo o desconcierto." },
      { q: "Una película que provoca risa por lo absurdo de las situaciones se ubica en la categoría de:", options: ["Lo cómico","Lo trágico","Lo sublime"], correct: 0, explanation: "Lo cómico nace de la incongruencia o la exageración que rompe la expectativa." },
      { q: "¿Qué caracteriza al héroe trágico?", options: ["Que enfrenta un destino adverso que no puede evitar pese a sus esfuerzos","Que siempre triunfa al final","Que provoca risa en el público"], correct: 0, explanation: "Lo trágico se sostiene en la inevitabilidad del desenlace y en la compasión que despierta." },
      { q: "Contemplar una cordillera inmensa y sentirse a la vez maravillado y pequeño corresponde a:", options: ["Lo sublime","Lo bello","Lo cómico"], correct: 0, explanation: "Lo sublime se define por esa mezcla de admiración y sobrecogimiento ante lo que excede la escala humana." }
    ]
  },
  "4.6.2": {
    leccion: "Dos aportaciones que el examen asocia a la hermenéutica. El **círculo hermenéutico** es la idea de que para entender el todo hay que entender las partes y, a la vez, para entender las partes hace falta una idea del todo: la interpretación no avanza en línea recta, sino en espiral entre ambos niveles. Y a Gadamer se le atribuye la **fusión de horizontes**: comprender un texto no es recuperar en estado puro la intención del autor, sino el encuentro entre el horizonte de sentido del autor y el del lector.",
    flashcards: [
      { front: "¿Qué es el círculo hermenéutico?", back: "La idea de que para entender el todo hay que entender las partes, y para entender las partes hay que tener una idea del todo: la interpretación avanza en espiral entre ambos niveles." }
    ],
    quiz: [
      { q: "¿Por qué la hermenéutica insiste en el contexto histórico de un texto?", options: ["Porque el sentido de las palabras y símbolos cambia según la época y la cultura","Porque los textos antiguos no tienen valor","Porque solo importa la biografía del autor"], correct: 0, explanation: "Sin el contexto se proyectan sobre el texto significados actuales que no le corresponden." },
      { q: "Un juez interpreta el sentido y el alcance de una ley para aplicarla a un caso concreto. Esta labor es:", options: ["Hermenéutica jurídica","Investigación experimental","Análisis estadístico"], correct: 0, explanation: "La interpretación de normas para determinar su sentido y alcance es hermenéutica aplicada al derecho." }
    ]
  }
};
