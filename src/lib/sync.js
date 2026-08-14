/* ============================================================
   Sincronización del progreso entre dispositivos

   IDEA
   ----
   Todo sigue funcionando sin conexión: localStorage es la fuente de verdad.
   El "espacio" es solo un documento JSON remoto con la forma:

     { app: "acreditabach", version: 1, updatedAt: ISO,
       users: { "<cuenta>": { name, color, pin, updatedAt, state } } }

   Al sincronizar se BAJA ese documento, se MEZCLA con lo local (mergeStates
   nunca pierde avance) y se SUBE el resultado. Si el servidor no responde,
   la app sigue igual y se muestra el error; nada se borra.

   SEGURIDAD
   ---------
   Deliberadamente mínima: el código del espacio es la única credencial y el
   PIN de cada cuenta solo evita cambiarse de perfil por accidente. Es un
   cuaderno de estudio personal, no un sistema con datos sensibles.

   PROVEEDORES
   -----------
   · local   — otro "dispositivo" simulado en el mismo navegador (pruebas).
   · rest    — cualquier URL que responda GET (leer) y PUT (escribir) JSON.
               Sirve para el servidor incluido en server/ y para bases tipo
               Firebase Realtime Database (URL terminada en .json).
   · jsonblob— jsonblob.com, sin registro: se crea un blob y su id es el código.
   · gist    — un Gist secreto de GitHub + token personal.
   ============================================================ */

import { getSpace, setSpace, markSynced, getUsers, getActiveSlug, progressKeyFor, upsertUser, switchUser } from "./accounts.js";
import { mergeStates, mergeIntoState, stateSnapshot } from "./engine.js";

/* ---------------- Estado observable de la sincronización ---------------- */

let STATUS = { state: "off", message: "", at: null, running: false };
const listeners = new Set();
let statusRevision = 0;

export function subscribeSync(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function syncRevision() { return statusRevision; }
export function getSyncStatus() { return STATUS; }

function setStatus(state, message) {
  STATUS = { state, message: message || "", at: new Date().toISOString(), running: state === "sync" };
  statusRevision++;
  listeners.forEach((fn) => fn());
}

/* ---------------- Códigos de espacio ---------------- */

function b64urlEncode(s) {
  return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(s) {
  const p = s.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(escape(atob(p + "===".slice((p.length + 3) % 4))));
}

/** Espacio → código que se escribe en el otro dispositivo. */
export function formatCode(space) {
  if (!space) return "";
  switch (space.provider) {
    case "local": return "local:" + space.id;
    case "jsonblob": return "jb:" + space.id;
    case "rest": return "url:" + b64urlEncode(space.url);
    case "gist": return "gh:" + space.id + ":" + space.token;
    default: return "";
  }
}

/** Código → configuración de espacio. Devuelve null si no se entiende. */
export function parseCode(code) {
  const raw = String(code || "").trim();
  if (!raw) return null;
  try {
    if (raw.startsWith("local:")) return { provider: "local", id: raw.slice(6) };
    if (raw.startsWith("jb:")) return { provider: "jsonblob", id: raw.slice(3) };
    if (raw.startsWith("url:")) return { provider: "rest", url: b64urlDecode(raw.slice(4)) };
    if (raw.startsWith("gh:")) {
      const rest = raw.slice(3);
      const i = rest.indexOf(":");
      if (i < 0) return null;
      return { provider: "gist", id: rest.slice(0, i), token: rest.slice(i + 1) };
    }
    // Comodidad: pegar una URL completa cuenta como proveedor rest.
    if (/^https?:\/\//i.test(raw)) return { provider: "rest", url: raw };
  } catch (e) {
    return null;
  }
  return null;
}

/* ---------------- Proveedores ---------------- */

const TIMEOUT_MS = 12000;

async function fetchJson(url, options) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, Object.assign({ signal: ctrl.signal }, options));
    if (!res.ok) throw new Error("El servidor respondió " + res.status);
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } finally {
    clearTimeout(t);
  }
}

