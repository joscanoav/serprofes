//1. EL OBJETO
//Usamos llaves {} para crear la ficha tecnica
// y dos puntos para dar valor
let producto = {
    nombre: "🍎 Manzanas",
    precio: 2.5,
    categoria: "Fruta",
};

//2. ¿Cómo leemos un dato concreto y lo mandmos
// al html?
document.getElementById("prod-nombre").textContent=producto.nombre; 