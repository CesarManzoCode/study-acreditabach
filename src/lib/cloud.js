/* ============================================================
   Cuentas contra el servidor

   Habla con el Worker de server/cloudflare-worker.js:

     POST /registro   { usuario, clave, nombre } → { token, perfil }
     POST /entrar     { usuario, clave }         → { token, perfil, progreso }
     POST /salir
     GET  /progreso                              → { perfil, progreso, progresoAl }
     PUT  /progreso   <el progreso, tal cual>
     POST /password   { actual, nueva }

   LA CONTRASEÑA NO SALE DE AQUÍ
   -----------------------------
   Lo que viaja no es la contraseña, sino su derivación PBKDF2-SHA256 con
   210 000 vueltas (`derivarClave`). Se hace en el navegador por dos razones:
   el servidor gratuito solo tiene 10 ms de CPU por petición, y así el
   servidor nunca llega a ver la contraseña de verdad.

   REGLAS DE PROGRESO (las que pediste)
   ------------------------------------
   · Sin cuenta estás en modo invitado y todo se guarda en este navegador.
   · Al REGISTRARTE, tu progreso de invitado se sube y queda como progreso
     inicial de la cuenta.
   · Al ENTRAR, el progreso de la cuenta REEMPLAZA lo que hubiera en este
     dispositivo.
   · Con la sesión abierta, cada cambio se guarda solo en el servidor (unos
     segundos después, no en cada tecla).
   · Al SALIR vuelves al progreso de invitado, que nunca se toca.
   ============================================================ */

import {
  getServerUrl, getSession, setSession, progressKeyFor, isGuest
} from "./accounts.js";
import { stateSnapshot, replaceState, mergeIntoState, resetProgress } from "./engine.js";

/* ---------------- Estado observable ---------------- */

/** invitado · listo · guardando · error · sin-servidor */
let ESTADO = { modo: "invitado", mensaje: "", al: null };
const listeners = new Set();
let revision = 0;

export function subscribeCloud(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function cloudRevision() {
  return revision;
}
export function getCloudStatus() {
  return ESTADO;
}
function setEstado(modo, mensaje) {
  ESTADO = { modo, mensaje: mensaje || "", al: new Date().toISOString() };
  revision++;
  listeners.forEach((fn) => fn());
}

/* ---------------- Llamadas ---------------- */

const TIMEOUT_MS = 15000;

class ErrorServidor extends Error {
  constructor(mensaje, status) {
    super(mensaje);
    this.status = status;
  }
}

async function pedir(ruta, { method = "GET", body, auth = false } = {}) {
  const base = getServerUrl();
  if (!base) throw new ErrorServidor("Todavía no has conectado el servidor de cuentas", 0);

  const headers = {};
  if (body !== undefined) headers["content-type"] = "application/json";
  if (auth) {
    const s = getSession();
    if (!s) throw new ErrorServidor("No hay sesión abierta", 401);
    headers.authorization = "Bearer " + s.token;
  }

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  let res;
  try {
    res = await fetch(base + ruta, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: ctrl.signal
    });
  } catch (e) {
    throw new ErrorServidor(
      e && e.name === "AbortError"
        ? "El servidor tardó demasiado en responder"
        : "No se pudo conectar con el servidor. Revisa tu internet o la dirección del servidor.",
      0
    );
  } finally {
    clearTimeout(t);
  }

  const texto = await res.text();
  let datos = null;
  try {
    datos = texto ? JSON.parse(texto) : null;
  } catch (e) {
    throw new ErrorServidor("El servidor respondió algo que no se entiende", res.status);
  }

  if (!res.ok) {
    const msg = (datos && datos.error) || "El servidor respondió " + res.status;
    if (res.status === 401 && ruta !== "/entrar" && ruta !== "/password") caducar();
    throw new ErrorServidor(msg, res.status);
  }
  return datos;
}

/** La sesión dejó de valer: se vuelve a modo invitado sin borrar nada. */
function caducar() {
  if (!getSession()) return;
  setSession(null);
  setEstado("error", "Tu sesión caducó. Vuelve a iniciar sesión.");
}

/* ---------------- Copia local del progreso ---------------- */

