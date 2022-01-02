
let pokemonRepository = (function() {

let pokemonList = [
  {
    name: "Houndoom",
    height: "1.4",
    types: ["dark", "fire"]
  },
  {
    name: "Hitmonchan",
    height: "1.4",
    type: ["fighting"]
  },
  {
    name: "Aggron",
    height: "2.1",
    types: ["steel", "rock"]
  },
];

// for (let i = 0; i < pokemonList.length; i++) {
//   document.write(pokemonList[i].name + "(height: "+pokemonList[i].height+")");
//   if (pokemonList[i].height >= 2) {
//     document.write(" - Wow, that's big!");
//   }
//     document.write("<br/>");
// }

function getAll() {
  return pokemonList;
}

function add(newPokemon) {
  if (typeof newPokemon === 'object') {
    pokemonList.push(newPokemon);
  }
}

    return {
      getAll: getAll,
      add: add
    };
})();

function printArrayDetails(list) {
  list.forEach(function(pokemon) {
    if (pokemon.height >= 2) {
      document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big! </p>');
    } else {
      document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>');
    }
  });
}

printArrayDetails(pokemonRepository.getAll());
