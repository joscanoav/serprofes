// ==========================================================
// App.jsx
// Componente principal. Aquí vive el "estado" de la app:
// - la lista de películas
// - si el backend está conectado o no
// - qué película se está editando (si alguna)
//
// App.jsx es el único que llama a movieService.js.
// Los componentes hijos solo reciben datos y funciones por props.
// ==========================================================
import { useState, useEffect } from "react";
import MovieList from "./components/MovieList.jsx";
import MovieForm from "./components/MovieForm.jsx";
import { getMovies, createMovie, updateMovie, deleteMovie } from "./services/movieService.js";

function App() {
  // Lista de películas obtenidas del backend
  const [movies, setMovies] = useState([]);

  // Estado de conexión con el backend: "checking" | "online" | "offline"
  const [backendStatus, setBackendStatus] = useState("checking");

  // Película que se está editando actualmente (null = modo crear)
  const [editingMovie, setEditingMovie] = useState(null);

  // --------------------------------------------------------
  // Al montar el componente, cargamos el catálogo automáticamente
  // --------------------------------------------------------
  useEffect(() => {
    cargarPeliculas();
  }, []);

  // Función que pide las películas al backend y actualiza el estado
  const cargarPeliculas = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
      setBackendStatus("online");
    } catch (error) {
      // No mostramos el error crudo al usuario, solo cambiamos el estado visual
      setBackendStatus("offline");
    }
  };

  // --------------------------------------------------------
  // CREAR o ACTUALIZAR (el formulario decide cuál según editingMovie)
  // --------------------------------------------------------
  const handleFormSubmit = async (movieData) => {
    try {
      if (editingMovie) {
        // Modo edición -> PUT
        await updateMovie(editingMovie.id, movieData);
        setEditingMovie(null);
      } else {
        // Modo creación -> POST
        await createMovie(movieData);
      }
      // Refrescamos la lista para reflejar el cambio
      await cargarPeliculas();
    } catch (error) {
      setBackendStatus("offline");
      alert("No se pudo guardar la película. Revisa que el backend esté encendido.");
    }
  };

  // --------------------------------------------------------
  // Preparar el formulario para EDITAR una película
  // --------------------------------------------------------
  const handleEditClick = (movie) => {
    setEditingMovie(movie);
  };

  // Cancelar la edición y limpiar el formulario
  const handleCancelEdit = () => {
    setEditingMovie(null);
  };

  // --------------------------------------------------------
  // ELIMINAR una película
  // --------------------------------------------------------
  const handleDeleteClick = async (id) => {
    const confirmado = confirm("¿Seguro que quieres eliminar esta película?");
    if (!confirmado) return;

    try {
      await deleteMovie(id);
      await cargarPeliculas();
    } catch (error) {
      setBackendStatus("offline");
      alert("No se pudo eliminar la película. Revisa que el backend esté encendido.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 Catálogo de Películas</h1>

        {/* Indicador visual del estado del backend */}
        {backendStatus === "online" && (
          <span className="status status-online">🟢 Backend conectado</span>
        )}
        {backendStatus === "offline" && (
          <span className="status status-offline">🔴 Backend desconectado</span>
        )}
        {backendStatus === "checking" && (
          <span className="status status-checking">🟡 Comprobando conexión...</span>
        )}
      </header>

      {/* Si el backend está caído, mostramos un aviso elegante en vez de errores */}
      {backendStatus === "offline" && (
        <div className="offline-banner">
          No se puede conectar con <strong>http://localhost:3000</strong>.
          <br />
          Comprueba que tu servidor Express esté encendido (<code>node server.js</code>).
        </div>
      )}

      <MovieForm
        editingMovie={editingMovie}
        onSubmit={handleFormSubmit}
        onCancelEdit={handleCancelEdit}
      />

      <MovieList
        movies={movies}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
}

export default App;
