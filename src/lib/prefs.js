/* Preferencias de interfaz (tema, ajustes visuales).
   Vive en su propia llave de localStorage para no tocar jamás el progreso
   de estudio, que se guarda aparte en `acreditabach_v1`. */

const THEME_KEY = "acreditabach_theme";

export function getStoredTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : "auto";
  } catch (e) {
    return "auto";
  }
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "auto") {
    delete root.dataset.theme;
    try { localStorage.removeItem(THEME_KEY); } catch (e) {}
  } else {
    root.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }
}

/** Tema efectivo (resuelve "auto" contra la preferencia del sistema). */
export function resolveTheme(theme) {
  if (theme !== "auto") return theme;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