function escribirCopiaLocal(usuario, progreso) {
  try {
    if (progreso) localStorage.setItem(progressKeyFor(usuario), JSON.stringify(progreso));
    else localStorage.removeItem(progressKeyFor(usuario));
  } catch (e) {
    console.warn("No se pudo guardar la copia local del progreso.", e);
  }
}

/* ---------------- Validación (igual que la del servidor) ---------------- */

export function normalizarUsuario(valor) {
  const nfd = String(valor || "").trim().toLowerCase().normalize("NFD");
  let out = "";
  for (let i = 0; i < nfd.length; i++) {
    const code = nfd.charCodeAt(i);
    if (code < 0x300 || code > 0x36f) out += nfd[i];
  }
  return out;
}

export function problemaUsuario(usuario) {
  const u = normalizarUsuario(usuario);
  if (u.length < 3) return "El usuario necesita al menos 3 caracteres";
  if (u.length > 24) return "El usuario no puede pasar de 24 caracteres";
  if (!/^[a-z0-9._-]+$/.test(u)) return "Solo letras, números, punto, guion y guion bajo";
  return null;
}

export function problemaPassword(password) {
  const p = String(password || "");
  if (p.length < 6) return "La contraseña necesita al menos 6 caracteres";
  return null;
}

/* ---------------- Derivación de la contraseña ---------------- */

const ITERACIONES = 210000;
const enc = new TextEncoder();

function hex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Convierte la contraseña en la clave de 64 caracteres que viaja al servidor.
 * La sal sale del propio usuario, para que salga igual en cualquier
 * dispositivo sin tener que pedírsela antes al servidor.
 */
async function derivarClave(usuario, password) {
  if (!globalThis.crypto || !crypto.subtle) {
    throw new ErrorServidor("Este navegador no puede cifrar la contraseña (hace falta una conexión segura)", 0);
  }
  const salt = await crypto.subtle.digest("SHA-256", enc.encode("acreditabach|" + normalizarUsuario(usuario)));
  const key = await crypto.subtle.importKey("raw", enc.encode(String(password)), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: new Uint8Array(salt), iterations: ITERACIONES },
    key,
    256
  );
  return hex(bits);
}

/* ---------------- Registro, entrada y salida ---------------- */

/**
 * Crea la cuenta y se queda con el progreso que llevabas como invitado.
 * @returns {Promise<{usuario:string, nombre:string}>}
 */
export async function registrar(usuario, password, nombre) {
  const u = normalizarUsuario(usuario);
  const problema = problemaUsuario(u) || problemaPassword(password);
  if (problema) throw new ErrorServidor(problema, 0);

  // El progreso que se hereda es el que se está viendo ahora mismo.
  const progreso = stateSnapshot();

  setEstado("guardando", "Creando la cuenta…");
  const clave = await derivarClave(u, password);
  const r = await pedir("/registro", {
    method: "POST",
    body: { usuario: u, clave, nombre: nombre || usuario }
  }).catch((e) => {
    setEstado(isGuest() ? "invitado" : "error", e.message);
    throw e;
  });

  // La copia local de la cuenta arranca con el progreso heredado.
  escribirCopiaLocal(r.perfil.usuario, progreso);
  setSession({ usuario: r.perfil.usuario, nombre: r.perfil.nombre, token: r.token });

  // Y ese mismo progreso es lo primero que se sube a la cuenta nueva.
  await guardarAhora();
  return r.perfil;
}

/**
 * Entra a una cuenta. El progreso de la cuenta REEMPLAZA al de este dispositivo.
 */
export async function entrar(usuario, password) {
  const u = normalizarUsuario(usuario);
  if (!u || !password) throw new ErrorServidor("Escribe tu usuario y tu contraseña", 0);

  setEstado("guardando", "Entrando…");
  const clave = await derivarClave(u, password);
  const r = await pedir("/entrar", { method: "POST", body: { usuario: u, clave } }).catch((e) => {
    setEstado(isGuest() ? "invitado" : "error", e.message);
    throw e;
  });

  escribirCopiaLocal(r.perfil.usuario, r.progreso);
  setSession({ usuario: r.perfil.usuario, nombre: r.perfil.nombre, token: r.token });

  /* setSession hace que el motor cargue la copia local de esta cuenta. Si la
     cuenta venía sin progreso, se empieza de cero (y no se hereda nada de lo
     que hubiera antes en la pantalla). */
  if (!r.progreso) resetProgress();
  else replaceState(r.progreso);

  setEstado("listo", "Sesión iniciada");
  return r.perfil;
}

