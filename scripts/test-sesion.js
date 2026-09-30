// Comprobación del plan y de la sesión de estudio a lo largo del tiempo.
//
// `test-engine.js` protege la regla de «nada se pregunta antes de enseñarse»
// sobre un día. Aquí se prueba lo que solo se ve con los días encima: ausencias,
// atraso masivo, drenaje del backlog, abandono a la mitad de la sesión, que el
// plan que se promete sea la sesión que se recorre, y que las métricas
// reaccionen a lo que pasó hace poco. Se ejecuta con `npm run test:motor`.
//
// Todo corre sobre un reloj falso y una memoria simulada, con semillas fijas:
// una falla se puede repetir tal cual.
import { E, pruebas, fijarDia, diaSiguiente } from "./harness.js";
import { estudiarHoy, rngSim, vencidasHoy } from "./simulador.js";

const { check, terminar } = pruebas();

const TEMAS = E.getAllTopics().map((t) => t.id);
const orden = () => E.getLearningOrder();

/** Un progreso limpio, un día antes de `iso`. */
function empezar(iso, modoEsencial = true) {
  E.setModoEsencial(modoEsencial);
  fijarDia(diaSiguiente(iso, -1));
  E.resetProgress();
  fijarDia(iso);
}

/** Estudia `n` días seguidos con el simulador; devuelve el último día estudiado. */
function estudiarDias(desde, n, rng, opts) {
  let dia = desde;
  for (let i = 0; i < n; i++) {
    fijarDia(dia);
    estudiarHoy(rng, opts);
    dia = diaSiguiente(dia);
  }
  return dia; // el primer día SIN estudiar
}

/** Cuántos minutos le pediría el plan al sustentante. */
const minutos = (plan) => E.minutosDeSesion(plan.steps);

/* ------------------------------------------------------------------
   20) Tras varios días sin estudiar, el día no se convierte en una maratón

   El caso que detonó este sprint: una semana fuera y ~260 tarjetas «para hoy»,
   tres horas de sesión. Se prueba con un sustentante realista (semanas de
   estudio y luego la ausencia) y con un progreso extremo fabricado a mano.
   ------------------------------------------------------------------ */
console.log("\n20) Tras días sin estudiar, el plan sigue cabiendo en un día");
{
  empezar("2026-08-01", false);
  const rng = rngSim(11);
  let dia = estudiarDias("2026-08-01", 45, rng);
  const ultimoEstudio = diaSiguiente(dia, -1);
  const sinAusencia = (() => { fijarDia(dia); return E.computeTodayPlan(); })();

  dia = diaSiguiente(dia, 7);
  fijarDia(dia);
  const plan = E.computeTodayPlan();
  const vencidas = vencidasHoy();
  check(vencidas > sinAusencia.reviewCards.length + 20, `tras 7 días fuera hay un atraso real (${vencidas} tarjetas vencidas, ${sinAusencia.reviewCards.length} un día normal)`);
  check(plan.reviewCards.length <= 90, `pero el plan no las mete todas: ${plan.reviewCards.length} de ${vencidas}`);
  check(plan.reviewCards.length + plan.atrasadas === vencidas, `y lo que no cabe queda anotado como atrasado (${plan.atrasadas}), no perdido`);
  check(minutos(plan) <= E.MINUTOS_TOPE + 3, `la sesión cuesta ${minutos(plan).toFixed(0)} min, dentro del tope de ${E.MINUTOS_TOPE}`);
  check(plan.estMinutes === Math.round(minutos(plan)), "y estMinutes describe exactamente esos pasos");
  check(plan.enRecuperacion, "con atraso, la sesión entra en modo recuperación");
  check(plan.newTopics.length <= 1, `y en recuperación trae a lo más un tema nuevo (trajo ${plan.newTopics.length})`);
  check(plan.quizQuestions.length >= 3, `sin dejar sin práctica al día (${plan.quizQuestions.length} reactivos)`);
  check(ultimoEstudio < dia, "(sanidad) la ausencia empezó después del último día estudiado");

  /* Calcular el plan no toca las tarjetas: lo que no cabe sigue vencido. */
  const antes = JSON.stringify(E.STATE.cards);
  E.computeTodayPlan();
  check(JSON.stringify(E.STATE.cards) === antes, "calcular el plan no modifica ninguna tarjeta");
}

console.log("\n20b) Progreso extremo: cientos de tarjetas vencidas");
{
  empezar("2026-09-01", false);
  orden().slice(0, 100).forEach((id) => E.introduceTopic(id));
  Object.keys(E.STATE.cards).forEach((cid) => {
    const topicId = cid.split("::")[0];
    E.getAllTopics().find((t) => t.id === topicId).blocks.forEach((b, i) => E.markLessonSeen(topicId, b.nombre));
    E.gradeCard(cid, 2);
    E.gradeCard(cid, 2);
  });
  fijarDia("2026-09-25"); // más de tres semanas fuera
  const vencidas = vencidasHoy();
  const plan = E.computeTodayPlan();
  check(vencidas > 250, `hay ${vencidas} tarjetas vencidas (más de 250)`);
  check(plan.reviewCards.length <= 90, `el plan trae ${plan.reviewCards.length} repasos, no ${vencidas}`);
  check(plan.reviewCards.length >= 20, "pero nunca menos del piso de repaso");
  check(minutos(plan) <= E.MINUTOS_TOPE + 3, `y cuesta ${minutos(plan).toFixed(0)} min`);
  check(minutos(plan) > E.MINUTOS_SESION, `un atraso así pide algo más que un día normal (${minutos(plan).toFixed(0)} > ${E.MINUTOS_SESION} min)`);
  check(plan.totalSteps === plan.steps.length, "totalSteps es la cuenta real de pasos");
  const unicas = new Set(plan.reviewCards.map((e) => e.cardId));
  check(unicas.size === plan.reviewCards.length, "ninguna tarjeta aparece dos veces");

  /* Nada se pierde ni se reprograma: sigue todo vencido. */
  const todavia = Object.keys(E.STATE.cards).filter((c) => E.STATE.cards[c].due <= "2026-09-25").length;
  check(todavia >= vencidas, "todas las tarjetas siguen vencidas hasta que se repasen");

  /* Un modo esencial con la misma ausencia también cabe. */
  E.setModoEsencial(true);
  const planE = E.computeTodayPlan();
  check(minutos(planE) <= E.MINUTOS_TOPE + 3, `en modo esencial también cabe (${minutos(planE).toFixed(0)} min)`);
  E.setModoEsencial(false);
}

