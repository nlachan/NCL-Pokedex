let pokemonRepository = (function () {
  let t = [];
  function e() {
    return t;
  }
  function n(t) {
    i(t);
  }
  function i(t) {
    return fetch(t.detailsUrl)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = []);
        for (var n, i = 0; i < e.types.length; i++)
          t.types.push(e.types[i].type.name);
        t.abilities = [];
        for (var i = 0; i < e.abilities.length; i++)
          t.abilities.push(e.abilities[i].ability.name);
        let a, o, s, l, r, p, d, c;
        (n = t),
          (a = $(".modal-body")),
          (o = $(".modal-title")),
          $(".modal-header"),
          o.empty(),
          a.empty(),
          (s = $("<h1>" + n.name + "</h1>")),
          (l = $('<img class="modal-img">')),
          l.attr("src", n.imageUrl),
          (r = $("<p>HEIGHT : " + n.height + "</p>")),
          (p = $("<p>WEIGHT : " + n.weight + "</p>")),
          (d = $("<p>TYPES : " + n.types.join(", ") + "</p>")),
          (c = $("<p>ABILITIES : " + n.abilities.join(", ") + "</p>")),
          d.addClass("array-item"),
          c.addClass("array-item"),
          o.append(s),
          a.append(l),
          a.append(r),
          a.append(p),
          a.append(d),
          a.append(c);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  return {
    getAll: e,
    addListItem: function t(e) {
      let n = document.querySelector(".pokemon-list"),
        a = document.createElement("li");
      a.classList.add("list-group-item"),
        a.classList.add("col-12"),
        a.classList.add("col-md-4");
      let o = document.createElement("button");
      o.classList.add("btn"),
        o.classList.add("btn-block"),
        o.setAttribute("data-bs-toggle", "modal"),
        o.setAttribute("data-bs-target", "#pokemonModal"),
        (o.innerText = e.name),
        o.classList.add("button-class"),
        a.appendChild(o),
        n.appendChild(a),
        o.addEventListener("click", function (t) {
          var n;
          (n = e), i(n);
        });
    },
    loadList: function e() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (t) {
          return t.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            var n;
            let i = { name: e.name, detailsUrl: e.url };
            "object" == typeof (n = i) && "name" in n && "detailsUrl" in n
              ? t.push(n)
              : console.log("pokemon is not correct"),
              console.log(i);
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
