
let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: "Houndoom",
      height: "1.4",
      types: ["dark", "fire"],
    },
    {
      name: "Hitmonchan",
      height: "1.4",
      types: ["fighting"],
    },
    {
      name: "Aggron",
      height: "2.1",
      types: ["steel", "rock"],
    },
  ];

// for (let i = 0; i < pokemonList.length; i++) {
//   document.write(pokemonList[i].name + "(height: "+pokemonList[i].height+")");
//   if (pokemonList[i].height >= 2) {
//     document.write(" - Wow, that's big!");
//   }
//     document.write("<br/>");
// }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function() {
      showDetails(pokemon)
    });
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({ name: "Arbok", height: 3.4, types: ["Poison"] });

console.log(pokemonRepository.getAll());

// function printArrayDetails(list) {
//   list.forEach(function(pokemon) {
//     if (pokemon.height >= 2) {
//       document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big! </p>');
//     } else {
//       document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>');
//     }
//   });
// }

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
