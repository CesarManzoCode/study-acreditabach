import { useState, useMemo } from "react";
import Icon from "../ui/Icon.jsx";
import { Button, Sheet, Section, PageHead, useToast } from "../ui/kit.jsx";
import { useAccounts, useCloud, useEngine } from "../lib/hooks.js";
import { getActiveUser, isGuest, getServerUrl, setServerUrl, servidorFijo } from "../lib/accounts.js";
import {
  registrar, entrar, salir, cambiarPassword, guardarAhora, probarServidor,
  getCloudStatus, problemaUsuario, problemaPassword
} from "../lib/cloud.js";
import { overallStats } from "../lib/engine.js";

const ESTADO = {
  invitado: { texto: "Modo invitado", tone: "off", icon: "cloudOff" },
  guardando: { texto: "Guardando…", tone: "sync", icon: "refresh" },
  listo: { texto: "Guardado en tu cuenta", tone: "ok", icon: "cloud" },
  error: { texto: "Sin guardar", tone: "error", icon: "alert" }
};

export default function Account() {
  useAccounts();
  useCloud();
  const rev = useEngine();
  const stats = useMemo(() => overallStats(), [rev]);
  const toast = useToast();

  const user = getActiveUser();
  const invitado = isGuest();
  const estado = ESTADO[getCloudStatus().modo] || ESTADO.invitado;
  const servidor = getServerUrl();

  return (
    <>
      <PageHead title="Cuenta">
        {invitado
          ? "Sin cuenta, tu avance se guarda solo en este dispositivo. Con una cuenta, te sigue a donde entres."
          : "Tu avance se guarda en tu cuenta. Entra con el mismo usuario en cualquier dispositivo y ahí estará."}
      </PageHead>

      {/* ---------------- Quién eres ---------------- */}
      <header className="account-head">
        <span className={`avatar avatar-lg${invitado ? " avatar-guest" : ""}`}>
          {invitado ? <Icon name="user" size={22} /> : inicial(user.nombre)}
        </span>
        <div className="account-id">
          <div className="account-name">{invitado ? "Invitado" : user.nombre}</div>
          <p className="faint" style={{ margin: "2px 0 0" }}>
            {stats.introducedCount} de {stats.total} temas vistos · racha de {stats.streak}
            {!invitado && <> · <span className="mono">@{user.usuario}</span></>}
          </p>
        </div>
        <span className={`sync-chip sync-${estado.tone}`}>
          <Icon name={estado.icon} size={14} />
          {estado.texto}
        </span>
      </header>

      {/* ---------------- Servidor (solo si falta configurarlo) ---------------- */}
      {!servidor && <ServidorCard toast={toast} />}

      {/* ---------------- Entrar / registrarse o sesión abierta ---------------- */}
      {servidor && (invitado ? <AccesoCard toast={toast} /> : <SesionCard toast={toast} />)}

      {servidor && !servidorFijo() && (
        <Section title="Servidor de cuentas">
          <p className="muted" style={{ margin: 0 }}>
            <span className="mono">{servidor}</span>
          </p>
          {invitado && (
            <p style={{ marginTop: 8 }}>
              <button className="link-btn" onClick={() => { setServerUrl(""); }}>
                Cambiar de servidor
              </button>
            </p>
          )}
        </Section>
      )}
    </>
  );
}

function inicial(nombre) {
  return String(nombre || "?").trim().charAt(0).toUpperCase();
}

/* ============================================================
   Conectar el servidor de cuentas (una sola vez por dispositivo)
   ============================================================ */

