function setModal(button) {
    modalBody.innerHTML = "";
    
    // Modal Header
    const pokemonName = button.target.getAttribute('id');
    const pokemon = pokedex.find((pokemon) => pokemon.name == pokemonName)
    const modalHeader = document.createElement("header")
    modalHeader.classList.add("modal-header")
    const modalTitle = document.createElement("h2")
    modalTitle.textContent = `${pokemon.name}`
    const modalId = document.createElement("span")
    modalId.textContent = `#${pokemon.id}`
    modalBody.appendChild(modalHeader)
    modalHeader.appendChild(modalTitle)
    modalHeader.appendChild(modalId)

    // Modal Main
    const modalMain = document.createElement("main")
    modalMain.classList.add("modal-main")
    modalBody.appendChild(modalMain)

    // Modal Main Left
    const modalLeft = document.createElement("aside")
    modalLeft.classList.add("modal-left")
    const modalImgContainer = document.createElement("div")
    modalImgContainer.classList.add("modal-img-container")
    modalImgContainer.classList.add(`${pokemon.types[0].type.name}`)
    const modalImg = document.createElement("img")
    modalImg.src = `${pokemon.img}`
    modalImg.alt = `${pokemon.name}`
    modalMain.appendChild(modalLeft)
    modalLeft.appendChild(modalImgContainer)
    modalImgContainer.appendChild(modalImg)
    modalLeft.appendChild(setModalTypes(pokemon))

    // Modal Main Right
    const modalRight = document.createElement("aside")
    modalRight.classList.add("modal-right")
    const dataHeight = document.createElement("p")
    dataHeight.textContent = `Height: ${pokemon.height}`
    const dataWeight = document.createElement("p")
    dataWeight.textContent = `Weight: ${pokemon.weight}`
    const dataXp = document.createElement("p")
    dataXp.textContent = `Base experience: ${pokemon.exp} xp`
    modalMain.appendChild(modalRight)
    modalRight.appendChild(setModalStats(pokemon.stats))
    modalRight.appendChild(dataHeight)
    modalRight.appendChild(dataWeight)
    modalRight.appendChild(dataXp)

}

function setModalTypes(pokemon) {
    const modalTypes = document.createElement("div");
    modalTypes.classList.add("modal-types");
    const types = pokemon.types;
    for (let i = 0; i < types.length; i++) {
        const type = document.createElement("span");
        type.innerText = types[i]["type"]["name"][0].toUpperCase() + types[i]["type"]["name"].slice(1);
        type.classList.add("type");
        type.classList.add(types[i]["type"]["name"]);
        modalTypes.appendChild(type);
    }
    return modalTypes;
}

function setModalStats(stats) {
    const statsContainer = document.createElement("section")
    statsContainer.classList.add("stats-container")
    for (let i = 0; i < 6; i++) {
        const stat = stats[i];
        const statPercent = stat.base_stat + "%"
        const statContainer = document.createElement("div")
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
        if (stat.base_stat > "100") progressBar.style.background = "#dc3545"
        progressBar.textContent = stat.base_stat

        progress.appendChild(progressBar)
        statContainer.appendChild(statName)
        statContainer.appendChild(progress)
        statsContainer.appendChild(statContainer)
    }
    return statsContainer;
}