const PROVIDERS = {
  local: {
    label: "Este navegador (prueba)",
    async create() {
      const id = "sp-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("acreditabach_space_" + id, JSON.stringify(emptyDoc()));
      return { provider: "local", id };
    },
    async read(space) {
      const raw = localStorage.getItem("acreditabach_space_" + space.id);
      return raw ? JSON.parse(raw) : null;
    },
    async write(space, doc) {
      localStorage.setItem("acreditabach_space_" + space.id, JSON.stringify(doc));
    }
  },

  rest: {
    label: "Servidor propio (URL)",
    async create(opts) {
      const url = String(opts && opts.url ? opts.url : "").trim();
      if (!url) throw new Error("Falta la dirección del servidor");
      const space = { provider: "rest", url };
      await PROVIDERS.rest.write(space, emptyDoc());
      return space;
    },
    async read(space) {
      return fetchJson(space.url, { method: "GET", headers: { accept: "application/json" } });
    },
    async write(space, doc) {
      await fetchJson(space.url, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(doc)
      });
    }
  },

  jsonblob: {
    label: "jsonblob.com (sin registro)",
    async create() {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      try {
        const res = await fetch("https://jsonblob.com/api/jsonBlob", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(emptyDoc()),
          signal: ctrl.signal
        });
        if (!res.ok) throw new Error("jsonblob respondió " + res.status);
        const loc = res.headers.get("location") || res.headers.get("Location") || "";
        const id = loc.split("/").filter(Boolean).pop();
        if (!id) throw new Error("jsonblob no devolvió el identificador del espacio");
        return { provider: "jsonblob", id };
      } finally {
        clearTimeout(t);
      }
    },
    async read(space) {
      return fetchJson("https://jsonblob.com/api/jsonBlob/" + space.id, {
        method: "GET",
        headers: { accept: "application/json" }
      });
    },
    async write(space, doc) {
      await fetchJson("https://jsonblob.com/api/jsonBlob/" + space.id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(doc)
      });
    }
  },

  gist: {
    label: "Gist de GitHub (con token)",
    async create(opts) {
      const token = String(opts && opts.token ? opts.token : "").trim();
      if (!token) throw new Error("Falta el token de GitHub");
      const body = {
        description: "ACREDITA-BACH · progreso de estudio",
        public: false,
        files: { "acreditabach.json": { content: JSON.stringify(emptyDoc(), null, 2) } }
      };
      const res = await fetchJson("https://api.github.com/gists", {
        method: "POST",
        headers: { authorization: "Bearer " + token, "content-type": "application/json", accept: "application/vnd.github+json" },
        body: JSON.stringify(body)
      });
      if (!res || !res.id) throw new Error("GitHub no devolvió el identificador del gist");
      return { provider: "gist", id: res.id, token };
    },
    async read(space) {
      const res = await fetchJson("https://api.github.com/gists/" + space.id, {
        method: "GET",
        headers: { authorization: "Bearer " + space.token, accept: "application/vnd.github+json" }
      });
      const file = res && res.files && res.files["acreditabach.json"];
      if (!file) return null;
      if (file.truncated && file.raw_url) return fetchJson(file.raw_url, { method: "GET" });
      return JSON.parse(file.content);
    },
    async write(space, doc) {
      await fetchJson("https://api.github.com/gists/" + space.id, {
        method: "PATCH",
        headers: { authorization: "Bearer " + space.token, "content-type": "application/json", accept: "application/vnd.github+json" },
        body: JSON.stringify({ files: { "acreditabach.json": { content: JSON.stringify(doc) } } })
      });
    }
  }
};

export function providerList() {
  return Object.keys(PROVIDERS).map((id) => ({ id, label: PROVIDERS[id].label }));
}

function emptyDoc() {
  return { app: "acreditabach", version: 1, updatedAt: new Date().toISOString(), users: {} };
}

function normalizeDoc(doc) {
  if (!doc || typeof doc !== "object") return emptyDoc();
  const out = emptyDoc();
  out.updatedAt = doc.updatedAt || out.updatedAt;
  out.users = doc.users && typeof doc.users === "object" ? doc.users : {};
  return out;
}

/* ---------------- Alta y baja del espacio ---------------- */

export async function createSpace(providerId, opts) {
  const p = PROVIDERS[providerId];
  if (!p) throw new Error("Proveedor desconocido: " + providerId);
  setStatus("sync", "Creando el espacio…");
  try {
    const space = await p.create(opts || {});
    setSpace(space);
    await syncNow();
    return space;
  } catch (e) {
    setStatus("error", e.message || String(e));
    throw e;
  }
}

export async function joinSpace(code) {
  const space = parseCode(code);
  if (!space) throw new Error("El código del espacio no se entiende");
  const p = PROVIDERS[space.provider];
  if (!p) throw new Error("Proveedor desconocido: " + space.provider);
  setStatus("sync", "Conectando…");
  try {
    const doc = await p.read(space);
    if (doc === null) throw new Error("No se encontró ningún espacio con ese código");
    setSpace(space);
    await syncNow();
    return space;
  } catch (e) {
    setStatus("error", e.message || String(e));
    throw e;
  }
}

export function leaveSpace() {
  setSpace(null);
  setStatus("off", "");
}

/* ---------------- Sincronización ---------------- */

