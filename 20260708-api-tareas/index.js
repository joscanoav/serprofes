//PRIMER SERVIDOR WEB CON EXPRESS
//1. Importamos la librería Express.
//Express nos permite crear servidores web de forma sencilla
const express = require("express");
//2. Creamos una aplicación con Express.
//La variable "app" será nuestro servidor
const app = express();
//3. Definmos el puerto donde escuchará el servidor
// En esta caso utilizaremos el puerto 3000
const PORT = 3000;
//4. Iniciamos el servidor
//listen() hace que el servidor quede esperando peticiones
//de los clientes (por ejemplo, desde un navegador)

//================================================
//MIDDLEWARE
//================================================
// Un middleware es una función que se ejecuta antes de
//llegar a las rutas.
// express.json()convierte automáticamente los datos
//enviados en formato JSON en un objeto JavaScript.
//Gracias a este middleware podremos acceder a :
// req.body
//cuando el cliente envíe información mediate POST o PUT.
app.use(express.json());

//=========================================
//BASE DE DATOS EN MEMORIA
//=========================================
// Simulamos una base de datos utilizando un arreglo
//IMPORTANTE:
//Los datos solo existen mientras el servidor está
//encendido
//Si detenemos Node.js, toda esta información se pierde
let tareas = [
    // Primera tarea
    {
        id: 1,
        titulo: "Aprender Express",
        completada: false
    },
    // Segunda tarea
    {
        id:2,
        titulo: "Estudiar Node.js",
        completada: true
    },
    // Tercera tarea
    {
        id:3,
        titulo: "Practicar Thunder Client",
        completada:false
    }

];

//================================
//RUTA PRINCIPAL
//================================
app.get("/", (req, res)=> {
    res.send("🚀 Bienvenido a la API REST de Tareas");
})









app.listen(PORT, () => {
    //5. Cuando el servidor se incicia correctamente,
    //mostramos un mensaje en la consola.
    console.log(`🎉Servidor ejecutándose en http://localhost:${PORT}`);
});



