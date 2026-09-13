/* Formulario de postulación por área (modelo satélite / modelo Only).
   Valida en el navegador y muestra el mensaje de éxito.
   Conecta el envío real donde está marcado el comentario. */
(function () {
  var fields = document.getElementById('form-fields');
  var ok = document.getElementById('form-ok');
  var err = document.getElementById('form-error');
  var nombre = document.getElementById('f-nombre');
  var tel = document.getElementById('f-tel');
  var edad = document.getElementById('f-edad');
  var okName = document.getElementById('ok-name');
  var submit = document.getElementById('f-submit');
  var again = document.getElementById('f-again');

  function fail(msg) {
    err.textContent = msg;
    err.classList.remove('hidden');
  }

  if (submit) {
    submit.addEventListener('click', function () {
      var n = (nombre.value || '').trim();
      var t = (tel.value || '').replace(/\D/g, '');
      if (n.length < 3) return fail('Escribe tu nombre completo.');
      if (t.length < 10) return fail('El WhatsApp debe tener 10 dígitos.');
      if (edad && !edad.checked) return fail('Debes confirmar que eres mayor de 18 años.');
      err.classList.add('hidden');
      okName.textContent = n.split(' ')[0];
      fields.classList.add('hidden');
      ok.classList.remove('hidden');
      /* Envío real: aquí conecta tu correo, CRM, Formspree o la API de WhatsApp.
         El área de la postulación está en document.body.dataset.area */
    });
  }

  [nombre, tel].forEach(function (el) {
    if (el) el.addEventListener('input', function () { err.classList.add('hidden'); });
  });

  if (again) {
    again.addEventListener('click', function () {
      nombre.value = '';
      tel.value = '';
      if (edad) edad.checked = false;
      ok.classList.add('hidden');
      fields.classList.remove('hidden');
    });
  }
})();
