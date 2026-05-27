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

// CONTROL DE ACCIDENTES (TRY ... CATCH)
btnError.addEventListener('click', async () =>{
    pantalla.textContent = "⌛ Forzando un accidente...";

    try {
        //Enviamos al cartero a una ruta que no existe en el servidor
        const data = await callAPI("/ruta-inventada-que-no-existe");
        pantalla.textContent = JSON.stringify(data, null, 2);
    }catch (error){
        //Como la ruta da erro 404, el codigo salta directamente aquí y no se rompe la web
        pantalla.textContent = `🛡 ¡ El escudo Try/Catch funcionó!\nDetalle:${error.message}`;
    }
});

// CREAR DATOS (POST)
//En las empresas , no solo leemos internet, también mandamos información (Registros, compras...)

formCrear.addEventListener('submit', async (evento) => {
    //1.Evitamos el parpadero de la web al enviar formulario
    evento.preventDefault();

    pantalla.textContent = "⌛ Empaquetando y enviado datos...";
    //2. Construimos el "paquete" con la información de los inputs
    const tituloNuevo = document.getElementById('inputTitulo').value;
    const cuerpoNuevo = document.getElementById('inputCuerpo').value;

    const paqueteDatos = {
        title: tituloNuevo,
        body: cuerpoNuevo,
        userId: 1 // Ponemos un ID de usuario fijo simulando que estamos logueados
    };

    try {
        //3. Llamamos al cartero, pero esta vez le pasamos "opciones"(Método POST y el body)
        const respuestaServidor = await callAPI("/post", {
            method: "POST", // Método para crear
            body: JSON.stringify(paqueteDatos)// Convertimos nuestro objeto JS a texto JSON
        });
        //4. El servidor nos responde con el objeto creado (incluyendo su nuevo ID)
        pantalla.textContent = `✅¡Creación exitosa en el servidor!\n\n` + JSON.stringify(respuestaServidor, null, 2);
        //Limpimos los inputs
        document.getElementById('inputTitulo').value = "";
        document.getElementById('inputCuerpo').value = "";
    } catch (error) {
        pantalla.textContent = `❌Falló la creación: ${error.message}`;
    }

});