let historialChat = [];
let titulosRecientes = []; // Array de los titulos del menu lateral negro

// FUNCIÓN DE ARRANQUE: Busca en el disco duro del navegador nada mas al abrir la web
function cargarMemoria() {
    let memoriaChat = localStorage.getItem('chatGuardado');
    let memoriaTitulos = localStorage.getItem('titulosGuardados');

    //Si el navegador tiene datos guardados, lo transformamos de texto a array

    if(memoriaChat){
        historialChat = JSON.parse(memoriaChat);
    } else {
        // Si el usuario entra por primera vez, le dejamos solo el saludo inicial
        historialChat = [{ rol: "ia", texto: "¡Hola! Soy IA Master. ¿En qué te ayudo hoy?"}];
    }

    if (memoriaTitulos){
        titulosRecientes = JSON.parse(memoriaTitulos);
    }
    //Dibujamos la pantalla con lo que hemos rescatado en la memoria
    pintarChat(historialChat);
    actualizarHistorialLateral();
}

//Ejecutamos la función automáticamwnte al cargar el script
cargarMemoria();

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

function enviarPrompt(event){
    event.preventDefault();

    let input = document.getElementById('mensaje-input');
    let mensaje = input.value.trim();

    if (mensaje === ""){
        alert("⚠️ ¡Error! Escribe algo primero");
        return;
    }

    // A) Guardamos el mensaje real del usuario en el historial
    historialChat.push({rol: "usuario", texto: mensaje});
    //B) Metemos el mensaje en el historial del menú lateral (MAX 5)
    titulosRecientes.push(mensaje);
    if (titulosRecientes.length > 5) {
        titulosRecientes.shift(); // Borra el más antiguo de la final para no saturar
    }
    actualizarHistorialLateral();
    //C) Pintamos el mensaje del usuario y guardamos ambos arrays en el texto plano    
    pintarChat(historialChat);
    //stringfy convierto un objeto o array a texto.
    localStorage.setItem('chatGuardado', JSON.stringify(historialChat));
    localStorage.setItem('titulosGuardados', JSON.stringify(titulosRecientes));

    input.value = "";
    input.focus();

    //D) El EFECTO "IA PENSANDO..."
    let caja = document.getElementById('caja-mensajes');
    caja.innerHTML += `
        <div class="msg-ia" id="mensaje-pensando">
            <b>IA MASTER:</b><br>✍️ Pensando...
        </div>
    `;

    caja.scrollTop = caja.scrollHeight; // Bajamos el scroll para ver el pensando
    
    // E) Retrasamos la respuesta real de la IA 1.5 segundos (1500ms)
    setTimeout(() => {
        //1. Elimanos de la pantalla el indicador "Pensnando..."
        document.getElementById('mensaje-pensando').remove();
        //2. Metemos la respuesta definitiva en el  Array
        historialChat.push({rol: "ia", texto: "Estoy procesando tu mensaje: '" + mensaje + "'" });
        //3. Volemos a pintar el chat completo y actualizamos la memoria del disco duro
        pintarChat(historialChat);
        localStorage.setItem('chatGuardado', JSON.stringify(historialChat));
    }, 1500);
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
    // //1. Vaciamos la memoria (Array vacío)
    // historialChat = [];
    // //2. Pintamos en el html
    // pintarChat(historialChat);
    historialChat = [];
    titulosRecientes = [];
    // Eliminamos por completo las llaves del disco duro
    localStorage.removeItem('chatGuardado');
    localStorage.removeItem('tituloGuardados');
    // Volvemos a pintar todo (Ahora quedara todo limpio)
    pintarChat(historialChat);
    actualizarHistorialLateral();
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

