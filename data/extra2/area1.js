/* Segundo paquete de ampliación · Área 1 · Pensamiento matemático

   Se concatena después de data/extra/area1.js, así que las tarjetas nuevas
   quedan al final del arreglo y no mueven el índice de las que ya tienen
   progreso guardado. Aquí entra sobre todo lo que el examen pregunta de
   otra forma: casos límite, fórmulas menos usadas y problemas de contexto
   con datos numéricos (los que abren la calculadora científica). */

const AREA1_EXTRA2 = {
  "1.1.1": {
    flashcards: [
      { front: "¿Qué es una variable dicotómica?", back: "Una cualitativa con solo dos categorías posibles: sí/no, hombre/mujer, aprobado/reprobado." }
    ],
    quiz: [
      { q: "¿Cuál de estas variables es dicotómica?", options: ["Tener o no tener licencia de conducir","Nivel de estudios","Estatura en metros"], correct: 0, explanation: "Solo admite dos categorías excluyentes: se tiene o no se tiene." },
      { q: "En una base de datos, la columna «CURP» corresponde a una variable:", options: ["Cualitativa nominal (identificador)","Cuantitativa discreta","Cuantitativa continua"], correct: 0, explanation: "Aunque incluye números, solo identifica personas; no mide ni cuenta nada, así que es nominal." },
      { q: "El tiempo que tarda un corredor en llegar a la meta es una variable:", options: ["Cuantitativa continua","Cuantitativa discreta","Cualitativa ordinal"], correct: 0, explanation: "El tiempo admite todos los decimales intermedios (12.48 s), por eso es continua." }
    ]
  },
  "1.1.2": {
    quiz: [
      { q: "De una lista de 2,000 clientes se elige uno al azar entre los primeros 20 y luego cada 20º. ¿Qué muestreo es y de qué tamaño resulta la muestra?", options: ["Sistemático, 100 clientes","Aleatorio simple, 100 clientes","Sistemático, 20 clientes"], correct: 0, explanation: "Tomar cada k-ésimo elemento es muestreo sistemático; 2,000 ÷ 20 = 100 elementos." }
    ]
  },
  "1.1.3": {
    leccion: "Dos herramientas más para describir el centro de un conjunto de datos. La **media ponderada** se usa cuando los datos no pesan igual: se multiplica cada valor por su peso, se suman los productos y se divide entre la suma de los pesos (es la fórmula del promedio de calificaciones con porcentajes). Los **cuartiles** son los tres valores que parten los datos ordenados en cuatro partes iguales: **Q1** deja por debajo el 25 % de los datos, **Q2** es la mediana y **Q3** deja por debajo el 75 %. Y una propiedad útil: si a todos los datos se les multiplica por una constante, la media y la mediana quedan multiplicadas por esa misma constante.",
    flashcards: [
      { front: "¿Qué es la media ponderada y cuándo se usa?", back: "Cuando cada dato tiene un peso distinto: se multiplica cada valor por su peso, se suman los productos y se divide entre la suma de los pesos. Es la fórmula del promedio de calificaciones con porcentajes." },
      { front: "Si a todos los datos se les multiplica por 3, ¿qué pasa con la media y con la mediana?", back: "Ambas se multiplican por 3. Multiplicar por una constante escala todas las medidas de posición por esa misma constante." }
    ],
    quiz: [
      { q: "Un conjunto ordenado tiene 12 datos. ¿Cómo se obtiene la mediana?", options: ["Promediando el 6º y el 7º valor","Tomando el 6º valor","Tomando el 12º valor"], correct: 0, explanation: "Con una cantidad par de datos, la mediana es el promedio de los dos valores centrales." },
      { q: "En los datos 4, 5, 5, 6, 40 la media es 12 y la mediana 5. ¿Qué indica esa diferencia?", options: ["Que hay un valor atípico que jala la media hacia arriba","Que hubo un error de cálculo","Que los datos son simétricos"], correct: 0, explanation: "El 40 es un dato extremo: afecta mucho a la media y casi nada a la mediana." }
    ]
  },
  "1.1.4": {
    leccion: "Tres medidas de dispersión que el examen agrega a la varianza y la desviación estándar. El **coeficiente de variación** es la desviación estándar dividida entre la media, expresada en porcentaje: sirve para comparar la dispersión de dos conjuntos con unidades o promedios distintos (no es lo mismo variar 5 kg en pesos de 70 kg que en pesos de 5 kg). El **rango intercuartílico** es la diferencia **Q3 − Q1**, es decir el ancho del 50 % central de los datos; como ignora los extremos, resiste los valores atípicos mucho mejor que el rango total. Por último, la **varianza poblacional** divide entre n y la **muestral** entre n − 1, para no subestimar la dispersión real cuando solo se tiene una muestra.",
    flashcards: [
      { front: "¿Qué diferencia hay entre varianza poblacional y muestral?", back: "La poblacional divide entre n; la muestral divide entre n − 1 para no subestimar la dispersión real de la población." }
    ]
  },
  "1.2.1": {
    flashcards: [
      { front: "¿Cómo se distingue rápido una permutación de una combinación en un problema?", back: "Pregunta si al intercambiar dos elementos el resultado cambia. Cargos, lugares y contraseñas cambian → permutación. Equipos, comités y grupos no cambian → combinación." },
      { front: "¿Cuánto vale nCn y nC0?", back: "Ambas valen 1: solo hay una forma de tomar todos los elementos y una sola de no tomar ninguno." },
      { front: "¿Qué son las permutaciones con repetición?", back: "Cuando algunos elementos se repiten, se divide n! entre el factorial de cada grupo repetido. En AMAR: 4!/2! = 12 acomodos distintos." }
    ],
    quiz: [
      { q: "¿Cuántas palabras distintas (con o sin sentido) se pueden formar con las letras de CASA?", options: ["12","24","6"], correct: 0, explanation: "Son 4 letras con la A repetida dos veces: 4!/2! = 24/2 = 12." }
    ]
  },
  "1.2.2": {
    flashcards: [
      { front: "¿Cuándo conviene usar la probabilidad complementaria en vez de la directa?", back: "Cuando es más fácil contar los casos que NO cumplen la condición: P(A) = 1 − P(no A). Es el atajo de los problemas de «al menos uno»." }
    ]
  },
  "1.2.3": {
    flashcards: [
      { front: "¿Qué le pasa al espacio muestral al calcular P(A|B)?", back: "Se reduce solo a los casos donde ya ocurrió B: P(A|B) = P(A y B) / P(B) es la probabilidad de A sabiendo que B pasó." },
      { front: "¿Qué son eventos independientes?", back: "Aquellos donde saber que uno ocurrió no cambia la probabilidad del otro: P(A|B) = P(A) y, por lo tanto, P(A y B) = P(A) × P(B)." },
      { front: "¿Qué cambia entre extraer con y sin reemplazo?", back: "Con reemplazo el total y las proporciones se mantienen, así que los eventos son independientes. Sin reemplazo el total baja en cada extracción y hay que usar probabilidad condicional." }
    ]
  },
  "1.3.1": {
    leccion: "Tres detalles del trabajo con expresiones algebraicas. Primero, el orden al traducir del español: «el doble de un número disminuido en 5» es **2x − 5**, mientras que «el doble de la diferencia de un número y 5» es **2(x − 5)**; el paréntesis cambia el resultado. Segundo, los **términos semejantes** son los que tienen exactamente las mismas letras con los mismos exponentes, y solo ellos se pueden sumar o restar: 3x²y y −7x²y sí se combinan, 3x² y 3x no. Reducir términos semejantes es sumar sus coeficientes y dejar la parte literal igual. Tercero, **evaluar** una expresión es sustituir cada letra por su valor —conviene escribirlo entre paréntesis, sobre todo si el valor es negativo— y resolver respetando la jerarquía de operaciones.",
    flashcards: [
      { front: "¿Cómo se traduce «el doble de un número disminuido en 5»?", back: "2x − 5. Ojo con el orden: «el doble de un número disminuido en 5» es 2x − 5, mientras que «el doble de la diferencia de un número y 5» es 2(x − 5)." }
    ],
    quiz: [
      { q: "La edad de Ana es el triple de la de Beto menos 4 años. Si Beto tiene b años, la edad de Ana es:", options: ["3b − 4","3(b − 4)","b/3 − 4"], correct: 0, explanation: "Primero el triple de la edad de Beto (3b) y a eso se le restan 4 años." },
      { q: "El perímetro de un rectángulo cuyo largo es 3 unidades mayor que su ancho a se expresa como:", options: ["4a + 6","2a + 3","a² + 3a"], correct: 0, explanation: "El largo es a + 3, así que P = 2a + 2(a + 3) = 4a + 6." }
    ]
  },
  "1.3.2": {
    flashcards: [
      { front: "¿Cómo se factoriza una diferencia de cuadrados?", back: "a² − b² = (a + b)(a − b). Se reconoce porque hay dos términos, ambos cuadrados perfectos, restándose." },
      { front: "¿Cómo se factoriza x² + bx + c?", back: "Se buscan dos números que multiplicados den c y sumados den b. En x² + 7x + 12 son 3 y 4: (x + 3)(x + 4)." },
      { front: "¿Qué es un trinomio cuadrado perfecto?", back: "a² ± 2ab + b², que se factoriza como (a ± b)². Se reconoce porque el primero y el último término son cuadrados perfectos y el de en medio es el doble producto." }
    ],
    quiz: [
      { q: "Factoriza 9x² − 25", options: ["(3x + 5)(3x − 5)","(3x − 5)²","(9x + 25)(x − 1)"], correct: 0, explanation: "Es diferencia de cuadrados: √(9x²) = 3x y √25 = 5." },
      { q: "Factoriza x² − 9x + 20", options: ["(x − 4)(x − 5)","(x + 4)(x + 5)","(x − 10)(x + 2)"], correct: 0, explanation: "Se buscan dos números que multiplicados den 20 y sumados den −9: −4 y −5." },
      { q: "¿Cuál es la factorización de x² + 10x + 25?", options: ["(x + 5)²","(x + 25)(x + 1)","(x − 5)²"], correct: 0, explanation: "Es un trinomio cuadrado perfecto: 25 = 5² y 10x = 2(x)(5)." },
      { q: "Al factorizar 2x² + 5x + 3 se obtiene:", options: ["(2x + 3)(x + 1)","(2x + 1)(x + 3)","(x + 5)(2x − 3)"], correct: 0, explanation: "Al desarrollar (2x + 3)(x + 1) = 2x² + 2x + 3x + 3 = 2x² + 5x + 3." }
    ]
  },
  "1.3.3": {
    flashcards: [
      { front: "Producto de binomios con término común", back: "(x + a)(x + b) = x² + (a + b)x + ab. Es el atajo para multiplicar rápido sin hacer todo el desarrollo." },
      { front: "¿Cuál es el error más común al elevar un binomio al cuadrado?", back: "Olvidar el doble producto: (a + b)² NO es a² + b², sino a² + 2ab + b²." }
    ],
    quiz: [
      { q: "Desarrolla (x + 6)²", options: ["x² + 12x + 36","x² + 36","x² + 6x + 36"], correct: 0, explanation: "(a + b)² = a² + 2ab + b²: x² + 2(6)x + 36." },
      { q: "Desarrolla (2x − 3)²", options: ["4x² − 12x + 9","4x² + 9","2x² − 12x + 9"], correct: 0, explanation: "(2x)² = 4x², el doble producto es 2(2x)(−3) = −12x y (−3)² = 9." },
      { q: "¿Cuál es el resultado de (x + 7)(x − 7)?", options: ["x² − 49","x² + 49","x² − 14x − 49"], correct: 0, explanation: "Binomios conjugados: el resultado es la diferencia de cuadrados x² − 49." },
      { q: "Desarrolla (x + 4)(x + 9)", options: ["x² + 13x + 36","x² + 36x + 13","x² + 13x + 13"], correct: 0, explanation: "Término común: x² + (4 + 9)x + (4)(9)." }
    ]
  },
  "1.3.4": {
    flashcards: [
      { front: "¿Cuándo una ecuación lineal no tiene solución o tiene infinitas?", back: "Si al simplificar queda algo falso (5 = 8) no tiene solución; si queda una identidad (0 = 0) tiene infinitas soluciones." },
      { front: "¿Cómo se resuelve una ecuación lineal con fracciones?", back: "Se multiplica toda la ecuación por el mínimo común múltiplo de los denominadores para eliminarlos, y después se despeja normalmente." },
      { front: "¿Cómo se comprueba la solución de una ecuación?", back: "Sustituyendo el valor encontrado en la ecuación original: si los dos lados dan el mismo número, la solución es correcta." }
    ],
    quiz: [
      { q: "Resuelve: 5x − 8 = 3x + 12", options: ["x = 10","x = 2","x = 5"], correct: 0, explanation: "5x − 3x = 12 + 8 → 2x = 20 → x = 10." },
      { q: "Resuelve: (x/3) + 4 = 10", options: ["x = 18","x = 2","x = 42"], correct: 0, explanation: "x/3 = 6, entonces x = 18." },
      { q: "Resuelve: 2(x − 3) = 4x + 10", options: ["x = −8","x = 8","x = −2"], correct: 0, explanation: "2x − 6 = 4x + 10 → −16 = 2x → x = −8." }
    ]
  },
  "1.3.5": {
    flashcards: [
      { front: "¿Qué indica el discriminante b² − 4ac?", back: "Si es positivo hay dos soluciones reales distintas; si es cero hay una sola (raíz doble); si es negativo no hay soluciones reales." },
      { front: "Fórmula general de la ecuación cuadrática", back: "x = (−b ± √(b² − 4ac)) / (2a). Se usa siempre, pero conviene intentar primero factorizar si los números son sencillos." },
      { front: "¿Cómo se resuelve una cuadrática incompleta como ax² + bx = 0?", back: "Se factoriza la x: x(ax + b) = 0, así que una solución es x = 0 y la otra x = −b/a." }
    ],
    quiz: [
      { q: "Resuelve x² − 5x + 6 = 0", options: ["x = 2 y x = 3","x = −2 y x = −3","x = 1 y x = 6"], correct: 0, explanation: "Se factoriza como (x − 2)(x − 3) = 0." },
      { q: "¿Cuántas soluciones reales tiene x² + 2x + 5 = 0?", options: ["Ninguna","Una","Dos"], correct: 0, explanation: "El discriminante es 2² − 4(1)(5) = 4 − 20 = −16, negativo: no hay raíces reales." },
      { q: "Resuelve 2x² − 8 = 0", options: ["x = 2 y x = −2","x = 4 y x = −4","x = 2 únicamente"], correct: 0, explanation: "2x² = 8 → x² = 4 → x = ±2." },
      { q: "En x² − 6x + 9 = 0, ¿qué ocurre con las soluciones?", options: ["Hay una sola solución (x = 3)","Hay dos soluciones distintas","No hay solución real"], correct: 0, explanation: "El discriminante es 36 − 36 = 0: raíz doble x = 3, porque el trinomio es (x − 3)²." }
    ]
  },
  "1.3.6": {
    flashcards: [
      { front: "¿Qué significa geométricamente resolver un sistema de dos ecuaciones lineales?", back: "Encontrar el punto donde se cruzan las dos rectas. Si son paralelas no hay solución; si son la misma recta hay infinitas." },
      { front: "¿En qué consiste el método de sustitución?", back: "Se despeja una incógnita en una ecuación y esa expresión se sustituye en la otra, para quedarse con una sola incógnita." },
      { front: "¿En qué consiste el método de suma y resta (eliminación)?", back: "Se multiplican las ecuaciones para que los coeficientes de una incógnita queden opuestos y al sumarlas esa incógnita desaparece." }
    ],
    quiz: [
      { q: "Resuelve el sistema x + y = 10 y x − y = 4", options: ["x = 7, y = 3","x = 6, y = 4","x = 3, y = 7"], correct: 0, explanation: "Sumando ambas ecuaciones: 2x = 14 → x = 7, y entonces y = 3." },
      { q: "El sistema 2x + 3y = 12 y 4x + 6y = 24 tiene:", options: ["Infinitas soluciones","Una sola solución","Ninguna solución"], correct: 0, explanation: "La segunda ecuación es el doble de la primera: representan la misma recta." },
      { q: "Resuelve: 3x + 2y = 16 y x = 2y", options: ["x = 4, y = 2","x = 2, y = 4","x = 6, y = 3"], correct: 0, explanation: "Sustituyendo x = 2y: 3(2y) + 2y = 16 → 8y = 16 → y = 2 y x = 4." }
    ]
  },
  "1.3.7": {
    flashcards: [
      { front: "¿Qué es el monto en interés simple?", back: "M = C + I = C(1 + it): el capital más los intereses generados. Es lo que se paga o se recibe al final del plazo." },
      { front: "¿Cómo se ajusta la tasa cuando el tiempo no está en años?", back: "La tasa y el tiempo deben estar en la misma unidad: una tasa anual del 24 % es 2 % mensual (24 ÷ 12) o 6 % trimestral (24 ÷ 4)." },
      { front: "¿Cómo se despeja el tiempo en la fórmula de interés simple?", back: "De I = Cit se obtiene t = I / (C · i). Igual se despeja cualquiera de los otros datos." }
    ]
  },
  "1.3.8": {
    leccion: "**Capitalizar** significa sumar los intereses al capital para que en el siguiente periodo ellos también generen intereses: eso es exactamente lo que distingue al interés compuesto del simple y lo que hace que crezca más rápido. Cuando la capitalización ocurre varias veces al año, la fórmula se ajusta a **M = C(1 + i/n)^(n·t)**, donde n es el número de capitalizaciones por año (12 si es mensual, 4 trimestral, 2 semestral) y t los años. Ojo con lo que pide el reactivo: la fórmula entrega el **monto** final; si preguntan solo por el interés ganado hay que restar el capital inicial, **I = M − C**.",
    flashcards: [
      { front: "¿Qué significa capitalizar?", back: "Sumar los intereses al capital para que en el siguiente periodo también generen intereses. Por eso el interés compuesto crece más rápido que el simple." },
      { front: "Fórmula del interés compuesto con capitalizaciones al año", back: "M = C(1 + i/n)^(n·t), donde n es el número de capitalizaciones por año (12 mensual, 4 trimestral, 2 semestral)." },
      { front: "¿Cómo se obtiene solo el interés compuesto ganado?", back: "Se calcula el monto y se le resta el capital inicial: I = M − C. La fórmula da el monto, no el interés." }
    ],
    quiz: [
      { q: "¿En qué se diferencia el interés compuesto del simple?", options: ["En el compuesto los intereses se suman al capital y también generan intereses","En el compuesto la tasa siempre es mayor","En el simple el plazo siempre es más corto"], correct: 0, explanation: "El interés simple se calcula siempre sobre el capital original; el compuesto, sobre el capital acumulado." },
      { q: "Con la misma tasa y plazo, ¿qué inversión rinde más?", options: ["La de interés compuesto","La de interés simple","Rinden exactamente igual"], correct: 0, explanation: "Al capitalizar, los intereses generan nuevos intereses, así que el monto final siempre es mayor (a partir del segundo periodo)." }
    ]
  },
  "1.4.1": {
    flashcards: [
      { front: "¿Cómo se calcula el MCM con descomposición en factores primos?", back: "Se descomponen los números y se toman **todos** los factores primos, cada uno con su **mayor** exponente." },
      { front: "Relación entre MCM y MCD", back: "Para dos números a y b: MCM(a,b) × MCD(a,b) = a × b. Conociendo uno se obtiene el otro." },
      { front: "¿Qué tipo de problemas se resuelven con MCM?", back: "Los de eventos que se repiten y vuelven a coincidir: semáforos, campanadas, vueltas de pista, autobuses que salen cada cierto tiempo." }
    ],
    quiz: [
      { q: "Si dos números son primos entre sí, su MCM es:", options: ["El producto de ambos","El menor de los dos","Siempre 1"], correct: 0, explanation: "Al no compartir factores primos, el MCM incluye todos los factores de ambos: su producto." }
    ]
  },
  "1.4.2": {
    flashcards: [
      { front: "¿Cómo se calcula el MCD con factores primos?", back: "Se descomponen los números y se toman solo los factores primos **comunes**, cada uno con su **menor** exponente." },
      { front: "¿Qué tipo de problemas se resuelven con MCD?", back: "Los de repartir en grupos iguales lo más grandes posible, o cortar piezas del mayor tamaño posible sin que sobre material." },
      { front: "¿Dos números pueden ser primos entre sí sin que ninguno sea primo?", back: "Sí. Basta con que su MCD sea 1, es decir, que no compartan ningún factor primo: 8 y 15 no son primos y aun así son primos entre sí." }
    ],
    quiz: [
      { q: "El MCD de dos números siempre es:", options: ["Menor o igual que el menor de los dos números","Mayor que ambos números","Igual a su producto"], correct: 0, explanation: "Es un divisor de ambos, así que nunca puede pasarse del más pequeño." }
    ]
  },
  "1.4.3": {
    leccion: "Conviene separar dos sentidos de la palabra «razón». La **razón aritmética** compara dos cantidades por resta (a − b: cuánto le falta a una para alcanzar a la otra); la **razón geométrica** las compara por división (a/b: cuántas veces cabe una en la otra). La igualdad entre dos razones geométricas es una **proporción**, a/b = c/d, cuya propiedad fundamental es que el producto de los extremos es igual al de los medios (a·d = b·c). Con eso se resuelve el reparto proporcional: para dividir una cantidad en una razón como 3:2, se suman las partes (3 + 2 = 5), se divide el total entre esa suma para saber cuánto vale una parte y se multiplica por cada número de la razón.",
    flashcards: [
      { front: "¿Qué diferencia hay entre razón aritmética y razón geométrica?", back: "La **aritmética** compara por resta (a − b: cuánto le falta a uno para el otro); la **geométrica** compara por división (a/b: cuántas veces cabe uno en el otro)." }
    ]
  },
  "1.4.4": {
    flashcards: [
      { front: "¿Cómo se reconoce una proporcionalidad directa?", back: "Al aumentar una cantidad, la otra aumenta en la misma medida y el cociente y/x se mantiene constante (esa constante es k)." },
      { front: "¿Cómo se reconoce una proporcionalidad inversa?", back: "Al aumentar una cantidad, la otra disminuye, y el producto x·y se mantiene constante. Ejemplo típico: más trabajadores, menos días." },
      { front: "¿Qué forma tiene la gráfica de cada tipo de proporcionalidad?", back: "La directa es una recta que pasa por el origen (y = kx); la inversa es una hipérbola (y = k/x) que nunca toca los ejes." }
    ],
    quiz: [
      { q: "¿Cuál de estas situaciones es de proporcionalidad inversa?", options: ["El número de personas que comparten un pastel y la porción que le toca a cada una","Los litros de gasolina y su costo","Las horas trabajadas y el sueldo por hora fijo"], correct: 0, explanation: "A más personas, menor porción, y el producto (personas × porción) se mantiene igual al pastel completo." }
    ]
  },
  "1.4.5": {
    flashcards: [
      { front: "¿Cómo se calcula el porcentaje de aumento o descuento en un solo paso?", back: "Aumento del 15 %: multiplicar por 1.15. Descuento del 15 %: multiplicar por 0.85. Evita hacer dos operaciones." },
      { front: "¿Cómo se obtiene el porcentaje de variación?", back: "(valor final − valor inicial) / valor inicial × 100. Si sale negativo, hubo disminución." },
      { front: "¿Por qué dos descuentos sucesivos del 20 % no son un 40 %?", back: "Porque el segundo se aplica sobre el precio ya rebajado: 0.8 × 0.8 = 0.64, es decir, un 36 % de descuento total." }
    ]
  },
  "1.5.1": {
    flashcards: [
      { front: "Área del trapecio", back: "A = (B + b)·h / 2: se suman las bases paralelas, se multiplica por la altura y se divide entre dos." }
    ]
  },
  "1.5.2": {
    flashcards: [
      { front: "¿Qué diferencia hay entre figuras congruentes y semejantes?", back: "**Congruentes**: misma forma y mismo tamaño (todo igual). **Semejantes**: misma forma pero distinto tamaño; los ángulos son iguales y los lados son proporcionales." },
      { front: "Criterios de semejanza de triángulos", back: "**AA** (dos ángulos iguales), **LLL** (tres lados proporcionales) y **LAL** (dos lados proporcionales con el ángulo entre ellos igual)." },
      { front: "¿Cómo cambian el área y el volumen cuando se escala una figura?", back: "Si los lados se multiplican por k, el área se multiplica por k² y el volumen por k³. Al duplicar los lados, el área se cuadruplica." }
    ],
    quiz: [
      { q: "Si dos triángulos tienen dos ángulos respectivamente iguales, entonces son:", options: ["Semejantes por el criterio AA","Congruentes siempre","Necesariamente equiláteros"], correct: 0, explanation: "Con dos ángulos iguales el tercero también coincide, así que la forma es la misma aunque el tamaño cambie." }
    ]
  },
  "1.5.3": {
    flashcards: [
      { front: "¿Cómo se sabe si un triángulo es rectángulo a partir de sus lados?", back: "Si el cuadrado del lado mayor es igual a la suma de los cuadrados de los otros dos (recíproco del teorema de Pitágoras), el triángulo es rectángulo." },
      { front: "¿Cuáles son las ternas pitagóricas más usadas?", back: "3-4-5, 5-12-13, 8-15-17 y 7-24-25, junto con todos sus múltiplos (6-8-10, 9-12-15...). Reconocerlas ahorra tiempo en el examen." },
      { front: "¿Cómo se calcula la diagonal de un rectángulo?", back: "Es la hipotenusa del triángulo que forman sus lados: d = √(largo² + ancho²)." }
    ],
    quiz: [
      { q: "¿Cuál de estos tríos de lados forma un triángulo rectángulo?", options: ["8, 15 y 17","5, 6 y 8","4, 5 y 7"], correct: 0, explanation: "64 + 225 = 289 = 17²: cumple el teorema de Pitágoras." }
    ]
  },
  "1.5.4": {
    flashcards: [
      { front: "¿De qué teorema sale la fórmula de la distancia entre dos puntos?", back: "De Pitágoras: d = √((x₂ − x₁)² + (y₂ − y₁)²) es la hipotenusa del triángulo que forman las diferencias de coordenadas." },
      { front: "¿Cómo se calcula el área de un triángulo con sus tres vértices?", back: "A = |x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)| / 2. Si el triángulo tiene un lado horizontal y uno vertical, basta con base × altura ÷ 2." }
    ]
  },
  "1.6.1": {
    flashcards: [
      { front: "¿Cuándo se usa corchete y cuándo paréntesis en un intervalo?", back: "El corchete [ ] incluye el extremo (≤ o ≥); el paréntesis ( ) lo excluye (< o >). El infinito siempre lleva paréntesis." },
      { front: "¿Qué pasa al multiplicar o dividir una desigualdad por un número negativo?", back: "El sentido de la desigualdad se invierte: si −2x < 6, entonces x > −3." }
    ],
    quiz: [
      { q: "Resuelve la desigualdad 2x + 5 < 17", options: ["x < 6","x > 6","x < 11"], correct: 0, explanation: "2x < 12, entonces x < 6." },
      { q: "Resuelve −4x ≥ 20", options: ["x ≤ −5","x ≥ −5","x ≤ 5"], correct: 0, explanation: "Al dividir entre −4 se invierte el signo de la desigualdad: x ≤ −5." },
      { q: "El intervalo [2, ∞) corresponde a:", options: ["x ≥ 2","x > 2","x ≤ 2"], correct: 0, explanation: "El corchete en el 2 lo incluye y el intervalo sigue hacia valores mayores." }
    ]
  },
  "1.6.2": {
    flashcards: [
      { front: "¿Qué información da la pendiente de una recta?", back: "Cuánto sube (positiva) o baja (negativa) y por cada unidad que avanza x. Si es cero, la recta es horizontal." },
      { front: "¿Cómo se identifica una parábola por su ecuación?", back: "Tiene término x² (función cuadrática). Si el coeficiente de x² es positivo abre hacia arriba y su vértice es un mínimo; si es negativo abre hacia abajo y es un máximo." },
      { front: "¿Qué son el dominio y el rango de una función?", back: "El **dominio** son todos los valores válidos de x; el **rango**, todos los valores que puede tomar y. En 1/x, el dominio excluye x = 0." }
    ],
    quiz: [
      { q: "¿Dónde corta al eje y la recta y = 2x − 5?", options: ["En (0, −5)","En (0, 2)","En (5, 0)"], correct: 0, explanation: "El corte con el eje y es la ordenada al origen b, que aquí es −5." },
      { q: "La gráfica de y = x² − 4x + 3 es:", options: ["Una parábola que abre hacia arriba","Una recta con pendiente 1","Una parábola que abre hacia abajo"], correct: 0, explanation: "Es cuadrática y el coeficiente de x² es positivo, así que abre hacia arriba." }
    ]
  },
  "1.6.3": {
    flashcards: [
      { front: "¿Qué significa que el límite de f(x) cuando x tiende a a es L?", back: "Que al acercar x al valor a (sin llegar necesariamente a él), los valores de f(x) se acercan tanto como se quiera a L." },
      { front: "¿Qué se hace cuando un límite da la forma 0/0?", back: "Es una indeterminación: hay que factorizar y simplificar (o racionalizar) para eliminar el factor que se anula, y después sustituir." }
    ],
    quiz: [
      { q: "Si al evaluar un límite se obtiene 0/0, eso significa que:", options: ["Hay una indeterminación y se debe simplificar la expresión","El límite no existe","El límite vale cero"], correct: 0, explanation: "0/0 no es un valor: indica que hace falta un procedimiento algebraico antes de concluir." }
    ]
  },
  "1.6.4": {
    flashcards: [
      { front: "¿Qué representa geométricamente la derivada en un punto?", back: "La pendiente de la recta tangente a la curva en ese punto, es decir, la razón de cambio instantánea de la función." },
      { front: "Reglas básicas de derivación de polinomios", back: "La derivada de una constante es 0; la de xⁿ es n·xⁿ⁻¹; la de una suma es la suma de las derivadas, y una constante que multiplica se conserva." },
      { front: "¿Qué es la segunda derivada y para qué sirve?", back: "Es la derivada de la derivada. Indica la concavidad: si es positiva la curva abre hacia arriba (mínimo) y si es negativa hacia abajo (máximo)." }
    ],
    quiz: [
      { q: "¿Cuál es la derivada de f(x) = 5x² − 3x + 7?", options: ["10x − 3","10x − 3x","10x + 7"], correct: 0, explanation: "Se deriva término a término: 10x, −3 y la constante 7 desaparece." }
    ]
  },
  "1.6.5": {
    flashcards: [
      { front: "Derivadas de las funciones trascendentes básicas", back: "(sen x)' = cos x, (cos x)' = −sen x, (eˣ)' = eˣ, (ln x)' = 1/x. Con estas cuatro se resuelve casi todo el examen." },
      { front: "¿Cómo se deriva sen 3x?", back: "Con la regla de la cadena: se deriva la de afuera dejando el interior igual y se multiplica por la derivada del interior. (sen 3x)' = 3cos 3x." },
      { front: "En la derivada de un cociente, ¿qué va primero en el numerador?", back: "u'v, y de ahí se resta uv': (u/v)' = (u'v − uv')/v². El orden importa, a diferencia del producto: (uv)' = u'v + uv'." }
    ],
    quiz: [
      { q: "¿Cuál es la derivada de f(x) = sen x?", options: ["cos x","−cos x","−sen x"], correct: 0, explanation: "Es una derivada básica que conviene memorizar." },
      { q: "¿Cuál es la derivada de f(x) = e^(2x)?", options: ["2e^(2x)","e^(2x)","2x·e^(2x)"], correct: 0, explanation: "Regla de la cadena: la derivada del exponente (2) multiplica a la exponencial." },
      { q: "¿Cuál es la derivada de f(x) = ln(x)?", options: ["1/x","x","ln(x)/x"], correct: 0, explanation: "La derivada del logaritmo natural es el recíproco de x." },
      { q: "Deriva f(x) = x²·sen x", options: ["2x·sen x + x²·cos x","2x·cos x","2x·sen x"], correct: 0, explanation: "Regla del producto: u'v + uv' con u = x² y v = sen x." },
      { q: "¿Cuál es la derivada de f(x) = √x?", options: ["1/(2√x)","2√x","1/√x"], correct: 0, explanation: "√x = x^(1/2), y su derivada es (1/2)x^(−1/2) = 1/(2√x)." }
    ]
  },
  "1.6.6": {
    flashcards: [
      { front: "¿Cuáles son los pasos para resolver un problema de optimización?", back: "1) Escribir la función a maximizar o minimizar; 2) dejarla en una sola variable usando la condición del problema; 3) derivar e igualar a cero; 4) comprobar si es máximo o mínimo." },
      { front: "En una parábola, ¿cómo se sabe de inmediato si el punto crítico es máximo o mínimo?", back: "Por el signo del coeficiente de x²: negativo abre hacia abajo (máximo), positivo abre hacia arriba (mínimo). En general se usa la segunda derivada: f''(x) < 0 es máximo, f''(x) > 0 es mínimo." },
      { front: "¿Dónde está el vértice de una parábola sin derivar?", back: "En x = −b/(2a). Coincide exactamente con el punto crítico que se obtiene al derivar e igualar a cero." }
    ],
    quiz: [
      { q: "En el problema anterior, ¿cuál es la ganancia máxima?", options: ["$500","$300","$800"], correct: 0, explanation: "G(20) = −2(400) + 80(20) − 300 = −800 + 1,600 − 300 = 500." },
      { q: "Se quiere cercar un terreno rectangular con 100 m de malla. ¿Qué dimensiones dan el área máxima?", options: ["25 m × 25 m","40 m × 10 m","30 m × 20 m"], correct: 0, explanation: "Con perímetro fijo, el área máxima de un rectángulo se logra con el cuadrado: 100/4 = 25 m por lado." },
      { q: "Si f'(c) = 0 y f''(c) > 0, entonces en x = c la función tiene:", options: ["Un mínimo","Un máximo","Un punto de inflexión"], correct: 0, explanation: "La segunda derivada positiva indica concavidad hacia arriba, es decir, un valle." }
    ]
  }
};
