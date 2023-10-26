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
    button.setAttribute("data-toggle", "modal"); // bootstrap attr
    button.setAttribute("data-target", "#modal"); // bootstrap attr
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
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  // Shows Modal with Pokemon
  function showModal(pokemon) {
    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");
    let modalHeader = document.querySelector(".modal-header");

    //Clear all existing modal content
    modalHeader.innerHTML = "";
    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";

    //Creating elemet for the name in modal content
    let nameElement = document.createElement("h1");
    nameElement.innerText = item.name;
    //creating img in modal content
    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.setAttribute("src", item.imageUrl);
    imageElement.classList.add("float-right"); // bootstrap class
    //creating element for height in modal content
    let heightElement = document.createElement("p");
    heightElement.innerText = "height: " + item.height;
    //creating element for type in modal content
    function typeCount(item) {
      if (item.types.length === 2) {
        return item.types[0].type.name + ", " + item.types[1] / type.name;
      } else {
        return item.types[0].type.name;
      }
    }
    let typesElement = document.createElement("p");
    typesElement.innerText = "type: " + typeCount(item);

    //Add the new modal content
    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typeElement);
    modalBody.appendChild(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!

  //generates new li and button itens for each pokemon on the list
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

console.log("Log a debug level message.");
