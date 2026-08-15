/* ============================================================
   ACREDITA-BACH · Servidor de cuentas (Cloudflare Worker + KV)

   Este es el backend real de la app: guarda los usuarios, sus contraseñas
   (cifradas) y su progreso, para poder entrar desde cualquier dispositivo.
   Todo cabe en este archivo; no hay dependencias ni nada que instalar.

   CÓMO PONERLO EN LÍNEA (10 minutos, gratis, sin tarjeta)
   ------------------------------------------------------
   1. Entra a https://dash.cloudflare.com y crea una cuenta.
   2. Menú lateral → "Compute (Workers)" → "Create" → "Start with Hello World"
      → ponle un nombre (por ejemplo `acreditabach-cuentas`) → "Deploy".
   3. Ya creado, entra a "Edit code", borra lo que traiga y pega TODO este
      archivo. Botón "Deploy".
   4. Crea el almacén: menú lateral → "Storage & Databases" → "KV" →
      "Create instance" → nombre `acreditabach` → "Create".
   5. Enlázalo al Worker: Workers → tu worker → pestaña "Bindings" →
      "Add binding" → tipo "KV namespace" →
         Variable name: DB          (exactamente así, en mayúsculas)
         KV namespace:  acreditabach
      → "Deploy".
   6. Copia la dirección del worker (algo como
      https://acreditabach-cuentas.TU-USUARIO.workers.dev) y pégala en la app,
      en la pantalla de Cuenta.

   Para comprobar que quedó bien, abre en el navegador
   https://…workers.dev/salud → debe responder {"ok":true,"kv":true}.

   SEGURIDAD
   ---------
   · Las contraseñas NO se guardan: se guarda su huella PBKDF2-SHA256 con
     210 000 vueltas y una sal distinta por usuario.
   · La sesión es un token aleatorio de 256 bits guardado en KV, que caduca
     a los 180 días.
   · Comparaciones en tiempo constante para no filtrar información.
   · Límite de intentos por usuario: tras 10 fallos seguidos se bloquea el
     acceso 15 minutos.
   ============================================================ */

const ITERACIONES = 210000;
const TOKEN_DIAS = 180;
const MAX_FALLOS = 10;
const BLOQUEO_MIN = 15;
const MAX_PROGRESO_BYTES = 512 * 1024; // 512 kB por cuenta, de sobra

/* ---------------- Utilidades HTTP ---------------- */

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,PUT,OPTIONS",
  "access-control-allow-headers": "content-type,authorization",
  "access-control-max-age": "86400"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...CORS }
  });
}

function error(mensaje, status = 400) {
  return json({ error: mensaje }, status);
}

/* ---------------- Contraseñas ---------------- */

const enc = new TextEncoder();

function hex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomHex(bytes) {
  return hex(crypto.getRandomValues(new Uint8Array(bytes)));
}

async function hashPassword(password, saltHex, iteraciones = ITERACIONES) {
  const salt = Uint8Array.from(saltHex.match(/.{2}/g).map((h) => parseInt(h, 16)));
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: iteraciones },
    key,
    256
  );
  return hex(bits);
}

/** Comparación en tiempo constante (no revela en qué carácter falló). */
function igual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

/* ---------------- Validación ---------------- */

/** Normaliza el usuario: minúsculas y sin acentos (césar → cesar). */
function normalizarUsuario(valor) {
  const nfd = String(valor || "").trim().toLowerCase().normalize("NFD");
  let out = "";
  for (let i = 0; i < nfd.length; i++) {
    const code = nfd.charCodeAt(i);
    if (code < 0x300 || code > 0x36f) out += nfd[i]; // descarta las marcas de acento
  }
  return out;
}

function validarUsuario(usuario) {
  if (usuario.length < 3) return "El usuario necesita al menos 3 caracteres";
  if (usuario.length > 24) return "El usuario no puede pasar de 24 caracteres";
  if (!/^[a-z0-9._-]+$/.test(usuario)) return "El usuario solo admite letras, números, punto, guion y guion bajo";
  return null;
}

function validarPassword(password) {
  const p = String(password || "");
  if (p.length < 6) return "La contraseña necesita al menos 6 caracteres";
  if (p.length > 200) return "La contraseña es demasiado larga";
  return null;
}

/* ---------------- Acceso a KV ---------------- */

const claveUsuario = (u) => "user:" + u;
const claveToken = (t) => "token:" + t;

async function leerUsuario(env, usuario) {
  return env.DB.get(claveUsuario(usuario), "json");
}

async function guardarUsuario(env, usuario, datos) {
  await env.DB.put(claveUsuario(usuario), JSON.stringify(datos));
}

async function crearSesion(env, usuario) {
  const token = randomHex(32);
  await env.DB.put(claveToken(token), usuario, { expirationTtl: TOKEN_DIAS * 86400 });
  return token;
}

/** Devuelve { usuario, datos } o null si el token no vale. */
async function sesionDe(request, env) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;
  const usuario = await env.DB.get(claveToken(token));
  if (!usuario) return null;
  const datos = await leerUsuario(env, usuario);
  if (!datos) return null;
  return { usuario, datos, token };
}

/* ---------------- Respuesta pública de una cuenta ---------------- */

function perfil(datos) {
  return { usuario: datos.usuario, nombre: datos.nombre, creada: datos.creada };
}

/* ---------------- Rutas ---------------- */

