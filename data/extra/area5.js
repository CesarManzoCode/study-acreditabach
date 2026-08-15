/* Contenido adicional del área 5 · Ciencias naturales, experimentales y tecnología
   Se CONCATENA al final de flashcards y quiz de cada tema (ver engine.js).
   Varios de estos temas además tienen generadores de problemas numéricos
   (src/lib/generators/science.js). */

const AREA5_EXTRA = {
  "5.1.1": {
    flashcards: [
      { front: "¿Qué es la electronegatividad y para qué sirve?", back: "La tendencia de un átomo a atraer electrones. La **diferencia** de electronegatividad entre dos átomos decide el enlace: grande → iónico, pequeña → covalente polar, casi nula → covalente no polar." },
      { front: "¿Qué es un enlace covalente polar?", back: "Aquel en el que los electrones se comparten de forma desigual porque un átomo atrae más. El agua es el ejemplo clásico: el oxígeno jala los electrones del hidrógeno." },
      { front: "¿Por qué los metales conducen la electricidad?", back: "Por el 'mar de electrones': en el enlace metálico los electrones de valencia se mueven libres por toda la red, así que transportan carga y calor." }
    ],
    quiz: [
      { q: "El compuesto MgCl₂ está formado por un metal y un no metal. ¿Qué tipo de enlace tiene?", options: ["Iónico","Covalente","Metálico"], correct: 0, explanation: "El magnesio (metal) cede electrones al cloro (no metal): hay transferencia, no compartición." },
      { q: "¿Por qué el cloruro de sodio conduce electricidad disuelto en agua pero no en estado sólido?", options: ["Porque al disolverse los iones quedan libres para moverse y transportar carga","Porque el agua agrega electrones al compuesto","Porque en estado sólido no tiene iones"], correct: 0, explanation: "En el cristal los iones están fijos en la red; al disolverse se separan y pueden desplazarse." },
      { q: "¿Qué característica tienen en común los compuestos con enlace covalente?", options: ["Se forman entre no metales que comparten electrones","Siempre son sólidos a temperatura ambiente","Siempre conducen electricidad"], correct: 0, explanation: "El covalente se define por compartir pares de electrones entre átomos no metálicos." },
      { q: "El oro se puede laminar en hojas muy delgadas sin romperse. ¿Qué tipo de enlace explica esa maleabilidad?", options: ["Metálico","Iónico","Covalente"], correct: 0, explanation: "Las capas de cationes pueden deslizarse sin romper el enlace porque el mar de electrones las mantiene unidas." }
    ]
  },
  "5.1.2": {
    leccion: "Además de los tres estados y de los cambios más conocidos, el examen pregunta por otros tres puntos. La **sublimación** es el paso directo de sólido a gas, sin pasar por líquido (el hielo seco, la naftalina), y la **deposición** o sublimación inversa es el camino contrario, de gas a sólido (la escarcha). La **evaporación** ocurre solo en la superficie del líquido y a cualquier temperatura, mientras que la **ebullición** ocurre en todo el volumen y a una temperatura específica, el punto de ebullición. Y el **plasma** es el cuarto estado de agregación: un gas ionizado con partículas cargadas libres, presente en el Sol, en los rayos y en los tubos de neón; es el estado más abundante del universo visible.",
    flashcards: [
      { front: "¿Qué es la sublimación y qué es la deposición?", back: "La **sublimación** es el paso directo de sólido a gas (hielo seco, naftalina); la **deposición** o sublimación inversa es el paso de gas a sólido (la escarcha)." },
      { front: "¿Qué diferencia hay entre evaporación y ebullición?", back: "La **evaporación** ocurre solo en la superficie y a cualquier temperatura; la **ebullición** ocurre en todo el líquido y a una temperatura específica (el punto de ebullición)." }
    ],
    quiz: [
      { q: "¿Qué estado de agregación tiene volumen fijo pero adopta la forma del recipiente?", options: ["Líquido","Sólido","Gaseoso"], correct: 0, explanation: "Las partículas del líquido se mantienen juntas (volumen fijo) pero pueden deslizarse unas sobre otras (forma variable)." },
      { q: "El hielo seco (CO₂ sólido) pasa directamente a gas sin volverse líquido. Ese cambio se llama:", options: ["Sublimación","Fusión","Condensación"], correct: 0, explanation: "El paso directo de sólido a gas es la sublimación; el de líquido a gas es la evaporación." },
      { q: "Durante un cambio de estado, mientras el hielo se derrite, la temperatura:", options: ["Se mantiene constante aunque se siga entregando calor","Sube de forma continua","Baja rápidamente"], correct: 0, explanation: "El calor entregado se usa en romper las fuerzas entre partículas (calor latente), no en subir la temperatura." },
      { q: "¿Qué ocurre con las partículas de un gas al aumentar la temperatura a volumen constante?", options: ["Se mueven más rápido y aumenta la presión","Se detienen","Se ordenan en una red"], correct: 0, explanation: "Mayor temperatura implica mayor energía cinética: más choques contra las paredes y por tanto más presión." }
    ]
  },
  "5.1.3": {
    flashcards: [
      { front: "¿Qué son los coeficientes y los subíndices en una ecuación química?", back: "Los **coeficientes** (delante) indican cuántas moléculas hay y sí se pueden cambiar para balancear; los **subíndices** indican la composición del compuesto y NO se pueden alterar." },
      { front: "¿Quién formuló la ley de conservación de la materia?", back: "Antoine Lavoisier, en el siglo XVIII, a partir de experimentos en recipientes cerrados donde pesó reactivos y productos." }
    ],
    quiz: [
      { q: "Al balancear una ecuación química, ¿qué está permitido modificar?", options: ["Solo los coeficientes que van delante de las fórmulas","Los subíndices de las fórmulas","Tanto coeficientes como subíndices"], correct: 0, explanation: "Cambiar un subíndice cambiaría la sustancia: H₂O y H₂O₂ son compuestos distintos." },
      { q: "Un tronco arde y las cenizas pesan mucho menos que el tronco original. ¿Se viola la conservación de la materia?", options: ["No: los gases liberados no se pesaron, y con ellos la masa total se conserva","Sí, la materia se destruyó al quemarse","Sí, la masa se convirtió en energía pura"], correct: 0, explanation: "El CO₂ y el vapor de agua escapan al aire; en un sistema cerrado la masa total no cambiaría." },
      { q: "¿Cuántos átomos de oxígeno hay en total del lado izquierdo de la ecuación 2H₂ + O₂ → 2H₂O?", options: ["2","1","4"], correct: 0, explanation: "O₂ tiene dos átomos de oxígeno, que coinciden con los dos del lado derecho (2 × 1 en 2H₂O)." },
      { q: "En un experimento cerrado reaccionan 10 g de A con 15 g de B. ¿Cuánta masa tendrán los productos?", options: ["25 g","Menos de 25 g","Depende del tipo de reacción"], correct: 0, explanation: "En un sistema cerrado la masa de los productos siempre iguala a la de los reactivos." }
    ]
  },
  "5.1.4": {
    flashcards: [
      { front: "¿A qué temperatura coinciden Celsius y Fahrenheit?", back: "A -40°: -40 °C = -40 °F. Es el único punto donde ambas escalas dan el mismo número." }
    ],
    quiz: [
      { q: "¿Cuál de estas temperaturas es la más alta?", options: ["100 °F","30 °C","300 K"], correct: 1, explanation: "100 °F ≈ 37.8 °C y 300 K ≈ 27 °C; la mayor es 30 °C." }
    ]
  },
  "5.1.5": {
    leccion: "Dos ideas que acompañan a la ley de Coulomb. La primera es su parecido con la **ley de gravitación universal**: ambas disminuyen con el cuadrado de la distancia, y la diferencia está en que la gravedad siempre atrae mientras que la fuerza eléctrica atrae o repele según los signos de las cargas. La segunda es el **campo eléctrico**: la región alrededor de una carga donde otra carga sentiría fuerza. Se mide como fuerza por unidad de carga, **E = F/q**, y sus unidades son N/C.",
    flashcards: [
      { front: "¿En qué se parecen la ley de Coulomb y la ley de gravitación universal?", back: "Las dos son inversamente proporcionales al cuadrado de la distancia. La diferencia es que la gravedad siempre atrae, mientras la fuerza eléctrica atrae o repele según los signos." }
    ],
    quiz: [
      { q: "Si la distancia entre dos cargas se reduce a la tercera parte, la fuerza entre ellas:", options: ["Se multiplica por 9","Se multiplica por 3","Se reduce a la tercera parte"], correct: 0, explanation: "Al ser inversamente proporcional al cuadrado de la distancia, dividir r entre 3 multiplica F por 3² = 9." },
      { q: "¿Qué unidad tiene la carga eléctrica en el Sistema Internacional?", options: ["El coulomb (C)","El newton (N)","El joule (J)"], correct: 0, explanation: "El coulomb mide la cantidad de carga; el newton mide fuerza y el joule, energía." },
      { q: "Dos cargas se atraen. ¿Qué se puede afirmar de sus signos?", options: ["Tienen signos opuestos","Tienen el mismo signo","Al menos una es neutra"], correct: 0, explanation: "Cargas iguales se repelen; solo las de signo contrario se atraen." }
    ]
  },
  "5.2.1": {
    leccion: "Dos fenómenos de la luz que el examen plantea con situaciones cotidianas. La **refracción** es el cambio de dirección de la luz al pasar de un medio a otro con distinta densidad óptica; es lo que hace que un lápiz metido en un vaso con agua se vea «quebrado». Y el color de los objetos se explica por **reflexión selectiva**: una hoja se ve verde porque absorbe la mayor parte de las longitudes de onda y refleja la verde, que es la que llega a nuestros ojos.",
    flashcards: [
      { front: "¿Qué es la refracción de la luz?", back: "El cambio de dirección al pasar de un medio a otro con distinta densidad óptica. Explica que un lápiz dentro de un vaso con agua se vea 'quebrado'." },
      { front: "¿Por qué vemos de color verde una hoja?", back: "Porque absorbe la mayor parte de las longitudes de onda y **refleja** la verde, que es la que llega a nuestros ojos." }
    ],
    quiz: [
      { q: "Un objeto se ve rojo porque:", options: ["Refleja la luz roja y absorbe las demás","Emite luz roja por sí mismo","Absorbe únicamente la luz roja"], correct: 0, explanation: "El color percibido corresponde a las longitudes de onda que el objeto no absorbe." },
      { q: "¿Qué fenómeno explica que un prisma descomponga la luz blanca en colores?", options: ["La refracción, porque cada longitud de onda se desvía un ángulo distinto","La reflexión total","La absorción selectiva"], correct: 0, explanation: "El índice de refracción depende de la longitud de onda, así que el violeta se desvía más que el rojo." },
      { q: "El rango aproximado de la luz visible es:", options: ["De 400 a 700 nanómetros","De 400 a 700 metros","De 4 a 7 milímetros"], correct: 0, explanation: "Por debajo de 400 nm está el ultravioleta y por encima de 700 nm, el infrarrojo." },
      { q: "El arcoíris se forma porque las gotas de lluvia:", options: ["Refractan y reflejan la luz solar, separando sus colores","Emiten luz de colores","Absorben toda la luz blanca"], correct: 0, explanation: "Cada gota actúa como un pequeño prisma: la luz entra, se refracta, se refleja adentro y sale separada." }
    ]
  },
  "5.2.2": {
    flashcards: [
      { front: "¿Por qué el clima cerca del mar es más templado?", back: "Por el alto calor específico del agua: absorbe y libera mucha energía con poco cambio de temperatura, así que modera los extremos de calor y frío." }
    ],
    quiz: [
      { q: "En un día soleado la arena de la playa quema y el agua sigue fresca. Esto se debe a que:", options: ["El agua tiene un calor específico mucho mayor que la arena","La arena recibe más radiación solar","El agua refleja toda la luz"], correct: 0, explanation: "Con la misma energía recibida, la sustancia de menor calor específico (la arena) sube mucho más de temperatura." },
      { q: "En la fórmula Q = m·c·ΔT, ¿qué representa ΔT?", options: ["La diferencia entre la temperatura final y la inicial","La temperatura promedio","El tiempo de calentamiento"], correct: 0, explanation: "Es el cambio de temperatura: T final menos T inicial. Si es negativo, la sustancia cedió calor." },
      { q: "¿Qué diferencia hay entre calor y temperatura?", options: ["El calor es energía en tránsito; la temperatura mide la energía cinética promedio de las partículas","Son sinónimos","La temperatura es energía y el calor una sensación"], correct: 0, explanation: "Un vaso y una alberca pueden estar a la misma temperatura y contener cantidades de energía muy distintas." },
      { q: "Se entrega la misma cantidad de calor a 1 kg y a 2 kg de la misma sustancia. ¿Qué ocurre?", options: ["La masa menor sube más de temperatura","Las dos suben lo mismo","La masa mayor sube más"], correct: 0, explanation: "De ΔT = Q/(m·c): a mayor masa, menor incremento de temperatura con el mismo calor." }
    ]
  },
  "5.2.3": {
    quiz: [
      { q: "La energía que llega del Sol a la Tierra en forma de ondas electromagnéticas es:", options: ["Radiante","Eólica","Química"], correct: 0, explanation: "La energía radiante viaja sin necesidad de medio material, a diferencia de la eólica o la mecánica." }
    ]
  },
  "5.2.4": {
    flashcards: [
      { front: "¿Qué es la energía mecánica total?", back: "La suma de la cinética y la potencial: Em = Ec + Ep. Sin fricción se conserva: lo que un cuerpo pierde de altura lo gana en rapidez." },
      { front: "¿Por qué la velocidad influye más que la masa en la energía cinética?", back: "Porque la velocidad está elevada al cuadrado: duplicar la masa duplica Ec, pero duplicar la velocidad la cuadruplica. Por eso el exceso de velocidad es tan peligroso al conducir." }
    ],
    quiz: [
      { q: "Un auto duplica su velocidad. ¿Qué pasa con su energía cinética?", options: ["Se cuadruplica","Se duplica","Se mantiene igual"], correct: 0, explanation: "Ec = ½mv²: al elevar al cuadrado, multiplicar v por 2 multiplica la energía por 4." },
      { q: "En el punto más alto de su recorrido, un péndulo tiene:", options: ["Energía potencial máxima y cinética cero","Energía cinética máxima","Ambas energías en su valor máximo"], correct: 0, explanation: "Ahí se detiene un instante: toda la energía mecánica está en forma potencial." },
      { q: "¿En qué unidad se mide la energía en el Sistema Internacional?", options: ["Joule (J)","Newton (N)","Watt (W)"], correct: 0, explanation: "El newton mide fuerza y el watt, potencia (energía por unidad de tiempo)." },
      { q: "Dos objetos están a la misma altura pero uno tiene el doble de masa. Respecto a su energía potencial:", options: ["El de mayor masa tiene el doble de energía potencial","Ambos tienen la misma","El de menor masa tiene más"], correct: 0, explanation: "Ep = mgh es directamente proporcional a la masa cuando la altura es la misma." }
    ]
  },
  "5.2.5": {
    flashcards: [
      { front: "¿Qué es la entropía?", back: "La medida del desorden o de la energía no aprovechable de un sistema. La segunda ley afirma que la entropía del universo siempre aumenta en los procesos espontáneos." },
      { front: "¿Por qué ninguna máquina térmica tiene 100% de eficiencia?", back: "Por la segunda ley: parte de la energía se disipa siempre como calor no aprovechable hacia el ambiente." }
    ],
    quiz: [
      { q: "Un café caliente se enfría solo hasta alcanzar la temperatura del cuarto. ¿Qué ley de la termodinámica lo explica?", options: ["La segunda: el calor fluye espontáneamente de lo caliente a lo frío","La primera","La tercera"], correct: 0, explanation: "El proceso inverso (que el café se caliente solo tomando calor del aire) nunca ocurre espontáneamente." },
      { q: "Un motor convierte energía química en movimiento y también libera calor. ¿Qué ley describe que la energía total se mantenga?", options: ["La primera ley de la termodinámica","La ley cero","La tercera ley"], correct: 0, explanation: "La primera ley es la conservación de la energía aplicada a los procesos térmicos." },
      { q: "La ley cero de la termodinámica es la que permite:", options: ["Definir la temperatura y usar termómetros","Calcular la entropía","Alcanzar el cero absoluto"], correct: 0, explanation: "Si dos cuerpos están en equilibrio térmico con un tercero (el termómetro), lo están entre sí: eso valida la medición." },
      { q: "Según la tercera ley de la termodinámica:", options: ["Es imposible alcanzar el cero absoluto en un número finito de pasos","La energía se conserva siempre","El calor fluye del frío al calor"], correct: 0, explanation: "Se puede acercar tanto como se quiera, pero nunca alcanzar los 0 K exactos." }
    ]
  },
  "5.3.1": {
    flashcards: [
      { front: "¿En qué se diferencian fotosíntesis y respiración celular?", back: "Son procesos inversos: la fotosíntesis toma CO₂ y agua y produce glucosa y O₂ usando luz; la respiración celular toma glucosa y O₂ y libera CO₂, agua y energía (ATP)." },
      { front: "¿Cuáles son las dos fases de la fotosíntesis?", back: "La **fase luminosa**, en los tilacoides, donde la luz genera ATP y NADPH y se libera O₂; y la **fase oscura o ciclo de Calvin**, en el estroma, donde se fija el CO₂ para formar glucosa." }
    ],
    quiz: [
      { q: "¿Cuál es la ecuación general de la fotosíntesis?", options: ["6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂","C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O","6O₂ + luz → 6CO₂ + glucosa"], correct: 0, explanation: "La segunda opción es justamente la respiración celular, el proceso inverso." },
      { q: "¿De dónde proviene el oxígeno que libera la fotosíntesis?", options: ["De las moléculas de agua que se rompen en la fase luminosa","Del dióxido de carbono","Del suelo"], correct: 0, explanation: "La fotólisis del agua libera el O₂; el carbono del CO₂ se usa para armar la glucosa." },
      { q: "¿Qué pigmento capta la luz solar en la fotosíntesis?", options: ["La clorofila","La hemoglobina","La melanina"], correct: 0, explanation: "La clorofila, alojada en los cloroplastos, absorbe sobre todo luz azul y roja y refleja la verde." },
      { q: "Si una planta se mantiene en oscuridad total durante varios días:", options: ["No podrá realizar la fase luminosa y dejará de producir glucosa","Aumentará su producción de oxígeno","Realizará fotosíntesis con mayor eficiencia"], correct: 0, explanation: "Sin luz no hay ATP ni NADPH para el ciclo de Calvin: la planta agota sus reservas." }
    ]
  },
  "5.3.2": {
    flashcards: [
      { front: "¿Qué dos factores definen principalmente un bioma?", back: "La **temperatura** y la **precipitación**. De ellas dependen la vegetación dominante y, con ella, la fauna que puede habitarlo." }
    ],
    quiz: [
      { q: "¿Qué bioma concentra la mayor biodiversidad del planeta?", options: ["La selva tropical","La tundra","El desierto"], correct: 0, explanation: "Temperatura alta y humedad constante todo el año permiten una enorme cantidad de nichos y especies." },
      { q: "El permafrost, suelo permanentemente congelado, es característico de:", options: ["La tundra","La sabana","El bosque templado"], correct: 0, explanation: "Impide el crecimiento de raíces profundas, y por eso en la tundra dominan musgos y líquenes." },
      { q: "En México, la selva Lacandona y los bosques de niebla corresponden a biomas caracterizados por:", options: ["Alta humedad y gran diversidad de especies","Suelo congelado todo el año","Precipitación casi nula"], correct: 0, explanation: "Ambos son ecosistemas húmedos y biodiversos, muy sensibles a la deforestación." }
    ]
  },
  "5.3.3": {
    flashcards: [
      { front: "¿Qué es la regla del 10% en las cadenas tróficas?", back: "Solo alrededor del 10% de la energía de un nivel pasa al siguiente; el resto se pierde como calor. Por eso hay pocos depredadores tope y las cadenas son cortas." },
      { front: "¿Qué diferencia hay entre cadena y red trófica?", back: "La **cadena** es una secuencia lineal de quién come a quién; la **red** conecta muchas cadenas, porque la mayoría de las especies come y es comida por varias." }
    ],
    quiz: [
      { q: "¿Por qué las cadenas tróficas rara vez tienen más de cinco niveles?", options: ["Porque en cada nivel se pierde cerca del 90% de la energía como calor","Porque no existen suficientes especies","Porque los descomponedores lo impiden"], correct: 0, explanation: "La energía disponible se reduce tanto que no alcanza para sostener otro nivel." },
      { q: "Si desaparecieran todos los descomponedores de un ecosistema:", options: ["Los nutrientes quedarían atrapados en la materia muerta y no volverían al suelo","Aumentaría la producción de las plantas","No habría ningún efecto"], correct: 0, explanation: "Los descomponedores cierran los ciclos: sin ellos se acumula materia orgánica y se agotan los nutrientes." },
      { q: "Un organismo omnívoro, como el ser humano, ocupa en la red trófica:", options: ["Más de un nivel, según lo que consuma en cada caso","Solo el nivel de consumidor primario","El nivel de productor"], correct: 0, explanation: "Al comer vegetales actúa como consumidor primario, y al comer carne, como secundario o terciario." },
      { q: "¿Qué organismos ocupan la base de toda cadena trófica?", options: ["Los productores o autótrofos","Los descomponedores","Los consumidores primarios"], correct: 0, explanation: "Son los únicos que introducen energía nueva al ecosistema, capturándola del Sol." }
    ]
  },
  "5.3.4": {
    quiz: [
      { q: "¿Qué actividad humana altera más el ciclo del carbono?", options: ["La quema de combustibles fósiles","La rotación de cultivos","La pesca artesanal"], correct: 0, explanation: "Libera a la atmósfera carbono que estuvo almacenado millones de años, acelerando el efecto invernadero." },
      { q: "La lluvia ácida se relaciona directamente con los ciclos del:", options: ["Azufre y el nitrógeno","Fósforo y el potasio","Carbono y el agua"], correct: 0, explanation: "Los óxidos de azufre y de nitrógeno reaccionan con el vapor de agua y forman ácidos que caen con la lluvia." }
    ]
  },
  "5.3.5": {
    flashcards: [
      { front: "¿Cómo se calcula la productividad primaria neta?", back: "PPN = PPB − respiración de los productores. Es la energía que realmente queda disponible para los consumidores del ecosistema." },
      { front: "¿Qué ecosistemas tienen mayor productividad primaria?", back: "Las selvas tropicales, los arrecifes de coral y los estuarios. Los desiertos y el mar abierto están entre los de menor productividad." }
    ],
    quiz: [
      { q: "Un ecosistema captura 1,000 kcal/m²/año y sus productores gastan 400 en respiración. ¿Cuál es su productividad primaria neta?", options: ["600 kcal/m²/año","1,400 kcal/m²/año","400 kcal/m²/año"], correct: 0, explanation: "PPN = PPB - respiración = 1,000 - 400 = 600 kcal/m²/año." },
      { q: "La productividad secundaria se refiere a la energía:", options: ["Que los consumidores incorporan a su propio tejido","Que capturan las plantas por fotosíntesis","Que se pierde en forma de calor"], correct: 0, explanation: "Mide cuánta biomasa nueva generan los heterótrofos a partir de lo que consumen." },
      { q: "¿Por qué el mar abierto tiene baja productividad primaria pese a su tamaño?", options: ["Porque escasean los nutrientes en la superficie iluminada","Porque no llega luz a ninguna profundidad","Porque no hay organismos fotosintéticos"], correct: 0, explanation: "La luz está arriba y los nutrientes abajo: solo en zonas de surgencia coinciden ambos y la productividad se dispara." },
      { q: "La productividad primaria bruta es:", options: ["Toda la energía capturada por los productores antes de descontar su respiración","La energía disponible para los herbívoros","La energía almacenada por los carnívoros"], correct: 0, explanation: "Es el total capturado; al restarle el gasto propio de la planta se obtiene la neta." }
    ]
  },
  "5.3.6": {
    flashcards: [
      { front: "¿Qué son los servicios de regulación?", back: "Los que mantienen las condiciones ambientales: control de inundaciones, captura de carbono, polinización, regulación del clima y purificación del agua y del aire." }
    ],
    quiz: [
      { q: "Visitar un área natural protegida para hacer senderismo aprovecha un servicio:", options: ["Cultural","De aprovisionamiento","De regulación"], correct: 0, explanation: "Los beneficios recreativos, espirituales y educativos son servicios culturales." },
      { q: "La madera, el agua potable y los peces que obtenemos de los ecosistemas son servicios de:", options: ["Aprovisionamiento","Regulación","Soporte"], correct: 0, explanation: "Son bienes materiales directos que el ecosistema entrega." }
    ]
  },
  "5.3.7": {
    flashcards: [
      { front: "¿Qué es una especie invasora?", back: "Una especie introducida fuera de su área natural que se reproduce sin control por falta de depredadores y desplaza a las nativas, como el pez león en el Caribe." },
      { front: "¿Qué es una especie clave o especie llave?", back: "Aquella cuya presencia sostiene la estructura del ecosistema: al desaparecer, se desencadenan cambios en cascada, como ocurrió con los lobos en Yellowstone." }
    ],
    quiz: [
      { q: "¿Qué efecto tiene la deforestación sobre el suelo?", options: ["Aumenta la erosión, porque las raíces ya no lo retienen","Lo vuelve más fértil de inmediato","No tiene ningún efecto"], correct: 0, explanation: "Sin cobertura vegetal, la lluvia y el viento arrastran la capa fértil y crece el riesgo de inundaciones." },
      { q: "La introducción del pez león en el Caribe ilustra el problema de:", options: ["Las especies invasoras sin depredadores naturales","La lluvia ácida","La eutrofización"], correct: 0, explanation: "Se reproduce sin control y depreda especies nativas que no han evolucionado para evitarlo." },
      { q: "El principal gas de efecto invernadero emitido por la actividad humana es:", options: ["El dióxido de carbono","El oxígeno","El nitrógeno molecular"], correct: 0, explanation: "El CO₂ de la quema de combustibles fósiles es el de mayor contribución total, seguido del metano." },
      { q: "La pérdida de biodiversidad hace más frágil a un ecosistema porque:", options: ["Con menos especies hay menos alternativas para sostener sus funciones ante una perturbación","Reduce el número de descomponedores únicamente","Aumenta la productividad primaria"], correct: 0, explanation: "La diversidad funciona como un seguro: si una especie falla, otras pueden cumplir un papel semejante." }
    ]
  },
  "5.4.1": {
    flashcards: [
      { front: "¿Qué es un mol?", back: "La cantidad de sustancia que contiene 6.022×10²³ partículas (número de Avogadro). Un mol de cualquier compuesto pesa, en gramos, lo que indica su masa molar." },
      { front: "¿Cómo se pasa de gramos a moles?", back: "moles = masa (g) ÷ masa molar (g/mol). Y al revés: masa = moles × masa molar." }
    ],
    quiz: [
      { q: "¿Cuántas moléculas hay en un mol de cualquier sustancia?", options: ["6.022×10²³","1,000","100"], correct: 0, explanation: "Es el número de Avogadro, constante para cualquier sustancia." },
      { q: "La masa molar del agua es 18 g/mol. ¿Cuántos moles hay en 90 g de agua?", options: ["5 moles","1,620 moles","0.2 moles"], correct: 0, explanation: "moles = 90 ÷ 18 = 5 moles." },
      { q: "Para calcular la masa molar de un compuesto se necesita:", options: ["La fórmula química y las masas atómicas de sus elementos","Solo el número de átomos totales","La densidad del compuesto"], correct: 0, explanation: "Se multiplica cada masa atómica por su subíndice y se suman los resultados." },
      { q: "En la fórmula Ca(OH)₂, ¿cuántos átomos de oxígeno hay?", options: ["2","1","3"], correct: 0, explanation: "El subíndice fuera del paréntesis multiplica todo lo que está dentro: hay 2 O y 2 H." }
    ]
  },
  "5.4.2": {
    quiz: [
      { q: "La reacción CaCO₃ → CaO + CO₂ es de tipo:", options: ["Descomposición","Síntesis","Doble sustitución"], correct: 0, explanation: "Un solo compuesto se rompe en dos sustancias más simples." },
      { q: "En una reacción redox, el agente oxidante es el que:", options: ["Gana electrones y por tanto se reduce","Pierde electrones","No participa en el intercambio"], correct: 0, explanation: "El oxidante provoca la oxidación del otro reactivo tomando sus electrones." }
    ]
  },
  "5.4.3": {
    flashcards: [
      { front: "¿Por qué las reacciones nucleares liberan tanta energía?", back: "Porque parte de la masa se convierte en energía según E = mc². Una fracción mínima de masa produce cantidades enormes de energía." },
      { front: "¿Por qué no se usa aún la fusión para generar electricidad?", back: "Porque requiere temperaturas de millones de grados y confinar el plasma; todavía cuesta más energía sostener la reacción que la que se obtiene de ella." }
    ],
    quiz: [
      { q: "El Sol produce su energía mediante:", options: ["Fusión nuclear de núcleos de hidrógeno","Fisión de uranio","Combustión química"], correct: 0, explanation: "En su núcleo, el hidrógeno se fusiona en helio liberando enormes cantidades de energía." },
      { q: "Una central nucleoeléctrica funciona con:", options: ["Fisión nuclear controlada","Fusión nuclear","Combustión de carbón"], correct: 0, explanation: "El uranio-235 se fisiona en una reacción en cadena controlada por barras moderadoras." },
      { q: "¿Cuál es la principal desventaja ambiental de la fisión nuclear?", options: ["La generación de residuos radiactivos de larga duración","La emisión masiva de CO₂","El consumo de agua de lluvia"], correct: 0, explanation: "Emite muy poco CO₂, pero deja desechos que siguen siendo peligrosos durante miles de años." }
    ]
  },
  "5.5.1": {
    leccion: "Dos aplicaciones de los tipos de choque. Las **zonas de deformación** de un automóvil salvan vidas justamente porque se aplastan: al deformarse alargan el tiempo que dura el impacto, y como la fuerza depende de qué tan rápido cambia el momento, un choque más largo significa menos fuerza sobre los ocupantes; es un choque inelástico diseñado a propósito. El **coeficiente de restitución** es un número entre 0 y 1 que indica cuánta velocidad relativa se conserva después del choque: 1 corresponde al choque perfectamente elástico y 0 al perfectamente inelástico.",
    flashcards: [
      { front: "¿Por qué las zonas de deformación de un auto salvan vidas?", back: "Porque al deformarse alargan el tiempo del choque, lo que reduce la fuerza sobre los ocupantes. Es un choque inelástico diseñado a propósito." }
    ],
    quiz: [
      { q: "En un choque perfectamente inelástico entre dos cuerpos, después del impacto:", options: ["Se mueven juntos con una velocidad común","Rebotan conservando su energía cinética","Ambos quedan en reposo siempre"], correct: 0, explanation: "Quedan unidos, así que comparten la misma velocidad final; la energía cinética total disminuye." },
      { q: "Una pelota que rebota y alcanza cada vez menos altura indica que el choque es:", options: ["Parcialmente inelástico: pierde energía en cada rebote","Perfectamente elástico","Perfectamente inelástico"], correct: 0, explanation: "Parte de la energía se disipa como calor y sonido en cada impacto." },
      { q: "¿Qué magnitud se conserva en TODOS los choques de un sistema aislado?", options: ["El momento lineal total","La energía cinética total","La velocidad de cada cuerpo"], correct: 0, explanation: "La conservación del momento se cumple siempre; la de la energía cinética solo en los elásticos." }
    ]
  },
  "5.5.2": {
    flashcards: [
      { front: "¿Qué es el impulso y cómo se relaciona con el momento?", back: "Impulso = F·Δt, y es igual al cambio de momento lineal (F·Δt = Δp). Por eso alargar el tiempo de contacto reduce la fuerza necesaria." },
      { front: "¿El momento lineal es escalar o vectorial?", back: "**Vectorial**: tiene magnitud y dirección. Por eso, al sumar momentos de cuerpos que van en sentidos opuestos, se restan." }
    ],
    quiz: [
      { q: "Un camión de 2,000 kg a 10 m/s y un auto de 1,000 kg a 20 m/s tienen:", options: ["El mismo momento lineal: 20,000 kg·m/s","Distinto momento lineal","Momento cero"], correct: 0, explanation: "p = mv: 2,000×10 = 20,000 y 1,000×20 = 20,000 kg·m/s." },
      { q: "¿Por qué un rifle retrocede al disparar?", options: ["Por conservación del momento: la bala sale hacia adelante y el arma hacia atrás","Porque la pólvora empuja hacia atrás","Porque la bala pesa más que el rifle"], correct: 0, explanation: "El momento total del sistema era cero, así que los momentos de bala y arma deben cancelarse." },
      { q: "Las bolsas de aire de un automóvil reducen las lesiones porque:", options: ["Alargan el tiempo del impacto y disminuyen la fuerza sobre el cuerpo","Aumentan el momento lineal del pasajero","Detienen al pasajero instantáneamente"], correct: 0, explanation: "El cambio de momento es el mismo, pero repartido en más tiempo la fuerza es mucho menor." },
      { q: "La unidad del momento lineal en el Sistema Internacional es:", options: ["kg·m/s","N/m","J/s"], correct: 0, explanation: "Resulta de multiplicar masa (kg) por velocidad (m/s)." }
    ]
  },
  "5.5.3": {
    leccion: "Dos ideas para ordenar el espectro electromagnético. Todas las ondas electromagnéticas **viajan a 3×10⁸ m/s en el vacío y no necesitan un medio material** para propagarse; lo único que las distingue es su frecuencia y su longitud de onda. A partir de cierta energía se vuelven **radiación ionizante**: la que tiene energía suficiente para arrancar electrones a los átomos —ultravioleta de alta energía, rayos X y rayos gamma— y que por eso puede dañar el ADN. Las de menor energía, como las microondas y las ondas de radio del wifi, no son ionizantes.",
    flashcards: [
      { front: "¿Qué tienen en común todas las ondas electromagnéticas?", back: "Que viajan a 3×10⁸ m/s en el vacío y no necesitan un medio material. Lo que las distingue es su frecuencia y su longitud de onda." },
      { front: "¿Qué es la radiación ionizante?", back: "La de energía suficiente para arrancar electrones a los átomos: ultravioleta de alta energía, rayos X y rayos gamma. Puede dañar el ADN." }
    ],
    quiz: [
      { q: "¿Cuál de estas radiaciones es ionizante y por eso requiere protección?", options: ["Los rayos X","Las ondas de radio","Las microondas"], correct: 0, explanation: "Su alta energía puede alterar moléculas biológicas, incluido el ADN, de ahí los mandiles de plomo." },
      { q: "En el espectro electromagnético, a mayor frecuencia corresponde:", options: ["Menor longitud de onda y mayor energía","Mayor longitud de onda","Menor energía"], correct: 0, explanation: "Frecuencia y longitud de onda son inversamente proporcionales, ya que c = λ·f es constante." },
      { q: "El horno de microondas calienta los alimentos porque:", options: ["Hace vibrar las moléculas de agua, y esa agitación es calor","Emite radiación ionizante","Quema la superficie con luz infrarroja"], correct: 0, explanation: "La frecuencia usada coincide con la absorción del agua, que se agita y eleva la temperatura del alimento." },
      { q: "Las fibras ópticas transmiten información usando:", options: ["Luz, generalmente infrarroja, que se refleja dentro del hilo de vidrio","Ondas de radio","Rayos gamma"], correct: 0, explanation: "La reflexión interna total mantiene la señal luminosa confinada a lo largo de la fibra." }
    ]
  },
  "5.5.4": {
    flashcards: [
      { front: "¿Por qué en el vacío una pluma y un martillo caen igual?", back: "Porque la aceleración de la gravedad no depende de la masa. Sin aire no hay resistencia, y esa es la única razón por la que en la Tierra caen distinto." }
    ],
    quiz: [
      { q: "Se lanza una piedra verticalmente hacia arriba. En el punto más alto, su aceleración es:", options: ["g, dirigida hacia abajo","Cero","g, dirigida hacia arriba"], correct: 0, explanation: "La velocidad se anula un instante, pero la gravedad sigue actuando sin interrupción." },
      { q: "En caída libre, ¿qué distancia recorre un objeto en el segundo segundo comparada con el primero?", options: ["Más, porque cada segundo va más rápido","La misma","Menos"], correct: 0, explanation: "Con h = ½gt², en el primer segundo cae 5 m y en el segundo 15 m: la caída se acelera." },
      { q: "La aceleración de la gravedad en la superficie terrestre vale aproximadamente:", options: ["9.8 m/s²","9.8 m/s","9.8 km/h"], correct: 0, explanation: "Se expresa en metros por segundo al cuadrado, porque mide cómo cambia la velocidad cada segundo." }
    ]
  },
  "5.6.1": {
    flashcards: [
      { front: "¿Qué diferencia a una célula procariota de una eucariota?", back: "La **procariota** (bacterias) no tiene núcleo definido ni organelos con membrana; la **eucariota** (animal, vegetal, hongos) tiene núcleo y organelos membranosos." },
      { front: "¿Qué tiene una célula vegetal que no tiene la animal?", back: "Pared celular de celulosa, cloroplastos y una vacuola central grande. La animal, en cambio, tiene centriolos y lisosomas más abundantes." }
    ],
    quiz: [
      { q: "¿Qué organelo está presente en las células vegetales pero NO en las animales?", options: ["El cloroplasto","La mitocondria","El núcleo"], correct: 0, explanation: "La mitocondria y el núcleo están en ambas; el cloroplasto es exclusivo de células fotosintéticas." },
      { q: "Una célula bacteriana carece de:", options: ["Núcleo delimitado por membrana","Membrana celular","Ribosomas"], correct: 0, explanation: "Su material genético está libre en el citoplasma, en una región llamada nucleoide." },
      { q: "Si una célula necesita mucha energía, como una célula muscular, se espera que tenga:", options: ["Gran cantidad de mitocondrias","Muchos cloroplastos","Una pared celular gruesa"], correct: 0, explanation: "Las mitocondrias producen el ATP: a mayor demanda energética, mayor número de ellas." },
      { q: "La membrana celular es selectivamente permeable, lo que significa que:", options: ["Deja pasar unas sustancias y bloquea otras","Permite el paso de todo","Impide cualquier intercambio"], correct: 0, explanation: "Ese control es lo que mantiene el medio interno de la célula distinto del exterior." }
    ]
  },
  "5.6.2": {
    flashcards: [
      { front: "¿Cuántas especies hay en una población y cuántas en una comunidad?", back: "En la **población**, una sola: son individuos de la **misma especie** en un área. En la **comunidad**, varias: reúne todas las poblaciones de **distintas especies** que conviven ahí." },
      { front: "¿Qué agrega el ecosistema respecto de la comunidad?", back: "Los factores abióticos: agua, suelo, temperatura, luz. Ecosistema = comunidad (biótico) + ambiente físico (abiótico)." }
    ],
    quiz: [
      { q: "Todos los venados cola blanca de una reserva forman:", options: ["Una población","Una comunidad","Un ecosistema"], correct: 0, explanation: "Son individuos de una sola especie compartiendo un territorio." },
      { q: "El nivel de organización que incluye tanto a los seres vivos como al agua, el suelo y el clima de un lugar es:", options: ["El ecosistema","La comunidad","La población"], correct: 0, explanation: "El ecosistema integra los componentes bióticos y abióticos que interactúan." },
      { q: "El estómago es un ejemplo del nivel de organización llamado:", options: ["Órgano","Tejido","Sistema"], correct: 0, explanation: "Está formado por varios tejidos que cumplen juntos una función; el conjunto con intestinos y demás forma el sistema digestivo." },
      { q: "El nivel más amplio de organización biológica es:", options: ["La biosfera","El bioma","El ecosistema"], correct: 0, explanation: "La biosfera abarca todas las regiones del planeta donde existe vida." }
    ]
  },
  "5.6.3": {
    leccion: "Dos precisiones sobre la obtención de energía en la célula. La **fermentación** es la vía anaerobia que sigue a la glucólisis cuando falta oxígeno: produce muy poco ATP y genera ácido láctico en los músculos o etanol y CO₂ en las levaduras. Y de las etapas de la respiración celular, la que produce **más ATP** es la **cadena transportadora de electrones**, en la membrana interna de la mitocondria: ahí se genera la gran mayoría de los 36 a 38 ATP totales, no en la glucólisis ni en el ciclo de Krebs.",
    flashcards: [
      { front: "¿Cuál etapa de la respiración celular produce más ATP?", back: "La cadena transportadora de electrones, en la membrana interna de la mitocondria: ahí se genera la gran mayoría de los 36-38 ATP totales." }
    ],
    quiz: [
      { q: "¿En qué parte de la célula ocurre la glucólisis?", options: ["En el citoplasma","En la mitocondria","En el núcleo"], correct: 0, explanation: "Es la única etapa que no ocurre en la mitocondria y la única que no requiere oxígeno." },
      { q: "Cuando un músculo trabaja sin oxígeno suficiente, produce:", options: ["Ácido láctico por fermentación","Más oxígeno","Glucosa adicional"], correct: 0, explanation: "La fermentación láctica permite seguir obteniendo algo de ATP, y el ácido acumulado causa la fatiga." },
      { q: "¿Cuál es el aceptor final de electrones en la respiración celular aerobia?", options: ["El oxígeno, que forma agua","El dióxido de carbono","La glucosa"], correct: 0, explanation: "Por eso respiramos: sin oxígeno la cadena se detiene y la producción de ATP cae drásticamente." },
      { q: "La respiración celular y la fotosíntesis se relacionan porque:", options: ["Los productos de una son los reactivos de la otra","Ambas ocurren solo de noche","Ambas producen oxígeno"], correct: 0, explanation: "La fotosíntesis produce glucosa y O₂; la respiración los consume y devuelve CO₂ y agua." }
    ]
  },
  "5.7.1": {
    leccion: "Detrás de la reproducción sexual y la asexual hay dos tipos de división celular que el examen pregunta por su nombre. La **mitosis** produce dos células idénticas a la original y sirve para el crecimiento y la reparación de tejidos; la **meiosis** produce cuatro células con la mitad de los cromosomas —los gametos— y es la que genera variabilidad genética. Conviene también tener la lista de **formas de reproducción asexual**: bipartición (bacterias), gemación (levaduras, hidras), esporulación (hongos, helechos), fragmentación (estrellas de mar) y reproducción vegetativa (esquejes, tubérculos).",
    flashcards: [
      { front: "¿Qué es la mitosis y qué es la meiosis?", back: "La **mitosis** produce dos células idénticas a la original (crecimiento y reparación); la **meiosis** produce cuatro células con la mitad de cromosomas (gametos) y genera variabilidad." },
      { front: "¿Qué formas de reproducción asexual existen?", back: "Bipartición (bacterias), gemación (levaduras, hidras), esporulación (hongos, helechos), fragmentación (estrellas de mar) y reproducción vegetativa (esquejes, tubérculos)." }
    ],
    quiz: [
      { q: "¿Cuál es la principal ventaja evolutiva de la reproducción sexual?", options: ["Genera variabilidad genética, útil ante cambios del ambiente","Es más rápida que la asexual","No requiere pareja"], correct: 0, explanation: "La recombinación produce descendencia diversa, y en un ambiente cambiante eso mejora las probabilidades de supervivencia." },
      { q: "Una planta que se reproduce a partir de un esqueje da lugar a descendencia:", options: ["Genéticamente idéntica a la planta original","Con la mitad de los genes de la original","Con genes de dos progenitores"], correct: 0, explanation: "Es reproducción asexual: los descendientes son clones del progenitor." },
      { q: "La meiosis es indispensable para la reproducción sexual porque:", options: ["Reduce a la mitad el número de cromosomas, evitando que se dupliquen en cada generación","Produce células idénticas al progenitor","Ocurre solo en bacterias"], correct: 0, explanation: "Al unirse dos gametos haploides se restaura el número original de cromosomas de la especie." },
      { q: "¿Qué desventaja tiene la reproducción asexual?", options: ["La falta de variabilidad hace vulnerable a toda la población ante una misma amenaza","Requiere mucha energía","Es más lenta"], correct: 0, explanation: "Si un patógeno afecta a un individuo, puede afectar por igual a todos sus clones." }
    ]
  },
  "5.7.2": {
    flashcards: [
      { front: "¿Qué es un cariotipo?", back: "El conjunto ordenado de los cromosomas de una célula, clasificados por tamaño y posición del centrómero. Permite detectar alteraciones como la trisomía 21." },
      { front: "¿Cuántos cromosomas tiene una célula humana?", back: "46 en las células somáticas (23 pares: 22 pares de autosomas y 1 par sexual) y 23 en los gametos." }
    ],
    quiz: [
      { q: "En los seres humanos, el sexo del bebé lo determina:", options: ["El cromosoma que aporta el espermatozoide (X o Y)","El óvulo, que puede llevar X o Y","La cantidad de autosomas"], correct: 0, explanation: "El óvulo siempre aporta un X; el espermatozoide puede aportar X (niña) o Y (niño)." },
      { q: "Un cromosoma con el centrómero justo en el centro y brazos iguales se llama:", options: ["Metacéntrico","Acrocéntrico","Telocéntrico"], correct: 0, explanation: "Conforme el centrómero se desplaza hacia un extremo se pasa a submetacéntrico, acrocéntrico y telocéntrico." },
      { q: "Los autosomas son los cromosomas que:", options: ["Controlan características generales del cuerpo, no el sexo","Determinan el sexo del individuo","Solo están en los gametos"], correct: 0, explanation: "En humanos son los 22 pares distintos de los cromosomas sexuales X y Y." }
    ]
  },
  "5.7.3": {
    flashcards: [
      { front: "¿Qué diferencia hay entre genotipo y fenotipo?", back: "El **genotipo** es la combinación de alelos (AA, Aa, aa); el **fenotipo** es la característica observable. Aa y AA pueden tener el mismo fenotipo si A es dominante." },
      { front: "¿Qué es un cruce de prueba?", back: "Cruzar un individuo de fenotipo dominante con uno homocigoto recesivo para saber si es AA o Aa: si aparece descendencia recesiva, era heterocigoto." }
    ],
    quiz: [
      { q: "¿Qué diferencia hay entre genotipo y fenotipo?", options: ["El genotipo son los alelos que tiene; el fenotipo, la característica que se observa","Son sinónimos","El fenotipo son los alelos y el genotipo lo observable"], correct: 0, explanation: "Dos genotipos distintos (AA y Aa) pueden producir el mismo fenotipo cuando A es dominante." },
      { q: "En la herencia intermedia, cruzar una flor roja (RR) con una blanca (BB) produce flores rosas. Esto ocurre porque:", options: ["Ningún alelo es completamente dominante sobre el otro","El alelo blanco es dominante","Hubo una mutación"], correct: 0, explanation: "Es dominancia incompleta: el heterocigoto muestra un fenotipo intermedio." },
      { q: "Un individuo con genotipo aa para un rasgo recesivo es:", options: ["Homocigoto recesivo y expresa el rasgo","Heterocigoto portador","Homocigoto dominante"], correct: 0, explanation: "Solo con dos alelos recesivos se manifiesta el rasgo recesivo en el fenotipo." }
    ]
  },
  "5.7.4": {
    quiz: [
      { q: "¿Cuál es el error central de la teoría de Lamarck?", options: ["Suponer que los caracteres adquiridos durante la vida se heredan","Afirmar que las especies cambian con el tiempo","Proponer que el ambiente influye en los organismos"], correct: 0, explanation: "Lamarck acertó en que las especies cambian, pero el ejercicio de un órgano no modifica los genes que se transmiten." },
      { q: "Según Darwin, ¿de dónde surge la variación sobre la que actúa la selección natural?", options: ["Ya existe naturalmente en la población antes de la presión ambiental","La crea el ambiente cuando hace falta","Aparece por el uso de los órganos"], correct: 0, explanation: "La selección no crea variación: la filtra, favoreciendo a los individuos que ya la poseían." },
      { q: "Las bacterias resistentes a antibióticos son un ejemplo actual de:", options: ["Selección natural en acción","Herencia de caracteres adquiridos","Convergencia evolutiva"], correct: 0, explanation: "Las bacterias resistentes ya existían por mutación; el antibiótico elimina a las demás y ellas se multiplican." }
    ]
  },
  "5.7.5": {
    leccion: "Dos consecuencias de la evolución que se preguntan con ejemplos concretos. Las **estructuras homólogas** tienen el mismo origen y distinta función —el brazo humano y el ala de murciélago comparten los mismos huesos— e indican **ancestro común**; las **análogas** tienen distinto origen y la misma función —el ala de un ave y la de un insecto— e indican **convergencia**. La **radiación adaptativa** es la diversificación rápida de una especie ancestral en muchas especies que ocupan nichos distintos, como los pinzones de Darwin en las Galápagos.",
    flashcards: [
      { front: "¿Qué son las estructuras homólogas y las análogas?", back: "Las **homólogas** tienen el mismo origen y distinta función (brazo humano y ala de murciélago): indican ancestro común. Las **análogas** tienen distinto origen y misma función (ala de ave e insecto): indican convergencia." }
    ],
    quiz: [
      { q: "El ala de un murciélago y el brazo humano tienen los mismos huesos con distinta función. Son estructuras:", options: ["Homólogas, evidencia de evolución divergente","Análogas, evidencia de convergencia","Vestigiales"], correct: 0, explanation: "Mismo plan estructural heredado de un ancestro común, adaptado después a funciones diferentes." },
      { q: "El delfín y el tiburón tienen forma corporal parecida pese a no estar emparentados. Esto ejemplifica:", options: ["Evolución convergente","Evolución divergente","Herencia de caracteres adquiridos"], correct: 0, explanation: "Presiones ambientales similares (nadar rápido) produjeron soluciones parecidas por caminos independientes." },
      { q: "El pelaje grueso del oso polar es un ejemplo de:", options: ["Adaptación morfológica al frío","Convergencia molecular","Órgano vestigial"], correct: 0, explanation: "Es un rasgo físico favorecido por la selección natural en un ambiente de temperaturas extremas." }
    ]
  }
};
