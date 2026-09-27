#!/usr/bin/env node
/* ============================================================================
   MovieBazar — Movie Poster / Backdrop ARTWORK generator
   ----------------------------------------------------------------------------
   Genre onujayi asol cinematic scene toiri kore (city skyline, jungle, ocean,
   space, horror house, stadium, spy, comedy, animation...). Poster + backdrop
   duitoতাই scene-based, shudhu rogin na.

   Chalano:   node tools/gen-posters.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTER_DIR = path.join(ROOT, 'assets', 'img', 'posters');
const BACKDROP_DIR = path.join(ROOT, 'assets', 'img', 'backdrops');

fs.mkdirSync(POSTER_DIR, { recursive: true });
fs.mkdirSync(BACKDROP_DIR, { recursive: true });

/* movie list: id, title, year, quality, [colors], scene */
const MOVIES = [
  ['rakkhosher-rajjo',          'Rakkhosher Rajjo',          2025, '720p',  ['#ff512f', '#7a0d2e'], 'jungle'],
  ['dhaka-nights',              'Dhaka Nights',              2025, '1080p', ['#2193b0', '#0b1e3a'], 'city'],
  ['operation-sundarban',       'Operation Sundarban',       2024, '720p',  ['#11998e', '#0a3d2c'], 'jungle'],
  ['chandni-chowk-chronicles',  'Chandni Chowk Chronicles',  2025, '720p',  ['#c31432', '#2b0a1e'], 'city'],
  ['the-last-paddle',           'The Last Paddle',           2025, '1080p', ['#136a8a', '#082a33'], 'stadium'],
  ['bengaluru-express',         'Bengaluru Express',         2024, '720p',  ['#00c6ff', '#0a2a4a'], 'city'],
  ['meghna-racer',              'Meghna Racer',              2025, '720p',  ['#f7971e', '#5c1a00'], 'city'],
  ['shadow-of-padma',           'Shadow of Padma',           2024, '720p',  ['#642b73', '#150425'], 'horror'],
  ['karate-master-bhai',        'Karate Master Bhai',        2025, '720p',  ['#ee0979', '#4a0a2e'], 'dojo'],
  ['love-in-coxs-bazar',        "Love in Cox's Bazar",       2025, '1080p', ['#fc466b', '#1a2a6c'], 'ocean'],
  ['the-mumbai-heist',          'The Mumbai Heist',          2024, '720p',  ['#834d9b', '#1b0a2e'], 'spy'],
  ['aguner-gaan',               'Aguner Gaan',               2025, '720p',  ['#8e0e00', '#2b0a06'], 'stage'],
  ['cyber-dhaka',               'Cyber Dhaka',               2025, '1080p', ['#0f2027', '#0b3b2e'], 'space'],
  ['jungle-manush',             'Jungle Manush',             2024, '720p',  ['#1f4037', '#0a1f16'], 'jungle'],
  ['silent-storm',              'Silent Storm',              2025, '1080p', ['#232526', '#0d1b2a'], 'desert'],
  ['teen-teen-chatti',          'Teen Teen Chatti',          2025, '720p',  ['#b24592', '#3d0a2e'], 'comedy'],
  ['kolkata-underground',       'Kolkata Underground',       2024, '720p',  ['#360033', '#0b2a3d'], 'city'],
  ['bishwanath-the-warrior',    'Bishwanath: The Warrior',   2025, '1080p', ['#4b6cb7', '#101d3d'], 'warrior'],
  ['monsoon-wedding-crashers',  'Monsoon Wedding Crashers',  2025, '720p',  ['#ff9966', '#7a1f0a'], 'comedy'],
  ['final-mission-delta',       'Final Mission: Delta',      2025, '1080p', ['#603813', '#1a0f08'], 'spy'],

  /* real free movies (Internet Archive — PD / CC) */
  ['night-of-the-living-dead',  'Night of the Living Dead',  1968, '1080p', ['#4b1345', '#12060f'], 'horror'],
  ['nosferatu',                 'Nosferatu',                 1922, '720p',  ['#232526', '#3d0a0a'], 'horror'],
  ['carnival-of-souls',         'Carnival of Souls',         1962, '720p',  ['#2c3e50', '#0a1218'], 'horror'],
  ['the-general',               'The General',               1926, '720p',  ['#3e5151', '#0f1a1a'], 'classic'],
  ['big-buck-bunny',            'Big Buck Bunny',            2008, '1080p', ['#56ab2f', '#1a3d0f'], 'animation'],
  ['sintel',                    'Sintel',                    2010, '1080p', ['#f2994a', '#5c2a0a'], 'animation'],
  ['tears-of-steel',            'Tears of Steel',            2012, '1080p', ['#141e30', '#0a2a3d'], 'space'],
  ['cosmos-laundromat',         'Cosmos Laundromat',         2015, '1080p', ['#005c97', '#0a1a3d'], 'animation'],
  ['agent-327',                 'Agent 327',                 2017, '1080p', ['#8e2de2', '#1a0a3d'], 'spy'],
  ['elephants-dream',           'Elephants Dream',           2006, '720p',  ['#0f7b8a', '#062a33'], 'space'],
  ['spring',                    'Spring',                    2019, '1080p', ['#11998e', '#3d2a0a'], 'animation'],
];

