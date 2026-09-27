/* ============================================================================
   MovieBazar — APP (shared: header, footer, search, helpers)
   ========================================================================== */

(function () {
  'use strict';

  /* ── Small helpers ─────────────────────────────────────────────── */
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function formatViews(n) {
    n = Number(n) || 0;
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1000)    return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  const MOVIES = window.MOVIES || [];

  function getMovie(id) {
    return MOVIES.filter(function (m) { return m.id === id; })[0] || null;
  }

  function allGenres() {
    const set = {};
    MOVIES.forEach(function (m) { (m.genres || []).forEach(function (g) { set[g] = 1; }); });
    return Object.keys(set).sort();
  }

  function byDate() {
    return MOVIES.slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
  }
  function byRating() {
    return MOVIES.slice().sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });
  }
  function byViews() {
    return MOVIES.slice().sort(function (a, b) { return (b.views || 0) - (a.views || 0); });
  }
  function featured() {
    const f = MOVIES.filter(function (m) { return m.featured; });
    return f.length ? f : byRating().slice(0, 3);
  }

  /* ── Toast (download link na dewar message) ─────────────────────── */
  function toast(msg) {
    let t = $('#toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('toast--show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('toast--show'); }, 2600);
  }

  /* ── Header ─────────────────────────────────────────────────────── */
  function renderHeader(active) {
    const el = $('#site-header');
    if (!el) return;
    const cfg = window.SITE_CONFIG.site;

    const genres = allGenres().map(function (g) {
      return '<a href="category.html?genre=' + encodeURIComponent(g) + '">' + esc(g) + '</a>';
    }).join('');

    const page = location.pathname.split('/').pop() || 'index.html';

    el.innerHTML =
      '<div class="container header-inner">' +
        '<button class="menu-toggle" id="menuToggle" aria-label="Menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +

        '<a class="logo" href="index.html">' +
          '<svg class="logo-icon" viewBox="0 0 48 48" aria-hidden="true">' +
            '<rect x="2" y="2" width="44" height="44" rx="12" fill="url(#lg)"/>' +
            '<defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">' +
              '<stop offset="0" stop-color="#ff4d61"/><stop offset="1" stop-color="#c4081a"/>' +
            '</linearGradient></defs>' +
            '<path d="M19 15.5v17l14-8.5z" fill="#fff"/>' +
          '</svg>' +
          '<span class="logo-text">Movie<strong>Bazar</strong>' +
            '<em class="logo-bn">' + esc(cfg.nameBn) + '</em>' +
          '</span>' +
        '</a>' +

        '<form class="search" id="searchForm" action="category.html" method="get" role="search">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0z" ' +
            'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
          '<input type="search" name="q" id="searchInput" placeholder="Search movie…" autocomplete="off" aria-label="Search movie">' +
        '</form>' +

        '<nav class="main-nav" id="mainNav">' +
          '<a href="index.html" class="' + (page === 'index.html' ? 'active' : '') + '">Home</a>' +
          '<a href="index.html#free" class="' + (page === 'index.html' ? '' : '') + '">Free Movies</a>' +
          '<a href="index.html#latest" class="' + (page === 'index.html' ? '' : '') + '">Latest</a>' +
          '<div class="nav-dropdown">' +
            '<button class="nav-dropdown__btn" type="button">Genres ' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
            '</button>' +
            '<div class="nav-dropdown__menu">' + genres + '</div>' +
          '</div>' +
          '<a href="contact.html" class="' + (page === 'contact.html' ? 'active' : '') + '">Request</a>' +
          '<a href="dmca.html" class="' + (page === 'dmca.html' ? 'active' : '') + '">DMCA</a>' +
        '</nav>' +
      '</div>';

    /* mobile menu */
    const toggle = $('#menuToggle');
    const nav = $('#mainNav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.toggle('open');
        toggle.classList.toggle('open');
      });
    }
  }

  /* ── Footer ─────────────────────────────────────────────────────── */
  function renderFooter() {
    const el = $('#site-footer');
    if (!el) return;
    const cfg = window.SITE_CONFIG.site;
    const genres = allGenres().slice(0, 6).map(function (g) {
      return '<a href="category.html?genre=' + encodeURIComponent(g) + '">' + esc(g) + '</a>';
    }).join('');

    el.innerHTML =
      '<div class="ad-slot ad-slot--footer" data-ad="footer"></div>' +
      '<div class="container footer-grid">' +
        '<div class="footer-col footer-about">' +
          '<a class="logo logo--footer" href="index.html">' +
            '<svg class="logo-icon" viewBox="0 0 48 48" aria-hidden="true">' +
              '<rect x="2" y="2" width="44" height="44" rx="12" fill="#e50914"/>' +
              '<path d="M19 15.5v17l14-8.5z" fill="#fff"/>' +
            '</svg>' +
            '<span class="logo-text">Movie<strong>Bazar</strong></span>' +
          '</a>' +
          '<p>' + esc(cfg.description) + '</p>' +
          '<div class="socials">' +
            '<a href="#" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3 0-1.3-.1-2.45-.1-2.4 0-4.05 1.45-4.05 4.15V9.9H7.5V13h2.7v8z"/></svg></a>' +
            '<a href="#" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.25 5 12 5 12 5s-6.25 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.75 1.77C5.75 19 12 19 12 19s6.25 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.1V8.9l5.2 3.1z"/></svg></a>' +
            '<a href="#" aria-label="Telegram" title="Telegram"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M21.9 4.3 19 19.4c-.2 1-.8 1.2-1.6.75l-4.45-3.3-2.15 2.05c-.24.24-.44.44-.9.44l.32-4.5 8.2-7.4c.36-.32-.08-.5-.55-.18L7.6 12.75 3.3 11.4c-.95-.3-.97-.95.2-1.4L20.3 3.3c.8-.3 1.5.18 1.24 1z"/></svg></a>' +
            '<a href="#" aria-label="X" title="X"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 3h3.2l-7 8 7.3 10h-5.6l-4.4-6.2L5.9 21H2.7l7.3-8.3L3 3h5.7l4.1 5.8zm-1.1 16h1.7L7.6 4.8H5.8z"/></svg></a>' +
          '</div>' +
        '</div>' +

        '<div class="footer-col">' +
          '<h4>Quick Links</h4>' +
          '<a href="index.html">Home</a>' +
          '<a href="index.html#free">Free Movies</a>' +
          '<a href="index.html#latest">Latest Movies</a>' +
          '<a href="index.html#trending">Trending</a>' +
          '<a href="index.html#toprated">Top Rated</a>' +
          '<a href="contact.html">Request a Movie</a>' +
        '</div>' +

        '<div class="footer-col">' +
          '<h4>Categories</h4>' + genres +
        '</div>' +

        '<div class="footer-col">' +
          '<h4>Legal</h4>' +
          '<a href="about.html">About Us</a>' +
          '<a href="contact.html">Contact Us</a>' +
          '<a href="dmca.html">DMCA</a>' +
          '<a href="privacy.html">Privacy Policy</a>' +
        '</div>' +
      '</div>' +

      '<div class="footer-bottom">' +
        '<div class="container">' +
          '<p>&copy; ' + cfg.startedYear + ' ' + esc(cfg.name) + ' (' + esc(cfg.nameBn) + '). All rights reserved.</p>' +
          '<p class="footer-note">Ads served by Adsterra. ' + esc(cfg.name) + ' does not host any files on its servers — all contents are provided by non-affiliated third parties.</p>' +
        '</div>' +
      '</div>';
  }

  /* ── Movie card ─────────────────────────────────────────────────── */
  function movieCard(m) {
    return (
      '<article class="card" data-id="' + esc(m.id) + '">' +
        '<a class="card__thumb" href="movie.html?id=' + encodeURIComponent(m.id) + '">' +
          '<img src="' + esc(m.poster) + '" alt="' + esc(m.title) + ' poster" loading="lazy" ' +
            'onerror="this.src=\'assets/img/posters/fallback.svg\'">' +
          '<span class="badge badge--quality">' + esc(m.quality) + '</span>' +
          (m.free ? '<span class="badge badge--free">FREE</span>' : '') +
          '<span class="badge badge--rating">&#9733; ' + esc(m.rating) + '</span>' +
          '<span class="card__play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>' +
        '</a>' +
        '<div class="card__body">' +
          '<h3 class="card__title"><a href="movie.html?id=' + encodeURIComponent(m.id) + '">' + esc(m.title) + '</a></h3>' +
          '<p class="card__meta">' + esc(m.year) + ' &bull; ' + esc((m.genres || [])[0] || '') + ' &bull; ' + esc(m.size) + '</p>' +
        '</div>' +
      '</article>'
    );
  }

  /* ── Init shared parts on every page ────────────────────────────── */
  function boot() {
    renderHeader();
    renderFooter();
    if (window.Ads && window.Ads.scan) window.Ads.scan();

    /* search prefill */
    const q = new URLSearchParams(location.search).get('q');
    const input = $('#searchInput');
    if (input && q) input.value = q;

    /* download / part link click → placeholder message */
    document.addEventListener('click', function (e) {
      const a = e.target.closest && e.target.closest('a[data-download]');
      if (a && (!a.getAttribute('href') || a.getAttribute('href') === '#')) {
        e.preventDefault();
        toast('Download link ekhono add kora hoy nai — assets/js/movies.js te parts[].url boshan');
      }
      const p = e.target.closest && e.target.closest('a[data-player]');
      if (p) {
        e.preventDefault();
        toast('Player / embed code ekhane add korben (movie.html → #playerSlot)');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* expose helpers */
  window.App = {
    $: $, $$: $$, esc: esc, formatViews: formatViews,
    getMovie: getMovie, allGenres: allGenres,
    byDate: byDate, byRating: byRating, byViews: byViews,
    featured: featured, movieCard: movieCard, toast: toast,
    movies: MOVIES,
  };
})();
