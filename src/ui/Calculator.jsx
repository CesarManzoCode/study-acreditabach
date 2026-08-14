/* ============================================================
   Calculadora científica integrada

   Aparece encima del reactivo, sin salir de la pregunta, para poder
   resolver como en el examen real. Funciona con los botones, con el
   teclado físico y guarda memoria (M), historial y modo grados/radianes
   entre sesiones.
   ============================================================ */

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon.jsx";
import { evaluate, formatNumber, toInputText, autoClose } from "../lib/calc.js";
import { useLocalState } from "../lib/hooks.js";

/* Tokens de varios caracteres: el borrado quita el token completo. */
const TOKENS = ["asen(", "acos(", "atan(", "sen(", "cos(", "tan(", "log(", "ln(", "abs(", "×10^", "ans", "mod", "√(", "π"];

function dropLast(expr) {
  for (const t of TOKENS) if (expr.endsWith(t)) return expr.slice(0, -t.length);
  return expr.slice(0, -1);
}

const DESKTOP = "(min-width: 900px)";

export default function Calculator({ open, onClose }) {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState(null);   // {text, error}
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [second, setSecond] = useState(false);
  const [deg, setDeg] = useLocalState("calc_deg", true);
  const [sci, setSci] = useLocalState("calc_sci", true);
  const [memory, setMemory] = useLocalState("calc_mem", 0);
  const [pos, setPos] = useState(null);          // {x, y} al arrastrar en escritorio
  const ansRef = useRef(0);
  const freshRef = useRef(false);                // el último "=" dejó un resultado
  const panelRef = useRef(null);

  /* --- Vista previa mientras se escribe --- */
  const preview = useMemo(() => {
    if (!expr.trim()) return null;
    const r = evaluate(autoClose(expr), { deg, ans: ansRef.current });
    return r.ok ? r.text : null;
  }, [expr, deg]);

  /* --- Acciones --- */

  const insert = useCallback((text, { startsNumber = false } = {}) => {
    setResult(null);
    setExpr((prev) => {
      if (freshRef.current) {
        freshRef.current = false;
        // Tras un "=": un número empieza de cero; un operador continúa el resultado.
        return startsNumber ? text : "ans" + text;
      }
      return prev + text;
    });
  }, []);

  const clearAll = useCallback(() => {
    setExpr("");
    setResult(null);
    freshRef.current = false;
  }, []);

  const back = useCallback(() => {
    setResult(null);
    freshRef.current = false;
    setExpr((prev) => dropLast(prev));
  }, []);

  const equals = useCallback(() => {
    const src = autoClose(expr);
    if (!src.trim()) return;
    const r = evaluate(src, { deg, ans: ansRef.current });
    if (r.ok) {
      ansRef.current = r.value;
      setResult({ text: r.text });
      setHistory((h) => [{ expr, out: r.text }, ...h].slice(0, 12));
      freshRef.current = true;
    } else {
      setResult({ error: r.error || "Expresión incompleta" });
    }
  }, [expr, deg]);

  const memAdd = (sign) => {
    const r = evaluate(autoClose(expr) || String(ansRef.current), { deg, ans: ansRef.current });
    if (r.ok) setMemory((m) => Number(m || 0) + sign * r.value);
  };

  /* --- Teclado físico ---
     Se escucha en fase de captura y se detiene la propagación para que los
     atajos del reactivo (1/2/3 para responder) no se disparen al teclear. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      // Si el foco está en una tecla de la calculadora, Enter/espacio deben
      // pulsar esa tecla, no evaluar.
      if ((k === "Enter" || k === " ") && e.target?.classList?.contains("calc-key")) return;
      let handled = true;

      if (/^[0-9]$/.test(k)) insert(k, { startsNumber: true });
      else if (k === "." || k === ",") insert(".", { startsNumber: true });
      else if (k === "+") insert("+");
      else if (k === "-") insert("−");
      else if (k === "*" || k === "x") insert("×");
      else if (k === "/") insert("÷");
      else if (k === "^") insert("^");
      else if (k === "%") insert("%");
      else if (k === "!") insert("!");
      else if (k === "(" || k === ")") insert(k, { startsNumber: k === "(" });
      else if (k === "Enter" || k === "=") equals();
      else if (k === "Backspace") back();
      else if (k === "Delete") clearAll();
      else if (k === "Escape") onClose();
      else handled = false;

      if (handled) { e.preventDefault(); e.stopPropagation(); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, insert, equals, back, clearAll, onClose]);

  /* --- Arrastre (solo escritorio) --- */
  const dragRef = useRef(null);
  const onDragStart = (e) => {
    if (!window.matchMedia(DESKTOP).matches) return;
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top, w: rect.width, h: rect.height };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onDragMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const x = Math.min(Math.max(8, e.clientX - d.dx), window.innerWidth - d.w - 8);
    const y = Math.min(Math.max(8, e.clientY - d.dy), window.innerHeight - d.h - 8);
    setPos({ x, y });
  };
  const onDragEnd = () => { dragRef.current = null; };

  useEffect(() => { if (!open) { setShowHistory(false); setSecond(false); } }, [open]);

  /* Marca el <body> mientras la calculadora está abierta: el CSS le hace
     sitio al reactivo para que la pregunta no quede tapada. */
  useEffect(() => {
    document.body.classList.toggle("has-calc", !!open);
    return () => document.body.classList.remove("has-calc");
  }, [open]);

  if (!open) return null;

  const style = pos && window.matchMedia(DESKTOP).matches
    ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" }
    : undefined;

  /* Se monta en <body>: dentro del runner hay animaciones con transform y
     contenedores con overflow que romperían el position:fixed del panel. */
  return createPortal(
    <div className="calc" ref={panelRef} style={style} role="dialog" aria-label="Calculadora científica">
      <header
        className="calc-head"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <span className="calc-title">
          <Icon name="calc" size={16} />
          Calculadora
        </span>
        <div className="calc-head-actions">
          <button
            className={`calc-mode${deg ? " is-on" : ""}`}
            onClick={() => setDeg((d) => !d)}
            title="Cambiar entre grados y radianes"
          >
            {deg ? "DEG" : "RAD"}
          </button>
          {Number(memory) !== 0 && <span className="calc-mem-flag" title={`Memoria: ${formatNumber(Number(memory))}`}>M</span>}
          <button
            className={`calc-icon${showHistory ? " is-on" : ""}`}
            onClick={() => setShowHistory((v) => !v)}
            aria-label="Historial de operaciones"
          >
            <Icon name="clock" size={16} />
          </button>
          <button className="calc-icon" onClick={onClose} aria-label="Cerrar la calculadora">
            <Icon name="x" size={16} />
          </button>
        </div>
      </header>

      <div className="calc-screen" aria-live="polite">
        <div className="calc-expr">{expr || <span className="calc-ph">0</span>}</div>
        {result?.error ? (
          <div className="calc-out is-error">{result.error}</div>
        ) : result?.text ? (
          <div className="calc-out">= {result.text}</div>
        ) : preview != null && preview !== expr ? (
          <div className="calc-out is-preview">= {preview}</div>
        ) : (
          <div className="calc-out is-preview">&nbsp;</div>
        )}
      </div>

      {showHistory && (
        <div className="calc-history">
          {history.length === 0 && <p className="calc-history-empty">Aún no hay operaciones.</p>}
          {history.map((h, i) => (
            <button
              key={i}
              className="calc-history-item"
              onClick={() => { setExpr(toInputText(h.out)); setResult(null); freshRef.current = false; setShowHistory(false); }}
            >
              <span className="calc-history-expr">{h.expr}</span>
              <span className="calc-history-out">= {h.out}</span>
            </button>
          ))}
        </div>
      )}

      {sci && (
        <div className="calc-pad calc-pad-sci">
          <K label="2ª" tone={second ? "on" : "fn"} onPress={() => setSecond((v) => !v)} />
          <K label="π" tone="fn" onPress={() => insert("π", { startsNumber: true })} />
          <K label="e" tone="fn" onPress={() => insert("e", { startsNumber: true })} />
          <K label="×10ˣ" tone="fn" onPress={() => insert("×10^")} />
          <K label="M−" tone="fn" onPress={() => memAdd(-1)} />

          {second ? (
            <>
              <K label="sen⁻¹" tone="fn" onPress={() => insert("asen(", { startsNumber: true })} />
              <K label="cos⁻¹" tone="fn" onPress={() => insert("acos(", { startsNumber: true })} />
              <K label="tan⁻¹" tone="fn" onPress={() => insert("atan(", { startsNumber: true })} />
              <K label="eˣ" tone="fn" onPress={() => insert("e^", { startsNumber: true })} />
              <K label="10ˣ" tone="fn" onPress={() => insert("10^", { startsNumber: true })} />
            </>
          ) : (
            <>
              <K label="sen" tone="fn" onPress={() => insert("sen(", { startsNumber: true })} />
              <K label="cos" tone="fn" onPress={() => insert("cos(", { startsNumber: true })} />
              <K label="tan" tone="fn" onPress={() => insert("tan(", { startsNumber: true })} />
              <K label="ln" tone="fn" onPress={() => insert("ln(", { startsNumber: true })} />
              <K label="log" tone="fn" onPress={() => insert("log(", { startsNumber: true })} />
            </>
          )}

          {second ? (
            <>
              <K label="x³" tone="fn" onPress={() => insert("³")} />
              <K label="∛" tone="fn" onPress={() => insert("cbrt(", { startsNumber: true })} />
              <K label="|x|" tone="fn" onPress={() => insert("abs(", { startsNumber: true })} />
              <K label="n!" tone="fn" onPress={() => insert("!")} />
              <K label="%" tone="fn" onPress={() => insert("%")} />
            </>
          ) : (
            <>
              <K label="x²" tone="fn" onPress={() => insert("²")} />
              <K label="√" tone="fn" onPress={() => insert("√(", { startsNumber: true })} />
              <K label="xʸ" tone="fn" onPress={() => insert("^")} />
              <K label="n!" tone="fn" onPress={() => insert("!")} />
              <K label="%" tone="fn" onPress={() => insert("%")} />
            </>
          )}

          <K label="(" tone="fn" onPress={() => insert("(", { startsNumber: true })} />
          <K label=")" tone="fn" onPress={() => insert(")")} />
          <K label="MC" tone="fn" onPress={() => setMemory(0)} />
          <K label="MR" tone="fn" onPress={() => insert(toInputText(formatNumber(Number(memory))), { startsNumber: true })} />
          <K label="M+" tone="fn" onPress={() => memAdd(1)} />
        </div>
      )}

      <div className="calc-pad calc-pad-num">
        <K label="AC" tone="warn" onPress={clearAll} />
        <K label="⌫" tone="warn" onPress={back} ariaLabel="Borrar" />
        <K label="ANS" tone="op" onPress={() => insert("ans", { startsNumber: true })} />
        <K label="÷" tone="op" onPress={() => insert("÷")} />

        <K label="7" onPress={() => insert("7", { startsNumber: true })} />
        <K label="8" onPress={() => insert("8", { startsNumber: true })} />
        <K label="9" onPress={() => insert("9", { startsNumber: true })} />
        <K label="×" tone="op" onPress={() => insert("×")} />

        <K label="4" onPress={() => insert("4", { startsNumber: true })} />
        <K label="5" onPress={() => insert("5", { startsNumber: true })} />
        <K label="6" onPress={() => insert("6", { startsNumber: true })} />
        <K label="−" tone="op" onPress={() => insert("−")} />

        <K label="1" onPress={() => insert("1", { startsNumber: true })} />
        <K label="2" onPress={() => insert("2", { startsNumber: true })} />
        <K label="3" onPress={() => insert("3", { startsNumber: true })} />
        <K label="+" tone="op" onPress={() => insert("+")} />

        <K label="0" onPress={() => insert("0", { startsNumber: true })} />
        <K label="." onPress={() => insert(".", { startsNumber: true })} />
        <K label="(−)" onPress={() => insert("−", { startsNumber: true })} ariaLabel="Signo negativo" />
        <K label="=" tone="eq" onPress={equals} />
      </div>

      <button className="calc-toggle-sci" onClick={() => setSci((v) => !v)}>
        {sci ? "Ocultar funciones científicas" : "Mostrar funciones científicas"}
      </button>
    </div>,
    document.body
  );
}

const K = Key;

function Key({ label, tone, onPress, ariaLabel }) {
  return (
    <button
      type="button"
      className={`calc-key${tone ? " calc-key-" + tone : ""}`}
      onClick={onPress}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
}
