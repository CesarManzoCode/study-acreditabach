/* Segundo paquete de ampliación · Área 4 · Humanidades

   El examen plantea casos: una situación concreta y hay que identificar la
   corriente, el tipo de argumento o el principio ético que aplica. Por eso
   la mayoría de los reactivos nuevos están redactados como situaciones. */

const AREA4_EXTRA2 = {
  "4.1.1": {
    flashcards: [
      { front: "¿Qué significa que la filosofía nació del paso «del mito al logos»?", back: "Que las explicaciones dejaron de apoyarse en relatos de dioses (mito) para buscar razones y principios verificables mediante el discurso racional (logos)." },
      { front: "¿En qué se diferencian filosofía y ciencia?", back: "La **ciencia** responde con método experimental preguntas sobre hechos; la **filosofía** examina los supuestos, los conceptos y los fines, incluidos los de la propia ciencia. La filosofía pregunta, la ciencia comprueba." }
    ],
    quiz: [
      { q: "Explicar los truenos como la furia de un dios corresponde a una explicación de tipo:", options: ["Mítica","Científica","Lógica"], correct: 0, explanation: "El mito recurre a voluntades sobrenaturales en vez de a causas verificables." },
      { q: "La diferencia esencial entre el conocimiento científico y el filosófico es que:", options: ["El científico se verifica experimentalmente y el filosófico examina supuestos y conceptos","El filosófico es más antiguo","El científico no usa razonamientos"], correct: 0, explanation: "Ambos son racionales, pero su método y su objeto son distintos." },
      { q: "El asombro, según los griegos, es el origen de la filosofía porque:", options: ["Lleva a cuestionar lo que se daba por evidente","Produce respuestas inmediatas","Sustituye al razonamiento"], correct: 0, explanation: "La actitud filosófica empieza cuando lo cotidiano se vuelve problemático." }
    ]
  },
  "4.1.2": {
    leccion: "Dos herramientas del pensamiento crítico. El **sesgo de confirmación** es la tendencia a buscar y aceptar solo la información que confirma lo que ya se cree y a descartar la que la contradice: es su obstáculo más común. Una **falacia** es un razonamiento que parece válido pero no lo es; las tres que más aparecen en el examen son *ad hominem* (atacar a la persona en lugar de su argumento), *ad populum* (apelar a que todos lo creen) y *ad verecundiam* (apelar a una autoridad que no es pertinente en ese tema). Los **criterios básicos** para evaluar un argumento son claridad, exactitud, pertinencia, profundidad, amplitud y lógica.",
    flashcards: [
      { front: "¿Qué es un sesgo de confirmación?", back: "La tendencia a buscar y aceptar solo la información que confirma lo que ya se cree, y a descartar la que la contradice. Es el obstáculo más común del pensamiento crítico." },
      { front: "¿Qué es una falacia?", back: "Un razonamiento que parece válido pero no lo es. *Ad hominem* (atacar a la persona), *ad populum* (apelar a que todos lo creen), *ad verecundiam* (apelar a una autoridad no pertinente)." },
      { front: "¿Cuáles son los criterios básicos del pensamiento crítico?", back: "Claridad, exactitud, pertinencia, profundidad, amplitud y lógica: preguntar qué se afirma, con qué evidencia, si viene al caso y si la conclusión se sigue." }
    ],
    quiz: [
      { q: "Leer solo las noticias que coinciden con la propia opinión es un ejemplo de:", options: ["Sesgo de confirmación","Falacia de autoridad","Razonamiento deductivo"], correct: 0, explanation: "Se selecciona la evidencia que confirma la creencia previa." },
      { q: "La actitud propia del pensamiento crítico ante una afirmación nueva es:", options: ["Preguntar qué evidencia la sostiene y considerar interpretaciones alternativas","Aceptarla si viene de un medio conocido","Rechazarla por principio"], correct: 0, explanation: "No es escepticismo automático ni credulidad, sino evaluación razonada de la evidencia." }
    ]
  },
  "4.1.3": {
    flashcards: [
      { front: "¿Qué significa «la existencia precede a la esencia»?", back: "La frase de Sartre indica que el ser humano primero existe y después se define con sus actos: no hay una naturaleza humana previa que determine lo que uno debe ser." },
      { front: "¿Qué es la angustia existencial?", back: "La experiencia que surge al reconocer que uno es responsable de sus elecciones sin garantías externas que las justifiquen. No es una enfermedad, sino la conciencia de la libertad." },
      { front: "¿Qué aportó Simone de Beauvoir al existencialismo?", back: "Aplicó la idea de que uno se hace a sí mismo a la condición de la mujer: «no se nace mujer, se llega a serlo», mostrando que los roles de género son una construcción social, no un destino biológico." }
    ],
    quiz: [
      { q: "«La existencia precede a la esencia» significa que:", options: ["El ser humano se define por sus actos, no por una naturaleza previa","El alma existe antes que el cuerpo","La esencia humana es inmutable"], correct: 0, explanation: "Es la tesis central del existencialismo de Sartre." },
      { q: "Para el existencialismo, la libertad humana implica sobre todo:", options: ["Una responsabilidad ineludible sobre las propias decisiones","La ausencia de consecuencias","Poder hacer cualquier cosa sin límites"], correct: 0, explanation: "Estar «condenado a ser libre» significa que no se puede delegar la responsabilidad de elegir." },
      { q: "El concepto de «mala fe» en Sartre describe a quien:", options: ["Se engaña negando su libertad y culpando a su papel o a las circunstancias","Miente deliberadamente a otros","Actúa con maldad"], correct: 0, explanation: "Es la huida de la responsabilidad refugiándose en un rol impuesto." }
    ]
  },
  "4.1.4": {
    flashcards: [
      { front: "¿Una doxa puede ser verdadera?", back: "Sí, pero no está justificada: es una opinión basada en la costumbre o la impresión, sin razones que la respalden. Por eso no cuenta como conocimiento." },
      { front: "¿Qué le falta a una creencia verdadera para ser episteme?", back: "Las razones o pruebas que la justifiquen. La episteme es creencia verdadera **y** fundamentada: el conocimiento en sentido estricto." },
      { front: "¿Qué ilustra la alegoría de la caverna de Platón?", back: "El paso de la doxa a la episteme: los prisioneros toman las sombras por la realidad, y solo al salir (la educación) acceden al conocimiento verdadero." }
    ],
    quiz: [
      { q: "«Creo que va a llover porque me duele la rodilla» es un ejemplo de:", options: ["Doxa (opinión sin fundamento demostrado)","Episteme","Método científico"], correct: 0, explanation: "Se basa en una impresión personal, no en evidencia justificada." },
      { q: "Para que una creencia sea episteme se requiere que:", options: ["Sea verdadera y esté justificada con razones o pruebas","La comparta la mayoría","Sea antigua"], correct: 0, explanation: "La justificación es lo que distingue al conocimiento de la simple opinión acertada." },
      { q: "En la alegoría de la caverna, las sombras representan:", options: ["El conocimiento aparente basado en los sentidos y la costumbre","Las ideas perfectas","El razonamiento matemático"], correct: 0, explanation: "Son la imagen de la doxa que los prisioneros confunden con la realidad." },
      { q: "Un pronóstico meteorológico basado en modelos y datos satelitales corresponde a:", options: ["Episteme","Doxa","Mito"], correct: 0, explanation: "Está sustentado en evidencia y en un método que puede revisarse." },
      { q: "La principal razón por la que la doxa resulta insuficiente es que:", options: ["No puede distinguir entre lo que parece verdadero y lo que está justificado","Siempre es falsa","Nadie la comparte"], correct: 0, explanation: "Una opinión puede acertar por casualidad, pero sin justificación no es conocimiento." }
    ]
  },
  "4.2.1": {
    flashcards: [
      { front: "¿Cuál es la función poética del lenguaje?", back: "La que centra la atención en la forma del mensaje: rimas, metáforas, juegos de palabras. Aparece en la literatura, pero también en eslóganes y refranes." }
    ],
    quiz: [
      { q: "«El agua hierve a 100 °C al nivel del mar» corresponde a la función:", options: ["Referencial","Poética","Apelativa"], correct: 0, explanation: "Transmite información objetiva sobre la realidad." },
      { q: "«¡Qué alegría verte!» expresa principalmente la función:", options: ["Emotiva o expresiva","Referencial","Fática"], correct: 0, explanation: "Manifiesta el estado de ánimo del emisor." }
    ]
  },
  "4.2.2": {
    flashcards: [
      { front: "¿Qué son los indicadores de premisa y de conclusión?", back: "**Premisa**: porque, ya que, dado que, puesto que. **Conclusión**: por lo tanto, en consecuencia, así que, se sigue que. Sirven para desarmar un argumento rápidamente." },
      { front: "¿Por qué conviene detectar las premisas implícitas de un argumento?", back: "Porque suelen ser justo el punto discutible: son supuestos que no se enuncian pero que el argumento necesita para sostenerse." },
      { front: "¿Qué diferencia hay entre validez y verdad?", back: "La **validez** se refiere a la forma: si las premisas fueran verdaderas, la conclusión se seguiría. La **verdad** se refiere al contenido. Un argumento puede ser válido con premisas falsas." }
    ],
    quiz: [
      { q: "En «Todos los mamíferos respiran; la ballena es mamífero; por lo tanto, la ballena respira», la conclusión es:", options: ["La ballena respira","Todos los mamíferos respiran","La ballena es mamífero"], correct: 0, explanation: "El indicador «por lo tanto» señala la proposición que se sostiene con las demás." },
      { q: "Las palabras «porque», «ya que» y «dado que» introducen habitualmente:", options: ["Premisas","Conclusiones","Ejemplos"], correct: 0, explanation: "Señalan las razones que sustentan la afirmación principal." },
      { q: "Un argumento válido con premisas falsas produce:", options: ["Una conclusión que no está garantizada como verdadera, aunque la forma sea correcta","Siempre una conclusión verdadera","Un argumento inválido"], correct: 0, explanation: "La validez asegura la conexión, no la verdad de los contenidos." },
      { q: "En «Debe estudiar más porque quiere entrar a la universidad», la premisa implícita es que:", options: ["Estudiar más aumenta la probabilidad de ingresar a la universidad","La universidad es gratuita","Nadie entra sin estudiar"], correct: 0, explanation: "Sin ese supuesto, la razón no sostendría la conclusión." },
      { q: "¿Cuál de los siguientes enunciados NO es un argumento?", options: ["Hoy amaneció nublado y hace frío","Llueve, así que se cancelará el partido","Como subió el precio, bajarán las ventas"], correct: 0, explanation: "Es una descripción: no hay premisas que sostengan una conclusión." }
    ]
  },
  "4.2.3": {
    flashcards: [
      { front: "¿Qué caracteriza a un argumento deductivo?", back: "Si las premisas son verdaderas, la conclusión es necesariamente verdadera. Va de lo general a lo particular y no aporta información nueva más allá de las premisas." },
      { front: "¿Qué caracteriza a un argumento inductivo?", back: "Va de casos particulares a una generalización probable. Su conclusión nunca es segura: basta un contraejemplo para refutarla, aunque más casos la hacen más fuerte." },
      { front: "¿Cuándo es fuerte un argumento analógico?", back: "Cuando las semejanzas entre los casos comparados son numerosas y **relevantes** para la conclusión. Si las diferencias afectan lo que se concluye, la analogía se debilita." }
    ],
    quiz: [
      { q: "«Todos los metales conducen electricidad; el cobre es metal; luego el cobre conduce electricidad» es un argumento:", options: ["Deductivo","Inductivo","Analógico"], correct: 0, explanation: "La conclusión se sigue necesariamente de las premisas." },
      { q: "«He visto cien cuervos y todos eran negros; por lo tanto, todos los cuervos son negros» es:", options: ["Inductivo","Deductivo","Analógico"], correct: 0, explanation: "Generaliza a partir de casos observados, con una conclusión solo probable." },
      { q: "«Este medicamento funcionó en ratones, cuyo metabolismo se parece al humano; probablemente funcione en personas» es un argumento:", options: ["Analógico","Deductivo","Circular"], correct: 0, explanation: "Traslada una conclusión de un caso a otro apoyándose en su semejanza." },
      { q: "La principal limitación del razonamiento inductivo es que:", options: ["Su conclusión nunca es segura: un solo contraejemplo la refuta","No se puede usar en ciencia","No parte de la observación"], correct: 0, explanation: "Por muchos casos que se acumulen, la generalización sigue siendo probable, no necesaria." },
      { q: "Una analogía se debilita cuando:", options: ["Las diferencias entre los casos son relevantes para la conclusión","Los casos comparados son muy conocidos","Se comparan dos objetos"], correct: 0, explanation: "Lo decisivo es la pertinencia de las semejanzas, no su cantidad." }
    ]
  },
  "4.2.4": {
    flashcards: [
      { front: "¿Qué es la mayéutica socrática?", back: "El método de preguntas sucesivas con el que Sócrates llevaba al interlocutor a examinar sus propias respuestas y a «dar a luz» el conocimiento que ya tenía sin saberlo." },
      { front: "¿Qué distingue a un ensayo argumentativo?", back: "Sostiene una tesis propia con razones y evidencia, dialogando con otras posturas. Es escrito, tiene un autor identificable y admite un estilo personal." },
      { front: "¿Qué diferencia hay entre debate y deliberación?", back: "El **debate** enfrenta posturas y busca ganar; la **deliberación** es cooperativa y busca la mejor decisión colectiva, aunque implique cambiar de opinión." }
    ],
    quiz: [
      { q: "Un intercambio en el que dos posturas contrarias se defienden ante un moderador y un público es:", options: ["Un debate","Una mayéutica","Un ensayo"], correct: 0, explanation: "El debate es confrontación reglada de posiciones opuestas." },
      { q: "El método de Sócrates consistía en:", options: ["Preguntar sucesivamente para que el interlocutor examine sus propias creencias","Exponer una tesis sin interrupciones","Convencer con ejemplos emotivos"], correct: 0, explanation: "La mayéutica avanza mediante preguntas, no mediante discursos." },
      { q: "Una asamblea vecinal que discute varias opciones para decidir en qué gastar un presupuesto realiza:", options: ["Una deliberación","Un debate competitivo","Una mayéutica"], correct: 0, explanation: "Busca una decisión común, no vencer al contrario." },
      { q: "El elemento indispensable de un ensayo argumentativo es:", options: ["Una tesis clara sostenida con razones","Un número mínimo de páginas","La ausencia de opiniones ajenas"], correct: 0, explanation: "Sin tesis no hay argumentación, solo exposición." },
      { q: "En un debate, las réplicas sirven para:", options: ["Responder a los argumentos del contrario y señalar sus debilidades","Repetir la postura inicial","Presentar al moderador"], correct: 0, explanation: "La réplica es el momento en que se confrontan directamente los argumentos." }
    ]
  },
  "4.3.1": {
    flashcards: [
      { front: "¿Qué sostiene el utilitarismo?", back: "Que una acción es correcta si produce la mayor felicidad o bienestar para el mayor número de personas. Juzga por las **consecuencias**." }
    ],
    quiz: [
      { q: "«Hay que mentir si con eso se salvan más vidas» corresponde a un razonamiento:", options: ["Utilitarista","Deontológico","De la ética de la virtud"], correct: 0, explanation: "Evalúa la acción por sus resultados y no por la norma en sí misma." }
    ]
  },
  "4.3.2": {
    quiz: [
      { q: "Devolver una cartera con dinero encontrada en la calle expresa principalmente el valor de:", options: ["La honestidad","La tolerancia","La puntualidad"], correct: 0, explanation: "Se actúa conforme a la verdad y al respeto por lo ajeno aunque nadie lo vea." },
      { q: "La solidaridad se manifiesta cuando:", options: ["Alguien apoya a otro reconociendo una necesidad compartida","Se cumple una obligación laboral","Se respeta un horario"], correct: 0, explanation: "Implica hacerse cargo de la situación del otro más allá del deber estricto." }
    ]
  },
  "4.3.3": {
    flashcards: [
      { front: "¿Qué diferencia a las normas jurídicas de las morales?", back: "Las **jurídicas** son heterónomas, coercibles y con sanción externa aplicada por el Estado; las **morales** son autónomas, incoercibles y su sanción es el remordimiento o la desaprobación social." },
      { front: "¿Qué son las normas sociales o convencionales?", back: "Reglas de trato y cortesía sostenidas por la costumbre (saludar, vestir de cierto modo). Su incumplimiento genera rechazo social, no sanción legal." },
      { front: "¿Qué son las normas religiosas?", back: "Las que derivan de una doctrina de fe y obligan a quienes la profesan; su cumplimiento es voluntario y su sanción se plantea en un plano trascendente." }
    ],
    quiz: [
      { q: "Una norma jurídica se distingue porque:", options: ["Su incumplimiento acarrea una sanción aplicada por el Estado","Depende de la conciencia de cada quien","Se transmite solo por costumbre"], correct: 0, explanation: "La coercibilidad es su rasgo distintivo." },
      { q: "Ceder el asiento a una persona mayor en el transporte responde principalmente a una norma:", options: ["Social o convencional","Jurídica","Religiosa"], correct: 0, explanation: "Se sostiene en la costumbre y en la valoración de la comunidad." },
      { q: "Que las normas morales sean autónomas significa que:", options: ["La persona las asume por convicción propia","Las impone una autoridad externa","Están escritas en un código"], correct: 0, explanation: "La autonomía moral consiste en darse a sí mismo la norma." },
      { q: "El ayuno en ciertas fechas del calendario litúrgico corresponde a una norma:", options: ["Religiosa","Jurídica","Social"], correct: 0, explanation: "Deriva de una doctrina de fe y obliga a los creyentes." },
      { q: "Una misma conducta, como no pagar impuestos, puede infringir a la vez normas:", options: ["Jurídicas y morales","Solo religiosas","Solo convencionales"], correct: 0, explanation: "Los distintos tipos de normas pueden coincidir sobre una misma conducta." }
    ]
  },
  "4.4.1": {
    flashcards: [
      { front: "¿Qué es la autonomía moral según Kant?", back: "La capacidad de darse leyes a sí mismo mediante la razón y actuar por deber, no por miedo al castigo ni por conveniencia." },
      { front: "Obedecer una norma por miedo a la sanción, ¿es autonomía o heteronomía?", back: "Heteronomía: se actúa conforme a normas impuestas desde fuera —la autoridad, la costumbre o la amenaza de sanción— sin haberlas examinado ni asumido." },
      { front: "¿Por qué la educación busca pasar de la heteronomía a la autonomía?", back: "Porque un niño obedece al principio por la autoridad, pero el objetivo formativo es que llegue a actuar por convicción razonada, capaz de sostener su decisión sin vigilancia." }
    ],
    quiz: [
      { q: "Alguien que no copia en un examen porque considera que es injusto con sus compañeros actúa con:", options: ["Autonomía moral","Heteronomía","Indiferencia moral"], correct: 0, explanation: "La razón de su conducta es una convicción propia, no la vigilancia." },
      { q: "Alguien que no copia en un examen únicamente porque el profesor está vigilando actúa con:", options: ["Heteronomía","Autonomía","Virtud"], correct: 0, explanation: "La norma le resulta externa: sin vigilancia, la conducta cambiaría." },
      { q: "La autonomía moral kantiana implica que la ley moral:", options: ["Proviene de la propia razón del sujeto","La dicta el Estado","La impone la tradición"], correct: 0, explanation: "Autonomía significa literalmente darse la norma a uno mismo." },
      { q: "La formación ciudadana busca desarrollar la autonomía porque:", options: ["Una sociedad democrática requiere personas que decidan con criterio propio","Es más fácil de evaluar","Elimina la necesidad de leyes"], correct: 0, explanation: "La deliberación democrática supone ciudadanos capaces de juzgar por sí mismos." },
      { q: "Obedecer una norma injusta solo porque es la ley corresponde a una postura:", options: ["Heterónoma","Autónoma","Crítica"], correct: 0, explanation: "Se acata sin someter la norma a examen moral propio." }
    ]
  },
  "4.4.2": {
    leccion: "Los **recursos retóricos** típicos del discurso político son el «nosotros» inclusivo, la construcción de un adversario, la repetición de consignas, las metáforas bélicas o familiares y la apelación emocional. Lo que distingue a la **demagogia** de un discurso legítimo es que halaga y promete lo que la audiencia quiere oír, apelando a las emociones y prescindiendo de la verdad y de la factibilidad. Para analizarlos, Aristóteles distinguió tres formas de persuasión: **ethos** (la credibilidad de quien habla), **pathos** (las emociones del público) y **logos** (las razones y la evidencia del argumento).",
    flashcards: [
      { front: "¿Qué recursos retóricos son típicos del discurso político?", back: "El uso del «nosotros» inclusivo, la construcción de un adversario, la repetición de consignas, las metáforas bélicas o familiares y la apelación emocional." },
      { front: "¿Qué distingue a la demagogia de un discurso político legítimo?", back: "Que halaga y promete lo que la audiencia quiere oír, apelando a las emociones y prescindiendo de la verdad y de la factibilidad de lo prometido." }
    ],
    quiz: [
      { q: "Un discurso que promete resolverlo todo sin explicar cómo, apelando solo a las emociones, es:", options: ["Demagógico","Deliberativo","Científico"], correct: 0, explanation: "Sustituye el argumento y la factibilidad por la seducción emocional." },
      { q: "El uso constante del «nosotros» en un discurso político busca:", options: ["Construir identidad y pertenencia entre el orador y su público","Informar con precisión","Evitar responsabilidades legales"], correct: 0, explanation: "Es un recurso de identificación colectiva." },
      { q: "Analizar críticamente un discurso político implica:", options: ["Distinguir los datos verificables de las apelaciones emotivas","Aceptar lo que dice si es un buen orador","Rechazarlo por venir de un político"], correct: 0, explanation: "El análisis separa la evidencia de la retórica, sin caer en el rechazo automático." },
      { q: "La propaganda se diferencia de la información porque:", options: ["Busca persuadir en favor de una causa y selecciona los hechos con ese fin","Siempre es falsa","Nunca usa imágenes"], correct: 0, explanation: "Su propósito es la adhesión, no la descripción equilibrada de los hechos." }
    ]
  },
  "4.5.1": {
    flashcards: [
      { front: "¿Cuáles son los cuatro principios clásicos de la bioética?", back: "**Autonomía** (respetar la decisión informada del paciente), **beneficencia** (buscar su bien), **no maleficencia** (no dañar) y **justicia** (repartir equitativamente los recursos)." },
      { front: "¿De qué principio bioético es aplicación práctica el consentimiento informado?", back: "De la autonomía: el paciente acepta un procedimiento tras recibir información comprensible sobre riesgos, beneficios y alternativas." }
    ],
    quiz: [
      { q: "Un médico explica riesgos y alternativas y respeta la decisión del paciente de no operarse. Aplica el principio de:", options: ["Autonomía","Beneficencia","Justicia"], correct: 0, explanation: "Se respeta la decisión informada de la persona sobre su propio cuerpo." },
      { q: "Decidir a quién asignar un respirador cuando hay más pacientes que equipos involucra el principio de:", options: ["Justicia","No maleficencia","Autonomía"], correct: 0, explanation: "Se trata de la distribución equitativa de recursos escasos." },
      { q: "El principio de no maleficencia ordena principalmente:", options: ["No causar daño al paciente","Buscar siempre el máximo beneficio económico","Informar a los familiares"], correct: 0, explanation: "Es la formulación del clásico «primero, no dañar»." },
      { q: "El consentimiento informado es válido cuando:", options: ["La persona recibió información comprensible y decide libremente","Lo firma un familiar sin avisarle","Se obtiene después del procedimiento"], correct: 0, explanation: "Sin información previa y sin libertad no hay consentimiento real." }
    ]
  },
  "4.5.2": {
    flashcards: [
      { front: "¿Qué es el desarrollo sustentable?", back: "El que satisface las necesidades del presente sin comprometer la capacidad de las generaciones futuras de satisfacer las suyas (Informe Brundtland, 1987)." },
      { front: "¿Qué es la justicia intergeneracional?", back: "El principio de que las generaciones futuras tienen derecho a recibir un entorno en condiciones al menos equivalentes a las actuales, aunque no puedan participar en las decisiones de hoy." }
    ],
    quiz: [
      { q: "El desarrollo sustentable se define como aquel que:", options: ["Satisface las necesidades presentes sin comprometer las de las generaciones futuras","Maximiza la producción industrial","Prohíbe el uso de recursos naturales"], correct: 0, explanation: "Es la definición del Informe Brundtland, base del concepto." },
      { q: "Las tres dimensiones de la sustentabilidad son:", options: ["Ambiental, económica y social","Política, jurídica y militar","Local, nacional e internacional"], correct: 0, explanation: "Un proyecto sustentable debe ser viable en las tres al mismo tiempo." },
      { q: "El principio de justicia intergeneracional implica que:", options: ["Las decisiones de hoy deben considerar a quienes aún no nacen","Solo importan los intereses presentes","Cada generación puede usar los recursos sin límite"], correct: 0, explanation: "Extiende la comunidad moral hacia el futuro." },
      { q: "Aplicar el principio de precaución ante una nueva tecnología significa:", options: ["Adoptar medidas de protección aunque no haya certeza científica plena del daño","Esperar a que el daño sea comprobado","Prohibir toda innovación"], correct: 0, explanation: "La incertidumbre no exime de proteger frente a riesgos graves o irreversibles." }
    ]
  },
  "4.5.3": {
    leccion: "Tres nociones para analizar la desigualdad de género. El **género** varía histórica y socialmente porque son roles, expectativas y atributos que cada cultura asigna, a diferencia del **sexo**, que alude a características biológicas. La **división sexual del trabajo** es la asignación cultural de tareas según el género: el trabajo doméstico y de cuidados no remunerado recae mayoritariamente en las mujeres, lo que limita su participación económica y política. Las **acciones afirmativas** son medidas temporales que compensan una desigualdad histórica, como la paridad en las candidaturas o las cuotas de representación.",
    flashcards: [
      { front: "¿Por qué se dice que el género varía histórica y socialmente?", back: "Porque son roles, expectativas y atributos que cada cultura asigna, a diferencia del **sexo**, que alude a características biológicas." }
    ],
    quiz: [
      { q: "La afirmación «el género es una construcción social» significa que:", options: ["Los roles asignados a hombres y mujeres varían entre culturas y épocas","No existen diferencias biológicas","El género se elige libremente sin influencia social"], correct: 0, explanation: "Lo que se espera de cada género cambia con el tiempo y el lugar, lo que muestra que no es un dato natural." }
    ]
  },
  "4.5.4": {
    flashcards: [
      { front: "¿Qué significa alteridad?", back: "Reconocer al otro como un sujeto legítimo y distinto, con su propia perspectiva, en vez de reducirlo a una versión de uno mismo o a un objeto." },
      { front: "¿Qué diferencia hay entre tolerancia y reconocimiento?", back: "La **tolerancia** soporta al distinto desde una posición de superioridad implícita; el **reconocimiento** lo acepta como igual en dignidad y en derecho a definir su propia identidad." }
    ],
    quiz: [
      { q: "Reconocer la alteridad implica:", options: ["Aceptar al otro como sujeto legítimo con su propia perspectiva","Convencerlo de pensar igual","Ignorar sus diferencias"], correct: 0, explanation: "No se trata de suprimir la diferencia, sino de reconocerla sin jerarquizarla." },
      { q: "La diferencia entre tolerar y reconocer es que:", options: ["Reconocer supone igualdad de dignidad; tolerar puede implicar superioridad","Tolerar exige más compromiso","Son sinónimos exactos"], correct: 0, explanation: "Quien tolera «permite» al otro; quien reconoce lo considera un igual." },
      { q: "La xenofobia consiste en:", options: ["El rechazo y hostilidad hacia las personas extranjeras","La preferencia por productos importados","El estudio de otras culturas"], correct: 0, explanation: "Es la negación del otro por su origen nacional." },
      { q: "La interculturalidad se distingue del multiculturalismo porque:", options: ["Busca el diálogo y el intercambio entre culturas, no solo su coexistencia","Niega la diversidad","Impone una cultura dominante"], correct: 0, explanation: "El multiculturalismo constata la coexistencia; la interculturalidad promueve la relación." }
    ]
  },
  "4.5.5": {
    leccion: "Tres ideas del debate sobre nuestro trato a otros seres vivos. **Peter Singer** compara el **especismo** con el racismo y el sexismo: considerar irrelevante el sufrimiento de otros animales solo por no ser humanos es discriminar por pertenencia a una especie. El **bienestar animal** se resume en las **cinco libertades**: estar libre de hambre y sed, de incomodidad, de dolor y enfermedad, de miedo y angustia, y tener libertad para expresar un comportamiento natural. Y la **ética ambiental ecocéntrica** amplía el círculo todavía más: atribuye valor moral al ecosistema en su conjunto —especies, suelos, aguas—, no solo a los individuos capaces de sentir.",
    flashcards: [
      { front: "¿Qué es el bienestar animal según las cinco libertades?", back: "Libre de hambre y sed, de incomodidad, de dolor y enfermedad, de miedo y angustia, y libertad para expresar un comportamiento natural." },
      { front: "¿Qué es la ética ambiental ecocéntrica?", back: "La que atribuye valor moral al ecosistema en su conjunto (especies, suelos, aguas), no solo a los individuos sintientes." }
    ],
    quiz: [
      { q: "El especismo se define como:", options: ["La discriminación fundada únicamente en la pertenencia a otra especie","El estudio de las especies","La protección de especies en peligro"], correct: 0, explanation: "Es el término acuñado para señalar un trato desigual sin justificación moral relevante." },
      { q: "El argumento central en favor de considerar moralmente a otros animales es:", options: ["Su capacidad de sentir dolor y sufrimiento","Su parecido físico con los humanos","Su utilidad económica"], correct: 0, explanation: "La sintiencia es el criterio propuesto para incluir a un ser en la comunidad moral." },
      { q: "Una postura ecocéntrica valora moralmente:", options: ["Al ecosistema completo, incluidos suelos, aguas y especies","Solo a los seres humanos","Solo a los mamíferos"], correct: 0, explanation: "Extiende la consideración moral más allá de los individuos sintientes." },
      { q: "La pérdida de biodiversidad plantea un problema ético porque:", options: ["Es un daño irreversible que afecta a otras especies y a las generaciones futuras","Encarece los alimentos únicamente","Solo afecta a los científicos"], correct: 0, explanation: "La irreversibilidad y el alcance del daño son los criterios morales relevantes." },
      { q: "Las cinco libertades del bienestar animal incluyen:", options: ["Estar libre de dolor, miedo y poder expresar comportamientos naturales","Recibir alimento industrial exclusivamente","Vivir siempre en cautiverio controlado"], correct: 0, explanation: "Son el estándar internacional para evaluar el trato a los animales bajo cuidado humano." }
    ]
  },
  "4.6.1": {
    flashcards: [
      { front: "¿Qué es lo sublime como categoría estética?", back: "La experiencia de lo desmesurado que sobrecoge y a la vez fascina: una tormenta, una montaña inmensa. Mezcla admiración con una cierta inquietud, a diferencia de lo bello, que produce armonía." },
      { front: "¿Qué es lo grotesco?", back: "La deformación deliberada que mezcla lo cómico con lo repulsivo o monstruoso, para provocar extrañeza y hacer visible lo que se prefiere no mirar." },
      { front: "¿Qué es lo trágico y lo cómico?", back: "Lo **trágico** presenta un conflicto sin salida donde el personaje cae pese a su grandeza; lo **cómico** revela lo incongruente y provoca risa liberando la tensión." }
    ],
    quiz: [
      { q: "Contemplar una tormenta en el mar y sentir a la vez sobrecogimiento y fascinación corresponde a la categoría de:", options: ["Lo sublime","Lo bello","Lo cómico"], correct: 0, explanation: "Lo sublime combina la atracción con la conciencia de la propia pequeñez." },
      { q: "Una obra que mezcla lo monstruoso con lo risible para producir extrañeza corresponde a:", options: ["Lo grotesco","Lo bello","Lo sublime"], correct: 0, explanation: "La deformación es su recurso característico." },
      { q: "Lo trágico se caracteriza porque:", options: ["El personaje enfrenta un conflicto que lo lleva a la caída pese a su grandeza","Siempre termina bien","Provoca risa"], correct: 0, explanation: "El destino ineludible y la dignidad del héroe definen lo trágico." }
    ]
  },
  "4.6.2": {
    leccion: "Tres nociones de la hermenéutica contemporánea. La interpretación **avanza en espiral** porque para entender el todo hay que comprender las partes y viceversa: cada detalle nuevo obliga a revisar el sentido global, y eso es el círculo hermenéutico. Los **prejuicios**, en la hermenéutica de Gadamer, son los supuestos previos desde los que se interpreta; no son un defecto que se pueda eliminar, sino la condición misma de la comprensión, aunque deben someterse a revisión. Y la **fusión de horizontes** es el encuentro entre el horizonte de sentido del texto y el del intérprete, del que surge una comprensión nueva que no coincide del todo con ninguno de los dos.",
    quiz: [
      { q: "La hermenéutica se define como:", options: ["La disciplina que estudia la interpretación y la comprensión del sentido","El estudio de la belleza","El análisis de las normas jurídicas"], correct: 0, explanation: "Su objeto es cómo se comprende e interpreta el sentido de textos y acciones." },
      { q: "Interpretar una obra literaria considerando su contexto histórico ilustra que:", options: ["El sentido depende también de la situación en que se produjo el texto","El contexto es irrelevante","Solo cuenta la opinión del lector"], correct: 0, explanation: "La hermenéutica atiende a la historicidad tanto del texto como del intérprete." }
    ]
  }
};
