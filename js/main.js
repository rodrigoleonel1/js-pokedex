//Arrays

const pokemonAmount = 898
const pokedex = []
let teamPokemon = []

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
const title = document.getElementById('title')
const modalBody = document.getElementById("modal-body")

//Funciones

//Obtener pokémons desde la API
async function getPokemon(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const pokemonData = await res.json()
    pokedex.push(pokemonData)
}

//Cargar pokémons y cards al cargar la página
window.onload = async function() {
    for(let i = 1; i <= pokemonAmount; i++){
        await getPokemon(i)
    }
    cards(pokedex)
}

//Funcion creadora de cards
const cards = (array) => {
    divPokemons.setAttribute("class", "pokemonCards")
    divPokemons.innerHTML = ""
    title.innerHTML = "Pokémon ordenados por número ascendente"
    array.forEach((pokemon) => {

        const card = document.createElement("div")
        card.classList.add("card")

        const cardImgContainer = document.createElement("div")
        cardImgContainer.classList.add("cardImgContainer")
        cardImgContainer.classList.add(`${pokemon.types[0].type.name}`)

        const cardImg = document.createElement("img")
        cardImg.classList.add("cardImg")
        cardImg.src = `${pokemon["sprites"]["other"]["official-artwork"]["front_default"]}`
        cardImg.alt = `${pokemon.name}`

        const textBox = document.createElement("div")
        textBox.classList.add("textBox")

        const pokemonNumber = document.createElement("p")
        pokemonNumber.classList.add("pokemonNumber")
        pokemonNumber.innerText = `#${pokemon.id.toString().padStart(3, 0)}`

        const pokemonName = document.createElement("h3")
        pokemonName.classList.add("pokemonName")
        pokemonName.innerText = `${pokemon.species.name[0].toUpperCase() + pokemon.species.name.slice(1)}`

        const btnAdd = document.createElement("button")
        btnAdd.classList.add("addTeam")
        btnAdd.innerText = "Capturar Pokémon"
        btnAdd.setAttribute("id", `${pokemon.id}`)
        btnAdd.addEventListener("click", addPokemonTeam)

        const btnDetails = document.createElement("button")
        btnDetails.classList.add("details")
        btnDetails.innerText = "Ver detalles"
        btnDetails.setAttribute("id", `${pokemon.species.name}`)
        btnDetails.setAttribute("data-bs-toggle", `modal`)
        btnDetails.setAttribute("data-bs-target", `#idModal`)
        btnDetails.addEventListener("click", modalDetails)

        divPokemons.appendChild(card)
        card.appendChild(cardImgContainer)
        cardImgContainer.appendChild(cardImg)
        card.appendChild(textBox)
        textBox.appendChild(pokemonNumber)
        textBox.appendChild(pokemonName)
        card.appendChild(btnAdd)
        card.appendChild(btnDetails)
    })
}

//Modal de detalles

