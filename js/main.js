//Arrays
const pokedex = []
let teamPokemon = []

//Cantidad de pokémons traidos de la API
const pokemonAmount = 251

//Selectores
const buttonsContainer = document.getElementById('buttonsContainer')
const divPokemons = document.getElementById('pokemons')
const searchBar = document.getElementById('searchBar')
const searchBtn = document.getElementById('searchBtn')
const orderNameAscBtn = document.getElementById('orderAlphabeticalA')
const orderNameDescBtn = document.getElementById('orderAlphabeticalD')
const orderNumberAscBtn = document.getElementById('orderNumberA')
const orderNumberDescBtn = document.getElementById('orderNumberD')
const orderRandomBtn = document.getElementById('random')
const showTeamBtn = document.getElementById('yourTeam')
const resetTeamBtn = document.getElementById('resetTeam')
const cardsTitle = document.getElementById('title')
const modalBody = document.getElementById("modal-body")
const loader = document.getElementById('loader')

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
    //El loader desaparece al cargar las cards y aparecen los botones de la pokédex
    loader.style.display = "none"
    buttonsContainer.style.display = "inline"
}

//Funcion creadora de cards
const cards = (array) => {
    divPokemons.setAttribute("class", "pokemonCards")
    divPokemons.innerHTML = ""
    cardsTitle.innerHTML = "Pokémons ordenados por número ascendente"
    array.forEach((pokemon) => {
        //Div card
        const card = document.createElement("div")
        card.classList.add("card")
        //Div contenedor de la imagen 
        const cardImgContainer = document.createElement("div")
        cardImgContainer.classList.add("cardImgContainer")
        cardImgContainer.classList.add(`${pokemon.types[0].type.name}`)
        //Imagen del pokémon
        const cardImg = document.createElement("img")
        cardImg.classList.add("cardImg")
        cardImg.src = `${pokemon["sprites"]["other"]["official-artwork"]["front_default"]}`
        cardImg.alt = `${pokemon.name}`
        //Div contenedor del texto de la card
        const textBox = document.createElement("div")
        textBox.classList.add("textBox")
        //Número ID del pokémon
        const pokemonNumber = document.createElement("p")
        pokemonNumber.classList.add("pokemonNumber")
        pokemonNumber.innerText = `#${pokemon.id.toString().padStart(3, 0)}`
        //Nombre del pokémon
        const pokemonName = document.createElement("h3")
        pokemonName.classList.add("pokemonName")
        pokemonName.innerText = `${pokemon.species.name[0].toUpperCase() + pokemon.species.name.slice(1)}`

        //Div contenedor del texto de la card
        const buttonsBox = document.createElement("div")
        buttonsBox.classList.add("buttonsBox")

        if(array == teamPokemon){
            const btnDelete = document.createElement("button")
            btnDelete.classList.add("deleteTeam")
            btnDelete.innerText = "Liberar Pokémon"
            btnDelete.setAttribute("id", `${pokemon.id}`)
            btnDelete.addEventListener("click", deletePokemon)
            buttonsBox.appendChild(btnDelete)
        }else{
            //Boton para añadir pokémon al equipo
            const btnAdd = document.createElement("button")
            btnAdd.classList.add("addTeam")
            btnAdd.innerText = "Capturar Pokémon"
            btnAdd.setAttribute("id", `${pokemon.id}`)
            btnAdd.addEventListener("click", addPokemon)
            buttonsBox.appendChild(btnAdd)
        }

        //Boton para ver modal de detalles del pokémon
        const btnDetails = document.createElement("button")
        btnDetails.classList.add("details")
        btnDetails.innerText = "Ver detalles"
        btnDetails.setAttribute("id", `${pokemon.species.name}`)
        btnDetails.setAttribute("data-bs-toggle", `modal`)
        btnDetails.setAttribute("data-bs-target", `#idModal`)
        btnDetails.addEventListener("click", modalDetails)

        //Añadir cada parte de la card para renderizarla
        divPokemons.appendChild(card)
        card.appendChild(cardImgContainer)
        cardImgContainer.appendChild(cardImg)
        card.appendChild(textBox)
        textBox.appendChild(pokemonNumber)
        textBox.appendChild(pokemonName)
        card.appendChild(buttonsBox)
        buttonsBox.appendChild(btnDetails)
    })
}

