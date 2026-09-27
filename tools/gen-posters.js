#!/usr/bin/env node
/* ============================================================================
   MovieBazar — Poster / Backdrop generator
   ----------------------------------------------------------------------------
   Sob movie-er placeholder poster + backdrop SVG banay.
   Chalano:   node tools/gen-posters.js

   Notun movie add korar por abar chalan → notun poster toiri hobe.
   (Nijer poster use korle movies.js te 'poster' path change korben.)
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTER_DIR = path.join(ROOT, 'assets', 'img', 'posters');
const BACKDROP_DIR = path.join(ROOT, 'assets', 'img', 'backdrops');

fs.mkdirSync(POSTER_DIR, { recursive: true });
fs.mkdirSync(BACKDROP_DIR, { recursive: true });

/* movie list (id + title + year + quality + color pair) — movies.js theke match */
const MOVIES = [
  ['rakkhosher-rajjo',          'Rakkhosher Rajjo',          2025, '720p',  ['#ff512f', '#dd2476']],
  ['dhaka-nights',              'Dhaka Nights',              2025, '1080p', ['#2193b0', '#6dd5ed']],
  ['operation-sundarban',       'Operation Sundarban',       2024, '720p',  ['#11998e', '#38ef7d']],
  ['chandni-chowk-chronicles',  'Chandni Chowk Chronicles',  2025, '720p',  ['#c31432', '#240b36']],
  ['the-last-paddle',           'The Last Paddle',           2025, '1080p', ['#136a8a', '#267871']],
  ['bengaluru-express',         'Bengaluru Express',         2024, '720p',  ['#00c6ff', '#0072ff']],
  ['meghna-racer',              'Meghna Racer',              2025, '720p',  ['#f7971e', '#ffd200']],
  ['shadow-of-padma',           'Shadow of Padma',           2024, '720p',  ['#642b73', '#c6426e']],
  ['karate-master-bhai',        'Karate Master Bhai',        2025, '720p',  ['#ee0979', '#ff6a00']],
  ['love-in-coxs-bazar',        "Love in Cox's Bazar",       2025, '1080p', ['#fc466b', '#3f5efb']],
  ['the-mumbai-heist',          'The Mumbai Heist',          2024, '720p',  ['#834d9b', '#d04ed6']],
  ['aguner-gaan',               'Aguner Gaan',               2025, '720p',  ['#8e0e00', '#1f1c18']],
  ['cyber-dhaka',               'Cyber Dhaka',               2025, '1080p', ['#0f2027', '#2c7744']],
  ['jungle-manush',             'Jungle Manush',             2024, '720p',  ['#1f4037', '#99f2c8']],
  ['silent-storm',              'Silent Storm',              2025, '1080p', ['#232526', '#414345']],
  ['teen-teen-chatti',          'Teen Teen Chatti',          2025, '720p',  ['#b24592', '#f15f79']],
  ['kolkata-underground',       'Kolkata Underground',       2024, '720p',  ['#360033', '#0b8793']],
  ['bishwanath-the-warrior',    'Bishwanath: The Warrior',   2025, '1080p', ['#4b6cb7', '#182848']],
  ['monsoon-wedding-crashers',  'Monsoon Wedding Crashers',  2025, '720p',  ['#ff9966', '#ff5e62']],
  ['final-mission-delta',       'Final Mission: Delta',      2025, '1080p', ['#603813', '#b29f94']],

  /* real free movies (Internet Archive — PD / CC) */
  ['night-of-the-living-dead',  'Night of the Living Dead',  1968, '1080p', ['#4b1345', '#c94b4b']],
  ['nosferatu',                 'Nosferatu',                 1922, '720p',  ['#232526', '#5c0e0e']],
  ['carnival-of-souls',         'Carnival of Souls',         1962, '720p',  ['#2c3e50', '#4ca1af']],
  ['the-general',               'The General',               1926, '720p',  ['#3e5151', '#decba4']],
  ['big-buck-bunny',            'Big Buck Bunny',            2008, '1080p', ['#56ab2f', '#a8e063']],
  ['sintel',                    'Sintel',                    2010, '1080p', ['#f2994a', '#f2c94c']],
  ['tears-of-steel',            'Tears of Steel',            2012, '1080p', ['#141e30', '#5f7a8c']],
  ['cosmos-laundromat',         'Cosmos Laundromat',         2015, '1080p', ['#005c97', '#363795']],
  ['agent-327',                 'Agent 327',                 2017, '1080p', ['#8e2de2', '#4a00e0']],
  ['elephants-dream',           'Elephants Dream',           2006, '720p',  ['#0f7b8a', '#36d1dc']],
  ['spring',                    'Spring',                    2019, '1080p', ['#11998e', '#f7b733']],
];

