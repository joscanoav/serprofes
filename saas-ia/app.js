// 1. NUESTRA BASE DE DATOS MOCK
let historialChat = [
    { rol: "ia", texto: "¡Hola! Soy IA Master. ¿En qué te ayudo?"},
    { rol: "usuario", texto: "Quiero aprender JavaScript"},
    { rol: "ia", texto: "¡Excelente elección! Empezaremos por los Arrays."}
];

//2. LA FUNCION PINTORA (Visual)
function pintarChat(listaMensajes){
    let caja = document.getElementById('caja-mensajes');
    caja.innerHTML = "";
    // MATENEMOS EL BUCLE FOR QUE APRENDIMOS AYER
    for(let i = 0; 1 < listaMensajes.length;i++){
        let claseCSS = listaMensajes[i].rol === "usuario" ? "msg-usuario" : "msg-ia";
        caja.innerHTML += `<div class = "${claseCSS}"><b>
        ${listaMensajes[i].rol.toUpperCase()}:</b>
        <br>${listaMensajes[i].texto}</div>
        `;
    }
    caja.scrollTop = caja.scrollHeight;

}
pintarChat(historialChat);








function enviarPrompt(event) {
    // Evitamos que el form recargue la página
    event.preventDefault();

    // 1. Capturar el texto
    let mensaje = document.getElementById('mensaje-input').value.trim();

    //2. Condicional

    if (mensaje === "") {
        alert("⚠️¡Error! Escribe algo primero");
    } else {
        alert("🤖 mensaje recibido:\n" + mensaje);
        //3. Limpiar input
        document.getElementById('mensaje-input').value="";
    }

}