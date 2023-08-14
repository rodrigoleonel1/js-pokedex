const getTeam = () => {
  if (teamPokemon.length == 0) {
    Swal.fire({
      title: "The team is empty.",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return setCards(pokedex);
  }
  setCards(teamPokemon, "My team");
};

const clearTeam = () => {
  if (teamPokemon.length == 0) {
    return Swal.fire({
      title: "The team is already empty.",
      icon: "warning",
      confirmButtonText: "Ok",
      confirmButtonColor: "#0d6efd",
    });
  }
  Swal.fire({
    title: "Are you sure to clear your team?",
    text: `You will lose all your Pokémon.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Accept",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#0d6efd",
    cancelButtonColor: "#dc3545",
  }).then((result) => {
    if (result.isConfirmed) {
      teamPokemon = [];
      saveStorage("teamPokemon", teamPokemon);
      Swal.fire({
        title: "Team cleared",
        text: `Your team is empty now, you can add new Pokémon to complete your team again.`,
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#0d6efd",
      });
      setCards(pokedex);
    }
  });
};

const addToTeam = (button) => {
  const pokemonId = button.target.getAttribute("id");
  const pokemon = pokedex.find((pokemon) => pokemon.id == pokemonId);
  if (teamPokemon.find((p) => p.id == pokemonId)) {
    return Toastify({
      text: `${pokemon.name} is already in the team.`,
      duration: 3000,
      gravity: "bottom",
      style: { background: "#0d6efd" },
    }).showToast();
  }
  if (teamPokemon.length >= 6) {
    return Toastify({
      text: "The team is full.",
      duration: 3000,
      gravity: "bottom",
      style: { background: "#0d6efd" },
    }).showToast();
  }
  teamPokemon.push(pokemon);
  saveStorage("teamPokemon", teamPokemon);
  Toastify({
    text: `${pokemon.name} joined your team.`,
    duration: 3000,
    gravity: "bottom",
    style: { background: "#198754" },
  }).showToast();
};

const deleteFromTeam = (button) => {
  const pokemonId = button.target.getAttribute("id");
  const pokemon = teamPokemon.find((pokemon) => pokemon.id == pokemonId);
  teamPokemon.splice(teamPokemon.indexOf(pokemon), 1);
  saveStorage("teamPokemon", teamPokemon);
  Toastify({
    text: `${pokemon.name} removed from the team.`,
    duration: 3000,
    gravity: "bottom",
    style: { background: "#dc3545" },
  }).showToast();
  getTeam();
};