function modalDetails(e){
    modalBody.innerHTML= " "
    const pokemonByName = e.target.getAttribute('id')
    const pokemonSelected = pokedex.find((pokemon) => pokemon.species.name == pokemonByName)

    // Titutilo del modal
    const modalTitle = document.createElement("div")
    modalTitle.classList.add("modalTitle")

    const modalTitleName = document.createElement("p")
    modalTitleName.classList.add("modalTitleName")
    modalTitleName.textContent = `${pokemonSelected["species"]["name"][0].toUpperCase() + pokemonSelected["species"]["name"].slice(1)}`

    const modalTitleId = document.createElement("span")
    modalTitleId.classList.add("modalTitleId")
    modalTitleId.textContent = `#${pokemonSelected["id"].toString().padStart(3, 0)}`

    modalBody.appendChild(modalTitle)
    modalTitle.appendChild(modalTitleName)
    modalTitleName.appendChild(modalTitleId)

    // Contenido del modal 
    const modalContent = document.createElement("div")
    modalContent.classList.add("modalContent")

    modalBody.appendChild(modalContent)

    // Left side del modal
    const modalContentLeft = document.createElement("div")
    modalContentLeft.classList.add("modalContentLeft")

    const modalImgContainer = document.createElement("div")
    modalImgContainer.classList.add("modalImgContainer")
  
    const modalImg = document.createElement("img")
    modalImg.classList.add("modalImg")
    modalImg.src = `${pokemonSelected["sprites"]["other"]["official-artwork"]["front_default"]}`
  
    modalContent.appendChild(modalContentLeft)
    modalContentLeft.appendChild(modalImgContainer)
    modalImgContainer.appendChild(modalImg)
    modalContentLeft.appendChild(pokemonTypes(pokemonSelected))
    modalContentLeft.appendChild(pokemonAbilities(pokemonSelected))

    // Right side del modal

    const modalContentRight = document.createElement("div")
    modalContentRight.classList.add("modalContentRight")

    const dataContainer = document.createElement("div")
    dataContainer.classList.add("dataContainer")

    const pokemonHeight = document.createElement("p")
    pokemonHeight.classList.add("pokemonHeight")    
    if(pokemonSelected["height"].toString().length == "1"){
        pokemonHeight.textContent =  `Altura: 0,${pokemonSelected["height"]} m`
    }else if(pokemonSelected["height"].toString().length == "2"){
        pokemonHeight.textContent = `Altura: ${pokemonSelected["height"].toString()[0] + "," + pokemonSelected["height"].toString().slice(1)} m`
    }else if(pokemonSelected["height"].toString().length == "3" ){
        pokemonHeight.textContent = `Altura: ${pokemonSelected["height"].toString().slice(0,2) + "," + pokemonSelected["height"].toString().slice(2)}m`
    }

    const pokemonWeight = document.createElement("p")
    pokemonWeight.classList.add("pokemonWeight")
    if(pokemonSelected["weight"].toString().length == "1"){
        pokemonWeight.textContent =  `Peso: 0,${pokemonSelected["weight"]} kg`
    }else if(pokemonSelected["weight"].toString().length == "2"){
        pokemonWeight.textContent = `Peso: ${pokemonSelected["weight"].toString()[0] + "," + pokemonSelected["weight"].toString().slice(1)} kg`
    }else if(pokemonSelected["weight"].toString().length == "3" ){
        pokemonWeight.textContent = `Peso: ${pokemonSelected["weight"].toString().slice(0,2) + "," + pokemonSelected["weight"].toString().slice(2)} kg`
    }else if(pokemonSelected["weight"].toString().length == "4" ){
        pokemonWeight.textContent = `Peso: ${pokemonSelected["weight"].toString().slice(0,3) + "," + pokemonSelected["weight"].toString().slice(3)}kg`
    }

    const pokemonXp = document.createElement("p")
    pokemonXp.classList.add("pokemonXp")
    pokemonXp.textContent = `Experiencia base: ${pokemonSelected["base_experience"]}xp`

    modalContent.appendChild(modalContentRight)
    modalContentRight.appendChild(pokemonStats(pokemonSelected.stats))
    modalContentRight.appendChild(dataContainer)
    dataContainer.appendChild(pokemonHeight)
    dataContainer.appendChild(pokemonWeight)
    dataContainer.appendChild(pokemonXp)

}

//Función para las estadísticas de cada pokémon
function pokemonStats(stats) {
    const statsContainer = document.createElement("div")
    statsContainer.classList.add("statsContainer")
  
    for (let i = 0; i < 6; i++) {
      const stat = stats[i];
  
      const statPercent = stat.base_stat + "%"
      const statContainer = document.createElement("div")
      statContainer.classList.add("statContainer")
  
      const statName = document.createElement("p")
      statName.textContent = stat["stat"]["name"][0].toUpperCase() + stat["stat"]["name"].slice(1)
  
      const progress = document.createElement("div")
      progress.classList.add("progress")
  
      const progressBar = document.createElement("div")
      progressBar.classList.add("progress-bar")
      progressBar.setAttribute("aria-valuenow", stat.base_stat)
      progressBar.setAttribute("aria-valuemin", 0)
      progressBar.setAttribute("aria-valuemax", 100)
      progressBar.style.width = statPercent
      if(stat.base_stat > "100"){
        progressBar.style.background = "#FF4500"
      }
      progressBar.textContent = stat.base_stat
  
      progress.appendChild(progressBar)
      statContainer.appendChild(statName)
      statContainer.appendChild(progress)
      statsContainer.appendChild(statContainer)
    }
    return statsContainer;
}

//Función para los tipos de cada pokémon
function pokemonTypes(pokemon){
    const modalTypes = document.createElement("div")
    modalTypes.classList.add("modalTypes")
    modalTypes.textContent = "Tipos:"
    let types = pokemon.types
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span")
        type.innerText = types[i]["type"]["name"][0].toUpperCase() + types[i]["type"]["name"].slice(1)
        type.classList.add("pokemonType")
        type.classList.add(types[i]["type"]["name"])
        modalTypes.appendChild(type)
    }
    return modalTypes
}

