# ACREDITA-BACH · Plan de estudio

Plan de estudio diario para el **Examen para la Acreditación del Bachillerato General
(ACREDITA-BACH, Ceneval)**: repetición espaciada, práctica activa y simulacros con el
formato real del examen.

Todo corre en el navegador. No hace falta servidor para estudiar; si quieres que tu
avance te siga a otros dispositivos, hay un sistema de cuentas y sincronización opcional.

---

## Tu progreso está a salvo

El avance vive en la llave `acreditabach_v1` de `localStorage`, con exactamente el mismo
formato desde la primera versión del sitio. Reglas que el código respeta siempre:

- Nada se migra, renombra ni reescribe: lo que ya está guardado se sigue leyendo igual.
- Las tarjetas se identifican por `tema::fcN`. **El contenido nuevo siempre se agrega al
  final**, así que `fc0` y `fc1` siguen siendo las mismas tarjetas de antes, con su
  intervalo, sus repeticiones y sus fechas intactos.
- Al crear la primera cuenta, esa cuenta **hereda** el progreso que ya había y la llave
  histórica se queda como respaldo: nunca se borra.
- La sincronización **mezcla**, no sustituye: ante la duda conserva el dato más avanzado
  de cada lado (ver `mergeStates` en `src/lib/engine.js`).

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

## Cuentas y sincronización

Un sistema deliberadamente simple, pensado para una sola persona con varios dispositivos.
No hay contraseñas reales ni cifrado: el código del espacio es la única credencial.

1. **Crea una cuenta** en *Cuenta y sincronización*. La primera cuenta se queda con todo
   el avance que ya llevabas en ese navegador.
2. **Crea un espacio**: un documento JSON en internet donde viven tus cuentas y su
   progreso.
3. En el otro dispositivo, entra a la misma pantalla, elige **"Ya tengo un código"** y
   pega el código del espacio. Los dos progresos se mezclan sin perder nada.

A partir de ahí la app sincroniza sola: baja al abrir, sube unos segundos después de cada
cambio y vuelve a bajar cuando regresas a la pestaña. Si el servidor no responde, todo
sigue funcionando en local y el error se muestra en pantalla.

### Dónde se guarda el espacio

| Proveedor | Qué necesitas | Nota |
| --- | --- | --- |
| **jsonblob.com** | Nada | Lo más rápido para empezar; el archivo es público, pero con una dirección difícil de adivinar. |
| **Servidor propio (URL)** | Una URL que responda `GET` y `PUT` con JSON | En `server/` vienen dos listos: uno de Node y uno de Cloudflare Workers. También funciona con una Realtime Database de Firebase (URL terminada en `.json`). |
| **Gist de GitHub** | Un token con permiso `gist` | El token viaja dentro del código del espacio: trátalo como una contraseña. |
| **Este navegador** | Nada | Solo para probar cómo se mezcla el progreso. |

```bash
# Servidor propio, en tu computadora o en un VPS
npm run sync-server                       # http://localhost:8787
PORT=9000 DATA=/ruta/datos.json npm run sync-server
```

Para Cloudflare Workers, pega `server/cloudflare-worker.js` en un Worker nuevo, enlaza un
KV namespace llamado `ACREDITA` y usa la URL que te dé.

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
| `src/lib/accounts.js` · `sync.js` | Cuentas locales y sincronización con el espacio remoto. |
| `src/screens/` | Las pantallas: Hoy, Repasar, Simulacro, Progreso, Guía y Cuenta. |
| `src/ui/` | Sistema de componentes (botones, tarjetas, anillos, modal, toasts, iconos). |
| `src/styles.css` | Tokens de diseño y estilos. Tema oscuro y claro completos. |
| `data/` | El temario base (177 temas) y el contenido de la guía oficial. |
| `data/extra/` | Paquetes de tarjetas y reactivos adicionales, que se suman al temario base. |
| `server/` | Dos servidores de sincronización listos para usar (Node y Cloudflare). |
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
npm run validate          # revisa que data/*.js y data/extra/*.js tengan la forma correcta
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
| `Esc` | Salir de la sesión |

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
