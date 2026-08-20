import { useState, useMemo, useDeferredValue } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Meter, Badge, PageHead, Section, EmptyState, Mark, useToast } from "../ui/kit.jsx";
import { RichText } from "../lib/text.jsx";
import { navigate, useEngine } from "../lib/hooks.js";
import { areaStyle, areaVisual, masteryLabel } from "../lib/areas.js";
import {
  areaNumbers, areaStats, topicsOfArea, topicsById, isIntroduced, topicMastery,
  introduceTopic, quizStatsFor, searchTopics, peekCard, cardsForTopic, fromISO, fmtDateShort,
  todayDate, topicHasGenerator, isLearned, quizProgress
} from "../lib/engine.js";

/* Pantalla Repasar: el temario completo, en tres niveles (áreas → temas →
   tema). Son 177 temas comparables entre sí, así que se presentan como el
   índice numerado de una guía —una fila por tema, con su pestaña de color y
   su porcentaje alineado— y no como una pared de tarjetas. */

export default function Browse({ route, onPractice, onCards, onDrill }) {
  const [kind, value] = route.params;
  if (kind === "a" && value) return <AreaScreen areaNum={Number(value)} />;
  if (kind === "t" && value) return <TopicScreen topicId={value} onPractice={onPractice} onCards={onCards} onDrill={onDrill} />;
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
    <>
      <PageHead title="Temario">
        Las siete áreas del examen, con sus 177 temas. Consulta cualquiera y practica cuando quieras,
        esté o no en el plan de hoy.
      </PageHead>

      <div className="search" style={{ marginBottom: 22 }}>
        <Icon name="search" size={17} />
        <input
          type="search"
          value={query}
          placeholder="Buscar tema… (ej. ecuaciones, revolución, verbos)"
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar tema"
        />
        {query && (
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setQuery("")} aria-label="Limpiar búsqueda">
            <Icon name="x" size={15} />
          </button>
        )}
      </div>

      {deferred.trim().length >= 2 ? (
        results.length ? (
          <Section title={`${results.length} ${results.length === 1 ? "resultado" : "resultados"}`}>
            <div className="topic-list">
              {results.map((t) => <TopicRow key={t.id} topic={t} showArea />)}
            </div>
          </Section>
        ) : (
          <EmptyState icon="search" title="Sin resultados">
            No encontramos temas con “{deferred}”. Prueba con otra palabra o revisa las áreas.
          </EmptyState>
        )
      ) : (
        <div className="index">
          {areas.map((areaNum) => <AreaRow key={areaNum} areaNum={areaNum} />)}
        </div>
      )}
    </>
  );
}

function AreaRow({ areaNum }) {
  const v = areaVisual(areaNum);
  const st = areaStats(areaNum);
  return (
    <button className="index-row" style={areaStyle(areaNum)} onClick={() => navigate(`repasar/a/${areaNum}`)}>
      <span className="index-num">{v.num}</span>
      <span className="index-body">
        <span className="index-name">{v.name}</span>
        <span className="index-meta">
          {st.total} temas · {v.reactivos} reactivos del examen · sesión {v.session}
        </span>
      </span>
      <span className="index-tail">
        {st.introducedCount > 0 && (
          <span className="index-meterwrap">
            <Meter value={st.mastery} color={v.color} height={5} label={`Repaso de ${v.short}`} />
          </span>
        )}
        <span className={`index-value${st.introducedCount === 0 ? " is-empty" : ""}`}>
          {st.introducedCount === 0 ? "sin ver" : `${st.mastery}%`}
        </span>
        <Icon name="chevronRight" size={15} />
      </span>
    </button>
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
    <>
      <button className="back-link" onClick={() => navigate("repasar")}>
        <Icon name="chevronLeft" size={15} /> Temario
      </button>

      <header className="topic-head" style={areaStyle(areaNum)}>
        <Badge tone="area"><Mark />Área {v.num}</Badge>
        <h1>{v.name}</h1>
        <div className="topic-facts">
          <p className="topic-fact"><b>{st.introducedCount} / {st.total}</b> temas vistos</p>
          <p className="topic-fact"><b>{v.reactivos}</b> reactivos en el examen</p>
          <p className="topic-fact"><b>{st.introducedCount ? st.mastery + "%" : "—"}</b> de repaso</p>
          <p className="topic-fact"><b>Sesión {v.session}</b> del día del examen</p>
        </div>
      </header>

      {grouped.map(([subarea, list]) => (
        <section key={subarea}>
          <h2 className="subarea-head">{subarea}</h2>
          <div className="topic-list">
            {list.map((t) => <TopicRow key={t.id} topic={t} />)}
          </div>
        </section>
      ))}
    </>
  );
}

/* En la lista de un área el subárea ya es el encabezado del grupo, así que la
   fila lleva el número del tema en el temario: identifica y no repite. En los
   resultados de búsqueda, en cambio, hace falta decir de dónde sale cada uno. */
