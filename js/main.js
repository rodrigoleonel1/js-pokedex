//Declaración de la clase "Pokemon" para crear los pokémon como objetos.
class Pokemon{
    constructor(pokedexNumber, name, type, secondType, img){
        //propiedades o atributos de la clase "Pokemon".
        this.pokedexNumber = pokedexNumber,
        this.name = name,
        this.type = type,
        this.secondType = secondType,
        this.img = img
    }
    //Método de la clase "Pokemon".
    showData(){
        console.log(`${this.name}, su número en la pokedex nacional es ${this.pokedexNumber} y es de tipo ${this.type}.`)
    }

    showDataTwo(){
        console.log(`${this.name}, su número en la pokedex nacional es ${this.pokedexNumber} y es de tipo ${this.type} y ${this.secondType}.`)
    }
}

//Instanciación de objetos con la clase "Pokemon".

const bulbasaur = new Pokemon(1, "Bulbasaur", "Planta", "Veneno")
const ivysaur = new Pokemon(2, "Ivysaur", "Planta", "Veneno")
const venasaur = new Pokemon(3, "Venasaur", "Planta", "Veneno")
const charmander = new Pokemon(4, "Charmander", "Fuego", "Ninguno")
const charmeleon = new Pokemon(5, "Charmeleon", "Fuego", "Ninguno")
const charizard = new Pokemon(6, "Charizard", "Fuego", "Volador")
const squirtle = new Pokemon(7, "Squirtle", "Agua", "Ninguno")
const wartortle = new Pokemon(8, "Wartortle", "Agua", "Ninguno")
const blastoise = new Pokemon(9, "Blastoise", "Agua", "Ninguno")
const caterpie = new Pokemon(10, "Caterpie", "Bicho", "Ninguno")
const metapod = new Pokemon(11, "Metapod", "Bicho", "Ninguno")
const butterfree = new Pokemon(12, "Butterfree", "Bicho", "Volador")
const weedle = new Pokemon(13, "Weedle", "Bicho", "Veneno")
const kakuna = new Pokemon(14, "Kakuna", "Bicho", "Veneno")
const beedrill = new Pokemon(15, "Beedrill", "Bicho", "Veneno")
const pidgey = new Pokemon(16, "Pidgey", "Normal", "Volador")
const pidgeotto = new Pokemon(17, "Pidgeotto", "Normal", "Volador")
const pidgeot = new Pokemon(18, "Pidgeot", "Normal", "Volador")
const rattata = new Pokemon(19, "Rattata", "Normal", "Ninguno")
const raticate = new Pokemon(20, "Raticate", "Normal", "Ninguno")
const spearow = new Pokemon(21, "Spearow", "Normal", "Volador")
const fearow = new Pokemon(22, "Fearow", "Normal", "Volador")
const ekans = new Pokemon(23, "Ekans", "Veneno", "Ninguno")
const arbok = new Pokemon(24, "Arbok", "Veneno", "Ninguno")
const pikachu = new Pokemon(25, "Pikachu", "Eléctrico", "Ninguno")
const raichu = new Pokemon(26, "Raichu", "Eléctrico", "Ninguno")
const sandshrew = new Pokemon(27, "Sandshdrew", "Tierra", "Ninguno")
const sandslash = new Pokemon(28, "Sandslash", "Tierra", "Ninguno")
const nidoranFemale = new Pokemon(29, "Nidoran♀", "Veneno", "Ninguno")
const nidorina = new Pokemon(30, "Nidorina", "Veneno", "Ninguno")
const nidoqueen = new Pokemon(31, "Nidoqueen", "Veneno", "Ninguno")
const nidoranMale = new Pokemon(32, "Nidoran♂", "Veneno", "Tierra")
const nidorino = new Pokemon(33, "Nidorino", "Veneno", "Ninguno")
const nidoking = new Pokemon(34, "Nidoking", "Veneno", "Tierra")
const clefairy = new Pokemon(35, "Clefairy", "Hada", "Ninguno")
const clefable = new Pokemon(36, "Clefable", "Hada", "Ninguno")
const vulpix = new Pokemon(37, "Vulpix", "Fuego", "Ninguno")
const ninetales = new Pokemon(38, "Ninetales", "Fuego", "Ninguno")
const jigglypuff = new Pokemon(39, "Jigglypuff", "Normal", "Hada")
const wigglytuff = new Pokemon(40, "Wigglytuff", "Normal", "Hada")
const zubat = new Pokemon(41, "Zubat", "Veneno", "Volador")
const golbat = new Pokemon(42, "Golbat", "Veneno", "Volador")
const oddish = new Pokemon(43, "Oddish", "Planta", "Veneno")
const gloom = new Pokemon(44, "Gloom", "Planta", "Veneno")
const vileplume = new Pokemon(45, "vileplume", "Planta", "Veneno")
const paras = new Pokemon(46, "Paras", "Bicho", "Planta")
const parasect = new Pokemon(47, "Parasect", "Bicho", "Planta")
const venonat = new Pokemon(48, "Venonat", "Bicho", "Veneno")
const venomoth = new Pokemon(49, "Venomoth", "Bicho", "Veneno")
const diglett = new Pokemon(50, "Diglett", "Tierra", "Ninguno")
const dugtrio = new Pokemon(51, "Dugtrio", "Tierra", "Ninguno")
const meowth = new Pokemon(52, "Meowth", "Normal", "Ninguno")
const persian = new Pokemon(53, "Persian", "Normal", "Ninguno")
const psyduck = new Pokemon(54, "Psyduck", "Agua", "Ninguno")
const golduck = new Pokemon(55, "Golduck", "Agua", "Ninguno")
const mankey = new Pokemon(56, "Mankey", "Lucha", "Ninguno")
const primeape = new Pokemon(57, "Primeape", "Lucha", "Ninguno")
const growlithe = new Pokemon(58, "Growlithe", "Fuego", "Ninguno")
const arcanine = new Pokemon(59, "Arcanine", "Fuego", "Ninguno")
const poliwag = new Pokemon(60, "Poliwag", "Agua", "Ninguno")
const poliwhirl = new Pokemon(61, "Poliwhirl", "Agua", "Ninguno")
const poliwrath = new Pokemon(62, "Poliwrath", "Agua", "Lucha")
const abra = new Pokemon(63, "Abra", "Psíquico", "Ninguno")
const kadabra = new Pokemon(64, "Kadabra", "Psíquico", "Ninguno")
const alakazam = new Pokemon(65, "Alakazam", "Psíquico", "Ninguno")
const machop = new Pokemon(66, "Machop", "Lucha", "Ninguno")
const machoke = new Pokemon(67, "Machoke", "Lucha", "Ninguno")
const machamp = new Pokemon(68, "Machamp", "Lucha", "Ninguno")
const bellsprout = new Pokemon(69, "Bellsprout", "Planta", "Veneno")
const weepinbell = new Pokemon(70, "Weepinbell", "Planta", "Veneno")
const victreebel = new Pokemon(71, "Victreebel", "Planta", "Veneno")
const tentacool = new Pokemon(72, "Tentacool", "Agua", "Veneno")
const tentacruel = new Pokemon(73, "Tentacruel", "Agua", "Veneno")
const geodude = new Pokemon(74, "Geodude", "Roca", "Tierra")
const graveler = new Pokemon(75, "Graveler", "Roca", "Tierra")
const golem = new Pokemon(76, "Golem", "Roca", "Tierra")
const ponyta = new Pokemon(77, "Ponyta", "Fuego", "Ninguno")
const rapidash = new Pokemon(78, "Rapidash", "Fuego", "Ninguno")
const slowpoke = new Pokemon(79, "Slowpoke", "Agua", "Píquico")
const slowbro = new Pokemon(80, "Slowbro", "Agua", "Píquico")
const magnemite = new Pokemon(81, "Magnemite", "Eléctrico", "Acero")
const magneton = new Pokemon(82, "Magneton", "Eléctrico", "Acero")
const farfetchd = new Pokemon(83, "Farfetch'd", "Normal", "Volador")
const doduo = new Pokemon(84, "Doduo", "Normal", "Volador")
const dodrio = new Pokemon(85, "Dodrio", "Normal", "Volador")
const seel = new Pokemon(86, "Seel", "Agua", "Ninguno")
const dewgong = new Pokemon(87, "Dewgong", "Agua", "Hielo")
const grimer = new Pokemon(88, "Grimer", "Veneno", "Ninguno")
const muk = new Pokemon(89, "Muk", "Veneno", "Ninguno")
const shellder = new Pokemon(90, "Shellder", "Agua", "Ninguno")
const cloyster = new Pokemon(91, "Cloyster", "Agua", "Hielo")
const gastly = new Pokemon(92, "Gastly", "Fantasma", "Veneno")
const haunter = new Pokemon(93, "Haunter", "Fantasma", "Veneno")
const gengar = new Pokemon(94, "Gengar", "Fantasma", "Veneno")
const onix = new Pokemon(95, "Onix", "Roca", "Tierra", "Ninguno")
const drowzee = new Pokemon(96, "Drowzee", "Psíquico", "Ninguno")
const hypno = new Pokemon(97, "Hypno", "Psíquico", "Ninguno")
const krabby = new Pokemon(98, "Krabby", "Agua", "Ninguno")
const kingler = new Pokemon(99, "Kingler", "Agua", "Ninguno")
const voltorb = new Pokemon(100, "Voltorb", "Eléctrico", "Ninguno")
const electrode = new Pokemon(101, "Electrode", "Eléctrico", "Ninguno")
const exeggcute = new Pokemon(102, "Exeggcute", "Planta", "Psíquico")
const exeggutor = new Pokemon(103, "Exeggutor", "Planta", "Psíquico")
const cubone = new Pokemon(104, "Cubone", "Tierra", "Ninguno")
const marowak = new Pokemon(105, "Marowak", "Tierra", "Ninguno")
const hitmonlee = new Pokemon(106, "Hitmonlee", "Lucha", "Ninguno")
const hitmonchan = new Pokemon(107, "Hitmonchan", "Lucha", "Ninguno")
const lickitung = new Pokemon(108, "Lickitung", "Normal", "Ninguno")
const koffing = new Pokemon(109, "Koffing", "Veneno", "Ninguno")
const weezing = new Pokemon(110, "Weezing", "Veneno", "Ninguno")
const rhyhorn = new Pokemon(111, "Rhyhorn", "Tierra", "Roca")
const rhydon = new Pokemon(112, "Rhydon", "Tierra", "Roca")
const chansey = new Pokemon(113, "Chansey", "Normal", "Ninguno")
const tangela = new Pokemon(114, "Tangela", "Planta", "Ninguno")
const kangaskhan = new Pokemon(115, "Kangaskhan", "Normal", "Ninguno")
const horsea = new Pokemon(116, "Horsea", "Agua", "Ninguno")
const seadra = new Pokemon(117, "Seadra", "Agua", "Ninguno")
const goldeen = new Pokemon(118, "Goldeen", "Agua", "Ninguno")
const seaking = new Pokemon(119, "Seaking", "Agua", "Ninguno")
const staryu = new Pokemon(120, "Staryu", "Agua", "Ninguno")
const starmie = new Pokemon(121, "Starmie", "Agua", "Psíquico")
const mrMime = new Pokemon(122, "Mr.Mime", "Psíquico", "Hada")
const scyther = new Pokemon(123, "Scyther", "Bicho", "Volador")
const jynx = new Pokemon(124, "Jynx", "Hielo", "Psíquico", "Ninguno")
const electabuzz = new Pokemon(125, "Electabuzz", "Eléctrico")
const magmar = new Pokemon(126, "Magmar", "Fuego", "Ninguno")
const pinsir = new Pokemon(127, "Pinsir", "Bicho", "Ninguno")
const tauros = new Pokemon(128, "Tauros", "Normal", "Ninguno")
const magikarp = new Pokemon(129, "Magikarp", "Agua", "Ninguno")
const gyarados = new Pokemon(130, "Gyarados", "Agua", "Volador")
const lapras = new Pokemon(131, "Lapras", "Agua", "Hielo")
const ditto = new Pokemon(132, "Ditto", "Normal", "Ninguno")
const eevee = new Pokemon(133, "Eevee", "Normal", "Ninguno")
const vaporeon = new Pokemon(134, "Vaporeon", "Eléctrico", "Ninguno")
const jolteon = new Pokemon(135, "Jolteon", "Agua", "Ninguno")
const flareon = new Pokemon(136, "Flareon", "Fuego", "Ninguno")
const porygon = new Pokemon(137, "Porygon", "Normal", "Ninguno")
const omanyte = new Pokemon(138, "Omanyte", "Roca", "Agua")
const omastar = new Pokemon(139, "Omastar", "Roca", "Agua")
const kabuto = new Pokemon(140, "Kabuto", "Roca", "Agua")
const kabutops = new Pokemon(141, "Kabutops", "Roca", "Agua")
const aerodactyl = new Pokemon(142, "Aerodactyl", "Roca", "Volador")
const snorlax = new Pokemon(143, "Snorlax", "Normal", "Ninguno")
const articuno = new Pokemon(144, "Articuno", "Hielo", "Volador")
const zapdos = new Pokemon(145, "Zapdos", "Eléctrico", "Volador")
const moltres = new Pokemon(146, "Moltres", "Fuego", "Volador")
const dratini = new Pokemon(147, "Dratini", "Dragón", "Ninguno")
const dragonair = new Pokemon(148, "Dragonair", "Dragón")
const dragonite = new Pokemon(149, "Dragonite", "Dragón", "Volador")
const mewtwo = new Pokemon(150, "Mewtwo", "Psíquico", "Ninguno")
const mew = new Pokemon(151, "Mew", "Psíquico", "Ninguno")

