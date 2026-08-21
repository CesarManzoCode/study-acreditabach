# Progreso, cuentas y sincronización

Dónde vive lo que estudias, qué pasa al registrarte o iniciar sesión, y cómo publicar el
servidor de cuentas.

---

## Tu progreso está a salvo

El avance vive en la llave `acreditabach_v1` de `localStorage`, con exactamente el mismo
formato desde la primera versión del sitio. Reglas que el código respeta siempre:

- Nada se migra, renombra ni reescribe: lo que ya está guardado se sigue leyendo igual.
- Las tarjetas se identifican por `tema::fcN`. **El contenido nuevo siempre se agrega al
  final**, así que `fc0` y `fc1` siguen siendo las mismas tarjetas de antes, con su
  intervalo, sus repeticiones y sus fechas intactos.
- Al registrarte, la cuenta nueva **hereda** el progreso del modo invitado, y la llave del
  invitado se queda como estaba: nunca se borra.
- Iniciar sesión **reemplaza** el progreso visible por el de esa cuenta (es lo que se
  espera de un login). Ya con la sesión abierta, lo que se baja del servidor se **mezcla**
  con lo local, para no perder lo estudiado sin conexión (ver `mergeStates` en
  [`src/lib/engine.js`](../src/lib/engine.js)).

Las preferencias de interfaz (tema claro/oscuro) se guardan aparte, en
`acreditabach_theme`, para no mezclarlas con el progreso.

En **Progreso → Tus datos** puedes descargar un respaldo `.json` y restaurarlo después.

---

## Cuentas

Login de verdad: usuario y contraseña, con el progreso guardado en un servidor propio.

- **Sin cuenta** estás en *modo invitado*: el avance se guarda en este navegador y punto.
- **Al registrarte**, tu avance de invitado se sube y queda como progreso inicial de la
  cuenta nueva.
- **Al iniciar sesión**, el progreso de la cuenta reemplaza al que hubiera en ese
  dispositivo.
- Con la sesión abierta, cada cambio se guarda solo en el servidor unos segundos después.
  Si el servidor no responde, se sigue estudiando en local y el error se muestra en
  pantalla; nada se pierde.
- **Al cerrar sesión** vuelves al progreso de invitado, que nunca se toca.

### Publicar el servidor de cuentas

GitHub Pages solo sirve archivos estáticos: no ejecuta código ni guarda datos. Por eso las
cuentas necesitan un servidor aparte. En [`server/cloudflare-worker.js`](../server/cloudflare-worker.js)
está completo y comentado paso a paso; es gratis y no pide tarjeta:

1. Crea una cuenta en [Cloudflare](https://dash.cloudflare.com).
2. **Compute (Workers) → Create → Deploy**, y en *Edit code* pega el archivo entero.
3. **Storage & Databases → KV → Create instance**, llámalo `acreditabach`.
4. En el Worker, **Bindings → Add binding → KV namespace**, con el nombre de variable `DB`.
5. Abre `https://…workers.dev/salud`: debe responder `{"ok":true,"kv":true}`.
6. Pega esa dirección en la app, en la pantalla **Cuenta**.

Para dejarla fija y que ningún dispositivo tenga que pegarla, pon la URL en
`SERVIDOR_POR_DEFECTO`, en `src/lib/accounts.js`, y reconstruye.

### Qué guarda y cómo

| Dato | Dónde | Cómo |
| --- | --- | --- |
| Contraseña | KV del Worker | Nunca sale del navegador: viaja ya estirada con PBKDF2-SHA256 y 210 000 vueltas (sal derivada del usuario), y el servidor guarda un SHA-256 de eso con su propia sal. |
| Sesión | KV del Worker | Token aleatorio de 256 bits, caduca a los 180 días. |
| Progreso | KV del Worker | Un JSON por cuenta, guardado tal cual, con copia local para poder estudiar sin conexión. |

El reparto del cifrado no es un capricho: el plan gratis de Workers da **10 ms de
CPU por petición**, y un PBKDF2 en condiciones cuesta bastante más. Haciéndolo en
el navegador el servidor queda con un SHA-256 (microsegundos), y de paso nunca
llega a ver la contraseña de verdad — el mismo reparto que usan los gestores de
contraseñas.

Además: comparación en tiempo constante al validar la contraseña, mismo mensaje y mismo
tiempo de respuesta cuando el usuario no existe (para no revelar qué cuentas hay), y
bloqueo de 15 minutos tras 10 intentos fallidos seguidos.