function ServidorCard({ toast }) {
  const [url, setUrl] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState("");

  const conectar = async (e) => {
    e.preventDefault();
    setOcupado(true);
    setError("");
    try {
      const base = await probarServidor(url);
      setServerUrl(base);
      toast("Servidor conectado", { tone: "success", icon: "check" });
    } catch (err) {
      setError(err.message || "No se pudo conectar");
    } finally {
      setOcupado(false);
    }
  };

  return (
    <Section title="Conecta el servidor de cuentas">
      <p className="muted" style={{ maxWidth: "66ch" }}>
        Esta página es un sitio estático: para tener cuentas de verdad hace falta un servidor
        donde vivan los usuarios y su progreso. En el repositorio viene listo, en
        <span className="mono"> server/cloudflare-worker.js</span>, con las instrucciones para
        publicarlo gratis en Cloudflare en unos minutos. Cuando lo tengas, pega aquí su dirección.
      </p>

      <form className="stack" style={{ gap: 12, marginTop: 16, maxWidth: 460 }} onSubmit={conectar}>
        <label className="field">
          <span>Dirección del servidor</span>
          <input
            className="input"
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="https://acreditabach-cuentas.tu-usuario.workers.dev"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        {error && <p className="hint-text hint-danger">{error}</p>}
        <div className="row-gap">
          <Button type="submit" variant="primary" icon="link" disabled={ocupado || !url.trim()}>
            {ocupado ? "Comprobando…" : "Conectar servidor"}
          </Button>
        </div>
        <p className="hint-text">
          Mientras tanto puedes seguir estudiando como invitado: tu avance se guarda en este
          dispositivo y, cuando te registres, se queda en tu cuenta.
        </p>
      </form>
    </Section>
  );
}

/* ============================================================
   Iniciar sesión / crear cuenta
   ============================================================ */

