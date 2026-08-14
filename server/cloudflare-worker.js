/* ============================================================
   Espacio de sincronización en Cloudflare Workers (plan gratuito)

   Alternativa al servidor de Node cuando no quieres tener una máquina
   encendida. Guarda el documento en un KV namespace.

   PASOS
   -----
   1. Crea un Worker en dash.cloudflare.com y pega este archivo.
   2. Crea un KV namespace y enlázalo al Worker con el nombre  ACREDITA.
   3. Publica y copia la URL, por ejemplo:
        https://acredita-sync.tu-usuario.workers.dev/space
   4. En la app: Ajustes → Sincronización → "Servidor propio" y pega la URL.

   La ruta es la llave: /space, /space/loquesea… cada una es un espacio
   distinto. Elige una difícil de adivinar si te importa que nadie más entre.
   ============================================================ */

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,PUT,OPTIONS",
  "access-control-allow-headers": "content-type"
};

const VACIO = { app: "acreditabach", version: 1, users: {} };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = "space:" + url.pathname;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method === "GET") {
      const stored = await env.ACREDITA.get(key);
      return new Response(stored || JSON.stringify({ ...VACIO, updatedAt: new Date().toISOString() }), {
        headers: { ...CORS, "content-type": "application/json; charset=utf-8" }
      });
    }

    if (request.method === "PUT") {
      const text = await request.text();
      try {
        JSON.parse(text);
      } catch (e) {
        return new Response('{"error":"JSON inválido"}', { status: 400, headers: CORS });
      }
      await env.ACREDITA.put(key, text);
      return new Response('{"ok":true}', {
        headers: { ...CORS, "content-type": "application/json" }
      });
    }

    return new Response(null, { status: 405, headers: CORS });
  }
};
