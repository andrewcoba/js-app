let pokemonRepository = (function() {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=200',
    n = document.querySelector('#exampleModal');
  function o(t) {
    'object' == typeof t && 'name' in t
      ? e.push(t)
      : console.log('pokemon is not correct');
  }
  function i(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.weight = t.weight),
          (e.types = t.types),
          (e.abilities = t.abilities);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function l(e) {
    i(e).then(function() {
      a(e);
    });
  }
  function a(e) {
    let t = $('.modal-body'),
      n = $('.modal-title');
    n.empty(), t.empty();
    let o = $('<h1>' + e.name + '</h1>'),
      i = $('<img class="modal-img" style="width:50%">');
    i.attr('src', e.imageURL);
    let l = document.createElement('p'),
      a = '';
    e.types.forEach(e => {
      a += `${e.type.name},`;
    }),
      (l.innerText = 'Type(s): ' + a);
    let s = $('<p>Height: ' + e.height + '</p>'),
      c = $('<p>Weight: ' + e.weight + '</p>'),
      d = document.createElement('p'),
      r = '';
    e.abilities.forEach(e => {
      r += `${e.ability.name},`;
    }),
      (d.innerText = 'Abilities: ' + r),
      n.append(o),
      t.append(l),
      t.append(s),
      t.append(i),
      t.append(c),
      t.append(d),
      $('#exampleModal').modal();
  }
  function s() {
    let e = $('.modal-title'),
      t = $('.modal-body');
    for (; e.lastChild; ) modalHeader.removeChild(modalHeader.lastChild);
    for (; t.lastChild; ) t.removeChild(t.lastChild);
    n.classList.remove('is-visible');
  }
  return (
    window.addEventListener('keydown', e => {
      'Escape' === e.key && n.classList.contains('is-visible') && s();
    }),
    n.addEventListener('click', e => {
      e.target === n && s();
    }),
    $(document).ready(function() {
      $('#search-pokemon').on('keyup', function() {
        var e = $(this)
          .val()
          .toLowerCase();
        $('.button-class').filter(function() {
          $(this).toggle(
            $(
              this.text()
                .toLowerCase()
                .indexOf(e) > -1
            )
          );
        });
      });
    }),
    {
      add: o,
      getAll: function() {
        return e;
      },
      addListItem: function(e) {
        let t = document.querySelector('.pokemon-list'),
          n = document.createElement('li'),
          o = document.createElement('button');
        n.classList.add('listPokemon-class'),
          (o.innerText = e.name),
          o.classList.add('button-class'),
          n.appendChild(o),
          t.appendChild(n),
          i(e).then(function() {
            let t = document.createElement('div'),
              n = document.createElement('img');
            (n.src = e.imageUrl),
              n.classList.add('pokemon-image'),
              t.appendChild(n),
              o.appendChild(t);
          }),
          o.addEventListener('click', function() {
            l(e);
          });
      },
      loadList: function() {
        return fetch(t)
          .then(function(e) {
            return e.json();
          })
          .then(function(e) {
            e.results.forEach(function(e) {
              o({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function(e) {
            console.error(e);
          });
      },
      loadDetails: i,
      showDetails: l,
      showModal: a,
      hideModal: s
    }
  );
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
