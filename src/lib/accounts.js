/* ============================================================
   Sesión de la cuenta

   Aquí solo vive el estado de la sesión: quién entró, con qué token y a qué
   servidor. Las llamadas al servidor y el manejo del progreso están en
   cloud.js (este archivo no toca el motor, para evitar importaciones
   circulares).

   MODOS
   -----
   · Invitado  — sin cuenta. El progreso se guarda en este navegador, en la
                 llave `acreditabach_v1`, igual que siempre.
   · Con sesión— el progreso vive en la cuenta. Localmente se guarda una copia
                 en `acreditabach_v1__<usuario>` para poder estudiar sin
                 conexión; el servidor es la fuente de verdad al entrar.
   ============================================================ */

export const LEGACY_KEY = "acreditabach_v1";
const SESSION_KEY = "acreditabach_sesion";
const SERVER_KEY = "acreditabach_servidor";

/* Dirección del servidor de cuentas (el Worker de server/cloudflare-worker.js).
   Si se deja vacía, la app pide la dirección una vez en la pantalla de Cuenta
   y la recuerda en este navegador. */
export const SERVIDOR_POR_DEFECTO = "";

const listeners = new Set();
let revision = 0;

export function subscribeAccounts(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function accountsRevision() {
  return revision;
}
function emit() {
  revision++;
  listeners.forEach((fn) => fn());
}

/* ---------------- Sesión ---------------- */

function leerSesion() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s && s.token && s.usuario ? s : null;
  } catch (e) {
    return null;
  }
}

let SESION = leerSesion();

/** { usuario, nombre, token } o null si estás en modo invitado. */
export function getSession() {
  return SESION;
}
export function getActiveUser() {
  return SESION ? { usuario: SESION.usuario, nombre: SESION.nombre || SESION.usuario } : null;
}
/** Identificador de la cuenta activa (null en modo invitado). Lo usa el motor. */
export function getActiveSlug() {
  return SESION ? SESION.usuario : null;
}
export function isGuest() {
  return !SESION;
}

export function setSession(sesion) {
  SESION = sesion && sesion.token && sesion.usuario ? sesion : null;
  try {
    if (SESION) localStorage.setItem(SESSION_KEY, JSON.stringify(SESION));
    else localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.warn("No se pudo guardar la sesión.", e);
  }
  emit();
}

/** Llave de localStorage donde vive la copia local del progreso. */
export function progressKeyFor(usuario) {
  return usuario ? LEGACY_KEY + "__" + usuario : LEGACY_KEY;
}

/* ---------------- Servidor ---------------- */

export function getServerUrl() {
  if (SERVIDOR_POR_DEFECTO) return SERVIDOR_POR_DEFECTO;
  try {
    return localStorage.getItem(SERVER_KEY) || "";
  } catch (e) {
    return "";
  }
}

export function setServerUrl(url) {
  const limpio = String(url || "").trim().replace(/\/+$/, "");
  try {
    if (limpio) localStorage.setItem(SERVER_KEY, limpio);
    else localStorage.removeItem(SERVER_KEY);
  } catch (e) {}
  emit();
  return limpio;
}

/** true cuando la app ya sabe a qué servidor hablarle. */
export function hasServer() {
  return !!getServerUrl();
}

/** El servidor está fijo en el código: no se puede cambiar desde la app. */
export function servidorFijo() {
  return !!SERVIDOR_POR_DEFECTO;
}
