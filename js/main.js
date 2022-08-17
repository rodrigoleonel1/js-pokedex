//Se cargan todos los Pokemon creados al array "pokedex".
const pokedex = [bulbasaur,ivysaur,venasaur,charmander,charmeleon,charizard,squirtle,wartortle,blastoise,caterpie,metapod,butterfree,weedle,kakuna,beedrill,pidgey,pidgeotto,pidgeot,rattata,raticate,spearow,fearow,ekans,arbok,pikachu,raichu,sandshrew,sandslash,nidoranFemale,nidorina,nidoqueen,nidoranMale,nidorino,nidoking,clefairy,clefable,vulpix,ninetales,jigglypuff,wigglytuff,zubat,golbat,oddish,gloom,vileplume,paras,parasect,venonat,venomoth,diglett,dugtrio,meowth,persian,psyduck,golduck,mankey,primeape,growlithe,arcanine,poliwag,poliwhirl,poliwrath,abra,kadabra,alakazam,machop,machoke,machamp,bellsprout,weepinbell,victreebel,tentacool,tentacruel,geodude,graveler,golem,ponyta,rapidash,slowpoke,slowbro,magnemite,magneton,farfetchd,doduo,dodrio,seel,dewgong,grimer,muk,shellder,cloyster,gastly,haunter,gengar,onix,drowzee,hypno,krabby,kingler,voltorb,electrode,exeggcute,exeggutor,cubone,marowak,hitmonlee,hitmonchan,lickitung,koffing,weezing,rhyhorn,rhydon,chansey,tangela,kangaskhan,horsea,seadra,goldeen,seaking,staryu,starmie,mrMime,scyther,jynx,electabuzz,magmar,pinsir,tauros,magikarp,gyarados,lapras,ditto,eevee,vaporeon,jolteon,flareon,porygon,omanyte,omastar,kabuto,kabutops,aerodactyl,snorlax,articuno,zapdos,moltres,dratini,dragonair,dragonite,mewtwo,mew]

//Array al que se pushearan los pokemon seleccionados para el equipo pokemon

let teamPokemon = []

//Se le asigna a cada objeto del array "pokedex" su respectiva imagen.
pokedex.forEach((pokemon)=>{
    pokemon.img = `./img/${pokemon.name}.png`
})

//Selectores
const divPokemons = document.getElementById('pokemons')
const searchBar = document.getElementById('searchBar')
const orderAlphabeticalAs = document.getElementById('orderAlphabeticalA')
const orderAlphabeticalDs = document.getElementById('orderAlphabeticalD')
const orderNumberAs = document.getElementById('orderNumberA')
const orderNumberDs = document.getElementById('orderNumberD')
const randomOrder = document.getElementById('random')
const yourTeam = document.getElementById('yourTeam')
const resetTeam = document.getElementById('resetTeam')

//Funciones

//Funcion creadora de cards
const cards = (array) => {
    divPokemons.setAttribute("class", "pokemonCards")
    divPokemons.innerHTML = ""
    array.forEach((pokemon) => {
        let pokemonCards = document.createElement("div")
        let colorType = colors[pokemon.type]
        let colorSecondType = colors[pokemon.secondType]
        if(pokemon.secondType == "Ninguno"){
            pokemonCards.innerHTML = `<div id="${pokemon.pokedexNumber+pokemon.name}" class="card">
            <img src="${pokemon.img}" alt="${pokemon.name}">
            <div class="textBox">
                <p class="pokemonNumber">Nº.${pokemon.pokedexNumber}</p>
                <h3 class="pokemonName">${pokemon.name}</h3>
            </div>
            <div class="types">
                <p class="pokemonType" style = "background-color: ${colorType}" >${pokemon.type}</p>
            </div>
            <button class="addTeam" id="${pokemon.name}">Agregar al equipo</button>
         </div>`
        divPokemons.appendChild(pokemonCards)
        }
        
        else{
            pokemonCards.innerHTML = `<div id="${pokemon.pokedexNumber+pokemon.name}" class="card">
            <img src="${pokemon.img}" alt="${pokemon.name}">
            <div class="textBox">
                <p class="pokemonNumber">Nº.${pokemon.pokedexNumber}</p>
                <h3 class="pokemonName">${pokemon.name}</h3>
            </div>
            <div class="types">
                <p class="pokemonType" style = "background-color: ${colorType}">${pokemon.type}</p>
                <p class="pokemonType" style = "background-color: ${colorSecondType}">${pokemon.secondType}</p>
            </div>
            <button class="addTeam" id="${pokemon.name}">Agregar al equipo</button>
        </div>`
        divPokemons.appendChild(pokemonCards)
        }  
        let btnAdd = document.getElementById(`${pokemon.name}`)
        btnAdd.addEventListener("click", addPokemonTeam)
    })

}

//Storage

const saveStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}

//Funciones para ordenar cards

function orderNumberA(){
    divPokemons.innerHTML = ""
    pokedex.sort((a,b)=> (a.pokedexNumber - b.pokedexNumber))
    cards(pokedex)
}
function orderNumberD(){
    divPokemons.innerHTML = ""
    pokedex.sort((a,b)=> (b.pokedexNumber - a.pokedexNumber))
    cards(pokedex)
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
}
function random(){
    divPokemons.innerHTML = ""
    pokedex.sort(() => Math.random() - 0.5)
    cards(pokedex)
}

//Funcion para buscar cards
const searchPokemon = () => {
    const search = searchBar.value.toLowerCase()
    const results = pokedex.filter((pokemon) => pokemon.name.toLowerCase().includes(search))
    cards(results)
}

//Funciones para Equipo Pokemon
const addPokemonTeam = (e) => {
    const pokemonById = e.target.getAttribute('id')
    const pokemonSelected = pokedex.find((pokemon) => pokemon.name == pokemonById)
    if (teamPokemon.length < 6) {
        teamPokemon.push(pokemonSelected)
        saveStorage('teamPokemon', teamPokemon)
    } else {
        alert('El equipo tiene un maximo de 6 Pokemon')
    }
}
const pokemonsForTeam = () =>{
    divPokemons.innerHTML = ""
    cards(teamPokemon)
}
const clearTeam = () => {
    teamPokemon = []
    saveStorage('teamPokemon', teamPokemon)
    divPokemons.innerHTML = ""
    orderNumberA()
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

//Inicializacion 

cards(pokedex)

if (localStorage.getItem('teamPokemon')) {
    teamPokemon = JSON.parse(localStorage.getItem('teamPokemon'))
}
