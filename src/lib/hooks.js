import { useSyncExternalStore, useEffect, useState, useCallback, useRef } from "react";
import { subscribe, getRevision } from "./engine.js";
import { subscribeAccounts, accountsRevision } from "./accounts.js";
import { subscribeCloud, cloudRevision } from "./cloud.js";

/** Se vuelve a renderizar cada vez que el motor guarda progreso. */
export function useEngine() {
  return useSyncExternalStore(subscribe, getRevision, getRevision);
}

/** Se vuelve a renderizar cuando cambia la sesión (entrar, salir, registrarse). */
export function useAccounts() {
  return useSyncExternalStore(subscribeAccounts, accountsRevision, accountsRevision);
}

/** Se vuelve a renderizar cuando cambia el estado del guardado en la nube. */
export function useCloud() {
  return useSyncExternalStore(subscribeCloud, cloudRevision, cloudRevision);
}

/* ---------------- Router de hash ---------------- */

function readHash() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const parts = raw.split("/").filter(Boolean).map(decodeURIComponent);
  return { name: parts[0] || "hoy", params: parts.slice(1) };
}

export function useRoute() {
  const [route, setRoute] = useState(readHash);
  useEffect(() => {
    const onChange = () => setRoute(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function navigate(path, { replace = false } = {}) {
  const target = "#/" + String(path).replace(/^#?\/?/, "");
  if (window.location.hash === target) return;
  if (replace) window.history.replaceState(null, "", target);
  else window.location.hash = target;
  if (replace) window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function goBack(fallback = "hoy") {
  if (window.history.length > 1) window.history.back();
  else navigate(fallback);
}

/* ---------------- Utilidades de interfaz ---------------- */

/** Atajos de teclado. `map` es { tecla: handler }. Se ignora si escribes en un input. */
export function useKeys(map, deps = []) {
  const ref = useRef(map);
  ref.current = map;
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const handler = ref.current[e.key];
      if (handler) { e.preventDefault(); handler(e); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Bloquea el scroll del fondo mientras hay una capa modal abierta. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

/** Estado local persistido (solo preferencias de interfaz, nunca progreso). */
export function useLocalState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initial : JSON.parse(raw);
    } catch (e) {
      return initial;
    }
  });
  const set = useCallback((v) => {
    setValue((prev) => {
      const next = typeof v === "function" ? v(prev) : v;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, [key]);
  return [value, set];
}
