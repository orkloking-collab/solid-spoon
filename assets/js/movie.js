/* ============================================================================
   MovieBazar — MOVIE DETAIL PAGE
   ========================================================================== */

(function () {
  'use strict';

  const A = window.App;

  function notFound() {
    const main = A.$('#movieMain');
    if (!main) return;
    main.innerHTML =
      '<div class="empty-state empty-state--page">' +
        '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"/></svg>' +
        '<h2>Movie pawa jay nai</h2>' +
        '<p>Oi movie ta remove hoy giyeche ba link ta vul.</p>' +
        '<a class="btn btn--primary" href="index.html">Home e phire jaun</a>' +
      '</div>';
  }

  function playerBlock(m) {
    const v = m.video || {};
    let media;

    if (v.embed) {
      /* iframe player (Internet Archive embed ba onno kono embed) */
      media =
        '<iframe class="player__frame" src="' + A.esc(v.embed) + '" ' +
          'title="' + A.esc(m.title) + ' player" allowfullscreen ' +
          'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" ' +
          'frameborder="0" scrolling="no" loading="lazy"></iframe>';
    } else if (v.src) {
      /* direct video file */
      media =
        '<video class="player__video" controls playsinline preload="metadata" ' +
          'poster="' + A.esc(v.poster || m.backdrop) + '">' +
          '<source src="' + A.esc(v.src) + '" type="' + A.esc(v.type || 'video/mp4') + '">' +
          'Apnar browser video support kore na.' +
        '</video>';
    } else {
      /* kono video add na korle placeholder */
      media =
        '<img class="player__poster" src="' + A.esc(m.backdrop) + '" alt="' + A.esc(m.title) + '" loading="lazy">' +
        '<div class="player__overlay">' +
          '<button class="player__btn" type="button" data-player aria-label="Play">' +
            '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>' +
          '</button>' +
          '<p class="player__hint">' +
            'Video ekhane boshbe &mdash; <code>assets/js/movies.js</code> te ' +
            '<code>video.embed</code> ba <code>video.src</code> add korun' +
          '</p>' +
        '</div>';
    }

    return (
      '<div class="player" id="playerSlot">' +
        media +
        '<span class="player__badge">' + A.esc(m.quality) + '</span>' +
        (m.free ? '<span class="player__badge player__badge--free">FREE</span>' : '') +
      '</div>' +
      (v.note
        ? '<p class="player-note">' +
            '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>' +
            A.esc(v.note) +
            (m.license ? ' &bull; License: ' + A.esc(m.license) : '') +
          '</p>'
        : '')
    );
  }

  function downloadBlock(m) {
    const rows = (m.parts || []).map(function (p) {
      return (
        '<tr>' +
          '<td class="dl-part">' + A.esc(p.label) + '</td>' +
          '<td>' + A.esc(p.quality || m.quality) + '</td>' +
          '<td>' + A.esc(p.size || m.size) + '</td>' +
          '<td class="dl-action">' +
            '<a class="btn btn--primary btn--sm" href="' + A.esc(p.url || '#') + '" data-download ' +
              (p.url && p.url !== '#' ? 'target="_blank" rel="nofollow noopener"' : '') + '>' +
              'Download</a>' +
          '</td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<section class="section" id="download">' +
        '<h2 class="section__title">Download Links</h2>' +
        '<div class="table-wrap">' +
          '<table class="dl-table">' +
            '<thead><tr><th>Part</th><th>Quality</th><th>Size</th><th>Link</th></tr></thead>' +
            '<tbody>' + rows + '</tbody>' +
          '</table>' +
        '</div>' +
        '<p class="note">Note: Link gulo <code>assets/js/movies.js</code> &rarr; <code>parts[].url</code> theke change korben.</p>' +
      '</section>'
    );
  }

  function screenshotsBlock(m) {
    const shots = [0, 1, 2].map(function (i) {
      const pos = ['center', 'left', 'right'][i];
      return '<a class="shot" href="' + A.esc(m.backdrop) + '" target="_blank" rel="noopener">' +
        '<img src="' + A.esc(m.backdrop) + '" alt="Screenshot ' + (i + 1) + '" loading="lazy" style="object-position:' + pos + '">' +
        '<span>Screenshot ' + (i + 1) + '</span></a>';
    }).join('');

    return (
      '<section class="section">' +
        '<h2 class="section__title">Screenshots</h2>' +
        '<div class="shots">' + shots + '</div>' +
      '</section>'
    );
  }

  function relatedBlock(m) {
    const rel = A.movies.filter(function (x) {
      return x.id !== m.id && (x.genres || []).some(function (g) { return (m.genres || []).indexOf(g) !== -1; });
    }).slice(0, 6);
    const list = rel.length ? rel : A.byRating().slice(0, 6);

    return (
      '<section class="section" id="related">' +
        '<h2 class="section__title">Related Movies</h2>' +
        '<div class="grid grid--cards">' + list.map(A.movieCard).join('') + '</div>' +
      '</section>'
    );
  }

  function sidebarBlock(m) {
    const top = A.byRating().slice(0, 6);
    return (
      '<aside class="sidebar">' +
        '<div class="ad-slot ad-slot--sidebar" data-ad="sidebar"></div>' +
        '<div class="side-box">' +
          '<h4 class="side-box__title">Top Rated</h4>' +
          '<ul class="side-list">' +
            top.map(function (x, i) {
              return (
                '<li>' +
                  '<span class="side-list__rank">' + (i + 1) + '</span>' +
                  '<a href="movie.html?id=' + encodeURIComponent(x.id) + '">' + A.esc(x.title) + '</a>' +
                  '<span class="side-list__rating">&#9733; ' + A.esc(x.rating) + '</span>' +
                '</li>'
              );
            }).join('') +
          '</ul>' +
        '</div>' +
        '<div class="side-box">' +
          '<h4 class="side-box__title">Movie Info</h4>' +
          '<ul class="side-meta">' +
            '<li><span>Quality</span><strong>' + A.esc(m.quality) + '</strong></li>' +
            '<li><span>Size</span><strong>' + A.esc(m.size) + '</strong></li>' +
            '<li><span>Runtime</span><strong>' + A.esc(m.runtime) + '</strong></li>' +
            '<li><span>Language</span><strong>' + A.esc(m.language) + '</strong></li>' +
            '<li><span>Year</span><strong>' + A.esc(m.year) + '</strong></li>' +
          '</ul>' +
        '</div>' +
      '</aside>'
    );
  }

  function boot() {
    const id = new URLSearchParams(location.search).get('id');
    const m = id ? A.getMovie(id) : null;
    if (!m) { notFound(); return; }

    document.title = m.title + ' (' + m.year + ') Bangla Dubbed 720p 1080p Download | MovieBazar';

    const main = A.$('#movieMain');
    const side = A.$('#movieSide');

    main.innerHTML =
      '<nav class="breadcrumb">' +
        '<a href="index.html">Home</a> <span>/</span> ' +
        '<a href="category.html?genre=' + encodeURIComponent((m.genres || ['All'])[0]) + '">' + A.esc((m.genres || ['All'])[0]) + '</a> <span>/</span> ' +
        '<span>' + A.esc(m.title) + '</span>' +
      '</nav>' +

      '<header class="movie-head">' +
        '<div class="movie-head__poster">' +
          '<img src="' + A.esc(m.poster) + '" alt="' + A.esc(m.title) + ' poster" loading="lazy">' +
        '</div>' +
        '<div class="movie-head__info">' +
          '<h1>' + A.esc(m.title) + '</h1>' +
          (m.titleBn ? '<p class="movie-head__bn">' + A.esc(m.titleBn) + '</p>' : '') +
          '<div class="movie-head__meta">' +
            '<span class="pill pill--rating">&#9733; ' + A.esc(m.rating) + '/10</span>' +
            (m.free ? '<span class="pill pill--free">FREE &bull; ' + A.esc(m.license || 'Legal') + '</span>' : '') +
            '<span class="pill">' + A.esc(m.year) + '</span>' +
            '<span class="pill">' + A.esc(m.runtime) + '</span>' +
            '<span class="pill">' + A.esc(m.quality) + '</span>' +
            '<span class="pill">' + A.esc(m.size) + '</span>' +
            '<span class="pill">' + A.esc(m.language) + '</span>' +
            '<span class="pill pill--views">' + A.formatViews(m.views) + ' views</span>' +
          '</div>' +
          '<div class="movie-head__genres">' +
            (m.genres || []).map(function (g) {
              return '<a class="tag" href="category.html?genre=' + encodeURIComponent(g) + '">' + A.esc(g) + '</a>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</header>' +

      playerBlock(m) +

      '<div class="ad-slot ad-slot--content" data-ad="inContent"></div>' +

      '<section class="section">' +
        '<h2 class="section__title">Storyline</h2>' +
        '<p class="synopsis">' + A.esc(m.synopsis) + '</p>' +
        (m.cast && m.cast.length
          ? '<p class="cast"><strong>Cast:</strong> ' + m.cast.map(A.esc).join(', ') + '</p>'
          : '') +
      '</section>' +

      downloadBlock(m) +
      screenshotsBlock(m) +
      relatedBlock(m);

    if (side) side.innerHTML = sidebarBlock(m);

    /* dynamically add howa ad slot gulo (inContent, sidebar) observe kora */
    if (window.Ads && window.Ads.scan) window.Ads.scan();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
