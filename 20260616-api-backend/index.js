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
//🚩RUTA GET: PARA LEER DATOS
// Cuando alguien pregunte por "/api/estudiantes", el servidor muestra la lista
app.get("/api/estudiantes", (req, res)=> {
    res.json(estudiantes);
});

//5.ENCENDER EL MOTOR 💨 
// Le decimos al servidor que quede vigilando el puerto 3000
app.listen(3000, () =>{
    console.log("🎉¡Servidor funcionando! URL: http://localhost:3000");
})