//Función creadora de los modales con los detalles de los pokémons

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
    //Se trabaja el dato desde la API de la altura del pokémon como array para que dependiendo de cuantos dígitos tenga la altura del pokémon seleccionado se agregue la "," en el lugar correspondiente
    if(pokemonSelected["height"].toString().length == "1"){
        //Si tiene un dígito se agrega un "0" adelante, la "," y luego el dígito Ej:(Altura: 0,1m)
        pokemonHeight.textContent =  `Altura: 0,${pokemonSelected["height"]} m` 
    }else if(pokemonSelected["height"].toString().length == "2"){
        //Si tiene dos dígitos se agrega la "," entre los dos dígitos Ej:(Altura: 1,1m)
        pokemonHeight.textContent = `Altura: ${pokemonSelected["height"].toString()[0] + "," + pokemonSelected["height"].toString().slice(1)} m` 
    }else if(pokemonSelected["height"].toString().length == "3" ){
        //Si tiene tres dígitos se agrega la "," luego del segundo dígito Ej:(Altura: 11,1m)
        pokemonHeight.textContent = `Altura: ${pokemonSelected["height"].toString().slice(0,2) + "," + pokemonSelected["height"].toString().slice(2)}m` 
    }

    const pokemonWeight = document.createElement("p")
    pokemonWeight.classList.add("pokemonWeight")
    //Utilizando el mismo razonamiento que con la altura de los pokémons, se realiza el mismo procedimiento con el peso del pokémon
    if(pokemonSelected["weight"].toString().length == "1"){
        pokemonWeight.textContent =  `Peso: 0,${pokemonSelected["weight"]} kg` //Ej:(Peso: 0,1kg)
    }else if(pokemonSelected["weight"].toString().length == "2"){
        pokemonWeight.textContent = `Peso: ${pokemonSelected["weight"].toString()[0] + "," + pokemonSelected["weight"].toString().slice(1)} kg` //Ej:(Peso: 1,1kg)
    }else if(pokemonSelected["weight"].toString().length == "3" ){
        pokemonWeight.textContent = `Peso: ${pokemonSelected["weight"].toString().slice(0,2) + "," + pokemonSelected["weight"].toString().slice(2)} kg` //Ej:(Peso: 11,1kg)
    }else if(pokemonSelected["weight"].toString().length == "4" ){
        pokemonWeight.textContent = `Peso: ${pokemonSelected["weight"].toString().slice(0,3) + "," + pokemonSelected["weight"].toString().slice(3)}kg` //Ej:(Peso: 111,1kg)
    }

    const pokemonXp = document.createElement("p")
    pokemonXp.classList.add("pokemonXp")
    pokemonXp.textContent = `Experiencia base: ${pokemonSelected["base_experience"]}xp`

    //Añadir cada parte del modal para renderizarlo
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
    
    //Para cada estadistica del pokémon se crea una barra de progreso correspondiente al valor de la estadística y se la agrega al div que contiene todas las estadísticas
    for (let i = 0; i < 6; i++) {
        const stat = stats[i];
        const statPercent = stat.base_stat + "%"
        //Contenedor para cada estadística
        const statContainer = document.createElement("div")
        statContainer.classList.add("statContainer")
        //Nombre de la estadística
        const statName = document.createElement("p")
        statName.textContent = stat["stat"]["name"][0].toUpperCase() + stat["stat"]["name"].slice(1)
        //Contenedor de la barra de progreso
        const progress = document.createElement("div")
        progress.classList.add("progress")
        //Barra de progreso
        const progressBar = document.createElement("div")
        progressBar.classList.add("progress-bar")
        progressBar.setAttribute("aria-valuenow", stat.base_stat)
        progressBar.setAttribute("aria-valuemin", 0)
        progressBar.setAttribute("aria-valuemax", 100)
        progressBar.style.width = statPercent
        //Si la estadistica es mayor a 100 puntos se la pinta de un color distinto
        if(stat.base_stat > "100"){
            progressBar.style.background = "#FF4500" 
        }
        //Puntos de las estadística dentro de la barra de progreso
        progressBar.textContent = stat.base_stat
      
        //Añadir cada parte del modal para renderizarlo
        progress.appendChild(progressBar)
        statContainer.appendChild(statName)
        statContainer.appendChild(progress)
        statsContainer.appendChild(statContainer)
    }
    //Retorna un div con todas las estadísticas de cada pokémon que luego se agrega al modal
    return statsContainer;
}

