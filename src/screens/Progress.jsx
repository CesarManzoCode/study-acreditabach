import { useMemo, useState, useRef } from "react";
import Icon from "../ui/Icon.jsx";
import {
  Button, Sheet, MeterBlock, Badge, Figures, Figure, PageHead, Section,
  Modal, EmptyState, Mark, useToast
} from "../ui/kit.jsx";
import { navigate, useEngine } from "../lib/hooks.js";
import { areaStyle, areaVisual, masteryLabel } from "../lib/areas.js";
import {
  areaNumbers, areaStats, weakestTopics, activityCalendar, upcomingLoad,
  resetProgress, exportProgress, importProgress, fmtDateShort, toISO, todayDate, contentStats,
  areaReadiness, isModoEsencial, setModoEsencial
} from "../lib/engine.js";

/* Pantalla Progreso.

   El orden no es casual: lo primero es el área que te puede reprobar, porque
   el examen se acredita área por área y esa es la única cifra que cambia lo
   que conviene estudiar mañana. Las estadísticas de constancia van después:
   motivan, pero no deciden nada. */

export default function Progress({ plan, stats }) {
  const rev = useEngine();
  const toast = useToast();
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef(null);

  const areas = areaNumbers();
  const weak = useMemo(() => weakestTopics(8).filter((w) => w.mastery < 85), [rev]);
  const calendar = useMemo(() => activityCalendar(84), [rev]);
  const readiness = useMemo(() => areaReadiness(), [rev]);
  const forecast = useMemo(() => upcomingLoad(14), [rev]);

  const download = () => {
    const blob = new Blob([exportProgress()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `acreditabach-progreso-${toISO(todayDate())}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Respaldo descargado", { tone: "success", icon: "download" });
  };

  const upload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const ok = importProgress(String(reader.result));
      toast(ok ? "Progreso restaurado" : "El archivo no es un respaldo válido", {
        tone: ok ? "success" : "danger",
        icon: ok ? "check" : "alert"
      });
    };
    reader.readAsText(file);
  };

  return (
    <>
      <PageHead title="Progreso">
        Cómo vas por área, qué conviene reforzar y cuánto has estudiado.
      </PageHead>

      <Figures className="figures-lead">
        <Figure value={Math.max(0, plan.daysToExam)} label="días para el examen" />
        <Figure value={stats.streak} label={stats.streak === 1 ? "día de racha" : "días de racha"} />
        <Figure value={`${stats.coverage}%`} label="temario visto" />
        <Figure value={stats.studyDays} label="días activos" />
      </Figures>

      <Section
        title="Qué área te puede reprobar"
        note="No se aprueba en promedio: hay que llegar a 1 000 puntos en cada una de las siete áreas, y reprobar tres significa volver a empezar. Van de la más urgente a la más segura."
      >
        <div className="risk-list">
          {readiness.map((a) => {
            const v = areaVisual(a.area);
            const pct = a.acierto === null ? null : Math.round(a.acierto * 100);
            return (
              <button
                key={a.area}
                className="risk-row"
                style={areaStyle(a.area)}
                onClick={() => navigate(`repasar/a/${a.area}`)}
              >
                <span className="risk-name">
                  <Mark />
                  {v.short}
                  <em>{a.reactivos} reactivos</em>
                </span>
                <span className="risk-note">
                  {pct === null
                    ? "sin datos suficientes"
                    : `${pct}% de aciertos · meta ${Math.round(a.objetivo * 100)}%`}
                </span>
                <span className={"risk-flag " + a.nivel}>
                  {a.nivel === "alto" ? "atender ya" : a.nivel === "medio" ? "vigilar" : "en curso"}
                </span>
              </button>
            );
          })}
        </div>
        <p className="faint" style={{ marginTop: 12 }}>
          La meta no es igual para todas: las áreas con menos reactivos piden más margen, porque con
          19 preguntas la suerte pesa más que con 32. No es una predicción del Índice Ceneval —la guía
          no publica cómo convierte aciertos a esa escala—, es tu porcentaje de aciertos medido contra
          un objetivo de trabajo.
        </p>
      </Section>

      <Section
        title="Avance de estudio por área"
        note="Mide tu repaso y tus aciertos dentro de esta app. No es el Índice Ceneval (700–1300 puntos, mínimo 1000 por área) ni se convierte a él: sirve para ver qué falta repasar."
      >
        {areas.map((a) => {
          const st = areaStats(a);
          const v = areaVisual(a);
          return (
            <button
              key={a}
              className="area-meter"
              style={areaStyle(a)}
              onClick={() => navigate(`repasar/a/${a}`)}
            >
              <MeterBlock
                label={<><Mark />{v.short}</>}
                value={st.mastery}
                display={`${st.mastery}% · ${st.introducedCount}/${st.total} vistos`}
                color={v.color}
              />
            </button>
          );
        })}
      </Section>

      <Section
        title="Temas para reforzar"
        action={weak.length > 0 ? <Badge tone="warn">{weak.length}</Badge> : null}
      >
        {weak.length ? (
          <div className="topic-list">
            {weak.map(({ topic, mastery }) => {
              const label = masteryLabel(mastery);
              return (
                <button
                  key={topic.id}
                  className="topic-row"
                  style={areaStyle(topic.area)}
                  onClick={() => navigate(`repasar/t/${topic.id}`)}
                >
                  <span className="topic-name">
                    {topic.tema}
                    <small>{areaVisual(topic.area).short} · {topic.subarea}</small>
                  </span>
                  <span className="topic-value" style={{ color: `var(--${label.tone === "success" ? "ok" : label.tone === "warn" ? "hold" : "bad"})` }}>
                    {mastery}%
                  </span>
                  <Icon name="chevronRight" size={15} className="icon-chev" />
                </button>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="check" title="Nada urgente por ahora">
            Todos los temas que has visto están en buen nivel. Sigue con tus sesiones diarias.
          </EmptyState>
        )}
      </Section>

      <div className="pair-grid">
        <Section title="Constancia" note="Últimas 12 semanas.">
          <Heatmap days={calendar} />
        </Section>

        <Section title="Repasos que vienen" note="Próximas dos semanas.">
          <Forecast data={forecast} />
        </Section>
      </div>

      {/* Qué se estudia: solo lo que la guía evalúa, o también la ampliación. */}
      <Section
        title="Qué estás estudiando"
        action={
          <Badge tone={isModoEsencial() ? "success" : "accent"}>
            {isModoEsencial() ? "Modo esencial" : "Modo completo"}
          </Badge>
        }
      >
        <p className="muted" style={{ maxWidth: "68ch" }}>
          {isModoEsencial()
            ? "Estás estudiando solo lo que las orientaciones de la guía evalúan: la explicación de cada tema, los formatos que el examen usa y los reactivos de refuerzo. Es el camino más corto para acreditar."
            : "Estás estudiando también los bloques de ampliación, que van más allá de lo que la guía pide. Sabrás más, pero el temario se alarga bastante."}
        </p>
        <div className="row-gap" style={{ marginTop: 14 }}>
          <Button
            variant="solid"
            icon={isModoEsencial() ? "layers" : "target"}
            onClick={() => {
              const nuevo = !isModoEsencial();
              setModoEsencial(nuevo);
              toast(
                nuevo
                  ? "Modo esencial: solo lo que la guía evalúa"
                  : "Modo completo: se agregaron los bloques de ampliación",
                { tone: "success", icon: "check" }
              );
            }}
          >
            {isModoEsencial() ? "Cambiar a modo completo" : "Volver al modo esencial"}
          </Button>
        </div>
        <p className="faint" style={{ marginTop: 12 }}>
          Cambiar de modo <strong>no borra nada</strong>: las tarjetas de ampliación que ya hayas
          estudiado conservan su intervalo y sus repasos, y vuelven en cuanto actives el modo completo.
        </p>
      </Section>

      <ContentSection />

      <Section title="Tus datos">
        <Sheet className="danger-zone">
          <p className="muted" style={{ maxWidth: "66ch" }}>
            Todo se guarda en este navegador (localStorage). Para que el avance te siga en otros dispositivos,
            conecta una cuenta en <button className="link-btn" onClick={() => navigate("cuenta")}>Cuenta y sincronización</button>.
            Un respaldo descargado de vez en cuando tampoco sobra.
          </p>
          <div className="row-gap" style={{ marginTop: 16 }}>
            <Button variant="solid" icon="download" onClick={download}>Descargar respaldo</Button>
            <Button variant="solid" icon="upload" onClick={() => fileRef.current?.click()}>Restaurar respaldo</Button>
            <Button variant="danger" icon="trash" onClick={() => setConfirmReset(true)}>Reiniciar progreso</Button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ""; }}
          />
        </Sheet>
      </Section>

      <Modal
        open={confirmReset}
        title="¿Reiniciar todo tu progreso?"
        description="Se borran las tarjetas, la racha y el historial guardados en este navegador. No se puede deshacer."
        onClose={() => setConfirmReset(false)}
        actions={
          <>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>Cancelar</Button>
            <Button
              variant="danger"
              onClick={() => {
                resetProgress();
                setConfirmReset(false);
                toast("Progreso reiniciado", { tone: "danger", icon: "refresh" });
              }}
            >
              Sí, borrar todo
            </Button>
          </>
        }
      />
    </>
  );
}

/* ---------------- Contenido disponible ---------------- */

function ContentSection() {
  const c = useMemo(() => contentStats(), []);
  return (
    <Section
      title="Contenido del temario"
      note="Los temas con problemas aleatorios generan un ejercicio distinto cada vez: cambian los números y los datos, así que nunca se acaba la práctica."
    >
      <Figures>
        <Figure value={c.topics} label="temas" />
        <Figure value={c.flashcards} label="tarjetas" />
        <Figure value={c.quiz} label="reactivos fijos" />
        <Figure value={c.conGenerador} label="temas con problemas aleatorios" />
      </Figures>
    </Section>
  );
}

/* ---------------- Mapa de constancia ---------------- */

function level(load) {
  if (!load) return 0;
  if (load <= 5) return 1;
  if (load <= 15) return 2;
  if (load <= 30) return 3;
  return 4;
}

function Heatmap({ days }) {
  const columns = useMemo(() => {
    const pad = days.length ? (days[0].date.getDay() + 6) % 7 : 0;
    const cells = [...Array(pad).fill(null), ...days];
    const cols = [];
    for (let i = 0; i < cells.length; i += 7) cols.push(cells.slice(i, i + 7));
    return cols;
  }, [days]);

  return (
    <>
      <div className="heatmap">
        {columns.map((col, ci) => (
          <div className="heatmap-col" key={ci}>
            {col.map((d, ri) =>
              d ? (
                <div
                  key={ri}
                  className={`heat heat-${level(d.load)}`}
                  title={`${fmtDateShort(d.date)}: ${d.load ? `${d.entry.cardsReviewed || 0} tarjetas, ${d.entry.quizAnswered || 0} reactivos` : "sin actividad"}`}
                />
              ) : (
                <div key={ri} className="heat" style={{ opacity: 0 }} />
              )
            )}
          </div>
        ))}
      </div>
      <div className="heat-legend">
        <span>menos</span>
        <span className="heat heat-1" style={{ width: 10, height: 10 }} />
        <span className="heat heat-2" style={{ width: 10, height: 10 }} />
        <span className="heat heat-3" style={{ width: 10, height: 10 }} />
        <span className="heat heat-4" style={{ width: 10, height: 10 }} />
        <span>más</span>
      </div>
    </>
  );
}

/* ---------------- Carga próxima ---------------- */

function Forecast({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const totalUpcoming = data.reduce((s, d) => s + d.count, 0);

  if (!totalUpcoming) {
    return (
      <EmptyState icon="clock" title="Nada agendado todavía">
        En cuanto estudies tus primeros temas verás aquí cómo se reparten los repasos.
      </EmptyState>
    );
  }

  return (
    <>
      <div className="forecast">
        {data.map((d, i) => (
          <div className={`forecast-col${i === 0 ? " is-today" : ""}`} key={d.date.toISOString()} title={`${d.count} tarjetas`}>
            <div className="forecast-bar" style={{ height: `${Math.max(3, (d.count / max) * 100)}%` }} />
            <span className="forecast-label">{i === 0 ? "hoy" : d.date.getDate()}</span>
          </div>
        ))}
      </div>
      <p className="faint" style={{ marginTop: 12 }}>
        {totalUpcoming} tarjetas repartidas en los próximos 14 días. El algoritmo separa cada vez más los repasos
        de lo que ya dominas.
      </p>
    </>
  );
}
