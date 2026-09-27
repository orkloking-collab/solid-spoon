/* ============================================================================
   MovieBazar — HOMEPAGE
   ========================================================================== */

(function () {
  'use strict';

  const A = window.App;
  let currentList = A.byDate();
  let activeGenre = 'All';

  /* ── Hero slider ────────────────────────────────────────────────── */
  function renderHero() {
    const el = A.$('#hero');
    if (!el) return;
    const slides = A.featured().slice(0, 3);

    el.innerHTML =
      '<div class="hero-slides">' +
        slides.map(function (m, i) {
          return (
            '<div class="hero-slide' + (i === 0 ? ' active' : '') + '" data-i="' + i + '" ' +
              'style="background-image:url(\'' + A.esc(m.backdrop) + '\')">' +
              '<div class="hero-slide__overlay"></div>' +
              '<div class="container hero-slide__content">' +
                '<span class="hero-slide__kicker">' + (i === 0 ? 'Featured' : 'Trending Now') + '</span>' +
                '<h1 class="hero-slide__title">' + A.esc(m.title) + '</h1>' +
                (m.titleBn ? '<p class="hero-slide__bn">' + A.esc(m.titleBn) + '</p>' : '') +
                '<div class="hero-slide__meta">' +
                  '<span class="pill pill--rating">&#9733; ' + A.esc(m.rating) + '</span>' +
                  '<span>' + A.esc(m.year) + '</span>' +
                  '<span>' + A.esc(m.runtime) + '</span>' +
                  '<span>' + A.esc(m.quality) + '</span>' +
                  '<span>' + A.esc(m.size) + '</span>' +
                  '<span>' + A.esc(m.language) + '</span>' +
                '</div>' +
                '<p class="hero-slide__desc">' + A.esc(m.synopsis) + '</p>' +
                '<div class="hero-slide__actions">' +
                  (m.video && (m.video.embed || m.video.src)
                    ? '<a class="btn btn--primary" href="movie.html?id=' + encodeURIComponent(m.id) + '#playerSlot">' +
                      '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg> Watch Now</a>'
                    : '') +
                  '<a class="btn ' + (m.video && (m.video.embed || m.video.src) ? 'btn--ghost' : 'btn--primary') + '" href="movie.html?id=' + encodeURIComponent(m.id) + '">' +
                    '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg> View Details</a>' +
                  '<a class="btn btn--ghost" href="movie.html?id=' + encodeURIComponent(m.id) + '#download">Download</a>' +
                '</div>' +
              '</div>' +
            '</div>'
          );
        }).join('') +
      '</div>' +
      '<div class="hero-dots">' +
        slides.map(function (m, i) {
          return '<button class="hero-dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
        }).join('') +
      '</div>';

    let idx = 0;
    const slideEls = A.$$('.hero-slide', el);
    const dotEls = A.$$('.hero-dot', el);

    function go(n) {
      idx = (n + slideEls.length) % slideEls.length;
      slideEls.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      dotEls.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    }
    dotEls.forEach(function (d) {
      d.addEventListener('click', function () { go(Number(d.getAttribute('data-i'))); reset(); });
    });

    let timer = setInterval(function () { go(idx + 1); }, 6500);
    function reset() {
      clearInterval(timer);
      timer = setInterval(function () { go(idx + 1); }, 6500);
    }
  }

  /* ── Genre chips ────────────────────────────────────────────────── */
  function renderGenres() {
    const el = A.$('#genreChips');
    if (!el) return;
    const genres = ['All'].concat(A.allGenres());
    el.innerHTML = genres.map(function (g) {
      return '<button class="chip' + (g === 'All' ? ' active' : '') + '" data-genre="' + A.esc(g) + '">' + A.esc(g) + '</button>';
    }).join('');

    A.$$('.chip', el).forEach(function (chip) {
      chip.addEventListener('click', function () {
        activeGenre = chip.getAttribute('data-genre');
        A.$$('.chip', el).forEach(function (c) { c.classList.toggle('active', c === chip); });
        applyFilter();
      });
    });
  }

  /* ── Grid (with in-grid ad after row) ───────────────────────────── */
  function renderGrid(list) {
    const el = A.$('#movieGrid');
    if (!el) return;
    const q = (new URLSearchParams(location.search).get('q') || '').trim().toLowerCase();

    const filtered = list.filter(function (m) {
      const genreOk = activeGenre === 'All' || (m.genres || []).indexOf(activeGenre) !== -1;
      const text = (m.title + ' ' + (m.titleBn || '') + ' ' + (m.genres || []).join(' ') + ' ' + m.year + ' ' + (m.language || '')).toLowerCase();
      const qOk = !q || text.indexOf(q) !== -1;
      return genreOk && qOk;
    });

    const countEl = A.$('#resultCount');
    if (countEl) {
      countEl.textContent = q
        ? '"' + q + '" — ' + filtered.length + ' ta movie pawa gieche'
        : filtered.length + ' ta movie';
    }

    if (!filtered.length) {
      el.innerHTML =
        '<div class="empty-state">' +
          '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>' +
          '<h3>Kono movie pawa jay nai</h3>' +
          '<p>Onno kono keyword diye search korun, ba genre change korun.</p>' +
        '</div>';
      return;
    }

    let html = '';
    filtered.forEach(function (m, i) {
      html += A.movieCard(m);
      /* in-grid ad slot — 8 number card er por */
      if (i === 7) html += '<div class="grid-ad"><div class="ad-slot" data-ad="native"></div></div>';
    });
    el.innerHTML = html;
    /* notun add howa ad slot gulo observe kora */
    if (window.Ads && window.Ads.scan) window.Ads.scan();
  }

  function applyFilter() { renderGrid(currentList); }

  /* ── Tabs ───────────────────────────────────────────────────────── */
  function setupTabs() {
    const tabs = A.$$('#listTabs .tab');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
        const key = tab.getAttribute('data-tab');
        currentList = key === 'trending' ? A.byViews()
                    : key === 'toprated' ? A.byRating()
                    : A.byDate();
        applyFilter();
      });
    });
  }

  /* ── Header search → filter live (home page e) ─────────────────── */
  function setupLiveSearch() {
    const input = A.$('#searchInput');
    if (!input) return;
    let t;
    input.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(applyFilter, 180);
    });
  }

  function boot() {
    renderHero();
    renderGenres();
    setupTabs();
    setupLiveSearch();
    renderGrid(currentList);

    /* Free movies section — asol video wala legally free movie */
    const freeGrid = A.$('#freeGrid');
    if (freeGrid) {
      freeGrid.innerHTML = A.movies.filter(function (m) { return m.free; }).map(A.movieCard).join('');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
