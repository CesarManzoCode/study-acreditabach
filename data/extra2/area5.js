/* Segundo paquete de ampliación · Área 5 · Ciencias naturales, experimentales y tecnología

   Muchos de estos reactivos son numéricos: en física y química el examen
   permite calculadora científica y aquí la app la abre dentro de la propia
   pregunta (ver src/lib/calcNeed.js). Los datos están elegidos para que el
   resultado se obtenga con una o dos operaciones. */

const AREA5_EXTRA2 = {
  "5.1.1": {
    flashcards: [
      { front: "¿Cómo se predice el tipo de enlace con la electronegatividad?", back: "Con la diferencia entre los dos átomos: mayor a 1.7 el enlace es **iónico**; entre 0.4 y 1.7 es **covalente polar**; menor a 0.4 es **covalente no polar**." },
      { front: "¿Qué es el «mar de electrones» del enlace metálico?", back: "Los electrones de valencia deslocalizados que se mueven libremente por toda la red de cationes metálicos. Es lo que hace que los metales conduzcan electricidad y calor." }
    ],
    quiz: [
      { q: "El cloruro de sodio (NaCl) conduce electricidad disuelto en agua pero no en estado sólido porque:", options: ["Al disolverse los iones quedan libres para moverse","El agua es un metal","Los enlaces se vuelven covalentes"], correct: 0, explanation: "La conducción iónica requiere iones con movilidad, algo imposible en la red cristalina rígida." },
      { q: "Si la diferencia de electronegatividad entre dos átomos es 2.1, el enlace es:", options: ["Iónico","Covalente polar","Covalente no polar"], correct: 0, explanation: "Por encima de 1.7 se considera transferencia de electrones, es decir, enlace iónico." },
      { q: "La molécula de oxígeno (O₂) presenta un enlace:", options: ["Covalente no polar","Iónico","Metálico"], correct: 0, explanation: "Al ser dos átomos idénticos, la diferencia de electronegatividad es cero." },
      { q: "Los compuestos iónicos suelen tener puntos de fusión altos porque:", options: ["La atracción electrostática entre iones de carga opuesta es muy intensa","Sus moléculas son grandes","Contienen metales de transición"], correct: 0, explanation: "Romper la red cristalina iónica requiere mucha energía." },
      { q: "El enlace de la molécula de agua (H₂O) es covalente polar porque:", options: ["El oxígeno es más electronegativo y atrae más los electrones compartidos","Se transfieren electrones por completo","Los átomos son idénticos"], correct: 0, explanation: "La distribución desigual de la carga genera un dipolo, base de casi todas las propiedades del agua." }
    ]
  },
  "5.1.2": {
    flashcards: [
      { front: "¿Qué cambio de estado ocurre al formarse la escarcha?", back: "**Deposición** o sublimación inversa: el vapor pasa a sólido sin pasar por líquido. El camino contrario, de sólido a gas, es la **sublimación** (hielo seco, naftalina)." },
      { front: "¿Qué ocurre con la temperatura durante un cambio de estado?", back: "Se mantiene constante: toda la energía suministrada se emplea en romper las fuerzas entre partículas (calor latente), no en aumentar la temperatura." }
    ],
    quiz: [
      { q: "El hielo seco (CO₂ sólido) pasa directamente a gas. Ese cambio de estado se llama:", options: ["Sublimación","Evaporación","Condensación"], correct: 0, explanation: "Va de sólido a gaseoso sin pasar por el estado líquido." },
      { q: "Mientras el agua hierve a 100 °C, su temperatura no sube aunque se siga calentando porque:", options: ["La energía se usa en romper las fuerzas entre las moléculas (calor latente)","El termómetro deja de funcionar","El agua deja de recibir calor"], correct: 0, explanation: "Durante el cambio de estado la energía suministrada no incrementa la energía cinética media." },
      { q: "Las gotas que se forman en el exterior de un vaso frío son resultado de:", options: ["La condensación del vapor de agua del aire","La evaporación del agua del vaso","La sublimación del hielo"], correct: 0, explanation: "El aire cercano se enfría y su vapor pasa a estado líquido." },
      { q: "En el estado gaseoso, las partículas se caracterizan por:", options: ["Estar muy separadas y con fuerzas de atracción casi nulas","Ocupar posiciones fijas","Vibrar sin desplazarse"], correct: 0, explanation: "Por eso los gases se expanden hasta ocupar todo el recipiente." }
    ]
  },
  "5.1.3": {
    flashcards: [
      { front: "¿Quién formuló la ley de la conservación de la materia?", back: "Antoine Lavoisier, en el siglo XVIII: en un sistema cerrado, la masa de los reactivos es igual a la masa de los productos." },
      { front: "¿Por qué parece que una vela pierde masa al quemarse?", back: "Porque el sistema no está cerrado: parte de los productos (CO₂ y vapor de agua) se escapan al aire. Si se pesara todo el sistema, la masa se conservaría." },
      { front: "¿Qué se conserva al balancear una ecuación química?", back: "El número de átomos de cada elemento a ambos lados de la ecuación; solo se ajustan los coeficientes, nunca los subíndices de las fórmulas." }
    ],
    quiz: [
      { q: "Se hacen reaccionar 12 g de carbono con 32 g de oxígeno y se obtiene únicamente dióxido de carbono. ¿Cuánta masa de CO₂ se produce?", options: ["44 g","20 g","32 g"], correct: 0, explanation: "Por conservación de la materia, 12 g + 32 g = 44 g de producto." },
      { q: "En un recipiente cerrado reaccionan 25 g de una sustancia con 40 g de otra. Si se forman 18 g de un producto sólido, ¿cuánta masa tiene el gas producido?", options: ["47 g","65 g","22 g"], correct: 0, explanation: "La masa total es 65 g; al restar los 18 g del sólido quedan 47 g de gas." },
      { q: "Al balancear la ecuación H₂ + O₂ → H₂O, los coeficientes correctos son:", options: ["2, 1 y 2","1, 1 y 1","2, 2 y 2"], correct: 0, explanation: "2H₂ + O₂ → 2H₂O deja 4 hidrógenos y 2 oxígenos de cada lado." },
      { q: "Un trozo de hierro de 56 g se oxida completamente y el óxido resultante pesa 80 g. ¿Cuánto oxígeno se combinó?", options: ["24 g","80 g","136 g"], correct: 0, explanation: "80 g − 56 g = 24 g de oxígeno incorporado del aire." },
      { q: "Para balancear una ecuación química está permitido modificar:", options: ["Los coeficientes que anteceden a cada fórmula","Los subíndices de las fórmulas","Los símbolos de los elementos"], correct: 0, explanation: "Cambiar los subíndices alteraría la identidad de las sustancias." }
    ]
  },
  "5.1.4": {
    leccion: "Tres datos que acompañan a las conversiones de temperatura. Las fórmulas completas son **°F = °C × 9/5 + 32**, **°C = (°F − 32) × 5/9** y **K = °C + 273.15**; nota que el kelvin no lleva el símbolo de grado. El **cero absoluto** es 0 K, equivalente a −273.15 °C: la temperatura mínima teórica, en la que el movimiento térmico de las partículas es mínimo, y que no puede alcanzarse. Y un dato útil para verificar tus conversiones: las escalas Celsius y Fahrenheit **coinciden en −40°**, es decir, −40 °C = −40 °F.",
    flashcards: [
      { front: "Fórmulas de conversión entre escalas termométricas", back: "°F = °C × 9/5 + 32 · °C = (°F − 32) × 5/9 · K = °C + 273.15. El kelvin no lleva el símbolo de grado." },
      { front: "¿A qué temperatura coinciden las escalas Celsius y Fahrenheit?", back: "A −40°: −40 °C = −40 °F. Es un dato útil para verificar que la conversión se hizo bien." }
    ],
    quiz: [
      { q: "Convierte 35 °C a grados Fahrenheit.", options: ["95 °F","63 °F","88 °F"], correct: 0, explanation: "35 × 9/5 = 63; 63 + 32 = 95 °F." },
      { q: "Convierte 77 °F a grados Celsius.", options: ["25 °C","45 °C","20 °C"], correct: 0, explanation: "(77 − 32) × 5/9 = 45 × 5/9 = 25 °C." }
    ]
  },
  "5.1.5": {
    flashcards: [
      { front: "Fórmula de la ley de Coulomb", back: "F = k·q₁·q₂/r², donde k = 9×10⁹ N·m²/C². La fuerza es de atracción si las cargas tienen signos distintos y de repulsión si son iguales." },
      { front: "¿Qué pasa con la fuerza eléctrica si se duplica la distancia?", back: "Se reduce a la cuarta parte, porque depende del inverso del **cuadrado** de la distancia. Al triplicarla, cae a la novena parte." },
      { front: "¿En qué se parecen la ley de Coulomb y la de gravitación universal?", back: "Ambas son inversamente proporcionales al cuadrado de la distancia y directamente proporcionales al producto de las magnitudes (cargas o masas). La eléctrica puede atraer o repeler; la gravitatoria solo atrae." }
    ],
    quiz: [
      { q: "Dos cargas se separan al doble de su distancia original. La fuerza eléctrica entre ellas:", options: ["Se reduce a la cuarta parte","Se reduce a la mitad","Se duplica"], correct: 0, explanation: "F es inversamente proporcional a r²: al duplicar r, la fuerza se divide entre 4." },
      { q: "Dos cargas de 2×10⁻⁶ C y 3×10⁻⁶ C están separadas 0.3 m. ¿Cuál es la fuerza entre ellas? (k = 9×10⁹)", options: ["0.6 N","0.18 N","6 N"], correct: 0, explanation: "F = 9×10⁹ × (6×10⁻¹²) / 0.09 = 0.054/0.09 = 0.6 N." },
      { q: "Si ambas cargas se duplican y la distancia no cambia, la fuerza eléctrica:", options: ["Se cuadruplica","Se duplica","No cambia"], correct: 0, explanation: "F es proporcional al producto de las cargas: 2 × 2 = 4 veces mayor." },
      { q: "Entre una carga positiva y una negativa, la fuerza eléctrica es:", options: ["De atracción","De repulsión","Nula"], correct: 0, explanation: "Cargas de signo contrario se atraen." },
      { q: "Dos cargas iguales de 1×10⁻⁶ C están separadas 1 m. ¿Cuál es la magnitud de la fuerza entre ellas?", options: ["9×10⁻³ N","9×10⁹ N","9×10⁻⁶ N"], correct: 0, explanation: "F = 9×10⁹ × 10⁻¹² / 1 = 9×10⁻³ N." }
    ]
  },
  "5.2.1": {
    flashcards: [
      { front: "¿Cómo se relacionan velocidad, frecuencia y longitud de onda?", back: "c = λ·f. Para la luz en el vacío, c = 3×10⁸ m/s: a mayor frecuencia, menor longitud de onda." },
      { front: "¿Cuál es el orden del espectro visible por energía?", back: "De menor a mayor energía: rojo, naranja, amarillo, verde, azul, violeta. El rojo tiene la mayor longitud de onda (≈700 nm) y el violeta la menor (≈400 nm)." }
    ],
    quiz: [
      { q: "Dentro del espectro visible, el color con mayor longitud de onda es:", options: ["El rojo","El violeta","El verde"], correct: 0, explanation: "El rojo ronda los 700 nm, el extremo superior del visible." },
      { q: "Una luz tiene una frecuencia de 6×10¹⁴ Hz. ¿Cuál es su longitud de onda? (c = 3×10⁸ m/s)", options: ["5×10⁻⁷ m","5×10⁻⁵ m","2×10⁶ m"], correct: 0, explanation: "λ = c/f = 3×10⁸ / 6×10¹⁴ = 5×10⁻⁷ m, es decir 500 nm (luz verde)." },
      { q: "Una hoja se ve verde porque:", options: ["Refleja la luz verde y absorbe el resto de los colores","Emite luz verde propia","Absorbe únicamente la luz verde"], correct: 0, explanation: "El color percibido corresponde a la luz reflejada, no a la absorbida." },
      { q: "La luz ultravioleta es más energética que la visible porque:", options: ["Tiene mayor frecuencia y menor longitud de onda","Viaja más rápido","Tiene mayor longitud de onda"], correct: 0, explanation: "La energía del fotón es proporcional a la frecuencia (E = hf)." },
      { q: "El arcoíris se forma por la:", options: ["Refracción y dispersión de la luz blanca en las gotas de agua","Reflexión total en las nubes","Absorción del color por el aire"], correct: 0, explanation: "Cada longitud de onda se desvía con un ángulo distinto y los colores se separan." }
    ]
  },
  "5.2.2": {
    leccion: "Tres puntos sobre el calor. La fórmula del **calor sensible** es **Q = m·c·ΔT**, masa por calor específico por cambio de temperatura; si ΔT resulta negativo, significa que el cuerpo cedió calor en vez de absorberlo. El **calor específico del agua** es 4,186 J/(kg·°C), o 1 cal/(g·°C), muy alto comparado con el de otras sustancias: por eso el agua modera el clima de las costas y sirve como refrigerante. Y el **equilibrio térmico** es el estado al que llegan dos cuerpos en contacto cuando alcanzan la misma temperatura; en ese intercambio, el calor cedido por el más caliente es igual al absorbido por el más frío.",
    flashcards: [
      { front: "Fórmula del calor sensible", back: "Q = m·c·ΔT: masa por calor específico por cambio de temperatura. Si ΔT es negativo, el cuerpo cede calor." },
      { front: "¿Cuál es el calor específico del agua y por qué importa?", back: "4,186 J/(kg·°C) o 1 cal/(g·°C), muy alto comparado con otras sustancias. Por eso el agua modera el clima costero y sirve como refrigerante." }
    ],
    quiz: [
      { q: "¿Cuánto calor se necesita para elevar 20 °C la temperatura de 2 kg de agua? (c = 4,186 J/kg·°C)", options: ["167,440 J","83,720 J","8,372 J"], correct: 0, explanation: "Q = 2 × 4,186 × 20 = 167,440 J." },
      { q: "Dos cuerpos de la misma masa reciben la misma cantidad de calor. ¿Cuál se calienta más?", options: ["El de menor calor específico","El de mayor calor específico","Ambos por igual"], correct: 0, explanation: "Un calor específico bajo significa que se requiere poca energía por grado, así que ΔT resulta mayor." },
      { q: "Se aplican 9,000 J a 500 g de una sustancia y su temperatura sube 10 °C. ¿Cuál es su calor específico?", options: ["1,800 J/(kg·°C)","180 J/(kg·°C)","450 J/(kg·°C)"], correct: 0, explanation: "c = Q/(m·ΔT) = 9,000/(0.5 × 10) = 1,800 J/(kg·°C)." },
      { q: "El agua modera el clima de las zonas costeras porque:", options: ["Su alto calor específico le permite absorber mucho calor con poco cambio de temperatura","Refleja toda la luz solar","Se evapora instantáneamente"], correct: 0, explanation: "Actúa como un enorme regulador térmico." },
      { q: "¿Cuánto calor cede 1 kg de aluminio al enfriarse 50 °C? (c = 900 J/kg·°C)", options: ["45,000 J","4,500 J","18,000 J"], correct: 0, explanation: "Q = 1 × 900 × 50 = 45,000 J cedidos al entorno." }
    ]
  },
  "5.2.3": {
    leccion: "Tres precisiones sobre los tipos de energía. El **uranio no es renovable**: se agota igual que el carbón, el petróleo y el gas; **renovable** es la fuente que se repone a escala humana, es decir solar, eólica, hidráulica, geotérmica y biomasa. La energía que se libera en la **respiración celular** es **química**, la almacenada en los enlaces de las moléculas, la misma que se libera en la combustión y en las pilas. Y la **eficiencia energética** de un dispositivo es la proporción de energía útil obtenida respecto de la suministrada: nunca llega al 100 %, porque siempre hay pérdidas, casi siempre en forma de calor.",
    flashcards: [
      { front: "¿El uranio es una fuente de energía renovable?", back: "No: se agota, igual que el carbón, el petróleo y el gas. **Renovable** es la que se repone a escala humana: solar, eólica, hidráulica, geotérmica y biomasa." }
    ]
  },
  "5.2.4": {
    flashcards: [
      { front: "Fórmulas de energía cinética y potencial gravitatoria", back: "Ec = ½mv² y Ep = mgh, con g = 9.8 m/s². La cinética depende del **cuadrado** de la velocidad." },
      { front: "Si un cuerpo cae sin fricción, ¿qué pasa con su energía mecánica?", back: "Permanece constante: Em = Ec + Ep, y lo que se pierde de potencial se gana de cinética." },
      { front: "¿Qué pasa con la energía cinética si la velocidad se duplica?", back: "Se cuadruplica, porque depende de v². Por eso la distancia de frenado de un auto crece mucho más rápido que su velocidad." }
    ],
    quiz: [
      { q: "¿Cuál es la energía cinética de un cuerpo de 4 kg que se mueve a 10 m/s?", options: ["200 J","40 J","400 J"], correct: 0, explanation: "Ec = ½(4)(10²) = ½(4)(100) = 200 J." },
      { q: "Un objeto de 5 kg está a 8 m de altura. ¿Cuál es su energía potencial gravitatoria? (g = 9.8 m/s²)", options: ["392 J","40 J","196 J"], correct: 0, explanation: "Ep = mgh = 5 × 9.8 × 8 = 392 J." },
      { q: "Si la velocidad de un auto se duplica, su energía cinética:", options: ["Se cuadruplica","Se duplica","No cambia"], correct: 0, explanation: "Ec depende de v²: (2v)² = 4v²." },
      { q: "Una pelota se suelta desde cierta altura. Justo antes de tocar el suelo:", options: ["Su energía potencial se convirtió casi toda en cinética","Su energía cinética es cero","Su energía mecánica aumentó"], correct: 0, explanation: "Sin fricción apreciable, la energía mecánica se conserva y solo cambia de forma." },
      { q: "¿A qué velocidad se mueve un cuerpo de 2 kg que tiene 100 J de energía cinética?", options: ["10 m/s","50 m/s","5 m/s"], correct: 0, explanation: "100 = ½(2)v² → v² = 100 → v = 10 m/s." }
    ]
  },
  "5.2.5": {
    flashcards: [
      { front: "¿Qué expresa la ecuación ΔU = Q − W?", back: "La primera ley de la termodinámica: el cambio de energía interna es el calor que entra menos el trabajo que hace el sistema. Es la conservación de la energía aplicada al calor." },
      { front: "¿Qué dice la segunda ley de la termodinámica?", back: "El calor fluye espontáneamente del cuerpo caliente al frío y nunca al revés sin trabajo externo. La entropía del universo siempre aumenta." },
      { front: "¿Qué le pasa a la entropía total en cualquier proceso natural?", back: "Aumenta. La entropía mide el desorden o la energía no disponible para hacer trabajo, y todo proceso espontáneo la incrementa en el sistema y su entorno." }
    ],
    quiz: [
      { q: "Que el calor no pase espontáneamente de un cuerpo frío a uno caliente es consecuencia de:", options: ["La segunda ley de la termodinámica","La primera ley","La ley cero"], correct: 0, explanation: "La segunda ley establece la dirección de los procesos térmicos." },
      { q: "Una máquina térmica recibe 800 J y produce 200 J de trabajo útil. ¿Cuál es su eficiencia?", options: ["25 %","40 %","75 %"], correct: 0, explanation: "e = W/Q = 200/800 = 0.25 = 25 %." },
      { q: "La afirmación «la energía no se crea ni se destruye, solo se transforma» corresponde a:", options: ["La primera ley de la termodinámica","La segunda ley","La tercera ley"], correct: 0, explanation: "Es la conservación de la energía aplicada a procesos térmicos." },
      { q: "La entropía de un sistema aislado que evoluciona espontáneamente:", options: ["Aumenta","Disminuye","Permanece siempre igual"], correct: 0, explanation: "Es el enunciado de la segunda ley en términos de entropía." },
      { q: "La ley cero de la termodinámica establece que:", options: ["Si dos cuerpos están en equilibrio térmico con un tercero, lo están entre sí","La energía se conserva","El cero absoluto es inalcanzable"], correct: 0, explanation: "Es el fundamento que permite medir la temperatura con un termómetro." }
    ]
  },
  "5.3.1": {
    flashcards: [
      { front: "Ecuación general de la fotosíntesis", back: "6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂. Los reactivos son dióxido de carbono y agua; los productos, glucosa y oxígeno." },
      { front: "¿Qué ocurre en la fase luminosa y en la fase oscura?", back: "La **luminosa** (tilacoides) capta la luz, produce ATP y NADPH y libera el oxígeno del agua. La **oscura** o ciclo de Calvin (estroma) usa esa energía para fijar el CO₂ y formar glucosa." },
      { front: "¿De dónde proviene el oxígeno liberado en la fotosíntesis?", back: "Del agua, no del dióxido de carbono: la fotólisis rompe la molécula de H₂O y libera O₂." }
    ],
    quiz: [
      { q: "Los reactivos de la fotosíntesis son:", options: ["Dióxido de carbono y agua","Glucosa y oxígeno","Oxígeno y agua"], correct: 0, explanation: "La luz aporta la energía; CO₂ y H₂O son las materias primas." },
      { q: "El oxígeno liberado durante la fotosíntesis proviene de:", options: ["La molécula de agua","El dióxido de carbono","La glucosa"], correct: 0, explanation: "La fotólisis del agua en la fase luminosa libera el O₂." },
      { q: "La fase luminosa de la fotosíntesis ocurre en:", options: ["Los tilacoides del cloroplasto","El estroma","La mitocondria"], correct: 0, explanation: "Ahí se encuentran los fotosistemas con clorofila." },
      { q: "El pigmento que capta la energía luminosa en las plantas es:", options: ["La clorofila","La hemoglobina","La melanina"], correct: 0, explanation: "Absorbe principalmente luz azul y roja y refleja la verde." },
      { q: "En el ciclo de Calvin se produce principalmente:", options: ["Glucosa a partir del CO₂ fijado","Oxígeno","Clorofila"], correct: 0, explanation: "Es la fase de fijación del carbono que forma los azúcares." }
    ]
  },
  "5.3.2": {
    flashcards: [
      { front: "¿Qué dos factores determinan principalmente el tipo de bioma?", back: "La **temperatura** y la **precipitación**. Su combinación explica la vegetación dominante de cada región." },
      { front: "¿Qué caracteriza a la selva tropical?", back: "Alta precipitación y temperatura constante todo el año, la mayor biodiversidad del planeta y suelos pobres porque los nutrientes están en la biomasa, no en el suelo." }
    ],
    quiz: [
      { q: "Los dos factores climáticos que definen un bioma son:", options: ["Temperatura y precipitación","Latitud y longitud","Tipo de suelo y altitud"], correct: 0, explanation: "La combinación de ambos determina qué vegetación puede prosperar." },
      { q: "El bioma con mayor biodiversidad del planeta es:", options: ["La selva tropical húmeda","La tundra","El desierto"], correct: 0, explanation: "El clima cálido y húmedo constante permite una enorme variedad de nichos." },
      { q: "La tundra se caracteriza por:", options: ["Suelo permanentemente congelado (permafrost) y vegetación baja","Árboles de gran altura","Lluvias abundantes todo el año"], correct: 0, explanation: "Las bajas temperaturas impiden el crecimiento de raíces profundas." }
    ]
  },
  "5.3.3": {
    flashcards: [
      { front: "¿Qué es la regla del 10 % en las cadenas tróficas?", back: "Solo alrededor del 10 % de la energía de un nivel pasa al siguiente; el resto se pierde como calor y en procesos metabólicos. Por eso hay pocos niveles tróficos." },
      { front: "¿Por qué una red trófica representa mejor un ecosistema que una cadena?", back: "Porque la mayoría de los organismos se alimenta de varias fuentes: la cadena es una secuencia lineal, la red integra todas las cadenas del ecosistema." },
      { front: "¿Qué papel juegan los descomponedores?", back: "Devuelven al suelo los nutrientes de la materia orgánica muerta, cerrando los ciclos biogeoquímicos. Sin ellos, la materia quedaría inmovilizada." }
    ],
    quiz: [
      { q: "Si los productores de un ecosistema fijan 20,000 kcal, ¿cuánta energía llega aproximadamente a los consumidores secundarios?", options: ["200 kcal","2,000 kcal","20 kcal"], correct: 0, explanation: "10 % pasa a los primarios (2,000) y 10 % de eso a los secundarios: 200 kcal." },
      { q: "En la cadena pasto → conejo → zorro, el conejo es:", options: ["Consumidor primario","Productor","Descomponedor"], correct: 0, explanation: "Se alimenta directamente de los productores." },
      { q: "Los hongos y las bacterias del suelo cumplen la función de:", options: ["Descomponedores que reciclan los nutrientes","Productores primarios","Consumidores terciarios"], correct: 0, explanation: "Transforman la materia orgánica muerta en compuestos inorgánicos reutilizables." },
      { q: "Las pirámides de energía son siempre más anchas en la base porque:", options: ["Solo una fracción pequeña de la energía pasa al nivel superior","Hay más especies grandes","Los productores son más pesados"], correct: 0, explanation: "La pérdida energética en cada transferencia limita el tamaño de los niveles altos." }
    ]
  },
  "5.3.4": {
    flashcards: [
      { front: "¿Cuáles son los reservorios del ciclo del carbono?", back: "La atmósfera (CO₂), los océanos (carbonatos disueltos), la biomasa, el suelo y los combustibles fósiles. La quema de estos últimos libera carbono almacenado durante millones de años." }
    ],
    quiz: [
      { q: "La quema de combustibles fósiles altera principalmente el ciclo:", options: ["Del carbono","Del fósforo","Del calcio"], correct: 0, explanation: "Libera a la atmósfera carbono que estuvo secuestrado durante millones de años." }
    ]
  },
  "5.3.5": {
    flashcards: [
      { front: "¿Qué diferencia hay entre productividad primaria bruta y neta?", back: "La **bruta (PPB)** es toda la energía fijada por los productores; la **neta (PPN)** es lo que queda tras descontar su respiración: PPN = PPB − R. La neta es la disponible para los consumidores." },
      { front: "¿Qué es la productividad secundaria?", back: "La biomasa generada por los consumidores a partir del alimento que ingieren. Siempre es mucho menor que la primaria." },
      { front: "¿Qué ecosistemas tienen la MENOR productividad primaria?", back: "Los desiertos y el océano abierto, por unidad de superficie. En el otro extremo están los arrecifes de coral, los estuarios y las selvas húmedas." }
    ],
    quiz: [
      { q: "Un ecosistema fija 5,000 kcal/m² al año y sus productores gastan 2,000 en respiración. ¿Cuál es la productividad primaria neta?", options: ["3,000 kcal/m²","7,000 kcal/m²","2,000 kcal/m²"], correct: 0, explanation: "PPN = PPB − R = 5,000 − 2,000 = 3,000 kcal/m² al año." },
      { q: "La productividad primaria neta es importante porque representa:", options: ["La energía realmente disponible para los consumidores","La energía total captada por el Sol","La biomasa de los descomponedores"], correct: 0, explanation: "Es la fracción que puede sostener a los niveles tróficos superiores." },
      { q: "¿Cuál de estos ecosistemas tiene la menor productividad primaria por unidad de superficie?", options: ["El desierto","El arrecife de coral","La selva húmeda"], correct: 0, explanation: "La escasez de agua limita severamente la fotosíntesis." },
      { q: "La productividad secundaria corresponde a:", options: ["La biomasa producida por los consumidores","La energía fijada por las plantas","El carbono del suelo"], correct: 0, explanation: "Se refiere a la generación de biomasa animal a partir del alimento consumido." },
      { q: "Si la PPB de un ecosistema es 8,000 kcal/m² y la PPN es 5,600 kcal/m², la respiración de los productores fue:", options: ["2,400 kcal/m²","13,600 kcal/m²","5,600 kcal/m²"], correct: 0, explanation: "R = PPB − PPN = 8,000 − 5,600 = 2,400 kcal/m²." }
    ]
  },
  "5.3.6": {
    flashcards: [
      { front: "¿Cuáles son los cuatro tipos de servicios ambientales?", back: "**Provisión** (alimentos, agua, madera), **regulación** (clima, polinización, control de inundaciones), **culturales** (recreación, valor espiritual) y **soporte** (formación de suelo, ciclo de nutrientes)." }
    ],
    quiz: [
      { q: "La obtención de madera y alimentos de un ecosistema corresponde a servicios de:", options: ["Provisión","Soporte","Regulación"], correct: 0, explanation: "Son bienes materiales que el ecosistema aporta directamente." },
      { q: "El valor recreativo y espiritual de un área natural protegida es un servicio:", options: ["Cultural","De soporte","De provisión"], correct: 0, explanation: "Los beneficios no materiales se clasifican como culturales." },
      { q: "La formación del suelo y el ciclo de nutrientes son servicios de:", options: ["Soporte, porque hacen posibles a todos los demás","Provisión","Cultural"], correct: 0, explanation: "Son procesos básicos de los que dependen los otros servicios." }
    ]
  },
  "5.3.7": {
    leccion: "Tres consecuencias del desequilibrio ecológico que conviene distinguir. Una **especie invasora** es la que se introduce fuera de su área natural, se establece y desplaza a las nativas al no tener depredadores locales: es una de las principales causas de pérdida de biodiversidad. El **efecto invernadero** es un fenómeno **natural** que mantiene habitable la Tierra, mientras que el **calentamiento global** es su intensificación por el aumento de gases de origen humano; el examen suele probar precisamente esa diferencia. Y la **acidificación de los océanos** es el descenso del pH marino por la absorción del CO₂ atmosférico, que dificulta la formación de conchas y esqueletos de carbonato de calcio en corales y moluscos.",
    flashcards: [
      { front: "¿Qué es una especie invasora y por qué es un problema?", back: "Una especie introducida fuera de su área natural que se establece y desplaza a las nativas al carecer de depredadores locales. Es una de las principales causas de pérdida de biodiversidad." },
      { front: "¿Qué diferencia hay entre el efecto invernadero y el calentamiento global?", back: "El **efecto invernadero** es un fenómeno natural que mantiene habitable la Tierra; el **calentamiento global** es su intensificación por el aumento de gases de origen humano." },
      { front: "¿Qué es la acidificación de los océanos?", back: "El descenso del pH marino por la absorción del CO₂ atmosférico. Dificulta la formación de conchas y esqueletos de carbonato de calcio en corales y moluscos." }
    ],
    quiz: [
      { q: "La introducción de una especie exótica en un ecosistema suele provocar:", options: ["El desplazamiento de especies nativas por competencia o depredación","Un aumento de la biodiversidad nativa","La mejora del suelo"], correct: 0, explanation: "Sin depredadores naturales, la invasora se expande a costa de las especies locales." },
      { q: "El aumento de la concentración de CO₂ atmosférico produce:", options: ["La intensificación del efecto invernadero y el calentamiento global","El adelgazamiento de la capa de ozono","La lluvia ácida"], correct: 0, explanation: "El CO₂ retiene la radiación infrarroja emitida por la superficie terrestre." },
      { q: "La lluvia ácida se origina principalmente por:", options: ["Emisiones de óxidos de azufre y nitrógeno de la industria y los vehículos","El exceso de oxígeno","La deforestación de selvas"], correct: 0, explanation: "Esos óxidos forman ácidos al reaccionar con el vapor de agua atmosférico." },
      { q: "El deterioro de la capa de ozono fue causado sobre todo por:", options: ["Los clorofluorocarbonos (CFC)","El dióxido de carbono","El metano"], correct: 0, explanation: "El Protocolo de Montreal prohibió los CFC y la capa comenzó a recuperarse." },
      { q: "La fragmentación de hábitats afecta a la fauna porque:", options: ["Aísla poblaciones, reduce su variabilidad genética y dificulta su reproducción","Aumenta el alimento disponible","Mejora la calidad del agua"], correct: 0, explanation: "Las poblaciones pequeñas y aisladas son mucho más vulnerables a la extinción." }
    ]
  },
  "5.4.1": {
    flashcards: [
      { front: "¿Qué es un mol y cuánto vale el número de Avogadro?", back: "Un mol es la cantidad de sustancia que contiene 6.022×10²³ partículas. La masa de un mol en gramos coincide con la masa molar." },
      { front: "¿Cuál es la masa molar del H₂SO₄?", back: "98 g/mol: 2(1) + 32 + 4(16), sumando las masas atómicas de todos los átomos de la fórmula." },
      { front: "Fórmula para convertir gramos en moles", back: "n = m / M (masa entre masa molar). Y para obtener partículas: N = n × 6.022×10²³." }
    ],
    quiz: [
      { q: "¿Cuál es la masa molar del agua (H₂O)? (H = 1, O = 16)", options: ["18 g/mol","17 g/mol","20 g/mol"], correct: 0, explanation: "2(1) + 16 = 18 g/mol." },
      { q: "¿Cuál es la masa molar del ácido sulfúrico (H₂SO₄)? (H = 1, S = 32, O = 16)", options: ["98 g/mol","82 g/mol","114 g/mol"], correct: 0, explanation: "2(1) + 32 + 4(16) = 2 + 32 + 64 = 98 g/mol." },
      { q: "¿Cuántos moles hay en 88 g de dióxido de carbono? (masa molar del CO₂ = 44 g/mol)", options: ["2 moles","4 moles","0.5 moles"], correct: 0, explanation: "n = 88/44 = 2 moles." },
      { q: "¿Cuál es la masa molar del carbonato de calcio (CaCO₃)? (Ca = 40, C = 12, O = 16)", options: ["100 g/mol","68 g/mol","88 g/mol"], correct: 0, explanation: "40 + 12 + 3(16) = 40 + 12 + 48 = 100 g/mol." },
      { q: "¿Cuántas moléculas hay en 2 moles de cualquier sustancia?", options: ["1.2044×10²⁴","6.022×10²³","3.011×10²³"], correct: 0, explanation: "2 × 6.022×10²³ = 1.2044×10²⁴ moléculas." }
    ]
  },
  "5.4.2": {
    quiz: [
      { q: "La reacción 2H₂O → 2H₂ + O₂ es de tipo:", options: ["Descomposición","Síntesis","Neutralización"], correct: 0, explanation: "Una sola sustancia se separa en dos más simples." }
    ]
  },
  "5.4.3": {
    leccion: "Tres puntos sobre reacciones nucleares y radiactividad. La **fisión** parte un núcleo pesado (uranio, plutonio) en núcleos menores, mientras que la **fusión** une núcleos ligeros (hidrógeno) para formar uno mayor; la fusión libera más energía por unidad de masa y es la del Sol. La **vida media** de un isótopo radiactivo es el tiempo que tarda en desintegrarse la mitad de los núcleos de una muestra, y es constante e independiente de la cantidad inicial. Las **radiaciones** se ordenan por su poder de penetración: **alfa** son núcleos de helio y los detiene una hoja de papel; **beta** son electrones y los detiene una lámina de aluminio; **gamma** son ondas electromagnéticas de altísima energía y requieren plomo o concreto.",
    flashcards: [
      { front: "¿Qué diferencia hay entre fisión y fusión nuclear?", back: "La **fisión** parte un núcleo pesado (uranio, plutonio) en núcleos menores; la **fusión** une núcleos ligeros (hidrógeno) para formar uno mayor. La fusión libera más energía por unidad de masa." }
    ],
    quiz: [
      { q: "La energía que produce el Sol proviene de:", options: ["La fusión nuclear del hidrógeno en helio","La fisión del uranio","La combustión del hidrógeno"], correct: 0, explanation: "En el núcleo solar los protones se fusionan liberando enormes cantidades de energía." },
      { q: "Las centrales nucleares actuales funcionan mediante:", options: ["Fisión de núcleos pesados como el uranio","Fusión de hidrógeno","Combustión de carbón enriquecido"], correct: 0, explanation: "La fusión controlada aún no es viable comercialmente." }
    ]
  },
  "5.5.1": {
    flashcards: [
      { front: "¿Qué se conserva en cada tipo de choque?", back: "En **ambos** se conserva el momento lineal. La energía cinética solo se conserva en el choque **elástico**; en el inelástico parte se convierte en calor, sonido y deformación." },
      { front: "¿Qué es un choque perfectamente inelástico?", back: "Aquel en que los cuerpos quedan unidos después del impacto y se mueven con una sola velocidad común. Es donde más energía cinética se pierde." },
      { front: "Un choque con zonas de deformación, ¿es más elástico o más inelástico?", back: "Más inelástico: al deformarse absorben energía y alargan el tiempo del impacto, lo que reduce la fuerza sobre los ocupantes." }
    ],
    quiz: [
      { q: "En un choque perfectamente inelástico, los cuerpos:", options: ["Quedan unidos y se mueven con una velocidad común","Rebotan conservando toda su energía cinética","Se detienen siempre por completo"], correct: 0, explanation: "La unión tras el impacto es la característica que lo define." },
      { q: "¿Qué magnitud se conserva en todos los tipos de choque?", options: ["El momento lineal","La energía cinética","La velocidad de cada cuerpo"], correct: 0, explanation: "La conservación del momento se cumple siempre que no haya fuerzas externas netas." },
      { q: "Un carrito de 2 kg a 3 m/s choca y queda unido a otro de 1 kg en reposo. ¿Cuál es la velocidad final del conjunto?", options: ["2 m/s","3 m/s","1.5 m/s"], correct: 0, explanation: "p = 2(3) = 6 kg·m/s; al repartirse entre 3 kg: v = 6/3 = 2 m/s." },
      { q: "En un choque elástico entre dos bolas de billar:", options: ["Se conservan el momento lineal y la energía cinética","Solo se conserva la energía cinética","No se conserva nada"], correct: 0, explanation: "Es la definición de choque elástico, muy bien aproximada por las bolas de billar." },
      { q: "La energía cinética que se pierde en un choque inelástico se transforma principalmente en:", options: ["Calor, sonido y deformación de los cuerpos","Momento lineal adicional","Energía potencial gravitatoria"], correct: 0, explanation: "La energía no desaparece: cambia a formas no mecánicas." }
    ]
  },
  "5.5.2": {
    flashcards: [
      { front: "¿Qué es el momento lineal y en qué unidades se mide?", back: "p = m·v, el producto de la masa por la velocidad. Se mide en kg·m/s y es una magnitud vectorial: tiene la misma dirección que la velocidad." },
      { front: "¿Por qué un airbag reduce la fuerza del impacto?", back: "Porque alarga el tiempo de contacto. Como I = F·Δt = Δp, si el cambio de momento es el mismo y Δt crece, la fuerza baja." },
      { front: "¿Cuándo se conserva el momento lineal de un sistema?", back: "Siempre que la suma de las fuerzas externas sea cero. Por eso funciona en choques y explosiones aisladas." }
    ],
    quiz: [
      { q: "¿Cuál es el momento lineal de un cuerpo de 6 kg que se mueve a 4 m/s?", options: ["24 kg·m/s","10 kg·m/s","1.5 kg·m/s"], correct: 0, explanation: "p = mv = 6 × 4 = 24 kg·m/s." },
      { q: "Una pelota de 0.5 kg cambia su velocidad de 0 a 20 m/s en 0.1 s. ¿Qué fuerza media actuó sobre ella?", options: ["100 N","10 N","1,000 N"], correct: 0, explanation: "F = Δp/Δt = (0.5 × 20)/0.1 = 10/0.1 = 100 N." },
      { q: "La bolsa de aire de un automóvil reduce las lesiones porque:", options: ["Aumenta el tiempo del impacto y con ello disminuye la fuerza","Reduce el momento lineal del pasajero a la mitad","Elimina la energía cinética"], correct: 0, explanation: "Con el mismo cambio de momento, un Δt mayor implica una fuerza menor." },
      { q: "Un objeto de 3 kg tiene un momento lineal de 45 kg·m/s. ¿Cuál es su velocidad?", options: ["15 m/s","135 m/s","48 m/s"], correct: 0, explanation: "v = p/m = 45/3 = 15 m/s." },
      { q: "El momento lineal es una magnitud vectorial, lo que significa que:", options: ["Tiene magnitud y dirección, la misma de la velocidad","Solo tiene magnitud","Siempre es positivo"], correct: 0, explanation: "Por eso en un choque frontal los momentos de signo contrario se restan." }
    ]
  },
  "5.5.3": {
    flashcards: [
      { front: "¿Cuál es el orden del espectro electromagnético por energía?", back: "De menor a mayor: radio, microondas, infrarrojo, visible, ultravioleta, rayos X y rayos gamma. Todas viajan a 3×10⁸ m/s en el vacío." },
      { front: "¿Qué diferencia hay entre radiación ionizante y no ionizante?", back: "La **ionizante** (UV extremo, rayos X, gamma) tiene energía suficiente para arrancar electrones y dañar el ADN; la **no ionizante** (radio, microondas, infrarrojo) no lo hace." },
      { front: "¿Cómo funciona un horno de microondas?", back: "Emite microondas de una frecuencia que hace rotar las moléculas de agua del alimento; esa agitación se traduce en calor desde el interior." }
    ],
    quiz: [
      { q: "Las ondas de radio se caracterizan porque:", options: ["Tienen la mayor longitud de onda y la menor energía del espectro","Son las más energéticas","Solo viajan por medios materiales"], correct: 0, explanation: "Ocupan el extremo de baja frecuencia del espectro electromagnético." },
      { q: "El control remoto de un televisor funciona con radiación:", options: ["Infrarroja","Ultravioleta","De rayos X"], correct: 0, explanation: "Emite pulsos infrarrojos que el receptor decodifica." },
      { q: "Las radiografías médicas emplean:", options: ["Rayos X, que atraviesan tejidos blandos pero no los huesos","Ondas de radio","Luz visible intensa"], correct: 0, explanation: "La distinta absorción entre hueso y tejido produce la imagen." },
      { q: "Una onda electromagnética tiene una longitud de 3 m. ¿Cuál es su frecuencia? (c = 3×10⁸ m/s)", options: ["1×10⁸ Hz","9×10⁸ Hz","1×10⁻⁸ Hz"], correct: 0, explanation: "f = c/λ = 3×10⁸ / 3 = 1×10⁸ Hz (100 MHz, banda de FM)." },
      { q: "El bloqueador solar protege principalmente de la radiación:", options: ["Ultravioleta","Infrarroja","De microondas"], correct: 0, explanation: "La radiación UV es la que daña el ADN de las células de la piel." }
    ]
  },
  "5.5.4": {
    flashcards: [
      { front: "Fórmulas de la caída libre", back: "v = g·t · h = ½g·t² · v² = 2g·h, con g = 9.8 m/s² (a veces se aproxima a 10). Se parte del reposo y se desprecia la resistencia del aire." },
      { front: "¿De qué depende el tiempo de caída de un objeto en el vacío?", back: "Solo de la altura y de la gravedad, nunca de la masa. En el vacío, una pluma y un martillo caen exactamente igual." }
    ],
    quiz: [
      { q: "Un objeto se deja caer desde el reposo. ¿Qué velocidad lleva a los 3 segundos? (g = 9.8 m/s²)", options: ["29.4 m/s","9.8 m/s","44.1 m/s"], correct: 0, explanation: "v = gt = 9.8 × 3 = 29.4 m/s." },
      { q: "¿Desde qué altura cayó un objeto que tardó 2 segundos en llegar al suelo? (g = 9.8 m/s²)", options: ["19.6 m","9.8 m","39.2 m"], correct: 0, explanation: "h = ½gt² = ½(9.8)(4) = 19.6 m." },
      { q: "En el vacío, una pluma y una piedra soltadas desde la misma altura:", options: ["Llegan al suelo al mismo tiempo","La piedra llega primero","La pluma llega primero"], correct: 0, explanation: "Sin resistencia del aire, la aceleración es igual para todas las masas." },
      { q: "¿Qué velocidad lleva al llegar al suelo un objeto soltado desde 45 m? (usa g = 10 m/s²)", options: ["30 m/s","45 m/s","22.5 m/s"], correct: 0, explanation: "v² = 2gh = 2(10)(45) = 900, así que v = 30 m/s." }
    ]
  },
  "5.6.1": {
    flashcards: [
      { front: "¿Qué diferencia hay entre célula procariota y eucariota?", back: "La **procariota** (bacterias) no tiene núcleo definido ni organelos membranosos; la **eucariota** (animales, plantas, hongos, protistas) tiene núcleo con envoltura y organelos especializados." },
      { front: "¿Qué organelos tiene la célula vegetal que no tiene la animal?", back: "Pared celular de celulosa, cloroplastos y una gran vacuola central. La célula animal, en cambio, tiene centriolos y lisosomas más abundantes." },
      { front: "¿Cuál es la función del retículo endoplásmico y del aparato de Golgi?", back: "El **retículo rugoso** sintetiza proteínas (tiene ribosomas) y el **liso**, lípidos. El **Golgi** las modifica, empaqueta y distribuye dentro o fuera de la célula." }
    ],
    quiz: [
      { q: "El organelo donde ocurre la respiración celular y se produce ATP es:", options: ["La mitocondria","El ribosoma","El lisosoma"], correct: 0, explanation: "Se le llama la central energética de la célula." },
      { q: "Los ribosomas son responsables de:", options: ["La síntesis de proteínas","La digestión celular","La fotosíntesis"], correct: 0, explanation: "Traducen el ARN mensajero en cadenas de aminoácidos." },
      { q: "La estructura que da rigidez a la célula vegetal y falta en la animal es:", options: ["La pared celular de celulosa","La membrana plasmática","El núcleo"], correct: 0, explanation: "La membrana está en ambas; la pared es exclusiva de plantas, hongos y algunas bacterias." },
      { q: "Los lisosomas contienen enzimas digestivas cuya función es:", options: ["Degradar sustancias y organelos dañados","Producir energía","Sintetizar lípidos"], correct: 0, explanation: "Son el sistema de reciclaje y digestión intracelular." },
      { q: "Una bacteria es una célula procariota porque:", options: ["Su material genético no está separado por una envoltura nuclear","No tiene ADN","Carece de membrana plasmática"], correct: 0, explanation: "El ADN se encuentra en el nucleoide, sin membrana que lo delimite." }
    ]
  },
  "5.6.2": {
    flashcards: [
      { front: "¿Cuál es el orden de los niveles de organización biológica?", back: "Átomo → molécula → organelo → célula → tejido → órgano → sistema → organismo → población → comunidad → ecosistema → bioma → biosfera." },
      { front: "¿Qué nivel sigue a la comunidad en la organización ecológica?", back: "El **ecosistema**: la comunidad —todas las poblaciones de distintas especies que conviven en un área— más el ambiente físico que las rodea." },
      { front: "¿Qué añade el ecosistema respecto de la comunidad?", back: "Los factores abióticos: suelo, agua, temperatura, luz. Ecosistema = comunidad (bióticos) + medio físico (abióticos)." }
    ],
    quiz: [
      { q: "El conjunto de todos los venados de un bosque constituye:", options: ["Una población","Una comunidad","Un ecosistema"], correct: 0, explanation: "Es un grupo de individuos de la misma especie en un mismo lugar." },
      { q: "Todos los seres vivos de una laguna, incluidos peces, algas y bacterias, forman:", options: ["Una comunidad","Una población","Un bioma"], correct: 0, explanation: "La comunidad integra a todas las poblaciones que conviven en el área." },
      { q: "El nivel de organización inmediatamente superior a la célula es:", options: ["El tejido","El órgano","El organelo"], correct: 0, explanation: "Un tejido es un conjunto de células semejantes con la misma función." },
      { q: "El corazón corresponde al nivel de organización de:", options: ["Órgano","Tejido","Sistema"], correct: 0, explanation: "Está formado por varios tejidos que en conjunto cumplen una función." },
      { q: "La diferencia esencial entre comunidad y ecosistema es que el ecosistema:", options: ["Incluye además los factores abióticos del medio","Solo tiene una especie","Es de menor tamaño"], correct: 0, explanation: "Suelo, agua, luz y temperatura forman parte del ecosistema, no de la comunidad." }
    ]
  },
  "5.6.3": {
    flashcards: [
      { front: "¿Cuáles son las etapas de la respiración celular aeróbica?", back: "**Glucólisis** (citoplasma), **ciclo de Krebs** (matriz mitocondrial) y **cadena transportadora de electrones** con fosforilación oxidativa (crestas mitocondriales)." },
      { front: "¿Cuánto ATP produce la respiración aeróbica frente a la anaeróbica?", back: "Hasta unas 36-38 moléculas de ATP por glucosa en la aeróbica, contra solo 2 en la fermentación. Por eso el oxígeno es tan ventajoso." }
    ],
    quiz: [
      { q: "La glucólisis se lleva a cabo en:", options: ["El citoplasma","La matriz mitocondrial","El núcleo"], correct: 0, explanation: "Es la única etapa que ocurre fuera de la mitocondria y no requiere oxígeno." },
      { q: "El mayor rendimiento de ATP en la respiración celular se obtiene en:", options: ["La cadena transportadora de electrones","La glucólisis","El ciclo de Krebs"], correct: 0, explanation: "La fosforilación oxidativa produce la gran mayoría del ATP." },
      { q: "El ardor muscular durante un esfuerzo intenso se asocia con:", options: ["La fermentación láctica por falta de oxígeno suficiente","La fotosíntesis muscular","El exceso de ATP"], correct: 0, explanation: "Al no bastar el oxígeno, la célula recurre a la vía anaeróbica." },
      { q: "Los productos finales de la respiración celular aeróbica son:", options: ["Dióxido de carbono, agua y ATP","Glucosa y oxígeno","Etanol y CO₂"], correct: 0, explanation: "Es prácticamente el proceso inverso de la fotosíntesis." }
    ]
  },
  "5.7.1": {
    flashcards: [
      { front: "¿Cuál es la ventaja evolutiva de la reproducción sexual?", back: "Genera variabilidad genética por recombinación, lo que permite a la población adaptarse a cambios ambientales y resistir enfermedades." },
      { front: "¿Cuáles son las formas de reproducción asexual?", back: "Bipartición, gemación (levaduras, hidra), esporulación (hongos, helechos), fragmentación (estrella de mar) y reproducción vegetativa (estolones, tubérculos, esquejes)." },
      { front: "¿Qué diferencia hay entre mitosis y meiosis?", back: "La **mitosis** produce dos células idénticas con el mismo número de cromosomas (crecimiento y reparación); la **meiosis** produce cuatro gametos con la mitad de cromosomas y con recombinación." }
    ],
    quiz: [
      { q: "La principal ventaja de la reproducción sexual es:", options: ["La variabilidad genética de la descendencia","La rapidez del proceso","No requerir pareja"], correct: 0, explanation: "La recombinación aumenta las probabilidades de adaptación ante cambios del ambiente." },
      { q: "Una planta que se propaga por estolones se reproduce de manera:", options: ["Asexual (vegetativa)","Sexual","Por polinización cruzada"], correct: 0, explanation: "La descendencia es genéticamente idéntica a la planta madre." },
      { q: "La meiosis se distingue de la mitosis porque:", options: ["Reduce a la mitad el número de cromosomas y genera variabilidad","Produce células idénticas","Ocurre en todas las células del cuerpo"], correct: 0, explanation: "Es indispensable para que al unirse los gametos se restablezca el número diploide." },
      { q: "La bipartición es una forma de reproducción típica de:", options: ["Las bacterias","Los mamíferos","Las aves"], correct: 0, explanation: "La célula duplica su material genético y se divide en dos células idénticas." },
      { q: "Una desventaja de la reproducción asexual es que:", options: ["La falta de variabilidad hace vulnerable a toda la población ante una misma amenaza","Requiere mucha energía","Produce pocos descendientes"], correct: 0, explanation: "Al ser clones, una plaga o enfermedad puede afectar a todos por igual." }
    ]
  },
  "5.7.2": {
    flashcards: [
      { front: "¿Cómo se clasifican los cromosomas por la posición del centrómero?", back: "**Metacéntrico** (al centro, brazos iguales), **submetacéntrico** (ligeramente desplazado), **acrocéntrico** (cerca de un extremo) y **telocéntrico** (en el extremo)." },
      { front: "¿Cuántos cromosomas tiene la especie humana?", back: "46 en total: 23 pares. De ellos, 22 pares son autosomas y un par son cromosomas sexuales (XX en mujeres, XY en hombres)." },
      { front: "¿Qué alteraciones permite detectar un cariotipo?", back: "Alteraciones numéricas o estructurales, como la trisomía 21. Es el conjunto ordenado de los cromosomas de una célula por tamaño y forma." }
    ],
    quiz: [
      { q: "Un cromosoma con el centrómero exactamente en el centro se clasifica como:", options: ["Metacéntrico","Acrocéntrico","Telocéntrico"], correct: 0, explanation: "Los dos brazos resultan de igual longitud." },
      { q: "En la especie humana, los cromosomas sexuales de una mujer son:", options: ["XX","XY","YY"], correct: 0, explanation: "El par 23 determina el sexo cromosómico: XX femenino y XY masculino." },
      { q: "Los cromosomas que no son sexuales se llaman:", options: ["Autosomas","Gametos","Alelos"], correct: 0, explanation: "En humanos son los 22 primeros pares." },
      { q: "El estudio ordenado de los cromosomas de una persona se denomina:", options: ["Cariotipo","Genotipo","Fenotipo"], correct: 0, explanation: "Permite identificar alteraciones cromosómicas numéricas y estructurales." }
    ]
  },
  "5.7.3": {
    flashcards: [
      { front: "Un individuo AA y uno Aa, ¿se ven igual?", back: "Sí, si A es dominante: tienen distinto **genotipo** (la combinación de alelos) pero el mismo **fenotipo**, que es la característica observable." },
      { front: "¿Qué proporciones da el cruce Aa × Aa?", back: "Genotípica 1:2:1 (25 % AA, 50 % Aa, 25 % aa) y fenotípica 3:1 (75 % dominante, 25 % recesivo)." },
      { front: "¿Cómo se averigua si un individuo de fenotipo dominante es AA o Aa?", back: "Con un cruce de prueba: se cruza con un homocigoto recesivo (aa). Si aparece descendencia recesiva, era heterocigoto." }
    ],
    quiz: [
      { q: "En el cruce Aa × Aa, ¿qué porcentaje de la descendencia presenta el fenotipo recesivo?", options: ["25 %","50 %","75 %"], correct: 0, explanation: "Solo el genotipo aa expresa el carácter recesivo: 1 de cada 4." },
      { q: "En el cruce Aa × aa, ¿qué proporción de la descendencia será heterocigota?", options: ["50 %","25 %","100 %"], correct: 0, explanation: "La mitad recibe el alelo A del progenitor heterocigoto y resulta Aa." },
      { q: "Del cruce AA × aa se obtiene una descendencia:", options: ["100 % heterocigota con fenotipo dominante","50 % dominante y 50 % recesiva","100 % recesiva"], correct: 0, explanation: "Todos los descendientes reciben un alelo de cada progenitor: Aa." },
      { q: "Dos padres de ojos cafés (Aa) tienen un hijo de ojos azules (aa). Esto indica que:", options: ["Ambos padres son portadores del alelo recesivo","Hubo una mutación nueva","El carácter no es hereditario"], correct: 0, explanation: "El hijo recibió un alelo recesivo de cada progenitor heterocigoto." },
      { q: "En el cruce Aa × Aa, la probabilidad de obtener un individuo homocigoto dominante es:", options: ["1/4","1/2","3/4"], correct: 0, explanation: "Solo una de las cuatro combinaciones del cuadro de Punnett es AA." }
    ]
  },
  "5.7.4": {
    flashcards: [
      { front: "¿Qué proponía Lamarck y por qué se descartó?", back: "La herencia de los caracteres adquiridos: el uso o desuso de un órgano modificaría a la descendencia. Se descartó porque los cambios somáticos no se transmiten a los gametos." },
      { front: "¿Cuáles son los puntos centrales de la teoría de Darwin?", back: "Hay variación entre individuos, se producen más descendientes de los que sobreviven y los mejor adaptados dejan más descendencia: selección natural." }
    ],
    quiz: [
      { q: "La explicación de que las jirafas tienen cuello largo porque sus ancestros lo estiraban corresponde a:", options: ["Lamarck","Darwin","Mendel"], correct: 0, explanation: "Es el ejemplo clásico de la herencia de los caracteres adquiridos." },
      { q: "Según la selección natural, sobreviven y se reproducen más:", options: ["Los individuos con variaciones ventajosas en ese ambiente","Los más grandes siempre","Los que más se esfuerzan"], correct: 0, explanation: "La ventaja es relativa al ambiente concreto, no una superioridad absoluta." },
      { q: "La fuente última de variación genética en las poblaciones es:", options: ["La mutación","La selección natural","El uso de los órganos"], correct: 0, explanation: "La selección actúa sobre la variación, pero no la crea." },
      { q: "La resistencia de las bacterias a los antibióticos es una prueba de la evolución porque:", options: ["Las variantes resistentes sobreviven y se multiplican bajo la presión del antibiótico","Las bacterias deciden volverse resistentes","El antibiótico crea la resistencia"], correct: 0, explanation: "Es selección natural observable en tiempo real." }
    ]
  },
  "5.7.5": {
    leccion: "Tres procesos evolutivos que se preguntan por su nombre. La **especiación** es el proceso por el que una población se divide y, tras acumular diferencias, sus miembros dejan de poder reproducirse entre sí; la **alopátrica** es la que ocurre por aislamiento geográfico. Las **estructuras homólogas** comparten origen embrionario aunque tengan distinta función (brazo humano y ala de murciélago), mientras que las **análogas** comparten función pero no origen (ala de insecto y ala de ave). Y la **convergencia evolutiva** es que especies no emparentadas desarrollen rasgos semejantes al enfrentar presiones ambientales parecidas, como la forma hidrodinámica del tiburón y del delfín.",
    flashcards: [
      { front: "¿Qué diferencia hay entre estructuras homólogas y análogas?", back: "Las **homólogas** tienen el mismo origen embrionario aunque distinta función (brazo humano y ala de murciélago); las **análogas** tienen la misma función pero distinto origen (ala de insecto y de ave)." },
      { front: "¿Qué es la convergencia evolutiva?", back: "Que especies no emparentadas desarrollen rasgos semejantes al enfrentar presiones ambientales parecidas, como la forma hidrodinámica del tiburón y del delfín." }
    ],
    quiz: [
      { q: "El brazo humano, el ala de un murciélago y la aleta de una ballena son estructuras:", options: ["Homólogas, porque comparten el mismo origen embrionario","Análogas","Vestigiales"], correct: 0, explanation: "El mismo plan óseo adaptado a funciones distintas evidencia el ancestro común." },
      { q: "El ala de un insecto y el ala de un ave son estructuras:", options: ["Análogas, con la misma función pero distinto origen","Homólogas","Idénticas"], correct: 0, explanation: "Ejemplifican la convergencia evolutiva, no el parentesco." },
      { q: "La forma corporal semejante del tiburón (pez) y el delfín (mamífero) se explica por:", options: ["Convergencia evolutiva ante presiones ambientales similares","Parentesco cercano","Herencia de caracteres adquiridos"], correct: 0, explanation: "El medio acuático favorece la misma solución hidrodinámica en linajes distintos." }
    ]
  }
};
