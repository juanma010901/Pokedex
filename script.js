let tarjetas = []

fetch("https://pokeapi.co/api/v2/pokemon")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.results);
    const contenedorTarjetas = document.querySelector(".repositorio-tarjetas");

    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonData) => {

          // console.log(pokemonData);`
          // Creación de la tarjeta para cada Pokemon
          const tarjeta = document.createElement("div");
          tarjeta.classList.add("tarjeta");

          // Búsqueda del nombre del Pokemon actual
          // console.log(pokemonData.name);
          const pokemonName = pokemonData.name;
          let mayusName = pokemonName.charAt(0).toUpperCase() + pokemonName.substring(1);
          // console.log(mayusName);
          const base_experience = pokemonData.base_experience;
          const small_img = pokemonData.sprites.front_default;
          tarjeta.innerHTML = `
          <h2 class="nombre">${mayusName}</h2>
          `;
          // <img src="${small_img}" alt="${pokemonName}" class="small_img description"></img>
          // title = document.createElement("h1");
          // title.textContent(mayusName);
          // tarjeta.appendChild(title);

          let experiencia = document.createElement("h4");
          experiencia.textContent = `HP ${base_experience}`;
          experiencia.classList.add = "base_experience";
          experiencia.classList.add = "description"

          tarjeta.id = pokemonName;
          tarjetas.push(pokemonName)

          // Petición de la imagen desde la API y creacion de elemntos de imagen
          const imageUrl = pokemonData.sprites.other.dream_world.front_default;
          const img = document.createElement("img");
          img.classList.add("img");
          img.src = imageUrl;
          img.alt = pokemonName;

          let tipos = document.createElement("h4");
          tipos.textContent = "Tipo"

          // Creación del contenedor de tipos
          let types = document.createElement("div");
          types.classList.add("types");
          pokemonData.types.forEach((tipo) => {
            // console.log(tipo.type.name);
            let type = document.createElement("p");
            type.textContent = tipo.type.name;
            types.appendChild(type);
            // types.innerHTML = `<h3 class="type">${type.type.name}</h3>`;
          });

          let line = document.createElement("hr");
          line.classList.add("line")

          // Agregar los elementos creados a los contenedores padres y las tarjetas al contenedor de tarjetas
          tarjeta.appendChild(experiencia);
          tarjeta.appendChild(img);
          tarjeta.appendChild(line);
          tarjeta.appendChild(tipos);
          tarjeta.appendChild(types);
          contenedorTarjetas.appendChild(tarjeta);

        })
        .catch((error) => console.error(error));
      });
      console.log(tarjetas)
  })
  .catch((error) => console.error(error));


function buscar() {
  let name = document.getElementById("name").value.toLowerCase();
  let cancelar = document.getElementById("cancelar");
  cancelar.style.display = "block";
  for (let i = 0; i < tarjetas.length; i++) {
    let tarjeta = document.getElementById(tarjetas[i]);
    if (name === ""){
      tarjeta.style.display = "block";
      cancelar.style.display = "none";
    }
    else if (tarjetas[i] === name) {
      tarjeta.style.display = "flex";
    } else {
      tarjeta.style.display = "none";
    }
  }
}

function cancelar() {
  let name = document.getElementById("name");
  let cancelar = document.getElementById("cancelar");
  for (let i = 0; i < tarjetas.length; i++) {
    let tarjeta = document.getElementById(tarjetas[i]);
    tarjeta.style.display = "block";
  }
  cancelar.style.display = "none";
  name.value = "";
}