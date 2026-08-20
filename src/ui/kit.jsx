import { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from "react";
import Icon from "./Icon.jsx";
import { useScrollLock } from "../lib/hooks.js";

/* Primitivas de la interfaz.

   Son pocas a propósito: una hoja, una sección con regla, una lista, un
   medidor y una cifra. Casi todo lo que antes era "otra tarjeta" se resuelve
   ahora con una regla y con espacio. */

/* ---------------- Botones ---------------- */

export function Button({
  variant = "ghost", size = "md", icon, iconRight, block, className = "", children, ...rest
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}${block ? " btn-block" : ""}${className ? " " + className : ""}`}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {children != null && <span className="btn-label">{children}</span>}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 15 : 17} />}
    </button>
  );
}

/* ---------------- Contenedores ---------------- */

/** Hoja de papel: superficie con una regla de un pixel. Sin sombra ni relieve. */
export function Sheet({ as: Tag = "div", tone, className = "", children, ...rest }) {
  return (
    <Tag className={`sheet${tone ? " sheet-" + tone : ""}${className ? " " + className : ""}`} {...rest}>
      {children}
    </Tag>
  );
}

/** Sección con encabezado sobre una regla: la alternativa a envolver todo en cajas. */
export function Section({ title, action, note, children, className = "", ...rest }) {
  return (
    <section className={`section${className ? " " + className : ""}`} {...rest}>
      {(title || action) && (
        <div className="section-head">
          <div style={{ minWidth: 0 }}>
            <h2>{title}</h2>
            {note && <p className="section-note">{note}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/** Título de pantalla. */
export function PageHead({ title, children }) {
  return (
    <header className="page-head">
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  );
}

export function Stack({ gap, className = "", children, style }) {
  return (
    <div className={`stack${className ? " " + className : ""}`} style={{ ...(gap ? { gap } : null), ...style }}>
      {children}
    </div>
  );
}

/* ---------------- Indicadores ---------------- */

/** Medidor lineal. `color` colorea el relleno (se usa para las áreas). */
export function Meter({ value, color, height, className = "", label }) {
  const pct = Math.max(0, Math.min(100, value || 0));
  return (
    <div
      className={`meter${className ? " " + className : ""}`}
      style={height ? { height } : undefined}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="meter-fill" style={{ width: pct + "%", ...(color ? { "--fill": color } : null) }} />
    </div>
  );
}

/** Medidor con su etiqueta y su cifra encima. */
export function MeterBlock({ label, value, display, color }) {
  return (
    <div className="meter-block">
      <div className="meter-row">
        <span className="meter-label">{label}</span>
        <span className="meter-value tnum">{display}</span>
      </div>
      <Meter value={value} color={color} label={typeof label === "string" ? label : undefined} />
    </div>
  );
}

/** Cuadrito de color del área. Nunca decorativo: dice de qué área es la fila. */
export function Mark({ style, className = "" }) {
  return <span className={`mark${className ? " " + className : ""}`} style={style} aria-hidden="true" />;
}

export function Badge({ tone = "neutral", icon, children, className = "", ...rest }) {
  return (
    <span className={`badge badge-${tone}${className ? " " + className : ""}`} {...rest}>
      {icon && <Icon name={icon} size={12} strokeWidth={2} />}
      {children}
    </span>
  );
}

/** Fila de cifras separadas por reglas verticales. */
export function Figures({ children, className = "" }) {
  return <div className={`figures${className ? " " + className : ""}`}>{children}</div>;
}

export function Figure({ value, label, tone }) {
  return (
    <div className={`figure${tone ? " figure-" + tone : ""}`}>
      <strong className="figure-value">{value}</strong>
      <span className="figure-label">{label}</span>
    </div>
  );
}

export function EmptyState({ icon = "clock", title, children, action }) {
  return (
    <div className="empty">
      <div className="empty-icon"><Icon name={icon} size={20} /></div>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}

export function Segmented({ options, value, onChange, ariaLabel }) {
  return (
    <div className="segmented" role="tablist" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={value === o.value}
          className={`segmented-item${value === o.value ? " is-active" : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.icon && <Icon name={o.icon} size={14} />}
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Modal ---------------- */

export function Modal({ open, title, description, children, onClose, actions }) {
  const ref = useRef(null);

  /* `onClose` suele llegar como función nueva en cada render. Se guarda en una
     ref para que el efecto de abajo dependa SOLO de `open`: si dependiera de
     `onClose`, se volvería a ejecutar con cada tecla y devolvería el foco al
     primer botón, sacándote del campo de texto letra por letra. */
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") closeRef.current?.(); };
    window.addEventListener("keydown", onKey);
    // Al abrir, el foco va al primer campo de texto; si no hay, al primer botón.
    const t = setTimeout(() => {
      const caja = ref.current;
      if (!caja) return;
      const destino = caja.querySelector("input, textarea, select") || caja.querySelector("button");
      destino?.focus();
      if (destino && destino.tagName === "INPUT" && typeof destino.select === "function") destino.select();
    }, 60);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(t); };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-scrim" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} ref={ref}>
        <h2 className="modal-title">{title}</h2>
        {description && <p className="modal-desc">{description}</p>}
        {children}
        <div className="modal-actions">{actions}</div>
      </div>
    </div>
  );
}

/* ---------------- Toasts ---------------- */

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const idRef = useRef(0);

  const push = useCallback((message, opts = {}) => {
    const id = ++idRef.current;
    setItems((prev) => [...prev, { id, message, tone: opts.tone || "neutral", icon: opts.icon }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), opts.duration || 3200);
  }, []);

  const value = useMemo(() => push, [push]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`toast toast-${t.tone}`}>
            {t.icon && <Icon name={t.icon} size={16} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
