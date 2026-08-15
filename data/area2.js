const AREA2_TOPICS = [
  {
    id: "2.1.1",
    area: 2,
    subarea: "2.1 Ciudadanía digital",
    tema: "Elementos de la identidad digital",
    note: "Tu **identidad digital** es todo lo que te representa en internet: tu nombre de usuario, fotos, correos, contraseñas, historial de búsquedas, publicaciones en redes sociales, huella digital del dispositivo (IP, cookies) y datos que compartes en formularios. No es solo tu perfil de red social, sino la suma de rastros que dejas cada vez que usas internet. Es importante cuidarla porque empresas, hackers o desconocidos pueden usarla para robarte, suplantarte o venderla. Ejemplo: si usas la misma foto y nombre de usuario en varias plataformas, alguien puede rastrear todos tus movimientos en línea uniendo esos datos.",
    flashcards: [
      { front: "¿Qué es la identidad digital?", back: "El conjunto de datos, actividad y huellas que una persona genera al usar internet (perfiles, fotos, contraseñas, historial, IP, etc.)." },
      { front: "Da un ejemplo de elemento de identidad digital", back: "Nombre de usuario, correo electrónico, fotos de perfil, historial de navegación o dirección IP." }
    ],
    quiz: [
      {
        q: "¿Cuál de los siguientes es un elemento que forma parte de la identidad digital de una persona?",
        options: ["Su nombre de usuario y fotos publicadas en redes sociales", "El color de su casa", "El clima de su ciudad"],
        correct: 0,
        explanation: "El nombre de usuario y las fotos publicadas son datos que la persona genera en línea y forman parte de su identidad digital."
      },
      {
        q: "Un usuario utiliza la misma foto y nombre en Instagram, Twitter y un foro. ¿Qué riesgo relacionado con su identidad digital corre?",
        options: ["Que alguien pueda rastrear y unir su actividad en distintas plataformas", "Que su computadora se vuelva más lenta", "Que pierda la garantía de su celular"],
        correct: 0,
        explanation: "Usar los mismos datos identificables en varias plataformas facilita que terceros rastreen y crucen su información personal."
      }
    ]
  },
  {
    id: "2.1.2",
    area: 2,
    subarea: "2.1 Ciudadanía digital",
    tema: "Tipos de licenciamiento de software",
    note: "Existen distintos tipos de licencia según lo que te permiten hacer con un programa. **Freeware**: software gratis, pero de código cerrado (no puedes ver ni modificar su código), ejemplo Skype o Adobe Reader. **Shareware**: es de prueba, gratis por tiempo limitado o con funciones reducidas, y luego debes pagar para seguir usándolo completo, ejemplo WinRAR. **Software de código abierto (open source)**: es gratis y además puedes ver, modificar y redistribuir su código fuente, ejemplo Linux, LibreOffice o Mozilla Firefox. La clave para identificarlos en el examen: freeware = gratis y cerrado; shareware = prueba temporal; open source = código visible y modificable.",
    flashcards: [
      { front: "¿Qué es el shareware?", back: "Software de prueba, gratuito por tiempo limitado o con funciones reducidas; para usarlo completo hay que pagar." },
      { front: "Menciona un ejemplo de software de código abierto", back: "Linux, LibreOffice o Mozilla Firefox: su código fuente se puede ver y modificar libremente." }
    ],
    quiz: [
      {
        q: "Un programa es gratuito, pero el usuario no puede ver ni modificar su código fuente. ¿Qué tipo de licenciamiento es?",
        options: ["Freeware", "Shareware", "Código abierto"],
        correct: 0,
        explanation: "El freeware es gratuito pero de código cerrado, a diferencia del software de código abierto."
      },
      {
        q: "¿Cuál es la característica principal del software de código abierto?",
        options: ["Solo funciona 30 días de prueba", "Su código fuente puede ser visto, modificado y redistribuido", "Siempre requiere pago único"],
        correct: 1,
        explanation: "El software de código abierto permite el acceso, modificación y redistribución de su código fuente."
      }
    ]
  },
  {
    id: "2.1.3",
    area: 2,
    subarea: "2.1 Ciudadanía digital",
    tema: "Tipos de servicios digitales",
    note: "Los servicios digitales son plataformas en línea que cumplen distintas funciones. **Almacenamiento en la nube**: guardar y compartir archivos desde cualquier dispositivo, ejemplo Google Drive, Dropbox. **Comercio electrónico**: comprar y vender productos o servicios en línea, ejemplo Amazon, Mercado Libre. **Educativos**: aprender o tomar cursos a distancia, ejemplo Google Classroom, Khan Academy. **Redes sociales**: comunicarse y compartir contenido con otras personas, ejemplo Facebook, Instagram. En el examen suelen dar una situación (\"quiero comprar un libro sin salir de casa\") y pedirte identificar qué tipo de servicio digital resuelve esa necesidad.",
    flashcards: [
      { front: "¿Para qué sirve un servicio de almacenamiento en la nube?", back: "Para guardar, respaldar y compartir archivos accesibles desde cualquier dispositivo con internet." },
      { front: "Da un ejemplo de servicio de comercio electrónico", back: "Amazon o Mercado Libre: plataformas para comprar y vender productos en línea." }
    ],
    quiz: [
      {
        q: "Una persona necesita guardar copias de sus documentos y acceder a ellos desde su celular y su computadora. ¿Qué tipo de servicio digital debe usar?",
        options: ["Almacenamiento en la nube", "Red social", "Comercio electrónico"],
        correct: 0,
        explanation: "El almacenamiento en la nube permite guardar archivos y acceder a ellos desde cualquier dispositivo conectado."
      },
      {
        q: "¿Qué tipo de servicio digital es Google Classroom?",
        options: ["Comercio electrónico", "Servicio educativo", "Red social"],
        correct: 1,
        explanation: "Google Classroom es una plataforma diseñada para gestionar cursos y actividades de aprendizaje, por lo que es un servicio educativo."
      }
    ]
  },
  {
    id: "2.1.4",
    area: 2,
    subarea: "2.1 Ciudadanía digital",
    tema: "Tipos de amenazas de seguridad digital",
    note: "**Phishing**: correos o mensajes falsos que simulan ser de un banco o empresa para robar contraseñas o datos bancarios. **Grooming**: un adulto engaña a un menor de edad en línea para ganarse su confianza con fines de abuso. **Malware**: programa malicioso que daña o espía tu dispositivo (incluye virus, spyware, troyanos). **Ransomware**: tipo de malware que bloquea o cifra tus archivos y pide un pago (rescate) para liberarlos. Truco para el examen: si mencionan \"correo falso pidiendo tus datos\" es phishing; si piden \"dinero para desbloquear archivos\" es ransomware; si es un adulto ganándose la confianza de un niño en un chat, es grooming.",
    flashcards: [
      { front: "¿Qué es el phishing?", back: "Mensajes o correos falsos que suplantan una entidad confiable para robar contraseñas o datos personales/bancarios." },
      { front: "¿Qué es el ransomware?", back: "Malware que cifra o bloquea los archivos de la víctima y exige un pago para liberarlos." }
    ],
    quiz: [
      {
        q: "Un usuario recibe un correo que parece del banco pidiéndole 'confirmar' su contraseña en un enlace. ¿Qué amenaza es?",
        options: ["Phishing", "Grooming", "Ransomware"],
        correct: 0,
        explanation: "El phishing usa mensajes falsos que simulan ser de una institución confiable para robar datos personales."
      },
      {
        q: "Todos los archivos de una computadora quedan cifrados y aparece un mensaje pidiendo dinero para recuperarlos. ¿Qué tipo de amenaza es?",
        options: ["Grooming", "Ransomware", "Phishing"],
        correct: 1,
        explanation: "El ransomware cifra los archivos de la víctima y exige un pago (rescate) para desbloquearlos."
      }
    ]
  },
  {
    id: "2.1.5",
    area: 2,
    subarea: "2.1 Ciudadanía digital",
    tema: "Medidas de seguridad digital",
    note: "Frente a las amenazas digitales existen medidas de protección concretas. **Contraseñas seguras** (largas, con mayúsculas, números y símbolos) y no repetirlas en varios sitios. **Autenticación en dos factores (2FA)**: pide un segundo código además de la contraseña, por ejemplo un SMS o app. **Antivirus y actualizaciones**: mantener el software y el sistema operativo al día para cerrar fallas de seguridad. **No abrir enlaces ni archivos sospechosos** de correos o mensajes desconocidos. **Copias de seguridad (backups)**: para no perder información si hay un ataque de ransomware. En el examen, ante un caso de robo de cuenta o inicio de sesión sospechoso, la respuesta correcta casi siempre combina cambiar la contraseña y activar la verificación en dos pasos.",
    flashcards: [
      { front: "¿Qué es la autenticación en dos factores (2FA)?", back: "Una medida de seguridad que pide un segundo código o verificación además de la contraseña para iniciar sesión." },
      { front: "¿Qué medida protege contra la pérdida de información por un ataque de ransomware?", back: "Hacer copias de seguridad (backups) periódicas de los archivos importantes." }
    ],
    quiz: [
      {
        q: "Un usuario recibe una alerta de inicio de sesión sospechoso desde un lugar desconocido. ¿Qué debe hacer primero?",
        options: ["Ignorar la alerta si no reconoce el lugar", "Cambiar su contraseña y activar la autenticación en dos factores", "Formatear su computadora"],
        correct: 1,
        explanation: "Ante un inicio de sesión sospechoso, lo recomendado es cambiar la contraseña de inmediato y habilitar la verificación en dos pasos para proteger la cuenta."
      },
      {
        q: "¿Cuál de las siguientes es una medida de seguridad digital efectiva?",
        options: ["Usar la misma contraseña en todas las cuentas para no olvidarla", "Mantener actualizado el sistema operativo y el antivirus", "Compartir la contraseña con amigos de confianza"],
        correct: 1,
        explanation: "Mantener actualizados el sistema operativo y el antivirus corrige fallas de seguridad que los atacantes podrían aprovechar."
      }
    ]
  },
  {
    id: "2.2.1",
    area: 2,
    subarea: "2.2 Comunicación y colaboración a través de medios digitales",
    tema: "Definición del ciberespacio",
    note: "El **ciberespacio** es el entorno virtual creado por las redes de computadoras e internet, donde las personas se comunican, comparten información e interactúan, aunque no exista un lugar físico real. No es un aparato ni un cable: es el \"espacio\" simbólico donde ocurren las interacciones digitales (redes sociales, videojuegos en línea, correos, videollamadas). Se le describe como un espacio sin fronteras físicas porque conecta a personas de cualquier parte del mundo en tiempo real. Ejemplo: cuando chateas con alguien de otro país por WhatsApp, ambos están \"presentes\" en el ciberespacio aunque estén a miles de kilómetros de distancia.",
    flashcards: [
      { front: "¿Qué es el ciberespacio?", back: "El entorno virtual generado por las redes de computadoras e internet donde las personas interactúan y comparten información." },
      { front: "¿Por qué se dice que el ciberespacio no tiene fronteras físicas?", back: "Porque conecta a personas de cualquier parte del mundo en tiempo real sin importar la distancia geográfica." }
    ],
    quiz: [
      {
        q: "¿Cuál es la definición correcta de ciberespacio?",
        options: ["Un dispositivo físico que almacena información", "El entorno virtual generado por las redes e internet donde interactúan las personas", "Un cable que conecta computadoras"],
        correct: 1,
        explanation: "El ciberespacio es el entorno virtual, no un objeto físico, donde ocurre la comunicación y la interacción digital."
      },
      {
        q: "Dos amigos de distintos países juegan un videojuego en línea juntos en tiempo real. ¿En qué entorno están interactuando?",
        options: ["En el ciberespacio", "En un servidor físico local", "En una red de área local (LAN) exclusiva"],
        correct: 0,
        explanation: "La interacción entre personas a través de redes e internet, sin importar la ubicación física, ocurre en el ciberespacio."
      }
    ]
  },
  {
    id: "2.2.2",
    area: 2,
    subarea: "2.2 Comunicación y colaboración a través de medios digitales",
    tema: "Definición de las tecnologías de la información, comunicación, conocimiento y aprendizaje digital (TICCAD)",
    note: "Las **TICCAD** son el conjunto de tecnologías (dispositivos, programas y plataformas) que se usan para gestionar información, comunicarse, generar conocimiento y facilitar el aprendizaje de manera digital. Es un concepto más amplio que las TIC tradicionales porque además de información y comunicación, incluye la construcción de conocimiento y el aprendizaje digital, por ejemplo plataformas educativas, simuladores, entornos virtuales de aprendizaje. La idea clave para el examen: las TICCAD no son solo \"tecnología para comunicarse\", sino también herramientas para aprender y generar conocimiento (como un curso en línea con foros y evaluaciones).",
    flashcards: [
      { front: "¿Qué significan las siglas TICCAD?", back: "Tecnologías de la Información, Comunicación, Conocimiento y Aprendizaje Digital." },
      { front: "¿En qué se diferencian las TICCAD de las TIC tradicionales?", back: "Las TICCAD incluyen además la generación de conocimiento y el aprendizaje digital, no solo información y comunicación." }
    ],
    quiz: [
      {
        q: "¿Qué son las TICCAD?",
        options: ["Solo los dispositivos electrónicos como celulares y computadoras", "Tecnologías de información, comunicación, conocimiento y aprendizaje digital", "Un tipo de virus informático"],
        correct: 1,
        explanation: "Las TICCAD son el conjunto de tecnologías usadas para gestionar información, comunicación, conocimiento y aprendizaje de forma digital."
      },
      {
        q: "Una plataforma educativa en línea con foros, videos y evaluaciones automáticas es un ejemplo de:",
        options: ["TICCAD", "Malware", "Ciberespacio exclusivamente"],
        correct: 0,
        explanation: "Al combinar comunicación, generación de conocimiento y aprendizaje digital, esta plataforma es un ejemplo de TICCAD."
      }
    ]
  },
  {
    id: "2.2.3",
    area: 2,
    subarea: "2.2 Comunicación y colaboración a través de medios digitales",
    tema: "Función y uso de herramientas digitales",
    note: "Cada herramienta digital tiene una función principal. **Prezi** y **Genially**: presentaciones dinámicas e interactivas. **Google Drive**: almacenar y compartir archivos en la nube. **Zoom** y **Google Meet**: videollamadas y reuniones a distancia. **Google Docs**: redactar y editar documentos de texto en colaboración simultánea. **Kahoot**: crear cuestionarios y juegos interactivos para evaluar en tiempo real. **Google Sites**: crear páginas web sencillas sin programar. **Canva**: diseñar gráficos, carteles e infografías. En el examen suelen dar una situación (\"el maestro quiere aplicar un examen rápido y divertido en clase\") y pedir identificar la herramienta adecuada (Kahoot).",
    flashcards: [
      { front: "¿Para qué se usa Kahoot?", back: "Para crear cuestionarios y juegos interactivos que evalúan a los participantes en tiempo real." },
      { front: "¿Qué herramienta se usa para tener una reunión de trabajo a distancia con video?", back: "Zoom o Google Meet, plataformas de videollamadas." }
    ],
    quiz: [
      {
        q: "Un grupo de estudiantes necesita redactar un ensayo colaborativo, editando todos al mismo tiempo desde sus casas. ¿Qué herramienta es más adecuada?",
        options: ["Google Docs", "Kahoot", "Zoom"],
        correct: 0,
        explanation: "Google Docs permite la edición colaborativa y simultánea de documentos de texto en línea."
      },
      {
        q: "Un profesor quiere aplicar un cuestionario dinámico tipo juego para evaluar a sus alumnos en clase. ¿Qué herramienta le conviene usar?",
        options: ["Kahoot", "Google Drive", "Prezi"],
        correct: 0,
        explanation: "Kahoot está diseñado para crear cuestionarios interactivos que se responden en tiempo real como un juego."
      }
    ]
  },
  {
    id: "2.2.4",
    area: 2,
    subarea: "2.2 Comunicación y colaboración a través de medios digitales",
    tema: "Métodos de investigación digital",
    note: "Son formas de estudiar el comportamiento de las personas en internet. **Ciberetnografía**: observar y analizar cómo se comporta e interactúa una comunidad en línea (foros, redes sociales) como si fuera trabajo de campo digital. **Análisis de contenido en línea**: revisar y clasificar publicaciones, comentarios o textos digitales para encontrar patrones. **Grupo de enfoque online (focus group)**: reunir a un grupo de personas por videollamada o chat para conocer su opinión sobre un tema. **Análisis de redes sociales**: estudiar las conexiones e interacciones entre usuarios (quién sigue a quién, quién comparte qué) para entender relaciones e influencias.",
    flashcards: [
      { front: "¿Qué es la ciberetnografía?", back: "Método que observa y analiza el comportamiento de una comunidad en su entorno digital (foros, redes sociales) como trabajo de campo virtual." },
      { front: "¿Qué es un grupo de enfoque online?", back: "Una reunión de personas por videollamada o chat para conocer sus opiniones sobre un tema específico." }
    ],
    quiz: [
      {
        q: "Un investigador se une a un foro de videojuegos durante meses para observar cómo interactúan y se comportan sus miembros. ¿Qué método está usando?",
        options: ["Ciberetnografía", "Grupo de enfoque online", "Phishing"],
        correct: 0,
        explanation: "Observar el comportamiento de una comunidad en su ambiente digital durante un periodo prolongado es ciberetnografía."
      },
      {
        q: "Un estudio que examina quién sigue a quién y cómo se comparten publicaciones entre usuarios de Twitter corresponde a:",
        options: ["Análisis de redes sociales", "Ciberetnografía", "Almacenamiento en la nube"],
        correct: 0,
        explanation: "El análisis de redes sociales estudia las conexiones e interacciones entre usuarios dentro de una plataforma."
      }
    ]
  },
  {
    id: "2.3.1",
    area: 2,
    subarea: "2.3 Creatividad digital",
    tema: "Herramientas del software de hoja de cálculo",
    note: "En programas como Excel o Google Sheets, las **fórmulas** permiten hacer cálculos automáticos. Siempre empiezan con signo **=**. Las más básicas: **=SUMA(rango)** suma varios valores, **=PROMEDIO(rango)** calcula el promedio, **=MAX(rango)** y **=MIN(rango)** encuentran el valor mayor o menor, **=CONTAR(rango)** cuenta cuántas celdas tienen números. Ejemplo: si en las celdas A1:A3 hay las calificaciones 8, 9 y 7, la fórmula =PROMEDIO(A1:A3) da 8 automáticamente. Para el examen, identifica qué fórmula corresponde a qué operación básica (sumar, promediar, encontrar máximo/mínimo).",
    flashcards: [
      { front: "¿Qué fórmula se usa para calcular un promedio en una hoja de cálculo?", back: "=PROMEDIO(rango de celdas), por ejemplo =PROMEDIO(A1:A3)." },
      { front: "¿Qué hace la fórmula =SUMA(A1:A5)?", back: "Suma todos los valores numéricos contenidos en las celdas A1 hasta A5." }
    ],
    quiz: [
      {
        q: "Un estudiante quiere obtener el promedio de sus tres calificaciones capturadas en las celdas A1, A2 y A3. ¿Qué fórmula debe usar?",
        options: ["=PROMEDIO(A1:A3)", "=SUMA(A1:A3)", "=MAX(A1:A3)"],
        correct: 0,
        explanation: "La función PROMEDIO calcula la media aritmética de los valores contenidos en el rango indicado."
      },
      {
        q: "¿Qué fórmula permite encontrar el valor más alto dentro de un rango de celdas?",
        options: ["=MIN(rango)", "=MAX(rango)", "=CONTAR(rango)"],
        correct: 1,
        explanation: "La función MAX devuelve el valor más grande dentro del rango de celdas seleccionado."
      }
    ]
  },
  {
    id: "2.3.2",
    area: 2,
    subarea: "2.3 Creatividad digital",
    tema: "Herramientas del software de procesamiento de texto",
    note: "En programas como Word o Google Docs hay iconos específicos para dar formato. **Insertar tabla**: crea una cuadrícula de filas y columnas para organizar datos, suele estar en la pestaña \"Insertar\". **Ajustar márgenes**: controla el espacio en blanco alrededor del texto en la página, está en \"Diseño\" o \"Formato\". **Dividir texto en columnas**: separa el contenido en dos o más columnas (como un periódico), se encuentra en \"Diseño\" > \"Columnas\". Reconocer estos iconos es clave: el de tabla suele verse como una cuadrícula pequeña, el de columnas como líneas verticales divididas.",
    flashcards: [
      { front: "¿Dónde se encuentra normalmente la opción para insertar una tabla en un procesador de texto?", back: "En la pestaña 'Insertar', representada por un icono de cuadrícula." },
      { front: "¿Qué función tiene la opción de 'dividir en columnas' en un procesador de texto?", back: "Organiza el texto en dos o más columnas verticales dentro de la misma página, como un periódico." }
    ],
    quiz: [
      {
        q: "Un usuario quiere organizar información en filas y columnas dentro de un documento de texto. ¿Qué herramienta debe usar?",
        options: ["Insertar tabla", "Ajustar márgenes", "Corrector ortográfico"],
        correct: 0,
        explanation: "La herramienta de insertar tabla crea una cuadrícula de filas y columnas para organizar datos dentro del texto."
      },
      {
        q: "¿Qué opción permite modificar el espacio en blanco alrededor del contenido de una página?",
        options: ["Ajustar márgenes", "Insertar tabla", "Dividir en columnas"],
        correct: 0,
        explanation: "Los márgenes controlan el espacio en blanco entre el borde de la página y el texto."
      }
    ]
  },
  {
    id: "2.3.3",
    area: 2,
    subarea: "2.3 Creatividad digital",
    tema: "Herramientas del software de presentaciones electrónicas",
    note: "En programas como PowerPoint o Google Slides, hay iconos para enriquecer las diapositivas. **Insertar gráficos**: representa datos numéricos visualmente (barras, pastel, líneas), útil para mostrar estadísticas. **Insertar tablas**: organiza información en filas y columnas dentro de la diapositiva. **Insertar cuestionarios**: (con complementos como Kahoot o formularios) permite hacer preguntas interactivas durante la presentación. **WordArt**: da estilo artístico y decorativo al texto (colores, sombras, efectos 3D) para resaltar títulos. Para el examen: relaciona cada icono con su función según la necesidad descrita (ej. \"quiero resaltar el título con efectos\" = WordArt).",
    flashcards: [
      { front: "¿Para qué sirve la herramienta de insertar gráficos en un software de presentaciones?", back: "Para representar datos numéricos de forma visual, como gráficas de barras, pastel o líneas." },
      { front: "¿Qué es WordArt?", back: "Una herramienta que da estilo artístico y decorativo al texto (colores, sombras, efectos) para resaltarlo." }
    ],
    quiz: [
      {
        q: "Un estudiante quiere que el título de su presentación se vea con colores y efectos decorativos llamativos. ¿Qué herramienta debe usar?",
        options: ["WordArt", "Insertar tabla", "Insertar gráfico"],
        correct: 0,
        explanation: "WordArt permite aplicar estilos artísticos y efectos visuales al texto para resaltarlo."
      },
      {
        q: "¿Qué herramienta es más adecuada para mostrar visualmente las ventas mensuales de una empresa en una diapositiva?",
        options: ["Insertar gráfico", "WordArt", "Insertar tabla de contenido"],
        correct: 0,
        explanation: "Insertar un gráfico permite representar datos numéricos, como ventas mensuales, de forma visual y comprensible."
      }
    ]
  },
  {
    id: "2.3.4",
    area: 2,
    subarea: "2.3 Creatividad digital",
    tema: "Fases del método ADDIE para la creación de contenidos digitales",
    note: "**ADDIE** es un modelo con 5 fases para crear contenidos o cursos digitales de forma ordenada. **Analizar**: identificar las necesidades y características del público (¿quién va a usar el contenido y qué necesita aprender?). **Diseñar**: planear objetivos, estructura y actividades del contenido. **Desarrollar**: crear los materiales reales (videos, textos, ejercicios). **Implementar**: poner en marcha el contenido con los usuarios finales. **Evaluar**: medir si el contenido cumplió sus objetivos y recoger retroalimentación para mejorar. El orden siempre es: Analizar, Diseñar, Desarrollar, Implementar, Evaluar (de ahí las siglas).",
    flashcards: [
      { front: "¿Qué significan las siglas ADDIE?", back: "Analizar, Diseñar, Desarrollar, Implementar y Evaluar." },
      { front: "¿Qué se hace en la fase de 'Analizar' del método ADDIE?", back: "Se identifican las necesidades y características del público al que va dirigido el contenido." }
    ],
    quiz: [
      {
        q: "Un diseñador de cursos en línea está creando los videos y ejercicios finales del curso después de haber planeado su estructura. ¿En qué fase de ADDIE se encuentra?",
        options: ["Desarrollar", "Analizar", "Evaluar"],
        correct: 0,
        explanation: "La fase de Desarrollar consiste en crear los materiales reales del contenido, como videos y ejercicios."
      },
      {
        q: "Después de aplicar un curso digital, el equipo recopila retroalimentación de los estudiantes para saber si cumplió sus objetivos. ¿Qué fase de ADDIE es esta?",
        options: ["Evaluar", "Diseñar", "Implementar"],
        correct: 0,
        explanation: "La fase de Evaluar mide si el contenido cumplió sus objetivos y recoge retroalimentación para mejorarlo."
      }
    ]
  },
  {
    id: "2.3.5",
    area: 2,
    subarea: "2.3 Creatividad digital",
    tema: "Campos de aplicación de herramientas tecnológicas",
    note: "Distintas tecnologías se aplican en diferentes áreas de la vida. **Inteligencia artificial (IA)**: se aplica en asistentes virtuales, recomendaciones personalizadas (Netflix, Spotify), diagnóstico médico y reconocimiento facial. **Internet de las cosas (IoT)**: conecta objetos físicos a internet para que envíen y reciban datos, aplicado en casas inteligentes (termostatos, focos), relojes inteligentes y sensores industriales. **Ciencia de datos**: analiza grandes cantidades de datos para tomar decisiones, aplicada en marketing, finanzas, salud pública y estudios de mercado. Truco para el examen: si hablan de \"objetos conectados que se controlan a distancia\" es IoT; si hablan de \"analizar grandes volúmenes de datos para predecir tendencias\" es ciencia de datos; si hablan de \"máquinas que imitan el razonamiento humano\" es IA.",
    flashcards: [
      { front: "Da un ejemplo de aplicación del internet de las cosas (IoT)", back: "Casas inteligentes con termostatos, focos o cerraduras que se controlan remotamente desde el celular." },
      { front: "¿En qué campo se aplica la ciencia de datos?", back: "En marketing, finanzas y salud, analizando grandes volúmenes de datos para tomar decisiones o predecir tendencias." }
    ],
    quiz: [
      {
        q: "Un refrigerador inteligente que envía una alerta al celular del usuario cuando se le acaba la leche es un ejemplo de:",
        options: ["Internet de las cosas (IoT)", "Ciencia de datos", "Software de código abierto"],
        correct: 0,
        explanation: "Un objeto físico conectado a internet que envía y recibe datos es un ejemplo típico de internet de las cosas."
      },
      {
        q: "Una empresa analiza millones de registros de compras para predecir qué productos se venderán más el próximo mes. ¿Qué campo tecnológico está aplicando?",
        options: ["Ciencia de datos", "Internet de las cosas", "Ciberetnografía"],
        correct: 0,
        explanation: "Analizar grandes volúmenes de datos para tomar decisiones o predecir tendencias es el campo de la ciencia de datos."
      }
    ]
  },
  {
    id: "2.4.1",
    area: 2,
    subarea: "2.4 Pensamiento algorítmico",
    tema: "Conceptos del lenguaje algorítmico",
    note: "Conceptos básicos de algoritmos: **Dato**: valor concreto (ej. 8, \"Juan\"). **Variable**: espacio que guarda un valor y puede cambiar (ej. edad = 15). **Constante**: valor que no cambia durante el algoritmo (ej. PI = 3.1416). **Expresión**: combinación de valores y operadores que produce un resultado (ej. a + b). **Operador relacional**: compara valores (>, <, =, ≠), da como resultado verdadero o falso. **Operador lógico**: combina condiciones (Y, O, NO). **Operador aritmético**: hace cálculos matemáticos (+, -, *, /). **Estructura repetitiva**: repite un bloque de instrucciones varias veces (bucles como \"mientras\" o \"para\"). **Estructura selectiva**: elige un camino según una condición (\"si... entonces... si no\").",
    flashcards: [
      { front: "¿Qué es una variable en un algoritmo?", back: "Un espacio de memoria que guarda un valor y cuyo contenido puede cambiar durante la ejecución del algoritmo." },
      { front: "¿Qué diferencia hay entre un operador relacional y un operador lógico?", back: "El relacional compara valores (>, <, =) dando verdadero o falso; el lógico combina condiciones (Y, O, NO)." }
    ],
    quiz: [
      {
        q: "¿Cuál de los siguientes es un ejemplo de estructura selectiva?",
        options: ["Repetir una instrucción 10 veces con un bucle", "Si la edad es mayor a 18, entonces mostrar 'mayor de edad'", "Sumar dos números"],
        correct: 1,
        explanation: "La estructura selectiva usa condiciones ('si... entonces') para elegir un camino distinto según se cumpla o no."
      },
      {
        q: "En un algoritmo, PI = 3.1416 es un valor que nunca cambia durante la ejecución. ¿Qué concepto representa?",
        options: ["Variable", "Constante", "Expresión"],
        correct: 1,
        explanation: "Una constante es un valor fijo que no cambia durante la ejecución del algoritmo, a diferencia de una variable."
      }
    ]
  },
  {
    id: "2.4.2",
    area: 2,
    subarea: "2.4 Pensamiento algorítmico",
    tema: "Pasos de un algoritmo",
    note: "Un algoritmo es una secuencia ordenada de pasos para resolver un problema. Lo importante es respetar el orden lógico: primero **entrada** (leer o capturar los datos necesarios), después el **proceso** (los cálculos u operaciones sobre esos datos), y al final la **salida** (mostrar o entregar el resultado). Ejemplo con el promedio de 3 calificaciones: 1) Leer/capturar las tres calificaciones, 2) Sumarlas, 3) Dividir la suma entre 3, 4) Mostrar el resultado. En el examen suelen dar los pasos desordenados y pedir que los ordenes correctamente siguiendo esta lógica de entrada → proceso → salida.",
    flashcards: [
      { front: "¿Cuál es el orden lógico general de los pasos de un algoritmo?", back: "Entrada (capturar datos), proceso (cálculos), salida (mostrar resultado)." },
      { front: "¿Cuál es el primer paso al calcular el promedio de tres calificaciones?", back: "Leer o capturar las tres calificaciones (entrada de datos)." }
    ],
    quiz: [
      {
        q: "Para calcular el promedio de 3 calificaciones, ¿qué paso debe ir justo después de leer las tres calificaciones?",
        options: ["Mostrar el resultado", "Sumar las tres calificaciones", "Dividir entre 2"],
        correct: 1,
        explanation: "Después de capturar los datos (entrada), el siguiente paso lógico es procesarlos, en este caso sumándolos."
      },
      {
        q: "¿Cuál debe ser el último paso de un algoritmo que calcula un promedio?",
        options: ["Mostrar el resultado del promedio", "Leer las calificaciones", "Sumar las calificaciones"],
        correct: 0,
        explanation: "La salida, es decir, mostrar el resultado final, siempre debe ser el último paso del algoritmo."
      }
    ]
  },
  {
    id: "2.4.3",
    area: 2,
    subarea: "2.4 Pensamiento algorítmico",
    tema: "Características del pensamiento algorítmico",
    note: "Un buen algoritmo debe cumplir tres características principales. **Definido**: cada paso debe ser claro y sin ambigüedad, no debe prestarse a interpretaciones distintas. **Preciso**: las instrucciones deben indicar exactamente qué hacer y en qué orden, sin dejar huecos. **Finito**: debe tener un número limitado de pasos y terminar en algún momento, no puede repetirse para siempre. Ejemplo de algoritmo mal hecho: \"sumar números hasta que ya no quieras\" (no es finito ni preciso). Un algoritmo correcto siempre indica claramente cuándo empieza, qué hace y cuándo termina.",
    flashcards: [
      { front: "¿Qué significa que un algoritmo sea 'finito'?", back: "Que tiene un número limitado de pasos y llega a un fin, no se repite indefinidamente." },
      { front: "¿Qué significa que un algoritmo sea 'preciso'?", back: "Que sus instrucciones indican exactamente qué hacer y en qué orden, sin ambigüedad ni huecos." }
    ],
    quiz: [
      {
        q: "Un algoritmo que dice 'repetir el proceso hasta que el usuario se canse' viola principalmente cuál característica del pensamiento algorítmico?",
        options: ["Ser finito", "Ser definido", "Ser preciso"],
        correct: 0,
        explanation: "Un algoritmo debe tener un número determinado de pasos y terminar; 'hasta que se canse' no define un final claro, por lo que no es finito."
      },
      {
        q: "¿Cuál de las siguientes es una característica del pensamiento algorítmico?",
        options: ["Ambiguo", "Definido", "Infinito"],
        correct: 1,
        explanation: "El pensamiento algorítmico debe ser definido, preciso y finito; la ambigüedad y la infinitud contradicen estas características."
      }
    ]
  },
  {
    id: "2.4.4",
    area: 2,
    subarea: "2.4 Pensamiento algorítmico",
    tema: "Símbolos de los diagramas de flujo en algoritmos",
    note: "Los diagramas de flujo representan algoritmos con símbolos gráficos estándar. **Óvalo/elipse**: marca el inicio o fin del algoritmo. **Rectángulo**: representa un proceso o una operación (cálculo, asignación de valor). **Paralelogramo**: representa entrada o salida de datos (leer o mostrar información). **Rombo**: representa una decisión o estructura selectiva (una pregunta con respuesta sí/no). **Flechas**: indican el flujo o la secuencia entre los pasos. Para el examen, memoriza: óvalo = inicio/fin, rectángulo = proceso, paralelogramo = entrada/salida, rombo = decisión.",
    flashcards: [
      { front: "¿Qué representa el símbolo de rombo en un diagrama de flujo?", back: "Una decisión o estructura selectiva, una pregunta cuya respuesta determina el camino a seguir (sí/no)." },
      { front: "¿Qué símbolo se usa para marcar el inicio y el fin de un algoritmo en un diagrama de flujo?", back: "El óvalo (o elipse)." }
    ],
    quiz: [
      {
        q: "En un diagrama de flujo, ¿qué símbolo se usa para representar la entrada o salida de datos?",
        options: ["Rombo", "Paralelogramo", "Óvalo"],
        correct: 1,
        explanation: "El paralelogramo representa la entrada o salida de datos, como leer un valor o mostrar un resultado."
      },
      {
        q: "¿Qué símbolo indica una decisión dentro de un diagrama de flujo, como '¿el número es mayor a 10?'?",
        options: ["Rectángulo", "Rombo", "Flecha"],
        correct: 1,
        explanation: "El rombo representa una decisión o estructura selectiva, donde el flujo se divide según la respuesta a una condición."
      }
    ]
  }
];
