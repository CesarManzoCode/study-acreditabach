/* ============================================================
   Figuras de los reactivos

   El examen no es solo texto. La guía pide, con todas sus letras,
   identificar ICONOS de procesador de texto y de presentaciones (2.3.2 y
   2.3.3), el CUADRO DE PUNNETT que corresponde a una descendencia (5.7.3),
   la DESIGUALDAD que corresponde a un intervalo REPRESENTADO EN UNA GRÁFICA
   (1.6.1), los máximos y mínimos de una GRÁFICA de función (1.6.2) y las
   características del porfiriato representadas en OBRAS PICTÓRICAS (3.2.7).
   Todo eso se practicaba aquí solo con palabras.

   Un reactivo puede traer `figura: {tipo, ...}` y se dibuja con SVG en línea
   (nada externo: la app funciona sin conexión). Los esquemas de obra pictórica
   se rotulan como esquemas — no son la obra, son su composición — porque el
   punto del reactivo es reconocer qué representa la escena, no la pincelada.
   ============================================================ */

const T = "var(--text)";
const M = "var(--text-2)";
const B = "var(--accent)";
const L = "var(--line)";

function Marco({ children, alto = 150, ancho = 320, caption, viewBox }) {
  return (
    <figure className="figura">
      <svg
        viewBox={viewBox || `0 0 ${ancho} ${alto}`}
        className="figura-svg"
        role="img"
        aria-label={caption || "Figura del reactivo"}
      >
        {children}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* ---------------- Recta numérica con un intervalo ----------------
   figura: { tipo:"recta", min, max, a, b, abiertoA, abiertoB, infinito:"izq"|"der" } */

function Recta({ min = -6, max = 6, a, b, abiertoA = false, abiertoB = false, infinito }) {
  const W = 320, H = 74, pad = 22;
  const px = (v) => pad + ((v - min) / (max - min)) * (W - pad * 2);
  const y = 40;
  const ticks = [];
  for (let v = Math.ceil(min); v <= max; v++) ticks.push(v);

  const desdeX = infinito === "izq" ? pad : px(a);
  const hastaX = infinito === "der" ? W - pad : px(b);

  return (
    <Marco alto={H} caption="Intervalo representado en la recta numérica">
      <line x1={pad - 10} y1={y} x2={W - pad + 10} y2={y} stroke={L} strokeWidth="1.5" />
      <path d={`M${pad - 10},${y} l6,-4 v8 z`} fill={L} />
      <path d={`M${W - pad + 10},${y} l-6,-4 v8 z`} fill={L} />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={px(v)} y1={y - 4} x2={px(v)} y2={y + 4} stroke={L} strokeWidth="1.5" />
          <text x={px(v)} y={y + 18} textAnchor="middle" fontSize="9" fill={M}>{v}</text>
        </g>
      ))}
      <line x1={desdeX} y1={y} x2={hastaX} y2={y} stroke={B} strokeWidth="4" strokeLinecap="round" />
      {infinito !== "izq" && (
        <circle cx={px(a)} cy={y} r="5" fill={abiertoA ? "var(--bg)" : B} stroke={B} strokeWidth="2.5" />
      )}
      {infinito !== "der" && (
        <circle cx={px(b)} cy={y} r="5" fill={abiertoB ? "var(--bg)" : B} stroke={B} strokeWidth="2.5" />
      )}
    </Marco>
  );
}

/* ---------------- Plano cartesiano con una curva ----------------
   figura: { tipo:"plano", puntos:[[x,y]...], xmin,xmax,ymin,ymax, marcas:[{x,y,txt}] } */

