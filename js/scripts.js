
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200';
  let modalContainer = document.querySelector('#exampleModal'); //change id to #exampleModal if not working

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');

    listPokemon.classList.add('listPokemon-class');
    button.innerText = pokemon.name;
    button.classList.add('button-class')

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    loadDetails(pokemon).then(function () {
    let imageDiv = document.createElement('div');
    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.classList.add('pokemon-image');

    imageDiv.appendChild(pokemonImage);
    button.appendChild(imageDiv);
    })

    button.addEventListener('click', function() {
      showDetails(pokemon, modalContainer);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e){
      console.error(e);
    })
  }

  function loadDetails(pokemon)/*change item to pokemon if not working*/{
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;
      pokemon.abilities = details.abilities;
      // return pokemon;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    // pokemonRepository.loadDetails(pokemon).then(function () {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h1>' + pokemon.name + '</h1>');
    let pokemonImage = $('<img class="modal-img" style="width:50%">');
    pokemonImage.attr('src', pokemon.imageURL);

    let pokemonType = document.createElement('p');
    let typesCon = ''
    pokemon.types.forEach(element => {
      typesCon += `${element.type.name},`
    });
    pokemonType.innerText = 'Type(s): ' + typesCon;

    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    let pokemonAbilities = document.createElement('p');
    let abilitiesCon = ''
    pokemon.abilities.forEach(element => {
        abilitiesCon += `${element.ability.name},`
    });
    pokemonAbilities.innerText = 'Abilities: ' + abilitiesCon;

    modalTitle.append(pokemonName);
    modalBody.append(pokemonName);
    modalBody.append(pokemonType);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonAbilities);

    $('#exampleModal').modal();
  }

    $(document).ready(function(){
      $("#search-pokemon").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".button-class").filter(function() {
          $(this).toggle($(this.text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  //   modalContainer.classList.add('is-visible');
  // }

  // function hideModal () {
  //   let modalHeader = document.querySelector('.modal-header');
  //   let modalBody = document.querySelector('.modal-body');
  //
  //   while (modalHeader.lastChild) {
  //     modalHeader.removeChild(modalHeader.lastChild);
  //   }
  //
  //   while (modalBody.lastChild) {
  //     modalBody.removeChild(modalBody.lastChild);
  //   }
  //   modalContainer.classList.remove('is-visible');
  // }
  //
  //   window.addEventListener('keydown', (e) => {
  //     if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
  //       hideModal();
  //     }
  //   });

  // modalContainer.addEventListener('click', (e) => {
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });

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
