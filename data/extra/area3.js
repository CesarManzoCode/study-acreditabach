/* Contenido adicional del área 3 · Conciencia histórica
   Se CONCATENA al final de flashcards y quiz de cada tema (ver engine.js). */

const AREA3_EXTRA = {
  "3.1.1": {
    flashcards: [
      { front: "¿Por qué cayó Tenochtitlan tan rápido frente a la resistencia chichimeca?", back: "Porque en el centro los españoles aprovecharon las **alianzas** con pueblos sometidos por los mexicas (Tlaxcala, Cempoala). En el norte árido no había ciudades ni estructuras que conquistar: los pueblos eran nómadas y dispersos." },
      { front: "¿Qué papel jugaron las epidemias en la conquista?", back: "Enorme. Viruela, sarampión y tifus, traídos de Europa, mataron a gran parte de la población indígena, que no tenía defensas. La caída demográfica debilitó la resistencia más que las armas." },
      { front: "¿Qué fue la Guerra del Mixtón (1541-1542)?", back: "Un levantamiento de pueblos caxcanes y zacatecos en la Nueva Galicia (Jalisco y Zacatecas) contra el dominio español; obligó al virrey Mendoza a encabezar personalmente la campaña." }
    ],
    quiz: [
      { q: "¿Qué factor explica mejor la rapidez de la caída de Tenochtitlan en 1521?", options: ["La superioridad numérica del ejército español", "Las alianzas con pueblos indígenas enemigos de los mexicas y las epidemias", "La falta de organización militar mexica"], correct: 1, explanation: "Los españoles eran pocos: fueron decisivas las alianzas (Tlaxcala, Cempoala) y la viruela, que diezmó a la población de la ciudad sitiada." },
      { q: "¿Por qué la conquista del norte árido fue mucho más difícil que la del centro de México?", options: ["Porque los pueblos eran nómadas y dispersos, sin centros de poder que someter", "Porque el norte tenía más habitantes", "Porque los españoles no tenían caballos"], correct: 0, explanation: "La táctica de tomar la capital y heredar su estructura tributaria no servía con pueblos móviles y sin ciudades." },
      { q: "El cazonci Tangaxoan optó por pactar con los españoles en 1522. ¿A qué pueblo gobernaba?", options: ["A los purépechas de Michoacán", "A los tlaxcaltecas", "A los seris de Sonora"], correct: 0, explanation: "El cazonci era el gobernante purépecha; su rendición negociada evitó una guerra abierta en Michoacán." },
      { q: "¿Cuál fue una consecuencia demográfica de la conquista durante el siglo XVI?", options: ["Un derrumbe de la población indígena por las epidemias traídas de Europa", "Un aumento sostenido de la población indígena", "La desaparición total de las lenguas originarias"], correct: 0, explanation: "Se calcula que la población indígena cayó a una fracción de la que había antes del contacto, sobre todo por enfermedades nuevas." }
    ]
  },

  "3.1.2": {
    flashcards: [
      { front: "¿Qué fue Chan Santa Cruz?", back: "El territorio autónomo que los mayas rebeldes sostuvieron en el oriente de Yucatán durante la Guerra de Castas, con gobierno propio y el culto a la Cruz Parlante, hasta 1901." },
      { front: "¿Qué hizo el porfiriato con los yaquis que resistían?", back: "Los deportó por miles a las haciendas henequeneras de Yucatán y a Valle Nacional, separando familias: fue una política de exterminio y trabajo forzado." },
      { front: "¿Qué reconoce hoy el artículo 2º constitucional?", back: "Que México es una nación pluricultural sustentada en sus pueblos indígenas, con derecho a la libre determinación, a su lengua, cultura y formas propias de organización." }
    ],
    quiz: [
      { q: "¿Cuál fue la causa principal de la Guerra de Castas en Yucatán?", options: ["El despojo de tierras comunales mayas para las haciendas henequeneras y azucareras", "Una disputa religiosa entre órdenes católicas", "La negativa de los mayas a aprender español"], correct: 0, explanation: "La expansión de las haciendas sobre tierras comunales, más los impuestos y el trabajo forzado, detonó el levantamiento de 1847." },
      { q: "Cajeme fue un líder de la resistencia de qué pueblo:", options: ["Yaqui, en Sonora", "Maya, en Quintana Roo", "Purépecha, en Michoacán"], correct: 0, explanation: "José María Leyva, Cajeme, organizó la autonomía yaqui del río Yaqui frente al gobierno mexicano en el siglo XIX." },
      { q: "¿Qué tienen en común la resistencia maya y la yaqui del siglo XIX?", options: ["Ambas defendían la propiedad comunal de la tierra frente al despojo", "Ambas buscaban restaurar el dominio español", "Ambas ocurrieron antes de la Independencia"], correct: 0, explanation: "En los dos casos el detonante fue la privatización y ocupación de tierras comunales por hacendados y particulares." },
      { q: "Un legado visible hoy de esas resistencias es:", options: ["La conservación de lengua, territorio y formas propias de autogobierno", "La desaparición de sus tradiciones", "La ausencia de reconocimiento legal en la Constitución"], correct: 0, explanation: "Ambos pueblos mantienen lengua, autoridades tradicionales e identidad, hoy reconocidas por el artículo 2º constitucional." }
    ]
  },

  "3.1.3": {
    flashcards: [
      { front: "¿Qué era la encomienda?", back: "Un sistema por el cual la Corona entregaba a un español un grupo de indígenas para que trabajaran para él a cambio de 'protegerlos' y evangelizarlos; en los hechos fue trabajo forzado." },
      { front: "¿Qué era la 'república de indios'?", back: "La organización jurídica separada de los pueblos indígenas, con sus propias autoridades y tierras comunales, distinta de la 'república de españoles'. Pagaban tributo, pero tenían cierta protección legal." },
      { front: "¿Qué eran las castas?", back: "Las categorías sociales derivadas de la mezcla entre españoles, indígenas y africanos (mestizo, mulato, castizo, zambo…). Determinaban impuestos, oficios permitidos y trato legal." }
    ],
    quiz: [
      { q: "¿Qué diferenciaba a un peninsular de un criollo en la Nueva España?", options: ["El lugar de nacimiento: España o América, aunque ambos fueran de ascendencia española", "La religión que profesaban", "Que el criollo era hijo de indígena y español"], correct: 0, explanation: "Los dos eran considerados españoles; la diferencia era haber nacido en la península o en América, y de ahí el acceso a los altos cargos." },
      { q: "¿Cuál era la principal obligación económica de los pueblos indígenas en el virreinato?", options: ["El pago del tributo y la prestación de trabajo", "El pago de la alcabala sobre el comercio internacional", "La compra de títulos nobiliarios"], correct: 0, explanation: "El tributo indígena y el trabajo (encomienda, repartimiento) sostenían buena parte de la economía novohispana." },
      { q: "Un hijo de español e indígena en la Nueva España era clasificado como:", options: ["Mestizo", "Criollo", "Peninsular"], correct: 0, explanation: "El mestizo era el producto de español e indígena; el criollo era hijo de españoles nacido en América." },
      { q: "¿Por qué el sistema de castas es clave para entender la Independencia?", options: ["Porque la exclusión política de criollos y la desigualdad de castas alimentaron el descontento", "Porque garantizaba la igualdad entre todos los grupos", "Porque impedía el comercio con Europa"], correct: 0, explanation: "Los criollos querían el poder político que les negaban los peninsulares, y las castas cargaban con la desigualdad social." }
    ]
  },

  "3.1.4": {
    flashcards: [
      { front: "¿Qué es el sincretismo cultural?", back: "La fusión de elementos de dos tradiciones distintas en una nueva. En México, la mezcla de prácticas prehispánicas con el catolicismo español." },
      { front: "¿Qué ejemplo de sincretismo representa la Virgen de Guadalupe?", back: "Su culto se asentó en el cerro del Tepeyac, sitio asociado a la diosa Tonantzin, y se volvió símbolo de identidad para indígenas y mestizos." },
      { front: "¿Qué patrimonio mexicano ha reconocido la UNESCO?", back: "Sitios como el Centro Histórico de la Ciudad de México, Teotihuacán, Chichén Itzá y Guanajuato; y patrimonio inmaterial como el Día de Muertos y la cocina tradicional mexicana." }
    ],
    quiz: [
      { q: "La ofrenda de Día de Muertos con copal, flor de cempasúchil, cruces y veladoras es un ejemplo de:", options: ["Sincretismo entre ritos prehispánicos y catolicismo", "Una tradición traída completa desde España", "Una invención del siglo XX"], correct: 0, explanation: "Los elementos prehispánicos (cempasúchil, copal, comida para los difuntos) se combinaron con la fiesta católica de Todos los Santos." },
      { q: "¿Qué elemento de la arquitectura virreinal se construyó reutilizando piedra de templos prehispánicos?", options: ["La Catedral Metropolitana de la Ciudad de México", "El Palacio de Bellas Artes", "El Castillo de Chapultepec en su forma actual"], correct: 0, explanation: "La Catedral se levantó junto al Templo Mayor y aprovechó materiales de las construcciones mexicas derribadas." },
      { q: "¿Qué reconoció la UNESCO al inscribir el Día de Muertos en su lista?", options: ["Que es Patrimonio Cultural Inmaterial de la Humanidad", "Que es una zona arqueológica protegida", "Que es un monumento histórico virreinal"], correct: 0, explanation: "El patrimonio inmaterial abarca prácticas, rituales y saberes vivos, no edificios ni sitios." },
      { q: "El culto a la Virgen de Guadalupe en el Tepeyac ilustra el sincretismo porque:", options: ["Se instaló en un sitio de veneración prehispánica y unió a indígenas y españoles en una misma devoción", "Prohibió cualquier práctica indígena previa", "Fue creado por el gobierno independiente"], correct: 0, explanation: "El cerro del Tepeyac era lugar de culto a Tonantzin; la devoción guadalupana retomó ese espacio y se volvió símbolo mestizo." }
    ]
  },

  "3.1.5": {
    flashcards: [
      { front: "¿Qué es una zona de monumentos históricos?", back: "Un área declarada por decreto donde los inmuebles quedan protegidos por ley: no se pueden demoler ni alterar sin autorización del INAH o del INBAL." },
      { front: "¿Por qué el saqueo arqueológico daña más que la pérdida de la pieza?", back: "Porque al sacarla de su contexto se pierde la información de dónde y con qué estaba: la capa, los objetos vecinos y la fecha. Sin contexto la pieza deja de contar su historia." }
    ],
    quiz: [
      { q: "¿Qué institución se encarga del patrimonio artístico del siglo XX, como el Palacio de Bellas Artes?", options: ["El INBAL", "El INAH", "La Secretaría de Economía"], correct: 0, explanation: "El INAH cubre lo arqueológico e histórico; el INBAL, el patrimonio artístico moderno y contemporáneo." },
      { q: "Una constructora encuentra vestigios prehispánicos al excavar. ¿Qué procede legalmente?", options: ["Detener la obra y dar aviso al INAH", "Retirar las piezas y continuar la obra", "Venderlas a un museo privado"], correct: 0, explanation: "Los monumentos arqueológicos son propiedad de la nación: la ley obliga a suspender y notificar a la autoridad." },
      { q: "¿Cuál de estas prácticas turísticas ayuda a preservar un sitio arqueológico?", options: ["Limitar el número diario de visitantes y los recorridos permitidos", "Permitir subir libremente a todas las estructuras", "Autorizar la extracción de pequeños fragmentos como recuerdo"], correct: 0, explanation: "El turismo responsable regula aforos y accesos para que el desgaste no destruya el sitio que se va a visitar." },
      { q: "Registrar en video a los últimos hablantes de una lengua indígena y enseñarla en la escuela es una forma de:", options: ["Preservar patrimonio cultural inmaterial", "Proteger un monumento histórico", "Restaurar arquitectura virreinal"], correct: 0, explanation: "Las lenguas, saberes y tradiciones orales son patrimonio inmaterial: se conservan documentándolos y transmitiéndolos." }
    ]
  },

  "3.2.1": {
    flashcards: [
      { front: "¿Qué fueron las Reformas Borbónicas y por qué molestaron a los criollos?", back: "Un conjunto de cambios del siglo XVIII para aumentar el control y los ingresos de la Corona: más impuestos, monopolios y funcionarios peninsulares en los cargos, desplazando a los criollos." },
      { front: "¿Qué idea ilustrada fue clave para justificar la Independencia?", back: "La **soberanía popular**: el poder reside en el pueblo, no en el rey. Sin rey legítimo (por la invasión napoleónica), la soberanía volvía a la nación." }
    ],
    quiz: [
      { q: "¿Por qué la invasión de Napoleón a España en 1808 fue determinante para la Independencia de México?", options: ["Porque dejó a la Nueva España sin rey legítimo y abrió una crisis sobre quién debía gobernar", "Porque Francia ocupó militarmente la Nueva España", "Porque España renunció voluntariamente a sus colonias"], correct: 0, explanation: "Con Fernando VII preso, se discutió si la soberanía regresaba al pueblo: ese vacío legitimó las juntas autonomistas." },
      { q: "Las Reformas Borbónicas del siglo XVIII se cuentan entre las causas de la Independencia porque:", options: ["Aumentaron impuestos y desplazaron a los criollos de los cargos públicos", "Otorgaron la independencia comercial a la Nueva España", "Eliminaron el sistema de castas"], correct: 0, explanation: "Buscaban exprimir más renta de las colonias y centralizar el poder en peninsulares, lo que agravó el resentimiento criollo." },
      { q: "¿Cuál de las siguientes NO es una causa externa de la Independencia de México?", options: ["La desigualdad del sistema de castas", "La Revolución Francesa", "La independencia de las Trece Colonias"], correct: 0, explanation: "La desigualdad de castas era una condición interna de la sociedad novohispana; las otras dos ocurrieron fuera y sirvieron de ejemplo." },
      { q: "La expulsión de los jesuitas en 1767 contribuyó al descontento novohispano porque:", options: ["Afectó a criollos y comunidades que dependían de sus colegios y misiones", "Provocó la quiebra del comercio con Filipinas", "Terminó con el tributo indígena"], correct: 0, explanation: "Los jesuitas educaban a la élite criolla y sostenían misiones; su expulsión se leyó como un golpe de la Corona contra lo americano." }
    ]
  },

  "3.2.2": {
    flashcards: [
      { front: "¿Qué establecía la Constitución de Apatzingán (1814)?", back: "El primer texto constitucional insurgente: soberanía popular, división de poderes y una república sin monarca, redactada bajo la influencia de Morelos. Nunca llegó a aplicarse." },
      { front: "¿Qué fue el Abrazo de Acatempan?", back: "El acuerdo de 1821 entre Agustín de Iturbide (realista) y Vicente Guerrero (insurgente) que unió a ambos bandos y dio origen al Ejército Trigarante." }
    ],
    quiz: [
      { q: "¿Cuáles son las tres garantías del Plan de Iguala?", options: ["Religión católica, independencia y unión", "Libertad, igualdad y fraternidad", "Tierra, libertad y justicia"], correct: 0, explanation: "Religión, Independencia y Unión: de ahí los tres colores de la bandera del Ejército Trigarante." },
      { q: "¿Qué diferencia central hay entre los Sentimientos de la Nación y el Plan de Iguala?", options: ["Morelos proponía una república con igualdad social; Iturbide, una monarquía que conservaba los privilegios existentes", "Los dos proponían exactamente lo mismo", "Morelos defendía la monarquía y el Plan de Iguala la república"], correct: 0, explanation: "El proyecto de Morelos era socialmente radical (fin de la esclavitud y las castas); el de Iturbide buscaba independencia sin cambio social." },
      { q: "El movimiento insurgente logró consumar la Independencia en 1821 gracias a:", options: ["La alianza entre insurgentes y un sector realista criollo encabezado por Iturbide", "La derrota militar total del ejército realista en Guanajuato", "Una intervención militar de Estados Unidos"], correct: 0, explanation: "La unión de Guerrero e Iturbide, y el temor criollo al liberalismo español de 1820, hicieron viable la consumación." },
      { q: "Los Sentimientos de la Nación proclamaban, entre otras cosas:", options: ["Que la esclavitud quedara proscrita y que la soberanía dimanara del pueblo", "Que se coronara a un príncipe europeo", "Que se conservara el sistema de castas"], correct: 0, explanation: "Morelos planteó abolir la esclavitud y las distinciones de casta, y colocar la soberanía en el pueblo." }
    ]
  },

  "3.2.3": {
    flashcards: [
      { front: "¿Qué establecieron las Leyes de Reforma (1859-1863)?", back: "La nacionalización de los bienes del clero, el matrimonio y el registro civil, la secularización de los cementerios y la libertad de cultos: la separación efectiva entre Iglesia y Estado." },
      { front: "¿Qué diferenciaba a liberales y conservadores en el siglo XIX?", back: "Los **liberales** querían república federal, Estado laico, igualdad ante la ley y fin de los fueros; los **conservadores**, un Estado centralista aliado a la Iglesia y al ejército, incluso con monarquía." }
    ],
    quiz: [
      { q: "¿Qué institución civil sustituyó a la Iglesia en el registro de nacimientos, matrimonios y defunciones?", options: ["El Registro Civil", "El Ayuntamiento colonial", "La Junta de Beneficencia"], correct: 0, explanation: "Las Leyes de Reforma crearon el Registro Civil, quitando a la Iglesia el control de los actos del estado civil." },
      { q: "La Ley Juárez (1855) tuvo como efecto principal:", options: ["Suprimir los fueros especiales de militares y eclesiásticos en juicios civiles", "Nacionalizar los bienes de la Iglesia", "Repartir tierras a los campesinos"], correct: 0, explanation: "Buscaba la igualdad ante la ley eliminando tribunales privilegiados para ciertos grupos." },
      { q: "¿Qué conflicto armado provocó directamente la Constitución de 1857 y las leyes liberales?", options: ["La Guerra de Reforma (1858-1861)", "La Guerra de Independencia", "La Revolución Mexicana"], correct: 0, explanation: "Conservadores y liberales se enfrentaron durante tres años por el orden establecido en esa Constitución." },
      { q: "Un efecto NO buscado de la desamortización liberal fue:", options: ["El despojo de tierras comunales indígenas que no pudieron comprarlas", "El fortalecimiento del poder eclesiástico", "La restauración del virreinato"], correct: 0, explanation: "La ley apuntaba a las corporaciones, pero en la práctica golpeó a los pueblos indígenas y concentró la tierra en pocas manos." }
    ]
  },

  "3.2.4": {
    flashcards: [
      { front: "¿Qué fue la Segunda Intervención Francesa (1862-1867)?", back: "La invasión ordenada por Napoleón III tras la suspensión de pagos de Juárez. Impuso el Segundo Imperio con Maximiliano de Habsburgo, derrotado y fusilado en Querétaro en 1867." },
      { front: "¿Qué se conmemora el 5 de mayo?", back: "La victoria del ejército mexicano al mando de Ignacio Zaragoza sobre las tropas francesas en la Batalla de Puebla (1862), durante la Segunda Intervención Francesa." },
      { front: "¿Cuánto territorio perdió México en 1848?", back: "Alrededor de la mitad: los actuales estados de California, Nevada, Utah, y partes de Arizona, Nuevo México, Colorado y Wyoming, además de la renuncia a Texas." }
    ],
    quiz: [
      { q: "¿Qué detonó la Segunda Intervención Francesa en 1862?", options: ["La suspensión del pago de la deuda externa decretada por Juárez", "El hundimiento de barcos franceses", "La firma del Tratado de Guadalupe Hidalgo"], correct: 0, explanation: "La moratoria de 1861 dio pretexto a Francia, España e Inglaterra; solo Francia siguió adelante con la invasión." },
      { q: "El Segundo Imperio Mexicano estuvo encabezado por:", options: ["Maximiliano de Habsburgo", "Napoleón III", "Agustín de Iturbide"], correct: 0, explanation: "Napoleón III lo impulsó, pero fue Maximiliano quien aceptó la corona y gobernó de 1864 a 1867." },
      { q: "¿Qué tienen en común la 'Guerra de los Pasteles' y la Segunda Intervención Francesa?", options: ["En ambas, Francia usó reclamaciones económicas como justificación para intervenir", "Ambas terminaron con pérdida de territorio mexicano", "Ambas ocurrieron en el siglo XVIII"], correct: 0, explanation: "En 1838 fueron indemnizaciones a comerciantes y en 1862 la deuda externa: en ambos casos, el cobro sirvió de pretexto." },
      { q: "La guerra con Estados Unidos (1846-1848) se originó principalmente por:", options: ["La anexión de Texas y el expansionismo estadounidense hacia el Pacífico", "Una disputa religiosa", "El impago de deudas mexicanas a bancos ingleses"], correct: 0, explanation: "La anexión de Texas en 1845 y la idea del Destino Manifiesto empujaron la guerra por los territorios del norte." }
    ]
  },

  "3.2.5": {
    flashcards: [
      { front: "¿Qué proponía el socialismo utópico?", back: "Reformar la sociedad mediante comunidades modelo y cooperación voluntaria, sin lucha de clases ni revolución. Sus figuras: Owen, Fourier y Saint-Simon." },
      { front: "¿Qué planteaba el socialismo científico de Marx y Engels?", back: "Que la historia avanza por la lucha de clases y que el proletariado debía tomar los medios de producción. Se expuso en el *Manifiesto Comunista* (1848)." }
    ],
    quiz: [
      { q: "¿Qué diferencia al anarquismo del socialismo marxista del siglo XIX?", options: ["El anarquismo rechaza cualquier forma de Estado, incluso uno obrero de transición", "El anarquismo defendía la propiedad privada", "El marxismo rechazaba la organización obrera"], correct: 0, explanation: "Bakunin y Marx rompieron justamente por eso: el marxismo aceptaba una etapa de Estado proletario, el anarquismo no." },
      { q: "La 'Carta del Pueblo' de los cartistas exigía, entre otros puntos:", options: ["El sufragio universal masculino y el voto secreto", "La destrucción de las máquinas industriales", "La abolición de la propiedad privada"], correct: 0, explanation: "El cartismo fue un movimiento por derechos políticos: voto para todos los hombres, voto secreto y salario para los diputados." },
      { q: "¿Qué relación tienen estos movimientos europeos con México?", options: ["Sus ideas llegaron e influyeron en el movimiento obrero mexicano y en el magonismo", "No tuvieron ninguna influencia en América", "Fueron impuestos por el gobierno mexicano"], correct: 0, explanation: "El anarquismo y el socialismo europeos nutrieron al Partido Liberal Mexicano y a las primeras huelgas del porfiriato." },
      { q: "El ludismo fue una respuesta obrera a:", options: ["La sustitución de trabajadores por maquinaria durante la industrialización", "La falta de escuelas públicas", "El cobro de impuestos a la tierra"], correct: 0, explanation: "Los obreros veían en las máquinas la causa del desempleo y los bajos salarios, y por eso las destruían." }
    ]
  },

  "3.2.6": {
    flashcards: [
      { front: "¿Qué era el peonaje por deudas?", back: "Un mecanismo por el cual el trabajador quedaba atado a la hacienda: la tienda de raya le vendía a crédito y la deuda, heredable, le impedía irse. Servidumbre en los hechos." },
      { front: "¿Qué eran las compañías deslindadoras?", back: "Empresas autorizadas durante el porfiriato para medir 'tierras baldías'. Se quedaban con un tercio de lo deslindado y despojaron a miles de comunidades que no tenían títulos modernos." }
    ],
    quiz: [
      { q: "¿Por qué las comunidades indígenas perdieron sus tierras con la desamortización si la ley les permitía comprarlas?", options: ["Porque carecían del capital y de los títulos legales para adquirirlas en subasta", "Porque la ley les prohibía expresamente participar", "Porque decidieron venderlas voluntariamente"], correct: 0, explanation: "Sin dinero ni papeles a la vista de la ley, quienes compraron fueron hacendados y especuladores." },
      { q: "La tienda de raya en las haciendas porfiristas servía para:", options: ["Endeudar al peón y mantenerlo atado a la hacienda", "Repartir utilidades entre los trabajadores", "Financiar escuelas rurales"], correct: 0, explanation: "Se pagaba con vales canjeables solo ahí, a precios altos: la deuda crecía y el trabajador no podía marcharse." },
      { q: "¿Qué demanda revolucionaria surgió directamente del despojo agrario del siglo XIX?", options: ["La restitución y dotación de tierras a los pueblos, plasmada en el Plan de Ayala", "La creación del Banco de México", "El sufragio femenino"], correct: 0, explanation: "El zapatismo exigía devolver a los pueblos las tierras usurpadas, y el artículo 27 recogió ese reclamo." },
      { q: "Las compañías deslindadoras del porfiriato tuvieron como resultado:", options: ["Una fuerte concentración de la tierra en pocas manos", "Un reparto equitativo de tierras entre campesinos", "El fin del latifundio"], correct: 0, explanation: "Los grandes latifundios crecieron a costa de las tierras comunales declaradas baldías." }
    ]
  },

  "3.2.7": {
    flashcards: [
      { front: "¿Qué eran los 'científicos' del porfiriato?", back: "El grupo de asesores de Díaz, influidos por el positivismo de Comte, que defendían gobernar con criterios 'científicos' y atraer inversión extranjera. José Yves Limantour fue su figura central." },
      { front: "¿Qué fueron las huelgas de Cananea y Río Blanco?", back: "Las protestas obreras de 1906 (mineros en Sonora) y 1907 (textileros en Veracruz), reprimidas con violencia. Mostraron el costo social del modelo porfirista." }
    ],
    quiz: [
      { q: "¿Qué corriente filosófica inspiró el lema 'orden y progreso' del porfiriato?", options: ["El positivismo", "El existencialismo", "El romanticismo"], correct: 0, explanation: "El positivismo de Auguste Comte, adaptado en México por Gabino Barreda y los 'científicos'." },
      { q: "La represión de las huelgas de Cananea y Río Blanco demuestra que durante el porfiriato:", options: ["El crecimiento económico convivió con la falta de derechos laborales y la represión", "Los obreros tenían derecho a huelga reconocido", "No existía industria en México"], correct: 0, explanation: "Hubo modernización industrial, pero las demandas obreras se resolvieron con el ejército, no con negociación." },
      { q: "¿Qué buscaba el porfiriato al favorecer la inversión extranjera en ferrocarriles y minería?", options: ["Modernizar la economía y exportar materias primas", "Repartir la riqueza entre los campesinos", "Nacionalizar los recursos naturales"], correct: 0, explanation: "El modelo era exportador y dependía de capital externo; la nacionalización llegaría hasta después de la Revolución." },
      { q: "La frase de Díaz 'poca política y mucha administración' resume:", options: ["Su preferencia por la estabilidad y el crecimiento económico sobre la competencia democrática", "Su compromiso con la libertad de prensa", "Su plan de reforma agraria"], correct: 0, explanation: "Priorizaba obra pública e inversión mientras cerraba los espacios de participación política real." }
    ]
  },

  "3.2.8": {
    flashcards: [
      { front: "¿Qué fue el Plan de San Luis?", back: "El llamado de Francisco I. Madero (1910) a desconocer las elecciones fraudulentas y levantarse en armas el 20 de noviembre, bajo el lema 'Sufragio efectivo, no reelección'." },
      { front: "¿Qué pedía el Programa del Partido Liberal Mexicano de 1906?", back: "Jornada de 8 horas, salario mínimo, prohibición del trabajo infantil, fin de las tiendas de raya y reparto de tierras ociosas: demandas que la Constitución de 1917 recogería." }
    ],
    quiz: [
      { q: "La entrevista Díaz-Creelman de 1908 tuvo importancia porque:", options: ["Díaz declaró que México estaba listo para la democracia, lo que animó a la oposición a organizarse", "Anunció la reforma agraria", "Declaró la guerra a Estados Unidos"], correct: 0, explanation: "Sus declaraciones al periodista estadounidense detonaron la formación de partidos y clubes antirreeleccionistas." },
      { q: "¿Cuál era el lema del movimiento maderista?", options: ["Sufragio efectivo, no reelección", "Tierra y libertad", "Orden y progreso"], correct: 0, explanation: "'Tierra y libertad' fue del zapatismo y magonismo; 'orden y progreso' era el lema del propio porfiriato." },
      { q: "¿Qué distingue al magonismo del maderismo?", options: ["El magonismo planteaba demandas sociales y económicas de fondo, no solo el cambio electoral", "El magonismo defendía la reelección de Díaz", "El maderismo era anarquista"], correct: 0, explanation: "Madero centró su lucha en la democracia electoral; los Flores Magón exigían transformar las condiciones de obreros y campesinos." },
      { q: "El periódico 'Regeneración' fue el órgano de difusión de:", options: ["El Partido Liberal Mexicano de los hermanos Flores Magón", "El gobierno de Porfirio Díaz", "El Ejército Constitucionalista"], correct: 0, explanation: "Desde México y luego desde el exilio en Estados Unidos, difundió la crítica magonista a la dictadura." }
    ]
  },

  "3.2.9": {
    flashcards: [
      { front: "¿Qué fue la Decena Trágica?", back: "El golpe militar de febrero de 1913: diez días de combates en la capital que terminaron con el asesinato de Madero y Pino Suárez y la usurpación de Victoriano Huerta." },
      { front: "¿Qué fue el Plan de Guadalupe?", back: "El documento de 1913 con el que Carranza desconoció a Huerta y creó el Ejército Constitucionalista para restaurar el orden legal." }
    ],
    quiz: [
      { q: "¿Qué facción encabezó la División del Norte?", options: ["El villismo", "El zapatismo", "El constitucionalismo"], correct: 0, explanation: "La División del Norte fue el ejército de Francisco Villa, con fuerte base popular en Chihuahua y Durango." },
      { q: "La Convención de Aguascalientes de 1914 fracasó en su intento de unificar a la Revolución porque:", options: ["Carranza desconoció sus acuerdos y la guerra continuó entre facciones", "Villa y Zapata se negaron a asistir", "Huerta la disolvió por la fuerza"], correct: 0, explanation: "Los convencionistas (villistas y zapatistas) nombraron gobierno, pero Carranza no lo aceptó y la lucha siguió." },
      { q: "¿Qué documento resumía el programa agrario del zapatismo?", options: ["El Plan de Ayala", "El Plan de San Luis", "El Plan de Guadalupe"], correct: 0, explanation: "El Plan de Ayala (1911) exigía restituir tierras a los pueblos y desconoció a Madero por no cumplir con el agrarismo." },
      { q: "El triunfo militar del constitucionalismo tuvo como consecuencia directa:", options: ["La promulgación de la Constitución de 1917", "El regreso de Porfirio Díaz", "La disolución del ejército federal en 1910"], correct: 0, explanation: "Carranza convocó al Congreso Constituyente de Querétaro, del que salió la Constitución vigente." }
    ]
  },

  "3.2.10": {
    flashcards: [
      { front: "¿Qué es el ejido?", back: "La forma de propiedad social de la tierra nacida del artículo 27: el Estado dota de tierra a un núcleo de campesinos, que la usan colectivamente y no podían venderla (hasta la reforma de 1992)." },
      { front: "¿Qué establece el artículo 130 constitucional?", back: "El principio histórico de separación entre el Estado y las iglesias, y la regulación del culto público. Recoge la herencia de la Reforma liberal." }
    ],
    quiz: [
      { q: "¿Por qué se dice que la Constitución de 1917 fue pionera en el mundo?", options: ["Porque fue la primera en incorporar derechos sociales al texto constitucional", "Porque fue la primera constitución escrita de la historia", "Porque estableció la monarquía constitucional"], correct: 0, explanation: "Derechos laborales y agrarios como garantías constitucionales fueron una novedad mundial en 1917." },
      { q: "La expropiación petrolera de 1938 se apoyó jurídicamente en:", options: ["El artículo 27, que reserva a la nación la propiedad del subsuelo", "El artículo 3º sobre educación", "El artículo 123 sobre trabajo"], correct: 0, explanation: "Cárdenas invocó el dominio de la nación sobre los recursos del subsuelo para nacionalizar la industria." },
      { q: "¿Qué garantiza el artículo 3º de la Constitución de 1917?", options: ["La educación laica y gratuita impartida por el Estado", "La libertad de comercio", "El derecho de propiedad privada absoluta"], correct: 0, explanation: "Estableció la educación pública laica y gratuita, uno de los pilares del Estado posrevolucionario." },
      { q: "El reparto agrario derivado de la Revolución tuvo como principal instrumento:", options: ["La dotación de ejidos a los núcleos de población", "La venta de tierras en subasta pública", "La entrega de tierras a compañías extranjeras"], correct: 0, explanation: "El ejido fue la figura con la que se repartió la tierra, sobre todo durante el cardenismo." }
    ]
  },

  "3.3.1": {
    flashcards: [
      { front: "¿Qué eran los sectores del PRI?", back: "Las tres ramas en que se organizaba a la sociedad dentro del partido: obrero (CTM), campesino (CNC) y popular (CNOP). Así se encuadraba y controlaba la movilización social." },
      { front: "¿Qué era el 'dedazo'?", back: "La práctica no escrita por la cual el presidente en turno elegía a su sucesor como candidato del partido oficial, que después ganaba la elección casi con seguridad." }
    ],
    quiz: [
      { q: "¿Qué mecanismo permitía al presidente mexicano designar en la práctica a su sucesor?", options: ["El dedazo dentro del partido oficial", "La elección primaria abierta", "El voto del Congreso"], correct: 0, explanation: "Sin competencia real, la nominación del partido equivalía a la presidencia: el presidente saliente la decidía." },
      { q: "El corporativismo se refiere a:", options: ["Integrar a obreros, campesinos y sectores populares en organizaciones ligadas al partido en el poder", "Privatizar las empresas del Estado", "Otorgar autonomía total a los sindicatos"], correct: 0, explanation: "Las demandas sociales se canalizaban por estructuras controladas desde arriba, a cambio de prebendas y a costa de la autonomía." },
      { q: "¿Por qué la ausencia de contrapesos reforzaba el presidencialismo mexicano?", options: ["Porque el mismo partido controlaba Congreso, gobernadores y sindicatos, sin oposición efectiva", "Porque la Constitución otorgaba poderes ilimitados al presidente", "Porque no existía el Poder Judicial"], correct: 0, explanation: "Formalmente había división de poderes; en los hechos, la disciplina partidista anulaba los frenos institucionales." },
      { q: "La expropiación petrolera y el reparto agrario cardenistas contribuyeron al presidencialismo porque:", options: ["Dieron al Ejecutivo una enorme legitimidad popular", "Debilitaron al partido oficial", "Redujeron el poder del presidente frente al Congreso"], correct: 0, explanation: "El respaldo social que generaron reforzó la figura presidencial como eje del sistema político." }
    ]
  },

  "3.3.2": {
    flashcards: [
      { front: "¿Qué fue la Doctrina Estrada?", back: "El principio de política exterior mexicano (1930) de no juzgar los gobiernos de otros países ni otorgar o negar reconocimientos: es una expresión de la no intervención." },
      { front: "¿Qué fue el Programa Bracero?", back: "El acuerdo con Estados Unidos (1942-1964) por el que millones de mexicanos fueron a trabajar temporalmente en el campo y los ferrocarriles estadounidenses durante y después de la guerra." }
    ],
    quiz: [
      { q: "¿Qué hizo México con los refugiados republicanos españoles tras la Guerra Civil?", options: ["Les dio asilo, y muchos intelectuales fundaron instituciones académicas en el país", "Los devolvió al gobierno de Franco", "Les negó la entrada"], correct: 0, explanation: "El gobierno de Cárdenas los recibió; su llegada enriqueció la vida académica, editorial y científica mexicana." },
      { q: "El Escuadrón 201 participó en la Segunda Guerra Mundial en:", options: ["El frente del Pacífico, en Filipinas", "El desembarco de Normandía", "La campaña del norte de África"], correct: 0, explanation: "La Fuerza Aérea Expedicionaria Mexicana voló misiones de apoyo en Luzón, Filipinas, en 1945." },
      { q: "¿Qué hecho llevó a México a declarar la guerra a las potencias del Eje en 1942?", options: ["El hundimiento de los buques petroleros Potrero del Llano y Faja de Oro por submarinos alemanes", "La invasión de su territorio", "Una petición de la Unión Soviética"], correct: 0, explanation: "Los ataques a barcos mexicanos en el Golfo obligaron a abandonar la neutralidad." },
      { q: "La participación mexicana en la Segunda Guerra Mundial trajo como consecuencia económica:", options: ["Un impulso a la industrialización por sustitución de importaciones", "El cierre de la frontera con Estados Unidos", "La quiebra de la industria petrolera"], correct: 0, explanation: "Al escasear los productos importados, México desarrolló industria propia y exportó materias primas: fue el arranque del 'milagro mexicano'." }
    ]
  },

  "3.3.3": {
    flashcards: [
      { front: "¿Qué fue el modelo de sustitución de importaciones?", back: "La estrategia previa al neoliberalismo (1940-1970): el Estado protegía con aranceles a la industria nacional para producir en el país lo que antes se importaba." },
      { front: "¿Qué son las privatizaciones?", back: "La venta de empresas del Estado a particulares. En México alcanzaron a Teléfonos de México, la banca, aerolíneas y siderúrgicas entre finales de los ochenta y los noventa." }
    ],
    quiz: [
      { q: "¿Qué organismos internacionales condicionaron los préstamos a México a cambio de reformas de mercado?", options: ["El Fondo Monetario Internacional y el Banco Mundial", "La UNESCO y la OIT", "La Cruz Roja Internacional"], correct: 0, explanation: "Los programas de ajuste estructural del FMI y el Banco Mundial exigían apertura, privatización y disciplina fiscal." },
      { q: "El ingreso de México al GATT en 1986 significó:", options: ["La apertura comercial y la reducción de aranceles proteccionistas", "El cierre del comercio exterior", "La nacionalización de la banca"], correct: 0, explanation: "Fue el paso decisivo del proteccionismo a la economía abierta, antesala del TLCAN." },
      { q: "¿Qué modelo económico sustituyó el neoliberalismo en México?", options: ["El de sustitución de importaciones con fuerte intervención estatal", "El feudalismo agrario", "La economía de guerra"], correct: 0, explanation: "El modelo proteccionista posrevolucionario se agotó con la crisis de la deuda de 1982." },
      { q: "Una crítica frecuente al modelo neoliberal en México señala que:", options: ["Aumentó la desigualdad y la precariedad laboral pese al crecimiento del comercio exterior", "Eliminó por completo la pobreza", "Cerró la economía al capital extranjero"], correct: 0, explanation: "Creció la exportación y la inversión, pero el salario real y la desigualdad no mejoraron en la misma proporción." }
    ]
  },

  "3.3.4": {
    flashcards: [
      { front: "¿Qué son las cadenas globales de valor?", back: "La organización de la producción en varios países: un producto se diseña en uno, sus partes se fabrican en otros y se ensambla en un tercero para venderse en todo el mundo." },
      { front: "¿Qué es la glocalización?", back: "La adaptación de productos y contenidos globales a los gustos y tradiciones locales, como cadenas internacionales que ajustan su menú a la cocina de cada país." }
    ],
    quiz: [
      { q: "Un teléfono diseñado en Estados Unidos, con componentes de Corea y Japón, ensamblado en China y vendido en México ilustra:", options: ["Una cadena global de valor", "El proteccionismo comercial", "La autarquía económica"], correct: 0, explanation: "La producción se fragmenta entre países según costos y capacidades: es el rasgo típico de la economía globalizada." },
      { q: "¿Cuál es un efecto negativo de la globalización sobre las economías locales?", options: ["Productores pequeños compiten en desventaja con grandes empresas transnacionales", "Se reduce la oferta de productos importados", "Se elimina la migración laboral"], correct: 0, explanation: "La apertura expone a los productores locales a competidores con costos y escalas mucho mayores." },
      { q: "La difusión mundial del K-pop y del anime, adoptados por jóvenes mexicanos, es ejemplo de:", options: ["Globalización cultural", "Proteccionismo cultural", "Brecha digital"], correct: 0, explanation: "Los flujos culturales globales circulan en varias direcciones, no solo del norte hacia el sur." },
      { q: "La pandemia de COVID-19 mostró un rasgo de la globalización porque:", options: ["Un fenómeno local se volvió mundial en semanas por la interconexión de personas y mercados", "Detuvo por completo el comercio internacional para siempre", "Demostró que los países son autosuficientes"], correct: 0, explanation: "La velocidad del contagio y la interrupción de las cadenas de suministro evidenciaron cuán interdependiente es el mundo." }
    ]
  },

  "3.3.5": {
    flashcards: [
      { front: "¿Qué pasó en el sismo de 1985 en términos políticos?", back: "La sociedad civil se organizó para el rescate ante la lentitud del gobierno. Esa experiencia de autoorganización impulsó movimientos ciudadanos y debilitó al régimen." },
      { front: "¿En qué se transformó el IFE?", back: "En el INE (2014), con atribuciones nacionales sobre las elecciones federales y locales. Antes, en 1996, el IFE ya se había vuelto plenamente autónomo del gobierno." }
    ],
    quiz: [
      { q: "¿Qué importancia tuvo la reforma electoral de 1996 para la alternancia?", options: ["Dio autonomía plena al IFE y equilibró el acceso a recursos entre partidos", "Creó el sistema de partido único", "Prohibió la observación electoral"], correct: 0, explanation: "Sacar la organización de las elecciones del control del gobierno hizo creíble el resultado de 2000." },
      { q: "El movimiento estudiantil de 1968 contribuyó a la apertura política porque:", options: ["Exhibió el autoritarismo del régimen y abrió una crisis de legitimidad", "Logró la renuncia inmediata del presidente", "Consiguió la victoria electoral de la oposición ese mismo año"], correct: 0, explanation: "La represión en Tlatelolco marcó un quiebre moral que empujó reformas y radicalizó a parte de la oposición." },
      { q: "La 'caída del sistema' en 1988 se refiere a:", options: ["La interrupción del conteo de votos en la elección presidencial, sobre la que pesan acusaciones de fraude", "Un apagón nacional", "La quiebra del sistema bancario"], correct: 0, explanation: "El colapso del sistema de cómputo en plena elección alimentó la desconfianza y fortaleció a la oposición de izquierda." },
      { q: "Antes de 2000, la alternancia ya se había dado en:", options: ["Gubernaturas y municipios ganados por la oposición desde los años ochenta", "La presidencia, en 1988", "El Poder Judicial federal"], correct: 0, explanation: "Baja California en 1989 fue la primera gubernatura ganada por la oposición; la alternancia comenzó desde lo local." }
    ]
  },

  "3.3.6": {
    flashcards: [
      { front: "¿Qué papel tuvo la radio en el México posrevolucionario?", back: "Fue el primer medio de alcance nacional: unificó el idioma, difundió música y noticias y sirvió al Estado para construir una identidad nacional común." },
      { front: "¿Qué son las redes sociales como medio político hoy?", back: "Canales sin intermediarios donde cualquiera publica. Facilitan la organización ciudadana, pero también la desinformación y la formación de burbujas de opinión." }
    ],
    quiz: [
      { q: "¿Qué fue la Época de Oro del cine mexicano?", options: ["El periodo de los años cuarenta y cincuenta en que el cine nacional dominó el mercado hispanohablante", "El primer cine documental de la Revolución", "La llegada de la televisión a color"], correct: 0, explanation: "Con figuras como Cantinflas, Dolores del Río y Pedro Infante, el cine mexicano exportó una imagen de nación a toda América Latina." },
      { q: "El movimiento #YoSoy132 en 2012 mostró que:", options: ["Las redes sociales permiten organizar movilizaciones al margen de los medios tradicionales", "La televisión es el único medio con influencia política", "La juventud no participa en política"], correct: 0, explanation: "Un video difundido en línea desencadenó un movimiento estudiantil nacional sin pasar por los medios establecidos." },
      { q: "La caricatura política del porfiriato tuvo gran alcance porque:", options: ["Comunicaba críticas con imágenes, accesibles incluso para quien no sabía leer", "Se transmitía por radio", "Era financiada por el gobierno"], correct: 0, explanation: "En un país con alta analfabetización, el humor gráfico fue una vía eficaz de crítica social." },
      { q: "Un riesgo actual del consumo de información por redes sociales es:", options: ["La difusión rápida de noticias falsas sin verificación", "La imposibilidad de compartir contenidos", "La censura total de la opinión ciudadana"], correct: 0, explanation: "La velocidad y la ausencia de filtros editoriales facilitan que la desinformación circule más rápido que su desmentido." }
    ]
  }
};
