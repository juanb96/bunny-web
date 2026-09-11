/* Página de detalle: carga el testimonio según el #slug de la URL
   y maneja el reproductor (demo hasta conectar el video real). */
(function () {
  var data = window.TESTIMONIOS || [];
  var idx = 0;
  var pos = 0, playing = false, rate = 1, muted = false, cc = false, liked = false;
  var timer = null;

  var el = {
    crumb: document.getElementById('crumb-name'),
    tag: document.getElementById('player-tag'),
    poster: document.getElementById('poster'),
    posterCap: document.getElementById('poster-cap'),
    posterMeta: document.getElementById('poster-meta'),
    playing: document.getElementById('playing'),
    bar: document.getElementById('bar'),
    knob: document.getElementById('knob'),
    progress: document.getElementById('progress'),
    time: document.getElementById('time'),
    dur: document.getElementById('dur'),
    btnPlay: document.getElementById('btn-play'),
    btnBig: document.getElementById('btn-big'),
    btnMute: document.getElementById('btn-mute'),
    btnCC: document.getElementById('btn-cc'),
    rates: document.getElementById('rates'),
    badgeSede: document.getElementById('badge-sede'),
    badgeYears: document.getElementById('badge-years'),
    badgeDur: document.getElementById('badge-dur'),
    title: document.getElementById('t-title'),
    name: document.getElementById('t-name'),
    role: document.getElementById('t-role'),
    body: document.getElementById('t-body'),
    chapters: document.getElementById('chapters'),
    ctaText: document.getElementById('cta-text'),
    like: document.getElementById('btn-like'),
    likeCount: document.getElementById('like-count'),
    share: document.getElementById('btn-share'),
    prev: document.getElementById('nav-prev'),
    next: document.getElementById('nav-next'),
    more: document.getElementById('more-grid')
  };

  function fmt(s) {
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ':' + (r < 10 ? '0' : '') + r;
  }
  function secsOf(stamp) {
    return stamp.split(':').reduce(function (a, b) { return a * 60 + Number(b); }, 0);
  }
  function current() { return data[idx]; }

  function renderChapters() {
    var t = current();
    el.chapters.innerHTML = t.capitulos.map(function (c) {
      return '<button type="button" class="chapter" data-go="' + secsOf(c[0]) + '">' +
        '<span class="t">' + c[0] + '</span><span class="l">' + c[1] + '</span></button>';
    }).join('');
    el.chapters.querySelectorAll('.chapter').forEach(function (b) {
      b.addEventListener('click', function () {
        pos = Number(b.getAttribute('data-go'));
        playing = true;
        paint();
      });
    });
  }

  function renderStatic() {
    var t = current();
    document.title = t.name + ' · Testimonios · Bunny';
    el.crumb.textContent = t.name;
    el.tag.textContent = 'Video · testimonio ' + t.name;
    el.posterCap.textContent = t.cap;
    el.posterMeta.textContent = t.dur + ' · Sede ' + t.sede;
    el.badgeSede.textContent = 'Sede ' + t.sede;
    el.badgeYears.textContent = t.years + ' en Bunny';
    el.badgeDur.textContent = t.dur;
    el.title.textContent = t.cap;
    el.name.textContent = t.name;
    el.role.textContent = 'Modelo Bunny · ' + t.sede;
    el.dur.textContent = t.dur;
    el.body.innerHTML = t.parrafos.map(function (p) { return '<p>' + p + '</p>'; }).join('');
    el.ctaText.textContent = 'Una asesora de la sede ' + t.sede + ' te contacta hoy mismo por WhatsApp.';
    el.likeCount.textContent = 148 + idx * 37;

    var p = data[(idx - 1 + data.length) % data.length];
    var n = data[(idx + 1) % data.length];
    el.prev.href = '#' + p.slug;
    el.prev.querySelector('b').textContent = p.name;
    el.next.href = '#' + n.slug;
    el.next.querySelector('b').textContent = n.name;

    el.more.innerHTML = data.filter(function (_, k) { return k !== idx; }).slice(0, 4)
      .map(function (r) { return window.testimonioCard(r); }).join('');

    renderChapters();
  }

  function paint() {
    var t = current();
    var pct = Math.min(100, (pos / t.secs) * 100);
    el.bar.style.width = pct + '%';
    el.knob.style.left = pct + '%';
    el.time.textContent = fmt(pos);
    el.btnPlay.textContent = playing ? '❚❚' : '▶';
    el.btnMute.textContent = muted ? '🔇' : '🔊';
    el.poster.classList.toggle('hidden', playing || pos > 0);
    el.playing.classList.toggle('hidden', !(playing || pos > 0));
    el.chapters.querySelectorAll('.chapter').forEach(function (b) {
      b.classList.toggle('is-on', pos >= Number(b.getAttribute('data-go')));
    });
  }

  function load() {
    var hash = decodeURIComponent((window.location.hash || '').replace('#', ''));
    var found = data.findIndex(function (t) { return t.slug === hash; });
    idx = found >= 0 ? found : 0;
    pos = 0; playing = false; liked = false;
    el.like.classList.remove('is-on');
    el.like.querySelector('.heart').textContent = '♡';
    renderStatic();
    paint();
  }

  /* ---------- controles ---------- */
  el.btnBig.addEventListener('click', function () { playing = true; paint(); });
  el.btnPlay.addEventListener('click', function () {
    if (pos >= current().secs) pos = 0;
    playing = !playing;
    paint();
  });
  el.btnMute.addEventListener('click', function () { muted = !muted; paint(); });
  el.btnCC.addEventListener('click', function () {
    cc = !cc;
    el.btnCC.classList.toggle('is-on', cc);
  });
  el.progress.addEventListener('click', function (e) {
    var r = el.progress.getBoundingClientRect();
    pos = Math.max(0, Math.min(current().secs, ((e.clientX - r.left) / r.width) * current().secs));
    paint();
  });
  el.rates.querySelectorAll('.pill').forEach(function (b) {
    b.addEventListener('click', function () {
      rate = Number(b.getAttribute('data-rate'));
      el.rates.querySelectorAll('.pill').forEach(function (x) {
        x.classList.toggle('is-on', x === b);
      });
    });
  });
  el.like.addEventListener('click', function () {
    liked = !liked;
    el.like.classList.toggle('is-on', liked);
    el.like.querySelector('.heart').textContent = liked ? '♥' : '♡';
    el.likeCount.textContent = (148 + idx * 37) + (liked ? 1 : 0);
  });
  el.share.addEventListener('click', function () {
    var url = window.location.href;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(function () {});
    el.share.querySelector('.label').textContent = 'Enlace copiado';
    setTimeout(function () { el.share.querySelector('.label').textContent = 'Compartir'; }, 2200);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      playing = !playing;
      paint();
    }
  });
  window.addEventListener('hashchange', function () {
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  timer = setInterval(function () {
    if (!playing) return;
    pos += 0.25 * rate;
    if (pos >= current().secs) { pos = current().secs; playing = false; }
    paint();
  }, 250);

  load();
})();
