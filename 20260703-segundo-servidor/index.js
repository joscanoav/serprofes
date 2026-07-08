const express = require("express");

const app = express();
const PORT = 3000;

// Catálogo de superhéroes
const marvel = [
    {
        id: 1,
        nombre: "Iron Man",
        poder: "Armadura tecnológica"
    },
    {
        id: 2,
        nombre: "Spider-Man",
        poder: "Trepar paredes"
    },
    {
        id: 3,
        nombre: "Thor",
        poder: "Control del trueno"
    },
    {
        id: 4,
        nombre: "Hulk",
        poder: "Fuerza sobrehumana"
    }
];

// Ruta principal
app.get("/", (req, res) => {
    res.send("¡Bienvenido a mi primera API REST con Express!");
});

// Ruta de la API
app.get("/api/marvel", (req, res) => {
    res.json(marvel);
});

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});