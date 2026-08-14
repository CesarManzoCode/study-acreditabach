import { useState, useMemo, useRef } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Card, Badge, SectionTitle, Reveal, Modal, EmptyState, useToast } from "../ui/kit.jsx";
import { useAccounts, useSync, useEngine } from "../lib/hooks.js";
import {
  getUsers, getActiveUser, getActiveSlug, createUser, switchUser,
  renameUser, deleteUser, setUserPin, getSpace
} from "../lib/accounts.js";
import { formatCode, createSpace, joinSpace, leaveSpace, syncNow, getSyncStatus, providerList } from "../lib/sync.js";
import { overallStats } from "../lib/engine.js";

const ESTADO = {
  off: { texto: "Sin sincronizar", tone: "neutral", icon: "cloudOff" },
  sync: { texto: "Sincronizando…", tone: "brand", icon: "refresh" },
  ok: { texto: "Al día", tone: "success", icon: "cloud" },
  error: { texto: "Con problemas", tone: "danger", icon: "alert" }
};

export default function Account() {
  useAccounts();
  useSync();
  const rev = useEngine();
  const toast = useToast();

  const users = getUsers();
  const active = getActiveUser();
  const space = getSpace();
  const status = getSyncStatus();
  const stats = useMemo(() => overallStats(), [rev]);

  const [nuevo, setNuevo] = useState("");
  const [creando, setCreando] = useState(false);
  const [porBorrar, setPorBorrar] = useState(null);
  const [renombrando, setRenombrando] = useState(null);
  const [nombreTmp, setNombreTmp] = useState("");

  const crear = () => {
    const nombre = nuevo.trim();
    if (!nombre) return;
    createUser(nombre);
    setNuevo("");
    setCreando(false);
    toast(`Cuenta "${nombre}" creada`, { tone: "success", icon: "check" });
  };

  const cambiar = (slug) => {
    if (slug === getActiveSlug()) return;
    switchUser(slug);
    const u = getUsers().find((x) => x.slug === slug);
    toast(`Ahora estudias como ${u ? u.name : slug}`, { icon: "user" });
  };

  return (
    <div className="stack">
      <SectionTitle hint="Tu progreso vive en este dispositivo. Con una cuenta y un espacio de sincronización, lo puedes seguir en cualquier otro.">
        Cuenta y sincronización
      </SectionTitle>

      {/* ---------------- Cuenta activa ---------------- */}
      <Reveal>
        <Card className="account-hero">
          <div className="account-hero-main">
            <span className="avatar avatar-lg" style={{ "--c": active ? active.color : "#6366f1" }}>
              {active ? inicial(active.name) : <Icon name="user" size={22} />}
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="account-name">{active ? active.name : "Sin cuenta"}</div>
              <p className="muted" style={{ margin: "2px 0 0" }}>
                {active
                  ? `${stats.introducedCount} de ${stats.total} temas vistos · racha de ${stats.streak}`
                  : "Estás usando el progreso guardado directamente en este navegador."}
              </p>
            </div>
          </div>
          <span className={`sync-chip sync-${status.state}`}>
            <Icon name={ESTADO[status.state].icon} size={15} />
            {ESTADO[status.state].texto}
          </span>
        </Card>
      </Reveal>

      {!active && (
        <Reveal delay={60}>
          <Card tone="soft">
            <div className="note-row">
              <span className="mock-icon"><Icon name="alert" size={18} /></span>
              <p className="muted" style={{ margin: 0 }}>
                Tu avance actual <strong>no se pierde</strong> al crear una cuenta: la primera cuenta que crees
                se queda con todo lo que ya llevas, y la copia original sigue guardada en este navegador.
              </p>
            </div>
          </Card>
        </Reveal>
      )}

      {/* ---------------- Lista de cuentas ---------------- */}
      <Reveal delay={90}>
        <Card>
          <div className="card-head">
            <h3 className="card-title">Cuentas en este dispositivo</h3>
            <Button size="sm" variant="soft" icon="plus" onClick={() => setCreando(true)}>Nueva</Button>
          </div>

          {users.length === 0 ? (
            <EmptyState icon="users" title="Todavía no hay cuentas">
              Crea una para poder llevar tu progreso a otros dispositivos.
            </EmptyState>
          ) : (
            <div className="account-list">
              {users.map((u) => (
                <div key={u.slug} className={`account-row${u.slug === getActiveSlug() ? " is-active" : ""}`}>
                  <button className="account-pick" onClick={() => cambiar(u.slug)}>
                    <span className="avatar" style={{ "--c": u.color }}>{inicial(u.name)}</span>
                    <span className="account-row-body">
                      <span className="account-row-name">{u.name}</span>
                      <span className="account-row-meta">
                        {u.slug === getActiveSlug() ? "Cuenta activa" : "Tocar para cambiar"}
                      </span>
                    </span>
                  </button>
                  <div className="account-row-actions">
                    <button
                      className="btn btn-ghost btn-icon"
                      title="Cambiar el nombre"
                      onClick={() => { setRenombrando(u.slug); setNombreTmp(u.name); }}
                    >
                      <Icon name="settings" size={16} />
                    </button>
                    <button
                      className="btn btn-ghost btn-icon"
                      title="Borrar esta cuenta"
                      onClick={() => setPorBorrar(u)}
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </Reveal>

      {/* ---------------- Sincronización ---------------- */}
      <Reveal delay={120}>
        <SyncCard space={space} status={status} toast={toast} />
      </Reveal>

      {/* ---------------- Modales ---------------- */}

      <Modal
        open={creando}
        title="Nueva cuenta"
        description={
          users.length === 0
            ? "La primera cuenta se queda con el progreso que ya llevas en este navegador."
            : "Cada cuenta guarda su propio avance por separado."
        }
        onClose={() => setCreando(false)}
        actions={
          <>
            <Button variant="ghost" onClick={() => setCreando(false)}>Cancelar</Button>
            <Button variant="primary" icon="check" onClick={crear} disabled={!nuevo.trim()}>Crear</Button>
          </>
        }
      >
        <input
          className="input"
          placeholder="¿Cómo te llamas?"
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && nuevo.trim()) crear(); }}
          autoFocus
          maxLength={32}
        />
      </Modal>

      <Modal
        open={!!renombrando}
        title="Cambiar el nombre"
        onClose={() => setRenombrando(null)}
        actions={
          <>
            <Button variant="ghost" onClick={() => setRenombrando(null)}>Cancelar</Button>
            <Button
              variant="primary"
              icon="check"
              onClick={() => {
                renameUser(renombrando, nombreTmp);
                setRenombrando(null);
                toast("Nombre actualizado", { tone: "success", icon: "check" });
              }}
            >
              Guardar
            </Button>
          </>
        }
      >
        <input
          className="input"
          value={nombreTmp}
          onChange={(e) => setNombreTmp(e.target.value)}
          maxLength={32}
          autoFocus
        />
      </Modal>

      <Modal
        open={!!porBorrar}
        tone="danger"
        title={porBorrar ? `¿Borrar la cuenta de ${porBorrar.name}?` : ""}
        description="Se borra el progreso de esa cuenta en este dispositivo. Si está en un espacio de sincronización, seguirá ahí hasta que la borres también desde el servidor."
        onClose={() => setPorBorrar(null)}
        actions={
          <>
            <Button variant="ghost" onClick={() => setPorBorrar(null)}>Cancelar</Button>
            <Button
              variant="danger"
              icon="trash"
              onClick={() => {
                deleteUser(porBorrar.slug);
                setPorBorrar(null);
                toast("Cuenta borrada", { tone: "danger", icon: "trash" });
              }}
            >
              Borrar
            </Button>
          </>
        }
      />
    </div>
  );
}

function inicial(nombre) {
  return String(nombre || "?").trim().charAt(0).toUpperCase();
}

/* ============================================================
   Tarjeta de sincronización
   ============================================================ */

function SyncCard({ space, status, toast }) {
  const [modo, setModo] = useState(null); // "crear" | "unir"
  const [proveedor, setProveedor] = useState("jsonblob");
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [codigo, setCodigo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const codeRef = useRef(null);

  const proveedores = providerList();
  const code = space ? formatCode(space) : "";

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast("Código copiado", { tone: "success", icon: "check" });
    } catch (e) {
      if (codeRef.current) {
        codeRef.current.select();
        toast("Selecciona y copia el código", { icon: "link" });
      }
    }
  };

  const crear = async () => {
    setOcupado(true);
    try {
      await createSpace(proveedor, { url: url.trim(), token: token.trim() });
      setModo(null);
      toast("Espacio creado y sincronizado", { tone: "success", icon: "cloud" });
    } catch (e) {
      toast(e.message || "No se pudo crear el espacio", { tone: "danger", icon: "alert", duration: 6000 });
    } finally {
      setOcupado(false);
    }
  };

  const unir = async () => {
    setOcupado(true);
    try {
      await joinSpace(codigo);
      setModo(null);
      setCodigo("");
      toast("Conectado: tu progreso se acaba de mezclar", { tone: "success", icon: "cloud" });
    } catch (e) {
      toast(e.message || "No se pudo conectar", { tone: "danger", icon: "alert", duration: 6000 });
    } finally {
      setOcupado(false);
    }
  };

  const ahora = async () => {
    setOcupado(true);
    const r = await syncNow();
    setOcupado(false);
    toast(r.ok ? "Progreso sincronizado" : r.message, {
      tone: r.ok ? "success" : "danger",
      icon: r.ok ? "check" : "alert",
      duration: r.ok ? 3000 : 6000
    });
  };

  return (
    <Card>
      <div className="card-head">
        <h3 className="card-title">Sincronización entre dispositivos</h3>
        {space && <Badge tone="brand">{space.provider}</Badge>}
      </div>

      {!space ? (
        <>
          <p className="muted" style={{ marginTop: 0 }}>
            Conecta este dispositivo a un <strong>espacio</strong>: un archivo JSON en internet donde viven tus
            cuentas y su avance. Al entrar desde otro lugar, los dos progresos se mezclan sin perder nada.
          </p>

          {modo === null && (
            <div className="row-gap">
              <Button variant="primary" icon="cloud" onClick={() => setModo("crear")}>Crear un espacio</Button>
              <Button variant="solid" icon="link" onClick={() => setModo("unir")}>Ya tengo un código</Button>
            </div>
          )}

          {modo === "crear" && (
            <div className="stack" style={{ gap: 12 }}>
              <label className="field">
                <span>¿Dónde se guarda?</span>
                <select className="input" value={proveedor} onChange={(e) => setProveedor(e.target.value)}>
                  {proveedores.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </label>

              {proveedor === "rest" && (
                <label className="field">
                  <span>Dirección del servidor</span>
                  <input
                    className="input"
                    placeholder="https://mi-worker.workers.dev/space"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </label>
              )}

              {proveedor === "gist" && (
                <label className="field">
                  <span>Token de GitHub con permiso de gist</span>
                  <input
                    className="input"
                    placeholder="github_pat_…"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </label>
              )}

              <p className="hint-text">{ayuda(proveedor)}</p>

              <div className="row-gap">
                <Button variant="ghost" onClick={() => setModo(null)}>Cancelar</Button>
                <Button variant="primary" icon="cloud" onClick={crear} disabled={ocupado}>
                  {ocupado ? "Creando…" : "Crear"}
                </Button>
              </div>
            </div>
          )}

          {modo === "unir" && (
            <div className="stack" style={{ gap: 12 }}>
              <label className="field">
                <span>Código del espacio</span>
                <input
                  className="input"
                  placeholder="jb:… · url:… · gh:…"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  autoFocus
                />
              </label>
              <p className="hint-text">Lo encuentras en el otro dispositivo, en esta misma pantalla.</p>
              <div className="row-gap">
                <Button variant="ghost" onClick={() => setModo(null)}>Cancelar</Button>
                <Button variant="primary" icon="link" onClick={unir} disabled={ocupado || !codigo.trim()}>
                  {ocupado ? "Conectando…" : "Conectar"}
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="muted" style={{ marginTop: 0 }}>
            Escribe este código en tus otros dispositivos para que compartan el mismo avance.
          </p>

          <div className="code-box">
            <input className="input code-input" ref={codeRef} value={code} readOnly onFocus={(e) => e.target.select()} />
            <Button variant="soft" icon="link" onClick={copiar}>Copiar</Button>
          </div>

          {status.state === "error" && (
            <p className="hint-text hint-danger">
              Último intento: {status.message}. Tu progreso local está intacto; se vuelve a intentar solo.
            </p>
          )}
          {space.lastSync && status.state !== "error" && (
            <p className="hint-text">Última sincronización: {new Date(space.lastSync).toLocaleString("es-MX")}.</p>
          )}

          <div className="row-gap" style={{ marginTop: 14 }}>
            <Button variant="primary" icon="refresh" onClick={ahora} disabled={ocupado}>
              {ocupado ? "Sincronizando…" : "Sincronizar ahora"}
            </Button>
            <Button
              variant="ghost"
              icon="logout"
              onClick={() => {
                leaveSpace();
                toast("Este dispositivo dejó el espacio. El progreso local se queda.", { icon: "cloudOff" });
              }}
            >
              Desconectar
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

function ayuda(proveedor) {
  switch (proveedor) {
    case "jsonblob":
      return "No pide registro: se crea un archivo JSON público con una dirección difícil de adivinar. Lo más rápido para empezar.";
    case "rest":
      return "Cualquier servidor que responda GET y PUT con JSON. En la carpeta server/ del repositorio vienen dos listos: uno de Node y uno de Cloudflare Workers.";
    case "gist":
      return "Guarda el progreso en un Gist secreto de tu cuenta de GitHub. El token viaja dentro del código del espacio, así que trátalo como una contraseña.";
    case "local":
      return "Solo para probar: el espacio vive en este mismo navegador. Sirve para ver cómo se mezcla el progreso, no para cambiar de dispositivo.";
    default:
      return "";
  }
}
