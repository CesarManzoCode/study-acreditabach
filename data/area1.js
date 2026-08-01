const AREA1_TOPICS = [
  {
    id: "1.1.1",
    area: 1,
    subarea: "1.1 Pensamiento estadístico",
    tema: "Tipos de variables",
    note: "Una variable estadística es lo que mides o registras de cada elemento de una muestra. Hay dos tipos grandes: **cuantitativas** (se expresan con números, se pueden sumar o promediar) y **cualitativas o categóricas** (describen una cualidad, no un número). Las cuantitativas se dividen en **discretas** (se cuentan, valores enteros: número de hijos, de autos) y **continuas** (se miden, pueden tener decimales: estatura, peso, tiempo). Ejemplo: en un censo, \"número de personas por vivienda\" es discreta (1,2,3...); \"estatura de cada persona\" es continua; \"color de la vivienda\" es cualitativa. Truco: si puedes contar uno por uno sin decimales, es discreta; si necesitas una regla o báscula, es continua.",
    flashcards: [
      { front: "¿Qué tipo de variable es 'número de mascotas en una casa'?", back: "Cuantitativa discreta (se cuenta, valores enteros)." },
      { front: "¿Qué tipo de variable es 'color de cabello'?", back: "Cualitativa (categórica), no numérica." }
    ],
    quiz: [
      { q: "En una encuesta se registra el número de libros que lee cada estudiante al mes. ¿Qué tipo de variable es?", options: ["Cuantitativa discreta", "Cuantitativa continua", "Cualitativa"], correct: 0, explanation: "Se cuenta en números enteros (0,1,2,3...), por eso es discreta." },
      { q: "¿Cuál de las siguientes es una variable cualitativa?", options: ["Peso corporal en kg", "Tipo de sangre (A, B, AB, O)", "Número de hermanos"], correct: 1, explanation: "El tipo de sangre describe una categoría, no una cantidad numérica." }
    ]
  },
  {
    id: "1.1.2",
    area: 1,
    subarea: "1.1 Pensamiento estadístico",
    tema: "Tipos de muestra",
    note: "Cuando no puedes estudiar a toda la población, tomas una muestra. Tres formas comunes: **muestreo sistemático** (eliges elementos a intervalos fijos, ej. cada 10º cliente que entra a una tienda); **muestreo estratificado** (divides la población en grupos o \"estratos\" con una característica común, ej. por edad, y tomas una muestra proporcional de cada grupo); **muestreo por conglomerados** (divides en grupos ya existentes, ej. escuelas o colonias, y eliges grupos completos al azar). Truco: si ves \"cada n-ésimo\" es sistemático; si ves \"por grupos con algo en común, muestra de cada uno\" es estratificado; si ves \"se eligen grupos completos al azar\" es conglomerados.",
    flashcards: [
      { front: "¿Cómo se llama el muestreo donde eliges cada 10º elemento de una lista?", back: "Muestreo sistemático." },
      { front: "¿Cómo se llama el muestreo donde divides la población en grupos con algo en común y tomas parte de cada uno?", back: "Muestreo estratificado." }
    ],
    quiz: [
      { q: "Un investigador divide una ciudad en colonias y elige al azar 5 colonias completas para encuestar a todos sus habitantes. ¿Qué tipo de muestreo es?", options: ["Sistemático", "Estratificado", "Por conglomerados"], correct: 2, explanation: "Se seleccionan grupos completos ya existentes (las colonias), característica del muestreo por conglomerados." },
      { q: "En una fábrica, un inspector revisa una pieza de cada 20 que salen de la línea de producción. ¿Qué tipo de muestreo es?", options: ["Sistemático", "Estratificado", "Por conglomerados"], correct: 0, explanation: "Elegir elementos a intervalos fijos (cada 20) es muestreo sistemático." }
    ]
  },
  {
    id: "1.1.3",
    area: 1,
    subarea: "1.1 Pensamiento estadístico",
    tema: "Medidas de tendencia central",
    note: "Las tres medidas de tendencia central resumen \"dónde está el centro\" de un conjunto de datos. **Media** = suma de todos los datos entre el número de datos. **Mediana** = el valor de en medio al ordenar los datos de menor a mayor (si son pares, se promedian los dos de en medio). **Moda** = el valor que más se repite. Ejemplo: notas 7,8,9,9,9,10. Media = (7+8+9+9+9+10)/6 ≈ 8.67. Ordenados: mediana = promedio del 3er y 4to valor = (9+9)/2 = 9. Moda = 9 (se repite 3 veces). Truco: si piden \"el valor típico\" usa media; si piden \"el de en medio\" usa mediana; si piden \"el más frecuente\" usa moda.",
    flashcards: [
      { front: "¿Cómo se calcula la media?", back: "Sumas todos los datos y divides entre el número de datos." },
      { front: "¿Cómo se calcula la moda?", back: "Es el valor que se repite más veces en el conjunto de datos." }
    ],
    quiz: [
      { q: "Un conjunto de datos es: 4, 6, 6, 8, 10, 10, 10. ¿Cuál es la moda?", options: ["6", "8", "10"], correct: 2, explanation: "El 10 aparece 3 veces, más que cualquier otro valor." },
      { q: "Las edades de 5 personas son: 20, 22, 25, 28, 30. ¿Cuál es la mediana?", options: ["22", "25", "28"], correct: 1, explanation: "Con los datos ya ordenados y 5 valores, la mediana es el valor central: 25." }
    ]
  },
  {
    id: "1.1.4",
    area: 1,
    subarea: "1.1 Pensamiento estadístico",
    tema: "Medidas de dispersión",
    note: "La dispersión indica qué tan \"esparcidos\" están los datos respecto a la media. **Varianza** = promedio de las distancias al cuadrado entre cada dato y la media. **Desviación estándar** = raíz cuadrada de la varianza (regresa a las unidades originales, más fácil de interpretar). Pasos: 1) calcula la media; 2) a cada dato réstale la media y eleva al cuadrado; 3) suma esos cuadrados y divide entre el número de datos (varianza); 4) sácale raíz cuadrada (desviación estándar). Ejemplo: datos 2,4,4,4,5,5,7,9. Media=5. Sumando las diferencias al cuadrado y dividiendo entre 8, la varianza = 4, y la desviación estándar = √4 = 2. A mayor desviación estándar, más dispersos están los datos.",
    flashcards: [
      { front: "¿Qué es la desviación estándar?", back: "La raíz cuadrada de la varianza; mide qué tan dispersos están los datos respecto a la media." },
      { front: "Pasos para calcular la varianza", back: "Media → restar la media a cada dato y elevar al cuadrado → sumar → dividir entre el número de datos." }
    ],
    quiz: [
      { q: "Un conjunto de datos tiene media 10 y varianza 9. ¿Cuál es su desviación estándar?", options: ["3", "9", "18"], correct: 0, explanation: "La desviación estándar es la raíz cuadrada de la varianza: √9 = 3." },
      { q: "Los datos 6, 8, 8, 8, 10 tienen media 8. ¿Cuál es la varianza?", options: ["1.6", "2.8", "4"], correct: 0, explanation: "La suma de las diferencias al cuadrado es 8; dividido entre 5 datos da una varianza de 1.6." }
    ]
  },
  {
    id: "1.2.1",
    area: 1,
    subarea: "1.2 Pensamiento probabilístico",
    tema: "Técnicas de conteo",
    note: "Sirven para saber \"de cuántas formas\" puede pasar algo. **Permutación** = cuando el orden importa (ej. quién gana oro, plata y bronce). Fórmula: nPr = n! / (n-r)!. **Combinación** = cuando el orden NO importa (ej. elegir un equipo de 3 personas). Fórmula: nCr = n! / (r!(n-r)!). El factorial \"!\" significa multiplicar ese número por todos los menores hasta 1 (ej. 4! = 4×3×2×1 = 24). Ejemplo permutación: de 5 corredores, ¿de cuántas formas se reparten oro, plata y bronce? 5P3 = 5×4×3 = 60. Ejemplo combinación: de 7 personas, ¿cuántos equipos de 3 se pueden formar? 7C3 = 35. Truco: si cambiar el orden crea un resultado distinto, usa permutación; si no importa, usa combinación.",
    flashcards: [
      { front: "¿Cuándo usas permutación en vez de combinación?", back: "Cuando el orden de los elementos sí importa." },
      { front: "Fórmula de combinaciones", back: "nCr = n! / (r!(n-r)!)" }
    ],
    quiz: [
      { q: "De un grupo de 6 amigos, ¿de cuántas formas distintas se pueden elegir 2 para representar al grupo (sin importar el orden)?", options: ["12", "15", "30"], correct: 1, explanation: "Como el orden no importa, se usa combinación: 6C2 = 6!/(2!·4!) = 15." },
      { q: "En una carrera con 4 participantes, ¿de cuántas formas distintas se pueden asignar los lugares 1°, 2° y 3°?", options: ["24", "12", "64"], correct: 0, explanation: "Como el orden sí importa (los lugares son distintos), se usa permutación: 4P3 = 4×3×2 = 24." }
    ]
  },
  {
    id: "1.2.2",
    area: 1,
    subarea: "1.2 Pensamiento probabilístico",
    tema: "Probabilidad simple",
    note: "La probabilidad de un evento es cuántos resultados favorables hay entre el total de resultados posibles: P = (casos favorables) / (casos totales). Se puede expresar como fracción, decimal o porcentaje (multiplicando por 100). Ejemplo: una caja tiene 4 canicas rojas y 6 azules (10 en total). La probabilidad de sacar una azul es 6/10 = 0.6 = 60%. Si lanzas un dado normal de 6 caras, la probabilidad de que caiga un número par (2,4,6) es 3/6 = 0.5 = 50%. Truco: identifica primero el total de casos posibles (todo el espacio) y luego cuenta solo los casos que cumplen la condición que piden.",
    flashcards: [
      { front: "Fórmula de probabilidad simple", back: "P = casos favorables / casos totales" },
      { front: "Probabilidad de sacar un as de una baraja de 52 cartas (4 ases)", back: "4/52 ≈ 7.7%" }
    ],
    quiz: [
      { q: "Una urna tiene 3 pelotas blancas, 5 negras y 2 rojas (10 en total). ¿Cuál es la probabilidad de sacar una pelota negra?", options: ["30%", "50%", "80%"], correct: 1, explanation: "Hay 5 pelotas negras de 10 totales: 5/10 = 50%." },
      { q: "Se lanza un dado de 6 caras. ¿Cuál es la probabilidad de obtener un número mayor a 4 (es decir, 5 o 6)?", options: ["16.6%", "33.3%", "50%"], correct: 1, explanation: "Hay 2 casos favorables (5 y 6) de 6 posibles: 2/6 = 33.3%." }
    ]
  },
  {
    id: "1.2.3",
    area: 1,
    subarea: "1.2 Pensamiento probabilístico",
    tema: "Probabilidad condicional",
    note: "La probabilidad condicional calcula la probabilidad de un evento SABIENDO que ya ocurrió otro. El **teorema de Bayes** permite \"voltear\" la condición: P(A|B) = [P(B|A) × P(A)] / P(B). Ejemplo: una fábrica tiene dos máquinas: la Máquina A hace el 60% de las piezas con 5% defectuosas, la Máquina B hace el 40% con 10% defectuosas. Si eliges una pieza defectuosa al azar, ¿cuál es la probabilidad de que venga de la Máquina A? Primero P(defectuosa) = 0.6×0.05 + 0.4×0.10 = 0.07. Luego P(A|defectuosa) = 0.03/0.07 ≈ 42.9%. Truco: primero calcula la probabilidad total del evento sumando todos los caminos posibles, y luego divide solo el camino que te interesa entre ese total.",
    flashcards: [
      { front: "Fórmula del teorema de Bayes", back: "P(A|B) = [P(B|A) × P(A)] / P(B)" },
      { front: "¿Qué significa P(A|B)?", back: "La probabilidad de que ocurra A, dado que ya sabemos que ocurrió B." }
    ],
    quiz: [
      { q: "Se lanza una moneda para elegir entre la Urna 1 (30% bolas blancas) y la Urna 2 (60% bolas blancas), cada una con 50% de probabilidad de ser elegida. Si se saca una bola blanca, ¿cuál es la probabilidad de que haya salido de la Urna 2?", options: ["33.3%", "50%", "66.7%"], correct: 2, explanation: "P(blanca)=0.5(0.3)+0.5(0.6)=0.45. P(Urna2|blanca)=0.5(0.6)/0.45≈66.7%." },
      { q: "En una escuela, 40% de los alumnos son de la carrera A con 20% de reprobación; 60% son de la carrera B con 10% de reprobación. Si un alumno reprobó, ¿cuál es la probabilidad de que sea de la carrera A?", options: ["42.9%", "50%", "57.1%"], correct: 2, explanation: "P(reprobó)=0.4(0.2)+0.6(0.1)=0.14. P(A|reprobó)=0.08/0.14≈57.1%." }
    ]
  },
  {
    id: "1.3.1",
    area: 1,
    subarea: "1.3 Pensamiento algebraico",
    tema: "Representación de variables por medio de expresiones algebraicas",
    note: "Una expresión algebraica traduce una relación entre dos cantidades usando letras (variables) y números. Identifica primero el **costo o valor fijo** (número solo, no depende de nada) y la **parte que cambia** (número que multiplica a la variable). Ejemplo: un taxi cobra $8 de banderazo (fijo) más $3 por cada km recorrido (k). El total pagado T se representa como T = 8 + 3k. Otro ejemplo: un plomero cobra $300 por visita más $120 por cada hora trabajada (h): el pago total P = 300 + 120h. Truco: la parte que NO tiene letra es el costo fijo; la parte que multiplica a la variable es la tarifa o costo por unidad.",
    flashcards: [
      { front: "¿Cómo se representa 'costo fijo de $50 más $20 por cada unidad x'?", back: "C = 50 + 20x" },
      { front: "En una expresión algebraica, ¿qué representa el número que va solo (sin letra)?", back: "El costo o valor fijo, que no cambia." }
    ],
    quiz: [
      { q: "Una empresa de mensajería cobra $40 de envío base más $6 por cada kilómetro (k) recorrido. ¿Qué expresión representa el costo total C?", options: ["C = 40 + 6k", "C = 6 + 40k", "C = 40 × 6k"], correct: 0, explanation: "El $40 es el costo fijo y $6 es la tarifa por cada km, entonces C = 40 + 6k." },
      { q: "Un gimnasio cobra una inscripción de $200 más $150 por cada mes (m) de membresía. ¿Qué expresión representa el pago total P?", options: ["P = 150 + 200m", "P = 200 + 150m", "P = 200 × 150m"], correct: 1, explanation: "El costo fijo es $200 (inscripción) y la parte variable es $150 por mes: P = 200 + 150m." }
    ]
  },
  {
    id: "1.3.2",
    area: 1,
    subarea: "1.3 Pensamiento algebraico",
    tema: "Factorización de expresiones algebraicas",
    note: "Factorizar es lo contrario de multiplicar: partes de un polinomio (ej. x²+7x+12) y lo escribes como producto de dos binomios más simples. Para x²+bx+c, busca dos números que MULTIPLICADOS den \"c\" y SUMADOS den \"b\". Ejemplo: x²+7x+12 → buscas dos números que multiplicados den 12 y sumados den 7: son 3 y 4. Entonces x²+7x+12 = (x+3)(x+4). Otro ejemplo: x²-5x+6 → buscas números que multiplicados den 6 y sumados den -5: son -2 y -3. Entonces x²-5x+6 = (x-2)(x-3). Truco: siempre puedes comprobar tu resultado multiplicando de vuelta los binomios para ver si te da el polinomio original.",
    flashcards: [
      { front: "Factoriza x²+5x+6", back: "(x+2)(x+3), porque 2×3=6 y 2+3=5" },
      { front: "¿Qué dos condiciones deben cumplir los números para factorizar x²+bx+c?", back: "Deben multiplicarse para dar 'c' y sumarse para dar 'b'." }
    ],
    quiz: [
      { q: "¿Cuál es la factorización de x² + 9x + 20?", options: ["(x+4)(x+5)", "(x+2)(x+10)", "(x+1)(x+20)"], correct: 0, explanation: "4×5=20 y 4+5=9, por lo tanto x²+9x+20 = (x+4)(x+5)." },
      { q: "¿Cuál es la factorización de x² - 3x - 10?", options: ["(x-5)(x+2)", "(x-2)(x+5)", "(x-10)(x+1)"], correct: 0, explanation: "-5×2=-10 y -5+2=-3, por lo tanto x²-3x-10 = (x-5)(x+2)." }
    ]
  },
  {
    id: "1.3.3",
    area: 1,
    subarea: "1.3 Pensamiento algebraico",
    tema: "Producto notable de binomios",
    note: "Los productos notables son fórmulas rápidas para elevar binomios al cuadrado: (a+b)² = a²+2ab+b² y (a-b)² = a²-2ab+b². Sirven para \"completar el cuadrado\" y encontrar el valor máximo o mínimo de una función cuadrática sin usar cálculo. Pasos: convierte x²+bx+c a la forma (x-h)²+k, donde el mínimo (o máximo si el signo es negativo) es k, alcanzado en x=h. Ejemplo: x²-6x+5. Como (x-3)²=x²-6x+9, entonces x²-6x+5 = (x-3)²-4. El valor mínimo es -4 y ocurre en x=3. Truco: si el coeficiente de x² es positivo, la función tiene un mínimo; si es negativo, tiene un máximo.",
    flashcards: [
      { front: "Fórmula del binomio al cuadrado (a-b)²", back: "a² - 2ab + b²" },
      { front: "En la forma (x-h)²+k, ¿qué representa k?", back: "El valor mínimo (o máximo) de la función cuadrática." }
    ],
    quiz: [
      { q: "Al completar el cuadrado en x² - 10x + 21, se obtiene (x-5)² - 4. ¿Cuál es el valor mínimo de esta función y en qué x ocurre?", options: ["Mínimo -4 en x=5", "Mínimo 4 en x=5", "Mínimo -4 en x=10"], correct: 0, explanation: "La forma (x-5)²-4 indica que el mínimo es -4 y ocurre cuando x=5 (donde el cuadrado vale 0)." },
      { q: "¿Cuál es la forma de cuadrado completado de x² - 8x + 10?", options: ["(x-4)² - 6", "(x-4)² + 6", "(x-8)² - 6"], correct: 0, explanation: "(x-4)² = x²-8x+16, entonces x²-8x+10 = (x-4)²+10-16 = (x-4)²-6." }
    ]
  },
  {
    id: "1.3.4",
    area: 1,
    subarea: "1.3 Pensamiento algebraico",
    tema: "Ecuaciones lineales con una incógnita",
    note: "Resolver una ecuación lineal significa encontrar el valor de \"x\" que hace verdadera la igualdad. Regla de oro: lo que haces de un lado, lo haces del otro. Pasos: 1) agrupa los términos con x de un lado y los números del otro (moviendo términos cambias su signo); 2) despeja x dividiendo entre su coeficiente. Ejemplo: 5x - 8 = 27 → 5x = 27+8 = 35 → x = 35/5 = 7. Otro ejemplo con paréntesis: 2(x+3) = 16 → primero reparte el 2: 2x+6=16 → 2x=10 → x=5. Truco: siempre comprueba sustituyendo tu resultado en la ecuación original para verificar que ambos lados sean iguales.",
    flashcards: [
      { front: "Resuelve: 4x + 3 = 19", back: "x = 4, porque 4x=16, x=16/4=4" },
      { front: "¿Qué haces al pasar un término al otro lado de la igualdad?", back: "Cambias su signo (suma pasa como resta y viceversa)." }
    ],
    quiz: [
      { q: "Resuelve la ecuación: 6x - 9 = 21", options: ["x = 5", "x = 3", "x = 4"], correct: 0, explanation: "6x = 21+9 = 30, entonces x = 30/6 = 5." },
      { q: "Resuelve la ecuación: 3(x - 2) = 15", options: ["x = 5", "x = 7", "x = 9"], correct: 1, explanation: "Al repartir: 3x-6=15, entonces 3x=21 y x=21/3=7." }
    ]
  },
  {
    id: "1.3.5",
    area: 1,
    subarea: "1.3 Pensamiento algebraico",
    tema: "Ecuaciones cuadráticas con una incógnita",
    note: "Una ecuación cuadrática tiene la forma ax²+bx+c=0 y puede tener hasta 2 soluciones (raíces). La forma más rápida cuando factoriza fácil: convierte a (x-r1)(x-r2)=0, donde r1 y r2 son las raíces (porque cualquier cosa multiplicada por 0 da 0). Ejemplo: x²-5x+6=0 → factoriza como (x-2)(x-3)=0 → las raíces son x=2 y x=3. Si no factoriza fácil, usa la fórmula general: x = [-b ± √(b²-4ac)] / 2a. Ejemplo con factorización: x²-x-12=0 → (x-4)(x+3)=0 → x=4 o x=-3. Truco: siempre comprueba sustituyendo cada raíz en la ecuación original.",
    flashcards: [
      { front: "Fórmula general para ecuaciones cuadráticas", back: "x = [-b ± √(b²-4ac)] / 2a" },
      { front: "Raíces de x²-7x+12=0", back: "x=3 y x=4, porque (x-3)(x-4)=0" }
    ],
    quiz: [
      { q: "¿Cuáles son las raíces de x² - 9x + 20 = 0?", options: ["x=4 y x=5", "x=2 y x=10", "x=-4 y x=-5"], correct: 0, explanation: "Factorizando: (x-4)(x-5)=0, ya que -4×-5=20 y -4+-5=-9. Las raíces son x=4 y x=5." },
      { q: "¿Cuáles son las raíces de x² + 2x - 15 = 0?", options: ["x=-5 y x=3", "x=5 y x=-3", "x=-3 y x=-5"], correct: 0, explanation: "Factorizando: (x+5)(x-3)=0, porque 5×(-3)=-15 y 5+(-3)=2. Las raíces son x=-5 y x=3." }
    ]
  },
  {
    id: "1.3.6",
    area: 1,
    subarea: "1.3 Pensamiento algebraico",
    tema: "Sistemas de ecuaciones lineales con dos incógnitas",
    note: "Un sistema de ecuaciones tiene dos incógnitas (x, y) y dos ecuaciones; resolverlo es hallar los valores que cumplen ambas al mismo tiempo. El método más rápido para el examen es **suma y resta**: si sumas o restas las dos ecuaciones puedes eliminar una variable. Ejemplo: x+y=10 y x-y=2. Sumando ambas: 2x=12 → x=6. Sustituyendo en la primera: 6+y=10 → y=4. Otro ejemplo: 2x+y=11 y x-y=1. Sumando: 3x=12 → x=4, y sustituyendo: 4-y=1 → y=3. Truco: si los coeficientes de una variable ya son iguales (o solo cambian de signo), simplemente suma o resta las ecuaciones directamente.",
    flashcards: [
      { front: "Método rápido para resolver sistemas de 2x2", back: "Suma o resta las ecuaciones para eliminar una variable, luego sustituye." },
      { front: "Resuelve: x+y=8, x-y=4", back: "x=6, y=2 (sumando: 2x=12, x=6; luego y=8-6=2)" }
    ],
    quiz: [
      { q: "Resuelve el sistema: x + y = 14, x - y = 6", options: ["x=10, y=4", "x=8, y=6", "x=4, y=10"], correct: 0, explanation: "Sumando ambas ecuaciones: 2x=20, x=10. Sustituyendo: 10+y=14, y=4." },
      { q: "Resuelve el sistema: 3x + y = 17, x - y = 3", options: ["x=5, y=2", "x=4, y=5", "x=6, y=-1"], correct: 0, explanation: "Sumando ambas ecuaciones: 4x=20, x=5. Sustituyendo en x-y=3: 5-y=3, y=2." }
    ]
  },
  {
    id: "1.3.7",
    area: 1,
    subarea: "1.3 Pensamiento algebraico",
    tema: "Interés simple",
    note: "El interés simple se calcula solo sobre el capital inicial, sin acumular. Fórmula: I = C × r × t, donde C=capital, r=tasa (en decimal, ej. 8% = 0.08) y t=tiempo (en años). Para hallar el **plazo**: t = I / (C×r). Para hallar la **tasa**: r = I / (C×t). Ejemplo (plazo): si un capital de $5,000 a tasa anual de 8% genera $600 de interés, el tiempo es t = 600/(5000×0.08) = 1.5 años. Ejemplo (tasa): si $8,000 generan $960 de interés en 2 años, la tasa es r = 960/(8000×2) = 0.06 = 6%. Truco: siempre convierte el porcentaje a decimal antes de calcular (divide entre 100).",
    flashcards: [
      { front: "Fórmula del interés simple", back: "I = C × r × t (Capital × tasa × tiempo)" },
      { front: "¿Cómo despejas el tiempo (t) de la fórmula de interés simple?", back: "t = I / (C × r)" }
    ],
    quiz: [
      { q: "Un capital de $6,000 genera $720 de interés simple con una tasa anual de 4%. ¿Cuánto tiempo estuvo invertido?", options: ["2 años", "3 años", "4 años"], correct: 1, explanation: "t = I/(C×r) = 720/(6000×0.04) = 720/240 = 3 años." },
      { q: "Un capital de $10,000 genera $1,500 de interés simple en 3 años. ¿Cuál fue la tasa anual?", options: ["3%", "5%", "7.5%"], correct: 1, explanation: "r = I/(C×t) = 1500/(10000×3) = 0.05 = 5%." }
    ]
  },
  {
    id: "1.3.8",
    area: 1,
    subarea: "1.3 Pensamiento algebraico",
    tema: "Interés compuesto",
    note: "A diferencia del interés simple, el interés compuesto se calcula sobre el capital MÁS los intereses ya ganados (se van acumulando). Fórmula: M = C(1+r)^t, donde M=monto final, C=capital, r=tasa en decimal y t=número de periodos. Ejemplo: $3,000 a tasa anual de 10% durante 2 años: M = 3000×(1.10)² = 3000×1.21 = $3,630. También puedes usarla al revés: si sabes C y M, hallas la tasa: (1+r)^t = M/C. Ejemplo: $2,000 que se convierten en $2,420 en 2 años → (1+r)²=1.21 → 1+r=1.1 → r=10%. Truco: cada periodo, el interés se calcula sobre un capital más grande que el anterior.",
    flashcards: [
      { front: "Fórmula del monto en interés compuesto", back: "M = C(1+r)^t" },
      { front: "Diferencia clave entre interés simple y compuesto", back: "El compuesto genera interés sobre los intereses acumulados; el simple solo sobre el capital inicial." }
    ],
    quiz: [
      { q: "¿Cuál es el monto final de $4,000 invertidos a una tasa anual de 5% compuesta durante 2 años?", options: ["$4,200", "$4,410", "$4,620"], correct: 1, explanation: "M = 4000×(1.05)² = 4000×1.1025 = $4,410." },
      { q: "Un capital de $5,000 se convierte en $6,050 después de 2 años con interés compuesto anual. ¿Cuál fue la tasa?", options: ["8%", "10%", "12%"], correct: 1, explanation: "(1+r)² = 6050/5000 = 1.21, entonces 1+r=1.1, por lo tanto r=10%." }
    ]
  },
  {
    id: "1.4.1",
    area: 1,
    subarea: "1.4 Pensamiento aritmético",
    tema: "Mínimo común múltiplo (MCM)",
    note: "El Mínimo Común Múltiplo (MCM) de dos números es el número más pequeño que es múltiplo de ambos al mismo tiempo. Forma rápida: descompón cada número en sus factores primos y toma cada factor primo elevado a su mayor potencia. Ejemplo: MCM(6,8). 6=2×3, 8=2³. Tomas 2³ (mayor potencia de 2) y 3 (única potencia de 3): MCM = 2³×3 = 24. Otro ejemplo: MCM(4,10). 4=2², 10=2×5. MCM = 2²×5 = 20. Truco: si un número es múltiplo del otro (ej. 4 y 8), el MCM es el número más grande (8).",
    flashcards: [
      { front: "¿Qué es el MCM de dos números?", back: "El menor número que es múltiplo de ambos a la vez." },
      { front: "MCM(3,5)", back: "15 (como son primos entre sí, el MCM es su producto)" }
    ],
    quiz: [
      { q: "¿Cuál es el MCM de 9 y 12?", options: ["24", "36", "108"], correct: 1, explanation: "9=3², 12=2²×3. El MCM toma la mayor potencia de cada factor: 2²×3² = 36." },
      { q: "¿Cuál es el MCM de 5 y 15?", options: ["5", "15", "75"], correct: 1, explanation: "Como 15 ya es múltiplo de 5, el MCM es el número mayor: 15." }
    ]
  },
  {
    id: "1.4.2",
    area: 1,
    subarea: "1.4 Pensamiento aritmético",
    tema: "Máximo común divisor (MCD)",
    note: "El Máximo Común Divisor (MCD) de dos números es el número más grande que divide exactamente a ambos. Forma rápida: descompón cada número en factores primos y toma solo los factores comunes, elevados a la menor potencia en que aparecen. Ejemplo: MCD(12,18). 12=2²×3, 18=2×3². Comunes: 2 (menor potencia 2¹) y 3 (menor potencia 3¹): MCD = 2×3 = 6. Otro ejemplo: MCD(24,36). 24=2³×3, 36=2²×3². Comunes: 2² y 3¹: MCD = 4×3 = 12. Truco: el MCD siempre es menor o igual que el número más pequeño de los dos.",
    flashcards: [
      { front: "¿Qué es el MCD de dos números?", back: "El número más grande que divide exactamente a ambos." },
      { front: "MCD(8,12)", back: "4 (8=2³, 12=2²×3, factor común: 2²=4)" }
    ],
    quiz: [
      { q: "¿Cuál es el MCD de 20 y 30?", options: ["5", "10", "60"], correct: 1, explanation: "20=2²×5, 30=2×3×5. Los factores comunes son 2×5=10." },
      { q: "¿Cuál es el MCD de 15 y 45?", options: ["3", "5", "15"], correct: 2, explanation: "Como 45 es múltiplo de 15, el MCD es el número menor: 15." }
    ]
  },
  {
    id: "1.4.3",
    area: 1,
    subarea: "1.4 Pensamiento aritmético",
    tema: "Razones aritméticas o geométricas",
    note: "Una sucesión numérica sigue un patrón. En una sucesión **aritmética**, cada término se obtiene sumando siempre el mismo número (la \"razón\" o diferencia común). En una sucesión **geométrica**, cada término se obtiene multiplicando siempre por el mismo número (la \"razón\" o cociente común). Para hallar la razón: en la aritmética, resta un término menos el anterior; en la geométrica, divide un término entre el anterior. Ejemplo aritmético: 7,12,17,22... razón = 12-7 = 5. Ejemplo geométrico: 2,6,18,54... razón = 6/2 = 3. Truco: si los números crecen sumando siempre lo mismo, es aritmética; si crecen multiplicando, es geométrica.",
    flashcards: [
      { front: "¿Cómo hallas la razón de una sucesión aritmética?", back: "Restas un término menos el término anterior." },
      { front: "¿Cómo hallas la razón de una sucesión geométrica?", back: "Divides un término entre el término anterior." }
    ],
    quiz: [
      { q: "¿Cuál es la razón de la sucesión aritmética 4, 11, 18, 25...?", options: ["5", "7", "9"], correct: 1, explanation: "Cada término aumenta 7 respecto al anterior: 11-4=7, 18-11=7." },
      { q: "¿Cuál es la razón de la sucesión geométrica 5, 15, 45, 135...?", options: ["3", "5", "10"], correct: 0, explanation: "Cada término se multiplica por 3: 15/5=3, 45/15=3." }
    ]
  },
  {
    id: "1.4.4",
    area: 1,
    subarea: "1.4 Pensamiento aritmético",
    tema: "Proporcionalidad directa o inversa",
    note: "En la proporcionalidad **directa**, cuando una cantidad aumenta, la otra aumenta en la misma proporción. Se resuelve con la regla de tres: multiplica cruzado y divide. Ejemplo: si 5 kg de manzanas cuestan $150, ¿cuánto cuestan 8 kg? (150/5)×8 = 30×8 = $240. En la proporcionalidad **inversa**, cuando una cantidad aumenta, la otra disminuye, y el producto de ambas siempre es el mismo. Ejemplo: si 4 obreros terminan una obra en 12 días, ¿cuántos días tardarían 6 obreros? El producto 4×12=48 se mantiene: 48/6 = 8 días. Truco: si tiene sentido que \"más gente hace el trabajo más rápido\", es inversa; si es \"más cantidad, más costo\", es directa.",
    flashcards: [
      { front: "¿Cómo identificas proporcionalidad inversa?", back: "Cuando una cantidad aumenta, la otra disminuye (ej. más trabajadores, menos días)." },
      { front: "Regla para proporcionalidad directa", back: "Multiplica cruzado y divide (regla de tres)." }
    ],
    quiz: [
      { q: "Si 6 litros de gasolina cuestan $132, ¿cuánto cuestan 10 litros?", options: ["$200", "$220", "$240"], correct: 1, explanation: "Precio por litro = 132/6=$22. Para 10 litros: 22×10=$220 (proporcionalidad directa)." },
      { q: "3 máquinas tardan 8 horas en llenar un almacén. ¿Cuántas horas tardarían 4 máquinas?", options: ["6 horas", "10 horas", "12 horas"], correct: 0, explanation: "Es proporcionalidad inversa: 3×8=24 (constante). Con 4 máquinas: 24/4=6 horas." }
    ]
  },
  {
    id: "1.4.5",
    area: 1,
    subarea: "1.4 Pensamiento aritmético",
    tema: "Porcentajes",
    note: "Un porcentaje es una parte de 100. Para calcular el \"x% de una cantidad\", convierte el porcentaje a decimal (divide entre 100) y multiplica. Ejemplo (descuento): un artículo cuesta $850 con 20% de descuento. Descuento = 850×0.20 = $170. Precio final = 850-170 = $680. Ejemplo (aumento, como el IVA): un producto cuesta $1,200 más 16% de IVA. IVA = 1200×0.16 = $192. Precio final = 1200+192 = $1,392. Truco rápido: para descuento o aumento directo, multiplica por (1 - % en decimal) para descuento, o (1 + % en decimal) para aumento. Ejemplo: 850×0.80=680 (mismo resultado).",
    flashcards: [
      { front: "¿Cómo calculas el 15% de $600?", back: "600 × 0.15 = $90" },
      { front: "Atajo para calcular precio con descuento del 25%", back: "Multiplica por (1-0.25) = 0.75" }
    ],
    quiz: [
      { q: "Un artículo cuesta $2,400 y tiene un descuento del 30%. ¿Cuál es el precio final?", options: ["$1,680", "$1,800", "$2,070"], correct: 0, explanation: "Descuento = 2400×0.30=$720. Precio final = 2400-720 = $1,680." },
      { q: "Un producto cuesta $950 antes de impuestos y se le agrega un IVA de 16%. ¿Cuál es el precio final?", options: ["$1,102", "$1,050", "$966"], correct: 0, explanation: "IVA = 950×0.16=$152. Precio final = 950+152 = $1,102." }
    ]
  },
  {
    id: "1.5.1",
    area: 1,
    subarea: "1.5 Pensamiento geométrico",
    tema: "Área de figuras geométricas simples",
    note: "Área del **triángulo** = (base × altura) / 2. Área del **trapecio** = ((base mayor + base menor) / 2) × altura. La altura siempre es la distancia perpendicular (a 90°) entre la base y el vértice o lado opuesto, no un lado inclinado. Ejemplo triángulo: base=10 cm, altura=6 cm → área = (10×6)/2 = 30 cm². Ejemplo trapecio: base mayor=12 cm, base menor=8 cm, altura=5 cm → área = ((12+8)/2)×5 = 50 cm². Truco: recuerda que el triángulo siempre se divide entre 2 (es \"medio rectángulo\"), y el trapecio promedia sus dos bases antes de multiplicar por la altura.",
    flashcards: [
      { front: "Fórmula del área del triángulo", back: "(base × altura) / 2" },
      { front: "Fórmula del área del trapecio", back: "((base mayor + base menor) / 2) × altura" }
    ],
    quiz: [
      { q: "¿Cuál es el área de un triángulo con base de 14 cm y altura de 9 cm?", options: ["63 cm²", "126 cm²", "23 cm²"], correct: 0, explanation: "Área = (14×9)/2 = 126/2 = 63 cm²." },
      { q: "¿Cuál es el área de un trapecio con bases de 10 cm y 6 cm, y altura de 4 cm?", options: ["32 cm²", "64 cm²", "16 cm²"], correct: 0, explanation: "Área = ((10+6)/2)×4 = 8×4 = 32 cm²." }
    ]
  },
  {
    id: "1.5.2",
    area: 1,
    subarea: "1.5 Pensamiento geométrico",
    tema: "Propiedades de triángulos congruentes o semejantes",
    note: "Dos triángulos son **congruentes** si tienen exactamente el mismo tamaño y forma (lados y ángulos iguales). Son **semejantes** si tienen la misma forma pero distinto tamaño (ángulos iguales, lados proporcionales). Criterios comunes: **LLL** (los tres lados proporcionales), **LAL** (dos lados y el ángulo entre ellos), **AA** (dos ángulos iguales, suficiente para semejanza). En triángulos semejantes, si conoces la \"escala\" (factor de proporción), puedes hallar lados desconocidos. Ejemplo: triángulo ABC semejante a DEF con escala 2. Si AB=4 y BC=6, entonces DE=8 y EF=12. Truco: primero identifica qué lados se corresponden entre los dos triángulos, y calcula la razón entre un par de lados conocidos para usarla en los demás.",
    flashcards: [
      { front: "Diferencia entre triángulos congruentes y semejantes", back: "Congruentes: mismo tamaño y forma. Semejantes: misma forma, distinto tamaño (lados proporcionales)." },
      { front: "Criterio de semejanza AA", back: "Si dos ángulos de un triángulo son iguales a dos ángulos de otro, los triángulos son semejantes." }
    ],
    quiz: [
      { q: "El triángulo ABC es semejante al triángulo DEF con una escala de 3 (DEF es 3 veces más grande). Si el lado AB mide 5 cm, ¿cuánto mide el lado correspondiente DE?", options: ["8 cm", "15 cm", "5 cm"], correct: 1, explanation: "Como la escala es 3, DE = AB × 3 = 5×3 = 15 cm." },
      { q: "¿Qué característica NO es necesaria para que dos triángulos sean semejantes?", options: ["Que tengan la misma forma", "Que sus ángulos correspondientes sean iguales", "Que tengan el mismo tamaño"], correct: 2, explanation: "La semejanza no requiere el mismo tamaño, solo la misma forma (ángulos iguales y lados proporcionales)." }
    ]
  },
  {
    id: "1.5.3",
    area: 1,
    subarea: "1.5 Pensamiento geométrico",
    tema: "Teorema de Pitágoras",
    note: "En un triángulo rectángulo (un ángulo de 90°), el teorema de Pitágoras relaciona sus tres lados: **a² + b² = c²**, donde \"c\" es la hipotenusa (el lado más largo, opuesto al ángulo recto) y \"a\",\"b\" son los catetos. Para hallar la hipotenusa: c=√(a²+b²). Para hallar un cateto: a=√(c²-b²). Ejemplo: catetos de 6 y 8 → hipotenusa = √(6²+8²) = √100 = 10. Ejemplo inverso: hipotenusa=13, un cateto=5 → el otro cateto = √(13²-5²) = √144 = 12. Truco: la hipotenusa siempre es el lado más largo y siempre está sola de un lado de la fórmula.",
    flashcards: [
      { front: "Fórmula del teorema de Pitágoras", back: "a² + b² = c² (c es la hipotenusa)" },
      { front: "¿Cuál es la hipotenusa de un triángulo con catetos 3 y 4?", back: "5, porque √(3²+4²)=√25=5" }
    ],
    quiz: [
      { q: "Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?", options: ["15 cm", "21 cm", "13 cm"], correct: 0, explanation: "c=√(9²+12²)=√(81+144)=√225=15 cm." },
      { q: "Un triángulo rectángulo tiene hipotenusa de 17 cm y un cateto de 8 cm. ¿Cuánto mide el otro cateto?", options: ["9 cm", "15 cm", "12 cm"], correct: 1, explanation: "El cateto faltante = √(17²-8²) = √(289-64) = √225 = 15 cm." }
    ]
  },
  {
    id: "1.5.4",
    area: 1,
    subarea: "1.5 Pensamiento geométrico",
    tema: "Área de figuras en el plano cartesiano",
    note: "En el plano cartesiano (ejes x, y), puedes calcular áreas usando las coordenadas de los vértices. Para un **cuadrado**, halla la longitud del lado (distancia entre dos vértices) y elévalo al cuadrado. Para un **triángulo rectángulo** con catetos paralelos a los ejes, usa (base×altura)/2, midiendo base y altura directamente de las coordenadas. Ejemplo cuadrado: vértices (1,1),(1,5),(5,5),(5,1) → el lado mide 5-1=4 → área = 4²=16. Ejemplo triángulo: vértices (0,0),(5,0),(0,4) → base=5, altura=4 → área=(5×4)/2=10. Truco: cuando los lados son horizontales o verticales, solo resta las coordenadas x o y para obtener la longitud.",
    flashcards: [
      { front: "¿Cómo hallas el lado de un cuadrado en el plano cartesiano?", back: "Restas las coordenadas x (o y) de dos vértices consecutivos." },
      { front: "Área de un triángulo rectángulo con catetos sobre los ejes", back: "(base × altura) / 2, usando las coordenadas como longitudes." }
    ],
    quiz: [
      { q: "Un cuadrado en el plano cartesiano tiene vértices en (2,2), (2,7), (7,7) y (7,2). ¿Cuál es su área?", options: ["20", "25", "35"], correct: 1, explanation: "El lado mide 7-2=5. Área = 5² = 25 unidades²." },
      { q: "Un triángulo rectángulo tiene vértices en (0,0), (6,0) y (0,8). ¿Cuál es su área?", options: ["14", "24", "48"], correct: 1, explanation: "Base=6, altura=8. Área = (6×8)/2 = 24 unidades²." }
    ]
  },
  {
    id: "1.6.1",
    area: 1,
    subarea: "1.6 Pensamiento variacional",
    tema: "Representación de intervalos por medio de desigualdades",
    note: "Un intervalo en la recta numérica se representa con una desigualdad. **Círculo cerrado (relleno)** significa que el número SÍ está incluido (se usa ≤ o ≥). **Círculo abierto (vacío)** significa que el número NO está incluido (se usa < o >). Si el intervalo está sombreado entre dos puntos, ambas condiciones se combinan. Ejemplo: círculo cerrado en -2 y círculo abierto en 6, con sombreado entre ambos → -2 ≤ x < 6. Ejemplo: círculo abierto en 0 con flecha hacia la derecha sin límite → x > 0. Truco: la flecha te dice hacia dónde sigue el intervalo, y el tipo de círculo te dice si incluir (cerrado) o no (abierto) ese extremo.",
    flashcards: [
      { front: "¿Qué significa un círculo cerrado (relleno) en una recta numérica?", back: "Que ese valor SÍ está incluido en el intervalo (se usa ≤ o ≥)." },
      { front: "¿Qué desigualdad representa un círculo abierto en 3 con flecha a la izquierda?", back: "x < 3" }
    ],
    quiz: [
      { q: "En una recta numérica hay un círculo cerrado en 1 y un círculo cerrado en 8, con sombreado entre ambos. ¿Qué desigualdad representa este intervalo?", options: ["1 < x < 8", "1 ≤ x ≤ 8", "1 ≤ x < 8"], correct: 1, explanation: "Ambos círculos están cerrados (rellenos), por lo que ambos extremos se incluyen: 1 ≤ x ≤ 8." },
      { q: "En una recta numérica hay un círculo abierto en -4 y una flecha que continúa hacia la derecha sin límite. ¿Qué desigualdad representa este intervalo?", options: ["x > -4", "x ≥ -4", "x < -4"], correct: 0, explanation: "El círculo abierto en -4 indica que no se incluye, y la flecha a la derecha indica valores mayores: x > -4." }
    ]
  },
  {
    id: "1.6.2",
    area: 1,
    subarea: "1.6 Pensamiento variacional",
    tema: "Gráficas de funciones de una variable real",
    note: "Al leer la gráfica de una función puedes identificar varias características sin hacer cálculos. **Máximo**: el punto más alto (la curva sube y luego baja). **Mínimo**: el punto más bajo (baja y luego sube). **Creciente**: la curva sube de izquierda a derecha. **Decreciente**: la curva baja de izquierda a derecha. **Concavidad hacia arriba** (como una \"U\"): forma de mínimo. **Concavidad hacia abajo** (como una \"∩\"): forma de máximo. Ejemplo: una parábola que abre hacia abajo tiene un máximo en su punto más alto y es cóncava hacia abajo en toda su gráfica. Truco: imagina que caminas sobre la curva de izquierda a derecha: si subes, es creciente; si bajas, es decreciente.",
    flashcards: [
      { front: "¿Cómo se ve una función con concavidad hacia arriba?", back: "Como una 'U': tiene un mínimo." },
      { front: "¿Qué significa que una función sea decreciente en un intervalo?", back: "Que sus valores bajan conforme x aumenta (la gráfica va hacia abajo de izquierda a derecha)." }
    ],
    quiz: [
      { q: "Una parábola abre hacia arriba (forma de 'U'). ¿Qué tipo de punto tiene en su vértice?", options: ["Un máximo", "Un mínimo", "Ni máximo ni mínimo"], correct: 1, explanation: "Cuando una parábola abre hacia arriba, su vértice es el punto más bajo: un mínimo." },
      { q: "En la gráfica de una función, la curva sube desde x=0 hasta x=5, y después de x=5 empieza a bajar. ¿Qué representa el punto en x=5?", options: ["Un mínimo", "Un máximo", "Un punto de intersección"], correct: 1, explanation: "Si la función sube y luego baja en x=5, ese punto es un máximo local." }
    ]
  },
  {
    id: "1.6.3",
    area: 1,
    subarea: "1.6 Pensamiento variacional",
    tema: "Límite de una función de una variable real",
    note: "El límite de una función te dice a qué valor se \"acerca\" f(x) cuando x se acerca a un número dado, aunque la función no esté definida exactamente ahí. Para funciones cuadráticas (continuas), casi siempre puedes calcular el límite por **sustitución directa**: sustituye el valor de x en la función. Ejemplo: límite cuando x→3 de (x²+2x-5) = 9+6-5 = 10. Si al sustituir obtienes 0/0 (forma indeterminada), factoriza y simplifica antes de sustituir. Ejemplo: límite cuando x→5 de (x²-25)/(x-5). Como x²-25=(x-5)(x+5), simplificas a (x+5), y sustituyendo x=5: 5+5=10. Truco: siempre intenta la sustitución directa primero; solo factoriza si te da 0/0.",
    flashcards: [
      { front: "Forma más rápida de calcular el límite de una función cuadrática continua", back: "Sustitución directa: reemplaza el valor de x en la función." },
      { front: "¿Qué haces si al sustituir obtienes la forma 0/0?", back: "Factorizas la expresión, simplificas y vuelves a sustituir." }
    ],
    quiz: [
      { q: "¿Cuál es el límite cuando x→4 de la función f(x) = x²-3x+2?", options: ["6", "10", "14"], correct: 0, explanation: "Por sustitución directa: 4²-3(4)+2 = 16-12+2 = 6." },
      { q: "¿Cuál es el límite cuando x→3 de f(x) = (x²-9)/(x-3)?", options: ["0", "3", "6"], correct: 2, explanation: "Factorizando: (x²-9)/(x-3) = (x-3)(x+3)/(x-3) = x+3. Sustituyendo x=3: 3+3=6." }
    ]
  },
  {
    id: "1.6.4",
    area: 1,
    subarea: "1.6 Pensamiento variacional",
    tema: "Derivadas de funciones polinomiales",
    note: "La derivada mide qué tan rápido cambia una función. Para un polinomio, se deriva término por término usando la regla de la potencia: la derivada de x^n es n·x^(n-1) (bajas el exponente como multiplicador y le restas 1 al exponente). La derivada de un número solo (constante) es 0. Ejemplo: f(x) = 3x⁴-2x³+5x-7. Derivando: f'(x) = 12x³-6x²+5 (el -7 desaparece por ser constante). Otro ejemplo: f(x) = x³-4x²+6x-1 → f'(x) = 3x²-8x+6. Truco: multiplica el coeficiente por el exponente original, y luego réstale 1 al exponente; los términos constantes siempre se van a 0.",
    flashcards: [
      { front: "Regla de la potencia para derivar x^n", back: "d/dx(x^n) = n·x^(n-1)" },
      { front: "¿Cuál es la derivada de una constante (como -7)?", back: "0, porque las constantes no cambian." }
    ],
    quiz: [
      { q: "¿Cuál es la derivada de f(x) = 2x³ + 5x² - 4x + 9?", options: ["6x²+10x-4", "6x²+5x-4", "2x²+10x-4"], correct: 0, explanation: "Derivando término por término: d/dx(2x³)=6x², d/dx(5x²)=10x, d/dx(-4x)=-4, y la constante 9 desaparece." },
      { q: "¿Cuál es la derivada de f(x) = x⁴ - 3x² + 8?", options: ["4x³-6x", "4x³-3x", "x³-6x"], correct: 0, explanation: "d/dx(x⁴)=4x³, d/dx(-3x²)=-6x, y la constante 8 desaparece: f'(x)=4x³-6x." }
    ]
  },
  {
    id: "1.6.5",
    area: 1,
    subarea: "1.6 Pensamiento variacional",
    tema: "Derivadas de funciones algebraicas y trascendentes",
    note: "Además de los polinomios, hay funciones con reglas de derivación propias que conviene memorizar. **Raíz cuadrada**: derivada de √x es 1/(2√x). **Trigonométricas**: derivada de sen(x) es cos(x); derivada de cos(x) es -sen(x). **Exponencial**: derivada de e^x es el mismo e^x. **Logaritmo natural**: derivada de ln(x) es 1/x. Ejemplo: f(x)=√x → f'(x)=1/(2√x). Otro ejemplo: f(x) = sen(x) + eˣ → f'(x) = cos(x) + eˣ (derivas cada término por separado, igual que en polinomios). Truco: memoriza estas reglas básicas como una tabla, ya que el examen casi siempre pide aplicarlas directamente, sin combinaciones complicadas.",
    flashcards: [
      { front: "Derivada de sen(x)", back: "cos(x)" },
      { front: "Derivada de eˣ", back: "eˣ (no cambia)" }
    ],
    quiz: [
      { q: "¿Cuál es la derivada de f(x) = ln(x) + cos(x)?", options: ["1/x - sen(x)", "1/x + sen(x)", "x - sen(x)"], correct: 0, explanation: "La derivada de ln(x) es 1/x, y la derivada de cos(x) es -sen(x), así que f'(x) = 1/x - sen(x)." },
      { q: "¿Cuál es la derivada de f(x) = 3√x (es decir, 3x^(1/2))?", options: ["3/(2√x)", "3/√x", "1.5√x"], correct: 0, explanation: "Usando la regla de la potencia con n=1/2: derivada = 3×(1/2)x^(-1/2) = 3/(2√x)." }
    ]
  },
  {
    id: "1.6.6",
    area: 1,
    subarea: "1.6 Pensamiento variacional",
    tema: "Aplicación de la derivada en funciones polinomiales de segundo grado en problemas de optimización",
    note: "Para hallar el máximo o mínimo de una función cuadrática con derivadas: 1) deriva la función; 2) iguala la derivada a 0 (ahí está el punto máximo o mínimo, porque la pendiente es plana); 3) despeja x; 4) sustituye ese x en la función original para hallar el valor máximo/mínimo. Ejemplo: la altura de un objeto es h(t)=-5t²+20t+1. Derivando: h'(t)=-10t+20. Igualando a 0: t=2. Sustituyendo: h(2)=-5(4)+40+1=21, la altura máxima es 21 en t=2 segundos. Truco: si el coeficiente de x² (o t²) es negativo, el punto encontrado es un máximo; si es positivo, es un mínimo.",
    flashcards: [
      { front: "Pasos para optimizar una función cuadrática con derivadas", back: "Deriva → iguala a 0 → despeja x → sustituye en la función original." },
      { front: "Si el coeficiente de x² es negativo, ¿qué tipo de punto encuentras al optimizar?", back: "Un máximo." }
    ],
    quiz: [
      { q: "La ganancia de una empresa es G(x) = -3x² + 30x - 20, donde x son unidades vendidas. ¿En qué valor de x se maximiza la ganancia?", options: ["x=5", "x=10", "x=3"], correct: 0, explanation: "G'(x)=-6x+30. Igualando a 0: -6x+30=0, entonces x=5." },
      { q: "Un cohete de juguete tiene altura h(t) = -4t² + 16t (metros). ¿Cuál es la altura máxima que alcanza?", options: ["12 m", "16 m", "20 m"], correct: 1, explanation: "h'(t)=-8t+16=0 → t=2. Sustituyendo: h(2)=-4(4)+16(2)=-16+32=16 m." }
    ]
  }
];
