const input = document.getElementById("poke-input");
const btn = document.getElementById("btn-buscar");
const out = document.getElementById("resultado");

btn.addEventListener("click", async () =>{
    //Limpiamos el texto y lo pasamos a minúsculas (La API falla si le envías mayúsculas)
    const termino = input.value.trim().toLowerCase();
    if (termino === ""){
        out.textContent = "⚠ Por favor, escribe un nombre o ID.";
        return;
    }
    out.textContent = "⌛ Cargando datos desde la PokéAPI...";

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termino}`);
        
    }

})