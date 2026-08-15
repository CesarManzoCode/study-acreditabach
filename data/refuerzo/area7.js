/* Refuerzo del área 7 · Ciencias sociales

   Repone lo que la guía nombra y no tenía reactivos:

   · 7.3.6 evalúa el Plan de San Luis, la crisis de 1982, el movimiento de 1968
     y el EZLN. El paquete enseñaba el sismo de 1985, la crisis de 1994 y la
     pandemia: ninguno de los cuatro. Ojo con la fecha: la crisis evaluada es
     la de 1982, no la del "error de diciembre".
   · 7.2.4 nombra SEP, Conadis, Sedatu e Inaes, y ni la SEP ni el Conadis
     tenían reactivo propio.
   · 7.3.7 nombra la migración estatal, que no aparecía por ningún lado.

   Suma reactivos de relación de elementos para las orientaciones con listas:
   los cuatro conceptos de 7.3.1, los tres organismos de 7.2.7, los tres
   sectores de 7.1.3 y los tres principios de política exterior de 7.2.6. */

const AREA7_REFUERZO = {
  // Guía: "Reconocimiento de necesidades vitales y no vitales."
  "7.1.1": {
    quiz: [
      {
        q: "Relacione cada situación con el tipo de necesidad que corresponde.\n**Situación:** 1. Una comunidad sin agua entubada acarrea agua de un pozo lejano · 2. Una familia cambia de televisión porque salió un modelo más grande · 3. Personas mueren de hipotermia por no contar con ropa adecuada\n**Necesidad:** a) No vital · b) Vital · c) Vital",
        options: ["1b, 2a, 3c", "1a, 2b, 3c", "1c, 2b, 3a"],
        correct: 0,
        explanation: "El agua (1) y el vestido frente al frío (3) son imprescindibles para sobrevivir: necesidades vitales (b y c). Cambiar de televisión (2) mejora el bienestar pero no condiciona la supervivencia: necesidad no vital (a)."
      },
      {
        q: "¿Cuál de estas es una necesidad material VITAL?",
        options: ["La alimentación diaria", "El acceso a plataformas de streaming", "Contar con automóvil propio"],
        correct: 0,
        explanation: "Las necesidades vitales son las imprescindibles para sobrevivir y son comunes a todos los seres humanos: alimento, agua, vestido y vivienda. Las otras dos mejoran el bienestar, pero su ausencia no compromete la vida."
      },
      {
        q: "¿Qué distingue a una necesidad no vital de una vital?",
        options: [
          "Que su satisfacción mejora el bienestar, pero no es imprescindible para sobrevivir",
          "Que solo la sienten las personas de ingresos altos",
          "Que no cuesta dinero satisfacerla"
        ],
        correct: 0,
        explanation: "La frontera es la supervivencia: la necesidad vital debe satisfacerse para vivir; la no vital, también llamada secundaria, eleva la calidad de vida sin ser condición para seguir vivo. No depende del ingreso ni del precio."
      }
    ]
  },

  // Guía: "Identificación de las actividades económicas correspondientes a los
  // sectores primario, secundario y terciario."
  "7.1.3": {
    quiz: [
      {
        q: "Relacione cada actividad económica con su sector productivo.\n**Actividad:** 1. Extracción de plata en una mina · 2. Armado de automóviles en una planta · 3. Transporte de mercancías y venta al público\n**Sector:** a) Terciario · b) Primario · c) Secundario",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La minería (1) obtiene recursos directamente de la naturaleza: sector primario (b). El armado de automóviles (2) transforma materias primas: secundario (c). El transporte y el comercio (3) prestan servicios: terciario (a)."
      },
      {
        q: "Relacione cada actividad con su sector.\n**Actividad:** 1. Pesca en altamar · 2. Elaboración de queso a partir de leche · 3. Consulta médica en un hospital\n**Sector:** a) Secundario · b) Terciario · c) Primario",
        options: ["1c, 2a, 3b", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "La pesca (1) extrae de la naturaleza: primario (c). Convertir leche en queso (2) es transformación: secundario (a). La atención médica (3) es un servicio: terciario (b)."
      }
    ]
  },

  // Guía: "Identificación de los mecanismos empleados para repartir la riqueza
  // entre los agentes de un proceso productivo."
  "7.1.4": {
    quiz: [
      {
        q: "Relacione cada factor productivo con la retribución que recibe en el reparto de la riqueza.\n**Factor:** 1. Trabajo · 2. Tierra · 3. Capital\n**Retribución:** a) Interés · b) Salario · c) Renta",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El trabajo (1) se retribuye con salario (b). La tierra (2), con renta (c). El capital prestado (3), con interés (a). A esos tres se suma la ganancia, que retribuye a quien organiza la producción y asume el riesgo."
      },
      {
        q: "¿Qué mecanismo de reparto retribuye a quien organiza los factores productivos y asume el riesgo de la inversión?",
        options: ["La ganancia", "El salario", "La renta"],
        correct: 0,
        explanation: "La ganancia es el excedente que queda tras cubrir los costos y remunera la función empresarial: decidir qué producir, combinar los factores y arriesgar el capital. El salario retribuye el trabajo y la renta, el uso de la tierra o un inmueble."
      },
      {
        q: "El pago mensual que recibe el dueño de un local por permitir que un negocio lo use se denomina:",
        options: ["Renta", "Ganancia", "Salario"],
        correct: 0,
        explanation: "La renta retribuye la cesión del uso de un bien —tierra, local, inmueble— a otro agente del proceso productivo. No es salario porque no remunera trabajo, ni ganancia porque el dueño no asume el riesgo del negocio."
      }
    ]
  },

  // Guía: "Reconocimiento de las teorías del Estado postuladas por Rousseau y Hobbes."
  "7.2.1": {
    quiz: [
      {
        q: "Relacione cada autor con su tesis sobre el origen del Estado.\n**Autor:** 1. Hobbes · 2. Rousseau\n**Tesis:** a) El ser humano es bueno por naturaleza y la sociedad lo corrompe; el Estado legítimo nace de un pacto que expresa la voluntad general · b) En el estado de naturaleza reina la guerra de todos contra todos, así que los individuos ceden su libertad a un poder soberano que garantice la paz",
        options: ["1b, 2a", "1a, 2b", "1b, 2b"],
        correct: 0,
        explanation: "Hobbes (1) parte del estado de naturaleza como guerra —«el hombre es un lobo para el hombre»— y justifica un soberano fuerte (b). Rousseau (2) parte del hombre naturalmente bueno y funda el Estado en la voluntad general (a)."
      },
      {
        q: "¿A qué autor corresponde el concepto de «voluntad general» como fundamento del Estado legítimo?",
        options: ["Rousseau", "Hobbes", "A ninguno de los dos"],
        correct: 0,
        explanation: "La voluntad general es el núcleo del contrato social de Rousseau: el poder legítimo no es el del más fuerte sino el que expresa lo que el pueblo quiere como cuerpo político. Hobbes, en cambio, funda la legitimidad en la necesidad de seguridad."
      }
    ]
  },

  // Guía: "Identificación de las problemáticas que atienden la SEP, el Conadis,
  // la Sedatu y el Inaes."   ← la SEP y el Conadis no tenían reactivos.
  "7.2.4": {
    quiz: [
      {
        q: "Relacione cada problemática con la institución del Estado mexicano que la atiende.\n**Problemática:** 1. Un plantel necesita revisión de planes de estudio y plazas docentes · 2. Una persona con discapacidad enfrenta barreras de accesibilidad y discriminación · 3. Una comunidad requiere regularizar la tenencia de la tierra y ordenar su crecimiento urbano\n**Institución:** a) Sedatu · b) SEP · c) Conadis",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Los planes de estudio y las plazas docentes (1) corresponden a la Secretaría de Educación Pública (b). La inclusión de personas con discapacidad (2) al Conadis (c). La tenencia de la tierra y el desarrollo urbano (3) a la Sedatu (a)."
      },
      {
        q: "Un grupo de artesanas quiere constituirse en cooperativa y busca capacitación y financiamiento para su proyecto de economía social. ¿Qué institución corresponde?",
        options: ["El Inaes", "El Conadis", "La Sedatu"],
        correct: 0,
        explanation: "El Instituto Nacional de la Economía Social (Inaes) impulsa cooperativas y demás formas de organización social productiva, con capacitación y apoyos. El Conadis atiende discapacidad y la Sedatu, territorio y vivienda."
      },
      {
        q: "¿Qué problemática atiende el Consejo Nacional para el Desarrollo y la Inclusión de las Personas con Discapacidad (Conadis)?",
        options: [
          "La exclusión y las barreras que enfrentan las personas con discapacidad para ejercer sus derechos",
          "La regularización de la tenencia de la tierra en zonas urbanas",
          "La certificación de los estudios de nivel bachillerato"
        ],
        correct: 0,
        explanation: "El Conadis coordina la política de inclusión: accesibilidad, no discriminación y ejercicio pleno de derechos de las personas con discapacidad. La tenencia de la tierra es de la Sedatu y la certificación de estudios, de la SEP."
      },
      {
        q: "Relacione cada institución con su ámbito de acción.\n**Institución:** 1. SEP · 2. Inaes · 3. Sedatu\n**Ámbito:** a) Ordenamiento territorial, desarrollo agrario y urbano, y vivienda · b) Educación pública en todos sus niveles · c) Economía social, cooperativas y organizaciones productivas comunitarias",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La SEP (1) atiende la educación pública (b). El Inaes (2) la economía social y las cooperativas (c). La Sedatu (3) el territorio, el desarrollo agrario y urbano y la vivienda (a)."
      }
    ]
  },

  // Guía: "Reconocimiento de situaciones que ejemplifican los principios de
  // autodeterminación de los pueblos, de no intervención y de solución pacífica
  // de controversias."
  "7.2.6": {
    quiz: [
      {
        q: "Relacione cada situación con el principio de política exterior mexicana que ejemplifica.\n**Situación:** 1. México se abstiene de opinar sobre el cambio de gobierno en otro país · 2. México propone que dos países lleven su disputa territorial a una corte internacional en vez de a las armas · 3. México sostiene que cada nación debe elegir libremente su régimen político y su modelo económico\n**Principio:** a) Autodeterminación de los pueblos · b) No intervención · c) Solución pacífica de controversias",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Abstenerse de opinar sobre asuntos internos ajenos (1) es no intervención (b). Recurrir a la vía jurídica en vez de la fuerza (2) es solución pacífica de controversias (c). Reconocer que cada nación elige su régimen (3) es autodeterminación de los pueblos (a)."
      }
    ]
  },

  // Guía: "Reconocimiento de las características de la Unesco, la FAO y la OIT."
  "7.2.7": {
    quiz: [
      {
        q: "Relacione cada organismo internacional con su ámbito de trabajo.\n**Organismo:** 1. Unesco · 2. FAO · 3. OIT\n**Ámbito:** a) Alimentación, agricultura y lucha contra el hambre · b) Normas internacionales del trabajo y derechos laborales · c) Educación, ciencia y cultura, incluida la lista de Patrimonio de la Humanidad",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "La Unesco (1) trabaja en educación, ciencia y cultura y declara el Patrimonio de la Humanidad (c). La FAO (2) atiende alimentación y agricultura (a). La OIT (3) fija normas laborales internacionales (b)."
      },
      {
        q: "Un país solicita apoyo técnico para mejorar sus cultivos y reducir la desnutrición en zonas rurales. ¿Qué organismo interviene?",
        options: ["La FAO", "La Unesco", "La OIT"],
        correct: 0,
        explanation: "La Organización de las Naciones Unidas para la Alimentación y la Agricultura (FAO) se ocupa de la seguridad alimentaria, la producción agrícola y el combate al hambre. Ese es exactamente su mandato."
      },
      {
        q: "La FAO se distingue de los demás organismos de la ONU porque su mandato central es:",
        options: [
          "Erradicar el hambre y mejorar la producción agrícola y la nutrición",
          "Proteger el patrimonio cultural de la humanidad",
          "Regular la jornada laboral y el trabajo infantil"
        ],
        correct: 0,
        explanation: "El nombre lo dice: Alimentación y Agricultura. Sus programas van de la seguridad alimentaria a la pesca sostenible. El patrimonio cultural es de la Unesco y las condiciones laborales, de la OIT."
      }
    ]
  },

  // Guía: "Identificación de las características de las áreas centrales,
  // semiperiféricas, periféricas y de arena exterior en el sistema mundo."
  "7.2.8": {
    quiz: [
      {
        q: "Relacione cada área del sistema-mundo con su característica.\n**Área:** 1. Central · 2. Semiperiférica · 3. Periférica\n**Característica:** a) Exporta materias primas sin procesar y depende de tecnología ajena · b) Concentra tecnología, capital e industrias de alto valor agregado · c) Combina rasgos de las otras dos: aporta manufactura y ensamble, pero el diseño y la ganancia quedan fuera",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El centro (1) concentra tecnología y valor agregado (b). La semiperiferia (2) ensambla y manufactura sin quedarse con el diseño ni la mayor parte de la ganancia (c). La periferia (3) exporta materias primas y depende tecnológicamente (a)."
      },
      {
        q: "En la teoría del sistema-mundo, ¿qué caracteriza al área de arena exterior?",
        options: [
          "Regiones que quedan fuera de la división internacional del trabajo de ese sistema económico",
          "Países que concentran la mayor parte del capital financiero mundial",
          "Zonas dedicadas exclusivamente al ensamble de manufacturas"
        ],
        correct: 0,
        explanation: "La arena exterior son las regiones que, en un momento dado, no están integradas a la economía-mundo: comercian con ella de forma marginal, pero no participan de su división del trabajo ni dependen estructuralmente de ella."
      }
    ]
  },

  // Guía: "Relación de los conceptos de clase social, grupo social, comunidad e
  // institución con sus respectivas definiciones."
  "7.3.1": {
    quiz: [
      {
        q: "Relacione cada tipo de organización social con su definición.\n**Concepto:** 1. Clase social · 2. Comunidad · 3. Institución\n**Definición:** a) Conjunto estable de normas y papeles que organiza un aspecto de la vida colectiva · b) Conjunto de personas que ocupan una posición semejante en la estructura económica y en el acceso a los recursos · c) Agrupación que comparte territorio, lengua y hábitos culturales, con relaciones interpersonales densas",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La clase social (1) se define por la posición económica (b). La comunidad (2) por el territorio y la cultura compartidos (c). La institución (3) por ser un conjunto estable de normas y papeles, como la familia o la escuela (a)."
      },
      {
        q: "Relacione cada ejemplo con el concepto que ilustra.\n**Ejemplo:** 1. La escuela · 2. Un pueblo con lengua y fiestas propias · 3. Un equipo de trabajo que se reúne por un objetivo común\n**Concepto:** a) Grupo social · b) Institución · c) Comunidad",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La escuela (1) es una institución: normas y papeles estables (b). El pueblo con lengua y fiestas propias (2) es una comunidad (c). El equipo reunido por un objetivo (3) es un grupo social (a)."
      }
    ]
  },

  // Guía: "Identificación de la definición de los conceptos de exclusión,
  // discriminación y estereotipo."
  "7.3.4": {
    quiz: [
      {
        q: "Relacione cada concepto con su definición.\n**Concepto:** 1. Estereotipo · 2. Discriminación · 3. Exclusión\n**Definición:** a) Dejar a una persona o grupo fuera del acceso a bienes, servicios o espacios de la vida social · b) Idea generalizada y simplificada que se atribuye a todos los miembros de un grupo · c) Trato desigual y desfavorable hacia una persona por pertenecer a determinado grupo",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El estereotipo (1) es la idea generalizada (b). La discriminación (2) es el trato desigual que suele derivarse de ella (c). La exclusión (3) es el resultado: quedar fuera del acceso a la vida social (a). El orden es idea → trato → resultado."
      }
    ]
  },

  // Guía: "Reconocimiento de las consecuencias del Plan de San Luis, la crisis
  // económica de 1982, el movimiento estudiantil de 1968 y el levantamiento del
  // EZLN en la sociedad mexicana."   ← dos de los cuatro no tenían reactivos.
  "7.3.6": {
    quiz: [
      {
        q: "¿Cuál fue la consecuencia directa del Plan de San Luis, proclamado por Francisco I. Madero en 1910?",
        options: [
          "El llamado al levantamiento armado del 20 de noviembre de 1910, que inició la Revolución mexicana",
          "La promulgación de la Constitución de 1917",
          "La expropiación petrolera"
        ],
        correct: 0,
        explanation: "El Plan de San Luis desconoció la reelección de Díaz y convocó a las armas para el 20 de noviembre de 1910. Esa convocatoria es el arranque formal de la Revolución: su consecuencia social inmediata fue transformar el descontento en insurrección armada."
      },
      {
        q: "¿Cuáles fueron las consecuencias sociales de la crisis económica de 1982 en México?",
        options: [
          "Caída del salario real, aumento de la pobreza y el giro hacia un modelo de apertura y privatizaciones",
          "El crecimiento del gasto social y la expansión del Estado de bienestar",
          "La creación del Instituto Mexicano del Seguro Social"
        ],
        correct: 0,
        explanation: "La suspensión de pagos de 1982, detonada por la caída del precio del petróleo y el alza de las tasas de interés, obligó a firmar programas de ajuste. El resultado social fue la contracción del salario real, más pobreza y el fin del modelo de sustitución de importaciones."
      },
      {
        q: "Relacione cada hecho con su consecuencia en la sociedad mexicana.\n**Hecho:** 1. Movimiento estudiantil de 1968 · 2. Crisis económica de 1982 · 3. Levantamiento del EZLN en 1994\n**Consecuencia:** a) Puso en la agenda nacional los derechos y la autonomía de los pueblos indígenas · b) Crisis de legitimidad del régimen que impulsó las reformas políticas posteriores · c) Ajuste estructural, caída del salario real y giro al modelo de apertura económica",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El 68 (1) exhibió el autoritarismo del régimen y abrió la vía a la reforma política de 1977 (b). La crisis de 1982 (2) trajo el ajuste y el cambio de modelo económico (c). El EZLN (3) colocó la cuestión indígena en el centro del debate nacional (a)."
      },
      {
        q: "El levantamiento del EZLN el 1 de enero de 1994 coincidió deliberadamente con:",
        options: [
          "La entrada en vigor del Tratado de Libre Comercio de América del Norte",
          "La firma de los Acuerdos de San Andrés",
          "La crisis del «error de diciembre»"
        ],
        correct: 0,
        explanation: "La fecha fue simbólica: el TLCAN entró en vigor ese mismo día y el EZLN lo señaló como «sentencia de muerte» para los pueblos indígenas. Los Acuerdos de San Andrés se firmaron en 1996 y la crisis del peso estalló en diciembre de 1994."
      }
    ]
  },

  // Guía: "Reconocimiento de situaciones que ejemplifican desplazamiento forzado,
  // migración estatal y migración rural-urbana."   ← la estatal faltaba.
  "7.3.7": {
    quiz: [
      {
        q: "Relacione cada situación con el tipo de migración que ejemplifica.\n**Situación:** 1. Una familia huye de su comunidad porque un grupo armado la amenazó · 2. Un joven deja su pueblo y se muda a la capital del país buscando empleo · 3. Una familia se traslada de Oaxaca a Baja California, dentro del territorio nacional, siguiendo los ciclos agrícolas\n**Tipo:** a) Migración estatal · b) Desplazamiento forzado · c) Migración rural-urbana",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Huir por amenazas (1) es desplazamiento forzado: no hay elección (b). Del pueblo a la ciudad por empleo (2) es migración rural-urbana (c). El traslado entre estados del propio país (3) es migración estatal o interestatal (a)."
      },
      {
        q: "¿Qué caracteriza a la migración estatal?",
        options: [
          "El traslado de personas de una entidad federativa a otra dentro del mismo país",
          "La salida del país hacia el extranjero en busca de trabajo",
          "El desplazamiento causado por un desastre natural"
        ],
        correct: 0,
        explanation: "La migración estatal o interestatal ocurre dentro de las fronteras nacionales, entre entidades federativas. En México es muy frecuente por los ciclos agrícolas y la industria maquiladora del norte. Si se cruza la frontera del país ya es migración internacional."
      },
      {
        q: "¿Qué distingue al desplazamiento forzado de los demás tipos de migración?",
        options: [
          "Que la persona no elige irse: la violencia, la persecución o un desastre la obligan a hacerlo",
          "Que siempre implica cruzar una frontera internacional",
          "Que siempre es temporal y dura menos de un año"
        ],
        correct: 0,
        explanation: "La clave es la ausencia de decisión voluntaria. En la migración rural-urbana o estatal hay un cálculo de oportunidades; en el desplazamiento forzado hay una amenaza que expulsa. Puede ser interno, sin cruzar ninguna frontera."
      }
    ]
  },

  // Guía: "Identificación de las características del movimiento feminista, el
  // movimiento antiglobalización y el movimiento hippie."
  "7.3.8": {
    quiz: [
      {
        q: "Relacione cada movimiento social antisistema con su característica.\n**Movimiento:** 1. Feminista · 2. Antiglobalización · 3. Hippie\n**Característica:** a) Rechazó el consumismo y la guerra y propuso una contracultura basada en la paz y la vida comunitaria · b) Cuestiona el poder de las corporaciones transnacionales y las desigualdades del libre comercio sin regulación · c) Exige la igualdad de derechos entre mujeres y hombres y combate la violencia de género",
        options: ["1c, 2b, 3a", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "El feminismo (1) lucha por la igualdad de derechos y contra la violencia de género (c). El antiglobalización (2) cuestiona a las corporaciones y al libre comercio desregulado (b). El hippie (3) fue una contracultura pacifista y anticonsumista de los años sesenta (a)."
      }
    ]
  }
};
