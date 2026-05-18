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



// EJERCICIO 3 : MODO OSCURO
const toggleOscuro = document.querySelector('#themeToggle');
const textoSwitch = document.querySelector('.switch-text');
const cuerpoWeb = document.body;
// PASO A : Comprobar si el usuario ya tenia tenia el modo oscuro
//guardado al cargar la página
const temaGuardado = localStorage.getItem('temaPreferido');
if (temaGuardado === 'oscuro'){
    cuerpoWeb.classList.add('dark');
    toggleOscuro.checked = true;
    textoSwitch.textContent = 'Desactivar Modo Oscuro';
}
//PASO B: Escuchar cuando el usuario marca o desmarca el checkbox
toggleOscuro.addEventListener('change', () =>{
    if(toggleOscuro.checked) {
        //Si check está marcado, ponemos clase oscura y lo guardamos
        cuerpoWeb.classList.add('dark');
        localStorage.setItem('temaPreferido', 'oscuro');
        textoSwitch.textContent = 'Desactivar Modo Oscuro';
    } else {
        //Si se desmarca, quitamos la clase y guardamos la preferencia clara
        cuerpoWeb.classList.remove('dark');
        localStorage.setItem('temaPreferido', 'claro');
        textoSwitch.textContent = 'Activar Modo Oscuro';
    }
});
//