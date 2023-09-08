const pokemonList = document.getElementById("pokemonList");
const nextButton = document.getElementById("paginationNext");
const detailsPopup = document.getElementById("pokedexPopup");
const limit = 36;
let offset = 0;

let maxRecords = 151;

 function loadPokemons(offset, limit){
    function convertPokemonToLi (pokemon){
        const newLI = `<li class="pokemon ${pokemon.type}">
                            <span class="number">#${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>
                            <div class="detail">
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                                </ol>
                                 <img src="${pokemon.sprite}" alt="${pokemon.name}">
                            </div>
                        </li>`;
        return newLI;
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newList = pokemons.map(convertPokemonToLi)
        const newHTML = newList.join("");

        pokemonList.innerHTML += newHTML;

        for(let i = 0; i < pokemonList.children.length; i++){
            pokemonList.children[i].addEventListener('click', () => { 
                detailsPopup.removeAttribute('hidden');
                detailsPopup.innerHTML = 
                `<button id="closePopup" >
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjExNyAxMmw3LjUyNyA2LjIzNS0uNjQ0Ljc2NS05LTcuNTIxIDktNy40NzkuNjQ1Ljc2NC03LjUyOSA2LjIzNmgyMS44ODR2MWgtMjEuODgzeiIvPjwvc3ZnPg==" class="popupBtn">
                 </button>`;
                detailsPopup.innerHTML +=loadPokemonDetails(pokemons[i]);
                detailsPopup.classList.add(pokemons[i].type)
                document.getElementById("closePopup").addEventListener('click', () => {
                    detailsPopup.setAttribute('hidden', true)
                 });
            })
        }
    })
        .catch((err) => {console.log(err)});
 }
 loadPokemons(offset, limit)

 function loadPokemonDetails(pokemon){
    const pokemonData = 
    `<img src="${pokemon.sprite}" alt="${pokemon.name}" class="pokedexImg">
    <div class="pokedexInfo">
        <div class="pokedexDetail">
            <h2 class="pokedexName">${pokemon.name}</h2>
            <h4 class="pokedexNumber">#${pokemon.number}</h4>
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
        </div>
        <div class="pokedexInfoAbout">
            <div class="pokeInformation">
                <label>Height</label><span>${pokemon.height}</span>
                <label>Weight</label><span>${pokemon.weight}</span>
                <label>Abilities</label>
                <span>${pokemon.abilities.map((ability) => `${ability}`)}</span>
            </div>
            <h3>Base Stats</h3>
            <div class="pokeBaseStats">
                <div>
                    <label>HP</label><span>${pokemon.hp}</span>
                </div>
                <div>
                    <label>Attack</label><span>${pokemon.attack}</span>
                </div>
                <div>
                    <label>Defense</label><span>${pokemon.defense}</span>
                </div>
                <div>
                    <label>Sp. Attack</label><span>${pokemon.spattack}</span>
                </div>
                <div>
                    <label>Sp. Defence</label><span>${pokemon.spdefense}</span>
                </div>
                <div>
                    <label>Speed</label><span>${pokemon.speed}</span>
                </div>
            </div>
        </div>
    </div>`;

   return pokemonData;
 }
 
 nextButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecords = offset+limit

    if( qtdRecords >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemons(offset, newLimit)
        nextButton.parentElement.removeChild(nextButton);
    }else{
        loadPokemons(offset, limit);
    }
    console.log("clicked");
 })