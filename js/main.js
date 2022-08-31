const pokemonAmount = 898
const pokedex = []
let teamPokemon = []

async function getPokemon(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const pokemonData = await res.json()
    pokedex.push(pokemonData)
}

window.onload = async function() {
    for(let i = 1; i <= pokemonAmount; i++){
        await getPokemon(i)
    }
    divLoader.remove()
    cards(pokedex)
}

// Selectores
const divPokemons = document.getElementById('pokemons')
const searchBar = document.getElementById('searchBar')
const orderAlphabeticalAs = document.getElementById('orderAlphabeticalA')
const orderAlphabeticalDs = document.getElementById('orderAlphabeticalD')
const orderNumberAs = document.getElementById('orderNumberA')
const orderNumberDs = document.getElementById('orderNumberD')
const randomOrder = document.getElementById('random')
const yourTeam = document.getElementById('yourTeam')
const resetTeam = document.getElementById('resetTeam')
const tittle = document.getElementById('tittle')
let divLoader = document.getElementById("loader")

//Se crean variables con colores para luego utilizar cada una en las cards dependiendo el tipo.
const color = {
    steel: "#9eb7b8",
    water: "#4592c4",
    bug: "#bfc901",
    dragon: "#97b3e6",
    electric: "#eed535",
    ghost: "#7b62a3",
    fire: "#fd7d24",
    fairy: "#fdb9e9",
    ice: "#51c4e7",
    fighting: "#ff5d5d",
    normal: "#ddccaa",
    grass: "#9bcc50",
    psychic: "#f366b9",
    rock: "#a38c21",
    ground: "#caac4d",
    poison: "#b97fc9",
    flying: "#4193a4",
    dark: "#a9a9a9"
}

//Funciones

//Funcion creadora de cards
const cards = (array) => {
    divPokemons.setAttribute("class", "pokemonCards")
    tittle.innerHTML = "Pokémon ordenados por número ascendente"
    array.forEach((pokemon) => {
        let pokemonCards = document.createElement("div")
        let type = pokemon.types[0].type.name
        let colorType = color[pokemon.types[0].type.name]
        pokemonCards.innerHTML = `
        <div id="${pokemon.name}" class="card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}" style = "background: radial-gradiant( circle at 50% 0%, ${colorType} 36%, #ffffff 36%)">
            <div class="textBox">
                <p class="pokemonNumber">#${pokemon.id.toString().padStart(3, 0)}</p>
                <h3 class="pokemonName">${pokemon.species.name[0].toUpperCase() + pokemon.species.name.slice(1)}</h3>
            </div>
            <div class="types">
            <p class="pokemonType" style = "background-color: ${colorType}">${type[0].toUpperCase() + type.slice(1)}</p>
            </div>
            <button class="addTeam" id="${pokemon.id}">Capturar Pokémon</button>
        </div>`
        divPokemons.appendChild(pokemonCards)
        let btnAdd = document.getElementById(`${pokemon.id}`)
        btnAdd.addEventListener("click", addPokemonTeam)
    })
}

//Guardar en localStorage

const saveStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}

//Funciones para ordenar cards

function orderNumberA(){
    divPokemons.innerHTML = ""
    pokedex.sort((a,b)=> (a.id - b.id))
    cards(pokedex)
    tittle.innerHTML = "Pokémon ordenados por número ascendente"
}
function orderNumberD(){
    divPokemons.innerHTML = ""
    pokedex.sort((a,b)=> (b.id - a.id))
    cards(pokedex)
    tittle.innerHTML = "Pokémon ordenados por número descendente"
}
function orderAlphabeticalA(){
    divPokemons.innerHTML = ""
    pokedex.sort((a,b) => {
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    })
    cards(pokedex)
    tittle.innerHTML = "Pokémon ordenados por A-Z"
}
function orderAlphabeticalD(){
    divPokemons.innerHTML = ""
    pokedex.sort((a,b) => {
        if(a.name < b.name){
            return 1;
        }
        if(a.name > b.name){
            return -1;
        }
        return 0;
    })
    cards(pokedex)
    tittle.innerHTML = "Pokémon ordenados por Z-A"
}
function random(){
    divPokemons.innerHTML = ""
    pokedex.sort(() => Math.random() - 0.5)
    cards(pokedex)
    tittle.innerHTML = "Generador de orden random"
}

//Funcion para buscar cards
const searchPokemon = () => {
    divPokemons.innerHTML = ""
    const search = searchBar.value.toLowerCase()
    const results = pokedex.filter((pokemon) => pokemon.name.toLowerCase().includes(search))
    cards(results)
    tittle.innerHTML = "Resultados de la búsqueda"
}

