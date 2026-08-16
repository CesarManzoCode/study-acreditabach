/* Contenido adicional del área 7 · Ciencias sociales
   Se CONCATENA al final de flashcards y quiz de cada tema (ver engine.js). */

const AREA7_EXTRA = {
  "7.1.1": {
    leccion: "Dos formas de ordenar y medir las necesidades. La **pirámide de Maslow** las jerarquiza en cinco niveles —fisiológicas, de seguridad, de afiliación, de reconocimiento y de autorrealización—, con la idea de que las de la base deben cubrirse antes de atender las superiores. Y la **pobreza multidimensional** del Coneval mide la carencia no solo por ingreso, sino por seis carencias sociales: educación, salud, seguridad social, vivienda, servicios básicos y alimentación. Ambas amplían la distinción entre necesidades vitales y no vitales con la que empieza el tema.",
    quiz: [
      { q: "Una familia no tiene acceso a agua potable en su vivienda. ¿Qué tipo de necesidad está sin cubrir?", options: ["Vital, porque el agua es indispensable para la vida y la salud","No vital, porque puede comprarla embotellada","Cultural"], correct: 0, explanation: "Sin agua segura hay riesgo directo de enfermedad: es una necesidad básica." },
      { q: "¿Cuál de estas necesidades se considera NO vital?", options: ["Cambiar de teléfono celular cada año","Recibir atención médica ante una enfermedad","Contar con vivienda"], correct: 0, explanation: "Su ausencia no compromete la supervivencia ni la salud de la persona." },
      { q: "¿Por qué la educación se considera una necesidad social fundamental aunque su falta no cause la muerte inmediata?", options: ["Porque condiciona las oportunidades de desarrollo y de salir de la pobreza","Porque es un lujo","Porque solo importa en las ciudades"], correct: 0, explanation: "Es un derecho y un factor determinante de movilidad social a mediano y largo plazo." }
    ]
  },
  "7.1.2": {
    flashcards: [
      { front: "¿Qué es el capital humano?", back: "El conjunto de conocimientos, habilidades y experiencia de los trabajadores. Aumenta la productividad y por eso se considera una inversión, no solo un costo." },
      { front: "¿Qué es la plusvalía según Marx?", back: "La diferencia entre el valor que genera el trabajo del obrero y el salario que recibe. Es el origen de la ganancia del dueño del capital." }
    ],
    quiz: [
      { q: "En una panadería, el horno industrial y la camioneta de reparto corresponden al factor:", options: ["Capital","Tierra","Trabajo"], correct: 0, explanation: "Son bienes producidos que sirven para producir otros bienes: capital físico." },
      { q: "El agua de un río que usa una embotelladora corresponde al factor de producción:", options: ["Tierra, entendida como recursos naturales","Capital","Organización"], correct: 0, explanation: "En economía 'tierra' abarca todos los recursos que provienen de la naturaleza." },
      { q: "Capacitar a los trabajadores para que dominen una nueva máquina es una inversión en:", options: ["Capital humano","Capital financiero","Tierra"], correct: 0, explanation: "Mejora la capacidad productiva de las personas, que es lo que designa el capital humano." },
      { q: "¿Qué factor de producción aporta el empresario que decide qué producir y cómo combinar los recursos?", options: ["La organización o capacidad empresarial","El trabajo manual","La tierra"], correct: 0, explanation: "Coordinar los demás factores y asumir el riesgo es la función empresarial." }
    ]
  },
  "7.1.3": {
    flashcards: [
      { front: "¿Qué sector predomina en la economía mexicana?", back: "El terciario: los servicios (comercio, turismo, transporte) aportan la mayor parte del PIB y del empleo, seguidos por el secundario." }
    ],
    quiz: [
      { q: "Una empresa que convierte leche en queso pertenece al sector:", options: ["Secundario","Primario","Terciario"], correct: 0, explanation: "Transforma una materia prima en un producto elaborado: eso define al sector industrial." },
      { q: "El turismo forma parte del sector:", options: ["Terciario","Primario","Secundario"], correct: 0, explanation: "Ofrece servicios (hospedaje, guías, transporte), no bienes materiales." },
      { q: "¿Qué sector suele tener mayor peso en las economías más desarrolladas?", options: ["El terciario","El primario","Ninguno, todos pesan igual"], correct: 0, explanation: "Conforme una economía madura, los servicios ganan participación frente a la agricultura y la industria." },
      { q: "La extracción de plata en Zacatecas corresponde al sector:", options: ["Primario","Secundario","Terciario"], correct: 0, explanation: "La minería obtiene recursos directamente de la naturaleza." }
    ]
  },
  "7.1.4": {
    leccion: "Dos herramientas para medir y ubicar la desigualdad. El **coeficiente de Gini** es un indicador que va de 0 (igualdad perfecta) a 1 (una sola persona concentra todo el ingreso); México se ha movido en torno a 0.4-0.45 en las mediciones del Inegi y el Coneval de los últimos años; lo que hay que retener es la lectura del indicador —cuanto más cerca de 1, mayor desigualdad—, no la cifra, porque se recalcula cada dos años. Y conviene distinguir dos momentos del reparto: la **distribución primaria** es la que resulta directamente del mercado —salarios, rentas, ganancias— y la **secundaria** es la que realiza el Estado después, mediante impuestos y transferencias.",
    flashcards: [
      { front: "¿Qué diferencia hay entre distribución primaria y secundaria del ingreso?", back: "La **primaria** ocurre en el mercado (salarios, rentas, ganancias); la **secundaria** la realiza el Estado mediante impuestos y transferencias." }
    ],
    quiz: [
      { q: "El pago que recibe el dueño de un local comercial por permitir su uso se llama:", options: ["Renta","Salario","Interés"], correct: 0, explanation: "La renta retribuye el uso de la tierra o de los inmuebles." },
      { q: "El banco cobra por el dinero que prestó a una empresa. Ese pago es:", options: ["Interés","Ganancia","Salario"], correct: 0, explanation: "El interés retribuye el capital prestado durante un tiempo determinado." },
      { q: "El reparto de utilidades (PTU) que reciben los trabajadores en México corresponde a:", options: ["Una forma de distribución de la riqueza generada por la empresa","Un impuesto al consumo","Un subsidio del gobierno"], correct: 0, explanation: "La ley obliga a repartir a los trabajadores un porcentaje de la utilidad anual." }
    ]
  },
  "7.1.5": {
    flashcards: [
      { front: "¿Qué prestaciones marca la Ley Federal del Trabajo como mínimas?", back: "Aguinaldo (15 días mínimo), vacaciones con prima vacacional, día de descanso semanal pagado, seguridad social (IMSS) y reparto de utilidades." },
      { front: "¿Por qué la informalidad es un problema para el país?", back: "Porque deja a los trabajadores sin seguridad social ni pensión, reduce la recaudación fiscal y suele venir acompañada de baja productividad e ingresos inestables." }
    ],
    quiz: [
      { q: "¿Cuál es la principal desventaja del empleo informal para el trabajador?", options: ["La falta de seguridad social, pensión y prestaciones de ley","Que siempre paga menos por hora","Que exige contrato escrito"], correct: 0, explanation: "Sin registro no hay IMSS, ni Infonavit, ni derecho a pensión ni indemnización." },
      { q: "Una persona vende comida en un puesto propio, sin registro fiscal ni empleados. Su actividad es:", options: ["Empleo informal por cuenta propia","Empleo formal","Trabajo asalariado con prestaciones"], correct: 0, explanation: "No está registrada ante las autoridades ni cuenta con seguridad social." },
      { q: "Que más de la mitad de la población ocupada en México esté en la informalidad implica que:", options: ["Una gran parte de los trabajadores carece de seguridad social","La economía crece más rápido","Todos ganan salario mínimo"], correct: 0, explanation: "Es un problema estructural de protección social y de recaudación." },
      { q: "¿A quién corresponde por ley el aguinaldo?", options: ["A toda persona con una relación de trabajo subordinada, esté o no registrada su patrón","Solo a quien tiene contrato escrito e IMSS","Solo a quienes tienen puestos directivos"], correct: 0, explanation: "La Ley Federal del Trabajo concede el aguinaldo por existir una relación de trabajo, no por estar dada de alta. Si el patrón no registró a la persona ante el IMSS está incumpliendo la ley, y eso no borra el derecho: la Profedet orienta y representa gratuitamente a quien tiene que reclamarlo. Lo que cambia en el empleo informal no es el derecho, es la dificultad para hacerlo valer." }
    ]
  },
  "7.1.6": {
    flashcards: [
      { front: "¿Qué diferencia hay entre impuesto progresivo y regresivo?", back: "El **progresivo** cobra proporcionalmente más a quien más gana (ISR); el **regresivo** afecta más a quien menos tiene, porque se cobra igual a todos (IVA)." },
      { front: "¿Qué es una transferencia condicionada?", back: "Un apoyo económico que se entrega a cambio de cumplir requisitos, como llevar a los hijos a la escuela o a revisiones médicas." }
    ],
    quiz: [
      { q: "El IVA se considera un impuesto regresivo porque:", options: ["Se cobra igual a todos, y representa una proporción mayor del ingreso de quien gana menos","Solo lo pagan las personas de altos ingresos","Aumenta con el nivel de ingreso"], correct: 0, explanation: "El mismo 16% pesa mucho más en el presupuesto de un hogar pobre que en uno rico." },
      { q: "Una beca para estudiantes de bajos recursos es un mecanismo de redistribución del tipo:", options: ["Transferencia o programa social","Impuesto progresivo","Subsidio a la producción"], correct: 0, explanation: "Es una entrega directa de recursos a un sector específico de la población." },
      { q: "El ISR es un impuesto progresivo porque:", options: ["La tasa aumenta conforme se incrementan los ingresos","Se cobra al comprar productos","Es igual para todos los contribuyentes"], correct: 0, explanation: "Su diseño por tramos hace que quien gana más aporte proporcionalmente más." },
      { q: "El gasto público en salud y educación gratuitas funciona como redistribución porque:", options: ["Entrega servicios de valor a quienes no podrían pagarlos","Aumenta los impuestos al consumo","Reduce el número de contribuyentes"], correct: 0, explanation: "Es redistribución en especie: el beneficio llega como servicio, no como dinero." }
    ]
  },
  "7.1.7": {
    leccion: "Dos nociones que completan el Estado de bienestar. El **Informe Beveridge** fue el documento británico de 1942 que propuso un sistema de seguridad social «de la cuna a la tumba» y sirvió de base al Estado de bienestar europeo de posguerra: es el origen histórico del modelo. Y la **universalidad** de un derecho social significa que el servicio se garantiza a toda la población por su condición de ciudadana, sin depender de su capacidad de pago ni de su situación laboral; es lo que distingue un derecho de una ayuda focalizada.",
    flashcards: [
      { front: "¿Qué fue el Informe Beveridge?", back: "El documento británico de 1942 que propuso un sistema de seguridad social 'de la cuna a la tumba' y sirvió de base al Estado de bienestar europeo de posguerra." },
      { front: "¿Qué es la universalidad de un derecho social?", back: "Que el servicio se garantiza a toda la población por su condición de ciudadana, sin depender de su capacidad de pago ni de su situación laboral." }
    ],
    quiz: [
      { q: "¿Qué caracteriza al Estado de bienestar?", options: ["Fuerte gasto social y garantía estatal de derechos como salud y educación","La privatización de los servicios públicos","La ausencia de regulación laboral"], correct: 0, explanation: "El Estado interviene activamente para asegurar un piso mínimo de bienestar a todos." },
      { q: "Los países nórdicos suelen citarse como ejemplos de Estado de bienestar porque:", options: ["Combinan alta recaudación fiscal con servicios sociales universales","Tienen los impuestos más bajos del mundo","No cuentan con sistema de pensiones"], correct: 0, explanation: "Su modelo se sostiene con impuestos altos que financian cobertura universal." },
      { q: "El Estado de bienestar se consolidó principalmente:", options: ["Después de la Segunda Guerra Mundial y la Gran Depresión","Durante la Edad Media","A partir del año 2000"], correct: 0, explanation: "Las crisis del siglo XX mostraron los límites del mercado sin regulación y empujaron la intervención estatal." },
      { q: "Una pensión universal para adultos mayores corresponde a la lógica del:", options: ["Estado de bienestar","Modelo neoliberal puro","Estado mínimo"], correct: 0, explanation: "Es un derecho garantizado por el Estado con independencia de la trayectoria laboral." }
    ]
  },
  "7.1.8": {
    leccion: "Dos conceptos centrales del modelo neoliberal. El **Consenso de Washington** fue el paquete de recomendaciones de los años ochenta —disciplina fiscal, privatización, apertura comercial, desregulación— que guió las reformas neoliberales en América Latina; el examen lo usa como nombre del programa completo. Y la **desregulación** es la eliminación o reducción de las reglas que el Estado impone a los mercados, bajo el supuesto de que la competencia asigna mejor los recursos que la norma.",
    flashcards: [
      { front: "¿Qué fue el Consenso de Washington?", back: "El paquete de recomendaciones de los años ochenta (disciplina fiscal, privatización, apertura comercial, desregulación) que guió las reformas neoliberales en América Latina." },
      { front: "¿Qué es la desregulación?", back: "La eliminación o reducción de las reglas que el Estado impone a los mercados, bajo el supuesto de que la competencia asigna mejor los recursos." }
    ],
    quiz: [
      { q: "¿Cuál de estas medidas NO corresponde al modelo neoliberal?", options: ["Nacionalizar la banca y ampliar el gasto social","Privatizar empresas paraestatales","Firmar tratados de libre comercio"], correct: 0, explanation: "El neoliberalismo apunta a reducir el tamaño y la intervención del Estado, no a ampliarlos." },
      { q: "La venta de Teléfonos de México a inversionistas privados en 1990 ejemplifica:", options: ["La privatización característica del modelo neoliberal","El Estado de bienestar","La sustitución de importaciones"], correct: 0, explanation: "El Estado se retiró de la operación de empresas consideradas no estratégicas." },
      { q: "Una crítica frecuente al neoliberalismo señala que:", options: ["El crecimiento del comercio no se tradujo en mejores salarios ni menor desigualdad","Aumentó excesivamente el gasto público","Cerró la economía al capital extranjero"], correct: 0, explanation: "Aumentaron exportaciones e inversión, pero el salario real y la desigualdad no mejoraron en la misma medida." },
      { q: "El TLCAN, firmado en 1994, se inscribe en la lógica neoliberal porque:", options: ["Buscó eliminar barreras comerciales y abrir la economía","Aumentó los aranceles a las importaciones","Nacionalizó la industria petrolera"], correct: 0, explanation: "La apertura comercial es uno de los pilares del modelo." }
    ]
  },
  "7.1.9": {
    leccion: "Dos conceptos para medir y explicar el daño ambiental de la producción. La **huella ecológica** es la superficie de territorio productivo necesaria para generar los recursos que consume una población y absorber sus desechos; comparar huellas permite contrastar países y estilos de vida, y cuando la suma supera la capacidad del planeta se habla de sobregiro ecológico. La **obsolescencia programada** es el diseño deliberado de productos con vida útil corta para forzar su reemplazo, y su efecto directo es multiplicar los residuos y el consumo de materias primas.",
    flashcards: [
      { front: "¿Qué es la huella ecológica?", back: "La superficie de territorio necesaria para producir los recursos que consume una población y absorber sus desechos. Si supera la capacidad del planeta, hay sobregiro ecológico." },
      { front: "¿Qué es la obsolescencia programada?", back: "El diseño deliberado de productos con vida útil corta para forzar su reemplazo. Multiplica los residuos y el consumo de materias primas." }
    ],
    quiz: [
      { q: "La tala de selva para abrir potreros de ganado provoca principalmente:", options: ["Deforestación y pérdida de biodiversidad","Lluvia ácida","Adelgazamiento de la capa de ozono"], correct: 0, explanation: "Se elimina el ecosistema original y con él las especies que dependían de él." },
      { q: "El vertido de metales pesados de una mina a un río causa:", options: ["Contaminación del agua y daño a la fauna acuática y a la salud humana","Erosión eólica","Aumento de la capa de ozono"], correct: 0, explanation: "Los metales pesados se acumulan en la cadena trófica y persisten mucho tiempo." },
      { q: "¿Qué propone la economía circular frente al modelo de producción actual?", options: ["Reutilizar y reciclar los materiales para reducir residuos y extracción","Aumentar la producción de bienes desechables","Trasladar las fábricas a otros países"], correct: 0, explanation: "Frente al modelo lineal de extraer-producir-desechar, propone mantener los materiales en uso el mayor tiempo posible." },
      { q: "La agricultura intensiva con agroquímicos afecta al ambiente porque:", options: ["Contamina suelos y mantos acuíferos y reduce la fertilidad a largo plazo","Aumenta la biodiversidad del suelo","Reduce el uso de agua"], correct: 0, explanation: "El exceso de fertilizantes y plaguicidas se filtra al subsuelo y llega a ríos y lagos." }
    ]
  },
  "7.2.1": {
    quiz: [
      { q: "\"El hombre es el lobo del hombre\" resume el pensamiento de:", options: ["Thomas Hobbes","Jean-Jacques Rousseau","John Locke"], correct: 0, explanation: "Para Hobbes, sin un poder que imponga orden la vida sería una guerra de todos contra todos." },
      { q: "¿Qué autor sostiene que el ser humano es bueno por naturaleza y la sociedad lo corrompe?", options: ["Rousseau","Hobbes","Maquiavelo"], correct: 0, explanation: "Rousseau contrapone el 'buen salvaje' a la desigualdad que introduce la propiedad privada." }
    ]
  },
  "7.2.2": {
    flashcards: [
      { front: "¿Qué diferencia hay entre democracia directa y representativa?", back: "En la **directa** la ciudadanía decide sin intermediarios (referéndum, consulta popular); en la **representativa** elige a quienes deciden en su nombre." },
      { front: "¿Qué son los mecanismos de participación ciudadana en México?", back: "La consulta popular, la revocación de mandato, la iniciativa ciudadana de ley y las candidaturas independientes: complementan al voto en las elecciones." }
    ],
    quiz: [
      { q: "¿Qué órgano organiza las elecciones federales en México?", options: ["El INE","La Secretaría de Gobernación","La Suprema Corte"], correct: 0, explanation: "El Instituto Nacional Electoral es un organismo autónomo, sucesor del IFE." },
      { q: "Que el voto sea secreto sirve para:", options: ["Garantizar que nadie pueda presionar o castigar a quien vota","Facilitar el conteo","Reducir el costo de la elección"], correct: 0, explanation: "El secreto del voto protege la libertad efectiva del elector." },
      { q: "La alternancia en el poder es un indicador de democracia porque:", options: ["Demuestra que la competencia electoral es real y los resultados se respetan","Garantiza que el gobierno será mejor","Elimina la necesidad de partidos políticos"], correct: 0, explanation: "Si nunca puede ganar otro, las elecciones son solo un trámite." },
      { q: "Una consulta popular en la que la ciudadanía vota directamente sobre un tema es un mecanismo de:", options: ["Democracia directa","Democracia representativa","Poder fáctico"], correct: 0, explanation: "La ciudadanía decide sin intermediarios sobre un asunto concreto." }
    ]
  },
  "7.2.3": {
    flashcards: [
      { front: "¿Cuáles son las obligaciones del ciudadano según el artículo 36?", back: "Inscribirse en el registro nacional de ciudadanos, votar en las elecciones, desempeñar cargos de elección popular y los concejiles del municipio donde resida." },
      { front: "¿Cómo se es mexicano por nacimiento?", back: "Por nacer en territorio nacional, por ser hijo de padre o madre mexicanos aunque se nazca en el extranjero, o por nacer en embarcaciones o aeronaves mexicanas." }
    ],
    quiz: [
      { q: "¿Qué artículo constitucional establece los requisitos de la ciudadanía mexicana?", options: ["El artículo 34","El artículo 3º","El artículo 123"], correct: 0, explanation: "El 34 exige ser mexicano, haber cumplido 18 años y tener un modo honesto de vivir." },
      { q: "Una persona de 17 años nacida en México es:", options: ["Mexicana, pero aún no ciudadana","Ciudadana con derecho a votar","Extranjera"], correct: 0, explanation: "La nacionalidad se tiene desde el nacimiento; la ciudadanía requiere cumplir 18 años." },
      { q: "¿Qué derecho otorga la ciudadanía y no la simple nacionalidad?", options: ["Votar y ser votado en elecciones","Recibir educación pública","Tener un nombre y una nacionalidad"], correct: 0, explanation: "Los derechos políticos corresponden a los ciudadanos; los demás derechos son de todas las personas." },
      { q: "La naturalización es el proceso por el cual:", options: ["Una persona extranjera adquiere la nacionalidad mexicana","Un menor de edad se vuelve ciudadano","Se pierde la nacionalidad"], correct: 0, explanation: "Es la vía legal para que una persona nacida en otro país obtenga la nacionalidad mexicana." }
    ]
  },
  "7.2.4": {
    flashcards: [
      { front: "¿Qué hace la CNDH?", back: "La Comisión Nacional de los Derechos Humanos investiga quejas por violaciones cometidas por autoridades federales y emite recomendaciones públicas, aunque no vinculantes." },
      { front: "¿Qué hace la Profeco?", back: "La Procuraduría Federal del Consumidor protege los derechos de quien compra: atiende quejas, verifica precios y sanciona prácticas comerciales abusivas." }
    ],
    quiz: [
      { q: "Una persona considera que una autoridad violó sus derechos humanos. ¿A qué institución puede acudir?", options: ["A la CNDH o a la comisión estatal correspondiente","A la Profeco","Al INE"], correct: 0, explanation: "Las comisiones de derechos humanos reciben quejas contra actos de autoridad." },
      { q: "Una tienda no respeta el precio anunciado de un producto. ¿Qué institución atiende esa queja?", options: ["La Profeco","La Sedatu","El Inaes"], correct: 0, explanation: "Es una relación de consumo, competencia de la Procuraduría Federal del Consumidor." },
      { q: "Una comunidad necesita apoyo para regularizar la tenencia de la tierra y ordenar su crecimiento urbano. ¿Qué dependencia corresponde?", options: ["La Sedatu","La SEP","La Conadis"], correct: 0, explanation: "La Secretaría de Desarrollo Agrario, Territorial y Urbano atiende ordenamiento territorial y vivienda." },
      { q: "Un grupo de artesanas quiere formar una cooperativa y busca apoyo institucional. ¿A dónde acude?", options: ["Al Inaes","A la Conadis","Al INE"], correct: 0, explanation: "El Instituto Nacional de la Economía Social apoya cooperativas y empresas del sector social." }
    ]
  },
  "7.2.5": {
    leccion: "Dos mecanismos por los que los poderes fácticos actúan. El **cabildeo** o **lobbying** es la influencia organizada de grupos de interés sobre legisladores y funcionarios para orientar leyes y políticas a su favor: es legal y está regulado, pero puede degenerar. La **captura del Estado** es esa degeneración: ocurre cuando intereses privados logran que las decisiones públicas se diseñen sistemáticamente en su beneficio, por encima del interés general.",
    flashcards: [
      { front: "¿Qué es el cabildeo o lobbying?", back: "La influencia organizada de grupos de interés sobre legisladores y funcionarios para orientar leyes y políticas a su favor. Es legal, pero puede derivar en captura del Estado." },
      { front: "¿Qué es la captura del Estado?", back: "Cuando intereses privados logran que las decisiones públicas se diseñen sistemáticamente en su beneficio, por encima del interés general." }
    ],
    quiz: [
      { q: "¿Qué distingue a un poder fáctico de un poder constitucional?", options: ["El fáctico influye sin tener un cargo ni facultades otorgadas por la ley","El fáctico es electo por la ciudadanía","El constitucional no tiene límites"], correct: 0, explanation: "Su poder proviene de recursos económicos, mediáticos o de fuerza, no de un mandato legal." },
      { q: "Una televisora que decide qué candidatos aparecen y cómo son presentados actúa como:", options: ["Poder fáctico, por su influencia sobre la opinión pública","Órgano electoral","Poder legislativo"], correct: 0, explanation: "Sin ser autoridad, condiciona el debate público y las preferencias electorales." },
      { q: "¿Por qué los poderes fácticos representan un riesgo para la democracia?", options: ["Porque influyen en decisiones públicas sin rendir cuentas a nadie","Porque participan en las elecciones","Porque están regulados por la Constitución"], correct: 0, explanation: "No son electos ni removibles: escapan a los mecanismos de control democrático." },
      { q: "El crimen organizado se considera un poder fáctico cuando:", options: ["Condiciona decisiones de autoridades y controla territorios","Participa en elecciones con candidatos propios","Se somete a la ley"], correct: 0, explanation: "Impone reglas de facto en zonas donde el Estado ha perdido capacidad efectiva." }
    ]
  },
  "7.2.6": {
    leccion: "Dos aplicaciones concretas de los principios del artículo 89. La **Doctrina Estrada**, formulada en 1930, es el principio de no pronunciarse sobre la legitimidad de los gobiernos extranjeros: México mantiene o retira embajadores, pero no otorga ni niega reconocimientos; es la no intervención llevada a la práctica diplomática. Y el **derecho de asilo** se ha aplicado recibiendo a perseguidos políticos: republicanos españoles, sudamericanos que huían de las dictaduras de los años setenta y refugiados centroamericanos.",
    flashcards: [
      { front: "¿Qué fue la Doctrina Estrada?", back: "El principio mexicano (1930) de no pronunciarse sobre la legitimidad de los gobiernos extranjeros: México mantiene o retira embajadores, pero no otorga ni niega reconocimientos." }
    ],
    quiz: [
      { q: "México se abstiene de pronunciarse sobre la legitimidad del gobierno que acaba de tomar el poder en otro país, y se limita a decidir si mantiene o retira a su embajador. ¿Qué principio aplica?", options: ["No intervención, en su formulación de la Doctrina Estrada","Cooperación internacional","Igualdad jurídica de los Estados"], correct: 0, explanation: "La Doctrina Estrada es la aplicación diplomática de la no intervención: no se otorgan ni se niegan reconocimientos a gobiernos extranjeros, porque eso equivaldría a juzgar un asunto interno." },
      { q: "México propone que dos países resuelvan su disputa mediante negociación en vez de la fuerza. Ese principio es:", options: ["La solución pacífica de controversias","La autodeterminación de los pueblos","La proscripción de la amenaza"], correct: 0, explanation: "Es uno de los principios del artículo 89 constitucional." },
      { q: "El principio de autodeterminación de los pueblos significa que:", options: ["Cada nación decide libremente su régimen político y económico","Los países más fuertes deciden por los demás","Todos los Estados deben tener el mismo sistema"], correct: 0, explanation: "Es la contracara de la no intervención: nadie decide por otro pueblo." },
      { q: "¿En qué artículo constitucional se establecen los principios de política exterior mexicana?", options: ["En el artículo 89","En el artículo 27","En el artículo 123"], correct: 0, explanation: "El 89, fracción X, los enumera como guía obligada del Ejecutivo." }
    ]
  },
  "7.2.7": {
    leccion: "Tres organismos internacionales más, con funciones que el examen suele contrastar. La **OMS** (Organización Mundial de la Salud) coordina la respuesta internacional en salud pública: emite recomendaciones, declara emergencias sanitarias y apoya a los sistemas de salud. **Unicef** es el Fondo de las Naciones Unidas para la Infancia y promueve los derechos, la salud y la educación de niñas, niños y adolescentes. Y el par financiero: el **FMI** vigila la estabilidad financiera y presta a países con crisis de balanza de pagos, mientras que el **Banco Mundial** financia proyectos de desarrollo a largo plazo.",
    quiz: [
      { q: "Declarar un sitio como Patrimonio de la Humanidad corresponde a:", options: ["La Unesco","La FAO","La OIT"], correct: 0, explanation: "La Unesco atiende educación, ciencia y cultura, incluido el patrimonio mundial." },
      { q: "Un país solicita apoyo técnico para combatir la desnutrición infantil en zonas rurales. ¿Qué organismo interviene?", options: ["La FAO","La OIT","La Unesco"], correct: 0, explanation: "La FAO trabaja en seguridad alimentaria y desarrollo agrícola." },
      { q: "La lucha internacional contra el trabajo infantil y por condiciones laborales dignas corresponde a:", options: ["La OIT","La OMS","El FMI"], correct: 0, explanation: "La Organización Internacional del Trabajo fija normas laborales internacionales." }
    ]
  },
  "7.2.8": {
    flashcards: [
      { front: "¿Qué es la teoría de la dependencia?", back: "La corriente latinoamericana (Prebisch, Cardoso) que explica el subdesarrollo como resultado de la relación desigual entre centro y periferia, no como una etapa previa al desarrollo." },
      { front: "¿Por qué México se clasifica como semiperiferia?", back: "Porque tiene industria manufacturera importante y exporta bienes elaborados, pero depende de tecnología, capital e inversión extranjeros, sobre todo de Estados Unidos." }
    ],
    quiz: [
      { q: "Un país que exporta principalmente materias primas sin procesar y depende de la tecnología extranjera se clasifica como:", options: ["Área periférica","Área central","Arena exterior"], correct: 0, explanation: "La periferia aporta recursos y mano de obra barata a la economía mundial." },
      { q: "¿Qué caracteriza a las áreas centrales del sistema-mundo?", options: ["Concentran tecnología, capital e industrias de alto valor agregado","Dependen de la exportación de materias primas","Están fuera del comercio internacional"], correct: 0, explanation: "Controlan las etapas más rentables de las cadenas productivas globales." },
      { q: "La teoría del sistema-mundo fue formulada por:", options: ["Immanuel Wallerstein","Max Weber","Émile Durkheim"], correct: 0, explanation: "Wallerstein propuso analizar la economía capitalista como un único sistema global jerarquizado." },
      { q: "El intercambio desigual entre centro y periferia consiste en que:", options: ["La periferia vende barato materias primas y compra caro productos manufacturados","Ambos intercambian productos del mismo valor","La periferia impone los precios"], correct: 0, explanation: "Esa asimetría de precios es el mecanismo que reproduce la dependencia." }
    ]
  },
  "7.3.1": {
    flashcards: [
      { front: "¿Qué son los grupos primarios y secundarios?", back: "Los **primarios** son íntimos y duraderos (familia, amigos cercanos); los **secundarios** son más formales y orientados a un fin (compañeros de trabajo, un comité)." }
    ],
    quiz: [
      { q: "La familia, la escuela y el gobierno son ejemplos de:", options: ["Instituciones sociales","Grupos primarios exclusivamente","Clases sociales"], correct: 0, explanation: "Son estructuras estables de normas que regulan actividades sociales fundamentales." },
      { q: "Un conjunto de personas que comparten territorio, historia y tradiciones forma:", options: ["Una comunidad","Una clase social","Una institución"], correct: 0, explanation: "El vínculo territorial y cultural es lo que define a la comunidad." },
      { q: "Una clase social se define principalmente por:", options: ["La posición económica y el acceso a recursos de sus integrantes","El lugar de nacimiento","El número de integrantes"], correct: 0, explanation: "Ingreso, propiedad y ocupación determinan la posición dentro de la estructura social." }
    ]
  },
  "7.3.2": {
    flashcards: [
      { front: "¿Qué es la infraestructura social básica?", back: "El conjunto de obras y servicios que sostienen la vida comunitaria: agua potable, drenaje, electricidad, caminos, escuelas y centros de salud." }
    ],
    quiz: [
      { q: "¿Qué institución genera las estadísticas oficiales de desarrollo en México?", options: ["El Inegi","El INE","La Profeco"], correct: 0, explanation: "El Instituto Nacional de Estadística y Geografía levanta censos y encuestas nacionales." },
      { q: "Una comunidad sin drenaje ni agua entubada presenta carencias en:", options: ["Servicios básicos de la vivienda","Percepción de seguridad","Nivel educativo"], correct: 0, explanation: "Es uno de los indicadores centrales de desarrollo comunitario y de pobreza multidimensional." },
      { q: "¿Para qué sirven los indicadores de desarrollo comunitario?", options: ["Para focalizar programas y decidir dónde invertir recursos públicos","Para calcular el PIB nacional","Para organizar elecciones"], correct: 0, explanation: "Permiten identificar qué localidades requieren atención prioritaria." },
      { q: "El censo de población y vivienda se levanta en México cada:", options: ["10 años","2 años","20 años"], correct: 0, explanation: "El Inegi realiza el censo decenal, con conteos intermedios y encuestas anuales." }
    ]
  },
  "7.3.3": {
    flashcards: [
      { front: "¿Qué es el Índice de Desarrollo Humano (IDH)?", back: "Un indicador del PNUD que combina esperanza de vida, años de escolaridad e ingreso per cápita. Va de 0 a 1 y mide bienestar más allá del crecimiento económico." },
      { front: "¿Por qué el PIB per cápita no basta para medir bienestar?", back: "Porque es un promedio: no dice cómo se reparte el ingreso ni refleja salud, educación, seguridad o calidad ambiental." }
    ],
    quiz: [
      { q: "El Índice de Desarrollo Humano combina:", options: ["Salud, educación e ingreso","Solo el ingreso por habitante","Únicamente los años de escolaridad"], correct: 0, explanation: "Las tres dimensiones buscan capturar las oportunidades reales de las personas." },
      { q: "¿Por qué dos países con el mismo PIB per cápita pueden tener niveles de bienestar muy distintos?", options: ["Porque la distribución del ingreso y el acceso a servicios pueden ser muy desiguales","Porque el PIB se calcula distinto en cada país","Porque el PIB incluye la esperanza de vida"], correct: 0, explanation: "El promedio esconde la desigualdad: puede haber gran riqueza concentrada junto a carencias extendidas." },
      { q: "La esperanza de vida al nacer es un indicador de:", options: ["Bienestar, asociado a las condiciones de salud y nutrición","Producción industrial","Participación electoral"], correct: 0, explanation: "Resume el efecto acumulado de salud, alimentación y condiciones de vida en una población." },
      { q: "La percepción de seguridad se considera un indicador de bienestar porque:", options: ["Afecta directamente la calidad de vida y la libertad cotidiana de las personas","Mide el número de policías","Determina el PIB"], correct: 0, explanation: "El miedo restringe la movilidad, la actividad económica y la vida social." }
    ]
  },
  "7.3.4": {
    leccion: "Dos elementos más sobre la segregación. El **Conapred** es el Consejo Nacional para Prevenir la Discriminación: recibe quejas por discriminación cometida por particulares o por servidores públicos y promueve políticas de igualdad; es la institución a la que apuntan los reactivos que describen un caso de trato discriminatorio. Y la **segregación residencial** es la separación física de grupos sociales en el espacio urbano —fraccionamientos cerrados frente a colonias sin servicios—, que reproduce la desigualdad de oportunidades por la vía del territorio.",
    flashcards: [
      { front: "¿Qué es la segregación residencial?", back: "La separación física de grupos sociales en el espacio urbano: fraccionamientos cerrados frente a colonias sin servicios. Reproduce la desigualdad de oportunidades." }
    ],
    quiz: [
      { q: "Un anuncio de empleo que pide 'buena presentación' y foto puede propiciar:", options: ["Discriminación por apariencia u origen étnico","Igualdad de oportunidades","Movilidad social"], correct: 0, explanation: "Introduce criterios ajenos a la capacidad para el puesto y suele traducirse en exclusión." },
      { q: "¿Cuál es la diferencia entre estereotipo y discriminación?", options: ["El estereotipo es la idea generalizada; la discriminación es el trato desigual que puede derivar de ella","Son sinónimos","La discriminación es una idea y el estereotipo una acción"], correct: 0, explanation: "El prejuicio está en la cabeza; la discriminación se manifiesta en actos concretos." },
      { q: "Una escuela sin rampas ni señalización accesible genera:", options: ["Exclusión de estudiantes con discapacidad","Segregación residencial","Movilidad social ascendente"], correct: 0, explanation: "Las barreras físicas impiden el ejercicio efectivo del derecho a la educación." }
    ]
  },
  "7.3.5": {
    flashcards: [
      { front: "¿Cuáles son los cuatro principios de la Convención sobre los Derechos del Niño?", back: "No discriminación, interés superior de la niñez, derecho a la vida y al desarrollo, y derecho a ser escuchado y a participar." },
      { front: "¿Qué es el trabajo infantil según la ley mexicana?", back: "El realizado por menores de 15 años, prohibido de manera absoluta. Entre los 15 y 17 años se permite con restricciones de jornada y de actividades peligrosas." }
    ],
    quiz: [
      { q: "Un niño de 12 años trabaja en una obra de construcción y no asiste a la escuela. ¿Qué derechos se vulneran?", options: ["El derecho a la educación y la protección contra el trabajo infantil","Solo el derecho a la identidad","Ninguno, si su familia lo autoriza"], correct: 0, explanation: "El trabajo infantil está prohibido y además le impide ejercer su derecho a estudiar." },
      { q: "El principio del interés superior de la niñez significa que:", options: ["En toda decisión que afecte a un menor debe priorizarse su bienestar","Los menores deciden por sí solos en todos los casos","Los padres deciden sin ninguna restricción"], correct: 0, explanation: "Es el criterio rector de autoridades, familias y tribunales al resolver asuntos que involucren a menores." },
      { q: "Un recién nacido que no es registrado ante el Registro Civil ve vulnerado su derecho a:", options: ["La identidad","La educación","La libre expresión"], correct: 0, explanation: "El registro garantiza nombre y nacionalidad, base para acceder a los demás derechos." },
      { q: "¿A partir de qué edad permite la legislación mexicana el trabajo de adolescentes, con restricciones?", options: ["A los 15 años","A los 12 años","A los 18 años"], correct: 0, explanation: "Antes de los 15 el trabajo está prohibido; de 15 a 17 hay límites de jornada y actividades." }
    ]
  },
  "7.3.6": {
    quiz: [
      { q: "El levantamiento del EZLN en 1994 coincidió deliberadamente con:", options: ["La entrada en vigor del TLCAN","El sismo de la Ciudad de México","La elección presidencial de 2000"], correct: 0, explanation: "El 1 de enero de 1994 buscaba contraponer la exclusión indígena al discurso de modernización." },
      { q: "El movimiento estudiantil de 1968 y su represión tuvieron como consecuencia de largo plazo:", options: ["Una crisis de legitimidad que impulsó reformas políticas posteriores","La caída inmediata del gobierno","El fin del partido oficial ese mismo año"], correct: 0, explanation: "La matanza de Tlatelolco marcó un quiebre que alimentó la apertura democrática de las décadas siguientes." }
    ]
  },
  "7.3.7": {
    leccion: "Dos temas que acompañan a los tipos de migración. Las **remesas** son el dinero que los migrantes envían a sus familias; en México son una de las principales fuentes de divisas y sostienen el consumo de millones de hogares. Y hay que distinguir tres condiciones jurídicas distintas: el **migrante** se mueve por decisión propia (trabajo, estudio); el **refugiado** huye de persecución o violencia y cuenta con protección internacional; el **solicitante de asilo** es quien pidió esa protección y espera resolución.",
    quiz: [
      { q: "Una familia abandona su comunidad porque grupos armados la amenazaron. Este caso corresponde a:", options: ["Desplazamiento forzado interno","Migración rural-urbana voluntaria","Migración pendular"], correct: 0, explanation: "No hay elección libre: se huye para preservar la vida, y sin cruzar una frontera internacional." },
      { q: "¿Cuál es la principal causa de la migración rural-urbana en México?", options: ["La búsqueda de empleo y servicios que no existen en el campo","El clima más templado de las ciudades","La obligación legal de vivir en zonas urbanas"], correct: 0, explanation: "La falta de oportunidades y de servicios en el medio rural empuja el movimiento hacia las ciudades." }
    ]
  },
  "7.3.8": {
    quiz: [
      { q: "El movimiento feminista en México ha impulsado principalmente:", options: ["El reconocimiento de derechos de las mujeres y la lucha contra la violencia de género","La reducción del gasto público","La privatización de servicios"], correct: 0, explanation: "Del sufragio femenino (1953) a la tipificación del feminicidio, ha transformado el marco legal." },
      { q: "El movimiento antiglobalización critica principalmente:", options: ["El poder de las grandes corporaciones y las desigualdades del libre comercio sin regulación","El uso de internet","La existencia de los Estados nacionales"], correct: 0, explanation: "Cuestiona un modelo económico global que considera concentrador y depredador." },
      { q: "¿Qué caracterizó al movimiento hippie de los años sesenta?", options: ["El rechazo al consumismo y a la guerra, y la búsqueda de una contracultura","La defensa del militarismo","La promoción del libre mercado"], correct: 0, explanation: "Surgió como contracultura pacifista, sobre todo frente a la guerra de Vietnam." }
    ]
  }
};
