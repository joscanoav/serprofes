# 🎬 Frontend de Películas (cliente de pruebas para el backend)

Este proyecto es un cliente React ya terminado. **No hay que tocar nada**,
solo se usa para comprobar visualmente que vuestra API Express funciona.

## Cómo usarlo

1. Abrid una terminal dentro de esta carpeta (`frontend-peliculas`).
2. Ejecutad:
   ```
   npm install
   npm run dev
   ```
3. Abrid el navegador en la URL que os indique la terminal (normalmente `http://localhost:5173`).
4. Aseguraos de que vuestro backend Express está encendido en `http://localhost:3000`
   (con `node server.js`) — si no, veréis el aviso 🔴 **Backend desconectado**.

## Qué hace

- Al cargar, pide automáticamente `GET /api/peliculas`.
- Formulario para crear (`POST`) y editar (`PUT`) películas.
- Botón para eliminar (`DELETE`) con confirmación.
- Indicador arriba a la derecha que muestra si el backend está conectado o no.
