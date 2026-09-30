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
  se muestra con la respuesta a la vista y un solo botón, *Entendido*. Unos pasos después,
  en la misma sesión, se te pide recordarla (la *comprobación*: ya se enseñó, así que es
  legítimo) y recién al día siguiente entra al repaso espaciado. En el motor esto es
  `learnCard()`, el paso `learn` y el paso `review` con `check: true`.
- **Los reactivos de un bloque están cerrados hasta que sus tarjetas se enseñaron.**
  Lo decide `availableQuiz()`, y lo respetan el repaso diario, los simulacros y la
  práctica por tema. El bloque `base` es la excepción: su contenido es justo el de la
  nota, que se puede leer en cualquier momento desde **Repasar**.
- **Al conocer un tema nuevo solo entra su bloque base.** Las ampliaciones llegan
  escalonadas cada dos días, cada una con su propio paso de aprendizaje.
- **Topes por día:** 12 tarjetas nuevas y 4 lecciones de ampliación, dentro del
  presupuesto de tiempo del día (más abajo). Lo que sobra espera su turno; las tarjetas
  cuya lección aún no llega no se preguntan mientras tanto.

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
   detrás de Anki, adaptado a tres botones y corregido para la vida real: ver
   [Repetición espaciada](#repetición-espaciada)). Sale a repaso cuando estás por olvidarla.
2. **Temas nuevos, entrelazados.** El plan reparte los 177 temas entre los días que
   quedan hasta el examen y mezcla áreas distintas en la misma sesión (*interleaving*),
   en vez de bloques largos de una sola materia.
3. **Recuperación activa con variación.** Las preguntas rotan por todo el banco del tema
   sin repetir la última que contestaste y, si el tema tiene generador, cambian los
   números en cada intento. Se priorizan los temas donde menos aciertas *últimamente*.

### El plan del día: tiempo, atraso y ausencias

El plan de hoy es **una sola lista de pasos** armada en el motor (`computeTodayPlan().steps`).
La pantalla Hoy cuenta esa lista y la sesión la recorre tal cual: el «N pasos» que se
promete es el que se hace, y `estMinutes` es la suma de lo que cuestan esos mismos pasos.

**Un presupuesto de tiempo.** Cada paso cuesta minutos (`COSTO`: 0.5 un repaso, 0.8
enseñar una tarjeta, 0.35 comprobarla, 2 una lección, 3 leer la nota de un tema, 1.2 un
reactivo) y un día normal dura **30 minutos**. Sube hasta 45 cuando el calendario aprieta
(hay que meter más temas nuevos por día) y hasta 5 minutos más cuando el atraso es muy
profundo. Ya no entran todas las tarjetas por estar vencidas: tras una semana sin
estudiar había 260 «para hoy» y tres horas de sesión.

**Más práctica que repaso.** El examen es de reactivos, así que la práctica es lo que
más tiempo lleva: un día normal son unos 12 reactivos contra 10 tarjetas o menos, y
fuera de recuperación nunca hay más tarjetas que reactivos. Lo nuevo se lleva casi un
tercio del día (sin pasar de 2 lecciones de ampliación y 6 tarjetas sueltas), y el
repaso, lo que sobra. Para que ese repaso corto alcance, las tarjetas se espacian más
(ver [Repetición espaciada](#repetición-espaciada)): la práctica también es recuperación.
El atraso pesa de forma gradual: con 20 tarjetas vencidas apenas se nota y con 80 el
repaso ya es lo principal. Pisos: al menos 8 repasos y 6 reactivos; en el repaso final la
práctica pasa a 24 reactivos diarios.

**Qué se repasa primero cuando no cabe todo.** Cada tarjeta vencida tiene una prioridad
que combina lo olvidable que está (la probabilidad de recordarla cae con el tiempo desde
su último repaso, en proporción a su intervalo), su fragilidad (facilidad baja y caídas
previas), cómo va su tema en la práctica reciente y el riesgo de su área. Dos matices
importan:

- *Lo más urgente no es lo más perdido.* Una tarjeta con casi cero probabilidad de
  recuerdo ya hay que volver a aprenderla; si siempre se atendiera primero lo más
  perdido, el día se iría en fallar tarjetas y las recién falladas —que sí se recuerdan—
  se pudrirían esperando. Se termina primero lo empezado.
- *Sin bloques.* Los repasos de una misma tanda no traen dos tarjetas seguidas del mismo
  tema si hay alternativa, y se alternan las áreas.

**Lo que no cabe no se pierde.** Sigue vencido, con su fecha, y entra en los días
siguientes por orden de prioridad. Con más de 40 tarjetas vencidas el plan pasa a
**modo recuperación**: entra a lo más un tema nuevo (salvo que el calendario apriete), casi
todo el tiempo va a repasar y solo se conservan la práctica mínima y las tarjetas base de
los temas ya leídos. En la simulación con una semana de ausencia, el atraso baja a la mitad en
unos cinco días y se queda en un colchón acotado (unas decenas de tarjetas ligeramente
atrasadas), en vez de crecer. Si se quiere avanzar más, al terminar el día aparece **Seguir con el atrasado**:
una ronda opcional de hasta 20 repasos, sin nada nuevo ni práctica.

**El día tiene cuenta.** Todo lo que haces se guarda al instante —la tarjeta, la
bitácora, la racha—, no al llegar al resumen, y se descuenta del plan: terminar la sesión
deja «nada pendiente hoy» y abandonarla a la mitad deja exactamente lo que falta. Un
simulacro cuenta como día de estudio pero no gasta el tiempo del repaso. El tema nuevo se
da por conocido cuando lees su nota (el botón), no cuando aparece en pantalla.

**El orden dentro de la sesión.** Los repasos se reparten en tandas, y entre tanda y
tanda entra material nuevo, para alternar recuperar y aprender en vez de cincuenta
tarjetas seguidas antes de tocar algo nuevo. Cada unidad de material nuevo se comprueba
poco después. Una lección va justo antes de la primera tarjeta de su bloque. La práctica va
al final, entrelazada por área.

**«Otra vez».** No manda la tarjeta a mañana y se olvida: se vuelve a preguntar unos pasos
después (hasta dos veces) para comprobar que ya se recuerda antes de cerrar la sesión. Su
fecha ya quedó fijada al calificar; recordarla en la sesión la cuenta como su primera
repetición, y así se ahorra un repaso al día siguiente.

Si vas adelantado, el reparto no te frena: la sesión trae **entre 2 y 8 temas nuevos**
mientras queden temas por conocer, aunque el calendario pediría menos (si el tiempo
alcanza). Y en la fase final, si todavía quedan temas sin ver, se reparten entre los días
que faltan en vez de dejarlos fuera.

### Repetición espaciada

SM-2 puro supone que cada repaso ocurre justo el día programado y que las tarjetas nacen
sueltas. Aquí se corrigen tres supuestos sin tocar lo que ya hay guardado (intervalo,
repeticiones, facilidad):

- **Menos repaso.** Desde la tercera repetición el intervalo crece un 50 % más que en
  SM-2 puro y la segunda repetición es a cinco días, no a tres.
- **Retraso.** Recordar una tarjeta con diez días de atraso demuestra más que hacerlo a
  tiempo: el retraso cuenta a medias en el nuevo intervalo. Repasar **antes** de la fecha
  no demuestra nada: ni sube repeticiones ni alarga el intervalo (antes, repetir tarjetas
  el mismo día inflaba intervalos y dominio).
- **Sincronía.** Las tarjetas que se aprenden juntas vencían siempre juntas, de ahí los
  picos de cientos de repasos. Los intervalos de 4 días o más llevan una variación
  determinista de ±10 %: la misma tarjeta siempre da lo mismo, y los botones anuncian
  exactamente lo que va a pasar (`programarRepaso` es una función pura que usan los dos).
- **El examen.** Nada se programa más allá de lo que deja volver a verlo antes del
  último día de estudio: con seis días por delante ningún repaso se aleja más de tres.

### El área en riesgo

El examen se acredita área por área, así que el plan no reparte la práctica en partes
iguales. `areaReadiness()` calcula, por área, un riesgo entre 0 y 1 que combina dos cosas:
qué porcentaje del temario de esa área llevas visto *frente a lo que el calendario ya
pedía* y qué porcentaje de aciertos llevas **últimamente** frente a un objetivo de trabajo. El objetivo no es igual para todas: las áreas con menos
reactivos piden más margen, porque con 19 preguntas la suerte pesa más que con 32.
Mientras no hay respuestas suficientes manda la cobertura, y un área sin estudiar es
riesgo alto cuando el calendario ya debería tener práctica de sobra (en la primera semana
nada está en riesgo por no tener datos). Ese riesgo se convierte en peso: más riesgo, más turnos en la
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

- **Repaso**: la fuerza promedio de *todas* sus tarjetas, incluidas las nuevas. La fuerza
  de una tarjeta son sus repeticiones (hasta cinco) menos lo que ya se le pasó su fecha:
  dejar de estudiar se nota.
- **Preguntas**: el porcentaje de aciertos **recientes**, ponderado por cuántas respuestas
  recientes llevas. Cada respuesta nueva pesa uno; las anteriores pierden 10 % por
  respuesta y la mitad cada dos semanas, así que una mala racha se nota en seis respuestas
  (con cien acumuladas, un total de toda la vida apenas se movía) y la confianza se apaga
  sola si pasa el tiempo sin practicar. El total de toda la vida se sigue guardando.

Cuando el temario crece, los temas que ya habías visto ganan tarjetas sin repasar y esas
cuentan como cero. **El porcentaje baja a propósito**: hay que estudiar el material nuevo
para recuperar el porcentaje anterior. Nada del avance previo se borra; solo cambia la
vara de medir. Las tarjetas nuevas no llegan todas de golpe: se reparten entre los
siguientes 21 días, cada una se enseña antes de entrar al repaso, y la pantalla de inicio
avisa cuántas se agregaron.
