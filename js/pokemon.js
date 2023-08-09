const setHeight = (data) => {
    let height;
    switch (data.length) {
        case 2:
            height = `${data[0] + "," + data.slice(1)} m`;
            break;
        case 3:
            height = `${data.slice(0, 2) + "," + data.slice(2)} m`;
            break;
        default:
            height = `0,${data} m`;
            break;
    }
    return height;
}

const setWeight = (data) => {
    let weight;
    switch (data.length) {
        case 2:
            weight = `${data[0] + "," + data.slice(1)} kg`;
            break;
        case 3:
            weight = `${data.slice(0, 2) + "," + data.slice(2)} kg`;
            break;
        case 4:
            weight = `${data.slice(0, 3) + "," + data.slice(3)}kg`;
            break;
        default:
            weight = `0,${data["weight"]} kg`;
            break;
    }
    return weight;
}

const setPokemon = (data) => {
    const obj = {
        name: data.species.name[0].toUpperCase() + data.species.name.slice(1),
        id: data.id.toString().padStart(3, 0),
        img: data["sprites"]["other"]["official-artwork"]["front_default"],
        exp: data["base_experience"],
        height: setHeight(data["height"].toString()),
        weight: setWeight(data["weight"].toString()),
        types: data["types"],
        stats: data["stats"],
    }
    pokedex.push(obj);
}

const setCards = (array, newTitle) => {
    cardsContainer.innerHTML = "";
    title.innerHTML = newTitle || "All Pokémon"
    array.forEach((pokemon) => {

        const card = document.createElement("div")
        card.classList.add("card")

        const cardImgContainer = document.createElement("div")
        cardImgContainer.classList.add("card-img-container")
        cardImgContainer.classList.add(`${pokemon.types[0].type.name}`)

        const cardImg = document.createElement("img")
        cardImg.classList.add("card-img")
        cardImg.src = `${pokemon.img}`
        cardImg.alt = `${pokemon.name}`

        const textContainer = document.createElement("div")
        textContainer.classList.add("text-container")

        const pokemonId = document.createElement("span")
        pokemonId.innerText = `#${pokemon.id}`

        const pokemonName = document.createElement("p")
        pokemonName.innerText = `${pokemon.name}`

        const btnsContainer = document.createElement("footer")
        btnsContainer.classList.add("btns-container")

        if (array == teamPokemon) {
            const btnDelete = document.createElement("button")
            btnDelete.classList.add("btn", "btn-danger")
            btnDelete.innerText = "Remove"
            btnDelete.setAttribute("id", `${pokemon.id}`)
            btnDelete.addEventListener("click", deleteFromTeam)
            btnsContainer.appendChild(btnDelete)
        } else {
            const btnAdd = document.createElement("button")
            btnAdd.classList.add("btn", "btn-primary")
            btnAdd.innerText = "Capture"
            btnAdd.setAttribute("id", `${pokemon.id}`)
            btnAdd.addEventListener("click", addToTeam)
            btnsContainer.appendChild(btnAdd)
        }

        const btnDetails = document.createElement("button")
        btnDetails.classList.add("btn", "btn-success")
        btnDetails.innerText = "Details"
        btnDetails.setAttribute("id", `${pokemon.name}`)
        btnDetails.setAttribute("data-bs-toggle", `modal`)
        btnDetails.setAttribute("data-bs-target", `#idModal`)
        btnDetails.addEventListener("click", setModal)

        cardsContainer.appendChild(card);
        card.appendChild(textContainer);
        card.appendChild(cardImgContainer);
        cardImgContainer.appendChild(cardImg);
        textContainer.appendChild(pokemonId);
        textContainer.appendChild(pokemonName);
        card.appendChild(btnsContainer);
        btnsContainer.appendChild(btnDetails);
    })
}