function AccesoCard({ toast }) {
  const [modo, setModo] = useState("entrar"); // "entrar" | "registro"
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [verPass, setVerPass] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState("");

  const registro = modo === "registro";

  const cambiarModo = (nuevo) => {
    setModo(nuevo);
    setError("");
    setPassword2("");
  };

  const enviar = async (e) => {
    e.preventDefault();
    setError("");

    if (registro) {
      const problema = problemaUsuario(usuario) || problemaPassword(password);
      if (problema) return setError(problema);
      if (password !== password2) return setError("Las dos contraseñas no coinciden");
    } else if (!usuario.trim() || !password) {
      return setError("Escribe tu usuario y tu contraseña");
    }

    setOcupado(true);
    try {
      if (registro) {
        const perfil = await registrar(usuario, password);
        toast(`Cuenta creada. Hola, ${perfil.nombre}`, { tone: "success", icon: "check" });
      } else {
        const perfil = await entrar(usuario, password);
        toast(`Hola de nuevo, ${perfil.nombre}`, { tone: "success", icon: "check" });
      }
      setUsuario("");
      setPassword("");
      setPassword2("");
    } catch (err) {
      setError(err.message || "No se pudo completar");
    } finally {
      setOcupado(false);
    }
  };

  return (
    <Sheet style={{ maxWidth: 460 }}>
      <div className="auth-tabs" role="tablist" aria-label="Acceso">
        <button
          role="tab"
          aria-selected={!registro}
          className={`auth-tab${!registro ? " is-active" : ""}`}
          onClick={() => cambiarModo("entrar")}
        >
          Iniciar sesión
        </button>
        <button
          role="tab"
          aria-selected={registro}
          className={`auth-tab${registro ? " is-active" : ""}`}
          onClick={() => cambiarModo("registro")}
        >
          Crear cuenta
        </button>
      </div>

      <form className="stack" style={{ gap: 14 }} onSubmit={enviar}>
        <label className="field">
          <span>Usuario</span>
          <input
            className="input"
            name="username"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck="false"
            placeholder="cesar"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            maxLength={24}
          />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <div className="input-pass">
            <input
              className="input"
              type={verPass ? "text" : "password"}
              name="password"
              autoComplete={registro ? "new-password" : "current-password"}
              placeholder={registro ? "Al menos 6 caracteres" : "Tu contraseña"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              onClick={() => setVerPass((v) => !v)}
              aria-label={verPass ? "Ocultar la contraseña" : "Mostrar la contraseña"}
              title={verPass ? "Ocultar" : "Mostrar"}
            >
              <Icon name={verPass ? "eyeOff" : "eye"} size={17} />
            </button>
          </div>
        </label>

        {registro && (
          <label className="field">
            <span>Repite la contraseña</span>
            <input
              className="input"
              type={verPass ? "text" : "password"}
              name="password2"
              autoComplete="new-password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </label>
        )}

        {error && <p className="hint-text hint-danger">{error}</p>}

        <Button type="submit" variant="primary" icon={registro ? "check" : "user"} block disabled={ocupado}>
          {ocupado ? (registro ? "Creando…" : "Entrando…") : registro ? "Crear mi cuenta" : "Entrar"}
        </Button>

        <p className="hint-text">
          {registro
            ? "Tu avance de invitado (los temas que ya viste y tus repasos) se queda en la cuenta nueva."
            : "Al entrar, el progreso de esa cuenta reemplaza al que tengas ahora en este dispositivo."}
        </p>
      </form>
    </Sheet>
  );
}

/* ============================================================
   Sesión abierta
   ============================================================ */

function SesionCard({ toast }) {
  const user = getActiveUser();
  const estado = getCloudStatus();
  const [ocupado, setOcupado] = useState(false);
  const [cambiando, setCambiando] = useState(false);

  const guardar = async () => {
    setOcupado(true);
    const r = await guardarAhora();
    setOcupado(false);
    toast(r.ok ? "Progreso guardado" : r.message, {
      tone: r.ok ? "success" : "danger",
      icon: r.ok ? "check" : "alert",
      duration: r.ok ? 2600 : 6000
    });
  };

  const cerrar = async () => {
    setOcupado(true);
    await salir();
    setOcupado(false);
    toast("Sesión cerrada. Vuelves al modo invitado.", { icon: "logout" });
  };

  return (
    <Section title={`Sesión de ${user.nombre}`}>
      <p className="muted" style={{ maxWidth: "66ch" }}>
        Todo lo que estudies se guarda solo en tu cuenta. Para verlo en otro dispositivo, entra
        ahí con <span className="mono">@{user.usuario}</span> y tu contraseña.
      </p>

      {estado.modo === "error" && (
        <p className="hint-text hint-danger" style={{ marginTop: 10 }}>
          Último intento: {String(estado.mensaje).replace(/\.$/, "")}. Tu avance está a salvo en
          este dispositivo; se vuelve a intentar solo.
        </p>
      )}

      <div className="row-gap" style={{ marginTop: 16 }}>
        <Button variant="primary" icon="refresh" onClick={guardar} disabled={ocupado}>
          {ocupado ? "Guardando…" : "Guardar ahora"}
        </Button>
        <Button variant="solid" icon="settings" onClick={() => setCambiando((v) => !v)}>
          Cambiar contraseña
        </Button>
        <Button variant="ghost" icon="logout" onClick={cerrar} disabled={ocupado}>
          Cerrar sesión
        </Button>
      </div>

      {cambiando && <CambioPassword toast={toast} onListo={() => setCambiando(false)} />}
    </Section>
  );
}

function CambioPassword({ toast, onListo }) {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    setOcupado(true);
    try {
      await cambiarPassword(actual, nueva);
      toast("Contraseña cambiada", { tone: "success", icon: "check" });
      onListo();
    } catch (err) {
      setError(err.message || "No se pudo cambiar");
    } finally {
      setOcupado(false);
    }
  };

  return (
    <form className="stack" style={{ gap: 12, marginTop: 20, maxWidth: 420 }} onSubmit={enviar}>
      <label className="field">
        <span>Contraseña actual</span>
        <input
          className="input"
          type="password"
          autoComplete="current-password"
          value={actual}
          onChange={(e) => setActual(e.target.value)}
        />
      </label>
      <label className="field">
        <span>Contraseña nueva</span>
        <input
          className="input"
          type="password"
          autoComplete="new-password"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
        />
      </label>
      {error && <p className="hint-text hint-danger">{error}</p>}
      <div className="row-gap">
        <Button type="submit" variant="primary" icon="check" disabled={ocupado || !actual || !nueva}>
          {ocupado ? "Cambiando…" : "Guardar contraseña"}
        </Button>
        <Button type="button" variant="ghost" onClick={onListo}>Cancelar</Button>
      </div>
    </form>
  );
}
