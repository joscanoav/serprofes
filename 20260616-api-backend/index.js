// 1. Importamos la herramienta principal (Express)
const express = require("express");

const cors = require("cors"); // 1. IMPORTAMOS CORS

// 2. Creamos nuestra aplicación (nuestro servidor)
const app = express();

// 🚨 3. EL MIDDLEWARE (LA LÍNEA MÁGICA)
app.use(cors()); // 2. DAMOS PERMISO A REACT
app.use(express.json());

// 4. NUESTRA BASE DE DATOS FAKE
let estudiantes = [
  { id: 1, nombre: "Aroa", curso: "React" },
  { id: 2, nombre: "Carlos", curso: "Node" }
];

// [RETO NIVEL 1]: Array de profesores
let profesores = [
  { id: 1, nombre: "Javier", asignatura: "Interfaces" },
  { id: 2, nombre: "Héctor", asignatura: "Sistemas" }
];


// ==========================================
// 📥 RUTA GET: PARA LEER DATOS (ESTUDIANTES)
// ==========================================
app.get("/api/estudiantes", (req, res) => {
  res.json(estudiantes);
});

// ==========================================
// 📤 RUTA POST: PARA GUARDAR DATOS (ESTUDIANTES)
// ==========================================
app.post("/api/estudiantes", (req, res) => {
  // A. Extraemos nombre y curso del body
  const { nombre, curso } = req.body; 

  // [RETO NIVEL 3]: Validación (El portero)
  if (!nombre || !curso || nombre.trim() === "" || curso.trim() === "") {
    return res.status(400).json({ 
      error: "Error: El nombre y el curso son obligatorios." 
    });
  }

  // [RETO NIVEL 2]: ID Automático
  const nuevoEstudiante = {
    id: estudiantes.length + 1,
    nombre: nombre,
    curso: curso
  };

  estudiantes.push(nuevoEstudiante);
  
  res.json({
    mensaje: "¡Estudiante añadido con éxito!",
    listaActualizada: estudiantes
  });
});

// ==========================================
// RUTAS DE PROFESORES [RETO NIVEL 1]
// ==========================================
app.get("/api/profesores", (req, res) => {
  res.json(profesores);
});

app.post("/api/profesores", (req, res) => {
  const nuevoProfesor = {
    id: profesores.length + 1,
    ...req.body
  };
  profesores.push(nuevoProfesor);
  res.json({
    mensaje: "¡Profesor añadido con éxito!",
    listaActualizada: profesores
  });
});


// ==========================================
// RUTAS DINÁMICAS (CRUD COMPLETO)
// ==========================================

// 🔍 BUSCAR UN ESTUDIANTE POR ID
app.get("/api/estudiantes/:id", (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const estudiante = estudiantes.find(e => e.id === idBuscado);

  if (estudiante) {
    res.json(estudiante);
  } else {
    res.status(404).json({ error: "Estudiante no encontrado" });
  }
});

// ✏️ ACTUALIZAR UN ESTUDIANTE
app.put("/api/estudiantes/:id", (req, res) => {
  const idActualizar = parseInt(req.params.id);
  const indice = estudiantes.findIndex(e => e.id === idActualizar);

  if (indice !== -1) {
    // Actualizamos los datos, pero mantenemos el ID original intacto
    estudiantes[indice] = { id: idActualizar, ...req.body };
    res.json({
      mensaje: "¡Estudiante actualizado!",
      estudianteModificado: estudiantes[indice]
    });
  } else {
    res.status(404).json({ error: "Estudiante no encontrado" });
  }
});

// 🗑️ ELIMINAR UN ESTUDIANTE
app.delete("/api/estudiantes/:id", (req, res) => {
  const idBorrar = parseInt(req.params.id);
  // Nos quedamos con todos los que NO coincidan con el ID
  estudiantes = estudiantes.filter(e => e.id !== idBorrar);

  res.json({
    mensaje: "Estudiante eliminado",
    listaActualizada: estudiantes
  });
});

// 5. ENCENDEMOS EL MOTOR
app.listen(3000, () => {
  console.log("😊 ¡Servidor funcionando! URL: http://localhost:3000");
});