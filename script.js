// Arreglo para realizar la búsqueda de Pokemones
let tarjetas = []

// Petición principal a la API PokeAPI 
fetch("https://pokeapi.co/api/v2/pokemon")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.results);
    // Selección del contenedore de cards creado en HTML
    const contenedorTarjetas = document.querySelector(".repositorio-tarjetas");

    // Realizar una segunta petición para cada nombre de los Pokemones recibidos
    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonData) => {

          // console.log(pokemonData);`
          // Creación de la tarjeta para cada Pokemon con las caras Front y Back
          const tarjeta = document.createElement("div");
          tarjeta.classList.add("tarjeta");
          tarjeta.classList.add("imagen");

          // Cara de la cara Frontal
          const front = document.createElement("div");
          front.classList.add("tarjeta");
          front.classList.add("face");
          front.classList.add("front");

          // Creación de la cara Trasera
          const back = document.createElement("div");
          back.classList.add("tarjeta");
          back.classList.add("face");
          back.classList.add("back");
          
          // Información recibida con la petición al nombre del Pokemon actual
          // console.log(pokemonData.name);
          const pokemonName = pokemonData.name;
          let mayusName = pokemonName.charAt(0).toUpperCase() + pokemonName.substring(1);
          tarjeta.id = pokemonName;
          
          // Agrego el nombre del Pokemon actual al arreglo para realizar la busqueda posteriormente
          tarjetas.push(pokemonName);

          // Pedir la experiencia del Pokemon a la API
          const base_experience = pokemonData.base_experience;
          front.innerHTML = `
          <h2 class="nombre">${mayusName}</h2>
          `;

          // Enviar la experiencia del Pokemon actual al frontend
          let experiencia = document.createElement("h4");
          experiencia.textContent = `HP ${base_experience}`;
          experiencia.classList.add = "base_experience";
          experiencia.classList.add = "description"

          // Petición de la imagen desde la API y creacion de elementos de imagen
          const imageUrl = pokemonData.sprites.other.dream_world.front_default;
          const img = document.createElement("img");
          img.classList.add("pokemon");
          img.src = imageUrl;
          img.alt = pokemonName;

          // Petición a la API para traer una imágen diferente y agregarla a la cara posterior
          const small_img_url = pokemonData.sprites.front_default;
          const small_img = document.createElement("img");
          small_img.classList.add("small_img");
          small_img.src = small_img_url;
          small_img.alt = pokemonName;

          // Se crean el elemento de Tipo en el cual se agregaran posteriormente el(los) tipos(s)
          let tipos = document.createElement("h4");
          tipos.textContent = "Tipo"

          // Creación del contenedor de tipos
          let types = document.createElement("div");
          types.classList.add("types");
          // Recorrer los tipos para observar si es uno o varios
          pokemonData.types.forEach((tipo) => {
            let type = document.createElement("p");
            type.textContent = tipo.type.name;
            types.appendChild(type);
          });

          // Creación de la línea horizontal que va en la cara frontal de la card
          let line = document.createElement("hr");
          line.classList.add("line");

          // Elementos de la cara back
          // Pedir Peso a la API y agregarlo a la cara posterior
          const weight = pokemonData.weight;
          const peso = document.createElement("h3");
          peso.textContent = "Peso: " + weight;

          // Pedir Altura a la API y agregarlo a la cara posterior
          const height = pokemonData.height;
          const altura = document.createElement("h3");
          altura.textContent = "Altura: " + height;

          // Agregar botón de mostrar modal
          const boton_modal = document.createElement("button");
          boton_modal.textContent = "Más"
          boton_modal.classList.add("boton");
          boton_modal.setAttribute("id", `${pokemonName}`);
          boton_modal.setAttribute("type", "submit");

          // Info del Modal


          const modal = document.getElementById("miModal");
          boton_modal.addEventListener("click", function() {
            modal.style.display = "block";
            console.log(boton_modal.id);
            modal_name = document.getElementById("modal_name");
            modal_name.innerHTML = `${mayusName}`;
            let subcontenedor_izquierdo = document.createElement("p");
            modal.appendChild(subcontenedor_izquierdo);
            subcontenedor_izquierdo.innerHTML = `Hello`
          })

          var close = document.getElementById("close");
          close.addEventListener("click", function() {
            modal.style.display = "none";
          });

          // Agregar los elementos creados a los contenedores padres y las tarjetas al contenedor de tarjetas
          front.appendChild(experiencia);
          front.appendChild(img);
          front.appendChild(line);
          front.appendChild(tipos);
          front.appendChild(types);

          // Agregar elementos al contenedor de la cara posterior
          back.appendChild(small_img);
          back.appendChild(peso);
          back.appendChild(altura);
          back.appendChild(boton_modal);

          // Contenido del modal
          

          // Agregar cada cara a la tarjeta actual
          tarjeta.appendChild(front);
          tarjeta.appendChild(back);

          // Agregar la tarjeta actual al contenedor de tarjetas creado en el HTML
          contenedorTarjetas.appendChild(tarjeta);

        })
        .catch((error) => console.error(error));
      });
      console.log(tarjetas)
  })
  .catch((error) => console.error(error));

// Función atada al botón de buscar creado en HTML
function buscar() {
  // Cambiar el valor de entrada en el input a minúsculas
  let name = document.getElementById("name").value.toLowerCase();
  let cancelar = document.getElementById("cancelar");
  cancelar.style.display = "block";

  // Condiciones para ocultar y mostrar las cards y el boton de cancelar
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

// Función atada a la Xs para salir de la búsqueda
function cancelar() {
  let name = document.getElementById("name");
  let cancelar = document.getElementById("cancelar");
  // Acciones a realizar si se presiona el botón de cancelar
  for (let i = 0; i < tarjetas.length; i++) {
    let tarjeta = document.getElementById(tarjetas[i]);
    tarjeta.style.display = "flex";
  }
  cancelar.style.display = "none";
  name.value = "";
}