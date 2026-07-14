// ==========================================================
// movieService.js
// Aquí vive TODA la lógica de comunicación con el backend.
// Ningún componente hace fetch() directamente: todos llaman
// a estas funciones. Así, si el backend cambia de URL o de
// formato, solo hay que tocar este archivo.
// ==========================================================

const API_URL = "http://localhost:3000/api/peliculas";

// ------------------------------------------------------------
// GET /api/peliculas -> Obtener todas las películas
// ------------------------------------------------------------
export async function getMovies() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudo obtener el listado de películas");
  }

  return await response.json();
}

// ------------------------------------------------------------
// POST /api/peliculas -> Crear una película nueva
// ------------------------------------------------------------
export async function createMovie(movie) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie), // { titulo, director }
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la película");
  }

  return await response.json();
}

// ------------------------------------------------------------
// PUT /api/peliculas/:id -> Actualizar una película existente
// ------------------------------------------------------------
export async function updateMovie(id, movie) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie), // { titulo, director }
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar la película");
  }

  return await response.json();
}

// ------------------------------------------------------------
// DELETE /api/peliculas/:id -> Eliminar una película
// ------------------------------------------------------------
export async function deleteMovie(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la película");
  }

  return await response.json();
}
