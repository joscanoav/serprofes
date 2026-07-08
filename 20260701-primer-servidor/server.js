//1. Importamos Express (nuestro motor del servidor)
const express = require('express');
const app = express();
//2. Creamos nuestra primera RUTA (El servidor escucha)
app.get('/', (req, res) => {
    //Cuando alguien visite esta ruta, el servidor responde esto:
    res.send('Hola, ¡Bienvenido al Backend!');
});
//3. Encendemos el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('🎉 Servidor encendido y escuchando en el puerto 3000')
});