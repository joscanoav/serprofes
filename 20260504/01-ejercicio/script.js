console.log("¡El cerebro de la web está funcionando!");
// Función saludar
function saludar(){
    let nombre = prompt("¿Cómo te llamas?");
    alert("¡Hola " + nombre + " ! Ya eres programador/a.");
}

// Funcion Condicional
function verificarAcceso() {
    let edad = prompt("Introduce tu edad :");

    if (edad >=18) {
        alert("¡Acceso permitido!");
        console.log("Estado mayor de edad");
    } else {
        alert("¡Acceso denegado! Eres menor.");
        console.log("Estado: Menor de edad detectado.");
    }

}