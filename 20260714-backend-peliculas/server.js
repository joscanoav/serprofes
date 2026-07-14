//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");// Importamos nuestro guardián de seguridad

//=============================================
//2. INICIALIZACIÓN
//=============================================
const app = express();

//=============================================
//3. MIDDLEWARES (CONFIGURACIÓN GLOBAL)
//=============================================
//REGLA DE ORO: ¡CORS SIEMPRE ANTES DE LAS RUTAS!
app.use(cors());// Da permiso a React para entrar sin que el navegador lo bloquee
app.use(express.json());// Traduce el texto entrante a formato JSON

//===============================================
//4. NUESTRA BASE DE DATOS
//===============================================
let peliculas = [
    {id:1, titulo: "Matrix", director: "Lana Wachowski"},
    {id:2, titulo: "Interstellar", director: "Christopher Nolan"}
];

//================================================
//5. RUTAS DE LA API (CRUD)
//================================================
app.get("/api/peliculas", (req,res)=>{
    res.json(peliculas);
});


//==========================================
//6. ENCENDIDO DEL SERVIDOR
//==========================================
app.listen(3000, () => {
    console.log("🎬 Servidor de películas listo en el puerto 300 (CORS Activado)");
});