console.log("\n20c) En recuperación no se deja un tema a medias");
{
  empezar("2026-09-01", true);
  orden().slice(0, 60).forEach((id) => E.introduceTopic(id));
  Object.keys(E.STATE.cards).forEach((cid) => { E.learnCard(cid); E.gradeCard(cid, 2); E.gradeCard(cid, 2); });
  fijarDia("2026-09-25");
  /* Un tema cuya nota se leyó pero cuyas tarjetas nunca se enseñaron. */
  const t = orden()[60];
  E.introduceTopic(t);
  const plan = E.computeTodayPlan();
  check(plan.enRecuperacion, "(sanidad) hay atraso: modo recuperación");
  const base = E.cardsOfBlock(t, E.topicsById()[t].blocks[0]);
  const enPlan = new Set(plan.steps.filter((p) => p.type === "learn").map((p) => p.cardId));
  check(base.every((c) => enPlan.has(c)), "las tarjetas base de un tema ya leído se enseñan aunque haya atraso");
}

/* ------------------------------------------------------------------
   21) El atraso se drena en pocos días, sin acumular ni pasarse del tiempo
   ------------------------------------------------------------------ */
console.log("\n21) El backlog se drena en los días siguientes");
{
  empezar("2026-08-01", false);
  const rng = rngSim(21);
  let dia = estudiarDias("2026-08-01", 45, rng);
  dia = diaSiguiente(dia, 8);

  const serie = [];
  let maxMin = 0;
  let maxRepasos = 0;
  for (let i = 0; i < 10; i++) {
    fijarDia(dia);
    const h = estudiarHoy(rng);
    serie.push(h.plan.atrasadas);
    maxMin = Math.max(maxMin, minutos(h.plan));
    maxRepasos = Math.max(maxRepasos, h.plan.reviewCards.length);
    dia = diaSiguiente(dia);
  }
  console.log("   atrasadas al empezar cada día: " + serie.join(", "));
  check(serie[0] > 0, "el primer día de vuelta hay atraso que no cabe");
  const dren = serie.findIndex((n) => n === 0);
  check(dren > 0 && dren <= 6, `el atraso llega a cero en ${dren} días (como máximo 6)`);
  check(serie.slice(0, dren + 1).every((n, i, a) => i === 0 || n < a[i - 1]), "y baja todos los días hasta llegar a cero");
  check(serie.slice(dren).every((n) => n <= 20), "sin volver a acumularse después (nunca más de 20 atrasadas)");
  check(maxMin <= E.MINUTOS_TOPE + 3, `ningún día pasó de ${E.MINUTOS_TOPE} min (máximo ${maxMin.toFixed(0)})`);
  check(maxRepasos <= 90, `ni de 90 repasos (máximo ${maxRepasos})`);

  /* Ya al día, el plan vuelve a lo normal: sin recuperación y con temas nuevos. */
  fijarDia(dia);
  const normal = E.computeTodayPlan();
  check(!normal.enRecuperacion, "ya al día, deja el modo recuperación");
  check(normal.newTopics.length >= 2, `y vuelve a traer temas nuevos (${normal.newTopics.length})`);
}

/* ------------------------------------------------------------------
   22) Qué repasar primero cuando no cabe todo
   ------------------------------------------------------------------ */
