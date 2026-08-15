/* Contenido adicional del área 1 · Pensamiento matemático

   Estos temas además tienen GENERADORES (src/lib/generators/math.js) que
   producen problemas numéricos distintos cada vez. Por eso lo que se agrega
   aquí es sobre todo conceptual: criterios, errores típicos y cuándo aplicar
   cada procedimiento, que es lo que los números por sí solos no enseñan. */

const AREA1_EXTRA = {
  "1.1.1": {
    flashcards: [
      { front: "¿Qué es una variable ordinal?", back: "Una cualitativa cuyas categorías tienen un orden natural (bajo, medio, alto; primaria, secundaria, bachillerato). No se pueden promediar, pero sí ordenar." },
      { front: "¿Se puede calcular la media de una variable cualitativa?", back: "No. Solo se puede calcular la **moda** (la categoría más frecuente). La media y la mediana requieren valores numéricos." }
    ],
    quiz: [
      { q: "¿Qué medida de tendencia central se puede calcular con una variable cualitativa como el color favorito?", options: ["Solo la moda","La media","La mediana y la media"], correct: 0, explanation: "Sin valores numéricos no hay suma ni orden, así que solo tiene sentido la categoría más frecuente." },
      { q: "El nivel de satisfacción medido como 'malo, regular, bueno, excelente' es una variable:", options: ["Cualitativa ordinal","Cuantitativa continua","Cuantitativa discreta"], correct: 0, explanation: "Son categorías, no números, pero tienen un orden definido: por eso es ordinal." },
      { q: "¿Por qué el número de una camiseta deportiva NO es una variable cuantitativa aunque sea un número?", options: ["Porque solo identifica, no mide ni cuenta nada","Porque puede tener decimales","Porque cambia cada temporada"], correct: 0, explanation: "Es una etiqueta: sumar o promediar números de camiseta no produce información con sentido." }
    ]
  },
  "1.1.2": {
    flashcards: [
      { front: "¿Qué es el muestreo aleatorio simple?", back: "Cada elemento de la población tiene exactamente la misma probabilidad de ser elegido, como en un sorteo. Es la base con la que se comparan los demás métodos." }
    ],
    quiz: [
      { q: "¿Cuál es la ventaja principal del muestreo estratificado sobre el aleatorio simple?", options: ["Garantiza que todos los grupos relevantes queden representados en la muestra","Es más barato siempre","No requiere conocer la población"], correct: 0, explanation: "Al muestrear dentro de cada estrato se evita que un grupo pequeño quede fuera por azar." }
    ]
  },
  "1.1.3": {
    flashcards: [
      { front: "¿Cuándo conviene la mediana en vez de la media?", back: "Cuando hay **valores atípicos** o la distribución es muy asimétrica: un solo dato enorme jala la media, pero casi no mueve la mediana. Por eso el ingreso se reporta con mediana." },
      { front: "¿Un conjunto puede tener más de una moda?", back: "Sí. Si dos valores empatan en frecuencia máxima es **bimodal**; si ninguno se repite, se dice que no tiene moda." }
    ],
    quiz: [
      { q: "En una empresa, nueve empleados ganan $8,000 y el dueño gana $500,000. ¿Qué medida describe mejor el sueldo típico?", options: ["La mediana","La media","El rango"], correct: 0, explanation: "El sueldo del dueño es un valor atípico que dispara la media; la mediana ($8,000) refleja lo que gana la mayoría." },
      { q: "Si a todos los datos de un conjunto se les suma 5, ¿qué pasa con la media?", options: ["Aumenta 5 unidades","No cambia","Se multiplica por 5"], correct: 0, explanation: "Sumar una constante a cada dato desplaza el centro de la distribución en esa misma cantidad." },
      { q: "Un conjunto de datos tiene los valores 3, 3, 7, 7, 9. Este conjunto es:", options: ["Bimodal","Sin moda","Unimodal con moda 9"], correct: 0, explanation: "El 3 y el 7 se repiten dos veces cada uno: hay dos modas." }
    ]
  },
  "1.1.4": {
    flashcards: [
      { front: "¿Qué significa una desviación estándar de 0?", back: "Que todos los datos son iguales entre sí y coinciden con la media: no hay dispersión alguna." }
    ],
    quiz: [
      { q: "Dos grupos tienen media 8. El grupo A tiene desviación estándar 0.5 y el B, 2.5. ¿Qué se concluye?", options: ["Las calificaciones del grupo A son más parejas entre sí","El grupo B tiene mejor promedio","El grupo A tiene más alumnos"], correct: 0, explanation: "Con la misma media, menor desviación estándar significa datos más concentrados alrededor de ella." },
      { q: "¿Por qué se prefiere la desviación estándar sobre la varianza para interpretar datos?", options: ["Porque está en las mismas unidades que los datos originales","Porque siempre es un número entero","Porque es más fácil de calcular"], correct: 0, explanation: "La varianza queda en unidades al cuadrado (pesos², cm²); su raíz devuelve la escala original." }
    ]
  },
  "1.2.1": {
    leccion: "Antes de las fórmulas de permutación y combinación está el **principio multiplicativo del conteo**: si una tarea se hace por etapas y cada etapa tiene su propio número de opciones, el total de resultados es el producto de esas opciones. Con 4 camisas y 3 pantalones hay 4 × 3 = 12 combinaciones distintas; con 4 camisas, 3 pantalones y 2 pares de zapatos, 4 × 3 × 2 = 24. Es la herramienta para los reactivos que describen un menú, una placa o una contraseña armada por partes. También conviene tener presente que **0! = 1** por definición: no es un capricho, es lo que hace que nPr y nCr sigan dando el resultado correcto en los casos extremos (por ejemplo, al elegir los n elementos de un grupo de n).",
    flashcards: [
      { front: "¿Qué es el principio multiplicativo del conteo?", back: "Si una tarea se hace en etapas con m y n opciones, el total de resultados es m × n. Ejemplo: 4 camisas y 3 pantalones dan 12 combinaciones." },
      { front: "¿Cuánto vale 0!?", back: "Por definición, 0! = 1. Sirve para que las fórmulas de permutaciones y combinaciones funcionen en los casos extremos." }
    ],
    quiz: [
      { q: "Un menú ofrece 3 sopas, 4 guisados y 2 postres. ¿Cuántas comidas distintas de tres tiempos se pueden armar?", options: ["24","9","12"], correct: 0, explanation: "Por el principio multiplicativo: 3 × 4 × 2 = 24 combinaciones posibles." },
      { q: "¿Cuál es la relación entre nPr y nCr?", options: ["nPr = nCr × r!, porque la permutación además ordena cada selección","Son siempre iguales","nCr es siempre mayor que nPr"], correct: 0, explanation: "Cada combinación de r elementos puede ordenarse de r! maneras distintas." },
      { q: "Para formar una contraseña de 4 dígitos donde los números pueden repetirse, ¿cuántas opciones hay?", options: ["10⁴ = 10,000","10P4 = 5,040","10C4 = 210"], correct: 0, explanation: "Al permitirse la repetición no aplica la permutación: hay 10 opciones en cada una de las 4 posiciones." }
    ]
  },
  "1.2.2": {
    flashcards: [
      { front: "¿Qué valores puede tomar una probabilidad?", back: "Siempre entre 0 y 1 (o entre 0% y 100%). 0 significa imposible y 1, seguro. Un resultado fuera de ese rango indica un error de cálculo." },
      { front: "¿Qué es la probabilidad complementaria?", back: "P(no A) = 1 - P(A). Es el atajo para los problemas de 'al menos uno': calcular la probabilidad de que no ocurra ninguno y restarla de 1." }
    ],
    quiz: [
      { q: "Si la probabilidad de que llueva es 0.3, ¿cuál es la probabilidad de que NO llueva?", options: ["0.7","0.3","1.3"], correct: 0, explanation: "El complemento se obtiene restando de 1: 1 - 0.3 = 0.7." },
      { q: "Se lanzan dos monedas. ¿Cuál es la probabilidad de obtener al menos un águila?", options: ["3/4","1/2","1/4"], correct: 0, explanation: "Los cuatro resultados posibles son AA, AS, SA, SS; solo SS no tiene águila, así que 3/4." },
      { q: "Se lanza una moneda cinco veces y sale sol las cinco. ¿Cuál es la probabilidad de que el sexto lanzamiento sea águila?", options: ["1/2, porque los lanzamientos son independientes","Mayor que 1/2, porque 'toca' águila","Menor que 1/2"], correct: 0, explanation: "La moneda no recuerda los resultados anteriores: creer lo contrario es la falacia del jugador." }
    ]
  },
  "1.2.3": {
    flashcards: [
      { front: "¿Cuándo son independientes dos eventos?", back: "Cuando la ocurrencia de uno no cambia la probabilidad del otro: P(A|B) = P(A). Sacar una carta y regresarla al mazo mantiene la independencia; no regresarla la rompe." },
      { front: "Fórmula de la probabilidad condicional", back: "P(A|B) = P(A y B) / P(B): entre los casos en que ocurrió B, la proporción en que además ocurrió A." }
    ],
    quiz: [
      { q: "¿Qué significa la notación P(A|B)?", options: ["La probabilidad de que ocurra A dado que ya ocurrió B","La probabilidad de que ocurran A y B a la vez","La probabilidad de que ocurra A o B"], correct: 0, explanation: "La barra vertical indica condición: se restringe el espacio muestral a los casos donde ocurrió B." },
      { q: "Se extraen dos cartas de una baraja SIN reemplazo. Los eventos son:", options: ["Dependientes, porque la primera extracción cambia el mazo","Independientes","Mutuamente excluyentes"], correct: 0, explanation: "Al no regresar la carta cambian tanto los casos favorables como los posibles de la segunda extracción." },
      { q: "En un grupo, 60% son mujeres y 30% del total son mujeres que practican deporte. ¿Qué probabilidad hay de que una mujer elegida al azar practique deporte?", options: ["0.5","0.3","0.18"], correct: 0, explanation: "P(deporte|mujer) = 0.30 / 0.60 = 0.5, es decir, la mitad de las mujeres del grupo." }
    ]
  },
  "1.3.1": {
    leccion: "Dos precisiones sobre el vocabulario de una expresión algebraica, porque el examen pregunta por los nombres de sus partes. En **4x + 7**, el número que multiplica a la variable (el 4) es el **coeficiente**, y el número que va solo, sin variable (el 7), es el **término independiente**: es justo el valor fijo del que habla la nota. Además hay que distinguir **expresión** de **ecuación**: una expresión solo representa una cantidad (3x + 5) y no se resuelve; una ecuación afirma una igualdad entre dos expresiones (3x + 5 = 20) y por eso sí tiene solución.",
    flashcards: [
      { front: "¿Qué diferencia hay entre expresión y ecuación?", back: "La **expresión** solo representa una cantidad (3x + 5); la **ecuación** afirma una igualdad entre dos expresiones (3x + 5 = 20) y por eso se puede resolver." },
      { front: "¿Qué es el coeficiente y qué es el término independiente?", back: "En 4x + 7, el **coeficiente** es el 4 que multiplica a la variable, y el **término independiente** es el 7, que no depende de x." }
    ],
    quiz: [
      { q: "Si x es la edad de Ana y Luis tiene 3 años menos que el doble de la edad de Ana, ¿qué expresión representa la edad de Luis?", options: ["2x - 3","2(x - 3)","3 - 2x"], correct: 0, explanation: "Primero el doble (2x) y luego se le restan 3 años: 2x - 3." },
      { q: "Un taxi cobra $12 de banderazo más $8 por kilómetro. ¿Qué expresión representa el costo de un viaje de k kilómetros?", options: ["12 + 8k","8 + 12k","20k"], correct: 0, explanation: "El banderazo es fijo y los $8 se multiplican por la cantidad de kilómetros recorridos." }
    ]
  },
  "1.3.2": {
    flashcards: [
      { front: "¿Cuál es el primer paso al factorizar cualquier expresión?", back: "Buscar el **factor común** a todos los términos y sacarlo. Después se revisa si lo que queda es una diferencia de cuadrados, un trinomio cuadrado perfecto u otro caso." },
      { front: "¿Cómo se reconoce un trinomio cuadrado perfecto?", back: "El primero y el tercer término son cuadrados perfectos y el del medio es el doble producto de sus raíces: x² + 10x + 25 = (x + 5)²." }
    ],
    quiz: [
      { q: "¿Se puede factorizar x² + 9 sobre los números reales?", options: ["No, la suma de cuadrados no se factoriza en los reales","Sí, como (x + 3)(x - 3)","Sí, como (x + 3)²"], correct: 0, explanation: "Solo la DIFERENCIA de cuadrados se factoriza; (x+3)(x-3) da x² - 9 y (x+3)² da x² + 6x + 9." },
      { q: "¿Para qué sirve factorizar una ecuación cuadrática?", options: ["Para encontrar sus raíces igualando cada factor a cero","Para aumentar su grado","Para eliminar la variable"], correct: 0, explanation: "Si un producto vale cero, alguno de sus factores vale cero: de ahí salen las soluciones." },
      { q: "El trinomio x² + 12x + 36 se factoriza como:", options: ["(x + 6)²","(x + 12)(x + 3)","(x + 6)(x - 6)"], correct: 0, explanation: "36 = 6² y 12x = 2·6·x: es un trinomio cuadrado perfecto." }
    ]
  },
  "1.3.3": {
    flashcards: [
      { front: "¿Cuál es el error más común al desarrollar (a + b)²?", back: "Escribir a² + b² olvidando el doble producto. Lo correcto es a² + 2ab + b²: el término del medio nunca desaparece." }
    ],
    quiz: [
      { q: "¿Por qué (x + 4)² NO es igual a x² + 16?", options: ["Porque falta el doble producto 8x","Porque 4² no es 16","Porque el exponente debería ser 3"], correct: 0, explanation: "El desarrollo correcto es x² + 2(4)x + 16 = x² + 8x + 16." },
      { q: "El producto (2x + 5)(2x - 5) da como resultado:", options: ["4x² - 25","4x² + 25","4x² - 20x - 25"], correct: 0, explanation: "Son binomios conjugados: el resultado es la diferencia de los cuadrados, (2x)² - 5²." },
      { q: "¿Qué producto notable permite calcular mentalmente 102 × 98?", options: ["Binomios conjugados: (100+2)(100-2) = 10,000 - 4 = 9,996","El binomio al cuadrado","El binomio al cubo"], correct: 0, explanation: "Reconocer la estructura de conjugados convierte una multiplicación larga en una resta simple." }
    ]
  },
  "1.3.4": {
    flashcards: [
      { front: "¿Qué operación conserva la igualdad en una ecuación?", back: "Cualquiera que se aplique a **los dos lados**: sumar, restar, multiplicar o dividir (entre un número distinto de cero). Ese es el principio de todo despeje." },
      { front: "¿Qué significa que una ecuación no tenga solución?", back: "Que al despejar se llega a una contradicción, como 0 = 5. Si en cambio se llega a 0 = 0, la ecuación tiene infinitas soluciones." }
    ],
    quiz: [
      { q: "Al resolver una ecuación se llega a 3 = 7. ¿Qué significa?", options: ["Que la ecuación no tiene solución","Que la solución es x = 4","Que hay infinitas soluciones"], correct: 0, explanation: "Se llegó a una contradicción: ningún valor de x satisface la igualdad original." },
      { q: "La suma de tres números consecutivos es 72. ¿Cuál es el menor?", options: ["23","24","22"], correct: 0, explanation: "x + (x+1) + (x+2) = 72 → 3x + 3 = 72 → x = 23, y los números son 23, 24 y 25." },
      { q: "¿Cuál es el primer paso recomendable para resolver 2(x - 3) = 4x + 8?", options: ["Aplicar la propiedad distributiva del lado izquierdo","Dividir todo entre 4","Sumar 3 a los dos lados"], correct: 0, explanation: "Conviene eliminar el paréntesis antes de agrupar términos semejantes: 2x - 6 = 4x + 8." }
    ]
  },
  "1.3.5": {
    flashcards: [
      { front: "¿Cuál es la fórmula general de la ecuación cuadrática?", back: "x = (-b ± √(b² - 4ac)) / (2a), para ax² + bx + c = 0. Sirve siempre, incluso cuando el trinomio no se puede factorizar con enteros." },
      { front: "¿Qué indica el discriminante b² - 4ac?", back: "Si es **positivo**, hay dos soluciones reales distintas; si es **cero**, una solución doble; si es **negativo**, no hay soluciones reales." }
    ],
    quiz: [
      { q: "El discriminante de una ecuación cuadrática vale -16. ¿Cuántas soluciones reales tiene?", options: ["Ninguna","Una","Dos"], correct: 0, explanation: "Con discriminante negativo la raíz cuadrada no es un número real: la parábola no cruza el eje X." },
      { q: "En la ecuación 2x² - 5x + 3 = 0, ¿cuáles son los valores de a, b y c?", options: ["a = 2, b = -5, c = 3","a = 2, b = 5, c = 3","a = 5, b = 2, c = 3"], correct: 0, explanation: "Los coeficientes se toman con su signo tal como aparecen en la forma ax² + bx + c = 0." },
      { q: "¿Qué representan gráficamente las soluciones de una ecuación cuadrática?", options: ["Los puntos donde la parábola cruza el eje X","El vértice de la parábola","La pendiente de la curva"], correct: 0, explanation: "Resolver ax² + bx + c = 0 es buscar los valores de x donde la altura y vale cero." }
    ]
  },
  "1.3.6": {
    flashcards: [
      { front: "¿Qué métodos hay para resolver un sistema de 2×2?", back: "**Sustitución** (despejar una variable y sustituirla), **igualación** (despejar la misma variable en ambas y igualar), **eliminación o suma-resta** y el método **gráfico**." },
      { front: "¿Qué significa que dos rectas sean paralelas en un sistema?", back: "Que el sistema no tiene solución (es incompatible). Si las rectas coinciden, hay infinitas soluciones; si se cruzan en un punto, hay solución única." }
    ],
    quiz: [
      { q: "Al resolver un sistema de dos ecuaciones se obtiene 0 = 8. ¿Qué se concluye?", options: ["El sistema no tiene solución: las rectas son paralelas","Hay infinitas soluciones","La solución es x = 8"], correct: 0, explanation: "La contradicción indica que no existe ningún par (x, y) que cumpla las dos ecuaciones a la vez." },
      { q: "En una tienda, 3 cuadernos y 2 plumas cuestan $86, y 1 cuaderno y 4 plumas cuestan $72. ¿Cuánto cuesta un cuaderno?", options: ["$20","$13","$26"], correct: 0, explanation: "Del sistema 3c + 2p = 86 y c + 4p = 72 se obtiene c = 20 y p = 13; comprobando: 3(20) + 2(13) = 86." },
      { q: "Gráficamente, la solución de un sistema de dos ecuaciones lineales es:", options: ["El punto donde se cruzan las dos rectas","La pendiente común de ambas rectas","El área entre las rectas"], correct: 0, explanation: "Ese punto es el único par de valores que satisface las dos ecuaciones simultáneamente." }
    ]
  },
  "1.3.7": {
    flashcards: [
      { front: "Fórmulas del interés simple", back: "I = C·i·t (interés) y M = C + I = C(1 + i·t) (monto). Ojo: la tasa y el tiempo deben estar en la misma unidad (si la tasa es anual, t va en años)." },
      { front: "¿Qué pasa si la tasa es anual y el plazo está en meses?", back: "Hay que convertir: t = meses/12, o dividir la tasa anual entre 12 para volverla mensual. Mezclar unidades es el error más frecuente." }
    ],
    quiz: [
      { q: "Se prestan $6,000 al 12% anual simple durante 6 meses. ¿Cuánto interés se genera?", options: ["$360","$720","$60"], correct: 0, explanation: "Seis meses son 0.5 años: I = 6,000 × 0.12 × 0.5 = $360." },
      { q: "En el interés simple, ¿sobre qué monto se calculan los intereses de cada periodo?", options: ["Siempre sobre el capital inicial","Sobre el capital más los intereses acumulados","Sobre el monto final"], correct: 0, explanation: "Esa es justo la diferencia con el interés compuesto, donde los intereses también generan intereses." },
      { q: "Un capital de $10,000 genera $1,500 de interés simple en 3 años. ¿Cuál es la tasa anual?", options: ["5%","15%","1.5%"], correct: 0, explanation: "De I = C·i·t: 1,500 = 10,000 · i · 3, de donde i = 0.05, es decir, 5% anual." }
    ]
  },
  "1.3.8": {
    flashcards: [
      { front: "Fórmula del interés compuesto", back: "M = C(1 + i)^t, donde i es la tasa por periodo y t el número de periodos. El interés generado es I = M - C." },
      { front: "¿Qué pasa si la capitalización es mensual y la tasa es anual?", back: "Se divide la tasa entre 12 y se multiplica el plazo por 12: M = C(1 + i/12)^(12t). A mayor frecuencia de capitalización, mayor monto final." }
    ],
    quiz: [
      { q: "¿Por qué el interés compuesto produce más que el simple con la misma tasa y plazo?", options: ["Porque los intereses ganados también generan intereses en los periodos siguientes","Porque la tasa se duplica automáticamente","Porque el capital inicial aumenta por sí solo"], correct: 0, explanation: "En cada periodo la base de cálculo crece: es el efecto del interés sobre el interés." },
      { q: "Un capital se invierte al 10% anual compuesto. ¿Cuánto vale $1 después de 2 años?", options: ["$1.21","$1.20","$1.10"], correct: 0, explanation: "1 × 1.10² = 1.21; con interés simple habrían sido solo $1.20." },
      { q: "Si la tasa anual es del 24% con capitalización mensual, la tasa por periodo es:", options: ["2%","24%","12%"], correct: 0, explanation: "Se divide la tasa anual entre el número de periodos del año: 24% ÷ 12 = 2% mensual." }
    ]
  },
  "1.4.1": {
    flashcards: [
      { front: "¿Cómo se calcula el MCM por descomposición?", back: "Se descomponen los números en factores primos y se toman **todos** los factores con su **mayor** exponente. Para el MCD se toman solo los comunes con el menor exponente." },
      { front: "¿Qué relación hay entre MCM y MCD?", back: "MCM(a,b) × MCD(a,b) = a × b. Sirve para obtener uno cuando ya se conoce el otro." }
    ],
    quiz: [
      { q: "¿Cuándo se usa el MCM en un problema de la vida diaria?", options: ["Cuando algo se repite en ciclos y se busca la próxima coincidencia","Cuando se reparte algo en grupos iguales lo más grandes posible","Cuando se calcula un promedio"], correct: 0, explanation: "Camiones que salen cada cierto tiempo, luces que parpadean, ciclos que se sincronizan: todos son MCM." },
      { q: "Si MCD(12, 18) = 6, ¿cuánto vale MCM(12, 18)?", options: ["36","216","108"], correct: 0, explanation: "MCM = (12 × 18) / 6 = 216/6 = 36." },
      { q: "El MCM de dos números primos distintos, como 7 y 11, es:", options: ["Su producto: 77","El menor de los dos: 7","1"], correct: 0, explanation: "Al no compartir factores, el mínimo común múltiplo es simplemente el producto." }
    ]
  },
  "1.4.2": {
    flashcards: [
      { front: "¿Qué son dos números primos entre sí?", back: "Aquellos cuyo MCD es 1, es decir, no comparten ningún factor primo. Ejemplo: 8 y 15, aunque ninguno de los dos sea primo por separado." },
      { front: "¿Para qué sirve el MCD al simplificar fracciones?", back: "Dividir numerador y denominador entre su MCD deja la fracción en su forma irreducible en un solo paso." }
    ],
    quiz: [
      { q: "¿En qué situación se usa el MCD?", options: ["Al repartir cantidades en grupos iguales lo más grandes posible sin que sobre nada","Al buscar cuándo coinciden dos ciclos","Al calcular un porcentaje"], correct: 0, explanation: "Cortar listones, armar paquetes iguales o formar equipos parejos sin sobrantes son problemas de MCD." },
      { q: "Para simplificar la fracción 24/36, ¿entre qué número conviene dividir?", options: ["Entre 12, que es su MCD","Entre 2, que es el menor divisor","Entre 72, que es su MCM"], correct: 0, explanation: "24/12 = 2 y 36/12 = 3, así que la fracción irreducible es 2/3 en un solo paso." },
      { q: "¿Cuál es el MCD de 14 y 25?", options: ["1, son primos entre sí","7","350"], correct: 0, explanation: "14 = 2×7 y 25 = 5²: no comparten factores, así que su MCD es 1." }
    ]
  },
  "1.4.3": {
    leccion: "Junto a las sucesiones conviene tener claros dos términos que el examen usa mucho. Una **razón** compara dos cantidades (3:5, que se lee «3 es a 5»). Una **proporción** es la igualdad entre dos razones: 3/5 = 6/10. Su **propiedad fundamental** es que en a/b = c/d el producto de los extremos vale lo mismo que el de los medios, es decir **a·d = b·c**. De ahí sale la regla de tres: para despejar la incógnita se multiplica en cruz y se divide entre el número que la acompaña.",
    flashcards: [
      { front: "¿Qué diferencia hay entre razón y proporción?", back: "La **razón** compara dos cantidades (3:5). La **proporción** es la igualdad entre dos razones (3/5 = 6/10) y permite despejar el valor desconocido." }
    ]
  },
  "1.4.4": {
    flashcards: [
      { front: "¿Cómo se distingue la proporcionalidad directa de la inversa?", back: "En la **directa**, si una cantidad aumenta la otra también, y el cociente y/x es constante. En la **inversa**, si una aumenta la otra disminuye, y el producto x·y es constante." },
      { front: "¿Cómo se ven gráficamente?", back: "La proporcionalidad directa es una **recta que pasa por el origen**; la inversa es una **hipérbola** que se acerca a los ejes sin tocarlos." }
    ],
    quiz: [
      { q: "¿Cuál de estas relaciones es de proporcionalidad INVERSA?", options: ["La velocidad y el tiempo para recorrer una distancia fija","El número de kilos comprados y lo que se paga","Las horas trabajadas y el sueldo por hora fija"], correct: 0, explanation: "A mayor velocidad, menos tiempo: el producto velocidad × tiempo se mantiene constante." },
      { q: "En una proporcionalidad directa, si x se duplica, ¿qué le pasa a y?", options: ["También se duplica","Se reduce a la mitad","Queda igual"], correct: 0, explanation: "En y = kx, multiplicar x por 2 multiplica y por 2: el cociente y/x no cambia." },
      { q: "Una alberca se llena con 6 llaves en 8 horas. ¿Cuánto tardarían 4 llaves con el mismo caudal?", options: ["12 horas","6 horas","5.33 horas"], correct: 0, explanation: "Es proporcionalidad inversa: 6 × 8 = 48 llaves-hora, así que 48 ÷ 4 = 12 horas." }
    ]
  },
  "1.4.5": {
    flashcards: [
      { front: "¿Cómo se calcula el porcentaje que representa una parte del total?", back: "(parte ÷ total) × 100. Ejemplo: 18 de 40 aciertos son (18/40) × 100 = 45%." },
      { front: "¿Dos descuentos sucesivos del 20% equivalen a uno del 40%?", back: "No. El segundo 20% se aplica al precio ya rebajado: 0.8 × 0.8 = 0.64, es decir, un descuento total del 36%." }
    ],
    quiz: [
      { q: "Un producto sube 20% y después baja 20%. ¿Cómo queda respecto al precio original?", options: ["Queda 4% más barato","Queda igual","Queda 4% más caro"], correct: 0, explanation: "1.20 × 0.80 = 0.96: la baja se aplica sobre un precio mayor, así que no se compensan." },
      { q: "Un estudiante obtuvo 27 aciertos de 45 reactivos. ¿Qué porcentaje logró?", options: ["60%","45%","27%"], correct: 0, explanation: "(27 ÷ 45) × 100 = 60%." },
      { q: "Al precio de $500 se le agrega 16% de IVA. ¿Cuál es el total a pagar?", options: ["$580","$516","$484"], correct: 0, explanation: "500 × 1.16 = $580; el IVA de $80 se suma al precio base." }
    ]
  },
  "1.5.1": {
    flashcards: [
      { front: "¿Cuál es la diferencia entre área y perímetro?", back: "El **perímetro** mide el contorno (unidades lineales: cm, m) y el **área** mide la superficie encerrada (unidades cuadradas: cm², m²)." }
    ]
  },
  "1.5.2": {
    flashcards: [
      { front: "¿Cuál es la diferencia entre figuras congruentes y semejantes?", back: "Las **congruentes** tienen la misma forma y el mismo tamaño; las **semejantes** tienen la misma forma pero distinto tamaño, con lados proporcionales y ángulos iguales." },
      { front: "¿Qué criterios prueban la semejanza de triángulos?", back: "**AA** (dos ángulos iguales), **LLL** (tres lados proporcionales) y **LAL** (dos lados proporcionales con el ángulo entre ellos igual)." }
    ],
    quiz: [
      { q: "Dos triángulos tienen ángulos de 40° y 60° cada uno. ¿Qué se puede afirmar?", options: ["Son semejantes por el criterio AA","Son congruentes","No se puede saber nada"], correct: 0, explanation: "Si dos ángulos coinciden, el tercero también, y los lados quedan necesariamente proporcionales." },
      { q: "¿Qué se conserva siempre entre dos figuras semejantes?", options: ["La medida de sus ángulos","La longitud de sus lados","Su área"], correct: 0, explanation: "La forma se mantiene: los ángulos son iguales y los lados, proporcionales." }
    ]
  },
  "1.5.3": {
    flashcards: [
      { front: "¿En qué triángulos se puede aplicar el teorema de Pitágoras?", back: "Solo en los **rectángulos** (los que tienen un ángulo de 90°). La hipotenusa es siempre el lado opuesto al ángulo recto y el más largo." },
      { front: "¿Cómo se verifica si un triángulo es rectángulo?", back: "Comprobando si el cuadrado del lado mayor es igual a la suma de los cuadrados de los otros dos. Si lo es, el triángulo es rectángulo." }
    ],
    quiz: [
      { q: "¿Un triángulo de lados 6, 8 y 10 cm es rectángulo?", options: ["Sí, porque 6² + 8² = 10²","No, porque no son múltiplos de 5","No se puede determinar"], correct: 0, explanation: "36 + 64 = 100 = 10²: cumple el teorema de Pitágoras, así que es rectángulo." },
      { q: "En un triángulo rectángulo, la hipotenusa siempre es:", options: ["El lado más largo, opuesto al ángulo recto","El lado más corto","Cualquiera de los tres lados"], correct: 0, explanation: "Al ser opuesta al mayor ángulo (90°), es necesariamente el lado de mayor longitud." },
      { q: "Se quiere saber cuántos metros de cable se necesitan para ir de la punta de un poste de 12 m a un punto en el suelo a 5 m de su base. ¿Cuánto mide el cable?", options: ["13 m","17 m","7 m"], correct: 0, explanation: "√(12² + 5²) = √169 = 13 m: el poste y el suelo forman un ángulo recto." }
    ]
  },
  "1.5.4": {
    flashcards: [
      { front: "¿Cómo se calcula la distancia entre dos puntos del plano?", back: "d = √((x₂-x₁)² + (y₂-y₁)²). Es el teorema de Pitágoras aplicado al triángulo que forman las diferencias horizontales y verticales." }
    ],
    quiz: [
      { q: "¿Cuál es la distancia entre los puntos (1, 2) y (4, 6)?", options: ["5","7","25"], correct: 0, explanation: "√((4-1)² + (6-2)²) = √(9 + 16) = √25 = 5." }
    ]
  },
  "1.6.1": {
    flashcards: [
      { front: "¿Cuándo se invierte el sentido de una desigualdad?", back: "Al multiplicar o dividir ambos lados por un número **negativo**. Sumar o restar nunca cambia el sentido." },
      { front: "¿Cómo se escribe un intervalo infinito?", back: "El infinito siempre lleva paréntesis, nunca corchete: [3, ∞) o (-∞, 5], porque el infinito no es un número que se pueda incluir." }
    ],
    quiz: [
      { q: "Al resolver -2x > 8, la solución es:", options: ["x < -4","x > -4","x > 4"], correct: 0, explanation: "Al dividir entre -2 (negativo) se invierte el signo de la desigualdad." },
      { q: "El conjunto de números mayores o iguales a -3 y menores que 7 se escribe:", options: ["[-3, 7)","(-3, 7]","[-3, 7]"], correct: 0, explanation: "El corchete incluye el -3 (≥) y el paréntesis excluye el 7 (<)." },
      { q: "'Para entrar se requiere tener al menos 18 años' se expresa como:", options: ["edad ≥ 18","edad > 18","edad ≤ 18"], correct: 0, explanation: "'Al menos' incluye el valor mencionado, así que corresponde a mayor o igual que." }
    ]
  },
  "1.6.2": {
    flashcards: [
      { front: "¿Qué es el dominio y el rango de una función?", back: "El **dominio** son todos los valores que puede tomar x; el **rango**, los valores resultantes de y. En f(x)=1/x el dominio excluye el 0." },
      { front: "¿Cómo se sabe si una gráfica corresponde a una función?", back: "Con la **prueba de la recta vertical**: si alguna recta vertical corta la gráfica en más de un punto, no es función, porque una x tendría dos valores de y." }
    ],
    quiz: [
      { q: "¿Qué le pasa a la gráfica de y = mx + b si m es negativa?", options: ["La recta es descendente de izquierda a derecha","La recta es horizontal","La recta sube de izquierda a derecha"], correct: 0, explanation: "Una pendiente negativa significa que y disminuye conforme x aumenta." },
      { q: "En f(x) = x², ¿cuál es el rango?", options: ["Todos los números mayores o iguales a 0","Todos los números reales","Solo los números negativos"], correct: 0, explanation: "El cuadrado de cualquier número real nunca es negativo, así que y ≥ 0." },
      { q: "Una recta horizontal (y = 4) tiene pendiente:", options: ["Cero","Indefinida","Uno"], correct: 0, explanation: "No hay cambio en y al avanzar en x: m = 0. La pendiente indefinida corresponde a las rectas verticales." }
    ]
  },
  "1.6.3": {
    flashcards: [
      { front: "¿Qué significa lím f(x) cuando x tiende a a?", back: "El valor al que se acerca la función cuando x se aproxima a **a**, sin importar lo que pase exactamente en x = a. La función puede ni siquiera estar definida ahí." },
      { front: "¿Qué se hace ante una indeterminación 0/0?", back: "No se concluye que el límite no existe: se factoriza, se simplifica o se racionaliza para eliminar el factor que anula el denominador, y luego se sustituye." }
    ],
    quiz: [
      { q: "¿Qué indica una indeterminación de la forma 0/0 al evaluar un límite?", options: ["Que hay que transformar la expresión antes de concluir","Que el límite es cero","Que el límite no existe"], correct: 0, explanation: "Es una señal de que la sustitución directa no basta: hay que factorizar o racionalizar." },
      { q: "¿Cuál es el límite de f(x) = 5 cuando x tiende a 3?", options: ["5","3","0"], correct: 0, explanation: "En una función constante el valor no depende de x: el límite es la propia constante." },
      { q: "Los límites son la base para definir:", options: ["La derivada y la continuidad de una función","El teorema de Pitágoras","Las técnicas de conteo"], correct: 0, explanation: "La derivada se define como el límite del cociente incremental cuando el incremento tiende a cero." }
    ]
  },
  "1.6.4": {
    flashcards: [
      { front: "¿Qué representa geométricamente la derivada?", back: "La pendiente de la recta tangente a la curva en un punto, es decir, la rapidez con que cambia la función en ese instante." },
      { front: "¿Cuál es la derivada de una constante y la de x?", back: "La de cualquier constante es **0** (no cambia) y la de x es **1**. De ahí sale toda la regla de la potencia." }
    ],
    quiz: [
      { q: "Si f(x) = 7, ¿cuánto vale f'(x)?", options: ["0","7","1"], correct: 0, explanation: "Una función constante no cambia: su razón de cambio es cero en todo punto." },
      { q: "La derivada de f(x) = x⁵ es:", options: ["5x⁴","x⁴","5x⁶"], correct: 0, explanation: "Regla de la potencia: el exponente baja como coeficiente y se resta 1 al exponente." },
      { q: "Si la posición de un objeto es s(t), ¿qué representa s'(t)?", options: ["Su velocidad instantánea","Su aceleración","La distancia total recorrida"], correct: 0, explanation: "La derivada de la posición respecto al tiempo es la velocidad; derivando otra vez se obtiene la aceleración." }
    ]
  },
  "1.6.5": {
    flashcards: [
      { front: "Regla del producto y del cociente", back: "(f·g)' = f'g + fg'. Y (f/g)' = (f'g - fg')/g². El orden en el cociente importa: el numerador va con la resta." },
      { front: "¿Qué es la regla de la cadena?", back: "Para derivar una función compuesta: se deriva la de afuera dejando lo de adentro igual y se multiplica por la derivada de lo de adentro. [f(g(x))]' = f'(g(x))·g'(x)." }
    ],
    quiz: [
      { q: "¿Cuál es la derivada de f(x) = (3x + 1)⁴?", options: ["12(3x + 1)³","4(3x + 1)³","12(3x + 1)⁴"], correct: 0, explanation: "Regla de la cadena: 4(3x+1)³ multiplicado por la derivada del interior, que es 3." },
      { q: "La derivada de f(x) = tan(x) es:", options: ["sec²(x)","-sec²(x)","cot(x)"], correct: 0, explanation: "Se obtiene aplicando la regla del cociente a sen(x)/cos(x)." },
      { q: "¿Qué regla se necesita para derivar f(x) = x²·sen(x)?", options: ["La regla del producto","Solo la regla de la potencia","La regla del cociente"], correct: 0, explanation: "Es el producto de dos funciones de x: (x²)'sen(x) + x²(sen x)' = 2x·sen(x) + x²cos(x)." }
    ]
  },
  "1.6.6": {
    flashcards: [
      { front: "¿Cuáles son los pasos de un problema de optimización?", back: "1) Escribir la función a maximizar o minimizar; 2) dejarla en una sola variable con la restricción del problema; 3) derivar e igualar a cero; 4) verificar si es máximo o mínimo y responder." },
      { front: "¿Cómo se distingue un máximo de un mínimo?", back: "Con la segunda derivada: si f''(x) < 0 en el punto crítico hay **máximo** (la curva abre hacia abajo); si f''(x) > 0, hay **mínimo**." }
    ],
    quiz: [
      { q: "En un problema de optimización, los puntos críticos se obtienen:", options: ["Igualando la primera derivada a cero","Igualando la función a cero","Derivando dos veces y sumando"], correct: 0, explanation: "Los máximos y mínimos ocurren donde la pendiente de la tangente es horizontal." },
      { q: "Si f'(c) = 0 y f''(c) < 0, entonces en x = c la función tiene:", options: ["Un máximo","Un mínimo","Un punto de inflexión"], correct: 0, explanation: "La segunda derivada negativa indica concavidad hacia abajo: el punto crítico es un máximo." },
      { q: "Entre todos los rectángulos con el mismo perímetro, ¿cuál tiene mayor área?", options: ["El cuadrado","El más alargado","Todos tienen la misma área"], correct: 0, explanation: "Al derivar A = x(P/2 - x) e igualar a cero se obtiene x = P/4: los cuatro lados iguales." }
    ]
  }
};
