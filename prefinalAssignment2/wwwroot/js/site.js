const pokemonList = document.getElementById('pokemonList');
const pokemonDetails = document.getElementById('pokemonDetails');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const pokemonIDs = [144, 145, 150, 151, 249, 250, 251, 1, 4, 7, 25, 152, 155, 158, 252, 255, 258]; // Add Starter Pokemon IDs here

async function fetchPokemonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function displayPokemonList() {
    for (const id of pokemonIDs) {
        const url = `${apiUrl}/${id}`;
        const pokemon = await fetchPokemonData(url);

        const card = document.createElement('div');
        card.classList.add('card');

        const pokemonName = document.createTextNode(pokemon.name);
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.sprites.front_default;
        pokemonImage.alt = pokemon.name;

        card.appendChild(pokemonImage);
        card.appendChild(pokemonName);
        card.addEventListener('click', () => displayPokemonDetails(pokemon));
        pokemonList.appendChild(card);
    }
}

function displayPokemonDetails(pokemon) {
    pokemonDetails.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <h3>Abilities:</h3>
    <ul>
      ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
    </ul>
    <h3>Moves:</h3>
    <ul>
      ${pokemon.moves.map(move => `<li>${move.move.name}</li>`).join('')}
    </ul>
  `;
}

displayPokemonList();