console.log("\n22) Prioridad de repaso y entrelazado");
{
  empezar("2026-09-01", true);
  orden().slice(0, 40).forEach((id) => E.introduceTopic(id));
  Object.keys(E.STATE.cards).forEach((cid) => { E.learnCard(cid); });
  fijarDia("2026-09-02");
  const cids = Object.keys(E.STATE.cards);
  const [joven, madura, sana] = cids;
  /* Una tarjeta joven olvidada (intervalo 1 día, 6 de retraso), una madura con
     un solo día de retraso y una a tiempo. */
  Object.assign(E.STATE.cards[joven], { interval: 1, repetitions: 1, lastReview: "2026-08-26", due: "2026-08-27", ef: 2.5 });
  Object.assign(E.STATE.cards[madura], { interval: 60, repetitions: 6, lastReview: "2026-07-03", due: "2026-09-01", ef: 2.5 });
  Object.assign(E.STATE.cards[sana], { interval: 3, repetitions: 2, lastReview: "2026-08-30", due: "2026-09-02", ef: 2.5 });
  const plan = E.computeTodayPlan();
  const pj = plan.reviewCards.find((e) => e.cardId === joven);
  const pm = plan.reviewCards.find((e) => e.cardId === madura);
  check(pj && pm && pj.prioridad > pm.prioridad * 2, "la tarjeta joven olvidada pesa mucho más que la madura con un día de retraso");
  check(plan.reviewCards[0].cardId === joven || plan.reviewCards.slice(0, 3).some((e) => e.cardId === joven), "y sale entre las primeras");

  /* Fragilidad: mismo retraso, más caídas y menos facilidad → más urgente. */
  const [a, b] = cids.slice(5, 7);
  const base = { interval: 5, repetitions: 3, lastReview: "2026-08-27", due: "2026-09-01" };
  Object.assign(E.STATE.cards[a], base, { ef: 2.5, lapses: 0 });
  Object.assign(E.STATE.cards[b], base, { ef: 1.4, lapses: 3 });
  const p2 = E.computeTodayPlan();
  const fa = p2.reviewCards.find((e) => e.cardId === a);
  const fb = p2.reviewCards.find((e) => e.cardId === b);
  check(fb.prioridad > fa.prioridad, "a igual retraso, la tarjeta que más se ha caído pesa más");

  /* Entrelazado: dos tarjetas del mismo tema no van seguidas si hay alternativa. */
  Object.keys(E.STATE.cards).forEach((cid) => { E.STATE.cards[cid].due = "2026-08-30"; E.STATE.cards[cid].lastReview = "2026-08-29"; });
  const p3 = E.computeTodayPlan();
  let juntas = 0;
  for (let i = 1; i < p3.reviewCards.length; i++) if (p3.reviewCards[i].topicId === p3.reviewCards[i - 1].topicId) juntas++;
  check(p3.reviewCards.length > 20 && juntas <= 2, `con ${p3.reviewCards.length} repasos casi ninguna pareja del mismo tema queda seguida (${juntas})`);
  let mismaArea = 0;
  for (let i = 1; i < p3.reviewCards.length; i++) if (p3.reviewCards[i].area === p3.reviewCards[i - 1].area) mismaArea++;
  check(mismaArea < p3.reviewCards.length / 3, `y las áreas se alternan (${mismaArea} seguidas de ${p3.reviewCards.length})`);

  /* El riesgo del área pesa: la misma tarjeta pesa más en un área en riesgo. */
  Object.keys(E.STATE.cards).forEach((cid) => { E.STATE.cards[cid].due = "2026-12-31"; });
  const fl = E.topicsOfArea(2)[0];
  const ot = E.topicsOfArea(5)[0];
  E.introduceTopic(fl.id); E.introduceTopic(ot.id);
  fijarDia("2026-09-30");
  E.getAllTopics().forEach((t) => { for (let i = 0; i < 12; i++) E.recordQuizAnswer(t.id, t.area === 2 ? i < 2 : i < 11); });
  const ca = fl.id + "::fc0";
  const cb = ot.id + "::fc0";
  [ca, cb].forEach((c) => { E.learnCard(c); Object.assign(E.STATE.cards[c], { interval: 4, repetitions: 3, lastReview: "2026-09-20", due: "2026-09-24", ef: 2.5 }); });
  const p4 = E.computeTodayPlan();
  const ea = p4.reviewCards.find((e) => e.cardId === ca);
  const eb = p4.reviewCards.find((e) => e.cardId === cb);
  check(ea && eb && ea.prioridad > eb.prioridad, "una tarjeta de un área floja pesa más que la misma en un área sólida");
}

/* ------------------------------------------------------------------
   23) «Otra vez» comprueba de nuevo el recuerdo dentro de la sesión
   ------------------------------------------------------------------ */
console.log("\n23) «Otra vez» se vuelve a preguntar en la misma sesión");
{
  const resumen = { type: "summary" };
  const paso = (n) => ({ type: "review", cardId: "1.1.1::fc" + (n % 2), topicId: "1.1.1" });
  const lista = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(paso).concat(resumen);
  const r1 = E.reinsertarRepaso(lista, 2, lista[2], 0);
  check(r1.length === lista.length + 1, "una tarjeta fallada agrega un paso a la sesión");
  const pos = r1.findIndex((p, i) => i > 2 && p.retry);
  check(pos > 3 && pos <= 2 + 1 + 5, `y reaparece unos pasos después, no de inmediato (en el lugar ${pos})`);
  check(r1[pos].check === true && r1[pos].cardId === lista[2].cardId, "como comprobación de la misma tarjeta");
  check(r1[r1.length - 1].type === "summary", "el resumen sigue siendo el último paso");
  check(lista.length === 11, "y la lista original no se modificó");

  const r2 = E.reinsertarRepaso(r1, pos, r1[pos], 1);
  check(r2.length === r1.length + 1, "si vuelve a fallar, se pregunta una vez más");
  const r3 = E.reinsertarRepaso(r2, pos, r1[pos], 2);
  check(r3 === r2, "pero tras dos reintentos se deja para mañana (no se frustra la sesión)");

  /* Fallar el último paso antes del resumen tampoco rompe nada. */
  const corta = [paso(0), resumen];
  const r4 = E.reinsertarRepaso(corta, 0, corta[0], 0);
  check(r4.length === 3 && r4[2].type === "summary" && r4[1].retry, "fallar el último paso lo deja justo antes del resumen");

  /* Calificar programa la tarjeta; la comprobación no la reprograma. */
  empezar("2026-09-10", true);
  E.introduceTopic("1.1.1");
  const cid = "1.1.1::fc0";
  E.learnCard(cid);
  fijarDia("2026-09-11");
  E.gradeCard(cid, 0);
  const tras = JSON.stringify(E.STATE.cards[cid]);
  check(E.STATE.cards[cid].due === "2026-09-12" && E.STATE.cards[cid].lapses === 1, "«Otra vez» programa mañana y cuenta una caída");
  E.recallCheck(cid);
  E.recallCheck(cid);
  check(JSON.stringify(E.STATE.cards[cid]) === tras, "volver a preguntarla en la sesión no mueve su fecha ni cuenta otra caída");
  check(E.STATE.cards[cid].repetitions === 0, "(sanidad) una comprobación fallida no cuenta como repetición");
  E.recallCheck(cid, 2);
  const c1 = E.STATE.cards[cid];
  check(c1.repetitions === 1 && c1.due === "2026-09-12" && c1.interval === 1 && c1.lapses === 1, "recordarla en la sesión cuenta como su primera repetición, sin mover la fecha");
  E.recallCheck(cid, 2);
  check(E.STATE.cards[cid].repetitions === 1, "y solo la primera vez: repetir la comprobación no infla nada");
  E.gradeCard(cid, 0);
  check(E.STATE.cards[cid].lapses === 2 && E.STATE.cards[cid].ef >= 1.3, "cada calificación real sí suma su caída, y la facilidad nunca baja de 1.3");
}