/* ── helpers ─────────────────────────────────────────────────────────── */
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* boro shobdo ke 2 line e bhag kore (poster-er jonno simple wrap) */
function wrapTitle(title, perLine) {
  const words = title.split(/\s+/);
  const lines = [];
  let cur = '';
  words.forEach(function (w) {
    if (!cur) { cur = w; return; }
    if ((cur + ' ' + w).length <= perLine) { cur += ' ' + w; }
    else { lines.push(cur); cur = w; }
  });
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

function filmPerforations(x, count, h, w, gap) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const y = 14 + i * gap;
    out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
           '" rx="3" fill="rgba(0,0,0,.45)"/>';
  }
  return out;
}

/* ── poster (300 x 450) ──────────────────────────────────────────────── */
function posterSVG(title, year, quality, c1, c2) {
  const lines = wrapTitle(title, 13);
  const startY = 210 - (lines.length - 1) * 17;
  const text = lines.map(function (line, i) {
    const size = line.length > 11 ? 26 : 30;
    return '<text x="150" y="' + (startY + i * 36) + '" text-anchor="middle" ' +
      'font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="' + size +
      '" fill="#fff" style="paint-order:stroke" stroke="rgba(0,0,0,.35)" stroke-width="6">' +
      esc(line) + '</text>';
  }).join('');

  return '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">' +
    '<defs>' +
      '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="' + c1 + '"/>' +
        '<stop offset="1" stop-color="' + c2 + '"/>' +
      '</linearGradient>' +
      '<radialGradient id="v" cx=".5" cy=".35" r=".9">' +
        '<stop offset=".55" stop-color="rgba(0,0,0,0)"/>' +
        '<stop offset="1" stop-color="rgba(0,0,0,.55)"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<rect width="300" height="450" fill="url(#g)"/>' +
    /* decorative circles */
    '<circle cx="250" cy="70" r="90" fill="rgba(255,255,255,.10)"/>' +
    '<circle cx="40" cy="120" r="60" fill="rgba(255,255,255,.07)"/>' +
    '<circle cx="220" cy="330" r="110" fill="rgba(0,0,0,.15)"/>' +
    /* film perforations */
    filmPerforations(8, 16, 14, 10, 26) +
    filmPerforations(282, 16, 14, 10, 26) +
    /* big film icon */
    '<g transform="translate(150 128)" opacity=".28">' +
      '<circle r="46" fill="none" stroke="#fff" stroke-width="4"/>' +
      '<circle r="16" fill="none" stroke="#fff" stroke-width="4"/>' +
      '<circle cx="-34" cy="-34" r="5" fill="#fff"/><circle cx="34" cy="-34" r="5" fill="#fff"/>' +
      '<circle cx="-34" cy="34" r="5" fill="#fff"/><circle cx="34" cy="34" r="5" fill="#fff"/>' +
    '</g>' +
    /* title */
    text +
    /* year + quality */
    '<rect x="105" y="336" width="90" height="26" rx="13" fill="rgba(0,0,0,.55)"/>' +
    '<text x="150" y="354" text-anchor="middle" font-family="Poppins, Arial, sans-serif" ' +
      'font-weight="600" font-size="14" fill="#fff">' + year + ' &bull; ' + esc(quality) + '</text>' +
    /* brand */
    '<text x="150" y="404" text-anchor="middle" font-family="Poppins, Arial, sans-serif" ' +
      'font-weight="700" font-size="13" letter-spacing="2" fill="rgba(255,255,255,.75)">MOVIEBAZAR</text>' +
    '<rect width="300" height="450" fill="url(#v)"/>' +
  '</svg>';
}