/** Cierra la sesión y vuelve al progreso de invitado. */
export async function salir() {
  try {
    await pedir("/salir", { method: "POST", auth: true });
  } catch (e) {
    // Da igual si el servidor no contesta: la sesión se cierra aquí de todos modos.
  }
  setSession(null);
  setEstado("invitado", "");
}

export async function cambiarPassword(actual, nueva) {
  const problema = problemaPassword(nueva);
  if (problema) throw new ErrorServidor(problema, 0);
  const s = getSession();
  if (!s) throw new ErrorServidor("No hay sesión abierta", 401);
  await pedir("/password", {
    method: "POST",
    auth: true,
    body: {
      actual: await derivarClave(s.usuario, actual),
      nueva: await derivarClave(s.usuario, nueva)
    }
  });
  return true;
}

/** Comprueba que la dirección del servidor responde antes de guardarla. */
export async function probarServidor(url) {
  const base = String(url || "").trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(base)) throw new ErrorServidor("La dirección debe empezar con https://", 0);
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(base + "/salud", { signal: ctrl.signal });
    const datos = await res.json().catch(() => null);
    if (!res.ok || !datos || !datos.ok) {
      throw new ErrorServidor(
        (datos && datos.error) || "Esa dirección respondió " + res.status + ", pero no es el servidor de cuentas",
        res.status
      );
    }
    return base;
  } catch (e) {
    if (e instanceof ErrorServidor) throw e;
    throw new ErrorServidor("No se pudo conectar con esa dirección", 0);
  } finally {
    clearTimeout(t);
  }
}

/* ---------------- Guardado automático ---------------- */

let temporizador = null;
let subiendo = null;

/** Sube el progreso actual. No lanza: deja el resultado en el estado. */
export async function guardarAhora() {
  if (isGuest()) return { ok: true };
  if (subiendo) return subiendo;

  subiendo = (async () => {
    setEstado("guardando", "Guardando…");
    try {
      // El progreso va como cuerpo entero: el servidor lo guarda tal cual.
      await pedir("/progreso", { method: "PUT", auth: true, body: stateSnapshot() });
      setEstado("listo", "Guardado en tu cuenta");
      return { ok: true };
    } catch (e) {
      setEstado("error", e.message);
      return { ok: false, message: e.message };
    } finally {
      subiendo = null;
    }
  })();

  return subiendo;
}

/** Programa una subida poco después del último cambio. */
function guardarPronto(retraso = 2500) {
  if (isGuest()) return;
  clearTimeout(temporizador);
  temporizador = setTimeout(guardarAhora, retraso);
}

/** Al abrir la app: baja lo de la cuenta, lo mezcla con lo local y lo vuelve a subir. */
export async function ponerseAlDia() {
  if (isGuest()) {
    setEstado("invitado", "");
    return;
  }
  setEstado("guardando", "Buscando tu progreso…");
  try {
    const r = await pedir("/progreso", { auth: true });
    /* Mismo usuario en los dos lados: se mezcla para no perder lo estudiado
       sin conexión. (El reemplazo total solo pasa al iniciar sesión.) */
    if (r.progreso) mergeIntoState(r.progreso);
    await guardarAhora();
  } catch (e) {
    setEstado("error", e.message);
  }
}

let arrancado = false;

export function startCloud(subscribeEngine) {
  if (arrancado) return;
  arrancado = true;

  if (isGuest()) setEstado("invitado", "");
  else ponerseAlDia();

  if (typeof subscribeEngine === "function") subscribeEngine(() => guardarPronto());

  document.addEventListener("visibilitychange", () => {
    if (isGuest()) return;
    if (document.visibilityState === "hidden") guardarPronto(150);
    else ponerseAlDia();
  });
  window.addEventListener("online", () => {
    if (!isGuest()) guardarAhora();
  });
}
