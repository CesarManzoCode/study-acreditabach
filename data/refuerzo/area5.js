/* Refuerzo del área 5 · Ciencias naturales, experimentales y tecnología

   Repone lo que la poda dejó descubierto:

   · 5.2.3 evalúa energía térmica, eólica, nuclear y radiante; el paquete
     preguntaba por energía química, potencial y renovable, ninguna de las cuatro.
   · 5.3.4 evalúa el ciclo del carbono y el del AZUFRE; el paquete enseñaba
     nitrógeno y fósforo.
   · 5.4.2 evalúa descomposición, SÍNTESIS y REDUCCIÓN; el paquete se había ido
     a sustitución simple, neutralización y combustión.

   Suma reactivos de relación de elementos para las orientaciones que enumeran
   cuatro biomas, cuatro tipos de energía o cuatro niveles tróficos. */

const AREA5_REFUERZO = {
  // Guía: "Identificación de compuestos que conforman enlaces iónicos,
  // covalentes o metálicos."
  "5.1.1": {
    quiz: [
      {
        q: "Relacione cada tipo de enlace con la forma en que se unen los átomos.\n**Enlace:** 1. Iónico · 2. Covalente · 3. Metálico\n**Unión:** a) Los átomos comparten pares de electrones · b) Los cationes quedan inmersos en una nube de electrones libres · c) Un átomo cede electrones a otro y los iones de carga opuesta se atraen",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El iónico (1) transfiere electrones y une iones de carga opuesta (c). El covalente (2) comparte electrones (a). El metálico (3) es el mar de electrones deslocalizados alrededor de los cationes (b)."
      },
      {
        q: "Relacione cada compuesto con el tipo de enlace que presenta.\n**Compuesto:** 1. NaCl · 2. H₂O · 3. Cu\n**Enlace:** a) Metálico · b) Covalente · c) Iónico",
        options: ["1c, 2b, 3a", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "NaCl (1) une un metal y un no metal por transferencia de electrones: iónico (c). H₂O (2) une no metales que comparten electrones: covalente (b). El cobre (3) es un metal puro: enlace metálico (a)."
      }
    ]
  },

  // Guía: "Reconocimiento de las características de sustancias en estado
  // sólido, líquido o gaseoso."
  "5.1.2": {
    quiz: [
      {
        q: "Relacione cada estado de agregación con su característica.\n**Estado:** 1. Sólido · 2. Líquido · 3. Gaseoso\n**Característica:** a) Volumen definido, pero adopta la forma del recipiente · b) Partículas muy separadas, sin forma ni volumen propios · c) Forma y volumen definidos, partículas muy juntas y ordenadas",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El sólido (1) conserva forma y volumen (c). El líquido (2) conserva el volumen pero toma la forma del recipiente (a). El gas (3) no conserva ninguno de los dos (b)."
      }
    ]
  },

  // Guía: "Reconocimiento de las características de la energía térmica, eólica,
  // nuclear y radiante."   ← ninguna tenía cobertura propia después de la poda.
  "5.2.3": {
    quiz: [
      {
        q: "Relacione cada tipo de energía con su característica.\n**Energía:** 1. Térmica · 2. Eólica · 3. Radiante\n**Característica:** a) Se transporta en ondas electromagnéticas y llega del Sol sin necesidad de medio material · b) Procede de la agitación de las partículas de un cuerpo y se transfiere como calor · c) Proviene del movimiento del aire y se aprovecha con aerogeneradores",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La térmica (1) es la agitación de las partículas, que se transfiere como calor (b). La eólica (2) proviene del viento (c). La radiante (3) viaja como onda electromagnética y no requiere medio material (a)."
      },
      {
        q: "La energía que se libera al modificarse el núcleo de un átomo, ya sea al partirlo o al unir dos núcleos ligeros, es:",
        options: ["Nuclear", "Radiante", "Térmica"],
        correct: 0,
        explanation: "La energía nuclear proviene del núcleo atómico: se libera en la fisión, al partir un núcleo pesado, y en la fusión, al unir dos ligeros. La radiante viaja en ondas y la térmica es agitación de partículas."
      },
      {
        q: "Un panel solar fotovoltaico aprovecha principalmente energía:",
        options: ["Radiante", "Térmica", "Eólica"],
        correct: 0,
        explanation: "El panel fotovoltaico convierte en electricidad la radiación electromagnética que llega del Sol, es decir, energía radiante. Un calentador solar de agua, en cambio, aprovecha ese mismo Sol como energía térmica."
      },
      {
        q: "Relacione cada dispositivo con el tipo de energía que aprovecha.\n**Dispositivo:** 1. Aerogenerador · 2. Central nucleoeléctrica · 3. Calentador de agua solar\n**Energía:** a) Nuclear · b) Térmica del Sol · c) Eólica",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El aerogenerador (1) usa el viento: eólica (c). La nucleoeléctrica (2) usa la fisión del uranio: nuclear (a). El calentador solar (3) aprovecha el calor del Sol para elevar la temperatura del agua: térmica (b)."
      }
    ]
  },

  // Guía: "Reconocimiento de situaciones que ejemplifican las leyes de la termodinámica."
  "5.2.5": {
    quiz: [
      {
        q: "Relacione cada ley de la termodinámica con la situación que la ejemplifica.\n**Ley:** 1. Ley cero · 2. Primera ley · 3. Segunda ley\n**Situación:** a) Un motor transforma energía química en movimiento y calor, sin que la energía total se pierda · b) Un café caliente se enfría solo hasta igualar la temperatura del cuarto, y nunca al revés · c) Dos bloques de hielo en contacto no intercambian calor porque ya están a la misma temperatura",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "La ley cero (1) define el equilibrio térmico (c). La primera (2) es la conservación de la energía (a). La segunda (3) fija el sentido espontáneo del calor, de lo caliente a lo frío (b)."
      }
    ]
  },

  // Guía: "Reconocimiento de las características de la sabana, la tundra, el
  // bosque templado y la selva tropical."   ← cuatro biomas.
  "5.3.2": {
    quiz: [
      {
        q: "Relacione cada bioma con su característica.\n**Bioma:** 1. Tundra · 2. Sabana · 3. Selva tropical\n**Característica:** a) Pastizal con árboles dispersos y una marcada estación seca alternada con una lluviosa · b) Suelo permanentemente congelado, vegetación baja de musgos y líquenes, sin árboles · c) Lluvia abundante todo el año, temperatura alta y la mayor biodiversidad del planeta",
        options: ["1b, 2a, 3c", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La tundra (1) tiene permafrost y vegetación rasa (b). La sabana (2) es pastizal con árboles dispersos y dos estaciones marcadas (a). La selva tropical (3) es cálida, muy lluviosa y la más biodiversa (c)."
      },
      {
        q: "¿Qué caracteriza al bosque templado frente a los otros biomas?",
        options: [
          "Cuatro estaciones marcadas y árboles de hoja caduca que la pierden en otoño",
          "Suelo congelado todo el año y ausencia de árboles",
          "Lluvia abundante y constante los doce meses del año"
        ],
        correct: 0,
        explanation: "El bosque templado se define por la estacionalidad: cuatro estaciones bien diferenciadas y árboles caducifolios —encinos, arces, hayas— que pierden la hoja en otoño para resistir el invierno. El suelo congelado es de la tundra y la lluvia constante, de la selva."
      }
    ]
  },

  // Guía: "Identificación de los organismos autótrofos, productores, consumidores
  // primarios y consumidores secundarios en una red trófica."
  "5.3.3": {
    quiz: [
      {
        q: "En la cadena pasto → conejo → zorro → águila, relacione cada organismo con su nivel trófico.\n**Organismo:** 1. Pasto · 2. Conejo · 3. Zorro\n**Nivel:** a) Consumidor secundario · b) Productor o autótrofo · c) Consumidor primario",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El pasto (1) fabrica su propio alimento por fotosíntesis: productor o autótrofo (b). El conejo (2) come al productor: consumidor primario (c). El zorro (3) come al consumidor primario: consumidor secundario (a)."
      },
      {
        q: "Ordene los niveles de una red trófica desde la base hasta el nivel más alto.\n1. Consumidor secundario\n2. Productor autótrofo\n3. Consumidor primario",
        options: ["2, 3, 1", "1, 2, 3", "3, 2, 1"],
        correct: 0,
        explanation: "Toda red trófica arranca en los productores autótrofos (2), que capturan la energía del Sol. Le siguen los consumidores primarios, herbívoros (3), y después los secundarios, que se alimentan de aquellos (1)."
      }
    ]
  },

  // Guía: "Identificación de las sustancias que se presentan en el ciclo del
  // carbono y el ciclo del AZUFRE."   ← el azufre quedó sin cobertura.
  "5.3.4": {
    quiz: [
      {
        q: "¿Qué sustancia es la forma principal en que el azufre llega a la atmósfera por la actividad humana?",
        options: [
          "El dióxido de azufre (SO₂), procedente de la quema de combustibles fósiles",
          "El sulfato de calcio de las rocas sedimentarias",
          "El sulfuro de hidrógeno producido por las plantas"
        ],
        correct: 0,
        explanation: "La combustión de carbón y petróleo libera dióxido de azufre (SO₂). En la atmósfera se oxida y forma ácido sulfúrico, que precipita como lluvia ácida: ese es el eslabón del ciclo del azufre que el examen conecta con la contaminación."
      },
      {
        q: "Relacione cada sustancia con el ciclo biogeoquímico en el que participa.\n**Sustancia:** 1. Dióxido de carbono (CO₂) · 2. Dióxido de azufre (SO₂) · 3. Glucosa\n**Ciclo:** a) Del azufre · b) Del carbono, como producto de la fotosíntesis · c) Del carbono, como gas atmosférico",
        options: ["1c, 2a, 3b", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "El CO₂ (1) es la forma atmosférica del carbono (c). El SO₂ (2) es la forma atmosférica del azufre (a). La glucosa (3) es carbono ya fijado por la fotosíntesis en materia orgánica (b)."
      },
      {
        q: "En el ciclo del azufre, ¿qué proceso natural devuelve azufre a la atmósfera sin intervención humana?",
        options: [
          "Las erupciones volcánicas y la descomposición de materia orgánica en ambientes sin oxígeno",
          "La fotosíntesis de las plantas terrestres",
          "La condensación del vapor de agua"
        ],
        correct: 0,
        explanation: "El azufre vuelve a la atmósfera por vía volcánica y por la actividad de bacterias que, al descomponer materia orgánica sin oxígeno, liberan sulfuro de hidrógeno (H₂S). La fotosíntesis pertenece al ciclo del carbono."
      },
      {
        q: "¿Cuáles son los principales reservorios del carbono en el planeta?",
        options: [
          "La atmósfera como CO₂, los océanos como carbonatos disueltos, la biomasa de los seres vivos y los combustibles fósiles del subsuelo",
          "Solo la atmósfera y los seres vivos",
          "Únicamente las rocas sedimentarias"
        ],
        correct: 0,
        explanation: "El carbono circula entre cuatro grandes depósitos: atmósfera, hidrosfera, biosfera y litosfera —incluidos los combustibles fósiles, que son carbono retirado del ciclo durante millones de años y que la quema devuelve de golpe."
      }
    ]
  },

  // Guía: "Reconocimiento de las características de los servicios ambientales de
  // aprovisionamiento, de apoyo y culturales."   ← tres tipos.
  "5.3.6": {
    quiz: [
      {
        q: "Relacione cada beneficio del ecosistema con el tipo de servicio ambiental.\n**Beneficio:** 1. La madera, el agua potable y los peces que se obtienen del ecosistema · 2. La formación del suelo y el ciclo de nutrientes, que hacen posibles a los demás servicios · 3. El valor recreativo y espiritual de un área natural\n**Servicio:** a) De apoyo o soporte · b) Cultural · c) De aprovisionamiento",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Los bienes que se extraen (1) son de aprovisionamiento (c). Los procesos que sostienen a todos los demás (2) son de apoyo o soporte (a). El disfrute recreativo y espiritual (3) es cultural (b)."
      }
    ]
  },

  // Guía: "Reconocimiento de ecuaciones de reacciones químicas de descomposición,
  // SÍNTESIS y REDUCCIÓN."   ← síntesis y reducción quedaron sin reactivos.
  "5.4.2": {
    quiz: [
      {
        q: "Relacione cada ecuación con el tipo de reacción química que representa.\n**Ecuación:** 1. 2H₂O → 2H₂ + O₂ · 2. N₂ + 3H₂ → 2NH₃ · 3. CuO + H₂ → Cu + H₂O\n**Tipo:** a) Síntesis · b) Reducción · c) Descomposición",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "En la primera (1) un compuesto se rompe en sustancias más simples: descomposición (c). En la segunda (2) dos elementos se combinan para formar un compuesto: síntesis (a). En la tercera (3) el óxido de cobre pierde oxígeno y el cobre gana electrones: reducción (b)."
      },
      {
        q: "La reacción 2Mg + O₂ → 2MgO es de tipo:",
        options: ["Síntesis", "Descomposición", "Reducción"],
        correct: 0,
        explanation: "Dos sustancias simples —magnesio y oxígeno— se combinan para formar un solo compuesto. Ese es el patrón de la síntesis: A + B → AB. La descomposición es el camino inverso."
      },
      {
        q: "¿Qué le ocurre a una sustancia que se reduce en una reacción química?",
        options: [
          "Gana electrones y disminuye su número de oxidación",
          "Pierde electrones y aumenta su número de oxidación",
          "Se rompe en dos o más sustancias más simples"
        ],
        correct: 0,
        explanation: "Reducirse es ganar electrones, y al ganarlos el número de oxidación baja. La confusión clásica es pensar que «reducir» es hacerse más pequeño: lo que se reduce es la carga. Perder electrones es oxidarse."
      },
      {
        q: "En la reacción Fe₂O₃ + 3CO → 2Fe + 3CO₂, usada para obtener hierro, ¿qué sustancia se reduce?",
        options: [
          "El óxido de hierro (Fe₂O₃), porque el hierro pasa de estado oxidado a metal libre",
          "El monóxido de carbono (CO), porque se convierte en CO₂",
          "Ninguna: es una reacción de descomposición"
        ],
        correct: 0,
        explanation: "El hierro entra combinado con oxígeno y sale como metal puro: ganó electrones, así que se redujo. El monóxido de carbono hizo lo contrario, tomó oxígeno y se oxidó a CO₂: fue el agente reductor."
      },
      {
        q: "Relacione cada patrón con el tipo de reacción.\n**Patrón:** 1. AB → A + B · 2. A + B → AB · 3. Una especie gana electrones\n**Tipo:** a) Reducción · b) Descomposición · c) Síntesis",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "AB → A + B (1) es descomposición (b). A + B → AB (2) es síntesis (c). Ganar electrones (3) es reducción (a). Las dos primeras se identifican por la forma de la ecuación; la tercera, por el cambio en el número de oxidación."
      }
    ]
  },

  // Guía: "Identificación de los organelos de células animales y vegetales, así
  // como de células eucariotas y procariotas."
  "5.6.1": {
    quiz: [
      {
        q: "Relacione cada organelo con su función.\n**Organelo:** 1. Mitocondria · 2. Cloroplasto · 3. Ribosoma\n**Función:** a) Sintetiza las proteínas · b) Realiza la fotosíntesis y solo existe en la célula vegetal · c) Produce ATP mediante la respiración celular",
        options: ["1c, 2b, 3a", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "La mitocondria (1) produce ATP (c). El cloroplasto (2) hace la fotosíntesis y es exclusivo de la célula vegetal (b). El ribosoma (3) sintetiza proteínas y está tanto en procariotas como en eucariotas (a)."
      },
      {
        q: "Relacione cada estructura con el tipo de célula donde se encuentra.\n**Estructura:** 1. Pared celular de celulosa · 2. Núcleo delimitado por membrana · 3. Material genético libre en el citoplasma\n**Célula:** a) Procariota · b) Vegetal, no animal · c) Eucariota",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La pared de celulosa (1) distingue a la célula vegetal de la animal (b). El núcleo con membrana (2) define a la eucariota (c). El material genético suelto en el citoplasma (3) define a la procariota (a)."
      }
    ]
  },

  // Guía: "Reconocimiento de ejemplos de selección natural y del transformismo de Lamarck."
  "5.7.4": {
    quiz: [
      {
        q: "Relacione cada explicación del cuello largo de las jirafas con la teoría evolutiva a la que corresponde.\n**Explicación:** 1. Los ancestros estiraban el cuello para alcanzar hojas altas y transmitieron ese cuello alargado a su descendencia · 2. En la población ya existían jirafas de cuello más largo; comieron mejor, sobrevivieron más y dejaron más crías\n**Teoría:** a) Selección natural de Darwin · b) Transformismo de Lamarck",
        options: ["1b, 2a", "1a, 2b", "1b, 2b"],
        correct: 0,
        explanation: "La herencia de los caracteres adquiridos durante la vida del individuo (1) es el transformismo de Lamarck (b). La variación previa sobre la que actúa la presión del ambiente (2) es la selección natural de Darwin (a)."
      },
      {
        q: "¿Cuál es el error central del transformismo de Lamarck a la luz de la genética?",
        options: [
          "Suponer que los caracteres adquiridos durante la vida se heredan a la descendencia",
          "Suponer que las especies cambian con el tiempo",
          "Suponer que el ambiente influye en la supervivencia"
        ],
        correct: 0,
        explanation: "Lamarck acertó en que las especies cambian y en que el ambiente importa. Su error fue el mecanismo: un rasgo desarrollado por el uso durante la vida de un individuo no modifica sus células reproductoras, así que no pasa a sus hijos."
      }
    ]
  }
};
