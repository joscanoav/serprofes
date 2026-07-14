// ==========================================================
// MovieCard.jsx
// Representa UNA película dentro del catálogo.
// Recibe la película por props y avisa al padre (App.jsx)
// cuando el usuario pulsa "Editar" o "Eliminar".
// ==========================================================
function MovieCard({ movie, onEdit, onDelete }) {
  return (
    <div className="movie-card">
      <div className="movie-card-info">
        <h3 className="movie-title">{movie.titulo}</h3>
        <p className="movie-director">🎬 {movie.director}</p>
      </div>

      <div className="movie-card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(movie)}>
          Editar
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(movie.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
