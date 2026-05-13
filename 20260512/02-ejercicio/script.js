//1. NUESTRO SÚPER ARRAY (Array lleno de objetos)
const carrito = [
    {nombre: "🍞 Pan de molde", precio:1.20 },
    {nombre: "🥛 Leche entera", precio: 0.90},
    {nombre: "🥚 Huevos Camperos", precio: 2.50},
    {nombre: "🥑 Aguacate", precio:1.00}
];
//CÓDIGO DE APOYO VISUAL
let listaHTML = document.getElementById('lista-producto');
for(let i = 0; i < carrito.length;i++){
    // Usamos carrito[i].nombre para sacar el dato en cada vuelta
    listaHTML.innerHTML += `
    <li><span>${carrito[i].nombre}</span>
    <span>${carrito[i].precio.toFixed(2)}€</span>
    `  
}
// LA FUNCION COBRAR
function cobrar() {
//1. Creamos una variables = acumulador
let sumaTotal = 0;
//2. Creamos un bucle for para recorrer el array
for (let i = 0; i< carrito.length; i++){
    //En cada vuelta le sumamos al "sumaTotal" el precio
    sumaTotal = sumaTotal + carrito[i].precio;
}

//3. Mostramos el resultado final en HTML
document.getElementById('resultado-total').textContent =
"Total: " + sumaTotal.toFixed(2) + " €";

}
