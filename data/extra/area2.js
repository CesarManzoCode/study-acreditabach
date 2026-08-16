/* Contenido adicional del área 2 · Cultura digital
   Se CONCATENA al final de flashcards y quiz de cada tema (ver engine.js).
   Nunca reordenes ni insertes al principio: los índices identifican tarjetas
   que ya tienen progreso guardado. */

const AREA2_EXTRA = {
  "2.1.1": {
    flashcards: [
      { front: "¿Qué es la huella digital?", back: "El rastro de datos que dejas al navegar: IP, cookies, historial, ubicaciones y dispositivos usados. Puede ser **activa** (lo que publicas) o **pasiva** (lo que se registra sin que lo notes)." },
      { front: "¿Por qué conviene revisar la configuración de privacidad de tus redes?", back: "Porque define quién ve tus publicaciones y datos. Un perfil abierto expone información que sirve para suplantarte o para ataques de ingeniería social." },
      { front: "¿Qué es la suplantación de identidad digital?", back: "Cuando alguien se hace pasar por ti en línea usando tus datos, fotos o cuentas, para engañar a terceros o dañar tu reputación." }
    ],
    quiz: [
      { q: "Una persona publica una foto de su credencial escolar en una red social abierta. ¿Qué elemento de su identidad digital está exponiendo?", options: ["Datos personales que permiten suplantarla","Su huella digital pasiva","Su dirección IP"], correct: 0, explanation: "Nombre, matrícula y fotografía son datos personales identificables: quien los tenga puede hacerse pasar por ella." },
      { q: "¿Cuál de las siguientes corresponde a una huella digital PASIVA?", options: ["Una publicación en Instagram","Las cookies que registra un sitio al visitarlo","Un comentario en un foro"], correct: 1, explanation: "La huella pasiva se genera sin que la persona la publique a propósito: cookies, dirección IP, ubicación, historial de navegación." },
      { q: "Un usuario quiere reducir su exposición en línea. ¿Qué acción tiene más impacto sobre su identidad digital?", options: ["Cambiar el fondo de pantalla del celular","Revisar y limitar quién puede ver sus publicaciones y datos de perfil","Usar el modo oscuro del navegador"], correct: 1, explanation: "La configuración de privacidad decide quién accede a la información que te representa; el resto son ajustes estéticos sin efecto sobre los datos." },
      { q: "¿Por qué la identidad digital es más amplia que un perfil de red social?", options: ["Porque incluye todos los rastros que dejas en internet, no solo lo que publicas","Porque solo existe si usas varias redes a la vez","Porque únicamente la forman tus contraseñas"], correct: 0, explanation: "Suma publicaciones, correos, búsquedas, compras, cookies y datos de dispositivo: todo lo que te representa o te rastrea en línea." }
    ]
  },
  "2.1.2": {
    flashcards: [
      { front: "¿Qué es el software propietario?", back: "Aquel cuyo fabricante conserva los derechos y cierra el código: la licencia limita lo que puedes hacer y no puedes modificarlo ni redistribuirlo (Microsoft Office, Photoshop). Casi siempre se cobra, pero no siempre: el freeware también es propietario y no cuesta nada." },
      { front: "¿Freeware y open source son lo mismo?", back: "No. Los dos pueden ser gratis, pero el **freeware** tiene el código cerrado y el **open source** permite ver, modificar y redistribuir el código fuente." }
    ],
    quiz: [
      { q: "Un programa se puede usar gratis 30 días; después pide pago para seguir funcionando. ¿Qué tipo de licenciamiento tiene?", options: ["Freeware","Shareware","Open source"], correct: 1, explanation: "El shareware es software de prueba: gratuito por tiempo o funciones limitadas y de pago para la versión completa." },
      { q: "Una escuela quiere instalar un sistema operativo que pueda adaptar a sus necesidades y copiar en todas sus computadoras sin pagar licencias por equipo. ¿Qué le conviene?", options: ["Software propietario","Shareware","Software de código abierto"], correct: 2, explanation: "El código abierto permite usar, modificar y redistribuir; por eso Linux es la opción típica en instituciones. La ventaja no es solo el precio: es que la licencia no limita la copia ni la adaptación." },
      { q: "¿Cuál es la diferencia principal entre freeware y software propietario de pago?", options: ["El freeware no cobra por su uso, aunque los dos tienen el código cerrado","El freeware permite modificar el código y el propietario no","No hay diferencia, son sinónimos"], correct: 0, explanation: "Los dos son propietarios y ocultan el código fuente; lo único que cambia es el precio. Por eso el freeware es un caso particular de software propietario, no su contrario." }
    ]
  },
  "2.1.3": {
    flashcards: [
      { front: "Ventaja principal de los servicios en la nube", back: "Que la información no depende de un solo aparato: se puede consultar y editar desde cualquier dispositivo con internet." }
    ],
    quiz: [
      { q: "Un negocio familiar quiere vender sus productos por internet y cobrar con tarjeta. ¿Qué tipo de servicio digital necesita?", options: ["Comercio electrónico","Servicio educativo","Red social exclusivamente"], correct: 0, explanation: "El comercio electrónico permite ofrecer productos, procesar pagos y gestionar envíos en línea." },
      { q: "¿Cuál es una desventaja de depender de servicios de almacenamiento en la nube?", options: ["Los archivos ocupan espacio en el disco duro","Se necesita conexión a internet para acceder a la información","Solo se pueden abrir desde una computadora"], correct: 1, explanation: "La ventaja de acceder desde cualquier lugar tiene como contraparte la dependencia de la conexión." },
      { q: "Un estudiante entrega tareas, revisa calificaciones y participa en foros de su materia desde una plataforma. ¿Qué tipo de servicio digital es?", options: ["Comercio electrónico","Educativo","Streaming"], correct: 1, explanation: "Es un servicio educativo: organiza contenidos, actividades y evaluación de un curso a distancia." }
    ]
  },
  "2.1.4": {
    leccion: "Tres amenazas más que el examen suele plantear con casos concretos. El **ciberacoso** o **ciberbullying** es el hostigamiento repetido a una persona por medios digitales: insultos, amenazas, difusión de rumores o de imágenes sin su consentimiento; lo que lo define es la repetición y la intención de dañar. La **ingeniería social** consiste en manipular a la persona para que entregue información confidencial por su propia voluntad, en vez de atacar al sistema: el phishing es su forma más común, y por eso el eslabón débil casi siempre es humano, no técnico. El **sexting** es el envío de contenido íntimo por medios digitales; el riesgo no está en el envío en sí, sino en que ese material se difunda sin consentimiento y se use para extorsionar, lo que se conoce como **sextorsión**.",
    flashcards: [
      { front: "¿Qué es la ingeniería social?", back: "Manipular a una persona para que entregue información confidencial por su propia voluntad, en vez de atacar al sistema. El phishing es su forma más común." }
    ],
    quiz: [
      { q: "Un adulto crea un perfil falso de adolescente para ganarse la confianza de un menor y después pedirle fotos íntimas. ¿Qué amenaza es?", options: ["Phishing","Grooming","Ransomware"], correct: 1, explanation: "El grooming es el acercamiento engañoso de un adulto a un menor en línea con fines de abuso sexual." },
      { q: "Un programa se instala sin permiso y registra todo lo que el usuario escribe, incluidas sus contraseñas. ¿Qué tipo de amenaza es?", options: ["Spyware, un tipo de malware","Ciberacoso","Shareware"], correct: 0, explanation: "El spyware espía la actividad del usuario y envía la información a un tercero; es una categoría de malware." },
      { q: "¿Qué tienen en común el phishing y la ingeniería social?", options: ["Ambos aprovechan el engaño a la persona, no una falla técnica del sistema","Ambos cifran los archivos del equipo","Ambos requieren acceso físico a la computadora"], correct: 0, explanation: "El phishing es una técnica de ingeniería social: el punto débil que aprovechan es la confianza del usuario." }
    ]
  },
  "2.1.5": {
    flashcards: [
      { front: "¿Qué hace segura a una contraseña?", back: "Su longitud y su carácter único: muchas caracteres, mezcla de tipos y **distinta en cada servicio**. Una contraseña larga y única vale más que una corta muy complicada." },
      { front: "¿Para qué sirve un gestor de contraseñas?", back: "Para generar y guardar contraseñas largas y distintas para cada sitio, de modo que solo tengas que recordar una contraseña maestra." },
      { front: "¿Por qué es riesgoso usar redes wifi públicas sin protección?", back: "Porque un tercero conectado a la misma red puede interceptar el tráfico. Conviene evitar operaciones bancarias o usar una VPN." }
    ],
    quiz: [
      { q: "¿Cuál de estas contraseñas es más segura?", options: ["Pedro2010","un-caballo-verde-corre-77","P@ss1"], correct: 1, explanation: "La longitud es el factor que más cuesta a un atacante: una frase larga supera a una corta con símbolos, y no contiene datos personales." },
      { q: "Aunque alguien robe tu contraseña, ¿qué medida impide que entre a tu cuenta?", options: ["Cambiar el nombre de usuario","La autenticación en dos factores","Borrar las cookies del navegador"], correct: 1, explanation: "El segundo factor pide un código adicional que solo está en tu dispositivo, así que la contraseña sola no basta." },
      { q: "¿Por qué es importante instalar las actualizaciones del sistema operativo?", options: ["Porque liberan espacio en el disco","Porque corrigen fallas de seguridad que los atacantes ya conocen","Porque hacen más rápida la conexión a internet"], correct: 1, explanation: "Muchas actualizaciones son parches de vulnerabilidades ya publicadas; no instalarlas deja la puerta abierta." },
      { q: "Un usuario guarda copias de sus archivos importantes en un disco externo y en la nube. ¿Contra qué amenaza se protege principalmente?", options: ["Contra el ransomware","Contra el grooming","Contra el phishing"], correct: 0, explanation: "Con respaldos actualizados no hace falta pagar el rescate: los archivos cifrados se pueden restaurar." }
    ]
  },
  "2.2.1": {
    flashcards: [
      { front: "¿El ciberespacio es lo mismo que internet?", back: "No. **Internet** es la red mundial de computadoras conectadas: su infraestructura y los protocolos que la hacen funcionar. El **ciberespacio** es el entorno simbólico de interacción que existe gracias a ella, donde las personas se comunican, publican y conviven." }
    ],
    quiz: [
      { q: "¿Cuál es la diferencia entre internet y el ciberespacio?", options: ["Internet es la red física de conexiones y el ciberespacio es el entorno de interacción que se genera en ella","Son sinónimos exactos","El ciberespacio solo existe en los videojuegos"], correct: 0, explanation: "Uno es la infraestructura (cables, servidores, protocolos); el otro es el espacio simbólico donde ocurre la comunicación." },
      { q: "¿Qué característica del ciberespacio explica que una publicación se difunda en varios países en minutos?", options: ["Que no tiene fronteras físicas y funciona en tiempo real","Que requiere permiso de cada gobierno","Que depende de la cercanía geográfica de los usuarios"], correct: 0, explanation: "La interacción en el ciberespacio es inmediata y no depende de la distancia física entre las personas." }
    ]
  },
  "2.2.2": {
    flashcards: [
      { front: "¿Qué agregan las TICCAD respecto de las TIC?", back: "La **C** de conocimiento y la **AD** de aprendizaje digital: no solo transmitir información, también construir conocimiento y sostener procesos de aprendizaje." },
      { front: "Da tres ejemplos de TICCAD en la escuela", back: "Plataformas de aprendizaje (Classroom, Moodle), simuladores y laboratorios virtuales, y repositorios de recursos educativos abiertos." }
    ],
    quiz: [
      { q: "¿Cuál de los siguientes es el mejor ejemplo de TICCAD y no solo de TIC?", options: ["Una llamada telefónica","Un simulador virtual de laboratorio con evaluación automática","Un mensaje de texto"], correct: 1, explanation: "El simulador no solo comunica: genera conocimiento y sostiene un proceso de aprendizaje, que es lo que agregan las TICCAD." },
      { q: "En el contexto educativo mexicano, ¿cuál es el propósito central de las TICCAD?", options: ["Sustituir por completo al docente","Apoyar el aprendizaje y la construcción de conocimiento con medios digitales","Vender dispositivos a las escuelas"], correct: 1, explanation: "Son herramientas de apoyo pedagógico: amplían las posibilidades de enseñar y aprender, no reemplazan la mediación docente." },
      { q: "Un profesor usa un foro en línea donde los alumnos discuten y construyen juntos una conclusión. ¿Qué dimensión de las TICCAD se destaca?", options: ["La generación de conocimiento","El almacenamiento masivo","El comercio electrónico"], correct: 0, explanation: "El intercambio argumentado produce conocimiento nuevo, no solo transmite información ya hecha." }
    ]
  },
  "2.2.3": {
    flashcards: [
      { front: "¿Para qué sirve Canva?", back: "Para diseñar carteles, infografías, presentaciones y gráficos a partir de plantillas, sin conocimientos de diseño gráfico." },
      { front: "¿Qué ventaja tiene editar un documento en Google Docs frente a mandarlo por correo?", back: "La edición es simultánea y hay una sola versión viva del archivo, con historial de cambios; por correo se multiplican las copias desactualizadas." }
    ],
    quiz: [
      { q: "Una alumna quiere hacer una infografía atractiva para exponer datos de su investigación. ¿Qué herramienta es más adecuada?", options: ["Zoom","Canva","Google Drive"], correct: 1, explanation: "Canva ofrece plantillas de diseño gráfico para infografías, carteles y presentaciones visuales." },
      { q: "¿Cuál es la principal ventaja del trabajo colaborativo en la nube?", options: ["Que varias personas editan el mismo archivo al mismo tiempo y ven los cambios al instante","Que se pueden imprimir más copias","Que no se necesita internet"], correct: 0, explanation: "La colaboración simultánea sobre un único documento evita versiones duplicadas y pérdida de cambios." }
    ]
  },
  "2.2.4": {
    flashcards: [
      { front: "¿Qué es el análisis de contenido en línea?", back: "Revisar sistemáticamente publicaciones, comentarios o textos digitales y clasificarlos en categorías para encontrar patrones y tendencias." },
      { front: "¿Qué se estudia en el análisis de redes sociales?", back: "La estructura de las relaciones: quién se conecta con quién, quién es más influyente y cómo circula la información dentro de la red." }
    ],
    quiz: [
      { q: "Una investigadora reúne por videollamada a ocho consumidores para conocer su opinión sobre una aplicación. ¿Qué método usa?", options: ["Ciberetnografía","Grupo de enfoque en línea","Análisis de redes sociales"], correct: 1, explanation: "El focus group en línea busca opiniones y percepciones a través de la conversación guiada en grupo." },
      { q: "Un estudio clasifica 5,000 comentarios de una página de noticias según si son a favor, en contra o neutrales. ¿Qué método aplica?", options: ["Análisis de contenido","Ciberetnografía","Grupo de enfoque"], correct: 0, explanation: "El análisis de contenido categoriza material digital ya existente para detectar patrones." }
    ]
  },
  "2.3.1": {
    flashcards: [
      { front: "¿Qué diferencia hay entre una referencia relativa (A1) y una absoluta ($A$1)?", back: "La relativa cambia al copiar la fórmula a otra celda; la absoluta, marcada con $, se queda apuntando siempre a la misma celda." },
      { front: "¿Qué hace la función =CONTAR frente a =CONTARA?", back: "**=CONTAR** cuenta solo celdas con números; **=CONTARA** cuenta todas las celdas que no están vacías, incluido el texto." },
      { front: "¿Para qué sirve la función =SI en una hoja de cálculo?", back: "Para evaluar una condición y devolver un resultado u otro. Ejemplo: =SI(A1>=6,\"Aprobado\",\"Reprobado\")." }
    ],
    quiz: [
      { q: "En las celdas B2 a B10 hay las ventas del mes. ¿Qué fórmula da el total?", options: ["=SUMA(B2:B10)","=PROMEDIO(B2:B10)","=CONTAR(B2:B10)"], correct: 0, explanation: "=SUMA suma todos los valores del rango; =PROMEDIO calcularía la media y =CONTAR solo cuántas celdas tienen números." },
      { q: "¿Qué resultado da la fórmula =SI(A1>=6,\"Aprobado\",\"Reprobado\") si en A1 hay un 5?", options: ["Aprobado","Reprobado","Un error"], correct: 1, explanation: "La condición A1>=6 es falsa, así que la función devuelve el segundo valor: \"Reprobado\"." },
      { q: "¿Qué fórmula encuentra la calificación más baja del rango C2:C30?", options: ["=MIN(C2:C30)","=MAX(C2:C30)","=MENOR(C2:C30)"], correct: 0, explanation: "=MIN devuelve el valor más pequeño de un rango; =MAX devolvería el más grande." },
      { q: "Toda fórmula en una hoja de cálculo debe comenzar con:", options: ["Un signo igual (=)","Un paréntesis","Dos puntos"], correct: 0, explanation: "El signo = le indica al programa que lo que sigue debe calcularse y no tratarse como texto." }
    ]
  },
  "2.3.2": {
    quiz: [
      { q: "¿Qué opción permite que el texto continúe en la siguiente página desde un punto exacto?", options: ["Salto de página","Interlineado","Sangría"], correct: 0, explanation: "El salto de página fuerza el inicio de una página nueva sin llenar de líneas vacías el documento." }
    ]
  },
  "2.3.3": {
    quiz: [
      { q: "¿Qué tipo de gráfico conviene para mostrar cómo se reparte el 100% de un presupuesto?", options: ["Gráfico de pastel","Gráfico de líneas","Gráfico de dispersión"], correct: 0, explanation: "El gráfico circular o de pastel muestra proporciones de un total; el de líneas sirve para evolución en el tiempo." }
    ]
  },
  "2.3.4": {
    flashcards: [
      { front: "¿En qué fase de ADDIE se define el perfil del público?", back: "En **Analizar**: se identifica quién aprenderá, qué sabe ya, qué necesita y con qué recursos cuenta." },
      { front: "¿Qué se produce en la fase de Diseñar de ADDIE?", back: "El plan: objetivos de aprendizaje, secuencia de contenidos, actividades, materiales previstos y forma de evaluación. Todavía no se construye nada." }
    ],
    quiz: [
      { q: "¿Cuál es el orden correcto de las fases del método ADDIE?", options: ["Analizar, Diseñar, Desarrollar, Implementar, Evaluar","Analizar, Desarrollar, Diseñar, Evaluar, Implementar","Diseñar, Analizar, Implementar, Desarrollar, Evaluar"], correct: 0, explanation: "Las siglas siguen el orden del modelo: Análisis, Diseño, Desarrollo, Implementación y Evaluación." },
      { q: "Un equipo aplica una encuesta para saber qué sabe ya el público sobre el tema del curso. ¿En qué fase de ADDIE está?", options: ["Analizar","Desarrollar","Evaluar"], correct: 0, explanation: "Conocer el punto de partida y las necesidades del público es la tarea de la fase de análisis." },
      { q: "El curso ya está publicado y los estudiantes lo están tomando. ¿Qué fase de ADDIE ocurre en ese momento?", options: ["Implementar","Diseñar","Analizar"], correct: 0, explanation: "La implementación es la puesta en marcha del contenido con los usuarios finales." },
      { q: "¿Por qué se dice que ADDIE es un modelo cíclico?", options: ["Porque la evaluación alimenta un nuevo análisis y mejora el contenido","Porque las fases se ejecutan al mismo tiempo","Porque solo se puede usar una vez"], correct: 0, explanation: "Lo aprendido en la evaluación se convierte en insumo para rediseñar y mejorar el material." }
    ]
  },
  "2.3.5": {
    leccion: "Dos tecnologías que el examen distingue de la inteligencia artificial en general. El **aprendizaje automático** o **machine learning** es la rama de la IA en la que un sistema mejora su desempeño a partir de datos y ejemplos, sin que un programador le escriba cada regla: así funcionan los filtros de spam o las recomendaciones que se afinan con el uso. La **realidad aumentada** superpone elementos digitales sobre la vista del mundo real —probarse unos lentes con la cámara del celular, ver indicaciones sobre la calle—, a diferencia de la realidad virtual, que sustituye por completo el entorno por uno simulado.",
    flashcards: [
      { front: "¿Qué es el aprendizaje automático (machine learning)?", back: "Rama de la inteligencia artificial en la que un sistema mejora su desempeño a partir de datos y ejemplos, sin que se le programe cada regla." }
    ],
    quiz: [
      { q: "Una aplicación que recomienda canciones a partir de lo que ya escuchaste aplica principalmente:", options: ["Inteligencia artificial","Internet de las cosas","Realidad virtual"], correct: 0, explanation: "Los sistemas de recomendación aprenden de tus datos para predecir preferencias: es una aplicación de IA." },
      { q: "Un sistema de riego que mide la humedad del suelo y se activa solo es un ejemplo de:", options: ["Internet de las cosas","Ciencia de datos","Realidad aumentada"], correct: 0, explanation: "Son objetos físicos con sensores conectados a internet que actúan según los datos que recogen: IoT." },
      { q: "¿Cuál es un riesgo social del uso masivo de inteligencia artificial?", options: ["Reproducir sesgos y discriminación presentes en los datos con que se entrenó","Que las computadoras dejen de funcionar sin electricidad","Que se reduzca la velocidad de internet"], correct: 0, explanation: "Si los datos de entrenamiento contienen prejuicios, el sistema los repite y los amplifica a gran escala." }
    ]
  },
  "2.4.1": {
    leccion: "Dos piezas que aparecen en casi todo algoritmo con repeticiones. Un **contador** es una variable que aumenta de uno en uno para llevar la cuenta de cuántas veces ocurrió algo (cuántos alumnos aprobaron). Un **acumulador** va sumando valores distintos para obtener un total (la suma de todas las calificaciones). Se distinguen por lo que suman: el contador siempre suma 1, el acumulador suma el dato en turno. Conviene recordar también que un **operador relacional** (=, ≠, <, >, ≤, ≥) siempre devuelve un valor **booleano**, verdadero o falso, y por eso se usa dentro de las condiciones de las estructuras selectivas y repetitivas.",
    flashcards: [
      { front: "¿Qué devuelve siempre un operador relacional?", back: "Un valor booleano: verdadero o falso. Por eso se usa dentro de las condiciones de las estructuras selectivas y repetitivas." }
    ],
    quiz: [
      { q: "En un algoritmo aparece la instrucción \"mientras contador < 10, repetir\". ¿Qué tipo de estructura es?", options: ["Repetitiva","Selectiva","Secuencial"], correct: 0, explanation: "\"Mientras\" repite un bloque de instrucciones hasta que la condición deja de cumplirse: es un ciclo." },
      { q: "¿Cuál de las siguientes es una expresión con operador lógico?", options: ["edad >= 18 Y tieneCredencial = verdadero","total = precio * cantidad","suma = a + b"], correct: 0, explanation: "El operador lógico Y (AND) combina dos condiciones; los otros ejemplos usan operadores aritméticos." },
      { q: "¿Qué caracteriza a una variable frente a una constante?", options: ["Que su valor puede cambiar durante la ejecución del algoritmo","Que siempre guarda texto","Que no ocupa memoria"], correct: 0, explanation: "La variable almacena un valor que puede modificarse; la constante mantiene el mismo valor de principio a fin." }
    ]
  },
  "2.4.2": {
    leccion: "El **pseudocódigo** es la forma de escribir un algoritmo en lenguaje natural estructurado —con palabras como Inicio, Leer, Si… Entonces, Mientras, Fin— antes de traducirlo a un lenguaje de programación real. Sirve para concentrarse en la lógica sin pelearse con la sintaxis, y es lo que el examen suele presentar cuando pide ordenar o completar los pasos de un algoritmo. Recuerda por qué importa el orden: el resultado depende de la secuencia, no se puede calcular con datos que aún no se han leído ni mostrar un resultado que todavía no se ha calculado.",
    flashcards: [
      { front: "¿Qué es el pseudocódigo?", back: "Una forma de escribir un algoritmo en lenguaje natural estructurado (Inicio, Leer, Si, Mientras, Fin) antes de programarlo en un lenguaje real." },
      { front: "¿Por qué importa el orden de los pasos en un algoritmo?", back: "Porque el resultado depende de la secuencia: no se puede calcular con datos que aún no se han leído ni mostrar un resultado que no se ha calculado." }
    ],
    quiz: [
      { q: "Ordena estos pasos para calcular el área de un rectángulo: 1) Mostrar el área, 2) Leer base y altura, 3) Multiplicar base por altura.", options: ["2, 3, 1","1, 2, 3","3, 2, 1"], correct: 0, explanation: "Primero la entrada (leer los datos), luego el proceso (multiplicar) y al final la salida (mostrar el resultado)." },
      { q: "En un algoritmo para saber si un alumno aprueba, ¿dónde va la comparación calificación >= 6?", options: ["En el proceso, después de leer la calificación","Antes de leer la calificación","Después de mostrar el resultado"], correct: 0, explanation: "No se puede comparar un dato que todavía no se ha capturado; la decisión pertenece al proceso." },
      { q: "¿Qué palabra marca el inicio y el fin de un algoritmo escrito en pseudocódigo?", options: ["Inicio y Fin","Abrir y Cerrar","Entrada y Salida"], correct: 0, explanation: "Por convención el pseudocódigo se delimita con Inicio y Fin, equivalentes al óvalo del diagrama de flujo." }
    ]
  },
  "2.4.3": {
    leccion: "Además de ser definido, preciso y finito —definido: mismas entradas, mismo resultado; preciso: sin ambigüedad en cada paso; finito: termina—, un algoritmo se construye con dos operaciones mentales que el examen nombra por su nombre. La **descomposición** consiste en partir un problema grande en subproblemas más pequeños y manejables, que se resuelven por separado y luego se integran (dividir el desarrollo de una app en pantallas, base de datos y pruebas). La **abstracción** consiste en quedarse con lo esencial del problema e ignorar los detalles que no afectan la solución, de modo que la misma solución sirva para casos parecidos. Ambas forman parte de lo que se llama **pensamiento computacional**.",
    quiz: [
      { q: "Un algoritmo cuyas instrucciones pueden entenderse de dos maneras distintas incumple la característica de ser:", options: ["Preciso","Finito","Eficiente"], correct: 0, explanation: "La precisión es la que exige que cada paso tenga una sola interpretación posible. Que sea *definido* es otra cosa: que con las mismas entradas dé siempre el mismo resultado." },
      { q: "¿Por qué un algoritmo debe ser finito?", options: ["Porque debe terminar y entregar un resultado en un número limitado de pasos","Porque debe caber en una hoja","Porque solo puede usar números enteros"], correct: 0, explanation: "Si nunca termina no resuelve el problema: la finitud garantiza que se llegue a una salida." }
    ]
  },
  "2.4.4": {
    flashcards: [
      { front: "¿Cuántas salidas tiene un rombo de decisión?", back: "Al menos dos: una para cuando la condición es verdadera y otra para cuando es falsa. Cada una lleva a un camino distinto del diagrama." },
      { front: "¿Cómo se representa un ciclo en un diagrama de flujo?", back: "Con una flecha que regresa a un paso anterior después de una decisión, formando un lazo que se repite mientras la condición se cumpla." }
    ],
    quiz: [
      { q: "En un diagrama de flujo, la instrucción \"promedio = suma / 3\" se representa con:", options: ["Un rectángulo","Un rombo","Un óvalo"], correct: 0, explanation: "El rectángulo indica un proceso: cálculos y asignaciones de valores." },
      { q: "¿Qué símbolo usarías para \"Mostrar el resultado en pantalla\"?", options: ["Paralelogramo","Rombo","Óvalo"], correct: 0, explanation: "El paralelogramo representa entrada y salida de datos, tanto leer como mostrar." },
      { q: "Un diagrama de flujo tiene un rombo con la pregunta \"¿edad >= 18?\". ¿Cuántas salidas debe tener ese símbolo?", options: ["Dos: una para sí y otra para no","Una sola","Tres, una por cada opción"], correct: 0, explanation: "La decisión evalúa una condición booleana, así que se bifurca en el camino verdadero y el falso." },
      { q: "¿Qué elemento indica el sentido en que se recorren los pasos de un diagrama de flujo?", options: ["Las flechas o líneas de flujo","El color de los símbolos","El tamaño de las figuras"], correct: 0, explanation: "Las flechas conectan los símbolos y marcan el orden de ejecución." }
    ]
  }
};
