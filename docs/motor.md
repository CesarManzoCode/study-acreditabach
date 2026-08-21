# El motor de estudio

Cómo se arma el plan de cada día, cómo se decide cuándo vuelve una tarjeta y por qué el
porcentaje de avance a veces baja. El código vive en [`src/lib/engine.js`](../src/lib/engine.js).

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

Lo que impide que vuelva a pasar está en [las validaciones](contenido.md#validaciones-y-pruebas).

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

### El área en riesgo

El examen se acredita área por área, así que el plan no reparte la práctica en partes
iguales. `areaReadiness()` calcula, por área, un riesgo entre 0 y 1 que combina dos cosas:
qué porcentaje del temario de esa área llevas visto y qué porcentaje de aciertos llevas
frente a un objetivo de trabajo. El objetivo no es igual para todas: las áreas con menos
reactivos piden más margen, porque con 19 preguntas la suerte pesa más que con 32.
Mientras no hay respuestas suficientes manda la cobertura, y un área sin estudiar es
riesgo alto por definición. Ese riesgo se convierte en peso: más riesgo, más turnos en la
práctica del día.

---

## Modo esencial

No todo el banco pesa lo mismo de cara al examen. Cada tema se arma con bloques:

| Bloque | Qué es | ¿Entra en el modo esencial? |
| --- | --- | --- |
| `base` | La explicación del tema, escrita desde la orientación de la guía | Sí |
| `formato` | Los formatos que la guía marca (relación, jerarquización) y las figuras que el cuadernillo trae impresas | Sí |
| `refuerzo` | Lo que la guía nombra por su nombre y no tenía reactivo, y las lecturas largas del área 6 | Sí |
| `ampliacion`, `ampliacion2` | Ampliación de cultura general, fuera de lo que las orientaciones piden | No |

En **modo esencial** el plan diario son **354 tarjetas y 610 reactivos**; en modo completo,
1 032 y 1 708. Casi tres veces menos tiempo de estudio para cubrir lo mismo que el examen
evalúa. Se cambia desde *Progreso → Qué estás estudiando*, y **cambiar de modo no borra
nada**: las tarjetas de ampliación conservan intervalo y repasos, y vuelven al activar el
modo completo (`setModoEsencial`).

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
