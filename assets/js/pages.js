/* ============================================================================
   MovieBazar — CATEGORY / SEARCH RESULTS PAGE
   ========================================================================== */

(function () {
  'use strict';

  const A = window.App;

  function boot() {
    const params = new URLSearchParams(location.search);
    const genre = params.get('genre');
    const q = (params.get('q') || '').trim();

    const list = A.movies.filter(function (m) {
      const genreOk = !genre || (m.genres || []).indexOf(genre) !== -1;
      const text = (m.title + ' ' + (m.titleBn || '') + ' ' + (m.genres || []).join(' ') + ' ' + m.year + ' ' + (m.language || '')).toLowerCase();
      const qOk = !q || text.indexOf(q.toLowerCase()) !== -1;
      return genreOk && qOk;
    });

    const titleEl = A.$('#catTitle');
    const subEl = A.$('#catSub');
    const gridEl = A.$('#movieGrid');
    if (!gridEl) return;

    if (genre) {
      if (titleEl) titleEl.textContent = genre + ' Movies';
      if (subEl) subEl.textContent = list.length + ' ta ' + genre + ' movie pawa gieche';
    } else if (q) {
      if (titleEl) titleEl.textContent = 'Search: "' + q + '"';
      if (subEl) subEl.textContent = list.length + ' ta result pawa gieche';
    } else {
      if (titleEl) titleEl.textContent = 'All Movies';
      if (subEl) subEl.textContent = A.movies.length + ' ta movie';
    }

    if (!list.length) {
      gridEl.innerHTML =
        '<div class="empty-state empty-state--page">' +
          '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>' +
          '<h3>Kichu pawa jay nai</h3>' +
          '<p>Onno keyword diye try korun.</p>' +
          '<a class="btn btn--primary" href="index.html">Home</a>' +
        '</div>';
      return;
    }

    let html = '';
    list.forEach(function (m, i) {
      html += A.movieCard(m);
      if (i === 5) html += '<div class="grid-ad"><div class="ad-slot" data-ad="native"></div></div>';
    });
    gridEl.innerHTML = html;
    if (window.Ads && window.Ads.scan) window.Ads.scan();

    /* contact form (contact page) */
    const form = A.$('#contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        A.toast('Message pathano hoy nai — email: ' + (window.SITE_CONFIG.site.email || ''));
        form.reset();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