//Función para las habilidades de cada pokémon
function pokemonAbilities(pokemon){
    const modalAbilities = document.createElement("div")
    modalAbilities.classList.add("modalAbilities")
    modalAbilities.textContent = "Habilidades:"
    let abilities = pokemon.abilities
    for (let i = 0; i < abilities.length; i++) {
        let ability = document.createElement("span")
        ability.innerText = abilities[i]["ability"]["name"][0].toUpperCase() + abilities[i]["ability"]["name"].slice(1) 
        ability.classList.add("pokemonAbility")
        modalAbilities.appendChild(ability)
    }
    return modalAbilities
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
    title.innerHTML = "Pokémon ordenados por número ascendente"
}
function orderNumberD(){
    divPokemons.innerHTML = ""
    pokedex.sort((a,b)=> (b.id - a.id))
    cards(pokedex)
    title.innerHTML = "Pokémon ordenados por número descendente"
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
    title.innerHTML = "Pokémon ordenados por A-Z"
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
    title.innerHTML = "Pokémon ordenados por Z-A"
}
function random(){
    divPokemons.innerHTML = ""
    pokedex.sort(() => Math.random() - 0.5)
    cards(pokedex)
    title.innerHTML = "Generador de orden random"
}

//Funcion para buscar pokémons
const searchPokemon = () => {
    divPokemons.innerHTML = ""
    const search = searchBar.value.toLowerCase()
    const results = pokedex.filter((pokemon) => pokemon.name.toLowerCase().includes(search))
    cards(results)
    title.innerHTML = "Resultados de la búsqueda"
}

//Cards para Equipo Pokémon
const pokemonsForTeamCard = (array) => {
    divPokemons.setAttribute("class", "pokemonCards")
    divPokemons.innerHTML = ""
    title.innerHTML = "Tu equipo"
    array.forEach((pokemon) => {
        const card = document.createElement("div")
        card.classList.add("card")

        const cardImgContainer = document.createElement("div")
        cardImgContainer.classList.add("cardImgContainer")
        cardImgContainer.classList.add(`${pokemon.types[0].type.name}`)

        const cardImg = document.createElement("img")
        cardImg.classList.add("cardImg")
        cardImg.src = `${pokemon["sprites"]["other"]["official-artwork"]["front_default"]}`
        cardImg.alt = `${pokemon.name}`

        const textBox = document.createElement("div")
        textBox.classList.add("textBox")

        const pokemonNumber = document.createElement("p")
        pokemonNumber.classList.add("pokemonNumber")
        pokemonNumber.innerText = `#${pokemon.id.toString().padStart(3, 0)}`

        const pokemonName = document.createElement("h3")
        pokemonName.classList.add("pokemonName")
        pokemonName.innerText = `${pokemon.species.name[0].toUpperCase() + pokemon.species.name.slice(1)}`

        const btnDelete = document.createElement("button")
        btnDelete.classList.add("deleteTeam")
        btnDelete.innerText = "Liberar Pokémon"
        btnDelete.setAttribute("id", `${pokemon.id}`)

        const btnDetails = document.createElement("button")
        btnDetails.classList.add("details")
        btnDetails.innerText = "Ver detalles"
        btnDetails.setAttribute("id", `${pokemon.species.name}`)
        btnDetails.setAttribute("data-bs-toggle", `modal`)
        btnDetails.setAttribute("data-bs-target", `#idModal`)
        btnDetails.addEventListener("click", modalDetails)

        divPokemons.appendChild(card)
        card.appendChild(cardImgContainer)
        cardImgContainer.appendChild(cardImg)
        card.appendChild(textBox)
        textBox.appendChild(pokemonNumber)
        textBox.appendChild(pokemonName)
        card.appendChild(btnDelete)
        card.appendChild(btnDetails)
    })
    array.forEach((pokemon, index)=>{
        document.getElementById(`${pokemon.id}`).addEventListener('click', () => {
            let pokemonInFavorites = document.getElementById(`${pokemon.id}`)
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
//Limpiar Equipo Pokémon
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
//Agregar pokémon al equipo
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
//Cargar cards de Equipo Pokémon
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

//Inicialización 
teamPokemon = JSON.parse(localStorage.getItem('teamPokemon')) || []


