/* ============================================================
   ACREDITA-BACH · interfaz
   ============================================================ */

const APP = document.getElementById("app");
let CURRENT_SCREEN = "home";
let BROWSE_NAV = { level: "areas", area: null, topic: null };
let SESSION = null; // estado en memoria de una sesión de estudio en curso
let SIMULACRO = null;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function md(s) {
  return escapeHtml(s || "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
}
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function masteryLabel(m) {
  if (m >= 75) return { text: "Dominado", cls: "m-high" };
  if (m >= 40) return { text: "En progreso", cls: "m-mid" };
  return { text: "Aprendiendo", cls: "m-low" };
}
function letterFor(i) { return ["A", "B", "C", "D"][i] || "?"; }

/* ---------------- Navegación ---------------- */

function setScreen(name) {
  CURRENT_SCREEN = name;
  SESSION = null;
  SIMULACRO = null;
  if (name === "browse") BROWSE_NAV = { level: "areas", area: null, topic: null };
  render();
  window.scrollTo(0, 0);
}

function render() {
  APP.innerHTML = "";
  APP.appendChild(renderNav());
  const main = el(`<main class="screen"></main>`);
  APP.appendChild(main);
  if (SESSION) { main.appendChild(renderSession()); return; }
  if (SIMULACRO) { main.appendChild(renderSimulacroRunner()); return; }
  switch (CURRENT_SCREEN) {
    case "home": main.appendChild(renderHome()); break;
    case "browse": main.appendChild(renderBrowse()); break;
    case "simulacro": main.appendChild(renderSimulacroHome()); break;
    case "progreso": main.appendChild(renderProgreso()); break;
    case "info": main.appendChild(renderInfo()); break;
    default: main.appendChild(renderHome());
  }
}

function renderNav() {
  const tabs = [
    ["home", "Hoy", "📅"],
    ["browse", "Repasar", "📚"],
    ["simulacro", "Simulacro", "📝"],
    ["progreso", "Progreso", "📈"],
    ["info", "Información", "ℹ️"]
  ];
  const nav = el(`<nav class="topnav">
    <div class="brand">ACREDITA-BACH <span class="brand-sub">· plan de estudio</span></div>
    <div class="tabs"></div>
  </nav>`);
  const tabWrap = nav.querySelector(".tabs");
  tabs.forEach(([id, label, icon]) => {
    const btn = el(`<button class="tab ${CURRENT_SCREEN === id && !SESSION && !SIMULACRO ? "active" : ""}"><span class="tab-icon">${icon}</span><span>${label}</span></button>`);
    btn.onclick = () => setScreen(id);
    tabWrap.appendChild(btn);
  });
  return nav;
}

/* ---------------- HOME ---------------- */

function renderHome() {
  const plan = computeTodayPlan();
  const wrap = el(`<div class="stack"></div>`);

  if (!STATE.dismissedWelcome && overallStats().introducedCount === 0) {
    const card = el(`<div class="card welcome">
      <h3>Cómo funciona este plan</h3>
      <p>Cada día te doy una <strong>sesión de estudio</strong> con tres partes, en el orden con más evidencia científica para retener información a largo plazo:</p>
      <ol>
        <li><strong>Repaso con repetición espaciada</strong>: tarjetas de temas anteriores, justo cuando estás por olvidarlas (método SM-2, el mismo detrás de Anki).</li>
        <li><strong>Temas nuevos del día</strong>: pocos y mezclados entre materias distintas (interleaving), no en bloques largos de una sola área.</li>
        <li><strong>Preguntas de práctica</strong> en el formato real del examen (3 opciones), con retroalimentación inmediata (recuperación activa).</li>
      </ol>
      <p>El calendario se <strong>ajusta solo</strong>: si un día no estudias, el sistema reparte lo pendiente entre los días que queden.</p>
      <button class="btn btn-ghost" id="dismiss-welcome">Entendido</button>
    </div>`);
    card.querySelector("#dismiss-welcome").onclick = () => { STATE.dismissedWelcome = true; saveState(); render(); };
    wrap.appendChild(card);
  }

  wrap.appendChild(el(`<div class="card countdown-card">
    <div class="countdown-num">${Math.max(0, plan.daysToExam)}</div>
    <div class="countdown-label">días para el examen (${fmtDateLong(EXAM_DATE)})</div>
    ${phaseNote(plan)}
  </div>`));

  const s = overallStats();
  wrap.appendChild(el(`<div class="card">
    <h3>Avance general</h3>
    <div class="bar-row"><span>Temas vistos</span><span>${s.introducedCount} / ${s.total}</span></div>
    <div class="bar"><div class="bar-fill" style="width:${s.coverage}%"></div></div>
    <div class="mini-stats">
      <div><strong>${s.streak}</strong><span>días seguidos</span></div>
      <div><strong>${s.studyDays}</strong><span>días de estudio</span></div>
      <div><strong>${s.totalCardsReviewed}</strong><span>tarjetas repasadas</span></div>
    </div>
  </div>`));

  const planCard = el(`<div class="card session-preview">
    <h3>Tu sesión de hoy</h3>
    <div class="session-chips">
      <div class="chip">🔁 ${plan.reviewCards.length} tarjetas de repaso</div>
      <div class="chip">📘 ${plan.newTopics.length} temas nuevos</div>
      <div class="chip">✍️ ${plan.quizQuestions.length} preguntas de práctica</div>
    </div>
    <p class="est">Tiempo estimado: <strong>~${Math.max(5, plan.estMinutes)} min</strong></p>
    <button class="btn btn-primary btn-big" id="start-session" ${plan.reviewCards.length + plan.newTopics.length + plan.quizQuestions.length === 0 ? "disabled" : ""}>Comenzar sesión de hoy</button>
    ${plan.reviewCards.length + plan.newTopics.length + plan.quizQuestions.length === 0 ? '<p class="muted">Nada pendiente ahora mismo — vuelve más tarde o repasa libremente en "Repasar".</p>' : ""}
  </div>`);
  planCard.querySelector("#start-session").onclick = () => startSession(plan);
  wrap.appendChild(planCard);

  if (plan.notIntroducedCount === 0 && s.total > 0) {
    wrap.appendChild(el(`<div class="card highlight">
      <h3>Ya viste todos los temas 🎉</h3>
      <p>A partir de ahora enfócate en repasar tarjetas pendientes y hacer simulacros completos hasta el examen.</p>
    </div>`));
  }

  return wrap;
}

function phaseNote(plan) {
  if (plan.phase === "before") return `<div class="phase-note">Tu plan empieza el ${fmtDateLong(STUDY_START)}.</div>`;
  if (plan.phase === "after") return `<div class="phase-note">El periodo de estudio planeado ya terminó. ¡Mucho éxito en tu examen!</div>`;
  if (plan.phase === "review") return `<div class="phase-note">Última recta: enfócate en repasos y simulacros completos.</div>`;
  if (plan.behind) return `<div class="phase-note warn">Vas algo atrasado con los temas nuevos — hoy te tocan un poco más de lo usual para recuperar el ritmo.</div>`;
  return `<div class="phase-note ok">Vas al día con el plan.</div>`;
}

/* ---------------- SESIÓN GUIADA ---------------- */

function startSession(plan) {
  const steps = [];
  plan.reviewCards.forEach(rc => steps.push({ type: "review", cardId: rc.cardId, topicId: rc.topicId }));
  plan.newTopics.forEach(t => {
    steps.push({ type: "intro", topic: t });
    cardsForTopic(t.id).forEach(cid => steps.push({ type: "review", cardId: cid, topicId: t.id, isNew: true }));
  });
  plan.quizQuestions.forEach(qq => steps.push({ type: "quiz", topic: qq.topic, question: qq.question }));
  steps.push({ type: "summary" });
  SESSION = { steps, idx: 0, stats: { cardsReviewed: 0, newTopics: 0, quizAnswered: 0, quizCorrect: 0 }, revealed: false, answered: null };
  render();
}

function sessionAdvance() {
  SESSION.idx++;
  SESSION.revealed = false;
  SESSION.answered = null;
  render();
}

function renderSession() {
  const step = SESSION.steps[SESSION.idx];
  const total = SESSION.steps.length;
  const wrap = el(`<div class="stack session-runner"></div>`);
  wrap.appendChild(el(`<div class="progress-line"><div class="progress-fill" style="width:${Math.round((SESSION.idx / total) * 100)}%"></div></div>`));

  if (step.type === "review") {
    wrap.appendChild(renderReviewStep(step));
  } else if (step.type === "intro") {
    wrap.appendChild(renderIntroStep(step));
  } else if (step.type === "quiz") {
    wrap.appendChild(renderQuizStep(step, (correct) => {
      SESSION.stats.quizAnswered++;
      if (correct) SESSION.stats.quizCorrect++;
      recordQuizAnswer(step.topic.id, correct);
    }));
  } else if (step.type === "summary") {
    wrap.appendChild(renderSessionSummary());
  }
  return wrap;
}

function renderReviewStep(step) {
  const topic = topicsById()[step.topicId];
  const fcIndex = Number(step.cardId.split("::fc")[1]);
  const fc = topic.flashcards[fcIndex];
  const card = el(`<div class="card flashcard">
    <div class="fc-tag">${escapeHtml(topic.tema)} ${step.isNew ? '<span class="badge-new">nuevo</span>' : ""}</div>
    <div class="fc-front">${md(fc.front)}</div>
    <div class="fc-back" style="display:${SESSION.revealed ? "block" : "none"}">${md(fc.back)}</div>
    <div class="fc-actions"></div>
  </div>`);
  const actions = card.querySelector(".fc-actions");
  if (!SESSION.revealed) {
    const showBtn = el(`<button class="btn btn-primary btn-big">Mostrar respuesta</button>`);
    showBtn.onclick = () => { SESSION.revealed = true; render(); };
    actions.appendChild(showBtn);
  } else {
    actions.appendChild(gradeButtons((q) => {
      gradeCard(step.cardId, q);
      SESSION.stats.cardsReviewed++;
      sessionAdvance();
    }));
  }
  return card;
}

function gradeButtons(onGrade) {
  const wrap = el(`<div class="grade-row">
    <button class="btn grade grade-0">Otra vez</button>
    <button class="btn grade grade-1">Costó</button>
    <button class="btn grade grade-2">Bien</button>
  </div>`);
  wrap.querySelector(".grade-0").onclick = () => onGrade(0);
  wrap.querySelector(".grade-1").onclick = () => onGrade(1);
  wrap.querySelector(".grade-2").onclick = () => onGrade(2);
  return wrap;
}

function renderIntroStep(step) {
  introduceTopic(step.topic.id);
  const t = step.topic;
  const meta = AREA_META[t.area];
  const card = el(`<div class="card intro-card">
    <div class="area-pill" style="--c:${meta.color}">${escapeHtml(meta.short)}${t.lang ? " · " + (t.lang === "en" ? "Inglés" : "Español") : ""}</div>
    <h3>${escapeHtml(t.tema)}</h3>
    <div class="subarea-label">${escapeHtml(t.subarea)}</div>
    <div class="note">${md(t.note)}</div>
    <button class="btn btn-primary btn-big" id="intro-continue">Ya entendí, a practicar →</button>
  </div>`);
  card.querySelector("#intro-continue").onclick = () => { SESSION.stats.newTopics++; sessionAdvance(); };
  return card;
}

function renderQuizStep(step, onGrade) {
  const t = step.topic;
  const q = step.question;
  const meta = AREA_META[t.area];
  const card = el(`<div class="card quiz-card">
    <div class="area-pill" style="--c:${meta.color}">${escapeHtml(meta.short)}</div>
    <div class="quiz-q">${md(q.q)}</div>
    <div class="quiz-options"></div>
    <div class="quiz-feedback" style="display:none"></div>
  </div>`);
  const optsWrap = card.querySelector(".quiz-options");
  q.options.forEach((opt, i) => {
    const optBtn = el(`<button class="option-btn"><span class="opt-letter">${letterFor(i)}</span><span>${md(opt)}</span></button>`);
    optBtn.onclick = () => {
      if (SESSION.answered !== null) return;
      SESSION.answered = i;
      const correct = i === q.correct;
      [...optsWrap.children].forEach((b, bi) => {
        b.classList.add(bi === q.correct ? "correct" : (bi === i ? "incorrect" : "disabled"));
      });
      const fb = card.querySelector(".quiz-feedback");
      fb.style.display = "block";
      fb.innerHTML = `<div class="fb-title">${correct ? "✅ Correcto" : "❌ Incorrecto — la respuesta era " + letterFor(q.correct)}</div><div class="fb-expl">${md(q.explanation)}</div><button class="btn btn-primary" id="quiz-next">Siguiente</button>`;
      fb.querySelector("#quiz-next").onclick = () => { onGrade(correct); sessionAdvance(); };
    };
    optsWrap.appendChild(optBtn);
  });
  return card;
}

function renderSessionSummary() {
  const st = SESSION.stats;
  logSessionProgress(st);
  const plan = computeTodayPlan();
  const card = el(`<div class="card summary-card">
    <h3>Sesión completada 🎉</h3>
    <div class="mini-stats">
      <div><strong>${st.cardsReviewed}</strong><span>tarjetas repasadas</span></div>
      <div><strong>${st.newTopics}</strong><span>temas nuevos</span></div>
      <div><strong>${st.quizAnswered ? Math.round((st.quizCorrect / st.quizAnswered) * 100) + "%" : "—"}</strong><span>aciertos en práctica</span></div>
    </div>
    <p>Faltan <strong>${Math.max(0, plan.daysToExam)} días</strong> para el examen. Vuelve mañana para tu siguiente sesión.</p>
    <button class="btn btn-primary btn-big" id="back-home">Volver al inicio</button>
  </div>`);
  card.querySelector("#back-home").onclick = () => setScreen("home");
  return card;
}

/* ---------------- REPASAR (navegación libre) ---------------- */

function renderBrowse() {
  if (BROWSE_NAV.level === "areas") return renderBrowseAreas();
  if (BROWSE_NAV.level === "topics") return renderBrowseTopics();
  if (BROWSE_NAV.level === "topic") return renderBrowseTopicDetail();
  return renderBrowseAreas();
}

function renderBrowseAreas() {
  const wrap = el(`<div class="stack"></div>`);
  wrap.appendChild(el(`<h2 class="screen-title">Repasar por área</h2>`));
  Object.keys(AREA_META).map(Number).forEach(areaNum => {
    const meta = AREA_META[areaNum];
    const stats = areaStats(areaNum);
    const item = el(`<div class="card area-card" style="--c:${meta.color}">
      <div class="area-card-top">
        <div>
          <div class="area-card-name">${escapeHtml(meta.name)}</div>
          <div class="area-card-sub">${stats.total} temas · sesión ${meta.session}</div>
        </div>
        <div class="area-card-pct">${stats.mastery}%</div>
      </div>
      <div class="bar"><div class="bar-fill" style="width:${stats.coverage}%;background:${meta.color}"></div></div>
      <div class="area-card-foot">${stats.introducedCount}/${stats.total} vistos</div>
    </div>`);
    item.onclick = () => { BROWSE_NAV = { level: "topics", area: areaNum }; render(); };
    wrap.appendChild(item);
  });
  return wrap;
}

function renderBrowseTopics() {
  const areaNum = BROWSE_NAV.area;
  const meta = AREA_META[areaNum];
  const topics = getAllTopics().filter(t => t.area === areaNum);
  const bySub = {};
  topics.forEach(t => { (bySub[t.subarea] = bySub[t.subarea] || []).push(t); });

  const wrap = el(`<div class="stack"></div>`);
  const back = el(`<button class="btn btn-ghost back-btn">← Áreas</button>`);
  back.onclick = () => { BROWSE_NAV = { level: "areas" }; render(); };
  wrap.appendChild(back);
  wrap.appendChild(el(`<h2 class="screen-title">${escapeHtml(meta.name)}</h2>`));

  Object.keys(bySub).forEach(sub => {
    wrap.appendChild(el(`<div class="subarea-heading">${escapeHtml(sub)}</div>`));
    const list = el(`<div class="topic-list"></div>`);
    bySub[sub].forEach(t => {
      const introduced = isIntroduced(t.id);
      const m = introduced ? topicMastery(t.id) : 0;
      const lbl = introduced ? masteryLabel(m) : { text: "Aún no visto", cls: "m-none" };
      const row = el(`<div class="topic-row">
        <span class="topic-name">${escapeHtml(t.tema)}${t.lang ? " (" + (t.lang === "en" ? "EN" : "ES") + ")" : ""}</span>
        <span class="topic-badge ${lbl.cls}">${lbl.text}</span>
      </div>`);
      row.onclick = () => { BROWSE_NAV = { level: "topic", area: areaNum, topic: t.id }; render(); };
      list.appendChild(row);
    });
    wrap.appendChild(list);
  });
  return wrap;
}

function renderBrowseTopicDetail() {
  const t = topicsById()[BROWSE_NAV.topic];
  const introduced = isIntroduced(t.id);
  const wrap = el(`<div class="stack"></div>`);
  const back = el(`<button class="btn btn-ghost back-btn">← ${escapeHtml(AREA_META[t.area].name)}</button>`);
  back.onclick = () => { BROWSE_NAV = { level: "topics", area: t.area }; render(); };
  wrap.appendChild(back);

  wrap.appendChild(el(`<div class="card">
    <div class="subarea-label">${escapeHtml(t.subarea)}</div>
    <h2 class="screen-title" style="margin-top:2px">${escapeHtml(t.tema)}</h2>
    <div class="note">${md(t.note)}</div>
  </div>`));

  if (!introduced) {
    const btn = el(`<button class="btn btn-primary btn-big">Introducir este tema ahora</button>`);
    btn.onclick = () => { introduceTopic(t.id); render(); };
    wrap.appendChild(btn);
    return wrap;
  }

  const fcCard = el(`<div class="card"><h3>Tarjetas</h3><div class="fc-mini-list"></div></div>`);
  const list = fcCard.querySelector(".fc-mini-list");
  t.flashcards.forEach((fc, i) => {
    const item = el(`<div class="fc-mini">
      <div class="fc-mini-front">${md(fc.front)}</div>
      <div class="fc-mini-back" style="display:none">${md(fc.back)}</div>
    </div>`);
    item.onclick = () => {
      const back = item.querySelector(".fc-mini-back");
      back.style.display = back.style.display === "none" ? "block" : "none";
    };
    list.appendChild(item);
  });
  wrap.appendChild(fcCard);

  const practiceBtn = el(`<button class="btn btn-primary btn-big">Practicar preguntas de este tema</button>`);
  practiceBtn.onclick = () => startTopicQuiz(t);
  wrap.appendChild(practiceBtn);

  return wrap;
}

function startTopicQuiz(topic) {
  const steps = topic.quiz.map(q => ({ type: "quiz", topic, question: q }));
  steps.push({ type: "summary" });
  SESSION = { steps, idx: 0, stats: { cardsReviewed: 0, newTopics: 0, quizAnswered: 0, quizCorrect: 0 }, revealed: false, answered: null, isFreePractice: true };
  render();
}

/* ---------------- SIMULACRO ---------------- */

function sampleOne(arr, seedOffset) {
  if (!arr || !arr.length) return null;
  return arr[seedOffset % arr.length];
}

function buildMockExam(areaNums, onlyIntroduced) {
  const topics = getAllTopics().filter(t => areaNums.includes(t.area) && (!onlyIntroduced || isIntroduced(t.id)) && t.quiz && t.quiz.length);
  return topics.map((t, i) => ({ topic: t, question: sampleOne(t.quiz, i + Math.floor(Math.random() * t.quiz.length)) }));
}

function renderSimulacroHome() {
  const wrap = el(`<div class="stack"></div>`);
  wrap.appendChild(el(`<h2 class="screen-title">Simulacros</h2>`));
  wrap.appendChild(el(`<p class="muted">Los simulacros usan el mismo formato del examen real: preguntas de opción múltiple con 3 respuestas. El % que ves aquí es una referencia de estudio, no el Índice Ceneval oficial (700–1300 pts, mínimo 1000 por área).</p>`));

  const opts = [
    { key: "s1intro", title: "Sesión 1 · solo temas vistos", desc: "Matemático, cultura digital, historia, humanidades", areas: [1, 2, 3, 4], onlyIntroduced: true },
    { key: "s2intro", title: "Sesión 2 · solo temas vistos", desc: "Ciencias naturales, lengua y comunicación, ciencias sociales", areas: [5, 6, 7], onlyIntroduced: true },
    { key: "s1full", title: "Sesión 1 completa (92 preguntas)", desc: "Como el examen real — incluye temas que quizá no hayas visto aún", areas: [1, 2, 3, 4], onlyIntroduced: false },
    { key: "s2full", title: "Sesión 2 completa (88 preguntas)", desc: "Como el examen real — incluye temas que quizá no hayas visto aún", areas: [5, 6, 7], onlyIntroduced: false }
  ];
  opts.forEach(o => {
    const card = el(`<div class="card simulacro-opt">
      <div class="area-card-name">${o.title}</div>
      <div class="area-card-sub">${o.desc}</div>
      <button class="btn btn-primary">Comenzar</button>
    </div>`);
    card.querySelector("button").onclick = () => {
      const questions = buildMockExam(o.areas, o.onlyIntroduced);
      if (!questions.length) { alert("Todavía no hay preguntas disponibles para esta opción."); return; }
      SIMULACRO = { title: o.title, questions, idx: 0, answers: [], startedAt: Date.now() };
      render();
    };
    wrap.appendChild(card);
  });
  return wrap;
}

function renderSimulacroRunner() {
  if (SIMULACRO.idx >= SIMULACRO.questions.length) return renderSimulacroResults();
  const { topic, question } = SIMULACRO.questions[SIMULACRO.idx];
  const meta = AREA_META[topic.area];
  const wrap = el(`<div class="stack"></div>`);
  wrap.appendChild(el(`<div class="progress-line"><div class="progress-fill" style="width:${Math.round((SIMULACRO.idx / SIMULACRO.questions.length) * 100)}%"></div></div>`));
  wrap.appendChild(el(`<div class="sim-counter">Pregunta ${SIMULACRO.idx + 1} de ${SIMULACRO.questions.length}</div>`));
  const card = el(`<div class="card quiz-card">
    <div class="area-pill" style="--c:${meta.color}">${escapeHtml(meta.short)}</div>
    <div class="quiz-q">${md(question.q)}</div>
    <div class="quiz-options"></div>
  </div>`);
  const optsWrap = card.querySelector(".quiz-options");
  question.options.forEach((opt, i) => {
    const b = el(`<button class="option-btn"><span class="opt-letter">${letterFor(i)}</span><span>${md(opt)}</span></button>`);
    b.onclick = () => {
      SIMULACRO.answers.push({ topic, question, chosen: i, correct: i === question.correct });
      recordQuizAnswer(topic.id, i === question.correct);
      SIMULACRO.idx++;
      render();
    };
    optsWrap.appendChild(b);
  });
  wrap.appendChild(card);
  return wrap;
}

function renderSimulacroResults() {
  const answers = SIMULACRO.answers;
  const total = answers.length;
  const correct = answers.filter(a => a.correct).length;
  const byArea = {};
  answers.forEach(a => {
    const key = a.topic.area;
    byArea[key] = byArea[key] || { total: 0, correct: 0 };
    byArea[key].total++;
    if (a.correct) byArea[key].correct++;
  });
  const wrap = el(`<div class="stack"></div>`);
  wrap.appendChild(el(`<div class="card summary-card">
    <h3>${escapeHtml(SIMULACRO.title)} — resultado</h3>
    <div class="countdown-num" style="font-size:2.4rem">${total ? Math.round((correct / total) * 100) : 0}%</div>
    <div class="countdown-label">${correct} de ${total} correctas</div>
  </div>`));
  const areaCard = el(`<div class="card"><h3>Por área</h3></div>`);
  Object.keys(byArea).map(Number).forEach(a => {
    const st = byArea[a];
    const pct = Math.round((st.correct / st.total) * 100);
    const risky = pct < 56;
    areaCard.appendChild(el(`<div class="bar-row"><span>${escapeHtml(AREA_META[a].short)}${risky ? ' <span class="badge-warn">reforzar</span>' : ""}</span><span>${st.correct}/${st.total} (${pct}%)</span></div>`));
    areaCard.appendChild(el(`<div class="bar"><div class="bar-fill" style="width:${pct}%;background:${AREA_META[a].color}"></div></div>`));
  });
  wrap.appendChild(areaCard);
  const btn = el(`<button class="btn btn-primary btn-big">Volver</button>`);
  btn.onclick = () => setScreen("simulacro");
  wrap.appendChild(btn);
  return wrap;
}

/* ---------------- PROGRESO ---------------- */

function renderProgreso() {
  const wrap = el(`<div class="stack"></div>`);
  wrap.appendChild(el(`<h2 class="screen-title">Tu progreso</h2>`));
  const s = overallStats();
  const plan = computeTodayPlan();
  wrap.appendChild(el(`<div class="card">
    <div class="mini-stats">
      <div><strong>${Math.max(0, plan.daysToExam)}</strong><span>días para el examen</span></div>
      <div><strong>${s.streak}</strong><span>racha de días</span></div>
      <div><strong>${s.coverage}%</strong><span>temario visto</span></div>
    </div>
  </div>`));

  const areaCard = el(`<div class="card"><h3>Dominio por área</h3></div>`);
  Object.keys(AREA_META).map(Number).forEach(a => {
    const st = areaStats(a);
    areaCard.appendChild(el(`<div class="bar-row"><span>${escapeHtml(AREA_META[a].short)}</span><span>${st.mastery}% dominio · ${st.introducedCount}/${st.total} vistos</span></div>`));
    areaCard.appendChild(el(`<div class="bar"><div class="bar-fill" style="width:${st.mastery}%;background:${AREA_META[a].color}"></div></div>`));
  });
  wrap.appendChild(areaCard);

  const weak = weakestTopics(6).filter(w => w.mastery < 75);
  if (weak.length) {
    const weakCard = el(`<div class="card"><h3>Temas para reforzar</h3><div class="topic-list"></div></div>`);
    const list = weakCard.querySelector(".topic-list");
    weak.forEach(w => {
      const row = el(`<div class="topic-row"><span class="topic-name">${escapeHtml(w.topic.tema)}</span><span class="topic-badge m-low">${w.mastery}%</span></div>`);
      row.onclick = () => { CURRENT_SCREEN = "browse"; SESSION = null; SIMULACRO = null; BROWSE_NAV = { level: "topic", area: w.topic.area, topic: w.topic.id }; render(); };
      list.appendChild(row);
    });
    wrap.appendChild(weakCard);
  }

  const resetBtn = el(`<button class="btn btn-ghost danger">Reiniciar todo el progreso</button>`);
  resetBtn.onclick = () => { if (confirm("Esto borrará todo tu avance guardado en este navegador. ¿Continuar?")) { resetProgress(); render(); } };
  wrap.appendChild(resetBtn);

  return wrap;
}

/* ---------------- INFORMACIÓN ---------------- */

function renderInfo() {
  const wrap = el(`<div class="stack"></div>`);
  wrap.appendChild(el(`<h2 class="screen-title">Información del examen</h2>`));
  wrap.appendChild(el(`<p class="muted">Todo lo que dice la guía oficial del sustentante (Ceneval, junio 2026), organizado para consulta rápida.</p>`));
  INFO_SECTIONS.forEach(sec => {
    const card = el(`<div class="card accordion">
      <div class="accordion-head"><span>${sec.icon} ${escapeHtml(sec.title)}</span><span class="chev">›</span></div>
      <div class="accordion-body" style="display:none">${sec.html}</div>
    </div>`);
    card.querySelector(".accordion-head").onclick = () => {
      const body = card.querySelector(".accordion-body");
      const open = body.style.display !== "none";
      body.style.display = open ? "none" : "block";
      card.classList.toggle("open", !open);
    };
    wrap.appendChild(card);
  });

  const bibCard = el(`<div class="card accordion">
    <div class="accordion-head"><span>📚 Bibliografía recomendada por área</span><span class="chev">›</span></div>
    <div class="accordion-body" style="display:none"></div>
  </div>`);
  const bibBody = bibCard.querySelector(".accordion-body");
  Object.keys(AREA_META).map(Number).forEach(a => {
    bibBody.appendChild(el(`<h4>${escapeHtml(AREA_META[a].name)}</h4>`));
    const ul = el(`<ul></ul>`);
    (BIBLIOGRAFIA[a] || []).forEach(b => ul.appendChild(el(`<li>${escapeHtml(b)}</li>`)));
    bibBody.appendChild(ul);
  });
  bibCard.querySelector(".accordion-head").onclick = () => {
    const open = bibBody.style.display !== "none";
    bibBody.style.display = open ? "none" : "block";
    bibCard.classList.toggle("open", !open);
  };
  wrap.appendChild(bibCard);

  return wrap;
}

/* ---------------- Arranque ---------------- */

document.addEventListener("DOMContentLoaded", () => { render(); });
