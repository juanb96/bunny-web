/* Comportamiento común a todas las páginas: menú móvil, header al hacer scroll,
   botón volver arriba y año del pie. */
(function () {
  var header = document.querySelector('.site-header--overlay');
  var drawer = document.getElementById('drawer');
  var toTop = document.querySelector('.to-top');

  function openDrawer() { if (drawer) drawer.classList.add('is-open'); }
  function closeDrawer() { if (drawer) drawer.classList.remove('is-open'); }

  document.querySelectorAll('[data-open-menu]').forEach(function (b) {
    b.addEventListener('click', openDrawer);
  });
  document.querySelectorAll('[data-close-menu]').forEach(function (b) {
    b.addEventListener('click', closeDrawer);
  });
  if (drawer) {
    drawer.addEventListener('click', function (e) { if (e.target === drawer) closeDrawer(); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });
  }

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 60);
    if (toTop) toTop.classList.toggle('is-visible', y > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
