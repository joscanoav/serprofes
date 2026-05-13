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
