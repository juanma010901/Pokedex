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
          tarjeta.classList.add("imagen");

          const front = document.createElement("div");
          front.classList.add("tarjeta");
          front.classList.add("face");
          front.classList.add("front");

          const back = document.createElement("div");
          back.classList.add("tarjeta");
          back.classList.add("face");
          back.classList.add("back");
          

          // Búsqueda del nombre del Pokemon actual
          // console.log(pokemonData.name);
          const pokemonName = pokemonData.name;
          let mayusName = pokemonName.charAt(0).toUpperCase() + pokemonName.substring(1);
          // console.log(mayusName);
          const base_experience = pokemonData.base_experience;
          front.innerHTML = `
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
          img.classList.add("pokemon");
          img.src = imageUrl;
          img.alt = pokemonName;

          const small_img_url = pokemonData.sprites.front_default;
          const small_img = document.createElement("img");
          small_img.classList.add("small_img");
          small_img.src = small_img_url;
          small_img.alt = pokemonName;

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
          line.classList.add("line");

          // Elementos de la cara back
          const weight = pokemonData.weight;
          const peso = document.createElement("h3");
          peso.textContent = "Peso: " + weight;

          const height = pokemonData.height;
          const altura = document.createElement("h3");
          altura.textContent = "Altura: " + height;

          // Agregar los elementos creados a los contenedores padres y las tarjetas al contenedor de tarjetas
          front.appendChild(experiencia);
          front.appendChild(img);
          front.appendChild(line);
          front.appendChild(tipos);
          front.appendChild(types);

          back.appendChild(small_img);
          back.appendChild(peso);
          back.appendChild(altura);

          tarjeta.appendChild(front);
          tarjeta.appendChild(back);
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
      tarjeta.style.display = "flex";
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
    tarjeta.style.display = "flex";
  }
  cancelar.style.display = "none";
  name.value = "";
}