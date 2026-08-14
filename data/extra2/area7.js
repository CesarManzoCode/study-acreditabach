/* Segundo paquete de ampliación · Área 7 · Ciencias sociales

   Economía, política y sociología con casos mexicanos concretos, que es
   la forma en que el examen suele plantear los reactivos. */

const AREA7_EXTRA2 = {
  "7.1.1": {
    flashcards: [
      { front: "¿Qué son los bienes libres y los bienes económicos?", back: "Los **libres** son abundantes y no tienen precio (el aire); los **económicos** son escasos frente a las necesidades y por eso se les asigna un precio." },
      { front: "¿Qué es el costo de oportunidad?", back: "El valor de la mejor alternativa a la que se renuncia al tomar una decisión. Estudiar una carrera tiene como costo de oportunidad el sueldo que se dejó de ganar." },
      { front: "¿En qué consiste la pirámide de Maslow?", back: "Ordena las necesidades en cinco niveles: fisiológicas, seguridad, afiliación, reconocimiento y autorrealización. Las de abajo se atienden primero, aunque el orden no es rígido." }
    ],
    quiz: [
      { q: "El alimento, el agua potable y la vivienda son necesidades:", options: ["Materiales vitales", "No vitales", "Suntuarias"], correct: 0, explanation: "Sin ellas se compromete la supervivencia de la persona." },
      { q: "Una persona deja de trabajar para estudiar una carrera. El sueldo que dejó de ganar es:", options: ["Su costo de oportunidad", "Un bien libre", "Un subsidio"], correct: 0, explanation: "Es el valor de la alternativa a la que renunció al elegir estudiar." },
      { q: "El aire que respiramos se clasifica económicamente como:", options: ["Un bien libre, porque es abundante y no tiene precio", "Un bien económico", "Un servicio público"], correct: 0, explanation: "La escasez es lo que convierte a un bien en económico." },
      { q: "En la pirámide de Maslow, la necesidad de reconocimiento se ubica:", options: ["Por encima de las de afiliación y por debajo de la autorrealización", "En la base", "En la cúspide"], correct: 0, explanation: "Es el cuarto nivel de los cinco propuestos." },
      { q: "El problema económico fundamental de toda sociedad es:", options: ["La escasez de recursos frente a necesidades ilimitadas", "El exceso de producción", "La falta de dinero circulante"], correct: 0, explanation: "De esa tensión surgen las preguntas de qué, cómo y para quién producir." }
    ]
  },

  "7.1.2": {
    flashcards: [
      { front: "¿Cuáles son los cuatro factores de la producción?", back: "**Tierra** (recursos naturales), **trabajo** (esfuerzo humano), **capital** (maquinaria, instalaciones, dinero invertido) y **organización** o capacidad empresarial." },
      { front: "¿Qué retribución recibe cada factor productivo?", back: "La tierra recibe **renta**; el trabajo, **salario**; el capital, **interés**; y la organización, **beneficio** o ganancia." },
      { front: "¿Qué es la productividad?", back: "La relación entre lo producido y los recursos empleados. Aumenta con tecnología, capacitación y mejor organización, no solo trabajando más horas." }
    ],
    quiz: [
      { q: "La maquinaria de una fábrica corresponde al factor productivo:", options: ["Capital", "Tierra", "Trabajo"], correct: 0, explanation: "El capital son los bienes producidos que se usan para producir otros bienes." },
      { q: "La retribución que recibe el factor trabajo es:", options: ["El salario", "La renta", "El interés"], correct: 0, explanation: "Cada factor recibe un pago distinto según su aportación al proceso productivo." },
      { q: "Los yacimientos minerales y el agua utilizados en un proceso productivo corresponden al factor:", options: ["Tierra", "Capital", "Organización"], correct: 0, explanation: "El factor tierra agrupa a todos los recursos naturales." },
      { q: "Una empresa que produce lo mismo con menos horas de trabajo gracias a una nueva máquina ha logrado:", options: ["Un aumento de productividad", "Una reducción de la demanda", "Un incremento del costo de oportunidad"], correct: 0, explanation: "Se obtiene el mismo resultado con menos recursos empleados." },
      { q: "El factor organización o capacidad empresarial consiste en:", options: ["Combinar los demás factores y asumir el riesgo de la inversión", "Aportar la materia prima", "Realizar el trabajo físico"], correct: 0, explanation: "Su retribución es el beneficio, que puede ser negativo si la decisión falla." }
    ]
  },

  "7.1.3": {
    flashcards: [
      { front: "¿Qué actividades incluye cada sector productivo?", back: "**Primario**: extracción de recursos naturales (agricultura, pesca, minería). **Secundario**: transformación (industria, construcción). **Terciario**: servicios (comercio, transporte, educación, salud, turismo)." },
      { front: "¿Qué es el sector cuaternario?", back: "El vinculado al conocimiento: investigación, desarrollo tecnológico, información y servicios de alta especialización. Algunos autores lo separan del terciario." },
      { front: "¿Cómo se distribuye el empleo en México por sectores?", back: "El terciario concentra la mayor parte del empleo (alrededor del 60 %), seguido del secundario; el primario ocupa la proporción menor pese a su importancia alimentaria." }
    ],
    quiz: [
      { q: "La pesca y la agricultura pertenecen al sector:", options: ["Primario", "Secundario", "Terciario"], correct: 0, explanation: "Obtienen recursos directamente de la naturaleza." },
      { q: "Una armadora de automóviles pertenece al sector:", options: ["Secundario", "Primario", "Terciario"], correct: 0, explanation: "Transforma materias primas en bienes elaborados." },
      { q: "El turismo, el comercio y el transporte forman parte del sector:", options: ["Terciario", "Secundario", "Cuaternario"], correct: 0, explanation: "Son servicios, no producción de bienes materiales." },
      { q: "Un laboratorio de investigación y desarrollo tecnológico se clasifica en el sector:", options: ["Cuaternario", "Primario", "Secundario"], correct: 0, explanation: "Su producto es conocimiento e innovación." },
      { q: "En México, el sector que concentra la mayor proporción del empleo es:", options: ["El terciario", "El primario", "El secundario"], correct: 0, explanation: "Los servicios ocupan cerca del 60 % de la población ocupada." }
    ]
  },

  "7.1.4": {
    flashcards: [
      { front: "¿Qué mide el coeficiente de Gini?", back: "La desigualdad en la distribución del ingreso. Va de 0 (igualdad perfecta) a 1 (un solo hogar concentra todo). México ronda el 0.45." },
      { front: "¿Qué es la curva de Lorenz?", back: "La gráfica que compara la distribución real del ingreso con la línea de igualdad perfecta: cuanto más se aleja de la diagonal, mayor es la desigualdad." },
      { front: "¿Qué diferencia hay entre distribución primaria y secundaria del ingreso?", back: "La **primaria** es la que resulta del mercado (salarios, rentas, ganancias); la **secundaria** es la que queda después de impuestos y transferencias del Estado." }
    ],
    quiz: [
      { q: "Un coeficiente de Gini cercano a 1 indica:", options: ["Una concentración extrema del ingreso en pocas manos", "Una distribución equitativa", "Que no hay datos disponibles"], correct: 0, explanation: "El valor 1 representa el caso extremo en que un solo hogar concentra todo el ingreso." },
      { q: "La distribución del ingreso que resulta directamente del mercado, antes de impuestos, se llama:", options: ["Primaria", "Secundaria", "Terciaria"], correct: 0, explanation: "Corresponde a la retribución de los factores productivos." },
      { q: "La curva de Lorenz refleja mayor desigualdad cuando:", options: ["Se aleja más de la diagonal de igualdad perfecta", "Coincide con la diagonal", "Tiene pendiente constante"], correct: 0, explanation: "El área entre la curva y la diagonal es proporcional al coeficiente de Gini." },
      { q: "El salario mínimo es un mecanismo de distribución que actúa:", options: ["Sobre la distribución primaria del ingreso", "Solo mediante transferencias", "Únicamente en el sector público"], correct: 0, explanation: "Fija un piso a la retribución del factor trabajo en el propio mercado." },
      { q: "La concentración del ingreso en México se explica principalmente por:", options: ["La desigualdad salarial, la informalidad y el acceso desigual a educación y activos", "La escasez de recursos naturales", "El tamaño del territorio"], correct: 0, explanation: "Son factores estructurales que reproducen la desigualdad entre generaciones." }
    ]
  },

  "7.1.5": {
    flashcards: [
      { front: "¿Qué define al empleo informal?", back: "La ausencia de registro ante la seguridad social: sin IMSS, sin prestaciones de ley y sin contrato. No es lo mismo que trabajo ilegal ni que trabajo en la calle." },
      { front: "¿Cuáles son las prestaciones mínimas de ley en México?", back: "Aguinaldo (15 días mínimo), vacaciones pagadas con prima vacacional del 25 %, seguridad social (IMSS), Infonavit y participación en las utilidades." },
      { front: "¿Qué es el subempleo?", back: "La situación de quien trabaja menos horas de las que quisiera o en actividades por debajo de su calificación. Cuenta como ocupado en las estadísticas, pero refleja precariedad." }
    ],
    quiz: [
      { q: "El rasgo que define al empleo informal es:", options: ["La falta de registro ante la seguridad social y de prestaciones de ley", "Trabajar en la vía pública", "Ganar poco dinero"], correct: 0, explanation: "El criterio estadístico es el acceso a la seguridad social, no el lugar ni el ingreso." },
      { q: "Una consecuencia de la informalidad para el trabajador es:", options: ["Carecer de pensión, incapacidades y servicio médico", "Pagar más impuestos", "Tener contratos más largos"], correct: 0, explanation: "Al no cotizar, queda fuera del sistema de protección social." },
      { q: "Una consecuencia de la informalidad para el Estado es:", options: ["La menor recaudación fiscal para financiar servicios públicos", "El exceso de trámites", "El aumento del salario mínimo"], correct: 0, explanation: "Una base gravable reducida limita la capacidad de gasto social." },
      { q: "El aguinaldo mínimo que establece la Ley Federal del Trabajo equivale a:", options: ["15 días de salario", "30 días de salario", "7 días de salario"], correct: 0, explanation: "Es la prestación mínima obligatoria, pagadera antes del 20 de diciembre." },
      { q: "Una persona con estudios de ingeniería que trabaja unas pocas horas como repartidor por falta de opciones está en situación de:", options: ["Subempleo", "Desempleo abierto", "Empleo formal"], correct: 0, explanation: "Trabaja por debajo de su calificación y menos horas de las que desearía." }
    ]
  },

  "7.1.6": {
    flashcards: [
      { front: "¿Qué diferencia hay entre impuesto progresivo y regresivo?", back: "El **progresivo** cobra una tasa mayor a quien más gana (ISR); el **regresivo** aplica la misma tasa a todos y por eso pesa más sobre los ingresos bajos (IVA)." },
      { front: "¿Qué son las transferencias condicionadas?", back: "Apoyos monetarios sujetos a una contraprestación, como mantener a los hijos en la escuela o asistir a revisiones médicas." },
      { front: "¿Qué es el gasto social?", back: "El destinado a educación, salud, vivienda, pensiones y programas de combate a la pobreza. Es el principal instrumento redistributivo del Estado junto con los impuestos." }
    ],
    quiz: [
      { q: "El impuesto sobre la renta (ISR) es progresivo porque:", options: ["La tasa aumenta conforme crece el ingreso del contribuyente", "Es el mismo para todos", "Solo lo pagan las empresas"], correct: 0, explanation: "La progresividad busca que quien más tiene aporte proporcionalmente más." },
      { q: "El IVA se considera un impuesto regresivo porque:", options: ["Al aplicarse por igual, representa una carga mayor para los ingresos bajos", "Solo lo pagan los ricos", "Es voluntario"], correct: 0, explanation: "Quien gana poco destina una proporción mayor de su ingreso al consumo." },
      { q: "Una beca escolar entregada a condición de que el estudiante asista a clases es:", options: ["Una transferencia condicionada", "Un impuesto indirecto", "Un subsidio a la producción"], correct: 0, explanation: "El apoyo está sujeto al cumplimiento de una contraprestación." },
      { q: "Los servicios públicos gratuitos de salud y educación son mecanismos de redistribución porque:", options: ["Otorgan a todos un beneficio financiado principalmente por quienes más aportan", "Generan ingresos fiscales", "Reducen el gasto público"], correct: 0, explanation: "Constituyen el llamado salario indirecto o social." },
      { q: "El sistema de pensiones redistribuye ingresos principalmente:", options: ["Entre generaciones y a lo largo del ciclo de vida", "Entre países", "Entre sectores productivos"], correct: 0, explanation: "Los trabajadores activos financian, total o parcialmente, a los jubilados." }
    ]
  },

  "7.1.7": {
    flashcards: [
      { front: "¿Cuándo y por qué surge el Estado de bienestar?", back: "Tras la crisis de 1929 y sobre todo después de la Segunda Guerra Mundial, con las ideas de Keynes y el Informe Beveridge: el Estado interviene para garantizar empleo, servicios y protección social." },
      { front: "¿Qué propone el keynesianismo?", back: "Que en las crisis el Estado aumente el gasto público para sostener la demanda agregada y el empleo, incluso a costa de déficit temporal." },
      { front: "¿Cuáles son los pilares del Estado de bienestar?", back: "Educación y salud universales, seguridad social (pensiones, desempleo), políticas de pleno empleo y regulación laboral protectora." }
    ],
    quiz: [
      { q: "El Estado de bienestar se caracteriza por:", options: ["Garantizar servicios y protección social universales mediante intervención estatal", "Reducir al mínimo la participación del Estado", "Eliminar los impuestos progresivos"], correct: 0, explanation: "Su premisa es que ciertos derechos no pueden depender del mercado." },
      { q: "La propuesta keynesiana ante una crisis económica consiste en:", options: ["Aumentar el gasto público para sostener la demanda y el empleo", "Reducir el gasto público al máximo", "Privatizar los servicios"], correct: 0, explanation: "El gasto estatal compensa la caída de la inversión privada." },
      { q: "En México, la creación del IMSS en 1943 y del ISSSTE en 1959 corresponde a:", options: ["La construcción del Estado de bienestar mexicano", "La etapa neoliberal", "El periodo porfirista"], correct: 0, explanation: "Institucionalizaron la seguridad social de los trabajadores." },
      { q: "El Informe Beveridge (1942) es relevante porque:", options: ["Sentó las bases del sistema de seguridad social universal británico", "Creó el Fondo Monetario Internacional", "Estableció el patrón oro"], correct: 0, explanation: "Definió la protección social «de la cuna a la tumba»." },
      { q: "La crisis del Estado de bienestar en los años setenta se atribuye principalmente a:", options: ["La combinación de estancamiento e inflación y al aumento del déficit público", "El exceso de empleo formal", "La reducción de la población"], correct: 0, explanation: "La estanflación puso en cuestión el recetario keynesiano y abrió paso al neoliberalismo." }
    ]
  },

  "7.1.8": {
    flashcards: [
      { front: "¿Qué fue el Consenso de Washington?", back: "El conjunto de recomendaciones de los años ochenta y noventa: disciplina fiscal, liberalización comercial y financiera, privatización, desregulación y garantía de los derechos de propiedad." },
      { front: "¿Qué autores sustentan el neoliberalismo?", back: "Friedrich Hayek y Milton Friedman, quienes sostienen que el mercado asigna los recursos mejor que el Estado y que la intervención estatal genera distorsiones." },
      { front: "¿Qué se le critica al modelo neoliberal?", back: "El aumento de la desigualdad, la precarización del empleo, el debilitamiento de los servicios públicos y la vulnerabilidad ante las crisis financieras internacionales." }
    ],
    quiz: [
      { q: "Una medida característica del modelo neoliberal es:", options: ["La privatización de empresas estatales", "La expansión del gasto social", "El aumento de los aranceles"], correct: 0, explanation: "Se busca reducir el tamaño del Estado y ampliar el espacio del mercado." },
      { q: "El Consenso de Washington recomendaba:", options: ["Disciplina fiscal, apertura comercial y desregulación", "Nacionalizar la banca", "Cerrar la economía"], correct: 0, explanation: "Fue el recetario aplicado en América Latina desde los años ochenta." },
      { q: "En México, la venta de Teléfonos de México en 1990 ilustra:", options: ["La política de privatización del modelo neoliberal", "El fortalecimiento del Estado empresario", "La expropiación de bienes"], correct: 0, explanation: "Formó parte del desmantelamiento del sector paraestatal." },
      { q: "La crítica más frecuente al neoliberalismo señala que:", options: ["Aumentó la desigualdad y precarizó el empleo", "Redujo las exportaciones", "Impidió la inversión extranjera"], correct: 0, explanation: "El crecimiento obtenido no se tradujo en mejor distribución del ingreso." },
      { q: "Según el pensamiento neoliberal, el papel del Estado en la economía debe ser:", options: ["Limitado a garantizar la propiedad, la competencia y la estabilidad macroeconómica", "Central en la producción de bienes", "Fijar todos los precios"], correct: 0, explanation: "Se le reserva la función de árbitro, no la de agente productivo." }
    ]
  },

  "7.1.9": {
    flashcards: [
      { front: "¿Qué es la huella ecológica?", back: "La superficie de territorio productivo necesaria para sostener el consumo de una población y absorber sus residuos. Permite comparar países y estilos de vida." },
      { front: "¿Qué es la obsolescencia programada?", back: "El diseño deliberado de productos con vida útil corta para forzar su reemplazo. Multiplica los residuos electrónicos y el consumo de materias primas." },
      { front: "¿Qué es la economía circular?", back: "El modelo que sustituye el esquema extraer-producir-desechar por uno de reducción, reutilización, reparación y reciclaje, manteniendo los materiales en uso el mayor tiempo posible." }
    ],
    quiz: [
      { q: "El modelo económico de «extraer, producir y desechar» se denomina:", options: ["Economía lineal", "Economía circular", "Economía solidaria"], correct: 0, explanation: "Supone recursos infinitos y capacidad ilimitada del planeta para absorber residuos." },
      { q: "El diseño de aparatos con vida útil deliberadamente corta se llama:", options: ["Obsolescencia programada", "Innovación disruptiva", "Depreciación contable"], correct: 0, explanation: "Su efecto principal es el aumento de los residuos electrónicos." },
      { q: "La huella ecológica mide:", options: ["La superficie productiva necesaria para sostener el consumo de una población", "El número de fábricas de un país", "El nivel de contaminación del aire"], correct: 0, explanation: "Compara la demanda de recursos con la biocapacidad disponible." },
      { q: "Las externalidades negativas de la producción son:", options: ["Costos ambientales o sociales que no paga la empresa sino la sociedad", "Los impuestos que paga la empresa", "Las ganancias no distribuidas"], correct: 0, explanation: "La contaminación de un río es el ejemplo clásico de costo trasladado a terceros." },
      { q: "El principio de «quien contamina paga» busca:", options: ["Que el responsable asuma el costo del daño ambiental que provoca", "Prohibir toda actividad industrial", "Subsidiar a las empresas contaminantes"], correct: 0, explanation: "Internaliza la externalidad en los costos de producción." }
    ]
  },

  "7.2.1": {
    flashcards: [
      { front: "¿Qué sostiene Hobbes sobre el origen del Estado?", back: "Que en el estado de naturaleza hay una guerra de todos contra todos, por lo que los individuos ceden su libertad a un soberano absoluto (el Leviatán) a cambio de seguridad." },
      { front: "¿Qué sostiene Locke?", back: "Que en el estado de naturaleza existen derechos naturales (vida, libertad, propiedad) y el Estado se crea para protegerlos. Si el gobernante los viola, el pueblo tiene derecho de rebelión." },
      { front: "¿Qué sostiene Rousseau?", back: "Que el ser humano nace bueno y la sociedad lo corrompe; mediante el contrato social el pueblo se da a sí mismo las leyes, y la soberanía reside en la voluntad general." }
    ],
    quiz: [
      { q: "«El hombre es un lobo para el hombre» y la necesidad de un poder absoluto corresponden a:", options: ["Thomas Hobbes", "John Locke", "Jean-Jacques Rousseau"], correct: 0, explanation: "Es la tesis central del Leviatán." },
      { q: "El autor que fundamenta el derecho de rebelión frente a un gobierno que viola los derechos naturales es:", options: ["John Locke", "Thomas Hobbes", "Nicolás Maquiavelo"], correct: 0, explanation: "Su planteamiento influyó en las revoluciones inglesa, estadounidense y francesa." },
      { q: "El concepto de «voluntad general» pertenece a:", options: ["Rousseau", "Hobbes", "Weber"], correct: 0, explanation: "Es el fundamento de la soberanía popular en El contrato social." },
      { q: "Max Weber define al Estado como la organización que:", options: ["Reclama con éxito el monopolio de la violencia legítima en un territorio", "Distribuye el ingreso", "Representa la voluntad divina"], correct: 0, explanation: "Es la definición sociológica más citada del Estado moderno." },
      { q: "Los tres elementos constitutivos del Estado son:", options: ["Territorio, población y gobierno soberano", "Ejército, moneda y bandera", "Constitución, partidos y elecciones"], correct: 0, explanation: "Sin cualquiera de los tres no se configura un Estado." }
    ]
  },

  "7.2.2": {
    flashcards: [
      { front: "¿Qué diferencia hay entre democracia directa y representativa?", back: "En la **directa** los ciudadanos deciden ellos mismos (asamblea, referéndum); en la **representativa** eligen a quienes deciden en su nombre." },
      { front: "¿Qué características debe tener el voto en una democracia?", back: "Universal, libre, secreto, directo, personal e intransferible. Son los principios que garantizan la autenticidad del sufragio." },
      { front: "¿Qué son la consulta popular y la revocación de mandato?", back: "Mecanismos de democracia participativa: la **consulta** somete un tema a votación ciudadana; la **revocación** permite decidir si un gobernante concluye o no su periodo." }
    ],
    quiz: [
      { q: "Que el voto sea secreto tiene como propósito principal:", options: ["Evitar presiones, represalias y compra del sufragio", "Agilizar el conteo", "Reducir el costo de la elección"], correct: 0, explanation: "Protege la libertad efectiva de la decisión del elector." },
      { q: "Un referéndum sobre una reforma constitucional es un mecanismo de democracia:", options: ["Directa o participativa", "Representativa", "Corporativa"], correct: 0, explanation: "La ciudadanía decide el asunto sin intermediación de representantes." },
      { q: "La alternancia en el poder es un indicador de calidad democrática porque:", options: ["Muestra que las elecciones son competitivas y sus resultados se respetan", "Garantiza mejores políticas públicas", "Reduce el número de partidos"], correct: 0, explanation: "La posibilidad real de perder el poder distingue a una democracia de un régimen hegemónico." },
      { q: "El principio de «una persona, un voto» expresa:", options: ["La igualdad política de todos los ciudadanos", "La proporcionalidad del ingreso", "El derecho de petición"], correct: 0, explanation: "Cada voto tiene el mismo peso, sin importar la condición social del elector." },
      { q: "La división de poderes en una democracia sirve para:", options: ["Establecer controles mutuos que eviten la concentración del poder", "Acelerar la toma de decisiones", "Reducir el gasto público"], correct: 0, explanation: "Los pesos y contrapesos son una garantía frente al autoritarismo." }
    ]
  },

  "7.2.3": {
    flashcards: [
      { front: "¿Qué diferencia hay entre nacionalidad y ciudadanía en México?", back: "La **nacionalidad** se adquiere por nacimiento o naturalización; la **ciudadanía** se obtiene al cumplir 18 años teniendo la nacionalidad mexicana y un modo honesto de vivir (artículo 34 constitucional)." },
      { front: "¿Cuáles son las obligaciones de los ciudadanos mexicanos?", back: "Votar, inscribirse en el padrón electoral, desempeñar los cargos de elección popular y de jurado, y contribuir al gasto público mediante impuestos (artículos 31 y 36)." },
      { front: "¿Cómo se pierde o suspende la ciudadanía?", back: "Se suspende por no cumplir las obligaciones ciudadanas sin causa justificada, durante un proceso penal con pena corporal o por sentencia condenatoria firme, entre otros supuestos del artículo 38." }
    ],
    quiz: [
      { q: "Según el artículo 34 constitucional, para ser ciudadano mexicano se requiere:", options: ["Tener la nacionalidad mexicana, 18 años cumplidos y un modo honesto de vivir", "Tener 21 años y ser propietario", "Estar inscrito en un partido político"], correct: 0, explanation: "Son los tres requisitos que establece el texto constitucional." },
      { q: "La diferencia entre nacionalidad y ciudadanía es que la ciudadanía:", options: ["Otorga además derechos políticos como votar y ser votado", "Se pierde al salir del país", "Se adquiere al nacer"], correct: 0, explanation: "Todo ciudadano es nacional, pero no todo nacional es ciudadano." },
      { q: "Votar en las elecciones es, para el ciudadano mexicano:", options: ["Un derecho y a la vez una obligación constitucional", "Solo un derecho opcional", "Una obligación exclusiva de los funcionarios"], correct: 0, explanation: "El artículo 36 lo enumera entre las obligaciones ciudadanas." },
      { q: "Una persona nacida en el extranjero de padre o madre mexicanos:", options: ["Es mexicana por nacimiento", "Debe naturalizarse", "Pierde la nacionalidad a los 18 años"], correct: 0, explanation: "La Constitución reconoce la nacionalidad por el criterio de sangre además del de territorio." },
      { q: "Contribuir al gasto público mediante el pago de impuestos es:", options: ["Una obligación establecida en el artículo 31 constitucional", "Una decisión voluntaria", "Una obligación solo de las empresas"], correct: 0, explanation: "Es una obligación de todos los mexicanos, proporcional y equitativa." }
    ]
  },

  "7.2.4": {
    flashcards: [
      { front: "¿Qué son los organismos constitucionales autónomos?", back: "Instituciones que no dependen de ninguno de los tres poderes para garantizar imparcialidad: INE, CNDH, Banco de México, INEGI y la Fiscalía General, entre otros." },
      { front: "¿Cuál es la función del Banco de México?", back: "Procurar la estabilidad del poder adquisitivo de la moneda: controla la inflación mediante la tasa de interés y regula el sistema de pagos. Su autonomía data de 1994." },
      { front: "¿Qué hace la Suprema Corte de Justicia de la Nación?", back: "Es el máximo tribunal del país y funciona como tribunal constitucional: resuelve controversias entre poderes, acciones de inconstitucionalidad y establece jurisprudencia obligatoria." }
    ],
    quiz: [
      { q: "La institución encargada de organizar las elecciones federales en México es:", options: ["El INE", "La Suprema Corte", "La Secretaría de Gobernación"], correct: 0, explanation: "Es un organismo público autónomo con esa función constitucional." },
      { q: "La función principal del Banco de México es:", options: ["Procurar la estabilidad del poder adquisitivo de la moneda", "Recaudar impuestos", "Aprobar el presupuesto"], correct: 0, explanation: "El control de la inflación es su mandato constitucional prioritario." },
      { q: "La aprobación del Presupuesto de Egresos de la Federación corresponde a:", options: ["La Cámara de Diputados", "El Senado", "La Suprema Corte"], correct: 0, explanation: "Es una facultad exclusiva de la Cámara de Diputados." },
      { q: "La ratificación de los tratados internacionales corresponde a:", options: ["El Senado de la República", "La Cámara de Diputados", "El INE"], correct: 0, explanation: "Es una facultad exclusiva de la cámara alta." },
      { q: "La Comisión Nacional de los Derechos Humanos tiene como función:", options: ["Investigar violaciones a derechos humanos y emitir recomendaciones no vinculantes", "Juzgar delitos federales", "Organizar consultas populares"], correct: 0, explanation: "Sus recomendaciones tienen fuerza moral y política, no obligatoriedad jurídica." }
    ]
  },

  "7.2.5": {
    flashcards: [
      { front: "¿Qué son los poderes fácticos?", back: "Actores que influyen de manera decisiva en las decisiones públicas sin haber sido electos ni tener facultades legales para ello: grandes empresas, medios, iglesias, sindicatos y crimen organizado." },
      { front: "¿Por qué los poderes fácticos son un problema democrático?", back: "Porque ejercen poder sin mandato ciudadano ni rendición de cuentas, y pueden imponer intereses privados sobre el interés público." },
      { front: "¿Qué es la captura del Estado?", back: "La situación en que grupos privados logran que las leyes y las políticas públicas se diseñen a su medida, convirtiendo la regulación en un privilegio." }
    ],
    quiz: [
      { q: "Los poderes fácticos se caracterizan porque:", options: ["Influyen en las decisiones públicas sin mandato electoral ni rendición de cuentas", "Están regulados por la Constitución", "Son electos cada seis años"], correct: 0, explanation: "Su poder es real pero carece de legitimidad democrática." },
      { q: "Que un consorcio de medios condicione la aprobación de una ley que lo regula es un ejemplo de:", options: ["Poder fáctico incidiendo en el proceso legislativo", "División de poderes", "Democracia participativa"], correct: 0, explanation: "El actor privado sustituye el debate público por su propio interés." },
      { q: "La captura del Estado ocurre cuando:", options: ["Grupos privados logran que las políticas públicas se diseñen a su favor", "El Estado nacionaliza una empresa", "Un partido gana las elecciones"], correct: 0, explanation: "La regulación deja de proteger el interés general." },
      { q: "El principal instrumento para limitar a los poderes fácticos es:", options: ["La transparencia, la regulación y la rendición de cuentas", "El aumento del gasto público", "La reducción del número de partidos"], correct: 0, explanation: "Hacer visible la influencia es la condición para poder acotarla." },
      { q: "El crimen organizado se considera un poder fáctico porque:", options: ["Condiciona decisiones públicas y disputa al Estado el control territorial", "Participa en elecciones", "Está reconocido legalmente"], correct: 0, explanation: "Erosiona el monopolio estatal de la violencia legítima." }
    ]
  },

  "7.2.6": {
    flashcards: [
      { front: "¿Cuáles son los principios de política exterior del artículo 89 constitucional?", back: "Autodeterminación de los pueblos, no intervención, solución pacífica de controversias, proscripción de la amenaza o el uso de la fuerza, igualdad jurídica de los Estados, cooperación internacional para el desarrollo, respeto a los derechos humanos y lucha por la paz y la seguridad internacionales." },
      { front: "¿Qué es la Doctrina Estrada?", back: "El principio, formulado en 1930, de que México no se pronuncia sobre la legitimidad de los gobiernos extranjeros: se limita a mantener o retirar a sus representantes diplomáticos." },
      { front: "¿Qué antecedentes históricos explican estos principios?", back: "Las intervenciones extranjeras del siglo XIX y principios del XX: la guerra con Estados Unidos, la intervención francesa y las ocupaciones de Veracruz." }
    ],
    quiz: [
      { q: "El principio de no intervención implica que México:", options: ["No interviene en los asuntos internos de otros Estados", "No participa en organismos internacionales", "No firma tratados comerciales"], correct: 0, explanation: "Deriva directamente de la experiencia histórica de las intervenciones sufridas." },
      { q: "La Doctrina Estrada sostiene que México:", options: ["No juzga la legitimidad de los gobiernos extranjeros ni otorga reconocimientos", "Reconoce solo gobiernos democráticos", "Rompe relaciones con países en conflicto"], correct: 0, explanation: "Se limita a decidir si mantiene o retira a sus agentes diplomáticos." },
      { q: "El principio de autodeterminación de los pueblos significa que:", options: ["Cada pueblo decide su forma de gobierno y su modelo de desarrollo", "Los pueblos indígenas eligen a sus diputados", "Los Estados deben adoptar la democracia liberal"], correct: 0, explanation: "Es la contraparte lógica del principio de no intervención." },
      { q: "El asilo político otorgado por México a exiliados de dictaduras latinoamericanas se relaciona con:", options: ["La tradición mexicana de asilo y el respeto a los derechos humanos", "La política comercial", "El principio de no intervención exclusivamente"], correct: 0, explanation: "Fue una práctica constante durante buena parte del siglo XX." },
      { q: "Los principios de política exterior mexicana están consagrados en:", options: ["El artículo 89 constitucional", "El artículo 27", "La Ley Federal del Trabajo"], correct: 0, explanation: "Se enumeran entre las facultades del Ejecutivo en materia internacional." }
    ]
  },

  "7.2.7": {
    flashcards: [
      { front: "¿Qué organismos integran el sistema de la ONU?", back: "La Asamblea General, el Consejo de Seguridad, la Corte Internacional de Justicia y organismos especializados como UNESCO, OMS, OIT, FAO y UNICEF." },
      { front: "¿Qué hacen el FMI y el Banco Mundial?", back: "El **FMI** otorga créditos de emergencia para estabilizar balanzas de pagos, con condiciones de política económica. El **Banco Mundial** financia proyectos de desarrollo a largo plazo." },
      { front: "¿Qué organismos regionales integran a México?", back: "La OEA (americana), la CEPAL (comisión económica de la ONU para América Latina), la OCDE (países desarrollados y emergentes) y el T-MEC como acuerdo comercial regional." }
    ],
    quiz: [
      { q: "El organismo de la ONU encargado de mantener la paz y la seguridad internacionales es:", options: ["El Consejo de Seguridad", "La UNESCO", "El FMI"], correct: 0, explanation: "Es el único con facultad para imponer sanciones y autorizar el uso de la fuerza." },
      { q: "La organización especializada en educación, ciencia y cultura dentro de la ONU es:", options: ["La UNESCO", "La OMS", "La OIT"], correct: 0, explanation: "También administra la lista del Patrimonio Mundial." },
      { q: "El Fondo Monetario Internacional otorga préstamos principalmente para:", options: ["Estabilizar la balanza de pagos de un país en crisis", "Construir escuelas", "Financiar programas culturales"], correct: 0, explanation: "Sus créditos suelen ir acompañados de condiciones de ajuste económico." },
      { q: "La Organización Internacional del Trabajo (OIT) se ocupa de:", options: ["Fijar normas internacionales sobre derechos laborales", "Regular el comercio de armas", "Administrar la deuda externa"], correct: 0, explanation: "Sus convenios se incorporan a las legislaciones nacionales que los ratifican." },
      { q: "La crítica más frecuente al Consejo de Seguridad de la ONU señala que:", options: ["El derecho de veto de sus cinco miembros permanentes bloquea decisiones", "Tiene demasiados miembros", "Carece de sede fija"], correct: 0, explanation: "Un solo voto en contra de un miembro permanente impide cualquier resolución." }
    ]
  },

  "7.2.8": {
    flashcards: [
      { front: "¿Qué propone la teoría del sistema-mundo de Wallerstein?", back: "Que la economía mundial se organiza en **centro** (alta tecnología y valor agregado), **periferia** (materias primas y mano de obra barata) y **semiperiferia** (posición intermedia, como México o Brasil)." },
      { front: "¿Qué caracteriza a los países del centro?", back: "Concentran la investigación, las finanzas, las marcas y la producción de alto valor agregado; captan la mayor parte de la ganancia de las cadenas globales." },
      { front: "¿Qué es el intercambio desigual?", back: "El mecanismo por el que la periferia exporta bienes de bajo valor agregado e importa bienes caros, lo que transfiere valor de manera sistemática hacia el centro." }
    ],
    quiz: [
      { q: "Según la teoría del sistema-mundo, México se ubica en:", options: ["La semiperiferia", "El centro", "La periferia extrema"], correct: 0, explanation: "Combina manufactura de exportación con dependencia tecnológica y financiera." },
      { q: "Los países del centro se caracterizan por:", options: ["Concentrar tecnología, capital y producción de alto valor agregado", "Exportar solo materias primas", "Carecer de sector financiero"], correct: 0, explanation: "Captan la mayor parte del excedente generado en las cadenas globales." },
      { q: "Un país que exporta principalmente minerales sin procesar y compra maquinaria se ubica en:", options: ["La periferia", "El centro", "La semiperiferia industrializada"], correct: 0, explanation: "Es el patrón clásico de inserción periférica en el mercado mundial." },
      { q: "El intercambio desigual consiste en:", options: ["Exportar bienes de bajo valor agregado e importar bienes de alto valor", "Comerciar solo con países vecinos", "Prohibir las importaciones"], correct: 0, explanation: "Transfiere sistemáticamente valor de la periferia hacia el centro." },
      { q: "La industria maquiladora ilustra la posición semiperiférica porque:", options: ["Aporta mano de obra y ensamblaje, mientras el diseño y la ganancia quedan fuera", "Controla toda la cadena de valor", "Produce sin insumos importados"], correct: 0, explanation: "La etapa realizada en el país es la de menor valor agregado del proceso." }
    ]
  },

  "7.3.1": {
    flashcards: [
      { front: "¿Qué diferencia hay entre grupo primario y secundario?", back: "El **primario** es pequeño, con vínculos afectivos y contacto cara a cara (familia, amigos); el **secundario** es más amplio, impersonal y orientado a un fin (empresa, escuela, sindicato)." },
      { front: "¿Qué es una institución social?", back: "Un conjunto estable de normas, papeles y prácticas que organiza un aspecto de la vida colectiva: la familia, la escuela, el Estado, la religión, el mercado." },
      { front: "¿Qué son las organizaciones de la sociedad civil?", back: "Asociaciones voluntarias, sin fines de lucro y autónomas del Estado y del mercado, que persiguen fines colectivos: derechos humanos, medio ambiente, cultura, asistencia." }
    ],
    quiz: [
      { q: "La familia se clasifica como grupo:", options: ["Primario", "Secundario", "De referencia externa"], correct: 0, explanation: "Los vínculos afectivos y el contacto directo definen a los grupos primarios." },
      { q: "Un sindicato de trabajadores es un ejemplo de organización:", options: ["Secundaria, orientada a la defensa de intereses comunes", "Primaria", "Informal"], correct: 0, explanation: "Su relación es funcional y está mediada por objetivos comunes." },
      { q: "Una institución social se caracteriza por:", options: ["Ser un conjunto estable de normas y papeles que organiza un aspecto de la vida colectiva", "Tener personalidad jurídica siempre", "Depender del gobierno"], correct: 0, explanation: "Su rasgo esencial es la estabilidad normativa, no su forma legal." },
      { q: "Una asociación civil que defiende derechos ambientales forma parte de:", options: ["La sociedad civil organizada", "El sector público", "El sector financiero"], correct: 0, explanation: "Es voluntaria, autónoma y sin fines de lucro." },
      { q: "La escuela cumple, entre otras, la función social de:", options: ["Socializar y transmitir valores y conocimientos entre generaciones", "Regular el mercado laboral", "Administrar la justicia"], correct: 0, explanation: "Es una de las principales agencias de socialización secundaria." }
    ]
  },

  "7.3.2": {
    flashcards: [
      { front: "¿Qué es el capital social de una comunidad?", back: "La red de confianza, cooperación y participación entre sus miembros. Una comunidad con alto capital social resuelve mejor sus problemas colectivos." },
      { front: "¿Qué mide el Índice de Desarrollo Humano (IDH)?", back: "Tres dimensiones combinadas: salud (esperanza de vida), educación (años de escolaridad) e ingreso (INB per cápita). Va de 0 a 1." },
      { front: "¿Qué es el desarrollo comunitario participativo?", back: "El enfoque en que la comunidad diagnostica sus problemas, decide las prioridades y gestiona los proyectos, en vez de recibir soluciones diseñadas desde fuera." }
    ],
    quiz: [
      { q: "El Índice de Desarrollo Humano combina indicadores de:", options: ["Salud, educación e ingreso", "Empleo, vivienda y transporte", "Inflación, deuda y balanza comercial"], correct: 0, explanation: "Fue diseñado para ir más allá del PIB como medida del progreso." },
      { q: "El capital social de una comunidad se refiere a:", options: ["Las redes de confianza y cooperación entre sus miembros", "El dinero acumulado en el banco comunal", "La infraestructura construida"], correct: 0, explanation: "Es un recurso relacional que facilita la acción colectiva." },
      { q: "El desarrollo comunitario participativo se distingue porque:", options: ["La comunidad define sus prioridades y gestiona los proyectos", "Un experto externo decide las obras", "Se financia solo con recursos federales"], correct: 0, explanation: "La apropiación local es lo que da sostenibilidad a los proyectos." },
      { q: "Un indicador de desarrollo comunitario es:", options: ["El acceso a agua potable, salud y educación básica de la población", "El número de automóviles importados", "La cotización de la bolsa"], correct: 0, explanation: "Los indicadores comunitarios miden condiciones de vida concretas." },
      { q: "La principal limitación del PIB per cápita como medida de bienestar es que:", options: ["No refleja la distribución del ingreso ni las condiciones de vida", "Es difícil de calcular", "No considera la producción industrial"], correct: 0, explanation: "Un promedio alto puede coexistir con enorme desigualdad y pobreza." }
    ]
  },

  "7.3.3": {
    flashcards: [
      { front: "¿Cómo mide el CONEVAL la pobreza en México?", back: "Con un enfoque multidimensional: ingreso insuficiente más al menos una de seis carencias sociales (educación, salud, seguridad social, vivienda, servicios básicos y alimentación)." },
      { front: "¿Qué diferencia hay entre pobreza y pobreza extrema?", back: "En la **pobreza** el ingreso no alcanza para cubrir las necesidades y hay carencias sociales; en la **extrema** el ingreso no cubre siquiera la canasta alimentaria y hay tres o más carencias." },
      { front: "¿Qué es la movilidad social?", back: "La posibilidad de cambiar de posición socioeconómica respecto de la familia de origen. En México es baja: la mayoría de quienes nacen en el nivel más bajo permanece ahí." }
    ],
    quiz: [
      { q: "La medición multidimensional de la pobreza en México considera:", options: ["El ingreso y las carencias sociales de forma conjunta", "Solo el nivel de ingreso", "Únicamente el acceso a la vivienda"], correct: 0, explanation: "El CONEVAL combina la dimensión económica con seis carencias sociales." },
      { q: "La pobreza extrema se distingue porque:", options: ["El ingreso no alcanza ni para la canasta alimentaria y hay tres o más carencias", "Se carece de acceso a internet", "El ingreso está por debajo del promedio nacional"], correct: 0, explanation: "Es la situación de mayor gravedad dentro de la medición oficial." },
      { q: "La baja movilidad social en México significa que:", options: ["El origen familiar determina en gran medida la posición socioeconómica futura", "Las personas cambian de residencia con frecuencia", "Hay mucha migración internacional"], correct: 0, explanation: "El punto de partida pesa más que el esfuerzo individual." },
      { q: "El acceso a la seguridad social es un indicador de bienestar porque:", options: ["Protege frente a enfermedad, vejez y pérdida del empleo", "Aumenta el salario nominal", "Sustituye a la educación"], correct: 0, explanation: "Sin protección, cualquier contingencia puede llevar a la pobreza." },
      { q: "Que un país tenga un PIB alto y a la vez elevada pobreza indica:", options: ["Un problema de distribución del ingreso", "Un error en la medición del PIB", "Falta de recursos naturales"], correct: 0, explanation: "La riqueza generada no se traduce automáticamente en bienestar generalizado." }
    ]
  },

  "7.3.4": {
    flashcards: [
      { front: "¿Qué es la segregación residencial?", back: "La separación física de los grupos sociales en el espacio urbano: fraccionamientos cerrados frente a colonias sin servicios. Reduce el contacto entre clases y refuerza la desigualdad." },
      { front: "¿Qué diferencia hay entre estigma y discriminación?", back: "El **estigma** es la marca social negativa que se atribuye a un grupo; la **discriminación** es el trato desigual concreto que se deriva de ella." },
      { front: "¿Qué es la discriminación estructural?", back: "La que no depende de la intención de una persona, sino de reglas, prácticas e instituciones que reproducen desventajas para ciertos grupos de forma sistemática." }
    ],
    quiz: [
      { q: "La existencia de barrios cerrados con acceso restringido junto a zonas sin servicios básicos ejemplifica:", options: ["Segregación residencial", "Movilidad social", "Migración interna"], correct: 0, explanation: "La desigualdad se inscribe en la organización del espacio urbano." },
      { q: "Negar el acceso a un empleo por el color de piel o el apellido de la persona constituye:", options: ["Discriminación", "Segregación voluntaria", "Estratificación funcional"], correct: 0, explanation: "Es un trato desigual basado en una característica ajena al desempeño laboral." },
      { q: "La discriminación estructural se caracteriza porque:", options: ["Se reproduce mediante reglas y prácticas institucionales, sin necesidad de intención individual", "Siempre es deliberada", "Solo ocurre en el ámbito privado"], correct: 0, explanation: "Por eso no basta con la buena voluntad personal para eliminarla." },
      { q: "El clasismo es una forma de segregación basada en:", options: ["La posición socioeconómica de las personas", "El lugar de nacimiento únicamente", "La edad"], correct: 0, explanation: "Jerarquiza a las personas por su origen o nivel social." },
      { q: "En México, el CONAPRED es la institución encargada de:", options: ["Prevenir y eliminar la discriminación", "Organizar elecciones", "Medir la pobreza"], correct: 0, explanation: "Atiende quejas y promueve políticas de igualdad y no discriminación." }
    ]
  },

  "7.3.5": {
    flashcards: [
      { front: "¿Cuáles son los principios rectores de los derechos de la niñez?", back: "El **interés superior de la niñez**, la no discriminación, el derecho a la vida y al desarrollo, y el derecho a ser escuchado y a participar en los asuntos que le afectan." },
      { front: "¿Qué es el interés superior de la niñez?", back: "El criterio por el cual, en cualquier decisión que afecte a un menor, debe prevalecer lo que más beneficie su desarrollo integral por encima de otros intereses." },
      { front: "¿Qué instrumentos protegen a la niñez en México?", back: "La Convención sobre los Derechos del Niño (ONU, 1989), el artículo 4º constitucional y la Ley General de los Derechos de Niñas, Niños y Adolescentes (2014)." }
    ],
    quiz: [
      { q: "El principio del interés superior de la niñez establece que:", options: ["En toda decisión que afecte a un menor debe prevalecer su mayor beneficio", "Los padres deciden siempre sin restricciones", "El Estado sustituye a la familia"], correct: 0, explanation: "Es el criterio rector de todas las decisiones administrativas y judiciales." },
      { q: "El derecho de niñas, niños y adolescentes a ser escuchados implica que:", options: ["Su opinión debe considerarse en los asuntos que les afectan, según su edad y madurez", "Deciden por sí solos en todos los casos", "Solo pueden opinar en la escuela"], correct: 0, explanation: "Es el principio de participación progresiva reconocido en la Convención." },
      { q: "El trabajo infantil está prohibido en México para menores de:", options: ["15 años", "12 años", "18 años en cualquier actividad"], correct: 0, explanation: "La edad mínima es de 15 años, con restricciones adicionales hasta los 18." },
      { q: "El principal instrumento internacional en materia de derechos de la niñez es:", options: ["La Convención sobre los Derechos del Niño de 1989", "La Declaración de Independencia", "El Pacto de San José exclusivamente"], correct: 0, explanation: "Es el tratado de derechos humanos con mayor número de ratificaciones." },
      { q: "El derecho a la identidad de un menor incluye:", options: ["Contar con nombre, nacionalidad y registro de nacimiento", "Elegir su escuela", "Recibir una beca"], correct: 0, explanation: "Sin registro, el acceso a los demás derechos queda comprometido." }
    ]
  },

  "7.3.6": {
    flashcards: [
      { front: "¿Qué efectos sociales tuvo la crisis de 1994-1995 en México?", back: "Devaluación del peso, quiebra de deudores, rescate bancario mediante el Fobaproa, caída del salario real y aumento de la pobreza y de la migración a Estados Unidos." },
      { front: "¿Qué impacto social tuvo la pandemia de COVID-19 en México?", back: "Pérdida de empleos formales e informales, aumento de la pobreza, rezago educativo por el cierre de escuelas y sobrecarga del trabajo de cuidados en los hogares." },
      { front: "¿Qué es una crisis socioambiental?", back: "Aquella en que el deterioro ambiental (sequía, contaminación, pérdida de suelos) se traduce en conflictos sociales por el acceso a recursos como el agua o la tierra." }
    ],
    quiz: [
      { q: "Una consecuencia social directa de la crisis económica de 1995 fue:", options: ["El aumento de la pobreza y de la migración hacia Estados Unidos", "La reducción del desempleo", "El fortalecimiento del salario real"], correct: 0, explanation: "La devaluación y la recesión deterioraron rápidamente el ingreso de los hogares." },
      { q: "El rezago educativo provocado por la pandemia se explica principalmente por:", options: ["El cierre prolongado de escuelas y la desigualdad en el acceso a internet", "La falta de maestros", "El aumento de la matrícula"], correct: 0, explanation: "La brecha digital profundizó las diferencias de aprendizaje entre estudiantes." },
      { q: "El sismo de 1985 tuvo como consecuencia social duradera:", options: ["El fortalecimiento de la organización ciudadana independiente", "La disminución de la población nacional", "El cambio de moneda"], correct: 0, explanation: "La respuesta espontánea de la sociedad marcó un punto de inflexión en la participación ciudadana." },
      { q: "Una crisis socioambiental se caracteriza porque:", options: ["El deterioro ambiental genera conflictos sociales por el acceso a recursos", "Solo afecta a la fauna", "Se resuelve con tecnología"], correct: 0, explanation: "Las disputas por el agua en zonas de sequía son un ejemplo recurrente." },
      { q: "El aumento del empleo informal tras una crisis económica indica:", options: ["Que la población se refugia en actividades de subsistencia sin protección social", "Una mejora del mercado laboral", "Un incremento de la productividad"], correct: 0, explanation: "La informalidad funciona como amortiguador ante la falta de empleo formal." }
    ]
  },

  "7.3.7": {
    flashcards: [
      { front: "¿Qué son los factores de expulsión y de atracción de la migración?", back: "Los de **expulsión** empujan a salir (falta de empleo, violencia, desastres); los de **atracción** invitan a llegar (mejores salarios, seguridad, redes familiares)." },
      { front: "¿Qué es la migración forzada?", back: "La que ocurre sin una decisión libre: desplazamiento por violencia, persecución o desastres. Incluye a refugiados, solicitantes de asilo y desplazados internos." },
      { front: "¿Qué papel tienen las remesas en México?", back: "Son una de las principales fuentes de divisas del país y sostienen el consumo básico, la salud y la educación en numerosos hogares rurales." }
    ],
    quiz: [
      { q: "La migración del campo a la ciudad dentro de un mismo país se denomina:", options: ["Migración interna", "Migración internacional", "Migración pendular internacional"], correct: 0, explanation: "No implica el cruce de una frontera nacional." },
      { q: "La falta de empleo en el lugar de origen es un factor de:", options: ["Expulsión", "Atracción", "Retorno"], correct: 0, explanation: "Empuja a las personas a buscar oportunidades en otro lugar." },
      { q: "Las personas que huyen de su país por persecución y solicitan protección internacional son:", options: ["Refugiadas", "Migrantes económicas", "Turistas de larga estancia"], correct: 0, explanation: "Su condición está reconocida por la Convención de Ginebra de 1951." },
      { q: "Las remesas que reciben los hogares mexicanos se destinan principalmente a:", options: ["Consumo básico, salud y educación", "Inversión bursátil", "Compra de maquinaria industrial"], correct: 0, explanation: "Funcionan como un ingreso de sostenimiento cotidiano." },
      { q: "México se considera un país de origen, tránsito, destino y retorno migratorio porque:", options: ["Sus habitantes emigran, por su territorio pasan migrantes de otros países, recibe inmigrantes y acoge a connacionales que vuelven", "Solo expulsa población", "Solo recibe población"], correct: 0, explanation: "Las cuatro condiciones se presentan simultáneamente en el país." }
    ]
  },

  "7.3.8": {
    flashcards: [
      { front: "¿Qué caracteriza a los movimientos antisistema?", back: "Cuestionan las bases del orden económico o político vigente, no solo una política concreta; suelen ser horizontales, usar la acción directa y desconfiar de los partidos." },
      { front: "¿Qué son los nuevos movimientos sociales?", back: "Los que, desde los años sesenta, articulan demandas de identidad, reconocimiento y calidad de vida (feminismo, ecologismo, derechos LGBT+, pueblos indígenas) más que demandas de clase." },
      { front: "¿Qué papel juegan las redes digitales en los movimientos actuales?", back: "Permiten convocar y coordinar con rapidez y sin estructuras formales, aunque también facilitan la desmovilización rápida y la vigilancia de los participantes." }
    ],
    quiz: [
      { q: "Los movimientos antisistema se distinguen porque:", options: ["Cuestionan las bases del orden vigente y no solo una política concreta", "Buscan ganar elecciones", "Se organizan siempre como partidos"], correct: 0, explanation: "Su horizonte es la transformación estructural, no la gestión del sistema." },
      { q: "El movimiento zapatista de 1994 se considera antisistema porque:", options: ["Cuestionó el modelo económico y demandó autonomía para los pueblos indígenas", "Buscó la presidencia de la República", "Defendió el TLCAN"], correct: 0, explanation: "Su irrupción coincidió con la entrada en vigor del TLCAN y lo impugnó explícitamente." },
      { q: "Los llamados nuevos movimientos sociales se caracterizan por:", options: ["Centrarse en demandas de identidad, reconocimiento y calidad de vida", "Organizarse exclusivamente en sindicatos", "Rechazar la participación de mujeres"], correct: 0, explanation: "Se distinguen del movimiento obrero clásico por el tipo de demandas." },
      { q: "El movimiento feminista mexicano ha logrado, entre otros avances:", options: ["La tipificación del feminicidio y la paridad en las candidaturas", "La reducción de la jornada laboral a 30 horas", "La creación del IMSS"], correct: 0, explanation: "Son dos de sus conquistas legislativas más significativas." },
      { q: "El uso de redes sociales por los movimientos actuales tiene como riesgo principal:", options: ["Una movilización intensa pero efímera y sin organización duradera", "La imposibilidad de convocar", "El aumento de los costos de difusión"], correct: 0, explanation: "La rapidez de la convocatoria no siempre se traduce en estructuras sostenidas." }
    ]
  }
};
