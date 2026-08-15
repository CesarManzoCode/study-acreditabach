/* ============================================================
   Decisiones de poda · qué sale del temario y por qué

   Regla única que se aplicó tema por tema:

     ¿Un redactor de reactivos del Ceneval, leyendo SOLO la orientación
     oficial de este tema, podría escribir este reactivo?

   Si la respuesta es no, el ítem sale. No se juzga si el contenido es
   interesante ni si «podría venir»: se juzga contra la orientación que la
   guía imprime para ese tema (Ceneval, junio 2026, pp. 11-20).

   Las capas `extra/` y `extra2/` se escribieron para agregar volumen, sin
   cotejar contra la guía; de ahí sale casi todo lo que se poda. La capa
   base (data/areaN.js) NO se toca: nació calcada de la guía y sigue siendo
   la referencia.

   Etiquetas: A = data/extra/*.js · B = data/extra2/*.js
              f = flashcard · q = reactivo · el número es su posición.
   ============================================================ */

module.exports = {
  /* ---------- Área 1 · Pensamiento matemático ---------- */
  // 1.1.1 orientación: variables cuantitativas, cualitativas y categóricas.
  "1.1.1": { drop: ["Bf0", "Bf1", "Bq0", "Bq1"], razon: "Las escalas de intervalo y razón y el par independiente/dependiente son otra clasificación; la orientación evalúa cuantitativa/cualitativa/categórica." },

  // 1.1.2 orientación: muestreos sistemáticos, estratificados y por conglomerados.
  "1.1.2": {
    drop: ["Af1", "Aq0", "Aq2", "Bf0", "Bf1", "Bf2", "Bq0", "Bq2", "Bq3"],
    razon: "La orientación nombra tres muestreos. Los reactivos cuya respuesta correcta era «aleatorio simple» o «por conveniencia» no pueden salir así en el examen, y sesgo, población/muestra y error de estimación no están en la orientación.",
    backfill: "El muestreo por conglomerados se queda casi sin reactivos."
  },

  // 1.1.3 orientación: cálculo de media, mediana y moda.
  "1.1.3": { drop: ["Bf1"], razon: "El cuartil no es una medida de tendencia central." },

  // 1.1.4 orientación: varianza y desviación estándar.
  "1.1.4": { drop: ["Af0", "Aq2", "Bf0", "Bf1", "Bq1", "Bq4"], razon: "La orientación nombra dos medidas. Rango, rango intercuartílico y coeficiente de variación quedan fuera." },

  // 1.2.2 orientación: cálculo de la probabilidad simple de un evento.
  "1.2.2": { drop: ["Bf1", "Bf2", "Bq2", "Bq4"], razon: "La regla de la suma para eventos compuestos y la probabilidad frecuencial exceden el cálculo de la probabilidad simple." },

  // 1.3.1 orientación: relación entre dos variables cuantitativas en expresiones algebraicas.
  "1.3.1": { drop: ["Aq2", "Bf1", "Bf2", "Bq1", "Bq2"], razon: "Grado del polinomio, términos semejantes y evaluación numérica no son la relación entre dos variables." },

  // 1.3.2 orientación: expresiones factorizadas de polinomios de SEGUNDO grado.
  "1.3.2": { drop: ["Bq2"], razon: "6a³ − 12a² es de tercer grado; la orientación acota a polinomios de segundo grado." },

  // 1.3.3 orientación: valores de optimización de funciones polinomiales de segundo grado.
  "1.3.3": { drop: ["Af1", "Bf0", "Bq4"], razon: "El binomio al cubo es de tercer grado y no interviene en completar el cuadrado." },

  // 1.4.3 orientación: razón aritmética o geométrica de una SUCESIÓN numérica.
  "1.4.3": {
    drop: ["Af1", "Aq0", "Aq1", "Aq2", "Bf1", "Bf2", "Bq0", "Bq2", "Bq4"],
    razon: "El paquete confundió «razón» con «proporción»: casi todos los reactivos eran regla de tres, que es el tema 1.4.4. La orientación pide la razón de una sucesión.",
    backfill: "Las sucesiones aritméticas y geométricas, que es lo que la orientación pide, no tienen prácticamente reactivos."
  },

  // 1.5.1 orientación: área de triángulos y trapecios.
  "1.5.1": {
    drop: ["Af1", "Aq0", "Aq1", "Aq2", "Bf0", "Bf2", "Bq0", "Bq3", "Bq4"],
    razon: "La orientación nombra dos figuras. Círculos, cuadrados, figuras compuestas y todo lo de perímetro quedan fuera.",
    backfill: "Quedan muy pocos reactivos de las dos figuras que sí se evalúan."
  },

  // 1.5.2 orientación: propiedades de semejanza entre triángulos.
  "1.5.2": { drop: ["Aq1", "Bq3"], razon: "La razón entre volúmenes y el escalado de un rectángulo no son propiedades de semejanza entre triángulos." },

  // 1.5.4 orientación: área de cuadrados y triángulos rectángulos en el plano cartesiano.
  "1.5.4": { drop: ["Af1", "Aq1", "Aq2", "Bf1", "Bq1", "Bq2", "Bq4"], razon: "Punto medio y perímetro no son área. La distancia entre dos puntos sí se conserva: es como se obtienen los lados." },

  // 1.6.1 orientación: desigualdad correspondiente a un intervalo de una gráfica.
  "1.6.1": { drop: ["Bf2"], razon: "Las desigualdades con valor absoluto no están en la orientación." },

  // 1.6.3 orientación: cálculo de límites de funciones CUADRÁTICAS.
  "1.6.3": { drop: ["Bf2", "Bq2", "Bq3"], razon: "Los límites al infinito y de funciones racionales exceden las funciones cuadráticas que la orientación acota." },

  /* ---------- Área 2 · Cultura digital ---------- */
  // 2.1.1 orientación: elementos que conforman la identidad digital.
  "2.1.1": { drop: ["Bf2"], razon: "El derecho al olvido es un derecho, no un elemento de la identidad digital." },

  // 2.1.2 orientación: ejemplos de freeware, shareware y software de código abierto.
  "2.1.2": { drop: ["Af2", "Aq3", "Bf2", "Bq2", "Bq3"], razon: "Creative Commons licencia obras, no software, y la piratería no es un tipo de licenciamiento. La orientación nombra tres." },

  // 2.1.3 orientación: servicios de almacenamiento en la nube, comercio electrónico, educativos y redes sociales.
  "2.1.3": {
    drop: ["Af0", "Af1", "Aq0", "Bf0", "Bf1", "Bf2", "Bq1", "Bq2"],
    razon: "La orientación nombra cuatro tipos de servicio. Streaming, banca en línea, gobierno digital y el modelo SaaS/PaaS/IaaS quedan fuera, y varios eran la respuesta correcta.",
    backfill: "Las redes sociales, que sí están en la orientación, se quedan sin ningún reactivo."
  },

  // 2.1.4 orientación: ejemplos de phishing, grooming, malware y ransomware.
  "2.1.4": { drop: ["Af0", "Af2", "Aq2", "Bq2"], razon: "El ciberacoso y el sexting no están entre las cuatro amenazas que la orientación nombra, y eran la respuesta correcta de dos reactivos." },

  // 2.2.1 orientación: identificación de la DEFINICIÓN del término «ciberespacio».
  "2.2.1": { drop: ["Af1", "Aq1", "Bf1", "Bq2", "Bq3", "Bq4"], razon: "La orientación pide solo la definición del término. Brecha digital, anonimato y nativos digitales son otros temas." },

  // 2.2.2 orientación: reconocimiento de la DEFINICIÓN de las TICCAD.
  "2.2.2": { drop: ["Bf1", "Bf2", "Bq1", "Bq2", "Bq3", "Bq4"], razon: "La orientación pide la definición. Aprendizaje ubicuo, entornos virtuales y aula invertida exceden ese alcance." },

  // 2.2.3 orientación: Prezi, Genially, Drive, Zoom, Meet, Docs, Kahoot, Sites y Canva.
  "2.2.3": {
    drop: ["Aq0", "Bf1", "Bf2", "Bq0", "Bq1", "Bq3", "Bq4"],
    razon: "La orientación nombra nueve herramientas concretas. Trello, los gestores de referencias y los mapas mentales no están entre ellas.",
    backfill: "Prezi, Genially, Zoom, Meet, Kahoot, Sites y Drive no tienen ni un reactivo propio pese a estar nombradas en la guía."
  },

  // 2.2.4 orientación: ciberetnografía, análisis de contenido en línea, grupo de enfoque online y análisis de redes sociales.
  "2.2.4": {
    drop: ["Aq2", "Bf0", "Bf1", "Bf2", "Bq0", "Bq1", "Bq2", "Bq3", "Bq4"],
    razon: "El paquete convirtió este tema en «cómo buscar en internet y citar fuentes». La orientación nombra cuatro métodos de investigación digital y ninguno aparecía ahí.",
    backfill: "La ciberetnografía no tiene ningún reactivo."
  },

  // 2.3.1 orientación: uso de fórmulas para operaciones básicas en hoja de cálculo.
  "2.3.1": { drop: ["Bf1", "Bq4"], razon: "BUSCARV excede las operaciones básicas y elegir un tipo de gráfico no es usar una fórmula." },

  // 2.3.2 orientación: iconos para insertar tablas, ajustar márgenes y dividir texto.
  "2.3.2": {
    drop: ["Af0", "Af1", "Aq0", "Aq2", "Aq3", "Bf0", "Bf1", "Bq0", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación acota a tres acciones concretas. Estilos, índices automáticos, control de cambios, combinar correspondencia y encabezados no están.",
    backfill: "Insertar tablas y ajustar márgenes —dos de las tres acciones evaluadas— no tienen reactivos."
  },

  // 2.3.3 orientación: iconos para insertar gráficos, tablas, cuestionarios o WordArt.
  "2.3.3": {
    drop: ["Af0", "Af1", "Aq1", "Aq2", "Aq3", "Bf0", "Bf1", "Bf2", "Bq0", "Bq1", "Bq2", "Bq3"],
    razon: "La orientación acota a cuatro elementos que se insertan. El paquete enseñaba diseño de diapositivas, patrón, transiciones y notas del orador: nada de eso se evalúa.",
    backfill: "Tablas, cuestionarios y WordArt no tienen reactivos."
  },

  // 2.3.5 orientación: campos de aplicación de la IA, el internet de las cosas y la ciencia de datos.
  "2.3.5": { drop: ["Af1", "Aq3", "Bf2", "Bq1", "Bq2", "Bq4"], razon: "Realidad aumentada, realidad virtual, impresión 3D y robótica no son ninguno de los tres campos que la orientación nombra." },

  // 2.4.1 orientación: relación de nueve conceptos del lenguaje algorítmico con sus definiciones.
  "2.4.1": { drop: ["Af0", "Aq2", "Bq2", "Bq4"], razon: "Contador, acumulador, pseudocódigo y ciclo infinito no están entre los nueve conceptos que la orientación enumera." },

  // 2.4.2 orientación: organización de los pasos de un algoritmo.
  "2.4.2": { drop: ["Bf0", "Bf1", "Bq1", "Bq3", "Bq4"], razon: "Las características del algoritmo son el tema 2.4.3 y la depuración no está en ninguna orientación." },

  // 2.4.3 orientación: características del pensamiento algorítmico: definido, preciso y finito.
  "2.4.3": {
    drop: ["Af0", "Af1", "Aq0", "Aq3", "Bf0", "Bf1", "Bf2", "Bq0", "Bq1", "Bq2", "Bq4"],
    razon: "La orientación nombra tres características. El paquete enseñaba los cuatro pilares del pensamiento computacional —abstracción, descomposición, patrones, generalización—, que es otro marco.",
    backfill: "«Preciso» se queda sin reactivos y las tres características necesitan cobertura propia."
  },

  /* ---------- Área 3 · Conciencia histórica ---------- */
  // 3.1.1 orientación: conquista de los tzotziles, purépechas, chichimecas y seris.
  "3.1.1": {
    drop: ["Af2", "Aq0", "Bf0", "Bf2", "Bq0", "Bq1", "Bq3"],
    razon: "La orientación nombra cuatro pueblos. La caída de Tenochtitlan, los tlaxcaltecas, la Guerra del Mixtón y la encomienda no son ninguno de esos cuatro procesos.",
    backfill: "Tzotziles y seris, nombrados en la guía, no tienen ningún reactivo."
  },

  // 3.1.2 orientación: Guerra de Castas, resistencia yaqui y manifestaciones culturales actuales.
  "3.1.2": { drop: ["Bq3"], razon: "El levantamiento del EZLN es el tema 7.3.6." },

  // 3.1.3 orientación: características de indígenas, criollos, mestizos y esclavos.
  "3.1.3": { drop: ["Af0", "Bq4"], razon: "La encomienda es una institución laboral y el clero no está entre los cuatro grupos que la orientación nombra." },

  // 3.1.4 orientación: origen del Día de Muertos, los tapetes de Huamantla y el Palacio Nacional.
  "3.1.4": {
    drop: ["Af1", "Af2", "Aq1", "Aq3", "Bf0", "Bf2", "Bq1", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación nombra tres bienes concretos. El paquete enseñaba la Virgen de Guadalupe, la Catedral, los códices, el barroco y la clasificación material/inmaterial.",
    backfill: "Los tapetes de Huamantla y el Palacio Nacional —dos de los tres que sí se evalúan— no tienen ningún reactivo."
  },

  // 3.2.4 orientación: PRIMERA intervención francesa e intervención estadounidense.
  "3.2.4": {
    drop: ["Af0", "Af1", "Aq0", "Aq1", "Aq2", "Bf2", "Bq1", "Bq2", "Bq3", "Bq4"],
    razon: "La guía dice «primera intervención francesa», es decir la Guerra de los Pasteles de 1838. Casi todo el paquete era la SEGUNDA intervención: Maximiliano, el 5 de mayo y la deuda de 1862.",
    backfill: "La Guerra de los Pasteles queda con muy poca cobertura."
  },

  // 3.2.5 orientación: movimiento anarquista, ludismo y cartismo.
  "3.2.5": {
    drop: ["Af0", "Af1", "Bf0", "Bf1", "Bf2", "Bq0", "Bq1", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación nombra tres movimientos obreros europeos. El paquete se fue a los movimientos mexicanos del XIX: Plan de Ayutla, bandolerismo, rebeliones campesinas y Leona Vicario.",
    backfill: "Anarquismo, ludismo y cartismo quedan con un reactivo cada uno."
  },

  // 3.2.8 orientación: movimiento magonista, Partido Liberal Mexicano y zapatismo.
  "3.2.8": {
    drop: ["Af0", "Aq0", "Aq1", "Bf1", "Bf2", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación nombra tres movimientos. El maderismo —Plan de San Luis, entrevista Díaz-Creelman, «sufragio efectivo»— no es ninguno de ellos.",
    backfill: "El zapatismo, nombrado en esta orientación, no tiene reactivos propios aquí."
  },

  // 3.2.10 orientación: derechos que tuvieron su origen en la Revolución mexicana.
  "3.2.10": { drop: ["Bf1", "Bf2", "Bq2", "Bq3"], razon: "El muralismo, el costo demográfico y el partido hegemónico no son derechos." },

  // 3.3.2 orientación: participación de México en la Segunda Guerra Mundial y la Guerra Civil Española.
  "3.3.2": { drop: ["Af0", "Bq4"], razon: "La Doctrina Estrada es un principio de política exterior, no la participación en ninguno de los dos conflictos." },

  // 3.3.4 orientación: ejemplos de la globalización en la VIDA COTIDIANA.
  "3.3.4": { drop: ["Af1", "Bq3"], razon: "La glocalización y la transmisión de crisis financieras no son ejemplos de la vida cotidiana." },

  // 3.3.6 orientación: cine documental, caricatura política y producción televisiva, siglos XIX y XX.
  "3.3.6": {
    drop: ["Af1", "Aq1", "Aq3", "Bf2", "Bq2", "Bq4"],
    razon: "La orientación acota a tres medios y a los siglos XIX y XX. Redes sociales, #YoSoy132 (2012), cámaras de eco y verificación de noticias son del siglo XXI.",
    backfill: "El cine documental, nombrado en la orientación, no tiene reactivos propios."
  },

  /* ---------- Área 4 · Humanidades ---------- */
  // 4.1.1 orientación: características del pensamiento filosófico, el mítico y el científico.
  "4.1.1": { drop: ["Bf2", "Bq0", "Bq3"], razon: "Las ramas de la filosofía (ética, ontología) no son una de las tres formas de pensamiento que la orientación contrasta." },

  // 4.1.2 orientación: ejemplos de pensamiento crítico en la vida cotidiana.
  "4.1.2": { drop: ["Bq0", "Bq1", "Bq3"], razon: "Clasificar falacias por su nombre latino (ad hominem, ad populum, falsa causa) excede el reconocimiento de ejemplos de pensamiento crítico." },

  // 4.1.3 orientación: situaciones cotidianas que ejemplifican una postura existencialista.
  "4.1.3": { drop: ["Bq2", "Bq4"], razon: "Atribuir frases a Beauvoir o exponer el absurdo de Camus no es reconocer una situación cotidiana existencialista." },

  // 4.2.1 orientación: frases que ejemplifican la función INSTRUMENTAL y la función EMOTIVA.
  "4.2.1": {
    drop: ["Af1", "Af2", "Aq0", "Aq1", "Aq3", "Bf1", "Bf2", "Bq0", "Bq1", "Bq4"],
    razon: "La orientación evalúa dos funciones. El paquete enseñaba las seis de Jakobson —poética, fática, metalingüística— y casi siempre eran la respuesta correcta.",
    backfill: "La función instrumental, que es la mitad de lo que se evalúa, se queda casi sin reactivos."
  },

  // 4.3.1 orientación: postulados del hedonismo, el estoicismo y el utilitarismo.
  "4.3.1": {
    drop: ["Af0", "Af1", "Aq0", "Aq2", "Bf1", "Bf2", "Bq1", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación nombra tres teorías. El paquete enseñaba sobre todo la deontología de Kant y la ética de la virtud de Aristóteles, que no se evalúan.",
    backfill: "El estoicismo —una de las tres teorías evaluadas— no tiene ni un reactivo."
  },

  // 4.3.2 orientación: relación de once valores con sus definiciones.
  "4.3.2": {
    drop: ["Aq0", "Bf0", "Bf1", "Bf2", "Bq1", "Bq2", "Bq3"],
    razon: "La equidad no está entre los once valores que la orientación enumera, y la distinción valor/virtud, la jerarquía de valores y los valores instrumentales son metateoría, no los valores mismos.",
    backfill: "De los once valores evaluados solo aparecen cuatro; faltan justicia, tolerancia, responsabilidad, igualdad, libertad y prudencia."
  },

  // 4.4.2 orientación: reconocimiento de ejemplos de discursos políticos.
  "4.4.2": { drop: ["Bf2", "Bq1"], razon: "Ethos, pathos y logos son categorías de la retórica clásica; la orientación pide reconocer ejemplos de discurso político." },

  // 4.5.1 orientación: principios de autonomía, justicia, beneficencia y no maleficencia.
  "4.5.1": { drop: ["Bf2", "Bq4"], razon: "El principio de precaución no es uno de los cuatro principios bioéticos, y la edición genética no ejemplifica ninguno." },

  // 4.5.2 orientación: situaciones que abordan la sustentabilidad desde una postura ética.
  "4.5.2": { drop: ["Bf2", "Bq3"], razon: "Antropocentrismo y biocentrismo son el tema 4.5.5." },

  // 4.5.3 orientación: definiciones de ROLES DE GÉNERO, PATRIARCADO y MICROMACHISMOS.
  "4.5.3": {
    drop: ["Af1", "Af2", "Aq1", "Aq2", "Aq3", "Bf1", "Bf2", "Bq1", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación nombra tres conceptos y el paquete no preguntaba por ninguno: enseñaba brecha salarial, techo de cristal, doble jornada, acciones afirmativas y políticas públicas.",
    backfill: "Patriarcado y micromachismos —dos de los tres conceptos evaluados— no tienen ningún reactivo."
  },

  // 4.5.4 orientación: soluciones a problemas de exclusión social mediante el reconocimiento de la alteridad.
  "4.5.4": { drop: ["Bf1", "Bq3"], razon: "La filosofía de Lévinas excede la identificación de soluciones a la exclusión social." },

  // 4.5.5 orientación: posturas humanistas ante dilemas sobre la relación con otros seres vivos.
  "4.5.5": { drop: ["Bf0"], razon: "Atribuir el concepto de especismo a Peter Singer es historia de la filosofía, no el reconocimiento de una postura." },

  // 4.6.1 orientación: características de lo grotesco, lo bello, lo cómico, lo trágico y lo sublime.
  "4.6.1": { drop: ["Bq3", "Bq4"], razon: "La historicidad de las categorías y «lo feo» no están entre las cinco que la orientación enumera." },

  // 4.6.2 orientación: reconocimiento de la DEFINICIÓN de la hermenéutica.
  "4.6.2": { drop: ["Af1", "Aq2", "Aq3", "Bf0", "Bf1", "Bf2", "Bq1", "Bq2", "Bq4"], razon: "La orientación pide la definición del término. El círculo hermenéutico, los prejuicios de Gadamer y la fusión de horizontes exceden con mucho ese alcance." },

  /* ---------- Área 5 · Ciencias naturales ---------- */
  // 5.1.1 orientación: enlaces iónicos, covalentes o metálicos.
  "5.1.1": { drop: ["Bf1"], razon: "El enlace covalente coordinado o dativo no es uno de los tres tipos que la orientación evalúa." },

  // 5.1.2 orientación: características de sustancias en estado sólido, líquido o gaseoso.
  "5.1.2": { drop: ["Af2", "Bf2", "Bq4"], razon: "El plasma es un cuarto estado que la orientación excluye explícitamente." },

  // 5.1.4 orientación: conversión entre escalas Celsius y Fahrenheit.
  "5.1.4": { drop: ["Af0", "Aq0", "Aq1", "Aq2", "Bf1", "Bq2", "Bq3", "Bq4"], razon: "La orientación nombra solo Celsius y Fahrenheit. Todo lo de Kelvin y cero absoluto queda fuera." },

  // 5.1.5 orientación: cálculo de variables con la ley de Coulomb.
  "5.1.5": { drop: ["Af1", "Aq2"], razon: "Campo eléctrico e inducción electrostática son otros temas; la orientación pide calcular con la ley de Coulomb." },

  // 5.2.1 orientación: características de la luz visible.
  "5.2.1": { drop: ["Bf2"], razon: "La dispersión de Rayleigh en la atmósfera no es una característica de la luz visible." },

  // 5.2.2 orientación: cálculo de variables con el calor específico.
  "5.2.2": { drop: ["Af1", "Bf2"], razon: "Calor latente y equilibrio térmico son conceptos distintos del calor específico." },

  // 5.2.3 orientación: características de la energía térmica, eólica, nuclear y radiante.
  "5.2.3": {
    drop: ["Af0", "Af1", "Aq0", "Aq1", "Aq2", "Bf1", "Bf2", "Bq0", "Bq1", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación nombra cuatro tipos de energía. El paquete preguntaba por energía química, potencial gravitatoria, renovable/no renovable y eficiencia: ninguno de los cuatro.",
    backfill: "Hay que reponer reactivos sobre los cuatro tipos que sí se evalúan."
  },

  // 5.3.2 orientación: sabana, tundra, bosque templado y selva tropical.
  "5.3.2": { drop: ["Af1", "Aq2", "Bf2", "Bq3", "Bq4"], razon: "Desierto, matorral xerófilo y taiga no están entre los cuatro biomas que la orientación evalúa." },

  // 5.3.3 orientación: autótrofos, productores, consumidores primarios y secundarios.
  "5.3.3": { drop: ["Bq4"], razon: "La bioacumulación de contaminantes no forma parte de la identificación de niveles tróficos." },

  // 5.3.4 orientación: sustancias del ciclo del carbono y del ciclo del azufre.
  "5.3.4": {
    drop: ["Af0", "Af1", "Aq2", "Aq3", "Bf0", "Bf2", "Bq0", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación nombra dos ciclos: carbono y azufre. El paquete enseñaba nitrógeno, fósforo y agua a fondo.",
    backfill: "El ciclo del azufre queda casi sin cobertura; hay que reponerlo."
  },

  // 5.3.6 orientación: servicios de aprovisionamiento, de apoyo y culturales.
  "5.3.6": {
    drop: ["Af1", "Aq0", "Aq1", "Bf1", "Bf2", "Bq0", "Bq4"],
    razon: "La orientación evalúa tres tipos. Los reactivos cuya respuesta correcta era «regulación» no pueden salir en el examen, y el pago por servicios ambientales no está en la orientación."
  },

  // 5.4.2 orientación: reacciones de descomposición, síntesis y reducción.
  "5.4.2": {
    drop: ["Af0", "Af1", "Aq2", "Aq3", "Bf0", "Bf1", "Bf2", "Bq0", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación nombra tres tipos de reacción. Sustitución simple y doble, neutralización, combustión y el par exotérmica/endotérmica quedan fuera.",
    backfill: "Síntesis y reducción se quedan sin reactivos propios; hay que reponerlos."
  },

  // 5.4.3 orientación: ejemplos de fisión y fusión nuclear.
  "5.4.3": { drop: ["Aq3", "Bf1", "Bf2", "Bq1", "Bq3", "Bq4"], razon: "Vida media, radiaciones alfa/beta/gamma y la autoría de E=mc² no son ejemplos de fisión ni de fusión." },

  // 5.5.1 orientación: ejemplos de choques elásticos e inelásticos.
  "5.5.1": { drop: ["Af1", "Aq3"], razon: "El coeficiente de restitución y el impulso al amortiguar una caída pertenecen a otros temas." },

  // 5.5.4 orientación: cálculo de variables en caída libre.
  "5.5.4": { drop: ["Af0", "Aq0", "Bf2", "Bq3"], razon: "Velocidad terminal supone resistencia del aire —lo contrario de la caída libre— y el tiro vertical hacia arriba no es caída libre." },

  // 5.6.3 orientación: sustancias del ciclo de Krebs y la glucólisis.
  "5.6.3": { drop: ["Af0", "Bf2", "Bq4"], razon: "La fermentación es una vía distinta de las dos que la orientación nombra." },

  // 5.7.2 orientación: tipos de cromosomas por función o posición del centrómero.
  "5.7.2": { drop: ["Aq3", "Bq3"], razon: "El síndrome de Down es una alteración numérica, no un tipo de cromosoma." },

  // 5.7.3 orientación: cuadro de Punnett de la descendencia de dos progenitores.
  "5.7.3": { drop: ["Aq3"], razon: "Alelos múltiples y codominancia del sistema ABO exceden el cuadro de Punnett de un solo gen." },

  // 5.7.4 orientación: ejemplos de selección natural y del transformismo de Lamarck.
  "5.7.4": { drop: ["Af0", "Af1", "Aq3", "Bf2", "Bq3"], razon: "La teoría sintética, el aporte de la genética y las evidencias de la evolución no son ninguna de las dos teorías que la orientación nombra." },

  // 5.7.5 orientación: evolución divergente, adaptación morfológica y convergencia molecular.
  "5.7.5": { drop: ["Af1", "Aq2", "Bf0", "Bq2", "Bq3"], razon: "Especiación, radiación adaptativa y órganos vestigiales no son ninguno de los tres procesos que la orientación nombra." },

  /* ---------- Área 6 · Lengua y comunicación (español) ---------- */
  // 6.1.2 orientación: relaciones de EJEMPLIFICACIÓN o CAUSALIDAD entre oraciones.
  "6.1.2": { drop: ["Af0", "Aq1", "Bf0", "Bf2", "Bq0", "Bq2", "Bq3"], razon: "La orientación nombra dos relaciones. Contraste, adición y reformulación quedan fuera y eran la respuesta correcta de varios reactivos." },

  // 6.1.4 orientación: resumen, relato simple, reseña y comentario crítico.
  "6.1.4": { drop: ["Bf2", "Bq4"], razon: "La paráfrasis no es una de las cuatro formas textuales que la orientación nombra." },

  // 6.2.2 orientación: identificación del tema central.
  "6.2.2": { drop: ["Bf2", "Bq2"], razon: "El motivo literario no es el tema central." },

  // 6.2.3 orientación: identificación del NUDO en un texto narrativo.
  "6.2.3": {
    drop: ["Af1", "Bf1", "Bf2", "Bq1", "Bq3", "Bq4"],
    razon: "In medias res, analepsis, prolepsis y desenlace abierto son técnicas narrativas que la orientación no menciona; conservo planteamiento, clímax y desenlace porque son el conjunto con el que se discrimina el nudo.",
    backfill: "El nudo, que es literalmente lo que se evalúa, no tiene un reactivo que lo nombre."
  },

  // 6.2.5 orientación: características del narrador.
  "6.2.5": { drop: ["Bf2", "Bq3", "Bq4"], razon: "El narrador poco fiable y la narración en segunda persona no son tipos de narrador que la guía contemple." },

  // 6.2.6 orientación: características del ámbito.
  "6.2.6": { drop: ["Bq3", "Bq4"], razon: "La distinción tiempo de la historia / tiempo del relato es del tema 6.2.7, y el género de ciencia ficción no es un ámbito." },

  // 6.2.7 orientación: tiempo RETROSPECTIVO y tiempo LINEAL.
  "6.2.7": {
    drop: ["Af0", "Af1", "Aq0", "Bf0", "Bf2", "Bq0", "Bq1", "Bq3", "Bq4"],
    razon: "La orientación nombra dos tiempos narrativos. Prolepsis, elipsis, estructura circular, ritmo y la distinción historia/relato son teoría narratológica que no se evalúa.",
    backfill: "El tiempo retrospectivo necesita más reactivos propios."
  },

  // 6.3.2 orientación: fuentes primarias, secundarias y terciarias.
  "6.3.2": { drop: ["Af0", "Af1", "Aq3"], razon: "El plagio y la evaluación de confiabilidad no son tipos de fuente." },

  // 6.3.3 orientación: acentuación de agudas, graves, esdrújulas y sobreesdrújulas.
  "6.3.3": {
    drop: ["Af0", "Af1", "Aq2", "Bf0", "Bf2", "Bq1", "Bq3"],
    razon: "La orientación nombra cuatro reglas por posición del acento. La tilde diacrítica y el hiato son otras reglas de acentuación que no se evalúan.",
    backfill: "Las graves y las sobreesdrújulas quedan sin reactivos propios."
  },

  // 6.3.5 orientación: sujeto, predicado, complemento directo, indirecto y circunstancial.
  "6.3.5": { drop: ["Bq3"], razon: "La voz pasiva no es una de las unidades sintácticas que la orientación enumera." },

  // 6.3.6 orientación: orden de los PÁRRAFOS de un escrito.
  "6.3.6": { drop: ["Bq2"], razon: "La cohesión léxica por sinónimos no interviene en el ordenamiento de párrafos." },

  /* ---------- Área 6 · Lengua y comunicación (inglés) ---------- */
  // 6.5.1 orientación: presente simple y presente continuo.
  "6.5.1": { drop: ["Bf1", "Bf2", "Bq3"], razon: "La posición del adverbio de frecuencia no es conjugación verbal, y el presente continuo con valor de futuro pertenece al tema 6.5.3." },

  // 6.5.2 orientación: pasado simple y pasado continuo.
  "6.5.2": { drop: ["Bf2", "Bq4"], razon: "«Used to» no es pasado simple ni pasado continuo." },

  // 6.5.3 orientación: construcción de oraciones en tiempo futuro (simple).
  "6.5.3": { drop: ["Bf1", "Bf2", "Bq3", "Bq4"], razon: "El future continuous y el presente con valor de horario programado exceden el futuro simple que la guía acota." },

  // 6.5.5 orientación: construcción de oraciones en pasado perfecto.
  "6.5.5": { drop: ["Bf2", "Bq3"], razon: "El past perfect continuous no está en la guía." },

  // 6.5.6 orientación: uso de WHO, WHAT, WHERE y WHOSE.
  "6.5.6": {
    drop: ["Af0", "Af1", "Aq0", "Bf1", "Bq1", "Bq2", "Bq4"],
    razon: "La orientación nombra cuatro palabras interrogativas. «How often», «how many» y «how long» eran la respuesta correcta de cuatro reactivos y ninguna está entre ellas.",
    backfill: "«What», nombrada en la orientación, no tiene ningún reactivo propio."
  },

  // 6.5.8 orientación: uso de CAN, SHOULD, MUST y MIGHT.
  "6.5.8": { drop: ["Af1", "Bq1", "Bq4"], razon: "«Could», «may» y «don't have to» no están entre los cuatro modales que la orientación nombra, y eran la respuesta correcta de dos reactivos." },

  // 6.5.9 orientación: primer y segundo condicional (la guía añade el condicional cero en la p. 10).
  "6.5.9": { drop: ["Af1", "Bf2", "Bq3", "Bq4"], razon: "El tercer condicional no se evalúa: la guía acota a condicional cero, primero y segundo. Dos reactivos lo pedían como respuesta correcta." },

  // 6.5.10 orientación: voz pasiva (la guía acota a presente y pasado en la p. 10).
  "6.5.10": { drop: ["Bq4"], razon: "La pasiva en presente perfecto excede el presente y el pasado que la guía acota." },

  /* ---------- Área 7 · Ciencias sociales ---------- */
  // 7.1.1 orientación: reconocimiento de necesidades vitales y no vitales.
  "7.1.1": {
    drop: ["Af0", "Af1", "Aq1", "Bf0", "Bf1", "Bf2", "Bq1", "Bq2", "Bq3", "Bq4"],
    razon: "La orientación pide distinguir dos tipos de necesidad. El paquete enseñaba la pirámide de Maslow, el costo de oportunidad, los bienes libres y la medición de pobreza del Coneval.",
    backfill: "Quedan pocos ejemplos de la distinción que sí se evalúa."
  },

  // 7.1.3 orientación: sectores primario, secundario y terciario.
  "7.1.3": { drop: ["Af0", "Bf1", "Bq3"], razon: "El sector cuaternario no está entre los tres que la orientación nombra, y era la respuesta correcta de un reactivo." },

  // 7.1.4 orientación: mecanismos para repartir la riqueza entre los agentes de un proceso productivo.
  "7.1.4": {
    drop: ["Af0", "Aq2", "Bf0", "Bf1", "Bf2", "Bq0", "Bq2", "Bq4"],
    razon: "El coeficiente de Gini y la curva de Lorenz miden la desigualdad; no son mecanismos de reparto entre los agentes de la producción.",
    backfill: "Faltan reactivos sobre el salario y la ganancia como mecanismos de reparto."
  },

  // 7.2.1 orientación: teorías del Estado postuladas por Rousseau y Hobbes.
  "7.2.1": { drop: ["Af0", "Af1", "Aq2", "Aq3", "Bf1", "Bq1", "Bq3", "Bq4"], razon: "La orientación nombra dos autores. Locke, Montesquieu y Weber quedan fuera, y eran la respuesta correcta de cuatro reactivos." },

  // 7.2.3 orientación: requisitos del artículo 34 constitucional.
  "7.2.3": { drop: ["Bf2", "Bq4"], razon: "La pérdida de la ciudadanía y la obligación fiscal del artículo 31 no son requisitos del artículo 34." },

  // 7.2.4 orientación: problemáticas que atienden la SEP, el Conadis, la Sedatu y el Inaes.
  "7.2.4": {
    drop: ["Bf0", "Bq2", "Bq3"],
    razon: "Las facultades del Congreso y la definición de organismo autónomo no son «problemáticas que atiende una institución». El resto se conserva: el ejemplo oficial de la guía usa Semarnat, SICT y Cenapred, así que el examen sí pregunta por instituciones fuera de las cuatro nombradas.",
    backfill: "La SEP y el Conadis, nombradas en la orientación, no tienen reactivos propios."
  },

  // 7.2.6 orientación: autodeterminación, no intervención y solución pacífica de controversias.
  "7.2.6": { drop: ["Af1", "Bq3"], razon: "El derecho de asilo no es ninguno de los tres principios que la orientación nombra." },

  // 7.2.7 orientación: características de la Unesco, la FAO y la OIT.
  "7.2.7": {
    drop: ["Af0", "Af1", "Af2", "Aq3", "Bf1", "Bf2", "Bq0", "Bq2", "Bq4"],
    razon: "La orientación nombra tres organismos. OMS, Unicef, FMI, Banco Mundial y el Consejo de Seguridad quedan fuera y varios eran la respuesta correcta.",
    backfill: "La FAO se queda con un solo reactivo."
  },

  // 7.3.1 orientación: relación de clase social, grupo social, comunidad e institución.
  "7.3.1": { drop: ["Af0", "Aq2", "Bf2", "Bq3"], razon: "La movilidad social y las organizaciones de la sociedad civil no están entre los cuatro conceptos que la orientación enumera." },

  // 7.3.2 orientación: indicadores de desarrollo comunitario según el INEGI.
  "7.3.2": { drop: ["Af0", "Bf1", "Bq0", "Bq4"], razon: "El índice de marginación es del Conapo y el IDH del PNUD; además el IDH y el PIB per cápita pertenecen al tema 7.3.3." },

  // 7.3.4 orientación: definición de exclusión, discriminación y estereotipo.
  "7.3.4": { drop: ["Af0", "Bf1", "Bq3", "Bq4"], razon: "El estigma y el clasismo no son ninguno de los tres conceptos, y el Conapred es una institución, no una definición." },

  // 7.3.6 orientación: Plan de San Luis, crisis de 1982, movimiento de 1968 y levantamiento del EZLN.
  "7.3.6": {
    drop: ["Af0", "Af1", "Aq1", "Aq3", "Bf0", "Bf1", "Bf2", "Bq0", "Bq1", "Bq2", "Bq3"],
    razon: "La orientación nombra cuatro hechos. El paquete enseñaba el sismo de 1985, la crisis de 1994-95 y la pandemia de COVID: ninguno de los cuatro. Ojo: la crisis evaluada es la de 1982, no la de 1994.",
    backfill: "El Plan de San Luis y la crisis de 1982 —dos de los cuatro hechos evaluados— no tienen ningún reactivo."
  },

  // 7.3.7 orientación: desplazamiento forzado, migración estatal y migración rural-urbana.
  "7.3.7": {
    drop: ["Af0", "Af1", "Aq2", "Aq3", "Bf2", "Bq2", "Bq3", "Bq4"],
    razon: "Las remesas, la condición de refugiado y el papel de México como país de tránsito no son tipos de migración.",
    backfill: "La migración estatal, nombrada en la orientación, no tiene reactivos."
  },

  // 7.3.8 orientación: movimiento feminista, antiglobalización y hippie.
  "7.3.8": { drop: ["Af0", "Af1", "Aq0", "Bf1", "Bf2", "Bq1", "Bq2", "Bq4"], razon: "Derechos civiles, ecologismo, zapatismo y los «nuevos movimientos sociales» no son ninguno de los tres que la orientación nombra." }
};
