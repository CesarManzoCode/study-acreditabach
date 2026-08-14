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

const SESSION_META = {
  1: { name: "Sesión 1", areas: [1, 2, 3, 4], duracion: "4 h 30 min", reactivos: 92 },
  2: { name: "Sesión 2", areas: [5, 6, 7], duracion: "4 h", reactivos: 88 }
};

const TOTAL_REACTIVOS = 180;
