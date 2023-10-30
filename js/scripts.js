//IIFE: Pokemon Repository Listing
let pokemonRepository = (function () {
  // Array containing Pokemon objects
  let pokemonList = [];
  // Link to access the POKEAPI database
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    // creating li element inside the ul
    let listpokemon = document.createElement("li");
    // creating button element inside the li
    let button = document.createElement("button");
    button.classList.add("btn"); // bootstrap class
    button.classList.add("btn-block");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#pokemonModal");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    // Append button to the li listpokemon as its child
    listpokemon.appendChild(button);
    // Append the li listpokemon to the ul pokemonList as its child
    pokemonList.appendChild(listpokemon);
    // Add event listener to button with the showDetails function
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //loads some details inside the pokemon objects: pokemon > detailsUrl > details. then map these details to item.height, item.types, etc.
  //the item parameter will be refering to the individual pokemon objs
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
        showModal(item);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Shows Modal with Pokemon
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElement = $('<img class="modal-img">');
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "HEIGHT : " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "WEIGHT : " + pokemon.weight + "</p>");
    let typesElement = $(
      "<p>" + "TYPES : " + pokemon.types.join(", ") + "</p>"
    );
    let abilitiesElement = $(
      "<p>" + "ABILITIES : " + pokemon.abilities.join(", ") + "</p>"
    );

    typesElement.addClass("array-item");
    abilitiesElement.addClass("array-item");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!

  //generates new li and button items for each pokemon on the list
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
