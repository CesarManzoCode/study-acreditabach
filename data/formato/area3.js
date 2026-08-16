/* Reactivos con el formato que la guía oficial marca para este tema
   (Ceneval, junio 2026): clasificación de elementos en categorías. */

const AREA3_FORMATO = {
  // Guía: "Clasificación de las causas que propiciaron la independencia de
  // México en internas, externas, políticas, económicas y sociales."
  "3.2.1": {
    quiz: [
      {
        q: "Clasifique cada causa de la Independencia según su origen.\n**Causa:** 1. La invasión de Napoleón a España en 1808 · 2. La desigualdad del sistema de castas · 3. Las ideas de la Ilustración · 4. El descontento de los criollos por estar excluidos de los cargos políticos\n**Origen:** a) Interna · b) Externa",
        options: ["1b, 2a, 3b, 4a", "1a, 2b, 3a, 4b", "1b, 2b, 3a, 4a"],
        correct: 0,
        explanation: "La invasión napoleónica (1) y las ideas de la Ilustración (3) llegaron de Europa: son causas externas. La desigualdad del sistema de castas (2) y la exclusión política de los criollos (4) ocurrían dentro de la Nueva España: son causas internas."
      },
      {
        q: "Clasifique cada causa de la Independencia según su naturaleza.\n**Causa:** 1. Los impuestos y monopolios comerciales impuestos por la Corona · 2. La crisis de legitimidad al quedar España sin rey · 3. La rigidez del sistema de castas\n**Naturaleza:** a) Económica · b) Política · c) Social",
        options: ["1a, 2b, 3c", "1b, 2c, 3a", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Los impuestos y monopolios (1) son de naturaleza económica (a). La falta de un rey legítimo (2) abrió una crisis de autoridad, de naturaleza política (b). El sistema de castas (3) organizaba jerárquicamente a la población: es de naturaleza social (c)."
      }
    ]
  },

  /* Guía 3.2.7: "Reconocimiento de las características del porfiriato
     representadas en OBRAS PICTÓRICAS de la época." El examen muestra la obra
     impresa. Aquí se dibuja un ESQUEMA de la composición —no la obra— junto
     con su descripción, porque lo que se evalúa es qué característica del
     régimen encarna la escena, no la pincelada. */
  "3.2.7": {
    quiz: [
      {
        q: "Un paisaje de José María Velasco muestra el Valle de México desde una altura: un territorio inmenso y luminoso, el lago al fondo, dos volcanes en el horizonte y, abajo, figuras humanas diminutas junto a un camino. ¿Qué característica del porfiriato se lee en obras como esta?",
        figura: { tipo: "obra", escena: "valle", titulo: "paisaje del Valle de México" },
        options: [
          "La visión de un país ordenado y disponible, imagen del ideal de progreso del régimen",
          "La denuncia directa de la represión política contra los opositores",
          "La exaltación de la vida comunitaria indígena frente a la modernización"
        ],
        correct: 0,
        explanation: "Estos paisajes presentan el territorio como algo vasto, dominado y en calma, con el ser humano reducido a escala mínima. Fueron exhibidos en las exposiciones internacionales como la imagen de un México moderno y apto para la inversión: encarnan el ideal de «orden y progreso», aunque Velasco los pintara como naturalista, no como propagandista."
      },
      {
        q: "Una obra del periodo muestra una locomotora avanzando entre vías, con vagones detrás y postes de telégrafo alineados junto al camino. ¿Qué característica del porfiriato representa?",
        figura: { tipo: "obra", escena: "ferrocarril", titulo: "escena ferroviaria" },
        options: [
          "La modernización material: ferrocarriles, telégrafo e integración del territorio",
          "El reparto agrario a favor de las comunidades campesinas",
          "El regreso a las tradiciones prehispánicas"
        ],
        correct: 0,
        explanation: "El ferrocarril y el telégrafo son los símbolos por excelencia del progreso porfirista: en ese periodo la red ferroviaria pasó de unos cientos a casi 20 000 kilómetros. Comunicaron el país, pero sobre todo conectaron las zonas de exportación con los puertos y la frontera."
      },
      {
        q: "Una escena costumbrista del periodo muestra al fondo la casa grande de una hacienda y, en primer plano, varios peones encorvados trabajando la tierra. ¿Qué característica del porfiriato representa?",
        figura: { tipo: "obra", escena: "hacienda", titulo: "escena de hacienda" },
        options: [
          "La desigualdad social y la concentración de la tierra que sostenían el modelo",
          "La industrialización de las ciudades del norte",
          "El triunfo de la educación pública en el campo"
        ],
        correct: 0,
        explanation: "Es la otra cara del «orden y progreso»: la hacienda concentraba la tierra y el peón trabajaba endeudado en la tienda de raya. Truco de lectura: si en la imagen dominan el paisaje amplio, el tren o la ciudad ordenada, la respuesta va por progreso; si dominan el peón, la hacienda o la miseria, va por desigualdad."
      },
      {
        q: "Una escena urbana del periodo muestra edificios de estilo europeo con balcones y mansardas, una avenida amplia y un carruaje con personas elegantemente vestidas. ¿Qué característica del porfiriato representa?",
        figura: { tipo: "obra", escena: "paseo", titulo: "paseo urbano" },
        options: [
          "El afrancesamiento y la modernización urbana al servicio de la élite",
          "La organización obrera y las primeras huelgas",
          "La resistencia de los pueblos originarios del norte"
        ],
        correct: 0,
        explanation: "La élite porfiriana se veía a sí misma como europea: arquitectura afrancesada, paseos, moda y costumbres importadas. Esa modernización urbana llegó a unas cuantas colonias de unas cuantas ciudades, mientras la mayoría del país seguía siendo rural y analfabeta."
      },
      {
        q: "Un grabado de José Guadalupe Posada muestra una calavera tocada con un enorme sombrero de plumas y flores, al estilo de las damas europeas de la época. ¿Qué critica principalmente esta imagen?",
        figura: { tipo: "obra", escena: "calavera", titulo: "Calavera Garbancera (La Catrina)" },
        options: [
          "La imitación de lo europeo por quienes renegaban de su origen, y el recordatorio de que la muerte iguala a todos",
          "Un ataque personal y directo a Porfirio Díaz y a su gabinete",
          "La defensa del reparto de tierras propuesto por el zapatismo"
        ],
        correct: 0,
        explanation: "La *Calavera Garbancera* —bautizada «La Catrina» décadas después por Diego Rivera— se burla de la persona pobre que se disfraza de dama afrancesada y niega su origen indígena. Es sátira social, no un ataque nominal al presidente. Además es un **grabado** publicado en la prensa popular, no una pintura."
      }
    ]
  },

  /* Guía 3.1.1: la orientación nombra CUATRO pueblos —tzotziles, purépechas,
     chichimecas y seris— y el banco solo practicaba dos. Estos reactivos
     cubren los cuatro. */
  "3.1.1": {
    quiz: [
      {
        q: "Relacione cada pueblo con la forma en que vivió el proceso de conquista.\n**Pueblo:** 1. Purépechas · 2. Chichimecas · 3. Seris\n**Proceso:** a) Nómadas del desierto costero, nunca sometidos del todo: resistieron misiones y campañas militares hasta el siglo XIX · b) Sometidos casi sin combate tras el pacto de su gobernante con los españoles · c) Cuarenta años de guerra de guerrillas por el camino de la plata, terminados por negociación",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El cazonci purépecha Tangaxoan II pactó en 1522 para evitar la guerra (b). Los chichimecas sostuvieron la Guerra Chichimeca de 1550 a 1590 y la Corona terminó comprando la paz (c). Los seris, nómadas de la costa de Sonora, se replegaron al desierto y a la isla Tiburón y nunca fueron conquistados plenamente (a)."
      },
      {
        q: "¿Qué caracterizó la conquista de los tzotziles en los Altos de Chiapas?",
        options: [
          "Fueron sometidos militarmente en la década de 1520 y quedaron bajo encomienda y evangelización dominica, con rebeliones posteriores como la de Cancuc en 1712",
          "Pactaron pacíficamente con los españoles y conservaron a su gobernante",
          "Nunca llegaron los españoles a su territorio hasta el siglo XIX"
        ],
        correct: 0,
        explanation: "Diego de Mazariegos sometió la región entre 1524 y 1528. El control se ejerció mediante la encomienda, los pueblos de indios y la orden dominica. Su resistencia no fue una guerra continua, sino rebeliones periódicas —la mayor, la de Cancuc en 1712, de raíz religiosa— y la conservación de su organización comunitaria."
      },
      {
        q: "¿Por qué la conquista del norte árido resultó mucho más lenta y costosa que la del centro de México?",
        options: [
          "Porque los pueblos nómadas y dispersos no tenían un poder central que rendir, así que someter a un gobernante no bastaba",
          "Porque los españoles no tenían armas de fuego en el norte",
          "Porque el norte estaba mucho más poblado que el centro"
        ],
        correct: 0,
        explanation: "En Mesoamérica bastaba tomar la capital y negociar con las élites de un Estado ya centralizado. Entre chichimecas y seris no había capital ni gobernante único: cada grupo peleaba por su cuenta, se replegaba al desierto y volvía. Por eso la Guerra Chichimeca terminó con la «paz por compra» y no con una rendición."
      }
    ]
  }
};
