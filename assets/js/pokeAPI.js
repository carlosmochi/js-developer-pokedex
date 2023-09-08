
const pokeApi = {};

function convertPokeApiToPokemon(pokeApi){
    const pokemon = new Pokemon();
    pokemon.name = pokeApi.name;
    pokemon.number = pokeApi.id;
    pokemon.types = pokeApi.types.map((slot) => slot.type.name);
    pokemon.sprite = pokeApi.sprites.other.dream_world.front_default;
    pokemon.type = pokeApi.types[0].type.name;
    pokemon.abilities = pokeApi.abilities.map((ability) => ability.ability.name);
    pokemon.height = pokeApi.height + ' lbs.';
    if(pokemon.height == 1){
        pokemon.height += " foot"
    }else{
        pokemon.height += " feet"
    }
    pokemon.weight = pokeApi.weight;
    pokemon.species = pokeApi.species.name;
    pokemon.hp = pokeApi.stats[0].base_stat;
    pokemon.attack = pokeApi.stats[1].base_stat;
    pokemon.defense = pokeApi.stats[2].base_stat;
    pokemon.spattack = pokeApi.stats[3].base_stat;
    pokemon.spdefense = pokeApi.stats[4].base_stat;
    pokemon.speed = pokeApi.stats[5].base_stat;

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => {return response.json()})
        .then((pokemon) =>  {return this.convertPokeApiToPokemon(pokemon)})
}

pokeApi.getPokemons = (offset = 0, limit = 36) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    var pokemonList = []
    return fetch(url)
        .then((response) => {return response.json()})
        .then((data) => {return pokemonList = data.results})
        .then((pokemons) => {
            return pokemons.map(pokeApi.getPokemonDetails)
        })
        .then((detailedRequests) => { return Promise.all(detailedRequests)})
        .then((pokemonDetails) => {return pokemonDetails
        })
        .catch((err) => {console.error(err)});
}