function Plano({ puntos = [], xmin = -5, xmax = 5, ymin = -5, ymax = 5, marcas = [], caption }) {
  const W = 300, H = 210, pad = 18;
  const px = (v) => pad + ((v - xmin) / (xmax - xmin)) * (W - pad * 2);
  const py = (v) => H - pad - ((v - ymin) / (ymax - ymin)) * (H - pad * 2);
  const d = puntos.map(([x, y], i) => `${i ? "L" : "M"}${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(" ");

  const gx = [];
  for (let v = Math.ceil(xmin); v <= xmax; v++) gx.push(v);
  const gy = [];
  for (let v = Math.ceil(ymin); v <= ymax; v++) gy.push(v);

  return (
    <Marco alto={H} ancho={W} caption={caption || "Gráfica de la función"}>
      {gx.map((v) => (
        <line key={"x" + v} x1={px(v)} y1={pad} x2={px(v)} y2={H - pad} stroke={L} strokeWidth="0.5" opacity="0.5" />
      ))}
      {gy.map((v) => (
        <line key={"y" + v} x1={pad} y1={py(v)} x2={W - pad} y2={py(v)} stroke={L} strokeWidth="0.5" opacity="0.5" />
      ))}
      <line x1={pad} y1={py(0)} x2={W - pad} y2={py(0)} stroke={M} strokeWidth="1.3" />
      <line x1={px(0)} y1={pad} x2={px(0)} y2={H - pad} stroke={M} strokeWidth="1.3" />
      <text x={W - pad} y={py(0) - 5} textAnchor="end" fontSize="10" fill={M}>x</text>
      <text x={px(0) + 6} y={pad + 9} fontSize="10" fill={M}>y</text>
      {gx.filter((v) => v !== 0 && v % 2 === 0).map((v) => (
        <text key={"tx" + v} x={px(v)} y={py(0) + 12} textAnchor="middle" fontSize="8" fill={M}>{v}</text>
      ))}
      {gy.filter((v) => v !== 0 && v % 2 === 0).map((v) => (
        <text key={"ty" + v} x={px(0) - 6} y={py(v) + 3} textAnchor="end" fontSize="8" fill={M}>{v}</text>
      ))}
      {d && <path d={d} fill="none" stroke={B} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}
      {marcas.map((m, i) => (
        <g key={i}>
          <circle cx={px(m.x)} cy={py(m.y)} r="4" fill={B} stroke="var(--bg)" strokeWidth="1.5" />
          {m.txt && <text x={px(m.x) + 7} y={py(m.y) - 6} fontSize="9" fill={T}>{m.txt}</text>}
        </g>
      ))}
    </Marco>
  );
}

/* ---------------- Cuadro de Punnett ----------------
   figura: { tipo:"punnett", filas:["A","a"], cols:["A","a"], celdas:[[..]], caption } */

function Punnett({ filas = [], cols = [], celdas, caption }) {
  const cel = 44, hdr = 30;
  const W = hdr + cols.length * cel + 4;
  const H = hdr + filas.length * cel + 4;
  /* Sin `celdas`, se combinan alelo de fila + alelo de columna con la
     convención de siempre escribir primero el dominante (mayúscula). */
  const combinar = (f, c) => (c === c.toUpperCase() && f !== f.toUpperCase() ? c + f : f + c);
  const contenido = celdas || filas.map((f) => cols.map((c) => combinar(f, c)));

  return (
    <Marco alto={H} ancho={W} caption={caption || "Cuadro de Punnett"}>
      {cols.map((c, j) => (
        <text key={"c" + j} x={hdr + j * cel + cel / 2} y={hdr - 9} textAnchor="middle" fontSize="15" fontWeight="700" fill={B}>{c}</text>
      ))}
      {filas.map((f, i) => (
        <text key={"f" + i} x={hdr - 9} y={hdr + i * cel + cel / 2 + 5} textAnchor="end" fontSize="15" fontWeight="700" fill={B}>{f}</text>
      ))}
      {filas.map((f, i) =>
        cols.map((c, j) => (
          <g key={i + "-" + j}>
            <rect
              x={hdr + j * cel} y={hdr + i * cel} width={cel} height={cel}
              fill="none" stroke={L} strokeWidth="1.5"
            />
            <text
              x={hdr + j * cel + cel / 2} y={hdr + i * cel + cel / 2 + 5}
              textAnchor="middle" fontSize="15" fill={T}
            >
              {(contenido[i] || [])[j] ?? ""}
            </text>
          </g>
        ))
      )}
    </Marco>
  );
}

/* ---------------- Iconos de software de oficina ----------------

   La guía pide identificar el icono que inserta una tabla, ajusta márgenes,
   divide el texto en columnas, inserta un gráfico, una imagen o WordArt. Estos
   son esquemas de esos iconos: no reproducen la marca de ningún programa,
   conservan la forma con la que se reconocen en cualquier cinta de opciones.
   figura: { tipo:"iconos", items:["tabla","margenes","columnas"] } */

const GLIFOS = {
  tabla: (
    <g>
      <rect x="6" y="8" width="36" height="30" rx="2.5" />
      <line x1="6" y1="18" x2="42" y2="18" />
      <line x1="6" y1="28" x2="42" y2="28" />
      <line x1="18" y1="8" x2="18" y2="38" />
      <line x1="30" y1="8" x2="30" y2="38" />
    </g>
  ),
  margenes: (
    <g>
      <rect x="8" y="5" width="32" height="38" rx="2" />
      <rect x="15" y="12" width="18" height="24" strokeDasharray="3 2.5" />
      <line x1="15" y1="9" x2="15" y2="5" />
      <line x1="33" y1="9" x2="33" y2="5" />
    </g>
  ),
  columnas: (
    <g>
      <rect x="6" y="8" width="15" height="30" rx="1.5" />
      <rect x="27" y="8" width="15" height="30" rx="1.5" />
      <line x1="9" y1="14" x2="18" y2="14" />
      <line x1="9" y1="20" x2="18" y2="20" />
      <line x1="30" y1="14" x2="39" y2="14" />
      <line x1="30" y1="20" x2="39" y2="20" />
    </g>
  ),
  grafico: (
    <g>
      <line x1="8" y1="40" x2="42" y2="40" />
      <line x1="8" y1="40" x2="8" y2="7" />
      <rect x="14" y="26" width="7" height="14" />
      <rect x="24" y="17" width="7" height="23" />
      <rect x="34" y="22" width="7" height="18" />
    </g>
  ),
  imagen: (
    <g>
      <rect x="6" y="9" width="36" height="28" rx="2.5" />
      <circle cx="16" cy="18" r="3.5" />
      <path d="M9 34 l10-11 8 8 5-5 9 8" />
    </g>
  ),
  wordart: (
    <g>
      <text x="24" y="32" textAnchor="middle" fontSize="24" fontWeight="800" fill="currentColor" stroke="none">A</text>
      <path d="M8 38 q16 6 32 0" />
    </g>
  ),
  cuestionario: (
    <g>
      <rect x="9" y="6" width="30" height="36" rx="2.5" />
      <circle cx="16" cy="16" r="2.5" />
      <line x1="22" y1="16" x2="33" y2="16" />
      <circle cx="16" cy="24" r="2.5" />
      <line x1="22" y1="24" x2="33" y2="24" />
      <circle cx="16" cy="32" r="2.5" />
      <line x1="22" y1="32" x2="33" y2="32" />
    </g>
  ),
  vinetas: (
    <g>
      <circle cx="10" cy="14" r="2.5" fill="currentColor" />
      <circle cx="10" cy="24" r="2.5" fill="currentColor" />
      <circle cx="10" cy="34" r="2.5" fill="currentColor" />
      <line x1="18" y1="14" x2="41" y2="14" />
      <line x1="18" y1="24" x2="41" y2="24" />
      <line x1="18" y1="34" x2="41" y2="34" />
    </g>
  ),
  saltoPagina: (
    <g>
      <rect x="9" y="5" width="30" height="14" rx="1.5" />
      <rect x="9" y="29" width="30" height="14" rx="1.5" />
      <line x1="5" y1="24" x2="43" y2="24" strokeDasharray="4 3" />
    </g>
  ),
  interlineado: (
    <g>
      <line x1="19" y1="10" x2="42" y2="10" />
      <line x1="19" y1="19" x2="42" y2="19" />
      <line x1="19" y1="29" x2="42" y2="29" />
      <line x1="19" y1="38" x2="42" y2="38" />
      <path d="M10 8 v32 M6 12 l4-4 4 4 M6 36 l4 4 4-4" />
    </g>
  ),
  transicion: (
    <g>
      <rect x="5" y="12" width="17" height="24" rx="1.5" />
      <rect x="26" y="12" width="17" height="24" rx="1.5" strokeDasharray="3 2.5" />
      <path d="M20 24 h8 m-3-3 l3 3 -3 3" />
    </g>
  ),
  formula: (
    <g>
      <path d="M12 10 h20 l-13 14 13 14 h-20" />
    </g>
  ),
  hipervinculo: (
    <g>
      <path d="M20 28 a8 8 0 0 1 0-11 l5-5 a8 8 0 0 1 11 11 l-3 3" />
      <path d="M28 20 a8 8 0 0 1 0 11 l-5 5 a8 8 0 0 1-11-11 l3-3" />
    </g>
  )
};

const NOMBRE_GLIFO = {
  tabla: "Insertar tabla",
  margenes: "Márgenes",
  columnas: "Columnas",
  grafico: "Insertar gráfico",
  imagen: "Insertar imagen",
  wordart: "WordArt",
  cuestionario: "Cuestionario",
  vinetas: "Viñetas",
  saltoPagina: "Salto de página",
  interlineado: "Interlineado",
  transicion: "Transición",
  formula: "Insertar ecuación",
  hipervinculo: "Hipervínculo"
};

function Iconos({ items = [], etiquetas = ["A", "B", "C"], caption }) {
  const cel = 96;
  const W = items.length * cel;
  return (
    <Marco alto={104} ancho={W} caption={caption || "Iconos de la cinta de opciones (esquema)"}>
      {items.map((k, i) => (
        <g key={i} transform={`translate(${i * cel + (cel - 62) / 2}, 6)`}>
          <rect x="0" y="0" width="62" height="62" rx="10" fill="none" stroke={L} strokeWidth="1.5" />
          <g
            transform="translate(7,7)"
            fill="none"
            stroke="currentColor"
            color={T}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {GLIFOS[k] || null}
          </g>
          <text x="31" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill={B}>{etiquetas[i]}</text>
        </g>
      ))}
    </Marco>
  );
}

/* ---------------- Hoja de respuestas de lector óptico ----------------
   figura: { tipo:"hoja", filas:[{n, marca:"A"|"B"|"C"|null, mal:"parcial"|"tachada"|"doble"}] } */

function Hoja({ filas = [], caption }) {
  const W = 300;
  const H = 26 + filas.length * 26;
  const LET = ["A", "B", "C"];
  return (
    <Marco alto={H} ancho={W} caption={caption || "Hoja de respuestas (lector óptico)"}>
      <rect x="8" y="6" width={W - 16} height={H - 12} rx="6" fill="none" stroke={L} strokeWidth="1.5" />
      {filas.map((f, i) => (
        <g key={i} transform={`translate(0, ${18 + i * 26})`}>
          <text x="26" y="10" textAnchor="end" fontSize="11" fill={M}>{f.n}</text>
          {LET.map((l, j) => {
            const cx = 60 + j * 46;
            const activa = f.marca === l;
            const lleno = activa && !f.mal;          // el llenado correcto
            return (
              <g key={l}>
                <circle cx={cx} cy="6" r="8" fill={lleno ? T : "none"} stroke={L} strokeWidth="1.5" />
                {/* Rellenado a medias: el lector puede no registrarlo. */}
                {activa && f.mal === "parcial" && <circle cx={cx - 2} cy="7" r="3.5" fill={T} />}
                {/* Tachada en vez de borrada: queda marca y el lector la lee. */}
                {activa && f.mal === "tachada" && (
                  <path d={`M${cx - 6},0 l12,12 M${cx + 6},0 l-12,12`} stroke={T} strokeWidth="2" fill="none" />
                )}
                <text x={cx} y="10" textAnchor="middle" fontSize="9" fill={lleno ? "var(--bg)" : M}>
                  {l}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </Marco>
  );
}

/* ---------------- Esquema de obra pictórica ----------------

   NO es la obra: es un esquema de su composición, rotulado como tal. Sirve
   para lo que el reactivo pide —reconocer qué representa la escena y qué
   característica del porfiriato encarna—, sin fingir que se reproduce el
   cuadro. figura: { tipo:"obra", escena, titulo } */

function Obra({ escena, titulo }) {
  const W = 300, H = 180;
  const cielo = "var(--surface-2)";
  const escenas = {
    valle: (
      <g>
        <rect x="10" y="10" width={W - 20} height={H - 20} fill={cielo} stroke={L} strokeWidth="1.5" />
        <path d={`M10 ${H - 60} l60-46 32 26 40-34 58 54 80 0 v56 h-270 z`} fill="none" stroke={M} strokeWidth="1.5" />
        <ellipse cx="150" cy={H - 42} rx="80" ry="14" fill="none" stroke={B} strokeWidth="1.5" />
        <circle cx="60" cy="42" r="10" fill="none" stroke={M} strokeWidth="1.2" />
        <path d="M120 152 l4-9 4 9 z M136 154 l3-7 3 7 z" fill={T} stroke="none" />
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="9" fill={M}>paisaje amplio · figuras diminutas · sin ciudad</text>
      </g>
    ),
    ferrocarril: (
      <g>
        <rect x="10" y="10" width={W - 20} height={H - 20} fill={cielo} stroke={L} strokeWidth="1.5" />
        <line x1="20" y1="140" x2="280" y2="140" stroke={M} strokeWidth="2" />
        <line x1="20" y1="148" x2="280" y2="148" stroke={M} strokeWidth="2" />
        {[30, 70, 110, 150, 190, 230, 270].map((x) => (
          <line key={x} x1={x} y1={138} x2={x} y2={150} stroke={L} strokeWidth="3" />
        ))}
        <rect x="40" y="96" width="70" height="38" rx="4" fill="none" stroke={T} strokeWidth="2" />
        <rect x="115" y="104" width="52" height="30" rx="3" fill="none" stroke={T} strokeWidth="1.6" />
        <rect x="172" y="104" width="52" height="30" rx="3" fill="none" stroke={T} strokeWidth="1.6" />
        <path d="M58 96 q6-26 22-30 q-6 22 10 26" fill="none" stroke={M} strokeWidth="1.5" />
        {[95, 145, 195, 245].map((x) => (
          <path key={x} d={`M${x} 128 v-40 m-7 6 h14`} fill="none" stroke={L} strokeWidth="1.3" />
        ))}
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="9" fill={M}>locomotora · vías · postes de telégrafo</text>
      </g>
    ),
    hacienda: (
      <g>
        <rect x="10" y="10" width={W - 20} height={H - 20} fill={cielo} stroke={L} strokeWidth="1.5" />
        <rect x="24" y="52" width="104" height="66" fill="none" stroke={T} strokeWidth="2" />
        <path d="M18 52 l58-24 58 24" fill="none" stroke={T} strokeWidth="2" />
        <rect x="62" y="86" width="22" height="32" fill="none" stroke={M} strokeWidth="1.4" />
        <line x1="24" y1="132" x2="278" y2="132" stroke={M} strokeWidth="1.4" />
        {[168, 196, 224, 252].map((x, i) => (
          <g key={x} fill="none" stroke={T} strokeWidth="1.6">
            <circle cx={x} cy={104 + (i % 2) * 4} r="5" />
            <path d={`M${x} ${109 + (i % 2) * 4} q-8 8 -4 18 M${x} ${109 + (i % 2) * 4} q8 6 5 18`} />
          </g>
        ))}
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="9" fill={M}>casa grande · peones trabajando la tierra</text>
      </g>
    ),
    paseo: (
      <g>
        <rect x="10" y="10" width={W - 20} height={H - 20} fill={cielo} stroke={L} strokeWidth="1.5" />
        <rect x="22" y="40" width="58" height="94" fill="none" stroke={T} strokeWidth="1.8" />
        <rect x="88" y="30" width="52" height="104" fill="none" stroke={T} strokeWidth="1.8" />
        {[48, 68, 100, 120].map((x) => (
          <g key={x} fill="none" stroke={L} strokeWidth="1.2">
            <rect x={x} y="54" width="12" height="16" />
            <rect x={x} y="82" width="12" height="16" />
          </g>
        ))}
        <line x1="20" y1="134" x2="280" y2="134" stroke={M} strokeWidth="1.5" />
        <g fill="none" stroke={T} strokeWidth="1.6">
          <rect x="180" y="102" width="46" height="20" rx="4" />
          <circle cx="190" cy="128" r="7" />
          <circle cx="218" cy="128" r="7" />
          <path d="M226 112 l20-6" />
        </g>
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="9" fill={M}>arquitectura afrancesada · paseo de la élite urbana</text>
      </g>
    ),
    calavera: (
      <g>
        <rect x="10" y="10" width={W - 20} height={H - 20} fill={cielo} stroke={L} strokeWidth="1.5" />
        <g fill="none" stroke={T} strokeWidth="2">
          <ellipse cx="150" cy="98" rx="34" ry="40" />
          <ellipse cx="137" cy="92" rx="8" ry="10" fill={T} />
          <ellipse cx="163" cy="92" rx="8" ry="10" fill={T} />
          <path d="M150 106 l-6 10 h12 z" fill={T} />
          <path d="M132 124 h36 M140 124 v8 M150 124 v8 M160 124 v8" />
          <path d="M96 60 q54-30 108 0 q-54 14 -108 0 z" />
          <path d="M104 58 q46 -34 92 0" />
          <path d="M112 46 q10-14 24-16 M186 46 q-8-16 -22-18" />
        </g>
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="9" fill={M}>calavera con sombrero de dama afrancesada (grabado)</text>
      </g>
    )
  };

  return (
    <Marco alto={H} ancho={W} caption={`Esquema de la composición${titulo ? ` · ${titulo}` : ""} (no es la obra original)`}>
      {escenas[escena] || null}
    </Marco>
  );
}

/* ---------------- Despachador ---------------- */

export default function Figura({ spec }) {
  if (!spec || !spec.tipo) return null;
  switch (spec.tipo) {
    case "recta": return <Recta {...spec} />;
    case "plano": return <Plano {...spec} />;
    case "punnett": return <Punnett {...spec} />;
    case "iconos": return <Iconos {...spec} />;
    case "hoja": return <Hoja {...spec} />;
    case "obra": return <Obra {...spec} />;
    default: return null;
  }
}

export { NOMBRE_GLIFO };
