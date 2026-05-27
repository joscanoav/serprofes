const btn = document.getElementById("btn-nueva");
const container = document.getElementById("foto-container");

async function cargaFoto() {
    // Mensaje mientras carga
    container.innerHTML = "⌛ Buscando perrito por internet ..."
    try {
        //1. Perición a la nueva API
        const respuesta = await fetch(
            "https://dog.ceo/api/breeds/image/random"
        );

        //Petición a la API
        // const respuesta = await fetch(
        //     "https://api.thedogapi.com/v1/images/search"
        // );
        // Verificamos si hubo error
        if(!respuesta.ok){
            throw new Error("Fallo en el servidor");
        }
        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        // La API devuelve un array
        // const data = datos[0];
        // Nombre de la raza
        // const nombreRaza = 
        //     data.breeds?.[0]?.name ||
        //     "Raza desconocida (Mestizo)";
        
        //2. Extraemos la URL de la imagen (Dog CEO la envía en "message")
        const urlImagen = datos.message;
        //3. Nombre de la raza (Lo extramos cortando la URL)
        const nombreRaza = urlImagen.split('/')[4].replace("-", " ");
        
                
        // Mostramos imagen + raza
        container.innerHTML = `
            <img
                src="${urlImagen}"
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