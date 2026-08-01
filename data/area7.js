const AREA7_TOPICS = [
  {
    id: "7.1.1",
    area: 7,
    subarea: "7.1 Organización económica",
    tema: "Necesidades materiales vitales y no vitales",
    note: "Las **necesidades vitales** (o básicas) son indispensables para sobrevivir: alimentación, agua, vivienda, salud, vestido adecuado al clima. Si no se cubren, la vida o la salud corren riesgo real e inmediato. Las **necesidades no vitales** mejoran la calidad de vida pero su falta no pone en peligro la supervivencia: entretenimiento, viajes, tecnología de lujo, moda. En el examen te dan una situación (por ejemplo, una persona sin abrigo en una helada, o un niño sin comer en la escuela) y debes identificar si describe una necesidad vital o no vital. Truco rápido: pregúntate '¿si esto no se resuelve, la persona muere o enferma gravemente?' Si la respuesta es sí, es vital.",
    flashcards: [
      { front: "¿Qué es una necesidad vital?", back: "Aquella indispensable para sobrevivir, como alimento, agua, vivienda o salud." },
      { front: "Da un ejemplo de necesidad no vital", back: "Comprar una computadora nueva, viajar por placer, tener un teléfono de última generación." }
    ],
    quiz: [
      { q: "Una familia pasa frío extremo en invierno porque no tiene cobijas ni calefacción. Esto representa una necesidad:", options: ["No vital", "Vital", "Cultural"], correct: 1, explanation: "El frío extremo sin protección pone en riesgo la salud y la vida, por lo que es una necesidad vital." },
      { q: "Un empleado tarda dos horas en llegar a su trabajo por falta de transporte cercano. Esto es un ejemplo de necesidad:", options: ["Vital", "No vital", "Fisiológica"], correct: 1, explanation: "Un traslado largo es incómodo pero no pone en peligro inmediato la vida, por lo que se clasifica como no vital." }
    ]
  },
  {
    id: "7.1.2",
    area: 7,
    subarea: "7.1 Organización económica",
    tema: "Factores de los procesos de producción",
    note: "Para producir bienes y servicios se necesitan **factores de producción**: tierra (recursos naturales: agua, minerales, suelo), trabajo (esfuerzo humano, físico o intelectual), capital (dinero, maquinaria, herramientas, edificios) y, según algunos autores, organización o tecnología (la capacidad de combinar los otros factores eficientemente). En el examen suelen dar un ejemplo de producción (una fábrica de zapatos, una granja) y pedir identificar qué factor corresponde a cada elemento mencionado: la tierra donde se siembra es 'tierra', los obreros son 'trabajo', las máquinas y el dinero invertido son 'capital'.",
    flashcards: [
      { front: "¿Cuáles son los factores clásicos de producción?", back: "Tierra, trabajo y capital (algunos suman organización/tecnología)." },
      { front: "¿A qué factor corresponde la maquinaria de una fábrica?", back: "Al capital." }
    ],
    quiz: [
      { q: "En una panadería, la harina de trigo y el terreno donde se cultivó corresponden al factor de producción llamado:", options: ["Trabajo", "Tierra", "Capital"], correct: 1, explanation: "La tierra incluye los recursos naturales usados en la producción, como el terreno de cultivo." },
      { q: "El dinero invertido para comprar hornos industriales en una panadería es un ejemplo del factor:", options: ["Capital", "Tierra", "Trabajo"], correct: 0, explanation: "El capital incluye el dinero y los bienes de inversión como maquinaria y herramientas." }
    ]
  },
  {
    id: "7.1.3",
    area: 7,
    subarea: "7.1 Organización económica",
    tema: "Tipos de sectores productivos",
    note: "La economía se divide en tres sectores. El **sector primario** obtiene recursos directamente de la naturaleza: agricultura, ganadería, pesca, minería. El **sector secundario** transforma esas materias primas en productos: industria, manufactura, construcción. El **sector terciario** ofrece servicios, no bienes físicos: comercio, educación, salud, turismo, transporte, banca. En el examen dan una actividad (por ejemplo 'pescar camarón', 'ensamblar autos', 'dar clases') y debes ubicarla en el sector correcto. Regla simple: si se extrae de la naturaleza = primario; si se fabrica/transforma = secundario; si se presta un servicio = terciario.",
    flashcards: [
      { front: "¿Qué actividades pertenecen al sector primario?", back: "Agricultura, ganadería, pesca y minería: extracción directa de recursos naturales." },
      { front: "¿Un banco a qué sector pertenece?", back: "Al sector terciario, porque ofrece un servicio." }
    ],
    quiz: [
      { q: "Una empresa que ensambla automóviles a partir de piezas metálicas pertenece al sector:", options: ["Primario", "Secundario", "Terciario"], correct: 1, explanation: "Transformar materias primas en productos terminados es actividad del sector secundario." },
      { q: "Un agricultor que cosecha maíz pertenece al sector:", options: ["Terciario", "Secundario", "Primario"], correct: 2, explanation: "La extracción directa de recursos de la tierra corresponde al sector primario." }
    ]
  },
  {
    id: "7.1.4",
    area: 7,
    subarea: "7.1 Organización económica",
    tema: "Mecanismos de distribución de la riqueza",
    note: "La riqueza generada en la producción se reparte entre quienes participan en el proceso mediante distintos mecanismos: **salarios** (pago al trabajo), **ganancias o utilidades** (al capital invertido por dueños/empresarios), **rentas** (al dueño de la tierra o inmuebles por su uso) e **intereses** (al capital prestado, como en préstamos bancarios). Cada factor de producción recibe una retribución distinta: el trabajador recibe salario, el dueño de la fábrica recibe ganancia, el dueño del terreno rentado recibe renta. En el examen piden identificar qué tipo de pago corresponde a cada agente económico en una situación dada.",
    flashcards: [
      { front: "¿Qué recibe el trabajador por su trabajo?", back: "Salario o sueldo." },
      { front: "¿Qué recibe el dueño de un terreno que renta?", back: "Renta." }
    ],
    quiz: [
      { q: "El dueño de una fábrica que vende su producción y obtiene un excedente sobre sus costos recibe:", options: ["Salario", "Ganancia", "Renta"], correct: 1, explanation: "La ganancia o utilidad es la retribución al capital invertido por el empresario." },
      { q: "Una persona que presta dinero a un negocio y recibe un pago adicional por el préstamo obtiene:", options: ["Interés", "Salario", "Renta"], correct: 0, explanation: "El interés es la retribución al capital prestado." }
    ]
  },
  {
    id: "7.1.5",
    area: 7,
    subarea: "7.1 Organización económica",
    tema: "Empleo formal e informal",
    note: "El **empleo formal** está registrado legalmente: el trabajador tiene contrato, recibe prestaciones (seguro social, aguinaldo, vacaciones pagadas) y su patrón paga impuestos y cuotas al IMSS. El **empleo informal** no está registrado ante autoridades, no ofrece seguridad social ni prestaciones y suele pagarse en efectivo sin contrato: vendedores ambulantes, trabajo doméstico sin contrato, comercio callejero, 'changarros' no registrados. México tiene una tasa muy alta de informalidad (más de la mitad de la población ocupada). En el examen dan un caso (una persona vende dulces en la calle sin factura vs. alguien con contrato en una empresa con IMSS) y debes clasificarlo.",
    flashcards: [
      { front: "¿Qué caracteriza al empleo formal?", back: "Contrato legal, prestaciones y seguridad social (IMSS)." },
      { front: "Da un ejemplo de empleo informal", back: "Vendedor ambulante sin registro fiscal ni prestaciones." }
    ],
    quiz: [
      { q: "Una persona trabaja en una empresa con contrato firmado, IMSS y vacaciones pagadas. Su empleo es:", options: ["Informal", "Formal", "Independiente"], correct: 1, explanation: "Contar con contrato y seguridad social es característica del empleo formal." },
      { q: "Un vendedor de tacos en un puesto callejero sin registro ante autoridades tiene empleo:", options: ["Formal", "Informal", "De gobierno"], correct: 1, explanation: "La falta de registro legal y prestaciones caracteriza al empleo informal." }
    ]
  },
  {
    id: "7.1.6",
    area: 7,
    subarea: "7.1 Organización económica",
    tema: "Mecanismos estatales de redistribución de la riqueza",
    note: "El Estado redistribuye la riqueza para reducir la desigualdad usando herramientas como: **impuestos progresivos** (quien gana más paga más, ej. ISR), **programas sociales** (transferencias directas a personas de bajos recursos, como becas o pensiones para adultos mayores), **subsidios** (apoyo a precios de productos básicos o servicios), y **gasto público** en salud y educación gratuitas. La lógica es cobrar más a quien tiene más y devolver ese dinero en servicios o apoyos a quien tiene menos. En el examen dan un ejemplo (pensión para adultos mayores, beca a estudiantes de bajos recursos, impuesto sobre la renta) y piden identificarlo como mecanismo de redistribución.",
    flashcards: [
      { front: "¿Qué es un impuesto progresivo?", back: "Aquel en que paga proporcionalmente más quien tiene mayores ingresos." },
      { front: "Da un ejemplo de programa social redistributivo en México", back: "Pensión para el Bienestar de personas adultas mayores o becas Benito Juárez." }
    ],
    quiz: [
      { q: "El gobierno otorga una beca mensual a estudiantes de familias con bajos ingresos. Esto es un mecanismo de:", options: ["Producción", "Redistribución de la riqueza", "Comercio exterior"], correct: 1, explanation: "Las transferencias directas a población vulnerable son un mecanismo estatal de redistribución." },
      { q: "Cobrar una mayor tasa de impuesto sobre la renta a quienes ganan más es un ejemplo de:", options: ["Impuesto regresivo", "Impuesto progresivo", "Subsidio directo"], correct: 1, explanation: "Un impuesto progresivo aumenta la tasa conforme aumenta el ingreso, redistribuyendo riqueza." }
    ]
  },
  {
    id: "7.1.7",
    area: 7,
    subarea: "7.1 Organización económica",
    tema: "Características del Estado de bienestar",
    note: "El **Estado de bienestar** es un modelo donde el gobierno interviene activamente en la economía para garantizar derechos sociales: salud pública gratuita o accesible, educación pública, seguridad social, pensiones, vivienda y protección al empleo. Se caracteriza por gasto público social alto, regulación fuerte del mercado laboral y redes de protección para desempleados, enfermos y adultos mayores. Surgió con fuerza después de crisis como la Gran Depresión y las guerras mundiales (ejemplo clásico: los países nórdicos europeos). En el examen buscan que reconozcas rasgos como 'el Estado garantiza servicios sociales universales' o 'fuerte intervención estatal en la economía para reducir desigualdad'.",
    flashcards: [
      { front: "¿Qué es el Estado de bienestar?", back: "Modelo donde el gobierno interviene fuertemente para garantizar salud, educación y seguridad social a la población." },
      { front: "Menciona un rasgo del Estado de bienestar", back: "Gasto público social alto y servicios universales de salud y educación." }
    ],
    quiz: [
      { q: "¿Cuál es una característica del Estado de bienestar?", options: ["Privatización total de la salud", "Garantía estatal de servicios sociales universales", "Ausencia de regulación laboral"], correct: 1, explanation: "El Estado de bienestar se caracteriza por garantizar servicios sociales accesibles a toda la población." },
      { q: "Un país donde el gobierno financia pensiones, salud y educación gratuitas para todos sus ciudadanos refleja un modelo de:", options: ["Estado de bienestar", "Neoliberalismo", "Economía de subsistencia"], correct: 0, explanation: "La provisión estatal amplia de derechos sociales es rasgo central del Estado de bienestar." }
    ]
  },
  {
    id: "7.1.8",
    area: 7,
    subarea: "7.1 Organización económica",
    tema: "Características del modelo económico neoliberal",
    note: "El **neoliberalismo** es un modelo que promueve la reducción del Estado en la economía: privatización de empresas públicas, apertura comercial (tratados de libre comercio), desregulación de mercados, disciplina fiscal (reducir gasto público) y confianza en que el mercado, no el gobierno, asigna mejor los recursos. En México se implementó fuertemente desde los años 80-90 (venta de empresas paraestatales, entrada al TLCAN). Se caracteriza por menor intervención estatal, competencia y libre mercado como eje. En el examen buscan que reconozcas frases como 'privatización de empresas estatales', 'apertura a mercados internacionales' o 'reducción del gasto social' como rasgos neoliberales.",
    flashcards: [
      { front: "¿Qué es el neoliberalismo económico?", back: "Modelo que reduce la intervención del Estado y promueve el libre mercado, la privatización y la apertura comercial." },
      { front: "Menciona un ejemplo histórico de neoliberalismo en México", back: "La privatización de empresas paraestatales y la firma del TLCAN en los años 80-90." }
    ],
    quiz: [
      { q: "¿Cuál de las siguientes es una característica del modelo neoliberal?", options: ["Nacionalización de industrias", "Privatización de empresas estatales", "Aumento del gasto social del Estado"], correct: 1, explanation: "El neoliberalismo promueve la venta de empresas públicas a manos privadas." },
      { q: "Un gobierno que firma tratados de libre comercio y reduce aranceles para abrir su economía al mundo aplica una política:", options: ["Proteccionista", "Neoliberal", "De autarquía"], correct: 1, explanation: "La apertura comercial y reducción de barreras es rasgo central del neoliberalismo." }
    ]
  },
  {
    id: "7.1.9",
    area: 7,
    subarea: "7.1 Organización económica",
    tema: "Degradación ambiental por las formas de producción",
    note: "Ciertas formas de producir bienes dañan el ambiente: la industria pesada emite gases contaminantes y contribuye al cambio climático; la agricultura intensiva con agroquímicos contamina suelo y agua; la ganadería extensiva provoca deforestación para crear pastizales; la minería a cielo abierto destruye ecosistemas y contamina ríos con metales pesados; la pesca industrial agota especies marinas. En el examen dan un ejemplo de actividad productiva (tala para sembrar soya, vertido de residuos industriales a un río) y piden identificar el tipo de degradación ambiental que provoca (deforestación, contaminación del agua, contaminación del aire, pérdida de biodiversidad).",
    flashcards: [
      { front: "¿Qué daño ambiental provoca la ganadería extensiva?", back: "Deforestación, al talar bosques para crear pastizales para el ganado." },
      { front: "¿Qué daño ambiental provoca la minería a cielo abierto?", back: "Contaminación de suelo y agua con metales pesados y destrucción de ecosistemas." }
    ],
    quiz: [
      { q: "Una fábrica que vierte sus residuos químicos directamente a un río provoca principalmente:", options: ["Contaminación del agua", "Erosión del suelo", "Efecto invernadero"], correct: 0, explanation: "Verter residuos químicos a un río contamina directamente el agua." },
      { q: "La tala masiva de bosques para sembrar cultivos comerciales genera principalmente:", options: ["Deforestación", "Contaminación auditiva", "Lluvia ácida"], correct: 0, explanation: "Eliminar árboles para uso agrícola es la causa directa de la deforestación." }
    ]
  },
  {
    id: "7.2.1",
    area: 7,
    subarea: "7.2 Perspectivas políticas",
    tema: "Teorías sobre el origen del Estado y sus autores",
    note: "Dos filósofos clave con visiones opuestas del 'contrato social'. **Thomas Hobbes** (Leviatán) pensaba que en 'estado de naturaleza' los humanos son egoístas y violentos ('el hombre es el lobo del hombre'), por lo que ceden su libertad a un soberano absoluto a cambio de orden y seguridad. **Jean-Jacques Rousseau** (El contrato social) creía que el ser humano es bueno por naturaleza, pero la propiedad privada y la sociedad lo corrompen; el Estado debe surgir de un pacto donde el pueblo conserva la soberanía y el gobierno actúa según la 'voluntad general'. En el examen relacionan frases (soberano absoluto para evitar el caos = Hobbes; soberanía popular y voluntad general = Rousseau) con su autor.",
    flashcards: [
      { front: "¿Qué plantea Hobbes sobre el origen del Estado?", back: "Que los hombres ceden su libertad a un soberano absoluto para escapar del caos y la violencia del estado de naturaleza." },
      { front: "¿Qué plantea Rousseau sobre el origen del Estado?", back: "Que el Estado surge de un contrato social donde el pueblo conserva la soberanía y gobierna según la voluntad general." }
    ],
    quiz: [
      { q: "El filósofo que sostenía que 'el hombre es el lobo del hombre' y justificaba un poder absoluto para mantener el orden fue:", options: ["Rousseau", "Hobbes", "Locke"], correct: 1, explanation: "Esa frase y la defensa del soberano absoluto corresponden a Thomas Hobbes en su obra 'Leviatán'." },
      { q: "El autor que defendía que la soberanía reside en el pueblo y que el gobierno debe seguir la 'voluntad general' fue:", options: ["Hobbes", "Maquiavelo", "Rousseau"], correct: 2, explanation: "Rousseau, en 'El contrato social', plantea la soberanía popular y la voluntad general." }
    ]
  },
  {
    id: "7.2.2",
    area: 7,
    subarea: "7.2 Perspectivas políticas",
    tema: "Características de la democracia electoral",
    note: "La **democracia electoral** es un sistema donde el poder se legitima mediante elecciones periódicas, libres y competidas. Sus características principales: sufragio universal (todos los ciudadanos mayores de edad pueden votar), voto libre y secreto, existencia de varios partidos políticos que compiten, alternancia posible en el poder, órganos electorales independientes que organizan y vigilan los comicios (en México, el INE), y respeto a los resultados. No basta con que haya elecciones: deben ser transparentes y con posibilidad real de que gane cualquier opción. En el examen piden reconocer rasgos como 'voto secreto y universal' o 'competencia entre múltiples partidos' como propios de la democracia electoral.",
    flashcards: [
      { front: "¿Qué es el sufragio universal?", back: "El derecho de todos los ciudadanos mayores de edad a votar, sin importar sexo, raza o condición económica." },
      { front: "¿Qué institución organiza las elecciones en México?", back: "El Instituto Nacional Electoral (INE)." }
    ],
    quiz: [
      { q: "¿Cuál de las siguientes es una característica de la democracia electoral?", options: ["Un solo partido permitido", "Voto libre, secreto y universal", "Elecciones sin órgano vigilante"], correct: 1, explanation: "El voto libre, secreto y universal es una condición esencial de la democracia electoral." },
      { q: "La posibilidad de que un partido diferente al gobernante gane las elecciones se conoce como:", options: ["Alternancia en el poder", "Golpe de Estado", "Autarquía"], correct: 0, explanation: "La alternancia es un rasgo esperado en una democracia electoral funcional." }
    ]
  },
  {
    id: "7.2.3",
    area: 7,
    subarea: "7.2 Perspectivas políticas",
    tema: "Requisitos para obtener la ciudadanía mexicana",
    note: "El **artículo 34 constitucional** establece que son ciudadanos de la República los mexicanos (por nacimiento o naturalización) que además cumplan dos requisitos: haber cumplido **18 años** y tener un **modo honesto de vivir** (es decir, no vivir de actividades ilícitas). Ser ciudadano es distinto de ser mexicano: todo ciudadano es mexicano, pero no todo mexicano es ciudadano (un menor de edad es mexicano pero no ciudadano todavía). Ser ciudadano da derechos como votar, ser votado y afiliarse a partidos políticos. En el examen dan un caso (persona de 17 años, persona de 20 años con vida honesta) y piden identificar si cumple los requisitos de ciudadanía.",
    flashcards: [
      { front: "¿Qué requisitos exige el artículo 34 constitucional para ser ciudadano mexicano?", back: "Ser mexicano, haber cumplido 18 años y tener un modo honesto de vivir." },
      { front: "¿Un mexicano de 15 años es ciudadano?", back: "No, porque no ha cumplido los 18 años requeridos; es mexicano pero no ciudadano." }
    ],
    quiz: [
      { q: "Según el artículo 34 constitucional, ¿qué edad mínima se requiere para ser ciudadano mexicano?", options: ["16 años", "18 años", "21 años"], correct: 1, explanation: "El artículo 34 establece 18 años cumplidos como requisito de edad." },
      { q: "Además de la edad, el artículo 34 exige a los mexicanos otro requisito para ser ciudadanos:", options: ["Tener propiedades", "Tener un modo honesto de vivir", "Haber estudiado una carrera"], correct: 1, explanation: "El artículo 34 exige tener un modo honesto de vivir, además de la mayoría de edad." }
    ]
  },
  {
    id: "7.2.4",
    area: 7,
    subarea: "7.2 Perspectivas políticas",
    tema: "Función de las instituciones del Estado mexicano",
    note: "Instituciones clave y qué problemática atienden: la **SEP** (Secretaría de Educación Pública) coordina la educación en México. **Conadis** (Consejo Nacional para el Desarrollo y la Inclusión de las Personas con Discapacidad) promueve los derechos e inclusión de personas con discapacidad. **Sedatu** (Secretaría de Desarrollo Agrario, Territorial y Urbano) atiende el ordenamiento territorial, vivienda y desarrollo urbano/rural. **Inaes** (Instituto Nacional de la Economía Social) apoya cooperativas y organizaciones del sector social de la economía (economía solidaria). En el examen dan un problema (falta de vivienda ordenada en una ciudad, discriminación a una persona con discapacidad, apoyo a una cooperativa) y piden identificar la institución responsable.",
    flashcards: [
      { front: "¿Qué institución atiende los derechos de las personas con discapacidad en México?", back: "El Conadis (Consejo Nacional para el Desarrollo y la Inclusión de las Personas con Discapacidad)." },
      { front: "¿Qué institución se encarga del desarrollo urbano y la vivienda en México?", back: "La Sedatu (Secretaría de Desarrollo Agrario, Territorial y Urbano)." }
    ],
    quiz: [
      { q: "Una comunidad quiere formar una cooperativa de producción y necesita apoyo del gobierno. ¿A qué institución debe acudir?", options: ["SEP", "Inaes", "Conadis"], correct: 1, explanation: "El Inaes apoya al sector social de la economía, incluidas las cooperativas." },
      { q: "Una ciudad enfrenta problemas de crecimiento urbano desordenado y falta de vivienda planificada. La institución responsable es:", options: ["Sedatu", "Conadis", "Inaes"], correct: 0, explanation: "La Sedatu atiende el desarrollo territorial y urbano, incluida la vivienda." }
    ]
  },
  {
    id: "7.2.5",
    area: 7,
    subarea: "7.2 Perspectivas políticas",
    tema: "Poderes fácticos",
    note: "Los **poderes fácticos** son actores que ejercen influencia real y significativa sobre las decisiones políticas o económicas de un país sin ocupar un cargo público ni tener esa función asignada formalmente por la ley. Ejemplos: grandes empresas y monopolios (medios de comunicación, bancos), la Iglesia (por su influencia sobre creyentes y opinión pública), sindicatos poderosos, el crimen organizado en zonas donde controla territorio, y en algunos países las fuerzas armadas. Su poder no viene de una elección, sino de recursos económicos, información o capacidad de presión. En el examen dan un ejemplo (una televisora influye en la opinión pública sobre un candidato, un cartel controla la economía de una región) y piden reconocerlo como poder fáctico.",
    flashcards: [
      { front: "¿Qué es un poder fáctico?", back: "Un actor sin cargo público formal que influye de manera real en decisiones políticas o económicas, como grandes empresas o medios." },
      { front: "Da un ejemplo de poder fáctico", back: "Una gran cadena de medios de comunicación que influye en la opinión pública durante elecciones." }
    ],
    quiz: [
      { q: "Un consorcio de medios de comunicación que influye fuertemente en la opinión pública sin ocupar un cargo de gobierno es un ejemplo de:", options: ["Poder fáctico", "Poder legislativo", "Organismo autónomo"], correct: 0, explanation: "Los poderes fácticos ejercen influencia real sin ser electos ni tener función pública formal." },
      { q: "¿Cuál de los siguientes NO es un ejemplo típico de poder fáctico?", options: ["Un gran sindicato con capacidad de presión política", "Una escuela primaria pública", "Un grupo empresarial con control de medios"], correct: 1, explanation: "Una escuela pública es parte del Estado y no ejerce influencia política informal como poder fáctico." }
    ]
  },
  {
    id: "7.2.6",
    area: 7,
    subarea: "7.2 Perspectivas políticas",
    tema: "Principios de política exterior del Estado mexicano",
    note: "El artículo 89 constitucional establece los principios que guían la política exterior de México, entre ellos: **autodeterminación de los pueblos** (cada nación decide su propio sistema político sin injerencia externa), **no intervención** (ningún país debe intervenir en asuntos internos de otro), **solución pacífica de controversias** (resolver conflictos por diálogo y no por la fuerza), igualdad jurídica de los Estados, cooperación internacional para el desarrollo y lucha por la paz y la seguridad internacionales. En el examen dan una situación diplomática (México no interviene en el conflicto interno de otro país; México propone negociar en vez de usar fuerza) y piden identificar el principio aplicado.",
    flashcards: [
      { front: "¿Qué es el principio de no intervención?", back: "Ningún país debe intervenir en los asuntos internos de otro Estado." },
      { front: "¿Qué es la autodeterminación de los pueblos?", back: "El derecho de cada nación a decidir libremente su propio sistema político y forma de gobierno." }
    ],
    quiz: [
      { q: "México se abstiene de opinar o actuar sobre el conflicto político interno de otro país. Esto refleja el principio de:", options: ["No intervención", "Cooperación internacional", "Igualdad jurídica"], correct: 0, explanation: "No intervenir en asuntos internos de otras naciones es el principio de no intervención." },
      { q: "Ante un conflicto entre dos países, México propone el diálogo y la negociación en vez de una acción militar. Esto ejemplifica el principio de:", options: ["Autodeterminación de los pueblos", "Solución pacífica de controversias", "No intervención"], correct: 1, explanation: "Buscar resolver conflictos mediante el diálogo, no la fuerza, es el principio de solución pacífica de controversias." }
    ]
  },
  {
    id: "7.2.7",
    area: 7,
    subarea: "7.2 Perspectivas políticas",
    tema: "Organismos internacionales",
    note: "Organismos de la ONU con funciones específicas: **Unesco** (Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura) promueve educación, ciencia, cultura y protege patrimonios culturales y naturales. **FAO** (Organización de las Naciones Unidas para la Alimentación y la Agricultura) combate el hambre y promueve la seguridad alimentaria y el desarrollo agrícola. **OIT** (Organización Internacional del Trabajo) establece normas laborales internacionales y defiende los derechos de los trabajadores (trabajo digno, contra el trabajo infantil). En el examen dan un caso (declarar un sitio como Patrimonio de la Humanidad, combatir la desnutrición en zonas rurales, regular condiciones laborales) y piden identificar el organismo correspondiente.",
    flashcards: [
      { front: "¿Qué función tiene la Unesco?", back: "Promover educación, ciencia y cultura, y proteger el patrimonio cultural y natural de la humanidad." },
      { front: "¿Qué función tiene la FAO?", back: "Combatir el hambre y promover la seguridad alimentaria y el desarrollo agrícola en el mundo." }
    ],
    quiz: [
      { q: "Un organismo internacional declara a una zona arqueológica como Patrimonio de la Humanidad. Este organismo es:", options: ["FAO", "Unesco", "OIT"], correct: 1, explanation: "La Unesco es responsable de designar y proteger los Patrimonios de la Humanidad." },
      { q: "El organismo internacional que establece normas contra el trabajo infantil y por condiciones laborales dignas es:", options: ["OIT", "FAO", "Unesco"], correct: 0, explanation: "La Organización Internacional del Trabajo (OIT) regula y promueve derechos laborales a nivel internacional." }
    ]
  },
  {
    id: "7.2.8",
    area: 7,
    subarea: "7.2 Perspectivas políticas",
    tema: "Áreas en el sistema mundo",
    note: "La teoría del **sistema-mundo** (Immanuel Wallerstein) clasifica a los países según su papel en la economía global. Las **áreas centrales** concentran tecnología, capital e industria avanzada y dominan el comercio mundial (EUA, Alemania, Japón). Las **áreas semiperiféricas** tienen desarrollo intermedio: combinan industria con dependencia tecnológica (México, Brasil, algunos países emergentes). Las **áreas periféricas** dependen de exportar materias primas y mano de obra barata, con poca industrialización (varios países de África y algunas naciones de América Latina/Asia). Las **áreas de arena exterior** son regiones apenas integradas al sistema capitalista mundial, con mínimo intercambio comercial. En el examen dan un país o región y piden clasificarla según su rol económico global.",
    flashcards: [
      { front: "¿Qué caracteriza a las áreas centrales del sistema-mundo?", back: "Concentran tecnología, capital e industria avanzada y dominan la economía mundial." },
      { front: "¿Qué caracteriza a las áreas periféricas?", back: "Dependen de exportar materias primas y mano de obra barata, con poca industrialización propia." }
    ],
    quiz: [
      { q: "Un país con alta tecnología, gran capital industrial y que domina el comercio mundial se clasifica como área:", options: ["Periférica", "Central", "De arena exterior"], correct: 1, explanation: "Las áreas centrales concentran el poder tecnológico e industrial en la economía mundial." },
      { q: "Un país que exporta principalmente materias primas y tiene escasa industrialización propia se clasifica como área:", options: ["Central", "Semiperiférica", "Periférica"], correct: 2, explanation: "La dependencia en exportar materias primas sin industrialización fuerte es propia de las áreas periféricas." }
    ]
  },
  {
    id: "7.3.1",
    area: 7,
    subarea: "7.3 Problemas sociológicos",
    tema: "Tipos de organización social",
    note: "Distintas formas en que se organizan las personas en sociedad. **Clase social**: grupo de personas con posición económica similar (nivel de ingreso, acceso a bienes) dentro de una sociedad, como clase alta, media o baja. **Grupo social**: conjunto de personas que interactúan y comparten intereses o metas, con cierta identidad común (un equipo deportivo, un grupo de amigos). **Comunidad**: personas que comparten un territorio, tradiciones o lazos históricos y culturales fuertes (un pueblo, un barrio). **Institución**: conjunto de normas y estructuras estables que regulan una actividad social importante (la familia, la escuela, la Iglesia, el gobierno). En el examen dan un ejemplo y piden identificar a qué tipo de organización social corresponde.",
    flashcards: [
      { front: "¿Qué es una clase social?", back: "Grupo de personas con posición económica similar dentro de la sociedad (alta, media, baja)." },
      { front: "¿Qué es una institución social?", back: "Conjunto de normas y estructuras estables que regulan una actividad social importante, como la familia o la escuela." }
    ],
    quiz: [
      { q: "Un conjunto de familias que comparten un mismo pueblo, tradiciones y una historia común forman una:", options: ["Clase social", "Comunidad", "Institución"], correct: 1, explanation: "Compartir territorio y tradiciones es propio de una comunidad." },
      { q: "La escuela, como estructura estable que organiza y regula la educación en la sociedad, es un ejemplo de:", options: ["Grupo social", "Institución", "Clase social"], correct: 1, explanation: "La escuela es una institución social porque regula de forma estable una actividad importante." }
    ]
  },
  {
    id: "7.3.2",
    area: 7,
    subarea: "7.3 Problemas sociológicos",
    tema: "Indicadores de desarrollo comunitario",
    note: "El **Inegi** (Instituto Nacional de Estadística y Geografía) mide el desarrollo de las comunidades con indicadores como: acceso a servicios básicos (agua potable, drenaje, electricidad), infraestructura (calles pavimentadas, transporte), acceso a educación y salud cercanas, nivel de marginación y grado de urbanización. Estos indicadores muestran qué tan desarrollada está una localidad en términos de infraestructura y servicios disponibles para sus habitantes, más allá del ingreso económico individual. En el examen dan una descripción de una comunidad (con o sin agua potable, calles pavimentadas, escuela cercana) y piden identificar el indicador de desarrollo comunitario que se está describiendo.",
    flashcards: [
      { front: "¿Qué institución mide los indicadores de desarrollo comunitario en México?", back: "El Inegi (Instituto Nacional de Estadística y Geografía)." },
      { front: "Menciona dos indicadores de desarrollo comunitario", back: "Acceso a agua potable y drenaje, e infraestructura como calles pavimentadas." }
    ],
    quiz: [
      { q: "Que una comunidad cuente con drenaje, agua potable y electricidad es un indicador de:", options: ["Desarrollo comunitario", "Migración", "Poder fáctico"], correct: 0, explanation: "El acceso a servicios básicos es uno de los indicadores centrales de desarrollo comunitario." },
      { q: "¿Qué institución mexicana recopila los datos sobre infraestructura y servicios de las comunidades?", options: ["SEP", "Inegi", "Cenapred"], correct: 1, explanation: "El Inegi es responsable de generar la estadística y geografía nacional, incluidos indicadores comunitarios." }
    ]
  },
  {
    id: "7.3.3",
    area: 7,
    subarea: "7.3 Problemas sociológicos",
    tema: "Indicadores de bienestar",
    note: "Además del desarrollo comunitario, el **Inegi** mide el bienestar de las personas con indicadores como: nivel de ingreso, acceso a alimentación adecuada, esperanza de vida, nivel educativo alcanzado, acceso a servicios de salud y percepción de seguridad. Estos indicadores buscan medir qué tan bien vive la población, no solo si hay infraestructura, sino si las personas tienen condiciones reales de calidad de vida. Se relacionan con conceptos como el Índice de Desarrollo Humano. En el examen dan una situación (una familia con ingresos suficientes para alimentarse bien y acceso a médico) y piden reconocerla como ejemplo de un indicador de bienestar específico (ingreso, salud, alimentación, educación).",
    flashcards: [
      { front: "Menciona tres indicadores de bienestar usados por el Inegi", back: "Nivel de ingreso, esperanza de vida y nivel educativo alcanzado." },
      { front: "¿Qué mide la esperanza de vida como indicador de bienestar?", back: "El número promedio de años que se espera que viva una persona en una población, reflejando condiciones de salud general." },
    ],
    quiz: [
      { q: "El promedio de años de escolaridad alcanzados por la población de una región es un indicador de:", options: ["Bienestar", "Migración", "Poder fáctico"], correct: 0, explanation: "El nivel educativo alcanzado es uno de los indicadores de bienestar que mide el Inegi." },
      { q: "Que una familia tenga ingresos suficientes para cubrir una alimentación adecuada refleja el indicador de bienestar relacionado con:", options: ["Seguridad", "Ingreso y alimentación", "Migración"], correct: 1, explanation: "El acceso a ingreso suficiente para alimentación es un indicador directo de bienestar económico y nutricional." }
    ]
  },
  {
    id: "7.3.4",
    area: 7,
    subarea: "7.3 Problemas sociológicos",
    tema: "Factores que propician la segregación social",
    note: "La **segregación social** (separación de grupos dentro de una sociedad) se produce por factores como: **exclusión** (negar a un grupo el acceso a oportunidades, espacios o servicios, como no contratar a alguien por su origen), **discriminación** (trato desigual o injusto por características como raza, género, discapacidad, orientación sexual) y **estereotipo** (idea simplificada y generalizada sobre un grupo, que sirve de base para discriminar, como suponer que todas las personas de cierta región son de determinada forma). Estos factores generan barreras que impiden la integración plena de ciertos grupos en la vida social, económica y política. En el examen dan una situación (rechazar a alguien en un empleo por su apariencia, asumir que todas las personas de un grupo son iguales) y piden identificar el factor de segregación implicado.",
    flashcards: [
      { front: "¿Qué es la discriminación?", back: "Trato desigual o injusto hacia una persona o grupo por características como raza, género o discapacidad." },
      { front: "¿Qué es un estereotipo?", back: "Idea simplificada y generalizada sobre un grupo que suele usarse para justificar la discriminación." }
    ],
    quiz: [
      { q: "Una empresa se niega a contratar personas con discapacidad a pesar de estar capacitadas para el puesto. Esto es un ejemplo de:", options: ["Exclusión", "Cooperación", "Redistribución"], correct: 0, explanation: "Negar el acceso a oportunidades laborales a un grupo por su condición es un caso de exclusión." },
      { q: "Suponer que todas las personas de una región son 'flojas' sin conocerlas es un ejemplo de:", options: ["Estereotipo", "Institución", "Migración"], correct: 0, explanation: "Generalizar características a todo un grupo sin base individual es un estereotipo." }
    ]
  },
  {
    id: "7.3.5",
    area: 7,
    subarea: "7.3 Problemas sociológicos",
    tema: "Derechos de las niñas, niños y adolescentes",
    note: "Las niñas, niños y adolescentes (NNA) tienen derechos reconocidos por la Convención sobre los Derechos del Niño y la Ley General de NNA en México: derecho a la vida, a la identidad (nombre, nacionalidad), a la educación, a la salud, a no ser víctima de violencia ni explotación laboral o sexual, a vivir en familia, a la protección contra el trabajo infantil peligroso, y al interés superior de la niñez (sus intereses deben priorizarse en cualquier decisión que los afecte). En el examen dan una situación (un niño trabajando en condiciones peligrosas en vez de estudiar, un adolescente sin acceso a la escuela) y piden identificar qué derecho se está vulnerando.",
    flashcards: [
      { front: "¿Qué es el 'interés superior de la niñez'?", back: "El principio de que, en cualquier decisión que afecte a un niño, deben priorizarse sus intereses y bienestar." },
      { front: "Da un ejemplo de vulneración de derechos de la niñez", back: "Un niño de 10 años trabajando en condiciones peligrosas en vez de asistir a la escuela." }
    ],
    quiz: [
      { q: "Un niño de 9 años es obligado a trabajar largas jornadas en una fábrica en vez de ir a la escuela. Esto vulnera su derecho a:", options: ["La educación y protección contra explotación laboral", "La libertad de tránsito", "La propiedad privada"], correct: 0, explanation: "Obligar a un menor a trabajar en vez de estudiar viola sus derechos a la educación y a no ser explotado laboralmente." },
      { q: "¿Qué principio establece que las decisiones que afectan a un menor deben priorizar su bienestar sobre otros intereses?", options: ["El interés superior de la niñez", "La autodeterminación de los pueblos", "La solución pacífica de controversias"], correct: 0, explanation: "El interés superior de la niñez es el principio rector en la protección de los derechos de NNA." }
    ]
  },
  {
    id: "7.3.6",
    area: 7,
    subarea: "7.3 Problemas sociológicos",
    tema: "Consecuencias de las crisis sociales, económicas y ambientales de los siglos XX y XXI en la sociedad mexicana",
    note: "Eventos clave que marcaron a México: el **Plan de San Luis** (1910, Francisco I. Madero) llamó a las armas contra la reelección de Porfirio Díaz e inició la Revolución Mexicana. La **crisis económica de 1982** (caída de precios del petróleo, alta deuda externa) provocó devaluación del peso, inflación y el fin del modelo de sustitución de importaciones, abriendo paso al neoliberalismo. El **movimiento estudiantil de 1968** (represión en Tlatelolco, 2 de octubre) evidenció el autoritarismo del gobierno y marcó la lucha por libertades democráticas. El **levantamiento del EZLN** (1994, Chiapas) visibilizó la exclusión y pobreza de los pueblos indígenas. En el examen dan una consecuencia o característica y piden relacionarla con el evento histórico correspondiente.",
    flashcards: [
      { front: "¿Qué provocó la crisis económica de 1982 en México?", back: "Devaluación del peso, alta inflación y el fin del modelo de sustitución de importaciones, dando paso a reformas neoliberales." },
      { front: "¿Qué visibilizó el levantamiento del EZLN en 1994?", back: "La pobreza, exclusión y falta de derechos de los pueblos indígenas, especialmente en Chiapas." }
    ],
    quiz: [
      { q: "El evento de 1968 en el que el gobierno reprimió violentamente a estudiantes en Tlatelolco se conoce como:", options: ["Movimiento estudiantil de 1968", "Levantamiento del EZLN", "Plan de San Luis"], correct: 0, explanation: "El movimiento estudiantil de 1968 culminó en la represión del 2 de octubre en Tlatelolco." },
      { q: "El documento que llamó a la insurrección armada contra la reelección de Porfirio Díaz e inició la Revolución Mexicana fue:", options: ["La Constitución de 1917", "El Plan de San Luis", "El Plan de Ayala"], correct: 1, explanation: "El Plan de San Luis, de Francisco I. Madero, convocó a las armas el 20 de noviembre de 1910." }
    ]
  },
  {
    id: "7.3.7",
    area: 7,
    subarea: "7.3 Problemas sociológicos",
    tema: "Tipos de migraciones",
    note: "Existen distintos tipos de migración según su causa y alcance. El **desplazamiento forzado** ocurre cuando las personas huyen por violencia, conflicto armado o desastres, sin elegirlo libremente (ej. familias que huyen de zonas controladas por el crimen organizado). La **migración estatal** (o interestatal) es el movimiento de personas entre estados dentro de un mismo país, por trabajo o estudio. La **migración rural-urbana** es el desplazamiento del campo a la ciudad, buscando mejores oportunidades económicas, empleo y servicios. También existe la migración internacional (entre países). En el examen dan un caso (una familia huye de la violencia, alguien se muda del campo a la capital por trabajo) y piden identificar el tipo de migración.",
    flashcards: [
      { front: "¿Qué es el desplazamiento forzado?", back: "Migración provocada por violencia, conflicto o desastres, donde las personas no eligen libremente irse." },
      { front: "¿Qué es la migración rural-urbana?", back: "El desplazamiento de personas del campo a la ciudad en busca de mejores oportunidades económicas." }
    ],
    quiz: [
      { q: "Una familia huye de su pueblo porque un grupo armado los amenazó de muerte. Este es un caso de:", options: ["Migración rural-urbana", "Desplazamiento forzado", "Migración estatal"], correct: 1, explanation: "Huir por violencia o amenazas sin elegirlo libremente es desplazamiento forzado." },
      { q: "Un joven de un pueblo agrícola se muda a la Ciudad de México buscando mejor empleo. Esto es un ejemplo de migración:", options: ["Rural-urbana", "Forzada", "Internacional"], correct: 0, explanation: "El desplazamiento del campo a la ciudad por oportunidades económicas es migración rural-urbana." }
    ]
  },
  {
    id: "7.3.8",
    area: 7,
    subarea: "7.3 Problemas sociológicos",
    tema: "Movimientos sociales antisistema",
    note: "Los **movimientos antisistema** cuestionan y buscan transformar el orden social, económico o político establecido. El **movimiento feminista** lucha contra la desigualdad de género, la violencia machista y por derechos plenos para las mujeres. El **movimiento antiglobalización** critica el modelo económico neoliberal global, el poder de las grandes corporaciones y las desigualdades que genera el libre comercio sin regulación. El **movimiento hippie** (años 60) rechazó el consumismo, la guerra (especialmente la de Vietnam) y las normas sociales tradicionales, promoviendo paz, libertad y contracultura. En el examen dan una descripción de lucha o crítica social y piden identificar a qué movimiento antisistema corresponde.",
    flashcards: [
      { front: "¿Qué busca el movimiento feminista?", back: "La igualdad de género y erradicar la violencia y discriminación hacia las mujeres." },
      { front: "¿Qué critica el movimiento antiglobalización?", back: "El modelo económico neoliberal global, el poder corporativo y las desigualdades del libre comercio sin regulación." }
    ],
    quiz: [
      { q: "Un movimiento que protesta contra el poder de las grandes corporaciones y los efectos negativos del libre comercio mundial es el:", options: ["Movimiento antiglobalización", "Movimiento hippie", "Movimiento feminista"], correct: 0, explanation: "El movimiento antiglobalización cuestiona el modelo económico global y el poder corporativo." },
      { q: "El movimiento de los años 60 que rechazaba el consumismo, la guerra y promovía la paz y la contracultura fue el:", options: ["Movimiento feminista", "Movimiento hippie", "Movimiento antiglobalización"], correct: 1, explanation: "El movimiento hippie surgió en los años 60 promoviendo paz, libertad y rechazo al consumismo y la guerra." }
    ]
  }
];
