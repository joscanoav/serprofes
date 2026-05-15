// 1. NUESTRA BASE DE DATOS MOCK
// Array de objetos [ rol , texto ]
let historialChat = [
    { rol: "ia", texto: "¡Hola! Soy IA Master. ¿En qué te ayudo?"},
    { rol: "usuario", texto: "Quiero aprender JavaScript"},
    { rol: "ia", texto: "¡Excelente elección! Empezaremos por los Arrays."}
];

//2. LA FUNCION PINTORA (Visual)
// Esta función recibe una lista (nuestro array) y lo dibuja en la pantalla
function pintarChat(listaMensajes){
    // PASO 1 = Buscamos en el HTML la etiqueta donde vamos a meter los mensajes
    let caja = document.getElementById('caja-mensajes');
    // PASO 2 = Borramos la pizarra.
    // Si no hacemos esto, cada vez que enviemos un mensajes nuevo,
    // se volverá a pintar todo el historial antiguo
    caja.innerHTML = "";
    // PASO 3: EL TRABAJADOR VIRTUAL (El bucle FOR)
    // MATENEMOS EL BUCLE FOR QUE APRENDIMOS AYER
    // Le decimos que dé tantas vueltas como mensajes haya en la lista.
    // (listaMensajes.length)
    for(let i = 0; i < listaMensajes.length;i++){
        // PASO 4 : EL CONDICIONAL TERNARIO (Un "IF" resumido en una linea)
        // Le preguntamos: ¿El rol de este mensaje es "usuario"?
        // Si es true(?) -> usamos la clase verde("msg-usuario")
        // Si es false(:) -> usaos la clase gris ("msg-ia")
        let claseCSS = listaMensajes[i].rol === "usuario" ? "msg-usuario" : "msg-ia";
        // PASO 5 : INYECTAR EL HTML (Usando comillas invertidas ``)
        // Las comillas invertidas nos permiten meter variables de JS dentro del HTML
        // usando el símbolo de dólar y las llaves ${...}.
        // caja.innerHTML += significa "añade este bloque al final de lo que haya"
        caja.innerHTML +=
                             `<div class = "${claseCSS}">
                             <b>${listaMensajes[i].rol.toUpperCase()}:</b><br>
                             ${listaMensajes[i].texto}</div>
                             `;
    }
    // PASO 6 : EL AUTO-SCROLL (El truco de Whatsapp)
    // Le decimos a la caja que baje su barra de desplazamiento hasta el fondo
    // Para que siempre veamos el último mensaje enviado
    caja.scrollTop = caja.scrollHeight;
}

pintarChat(historialChat);


function enviarPrompt(event) {
    // Evitamos que la pagina web parpadee y se recargue al enviar el formuario
    event.preventDefault();
    // Atrapamos la cajita de texto donde el usuario escribe
    let input = document.getElementById('mensaje-input');

    // Sacamos el texto que ha escrito y le quitamos los espacios en blanco
    // con .trim()
    let mensaje = input.value.trim();

    //2. Condicional

    if (mensaje === "") {
        alert("⚠️¡Error! Escribe algo primero");
        // El return expulsa a JS de la funcion para no siga leyendo
        return;
    }
    // a) Guardamos el mensaje real del usuario
    let nuevoMensaje = { rol: "usuario", texto: mensaje};
    historialChat.push(nuevoMensaje);// Lo metemos al final del Array
    // b) EL TRUCO : Simulamos que la IA nos responde al instante creando otro objeto
    let respuestaIA = { rol: "ia", texto: "Estoy procesando tu mensaje: '" + mensaje + "'"};
    historialChat.push(respuestaIA);

    // c) Como el array ha cambiado (Tiene dos mensajes más), obligamos a la web repintarse
    pintarChat(historialChat);
    // d) Limpiamos el texto que quedo escrito en el input
    input.value = "";
    input.focus();
}

//MINI RETO 1 : Ver TODO
function mostrarTodo() {
    pintarChat(historialChat);
}
// MINI RETO 2 :El portero (Filter) Mis mensajes
function verMisMensajes() {
    // Revisa todo el historial. Acada mensaje lo llama "msj"
    // Devuelve una lista nueva SOLO con los que cumplan la regla
    // (rol === "usuario")
    let soloUsuario = historialChat.filter(msj => msj.rol === "usuario");
    //Le pasamos esa lista cortita a nuesta función pintora
    pintarChat(soloUsuario);
}

function modoGritar() {

    // Entra a todo el historial. Por cada mensaje ("msj"), construye un objeto nuevo.
    let chatGritando = historialChat.map(msj =>{
        return {
            rol: msj.rol,
            // Aquí está la transformación: convertimos el texto original a MAYÚSCULAS
            texto: msj.texto.toUpperCase()
        };
    });
    // Le pasamos esa lista transformada a nuestra función pintura
    pintarChat(chatGritando);
}

// Reto 1 : Boton Borrar

function borrarChat() {
    //1. Vaciamos la memoria (Array vacío)
    historialChat = [];
    //2. Pintamos en el html
    pintarChat(historialChat);
}

// Reto 2 : Buscador inteligente (Filter + Includes)
function buscarMensaje() {
    //1. Atrapamos lo que el usuario ha escrito en la cajita del buscador
    // Usamos .toLowerCase() para pasarlo a minúsculas y evitar problemas de mayúsculas/minúsculas
    let palabraBuscada = document.getElementById('input-buscador').value.toLowerCase();
    //2. Usamos el portero (Filter) para revisar el historial
    let resultados = historialChat.filter(msj => {
        //Pasamos el texto original del mensaje a minúsculas y le preguntaremos:
        // "¿Este texto .includes() (incluye) la palabra buscadas?"
        return msj.texto.toLowerCase().includes(palabraBuscada);
    });
    //3. Pintamos la pantalla SOLO los resultados encontrados
    pintarChat(resultados);
}