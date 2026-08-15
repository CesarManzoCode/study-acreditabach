/* Refuerzo del área 2 · Cultura digital

   Es el área que quedó más golpeada por la poda, y con razón: sus
   orientaciones son de las más literales de toda la guía y el paquete de
   ampliación las ignoró casi por completo.

   Lo que se repone aquí es exactamente lo que la guía nombra y no tenía ni un
   reactivo: las nueve herramientas de 2.2.3, los iconos de 2.3.2 y 2.3.3, la
   ciberetnografía de 2.2.4, las redes sociales de 2.1.3 y las tres
   características del pensamiento algorítmico de 2.4.3.

   Solo llevan `quiz`: todo lo que preguntan está en la nota base del tema. */

const AREA2_REFUERZO = {
  // Guía: "Reconocimiento de la funcionalidad de servicios digitales de
  // almacenamiento en la nube, de comercio electrónico, educativos y redes sociales."
  "2.1.3": {
    quiz: [
      {
        q: "Relacione cada situación con el tipo de servicio digital que resuelve.\n**Situación:** 1. Guardar los trabajos escolares para abrirlos desde cualquier equipo · 2. Comprar unos tenis y pagarlos con tarjeta desde el celular · 3. Publicar una foto y comentar las de otras personas\n**Servicio:** a) Redes sociales · b) Almacenamiento en la nube · c) Comercio electrónico",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Guardar archivos accesibles desde cualquier equipo (1) es almacenamiento en la nube (b). Comprar y pagar en línea (2) es comercio electrónico (c). Publicar y comentar contenido (3) es una red social (a)."
      },
      {
        q: "Una persona crea un perfil, sigue a otras cuentas, publica contenido y comenta lo que publican los demás. ¿Qué tipo de servicio digital está usando?",
        options: ["Una red social", "Un servicio educativo", "Un servicio de almacenamiento en la nube"],
        correct: 0,
        explanation: "La red social se define por el perfil personal y la interacción con otros usuarios: seguir, publicar, comentar y compartir. Almacenar archivos o tomar un curso son funciones de otros servicios."
      },
      {
        q: "Relacione cada plataforma con el tipo de servicio digital al que pertenece.\n**Plataforma:** 1. Una tienda en línea con carrito de compras · 2. Un aula virtual con tareas y calificaciones · 3. Un disco virtual que sincroniza carpetas\n**Tipo:** a) Educativo · b) Almacenamiento en la nube · c) Comercio electrónico",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El carrito de compras (1) identifica al comercio electrónico (c). Las tareas y calificaciones (2) al servicio educativo (a). La sincronización de carpetas (3) al almacenamiento en la nube (b)."
      }
    ]
  },

  // Guía: "Identificación de ejemplos de phishing, grooming, malware y ransomware."
  "2.1.4": {
    quiz: [
      {
        q: "Relacione cada situación con la amenaza de seguridad digital que representa.\n**Situación:** 1. Un correo que finge ser del banco y pide la contraseña en un enlace · 2. Un programa cifra los archivos de la empresa y exige un pago para liberarlos · 3. Un adulto se hace pasar por menor para ganarse la confianza de un niño con fines sexuales\n**Amenaza:** a) Grooming · b) Phishing · c) Ransomware",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El correo que suplanta al banco (1) es phishing (b). El cifrado con rescate (2) es ransomware (c). El engaño de un adulto a un menor con fines sexuales (3) es grooming (a)."
      },
      {
        q: "Relacione cada amenaza con su rasgo definitorio.\n**Amenaza:** 1. Malware · 2. Phishing · 3. Ransomware\n**Rasgo:** a) Secuestra la información y pide rescate · b) Cualquier programa creado para dañar o infiltrarse en un sistema · c) Suplanta a una entidad de confianza para que la víctima entregue sus datos",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Malware (1) es el término general de todo programa malicioso (b). Phishing (2) es el engaño por suplantación de identidad (c). Ransomware (3) es el secuestro de archivos con exigencia de pago (a); es un tipo de malware, pero se distingue por el rescate."
      }
    ]
  },

  // Guía: "Reconocimiento de la definición de las tecnologías de la información,
  // la comunicación, el conocimiento y el aprendizaje digitales."
  "2.2.2": {
    quiz: [
      {
        q: "Relacione cada dimensión de las TICCAD con lo que aporta.\n**Dimensión:** 1. Información · 2. Comunicación · 3. Conocimiento y aprendizaje\n**Aporta:** a) El intercambio entre personas a distancia y en tiempo real · b) El acceso, almacenamiento y procesamiento de datos · c) La construcción de saberes y el aprendizaje mediante medios digitales",
        options: ["1b, 2a, 3c", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La información (1) es el acceso y procesamiento de datos (b). La comunicación (2) es el intercambio entre personas (a). El conocimiento y el aprendizaje (3) son lo que la sigla agrega respecto de las TIC: construir saberes con medios digitales (c)."
      }
    ]
  },

  // Guía: "Relación de herramientas digitales de uso colaborativo o de aprendizaje
  // con las funciones que les corresponden. Reconocimiento de situaciones que
  // requieren el uso de las herramientas Prezi, Genially, Drive, Zoom, Meet,
  // Docs, Kahoot, Sites y Canva."   ← nueve herramientas nombradas por su nombre.
  "2.2.3": {
    quiz: [
      {
        q: "Relacione cada herramienta con su función principal.\n**Herramienta:** 1. Prezi · 2. Drive · 3. Zoom\n**Función:** a) Almacenar y compartir archivos en la nube · b) Realizar videoconferencias y reuniones a distancia · c) Crear presentaciones con desplazamiento y zoom sobre un lienzo",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "Prezi (1) presenta sobre un lienzo con zoom, en vez de diapositivas sueltas (c). Drive (2) almacena y comparte archivos en la nube (a). Zoom (3) es para videoconferencias (b)."
      },
      {
        q: "Relacione cada herramienta con lo que permite hacer.\n**Herramienta:** 1. Genially · 2. Sites · 3. Docs\n**Permite:** a) Redactar un documento entre varias personas al mismo tiempo · b) Construir un sitio web sencillo sin programar · c) Crear contenidos interactivos y animados, como infografías y presentaciones",
        options: ["1c, 2b, 3a", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "Genially (1) crea contenidos interactivos y animados (c). Sites (2) permite armar un sitio web sin programar (b). Docs (3) es el procesador de texto colaborativo en línea (a)."
      },
      {
        q: "Una maestra quiere evaluar al grupo con un cuestionario de opción múltiple, proyectado en el salón, en el que los alumnos responden desde su celular y ven el marcador en tiempo real. ¿Qué herramienta corresponde?",
        options: ["Kahoot", "Canva", "Drive"],
        correct: 0,
        explanation: "Kahoot es la herramienta de cuestionarios y juegos de evaluación en tiempo real, con marcador en vivo. Canva es de diseño gráfico y Drive de almacenamiento."
      },
      {
        q: "Un equipo debe reunirse a distancia para acordar el reparto del trabajo y compartir pantalla. ¿Qué par de herramientas resuelve esa necesidad?",
        options: ["Zoom o Meet", "Canva o Genially", "Docs o Sites"],
        correct: 0,
        explanation: "Zoom y Meet son las herramientas de videoconferencia: reunión en tiempo real con audio, video y pantalla compartida. Canva y Genially son de diseño, y Docs y Sites de producción de documentos y sitios."
      },
      {
        q: "Relacione cada necesidad con la herramienta adecuada.\n**Necesidad:** 1. Diseñar un cartel con plantillas para la feria de ciencias · 2. Guardar y compartir el archivo del cartel con el equipo · 3. Presentar los resultados con una infografía interactiva\n**Herramienta:** a) Genially · b) Canva · c) Drive",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Canva (1) es diseño gráfico con plantillas (b). Drive (2) almacena y comparte (c). Genially (3) hace contenidos interactivos como infografías animadas (a)."
      }
    ]
  },

  // Guía: "Reconocimiento de ejemplos de ciberetnografía, análisis de contenido
  // en línea, grupo de enfoque online y análisis de redes sociales."
  "2.2.4": {
    quiz: [
      {
        q: "Una investigadora se integra durante seis meses a un foro de videojuegos, participa en sus conversaciones y registra sus normas, rituales y jerga para describir cómo funciona esa comunidad. ¿Qué método de investigación digital emplea?",
        options: ["Ciberetnografía", "Análisis de contenido en línea", "Análisis de redes sociales"],
        correct: 0,
        explanation: "La ciberetnografía traslada la etnografía al entorno digital: el investigador se sumerge en una comunidad en línea, convive con ella y describe su cultura desde dentro. No cuenta ni clasifica mensajes, como el análisis de contenido, ni mapea vínculos, como el análisis de redes."
      },
      {
        q: "Relacione cada método de investigación digital con lo que hace.\n**Método:** 1. Ciberetnografía · 2. Análisis de contenido en línea · 3. Grupo de enfoque en línea\n**Hace:** a) Reúne por videollamada a un grupo pequeño para discutir un tema guiado por un moderador · b) Convive con una comunidad virtual para describir su cultura desde dentro · c) Clasifica y cuantifica sistemáticamente los mensajes publicados",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La ciberetnografía (1) es inmersión en la comunidad (b). El análisis de contenido (2) clasifica y cuenta mensajes (c). El grupo de enfoque en línea (3) es la discusión guiada por videollamada con pocos participantes (a)."
      },
      {
        q: "Un estudio construye un mapa de qué cuentas mencionan a cuáles en una conversación de internet y detecta quiénes son los nodos más influyentes. ¿Qué método aplica?",
        options: ["Análisis de redes sociales", "Ciberetnografía", "Grupo de enfoque en línea"],
        correct: 0,
        explanation: "El análisis de redes sociales estudia la estructura de los vínculos: quién se conecta con quién, qué nodos concentran más conexiones y cómo circula la información. No estudia el contenido de los mensajes ni la cultura del grupo."
      }
    ]
  },

  // Guía: "Identificación de los ICONOS para insertar tablas, ajustar márgenes y
  // dividir texto en software de procesamiento de texto."
  "2.3.2": {
    quiz: [
      {
        q: "Relacione cada acción en un procesador de texto con la pestaña o el grupo donde se encuentra su icono.\n**Acción:** 1. Insertar una tabla · 2. Ajustar los márgenes de la hoja · 3. Dividir el texto en columnas\n**Se encuentra en:** a) Diseño o Formato de página · b) Insertar · c) Diseño de página, grupo Configurar página",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "La tabla (1) se agrega desde la pestaña Insertar (b), donde están todos los elementos que se añaden al documento. Los márgenes (2) se ajustan en Configurar página (c). Las columnas (3) están en el diseño o formato de página (a)."
      },
      {
        q: "En un procesador de texto, el icono con una cuadrícula de celdas vacías sirve para:",
        options: ["Insertar una tabla", "Ajustar los márgenes", "Dividir el texto en columnas"],
        correct: 0,
        explanation: "La cuadrícula de celdas es el icono universal de tabla: al desplegarlo se elige cuántas filas y columnas tendrá. El icono de márgenes muestra una hoja con líneas en sus bordes, y el de columnas, una hoja con el texto partido en franjas verticales."
      },
      {
        q: "Un documento debe entregarse con 3 cm de margen izquierdo. ¿Qué icono se usa?",
        options: [
          "El de Márgenes, en la configuración de página",
          "El de Sangría, en el grupo de párrafo",
          "El de Interlineado, en el grupo de párrafo"
        ],
        correct: 0,
        explanation: "El margen es el espacio en blanco entre el borde de la hoja y el área de texto, y se define para todo el documento desde Configurar página. La sangría solo desplaza un párrafo dentro de esos márgenes, y el interlineado es el espacio entre renglones."
      },
      {
        q: "¿Qué icono permite que el texto continúe en una hoja nueva desde un punto exacto?",
        options: ["El de salto de página", "El de tabla", "El de márgenes"],
        correct: 0,
        explanation: "El salto de página divide el texto: todo lo que sigue al punto de inserción pasa a la hoja siguiente y se mantiene ahí aunque el texto anterior se edite. Bajar con la tecla Enter hasta la otra hoja parece igual, pero se desacomoda en cuanto cambia algo antes."
      }
    ]
  },

  // Guía: "Identificación de los ICONOS para insertar gráficos, tablas,
  // cuestionarios o imágenes de WordArt en software de presentaciones electrónicas."
  "2.3.3": {
    quiz: [
      {
        q: "Relacione cada elemento que se inserta en una diapositiva con el icono que lo representa.\n**Elemento:** 1. Gráfico · 2. Tabla · 3. WordArt\n**Icono:** a) Una cuadrícula de celdas · b) Una letra «A» estilizada con relleno y contorno decorativos · c) Barras o columnas de colores de distinta altura",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El gráfico (1) se representa con barras de distinta altura (c). La tabla (2) con una cuadrícula de celdas (a). WordArt (3) con la letra «A» decorada, porque convierte texto en una imagen con estilo (b)."
      },
      {
        q: "En un software de presentaciones, ¿para qué sirve el icono de WordArt?",
        options: [
          "Para convertir un texto en una imagen con efectos de relleno, contorno y sombra",
          "Para insertar una tabla de datos",
          "Para agregar una transición entre diapositivas"
        ],
        correct: 0,
        explanation: "WordArt toma un texto y lo trata como objeto gráfico: se le aplican rellenos, contornos, sombras y deformaciones que el texto normal no admite. Se usa para títulos llamativos."
      },
      {
        q: "Se quiere insertar en una diapositiva un cuestionario que el público responda desde su dispositivo durante la exposición. ¿Qué opción corresponde?",
        options: [
          "El complemento o icono de cuestionario interactivo de la aplicación",
          "El icono de gráfico",
          "El icono de WordArt"
        ],
        correct: 0,
        explanation: "El cuestionario se agrega con la herramienta o complemento de encuesta interactiva, que genera preguntas respondibles en vivo. El gráfico muestra datos ya existentes y WordArt solo da estilo a un texto."
      },
      {
        q: "Para mostrar en una diapositiva cómo se reparte el 100 % de un presupuesto entre cuatro rubros, ¿qué elemento conviene insertar?",
        options: ["Un gráfico circular o de pastel", "Una imagen de WordArt", "Un cuestionario"],
        correct: 0,
        explanation: "El gráfico circular representa las partes de un todo, que es exactamente el reparto de un presupuesto. WordArt solo estiliza texto y el cuestionario recoge respuestas, no muestra datos."
      }
    ]
  },

  // Guía: "Reconocimiento de ejemplos correspondientes a las fases del método
  // ADDIE (analizar, diseñar, desarrollar, implementar y evaluar)."
  "2.3.4": {
    quiz: [
      {
        q: "Ordene las fases del método ADDIE tal como se aplican en la creación de un contenido digital.\n1. Desarrollar\n2. Analizar\n3. Evaluar\n4. Diseñar\n5. Implementar",
        options: ["2, 4, 1, 5, 3", "2, 1, 4, 5, 3", "4, 2, 1, 3, 5"],
        correct: 0,
        explanation: "ADDIE toma su nombre del orden de sus fases: Analizar (2), Diseñar (4), Desarrollar (1), Implementar (5) y Evaluar (3). Primero se estudia a quién va dirigido, luego se planea, después se produce, se pone en marcha y por último se valora."
      },
      {
        q: "Relacione cada actividad con la fase del método ADDIE a la que pertenece.\n**Actividad:** 1. Aplicar una encuesta para saber qué necesita el público · 2. Grabar los videos y programar los ejercicios · 3. Aplicar el curso con los estudiantes reales\n**Fase:** a) Implementar · b) Analizar · c) Desarrollar",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Averiguar qué necesita el público (1) es la fase de análisis (b). Producir los materiales (2) es desarrollo (c). Poner el curso en marcha con estudiantes reales (3) es implementación (a)."
      }
    ]
  },

  // Guía: "Relación de conceptos de dato, variable, constante, expresión, operador
  // lógico, operador relacional, operador aritmético, estructura repetitiva y
  // estructura selectiva con sus definiciones correspondientes."
  "2.4.1": {
    quiz: [
      {
        q: "Relacione cada concepto del lenguaje algorítmico con su definición.\n**Concepto:** 1. Constante · 2. Variable · 3. Dato\n**Definición:** a) Valor que el algoritmo recibe o produce y sobre el que trabaja · b) Espacio de memoria cuyo valor puede cambiar durante la ejecución · c) Valor que se fija al inicio y no cambia durante la ejecución",
        options: ["1c, 2b, 3a", "1a, 2c, 3b", "1b, 2a, 3c"],
        correct: 0,
        explanation: "La constante (1) no cambia en toda la ejecución (c). La variable (2) sí puede cambiar (b). El dato (3) es el valor con el que trabaja el algoritmo (a)."
      },
      {
        q: "Relacione cada tipo de operador con su función.\n**Operador:** 1. Aritmético · 2. Relacional · 3. Lógico\n**Función:** a) Compara dos valores y devuelve verdadero o falso · b) Combina condiciones con Y, O y NO · c) Realiza operaciones de suma, resta, multiplicación y división",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El aritmético (1) opera con números (c). El relacional (2) compara y devuelve un booleano (a). El lógico (3) une condiciones con Y, O y NO (b)."
      },
      {
        q: "Relacione cada estructura con la instrucción que la ejemplifica.\n**Estructura:** 1. Selectiva · 2. Repetitiva\n**Instrucción:** a) «Mientras el saldo sea mayor que cero, seguir descontando» · b) «Si la calificación es mayor o igual a 6, mostrar Aprobado; si no, mostrar Reprobado»",
        options: ["1b, 2a", "1a, 2b", "1b, 2b"],
        correct: 0,
        explanation: "La estructura selectiva (1) elige entre alternativas según una condición (b). La repetitiva (2) ejecuta algo una y otra vez mientras se cumpla la condición (a)."
      }
    ]
  },

  // Guía: "Organización de los pasos de un algoritmo para la resolución de un problema."
  "2.4.2": {
    quiz: [
      {
        q: "Ordene los pasos del algoritmo que calcula el área de un triángulo.\n1. Mostrar el área\n2. Multiplicar la base por la altura y dividir entre 2, y guardar el resultado en «área»\n3. Leer la base y la altura",
        options: ["3, 2, 1", "1, 3, 2", "2, 3, 1"],
        correct: 0,
        explanation: "Todo algoritmo sigue el orden entrada → proceso → salida. Primero se leen los datos (3), luego se calcula (2) y al final se muestra el resultado (1). Calcular antes de leer daría un resultado con datos vacíos."
      },
      {
        q: "Ordene los pasos del algoritmo que determina si una persona puede votar.\n1. Mostrar «Puede votar» o «No puede votar» según corresponda\n2. Comparar si la edad es mayor o igual a 18\n3. Leer la edad de la persona",
        options: ["3, 2, 1", "2, 3, 1", "3, 1, 2"],
        correct: 0,
        explanation: "Se lee el dato (3), se evalúa la condición (2) y se informa el resultado (1). La comparación no puede hacerse antes de tener la edad."
      }
    ]
  },

  // Guía: "Reconocimiento de las características del pensamiento algorítmico:
  // definido, preciso y finito."
  "2.4.3": {
    quiz: [
      {
        q: "Relacione cada característica del pensamiento algorítmico con lo que exige.\n**Característica:** 1. Definido · 2. Preciso · 3. Finito\n**Exige:** a) Que termine después de un número limitado de pasos · b) Que con los mismos datos de entrada produzca siempre el mismo resultado · c) Que cada paso esté redactado sin ambigüedad y se pueda ejecutar de una sola forma",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "Definido (1) es que sea determinista: mismos datos, mismo resultado (b). Preciso (2) es que cada instrucción sea inequívoca (c). Finito (3) es que termine (a)."
      },
      {
        q: "Una receta indica «agregar sal al gusto». ¿Qué característica del pensamiento algorítmico incumple?",
        options: [
          "La precisión, porque «al gusto» admite muchas interpretaciones",
          "La finitud, porque no dice cuántas veces repetirlo",
          "Ninguna: es una instrucción válida"
        ],
        correct: 0,
        explanation: "Un algoritmo preciso no deja margen de interpretación: cada paso debe ejecutarse de una sola manera. «Al gusto» produce resultados distintos según quién lo lea, así que falla la precisión."
      },
      {
        q: "Un algoritmo entra en un ciclo cuya condición de salida nunca se cumple. ¿Qué característica incumple?",
        options: ["La finitud", "La precisión", "Ser definido"],
        correct: 0,
        explanation: "Un algoritmo debe terminar después de un número limitado de pasos y entregar un resultado. Si el ciclo nunca termina, incumple la finitud."
      }
    ]
  },

  // Guía: "Reconocimiento del significado de los símbolos de un diagrama de flujo."
  "2.4.4": {
    quiz: [
      {
        q: "Relacione cada símbolo de un diagrama de flujo con su significado.\n**Símbolo:** 1. Rombo · 2. Rectángulo · 3. Romboide o paralelogramo\n**Significa:** a) Proceso u operación · b) Entrada o salida de datos · c) Decisión, con dos salidas posibles",
        options: ["1c, 2a, 3b", "1a, 2b, 3c", "1b, 2c, 3a"],
        correct: 0,
        explanation: "El rombo (1) plantea una decisión con salida por sí y por no (c). El rectángulo (2) representa un proceso u operación (a). El romboide (3) es entrada o salida de datos (b)."
      },
      {
        q: "Relacione cada símbolo con el paso que representa.\n**Símbolo:** 1. Óvalo o elipse · 2. Flecha · 3. Rombo\n**Paso:** a) «¿La calificación es mayor o igual a 6?» · b) «Inicio» y «Fin» del algoritmo · c) El orden en que se recorren los pasos",
        options: ["1b, 2c, 3a", "1a, 2b, 3c", "1c, 2a, 3b"],
        correct: 0,
        explanation: "El óvalo (1) marca el inicio y el fin (b). Las flechas (2) indican el orden del recorrido (c). El rombo (3) plantea la condición que se evalúa (a)."
      }
    ]
  }
};
