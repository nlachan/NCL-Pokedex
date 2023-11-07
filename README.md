# Pokedex JavaScript Application

## Project Overview

This JavaScript application represents my proficiency in utilizing HTML, CSS, and JavaScript. It functions as a web-based Pokedex, connecting to the PokeAPI to retrieve Pokémon data. Users can effortlessly browse through a comprehensive list of Pokémon and access detailed information about each creature via a modal interface.

## Utilized Libraries

The application incorporates the following libraries:

Bootstrap
jQuery

## Link to the API Used for this Project

To access Pokémon data, this application leverages the PokeAPI, available at https://pokeapi.co.

## JavaScript Module Features

This JavaScript module manages a list of Pokémon obtained from the PokeAPI. Here is a breakdown of its key functionalities:

**Initialization**:

The pokemonRepository module is defined as an immediately invoked function expression (IIFE) for encapsulation.
An empty pokemonList array is initialized to store Pokémon data.
The apiUrl is configured to fetch the first 150 Pokémon from the PokeAPI.

**Adding Pokémon**:

The 'add' function enables the addition of Pokémon objects to the pokemonList if they are of type "object."

**Pokémon List Handling**:

The 'getAll' function retrieves the entire pokemonList.
The 'removeAllItems' function clears the displayed Pokémon list.
The 'addListItem' function generates a list item for a given Pokémon and appends it to the display list.

**Fetching Data from the API**:

The 'loadList' function retrieves the list of Pokémon from the API, sorts them alphabetically, and adds them to the pokemonList.
The 'loadDetails' function fetches detailed data for a specific Pokémon from the API.

**Modal Handling**:

The 'showDetails' function displays comprehensive information about a Pokémon in a modal after fetching its details.
The 'showModal' function creates the modal, presenting the Pokémon's name, image, height, weight, type, and abilities.
The 'hideModal' function conceals the modal.

**Event Listeners**:

An event listener for the "Escape" key is established to close the modal when the key is pressed.
The Pokémon names are converted to lowercase for consistent matching during the search.

**Module Return**:

Several functions are made accessible to the public by returning them at the end of the IIFE.

**Execution**:

Following the module's definition, the Pokémon list is loaded from the API and displayed for user interaction.