//Función para los tipos de cada pokémon
function pokemonTypes(pokemon){
    //Div contenedor de los tipos de cada pokémon
    const modalTypes = document.createElement("div")
    modalTypes.classList.add("modalTypes")
    modalTypes.textContent = "Tipos:"
    //Para cada tipo del pokémon se crea un div con el nombre del tipo y se le agrega la clase con el nombre que están definidas en CSS y les da el color correspondiente
    let types = pokemon.types
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span")
        type.innerText = types[i]["type"]["name"][0].toUpperCase() + types[i]["type"]["name"].slice(1)
        type.classList.add("pokemonType")
        type.classList.add(types[i]["type"]["name"])
        modalTypes.appendChild(type)
    }
    //Retorna un div con todos los tipos de cada pokémon que luego se agrega al modal
    return modalTypes
}

//Función para las habilidades de cada pokémon
function pokemonAbilities(pokemon){
    //Utilizando el mismo razonamiento que con los tipos de los pokémons, se realiza el mismo procedimiento con las habilidades del pokémon
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
    //Retorna un div con todas las habilidades de cada pokémon que luego se agrega al modal
    return modalAbilities
}

//Limpiar equipo pokémon
const clearTeam = () => {
    //Si el equipo ya se encuentra vacío se informa que no se puede vaciar
    teamPokemon.length == 0 ? (
        Swal.fire({
            title: "Tu equipo Pokémon ya se encuentra vacío.",
            icon: "warning",
            timer: 1500,
            showConfirmButton: false
        })
    ):(
        //Si el equipo cuenta con al menos pokémon se pide una confirmación mediante un Sweet Alert para vaciar el equipo o para cancelar la acción
        Swal.fire({
            title: "Perderas todos tus Pokémon.",
            text: `¿Estás seguro de eliminar todo tu equipo?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, estoy seguro.",
            cancelButtonText: "No, no quiero.",
        }).then((result) => {
            if(result.isConfirmed){
                teamPokemon = []
                saveStorage('teamPokemon', teamPokemon)
                divPokemons.innerHTML = ""
                Swal.fire({
                    title: "Equipo vaciado.",
                    text: `Tu equipo esta vacío, puedes agregar nuevos Pokémon para completar tu equipo.`,
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
const addPokemon = (e) => {
    //Se toma el ID del pokémon que se quiere agregar al equipo
    const pokemonById = e.target.getAttribute('id')
    const pokemonSelected = pokedex.find((pokemon) => pokemon.id == pokemonById)
    //Si el pokémon no se encuentra en el equipo se pasa al siguiente condicional 
    teamPokemon.find((pokemon) => pokemon.id == pokemonById) == undefined ? (
        //Si el equipo tiene menos de 6 pokémons se agrega el pokémon al equipo y se guarda en el local storage
        teamPokemon.length < 6 ? (
            //Se pushea el pokémon al array del equipo pokémon y se guarda el array en local storage 
            teamPokemon.push(pokemonSelected),
            saveStorage('teamPokemon', teamPokemon),
            //Se muestra en un Toastify que el pokémon fue agregado al equipo con éxito
            Toastify({
                text: `${pokemonSelected.name[0].toUpperCase() + pokemonSelected.name.slice(1)} se ha unido a tu equipo.`,
                duration: 3000,
                gravity: "bottom",
                style: {background: "#0c950c"},
                onClick: () => showTeam(),
                }).showToast()
         ) : (
            //Si el equipo cuenta con 6 pokémons se informa con un Sweet Alert que el equipo esta completo y no se pueden agregar mas pokémons
            Swal.fire({
                text: "El equipo tiene un máximo de 6 Pokémon, no puedes agregar más.",
                icon: "error",
                confirmButtonText: "Entendido"
            })
         )
    ):(
        //Si el pokémon se encuentra en el equipo se informa con un Toastify que no se puede agregar otra vez
        Toastify({
            text: `No puedes agregar a ${pokemonSelected.name[0].toUpperCase() + pokemonSelected.name.slice(1)} porque
            ya ha sido agregado previamente al equipo.`,
            duration: 3000,
            gravity: "bottom",
            style: {background: "#2a75bb"},
        }).showToast()
    )
}
//Eliminar pokémon del equipo
const deletePokemon = (e) => {
    //Se toma el ID del pokémon que se quiere quiere eliminar del equipo
    const pokemonById = e.target.getAttribute('id')
    const pokemonSelected = teamPokemon.find((pokemon) => pokemon.id == pokemonById)
    //Se toma el índice del pokémon que se quiere quiere eliminar del equipo
    const pokemonIndex = teamPokemon.indexOf(pokemonSelected)
    //Se elimina al pokémon del array del equipo pokémon y se guarda el array en local storage
    teamPokemon.splice(pokemonIndex, 1)
    saveStorage('teamPokemon', teamPokemon)
    //Se muetra con un Toastify que pokémon fue eliminado 
    Toastify({
        text: `Eliminaste a ${pokemonSelected.name[0].toUpperCase() + pokemonSelected.name.slice(1)} de tu equipo.`,
        duration: 3000,
        gravity: "bottom",
        style: {background: "#FF0000"},
    }).showToast();
    //Se vuelven a cargar los pokémon que se encuentran en el equipo
    showTeam()
}

//Mostrar cards de Equipo Pokémon
const showTeam = () =>{
    //Si el equipo esta vacío se informa con un Sweet Alert y se cargan las cards de todos los pokémon
    if(teamPokemon.length == 0){
        Swal.fire({
            text: "Tu equipo se encuentra vacío.",
            icon: "error",
            confirmButtonText: "Entendido"
        })
        cards(pokedex)
    }
    //Si el equipo tiene al menos un pokémon se muestran las cards con los pokémon del equipo
    else{
        divPokemons.innerHTML = ""
        cards(teamPokemon)
        cardsTitle.innerHTML = "Tu equipo"
    }
}

//Función para guardar en local storage
const saveStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}

//Funciones para ordenar cards

//Ordena los pokémon de menor a mayor según su ID y se renderizan las cards con ese orden
function orderNumberAsc(){
    divPokemons.innerHTML = ""
    pokedex.sort((a,b)=> (a.id - b.id))
    cards(pokedex)
    cardsTitle.innerHTML = "Pokémons ordenados por número ascendente"
}

//Ordena los pokémon de mayor a menor según su ID y se renderizan las cards con ese orden
function orderNumberDesc(){
    divPokemons.innerHTML = ""
    pokedex.sort((a,b)=> (b.id - a.id))
    cards(pokedex)
    cardsTitle.innerHTML = "Pokémons ordenados por número descendente"
}

//Ordena los pokémon de A hasta Z según su nombre y se renderizan las cards con ese orden
function orderNameAsc(){
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
    cardsTitle.innerHTML = "Pokémons ordenados por A-Z"
}

//Ordena los pokémon de Z hasta A según su nombre y se renderizan las cards con ese orden
function orderNameDesc(){
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
    cardsTitle.innerHTML = "Pokémons ordenados por Z-A"
}

//Ordena los pokémon aleatoriamente y se renderizan las cards con ese orden
function orderRandom(){
    divPokemons.innerHTML = ""
    pokedex.sort(() => Math.random() - 0.5)
    cards(pokedex)
    cardsTitle.innerHTML = "Pokémons ordenados aleatoriamente"
}

//Funcion para buscar pokémons por su nombre
const searchPokemon = () => {
    divPokemons.innerHTML = ""
    const search = searchBar.value.toLowerCase()
    const results = pokedex.filter((pokemon) => pokemon.name.toLowerCase().includes(search))
    //Si no hay resultados en la búsqueda se informa con un Sweet Alert y se cargan todas las cards
    if(results.length == 0){
        Swal.fire({
            title: "No hay resultados en tu búsqueda.",
            icon: "error",
            timer: 1500,
            showConfirmButton: false
        })
        cards(pokedex)
    }
    //Si hay resultados en la búsqueda se muestran las cards correspondientes
    else{
        cards(results)
        cardsTitle.innerHTML = "Resultados de la búsqueda"
    }
}

//EventListeners
searchBtn.addEventListener('click', searchPokemon)
orderNameAscBtn.addEventListener("click", orderNameAsc)
orderNameDescBtn.addEventListener("click", orderNameDesc)
orderNumberAscBtn.addEventListener("click", orderNumberAsc)
orderNumberDescBtn.addEventListener("click", orderNumberDesc)
orderRandomBtn.addEventListener("click", orderRandom)
showTeamBtn.addEventListener('click', showTeam)
resetTeamBtn.addEventListener('click', clearTeam)

//Obtener pokémon guardados en el equipo desde el local storage
teamPokemon = JSON.parse(localStorage.getItem('teamPokemon')) || []


