import { useState, useMemo, useDeferredValue } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Card, Ring, Bar, Badge, SectionTitle, Reveal, EmptyState, useToast } from "../ui/kit.jsx";
import { RichText } from "../lib/text.jsx";
import { navigate, useEngine } from "../lib/hooks.js";
import { areaStyle, areaVisual, masteryLabel } from "../lib/areas.js";
import {
  areaNumbers, areaStats, topicsOfArea, topicsById, isIntroduced, topicMastery,
  introduceTopic, quizStatsFor, searchTopics, getCard, cardsForTopic, fromISO, fmtDateShort, todayDate
} from "../lib/engine.js";

export default function Browse({ route, onPractice, onDrill }) {
  const [kind, value] = route.params;
  if (kind === "a" && value) return <AreaScreen areaNum={Number(value)} />;
  if (kind === "t" && value) return <TopicScreen topicId={value} onPractice={onPractice} onDrill={onDrill} />;
  return <AreaList />;
}

/* ---------------- Nivel 1: áreas + búsqueda ---------------- */

function AreaList() {
  const rev = useEngine();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = useMemo(() => searchTopics(deferred), [deferred, rev]);
  const areas = areaNumbers();

  return (
    <div className="stack">
      <SectionTitle hint="Explora el temario completo, consulta cualquier tema y practica cuando quieras.">
        Repasar
      </SectionTitle>

      <div className="search">
        <Icon name="search" size={18} />
        <input
          type="search"
          value={query}
          placeholder="Buscar tema… (ej. ecuaciones, revolución, verbos)"
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar tema"
        />
        {query && (
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setQuery("")} aria-label="Limpiar búsqueda">
            <Icon name="x" size={16} />
          </button>
        )}
      </div>

      {deferred.trim().length >= 2 ? (
        results.length ? (
          <div className="topic-list">
            {results.map((t) => <TopicRow key={t.id} topic={t} showArea />)}
          </div>
        ) : (
          <Card>
            <EmptyState icon="search" title="Sin resultados">
              No encontramos temas con “{deferred}”. Prueba con otra palabra o revisa las áreas.
            </EmptyState>
          </Card>
        )
      ) : (
        areas.map((areaNum, i) => <AreaCard key={areaNum} areaNum={areaNum} delay={i * 45} />)
      )}
    </div>
  );
}

function AreaCard({ areaNum, delay }) {
  const v = areaVisual(areaNum);
  const st = areaStats(areaNum);
  return (
    <Reveal delay={delay}>
      <Card
        as="button"
        interactive
        className="area-card"
        style={areaStyle(areaNum)}
        onClick={() => navigate(`repasar/a/${areaNum}`)}
      >
        <span className="area-badge"><Icon name={"a" + areaNum} size={22} /></span>
        <span className="area-body">
          <span className="area-name">{v.name}</span>
          <span className="area-meta">{st.total} temas · {v.reactivos} reactivos · sesión {v.session}</span>
          <Bar value={st.coverage} color={v.color} height={6} />
        </span>
        <Ring value={st.mastery} size={50} stroke={5} color={v.color} label={`${st.mastery}%`} />
      </Card>
    </Reveal>
  );
}

/* ---------------- Nivel 2: temas del área ---------------- */