/* ── backdrop (1280 x 720) ───────────────────────────────────────────── */
function backdropSVG(c1, c2) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">' +
    '<defs>' +
      '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="' + c1 + '"/>' +
        '<stop offset="1" stop-color="' + c2 + '"/>' +
      '</linearGradient>' +
      '<radialGradient id="b1" cx=".25" cy=".3" r=".55">' +
        '<stop offset="0" stop-color="rgba(255,255,255,.28)"/>' +
        '<stop offset="1" stop-color="rgba(255,255,255,0)"/>' +
      '</radialGradient>' +
      '<radialGradient id="b2" cx=".8" cy=".75" r=".6">' +
        '<stop offset="0" stop-color="rgba(0,0,0,.4)"/>' +
        '<stop offset="1" stop-color="rgba(0,0,0,0)"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<rect width="1280" height="720" fill="url(#bg)"/>' +
    '<rect width="1280" height="720" fill="url(#b1)"/>' +
    '<rect width="1280" height="720" fill="url(#b2)"/>' +
    /* diagonal light streaks */
    '<g opacity=".12" stroke="#fff" stroke-width="2">' +
      '<line x1="-100" y1="700" x2="500" y2="-100"/>' +
      '<line x1="150" y1="820" x2="750" y2="20"/>' +
      '<line x1="400" y1="940" x2="1000" y2="140"/>' +
      '<line x1="650" y1="1060" x2="1250" y2="260"/>' +
    '</g>' +
    /* soft bokeh */
    '<circle cx="1050" cy="160" r="130" fill="rgba(255,255,255,.10)"/>' +
    '<circle cx="180" cy="560" r="170" fill="rgba(0,0,0,.18)"/>' +
    '<circle cx="900" cy="520" r="70" fill="rgba(255,255,255,.07)"/>' +
    /* bottom vignette for text readability */
    '<rect x="0" y="480" width="1280" height="240" fill="rgba(10,12,16,.35)"/>' +
  '</svg>';
}

/* ── write files ─────────────────────────────────────────────────────── */
let count = 0;
MOVIES.forEach(function (m) {
  const id = m[0], title = m[1], year = m[2], q = m[3], c = m[4];
  fs.writeFileSync(path.join(POSTER_DIR, id + '.svg'), posterSVG(title, year, q, c[0], c[1]));
  fs.writeFileSync(path.join(BACKDROP_DIR, id + '.svg'), backdropSVG(c[0], c[1]));
  count += 2;
});

/* fallback poster */
fs.writeFileSync(path.join(POSTER_DIR, 'fallback.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">' +
  '<rect width="300" height="450" fill="#1b2130"/>' +
  '<text x="150" y="215" text-anchor="middle" font-family="Poppins, Arial" font-size="18" fill="#96a0b3">No Image</text>' +
  '<text x="150" y="245" text-anchor="middle" font-family="Poppins, Arial" font-size="13" fill="#5c667c">MovieBazar</text>' +
  '</svg>');

/* logo + favicon */
fs.writeFileSync(path.join(ROOT, 'assets', 'img', 'favicon.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">' +
  '<rect x="2" y="2" width="44" height="44" rx="12" fill="#e50914"/>' +
  '<path d="M19 15.5v17l14-8.5z" fill="#fff"/></svg>');

fs.writeFileSync(path.join(ROOT, 'assets', 'img', 'logo.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="48" viewBox="0 0 220 48">' +
  '<rect x="2" y="2" width="44" height="44" rx="12" fill="#e50914"/>' +
  '<path d="M19 15.5v17l14-8.5z" fill="#fff"/>' +
  '<text x="58" y="33" font-family="Poppins, Arial" font-weight="700" font-size="26" fill="#eef1f7">Movie<tspan fill="#e50914">Bazar</tspan></text>' +
  '</svg>');

console.log('✔ ' + count + ' images generated (' + MOVIES.length + ' posters + ' + MOVIES.length + ' backdrops)');
console.log('✔ fallback.svg, favicon.svg, logo.svg generated');
