import { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from "react";
import Icon from "./Icon.jsx";
import { useScrollLock, prefersReducedMotion } from "../lib/hooks.js";

/* ---------------- Botones ---------------- */

export function Button({
  variant = "ghost", size = "md", icon, iconRight, block, className = "", children, ...rest
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}${block ? " btn-block" : ""} ${className}`}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children != null && <span className="btn-label">{children}</span>}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 16 : 18} />}
    </button>
  );
}

/* ---------------- Contenedores ---------------- */

export function Card({ as: Tag = "div", tone, interactive, className = "", style, children, ...rest }) {
  return (
    <Tag
      className={`card${tone ? " card-" + tone : ""}${interactive ? " card-interactive" : ""} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionTitle({ children, action, hint }) {
  return (
    <div className="section-title">
      <div>
        <h2>{children}</h2>
        {hint && <p className="section-hint">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stack({ gap, className = "", children, style }) {
  return (
    <div className={`stack ${className}`} style={{ ...(gap ? { gap } : null), ...style }}>
      {children}
    </div>
  );
}

/** Entrada escalonada de los bloques de una pantalla. */
export function Reveal({ delay = 0, className = "", children, ...rest }) {
  const style = prefersReducedMotion() ? undefined : { animationDelay: `${Math.min(delay, 420)}ms` };
  return (
    <div className={`reveal ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}

/* ---------------- Indicadores ---------------- */

export function Bar({ value, color, height = 8, track = true, className = "" }) {
  const pct = Math.max(0, Math.min(100, value || 0));
  return (
    <div
      className={`bar ${track ? "" : "bar-flat"} ${className}`}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="bar-fill" style={{ width: pct + "%", ...(color ? { "--fill": color } : null) }} />
    </div>
  );
}

export function Ring({ value = 0, size = 68, stroke = 7, color, label, sublabel, className = "" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={`ring ${className}`} style={{ width: size, height: size, ...(color ? { "--ring": color } : null) }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" />
        <circle
          className="ring-value"
          cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none"
          strokeDasharray={c}
          strokeDashoffset={c - (c * pct) / 100}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-center">
        <span className="ring-label">{label}</span>
        {sublabel && <span className="ring-sub">{sublabel}</span>}
      </div>
    </div>
  );
}

export function Badge({ tone = "neutral", icon, children, className = "" }) {
  return (
    <span className={`badge badge-${tone} ${className}`}>
      {icon && <Icon name={icon} size={13} strokeWidth={2} />}
      {children}
    </span>
  );
}

export function Chip({ icon, value, label, tone }) {
  return (
    <div className={`chip${tone ? " chip-" + tone : ""}`}>
      {icon && <Icon name={icon} size={16} />}
      <span className="chip-value">{value}</span>
      <span className="chip-label">{label}</span>
    </div>
  );
}

export function Stat({ value, label, tone }) {
  return (
    <div className={`stat${tone ? " stat-" + tone : ""}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export function EmptyState({ icon = "sparkles", title, children, action }) {
  return (
    <div className="empty">
      <div className="empty-icon"><Icon name={icon} size={26} /></div>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action}
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
          {o.icon && <Icon name={o.icon} size={15} />}
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Modal ---------------- */

export function Modal({ open, title, description, children, onClose, actions, tone }) {
  const ref = useRef(null);
  useScrollLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => ref.current?.querySelector("button")?.focus(), 60);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(t); };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-scrim" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className={`modal${tone ? " modal-" + tone : ""}`} role="dialog" aria-modal="true" aria-label={title} ref={ref}>
        <h3 className="modal-title">{title}</h3>
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
            {t.icon && <Icon name={t.icon} size={17} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
