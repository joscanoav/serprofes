function calcularIMC() {
    /*Obtener datos*/
    let peso = Number(document.getElementById('input-peso').value);
    let altura = Number(document.getElementById('input-altura').value);
    let etiqueta = document.getElementById('mensaje-salida');

    //FORMULA DEL IMC : peso / altura(cuadrado)
    // let imc = peso / (altura ** 2 ); 
    let imc = peso / (altura * altura);
    
    //MULTIPLES DECISIONES
    if (imc < 18.5) {
        etiqueta.textContent = "Tu IMC es " + imc.toFixed(1) + ". Eres un esqueleto 🩻";
        etiqueta.style.color = "blue";
    } else if (imc >= 18.5 && imc <= 24.9) {
        etiqueta.textContent = "Tu IMC es " + imc.toFixed(1) + ". Estas en la linea 😁";
        etiqueta.style.color = "green";
    } else {
        etiqueta.textContent = "Tu IMC es " + imc.toFixed(1) + ". DANGER!! 🐷"
        etiqueta.style.color = "red";
    }
}