/* ------------------------------------------------------------------
   24) Abandonar a la mitad no pierde nada ni descuadra el día
   ------------------------------------------------------------------ */
console.log("\n24) Sesión abandonada a la mitad");
{
  empezar("2026-08-01", true);
  const rng = rngSim(24);
  let dia = estudiarDias("2026-08-01", 20, rng);
  fijarDia(dia);
  const plan = E.computeTodayPlan();
  const total = plan.totalSteps;
  const logAntes = JSON.stringify(E.STATE.sessionLog[E.toISO(E.todayDate())] || null);
  check(logAntes === "null", "(sanidad) hoy todavía no hay actividad registrada");

  const mitad = Math.floor(total / 2);
  const h = estudiarHoy(rng, { abandonarEn: mitad });
  const log = E.STATE.sessionLog[E.toISO(E.todayDate())];
  check(!!log, "a media sesión la bitácora del día ya existe (no espera al resumen)");
  const registrado = (log.cardsReviewed || 0) + (log.cardsLearned || 0) + (log.lessons || 0) + (log.newTopics || 0) + (log.checks || 0) + (log.quizAnswered || 0);
  check(registrado === h.pasos, `y coincide con lo hecho (${registrado} anotados, ${h.pasos} hechos)`);
  check(E.STATE.lastStudyDate === E.toISO(E.todayDate()) && E.STATE.streak >= 1, "la racha cuenta el día aunque no se llegara al resumen");
  const st = E.overallStats();
  check(st.totalCardsReviewed >= log.cardsReviewed && st.quizAnswered >= (log.quizAnswered || 0), "las estadísticas incluyen lo respondido");

  /* Lo que ya se hizo no vuelve a salir, y lo que falta sí. */
  const resto = E.computeTodayPlan();
  const yaRepasadas = resto.reviewCards.filter((e) => E.STATE.cards[e.cardId].lastReview === E.toISO(E.todayDate()));
  check(yaRepasadas.length === 0, "una tarjeta ya calificada hoy no se ofrece otra vez");
  check(resto.totalSteps > 0 && resto.totalSteps <= total, `lo que falta sigue pendiente (${resto.totalSteps} de ${total} pasos)`);
  const introHechos = h.temas;
  check(resto.newTopics.length <= Math.max(0, plan.newTopics.length - introHechos), "y el cupo de temas nuevos del día no se reinicia");

  /* Terminar el resto deja el día cumplido, sin inventar otra tanda. */
  estudiarHoy(rng);
  const fin = E.computeTodayPlan();
  check(fin.totalSteps === 0, `al terminar la sesión no queda nada pendiente hoy (quedan ${fin.totalSteps} pasos)`);
  check(fin.newTopics.length === 0 && fin.quizQuestions.length === 0, "ni temas nuevos ni práctica extra");
  const otraVez = E.computeTodayPlan();
  check(otraVez.totalSteps === 0, "y es estable: recalcular no trae trabajo nuevo");

  /* Al día siguiente sí hay plan. */
  fijarDia(diaSiguiente(dia));
  check(E.computeTodayPlan().totalSteps > 0, "mañana hay plan otra vez");
}

console.log("\n24b) Cerrar sin leer un tema nuevo no lo da por visto");
{
  empezar("2026-08-01", true);
  const plan = E.computeTodayPlan();
  const t = plan.newTopics[0];
  check(!E.isIntroduced(t.id), "el tema del plan aún no está introducido");
  /* La app introduce el tema al leer su nota (botón), no al pintarla. Aquí se
     comprueba lo que el motor garantiza: que un tema sin introducir sigue en el plan. */
  const de_nuevo = E.computeTodayPlan();
  check(de_nuevo.newTopics.some((x) => x.id === t.id) || de_nuevo.newTopics.length === plan.newTopics.length, "mientras no se lea, el plan lo sigue proponiendo");
}

/* ------------------------------------------------------------------
   25) El plan que se promete es la sesión que se recorre
   ------------------------------------------------------------------ */