//Se cargan todos los Pokemon creados al array "pokedex".
const pokedex = [bulbasaur,ivysaur,venasaur,charmander,charmeleon,charizard,squirtle,wartortle,blastoise,caterpie,metapod,butterfree,weedle,kakuna,beedrill,pidgey,pidgeotto,pidgeot,rattata,raticate,spearow,fearow,ekans,arbok,pikachu,raichu,sandshrew,sandslash,nidoranFemale,nidorina,nidoqueen,nidoranMale,nidorino,nidoking,clefairy,clefable,vulpix,ninetales,jigglypuff,wigglytuff,zubat,golbat,oddish,gloom,vileplume,paras,parasect,venonat,venomoth,diglett,dugtrio,meowth,persian,psyduck,golduck,mankey,primeape,growlithe,arcanine,poliwag,poliwhirl,poliwrath,abra,kadabra,alakazam,machop,machoke,machamp,bellsprout,weepinbell,victreebel,tentacool,tentacruel,geodude,graveler,golem,ponyta,rapidash,slowpoke,slowbro,magnemite,magneton,farfetchd,doduo,dodrio,seel,dewgong,grimer,muk,shellder,cloyster,gastly,haunter,gengar,onix,drowzee,hypno,krabby,kingler,voltorb,electrode,exeggcute,exeggutor,cubone,marowak,hitmonlee,hitmonchan,lickitung,koffing,weezing,rhyhorn,rhydon,chansey,tangela,kangaskhan,horsea,seadra,goldeen,seaking,staryu,starmie,mrMime,scyther,jynx,electabuzz,magmar,pinsir,tauros,magikarp,gyarados,lapras,ditto,eevee,vaporeon,jolteon,flareon,porygon,omanyte,omastar,kabuto,kabutops,aerodactyl,snorlax,articuno,zapdos,moltres,dratini,dragonair,dragonite,mewtwo,mew]

//Se le asigna a cada objeto del array "pokedex" su respectiva imagen.
pokedex.forEach((pokemon)=>{
    pokemon.img = `./img/${pokemon.name}.png`
})

//Por medio de una plantilla se crea una card para cada objeto del array "pokedex".
let divPokemons = document.getElementById("pokemons")
divPokemons.setAttribute("class", "pokemonCards")
pokedex.forEach((pokemon)=>{
    let pokemonCards = document.createElement("div")
    pokemonCards.innerHTML = `<div id="${pokemon.pokedexNumber}" class="card">
                                    <img src="${pokemon.img}" alt="${pokemon.name}">
                                    <div class="textBox">
                                        <p class="pokemonNumber">Nº.${pokemon.pokedexNumber}</p>
                                        <h3 class="pokemonName">${pokemon.name}</h3>
                                    </div>
                                    <div class="types">
                                        <p class="pokemonType">${pokemon.type}</p>
                                        <p class="pokemonType">${pokemon.secondType}</p>
                                    </div>
                               </div>`
    divPokemons.appendChild(pokemonCards)
})