function readUserState(slug) {
  try {
    const raw = localStorage.getItem(progressKeyFor(slug));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function writeUserState(slug, state) {
  try {
    localStorage.setItem(progressKeyFor(slug), JSON.stringify(state));
  } catch (e) {
    console.warn("No se pudo guardar el progreso sincronizado.", e);
  }
}

let enCurso = null;

/**
 * Baja, mezcla y sube. Nunca lanza si `silencioso`; el estado queda en STATUS.
 * @returns {Promise<{ok:boolean, message:string, cuentas:number}>}
 */
export async function syncNow({ silencioso = false } = {}) {
  const space = getSpace();
  if (!space) {
    setStatus("off", "");
    return { ok: false, message: "No hay espacio configurado", cuentas: 0 };
  }
  if (enCurso) return enCurso;

  const p = PROVIDERS[space.provider];
  if (!p) {
    setStatus("error", "Proveedor desconocido");
    return { ok: false, message: "Proveedor desconocido", cuentas: 0 };
  }

  enCurso = (async () => {
    setStatus("sync", "Sincronizando…");
    try {
      const doc = normalizeDoc(await p.read(space));
      const ahora = new Date().toISOString();

      // 1. Cuentas que solo existen en el espacio remoto: se crean aquí.
      Object.keys(doc.users).forEach((slug) => {
        if (slug === "__solo") return;
        const ru = doc.users[slug];
        upsertUser({ slug, name: ru.name, color: ru.color, pin: ru.pin, createdAt: ru.createdAt });
      });

      /* 2. Si este dispositivo todavía no tenía cuenta activa (acaba de entrar
         al espacio con un código), adopta la primera del espacio y le SUMA el
         progreso suelto que hubiera en la llave histórica, para no perderlo. */
      if (!getActiveSlug() && getUsers().length) {
        const primera = getUsers()[0];
        const suelto = readUserState(null);
        if (suelto) {
          writeUserState(primera.slug, mergeStates(readUserState(primera.slug), suelto));
        }
        switchUser(primera.slug);
      }

      // 3. Mezcla de cada cuenta local con su copia remota.
      const locales = getUsers();
      const objetivo = locales.length ? locales : [{ slug: null, name: "Yo", color: "#6366f1", pin: "" }];

      const activeSlug = getActiveSlug();
      objetivo.forEach((u) => {
        const remoto = doc.users[u.slug] ? doc.users[u.slug].state : null;
        let mezclado;
        if (u.slug === activeSlug) {
          mergeIntoState(remoto);          // la cuenta activa pasa por el motor
          mezclado = stateSnapshot();
        } else {
          mezclado = mergeStates(readUserState(u.slug), remoto);
          writeUserState(u.slug, mezclado);
        }
        if (u.slug) {
          doc.users[u.slug] = { name: u.name, color: u.color, pin: u.pin || "", updatedAt: ahora, state: mezclado };
        }
      });

      // Sin cuentas creadas, el progreso "suelto" viaja bajo una cuenta implícita.
      if (!locales.length) {
        const remoto = doc.users.__solo ? doc.users.__solo.state : null;
        mergeIntoState(remoto);
        doc.users.__solo = { name: "Yo", color: "#6366f1", pin: "", updatedAt: ahora, state: stateSnapshot() };
      }

      doc.updatedAt = ahora;
      await p.write(space, doc);
      markSynced({ users: Object.keys(doc.users).length });
      setStatus("ok", "Al día");
      return { ok: true, message: "Al día", cuentas: Object.keys(doc.users).length };
    } catch (e) {
      const msg = e && e.message ? e.message : String(e);
      setStatus("error", msg);
      if (!silencioso) console.warn("Falló la sincronización:", msg);
      return { ok: false, message: msg, cuentas: 0 };
    } finally {
      enCurso = null;
    }
  })();

  return enCurso;
}

/* ---------------- Sincronización automática ---------------- */

let temporizador = null;
let arrancado = false;

/** Programa una subida poco después del último cambio (para no escribir en cada tecla). */
export function scheduleSync(delay = 4000) {
  if (!getSpace()) return;
  clearTimeout(temporizador);
  temporizador = setTimeout(() => syncNow({ silencioso: true }), delay);
}

export function startAutoSync(subscribeEngine) {
  if (arrancado) return;
  arrancado = true;
  if (!getSpace()) return;

  syncNow({ silencioso: true });
  if (typeof subscribeEngine === "function") subscribeEngine(() => scheduleSync());

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") syncNow({ silencioso: true });
    else scheduleSync(200);
  });
  window.addEventListener("online", () => syncNow({ silencioso: true }));
}