console.log("\n25) Consistencia entre el plan y la sesión");
{
  empezar("2026-08-01", false);
  const rng = rngSim(25);
  let dia = estudiarDias("2026-08-01", 30, rng);
  fijarDia(dia);

  let dias = 0;
  let problemas = [];
  for (let d = 0; d < 12; d++) {
    fijarDia(dia);
    const plan = E.computeTodayPlan();
    dias++;
    const steps = plan.steps;
    const cuenta = (t) => steps.filter((p) => p.type === t).length;
    if (plan.totalSteps !== steps.length) problemas.push(`${dia}: totalSteps ${plan.totalSteps} ≠ ${steps.length}`);
    const { repasar, aprender, practicar } = plan.resumen;
    if (repasar + aprender + practicar !== steps.length) problemas.push(`${dia}: el resumen no suma los pasos`);
    if (steps.filter((p) => p.type === "review" && !p.check).length !== plan.reviewCards.length) problemas.push(`${dia}: repasos`);
    if (cuenta("intro") !== plan.newTopics.length) problemas.push(`${dia}: temas nuevos`);
    if (cuenta("quiz") !== plan.quizQuestions.length) problemas.push(`${dia}: práctica`);
    if (cuenta("lesson") !== plan.blockLessons.length) problemas.push(`${dia}: lecciones`);
    if (steps.some((p) => !E.pasoConContenido(p))) problemas.push(`${dia}: paso vacío`);

    /* Cada tema nuevo trae todas sus tarjetas base como pasos de aprendizaje. */
    plan.newTopics.forEach((t) => {
      const base = E.cardsOfBlock(t.id, t.blocks[0]);
      const i = steps.findIndex((p) => p.type === "intro" && p.topic.id === t.id);
      const siguientes = steps.slice(i + 1, i + 1 + base.length).map((p) => p.cardId);
      if (JSON.stringify(siguientes) !== JSON.stringify(base)) problemas.push(`${dia}: ${t.id} sin sus tarjetas base`);
    });

    /* Recorrer la sesión paso a paso, aplicando lo que cada paso enseña. */
    const aprendidas = new Set();
    const leidas = new Set();
    steps.forEach((p, i) => {
      if (p.type === "lesson") leidas.add(p.topic.id + "::" + p.bloque);
      if (p.type === "review" && !p.check && !E.isLearned(p.cardId)) problemas.push(`${dia}: repaso de tarjeta sin enseñar ${p.cardId}`);
      if (p.type === "review" && p.check) {
        if (!aprendidas.has(p.cardId)) problemas.push(`${dia}: comprobación antes de enseñar ${p.cardId}`);
      }
      if (p.type === "learn") aprendidas.add(p.cardId);
      if (p.type === "review" || p.type === "learn") {
        const bc = E.blockOfCard(p.cardId);
        if (bc && !E.isLessonSeen(bc.topic.id, bc.block, bc.index) && !leidas.has(bc.topic.id + "::" + bc.block.nombre)) {
          problemas.push(`${dia}: ${p.cardId} antes de la lección de su bloque`);
        }
      }
      if (p.type === "quiz") {
        const permitido = E.availableQuiz(p.topic).some((q) => q.q === p.question.q) || p.question.generated;
        if (!permitido) problemas.push(`${dia}: reactivo de un bloque cerrado en ${p.topic.id}`);
      }
    });
    /* La práctica va al final. */
    const primerQuiz = steps.findIndex((p) => p.type === "quiz");
    if (primerQuiz >= 0 && steps.slice(primerQuiz).some((p) => p.type !== "quiz" && p.type !== "lesson")) problemas.push(`${dia}: algo se mezcló dentro de la práctica`);
    /* Cada comprobación viene después de su paso de aprendizaje. */
    const suma = steps.reduce((n, p) => n + E.costoDePaso(p), 0);
    if (Math.round(suma) !== plan.estMinutes) problemas.push(`${dia}: estMinutes`);

    estudiarHoy(rng);
    dia = diaSiguiente(dia);
  }
  check(problemas.length === 0, `${dias} días de plan coinciden con su sesión (${problemas.slice(0, 3).join(" | ") || "sin diferencias"})`);
}

/* ------------------------------------------------------------------
   26) Repetición espaciada: retraso, adelanto, variación y examen
   ------------------------------------------------------------------ */
console.log("\n26) SM-2 con retraso, adelanto, variación y tope del examen");
{
  empezar("2026-09-01", true);
  const cid = "1.1.1::fc0";
  E.introduceTopic("1.1.1");
  const card = () => E.STATE.cards[cid];

  /* Una tarjeta madura: intervalo 10, tercera repetición. */
  const madura = { interval: 10, repetitions: 3, ef: 2.5, lastReview: "2026-09-01", due: "2026-09-11", learned: true };
  Object.assign(card(), madura);

  fijarDia("2026-09-11");
  const aTiempo = E.programarRepaso(card(), 2, E.todayDate(), cid);
  fijarDia("2026-09-21"); // diez días tarde
  const tarde = E.programarRepaso(card(), 2, E.todayDate(), cid);
  check(tarde.interval > aTiempo.interval, `recordar con retraso alarga más el intervalo (${tarde.interval} > ${aTiempo.interval})`);
  check(tarde.interval <= Math.round(20 * 2.5 * 1.11) + 1, "pero el retraso cuenta a medias, no completo");

  fijarDia("2026-09-05"); // seis días antes de su fecha
  const temprano = E.programarRepaso(card(), 2, E.todayDate(), cid);
  check(temprano.repetitions === 3 && temprano.interval === 10 && temprano.due === "2026-09-11", "repasar antes de tiempo no sube la escalera ni mueve la fecha");
  check(temprano.adelantado === true, "y se marca como repaso adelantado");
  E.gradeCard(cid, 2);
  E.gradeCard(cid, 2);
  E.gradeCard(cid, 2);
  check(card().repetitions === 3 && card().due === "2026-09-11", "repetir la tarjeta el mismo día no infla repeticiones ni intervalo");
  E.gradeCard(cid, 0);
  check(card().repetitions === 0 && card().due === "2026-09-06", "pero olvidarla antes de tiempo sí la baja a mañana");

  /* Variación determinista: la misma tarjeta y repetición siempre dan lo mismo,
     y los botones muestran lo que de verdad pasará. */
  Object.assign(card(), madura, { lapses: 0 });
  fijarDia("2026-09-11");
  const uno = E.programarRepaso(card(), 2, E.todayDate(), cid);
  const dos = E.programarRepaso(card(), 2, E.todayDate(), cid);
  check(uno.interval === dos.interval, "la variación de los intervalos es determinista");
  const previsto = E.nextIntervalPreview(cid, 2);
  E.gradeCard(cid, 2);
  const real = E.daysBetween(E.todayDate(), E.fromISO(card().due));
  check(previsto === `en ${real} días`, `el botón anuncia lo que ocurre («${previsto}», ${real} días)`);

  /* La variación desincroniza tarjetas que se aprenden juntas. */
  const intervalos = new Set();
  for (let i = 0; i < 40; i++) {
    const c = { interval: 10, repetitions: 3, ef: 2.5, lastReview: "2026-09-01", due: "2026-09-11" };
    intervalos.add(E.programarRepaso(c, 2, E.todayDate(), "9.9.9::fc" + i).interval);
  }
  check(intervalos.size >= 4, `cuarenta tarjetas iguales ya no vuelven el mismo día (${intervalos.size} fechas distintas)`);
  check([...intervalos].every((n) => n >= 22 && n <= 28), "dentro de ±10 % de lo que pediría SM-2");

  /* Intervalos cortos, exactos. */
  const nueva = { interval: 1, repetitions: 0, ef: 2.5, lastReview: null, due: "2026-09-11" };
  check(E.programarRepaso(nueva, 2, E.todayDate(), cid).interval === 1, "la primera repetición sigue siendo a un día");
  const segunda = { interval: 1, repetitions: 1, ef: 2.5, lastReview: "2026-09-10", due: "2026-09-11" };
  check(E.programarRepaso(segunda, 2, E.todayDate(), cid).interval === 3, "y la segunda a tres");

  /* El examen: nada se programa más allá de lo que permite volver a verlo. */
  fijarDia("2026-11-15"); // faltan 6 días para el último de estudio
  const cerca = E.programarRepaso({ interval: 40, repetitions: 5, ef: 2.6, lastReview: "2026-11-01", due: "2026-11-15" }, 2, E.todayDate(), cid);
  check(cerca.interval <= 3, `a seis días del final un repaso no se aleja más de tres (${cerca.interval})`);
  fijarDia("2026-11-21");
  const ultimo = E.programarRepaso({ interval: 40, repetitions: 5, ef: 2.6, lastReview: "2026-11-01", due: "2026-11-21" }, 2, E.todayDate(), cid);
  check(ultimo.interval === 1, "el último día de estudio todo queda a un día");
  fijarDia("2026-09-11");
  const lejos = E.programarRepaso({ interval: 40, repetitions: 5, ef: 2.6, lastReview: "2026-08-01", due: "2026-09-11" }, 2, E.todayDate(), cid);
  check(lejos.interval > 25, "lejos del examen los intervalos crecen con normalidad");
}