/* ── helpers ─────────────────────────────────────────────────────────── */
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* seeded pseudo-random — same id = same artwork.
   Round kora hoy jate exponent notation (1e-7) er moto invalid SVG number
   toiri na hoy. */
function rng(seed) {
  let s = 2166136261;
  for (let i = 0; i < seed.length; i++) { s ^= seed.charCodeAt(i); s = Math.imul(s, 16777619) >>> 0; }
  return function () {
    s = (s * 1103515245 + 12345) >>> 0;
    return Math.round((s / 4294967296) * 1000) / 1000;
  };
}

function wrapTitle(title, perLine) {
  const words = title.split(/\s+/);
  const lines = [];
  let cur = '';
  words.forEach((w) => {
    if (!cur) { cur = w; return; }
    if ((cur + ' ' + w).length <= perLine) cur += ' ' + w;
    else { lines.push(cur); cur = w; }
  });
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

function filmPerforations(x, count, h, w, gap) {
  let out = '';
  for (let i = 0; i < count; i++) out += `<rect x="${x}" y="${14 + i * gap}" width="${w}" height="${h}" rx="3" fill="rgba(0,0,0,.5)"/>`;
  return out;
}

/* ── SCENE BUILDERS (SVG fragments) ──────────────────────────────────── */

function sceneCity(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  /* moon + glow */
  const mx = W * (0.2 + r() * 0.6), my = H * (0.12 + r() * 0.1);
  s += `<circle cx="${mx}" cy="${my}" r="${W * 0.055}" fill="rgba(255,255,255,.9)"/>`;
  s += `<circle cx="${mx}" cy="${my}" r="${W * 0.12}" fill="url(#glow)"/>`;
  /* stars */
  for (let i = 0; i < 26; i++) s += `<circle cx="${r() * W}" cy="${r() * H * 0.4}" r="${0.6 + r() * 1.3}" fill="rgba(255,255,255,${0.25 + r() * 0.5})"/>`;
  /* 3 building layers */
  const layers = [
    { y: H * 0.52, fill: 'rgba(255,255,255,.10)', min: H * 0.10, max: H * 0.22 },
    { y: H * 0.62, fill: 'rgba(0,0,0,.35)', min: H * 0.14, max: H * 0.30 },
    { y: H * 0.74, fill: 'rgba(0,0,0,.72)', min: H * 0.18, max: H * 0.38 },
  ];
  layers.forEach((L, li) => {
    let x = -20;
    while (x < W + 20) {
      const bw = W * (0.05 + r() * 0.07);
      const bh = L.min + r() * (L.max - L.min);
      s += `<rect x="${x.toFixed(1)}" y="${(L.y - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${(bh + 10).toFixed(1)}" fill="${L.fill}"/>`;
      /* windows on front layers */
      if (li >= 1) {
        for (let wy = L.y - bh + 8; wy < L.y - 6; wy += 10) {
          for (let wx = x + 4; wx < x + bw - 5; wx += 8) {
            if (r() > 0.62) s += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="3" height="4" fill="rgba(255,214,120,${0.5 + r() * 0.5})"/>`;
          }
        }
      }
      x += bw + W * 0.005;
    }
  });
  /* fog */
  for (let i = 0; i < 4; i++) s += `<ellipse cx="${r() * W}" cy="${H * (0.72 + i * 0.05)}" rx="${W * 0.4}" ry="${H * 0.05}" fill="rgba(255,255,255,.06)"/>`;
  return s;
}

function sceneJungle(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  /* sun rays */
  for (let i = 0; i < 6; i++) {
    const x = r() * W;
    s += `<polygon points="${x},0 ${x + W * 0.06},0 ${x + W * 0.24},${H} ${x + W * 0.10},${H}" fill="rgba(255,255,220,.10)"/>`;
  }
  /* mist bands */
  for (let i = 0; i < 3; i++) s += `<ellipse cx="${r() * W}" cy="${H * (0.55 + i * 0.12)}" rx="${W * 0.5}" ry="${H * 0.06}" fill="rgba(255,255,255,.07)"/>`;
  /* layered leaves / trees */
  for (let L = 0; L < 3; L++) {
    const fill = ['rgba(0,0,0,.25)', 'rgba(0,0,0,.5)', 'rgba(0,0,0,.82)'][L];
    const baseY = H * (0.55 + L * 0.16);
    for (let i = 0; i < 9; i++) {
      const x = r() * W, y = baseY + r() * H * 0.2, sz = W * (0.08 + r() * 0.12);
      s += `<path d="M${x} ${y} q${sz / 2} ${-sz} ${sz} 0 q${-sz / 2} ${sz} ${-sz} 0z" fill="${fill}"/>`;
    }
    /* trunks */
    for (let i = 0; i < 4; i++) {
      const x = r() * W;
      s += `<rect x="${x.toFixed(1)}" y="${(baseY - H * 0.05).toFixed(1)}" width="${(W * 0.012).toFixed(1)}" height="${(H * 0.3).toFixed(1)}" fill="${fill}"/>`;
    }
  }
  /* fireflies */
  for (let i = 0; i < 14; i++) s += `<circle cx="${r() * W}" cy="${r() * H}" r="${1 + r() * 1.8}" fill="rgba(255,255,160,.85)"/>`;
  return s;
}

function sceneOcean(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  /* sun */
  const sx = W * (0.3 + r() * 0.4), sy = H * 0.34;
  s += `<circle cx="${sx}" cy="${sy}" r="${W * 0.09}" fill="rgba(255,240,200,.95)"/>`;
  s += `<circle cx="${sx}" cy="${sy}" r="${W * 0.2}" fill="url(#glow)"/>`;
  /* sea */
  s += `<rect x="0" y="${H * 0.5}" width="${W}" height="${H * 0.5}" fill="url(#sea)"/>`;
  /* sun reflection */
  for (let i = 0; i < 16; i++) {
    const y = H * 0.52 + i * (H * 0.03);
    const w = W * (0.02 + r() * 0.06) * (1 + i * 0.12);
    s += `<rect x="${(sx - w / 2 + (r() - 0.5) * 20).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="2" rx="1" fill="rgba(255,230,180,${0.5 - i * 0.02})"/>`;
  }
  /* waves */
  for (let i = 0; i < 12; i++) {
    const y = H * (0.55 + r() * 0.42);
    s += `<path d="M0 ${y} q${W * 0.1} ${-4 - r() * 4} ${W * 0.2} 0 t${W * 0.2} 0 t${W * 0.2} 0 t${W * 0.2} 0 t${W * 0.2} 0" stroke="rgba(255,255,255,.28)" stroke-width="1.5" fill="none"/>`;
  }
  /* palms */
  [-1, 1].forEach((dir) => {
    const bx = dir < 0 ? W * 0.08 : W * 0.92, by = H * 0.52;
    s += `<path d="M${bx} ${by} q${dir * 12} ${-H * 0.12} ${dir * 4} ${-H * 0.26}" stroke="rgba(0,0,0,.75)" stroke-width="5" fill="none"/>`;
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i - 2) * 0.5;
      const ex = bx + dir * 4 + Math.cos(a) * 46, ey = by - H * 0.26 + Math.sin(a) * 30;
      s += `<path d="M${bx + dir * 4} ${by - H * 0.26} q${(ex + bx) / 2} ${ey - 22} ${ex} ${ey}" stroke="rgba(0,0,0,.75)" stroke-width="4" fill="none"/>`;
    }
  });
  /* birds */
  for (let i = 0; i < 4; i++) {
    const x = W * (0.2 + r() * 0.6), y = H * (0.15 + r() * 0.2), sz = 5 + r() * 5;
    s += `<path d="M${x} ${y} q${sz} ${-sz} ${sz * 2} 0 q${sz} ${-sz} ${sz * 2} 0" stroke="rgba(0,0,0,.6)" stroke-width="1.6" fill="none"/>`;
  }
  return s;
}

function sceneMountain(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  for (let i = 0; i < 34; i++) s += `<circle cx="${r() * W}" cy="${r() * H * 0.5}" r="${0.6 + r() * 1.2}" fill="rgba(255,255,255,${0.3 + r() * 0.5})"/>`;
  const mx = W * 0.7, my = H * 0.18;
  s += `<circle cx="${mx}" cy="${my}" r="${W * 0.05}" fill="rgba(255,255,255,.92)"/>`;
  s += `<circle cx="${mx}" cy="${my}" r="${W * 0.12}" fill="url(#glow)"/>`;
  const ridges = [
    { y: H * 0.60, fill: 'rgba(0,0,0,.30)', h: H * 0.20 },
    { y: H * 0.72, fill: 'rgba(0,0,0,.55)', h: H * 0.26 },
    { y: H * 0.86, fill: 'rgba(0,0,0,.85)', h: H * 0.30 },
  ];
  ridges.forEach((L, li) => {
    let d = `M0 ${H} L0 ${L.y}`;
    let x = 0;
    while (x < W) {
      const peak = L.y - L.h * (0.35 + r() * 0.65);
      const step = W * (0.14 + r() * 0.12);
      d += ` L${(x + step / 2).toFixed(1)} ${peak.toFixed(1)} L${(x + step).toFixed(1)} ${(L.y + (r() - 0.5) * 20).toFixed(1)}`;
      x += step;
    }
    d += ` L${W} ${H} Z`;
    s += `<path d="${d}" fill="${L.fill}"/>`;
    if (li < 2) s += `<ellipse cx="${W * 0.5}" cy="${L.y + 12}" rx="${W * 0.6}" ry="${H * 0.035}" fill="rgba(255,255,255,.14)"/>`;
  });
  return s;
}

function sceneSpace(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  /* nebula */
  s += `<ellipse cx="${W * 0.7}" cy="${H * 0.3}" rx="${W * 0.35}" ry="${H * 0.18}" fill="url(#glow)" opacity=".55"/>`;
  /* stars */
  for (let i = 0; i < 70; i++) s += `<circle cx="${r() * W}" cy="${r() * H * 0.75}" r="${0.5 + r() * 1.4}" fill="rgba(255,255,255,${0.3 + r() * 0.6})"/>`;
  /* planet + ring */
  const px = W * 0.68, py = H * 0.30, pr = W * 0.16;
  s += `<ellipse cx="${px}" cy="${py}" rx="${pr * 1.7}" ry="${pr * 0.4}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3" transform="rotate(-18 ${px} ${py})"/>`;
  s += `<circle cx="${px}" cy="${py}" r="${pr}" fill="url(#planet)"/>`;
  /* grid horizon */
  const hy = H * 0.72;
  s += `<rect x="0" y="${hy}" width="${W}" height="${H - hy}" fill="rgba(0,0,0,.55)"/>`;
  for (let i = 0; i <= 12; i++) s += `<line x1="${(W / 12) * i}" y1="${hy}" x2="${W * 0.5 + (i - 6) * W * 0.16}" y2="${H}" stroke="rgba(120,220,255,.30)" stroke-width="1"/>`;
  for (let i = 1; i < 8; i++) {
    const y = hy + Math.pow(i / 8, 2.2) * (H - hy);
    s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="rgba(120,220,255,${0.28 - i * 0.03})" stroke-width="1"/>`;
  }
  return s;
}

function sceneDesert(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  const sx = W * 0.5, sy = H * 0.30;
  s += `<circle cx="${sx}" cy="${sy}" r="${W * 0.10}" fill="rgba(255,220,160,.95)"/>`;
  s += `<circle cx="${sx}" cy="${sy}" r="${W * 0.26}" fill="url(#glow)"/>`;
  /* dunes */
  const dunes = [['rgba(0,0,0,.28)', 0.58], ['rgba(0,0,0,.5)', 0.70], ['rgba(0,0,0,.8)', 0.84]];
  dunes.forEach(([fill, y0]) => {
    s += `<path d="M0 ${H} L0 ${H * y0} q${W * 0.25} ${-H * 0.10} ${W * 0.5} 0 t${W * 0.5} 0 L${W} ${H} Z" fill="${fill}"/>`;
  });
  /* helicopter silhouette */
  const hx = W * 0.74, hy = H * 0.46;
  s += `<g fill="rgba(0,0,0,.85)" transform="translate(${hx} ${hy}) scale(${W / 300})">` +
       `<ellipse cx="0" cy="0" rx="16" ry="7"/><rect x="14" y="-2" width="14" height="3" rx="1"/>` +
       `<rect x="-3" y="-9" width="26" height="2" rx="1"/><rect x="-1" y="-6" width="2" height="7"/></g>`;
  return s;
}

function sceneStadium(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  /* floodlights */
  [0.18, 0.5, 0.82].forEach((fx) => {
    const x = W * fx;
    s += `<rect x="${x - 3}" y="${H * 0.18}" width="6" height="${H * 0.4}" fill="rgba(0,0,0,.6)"/>`;
    s += `<rect x="${x - 16}" y="${H * 0.15}" width="32" height="12" rx="2" fill="rgba(255,255,255,.75)"/>`;
    s += `<polygon points="${x - 16},${H * 0.27} ${x + 16},${H * 0.27} ${x + 60},${H * 0.8} ${x - 60},${H * 0.8}" fill="rgba(255,255,255,.10)"/>`;
  });
  /* crowd band */
  s += `<rect x="0" y="${H * 0.42}" width="${W}" height="${H * 0.12}" fill="rgba(0,0,0,.55)"/>`;
  for (let i = 0; i < 90; i++) {
    const x = r() * W, y = H * 0.42 + r() * H * 0.11;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${2 + r() * 2}" fill="rgba(255,255,255,${0.12 + r() * 0.25})"/>`;
  }
  /* track */
  s += `<rect x="0" y="${H * 0.56}" width="${W}" height="${H * 0.44}" fill="url(#track)"/>`;
  for (let i = 0; i < 5; i++) s += `<line x1="0" y1="${H * (0.6 + i * 0.08)}" x2="${W}" y2="${H * (0.6 + i * 0.08)}" stroke="rgba(255,255,255,.5)" stroke-width="2"/>`;
  /* lane numbers */
  for (let i = 0; i < 6; i++) s += `<text x="${W * (0.1 + i * 0.16)}" y="${H * 0.93}" font-family="Arial" font-weight="bold" font-size="${W * 0.035}" fill="rgba(255,255,255,.55)" text-anchor="middle">${i + 1}</text>`;
  return s;
}

function sceneStage(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  /* spotlights */
  [[0.25, '#ff6b6b'], [0.5, '#ffd93d'], [0.75, '#6bcBff']].forEach(([fx, col]) => {
    const x = W * fx;
    s += `<polygon points="${x - 10},0 ${x + 10},0 ${x + 90},${H} ${x - 90},${H}" fill="${col}" opacity=".14"/>`;
    s += `<circle cx="${x}" cy="6" r="7" fill="${col}"/>`;
  });
  /* mic stand */
  const mx = W * 0.5, my = H * 0.78;
  s += `<g fill="rgba(0,0,0,.88)">` +
       `<rect x="${mx - 2}" y="${my - 40}" width="4" height="40"/>` +
       `<rect x="${mx - 14}" y="${my}" width="28" height="4" rx="2"/>` +
       `<ellipse cx="${mx}" cy="${my - 46}" rx="7" ry="10"/></g>`;
  /* guitar silhouette */
  const gx = W * 0.26, gy = H * 0.74;
  s += `<g fill="rgba(0,0,0,.85)" transform="translate(${gx} ${gy}) rotate(-18)">` +
       `<ellipse cx="0" cy="0" rx="20" ry="16"/><ellipse cx="0" cy="-22" rx="13" ry="11"/>` +
       `<rect x="-4" y="-60" width="8" height="40"/></g>`;
  /* crowd hands */
  for (let i = 0; i < 16; i++) {
    const x = r() * W, y = H * (0.88 + r() * 0.08);
    s += `<path d="M${x} ${y} v-14 m-4 4 v-8 m8 8 v-8" stroke="rgba(0,0,0,.85)" stroke-width="3" fill="none"/>`;
  }
  return s;
}

function sceneSpy(r, c1, c2, W, H) {
  let s = sceneCity(r, c1, c2, W, H);
  /* agent silhouette: hat + coat */
  const ax = W * 0.30, ay = H * 0.62;
  s += `<g fill="rgba(0,0,0,.92)" transform="translate(${ax} ${ay}) scale(${W / 300})">` +
       `<ellipse cx="0" cy="-70" rx="13" ry="14"/>` +                       /* head */
       `<path d="M-22 -80 h44 l-4 -8 h-36z"/>` +                            /* hat brim */
       `<path d="M-11 -86 h22 l-3 -12 h-16z"/>` +                           /* hat top */
       `<path d="M-20 -56 q20 -10 40 0 l10 60 h-16 l-4 -30 -10 30 h-10 l-6 -26 -6 26 h-10 l-4 -30 -4 30 h-16z"/>` + /* coat */
       `</g>`;
  /* dramatic rim light */
  s += `<ellipse cx="${ax + 10}" cy="${ay - 60}" rx="60" ry="90" fill="url(#glow)" opacity=".25"/>`;
  return s;
}

function sceneWarrior(r, c1, c2, W, H) {
  let s = sceneMountain(r, c1, c2, W, H);
  /* warrior silhouette with sword */
  const ax = W * 0.34, ay = H * 0.60;
  s += `<g fill="rgba(0,0,0,.92)" transform="translate(${ax} ${ay}) scale(${W / 300})">` +
       `<ellipse cx="0" cy="-78" rx="12" ry="13"/>` +
       `<path d="M-18 -64 q18 -8 36 0 l8 62 h-14 l-3 -26 -8 26 h-8 l-5 -22 -5 22 h-8 l-3 -26 -3 26 h-14z"/>` +
       `</g>`;
  s += `<g transform="translate(${ax + 26} ${ay - 96}) rotate(18)"><rect x="-2" y="-70" width="4" height="70" fill="rgba(0,0,0,.9)"/><rect x="-10" y="-8" width="20" height="5" rx="2" fill="rgba(0,0,0,.9)"/></g>`;
  s += `<ellipse cx="${ax + 20}" cy="${ay - 70}" rx="55" ry="85" fill="url(#glow)" opacity=".22"/>`;
  return s;
}

function sceneDojo(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  /* rising sun */
  s += `<circle cx="${W * 0.5}" cy="${H * 0.42}" r="${W * 0.22}" fill="rgba(255,80,80,.85)"/>`;
  s += `<circle cx="${W * 0.5}" cy="${H * 0.42}" r="${W * 0.36}" fill="url(#glow)"/>`;
  /* rays */
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    s += `<line x1="${W * 0.5}" y1="${H * 0.42}" x2="${W * 0.5 + Math.cos(a) * W * 0.6}" y2="${H * 0.42 + Math.sin(a) * W * 0.6}" stroke="rgba(255,255,255,.10)" stroke-width="2"/>`;
  }
  /* karate silhouette: kicking figure */
  const kx = W * 0.5, ky = H * 0.72;
  s += `<g fill="rgba(0,0,0,.92)" transform="translate(${kx} ${ky}) scale(${W / 300})">` +
       `<ellipse cx="0" cy="-80" rx="12" ry="13"/>` +
       `<path d="M-14 -66 q14 -7 28 0 l6 46 h-12 l-4 -18 -4 18 h-12 l-4 -20 -4 20 h-10z"/>` +
       `<path d="M10 -50 l30 -18 6 8 -28 22z"/>` +   /* kicking leg */
       `<path d="M-12 -50 l-26 -12 4 -8 26 14z"/>` + /* arm */
       `</g>`;
  return s;
}

function sceneHorror(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  /* full moon */
  const mx = W * 0.62, my = H * 0.24, mr = W * 0.14;
  s += `<circle cx="${mx}" cy="${my}" r="${mr}" fill="rgba(255,250,235,.95)"/>`;
  s += `<circle cx="${mx}" cy="${my}" r="${mr * 2.1}" fill="url(#glow)"/>`;
  /* moon craters */
  for (let i = 0; i < 5; i++) s += `<circle cx="${mx + (r() - 0.5) * mr}" cy="${my + (r() - 0.5) * mr}" r="${mr * (0.08 + r() * 0.14)}" fill="rgba(180,175,165,.35)"/>`;
  /* clouds across moon */
  for (let i = 0; i < 3; i++) s += `<ellipse cx="${mx + (r() - 0.5) * W * 0.3}" cy="${my + (r() - 0.5) * H * 0.1}" rx="${W * 0.14}" ry="${H * 0.02}" fill="rgba(0,0,0,.55)"/>`;
  /* haunted house */
  const hx = W * 0.16, hy = H * 0.78;
  s += `<g fill="rgba(0,0,0,.9)">` +
       `<rect x="${hx}" y="${hy - 60}" width="80" height="60"/>` +
       `<polygon points="${hx - 8},${hy - 60} ${hx + 40},${hy - 100} ${hx + 88},${hy - 60}"/>` +
       `<rect x="${hx + 88}" y="${hy - 42}" width="26" height="42"/>` +
       `<polygon points="${hx + 84},${hy - 42} ${hx + 101},${hy - 66} ${hx + 118},${hy - 42}"/>` +
       `<rect x="${hx + 36}" y="${hy - 38}" width="12" height="16" fill="rgba(255,200,80,.9)"/>` +
       `<rect x="${hx + 8}" y="${hy - 48}" width="10" height="12" fill="rgba(255,200,80,.75)"/>` +
       `</g>`;
  /* bare tree */
  const tx = W * 0.86, ty = H * 0.82;
  s += `<g stroke="rgba(0,0,0,.9)" stroke-width="5" fill="none">` +
       `<path d="M${tx} ${ty} L${tx} ${ty - 90}"/>` +
       `<path d="M${tx} ${ty - 50} L${tx - 40} ${ty - 85}"/><path d="M${tx} ${ty - 62} L${tx + 38} ${ty - 100}"/>` +
       `<path d="M${tx - 40} ${ty - 85} L${tx - 55} ${ty - 105}"/><path d="M${tx + 38} ${ty - 100} L${tx + 52} ${ty - 118}"/>` +
       `</g>`;
  /* bats */
  for (let i = 0; i < 6; i++) {
    const x = r() * W, y = H * (0.2 + r() * 0.35), sz = 4 + r() * 5;
    s += `<path d="M${x} ${y} q${sz} ${-sz} ${sz * 2} 0 q${sz} ${-sz} ${sz * 2} 0" stroke="rgba(0,0,0,.9)" stroke-width="2" fill="none"/>`;
  }
  /* fog */
  for (let i = 0; i < 4; i++) s += `<ellipse cx="${r() * W}" cy="${H * (0.74 + i * 0.05)}" rx="${W * 0.45}" ry="${H * 0.04}" fill="rgba(180,180,200,.10)"/>`;
  return s;
}

function sceneComedy(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  s += `<circle cx="${W * 0.8}" cy="${H * 0.16}" r="${W * 0.08}" fill="rgba(255,255,200,.9)"/>`;
  s += `<circle cx="${W * 0.8}" cy="${H * 0.16}" r="${W * 0.18}" fill="url(#glow)"/>`;
  /* confetti */
  const cols = ['#ff6b6b', '#ffd93d', '#6bcBff', '#ff8fd0', '#7bed9f', '#a29bfe'];
  for (let i = 0; i < 70; i++) {
    s += `<rect x="${(r() * W).toFixed(1)}" y="${(r() * H).toFixed(1)}" width="${4 + r() * 5}" height="${3 + r() * 4}" rx="1" fill="${cols[Math.floor(r() * cols.length)]}" opacity="${0.5 + r() * 0.5}" transform="rotate(${(r() * 90).toFixed(0)} ${(r() * W).toFixed(0)} ${(r() * H).toFixed(0)})"/>`;
  }
  /* balloons */
  for (let i = 0; i < 7; i++) {
    const x = W * (0.1 + r() * 0.8), y = H * (0.35 + r() * 0.4), c = cols[Math.floor(r() * cols.length)];
    s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="12" ry="15" fill="${c}" opacity=".9"/>` +
         `<path d="M${x.toFixed(1)} ${y + 15} q3 20 -2 40" stroke="rgba(255,255,255,.4)" stroke-width="1" fill="none"/>`;
  }
  return s;
}

function sceneClassic(r, c1, c2, W, H) {
  /* vintage B&W film look */
  let s = `<rect width="${W}" height="${H}" fill="url(#bw)"/>`;
  /* spotlight */
  s += `<polygon points="${W * 0.5},0 ${W * 0.34},${H} ${W * 0.66},${H}" fill="rgba(255,255,255,.13)"/>`;
  /* silhouette figure (silent-film actor) */
  const ax = W * 0.5, ay = H * 0.66;
  s += `<g fill="rgba(0,0,0,.88)" transform="translate(${ax} ${ay}) scale(${W / 300})">` +
       `<ellipse cx="0" cy="-78" rx="13" ry="15"/>` +
       `<path d="M-26 -78 h52 l-6 -14 h-40z"/>` +                        /* hat */
       `<path d="M-22 -62 q22 -10 44 0 l12 62 h-18 l-5 -24 -9 24 h-14 l-7 -22 -7 22 h-14 l-5 -24 -5 24 h-18z"/>` +
       `<path d="M18 -46 l34 -10 -4 10 -32 12z"/>` +                     /* arm out */
       `</g>`;
  /* film strip bottom */
  s += `<rect x="0" y="${H * 0.86}" width="${W}" height="${H * 0.14}" fill="rgba(0,0,0,.75)"/>`;
  for (let i = 0; i < Math.floor(W / 26); i++) s += `<rect x="${i * 26 + 6}" y="${H * 0.87}" width="12" height="8" rx="2" fill="rgba(255,255,255,.35)"/>`;
  return s;
}

function sceneAnimation(r, c1, c2, W, H) {
  let s = `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  /* sun + clouds */
  s += `<circle cx="${W * 0.78}" cy="${H * 0.16}" r="${W * 0.07}" fill="rgba(255,245,200,.95)"/>`;
  for (let i = 0; i < 4; i++) {
    const x = r() * W, y = H * (0.14 + r() * 0.2);
    s += `<g fill="rgba(255,255,255,.85)"><ellipse cx="${x}" cy="${y}" rx="26" ry="13"/><ellipse cx="${x + 18}" cy="${y + 3}" rx="18" ry="10"/><ellipse cx="${x - 18}" cy="${y + 4}" rx="16" ry="9"/></g>`;
  }
  /* rolling hills */
  s += `<path d="M0 ${H} L0 ${H * 0.66} q${W * 0.2} ${-H * 0.12} ${W * 0.42} 0 t${W * 0.42} 0 t${W * 0.42} 0 L${W} ${H} Z" fill="rgba(60,140,60,.85)"/>`;
  s += `<path d="M0 ${H} L0 ${H * 0.80} q${W * 0.3} ${-H * 0.10} ${W * 0.6} 0 t${W * 0.6} 0 L${W} ${H} Z" fill="rgba(30,100,40,.95)"/>`;
  /* trees */
  for (let i = 0; i < 5; i++) {
    const x = W * (0.08 + r() * 0.84), y = H * (0.70 + r() * 0.14), sz = 14 + r() * 12;
    s += `<rect x="${x - 3}" y="${y - sz}" width="6" height="${sz}" fill="rgba(60,35,15,.9)"/>` +
         `<circle cx="${x}" cy="${y - sz - 6}" r="${sz * 0.8}" fill="rgba(40,120,50,.95)"/>`;
  }
  /* character silhouette (small, cute) */
  const cx = W * 0.5, cy = H * 0.80;
  s += `<g fill="rgba(0,0,0,.85)" transform="translate(${cx} ${cy}) scale(${W / 300})">` +
       `<ellipse cx="0" cy="-26" rx="14" ry="13"/><ellipse cx="-14" cy="-32" rx="5" ry="9"/><ellipse cx="14" cy="-32" rx="5" ry="9"/>` +
       `<ellipse cx="0" cy="0" rx="17" ry="19"/><circle cx="-5" cy="-28" r="2" fill="#fff"/><circle cx="5" cy="-28" r="2" fill="#fff"/>` +
       `</g>`;
  /* fireflies / sparkles */
  for (let i = 0; i < 16; i++) s += `<circle cx="${(r() * W).toFixed(1)}" cy="${(r() * H).toFixed(1)}" r="${1 + r() * 2}" fill="rgba(255,255,180,.85)"/>`;
  return s;
}

const SCENES = {
  city: sceneCity, jungle: sceneJungle, ocean: sceneOcean, mountain: sceneMountain,
  space: sceneSpace, desert: sceneDesert, stadium: sceneStadium, stage: sceneStage,
  spy: sceneSpy, warrior: sceneWarrior, dojo: sceneDojo, horror: sceneHorror,
  comedy: sceneComedy, classic: sceneClassic, animation: sceneAnimation,
};

/* shared defs (gradients / filters) */
function defs(c1, c2, kind) {
  return `<defs>` +
    `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="${c2}"/><stop offset="0.55" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>` +
    `</linearGradient>` +
    `<radialGradient id="glow"><stop offset="0" stop-color="rgba(255,255,255,.55)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></radialGradient>` +
    `<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>` +
    `<radialGradient id="planet"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>` +
    `<linearGradient id="track" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8c2b23"/><stop offset="1" stop-color="#4a1410"/></linearGradient>` +
    `<linearGradient id="bw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8d8d8"/><stop offset="1" stop-color="#2a2a2a"/></linearGradient>` +
    `<linearGradient id="vig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(0,0,0,.45)"/><stop offset="0.35" stop-color="rgba(0,0,0,0)"/><stop offset="0.72" stop-color="rgba(0,0,0,.55)"/><stop offset="1" stop-color="rgba(0,0,0,.92)"/></linearGradient>` +
    `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.06"/></feComponentTransfer></filter>` +
    `</defs>`;
}

/* ── POSTER (300 x 450) ──────────────────────────────────────────────── */
function posterSVG(m) {
  const [id, title, year, q, [c1, c2], scene] = m;
  const r = rng(id);
  const W = 300, H = 450;
  const sceneFn = SCENES[scene] || sceneCity;
  const lines = wrapTitle(title, 13);
  const startY = 258 - (lines.length - 1) * 17;
  const text = lines.map((line, i) => {
    const size = line.length > 11 ? 25 : 29;
    return `<text x="150" y="${startY + i * 35}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="${size}" fill="#fff" style="paint-order:stroke" stroke="rgba(0,0,0,.55)" stroke-width="7">${esc(line)}</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    defs(c1, c2, scene) +
    `<g>${sceneFn(r, c1, c2, W, H)}</g>` +
    /* readability gradient + vignette */
    `<rect width="${W}" height="${H}" fill="url(#vig)"/>` +
    /* title */
    text +
    /* year + quality pill */
    `<rect x="104" y="342" width="92" height="26" rx="13" fill="rgba(0,0,0,.65)"/>` +
    `<text x="150" y="360" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="600" font-size="13" fill="#fff">${year} \u2022 ${esc(q)}</text>` +
    /* brand */
    `<text x="150" y="404" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="12" letter-spacing="3" fill="rgba(255,255,255,.8)">MOVIEBAZAR</text>` +
    /* film perforations */
    filmPerforations(7, 16, 13, 9, 26) + filmPerforations(284, 16, 13, 9, 26) +
    /* grain */
    `<rect width="${W}" height="${H}" filter="url(#grain)" opacity=".5"/>` +
    `</svg>`;
}

/* ── BACKDROP (1280 x 720) ───────────────────────────────────────────── */
function backdropSVG(m) {
  const [id, title, year, q, [c1, c2], scene] = m;
  const r = rng(id + '-bd');
  const W = 1280, H = 720;
  const sceneFn = SCENES[scene] || sceneCity;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    defs(c1, c2, scene) +
    `<g>${sceneFn(r, c1, c2, W, H)}</g>` +
    `<rect width="${W}" height="${H}" fill="url(#vig)"/>` +
    `<rect width="${W}" height="${H}" filter="url(#grain)" opacity=".45"/>` +
    `</svg>`;
}

/* ── write files ─────────────────────────────────────────────────────── */
let count = 0;
MOVIES.forEach((m) => {
  fs.writeFileSync(path.join(POSTER_DIR, m[0] + '.svg'), posterSVG(m));
  fs.writeFileSync(path.join(BACKDROP_DIR, m[0] + '.svg'), backdropSVG(m));
  count += 2;
});

/* fallback poster */
fs.writeFileSync(path.join(POSTER_DIR, 'fallback.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">` +
  `<rect width="300" height="450" fill="#1b2130"/>` +
  `<text x="150" y="215" text-anchor="middle" font-family="Poppins, Arial" font-size="18" fill="#96a0b3">No Image</text>` +
  `<text x="150" y="245" text-anchor="middle" font-family="Poppins, Arial" font-size="13" fill="#5c667c">MovieBazar</text></svg>`);

/* logo + favicon */
fs.writeFileSync(path.join(ROOT, 'assets', 'img', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">` +
  `<rect x="2" y="2" width="44" height="44" rx="12" fill="#e50914"/><path d="M19 15.5v17l14-8.5z" fill="#fff"/></svg>`);

fs.writeFileSync(path.join(ROOT, 'assets', 'img', 'logo.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="48" viewBox="0 0 220 48">` +
  `<rect x="2" y="2" width="44" height="44" rx="12" fill="#e50914"/><path d="M19 15.5v17l14-8.5z" fill="#fff"/>` +
  `<text x="58" y="33" font-family="Poppins, Arial" font-weight="700" font-size="26" fill="#eef1f7">Movie<tspan fill="#e50914">Bazar</tspan></text></svg>`);

console.log('\u2714 ' + count + ' artwork files generated (' + MOVIES.length + ' posters + ' + MOVIES.length + ' backdrops)');
console.log('\u2714 scenes used: ' + [...new Set(MOVIES.map((m) => m[5]))].join(', '));
