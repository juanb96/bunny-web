/* Listado de testimonios: pinta la grilla y filtra por experiencia. */
(function () {
  var grid = document.getElementById('t-grid');
  var chips = document.getElementById('chips');
  var count = document.getElementById('result-count');
  var empty = document.getElementById('empty');
  var data = window.TESTIMONIOS || [];
  var filtro = 'Todas';

  function grupo(t) {
    return parseInt(t.years, 10) <= 2 ? 'Primeros años' : 'Veteranas';
  }
  var grupos = ['Todas', 'Primeros años', 'Veteranas'];

  function pintaChips() {
    chips.innerHTML = grupos.map(function (g) {
      var n = g === 'Todas' ? data.length : data.filter(function (t) { return grupo(t) === g; }).length;
      return '<button type="button" class="chip' + (g === filtro ? ' is-active' : '') +
        '" data-filtro="' + g + '">' + g + '<small>' + n + '</small></button>';
    }).join('');
    chips.querySelectorAll('.chip').forEach(function (c) {
      c.addEventListener('click', function () {
        filtro = c.getAttribute('data-filtro');
        render();
      });
    });
  }

  function render() {
    var lista = filtro === 'Todas' ? data : data.filter(function (t) { return grupo(t) === filtro; });
    grid.innerHTML = lista.map(function (t) { return window.testimonioCard(t); }).join('');
    count.textContent = lista.length + (lista.length === 1 ? ' historia' : ' historias');
    empty.classList.toggle('hidden', lista.length > 0);
    pintaChips();
  }

  var verTodos = document.getElementById('ver-todos');
  if (verTodos) verTodos.addEventListener('click', function () { filtro = 'Todas'; render(); });

  var totales = document.getElementById('stat-total');
  if (totales) totales.textContent = data.length;

  render();
})();