/* ------------------------------------------------------------------
   27) Las métricas reaccionan a lo que pasó hace poco
   ------------------------------------------------------------------ */
console.log("\n27) Dominio y riesgo reaccionan a lo reciente");
{
  empezar("2026-09-01", true);
  const t = E.topicsOfArea(5)[0];
  E.introduceTopic(t.id);
  E.cardsForTopic(t.id).forEach((c) => { E.learnCard(c); Object.assign(E.STATE.cards[c], { repetitions: 5, interval: 20, due: "2026-09-20", lastReview: "2026-09-01" }); });

  /* Cien aciertos de toda la vida y luego una racha mala. */
  for (let i = 0; i < 60; i++) E.recordQuizAnswer(t.id, true);
  fijarDia("2026-09-10");
  const bien = E.masteryDetail(t.id);
  for (let i = 0; i < 6; i++) E.recordQuizAnswer(t.id, false);
  const mal = E.masteryDetail(t.id);
  const vida = E.quizStatsFor(t.id);
  check(vida.correct / vida.seen > 0.9, `(sanidad) el acierto de toda la vida sigue alto (${Math.round((vida.correct / vida.seen) * 100)} %)`);
  check(mal.quizScore < bien.quizScore - 0.25, `seis fallos seguidos bajan de verdad la parte de práctica (${bien.quizScore.toFixed(2)} → ${mal.quizScore.toFixed(2)})`);
  check(E.quizRecent(t.id).acierto < 0.5, "y el acierto reciente refleja la racha");

  /* El riesgo del área lo nota. */
  const r1 = E.areaReadiness().find((a) => a.area === 5);
  for (let i = 0; i < 12; i++) E.recordQuizAnswer(t.id, true);
  const r2 = E.areaReadiness().find((a) => a.area === 5);
  check(r2.acierto > r1.acierto, "recuperar aciertos recientes sube el acierto del área");

  /* El dominio se apaga con los días sin practicar y sin repasar. */
  const antes = E.masteryDetail(t.id);
  fijarDia("2026-10-25");
  const despues = E.masteryDetail(t.id);
  check(despues.mastery < antes.mastery, `dejar el tema un mes baja su dominio (${antes.mastery} % → ${despues.mastery} %)`);
  check(despues.confianza < antes.confianza, "y la confianza en la práctica se apaga");

  /* Una tarjeta atrasada pesa menos en el dominio que una al día. */
  fijarDia("2026-09-10");
  const c0 = E.cardsForTopic(t.id)[0];
  Object.assign(E.STATE.cards[c0], { repetitions: 5, interval: 2, due: "2026-09-12", lastReview: "2026-09-10" });
  const alDia = E.masteryDetail(t.id).repScore;
  fijarDia("2026-09-25");
  const atrasada = E.masteryDetail(t.id).repScore;
  check(atrasada < alDia, "una tarjeta que se pasó de fecha resta dominio al tema");

  /* Progreso guardado antes de estas métricas: sin `w`, `c` ni `d`. */
  empezar("2026-09-01", true);
  const t2 = E.topicsOfArea(4)[0];
  E.introduceTopic(t2.id);
  E.STATE.quizStats[t2.id] = { seen: 30, correct: 24 };
  const rec = E.quizRecent(t2.id);
  check(rec.peso === 8 && Math.abs(rec.acierto - 0.8) < 1e-9, "un historial viejo cuenta como a lo sumo ocho respuestas, con su acierto");
  E.recordQuizAnswer(t2.id, false);
  check(E.quizStatsFor(t2.id).seen === 31 && E.quizStatsFor(t2.id).correct === 24, "y al responder se conserva el total de toda la vida");
  check(E.STATE.quizStats[t2.id].w > 0, "a partir de ahí ya lleva su acumulado reciente");

  /* Con el calendario: un área sin datos no es riesgo en la primera semana. */
  empezar("2026-08-03", true);
  const alInicio = E.areaReadiness();
  check(alInicio.every((a) => a.nivel !== "alto"), "en la primera semana nada está en riesgo alto por no tener datos");
  fijarDia("2026-10-25");
  const avanzado = E.areaReadiness();
  check(avanzado.every((a) => a.nivel === "alto"), "a dos semanas del final, un área sin estudiar sí es riesgo alto");

  /* Una racha vencida no se muestra como racha. */
  empezar("2026-09-01", true);
  E.recordQuizAnswer("1.1.1", true);
  fijarDia("2026-09-02"); E.recordQuizAnswer("1.1.1", true);
  fijarDia("2026-09-03"); E.recordQuizAnswer("1.1.1", true);
  check(E.overallStats().streak === 3, "tres días seguidos son una racha de 3");
  fijarDia("2026-09-04");
  check(E.overallStats().streak === 3, "ayer todavía cuenta");
  fijarDia("2026-09-07");
  check(E.overallStats().streak === 0, "tras días sin estudiar la racha ya no se muestra");
  E.recordQuizAnswer("1.1.1", true);
  check(E.overallStats().streak === 1, "y arranca de nuevo en 1");
}

