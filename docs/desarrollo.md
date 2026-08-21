# Cómo está armado y cómo se trabaja

---

## Estructura

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

---

## Calculadora científica

Los reactivos numéricos de matemáticas, física y química muestran el botón
**Abrir calculadora**. El panel es arrastrable en escritorio y aparece como hoja
inferior en el celular; recuerda entre sesiones el modo `DEG`/`RAD`, la memoria y
si el teclado científico está desplegado.

Admite jerarquía de operaciones, paréntesis, potencias y raíces, factorial,
porcentaje, notación científica (`×10ˣ`), funciones trigonométricas e inversas en
grados o radianes, logaritmos (`ln`, `log`), memoria (`M+`, `M−`, `MR`, `MC`),
historial y reutilización del último resultado con `ANS`.

El motor ([`src/lib/calc.js`](../src/lib/calc.js)) es un tokenizador con analizador
descendente recursivo: **no usa `eval()` ni `Function()`**, así que una expresión mal
escrita devuelve un error controlado en vez de ejecutar código.
