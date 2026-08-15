/* Refuerzo del área 3 · Conciencia histórica

   Repone lo que la guía nombra por su nombre y no tenía reactivos: los
   tzotziles y los seris de 3.1.1, los tapetes de Huamantla y el Palacio
   Nacional de 3.1.4, la Guerra de los Pasteles de 3.2.4 —la guía dice
   "primera intervención francesa", no la de Maximiliano—, los tres
   movimientos obreros europeos de 3.2.5 y el cine documental de 3.3.6.

   Suma además reactivos de relación de elementos, que es el formato natural
   de las orientaciones que enumeran cuatro grupos o cuatro facciones. */

const AREA3_REFUERZO = {
  // Guía: "Reconocimiento de las características de los procesos de conquista de
  // los tzotziles, purépechas, chichimecas y seris."
  "3.1.1": {
    quiz: [
      {
        q: "Relacione cada pueblo con el rasgo de su proceso de conquista.\n**Pueblo:** 1. Purépechas · 2. Chichimecas · 3. Seris\n**Rasgo:** a) Pueblos nómadas del norte árido que sostuvieron una guerra de casi cuarenta años contra los españoles · b) Su gobernante pactó con los españoles y el señorío se sometió casi sin combate · c) Pueblo del desierto de Sonora que resistió de forma intermitente hasta el siglo XIX",
        options: ["1b, 2a, 3c", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El cazonci Tangaxoan pactó con los españoles en 1522 y Michoacán se sometió casi sin guerra (b). Los chichimecas sostuvieron la Guerra Chichimeca, de 1550 a 1590 (a). Los seris de Sonora resistieron de forma intermitente hasta bien entrado el siglo XIX (c)."
      },
      {
        q: "Los tzotziles, en los Altos de Chiapas, se distinguen dentro de los procesos de conquista porque:",
        options: [
          "Fueron sometidos militarmente pero conservaron su organización comunitaria y protagonizaron rebeliones durante siglos",
          "Pactaron con los españoles y evitaron el enfrentamiento armado",
          "Nunca fueron alcanzados por la presencia española"
        ],
        correct: 0,
        explanation: "Los tzotziles fueron sometidos en el siglo XVI, pero el control español sobre los Altos de Chiapas nunca fue completo: mantuvieron su vida comunitaria y su lengua, y protagonizaron levantamientos que se prolongaron durante el virreinato y el México independiente."
      },
      {
        q: "¿Por qué la conquista de los pueblos del norte árido, como chichimecas y seris, fue mucho más difícil que la del centro de México?",
        options: [
          "Porque eran nómadas y dispersos, sin un centro de poder que someter de un golpe",
          "Porque tenían armas de fuego desde antes de la llegada española",
          "Porque contaban con más población que los pueblos del centro"
        ],
        correct: 0,
        explanation: "En el centro bastaba con tomar la capital de un señorío para controlar toda su estructura tributaria. En el norte no había capitales: los grupos eran móviles y dispersos, así que la conquista se convirtió en décadas de guerra de desgaste."
      }
    ]
  },

  // Guía: "Identificación de las características de los grupos indígenas,
  // criollos, mestizos y esclavos en la sociedad novohispana."
  "3.1.3": {
    quiz: [
      {
        q: "Relacione cada grupo de la sociedad novohispana con su característica.\n**Grupo:** 1. Criollos · 2. Mestizos · 3. Población africana esclavizada\n**Característica:** a) Descendientes de español e indígena, con menos derechos que los criollos y sin lugar fijo en el orden legal · b) Carecían de libertad y de derechos, y eran propiedad de un dueño · c) Hijos de españoles nacidos en América, con riqueza pero excluidos de los altos cargos",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Los criollos (1) tenían poder económico pero no acceso a los altos cargos políticos, reservados a los peninsulares (c). Los mestizos (2) quedaban en una posición intermedia y ambigua (a). La población africana esclavizada (3) no tenía libertad ni derechos (b)."
      }
    ]
  },

  // Guía: "Identificación del origen del Día de Muertos, de los tapetes de
  // Huamantla y del Palacio Nacional."   ← tres bienes nombrados.
  "3.1.4": {
    quiz: [
      {
        q: "¿Cuál es el origen de los tapetes de Huamantla, en Tlaxcala?",
        options: [
          "Una tradición religiosa virreinal: alfombras de aserrín y flores para el paso de la procesión de la Virgen",
          "Un rito prehispánico de siembra que marcaba el inicio del ciclo agrícola",
          "Una costumbre del siglo XX creada para atraer turismo a la región"
        ],
        correct: 0,
        explanation: "Los tapetes de Huamantla son de origen virreinal y religioso: se elaboran con aserrín teñido, flores y semillas sobre las calles por donde pasa la procesión de la Virgen de la Caridad, en agosto. La técnica llegó con la tradición católica española y se enriqueció con materiales y diseños locales."
      },
      {
        q: "¿Cuál es el origen del edificio del Palacio Nacional?",
        options: [
          "Se construyó en la época virreinal sobre el sitio del palacio de Moctezuma y fue sede del poder político de la Nueva España",
          "Es una construcción prehispánica que se conservó intacta y hoy funciona como museo",
          "Se levantó en el siglo XIX como residencia de los presidentes posrevolucionarios"
        ],
        correct: 0,
        explanation: "El Palacio Nacional se edificó en el siglo XVI sobre el terreno del palacio de Moctezuma II, reutilizando incluso su piedra. Fue casa de Cortés, después sede del gobierno virreinal y más tarde del poder ejecutivo mexicano: un edificio con las tres épocas encimadas."
      },
      {
        q: "Relacione cada bien del patrimonio con su origen.\n**Bien:** 1. Día de Muertos · 2. Tapetes de Huamantla · 3. Palacio Nacional\n**Origen:** a) Virreinal: edificio de gobierno levantado sobre el palacio de Moctezuma · b) Virreinal: alfombras rituales para una procesión católica · c) Sincrético: ritos prehispánicos de culto a los muertos fundidos con el Día de Todos los Santos",
        options: ["1c, 2b, 3a", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "El Día de Muertos (1) es el caso claro de sincretismo entre lo prehispánico y lo católico (c). Los tapetes de Huamantla (2) son virreinales y procesionales (b). El Palacio Nacional (3) es virreinal y de gobierno, construido sobre el palacio de Moctezuma (a)."
      }
    ]
  },

  // Guía: "Reconocimiento de los sucesos de la PRIMERA intervención francesa y la
  // intervención estadounidense en México durante el siglo XIX."
  "3.2.4": {
    quiz: [
      {
        q: "La primera intervención francesa en México, conocida como Guerra de los Pasteles (1838-1839), se originó por:",
        options: [
          "Reclamaciones económicas de comerciantes franceses avecindados en México, que Francia respaldó bloqueando el puerto de Veracruz",
          "La suspensión del pago de la deuda externa decretada por Benito Juárez",
          "El deseo francés de instalar a un príncipe europeo en el trono de México"
        ],
        correct: 0,
        explanation: "La Guerra de los Pasteles nació de indemnizaciones exigidas por comerciantes franceses —entre ellos un pastelero, de ahí el nombre popular— por daños sufridos en México. Francia bloqueó Veracruz para cobrarlas. La deuda de Juárez y el trono de Maximiliano corresponden a la SEGUNDA intervención, veinticuatro años después."
      },
      {
        q: "Relacione cada intervención del siglo XIX con su desenlace.\n**Intervención:** 1. Primera intervención francesa (1838) · 2. Intervención estadounidense (1846-1848)\n**Desenlace:** a) El Tratado de Guadalupe Hidalgo, con la pérdida de cerca de la mitad del territorio mexicano · b) México aceptó pagar la indemnización exigida y Francia levantó el bloqueo de Veracruz",
        options: ["1b, 2a", "1a, 2b", "1b, 2b"],
        correct: 0,
        explanation: "La Guerra de los Pasteles (1) terminó con el pago de la indemnización y el levantamiento del bloqueo (b). La guerra con Estados Unidos (2) terminó con el Tratado de Guadalupe Hidalgo de 1848 y la pérdida de más de la mitad del territorio (a)."
      },
      {
        q: "¿Qué territorios perdió México con el Tratado de Guadalupe Hidalgo?",
        options: [
          "Los actuales California, Nevada, Utah, y partes de Arizona, Nuevo México, Colorado y Wyoming, además de la renuncia a Texas",
          "Únicamente Texas",
          "La península de Yucatán y Chiapas"
        ],
        correct: 0,
        explanation: "El tratado de 1848 cedió la Alta California y Nuevo México —hoy California, Nevada, Utah y partes de Arizona, Nuevo México, Colorado y Wyoming— y fijó la frontera en el río Bravo, con lo que México renunció definitivamente a Texas. En total, más de la mitad del territorio."
      }
    ]
  },

  // Guía: "Reconocimiento de las características del movimiento anarquista,
  // el ludismo y el cartismo."
  "3.2.5": {
    quiz: [
      {
        q: "Relacione cada movimiento social del siglo XIX con su característica.\n**Movimiento:** 1. Ludismo · 2. Cartismo · 3. Anarquismo\n**Característica:** a) Exigía derechos políticos para los obreros, sobre todo el sufragio universal masculino, mediante una petición formal al Parlamento · b) Proponía suprimir el Estado y la propiedad privada para una sociedad de individuos libres e iguales · c) Destruía la maquinaria de las fábricas, a la que culpaba del desempleo",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El ludismo (1) rompía máquinas (c). El cartismo (2) presentó la Carta del Pueblo exigiendo el voto para los obreros (a). El anarquismo (3) buscaba abolir el Estado y la propiedad privada (b)."
      },
      {
        q: "¿Qué caracterizó al ludismo en la Inglaterra de principios del siglo XIX?",
        options: [
          "La destrucción de telares y maquinaria por obreros que veían en ellas la causa de su desempleo",
          "La formación del primer partido obrero con representación parlamentaria",
          "La creación de cooperativas de producción autogestionadas"
        ],
        correct: 0,
        explanation: "El ludismo fue la primera reacción obrera contra la industrialización, y fue una reacción destructiva: los trabajadores irrumpían en las fábricas y rompían la maquinaria que había sustituido su trabajo artesanal. No planteaba un programa político."
      },
      {
        q: "¿Qué exigía la Carta del Pueblo, documento central del cartismo?",
        options: [
          "Sufragio universal masculino, voto secreto y que los diputados no necesitaran ser propietarios",
          "La abolición inmediata de la propiedad privada",
          "El regreso al trabajo artesanal y la prohibición de las máquinas"
        ],
        correct: 0,
        explanation: "El cartismo fue un movimiento político, no destructivo: exigía que los obreros pudieran votar y ser votados. Sus seis puntos incluían el sufragio universal masculino, el voto secreto y eliminar el requisito de ser propietario para ocupar un escaño."
      },
      {
        q: "¿Qué distingue al anarquismo de los otros movimientos obreros del siglo XIX?",
        options: [
          "Que rechaza toda forma de Estado, incluso uno obrero de transición",
          "Que solo aceptaba métodos legales y parlamentarios",
          "Que defendía la propiedad privada de los medios de producción"
        ],
        correct: 0,
        explanation: "Ahí está la ruptura con el socialismo marxista: los marxistas aceptaban un Estado obrero como etapa hacia la sociedad sin clases, y los anarquistas —Proudhon, Bakunin— rechazaban el Estado en cualquier forma, incluida esa."
      }
    ]
  },

  // Guía: "Reconocimiento de las características del movimiento magonista,
  // el Partido Liberal Mexicano y el zapatismo."
  "3.2.8": {
    quiz: [
      {
        q: "Relacione cada movimiento de oposición al porfiriato con su rasgo distintivo.\n**Movimiento:** 1. Magonismo · 2. Partido Liberal Mexicano · 3. Zapatismo\n**Rasgo:** a) Exigía la restitución de las tierras despojadas a los pueblos, bajo el lema «Tierra y Libertad» · b) Corriente encabezada por los hermanos Flores Magón, que denunciaba la dictadura desde el periódico Regeneración · c) Organización cuyo Programa de 1906 pedía jornada de ocho horas, salario mínimo y prohibición del trabajo infantil",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El magonismo (1) es la corriente de los Flores Magón y su periódico Regeneración (b). El Partido Liberal Mexicano (2) formalizó esas ideas en el Programa de 1906, con demandas laborales muy adelantadas (c). El zapatismo (3) fue el movimiento agrario de Morelos (a)."
      },
      {
        q: "¿Qué demandaba centralmente el zapatismo?",
        options: [
          "La restitución a los pueblos de las tierras comunales que las haciendas les habían arrebatado",
          "El sufragio efectivo y la no reelección del presidente",
          "La nacionalización de la industria petrolera"
        ],
        correct: 0,
        explanation: "El zapatismo era un movimiento agrario: su reclamo era la tierra, no el voto. El Plan de Ayala de 1911 exigía devolver a los pueblos las tierras, montes y aguas usurpados durante el porfiriato. «Sufragio efectivo, no reelección» era el lema maderista."
      },
      {
        q: "El Programa del Partido Liberal Mexicano de 1906 destacó porque:",
        options: [
          "Planteó demandas sociales y laborales que apenas se harían ley una década después, en la Constitución de 1917",
          "Se limitó a pedir elecciones limpias sin tocar los temas económicos",
          "Defendía la continuidad del régimen de Porfirio Díaz con reformas menores"
        ],
        correct: 0,
        explanation: "El Programa de 1906 pedía jornada de ocho horas, salario mínimo, prohibición del trabajo infantil y reparto agrario. Varias de esas demandas terminaron en los artículos 27 y 123 de la Constitución de 1917: por eso se dice que el PLM se adelantó a la Revolución."
      }
    ]
  },

  // Guía: "Reconocimiento de las características de los villistas, los
  // convencionistas, los carrancistas y los constitucionalistas."
  "3.2.9": {
    quiz: [
      {
        q: "Relacione cada facción de la Revolución mexicana con su característica.\n**Facción:** 1. Villistas · 2. Convencionistas · 3. Constitucionalistas\n**Característica:** a) Alianza de villistas y zapatistas surgida de la Convención de Aguascalientes, que desconoció a Carranza · b) Encabezados por Carranza, buscaban restablecer el orden constitucional roto por el golpe de Huerta y promulgaron la Constitución de 1917 · c) Formaban la División del Norte, con base popular y campesina del norte del país",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Los villistas (1) eran la División del Norte de Francisco Villa (c). Los convencionistas (2) fueron la alianza villista-zapatista salida de Aguascalientes en 1914 (a). Los constitucionalistas (3), de Carranza, ganaron militarmente y produjeron la Constitución de 1917 (b)."
      },
      {
        q: "Ordene cronológicamente estos momentos de la Revolución mexicana.\n1. Convención de Aguascalientes y ruptura entre facciones\n2. Decena Trágica y asesinato de Madero\n3. Promulgación de la Constitución\n4. Plan de Guadalupe y levantamiento constitucionalista",
        options: ["2, 4, 1, 3", "4, 2, 1, 3", "2, 1, 4, 3"],
        correct: 0,
        explanation: "La Decena Trágica y el asesinato de Madero (2) ocurren en febrero de 1913. Carranza responde con el Plan de Guadalupe (4) el mes siguiente. Caído Huerta, la Convención de Aguascalientes (1) se reúne en 1914 y rompe a los revolucionarios. La Constitución (3) se promulga en 1917."
      }
    ]
  },

  // Guía: "Reconocimiento del impacto social del cine documental, la caricatura
  // política y la producción televisiva sobre la población mexicana durante los
  // siglos XIX y XX."
  "3.3.6": {
    quiz: [
      {
        q: "¿Cuál fue el impacto social del cine documental durante la Revolución mexicana?",
        options: [
          "Llevó por primera vez a la población imágenes en movimiento de los hechos y los caudillos, y creó una memoria visual compartida del conflicto",
          "Se usó exclusivamente con fines científicos y no llegó al público general",
          "Apareció hasta los años setenta, cuando la Revolución ya era historia lejana"
        ],
        correct: 0,
        explanation: "Camarógrafos como los hermanos Alva filmaron batallas, entradas triunfales y a los propios caudillos, y esas cintas se proyectaron en salas de todo el país. Fue la primera vez que la población vio en movimiento un acontecimiento nacional mientras ocurría."
      },
      {
        q: "Relacione cada medio con su impacto social en México.\n**Medio:** 1. Caricatura política · 2. Cine documental · 3. Producción televisiva\n**Impacto:** a) Registró en imágenes los hechos de la Revolución y formó la memoria visual del país · b) Criticó al poder con imágenes que llegaban incluso a quienes no sabían leer · c) Construyó una identidad nacional compartida y difundió a la vez el discurso oficial",
        options: ["1b, 2a, 3c", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La caricatura política (1) fue crítica y accesible al público analfabeto (b). El cine documental (2) registró la Revolución (a). La televisión (3), desde mediados del siglo XX, unificó gustos y referencias y sirvió también al discurso oficial (c)."
      },
      {
        q: "¿Por qué la caricatura política tuvo tanto alcance en el México del porfiriato?",
        options: [
          "Porque comunicaba su crítica con imágenes, comprensibles incluso para la mayoría que no sabía leer",
          "Porque el gobierno la financiaba como medio oficial",
          "Porque circulaba únicamente entre las élites ilustradas de la capital"
        ],
        correct: 0,
        explanation: "En un país con altísimo analfabetismo, un dibujo satírico llegaba a donde no llegaba un editorial. Por eso la caricatura fue el vehículo crítico más eficaz del porfiriato, y por eso el régimen persiguió a sus autores."
      }
    ]
  }
};
