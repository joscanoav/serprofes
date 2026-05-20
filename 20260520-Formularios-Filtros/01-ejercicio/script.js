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