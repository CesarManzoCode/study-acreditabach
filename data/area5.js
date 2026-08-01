const AREA5_TOPICS = [
  {
    id: "5.1.1",
    area: 5,
    subarea: "5.1 La materia y sus interacciones",
    tema: "Tipos de enlaces (iónico, covalente y metálico)",
    note: "Cuando los átomos se unen para formar compuestos, lo hacen por tres tipos principales de enlace. El **iónico** ocurre entre un metal y un no metal (hay transferencia de electrones), forma cristales sólidos y conduce electricidad disuelto en agua; ejemplo: NaCl (sal de mesa). El **covalente** ocurre entre no metales (comparten electrones), como el H2O o el CO2. El **metálico** ocurre solo entre átomos de metales, donde los electrones se mueven libremente ('mar de electrones'), lo que explica que los metales conduzcan electricidad y calor, como el cobre o el hierro. Truco rápido: metal+no metal = iónico; no metal+no metal = covalente; metal+metal = metálico.",
    flashcards: [
      { front: "¿Qué tipo de enlace se forma entre un metal y un no metal?", back: "Enlace iónico (hay transferencia de electrones), ejemplo: NaCl." },
      { front: "¿Por qué los metales conducen electricidad?", back: "Por el enlace metálico: los electrones se mueven libremente entre los átomos ('mar de electrones')." }
    ],
    quiz: [
      { q: "¿Cuál de los siguientes compuestos presenta un enlace iónico?", options: ["NaCl", "H2O", "O2"], correct: 0, explanation: "NaCl se forma entre un metal (Na) y un no metal (Cl), con transferencia de electrones: enlace iónico." },
      { q: "El enlace en el que los átomos comparten pares de electrones se llama:", options: ["Metálico", "Covalente", "Iónico"], correct: 1, explanation: "En el enlace covalente los átomos (generalmente no metales) comparten electrones, como en el H2O." }
    ]
  },
  {
    id: "5.1.2",
    area: 5,
    subarea: "5.1 La materia y sus interacciones",
    tema: "Características de los estados de agregación de la materia",
    note: "La materia se presenta en tres estados principales según cómo estén acomodadas y qué tan libres sean sus partículas. En el **sólido** las partículas están muy juntas y ordenadas, vibran pero no se mueven de lugar: tiene forma y volumen fijos (ej. hielo). En el **líquido** las partículas están juntas pero pueden moverse entre sí: tiene volumen fijo pero toma la forma del recipiente (ej. agua). En el **gaseoso** las partículas están muy separadas y se mueven libremente en todas direcciones: no tiene forma ni volumen fijos, se expande hasta llenar el espacio disponible (ej. vapor de agua). A mayor temperatura, mayor movimiento de partículas y más probable un cambio de estado.",
    flashcards: [
      { front: "¿Qué estado de la materia tiene forma y volumen fijos?", back: "El sólido: sus partículas están ordenadas y muy juntas." },
      { front: "¿Qué estado no tiene forma ni volumen fijos?", back: "El gaseoso: sus partículas están muy separadas y se mueven libremente." }
    ],
    quiz: [
      { q: "¿Cuál estado de la materia toma la forma del recipiente pero mantiene su volumen?", options: ["Sólido", "Líquido", "Gaseoso"], correct: 1, explanation: "El líquido se adapta a la forma del recipiente, pero su volumen no cambia." },
      { q: "En un gas, las partículas...", options: ["Están fijas en una posición", "Vibran sin cambiar de lugar", "Se mueven libremente y muy separadas"], correct: 2, explanation: "En los gases las partículas tienen muy poca atracción entre sí y se mueven libremente." }
    ]
  },
  {
    id: "5.1.3",
    area: 5,
    subarea: "5.1 La materia y sus interacciones",
    tema: "Ley de la conservación de la materia",
    note: "Esta ley (de Lavoisier) dice que **la materia no se crea ni se destruye, solo se transforma**: en una reacción química, la masa total de los reactivos debe ser igual a la masa total de los productos. Por eso las ecuaciones químicas deben estar 'balanceadas', es decir, tener el mismo número de átomos de cada elemento en ambos lados de la flecha. Ejemplo: en H2 + O2 → H2O, si contamos átomos, del lado izquierdo hay 2 de H y 2 de O, pero del derecho solo 2 de H y 1 de O: está desbalanceada. La versión correcta es 2H2 + O2 → 2H2O, donde ambos lados tienen 4 átomos de H y 2 de O.",
    flashcards: [
      { front: "¿Qué dice la ley de conservación de la materia?", back: "Que la materia no se crea ni se destruye, solo se transforma: la masa de reactivos = masa de productos." },
      { front: "¿Cómo se llama cuando una ecuación química cumple esta ley?", back: "Se dice que está 'balanceada': mismo número de átomos de cada elemento en ambos lados." }
    ],
    quiz: [
      { q: "¿Cuál ecuación cumple la ley de la conservación de la materia?", options: ["2H2 + O2 → 2H2O", "H2 + O2 → H2O", "H2 + O2 → 2H2O"], correct: 0, explanation: "Solo 2H2 + O2 → 2H2O tiene el mismo número de átomos de H y O en ambos lados." },
      { q: "La ley de conservación de la materia fue propuesta por:", options: ["Newton", "Lavoisier", "Dalton"], correct: 1, explanation: "Antoine Lavoisier estableció que la masa se conserva en las reacciones químicas." }
    ]
  },
  {
    id: "5.1.4",
    area: 5,
    subarea: "5.1 La materia y sus interacciones",
    tema: "Conversión de escalas termométricas",
    note: "Para pasar de Celsius a Fahrenheit se usa la fórmula **F = C × 9/5 + 32**; para pasar de Fahrenheit a Celsius se usa **C = (F − 32) × 5/9**. Ejemplo: convertir 20 °C a Fahrenheit: F = 20×9/5+32 = 36+32 = 68 °F. Otro ejemplo: convertir 98.6 °F (temperatura corporal) a Celsius: C = (98.6−32)×5/9 = 66.6×5/9 = 37 °C. Datos útiles para el examen: 0 °C = 32 °F (el agua se congela) y 100 °C = 212 °F (el agua hierve). Truco: memoriza estos dos puntos de referencia para revisar si tu resultado tiene sentido.",
    flashcards: [
      { front: "¿Fórmula para convertir de Celsius a Fahrenheit?", back: "F = C × 9/5 + 32" },
      { front: "¿A cuántos Fahrenheit equivalen 0 °C?", back: "32 °F (punto de congelación del agua)." }
    ],
    quiz: [
      { q: "¿Cuántos grados Fahrenheit son 30 °C?", options: ["86 °F", "54 °F", "62 °F"], correct: 0, explanation: "F = 30×9/5+32 = 54+32 = 86 °F." },
      { q: "¿Cuántos grados Celsius son 212 °F?", options: ["100 °C", "0 °C", "180 °C"], correct: 0, explanation: "212 °F es el punto de ebullición del agua, equivalente a 100 °C." }
    ]
  },
  {
    id: "5.1.5",
    area: 5,
    subarea: "5.1 La materia y sus interacciones",
    tema: "Ley de Coulomb",
    note: "La ley de Coulomb calcula la fuerza eléctrica entre dos cargas: **F = k × q1 × q2 / r²**, donde k = 9×10^9 N·m²/C² (constante de Coulomb), q1 y q2 son las cargas en Coulombs, y r es la distancia entre ellas en metros. Si las cargas tienen el mismo signo (+/+ o −/−) se repelen; si tienen signo distinto (+/−) se atraen. Nota clave: la fuerza es inversamente proporcional al cuadrado de la distancia, así que si duplicas la distancia, la fuerza se reduce a la cuarta parte. Ejemplo: con q1=q2=1 C y r=1 m, F = 9×10^9 × 1×1 / 1² = 9×10^9 N.",
    flashcards: [
      { front: "¿Qué pasa con la fuerza eléctrica si se duplica la distancia entre dos cargas?", back: "Se reduce a la cuarta parte, porque F es inversamente proporcional al cuadrado de r." },
      { front: "¿Cargas de signo distinto se atraen o repelen?", back: "Se atraen. Cargas del mismo signo se repelen." }
    ],
    quiz: [
      { q: "Según la ley de Coulomb, si aumenta la distancia entre dos cargas, la fuerza eléctrica...", options: ["Aumenta", "Disminuye", "No cambia"], correct: 1, explanation: "F es inversamente proporcional a r², así que a mayor distancia, menor fuerza." },
      { q: "Dos cargas positivas colocadas cerca una de otra...", options: ["Se atraen", "Se repelen", "No interactúan"], correct: 1, explanation: "Cargas del mismo signo (+/+) se repelen entre sí." }
    ]
  },
  {
    id: "5.2.1",
    area: 5,
    subarea: "5.2 Conservación de la energía y sus interacciones con la materia",
    tema: "Características de la luz visible",
    note: "La luz visible es la parte del espectro electromagnético que el ojo humano puede percibir, con longitudes de onda aproximadas entre 400 y 700 nanómetros. Se comporta como onda y como partícula (fotón). Al pasar por un prisma se descompone en los colores del arcoíris (**rojo, naranja, amarillo, verde, azul, índigo, violeta**), donde el rojo tiene la mayor longitud de onda y menor energía, y el violeta la menor longitud de onda y mayor energía. La luz blanca es la mezcla de todos estos colores. La luz visible viaja en línea recta y puede reflejarse (rebotar), refractarse (desviarse al cambiar de medio) y absorberse según el material que encuentre.",
    flashcards: [
      { front: "¿Qué color de la luz visible tiene mayor energía?", back: "El violeta, porque tiene la menor longitud de onda." },
      { front: "¿Cómo se llama el fenómeno cuando la luz blanca se separa en colores al pasar por un prisma?", back: "Dispersión de la luz (descomposición en el espectro visible)." }
    ],
    quiz: [
      { q: "¿Cuál color del espectro visible tiene la mayor longitud de onda?", options: ["Rojo", "Violeta", "Verde"], correct: 0, explanation: "El rojo tiene la mayor longitud de onda y menor energía del espectro visible." },
      { q: "La luz visible es una forma de:", options: ["Sonido", "Radiación electromagnética", "Energía nuclear"], correct: 1, explanation: "La luz visible es una porción del espectro electromagnético perceptible por el ojo humano." }
    ]
  },
  {
    id: "5.2.2",
    area: 5,
    subarea: "5.2 Conservación de la energía y sus interacciones con la materia",
    tema: "Calor específico",
    note: "El calor específico (c) es la energía necesaria para elevar 1 °C la temperatura de 1 gramo de una sustancia. La fórmula es **Q = m × c × ΔT**, donde Q es calor (en calorías o joules), m es masa, c es calor específico, y ΔT es el cambio de temperatura (T final − T inicial). El agua tiene un calor específico alto (1 cal/g°C), por eso tarda en calentarse y enfriarse. Ejemplo: ¿cuánto calor se necesita para calentar 100 g de agua de 20°C a 40°C? Q = 100 × 1 × (40−20) = 100 × 1 × 20 = 2000 calorías. A mayor calor específico, más energía se necesita para cambiar su temperatura.",
    flashcards: [
      { front: "¿Fórmula del calor específico?", back: "Q = m × c × ΔT (masa por calor específico por cambio de temperatura)." },
      { front: "¿Por qué el agua tarda tanto en calentarse?", back: "Porque tiene un calor específico alto (1 cal/g°C), necesita mucha energía para subir su temperatura." }
    ],
    quiz: [
      { q: "¿Cuánto calor se necesita para elevar la temperatura de 50 g de agua de 10°C a 30°C (c=1 cal/g°C)?", options: ["1000 cal", "500 cal", "2000 cal"], correct: 0, explanation: "Q = 50 × 1 × (30−10) = 50 × 20 = 1000 calorías." },
      { q: "Si una sustancia tiene calor específico bajo, entonces...", options: ["Se calienta y enfría rápido", "Se calienta y enfría lento", "No cambia de temperatura"], correct: 0, explanation: "Un calor específico bajo significa que necesita poca energía para cambiar de temperatura, por eso responde rápido." }
    ]
  },
  {
    id: "5.2.3",
    area: 5,
    subarea: "5.2 Conservación de la energía y sus interacciones con la materia",
    tema: "Características de los tipos de energía",
    note: "Existen muchos tipos de energía según su origen. La **térmica** proviene del movimiento de partículas y se relaciona con el calor (ej. una estufa). La **eólica** proviene del viento y se aprovecha con aerogeneradores para producir electricidad. La **nuclear** proviene de reacciones en el núcleo de los átomos (fisión o fusión) y libera enormes cantidades de energía, como en las plantas nucleoeléctricas. La **radiante** viaja en forma de ondas electromagnéticas, como la luz del Sol. Todas estas son formas en que la energía se manifiesta o se transporta, y pueden transformarse unas en otras (ej. la energía radiante del sol se convierte en energía térmica).",
    flashcards: [
      { front: "¿Qué tipo de energía se obtiene del movimiento del viento?", back: "Energía eólica, aprovechada con aerogeneradores." },
      { front: "¿Qué tipo de energía proviene de reacciones en el núcleo del átomo?", back: "Energía nuclear (por fisión o fusión)." }
    ],
    quiz: [
      { q: "La energía que viaja en forma de ondas electromagnéticas, como la luz solar, se llama:", options: ["Térmica", "Radiante", "Eólica"], correct: 1, explanation: "La energía radiante se transmite mediante ondas electromagnéticas, como la luz." },
      { q: "Una planta nucleoeléctrica genera electricidad principalmente a partir de energía:", options: ["Eólica", "Térmica solar", "Nuclear"], correct: 2, explanation: "Las plantas nucleoeléctricas usan reacciones nucleares (fisión) para generar energía." }
    ]
  },
  {
    id: "5.2.4",
    area: 5,
    subarea: "5.2 Conservación de la energía y sus interacciones con la materia",
    tema: "Energía cinética y potencial",
    note: "La energía cinética es la del movimiento: **Ec = ½ × m × v²** (masa por velocidad al cuadrado, entre 2). La energía potencial gravitatoria es la que tiene un objeto por su altura: **Ep = m × g × h**, donde g=9.8 m/s² (gravedad) y h es la altura. Ejemplo de Ec: un objeto de 2 kg que se mueve a 3 m/s tiene Ec = ½×2×3² = ½×2×9 = 9 joules. Ejemplo de Ep: un objeto de 5 kg a 10 m de altura tiene Ep = 5×9.8×10 = 490 joules. Ambas se miden en joules (J) y son parte de la energía mecánica total de un objeto.",
    flashcards: [
      { front: "¿Fórmula de la energía cinética?", back: "Ec = ½ × m × v² (masa por velocidad al cuadrado, entre 2)." },
      { front: "¿Fórmula de la energía potencial gravitatoria?", back: "Ep = m × g × h (masa por gravedad por altura)." }
    ],
    quiz: [
      { q: "¿Cuál es la energía cinética de un objeto de 4 kg que se mueve a 5 m/s?", options: ["50 J", "20 J", "100 J"], correct: 0, explanation: "Ec = ½×4×5² = ½×4×25 = 50 J." },
      { q: "¿Cuál es la energía potencial de un objeto de 2 kg a 5 m de altura (g=9.8 m/s²)?", options: ["98 J", "49 J", "19.6 J"], correct: 0, explanation: "Ep = m×g×h = 2×9.8×5 = 98 J." }
    ]
  },
  {
    id: "5.2.5",
    area: 5,
    subarea: "5.2 Conservación de la energía y sus interacciones con la materia",
    tema: "Leyes de la termodinámica",
    note: "Hay 4 leyes de la termodinámica. La **ley cero** dice que si dos cuerpos están en equilibrio térmico con un tercero, están en equilibrio entre sí (ej. dos bloques de hielo que se tocan alcanzan la misma temperatura). La **primera ley** es la conservación de la energía: la energía no se crea ni se destruye, solo se transforma (ej. la energía química de la gasolina se transforma en movimiento en un motor). La **segunda ley** dice que el calor fluye espontáneamente de lo caliente a lo frío, y que la entropía (desorden) del universo siempre aumenta. La **tercera ley** dice que no se puede alcanzar el cero absoluto de temperatura (−273°C).",
    flashcards: [
      { front: "¿Qué ejemplifica la ley cero de la termodinámica?", back: "Que dos cuerpos en equilibrio térmico con un tercero están en equilibrio entre sí, como dos bloques de hielo en contacto que igualan su temperatura." },
      { front: "¿Qué dice la primera ley de la termodinámica?", back: "Que la energía no se crea ni se destruye, solo se transforma (conservación de la energía)." }
    ],
    quiz: [
      { q: "Una taza de café caliente se enfría al estar en contacto con el aire frío del ambiente. Esto ejemplifica:", options: ["La segunda ley (el calor fluye de lo caliente a lo frío)", "La primera ley (conservación de la energía)", "La ley cero (equilibrio térmico)"], correct: 0, explanation: "El calor siempre fluye espontáneamente del cuerpo más caliente al más frío: segunda ley." },
      { q: "¿Qué ley de la termodinámica afirma que la energía no se crea ni se destruye?", options: ["Ley cero", "Primera ley", "Segunda ley"], correct: 1, explanation: "La primera ley es la ley de la conservación de la energía." }
    ]
  },
  {
    id: "5.3.1",
    area: 5,
    subarea: "5.3 Ecosistemas: interacciones, energía y dinámica",
    tema: "Productos y reactivos en la fotosíntesis",
    note: "La fotosíntesis es el proceso mediante el cual las plantas, algas y algunas bacterias producen su propio alimento usando la luz solar. Los **reactivos** (lo que entra) son **dióxido de carbono (CO2)**, **agua (H2O)** y luz solar. Los **productos** (lo que sale) son **glucosa (C6H12O6)**, que la planta usa como energía, y **oxígeno (O2)**, que libera al aire. La ecuación general es: 6CO2 + 6H2O + luz → C6H12O6 + 6O2. Ocurre en los cloroplastos, gracias a la clorofila (pigmento verde) que capta la luz. Este proceso es la base de casi todas las cadenas alimenticias, ya que produce el oxígeno que respiramos y el alimento que consumen los herbívoros.",
    flashcards: [
      { front: "¿Cuáles son los reactivos (lo que entra) de la fotosíntesis?", back: "Dióxido de carbono (CO2), agua (H2O) y luz solar." },
      { front: "¿Cuáles son los productos (lo que sale) de la fotosíntesis?", back: "Glucosa (C6H12O6) y oxígeno (O2)." }
    ],
    quiz: [
      { q: "¿Cuál de las siguientes es un producto de la fotosíntesis?", options: ["Dióxido de carbono", "Oxígeno", "Agua"], correct: 1, explanation: "El oxígeno (O2) es uno de los productos que libera la planta durante la fotosíntesis." },
      { q: "¿Dónde ocurre la fotosíntesis dentro de la célula vegetal?", options: ["En las mitocondrias", "En los cloroplastos", "En el núcleo"], correct: 1, explanation: "La fotosíntesis ocurre en los cloroplastos, gracias a la clorofila." }
    ]
  },
  {
    id: "5.3.2",
    area: 5,
    subarea: "5.3 Ecosistemas: interacciones, energía y dinámica",
    tema: "Características de los biomas",
    note: "Un bioma es una gran región con clima, vegetación y fauna característicos. La **sabana** tiene pastizales con árboles dispersos, clima cálido con estación seca y lluviosa (ej. leones, jirafas en África). La **tundra** es fría, casi sin árboles, con suelo congelado (permafrost) y vegetación baja como musgos y líquenes (ej. Ártico). El **bosque templado** tiene cuatro estaciones definidas, árboles que pierden hojas en otoño (caducifolios) y clima moderado. La **selva tropical** es cálida y muy húmeda todo el año, con la mayor biodiversidad del planeta y vegetación densa en varios niveles (dosel, sotobosque). Cada bioma tiene especies adaptadas específicamente a su clima y recursos disponibles.",
    flashcards: [
      { front: "¿Qué bioma se caracteriza por suelo congelado (permafrost) y vegetación baja?", back: "La tundra." },
      { front: "¿Qué bioma tiene la mayor biodiversidad y es cálido y húmedo todo el año?", back: "La selva tropical." }
    ],
    quiz: [
      { q: "¿Qué bioma tiene pastizales con árboles dispersos y una estación seca marcada?", options: ["Tundra", "Sabana", "Bosque templado"], correct: 1, explanation: "La sabana se caracteriza por pastizales, árboles dispersos y clima con estación seca." },
      { q: "¿Cuál bioma presenta las cuatro estaciones del año bien definidas, con árboles que pierden sus hojas?", options: ["Bosque templado", "Selva tropical", "Tundra"], correct: 0, explanation: "El bosque templado tiene las cuatro estaciones y árboles caducifolios." }
    ]
  },
  {
    id: "5.3.3",
    area: 5,
    subarea: "5.3 Ecosistemas: interacciones, energía y dinámica",
    tema: "Niveles de las redes tróficas",
    note: "En una red trófica, la energía pasa de un nivel a otro empezando por quien produce su alimento. Los **autótrofos o productores** (plantas, algas) producen su propio alimento mediante fotosíntesis; son la base de la cadena. Los **consumidores primarios** (herbívoros, como conejos o vacas) se alimentan directamente de los productores. Los **consumidores secundarios** (carnívoros pequeños, como zorros) se alimentan de los consumidores primarios. También existen consumidores terciarios (depredadores tope) que se alimentan de secundarios, y los descomponedores (hongos, bacterias) que reciclan la materia orgánica muerta. En cada nivel se pierde energía (aprox. 90%) en forma de calor, por eso las cadenas tróficas rara vez tienen más de 4-5 niveles.",
    flashcards: [
      { front: "¿Qué organismos son los productores en una red trófica?", back: "Los autótrofos, como las plantas, que producen su alimento por fotosíntesis." },
      { front: "¿Quiénes son los consumidores primarios?", back: "Los herbívoros: organismos que se alimentan directamente de los productores." }
    ],
    quiz: [
      { q: "Un zorro que se come a un conejo herbívoro actúa como:", options: ["Productor", "Consumidor primario", "Consumidor secundario"], correct: 2, explanation: "El zorro se alimenta de un consumidor primario (el conejo), por lo tanto es consumidor secundario." },
      { q: "¿Qué organismos producen su propio alimento mediante fotosíntesis?", options: ["Consumidores secundarios", "Autótrofos o productores", "Descomponedores"], correct: 1, explanation: "Los autótrofos (productores) como las plantas, elaboran su alimento mediante fotosíntesis." }
    ]
  },
  {
    id: "5.3.4",
    area: 5,
    subarea: "5.3 Ecosistemas: interacciones, energía y dinámica",
    tema: "Sustancias en los ciclos biogeoquímicos",
    note: "Los ciclos biogeoquímicos son el recorrido que hacen los elementos químicos entre los seres vivos y el ambiente. En el **ciclo del carbono**, el CO2 atmosférico es tomado por las plantas en la fotosíntesis, pasa a los animales al comerlas, y regresa a la atmósfera por la respiración y la quema de combustibles fósiles. En el **ciclo del azufre**, el azufre se libera por erupciones volcánicas y descomposición de materia orgánica, se oxida en la atmósfera, cae con la lluvia (lluvia ácida) y es absorbido por plantas y microorganismos del suelo. También existen los ciclos del nitrógeno, el agua y el fósforo. Todos estos ciclos son esenciales para mantener el equilibrio de los ecosistemas.",
    flashcards: [
      { front: "¿Qué sustancia central se mueve en el ciclo del carbono entre atmósfera, plantas y animales?", back: "El dióxido de carbono (CO2), capturado en la fotosíntesis y liberado en la respiración." },
      { front: "¿Qué fenómeno ambiental se relaciona con el ciclo del azufre?", back: "La lluvia ácida, causada por óxidos de azufre en la atmósfera." }
    ],
    quiz: [
      { q: "En el ciclo del carbono, ¿qué proceso hace que el CO2 atmosférico pase a las plantas?", options: ["La respiración", "La fotosíntesis", "La combustión"], correct: 1, explanation: "Las plantas capturan CO2 de la atmósfera durante la fotosíntesis." },
      { q: "¿Qué ciclo biogeoquímico se asocia principalmente con la lluvia ácida?", options: ["Ciclo del carbono", "Ciclo del agua", "Ciclo del azufre"], correct: 2, explanation: "Los óxidos de azufre liberados a la atmósfera forman ácidos que caen como lluvia ácida." }
    ]
  },
  {
    id: "5.3.5",
    area: 5,
    subarea: "5.3 Ecosistemas: interacciones, energía y dinámica",
    tema: "Tipos de productividad en un ecosistema",
    note: "La productividad de un ecosistema mide cuánta energía se genera. La **productividad primaria bruta** es toda la energía que los productores (plantas) capturan mediante fotosíntesis, sin restar nada. La **productividad primaria neta** es la energía que le queda a la planta después de restar lo que usó para su propia respiración (la que realmente está disponible para los consumidores): Neta = Bruta − Respiración. La **productividad secundaria** es la energía que los consumidores (herbívoros y carnívoros) transforman en su propio tejido al alimentarse de otros organismos. En general, la productividad disminuye conforme se sube de nivel trófico, porque en cada paso se pierde energía como calor.",
    flashcards: [
      { front: "¿Qué es la productividad primaria neta?", back: "La energía que le queda a la planta después de restar lo usado en su respiración (Bruta − Respiración)." },
      { front: "¿Qué mide la productividad secundaria?", back: "La energía que los consumidores transforman en su propio tejido al alimentarse de otros seres vivos." }
    ],
    quiz: [
      { q: "Si la productividad primaria bruta de una planta es 100 y usa 30 en su respiración, ¿cuál es su productividad primaria neta?", options: ["130", "70", "30"], correct: 1, explanation: "Neta = Bruta − Respiración = 100 − 30 = 70." },
      { q: "La energía que los herbívoros y carnívoros convierten en su propio tejido corresponde a la productividad:", options: ["Primaria bruta", "Primaria neta", "Secundaria"], correct: 2, explanation: "La productividad secundaria es generada por los consumidores, no por los productores." }
    ]
  },
  {
    id: "5.3.6",
    area: 5,
    subarea: "5.3 Ecosistemas: interacciones, energía y dinámica",
    tema: "Tipos de servicios ambientales",
    note: "Los servicios ambientales son los beneficios que los ecosistemas ofrecen a los seres humanos. Los de **aprovisionamiento** dan bienes directos y tangibles, como agua potable, alimentos, madera o medicinas. Los de **apoyo** (o regulación) mantienen las condiciones necesarias para la vida, como la polinización, la formación de suelo, la regulación del clima y la purificación del aire y del agua. Los **culturales** son beneficios no materiales, como recreación, turismo, valores espirituales o educativos que obtenemos de la naturaleza (ej. un parque natural para caminar o un bosque sagrado). Reconocer estos servicios ayuda a entender por qué es importante conservar los ecosistemas.",
    flashcards: [
      { front: "¿Qué tipo de servicio ambiental es el agua potable o la madera?", back: "Servicio de aprovisionamiento (bienes directos y tangibles)." },
      { front: "¿Qué tipo de servicio ambiental es la polinización o la regulación del clima?", back: "Servicio de apoyo (o regulación)." }
    ],
    quiz: [
      { q: "Visitar un parque natural para hacer turismo y recreación es un ejemplo de servicio ambiental:", options: ["De aprovisionamiento", "Cultural", "De apoyo"], correct: 1, explanation: "Los beneficios recreativos y espirituales que da la naturaleza son servicios culturales." },
      { q: "La purificación del aire realizada por los bosques es un servicio ambiental:", options: ["De apoyo", "Cultural", "De aprovisionamiento"], correct: 0, explanation: "Regular y mantener las condiciones del ambiente, como purificar el aire, es un servicio de apoyo." }
    ]
  },
  {
    id: "5.3.7",
    area: 5,
    subarea: "5.3 Ecosistemas: interacciones, energía y dinámica",
    tema: "Consecuencias del desequilibrio ecológico",
    note: "El desequilibrio ecológico ocurre cuando se altera la relación estable entre los seres vivos y su ambiente, generalmente por actividad humana. Consecuencias comunes: **extinción de especies** por pérdida de hábitat o sobreexplotación; **pérdida de biodiversidad**, que hace a los ecosistemas más vulnerables; **contaminación** del agua, aire y suelo que enferma a los organismos; **cambio climático** por exceso de gases de efecto invernadero; **erosión del suelo** por deforestación, que reduce la fertilidad y aumenta inundaciones; y **proliferación de especies invasoras** que desplazan a las nativas al no tener depredadores naturales. Estas consecuencias suelen encadenarse: por ejemplo, deforestar causa erosión, que contamina ríos, que afecta a la fauna acuática.",
    flashcards: [
      { front: "¿Qué consecuencia del desequilibrio ecológico ocurre cuando se elimina la cubierta vegetal de un área?", back: "Erosión del suelo, que reduce la fertilidad y aumenta el riesgo de inundaciones." },
      { front: "¿Qué es una especie invasora y por qué causa desequilibrio?", back: "Es una especie que llega a un ecosistema donde no es nativa y prolifera porque no tiene depredadores naturales, desplazando a las especies locales." }
    ],
    quiz: [
      { q: "La tala excesiva de árboles en una región provoca principalmente:", options: ["Aumento de biodiversidad", "Erosión del suelo", "Enfriamiento del planeta"], correct: 1, explanation: "Al eliminar la vegetación, el suelo queda expuesto y se erosiona con más facilidad." },
      { q: "¿Cuál de las siguientes es una consecuencia directa del desequilibrio ecológico?", options: ["Aumento de especies nativas", "Pérdida de biodiversidad", "Mejora en la calidad del agua"], correct: 1, explanation: "El desequilibrio ecológico suele traducirse en pérdida de biodiversidad y extinción de especies." }
    ]
  },
  {
    id: "5.4.1",
    area: 5,
    subarea: "5.4 Reacciones químicas y conservación de la materia en la formación de nuevas sustancias",
    tema: "Masa molar de los compuestos químicos",
    note: "La masa molar de un compuesto es la suma de las masas atómicas de todos los átomos que lo forman (se mide en g/mol). Masas atómicas aproximadas útiles: H=1, C=12, O=16, N=14, Na=23, Cl=35.5. Ejemplo: masa molar del agua (H2O) = 2(1) + 1(16) = 2 + 16 = **18 g/mol**. Ejemplo: masa molar del CO2 = 1(12) + 2(16) = 12 + 32 = **44 g/mol**. Ejemplo: masa molar del NaCl = 23 + 35.5 = **58.5 g/mol**. Para calcularla: identifica cuántos átomos de cada elemento hay (según los subíndices), multiplica cada uno por su masa atómica, y suma todo.",
    flashcards: [
      { front: "¿Cómo se calcula la masa molar de un compuesto?", back: "Sumando las masas atómicas de todos los átomos que lo forman, según sus subíndices." },
      { front: "¿Cuál es la masa molar del agua (H2O)? (H=1, O=16)", back: "18 g/mol (2×1 + 1×16 = 2+16=18)." }
    ],
    quiz: [
      { q: "¿Cuál es la masa molar del CO2? (C=12, O=16)", options: ["28 g/mol", "44 g/mol", "16 g/mol"], correct: 1, explanation: "CO2 = 1(12) + 2(16) = 12 + 32 = 44 g/mol." },
      { q: "¿Cuál es la masa molar del NaCl? (Na=23, Cl=35.5)", options: ["58.5 g/mol", "23 g/mol", "35.5 g/mol"], correct: 0, explanation: "NaCl = 23 + 35.5 = 58.5 g/mol." }
    ]
  },
  {
    id: "5.4.2",
    area: 5,
    subarea: "5.4 Reacciones químicas y conservación de la materia en la formación de nuevas sustancias",
    tema: "Tipos de reacciones químicas",
    note: "Hay varios tipos de reacciones químicas según cómo se combinan o separan las sustancias. En la de **síntesis** (o combinación), dos o más sustancias simples se unen para formar una más compleja: A + B → AB (ej. 2H2 + O2 → 2H2O). En la de **descomposición**, una sustancia compleja se rompe en sustancias más simples: AB → A + B (ej. 2H2O2 → 2H2O + O2, con luz o calor). En la de **reducción-oxidación (redox)**, hay transferencia de electrones: un elemento se oxida (pierde electrones) y otro se reduce (gana electrones), como cuando el hierro se oxida (oxidación) al estar en contacto con oxígeno.",
    flashcards: [
      { front: "¿Qué ocurre en una reacción de descomposición?", back: "Una sustancia compleja se rompe en dos o más sustancias más simples (AB → A + B)." },
      { front: "¿Qué ocurre en una reacción de síntesis (combinación)?", back: "Dos o más sustancias simples se unen para formar una más compleja (A + B → AB)." }
    ],
    quiz: [
      { q: "La reacción 2H2O2 → 2H2O + O2 es un ejemplo de reacción de:", options: ["Síntesis", "Descomposición", "Reducción"], correct: 1, explanation: "Una sustancia (peróxido de hidrógeno) se rompe en sustancias más simples: es descomposición." },
      { q: "Cuando el hierro se oxida al exponerse al aire, ocurre una reacción de tipo:", options: ["Síntesis", "Descomposición", "Redox (oxidación-reducción)"], correct: 2, explanation: "La oxidación del hierro implica transferencia de electrones entre el hierro y el oxígeno: es redox." }
    ]
  },
  {
    id: "5.4.3",
    area: 5,
    subarea: "5.4 Reacciones químicas y conservación de la materia en la formación de nuevas sustancias",
    tema: "Tipos de reacciones nucleares (fusión y fisión)",
    note: "Las reacciones nucleares ocurren en el núcleo del átomo y liberan enormes cantidades de energía. En la **fisión nuclear**, un núcleo pesado (como el uranio-235) se rompe en núcleos más pequeños al ser bombardeado con neutrones, liberando energía y más neutrones (reacción en cadena); es la que usan las plantas nucleoeléctricas y las bombas atómicas. En la **fusión nuclear**, dos núcleos ligeros (como el hidrógeno) se combinan para formar uno más pesado (como el helio), liberando aún más energía que la fisión; es el proceso que ocurre en el Sol y las estrellas. Diferencia clave: fisión = 'se rompe' un núcleo grande; fusión = 'se une' núcleos pequeños.",
    flashcards: [
      { front: "¿Qué tipo de reacción nuclear ocurre en el Sol?", back: "Fusión nuclear: núcleos ligeros (hidrógeno) se combinan para formar uno más pesado (helio)." },
      { front: "¿Qué tipo de reacción nuclear se usa en las plantas nucleoeléctricas?", back: "Fisión nuclear: un núcleo pesado (uranio) se divide en núcleos más pequeños." }
    ],
    quiz: [
      { q: "La unión de dos núcleos ligeros para formar uno más pesado, liberando gran energía, se llama:", options: ["Fisión nuclear", "Fusión nuclear", "Desintegración radiactiva"], correct: 1, explanation: "La fusión ocurre cuando núcleos ligeros, como los de hidrógeno, se combinan; es el proceso del Sol." },
      { q: "El proceso usado en una bomba atómica, donde un núcleo pesado se rompe en fragmentos, se llama:", options: ["Fusión nuclear", "Fisión nuclear", "Fotosíntesis"], correct: 1, explanation: "La fisión nuclear divide núcleos pesados como el uranio-235, liberando gran cantidad de energía." }
    ]
  },
  {
    id: "5.5.1",
    area: 5,
    subarea: "5.5 La energía en los procesos de la vida diaria",
    tema: "Tipos de choques (elástico e inelástico)",
    note: "Un choque (o colisión) ocurre cuando dos objetos interactúan con fuerza al encontrarse. En un choque **elástico**, los objetos rebotan y se separan después del impacto, y tanto el momento lineal como la energía cinética se conservan (ej. dos bolas de billar que chocan y cada una sigue su camino por separado). En un choque **inelástico**, los objetos se deforman, se pegan o pierden energía en forma de calor o sonido al chocar; el momento lineal se conserva pero la energía cinética no (ej. dos autos que chocan y quedan enganchados, o una plastilina que se pega a la pared). En la vida diaria, la mayoría de los choques reales son parcialmente inelásticos.",
    flashcards: [
      { front: "¿Qué caracteriza a un choque elástico?", back: "Los objetos rebotan y se separan; se conservan tanto el momento lineal como la energía cinética." },
      { front: "¿Qué caracteriza a un choque inelástico?", back: "Los objetos se deforman o quedan pegados; se conserva el momento lineal pero no la energía cinética." }
    ],
    quiz: [
      { q: "Dos autos que chocan de frente y quedan enganchados ejemplifican un choque:", options: ["Elástico", "Inelástico", "Sin fuerza"], correct: 1, explanation: "Al quedar pegados y deformarse, es un choque inelástico: se pierde energía cinética como calor y sonido." },
      { q: "En una mesa de billar, dos bolas chocan y cada una sigue su trayectoria por separado, sin deformarse. Esto es un choque:", options: ["Elástico", "Inelástico", "Nuclear"], correct: 0, explanation: "Al rebotar y conservar tanto momento como energía cinética, es un choque elástico (casi ideal)." }
    ]
  },
  {
    id: "5.5.2",
    area: 5,
    subarea: "5.5 La energía en los procesos de la vida diaria",
    tema: "Momento lineal",
    note: "El momento lineal (o cantidad de movimiento) mide 'cuánto movimiento' tiene un objeto: **p = m × v** (masa por velocidad), se mide en kg·m/s. En cualquier choque, el momento lineal total se conserva: la suma del momento antes del choque es igual a la suma después (ley de conservación del momento). Ejemplo: un objeto de 3 kg que se mueve a 4 m/s tiene p = 3×4 = 12 kg·m/s. Si dos objetos chocan y se quedan pegados, se suman sus momentos y masas para hallar la velocidad final: v_final = (p1+p2)/(m1+m2). A mayor masa o velocidad, mayor momento lineal.",
    flashcards: [
      { front: "¿Fórmula del momento lineal?", back: "p = m × v (masa por velocidad)." },
      { front: "¿Qué se conserva siempre en un choque, sea elástico o inelástico?", back: "El momento lineal total del sistema." }
    ],
    quiz: [
      { q: "¿Cuál es el momento lineal de un objeto de 5 kg que se mueve a 6 m/s?", options: ["30 kg·m/s", "11 kg·m/s", "1.2 kg·m/s"], correct: 0, explanation: "p = m×v = 5×6 = 30 kg·m/s." },
      { q: "Un objeto de 2 kg tiene un momento lineal de 20 kg·m/s. ¿Cuál es su velocidad?", options: ["10 m/s", "40 m/s", "18 m/s"], correct: 0, explanation: "v = p/m = 20/2 = 10 m/s." }
    ]
  },
  {
    id: "5.5.3",
    area: 5,
    subarea: "5.5 La energía en los procesos de la vida diaria",
    tema: "Ondas electromagnéticas en dispositivos de uso cotidiano",
    note: "Muchos dispositivos que usamos a diario funcionan gracias a distintos tipos de ondas electromagnéticas. El **horno de microondas** usa microondas para calentar alimentos (hacen vibrar las moléculas de agua). El **control remoto** de la tele usa luz **infrarroja** para enviar señales. Los teléfonos celulares y el wifi usan **ondas de radio** de alta frecuencia para transmitir datos. Las máquinas de rayos X en hospitales usan **rayos X** para ver dentro del cuerpo. Las lámparas de bronceado o los focos germicidas usan luz **ultravioleta**. Todas estas ondas forman parte del espectro electromagnético, que va desde ondas de radio (baja energía) hasta rayos gamma (muy alta energía), pasando por la luz visible en medio.",
    flashcards: [
      { front: "¿Qué tipo de onda usa un horno de microondas para calentar alimentos?", back: "Microondas, que hacen vibrar las moléculas de agua del alimento." },
      { front: "¿Qué tipo de onda usa el control remoto de la televisión?", back: "Luz infrarroja." }
    ],
    quiz: [
      { q: "¿Qué tipo de onda electromagnética usan el wifi y los teléfonos celulares para transmitir datos?", options: ["Rayos X", "Ondas de radio", "Rayos gamma"], correct: 1, explanation: "El wifi y los celulares transmiten información mediante ondas de radio de alta frecuencia." },
      { q: "¿Qué tipo de radiación se usa en los equipos médicos para ver el interior del cuerpo (huesos)?", options: ["Rayos X", "Luz infrarroja", "Microondas"], correct: 0, explanation: "Los rayos X tienen la energía suficiente para atravesar tejidos blandos y mostrar huesos." }
    ]
  },
  {
    id: "5.5.4",
    area: 5,
    subarea: "5.5 La energía en los procesos de la vida diaria",
    tema: "Caída libre",
    note: "La caída libre es el movimiento de un objeto que cae solo por acción de la gravedad (sin fricción del aire), con aceleración constante **g = 9.8 m/s²**. Fórmulas clave: velocidad **v = g × t**; altura recorrida **h = ½ × g × t²**; y también **v² = 2 × g × h**. Ejemplo: un objeto que cae durante 2 segundos alcanza v = 9.8×2 = 19.6 m/s, y cae una altura h = ½×9.8×2² = ½×9.8×4 = 19.6 m. Todos los objetos, sin importar su masa, caen con la misma aceleración en el vacío (una pluma y una piedra caen igual de rápido si no hay aire que las frene).",
    flashcards: [
      { front: "¿Cuál es el valor aproximado de la aceleración de la gravedad?", back: "g = 9.8 m/s²" },
      { front: "¿Fórmula de la velocidad en caída libre a partir del tiempo?", back: "v = g × t" }
    ],
    quiz: [
      { q: "¿Qué velocidad alcanza un objeto en caída libre después de 3 segundos (g=9.8 m/s²)?", options: ["29.4 m/s", "9.8 m/s", "19.6 m/s"], correct: 0, explanation: "v = g×t = 9.8×3 = 29.4 m/s." },
      { q: "¿Qué distancia cae un objeto en 2 segundos de caída libre (g=9.8 m/s²)?", options: ["9.8 m", "19.6 m", "39.2 m"], correct: 1, explanation: "h = ½×g×t² = ½×9.8×4 = 19.6 m." }
    ]
  },
  {
    id: "5.6.1",
    area: 5,
    subarea: "5.6 Organismos: estructura y procesos",
    tema: "Organelos celulares",
    note: "Los organelos son estructuras dentro de la célula con funciones específicas. La **mitocondria** produce energía (ATP) mediante respiración celular; presente en células animales y vegetales. El **cloroplasto** realiza la fotosíntesis; solo está en células vegetales y algas. El **núcleo** contiene el ADN y controla la célula. El **retículo endoplásmico** y el **aparato de Golgi** procesan y transportan proteínas. La **pared celular** (rígida, de celulosa) rodea solo a las células vegetales, dándoles forma fija; las células animales no la tienen, solo membrana celular flexible. Las células **procariotas** (bacterias) no tienen núcleo definido ni organelos con membrana; las **eucariotas** (animales, plantas, hongos) sí los tienen.",
    flashcards: [
      { front: "¿Qué organelo realiza la fotosíntesis y solo está en células vegetales?", back: "El cloroplasto." },
      { front: "¿Cuál es la diferencia principal entre células procariotas y eucariotas?", back: "Las procariotas no tienen núcleo definido ni organelos con membrana; las eucariotas sí los tienen." }
    ],
    quiz: [
      { q: "¿Qué estructura le da forma rígida a la célula vegetal y no está presente en la célula animal?", options: ["Mitocondria", "Pared celular", "Núcleo"], correct: 1, explanation: "La pared celular, hecha de celulosa, es exclusiva de las células vegetales." },
      { q: "¿Qué organelo se encarga de producir energía (ATP) en la célula?", options: ["Cloroplasto", "Núcleo", "Mitocondria"], correct: 2, explanation: "La mitocondria realiza la respiración celular para producir ATP (energía)." }
    ]
  },
  {
    id: "5.6.2",
    area: 5,
    subarea: "5.6 Organismos: estructura y procesos",
    tema: "Niveles de organización biológica",
    note: "La vida se organiza en niveles, del más simple al más complejo. **Célula** (unidad básica de vida) → **tejido** (grupo de células similares, ej. tejido muscular) → **órgano** (grupo de tejidos, ej. corazón) → **sistema de órganos** (grupo de órganos, ej. sistema digestivo) → **organismo** (un ser vivo completo). A nivel ecológico continúa: **población** (organismos de la misma especie en un área) → **comunidad** (varias poblaciones distintas en un área) → **ecosistema** (comunidad + ambiente físico) → **bioma** → **biosfera** (todo el planeta donde hay vida). Ejemplo: un conjunto de venados en un bosque es una población; junto con los árboles y otros animales del mismo lugar forman una comunidad.",
    flashcards: [
      { front: "¿Qué nivel de organización sigue después de 'órgano'?", back: "El sistema de órganos (conjunto de órganos que trabajan juntos, ej. sistema digestivo)." },
      { front: "¿Cuál es la diferencia entre población y comunidad?", back: "Población: organismos de la misma especie en un área. Comunidad: varias poblaciones de especies distintas conviviendo en la misma área." }
    ],
    quiz: [
      { q: "Todos los venados de un mismo bosque forman un ejemplo de:", options: ["Comunidad", "Población", "Ecosistema"], correct: 1, explanation: "Una población está formada por organismos de la misma especie que viven en la misma área." },
      { q: "¿Cuál es el nivel de organización biológica más amplio, que incluye todos los ecosistemas del planeta?", options: ["Bioma", "Comunidad", "Biosfera"], correct: 2, explanation: "La biosfera es el nivel más amplio: incluye toda la vida y los ecosistemas de la Tierra." }
    ]
  },
  {
    id: "5.6.3",
    area: 5,
    subarea: "5.6 Organismos: estructura y procesos",
    tema: "Etapas de la respiración celular",
    note: "La respiración celular es el proceso por el cual las células obtienen energía (ATP) a partir de la glucosa. Tiene tres etapas principales. La **glucólisis** ocurre en el citoplasma: rompe una molécula de glucosa en dos moléculas de piruvato, generando una pequeña cantidad de ATP (no necesita oxígeno). El **ciclo de Krebs** ocurre en la mitocondria: el piruvato se transforma y libera CO2, además de moléculas transportadoras de electrones (NADH y FADH2). La **cadena transportadora de electrones** (también en la mitocondria) usa esos transportadores y oxígeno para producir la mayor parte del ATP, liberando agua como producto. En total, una molécula de glucosa puede generar hasta 36-38 ATP.",
    flashcards: [
      { front: "¿Qué ocurre en la glucólisis, la primera etapa de la respiración celular?", back: "Se rompe una molécula de glucosa en dos de piruvato, generando algo de energía (ATP), sin necesitar oxígeno." },
      { front: "¿Dónde ocurre el ciclo de Krebs?", back: "En la mitocondria, donde el piruvato se transforma liberando CO2 y transportadores de electrones." }
    ],
    quiz: [
      { q: "¿Cuál es la etapa de la respiración celular en la que se rompe la glucosa para obtener piruvato?", options: ["Ciclo de Krebs", "Glucólisis", "Cadena transportadora de electrones"], correct: 1, explanation: "La glucólisis es la primera etapa, donde la glucosa se divide en dos moléculas de piruvato." },
      { q: "¿En qué etapa de la respiración celular se produce la mayor cantidad de ATP?", options: ["Glucólisis", "Ciclo de Krebs", "Cadena transportadora de electrones"], correct: 2, explanation: "La cadena transportadora de electrones genera la mayor parte del ATP usando oxígeno." }
    ]
  },
  {
    id: "5.7.1",
    area: 5,
    subarea: "5.7 Herencia y evolución biológica",
    tema: "Reproducción sexual y asexual",
    note: "En la reproducción **sexual** participan dos progenitores (macho y hembra) que combinan sus células sexuales (óvulo y espermatozoide); el resultado es descendencia con **combinación genética variada**, distinta a ambos padres, lo que aumenta la diversidad genética de la especie (ej. humanos, la mayoría de los animales). En la reproducción **asexual** participa un solo progenitor, sin fusión de células sexuales; la descendencia es **genéticamente idéntica** al progenitor (un clon), como en la división de bacterias, la gemación de la levadura, o cuando una planta crece de un esqueje. La sexual da más variedad genética (ventaja ante cambios ambientales); la asexual es más rápida pero menos diversa.",
    flashcards: [
      { front: "¿Qué tipo de reproducción produce descendencia genéticamente idéntica al progenitor?", back: "La reproducción asexual (un solo progenitor, sin combinación genética)." },
      { front: "¿Qué ventaja da la reproducción sexual frente a la asexual?", back: "Mayor variedad genética en la descendencia, lo que ayuda a la especie a adaptarse a cambios." }
    ],
    quiz: [
      { q: "Una planta que crece a partir de un esqueje, genéticamente idéntica a la planta original, se reprodujo de forma:", options: ["Sexual", "Asexual", "Mixta"], correct: 1, explanation: "Al no combinarse material genético de dos progenitores y ser idéntica al original, es reproducción asexual." },
      { q: "¿Qué caracteriza a la reproducción sexual?", options: ["Un solo progenitor y descendencia idéntica", "Dos progenitores y descendencia genéticamente variada", "No requiere células sexuales"], correct: 1, explanation: "En la reproducción sexual, dos progenitores combinan sus células sexuales, generando variabilidad genética." }
    ]
  },
  {
    id: "5.7.2",
    area: 5,
    subarea: "5.7 Herencia y evolución biológica",
    tema: "Tipos de cromosomas",
    note: "Los cromosomas se pueden clasificar de distintas formas. Según su **función**: los **autosomas** son los cromosomas que controlan las características generales del cuerpo (en humanos hay 22 pares), y los **cromosomas sexuales** (X y Y) determinan el sexo del individuo (XX mujer, XY hombre). Según la **posición del centrómero** (el punto donde se unen las dos mitades del cromosoma): **metacéntrico** (centrómero al centro, brazos iguales), **submetacéntrico** (centrómero un poco desplazado, brazos desiguales), **acrocéntrico** (centrómero muy cerca de un extremo, un brazo muy corto), y **telocéntrico** (centrómero en la punta, prácticamente un solo brazo). Esta clasificación ayuda a identificar cromosomas en un cariotipo.",
    flashcards: [
      { front: "¿Qué cromosomas determinan el sexo de una persona?", back: "Los cromosomas sexuales (X y Y): XX es mujer, XY es hombre." },
      { front: "¿Cómo se llama un cromosoma con el centrómero justo en el centro, con brazos de igual tamaño?", back: "Metacéntrico." }
    ],
    quiz: [
      { q: "Los cromosomas que controlan las características generales del cuerpo (no el sexo) se llaman:", options: ["Cromosomas sexuales", "Autosomas", "Telocéntricos"], correct: 1, explanation: "Los autosomas son los 22 pares de cromosomas humanos que no determinan el sexo." },
      { q: "Un cromosoma con el centrómero muy cerca de uno de sus extremos, con un brazo muy corto, se clasifica como:", options: ["Metacéntrico", "Acrocéntrico", "Submetacéntrico"], correct: 1, explanation: "El cromosoma acrocéntrico tiene el centrómero cerca de un extremo, dejando un brazo muy corto." }
    ]
  },
  {
    id: "5.7.3",
    area: 5,
    subarea: "5.7 Herencia y evolución biológica",
    tema: "Cuadros de Punnett",
    note: "El cuadro de Punnett es una tabla que ayuda a predecir las combinaciones genéticas posibles de la descendencia, cruzando los alelos de cada padre. Se usan letras mayúsculas para alelos **dominantes** (ej. A) y minúsculas para **recesivos** (ej. a). Ejemplo clásico: cruza de dos heterocigotos (Aa × Aa) da como resultado 1 AA : 2 Aa : 1 aa, es decir, 25% homocigoto dominante, 50% heterocigoto, 25% homocigoto recesivo (proporción 3:1 en el fenotipo si A es dominante). Para leer un cuadro de Punnett: los alelos de un padre van en las filas, los del otro en las columnas, y cada celda interna muestra la combinación resultante.",
    flashcards: [
      { front: "En un cruce Aa × Aa, ¿qué proporción genotípica resulta?", back: "1 AA : 2 Aa : 1 aa (25% dominante puro, 50% heterocigoto, 25% recesivo puro)." },
      { front: "¿Cómo se representan los alelos dominantes y recesivos en un cuadro de Punnett?", back: "Dominantes con mayúscula (A), recesivos con minúscula (a)." }
    ],
    quiz: [
      { q: "Si se cruzan dos individuos heterocigotos (Aa × Aa), ¿qué porcentaje de la descendencia será homocigota recesiva (aa)?", options: ["25%", "50%", "75%"], correct: 0, explanation: "En un cruce Aa×Aa, la proporción es 1AA:2Aa:1aa, es decir 25% aa." },
      { q: "En un cuadro de Punnett, los alelos de cada progenitor se colocan en:", options: ["El centro de la tabla", "Filas y columnas externas", "Solo en las filas"], correct: 1, explanation: "Los alelos de un progenitor van en las filas y los del otro en las columnas; las celdas muestran las combinaciones." }
    ]
  },
  {
    id: "5.7.4",
    area: 5,
    subarea: "5.7 Herencia y evolución biológica",
    tema: "Teorías evolutivas",
    note: "Existen dos teorías clásicas sobre cómo cambian las especies con el tiempo. El **transformismo de Lamarck** proponía que los organismos cambian durante su vida al usar o no usar ciertas partes del cuerpo, y que esos cambios se heredan a sus hijos (ej. las jirafas alargaron su cuello por estirarse para comer hojas altas, y ese cuello largo se transmitió a sus crías); esta idea (herencia de caracteres adquiridos) hoy se sabe que es incorrecta. La **selección natural de Darwin** propone que dentro de una población existe variación natural, y los individuos con características más favorables para su ambiente sobreviven y se reproducen más, transmitiendo esos rasgos ventajosos a la siguiente generación ('supervivencia del más apto').",
    flashcards: [
      { front: "¿Qué proponía Lamarck sobre la evolución?", back: "Que los organismos cambian por el uso o desuso de partes del cuerpo durante su vida, y heredan esos cambios a sus crías (transformismo)." },
      { front: "¿En qué consiste la selección natural de Darwin?", back: "Los individuos con rasgos más favorables para su ambiente sobreviven y se reproducen más, transmitiendo esos rasgos a la descendencia." }
    ],
    quiz: [
      { q: "La idea de que el cuello largo de la jirafa se debe a que sus antepasados lo estiraron toda su vida y heredaron ese cambio corresponde a la teoría de:", options: ["Darwin (selección natural)", "Lamarck (transformismo)", "Mendel (herencia)"], correct: 1, explanation: "Esta es la idea de la herencia de caracteres adquiridos, propuesta por Lamarck." },
      { q: "Según la teoría de la selección natural, ¿qué determina que ciertos individuos se reproduzcan más?", options: ["El azar total, sin relación con el ambiente", "Tener rasgos favorables para sobrevivir en su ambiente", "Que hayan usado más un órgano durante su vida"], correct: 1, explanation: "Darwin propuso que los individuos mejor adaptados a su ambiente tienen más probabilidad de sobrevivir y reproducirse." }
    ]
  },
  {
    id: "5.7.5",
    area: 5,
    subarea: "5.7 Herencia y evolución biológica",
    tema: "Consecuencias de la evolución",
    note: "La evolución produce distintos patrones al comparar especies. La **evolución divergente** ocurre cuando una especie ancestral común da origen a varias especies distintas que se adaptan a ambientes diferentes (ej. los pinzones de Darwin en las Galápagos, cada uno con pico distinto según su alimento). La **adaptación morfológica** es un cambio físico (de forma o estructura) que ayuda a un organismo a sobrevivir mejor en su ambiente (ej. el pelaje grueso de los osos polares para el frío). La **convergencia molecular** (o evolución convergente) ocurre cuando especies no emparentadas desarrollan por separado características similares al enfrentar presiones ambientales parecidas (ej. las alas de aves e insectos, que evolucionaron de forma independiente para volar).",
    flashcards: [
      { front: "¿Qué es la evolución divergente? Da un ejemplo.", back: "Cuando una especie ancestral da origen a varias especies distintas adaptadas a ambientes diferentes; ejemplo: los pinzones de Darwin en las Galápagos." },
      { front: "¿Qué es la convergencia molecular (evolución convergente)?", back: "Cuando especies no emparentadas desarrollan características similares de forma independiente por enfrentar presiones ambientales parecidas, como las alas de aves e insectos." }
    ],
    quiz: [
      { q: "Los pinzones de las islas Galápagos, que evolucionaron de un ancestro común hacia especies con picos distintos según su alimento, son un ejemplo de evolución:", options: ["Convergente", "Divergente", "Estática"], correct: 1, explanation: "La evolución divergente ocurre cuando una especie ancestral da origen a varias especies distintas." },
      { q: "Que los murciélagos (mamíferos) y las aves, sin parentesco cercano, hayan desarrollado alas por separado es un ejemplo de:", options: ["Evolución divergente", "Convergencia molecular (evolución convergente)", "Transformismo"], correct: 1, explanation: "Especies no emparentadas que desarrollan rasgos similares de forma independiente ejemplifican la evolución convergente." }
    ]
  }
];
