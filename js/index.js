const pokedex = [];
let teamPokemon = [];
const amount = 151;

teamPokemon = JSON.parse(localStorage.getItem('teamPokemon')) || [];

const controls = document.getElementById('controls');
const searchBar = document.getElementById('search-bar')
const orderSelect = document.getElementById('order-select');
const typeSelect = document.getElementById('type-select');
const cardsContainer = document.getElementById('cards-container');
const title = document.getElementById('title');
const noResults = document.getElementById('no-results');
const modalBody = document.getElementById("modal-body")
const showTeamBtn = document.getElementById('my-team');
const clearTeamBtn = document.getElementById('clear-team');
const loader = document.getElementById('loader');

async function getPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    setPokemon(data);
    setCards(pokedex);
    title.style.display = "flex";
}

window.onload = async function () {
    for (let i = 1; i <= amount; i++) {
        await getPokemon(i);
    }
    setCards(pokedex);
    loader.style.display = "none";
    controls.style.display = "flex";
}

function setNumberAsc() {
    setCards(pokedex.sort((a, b) => (a.id - b.id)), "Sort by lowest number");
}

function setNumberDesc() {
    setCards(pokedex.sort((a, b) => (b.id - a.id)), "Sort by highest number");
}

function setNameAsc() {
    setCards(pokedex.sort((a, b) => a.name.localeCompare(b.name)), "Sort by A-Z");
}

function setNameDesc() {
    setCards(pokedex.sort((a, b) => b.name.localeCompare(a.name)), "Sort by A-Z");
}

function setRandomly() {
    setCards(pokedex.sort(() => Math.random() - 0.5), "Sort randomly")
}

function applyOrderOption() {
    const selected = orderSelect.value;
    const options = {
        "numberAsc": setNumberAsc,
        "numberDesc": setNumberDesc,
        "nameAsc": setNameAsc,
        "nameDesc": setNameDesc,
        "randomly": setRandomly
    }
    options[selected]();
}

const search = () => {
    const search = searchBar.value.toLowerCase();
    const results = pokedex.filter((pokemon) => pokemon.name.toLowerCase().includes(search));
    if (results.length == 0) {
        cardsContainer.innerHTML = "";
        noResults.classList.add("no-results");
        noResults.style.display = "flex";
    } else {
        noResults.style.display = "none";
        setCards(results, "Search results");
    }
}

const filterByTypes = () => {
    const type = typeSelect.value;
    const result = [] ;
    pokedex.forEach(pokemon => {
        for (let i = 0; i < pokemon.types.length; i++) {
            if(pokemon.types[i]["type"]["name"] === type) result.push(pokemon)
        }
    });
    setCards(result, `Filter by type ${type}`)
}

const saveStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
}

showTeamBtn.addEventListener('click', getTeam);
clearTeamBtn.addEventListener('click', clearTeam);
searchBar.addEventListener('keyup', search);
orderSelect.addEventListener("change", applyOrderOption);
typeSelect.addEventListener("change", filterByTypes);
