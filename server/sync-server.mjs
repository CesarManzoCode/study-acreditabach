/* ============================================================
   Servidor de sincronización mínimo (sin dependencias)

   Guarda un solo archivo JSON con todas las cuentas y su progreso.
   Es lo que espera el proveedor "rest" de la app: GET para leer, PUT
   para escribir.

     node server/sync-server.mjs                  → http://localhost:8787/space
     PORT=9000 DATA=/ruta/datos.json node server/sync-server.mjs

   En la app: Ajustes → Sincronización → "Servidor propio" y pega la URL.
   Si el servidor y el sitio están en dominios distintos, el CORS abierto de
   abajo ya lo permite.

   Seguridad: ninguna, a propósito. Si lo expones a internet, ponle al menos
   un token en la ruta (por ejemplo /space/mi-palabra-secreta): cualquiera que
   conozca la URL puede leer y escribir el progreso.
   ============================================================ */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = Number(process.env.PORT || 8787);
const DATA = process.env.DATA || path.join(process.cwd(), "server", "data.json");
const MAX_BODY = 8 * 1024 * 1024; // 8 MB

function leer() {
  try {
    return fs.readFileSync(DATA, "utf8");
  } catch (e) {
    return JSON.stringify({ app: "acreditabach", version: 1, updatedAt: new Date().toISOString(), users: {} });
  }
}

function escribir(texto) {
  fs.mkdirSync(path.dirname(DATA), { recursive: true });
  // Escritura atómica: primero a un temporal y luego rename, para que una
  // caída a media escritura no deje el archivo de progreso corrupto.
  const tmp = DATA + ".tmp";
  fs.writeFileSync(tmp, texto);
  fs.renameSync(tmp, DATA);
}

const server = http.createServer((req, res) => {
  const cors = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,PUT,OPTIONS",
    "access-control-allow-headers": "content-type"
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, cors);
    res.end();
    return;
  }

  if (req.method === "GET") {
    res.writeHead(200, Object.assign({ "content-type": "application/json; charset=utf-8" }, cors));
    res.end(leer());
    return;
  }

  if (req.method === "PUT") {
    let body = "";
    let abortado = false;
    req.on("data", (c) => {
      body += c;
      if (body.length > MAX_BODY) {
        abortado = true;
        res.writeHead(413, cors);
        res.end();
        req.destroy();
      }
    });
    req.on("end", () => {
      if (abortado) return;
      try {
        JSON.parse(body); // se valida antes de tocar el archivo
        escribir(body);
        res.writeHead(200, Object.assign({ "content-type": "application/json" }, cors));
        res.end('{"ok":true}');
      } catch (e) {
        res.writeHead(400, Object.assign({ "content-type": "application/json" }, cors));
        res.end('{"error":"JSON inválido"}');
      }
    });
    return;
  }

  res.writeHead(405, cors);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Espacio de sincronización en http://localhost:${PORT}`);
  console.log(`Datos en ${DATA}`);
});