async function registrar(request, env) {
  const body = await request.json().catch(() => null);
  if (!body) return error("Petición inválida");

  const usuario = normalizarUsuario(body.usuario);
  const problema = validarUsuario(usuario) || validarPassword(body.password);
  if (problema) return error(problema);

  if (await leerUsuario(env, usuario)) return error("Ese usuario ya está ocupado", 409);

  const salt = randomHex(16);
  const datos = {
    usuario,
    nombre: String(body.nombre || body.usuario || usuario).trim().slice(0, 32) || usuario,
    salt,
    iteraciones: ITERACIONES,
    hash: await hashPassword(body.password, salt),
    creada: new Date().toISOString(),
    fallos: 0,
    bloqueoHasta: null,
    progreso: body.progreso && typeof body.progreso === "object" ? body.progreso : null,
    progresoAl: new Date().toISOString()
  };

  await guardarUsuario(env, usuario, datos);
  const token = await crearSesion(env, usuario);
  return json({ token, perfil: perfil(datos), progreso: datos.progreso, progresoAl: datos.progresoAl });
}

async function entrar(request, env) {
  const body = await request.json().catch(() => null);
  if (!body) return error("Petición inválida");

  const usuario = normalizarUsuario(body.usuario);
  const datos = await leerUsuario(env, usuario);

  /* Si el usuario no existe se gasta el mismo tiempo que en un intento real,
     para que desde fuera no se pueda averiguar qué usuarios existen. */
  if (!datos) {
    await hashPassword(String(body.password || ""), randomHex(16));
    return error("Usuario o contraseña incorrectos", 401);
  }

  const ahora = Date.now();
  if (datos.bloqueoHasta && ahora < Date.parse(datos.bloqueoHasta)) {
    const min = Math.ceil((Date.parse(datos.bloqueoHasta) - ahora) / 60000);
    return error(`Demasiados intentos. Vuelve a intentar en ${min} min`, 429);
  }

  const hash = await hashPassword(String(body.password || ""), datos.salt, datos.iteraciones || ITERACIONES);
  if (!igual(hash, datos.hash)) {
    datos.fallos = (datos.fallos || 0) + 1;
    if (datos.fallos >= MAX_FALLOS) {
      datos.bloqueoHasta = new Date(ahora + BLOQUEO_MIN * 60000).toISOString();
      datos.fallos = 0;
    }
    await guardarUsuario(env, usuario, datos);
    return error("Usuario o contraseña incorrectos", 401);
  }

  datos.fallos = 0;
  datos.bloqueoHasta = null;
  await guardarUsuario(env, usuario, datos);

  const token = await crearSesion(env, usuario);
  return json({ token, perfil: perfil(datos), progreso: datos.progreso || null, progresoAl: datos.progresoAl || null });
}

async function salir(request, env) {
  const sesion = await sesionDe(request, env);
  if (sesion) await env.DB.delete(claveToken(sesion.token));
  return json({ ok: true });
}

async function leerProgreso(request, env) {
  const sesion = await sesionDe(request, env);
  if (!sesion) return error("Sesión caducada", 401);
  return json({
    perfil: perfil(sesion.datos),
    progreso: sesion.datos.progreso || null,
    progresoAl: sesion.datos.progresoAl || null
  });
}

async function escribirProgreso(request, env) {
  const sesion = await sesionDe(request, env);
  if (!sesion) return error("Sesión caducada", 401);

  const texto = await request.text();
  if (texto.length > MAX_PROGRESO_BYTES) return error("El progreso es demasiado grande", 413);

  let body;
  try {
    body = JSON.parse(texto);
  } catch (e) {
    return error("Petición inválida");
  }
  if (!body || typeof body.progreso !== "object" || body.progreso === null) return error("Falta el progreso");

  sesion.datos.progreso = body.progreso;
  sesion.datos.progresoAl = new Date().toISOString();
  await guardarUsuario(env, sesion.usuario, sesion.datos);
  return json({ ok: true, progresoAl: sesion.datos.progresoAl });
}

async function cambiarPassword(request, env) {
  const sesion = await sesionDe(request, env);
  if (!sesion) return error("Sesión caducada", 401);

  const body = await request.json().catch(() => null);
  if (!body) return error("Petición inválida");

  const problema = validarPassword(body.nueva);
  if (problema) return error(problema);

  const actual = await hashPassword(
    String(body.actual || ""),
    sesion.datos.salt,
    sesion.datos.iteraciones || ITERACIONES
  );
  if (!igual(actual, sesion.datos.hash)) return error("La contraseña actual no es correcta", 401);

  sesion.datos.salt = randomHex(16);
  sesion.datos.iteraciones = ITERACIONES;
  sesion.datos.hash = await hashPassword(body.nueva, sesion.datos.salt);
  await guardarUsuario(env, sesion.usuario, sesion.datos);
  return json({ ok: true });
}

/* ---------------- Entrada ---------------- */

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (!env || !env.DB) {
      return error("Falta enlazar el KV con el nombre DB (Worker → Bindings → KV namespace)", 500);
    }

    const ruta = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
    const metodo = request.method;

    try {
      if (ruta === "/salud" && metodo === "GET") return json({ ok: true, kv: true });
      if (ruta === "/registro" && metodo === "POST") return registrar(request, env);
      if (ruta === "/entrar" && metodo === "POST") return entrar(request, env);
      if (ruta === "/salir" && metodo === "POST") return salir(request, env);
      if (ruta === "/progreso" && metodo === "GET") return leerProgreso(request, env);
      if (ruta === "/progreso" && metodo === "PUT") return escribirProgreso(request, env);
      if (ruta === "/password" && metodo === "POST") return cambiarPassword(request, env);
      return error("Ruta no encontrada: " + ruta, 404);
    } catch (e) {
      return error("Error del servidor: " + (e && e.message ? e.message : String(e)), 500);
    }
  }
};
