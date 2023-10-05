//IIFE for pokemon
let pokemonRepository = (function () {
  // Array containing Pokemon objects
  let pokemonList = [
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

  //Puts the pokemon onto the list of pokemons
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon not found");
    }
  }

  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    //Gets all entries listed in the pokedex
    getAll: function () {
      return pokemonList;
    },
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Charmander" });
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height >= 1) {
    document.write(
      pokemon.name +
        " " +
        "Height:" +
        " " +
        pokemon.height +
        " - Wow! That's a big Pokemon! " +
        "<br>"
    );
  } else if (pokemon.height) {
    document.write(
      pokemon.name + " " + "Height:" + " " + pokemon.height + "<br>"
    );
  }
});
/* The loop code above was replaced with the foreach() which does the same thing*/
