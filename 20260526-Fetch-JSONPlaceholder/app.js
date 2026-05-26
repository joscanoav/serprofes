import { callAPI } from "./api.js";

// Atrapamos los elementos de la interfaz
const pantalla = document.getElementById('pantallaResultados');
const btnBuscar = document.getElementById('btnBuscar');
const inputId = document.getElementById('inputId');
const btnError = document.getElementById('btnError');
const formCrear = document.getElementById('formCrear');

// GET DINAMICO (Buscar Publicación)
btnBuscar.addEventListener('click', async ()=>{
    const id = inputId.value.trim();
    //Seguridad: Que no nos envien campos vacíos
    if(id === ""){
        pantalla.textContent = "⚠ Por favor, escribe un número de ID.";
        return;
    }
    pantalla.textContent = "⌛ Viajando a internet ...";
    
    try {
        //Llamos a nuestro cartero con la ruta dinámica
        const post = await callAPI(`/posts/${id}`);
        // Pintamos el objeto pantalla de forma bonita
        //JSON.stringify(objeto,null,2)le da el formato de línea y espacios
        pantalla.textContent = JSON.stringify(post, null, 2);
    }catch(error){
        pantalla.textContent = "❌ No se encontró la publicación o hubo un error."
    }
});