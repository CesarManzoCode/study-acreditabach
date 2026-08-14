import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

/* Ruta por defecto: #/hoy (así el botón "atrás" del navegador funciona entre secciones). */
if (!window.location.hash || window.location.hash === "#") {
  window.history.replaceState(null, "", "#/hoy");
}

const container = document.getElementById("app");
container.innerHTML = "";
createRoot(container).render(<App />);
