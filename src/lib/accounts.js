/* ============================================================
   Cuentas locales (perfiles)

   Sistema deliberadamente simple: no hay contraseñas reales ni cifrado.
   Sirve para dos cosas:
     1. separar el progreso de varias personas en el mismo navegador;
     2. darle una identidad al progreso para poder sincronizarlo entre
        dispositivos (ver sync.js).

   COMPATIBILIDAD CON EL PROGRESO EXISTENTE
   ----------------------------------------
   Sin ninguna cuenta creada, el motor sigue leyendo y escribiendo la llave
   histórica `acreditabach_v1`, exactamente como antes. Al crear la primera
   cuenta se COPIA ese contenido al espacio de la cuenta; la llave histórica
   nunca se borra ni se reescribe, así que siempre queda como respaldo.
   ============================================================ */

export const LEGACY_KEY = "acreditabach_v1";
const REG_KEY = "acreditabach_users";

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

function emptyRegistry() {
  return { version: 1, active: null, users: [], space: null };
}

let REG = read();

function read() {
  try {
    const raw = localStorage.getItem(REG_KEY);
    if (!raw) return emptyRegistry();
    const parsed = JSON.parse(raw);
    const reg = Object.assign(emptyRegistry(), parsed);
    if (!Array.isArray(reg.users)) reg.users = [];
    if (reg.active && !reg.users.some((u) => u.slug === reg.active)) reg.active = null;
    return reg;
  } catch (e) {
    return emptyRegistry();
  }
}

function write() {
  try {
    localStorage.setItem(REG_KEY, JSON.stringify(REG));
  } catch (e) {
    console.warn("No se pudo guardar la lista de cuentas.", e);
  }
  emit();
}

/** Llave de localStorage donde vive el progreso de una cuenta. */
export function progressKeyFor(slug) {
  return slug ? LEGACY_KEY + "__" + slug : LEGACY_KEY;
}

export function getUsers() {
  return REG.users.slice();
}
export function getActiveSlug() {
  return REG.active;
}
export function getActiveUser() {
  return REG.users.find((u) => u.slug === REG.active) || null;
}
export function hasAccounts() {
  return REG.users.length > 0;
}

/* Quita acentos sin depender de un rango literal de marcas combinantes:
   NFD separa la letra de su acento y aquí se descartan los códigos 0x300-0x36F. */
function stripAccents(s) {
  let out = "";
  const nfd = String(s).normalize("NFD");
  for (let i = 0; i < nfd.length; i++) {
    const code = nfd.charCodeAt(i);
    if (code < 0x300 || code > 0x36f) out += nfd[i];
  }
  return out;
}

function slugify(name) {
  const base =
    stripAccents(String(name).toLowerCase())
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 24) || "yo";
  let slug = base;
  let n = 2;
  while (REG.users.some((u) => u.slug === slug)) slug = base + "-" + n++;
  return slug;
}

const AVATARS = ["#6366f1", "#06b6d4", "#f59e0b", "#a855f7", "#10b981", "#f43f5e", "#84cc16"];

/**
 * Crea una cuenta. La primera cuenta hereda el progreso que ya estaba
 * guardado en la llave histórica (sin borrarlo de ahí).
 */
export function createUser(name, pin = "") {
  const clean = String(name || "").trim().slice(0, 32) || "Yo";
  const slug = slugify(clean);
  const isFirst = REG.users.length === 0;
  const user = {
    slug,
    name: clean,
    pin: String(pin || "").slice(0, 12),
    color: AVATARS[REG.users.length % AVATARS.length],
    createdAt: new Date().toISOString()
  };
  REG.users.push(user);
  REG.active = slug;

  if (isFirst) {
    try {
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy && !localStorage.getItem(progressKeyFor(slug))) {
        localStorage.setItem(progressKeyFor(slug), legacy);
      }
    } catch (e) {
      console.warn("No se pudo heredar el progreso previo.", e);
    }
  }
  write();
  return user;
}

/** Da de alta (o actualiza) una cuenta que llegó del espacio remoto. */
export function upsertUser(user) {
  if (!user || !user.slug) return null;
  const existing = REG.users.find((u) => u.slug === user.slug);
  if (existing) {
    existing.name = user.name || existing.name;
    existing.color = user.color || existing.color;
    if (user.pin !== undefined) existing.pin = user.pin;
  } else {
    REG.users.push({
      slug: user.slug,
      name: user.name || user.slug,
      pin: user.pin || "",
      color: user.color || AVATARS[REG.users.length % AVATARS.length],
      createdAt: user.createdAt || new Date().toISOString()
    });
  }
  write();
  return REG.users.find((u) => u.slug === user.slug);
}

export function switchUser(slug) {
  if (slug !== null && !REG.users.some((u) => u.slug === slug)) return false;
  REG.active = slug;
  write();
  return true;
}

export function renameUser(slug, name) {
  const u = REG.users.find((x) => x.slug === slug);
  if (!u) return false;
  u.name = String(name || "").trim().slice(0, 32) || u.name;
  write();
  return true;
}

export function setUserPin(slug, pin) {
  const u = REG.users.find((x) => x.slug === slug);
  if (!u) return false;
  u.pin = String(pin || "").slice(0, 12);
  write();
  return true;
}

/** Borra la cuenta y su progreso. La llave histórica nunca se toca. */
export function deleteUser(slug) {
  const i = REG.users.findIndex((u) => u.slug === slug);
  if (i < 0) return false;
  REG.users.splice(i, 1);
  if (REG.active === slug) REG.active = REG.users.length ? REG.users[0].slug : null;
  try {
    localStorage.removeItem(progressKeyFor(slug));
  } catch (e) {}
  write();
  return true;
}

/* ---------------- Espacio de sincronización ----------------
   El "espacio" es el lugar remoto donde viven las cuentas y su progreso.
   Aquí solo se guarda la configuración; la lógica está en sync.js. */

export function getSpace() {
  return REG.space;
}

export function setSpace(space) {
  REG.space = space || null;
  write();
}

/** Marca de la última sincronización correcta, para mostrarla en la interfaz. */
export function markSynced(info) {
  if (!REG.space) return;
  REG.space = Object.assign({}, REG.space, { lastSync: new Date().toISOString() }, info || {});
  write();
}
