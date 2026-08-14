# ACREDITA-BACH · Plan de estudio

Plan de estudio diario para el **Examen para la Acreditación del Bachillerato General
(ACREDITA-BACH, Ceneval)**: repetición espaciada, práctica activa y simulacros con el
formato real del examen.

Todo corre en el navegador. **No hay servidor ni cuenta**: tu avance se guarda en el
`localStorage` del dispositivo donde estudias.

---

## Tu progreso está a salvo

El avance vive en la llave `acreditabach_v1` de `localStorage`, con exactamente el mismo
formato desde la primera versión del sitio. El rediseño no migra, no renombra y no
reescribe nada de esa llave, y el sitio se publica en la misma URL, así que la sesión
del navegador sigue viendo su historial intacto.

Las preferencias de interfaz (tema claro/oscuro) se guardan aparte, en
`acreditabach_theme`, justo para no mezclarlas con el progreso.

En **Progreso → Tus datos** puedes descargar un respaldo `.json` y restaurarlo después.
Vale la pena hacerlo antes de limpiar el navegador o de cambiar de dispositivo.

---

## Cómo está armado

| Carpeta / archivo | Qué es |
| --- | --- |
| `src/` | Código de la app (React 19 + JSX). Es lo único que se edita a mano. |
| `src/lib/engine.js` | Motor: repetición espaciada (SM-2), plan diario, estadísticas, persistencia. |
| `src/screens/` | Las cinco pantallas: Hoy, Repasar, Simulacro, Progreso, Guía. |
| `src/ui/` | Sistema de componentes (botones, tarjetas, anillos, modal, toasts, iconos). |
| `src/styles.css` | Tokens de diseño y estilos. Tema oscuro y claro completos. |
| `data/` | El temario (177 temas) y el contenido de la guía oficial. Scripts clásicos. |
| `fonts/` | Inter y Plus Jakarta Sans (subconjunto latino), servidas desde el repo. |
| `assets/` | **Generado por el build.** No se edita a mano. |
| `index.html` | **Generado por el build** a partir de `src/index.html`. |

Los archivos de `data/` se cargan como scripts normales, no se empaquetan: así puedes
corregir o ampliar el temario sin tocar nada del código de la app.

---

## Trabajar en el proyecto

```bash
npm install        # una sola vez
npm run dev        # servidor local con recarga en http://localhost:5173
npm run build      # compila a assets/ y regenera index.html
npm run validate   # revisa que data/*.js tenga la forma correcta
npm run check      # validate + build
```

Después de cambiar algo en `src/`, corre `npm run build` y **commitea también
`index.html` y `assets/`**: el sitio publicado se sirve de ahí.

---

## Publicación automática

`.github/workflows/deploy.yml` se encarga de todo:

- **En cada push** (a cualquier rama): instala, valida el temario y compila.
  Si algo se rompe, el push queda marcado en rojo.
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
3. **Recuperación activa.** Preguntas con el formato real del examen (tres opciones) y
   explicación inmediata, priorizando los temas donde menos aciertas.

Si un día no estudias, lo pendiente se reparte solo entre los días restantes.

---

Los porcentajes que muestra el sitio son una referencia de estudio, **no** el Índice
Ceneval oficial (700–1300 puntos, mínimo 1000 por área). Fechas, costos y trámites
siempre se confirman en la guía y el portal del Ceneval.
