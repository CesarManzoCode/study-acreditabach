# ACREDITA-BACH · Plan de estudio

Plan de estudio diario para el **Examen para la Acreditación del Bachillerato General
(ACREDITA-BACH, Ceneval)**: repetición espaciada, práctica activa y simulacros con la
carga real del examen.

Todo corre en el navegador. Sin cuenta se estudia igual (modo invitado, el avance se
guarda en el dispositivo); con una cuenta, el avance vive en el servidor y te sigue a
cualquier dispositivo donde inicies sesión.

### Qué es y qué no es esto

- **Es** una herramienta de estudio independiente, construida sobre el temario oficial:
  las 7 áreas, los 177 temas y sus orientaciones salen de la *Guía para el sustentante
  ACREDITA-BACH* (Ceneval, junio de 2026).
- **No está** afiliada al Ceneval ni avalada por él, y **no puede garantizar** ningún
  resultado.
- Las explicaciones, tarjetas y reactivos **los redactó esta app**. No son material del
  Ceneval, y en varios temas van más allá de lo que la orientación pide.
- Fechas, requisitos, costos y sedes **cambian cada convocatoria**: confírmalos siempre en
  [ceneval.edu.mx](https://www.ceneval.edu.mx).
- Úsala **junto con** las 24 preguntas muestra de la guía oficial, que traen las imágenes
  impresas que aquí solo se pueden aproximar con esquemas dibujados.

### El examen que se simula

180 reactivos cuentan para la calificación, pero se contestan **205**: hay un bloque de 25
reactivos piloto que no puntúan y que el sustentante no puede distinguir. Sesión 1: 92 + 14
piloto = **106** en 4 h 30 min. Sesión 2: 88 + 11 piloto = **99** en 4 h, con receso de hora
y media entre ambas. Los simulacros completos de la app usan esa cuenta física, que es la
que marca el ritmo por pregunta (≈ 2.5 y ≈ 2.4 minutos), y descuentan el bloque piloto al
calificar.

---

## Tu progreso está a salvo

El avance vive en la llave `acreditabach_v1` de `localStorage`, con exactamente el mismo
formato desde la primera versión del sitio. Reglas que el código respeta siempre:

- Nada se migra, renombra ni reescribe: lo que ya está guardado se sigue leyendo igual.
- Las tarjetas se identifican por `tema::fcN`. **El contenido nuevo siempre se agrega al
  final**, así que `fc0` y `fc1` siguen siendo las mismas tarjetas de antes, con su
  intervalo, sus repeticiones y sus fechas intactos.
- Al registrarte, la cuenta nueva **hereda** el progreso del modo invitado, y la llave del
  invitado se queda como estaba: nunca se borra.
- Iniciar sesión **reemplaza** el progreso visible por el de esa cuenta (es lo que se
  espera de un login). Ya con la sesión abierta, lo que se baja del servidor se **mezcla**
  con lo local, para no perder lo estudiado sin conexión (ver `mergeStates` en
  `src/lib/engine.js`).

Las preferencias de interfaz (tema claro/oscuro) se guardan aparte, en
`acreditabach_theme`, para no mezclarlas con el progreso.

En **Progreso → Tus datos** puedes descargar un respaldo `.json` y restaurarlo después.

---

## Qué contiene el temario

| | |
| --- | --- |
| Temas | 177 (los 177 de la guía oficial) |
| Tarjetas de repaso | 1,032 |
| Reactivos escritos | 1,708 |
| Reactivos **con figura** (iconos, gráficas, cuadros de Punnett, obras) | 28 |
| Temas con **problemas generados** | 45 |

### Modo esencial (activado de fábrica)

No todo el banco pesa lo mismo de cara al examen. Cada tema se arma con bloques:

| Bloque | Qué es | ¿Entra en el modo esencial? |
| --- | --- | --- |
| `base` | La explicación del tema, escrita desde la orientación de la guía | Sí |
| `formato` | Los formatos que la guía marca (relación, jerarquización) y las figuras que el cuadernillo trae impresas | Sí |
| `refuerzo` | Lo que la guía nombra por su nombre y no tenía reactivo, y las lecturas largas del área 6 | Sí |
| `ampliacion`, `ampliacion2` | Ampliación de cultura general, fuera de lo que las orientaciones piden | No |

En **modo esencial** el plan diario son **354 tarjetas y 610 reactivos**; en modo completo,
1,032 y 1,708. Casi tres veces menos tiempo de estudio para cubrir lo mismo que el examen
evalúa. Se cambia desde *Progreso → Qué estás estudiando*, y **cambiar de modo no borra
nada**: las tarjetas de ampliación conservan intervalo y repasos, y vuelven al activar el
modo completo (`setModoEsencial` en `src/lib/engine.js`).

Estas cifras se cuentan sobre lo que la página **carga de verdad**: `data/*.js` más los
cuatro paquetes (`extra`, `extra2`, `formato`, `refuerzo`), todos declarados en
`DATA_SCRIPTS` de `build.mjs`. Si agregas un archivo de datos y no lo pones ahí, el
validador lo contará y el sitio publicado no lo tendrá — que es exactamente lo que
pasaba con `data/refuerzo/` hasta esta versión.

Los 45 temas con generador (todo Pensamiento matemático y la parte de física, química y
genética de Ciencias naturales) producen un problema **distinto cada vez**: cambian los
números, los datos y el contexto, pero se mantienen el nivel y el formato del examen.
En esos temas la práctica no se acaba: aparecen marcados con la insignia
*problemas aleatorios* y ofrecen el modo **Práctica infinita**.

Cada generador vive en `src/lib/generators/` y se prueba con miles de casos antes de
publicar (ver más abajo).

---

## Cuentas

Login de verdad: usuario y contraseña, con el progreso guardado en un servidor propio.

- **Sin cuenta** estás en *modo invitado*: el avance se guarda en este navegador y punto.
- **Al registrarte**, tu avance de invitado se sube y queda como progreso inicial de la
  cuenta nueva.
- **Al iniciar sesión**, el progreso de la cuenta reemplaza al que hubiera en ese
  dispositivo.
- Con la sesión abierta, cada cambio se guarda solo en el servidor unos segundos después.
  Si el servidor no responde, se sigue estudiando en local y el error se muestra en
  pantalla; nada se pierde.
- **Al cerrar sesión** vuelves al progreso de invitado, que nunca se toca.

### Publicar el servidor de cuentas

GitHub Pages solo sirve archivos estáticos: no ejecuta código ni guarda datos. Por eso las
cuentas necesitan un servidor aparte. En `server/cloudflare-worker.js` está completo y
comentado paso a paso; es gratis y no pide tarjeta:

1. Crea una cuenta en [Cloudflare](https://dash.cloudflare.com).
2. **Compute (Workers) → Create → Deploy**, y en *Edit code* pega el archivo entero.
3. **Storage & Databases → KV → Create instance**, llámalo `acreditabach`.
4. En el Worker, **Bindings → Add binding → KV namespace**, con el nombre de variable `DB`.
5. Abre `https://…workers.dev/salud`: debe responder `{"ok":true,"kv":true}`.
6. Pega esa dirección en la app, en la pantalla **Cuenta**.

Para dejarla fija y que ningún dispositivo tenga que pegarla, pon la URL en
`SERVIDOR_POR_DEFECTO`, en `src/lib/accounts.js`, y reconstruye.

### Qué guarda y cómo

| Dato | Dónde | Cómo |
| --- | --- | --- |
| Contraseña | KV del Worker | Nunca sale del navegador: viaja ya estirada con PBKDF2-SHA256 y 210 000 vueltas (sal derivada del usuario), y el servidor guarda un SHA-256 de eso con su propia sal. |
| Sesión | KV del Worker | Token aleatorio de 256 bits, caduca a los 180 días. |
| Progreso | KV del Worker | Un JSON por cuenta, guardado tal cual, con copia local para poder estudiar sin conexión. |

El reparto del cifrado no es un capricho: el plan gratis de Workers da **10 ms de
CPU por petición**, y un PBKDF2 en condiciones cuesta bastante más. Haciéndolo en
el navegador el servidor queda con un SHA-256 (microsegundos), y de paso nunca
llega a ver la contraseña de verdad — el mismo reparto que usan los gestores de
contraseñas.

Además: comparación en tiempo constante al validar la contraseña, mismo mensaje y mismo
tiempo de respuesta cuando el usuario no existe (para no revelar qué cuentas hay), y
bloqueo de 15 minutos tras 10 intentos fallidos seguidos.

---

## Fiel a la guía oficial

El temario está cotejado tema por tema contra la *Guía para el sustentante* (Ceneval,
junio de 2026):

- **Los 177 temas coinciden uno a uno** con los de la guía: mismos identificadores,
  mismos nombres, mismas subáreas y el mismo reparto de reactivos por área.
- De los **173 términos concretos** que las orientaciones oficiales nombran —desde
  *freeware* y *grooming* hasta Cenapred, el Consenso de Washington o el ciclo de
  Krebs—, el contenido cubre los 173.
- **Tres opciones por reactivo, A/B/C.** No son cuatro: la guía (p. 25 y p. 26) indica
  «una respuesta correcta y dos distractores». El validador lo exige.
- **Los cuatro formatos de reactivo** que define la guía: cuestionamiento directo,
  relación de elementos, jerarquización u ordenamiento y completamiento. Los dos de en
  medio viven en `data/formato/`, en los diez temas cuya orientación oficial los pide
  por nombre («Relación de…», «Organización de los pasos…», «Identificación del
  orden…»).

Recuerda que la guía se revisa de forma periódica: antes del examen conviene
confirmar fechas, costos y temario en el portal del Ceneval.

---

## Nada se pregunta antes de enseñarse

Es la regla que ordena todo lo demás, y hay código y pruebas que la sostienen.

Cada tema se arma con **bloques**: el `base` (lo que explica su nota), hasta dos paquetes
de ampliación y, en algunos temas, el de formato. Un bloque se comporta como una unidad:
primero sus tarjetas, después sus reactivos.

- **Cada bloque se explica antes de tocarse.** La app solo explica en dos lugares: la
  `note` del tema y la `leccion` de cada paquete de ampliación. Mientras esa lección no
  se haya leído, el bloque entero está cerrado: ni sus tarjetas ni sus reactivos entran
  a la sesión. En el motor son `lessonsSeen`, `isLessonSeen()` y el paso `lesson`.
- **Tarjeta nueva → se enseña, no se examina.** La primera vez que una tarjeta aparece
  se muestra con la respuesta a la vista y un solo botón, *Entendido*. Recién al día
  siguiente entra al repaso espaciado y se te pide recordarla. En el motor esto es
  `learnCard()` y el paso `learn` del ejecutor de sesiones.
- **Los reactivos de un bloque están cerrados hasta que sus tarjetas se enseñaron.**
  Lo decide `availableQuiz()`, y lo respetan el repaso diario, los simulacros y la
  práctica por tema. El bloque `base` es la excepción: su contenido es justo el de la
  nota, que se puede leer en cualquier momento desde **Repasar**.
- **Al conocer un tema nuevo solo entra su bloque base.** Las ampliaciones llegan
  escalonadas cada dos días, cada una con su propio paso de aprendizaje.
- **Topes por día:** 12 tarjetas nuevas y 4 lecciones de ampliación. Lo que sobra espera
  su turno; las tarjetas cuya lección aún no llega no se preguntan mientras tanto.

Hay un bloque que no se cierra nunca: el de `data/formato/`. No trae tarjetas porque no
agrega conceptos —replantea con el formato del examen lo que la nota base ya explica—,
así que no hay nada que desbloquear.

El progreso guardado desde antes de esta versión no se re-enseña: cualquier tarjeta con
repasos o con fecha de último repaso ya cuenta como aprendida (`isLearned()`). Las
lecciones de bloque sí son nuevas para todos, así que la primera vez se presentan antes
de volver a preguntar ese material; ninguna tarjeta pierde su intervalo ni sus repasos.

### Por qué hizo falta la lección de bloque

Enseñar una tarjeta —mostrarla un momento con su reverso— no es lo mismo que explicar el
tema. Los paquetes de ampliación le colgaron a 64 temas conceptos que su nota nunca
mencionaba: la lección de 7.1.1 habla de necesidades vitales y el paquete preguntaba por
el **costo de oportunidad**, la pirámide de Maslow o los bienes libres. La tarjeta pasaba
por el paso de aprendizaje y aun así el material llegaba sin explicación. Los 81 bloques
en esa situación ya tienen su `leccion`.

`npm run validate` incluye la revisión que lo impide hacia adelante: si una tarjeta de un
paquete **define** un concepto (`¿Qué es…?`, `¿En qué consiste…?`) que no aparece ni en la
nota del tema ni en la `leccion` de su paquete, la validación falla con el nombre del
concepto. Si agregas un paquete con conceptos nuevos, dale su `leccion`.

`npm run test:motor` comprueba lo demás: que un bloque con lección siga cerrado aunque sus
tarjetas ya se hayan visto, que la sesión nunca ponga una tarjeta antes de la lección de su
bloque, que ninguna pregunta salga de un bloque cerrado, que «aprender» y «repasar» no se
mezclen y que el simulacro completo no se vacíe.

---

## Cómo se calcula el avance de estudio (y por qué a veces baja)

> **Este porcentaje no es el Índice Ceneval y no se convierte a él.** El Ceneval califica
> cada área de 700 a 1300 puntos, con un procedimiento psicométrico que no se hace
> público, y pide 1000 para acreditarla. No existe ninguna equivalencia demostrada entre
> el porcentaje de esta app —o el de sus simulacros— y esa escala. Sirve para saber qué
> falta repasar, no para predecir si acreditas.

El porcentaje de avance de un tema combina dos cosas:

- **Repaso**: el promedio de repeticiones de *todas* sus tarjetas, incluidas las nuevas.
- **Preguntas**: el porcentaje de aciertos, ponderado por cuántas respuestas llevas.
  Con un banco más grande se piden más intentos antes de dar el crédito completo.

Cuando el temario crece, los temas que ya habías visto ganan tarjetas sin repasar y esas
cuentan como cero. **El porcentaje baja a propósito**: hay que estudiar el material nuevo
para recuperar el porcentaje anterior. Nada del avance previo se borra; solo cambia la
vara de medir. Las tarjetas nuevas no llegan todas de golpe: se reparten entre los
siguientes 21 días, cada una se enseña antes de entrar al repaso, y la pantalla de inicio
avisa cuántas se agregaron.

---

## Cómo está armado

| Carpeta / archivo | Qué es |
| --- | --- |
| `src/` | Código de la app (React 19 + JSX). Es lo único que se edita a mano. |
| `src/lib/engine.js` | Motor: repetición espaciada (SM-2), plan diario, dominio, mezcla de progresos. |
| `src/lib/generators/` | Generadores de problemas de matemáticas y ciencias. |
| `src/lib/calc.js` · `src/ui/Calculator.jsx` | Calculadora científica integrada (motor de evaluación + panel). |
| `src/lib/calcNeed.js` | Decide en qué reactivos aparece la calculadora. |
| `src/lib/accounts.js` · `cloud.js` | Sesión de la cuenta y diálogo con el servidor (registro, login, guardado). |
| `src/screens/` | Las pantallas: Hoy, Repasar, Simulacro, Progreso, Guía y Cuenta. |
| `src/ui/` | Sistema de componentes (botones, hojas, secciones, medidores, modal, toasts, iconos). |
| `src/styles.css` | Tokens de diseño y estilos: papel cálido, tinta azul para lo que se hace y un color por área. Temas claro y oscuro completos. |
| `data/` | El temario base (177 temas) y el contenido de la guía oficial. |
| `data/extra/` · `data/extra2/` | Paquetes de tarjetas y reactivos adicionales. Cada uno forma un **bloque** dentro del tema, con su `leccion` cuando agrega conceptos que la nota no explica. |
| `data/formato/` | Reactivos de relación de elementos y de ordenamiento, para los temas donde la guía marca esos formatos. |
| `scripts/` | El validador del temario y las pruebas de los generadores y del motor. |
| `server/cloudflare-worker.js` | El servidor de cuentas, listo para pegar en Cloudflare Workers. |
| `fonts/` | Inter (interfaz y cifras) y Literata (titulares y material de estudio), subconjunto latino, servidas desde el repo. |
| `assets/` · `index.html` | **Generados por el build.** No se editan a mano. |

Los archivos de `data/` se cargan como scripts normales, no se empaquetan: así puedes
corregir o ampliar el temario sin tocar nada del código de la app.

---

## Trabajar en el proyecto

```bash
npm install               # una sola vez
npm run dev               # servidor local con recarga en http://localhost:5173
npm run build             # compila a assets/ y regenera index.html
npm run validate          # forma de data/*.js y sus paquetes, y que no haya tarjetas repetidas dentro de un tema
npm run test:generadores  # genera miles de reactivos y verifica que todos sean válidos
npm run test:motor        # comprueba que nada se pregunte antes de haberse enseñado
npm run check             # validate + generadores + motor + build
```

Después de cambiar algo en `src/`, corre `npm run build` y **commitea también
`index.html` y `assets/`**: el sitio publicado se sirve de ahí.

Para revisar a mano lo que produce un generador:

```bash
node scripts/test-generators.js --muestra --tema 1.3.5
```

---

## Publicación automática

`.github/workflows/deploy.yml` se encarga de todo:

- **En cada push** (a cualquier rama): instala, valida el temario, prueba los generadores
  y el motor, y compila. Si algo se rompe, el push queda marcado en rojo.
- **En la rama por defecto**: además publica en GitHub Pages con `actions/deploy-pages`.

No hay que tocar ninguna configuración: el workflow habilita Pages en modo *GitHub
Actions* la primera vez que corre. La URL del sitio no cambia, así que el progreso
guardado en el navegador sigue exactamente donde estaba.

---

## Atajos de teclado

Durante una sesión de estudio o un simulacro:

| Tecla | Acción |
| --- | --- |
| `espacio` / `Enter` | Mostrar la respuesta · marcar como entendida · continuar |
| `1` `2` `3` | Calificar la tarjeta (otra vez / costó / bien) o elegir opción |
| `C` | Abrir la calculadora científica (en los reactivos que la ofrecen) |
| `Esc` | Salir de la sesión |

Con la calculadora abierta, el teclado escribe en ella: los números dejan de
contestar el reactivo y `Esc` la cierra sin salir de la sesión.

### Calculadora científica

Los reactivos numéricos de matemáticas, física y química muestran el botón
**Abrir calculadora**. El panel es arrastrable en escritorio y aparece como hoja
inferior en el celular; recuerda entre sesiones el modo `DEG`/`RAD`, la memoria y
si el teclado científico está desplegado.

Admite jerarquía de operaciones, paréntesis, potencias y raíces, factorial,
porcentaje, notación científica (`×10ˣ`), funciones trigonométricas e inversas en
grados o radianes, logaritmos (`ln`, `log`), memoria (`M+`, `M−`, `MR`, `MC`),
historial y reutilización del último resultado con `ANS`.

El motor (`src/lib/calc.js`) es un tokenizador con analizador descendente
recursivo: **no usa `eval()` ni `Function()`**, así que una expresión mal escrita
devuelve un error controlado en vez de ejecutar código.

---

## Cómo decide qué estudiar

1. **Repaso espaciado.** Cada tarjeta tiene su propio intervalo (SM-2, el algoritmo
   detrás de Anki, adaptado a tres botones). Sale a repaso justo cuando estás por
   olvidarla.
2. **Temas nuevos, entrelazados.** El plan reparte los 177 temas entre los días que
   quedan hasta el examen y mezcla áreas distintas en la misma sesión (*interleaving*),
   en vez de bloques largos de una sola materia.
3. **Recuperación activa con variación.** Las preguntas rotan por todo el banco del tema
   y, si el tema tiene generador, cambian los números en cada intento. Se priorizan los
   temas donde menos aciertas.

Si un día no estudias, lo pendiente se reparte solo entre los días restantes.

---

Los porcentajes que muestra el sitio son una referencia de estudio, **no** el Índice
Ceneval oficial (700–1300 puntos, mínimo 1000 por área). Fechas, costos y trámites
siempre se confirman en la guía y el portal del Ceneval.