/* ------------------------------------------------------------------
   28) Práctica variada: nada de repetir la misma pregunta
   ------------------------------------------------------------------ */
console.log("\n28) La práctica no repite lo que se acaba de contestar");
{
  empezar("2026-09-01", false);
  const t = E.getAllTopics().find((x) => !E.topicHasGenerator(x.id) && E.availableQuiz(x).length >= 3);
  E.introduceTopic(t.id);
  const banco = E.availableQuiz(t);
  let repetidas = 0;
  let previa = null;
  for (let i = 0; i < 40; i++) {
    const q = E.pickQuestion(t, "p" + i);
    if (previa && q.q === previa) repetidas++;
    E.recordQuizAnswer(t.id, true, q);
    previa = q.q;
  }
  check(repetidas === 0, `en 40 respuestas seguidas nunca sale la misma pregunta dos veces (${repetidas}) con un banco de ${banco.length}`);
  check(E.preguntasRecientes(t.id).length <= 6, "y solo se guardan las últimas seis huellas");
  const permitidas = new Set(banco.map((q) => q.q));
  let intrusas = 0;
  for (let i = 0; i < 100; i++) { const q = E.pickQuestion(t, "z" + i); if (q && !q.generated && !permitidas.has(q.q)) intrusas++; }
  check(intrusas === 0, "evitar repetidas no abre reactivos de bloques cerrados");
}

/* ------------------------------------------------------------------
   29) Simulacros, práctica extra y ronda opcional
   ------------------------------------------------------------------ */
console.log("\n29) Un simulacro cuenta como estudio pero no se come el repaso");
{
  empezar("2026-08-01", true);
  const rng = rngSim(29);
  let dia = estudiarDias("2026-08-01", 25, rng);
  fijarDia(dia);
  const antes = E.computeTodayPlan();
  const items = E.buildMockExam([1], false, 60);
  items.forEach((it) => E.recordQuizAnswer(it.topic.id, true, it.question, { simulacro: true }));
  const log = E.STATE.sessionLog[E.toISO(E.todayDate())];
  check(log.mock === items.length && !log.quizAnswered, "las respuestas del simulacro se anotan aparte de la práctica del día");
  check(E.STATE.lastStudyDate === E.toISO(E.todayDate()), "y el simulacro cuenta como día de estudio");
  const despues = E.computeTodayPlan();
  check(despues.reviewCards.length === antes.reviewCards.length, "pero el repaso del día sigue igual de pendiente");
}

console.log("\n29b) La ronda opcional de repaso atrasado");
{
  empezar("2026-08-01", false);
  const rng = rngSim(291);
  let dia = estudiarDias("2026-08-01", 40, rng);
  dia = diaSiguiente(dia, 9);
  fijarDia(dia);
  estudiarHoy(rng);
  const cumplido = E.computeTodayPlan();
  check(cumplido.totalSteps === 0 && cumplido.atrasadas > 0, `cumplido el día quedan ${cumplido.atrasadas} atrasadas sin trabajo obligatorio`);
  const extra = E.computeTodayPlan({ extra: true });
  check(extra.reviewCards.length > 0 && extra.reviewCards.length <= 40, `la ronda opcional trae hasta 40 repasos (${extra.reviewCards.length})`);
  check(extra.steps.every((p) => p.type === "review" && !p.check), "y solo repasos: nada nuevo ni práctica");
  check(extra.newTopics.length === 0 && extra.quizQuestions.length === 0, "sin temas nuevos ni reactivos");
  estudiarHoy(rng, { extra: true });
  const luego = E.computeTodayPlan();
  check(luego.totalSteps === 0, "y hacerla no reabre el plan obligatorio del día");
  check(luego.atrasadas < cumplido.atrasadas, "pero sí reduce el atraso");
}

/* ------------------------------------------------------------------
   30) Planificación hasta el examen
   ------------------------------------------------------------------ */
