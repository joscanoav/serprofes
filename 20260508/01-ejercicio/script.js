//GENERAR NUMERO ALETORIO
// Math.random() genera u número entre 0 y 11
// * 10 => 0 y 9
// +1 => 1 y 10
//Math.floor elimina los decimales
let numeroSecreto = Math.floor(Math.random()*10) + 1;
//Variables del juego
let vidas = 3;
// FUNCION PRINCIPAL
function comprobarNumero() {
    //Captura el numero que escribe el usuario
    let intento = Number(
        document.getElementById("input-numero").value
    );
    // Captura el párrafo donde mostramos mensajes
    let etiqueta = document.getElementById('mensaje-salida');
    //Captura el texto de vida
    let textoVidas = document.getElementById('texto-vidas');

    //SI EL USUARIO GANA
    if (intento === numeroSecreto) {
        etiqueta.textContent =
            "¡HAS GANADO! 🎉El número era " + numeroSecreto;
        etiqueta.style.color = "green";
    } else {
        //Restamos vidas
        vidas--;
        //Actualizar el texto de vidas en la pantalla
        textoVidas.textContent = "Vidas: " + vidas + " 💗";

    // **PISTAS**
    if(intento < numeroSecreto) {
        etiqueta.textContent =
        "¡Fallo! El número es MAYOR ⬆";
    } else {
        etiqueta.textContent =
        "¡FALLO! El número es MENOR ⬇"
    }
    etiqueta.style.color = "orange";
    // GAME OVER
    if(vidas === 0) {
        etiqueta.textContent = 
            "💀 GAME OVER. El número era " + numeroSecreto;
        etiqueta.style.color = "red";
        //Desactivar el botón
        document.getElementById('btn-jugar').disabled = true;
    }
    }

    
}
