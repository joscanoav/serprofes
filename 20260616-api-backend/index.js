//1. Importamos la herramienta principal (Express)
const express = require("express");

//2. Creamos nuestra aplicación(nuestro servidor)
const app = express();

//3. MIDDLEWARE (La línea mágica)
// Esto es  un traductor. Le dice a Node: "Si alguien
// te envia datos desde fuera, tradúcelos al formato
// JSON para que podamos leerlos". Si falta esto
// , el POST falla."
app.use(express.json());
//NUESTRA BASE DE DATOS
// Guardamos información temporalmente en la lista array
//dentro de la memoria del servidor
let estudiantes = [
    { id: 1, nombre: "Aroa", curso: "React"},
    { id: 2, nombre: "Jose", curso: "Node"}
];

//RETO 1 : BASE DE DATOS PROFESORES
let profesores = [
    { id: 1, nombre: "Jorge", curso: "Desarollo Web"},
    { id: 2, nombre: "Gonzalo", curso: "Machine Learning"}
];

//🚩RUTA GET: PARA LEER DATOS
// Cuando alguien pregunte por "/api/estudiantes", el servidor muestra la lista
app.get("/api/estudiantes", (req, res)=> {
    res.json(estudiantes);
});

//🚩RUTA POST: PARA GUARDAR DATOS NUEVOS
//Cuando alguien envíe información a "api/estudiantes", hacemos lo siguiente
app.post("/api/estudiantes", (req, res) => {
    //A. Atrapamos los datos que vienen de fuera (viven dentro de req.body)
    //const nuevoEstudiante = req.body;
    const {nombre, curso} = req.body;

    //RETO 3 : VALIDACIÓN EL PORTERO

    if (!nombre || !curso || nombre.trim() === "" || curso.trim() === ""){
        return res.status(400).json({
            error:"Error: El nombre y el curso son obligatorios."
        });
    };

    //RETO NIVEL 2 : ID AUTOMATICO
    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        nombre: nombre,
        curso: curso
    };
    //B. Metemos ese estudiante nuevo en nuestra lista usando .push()
    estudiantes.push(nuevoEstudiante);
    //C. Le respondemos al usuario confirmando que todo ha ido bien
    res.json({
        mensaje: "¡Estudiante añadido con éxito a la base de datos!",
        listaActualizada: estudiantes
    });
});
























// RUTAS DINÁMICAS  (CRUD COMPLETO)
app.get("/api/estudiantes/:id", (req, res)=> {
    const idBuscado = parseInt(req.params.id);
    const estudiante = estudiantes.find(e => e.id === idBuscado);
    if (estudiante) {
        res.json(estudiante);
    } else {
        res.status(404).json({error : "Estudiante no encontrado"});
    }
});


// ✏️ ACTUALIZAR ESTUDIANTE
app.put("/api/estudiantes/:id", (req, res) => {
    const idActualizar = parseInt(req.params.id);
    const indice = estudiantes.findIndex(e => e.id === idActualizar);

    if (indice !== -1){
        // Actualizamos los datos, pero mantenemos el ID original intacto
        estudiantes[indice] = { id: idActualizar, ...req.body};
        res.json({
            mensaje: "¡Estudiante actualizado",
            estudianteModificado: estudiantes[indice]
        });
    } else {
        res.status(404).json({ error: "Estudiante no encontrado"});
    }
});















//RETO 1 : Profesores

app.get("/api/profesores", (req, res)=> {
    res.json(profesores);
});
app.post("/api/profesores", (req, res) => {
    //A. Atrapamos los datos que vienen de fuera (viven dentro de req.body)
    const nuevoProfesor = req.body;
    //B. Metemos ese estudiante nuevo en nuestra lista usando .push()
    profesores.push(nuevoProfesor);
    //C. Le respondemos al usuario confirmando que todo ha ido bien
    res.json({
        mensaje: "¡Profesor añadido con éxito a la base de datos!",
        listaActualizada: profesores
    });
});









//5.ENCENDER EL MOTOR 💨 
// Le decimos al servidor que quede vigilando el puerto 3000
app.listen(3000, () =>{
    console.log("🎉¡Servidor funcionando! URL: http://localhost:3000");
})

