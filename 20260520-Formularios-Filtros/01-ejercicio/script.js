// PRÁCTICA 1: FORMULARIO SIN RECARGA

const form = document.querySelector('#suscripcionForm');
const inputNombre = document.querySelector('#nombreInput');
const cajaMensaje = document.querySelector('#mensajeExito');

// Escuchamos el evento 'submit' (cuando se envia el formulario)
form.addEventListener('submit', (evento) => {
    //1. La línea Mágica: evita que la pagina se recarge
    evento.preventDefault();
    //2. Capturamos lo que el usuario escribió(.trim() quita el espacio)
    const textoEscrito = inputNombre.value.trim();
    //3.Mostramos el mensaje de éxito
    cajaMensaje.textContent = `✅ Usuario "${textoEscrito}" registrado
    correctamente en la base de datos.`;
    cajaMensaje.classList.remove('oculto');
});

//PRÁCTICA 2: BUSCADOR EN TABLA EN TIEMPO REAL

const buscador = document.querySelector('#buscadorUsuarios');
//Seleccionamos TODAS las filas que están dentro del cuerpo de la tabla(tbody)
const filas = document.querySelectorAll('#tablaUsuarios tbody tr');

// El evento 'input' se dispara CADA VEZ que el usuario pulsa una tecla
buscador.addEventListener('input', () => {
    //1. Convertimos lo que escribe el usuario a minúsculas para evitar problemas de mayúsculas
    const terminoBusqueda = buscador.value.toLowerCase();
    //2. Usamos el bucle forEach para revisar fila a fila
    filas.forEach(fila =>{
        //Obtenemos todo el texto de esa fila en minúsculas
        const textoFila = fila.textContent.toLowerCase();
        //3.Condicional: ¿El texto de la fila INCLUYE lo que buscamos?
        if(textoFila.includes(terminoBusqueda)){
            //Si lo incluye, mostramos la fila (dejamos display por defecto)
            fila.style.display = '';
        } else {
            //Si no la incluye la ocultamos
            fila.style.display = 'none';
        }
    }); 
});