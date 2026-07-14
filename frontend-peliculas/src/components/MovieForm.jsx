// ==========================================================
// MovieForm.jsx
// Formulario único que sirve tanto para CREAR como para
// EDITAR una película.
//
// - Si "editingMovie" es null -> modo CREAR (formulario vacío)
// - Si "editingMovie" tiene datos -> modo EDITAR (rellenado)
//
// El componente NO hace fetch: solo recoge los datos y se los
// pasa a App.jsx mediante la función onSubmit.
// ==========================================================
import { useState, useEffect } from "react";

function MovieForm({ editingMovie, onSubmit, onCancelEdit }) {
  // Estado local del formulario
  const [titulo, setTitulo] = useState("");
  const [director, setDirector] = useState("");

  // Cada vez que "editingMovie" cambie (el usuario pulsa Editar),
  // rellenamos el formulario con los datos de esa película.
  useEffect(() => {
    if (editingMovie) {
      setTitulo(editingMovie.titulo);
      setDirector(editingMovie.director);
    } else {
      setTitulo("");
      setDirector("");
    }
  }, [editingMovie]);

  // Se ejecuta al pulsar el botón de enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue

    // Validación básica en el cliente
    if (titulo.trim() === "" || director.trim() === "") {
      alert("Por favor, rellena el título y el director");
      return;
    }

    // Avisamos al componente padre (App.jsx) con los datos
    onSubmit({ titulo, director });

    // Limpiamos el formulario tras enviar
    setTitulo("");
    setDirector("");
  };

  const isEditing = editingMovie !== null;

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {isEditing ? "✏️ Editar película" : "➕ Agregar película"}
      </h2>

      <div className="form-group">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          placeholder="Ej: Matrix"
        />
      </div>

      <div className="form-group">
        <label htmlFor="director">Director</label>
        <input
          id="director"
          type="text"
          value={director}
          onChange={(event) => setDirector(event.target.value)}
          placeholder="Ej: Lana Wachowski"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Actualizar película" : "Agregar película"}
        </button>

        {/* Solo mostramos "Cancelar" si estamos editando */}
        {isEditing && (
          <button type="button" className="btn btn-cancel" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default MovieForm;
