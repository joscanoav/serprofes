import { baseURL } from "./config";

/**callAPI: Nuestro cartero virtual (Cliente Genérico) 
* @param {String} ruta - La ruta final(ej. "/post/1")
* @param {object} opciones - Configuaración extra (POST, DELETE...)
*/
export async function callAPI(ruta, opciones = {}){
    //1. Construimos la URL completa (Base + Ruta)
    const urlCompleta = `${baseURL}${ruta}`;

    //2. Iniciamos el bloque de seguridad (intenta hacer esto si fallas
    // cae el CATCH)

    try {
        // 3. El 'await' pausa la ejecucion hasta que el servidor conteste
        const respuesta = await fetch(urlCompleta, {
            headers: {"Content-Type": "application/json"},
            ...opciones // Pegamos cualquier opción extra que nos pasen
        });
        
        //4. Verificamos el estado(El servidor respondió,
        //pero igual dijo "404 No encontrado")
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
        }
        //5. Traducimos el paquete (JSON) a un objeto de que JavaScript entienda
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        //6. Si se cae el intenet o la URL no existe, lo atrapamos aqui
        console.error("Fallo crítico en el cartero: ", error)
        throw error; // Lanzamos el error hacia arriba para que la pantalla lo muestre
    }

}
