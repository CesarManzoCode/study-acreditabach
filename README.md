# ACREDITA-BACH · Plan de estudio

Plan de estudio diario para el **Examen para la Acreditación del Bachillerato General
(ACREDITA-BACH, Ceneval)**: repetición espaciada, práctica activa y simulacros con el
formato real del examen.

Todo corre en el navegador. Sin cuenta se estudia igual (modo invitado, el avance se
guarda en el dispositivo); con una cuenta, el avance vive en el servidor y te sigue a
cualquier dispositivo donde inicies sesión.

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
| Temas | 177 |
| Tarjetas de repaso | 726 |
| Reactivos escritos | 1,011 |
| Temas con **problemas generados** | 45 |

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

## Cómo se calcula el dominio (y por qué a veces baja)

El porcentaje de dominio de un tema combina dos cosas:

- **Repaso**: el promedio de repeticiones de *todas* sus tarjetas, incluidas las nuevas.
- **Preguntas**: el porcentaje de aciertos, ponderado por cuántas respuestas llevas.
  Con un banco más grande se piden más intentos antes de dar el crédito completo.

Cuando el temario crece, los temas que ya habías visto ganan tarjetas sin repasar y esas
cuentan como cero. **El dominio baja a propósito**: hay que estudiar el material nuevo
para recuperar el porcentaje anterior. Nada del avance previo se borra; solo cambia la
vara de medir. Las tarjetas nuevas no llegan todas de golpe: se reparten entre los
siguientes siete días, y la pantalla de inicio avisa cuántas se agregaron.

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
| `src/ui/` | Sistema de componentes (botones, tarjetas, anillos, modal, toasts, iconos). |
| `src/styles.css` | Tokens de diseño y estilos. Tema oscuro y claro completos. |
| `data/` | El temario base (177 temas) y el contenido de la guía oficial. |
| `data/extra/` · `data/extra2/` | Paquetes de tarjetas y reactivos adicionales, que se suman al temario base. |
| `server/cloudflare-worker.js` | El servidor de cuentas, listo para pegar en Cloudflare Workers. |
| `fonts/` | Inter y Plus Jakarta Sans (subconjunto latino), servidas desde el repo. |
| `assets/` · `index.html` | **Generados por el build.** No se editan a mano. |

Los archivos de `data/` se cargan como scripts normales, no se empaquetan: así puedes
corregir o ampliar el temario sin tocar nada del código de la app.

---

## Trabajar en el proyecto

```bash
npm install               # una sola vez
npm run dev               # servidor local con recarga en http://localhost:5173
npm run build             # compila a assets/ y regenera index.html
npm run validate          # revisa que data/*.js, data/extra/*.js y data/extra2/*.js tengan la forma correcta
npm run test:generadores  # genera miles de reactivos y verifica que todos sean válidos
npm run check             # validate + generadores + build
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
  y compila. Si algo se rompe, el push queda marcado en rojo.
- **En la rama por defecto**: además publica en GitHub Pages con `actions/deploy-pages`.

No hay que tocar ninguna configuración: el workflow habilita Pages en modo *GitHub
Actions* la primera vez que corre. La URL del sitio no cambia, así que el progreso
guardado en el navegador sigue exactamente donde estaba.

---

## Atajos de teclado

Durante una sesión de estudio o un simulacro:

| Tecla | Acción |
| --- | --- |
| `espacio` / `Enter` | Mostrar la respuesta · continuar |
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