function AreaScreen({ areaNum }) {
  useEngine();
  const v = areaVisual(areaNum);
  const st = areaStats(areaNum);
  const topics = topicsOfArea(areaNum);

  const grouped = useMemo(() => {
    const map = new Map();
    topics.forEach((t) => {
      if (!map.has(t.subarea)) map.set(t.subarea, []);
      map.get(t.subarea).push(t);
    });
    return [...map.entries()];
  }, [topics]);

  return (
    <div className="stack">
      <button className="back-link" onClick={() => navigate("repasar")}>
        <Icon name="chevronLeft" size={16} /> Áreas
      </button>

      <Reveal>
        <Card style={areaStyle(areaNum)}>
          <div className="detail-head">
            <span className="area-badge"><Icon name={"a" + areaNum} size={22} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: "1.25rem" }}>{v.name}</h2>
              <p className="faint" style={{ margin: "3px 0 0" }}>
                {st.total} temas · {v.reactivos} reactivos en el examen
              </p>
            </div>
            <Ring value={st.mastery} size={62} stroke={6} color={v.color} label={`${st.mastery}%`} sublabel="dominio" />
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="bar-row">
              <span className="lbl">Temas vistos</span>
              <span className="val">{st.introducedCount} / {st.total}</span>
            </div>
            <Bar value={st.coverage} color={v.color} />
          </div>
        </Card>
      </Reveal>

      {grouped.map(([subarea, list]) => (
        <section key={subarea}>
          <h3 className="subarea-head">{subarea}</h3>
          <div className="topic-list">
            {list.map((t) => <TopicRow key={t.id} topic={t} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function TopicRow({ topic, showArea }) {
  const introduced = isIntroduced(topic.id);
  const mastery = introduced ? topicMastery(topic.id) : 0;
  const label = introduced ? masteryLabel(mastery) : { text: "Sin ver", tone: "neutral" };
  const v = areaVisual(topic.area);
  return (
    <button className="topic-row" style={areaStyle(topic.area)} onClick={() => navigate(`repasar/t/${topic.id}`)}>
      <span className="topic-dot" />
      <span className="topic-name">
        {topic.tema}{topic.lang ? ` (${topic.lang === "en" ? "EN" : "ES"})` : ""}
        <small>{showArea ? `${v.short} · ${topic.subarea}` : topic.subarea}</small>
      </span>
      <Badge tone={label.tone}>{introduced ? `${mastery}%` : label.text}</Badge>
      <Icon name="chevronRight" size={16} className="icon-chev" />
    </button>
  );
}

/* ---------------- Nivel 3: detalle del tema ---------------- */

function TopicScreen({ topicId, onPractice, onDrill }) {
  const rev = useEngine();
  const toast = useToast();
  const topic = topicsById()[topicId];
  const [openCard, setOpenCard] = useState(null);

  if (!topic) {
    return (
      <div className="stack">
        <button className="back-link" onClick={() => navigate("repasar")}>
          <Icon name="chevronLeft" size={16} /> Repasar
        </button>
        <Card><EmptyState icon="alert" title="Tema no encontrado">Puede que el enlace esté mal escrito.</EmptyState></Card>
      </div>
    );
  }

  const v = areaVisual(topic.area);
  const introduced = isIntroduced(topic.id);
  const mastery = introduced ? topicMastery(topic.id) : 0;
  const qs = quizStatsFor(topic.id);
  const dues = introduced ? cardsForTopic(topic.id).map((cid) => getCard(cid).due).filter(Boolean).sort() : [];
  const nextReview = dues.length ? fromISO(dues[0]) : null;

  return (
    <div className="stack" style={areaStyle(topic.area)}>
      <button className="back-link" onClick={() => navigate(`repasar/a/${topic.area}`)}>
        <Icon name="chevronLeft" size={16} /> {v.short}
      </button>

      <Reveal>
        <Card>
          <div className="detail-head">
            <div style={{ flex: 1, minWidth: 0 }}>
              <Badge tone="area">
                {v.short}{topic.lang ? ` · ${topic.lang === "en" ? "Inglés" : "Español"}` : ""}
              </Badge>
              <h2 style={{ fontSize: "1.35rem", margin: "10px 0 3px" }}>{topic.tema}</h2>
              <p className="faint" style={{ margin: 0 }}>{topic.subarea}</p>
            </div>
            {introduced && <Ring value={mastery} size={62} stroke={6} color={v.color} label={`${mastery}%`} sublabel="dominio" />}
          </div>

          {introduced && (
            <div className="chips" style={{ marginTop: 16 }}>
              <div className="chip">
                <Icon name="clock" size={15} />
                <span className="chip-label">Próximo repaso</span>
                <span className="chip-value">
                  {nextReview
                    ? (nextReview <= todayDate() ? "hoy" : fmtDateShort(nextReview))
                    : "—"}
                </span>
              </div>
              <div className="chip">
                <Icon name="target" size={15} />
                <span className="chip-label">Aciertos</span>
                <span className="chip-value">{qs.seen ? Math.round((qs.correct / qs.seen) * 100) + "%" : "—"}</span>
              </div>
            </div>
          )}
        </Card>
      </Reveal>

      <Reveal delay={60}>
        <Card>
          <h3>Explicación</h3>
          <RichText>{topic.note}</RichText>
        </Card>
      </Reveal>

      {!introduced ? (
        <Reveal delay={120}>
          <Card>
            <EmptyState
              icon="sparkles"
              title="Este tema aún no entra en tu plan"
              action={
                <Button
                  variant="primary"
                  icon="play"
                  onClick={() => {
                    introduceTopic(topic.id);
                    toast("Tema agregado a tu repaso espaciado", { tone: "success", icon: "check" });
                  }}
                >
                  Empezar a estudiarlo
                </Button>
              }
            >
              Si lo agregas ahora, sus tarjetas entran a tu repaso espaciado y aparecerán en tus sesiones diarias.
            </EmptyState>
          </Card>
        </Reveal>
      ) : (
        <>
          <Reveal delay={120}>
            <Card>
              <div className="card-title-row">
                <h3>Tarjetas</h3>
                <Badge>{topic.flashcards.length}</Badge>
              </div>
              <div className="fc-list">
                {topic.flashcards.map((fc, i) => (
                  <button
                    key={i}
                    className={`fc-item${openCard === i ? " is-open" : ""}`}
                    onClick={() => setOpenCard(openCard === i ? null : i)}
                    aria-expanded={openCard === i}
                  >
                    <div className="fc-item-front">
                      <span>{fc.front}</span>
                      <Icon name="chevronDown" size={16} />
                    </div>
                    <div className="fc-reveal">
                      <div className="fc-reveal-inner">
                        <RichText>{fc.back}</RichText>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={180}>
            <div className="chips">
              <Button variant="primary" icon="target" onClick={() => onPractice(topic)}>
                Practicar preguntas
              </Button>
              <Button variant="solid" icon="cards" onClick={() => onDrill(topic)}>
                Repasar tarjetas
              </Button>
            </div>
          </Reveal>
        </>
      )}
    </div>
  );
}
