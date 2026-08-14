/* Segundo paquete de ampliación · Área 1 · Pensamiento matemático

   Se concatena después de data/extra/area1.js, así que las tarjetas nuevas
   quedan al final del arreglo y no mueven el índice de las que ya tienen
   progreso guardado. Aquí entra sobre todo lo que el examen pregunta de
   otra forma: casos límite, fórmulas menos usadas y problemas de contexto
   con datos numéricos (los que abren la calculadora científica). */

const AREA1_EXTRA2 = {
  "1.1.1": {
    flashcards: [
      { front: "¿Qué es una variable de intervalo y una de razón?", back: "**Intervalo**: los valores tienen orden y distancias iguales, pero el cero es arbitrario (temperatura en °C). **Razón**: además tiene un cero absoluto, así que sí se pueden hacer proporciones (peso, edad, dinero)." },
      { front: "¿Cómo se llama la variable que el investigador manipula y la que se mide?", back: "La que se manipula es la **independiente**; la que responde y se mide es la **dependiente**." },
      { front: "¿Qué es una variable dicotómica?", back: "Una cualitativa con solo dos categorías posibles: sí/no, hombre/mujer, aprobado/reprobado." }
    ],
    quiz: [
      { q: "Un estudio mide cuánto sube la calificación al aumentar las horas de estudio. ¿Cuál es la variable dependiente?", options: ["La calificación obtenida", "Las horas de estudio", "El número de estudiantes"], correct: 0, explanation: "La calificación es lo que responde al cambio; las horas de estudio son la variable independiente que se manipula." },
      { q: "La temperatura medida en grados Celsius es una variable de escala:", options: ["De intervalo", "De razón", "Nominal"], correct: 0, explanation: "Las distancias entre grados son iguales, pero 0 °C no significa ausencia de temperatura, así que no admite razones: 20 °C no es el doble de calor que 10 °C." },
      { q: "¿Cuál de estas variables es dicotómica?", options: ["Tener o no tener licencia de conducir", "Nivel de estudios", "Estatura en metros"], correct: 0, explanation: "Solo admite dos categorías excluyentes: se tiene o no se tiene." },
      { q: "En una base de datos, la columna «CURP» corresponde a una variable:", options: ["Cualitativa nominal (identificador)", "Cuantitativa discreta", "Cuantitativa continua"], correct: 0, explanation: "Aunque incluye números, solo identifica personas; no mide ni cuenta nada, así que es nominal." },
      { q: "El tiempo que tarda un corredor en llegar a la meta es una variable:", options: ["Cuantitativa continua", "Cuantitativa discreta", "Cualitativa ordinal"], correct: 0, explanation: "El tiempo admite todos los decimales intermedios (12.48 s), por eso es continua." }
    ]
  },

  "1.1.2": {
    flashcards: [
      { front: "¿Qué diferencia hay entre población y muestra?", back: "La **población** es el conjunto completo que se quiere estudiar; la **muestra** es la parte de esa población que realmente se observa para estimar lo que pasa en el total." },
      { front: "¿Qué es el muestreo por conveniencia?", back: "Elegir a quien está más a la mano (los compañeros del salón, los que pasan por un pasillo). Es rápido y barato, pero no es probabilístico y suele producir sesgo." },
      { front: "¿Qué pasa con el error de estimación cuando crece el tamaño de la muestra?", back: "Disminuye: con más datos la estimación se acerca más al valor real de la población, aunque nunca desaparece del todo." }
    ],
    quiz: [
      { q: "Una escuela con 1,200 alumnos quiere estimar cuántos usan transporte público. Encuesta a 100 elegidos al azar de la lista completa. La población y la muestra son, respectivamente:", options: ["1,200 alumnos y 100 alumnos", "100 alumnos y 1,200 alumnos", "1,200 alumnos y 1,200 alumnos"], correct: 0, explanation: "La población es el total que se quiere describir (1,200) y la muestra es la parte observada (100)." },
      { q: "Se quiere una muestra de 60 alumnos de un bachillerato con 300 de primer año, 200 de segundo y 100 de tercero. Con muestreo estratificado proporcional, ¿cuántos de primer año se eligen?", options: ["30", "20", "40"], correct: 0, explanation: "Primer año es 300 de 600 alumnos, es decir la mitad: la mitad de 60 son 30." },
      { q: "Un reportero entrevista a las personas que pasan frente a su estudio. ¿Qué tipo de muestreo aplica?", options: ["Por conveniencia (no probabilístico)", "Estratificado", "Sistemático"], correct: 0, explanation: "Elige a quien tiene disponible, sin un procedimiento aleatorio; por eso no es probabilístico." },
      { q: "¿Cuál es la razón principal para trabajar con una muestra en vez de con toda la población?", options: ["Ahorrar tiempo y costo obteniendo una estimación confiable", "Porque la muestra siempre da resultados exactos", "Porque las poblaciones grandes no se pueden describir"], correct: 0, explanation: "El censo completo suele ser inviable; una muestra bien elegida estima el resultado con un error aceptable." },
      { q: "De una lista de 2,000 clientes se elige uno al azar entre los primeros 20 y luego cada 20º. ¿Qué muestreo es y de qué tamaño resulta la muestra?", options: ["Sistemático, 100 clientes", "Aleatorio simple, 100 clientes", "Sistemático, 20 clientes"], correct: 0, explanation: "Tomar cada k-ésimo elemento es muestreo sistemático; 2,000 ÷ 20 = 100 elementos." }
    ]
  },

  "1.1.3": {
    flashcards: [
      { front: "¿Qué es la media ponderada y cuándo se usa?", back: "Cuando cada dato tiene un peso distinto: se multiplica cada valor por su peso, se suman los productos y se divide entre la suma de los pesos. Es la fórmula del promedio de calificaciones con porcentajes." },
      { front: "¿Qué es un cuartil?", back: "Cada uno de los tres valores que parten los datos ordenados en cuatro partes iguales. Q2 es la mediana; Q1 deja abajo el 25 % y Q3 el 75 %." },
      { front: "Si a todos los datos se les multiplica por 3, ¿qué pasa con la media y con la mediana?", back: "Ambas se multiplican por 3. Multiplicar por una constante escala todas las medidas de posición por esa misma constante." }
    ],
    quiz: [
      { q: "Las calificaciones de un alumno son 6, 7, 7, 8, 9, 9, 9 y 10. ¿Cuál es la media?", options: ["8.125", "8.5", "7.75"], correct: 0, explanation: "La suma es 65 y hay 8 datos: 65 ÷ 8 = 8.125." },
      { q: "En un curso, los exámenes valen 60 % y las tareas 40 %. Si un alumno saca 7 en exámenes y 10 en tareas, ¿cuál es su promedio final?", options: ["8.2", "8.5", "7.8"], correct: 0, explanation: "Media ponderada: 7(0.6) + 10(0.4) = 4.2 + 4 = 8.2." },
      { q: "Un conjunto ordenado tiene 12 datos. ¿Cómo se obtiene la mediana?", options: ["Promediando el 6º y el 7º valor", "Tomando el 6º valor", "Tomando el 12º valor"], correct: 0, explanation: "Con una cantidad par de datos, la mediana es el promedio de los dos valores centrales." },
      { q: "El promedio de 5 números es 12. Si se agrega un sexto número igual a 18, ¿cuál es el nuevo promedio?", options: ["13", "15", "12.5"], correct: 0, explanation: "La suma original es 5 × 12 = 60; con el nuevo dato es 78, y 78 ÷ 6 = 13." },
      { q: "En los datos 4, 5, 5, 6, 40 la media es 12 y la mediana 5. ¿Qué indica esa diferencia?", options: ["Que hay un valor atípico que jala la media hacia arriba", "Que hubo un error de cálculo", "Que los datos son simétricos"], correct: 0, explanation: "El 40 es un dato extremo: afecta mucho a la media y casi nada a la mediana." }
    ]
  },

  "1.1.4": {
    flashcards: [
      { front: "¿Qué es el coeficiente de variación?", back: "La desviación estándar dividida entre la media, expresada en porcentaje. Sirve para comparar la dispersión de dos conjuntos con unidades o promedios distintos." },
      { front: "¿Qué es el rango intercuartílico?", back: "La diferencia Q3 − Q1: el ancho del 50 % central de los datos. Al ignorar los extremos, resiste mejor los valores atípicos que el rango total." },
      { front: "¿Qué diferencia hay entre varianza poblacional y muestral?", back: "La poblacional divide entre n; la muestral divide entre n − 1 para no subestimar la dispersión real de la población." }
    ],
    quiz: [
      { q: "Los datos 5, 7, 9, 11 tienen media 8. ¿Cuál es su varianza poblacional?", options: ["5", "4", "6.67"], correct: 0, explanation: "Las diferencias al cuadrado son 9, 1, 1 y 9; suman 20 y 20 ÷ 4 = 5." },
      { q: "Un grupo tiene media 50 y desviación estándar 5; otro tiene media 200 y desviación estándar 10. ¿Cuál es relativamente más disperso?", options: ["El primero, porque su coeficiente de variación es 10 % contra 5 %", "El segundo, porque su desviación es mayor", "Los dos igual"], correct: 0, explanation: "5/50 = 10 % y 10/200 = 5 %: en términos relativos el primero varía el doble." },
      { q: "Si la desviación estándar de un conjunto es 6, ¿cuál es su varianza?", options: ["36", "3", "12"], correct: 0, explanation: "La varianza es el cuadrado de la desviación estándar: 6² = 36." },
      { q: "En una distribución con media 70 y desviación estándar 8, ¿qué calificación está a dos desviaciones estándar por arriba de la media?", options: ["86", "78", "88"], correct: 0, explanation: "70 + 2(8) = 86." },
      { q: "Un conjunto de datos tiene Q1 = 12 y Q3 = 28. ¿Cuál es el rango intercuartílico?", options: ["16", "20", "40"], correct: 0, explanation: "RIC = Q3 − Q1 = 28 − 12 = 16." }
    ]
  },

  "1.2.1": {
    flashcards: [
      { front: "¿Cómo se distingue rápido una permutación de una combinación en un problema?", back: "Pregunta si al intercambiar dos elementos el resultado cambia. Cargos, lugares y contraseñas cambian → permutación. Equipos, comités y grupos no cambian → combinación." },
      { front: "¿Cuánto vale nCn y nC0?", back: "Ambas valen 1: solo hay una forma de tomar todos los elementos y una sola de no tomar ninguno." },
      { front: "¿Qué son las permutaciones con repetición?", back: "Cuando algunos elementos se repiten, se divide n! entre el factorial de cada grupo repetido. En AMAR: 4!/2! = 12 acomodos distintos." }
    ],
    quiz: [
      { q: "Un menú tiene 3 sopas, 4 guisados y 2 postres. ¿Cuántas comidas distintas de tres tiempos se pueden armar?", options: ["24", "9", "12"], correct: 0, explanation: "Principio multiplicativo: 3 × 4 × 2 = 24." },
      { q: "¿De cuántas formas se pueden sentar 5 personas en 5 sillas en fila?", options: ["120", "25", "60"], correct: 0, explanation: "Es una permutación de los 5 elementos: 5! = 120." },
      { q: "De 10 jugadores se debe formar un equipo de 5 sin distinguir posiciones. ¿Cuántos equipos distintos hay?", options: ["252", "30,240", "120"], correct: 0, explanation: "El orden no importa: 10C5 = 10!/(5!·5!) = 252." },
      { q: "¿Cuántas contraseñas de 3 dígitos distintos se pueden formar con los dígitos del 0 al 9?", options: ["720", "1,000", "120"], correct: 0, explanation: "El orden importa y no se repiten: 10 × 9 × 8 = 720." },
      { q: "¿Cuántas palabras distintas (con o sin sentido) se pueden formar con las letras de CASA?", options: ["12", "24", "6"], correct: 0, explanation: "Son 4 letras con la A repetida dos veces: 4!/2! = 24/2 = 12." }
    ]
  },

  "1.2.2": {
    flashcards: [
      { front: "¿Qué es la probabilidad complementaria?", back: "P(no A) = 1 − P(A). Sirve cuando es más fácil contar los casos que NO cumplen la condición, como en «al menos uno»." },
      { front: "Regla de la suma para eventos mutuamente excluyentes", back: "Si dos eventos no pueden pasar a la vez, P(A o B) = P(A) + P(B). Si sí pueden coincidir, hay que restar: P(A) + P(B) − P(A y B)." },
      { front: "¿Qué es la probabilidad frecuencial?", back: "La que se estima repitiendo el experimento: casos observados entre número de repeticiones. Se acerca a la probabilidad teórica conforme aumentan los intentos (ley de los grandes números)." }
    ],
    quiz: [
      { q: "Al lanzar dos dados, ¿cuál es la probabilidad de que la suma sea 7?", options: ["6/36", "5/36", "7/36"], correct: 0, explanation: "Hay 6 combinaciones que suman 7 (1-6, 2-5, 3-4, 4-3, 5-2, 6-1) de 36 resultados posibles." },
      { q: "En una urna hay 4 bolas rojas y 6 azules. ¿Cuál es la probabilidad de NO sacar una roja en una extracción?", options: ["0.6", "0.4", "0.5"], correct: 0, explanation: "P(no roja) = 1 − 4/10 = 6/10 = 0.6." },
      { q: "De una baraja de 52 cartas se saca una. ¿Cuál es la probabilidad de que sea As o corazón?", options: ["16/52", "17/52", "13/52"], correct: 0, explanation: "4 ases + 13 corazones − 1 as de corazones (contado dos veces) = 16 casos favorables." },
      { q: "Se lanza una moneda 3 veces. ¿Cuál es la probabilidad de obtener al menos una águila?", options: ["7/8", "3/8", "1/2"], correct: 0, explanation: "El complemento es que salgan puros soles: (1/2)³ = 1/8. Entonces 1 − 1/8 = 7/8." },
      { q: "En 200 lanzamientos de una chincheta cayó con la punta hacia arriba 130 veces. ¿Cuál es la probabilidad frecuencial de ese resultado?", options: ["0.65", "0.5", "0.35"], correct: 0, explanation: "130 ÷ 200 = 0.65." }
    ]
  },

  "1.2.3": {
    flashcards: [
      { front: "Fórmula de la probabilidad condicional", back: "P(A|B) = P(A y B) / P(B): la probabilidad de A sabiendo que B ya ocurrió. Se reduce el espacio muestral solo a los casos donde pasó B." },
      { front: "¿Qué son eventos independientes?", back: "Aquellos donde saber que uno ocurrió no cambia la probabilidad del otro: P(A|B) = P(A) y, por lo tanto, P(A y B) = P(A) × P(B)." },
      { front: "¿Qué cambia entre extraer con y sin reemplazo?", back: "Con reemplazo el total y las proporciones se mantienen, así que los eventos son independientes. Sin reemplazo el total baja en cada extracción y hay que usar probabilidad condicional." }
    ],
    quiz: [
      { q: "En una caja hay 5 canicas verdes y 3 rojas. Se sacan dos sin reemplazo. ¿Cuál es la probabilidad de que ambas sean verdes?", options: ["5/14", "25/64", "5/16"], correct: 0, explanation: "(5/8) × (4/7) = 20/56 = 5/14." },
      { q: "En un grupo, 60 % practica deporte y 24 % practica deporte y toca un instrumento. Si un alumno practica deporte, ¿cuál es la probabilidad de que toque un instrumento?", options: ["0.4", "0.24", "0.6"], correct: 0, explanation: "P(instrumento | deporte) = 0.24 / 0.60 = 0.4." },
      { q: "Se lanza un dado. Si se sabe que el resultado fue par, ¿cuál es la probabilidad de que haya sido mayor que 3?", options: ["2/3", "1/2", "1/3"], correct: 0, explanation: "Los pares son 2, 4 y 6; de ellos, 4 y 6 son mayores que 3: 2 de 3." },
      { q: "Dos eventos con P(A) = 0.5 y P(B) = 0.4 son independientes. ¿Cuánto vale P(A y B)?", options: ["0.2", "0.9", "0.1"], correct: 0, explanation: "Si son independientes se multiplican: 0.5 × 0.4 = 0.2." },
      { q: "Una prueba detecta correctamente al 90 % de los enfermos. Si una persona está enferma, la probabilidad de que la prueba salga positiva es:", options: ["0.9", "0.1", "Depende de cuántos sanos haya"], correct: 0, explanation: "Es la condicional P(positivo | enfermo), que el enunciado da directamente como 90 %." }
    ]
  },

  "1.3.1": {
    flashcards: [
      { front: "¿Cómo se traduce «el doble de un número disminuido en 5»?", back: "2x − 5. Ojo con el orden: «el doble de un número disminuido en 5» es 2x − 5, mientras que «el doble de la diferencia de un número y 5» es 2(x − 5)." },
      { front: "¿Qué son términos semejantes?", back: "Los que tienen exactamente las mismas letras con los mismos exponentes. Solo ellos se pueden sumar o restar: 3x²y y −7x²y sí; 3x² y 3x no." },
      { front: "¿Cómo se evalúa una expresión algebraica?", back: "Se sustituye cada letra por su valor (usando paréntesis) y se resuelve respetando la jerarquía de operaciones." }
    ],
    quiz: [
      { q: "Un taxi cobra $28 de banderazo más $9 por kilómetro. ¿Qué expresión representa el costo de un viaje de k kilómetros?", options: ["28 + 9k", "9 + 28k", "37k"], correct: 0, explanation: "El banderazo es fijo y el cobro por kilómetro es variable: 28 + 9k." },
      { q: "Simplifica: 5a + 3b − 2a + 7b", options: ["3a + 10b", "13ab", "7a + 5b"], correct: 0, explanation: "Se agrupan términos semejantes: (5a − 2a) + (3b + 7b) = 3a + 10b." },
      { q: "Si x = −2, ¿cuánto vale 3x² − 4x + 1?", options: ["21", "5", "−3"], correct: 0, explanation: "3(−2)² − 4(−2) + 1 = 12 + 8 + 1 = 21." },
      { q: "La edad de Ana es el triple de la de Beto menos 4 años. Si Beto tiene b años, la edad de Ana es:", options: ["3b − 4", "3(b − 4)", "b/3 − 4"], correct: 0, explanation: "Primero el triple de la edad de Beto (3b) y a eso se le restan 4 años." },
      { q: "El perímetro de un rectángulo cuyo largo es 3 unidades mayor que su ancho a se expresa como:", options: ["4a + 6", "2a + 3", "a² + 3a"], correct: 0, explanation: "El largo es a + 3, así que P = 2a + 2(a + 3) = 4a + 6." }
    ]
  },

  "1.3.2": {
    flashcards: [
      { front: "¿Cómo se factoriza una diferencia de cuadrados?", back: "a² − b² = (a + b)(a − b). Se reconoce porque hay dos términos, ambos cuadrados perfectos, restándose." },
      { front: "¿Cómo se factoriza x² + bx + c?", back: "Se buscan dos números que multiplicados den c y sumados den b. En x² + 7x + 12 son 3 y 4: (x + 3)(x + 4)." },
      { front: "¿Qué es un trinomio cuadrado perfecto?", back: "a² ± 2ab + b², que se factoriza como (a ± b)². Se reconoce porque el primero y el último término son cuadrados perfectos y el de en medio es el doble producto." }
    ],
    quiz: [
      { q: "Factoriza 9x² − 25", options: ["(3x + 5)(3x − 5)", "(3x − 5)²", "(9x + 25)(x − 1)"], correct: 0, explanation: "Es diferencia de cuadrados: √(9x²) = 3x y √25 = 5." },
      { q: "Factoriza x² − 9x + 20", options: ["(x − 4)(x − 5)", "(x + 4)(x + 5)", "(x − 10)(x + 2)"], correct: 0, explanation: "Se buscan dos números que multiplicados den 20 y sumados den −9: −4 y −5." },
      { q: "Factoriza por factor común 6a³ − 12a²", options: ["6a²(a − 2)", "6a(a² − 2a)", "2a²(3a − 6)"], correct: 0, explanation: "El máximo factor común es 6a²; las otras opciones no están factorizadas por completo." },
      { q: "¿Cuál es la factorización de x² + 10x + 25?", options: ["(x + 5)²", "(x + 25)(x + 1)", "(x − 5)²"], correct: 0, explanation: "Es un trinomio cuadrado perfecto: 25 = 5² y 10x = 2(x)(5)." },
      { q: "Al factorizar 2x² + 5x + 3 se obtiene:", options: ["(2x + 3)(x + 1)", "(2x + 1)(x + 3)", "(x + 5)(2x − 3)"], correct: 0, explanation: "Al desarrollar (2x + 3)(x + 1) = 2x² + 2x + 3x + 3 = 2x² + 5x + 3." }
    ]
  },

  "1.3.3": {
    flashcards: [
      { front: "¿Cuál es el desarrollo de (a + b)³?", back: "a³ + 3a²b + 3ab² + b³. Los coeficientes 1, 3, 3, 1 salen del triángulo de Pascal." },
      { front: "Producto de binomios con término común", back: "(x + a)(x + b) = x² + (a + b)x + ab. Es el atajo para multiplicar rápido sin hacer todo el desarrollo." },
      { front: "¿Cuál es el error más común al elevar un binomio al cuadrado?", back: "Olvidar el doble producto: (a + b)² NO es a² + b², sino a² + 2ab + b²." }
    ],
    quiz: [
      { q: "Desarrolla (x + 6)²", options: ["x² + 12x + 36", "x² + 36", "x² + 6x + 36"], correct: 0, explanation: "(a + b)² = a² + 2ab + b²: x² + 2(6)x + 36." },
      { q: "Desarrolla (2x − 3)²", options: ["4x² − 12x + 9", "4x² + 9", "2x² − 12x + 9"], correct: 0, explanation: "(2x)² = 4x², el doble producto es 2(2x)(−3) = −12x y (−3)² = 9." },
      { q: "¿Cuál es el resultado de (x + 7)(x − 7)?", options: ["x² − 49", "x² + 49", "x² − 14x − 49"], correct: 0, explanation: "Binomios conjugados: el resultado es la diferencia de cuadrados x² − 49." },
      { q: "Desarrolla (x + 4)(x + 9)", options: ["x² + 13x + 36", "x² + 36x + 13", "x² + 13x + 13"], correct: 0, explanation: "Término común: x² + (4 + 9)x + (4)(9)." },
      { q: "¿Cuál es el tercer término del desarrollo de (a + 2)³?", options: ["12a", "6a²", "8"], correct: 0, explanation: "(a + 2)³ = a³ + 3a²(2) + 3a(4) + 8 = a³ + 6a² + 12a + 8; el tercer término es 12a." }
    ]
  },

  "1.3.4": {
    flashcards: [
      { front: "¿Cuándo una ecuación lineal no tiene solución o tiene infinitas?", back: "Si al simplificar queda algo falso (5 = 8) no tiene solución; si queda una identidad (0 = 0) tiene infinitas soluciones." },
      { front: "¿Cómo se resuelve una ecuación lineal con fracciones?", back: "Se multiplica toda la ecuación por el mínimo común múltiplo de los denominadores para eliminarlos, y después se despeja normalmente." },
      { front: "¿Cómo se comprueba la solución de una ecuación?", back: "Sustituyendo el valor encontrado en la ecuación original: si los dos lados dan el mismo número, la solución es correcta." }
    ],
    quiz: [
      { q: "Resuelve: 5x − 8 = 3x + 12", options: ["x = 10", "x = 2", "x = 5"], correct: 0, explanation: "5x − 3x = 12 + 8 → 2x = 20 → x = 10." },
      { q: "Resuelve: (x/3) + 4 = 10", options: ["x = 18", "x = 2", "x = 42"], correct: 0, explanation: "x/3 = 6, entonces x = 18." },
      { q: "El triple de un número más 7 es igual a 34. ¿Cuál es el número?", options: ["9", "12", "13.6"], correct: 0, explanation: "3n + 7 = 34 → 3n = 27 → n = 9." },
      { q: "Resuelve: 2(x − 3) = 4x + 10", options: ["x = −8", "x = 8", "x = −2"], correct: 0, explanation: "2x − 6 = 4x + 10 → −16 = 2x → x = −8." },
      { q: "Un plan de telefonía cobra $150 fijos más $2 por minuto. ¿Cuántos minutos se hablaron si la cuenta fue de $350?", options: ["100", "175", "250"], correct: 0, explanation: "150 + 2m = 350 → 2m = 200 → m = 100 minutos." }
    ]
  },

  "1.3.5": {
    flashcards: [
      { front: "¿Qué indica el discriminante b² − 4ac?", back: "Si es positivo hay dos soluciones reales distintas; si es cero hay una sola (raíz doble); si es negativo no hay soluciones reales." },
      { front: "Fórmula general de la ecuación cuadrática", back: "x = (−b ± √(b² − 4ac)) / (2a). Se usa siempre, pero conviene intentar primero factorizar si los números son sencillos." },
      { front: "¿Cómo se resuelve una cuadrática incompleta como ax² + bx = 0?", back: "Se factoriza la x: x(ax + b) = 0, así que una solución es x = 0 y la otra x = −b/a." }
    ],
    quiz: [
      { q: "Resuelve x² − 5x + 6 = 0", options: ["x = 2 y x = 3", "x = −2 y x = −3", "x = 1 y x = 6"], correct: 0, explanation: "Se factoriza como (x − 2)(x − 3) = 0." },
      { q: "¿Cuántas soluciones reales tiene x² + 2x + 5 = 0?", options: ["Ninguna", "Una", "Dos"], correct: 0, explanation: "El discriminante es 2² − 4(1)(5) = 4 − 20 = −16, negativo: no hay raíces reales." },
      { q: "Resuelve 2x² − 8 = 0", options: ["x = 2 y x = −2", "x = 4 y x = −4", "x = 2 únicamente"], correct: 0, explanation: "2x² = 8 → x² = 4 → x = ±2." },
      { q: "En x² − 6x + 9 = 0, ¿qué ocurre con las soluciones?", options: ["Hay una sola solución (x = 3)", "Hay dos soluciones distintas", "No hay solución real"], correct: 0, explanation: "El discriminante es 36 − 36 = 0: raíz doble x = 3, porque el trinomio es (x − 3)²." },
      { q: "Un terreno rectangular mide 3 m más de largo que de ancho y su área es de 40 m². ¿Cuánto mide el ancho?", options: ["5 m", "8 m", "4 m"], correct: 0, explanation: "a(a + 3) = 40 → a² + 3a − 40 = 0 → (a + 8)(a − 5) = 0; se toma la solución positiva a = 5." }
    ]
  },

  "1.3.6": {
    flashcards: [
      { front: "¿Qué significa geométricamente resolver un sistema de dos ecuaciones lineales?", back: "Encontrar el punto donde se cruzan las dos rectas. Si son paralelas no hay solución; si son la misma recta hay infinitas." },
      { front: "¿En qué consiste el método de sustitución?", back: "Se despeja una incógnita en una ecuación y esa expresión se sustituye en la otra, para quedarse con una sola incógnita." },
      { front: "¿En qué consiste el método de suma y resta (eliminación)?", back: "Se multiplican las ecuaciones para que los coeficientes de una incógnita queden opuestos y al sumarlas esa incógnita desaparece." }
    ],
    quiz: [
      { q: "Resuelve el sistema x + y = 10 y x − y = 4", options: ["x = 7, y = 3", "x = 6, y = 4", "x = 3, y = 7"], correct: 0, explanation: "Sumando ambas ecuaciones: 2x = 14 → x = 7, y entonces y = 3." },
      { q: "En un estacionamiento hay autos y motos: 20 vehículos y 70 llantas en total. ¿Cuántas motos hay?", options: ["5", "10", "15"], correct: 0, explanation: "a + m = 20 y 4a + 2m = 70. Sustituyendo: 4(20 − m) + 2m = 70 → 80 − 2m = 70 → m = 5." },
      { q: "El sistema 2x + 3y = 12 y 4x + 6y = 24 tiene:", options: ["Infinitas soluciones", "Una sola solución", "Ninguna solución"], correct: 0, explanation: "La segunda ecuación es el doble de la primera: representan la misma recta." },
      { q: "Resuelve: 3x + 2y = 16 y x = 2y", options: ["x = 4, y = 2", "x = 2, y = 4", "x = 6, y = 3"], correct: 0, explanation: "Sustituyendo x = 2y: 3(2y) + 2y = 16 → 8y = 16 → y = 2 y x = 4." },
      { q: "Dos cuadernos y tres plumas cuestan $85; un cuaderno y una pluma cuestan $35. ¿Cuánto cuesta la pluma?", options: ["$15", "$20", "$25"], correct: 0, explanation: "2c + 3p = 85 y c + p = 35 → c = 35 − p. Entonces 2(35 − p) + 3p = 85 → 70 + p = 85 → p = 15." }
    ]
  },

  "1.3.7": {
    flashcards: [
      { front: "¿Qué es el monto en interés simple?", back: "M = C + I = C(1 + it): el capital más los intereses generados. Es lo que se paga o se recibe al final del plazo." },
      { front: "¿Cómo se ajusta la tasa cuando el tiempo no está en años?", back: "La tasa y el tiempo deben estar en la misma unidad: una tasa anual del 24 % es 2 % mensual (24 ÷ 12) o 6 % trimestral (24 ÷ 4)." },
      { front: "¿Cómo se despeja el tiempo en la fórmula de interés simple?", back: "De I = Cit se obtiene t = I / (C · i). Igual se despeja cualquiera de los otros datos." }
    ],
    quiz: [
      { q: "¿Cuánto interés simple generan $8,000 al 5 % anual durante 3 años?", options: ["$1,200", "$400", "$1,260"], correct: 0, explanation: "I = Cit = 8,000 × 0.05 × 3 = $1,200." },
      { q: "Se invierten $15,000 al 12 % anual durante 8 meses. ¿Cuál es el interés?", options: ["$1,200", "$1,800", "$14,400"], correct: 0, explanation: "8 meses son 8/12 de año: 15,000 × 0.12 × (8/12) = $1,200." },
      { q: "Un capital de $5,000 se convirtió en $6,000 en 2 años con interés simple. ¿Cuál fue la tasa anual?", options: ["10 %", "20 %", "12 %"], correct: 0, explanation: "El interés fue $1,000; i = 1,000 / (5,000 × 2) = 0.10 = 10 % anual." },
      { q: "¿Cuánto se debe invertir al 6 % anual simple para ganar $900 en un año y medio?", options: ["$10,000", "$15,000", "$9,000"], correct: 0, explanation: "C = I / (i·t) = 900 / (0.06 × 1.5) = 900 / 0.09 = $10,000." },
      { q: "Un préstamo de $20,000 al 18 % anual simple se paga en 6 meses. ¿Cuál es el monto total a pagar?", options: ["$21,800", "$23,600", "$20,900"], correct: 0, explanation: "I = 20,000 × 0.18 × 0.5 = $1,800; M = 20,000 + 1,800 = $21,800." }
    ]
  },

  "1.3.8": {
    flashcards: [
      { front: "¿Qué significa capitalizar?", back: "Sumar los intereses al capital para que en el siguiente periodo también generen intereses. Por eso el interés compuesto crece más rápido que el simple." },
      { front: "Fórmula del interés compuesto con capitalizaciones al año", back: "M = C(1 + i/n)^(n·t), donde n es el número de capitalizaciones por año (12 mensual, 4 trimestral, 2 semestral)." },
      { front: "¿Cómo se obtiene solo el interés compuesto ganado?", back: "Se calcula el monto y se le resta el capital inicial: I = M − C. La fórmula da el monto, no el interés." }
    ],
    quiz: [
      { q: "¿En qué se diferencia el interés compuesto del simple?", options: ["En el compuesto los intereses se suman al capital y también generan intereses", "En el compuesto la tasa siempre es mayor", "En el simple el plazo siempre es más corto"], correct: 0, explanation: "El interés simple se calcula siempre sobre el capital original; el compuesto, sobre el capital acumulado." },
      { q: "$10,000 al 10 % anual compuesto durante 2 años producen un monto de:", options: ["$12,100", "$12,000", "$11,000"], correct: 0, explanation: "M = 10,000(1.10)² = 10,000 × 1.21 = $12,100." },
      { q: "$5,000 al 12 % anual capitalizable mensualmente durante 1 año generan un monto aproximado de:", options: ["$5,634", "$5,600", "$6,200"], correct: 0, explanation: "M = 5,000(1 + 0.12/12)^12 = 5,000(1.01)^12 ≈ $5,634." },
      { q: "Un capital de $20,000 al 8 % anual compuesto durante 3 años produce un interés de aproximadamente:", options: ["$5,194", "$4,800", "$6,000"], correct: 0, explanation: "M = 20,000(1.08)³ ≈ $25,194; el interés es M − C ≈ $5,194." },
      { q: "Con la misma tasa y plazo, ¿qué inversión rinde más?", options: ["La de interés compuesto", "La de interés simple", "Rinden exactamente igual"], correct: 0, explanation: "Al capitalizar, los intereses generan nuevos intereses, así que el monto final siempre es mayor (a partir del segundo periodo)." }
    ]
  },

  "1.4.1": {
    flashcards: [
      { front: "¿Cómo se calcula el MCM con descomposición en factores primos?", back: "Se descomponen los números y se toman **todos** los factores primos, cada uno con su **mayor** exponente." },
      { front: "Relación entre MCM y MCD", back: "Para dos números a y b: MCM(a,b) × MCD(a,b) = a × b. Conociendo uno se obtiene el otro." },
      { front: "¿Qué tipo de problemas se resuelven con MCM?", back: "Los de eventos que se repiten y vuelven a coincidir: semáforos, campanadas, vueltas de pista, autobuses que salen cada cierto tiempo." }
    ],
    quiz: [
      { q: "¿Cuál es el MCM de 12 y 18?", options: ["36", "72", "6"], correct: 0, explanation: "12 = 2²·3 y 18 = 2·3²; se toman los mayores exponentes: 2²·3² = 36." },
      { q: "Dos luces parpadean cada 6 y cada 8 segundos. Si acaban de parpadear juntas, ¿en cuántos segundos vuelven a coincidir?", options: ["24", "48", "14"], correct: 0, explanation: "Es el MCM de 6 y 8, que es 24 segundos." },
      { q: "¿Cuál es el MCM de 5, 6 y 15?", options: ["30", "60", "150"], correct: 0, explanation: "5 = 5, 6 = 2·3 y 15 = 3·5; el MCM es 2·3·5 = 30." },
      { q: "Tres autobuses salen de la terminal cada 15, 20 y 30 minutos. Si salieron juntos a las 8:00, ¿a qué hora vuelven a salir juntos?", options: ["9:00", "8:45", "10:00"], correct: 0, explanation: "El MCM de 15, 20 y 30 es 60 minutos, es decir, una hora después." },
      { q: "Si dos números son primos entre sí, su MCM es:", options: ["El producto de ambos", "El menor de los dos", "Siempre 1"], correct: 0, explanation: "Al no compartir factores primos, el MCM incluye todos los factores de ambos: su producto." }
    ]
  },

  "1.4.2": {
    flashcards: [
      { front: "¿Cómo se calcula el MCD con factores primos?", back: "Se descomponen los números y se toman solo los factores primos **comunes**, cada uno con su **menor** exponente." },
      { front: "¿Qué tipo de problemas se resuelven con MCD?", back: "Los de repartir en grupos iguales lo más grandes posible, o cortar piezas del mayor tamaño posible sin que sobre material." },
      { front: "¿Qué son dos números primos entre sí?", back: "Los que tienen MCD igual a 1, es decir, no comparten ningún factor primo, como 8 y 15." }
    ],
    quiz: [
      { q: "¿Cuál es el MCD de 24 y 36?", options: ["12", "6", "72"], correct: 0, explanation: "24 = 2³·3 y 36 = 2²·3²; comunes con el menor exponente: 2²·3 = 12." },
      { q: "Se quieren repartir 30 lápices y 45 cuadernos en paquetes iguales sin que sobre nada. ¿Cuál es el mayor número de paquetes posible?", options: ["15", "5", "90"], correct: 0, explanation: "MCD(30, 45) = 15 paquetes, cada uno con 2 lápices y 3 cuadernos." },
      { q: "¿Cuál es el MCD de 16 y 25?", options: ["1", "4", "5"], correct: 0, explanation: "16 = 2⁴ y 25 = 5²: no comparten factores primos, así que son primos entre sí." },
      { q: "De dos listones de 48 cm y 60 cm se quieren cortar trozos iguales lo más largos posible sin desperdicio. ¿Cuánto mide cada trozo?", options: ["12 cm", "6 cm", "24 cm"], correct: 0, explanation: "MCD(48, 60) = 12 cm." },
      { q: "El MCD de dos números siempre es:", options: ["Menor o igual que el menor de los dos números", "Mayor que ambos números", "Igual a su producto"], correct: 0, explanation: "Es un divisor de ambos, así que nunca puede pasarse del más pequeño." }
    ]
  },

  "1.4.3": {
    flashcards: [
      { front: "¿Qué diferencia hay entre razón aritmética y razón geométrica?", back: "La **aritmética** compara por resta (a − b: cuánto le falta a uno para el otro); la **geométrica** compara por división (a/b: cuántas veces cabe uno en el otro)." },
      { front: "¿Qué es una proporción?", back: "La igualdad entre dos razones: a/b = c/d. Su propiedad fundamental es que el producto de extremos es igual al producto de medios (a·d = b·c)." },
      { front: "¿Cómo se reparte una cantidad en una razón dada, por ejemplo 3:2?", back: "Se suman las partes (3 + 2 = 5), se divide el total entre esa suma para obtener el valor de una parte y se multiplica por cada número de la razón." }
    ],
    quiz: [
      { q: "La razón entre las edades de dos hermanos es 3:5 y juntos suman 40 años. ¿Cuántos años tiene el menor?", options: ["15", "16", "24"], correct: 0, explanation: "3 + 5 = 8 partes; 40 ÷ 8 = 5 años por parte; el menor tiene 3 × 5 = 15 años." },
      { q: "En un salón hay 18 mujeres y 12 hombres. ¿Cuál es la razón de mujeres a hombres simplificada?", options: ["3:2", "2:3", "6:4"], correct: 0, explanation: "18:12 se divide entre 6 en ambos lados: 3:2." },
      { q: "Si 4/6 = x/15, ¿cuánto vale x?", options: ["10", "9", "12"], correct: 0, explanation: "Producto cruzado: 6x = 60 → x = 10." },
      { q: "La razón aritmética entre 45 y 28 es:", options: ["17", "1.6", "73"], correct: 0, explanation: "La razón aritmética se obtiene restando: 45 − 28 = 17." },
      { q: "Una receta usa harina y azúcar en razón 5:2. Si se usan 750 g de harina, ¿cuánta azúcar se necesita?", options: ["300 g", "375 g", "250 g"], correct: 0, explanation: "5 partes son 750 g, entonces una parte son 150 g y 2 partes son 300 g." }
    ]
  },

  "1.4.4": {
    flashcards: [
      { front: "¿Cómo se reconoce una proporcionalidad directa?", back: "Al aumentar una cantidad, la otra aumenta en la misma medida y el cociente y/x se mantiene constante (esa constante es k)." },
      { front: "¿Cómo se reconoce una proporcionalidad inversa?", back: "Al aumentar una cantidad, la otra disminuye, y el producto x·y se mantiene constante. Ejemplo típico: más trabajadores, menos días." },
      { front: "¿Qué forma tiene la gráfica de cada tipo de proporcionalidad?", back: "La directa es una recta que pasa por el origen (y = kx); la inversa es una hipérbola (y = k/x) que nunca toca los ejes." }
    ],
    quiz: [
      { q: "Si 4 kg de tortilla cuestan $92, ¿cuánto cuestan 7 kg?", options: ["$161", "$154", "$168"], correct: 0, explanation: "El precio por kilo es 92 ÷ 4 = $23; 23 × 7 = $161." },
      { q: "Seis albañiles levantan una barda en 10 días. ¿Cuántos días tardarían 4 albañiles trabajando al mismo ritmo?", options: ["15", "6.7", "12"], correct: 0, explanation: "Es proporcionalidad inversa: 6 × 10 = 60 jornadas; 60 ÷ 4 = 15 días." },
      { q: "En una proporcionalidad directa, cuando x = 8, y = 20. ¿Cuánto vale y si x = 14?", options: ["35", "26", "32"], correct: 0, explanation: "k = 20/8 = 2.5, entonces y = 2.5 × 14 = 35." },
      { q: "Un coche a 90 km/h tarda 4 horas en un trayecto. ¿Cuánto tardaría a 120 km/h?", options: ["3 horas", "3.5 horas", "5.3 horas"], correct: 0, explanation: "Velocidad y tiempo son inversamente proporcionales: la distancia es 360 km y 360 ÷ 120 = 3 h." },
      { q: "¿Cuál de estas situaciones es de proporcionalidad inversa?", options: ["El número de personas que comparten un pastel y la porción que le toca a cada una", "Los litros de gasolina y su costo", "Las horas trabajadas y el sueldo por hora fijo"], correct: 0, explanation: "A más personas, menor porción, y el producto (personas × porción) se mantiene igual al pastel completo." }
    ]
  },

  "1.4.5": {
    flashcards: [
      { front: "¿Cómo se calcula el porcentaje de aumento o descuento en un solo paso?", back: "Aumento del 15 %: multiplicar por 1.15. Descuento del 15 %: multiplicar por 0.85. Evita hacer dos operaciones." },
      { front: "¿Cómo se obtiene el porcentaje de variación?", back: "(valor final − valor inicial) / valor inicial × 100. Si sale negativo, hubo disminución." },
      { front: "¿Por qué dos descuentos sucesivos del 20 % no son un 40 %?", back: "Porque el segundo se aplica sobre el precio ya rebajado: 0.8 × 0.8 = 0.64, es decir, un 36 % de descuento total." }
    ],
    quiz: [
      { q: "Una playera de $450 tiene 30 % de descuento. ¿Cuánto se paga?", options: ["$315", "$135", "$420"], correct: 0, explanation: "450 × 0.70 = $315." },
      { q: "Un producto cuesta $1,200 más 16 % de IVA. ¿Cuál es el precio final?", options: ["$1,392", "$1,216", "$1,392.50"], correct: 0, explanation: "1,200 × 1.16 = $1,392." },
      { q: "Un sueldo pasó de $8,000 a $9,200. ¿De qué porcentaje fue el aumento?", options: ["15 %", "12 %", "13 %"], correct: 0, explanation: "(9,200 − 8,000)/8,000 = 0.15 = 15 %." },
      { q: "El 35 % de una cantidad es 84. ¿Cuál es la cantidad?", options: ["240", "294", "120"], correct: 0, explanation: "Cantidad = 84 ÷ 0.35 = 240." },
      { q: "Una tienda aplica 20 % de descuento y después otro 10 % sobre el precio ya rebajado. ¿Cuál es el descuento total?", options: ["28 %", "30 %", "25 %"], correct: 0, explanation: "0.80 × 0.90 = 0.72, se paga el 72 % y se descuenta el 28 %." }
    ]
  },

  "1.5.1": {
    flashcards: [
      { front: "Área y perímetro del círculo", back: "Área = πr² y perímetro (circunferencia) = 2πr = πd. El error típico es usar el diámetro donde va el radio." },
      { front: "Área del trapecio", back: "A = (B + b)·h / 2: se suman las bases paralelas, se multiplica por la altura y se divide entre dos." },
      { front: "¿Cómo se calcula el área de una figura irregular compuesta?", back: "Se descompone en figuras conocidas (rectángulos, triángulos, semicírculos), se calcula cada área y se suman o se restan los huecos." }
    ],
    quiz: [
      { q: "¿Cuál es el área de un círculo de 10 cm de diámetro? (π ≈ 3.1416)", options: ["78.54 cm²", "314.16 cm²", "31.42 cm²"], correct: 0, explanation: "El radio es 5 cm: A = π(5)² = 78.54 cm²." },
      { q: "Un trapecio tiene bases de 12 cm y 8 cm y altura de 5 cm. ¿Cuál es su área?", options: ["50 cm²", "100 cm²", "40 cm²"], correct: 0, explanation: "A = (12 + 8)(5)/2 = 100/2 = 50 cm²." },
      { q: "¿Cuál es el área de un triángulo con base de 14 m y altura de 9 m?", options: ["63 m²", "126 m²", "23 m²"], correct: 0, explanation: "A = b·h/2 = 14 × 9 / 2 = 63 m²." },
      { q: "Un terreno cuadrado tiene 144 m² de área. ¿Cuánto mide su perímetro?", options: ["48 m", "36 m", "24 m"], correct: 0, explanation: "El lado es √144 = 12 m, y el perímetro 4 × 12 = 48 m." },
      { q: "Una sala rectangular mide 6 m × 4 m y tiene una alfombra circular de 2 m de radio. ¿Cuánta superficie de piso queda descubierta? (π ≈ 3.14)", options: ["11.44 m²", "24 m²", "12.56 m²"], correct: 0, explanation: "Piso: 24 m². Alfombra: π(2)² = 12.56 m². Diferencia: 11.44 m²." }
    ]
  },

  "1.5.2": {
    flashcards: [
      { front: "¿Qué diferencia hay entre figuras congruentes y semejantes?", back: "**Congruentes**: misma forma y mismo tamaño (todo igual). **Semejantes**: misma forma pero distinto tamaño; los ángulos son iguales y los lados son proporcionales." },
      { front: "Criterios de semejanza de triángulos", back: "**AA** (dos ángulos iguales), **LLL** (tres lados proporcionales) y **LAL** (dos lados proporcionales con el ángulo entre ellos igual)." },
      { front: "¿Cómo cambian el área y el volumen cuando se escala una figura?", back: "Si los lados se multiplican por k, el área se multiplica por k² y el volumen por k³. Al duplicar los lados, el área se cuadruplica." }
    ],
    quiz: [
      { q: "Dos triángulos semejantes tienen razón de semejanza 1:3. Si el menor tiene un lado de 4 cm, el lado correspondiente del mayor mide:", options: ["12 cm", "7 cm", "1.33 cm"], correct: 0, explanation: "Los lados correspondientes son proporcionales: 4 × 3 = 12 cm." },
      { q: "Un poste de 6 m proyecta una sombra de 4 m. A la misma hora, un árbol proyecta una sombra de 10 m. ¿Cuánto mide el árbol?", options: ["15 m", "12 m", "6.7 m"], correct: 0, explanation: "Triángulos semejantes: 6/4 = x/10 → x = 15 m." },
      { q: "Si dos triángulos tienen dos ángulos respectivamente iguales, entonces son:", options: ["Semejantes por el criterio AA", "Congruentes siempre", "Necesariamente equiláteros"], correct: 0, explanation: "Con dos ángulos iguales el tercero también coincide, así que la forma es la misma aunque el tamaño cambie." },
      { q: "Los lados de un rectángulo se duplican. ¿Qué pasa con su área?", options: ["Se multiplica por 4", "Se duplica", "Se multiplica por 8"], correct: 0, explanation: "El área escala con el cuadrado del factor: 2² = 4." },
      { q: "Dos triángulos semejantes tienen áreas de 9 cm² y 36 cm². ¿Cuál es la razón entre sus lados?", options: ["1:2", "1:4", "1:9"], correct: 0, explanation: "La razón de áreas es el cuadrado de la razón de lados: √(9/36) = 1/2." }
    ]
  },

  "1.5.3": {
    flashcards: [
      { front: "¿Cómo se sabe si un triángulo es rectángulo a partir de sus lados?", back: "Si el cuadrado del lado mayor es igual a la suma de los cuadrados de los otros dos (recíproco del teorema de Pitágoras), el triángulo es rectángulo." },
      { front: "¿Cuáles son las ternas pitagóricas más usadas?", back: "3-4-5, 5-12-13, 8-15-17 y 7-24-25, junto con todos sus múltiplos (6-8-10, 9-12-15...). Reconocerlas ahorra tiempo en el examen." },
      { front: "¿Cómo se calcula la diagonal de un rectángulo?", back: "Es la hipotenusa del triángulo que forman sus lados: d = √(largo² + ancho²)." }
    ],
    quiz: [
      { q: "Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. ¿Cuánto mide su hipotenusa?", options: ["15 cm", "21 cm", "√21 cm"], correct: 0, explanation: "√(81 + 144) = √225 = 15 cm (es la terna 3-4-5 multiplicada por 3)." },
      { q: "La hipotenusa de un triángulo rectángulo mide 26 cm y un cateto 10 cm. ¿Cuánto mide el otro cateto?", options: ["24 cm", "16 cm", "28 cm"], correct: 0, explanation: "√(676 − 100) = √576 = 24 cm." },
      { q: "¿Cuál de estos tríos de lados forma un triángulo rectángulo?", options: ["8, 15 y 17", "5, 6 y 8", "4, 5 y 7"], correct: 0, explanation: "64 + 225 = 289 = 17²: cumple el teorema de Pitágoras." },
      { q: "Una escalera de 5 m se apoya en una pared con la base a 3 m del muro. ¿A qué altura llega?", options: ["4 m", "4.5 m", "5.8 m"], correct: 0, explanation: "√(25 − 9) = √16 = 4 m." },
      { q: "¿Cuánto mide la diagonal de una cancha rectangular de 40 m por 30 m?", options: ["50 m", "70 m", "35 m"], correct: 0, explanation: "√(1,600 + 900) = √2,500 = 50 m." }
    ]
  },

  "1.5.4": {
    flashcards: [
      { front: "¿Cómo se calcula la distancia entre dos puntos del plano?", back: "d = √((x₂ − x₁)² + (y₂ − y₁)²). Es Pitágoras aplicado a las diferencias de coordenadas." },
      { front: "¿Cómo se obtiene el punto medio de un segmento?", back: "Se promedian las coordenadas: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)." },
      { front: "¿Cómo se calcula el área de un triángulo con sus tres vértices?", back: "A = |x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)| / 2. Si el triángulo tiene un lado horizontal y uno vertical, basta con base × altura ÷ 2." }
    ],
    quiz: [
      { q: "¿Cuál es la distancia entre los puntos A(1, 2) y B(4, 6)?", options: ["5", "7", "25"], correct: 0, explanation: "√(3² + 4²) = √25 = 5." },
      { q: "¿Cuál es el punto medio del segmento que une (−2, 5) y (6, 1)?", options: ["(2, 3)", "(4, 6)", "(2, 6)"], correct: 0, explanation: "((−2 + 6)/2, (5 + 1)/2) = (2, 3)." },
      { q: "Un rectángulo tiene vértices en (0,0), (6,0), (6,4) y (0,4). ¿Cuál es su área?", options: ["24 u²", "20 u²", "10 u²"], correct: 0, explanation: "La base mide 6 y la altura 4: 6 × 4 = 24 unidades cuadradas." },
      { q: "Un triángulo tiene vértices en (0,0), (8,0) y (0,5). ¿Cuál es su área?", options: ["20 u²", "40 u²", "13 u²"], correct: 0, explanation: "Los catetos sobre los ejes miden 8 y 5: A = (8)(5)/2 = 20." },
      { q: "Los puntos (2,1), (7,1), (7,4) y (2,4) forman un rectángulo. ¿Cuál es su perímetro?", options: ["16 u", "15 u", "18 u"], correct: 0, explanation: "El largo es 5 y el ancho 3: P = 2(5) + 2(3) = 16." }
    ]
  },

  "1.6.1": {
    flashcards: [
      { front: "¿Cuándo se usa corchete y cuándo paréntesis en un intervalo?", back: "El corchete [ ] incluye el extremo (≤ o ≥); el paréntesis ( ) lo excluye (< o >). El infinito siempre lleva paréntesis." },
      { front: "¿Qué pasa al multiplicar o dividir una desigualdad por un número negativo?", back: "El sentido de la desigualdad se invierte: si −2x < 6, entonces x > −3." },
      { front: "¿Cómo se escribe el intervalo de una desigualdad con valor absoluto |x| < a?", back: "|x| < a equivale a −a < x < a, es decir el intervalo (−a, a). En cambio |x| > a se parte en dos intervalos separados." }
    ],
    quiz: [
      { q: "¿Qué intervalo representa la desigualdad −3 < x ≤ 5?", options: ["(−3, 5]", "[−3, 5)", "[−3, 5]"], correct: 0, explanation: "El −3 se excluye (paréntesis) y el 5 se incluye (corchete)." },
      { q: "Resuelve la desigualdad 2x + 5 < 17", options: ["x < 6", "x > 6", "x < 11"], correct: 0, explanation: "2x < 12, entonces x < 6." },
      { q: "Resuelve −4x ≥ 20", options: ["x ≤ −5", "x ≥ −5", "x ≤ 5"], correct: 0, explanation: "Al dividir entre −4 se invierte el signo de la desigualdad: x ≤ −5." },
      { q: "El intervalo [2, ∞) corresponde a:", options: ["x ≥ 2", "x > 2", "x ≤ 2"], correct: 0, explanation: "El corchete en el 2 lo incluye y el intervalo sigue hacia valores mayores." },
      { q: "Para entrar a una atracción se pide medir más de 1.20 m y menos de 1.90 m. ¿Qué intervalo lo representa?", options: ["(1.20, 1.90)", "[1.20, 1.90]", "(1.20, 1.90]"], correct: 0, explanation: "Ambos extremos quedan fuera porque se pide estrictamente más y estrictamente menos." }
    ]
  },

  "1.6.2": {
    flashcards: [
      { front: "¿Qué información da la pendiente de una recta?", back: "Cuánto sube (positiva) o baja (negativa) y por cada unidad que avanza x. Si es cero, la recta es horizontal." },
      { front: "¿Cómo se identifica una parábola por su ecuación?", back: "Tiene término x² (función cuadrática). Si el coeficiente de x² es positivo abre hacia arriba y su vértice es un mínimo; si es negativo abre hacia abajo y es un máximo." },
      { front: "¿Qué son el dominio y el rango de una función?", back: "El **dominio** son todos los valores válidos de x; el **rango**, todos los valores que puede tomar y. En 1/x, el dominio excluye x = 0." }
    ],
    quiz: [
      { q: "¿Cuál es la pendiente de la recta y = −3x + 7?", options: ["−3", "7", "3"], correct: 0, explanation: "En la forma y = mx + b, la pendiente m es el coeficiente de x." },
      { q: "¿Dónde corta al eje y la recta y = 2x − 5?", options: ["En (0, −5)", "En (0, 2)", "En (5, 0)"], correct: 0, explanation: "El corte con el eje y es la ordenada al origen b, que aquí es −5." },
      { q: "La gráfica de y = x² − 4x + 3 es:", options: ["Una parábola que abre hacia arriba", "Una recta con pendiente 1", "Una parábola que abre hacia abajo"], correct: 0, explanation: "Es cuadrática y el coeficiente de x² es positivo, así que abre hacia arriba." },
      { q: "¿Cuál es la pendiente de la recta que pasa por (1, 2) y (5, 10)?", options: ["2", "4", "0.5"], correct: 0, explanation: "m = (10 − 2)/(5 − 1) = 8/4 = 2." },
      { q: "El vértice de la parábola y = x² − 6x + 5 está en x =", options: ["3", "−3", "6"], correct: 0, explanation: "x = −b/(2a) = 6/2 = 3." }
    ]
  },

  "1.6.3": {
    flashcards: [
      { front: "¿Qué significa que el límite de f(x) cuando x tiende a a es L?", back: "Que al acercar x al valor a (sin llegar necesariamente a él), los valores de f(x) se acercan tanto como se quiera a L." },
      { front: "¿Qué se hace cuando un límite da la forma 0/0?", back: "Es una indeterminación: hay que factorizar y simplificar (o racionalizar) para eliminar el factor que se anula, y después sustituir." },
      { front: "¿Cómo se calcula el límite de un polinomio en el infinito?", back: "Manda el término de mayor grado. Para cocientes: si el grado de arriba es menor, el límite es 0; si son iguales, es el cociente de los coeficientes principales; si es mayor, tiende a infinito." }
    ],
    quiz: [
      { q: "¿Cuál es el límite de f(x) = 3x + 2 cuando x tiende a 4?", options: ["14", "12", "No existe"], correct: 0, explanation: "Es una función continua: basta sustituir 3(4) + 2 = 14." },
      { q: "Calcula el límite de (x² − 9)/(x − 3) cuando x tiende a 3", options: ["6", "0", "No existe"], correct: 0, explanation: "Se factoriza: (x + 3)(x − 3)/(x − 3) = x + 3, y al sustituir queda 6." },
      { q: "¿Cuál es el límite de (2x² + 3)/(x² − 1) cuando x tiende a infinito?", options: ["2", "0", "Infinito"], correct: 0, explanation: "Los grados son iguales, así que el límite es el cociente de los coeficientes principales: 2/1." },
      { q: "¿Cuál es el límite de 5/x cuando x tiende a infinito?", options: ["0", "5", "Infinito"], correct: 0, explanation: "Al crecer el denominador sin límite, la fracción se acerca a cero." },
      { q: "Si al evaluar un límite se obtiene 0/0, eso significa que:", options: ["Hay una indeterminación y se debe simplificar la expresión", "El límite no existe", "El límite vale cero"], correct: 0, explanation: "0/0 no es un valor: indica que hace falta un procedimiento algebraico antes de concluir." }
    ]
  },

  "1.6.4": {
    flashcards: [
      { front: "¿Qué representa geométricamente la derivada en un punto?", back: "La pendiente de la recta tangente a la curva en ese punto, es decir, la razón de cambio instantánea de la función." },
      { front: "Reglas básicas de derivación de polinomios", back: "La derivada de una constante es 0; la de xⁿ es n·xⁿ⁻¹; la de una suma es la suma de las derivadas, y una constante que multiplica se conserva." },
      { front: "¿Qué es la segunda derivada y para qué sirve?", back: "Es la derivada de la derivada. Indica la concavidad: si es positiva la curva abre hacia arriba (mínimo) y si es negativa hacia abajo (máximo)." }
    ],
    quiz: [
      { q: "¿Cuál es la derivada de f(x) = 4x³?", options: ["12x²", "4x²", "12x³"], correct: 0, explanation: "Se baja el exponente como factor y se resta uno: 3(4)x² = 12x²." },
      { q: "¿Cuál es la derivada de f(x) = 5x² − 3x + 7?", options: ["10x − 3", "10x − 3x", "10x + 7"], correct: 0, explanation: "Se deriva término a término: 10x, −3 y la constante 7 desaparece." },
      { q: "Si f(x) = x³ − 6x, ¿cuánto vale f'(2)?", options: ["6", "0", "12"], correct: 0, explanation: "f'(x) = 3x² − 6; al sustituir: 3(4) − 6 = 6." },
      { q: "¿Cuál es la derivada de una función constante como f(x) = 12?", options: ["0", "12", "1"], correct: 0, explanation: "Una constante no cambia, así que su razón de cambio es cero." },
      { q: "¿Cuál es la pendiente de la recta tangente a y = x² en el punto x = 5?", options: ["10", "25", "5"], correct: 0, explanation: "La derivada es 2x, y en x = 5 vale 10." }
    ]
  },

  "1.6.5": {
    flashcards: [
      { front: "Derivadas de las funciones trascendentes básicas", back: "(sen x)' = cos x, (cos x)' = −sen x, (eˣ)' = eˣ, (ln x)' = 1/x. Con estas cuatro se resuelve casi todo el examen." },
      { front: "¿Qué es la regla de la cadena?", back: "Para una función compuesta: se deriva la de afuera dejando el interior igual y se multiplica por la derivada del interior. (sen 3x)' = 3cos 3x." },
      { front: "Regla del producto y del cociente", back: "Producto: (uv)' = u'v + uv'. Cociente: (u/v)' = (u'v − uv')/v²." }
    ],
    quiz: [
      { q: "¿Cuál es la derivada de f(x) = sen x?", options: ["cos x", "−cos x", "−sen x"], correct: 0, explanation: "Es una derivada básica que conviene memorizar." },
      { q: "¿Cuál es la derivada de f(x) = e^(2x)?", options: ["2e^(2x)", "e^(2x)", "2x·e^(2x)"], correct: 0, explanation: "Regla de la cadena: la derivada del exponente (2) multiplica a la exponencial." },
      { q: "¿Cuál es la derivada de f(x) = ln(x)?", options: ["1/x", "x", "ln(x)/x"], correct: 0, explanation: "La derivada del logaritmo natural es el recíproco de x." },
      { q: "Deriva f(x) = x²·sen x", options: ["2x·sen x + x²·cos x", "2x·cos x", "2x·sen x"], correct: 0, explanation: "Regla del producto: u'v + uv' con u = x² y v = sen x." },
      { q: "¿Cuál es la derivada de f(x) = √x?", options: ["1/(2√x)", "2√x", "1/√x"], correct: 0, explanation: "√x = x^(1/2), y su derivada es (1/2)x^(−1/2) = 1/(2√x)." }
    ]
  },

  "1.6.6": {
    flashcards: [
      { front: "¿Cuáles son los pasos para resolver un problema de optimización?", back: "1) Escribir la función a maximizar o minimizar; 2) dejarla en una sola variable usando la condición del problema; 3) derivar e igualar a cero; 4) comprobar si es máximo o mínimo." },
      { front: "¿Cómo se distingue un máximo de un mínimo?", back: "Con la segunda derivada: si f''(x) < 0 en el punto crítico es máximo; si f''(x) > 0 es mínimo. En una parábola, el signo del coeficiente de x² lo dice de inmediato." },
      { front: "¿Dónde está el vértice de una parábola sin derivar?", back: "En x = −b/(2a). Coincide exactamente con el punto crítico que se obtiene al derivar e igualar a cero." }
    ],
    quiz: [
      { q: "La ganancia de una empresa es G(x) = −2x² + 80x − 300. ¿Cuántas unidades maximizan la ganancia?", options: ["20", "40", "80"], correct: 0, explanation: "G'(x) = −4x + 80 = 0 → x = 20 unidades (es máximo porque el coeficiente de x² es negativo)." },
      { q: "En el problema anterior, ¿cuál es la ganancia máxima?", options: ["$500", "$300", "$800"], correct: 0, explanation: "G(20) = −2(400) + 80(20) − 300 = −800 + 1,600 − 300 = 500." },
      { q: "Se quiere cercar un terreno rectangular con 100 m de malla. ¿Qué dimensiones dan el área máxima?", options: ["25 m × 25 m", "40 m × 10 m", "30 m × 20 m"], correct: 0, explanation: "Con perímetro fijo, el área máxima de un rectángulo se logra con el cuadrado: 100/4 = 25 m por lado." },
      { q: "La altura de un proyectil es h(t) = −5t² + 30t. ¿En qué segundo alcanza su altura máxima?", options: ["3 s", "6 s", "5 s"], correct: 0, explanation: "h'(t) = −10t + 30 = 0 → t = 3 segundos." },
      { q: "Si f'(c) = 0 y f''(c) > 0, entonces en x = c la función tiene:", options: ["Un mínimo", "Un máximo", "Un punto de inflexión"], correct: 0, explanation: "La segunda derivada positiva indica concavidad hacia arriba, es decir, un valle." }
    ]
  }
};
