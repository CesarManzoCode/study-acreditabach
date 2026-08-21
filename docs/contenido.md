# Contenido: temario, formatos y validaciones

Qué hay dentro de `data/`, de dónde sale y qué comprueba el validador antes de publicar.

---

## Qué contiene el temario

| | |
| --- | --- |
| Temas | 177 (los 177 de la guía oficial) |
| Tarjetas de repaso | 1 032 |
| Reactivos escritos | 1 708 |
| Reactivos **con figura** (iconos, gráficas, cuadros de Punnett, obras) | 28 |
| Temas con **problemas generados** | 45 |

Estas cifras se cuentan sobre lo que la página **carga de verdad**: `data/*.js` más los
cuatro paquetes (`extra`, `extra2`, `formato`, `refuerzo`), todos declarados en
`DATA_SCRIPTS` de `build.mjs`. Si agregas un archivo de datos y no lo pones ahí, el
validador lo contará y el sitio publicado no lo tendrá — que es exactamente lo que
pasaba con `data/refuerzo/` hasta la versión que lo corrigió.

Los archivos de `data/` se cargan como scripts normales, no se empaquetan: así puedes
corregir o ampliar el temario sin tocar nada del código de la app.

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

## Problemas generados

Los 45 temas con generador (todo Pensamiento matemático y la parte de física, química y
genética de Ciencias naturales) producen un problema **distinto cada vez**: cambian los
números, los datos y el contexto, pero se mantienen el nivel y el formato del examen.
En esos temas la práctica no se acaba: aparecen marcados con la insignia
*problemas aleatorios* y ofrecen el modo **Práctica infinita**.

Cada generador vive en `src/lib/generators/` y se prueba con miles de casos antes de
publicar. Para revisar a mano lo que produce uno:

```bash
node scripts/test-generators.js --muestra --tema 1.3.5
```

---

## El examen que se simula

180 reactivos cuentan para la calificación, pero se contestan **205**: hay un bloque de 25
reactivos piloto que no puntúan y que el sustentante no puede distinguir. Sesión 1: 92 + 14
piloto = **106** en 4 h 30 min. Sesión 2: 88 + 11 piloto = **99** en 4 h, con receso de hora
y media entre ambas. Los simulacros completos de la app usan esa cuenta física, que es la
que marca el ritmo por pregunta (≈ 2.5 y ≈ 2.4 minutos), y descuentan el bloque piloto al
calificar.

Lo que no se puede simular aquí son las imágenes impresas del cuadernillo ni la hoja de
lector óptico: por eso conviene usar la app **junto con** las 24 preguntas muestra de la
guía oficial.

---

## Validaciones y pruebas

```bash
npm run validate          # forma de data/*.js y sus paquetes, y que no haya tarjetas repetidas dentro de un tema
npm run test:generadores  # genera miles de reactivos y verifica que todos sean válidos
npm run test:motor        # comprueba que nada se pregunte antes de haberse enseñado
npm run check             # validate + generadores + motor + build
```

`npm run validate` incluye la revisión que impide preguntar lo que no se explicó: si una
tarjeta de un paquete **define** un concepto (`¿Qué es…?`, `¿En qué consiste…?`) que no
aparece ni en la nota del tema ni en la `leccion` de su paquete, la validación falla con
el nombre del concepto. Si agregas un paquete con conceptos nuevos, dale su `leccion`.
También comprueba que la nota del tema enseñe todo lo que su generador pregunta.

`npm run test:motor` comprueba lo demás: que un bloque con lección siga cerrado aunque sus
tarjetas ya se hayan visto, que la sesión nunca ponga una tarjeta antes de la lección de su
bloque, que ninguna pregunta salga de un bloque cerrado, que «aprender» y «repasar» no se
mezclen y que el simulacro completo no se vacíe.
