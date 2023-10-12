// IIFE for pokemon
var pokemonRepository = (function () {
  // Array containing Pokemon objects
  let repository = [
    {
      name: "Bulbasaur",
      type: ["Grass", "Poison"],
      species: "Seed",
      height: 0.7,
    },
    {
      name: "Charizard",
      type: ["Fire", "Flying"],
      species: "Lizard",
      height: 1.7,
    },
    {
      name: "Squirtle",
      type: ["Water"],
      species: "Young Turtle",
      height: 0.5,
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return repository;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    // creating li element inside the ul
    let listpokemon = document.createElement("li");
    // creating button element inside the li
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    // Append button to the li listpokemon as its child
    listpokemon.appendChild(button);
    // Append the li listpokemon to the ul pokemonList as its child
    pokemonList.appendChild(listpokemon);
    // Add event listener to button with the showDetails function
    button.addEventListener("click", function () {
      showDetails(pokemon.name);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