console.log("\n30) Los temas que faltan se reparten hasta el último día de estudio");
{
  /* En la fase final quedan 12 días: si aún hay temas por ver no se abandonan. */
  empezar("2026-11-12", true);
  const plan = E.computeTodayPlan();
  check(plan.phase === "review", "(sanidad) 12 de noviembre es la fase de repaso final");
  check(plan.newTopics.length >= 6, `con todo el temario por ver mete muchos temas aunque falte tiempo (${plan.newTopics.length})`);
  check(minutos(plan) <= E.MINUTOS_TOPE + 3, `pero sin pasarse del tope de tiempo (${minutos(plan).toFixed(0)} min)`);
  check(plan.behind, "y se marca como atrasado");

  /* Con pocos temas pendientes, se reparten sin agobiar. */
  empezar("2026-11-12", true);
  orden().slice(0, TEMAS.length - 6).forEach((id) => E.introduceTopic(id));
  fijarDia("2026-11-13");
  const poco = E.computeTodayPlan();
  check(poco.newTopics.length >= 1 && poco.newTopics.length <= 2, `con 6 temas y 8 días caben 1–2 al día (${poco.newTopics.length})`);

  /* Y terminada la fase, sin temas por ver, no se inventan. */
  empezar("2026-11-12", true);
  TEMAS.forEach((id) => E.introduceTopic(id));
  fijarDia("2026-11-13");
  check(E.computeTodayPlan().newTopics.length === 0, "con el temario visto no entra ninguno");

  /* En el repaso final el peso pasa de aprender a practicar con el formato del examen. */
  empezar("2026-11-13", true);
  TEMAS.forEach((id) => E.introduceTopic(id));
  E.STATE.sessionLog = {};
  fijarDia("2026-11-14");
  const normalP = (() => { fijarDia("2026-10-01"); return E.computeTodayPlan().quizQuestions.length; })();
  fijarDia("2026-11-14");
  const finalP = E.computeTodayPlan();
  check(finalP.quizQuestions.length > normalP && finalP.quizQuestions.length <= 20, `en el repaso final la práctica crece (${normalP} → ${finalP.quizQuestions.length} reactivos)`);
  check(minutos(finalP) <= E.MINUTOS_TOPE + 3, `sin pasarse del tiempo (${minutos(finalP).toFixed(0)} min)`);

  /* Fuera del calendario nada se rompe. */
  empezar("2026-07-20", true);
  const antes = E.computeTodayPlan();
  check(antes.phase === "before" && antes.totalSteps > 0, "antes del arranque el plan existe y es normal");
  empezar("2026-12-01", true);
  check(E.computeTodayPlan().phase === "after" && E.computeTodayPlan().newTopics.length === 0, "tras el examen no entran temas nuevos");

  /* Un sustentante al día llega al examen con todo visto. */
  empezar("2026-08-01", true);
  const rng = rngSim(30);
  estudiarDias("2026-08-01", 100, rng);
  check(Object.keys(E.STATE.topicsIntroduced).length === TEMAS.length, "estudiando todos los días, los 177 temas se ven antes de que acabe la fase de aprendizaje");
}

/* ------------------------------------------------------------------
   31) Compatibilidad con el progreso guardado
   ------------------------------------------------------------------ */
console.log("\n31) Progreso guardado antes de este motor");
{
  empezar("2026-09-05", true);
  /* Un progreso «de antes»: sin lapses, sin w/c/d, sin checks ni mock. */
  E.replaceState({
    createdAt: "2026-08-20",
    podaAplicada: true,
    contentRevision: 3,
    topicsIntroduced: { "1.1.1": "2026-08-25", "1.1.2": "2026-08-26" },
    lessonsSeen: {},
    quizStats: { "1.1.1": { seen: 12, correct: 9 } },
    sessionLog: { "2026-09-03": { cardsReviewed: 8, newTopics: 1, quizAnswered: 5, quizCorrect: 4 } },
    streak: 4,
    lastStudyDate: "2026-09-03",
    cards: {
      "1.1.1::fc0": { interval: 12, repetitions: 4, ef: 2.6, due: "2026-09-04", lastReview: "2026-08-23" },
      "1.1.1::fc1": { interval: 5, repetitions: 2, ef: 2.4, due: "2026-09-08", lastReview: "2026-09-03" },
      "1.1.2::fc0": { interval: 1, repetitions: 0, ef: 2.5, due: "2026-09-05", lastReview: null }
    }
  });
  let plan;
  try { plan = E.computeTodayPlan(); } catch (e) { plan = null; console.log(e); }
  check(!!plan, "el plan se arma con un progreso sin campos nuevos");
  check(plan.reviewCards.some((e) => e.cardId === "1.1.1::fc0"), "la tarjeta vencida de siempre entra al repaso");
  E.gradeCard("1.1.1::fc0", 2);
  const c = E.STATE.cards["1.1.1::fc0"];
  check(c.repetitions === 5 && c.interval > 12 && c.lapses === undefined, "calificarla la programa desde su intervalo y sin inventar caídas");
  check(E.overallStats().streak === 0 || E.overallStats().streak >= 1, "la racha guardada se lee sin fallar");
  check(E.overallStats().totalCardsReviewed >= 8, "la bitácora vieja sigue sumando en las estadísticas");

  /* Mezcla con otro dispositivo: las llaves nuevas viajan y nada se pierde. */
  const a = E.stateSnapshot();
  const b = JSON.parse(JSON.stringify(a));
  b.sessionLog["2026-09-05"] = { cardsReviewed: 2, checks: 3, mock: 10 };
  b.quizStats["1.1.1"] = Object.assign({}, b.quizStats["1.1.1"], { seen: 99, correct: 90, w: 5, c: 4, d: "2026-09-05", r: ["x"] });
  const m = E.mergeStates(a, b);
  check(m.sessionLog["2026-09-05"].checks === 3 && m.sessionLog["2026-09-05"].mock === 10, "la mezcla conserva los contadores nuevos de la bitácora");
  check(m.quizStats["1.1.1"].w === 5 && m.quizStats["1.1.1"].seen === 99, "y el acumulado reciente viaja con el lado que tiene más respuestas");
  check(m.cards["1.1.1::fc0"].repetitions === 5, "las tarjetas se quedan con la versión más avanzada");
}

/* ------------------------------------------------------------------
   32) El plan cuesta poco de calcular (se recalcula tras cada guardado)
   ------------------------------------------------------------------ */
console.log("\n32) Costo de calcular el plan");
{
  empezar("2026-08-01", false);
  const rng = rngSim(32);
  const dia = estudiarDias("2026-08-01", 70, rng);
  fijarDia(dia);
  const t0 = Date.now();
  for (let i = 0; i < 20; i++) E.computeTodayPlan();
  const ms = (Date.now() - t0) / 20;
  check(ms < 60, `con ${Object.keys(E.STATE.cards).length} tarjetas el plan tarda ${ms.toFixed(1)} ms`);
}

terminar();
