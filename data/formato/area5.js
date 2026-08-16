/* Reactivos con FIGURA y de cobertura para el área 5.

   Huecos que cerraba este paquete, según la orientación de la guía:

   · 5.7.3 «Identificación del CUADRO DE PUNNETT correspondiente a la
     descendencia de dos progenitores». Se practicaba sin mostrar nunca un
     cuadro, que es exactamente lo que el examen pide leer.
   · 5.7.5 nombra la «convergencia molecular», y el banco solo enseñaba
     convergencia morfológica (alas, tiburón y delfín), que no es lo mismo.
   · 5.6.3 pide «identificar las SUSTANCIAS que participan en el ciclo de Krebs
     y la glucólisis», y casi no había práctica de sustancias concretas.
   · 5.3.4 pide lo mismo para los ciclos del carbono y del azufre.
   · 5.3.6 confundía los servicios de apoyo con los de regulación.

   Solo llevan `quiz`: replantean lo que la nota base del tema ya explica. */

const AREA5_FORMATO = {
  "5.7.3": {
    quiz: [
      {
        q: "¿Qué cruce representa este cuadro de Punnett y qué proporción de fenotipos produce, si A domina sobre a?",
        figura: { tipo: "punnett", filas: ["A", "A"], cols: ["a", "a"] },
        options: [
          "AA × aa: el 100 % de la descendencia es Aa y muestra el fenotipo dominante",
          "Aa × Aa: 3 dominantes por 1 recesivo",
          "Aa × aa: la mitad dominante y la mitad recesiva"
        ],
        correct: 0,
        explanation: "Los encabezados son A, A de un lado y a, a del otro: un progenitor homocigoto dominante cruzado con uno homocigoto recesivo. Las cuatro celdas dan Aa, así que toda la descendencia es heterocigota y presenta el fenotipo dominante."
      },
      {
        q: "Observa el cuadro. ¿Qué probabilidad hay de obtener un individuo con el fenotipo recesivo?",
        figura: { tipo: "punnett", filas: ["A", "a"], cols: ["a", "a"] },
        options: ["50 %", "25 %", "0 %"],
        correct: 0,
        explanation: "Es una retrocruza Aa × aa. Las celdas son Aa, Aa, aa, aa: dos de cuatro son homocigotas recesivas, es decir el 50 %. El fenotipo recesivo solo aparece cuando el individuo recibe los dos alelos minúsculos."
      },
      {
        q: "Observa el cuadro. ¿Qué proporción de GENOTIPOS produce este cruce?",
        figura: { tipo: "punnett", filas: ["A", "a"], cols: ["A", "a"] },
        options: ["1 AA : 2 Aa : 1 aa", "1 AA : 1 aa", "4 Aa"],
        correct: 0,
        explanation: "Aa × Aa: las celdas dan AA, Aa, Aa y aa. Esa es la proporción genotípica clásica 1 : 2 : 1. Cuidado con confundirla con la fenotípica, que en este mismo cruce es 3 : 1 si A domina."
      },
      {
        q: "Dos progenitores heterocigotos (Bb) para un carácter en el que B domina. ¿Cuál de estos cuadros corresponde a su descendencia?",
        figura: { tipo: "punnett", filas: ["B", "b"], cols: ["B", "b"], caption: "Cuadro A" },
        options: [
          "Este: los encabezados son B y b en ambos lados",
          "Uno con B, B arriba y b, b a la izquierda",
          "Uno con B, b arriba y B, B a la izquierda"
        ],
        correct: 0,
        explanation: "Para identificar el cuadro correcto lo primero es revisar los encabezados: deben ser los alelos de cada progenitor. Si los dos son Bb, arriba van B y b, y a la izquierda también B y b. Las otras opciones representarían cruces distintos (BB × bb y Bb × BB)."
      }
    ]
  },

  "5.7.5": {
    quiz: [
      {
        q: "Los murciélagos y los delfines desarrollaron la ecolocalización por separado, y en ambos linajes apareció el mismo conjunto de cambios en la proteína prestina del oído interno. ¿Qué fenómeno evolutivo ejemplifica esto?",
        options: ["Convergencia molecular", "Evolución divergente", "Adaptación morfológica"],
        correct: 0,
        explanation: "Dos linajes muy alejados llegaron por separado a la **misma solución bioquímica**, con cambios idénticos en la misma proteína. Eso es convergencia molecular. Si el parecido fuera solo de forma externa —las alas del ave y del insecto— sería convergencia morfológica."
      },
      {
        q: "Relacione cada ejemplo con el fenómeno evolutivo que ilustra.\n**Ejemplo:** 1. Peces del Ártico y de la Antártida producen proteínas anticongelantes muy parecidas, evolucionadas de forma independiente · 2. Los pinzones de Darwin, de un ancestro común, desarrollan picos distintos según su alimento · 3. El oso polar tiene pelaje denso y una gruesa capa de grasa que lo aíslan del frío\n**Fenómeno:** a) Adaptación morfológica · b) Convergencia molecular · c) Evolución divergente",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Las proteínas anticongelantes iguales en linajes separados (1) son convergencia molecular (b). Los picos distintos a partir de un ancestro común (2) son evolución divergente (c). El pelaje y la grasa del oso polar (3) son una adaptación morfológica: un cambio de forma o estructura que mejora la supervivencia (a)."
      },
      {
        q: "El tiburón (pez) y el delfín (mamífero) tienen un cuerpo fusiforme y aletas muy parecidas, pese a no estar emparentados de cerca. ¿Cómo se llama con precisión este caso?",
        options: [
          "Convergencia morfológica: el parecido es de forma, no de genes",
          "Convergencia molecular, porque comparten los mismos genes",
          "Evolución divergente a partir de un ancestro común reciente"
        ],
        correct: 0,
        explanation: "Nadar rápido en agua impone la misma forma hidrodinámica a cualquier animal, y por eso el parecido externo. Se llama convergencia **morfológica**. La molecular es otra cosa: exige que la coincidencia esté en los genes o las proteínas, como en la prestina de murciélagos y delfines."
      }
    ]
  },

  "5.6.3": {
    quiz: [
      {
        q: "Relacione cada etapa de la respiración celular con las sustancias que la caracterizan.\n**Etapa:** 1. Glucólisis · 2. Ciclo de Krebs · 3. Cadena transportadora de electrones\n**Sustancias:** a) Acetil-CoA, oxalacetato y citrato; libera CO₂ · b) Glucosa que se rompe en dos piruvatos · c) NADH y FADH₂ ceden electrones; el oxígeno es el aceptor final y se forma agua",
        options: ["1b, 2a, 3c", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La glucólisis (1) parte la glucosa en dos piruvatos, en el citoplasma y sin oxígeno (b). El ciclo de Krebs (2) recibe el acetil-CoA, que se une al oxalacetato y forma citrato, y libera CO₂ (a). La cadena (3) usa el NADH y el FADH₂, con el oxígeno como aceptor final, y produce agua (c)."
      },
      {
        q: "¿Qué sustancia entra al ciclo de Krebs y se une al oxalacetato para formar citrato?",
        options: ["Acetil-CoA", "Glucosa", "Ácido láctico"],
        correct: 0,
        explanation: "El piruvato que sale de la glucólisis pierde un CO₂ y se convierte en acetil-CoA, que es la molécula de dos carbonos que entra propiamente al ciclo. La glucosa nunca entra al ciclo de Krebs: se queda en la glucólisis."
      },
      {
        q: "Ordene las etapas de la degradación de una molécula de glucosa.\n1. Ciclo de Krebs\n2. Glucólisis\n3. Cadena transportadora de electrones\n4. Conversión del piruvato en acetil-CoA",
        options: ["2, 4, 1, 3", "2, 1, 4, 3", "4, 2, 1, 3"],
        correct: 0,
        explanation: "Primero la glucólisis parte la glucosa en el citoplasma (2). El piruvato entra a la mitocondria y se convierte en acetil-CoA (4). Ese acetil-CoA alimenta el ciclo de Krebs (1), y los transportadores que este produce alimentan la cadena de electrones (3), donde se genera la mayor parte del ATP."
      },
      {
        q: "¿Cuál de estas sustancias NO se produce en el ciclo de Krebs?",
        options: ["Piruvato", "CO₂", "NADH"],
        correct: 0,
        explanation: "El piruvato es el **producto de la glucólisis**, no del ciclo de Krebs: de hecho se consume antes de entrar, al convertirse en acetil-CoA. El ciclo sí produce CO₂, NADH, FADH₂ y una molécula de ATP (o GTP) por vuelta."
      }
    ]
  },

  "5.3.4": {
    quiz: [
      {
        q: "Relacione cada sustancia con el ciclo biogeoquímico en el que participa de forma característica.\n**Sustancia:** 1. H₂S (sulfuro de hidrógeno) · 2. CH₄ (metano) · 3. SO₄²⁻ (sulfato) · 4. CaCO₃ (carbonato de calcio)\n**Ciclo:** a) Del carbono · b) Del azufre",
        options: ["1b, 2a, 3b, 4a", "1a, 2b, 3a, 4b", "1b, 2b, 3a, 4a"],
        correct: 0,
        explanation: "El H₂S (1) y el sulfato (3) son formas del azufre (b): el primero lo liberan volcanes y la descomposición anaerobia; el segundo es la única forma que las plantas absorben. El metano (2) y el carbonato de calcio de conchas y rocas calizas (4) son formas del carbono (a)."
      },
      {
        q: "En el ciclo del azufre, el SO₂ liberado por los volcanes y por la quema de combustibles fósiles se oxida en la atmósfera y reacciona con el agua. ¿Qué sustancia forma y qué fenómeno provoca?",
        options: ["Ácido sulfúrico (H₂SO₄), que cae como lluvia ácida", "Metano (CH₄), que provoca efecto invernadero", "Ozono (O₃), que forma la capa protectora"],
        correct: 0,
        explanation: "El dióxido de azufre se convierte en ácido sulfúrico al oxidarse y combinarse con el vapor de agua. Ese ácido regresa al suelo y al agua con la precipitación: es la lluvia ácida, que acidifica lagos y daña bosques y edificios."
      },
      {
        q: "¿En qué forma química toman las plantas el azufre del suelo?",
        options: ["Como sulfato (SO₄²⁻) disuelto", "Como azufre elemental (S)", "Como sulfuro de hidrógeno (H₂S) gaseoso"],
        correct: 0,
        explanation: "Las plantas solo pueden absorber el azufre en su forma oxidada y soluble, el sulfato. Con él construyen los aminoácidos cisteína y metionina, y así el azufre entra en las proteínas y pasa a los animales que las consumen."
      },
      {
        q: "Ordene el recorrido del carbono en su ciclo, empezando por la atmósfera.\n1. La respiración y la descomposición devuelven CO₂ a la atmósfera\n2. El CO₂ atmosférico entra a la planta por la fotosíntesis\n3. Los animales consumen la planta e incorporan ese carbono\n4. El carbono queda fijado como glucosa y materia orgánica",
        options: ["2, 4, 3, 1", "2, 3, 4, 1", "4, 2, 3, 1"],
        correct: 0,
        explanation: "La planta capta el CO₂ (2), lo fija como glucosa y materia orgánica (4), los animales lo incorporan al comerla (3), y la respiración y la descomposición lo devuelven a la atmósfera como CO₂ (1). La quema de combustibles fósiles añade un atajo que libera carbono guardado durante millones de años."
      }
    ]
  },

  "5.3.6": {
    quiz: [
      {
        q: "Relacione cada servicio ambiental con su categoría.\n**Servicio:** 1. Madera, agua potable y plantas medicinales · 2. Formación del suelo y ciclo de los nutrientes · 3. Polinización y control de inundaciones · 4. Un bosque sagrado y el senderismo en un parque\n**Categoría:** a) De regulación · b) Cultural · c) De aprovisionamiento · d) De apoyo o soporte",
        options: ["1c, 2d, 3a, 4b", "1c, 2a, 3d, 4b", "1d, 2c, 3b, 4a"],
        correct: 0,
        explanation: "Los bienes que se extraen (1) son de aprovisionamiento (c). Los procesos de base que hacen posible todo lo demás (2) son de apoyo o soporte (d). Los que controlan o amortiguan una condición del ambiente (3) son de regulación (a). Los beneficios no materiales (4) son culturales (b). Apoyo y regulación no son sinónimos: el apoyo construye la base, la regulación controla una condición."
      },
      {
        q: "La captura de carbono que realiza un bosque, que amortigua el cambio climático, es un servicio ambiental:",
        options: ["De regulación", "De apoyo", "De aprovisionamiento"],
        correct: 0,
        explanation: "Regula una condición del ambiente —la concentración de CO₂ en la atmósfera— igual que la polinización, la purificación del agua o el control de inundaciones. Si el bosque se talara para vender la madera, eso sí sería aprovisionamiento."
      },
      {
        q: "¿Cuál de estos es un servicio ambiental de APOYO o soporte?",
        options: ["La producción primaria: la fotosíntesis que sostiene toda la red trófica", "La pesca comercial en una laguna costera", "El valor espiritual de una montaña para una comunidad"],
        correct: 0,
        explanation: "Los servicios de apoyo son los procesos de base que no se aprovechan directamente pero hacen posibles a todos los demás: producción primaria, formación del suelo, ciclo de nutrientes y ciclo del agua. La pesca es aprovisionamiento y el valor espiritual, cultural."
      }
    ]
  }
};
