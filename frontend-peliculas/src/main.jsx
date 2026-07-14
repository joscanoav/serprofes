import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

// Punto de arranque de la aplicación.
// Aquí React "engancha" el componente App al <div id="root"> del index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
