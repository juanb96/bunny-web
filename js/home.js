/* Página de inicio: carrusel de testimonios, lightbox de la galería
   y validación del formulario de postulación. */
(function () {
  /* ---------- carrusel ---------- */
  var rail = document.getElementById('rail');
  if (rail && window.TESTIMONIOS) {
    rail.innerHTML = window.TESTIMONIOS.slice(0, 6).map(function (t) {
      return window.testimonioCard(t);
    }).join('');
  }
  function scrollRail(dir) {
    if (!rail) return;
    rail.scrollBy({ left: dir * Math.max(260, rail.clientWidth * 0.6), behavior: 'smooth' });
  }
  var prev = document.querySelector('[data-rail="prev"]');
  var next = document.querySelector('[data-rail="next"]');
  if (prev) prev.addEventListener('click', function () { scrollRail(-1); });
  if (next) next.addEventListener('click', function () { scrollRail(1); });

  /* ---------- lightbox de la galería ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery button'));
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  var boxTitle = document.getElementById('lightbox-title');
  var boxCount = document.getElementById('lightbox-count');
  var index = -1;

  function show(i) {
    if (!items.length || !box) return;
    index = (i + items.length) % items.length;
    var btn = items[index];
    boxImg.src = btn.getAttribute('data-src');
    boxImg.alt = btn.getAttribute('data-title');
    boxTitle.textContent = btn.getAttribute('data-title');
    boxCount.textContent = 'Foto ' + (index + 1) + ' de ' + items.length;
    box.classList.add('is-open');
  }
  function close() { if (box) box.classList.remove('is-open'); index = -1; }

  items.forEach(function (btn, i) {
    btn.addEventListener('click', function () { show(i); });
  });
  if (box) {
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.querySelector('[data-lb="close"]').addEventListener('click', close);
    document.querySelector('[data-lb="prev"]').addEventListener('click', function (e) { e.stopPropagation(); show(index - 1); });
    document.querySelector('[data-lb="next"]').addEventListener('click', function (e) { e.stopPropagation(); show(index + 1); });
    document.addEventListener('keydown', function (e) {
      if (index < 0) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'ArrowLeft') show(index - 1);
    });
  }

  /* ---------- ir al formulario ---------- */
  var form = document.getElementById('form-card');
  document.querySelectorAll('[data-goto-form]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!form) return;
      window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    });
  });

  /* ---------- formulario ---------- */
  var fields = document.getElementById('form-fields');
  var ok = document.getElementById('form-ok');
  var err = document.getElementById('form-error');
  var nombre = document.getElementById('f-nombre');
  var tel = document.getElementById('f-tel');
  var okName = document.getElementById('ok-name');
  var submit = document.getElementById('f-submit');
  var again = document.getElementById('f-again');

  function fail(msg) {
    if (!err) return;
    err.textContent = msg;
    err.classList.remove('hidden');
  }
  if (submit) {
    submit.addEventListener('click', function () {
      var n = (nombre.value || '').trim();
      var t = (tel.value || '').replace(/\D/g, '');
      if (n.length < 3) return fail('Escribe tu nombre completo.');
      if (t.length < 10) return fail('El WhatsApp debe tener 10 dígitos.');
      err.classList.add('hidden');
      okName.textContent = n.split(' ')[0];
      fields.classList.add('hidden');
      ok.classList.remove('hidden');
      /* Aquí se conecta el envío real (correo, CRM o WhatsApp API). */
    });
  }
  [nombre, tel].forEach(function (el) {
    if (el) el.addEventListener('input', function () { err.classList.add('hidden'); });
  });
  if (again) {
    again.addEventListener('click', function () {
      nombre.value = '';
      tel.value = '';
      ok.classList.add('hidden');
      fields.classList.remove('hidden');
    });
  }
})();