//Funciones para Equipo Pokemon
const pokemonsForTeamCard = (array) => {
    divPokemons.setAttribute("class", "pokemonCards")
    divPokemons.innerHTML = ""
    tittle.innerHTML = "Tu equipo"
    array.forEach((pokemon) => {
        let pokemonCards = document.createElement("div")
        let type = pokemon.types[0].type.name
        let colorType = color[pokemon.types[0].type.name]
        pokemonCards.innerHTML = `
        <div id="${pokemon.name}" class="card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
            <div class="textBox">
                <p class="pokemonNumber">#${pokemon.id.toString().padStart(3, 0)}</p>
                <h3 class="pokemonName">${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</h3>
            </div>
            <div class="types">
            <p class="pokemonType" style = "background-color: ${colorType}">${type[0].toUpperCase() + type.slice(1)}</p>
            </div>
            <button class="deleteTeam" id="${pokemon.id}">Liberar Pokémon</button>
        </div>`
        divPokemons.appendChild(pokemonCards)
    })
    array.forEach((pokemon, index)=>{
        document.getElementById(`${pokemon.id}`).addEventListener('click', () => {
            let pokemonInFavorites = document.getElementById(`${pokemon.name}`)
            pokemonInFavorites.remove()
            array.splice(index, 1)
            saveStorage('teamPokemon', teamPokemon)
            Toastify({
                text: `Eliminaste a ${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} de tu equipo.`,
                duration: 3000,
                gravity: "bottom",
                style: {background: "#FF0000"},
            }).showToast();
            pokemonsForTeam()
        })  
    })
}
const clearTeam = () => {
    teamPokemon.length == 0 ? (
        Swal.fire({
            title: "Tu equipo Pokémon ya se encuentra vacio",
            icon: "warning",
            timer: 1500,
            showConfirmButton: false
        })
    ):(
        Swal.fire({
            title: "Perderas todos tus Pokémon.",
            text: `¿Estás seguro de eliminar todo tu equipo?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, estoy seguro.",
            cancelButtonText: "No, no quiero.",
        }).then((result) => {
            if(result.isConfirmed){
                teamPokemon = []
                saveStorage('teamPokemon', teamPokemon)
                divPokemons.innerHTML = ""
                Swal.fire({
                    title: "Equipo vaciado.",
                    text: `Tu equipo esta vacio, puedes agregar nuevos Pokémon para completar tu equipo.`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                })
                orderNumberA()
            }
        })
    )
}
const addPokemonTeam = (e) => {
    const pokemonById = e.target.getAttribute('id')
    const pokemonSelected = pokedex.find((pokemon) => pokemon.id == pokemonById)
    teamPokemon.find((pokemon) => pokemon.id == pokemonById) == undefined ? (
        teamPokemon.length < 6 ? (
            teamPokemon.push(pokemonSelected),
            saveStorage('teamPokemon', teamPokemon),
            Toastify({
                text: `${pokemonSelected.name[0].toUpperCase() + pokemonSelected.name.slice(1)} se ha unido a tu equipo.`,
                duration: 3000,
                gravity: "bottom",
                style: {background: "#0c950c"},
                onClick: () => pokemonsForTeam(),
                }).showToast()
         ) : (
            Swal.fire({
                text: "El equipo tiene un máximo de 6 Pokémon, no puedes agregar más.",
                icon: "error",
                confirmButtonText: "Entendido"
            })
         )
    ):(
        Toastify({
            text: `No puedes agregar a ${pokemonSelected.name[0].toUpperCase() + pokemonSelected.name.slice(1)} porque
            ya ha sido agregado previamente al equipo.`,
            duration: 3000,
            gravity: "bottom",
            style: {background: "#2a75bb"},
            }).showToast()
    )
}
const pokemonsForTeam = () =>{
    divPokemons.innerHTML = ""
    pokemonsForTeamCard(teamPokemon)
}

//EventListeners

orderAlphabeticalAs.addEventListener("click", orderAlphabeticalA)
orderAlphabeticalDs.addEventListener("click", orderAlphabeticalD)
orderNumberAs.addEventListener("click", orderNumberA)
orderNumberDs.addEventListener("click", orderNumberD)
randomOrder.addEventListener("click", random)
searchBar.addEventListener('input', searchPokemon)
yourTeam.addEventListener('click', pokemonsForTeam)
resetTeam.addEventListener('click', clearTeam)

// //Inicializacion 


teamPokemon = JSON.parse(localStorage.getItem('teamPokemon')) || []


