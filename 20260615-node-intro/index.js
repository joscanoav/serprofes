// Mostramos información del sistema
// console.log("Inicializando el cuarto de máquinas");
// console.log("Versión Node:");
// console.log(process.version);

// Importamos Express
const express = require("express");
// Creamos la aplicación
const app = express();
// Ruta principal
//Cuando alguien visite ejecuta esta función
app.get("/",(req,res)=>{
    //enviar respuesta
    res.send("Servidor funcionando");
});

app.get("/saludo", (req, res) => {
    res.send("Hola alumnos");
});

// Arrancamos servidor
// Escucha el puerto 3000
app.listen(3000,()=> {
    console.log("Servidor iniciado");
});


