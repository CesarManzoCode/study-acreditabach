/* Metadatos de las áreas del ACREDITA-BACH (Ceneval, guía junio 2026) */
const AREA_META = {
  1: { name: "Pensamiento matemático", short: "Matemáticas", reactivos: 30, color: "#6366f1", session: 1 },
  2: { name: "Cultura digital", short: "Cultura digital", reactivos: 19, color: "#06b6d4", session: 1 },
  3: { name: "Conciencia histórica", short: "Historia", reactivos: 23, color: "#f59e0b", session: 1 },
  4: { name: "Humanidades", short: "Humanidades", reactivos: 20, color: "#a855f7", session: 1 },
  5: { name: "Ciencias naturales, experimentales y tecnología", short: "Ciencias naturales", reactivos: 32, color: "#10b981", session: 2 },
  6: { name: "Lengua y comunicación (Español e Inglés)", short: "Lengua y comunicación", reactivos: 31, color: "#f43f5e", session: 2 },
  7: { name: "Ciencias sociales", short: "Ciencias sociales", reactivos: 25, color: "#84cc16", session: 2 }
};

/* Ojo con la diferencia entre `reactivos` y `fisicos` (guía, p. 21):
   los que CUENTAN para la calificación son 180, pero en el cuadernillo se
   contestan además 25 reactivos piloto que no puntúan. El sustentante no sabe
   cuáles son y tiene que responderlos igual, así que el cansancio y el reparto
   del tiempo se calculan sobre los 205 físicos, no sobre los 180 calificados. */
const SESSION_META = {
  1: { name: "Sesión 1", areas: [1, 2, 3, 4], duracion: "4 h 30 min", reactivos: 92, piloto: 14, fisicos: 106 },
  2: { name: "Sesión 2", areas: [5, 6, 7], duracion: "4 h", reactivos: 88, piloto: 11, fisicos: 99 }
};

const TOTAL_REACTIVOS = 180;   // los que cuentan para el Índice Ceneval
const TOTAL_PILOTO = 25;       // bloque de prueba estadística, no puntúa
const TOTAL_FISICOS = 205;     // los que realmente se contestan ese día
