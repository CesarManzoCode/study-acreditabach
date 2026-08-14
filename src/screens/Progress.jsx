import { useMemo, useState, useRef } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Card, Ring, Bar, Badge, Stat, SectionTitle, Reveal, Modal, EmptyState, useToast } from "../ui/kit.jsx";
import { navigate, useEngine } from "../lib/hooks.js";
import { areaStyle, areaVisual, masteryLabel } from "../lib/areas.js";
import {
  areaNumbers, areaStats, weakestTopics, activityCalendar, upcomingLoad,
  resetProgress, exportProgress, importProgress, fmtDateShort, toISO, todayDate
} from "../lib/engine.js";

export default function Progress({ plan, stats }) {
  const rev = useEngine();
  const toast = useToast();
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef(null);

  const areas = areaNumbers();
  const weak = useMemo(() => weakestTopics(8).filter((w) => w.mastery < 75), [rev]);
  const calendar = useMemo(() => activityCalendar(84), [rev]);
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
    <div className="stack">
      <SectionTitle hint="Tu avance vive solo en este navegador. Descarga un respaldo si vas a cambiar de dispositivo.">
        Progreso
      </SectionTitle>

      <Reveal>
        <Card>
          <div className="stats">
            <Stat value={Math.max(0, plan.daysToExam)} label="días para el examen" />
            <Stat value={stats.streak} label={stats.streak === 1 ? "día de racha" : "días de racha"} tone="brand" />
            <Stat value={`${stats.coverage}%`} label="temario visto" tone="success" />
          </div>
        </Card>
      </Reveal>

      <Reveal delay={60}>
        <Card>
          <div className="card-title-row">
            <h3>Constancia</h3>
            <Badge tone="brand" icon="flame">{stats.studyDays} días activos</Badge>
          </div>
          <Heatmap days={calendar} />
        </Card>
      </Reveal>

      <Reveal delay={120}>
        <Card>
          <div className="card-title-row">
            <h3>Repasos que vienen</h3>
            <Badge>próximas 2 semanas</Badge>
          </div>
          <Forecast data={forecast} />
        </Card>
      </Reveal>

      <Reveal delay={180}>
        <Card>
          <h3>Dominio por área</h3>
          {areas.map((a) => {
            const st = areaStats(a);
            const v = areaVisual(a);
            return (
              <button
                key={a}
                onClick={() => navigate(`repasar/a/${a}`)}
                style={{ ...areaStyle(a), display: "block", width: "100%", background: "transparent", border: 0, padding: "6px 0", textAlign: "left", cursor: "pointer" }}
              >
                <div className="bar-row">
                  <span className="lbl">
                    <span className="topic-dot" />
                    {v.short}
                  </span>
                  <span className="val">{st.mastery}% · {st.introducedCount}/{st.total} vistos</span>
                </div>
                <Bar value={st.mastery} color={v.color} />
              </button>
            );
          })}
        </Card>
      </Reveal>

      <Reveal delay={240}>
        <Card>
          <div className="card-title-row">
            <h3>Temas para reforzar</h3>
            {weak.length > 0 && <Badge tone="warn">{weak.length}</Badge>}
          </div>
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
                    <span className="topic-dot" />
                    <span className="topic-name">
                      {topic.tema}
                      <small>{areaVisual(topic.area).short} · {topic.subarea}</small>
                    </span>
                    <Badge tone={label.tone}>{mastery}%</Badge>
                    <Icon name="chevronRight" size={16} className="icon-chev" />
                  </button>
                );
              })}
            </div>
          ) : (
            <EmptyState icon="check" title="Nada urgente por ahora">
              Todos los temas que has visto están en buen nivel. Sigue con tus sesiones diarias.
            </EmptyState>
          )}
        </Card>
      </Reveal>

      <Reveal delay={300}>
        <Card className="danger-zone">
          <h3>Tus datos</h3>
          <p className="muted">
            Todo se guarda en este navegador (localStorage). Si borras los datos del sitio o cambias de dispositivo,
            el avance no viaja contigo: descarga un respaldo de vez en cuando.
          </p>
          <div className="chips" style={{ marginTop: 14 }}>
            <Button variant="solid" icon="download" onClick={download}>Descargar respaldo</Button>
            <Button variant="solid" icon="upload" onClick={() => fileRef.current?.click()}>Restaurar respaldo</Button>
            <Button variant="danger" icon="trash" onClick={() => setConfirmReset(true)}>Reiniciar</Button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ""; }}
          />
        </Card>
      </Reveal>

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
    </div>
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
                  title={`${fmtDateShort(d.date)}: ${d.load ? `${d.entry.cardsReviewed || 0} tarjetas, ${d.entry.quizAnswered || 0} preguntas` : "sin actividad"}`}
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
        <span className="heat heat-1" style={{ width: 11, height: 11 }} />
        <span className="heat heat-2" style={{ width: 11, height: 11 }} />
        <span className="heat heat-3" style={{ width: 11, height: 11 }} />
        <span className="heat heat-4" style={{ width: 11, height: 11 }} />
        <span>más</span>
        <span style={{ marginLeft: "auto" }}>últimas 12 semanas</span>
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
      <p className="faint" style={{ marginTop: 10 }}>
        {totalUpcoming} tarjetas repartidas en los próximos 14 días. El algoritmo separa cada vez más los repasos
        de lo que ya dominas.
      </p>
    </>
  );
}