function TopicRow({ topic, showArea }) {
  const introduced = isIntroduced(topic.id);
  const mastery = introduced ? topicMastery(topic.id) : 0;
  const v = areaVisual(topic.area);
  return (
    <button className="topic-row" style={areaStyle(topic.area)} onClick={() => navigate(`repasar/t/${topic.id}`)}>
      {!showArea && <span className="topic-code tnum">{topic.id}</span>}
      <span className="topic-name">
        {topic.tema}{topic.lang ? ` (${topic.lang === "en" ? "EN" : "ES"})` : ""}
        {showArea && <small>{v.short} · {topic.subarea}</small>}
      </span>
      <span className={`topic-value${introduced ? "" : " is-new"}`}>
        {introduced ? `${mastery}%` : "sin ver"}
      </span>
      <Icon name="chevronRight" size={15} className="icon-chev" />
    </button>
  );
}

/* ---------------- Nivel 3: detalle del tema ---------------- */

function TopicScreen({ topicId, onPractice, onCards, onDrill }) {
  useEngine();
  const toast = useToast();
  const topic = topicsById()[topicId];
  const [openCard, setOpenCard] = useState(null);

  if (!topic) {
    return (
      <>
        <button className="back-link" onClick={() => navigate("repasar")}>
          <Icon name="chevronLeft" size={15} /> Temario
        </button>
        <EmptyState icon="alert" title="Tema no encontrado">
          Puede que el enlace esté mal escrito.
        </EmptyState>
      </>
    );
  }

  const v = areaVisual(topic.area);
  const introduced = isIntroduced(topic.id);
  const mastery = introduced ? topicMastery(topic.id) : 0;
  const label = masteryLabel(mastery);
  const qs = quizStatsFor(topic.id);
  const infinito = topicHasGenerator(topic.id);
  const banco = quizProgress(topic.id);
  const dues = introduced
    ? cardsForTopic(topic.id).map((cid) => (peekCard(cid) || {}).due).filter(Boolean).sort()
    : [];
  const nextReview = dues.length ? fromISO(dues[0]) : null;

  return (
    <div style={areaStyle(topic.area)}>
      <button className="back-link" onClick={() => navigate(`repasar/a/${topic.area}`)}>
        <Icon name="chevronLeft" size={15} /> {v.short}
      </button>

      <header className="topic-head">
        <div className="badge-row">
          <Badge tone="area">
            <Mark />
            {v.short}{topic.lang ? ` · ${topic.lang === "en" ? "Inglés" : "Español"}` : ""}
          </Badge>
          {infinito && <Badge tone="accent" icon="shuffle">problemas aleatorios</Badge>}
          {introduced && <Badge>{label.text}</Badge>}
        </div>
        <h1>{topic.tema}</h1>
        <p className="faint">{topic.subarea}</p>

        {introduced && (
          <div className="topic-facts">
            <p className="topic-fact"><b>{mastery}%</b> de repaso</p>
            <p className="topic-fact">
              <b>{nextReview ? (nextReview <= todayDate() ? "Hoy" : fmtDateShort(nextReview)) : "—"}</b>
              próximo repaso
            </p>
            <p className="topic-fact">
              <b>{qs.seen ? Math.round((qs.correct / qs.seen) * 100) + "%" : "—"}</b>
              aciertos en práctica
            </p>
          </div>
        )}
      </header>

      <Section title="Explicación">
        <RichText>{topic.note}</RichText>
      </Section>

      {!introduced ? (
        <div className="nota nota-info" style={{ marginTop: 26 }}>
          <Icon name="sparkles" size={18} />
          <div>
            <h3>Este tema aún no entra en tu plan</h3>
            <p>
              Si lo agregas ahora, sus tarjetas entran a tu repaso espaciado y aparecerán en tus
              sesiones diarias.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon="play"
              onClick={() => {
                introduceTopic(topic.id);
                toast("Tema agregado a tu repaso espaciado", { tone: "success", icon: "check" });
              }}
            >
              Empezar a estudiarlo
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ margin: "26px 0" }}>
            <div className="row-gap">
              {infinito ? (
                <Button variant="primary" icon="infinity" onClick={() => onDrill(topic, 10)}>
                  Práctica infinita
                </Button>
              ) : (
                <Button variant="primary" icon="target" onClick={() => onPractice(topic)}>
                  Practicar reactivos
                </Button>
              )}
              {infinito && (
                <Button variant="solid" icon="target" onClick={() => onPractice(topic)}>
                  Banco fijo ({banco.disponibles})
                </Button>
              )}
              <Button variant="solid" icon="cards" onClick={() => onCards(topic)}>
                Repasar tarjetas
              </Button>
            </div>
            {banco.disponibles < banco.total && (
              <p className="faint" style={{ marginTop: 12 }}>
                {banco.total - banco.disponibles} de los {banco.total} reactivos de este tema todavía no se
                preguntan: primero se enseñan sus tarjetas.
              </p>
            )}
          </div>

          <Section
            title="Tarjetas"
            action={<Badge>{topic.flashcards.length}</Badge>}
            note="Toca una para ver el reverso."
          >
            <div className="fc-list">
              {topic.flashcards.map((fc, i) => (
                <div key={i} className={`fc-item${openCard === i ? " is-open" : ""}`}>
                  <button
                    className="fc-front"
                    onClick={() => setOpenCard(openCard === i ? null : i)}
                    aria-expanded={openCard === i}
                  >
                    <span>{fc.front}</span>
                    {!isLearned(`${topic.id}::fc${i}`) && <Badge>por aprender</Badge>}
                    <Icon name="chevronDown" size={15} />
                  </button>
                  <div className="fc-reveal">
                    <div className="fc-reveal-inner">
                      <RichText>{fc.back}</RichText>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
