
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

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
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    listpokemon.classList.add('listItem-class');
    button.classList.add("button-class");

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    loadDetails(pokemon).then(function () {
      let imageDiv = document.createElement('div');
      let pokemonImage = document.createElement('img');
      pokemonImage.src pokemon.imageUrl;
      pokemonImage.classList.add('pokmon-image');
    })

    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = pokemon.name;

    let pokemonType = document.createElement('p');
    pokemonType.innerText = 'Type(s): ' + pokemon.types.map((x) => x.type.name).join(', ');

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height: ' + pokemon.height;

    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-modal-image');
    pokemonImage.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonType);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal () {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click' (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// function printArrayDetails(list) {
//   list.forEach(function(pokemon) {
//     if (pokemon.height >= 2) {
//       document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big! </p>');
//     } else {
//       document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>');
//     }
//   });
// }
