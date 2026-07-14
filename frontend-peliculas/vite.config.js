import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración estándar de Vite para React.
// No es necesario tocar nada aquí para la clase de Backend.
export default defineConfig({
  plugins: [react()],
});
