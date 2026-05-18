// EJERCIO 1 : CONTADOR DE CLICS (Gestion de Datos)
//1. Identificamos las etiquetas exactas que vamos a manipular
const btnContar = document.querySelector('#countBtn');
const spanCount = document.querySelector('#count');

// 2. Variable global para recordar el numero de clics
let contador = 0;

//3. Escuchamos el evento clic en el boton
btnContar.addEventListener('click', ()=> {
    contador++ //Incrementa en 1 el valor matemático
    spanCount.textContent = contador; // Inyectamos el numero numero en el HTML
});

// EJERCICIO 2 : TOGGLE MENU (Manipulación de Clases CSS)
const btnToggle = document.querySelector('#toggleMenu');
const nav = document.querySelector('#mainNav');

btnToggle.addEventListener('click', () =>{
    //classList.toggle() es mágico: si la clase 'oculto' está, la quita. Si no está la pone
    nav.classList.toggle('oculto');
    // cambiamos el texto del botón dependiendo de si el menú está visible o no
    const estaOculto = nav.classList.contains('oculto');
    if(estaOculto) {
        btnToggle.textContent = 'Mostrar Menu';
    }else {
        btnToggle.textContent = 'Ocultar Menú';
    }
});