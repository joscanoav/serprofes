const btn = document.getElementById("btn-nueva");
const container = document.getElementById("foto-container");

async function cargaFoto() {
    // Mensaje mientras carga
    container.innerHTML = "⌛ Buscando perrito por internet ..."
    try {
        //Petición a la API
        const respuesta = await fetch(
            "https://api.thedogapi.com/v1/images/search"
        );
        // Verificamos si hubo error
        if(!respuesta.ok){
            throw new Error("Fallo en el servidor");
        }
        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        // La API devuelve un array
        const data = datos[0];
        // Nombre de la raza
        const nombreRaza = 
            data.breeds?.[0]?.name ||
            "Raza desconocida (Mestizo)";
        // Mostramos imagen + raza
        container.innerHTML = `
            <img
                src="${data.url}"
                alt="Perro aletorio"
            />
            <p>
                <strong>Raza:</strong>${nombreRaza}
            </p>
        `;
    } catch (error){
        //Si algo falla
        container.innerHTML = `
            <p style="color:red;">
            ❌ Error al cargar la imagen:
            ${error.message}
        `;
    }
}
//Evento del botón
btn.addEventListener("click",cargaFoto);
//Cargar una foto al iniciar
cargaFoto();