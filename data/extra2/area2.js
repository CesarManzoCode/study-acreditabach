/* Segundo paquete de ampliación · Área 2 · Cultura digital

   El orden de las opciones se revuelve al mostrarlas (engine.shuffleOptions),
   así que aquí la respuesta correcta se escribe siempre primero para poder
   revisar el contenido de un vistazo. */

const AREA2_EXTRA2 = {
  "2.1.1": {
    leccion: "Tres nociones que el examen distingue con cuidado. La **identidad digital** es lo que uno decide mostrar: perfiles, publicaciones, nombre de usuario. La **huella digital** es todo el rastro que queda al navegar, incluido lo que uno no publicó a propósito: búsquedas, ubicaciones, cookies e historial. La **reputación digital** es la imagen que otros se forman a partir de lo que encuentran en línea, y la construyen tanto las publicaciones propias como los comentarios, etiquetas y fotos que suben terceros. A esto se suma el **derecho al olvido**: la posibilidad de solicitar que se retire o deje de indexarse información personal en los buscadores cuando ya es obsoleta, inexacta o irrelevante.",
    flashcards: [
      { front: "¿Qué es la huella digital y en qué se diferencia de la identidad digital?", back: "La **identidad digital** es lo que uno decide mostrar (perfiles, publicaciones, nombre de usuario). La **huella digital** es todo el rastro que queda al navegar, incluido lo que uno no publicó a propósito: búsquedas, ubicaciones, cookies e historial." },
      { front: "¿Qué es la reputación digital?", back: "La imagen que otros se forman de una persona a partir de lo que encuentran en línea. La construyen tanto las publicaciones propias como los comentarios, etiquetas y fotos que suben terceros." }
    ],
    quiz: [
      { q: "Una empresa revisa las redes sociales de un candidato antes de contratarlo. Esto muestra la importancia de:", options: ["Cuidar la reputación digital","Usar contraseñas largas","Tener antivirus actualizado"], correct: 0, explanation: "Lo que otros encuentran en línea influye en decisiones reales como una contratación." },
      { q: "El rastro que dejan las búsquedas, la ubicación y las cookies de un usuario se llama:", options: ["Huella digital","Identidad digital","Firma electrónica"], correct: 0, explanation: "Es el conjunto de datos que se generan al navegar, aunque el usuario no los publique voluntariamente." },
      { q: "¿Cuál de estos elementos NO forma parte de la identidad digital de una persona?", options: ["El modelo del router de su casa","Su nombre de usuario en redes sociales","Su avatar o foto de perfil"], correct: 0, explanation: "El equipo de red no representa a la persona ante los demás; los otros dos sí la identifican en línea." },
      { q: "La firma electrónica avanzada (e.firma) sirve principalmente para:", options: ["Acreditar la identidad de una persona en trámites digitales con validez legal","Cifrar el disco duro de una computadora","Bloquear anuncios en el navegador"], correct: 0, explanation: "Sustituye a la firma autógrafa en trámites oficiales y garantiza quién firmó el documento." },
      { q: "Publicar una foto de un compañero sin su permiso afecta principalmente:", options: ["Su identidad y reputación digital, además de su derecho a la propia imagen","El ancho de banda de la red escolar","La licencia del software usado"], correct: 0, explanation: "Terceros también construyen la identidad digital de alguien, por eso publicar sin consentimiento la vulnera." }
    ]
  },
  "2.1.2": {
    flashcards: [
      { front: "¿Qué es el software libre según sus cuatro libertades?", back: "Permite **usar**, **estudiar** (acceso al código), **modificar** y **redistribuir** el programa. Ser libre no significa necesariamente ser gratuito." },
      { front: "¿Qué diferencia hay entre freeware y software libre?", back: "El **freeware** es gratuito pero de código cerrado: no se puede estudiar ni modificar. El **software libre** da acceso al código fuente aunque a veces se cobre por él." }
    ],
    quiz: [
      { q: "Un programa que se puede usar gratis por 30 días y después exige pagar se llama:", options: ["Shareware","Freeware","Software libre"], correct: 0, explanation: "El shareware da un periodo o versión de prueba y luego requiere licencia de pago." },
      { q: "¿Cuál es la característica esencial del software de código abierto?", options: ["El código fuente está disponible para revisarlo y modificarlo","Siempre es gratuito","Solo funciona en Linux"], correct: 0, explanation: "Lo definitorio es el acceso al código; el precio es otra cosa. La gratuidad es frecuente pero no obligatoria: hay distribuciones de pago que siguen siendo de código abierto." },
      { q: "El software propietario se caracteriza porque:", options: ["El código fuente es cerrado y el uso está limitado por la licencia del fabricante","Cualquiera puede modificarlo y redistribuirlo","Siempre tiene costo"], correct: 0, explanation: "Lo define que el fabricante conserva los derechos, cierra el código y fija las condiciones de uso. Suele cobrarse, pero el freeware demuestra que puede ser propietario y no costar nada." }
    ]
  },
  "2.1.3": {
    quiz: [
      { q: "Un servicio que permite guardar archivos y consultarlos desde cualquier dispositivo con internet es un ejemplo de:", options: ["Almacenamiento en la nube","Red de área local","Sistema operativo"], correct: 0, explanation: "Los archivos viven en servidores remotos y se sincronizan con los dispositivos del usuario." },
      { q: "¿Cuál es una ventaja de los servicios digitales de educación en línea?", options: ["Permiten estudiar sin coincidir en tiempo y lugar con el docente","Garantizan que todos los estudiantes tengan la misma conexión","Eliminan la necesidad de evaluar"], correct: 0, explanation: "La asincronía y la ubicuidad son su principal ventaja; la brecha digital sigue siendo su límite." },
      { q: "Comprar un producto en una tienda en línea y pagarlo con tarjeta corresponde a un servicio de:", options: ["Comercio electrónico","Gobierno digital","Cómputo en la nube"], correct: 0, explanation: "Es una transacción comercial realizada por medios digitales." }
    ]
  },
  "2.1.4": {
    flashcards: [
      { front: "¿Cuál es la mejor defensa contra el ransomware?", back: "Los respaldos frecuentes y desconectados de la red: si el programa cifra los archivos y exige un pago, se restaura desde el respaldo sin pagar el rescate." },
      { front: "¿Por qué la ingeniería social funciona aunque el sistema esté bien protegido?", back: "Porque ataca a la persona, no al sistema: engaños por llamada, mensaje o correo para que ella misma entregue contraseñas o datos bancarios." },
      { front: "¿Qué diferencia hay entre virus, gusano y troyano?", back: "El **virus** necesita un archivo anfitrión y que alguien lo ejecute; el **gusano** se propaga solo por la red; el **troyano** se disfraza de programa útil para abrir una puerta trasera." }
    ],
    quiz: [
      { q: "Un correo que aparenta ser del banco y pide confirmar la contraseña en un enlace es un caso de:", options: ["Phishing","Ransomware","Spam publicitario"], correct: 0, explanation: "Suplanta a una entidad confiable para robar credenciales." },
      { q: "Un programa bloquea todos los archivos de una empresa y pide un pago en criptomonedas. Se trata de:", options: ["Ransomware","Spyware","Adware"], correct: 0, explanation: "El secuestro de datos con exigencia de rescate define al ransomware." },
      { q: "Cuando un adulto se hace pasar por menor para ganarse la confianza de un niño en línea con fines sexuales, se comete:", options: ["Grooming","Ciberbullying","Phishing"], correct: 0, explanation: "El grooming es el engaño para el acercamiento con fines de abuso." },
      { q: "Un software que se instala sin avisar y registra lo que el usuario escribe es un:", options: ["Spyware (programa espía)","Firewall","Antivirus heurístico"], correct: 0, explanation: "Su objetivo es recolectar información del usuario sin su consentimiento." }
    ]
  },
  "2.1.5": {
    leccion: "Tres medidas concretas que el examen plantea con casos. La **autenticación en dos pasos (2FA)** suma a la contraseña un segundo factor —un código temporal, una app autenticadora, la huella—, de modo que robar la contraseña no baste para entrar. Una **conexión segura** se reconoce porque la dirección empieza con **https://** y suele mostrar un candado, pero eso no garantiza que el sitio sea legítimo: los sitios falsos también usan https, así que hay que revisar además que el dominio esté bien escrito. Y la **regla 3-2-1 de respaldos** dice que conviene tener tres copias de los datos, en dos medios distintos, y una de ellas fuera del sitio o en la nube; es la defensa más efectiva frente al ransomware y a las fallas de disco.",
    flashcards: [
      { front: "¿Qué es la autenticación en dos pasos (2FA)?", back: "Sumar a la contraseña un segundo factor: un código temporal, una app autenticadora o la huella. Aunque roben la contraseña, no basta para entrar." },
      { front: "¿Cómo se reconoce una conexión segura en el navegador?", back: "La dirección empieza con **https://** y suele mostrarse un candado. Aun así, hay que revisar que el dominio sea el correcto: los sitios falsos también usan https." },
      { front: "¿Qué es la regla 3-2-1 de respaldos?", back: "Tres copias de los datos, en dos medios distintos y una de ellas fuera del sitio (o en la nube). Es la defensa más efectiva ante ransomware y fallas de disco." }
    ],
    quiz: [
      { q: "¿Cuál de estas contraseñas es más segura?", options: ["Una frase larga con mayúsculas, números y símbolos","El nombre y el año de nacimiento","Una palabra del diccionario con una letra cambiada"], correct: 0, explanation: "La longitud y la variedad de caracteres son lo que más dificulta un ataque por fuerza bruta o diccionario." },
      { q: "La principal ventaja de la verificación en dos pasos es que:", options: ["Protege la cuenta aunque alguien conozca la contraseña","Hace más rápido el inicio de sesión","Evita que el equipo se llene de virus"], correct: 0, explanation: "Añade un factor adicional que el atacante normalmente no posee." },
      { q: "Al usar una red wifi pública abierta, la medida más recomendable es:", options: ["Evitar operaciones bancarias o usar una VPN","Apagar el antivirus para que no interfiera","Compartir archivos en red para ir más rápido"], correct: 0, explanation: "En una red abierta cualquiera conectado puede interceptar el tráfico. La VPN lo cifra en el tramo que va de tu equipo al servidor de la VPN, que es justo el tramo peligroso; de ahí en adelante viaja como cualquier otro tráfico, así que no es un cifrado de extremo a extremo hasta el destino final." },
      { q: "Mantener actualizado el sistema operativo sirve sobre todo para:", options: ["Corregir vulnerabilidades de seguridad ya conocidas","Aumentar el espacio en disco","Mejorar la calidad de la cámara"], correct: 0, explanation: "Las actualizaciones cierran fallas que los atacantes ya saben aprovechar." },
      { q: "Un respaldo cumple su función de protección contra ransomware si:", options: ["Se guarda desconectado o en la nube y se prueba su restauración","Está en la misma carpeta del equipo","Se hace una vez al año"], correct: 0, explanation: "Un respaldo conectado al equipo también se cifra durante el ataque." }
    ]
  },
  "2.2.1": {
    flashcards: [
      { front: "¿Qué diferencia hay entre internet, web y ciberespacio?", back: "**Internet** es la infraestructura física de redes; la **web** es uno de los servicios que corren sobre ella; el **ciberespacio** es el entorno social y simbólico donde ocurren las interacciones." },
      { front: "¿Qué caracteriza a la comunicación en el ciberespacio?", back: "Es deslocalizada (no depende del lugar), puede ser sincrónica o asincrónica, permite el anonimato y multiplica el alcance de cualquier mensaje." }
    ],
    quiz: [
      { q: "El ciberespacio se define mejor como:", options: ["El entorno virtual de interacción que se genera con las redes digitales","El conjunto de cables y servidores del mundo","Un programa para navegar por internet"], correct: 0, explanation: "No es el hardware sino el espacio de relación e intercambio que se produce a través de él." },
      { q: "Que dos personas de países distintos colaboren en un mismo documento al mismo tiempo ilustra que el ciberespacio es:", options: ["Deslocalizado y permite interacción en tiempo real","Exclusivamente asincrónico","Un espacio físico delimitado"], correct: 0, explanation: "La ubicación geográfica deja de ser una restricción para la colaboración." }
    ]
  },
  "2.2.2": {
    flashcards: [
      { front: "¿Qué agrega la sigla TICCAD respecto a TIC?", back: "Suma **conocimiento** y **aprendizaje digital**: no basta con informar y comunicar, la tecnología debe servir para construir conocimiento y aprender." }
    ],
    quiz: [
      { q: "Las TICCAD se distinguen de las TIC porque incorporan explícitamente:", options: ["El conocimiento y el aprendizaje digital","Únicamente el hardware","Solo las redes sociales"], correct: 0, explanation: "La C adicional y la AD amplían el enfoque hacia el aprendizaje y la generación de conocimiento." }
    ]
  },
  "2.2.3": {
    leccion: "Dos ideas para elegir y usar herramientas digitales. Una **herramienta de trabajo colaborativo en línea** es la que permite que varias personas editen, comenten y versionen el mismo documento al mismo tiempo, con registro de quién cambió qué. Un **gestor de referencias bibliográficas** (Zotero, Mendeley) guarda las fuentes consultadas y genera automáticamente las citas y la bibliografía en el formato requerido: APA, MLA o Chicago. La regla para elegir cualquiera de ellas es partir de la tarea y no de la moda: primero se define el propósito (comunicar, organizar, analizar, crear), el público y los recursos disponibles, y solo entonces se elige el programa.",
    flashcards: [
      { front: "¿Qué es una herramienta de trabajo colaborativo en línea?", back: "La que permite que varias personas editen, comenten y versionen el mismo documento o proyecto al mismo tiempo, con registro de quién cambió qué." }
    ],
    quiz: [
      { q: "La ventaja principal de editar un documento en la nube en equipo es:", options: ["Todos trabajan sobre la misma versión y se registran los cambios","El archivo pesa menos","No requiere revisión ortográfica"], correct: 0, explanation: "Evita el desorden de múltiples copias y permite ver el historial de versiones." }
    ]
  },
  "2.3.1": {
    leccion: "Tres cosas que el examen pregunta de la hoja de cálculo más allá de las funciones básicas. Una **referencia relativa** (A1) se ajusta sola al copiar la fórmula a otra celda, mientras que una **absoluta** ($A$1) se queda fija; el signo **$** es lo que ancla la columna, la fila o ambas. La función **BUSCARV** (o CONSULTAV) busca un valor en la primera columna de una tabla y devuelve el dato de otra columna de la misma fila: es la función típica para cruzar dos listas. Y conviene reconocer dos errores frecuentes: **#¡DIV/0!** aparece cuando se divide entre cero o entre una celda vacía, y **#¿NOMBRE?** cuando el nombre de la función está mal escrito o no existe.",
    flashcards: [
      { front: "¿Qué diferencia hay entre referencia relativa y absoluta?", back: "La **relativa** (A1) se ajusta al copiar la fórmula; la **absoluta** ($A$1) se queda fija. Se usa el signo $ para anclar columna, fila o ambas." },
      { front: "¿Qué significan los errores #¡DIV/0! y #¿NOMBRE?", back: "**#¡DIV/0!**: se está dividiendo entre cero o entre una celda vacía. **#¿NOMBRE?**: el nombre de la función está mal escrito o no existe." }
    ],
    quiz: [
      { q: "¿Qué función suma solo las celdas del rango B2:B20 que sean mayores a 100?", options: ["SUMAR.SI","SUMA","CONTAR"], correct: 0, explanation: "SUMAR.SI aplica una condición antes de sumar; SUMA lo hace sin condiciones." },
      { q: "Al copiar la fórmula =A1*$C$1 de la celda B1 a la celda B2, se convierte en:", options: ["=A2*$C$1","=A2*$C$2","=A1*$C$1"], correct: 0, explanation: "La referencia relativa A1 se desplaza a A2, mientras que $C$1 queda anclada." },
      { q: "Para conocer el promedio de las calificaciones del rango D2:D31 se usa:", options: ["=PROMEDIO(D2:D31)","=SUMA(D2:D31)","=CONTAR(D2:D31)"], correct: 0, explanation: "PROMEDIO calcula la media aritmética del rango indicado." },
      { q: "Una celda muestra #¡DIV/0!. Esto significa que:", options: ["La fórmula divide entre cero o entre una celda vacía","El texto no cabe en la celda","Falta guardar el archivo"], correct: 0, explanation: "Es el error específico de una división cuyo divisor es cero." }
    ]
  },
  "2.3.2": {
    flashcards: [
      { front: "¿Qué diferencia hay entre salto de línea, salto de párrafo y salto de página?", back: "El de **línea** continúa el mismo párrafo abajo; el de **párrafo** crea uno nuevo con su propio formato; el de **página** empieza en una hoja nueva sin usar enters." }
    ],
    quiz: [
      { q: "Para que un capítulo siempre empiece en una hoja nueva se debe insertar:", options: ["Un salto de página","Varios saltos de línea","Un encabezado"], correct: 0, explanation: "Los enters repetidos se descuadran al editar el texto; el salto de página es estable." }
    ]
  },
  "2.3.3": {
    quiz: [
      { q: "Para mostrar la evolución de las ventas durante doce meses, el recurso más adecuado dentro de una diapositiva es:", options: ["Un gráfico de líneas","Una tabla con los 12 valores en texto pequeño","Una lista con viñetas"], correct: 0, explanation: "El gráfico de líneas comunica de inmediato la tendencia temporal." }
    ]
  },
  "2.3.4": {
    flashcards: [
      { front: "¿En qué orden van las fases del método ADDIE?", back: "**A**nálisis → **D**iseño → **D**esarrollo → **I**mplementación → **E**valuación. Son las cinco fases del diseño instruccional de contenidos digitales." },
      { front: "¿Qué se hace exactamente en la fase de análisis?", back: "Se identifican el problema, el perfil y las necesidades de los destinatarios, los objetivos de aprendizaje y los recursos disponibles. Es la fase que evita construir algo que nadie necesita." },
      { front: "¿En qué se diferencia diseño de desarrollo?", back: "El **diseño** planea (guion, estructura, actividades, criterios de evaluación); el **desarrollo** produce los materiales reales: videos, textos, ejercicios." }
    ],
    quiz: [
      { q: "En la fase de análisis del modelo ADDIE se define principalmente:", options: ["Quién es el destinatario y qué necesita aprender","Cómo se grabarán los videos","Cuántas personas terminaron el curso"], correct: 0, explanation: "El análisis fija el problema y el perfil del usuario antes de producir cualquier material." },
      { q: "Elaborar el guion, seleccionar los contenidos y planear las actividades corresponde a la fase de:", options: ["Diseño","Implementación","Evaluación"], correct: 0, explanation: "El diseño es la planeación detallada previa a la producción." },
      { q: "La producción de los videos, textos y ejercicios del curso ocurre en la fase de:", options: ["Desarrollo","Análisis","Diseño"], correct: 0, explanation: "El desarrollo convierte el plan en materiales concretos." },
      { q: "Poner el curso en marcha con los estudiantes reales corresponde a:", options: ["Implementación","Desarrollo","Diseño"], correct: 0, explanation: "Es la fase de puesta en operación con los destinatarios." },
      { q: "La fase de evaluación en ADDIE se caracteriza porque:", options: ["Puede aplicarse durante todo el proceso y al final para mejorar el producto","Solo ocurre al terminar y no modifica nada","Es opcional"], correct: 0, explanation: "Se distingue entre evaluación formativa (durante) y sumativa (final), y ambas retroalimentan el modelo." }
    ]
  },
  "2.3.5": {
    leccion: "Tres tecnologías que suelen confundirse entre sí. El **internet de las cosas (IoT)** son objetos cotidianos con sensores y conexión a internet que envían y reciben datos: relojes, termostatos, pulseras de actividad, semáforos inteligentes. El **big data** es el manejo de volúmenes enormes de datos que crecen a gran velocidad y en formatos variados, con el fin de encontrar patrones que no se ven en muestras pequeñas. Y la diferencia clave del par de realidades: la **realidad virtual** sustituye por completo el entorno con uno simulado, mientras que la **aumentada** superpone información digital sobre el entorno real.",
    flashcards: [
      { front: "¿Qué es el internet de las cosas (IoT)?", back: "Objetos cotidianos con sensores y conexión a internet que envían y reciben datos: relojes, termostatos, pulseras de actividad, semáforos inteligentes." },
      { front: "¿Qué es el big data?", back: "El manejo de volúmenes enormes de datos que crecen a gran velocidad y en formatos variados, para encontrar patrones que no se ven en muestras pequeñas." }
    ],
    quiz: [
      { q: "Un reloj que mide los pasos y envía los datos al celular es un ejemplo de:", options: ["Internet de las cosas","Realidad virtual","Software libre"], correct: 0, explanation: "Es un objeto con sensores conectado a la red que intercambia datos." },
      { q: "El análisis de grandes volúmenes de datos de compras para predecir la demanda corresponde a:", options: ["Big data","Ofimática","Ciberseguridad"], correct: 0, explanation: "Se trata de extraer patrones útiles de conjuntos de datos masivos." }
    ]
  },
  "2.4.1": {
    flashcards: [
      { front: "¿Qué es una variable en programación?", back: "Un espacio de memoria con nombre donde se guarda un dato que puede cambiar durante la ejecución. Una **constante**, en cambio, conserva su valor." },
      { front: "¿Qué es un ciclo o bucle?", back: "Una estructura que repite un bloque de instrucciones mientras se cumpla una condición. Si la condición nunca se vuelve falsa, se produce un ciclo infinito." },
      { front: "¿Qué es la estructura condicional?", back: "La que decide entre caminos distintos según una condición: si se cumple, hace una cosa; si no, hace otra (si… entonces… si no)." }
    ],
    quiz: [
      { q: "Un espacio de memoria con nombre cuyo valor puede cambiar durante la ejecución es:", options: ["Una variable","Una constante","Un operador"], correct: 0, explanation: "Lo que define a la variable es justamente que su contenido puede modificarse." },
      { q: "La instrucción «mientras el saldo sea mayor que cero, seguir descontando» corresponde a una estructura:", options: ["Repetitiva o cíclica","Condicional simple","Secuencial"], correct: 0, explanation: "Repite las instrucciones mientras la condición se mantenga verdadera." },
      { q: "En un algoritmo, los datos de entrada son:", options: ["La información que el algoritmo recibe para poder procesarla","El resultado que se muestra al final","Los errores detectados"], correct: 0, explanation: "Entrada, proceso y salida son los tres momentos básicos de todo algoritmo." }
    ]
  },
  "2.4.2": {
    leccion: "Además del orden entrada-proceso-salida, hay dos puntos que el examen pregunta. Las **características que debe cumplir todo algoritmo** son las tres que ya conoces del tema: **preciso** (cada paso sin ambigüedad y en un orden establecido), **finito** (termina en un número limitado de pasos) y **definido** (con las mismas entradas produce siempre el mismo resultado). Y la **depuración** es probar el algoritmo con distintos datos, encontrar los errores de lógica y corregirlos: un algoritmo sin probar no está terminado. Sobre el orden, ten presente que intercambiar dos instrucciones puede producir un resultado distinto o hacer imposible la ejecución, como cobrar antes de calcular el total.",
    flashcards: [
      { front: "¿Por qué importa el orden de los pasos?", back: "Porque un algoritmo es secuencial: intercambiar dos instrucciones puede producir un resultado distinto o hacer imposible la ejecución (cobrar antes de calcular el total)." }
    ],
    quiz: [
      { q: "El primer paso al construir un algoritmo es:", options: ["Definir con claridad el problema y el resultado esperado","Escribir el código","Elegir el lenguaje de programación"], correct: 0, explanation: "Sin entender el problema no se puede diseñar la secuencia de pasos que lo resuelve." },
      { q: "Al hacer una transferencia bancaria, el paso «verificar que haya saldo suficiente» debe ir:", options: ["Antes de descontar el dinero","Después de enviar el dinero","Al final del proceso"], correct: 0, explanation: "El orden de las validaciones es parte de la corrección del algoritmo." }
    ]
  },
  "2.4.3": {
    leccion: "El **pensamiento computacional** se apoya en cuatro pilares que conviene saber de memoria: **descomposición** (partir el problema en partes menores), **reconocimiento de patrones** (notar lo que se repite entre problemas distintos), **abstracción** (quedarse con lo esencial e ignorar lo que no afecta la solución) y **diseño de algoritmos** (definir los pasos). La **abstracción** se entiende bien con el mapa del metro: abstrae las distancias reales y conserva solo el orden de las estaciones, que es lo único que importa para el viaje. La **generalización** es adaptar una solución ya conocida a un problema nuevo que tiene la misma estructura, en vez de empezar desde cero.",
    quiz: [
      { q: "El pensamiento algorítmico es útil fuera de la computación porque:", options: ["Ordena cualquier proceso en pasos claros y verificables","Solo sirve para programar","Sustituye al razonamiento matemático"], correct: 0, explanation: "Recetas, protocolos y trámites también son algoritmos." }
    ]
  },
  "2.4.4": {
    flashcards: [
      { front: "¿Qué símbolo representa la entrada o salida de datos?", back: "El **romboide** (paralelogramo inclinado). No confundir con el rombo, que es la decisión." },
      { front: "¿Cuántas salidas tiene el símbolo de decisión?", back: "Al menos dos, etiquetadas con la respuesta a la pregunta: sí/no o verdadero/falso. Es el único símbolo del diagrama que se bifurca." },
      { front: "¿Qué símbolo marca el inicio y el fin del diagrama?", back: "El **óvalo** o elipse (terminal). Todo diagrama de flujo tiene exactamente un inicio y al menos un fin." }
    ],
    quiz: [
      { q: "¿Qué figura representa una decisión en un diagrama de flujo?", options: ["El rombo","El rectángulo","El óvalo"], correct: 0, explanation: "El rombo plantea una condición y de él salen dos caminos distintos." },
      { q: "El rectángulo en un diagrama de flujo indica:", options: ["Un proceso u operación","El inicio del algoritmo","La lectura de datos"], correct: 0, explanation: "Es el símbolo de las acciones o cálculos que ejecuta el algoritmo." },
      { q: "Para representar «leer la calificación del alumno» se usa:", options: ["Un romboide (entrada de datos)","Un rombo","Un óvalo"], correct: 0, explanation: "La entrada y la salida de datos comparten el símbolo del paralelogramo." },
      { q: "Las flechas de un diagrama de flujo sirven para:", options: ["Indicar el orden en que se ejecutan los pasos","Señalar errores","Marcar comentarios"], correct: 0, explanation: "Definen la secuencia y dirección del flujo de control." },
      { q: "Un diagrama de flujo bien construido debe:", options: ["Tener un solo inicio y terminar en todos sus caminos","Tener varios símbolos de inicio","Prescindir de las flechas"], correct: 0, explanation: "Un único punto de entrada y caminos que concluyen garantizan que el algoritmo sea finito y claro." }
    ]
  }
};
