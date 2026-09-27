# 🎬 MovieBazar — মুভি বাজার

Dark cinema-themed movie download website with a built-in **Adsterra ad system**
(5 ad units) and **20 ready-to-edit movie posts**.

Pure HTML + CSS + JavaScript — **no build step, no framework**. Host anywhere
(GitHub Pages, Netlify, Vercel, cPanel shared hosting — just upload the files).

---

## 📁 File structure

```
├── index.html              Homepage (hero, tabs, genre filter, 20 movies grid)
├── movie.html              Movie detail page (player, download parts, related)
├── category.html           Genre browse / search results
├── about.html              About page
├── contact.html            Contact / movie request form
├── dmca.html               DMCA / copyright page
├── privacy.html            Privacy policy
├── ads.txt                 Adsterra ads.txt template (edit before going live)
└── assets/
    ├── css/style.css       All styles (dark theme, responsive)
    ├── js/
    │   ├── config.js       ⭐ SITE CONFIG — paste your 5 Adsterra ad codes here
    │   ├── movies.js       ⭐ 20 movie posts — edit / add posts here
    │   ├── ads.js          Ad engine (auto — no need to touch)
    │   ├── app.js          Header / footer / search / helpers
    │   ├── home.js         Homepage logic
    │   ├── movie.js        Movie page logic
    │   └── pages.js        Category / search / contact logic
    └── img/
        ├── posters/        20 movie posters (SVG placeholders)
        ├── backdrops/      20 movie backdrops (SVG placeholders)
        ├── logo.svg
        └── favicon.svg
└── tools/gen-posters.js    Regenerates poster/backdrop placeholders
```

---

## ⭐ STEP 1 — Adsterra ads add kora (5 units)

Adsterra dashboard e 5 ta ad unit benao (Banner/Native), tarpor code copy kore
`assets/js/config.js` file e paste koro — matching slot er `code: ''` er moddhe:

```js
window.SITE_CONFIG = {
  adsterra: {
    enabled: false,          // ← true korte hobe code paste korar por

    slots: {
      header:    { label: 'Header Banner (728×90)',   code: '' },   // 1
      native:    { label: 'In-Grid / Native (468×60)', code: '' },   // 2
      inContent: { label: 'In-Content (336×280)',      code: '' },   // 3
      sidebar:   { label: 'Sidebar (300×250)',         code: '' },   // 4
      footer:    { label: 'Footer Banner (728×90)',    code: '' },   // 5
    },

    global: {
      popunder: '',   // optional — Adsterra Popunder code
      socialBar: '',  // optional — Adsterra Social Bar code
    },
  },
};
```

**Kothay kothay ad dekhay (5 unit = 5 alada jayga):**

| # | Slot | Jayga | Page |
|---|------|-------|------|
| 1 | `header` | Header-er niche, full-width banner | sob page |
| 2 | `native` | Movie grid-er majhe (8 number card er por) | homepage + category |
| 3 | `inContent` | Player-er niche, content-er moddhe (336×280) | movie page |
| 4 | `sidebar` | Movie page sidebar (sticky) | movie page |
| 5 | `footer` | Footer-er upore | sob page |

Code na deya porjonto sob jaygay ekta **dashed placeholder box** dekhay —
"kothay ad boshbe" bujha jay, layout nosto hoy na. Code paste + `enabled: true`
korle asol ad chole jabe.

**Notes:**
- Ad gulo *friendly iframe* er moddhe load hoy — Adsterra-er `document.write`
  code safe vabe chole, baki page nosto hoy na.
- Ad gulo lazy load hoy (scroll-er kache ashle render) — page fast thake.
- Testing er jonno URL e `?ads=off` add korle sob ad hide hoye jabe:
  `http://localhost:8080/index.html?ads=off`
- Optional **Popunder / Social Bar** (Adsterra-er sob theke beshi income dei)
  add korte `global.popunder` / `global.socialBar` te code paste korun.
- Going live er age `ads.txt` file edit korun (Adsterra dashboard-er line).

---

## ⭐ STEP 2 — Movie posts add / edit kora (31 ta post, sob te video)

Sob movie `assets/js/movies.js` file e — ekta array. Notun movie add korte
notun object add korun:

```js
{
  id: 'amar-notun-movie',            // unique — movie.html?id=amar-notun-movie
  title: 'My New Movie',
  titleBn: 'আমার নতুন মুভি',
  year: 2026,
  genres: ['Action', 'Drama'],
  quality: '720p',                   // 480p / 720p / 1080p
  size: '750MB',
  runtime: '2h 10m',
  language: 'Bangla',
  rating: 7.8,
  views: 1200,
  date: '2026-01-15',                // latest sort er jonno
  featured: true,                    // homepage hero te dekhabe
  free: true,                        // legally free movie → "Free Movies" section
  license: 'Public Domain',          // optional license note
  synopsis: 'Movie-r chhoto description...',
  cast: ['Actor 1', 'Actor 2'],
  parts: [                           // download parts (koto tuk cha)
    { label: 'Part 01', quality: '480p', size: '300MB', url: 'https://your-link' },
    { label: 'Full Movie', quality: '720p', size: '750MB', url: 'https://your-link' },
  ],
  poster: 'assets/img/posters/amar-notun-movie.jpg',    // nijer image
  backdrop: 'assets/img/backdrops/amar-notun-movie.jpg',
}
```

---

## ⭐ STEP 3 — Video (prottek movie page e asol video cholche)

Prottek movie te **asal video** boshano ache — 31 tar moddhe **11 ta legally
free movie** (Internet Archive — Public Domain / Creative Commons) asol e chole:

| Movie | Source | License |
|---|---|---|
| Night of the Living Dead (1968) | Internet Archive | Public Domain |
| Nosferatu (1922) | Internet Archive | Public Domain |
| Carnival of Souls (1962) | Internet Archive | Public Domain |
| The General (1926) | Internet Archive | Public Domain |
| Big Buck Bunny, Sintel, Tears of Steel, Cosmos Laundromat, Agent 327, Elephants Dream, Spring | Blender Foundation (via Internet Archive) | CC BY / CC BY-ND |

Baki 20 ta post e **demo video** boshano ache (player ta chole, apni nijer
video diye replace korben). Sob free movie homepage-e **"Free Movies — Watch
Now"** section e ache (FREE badge soho).

**Nijer video boshate** — `movies.js` te movie object e `video` field:

```js
// Option A: iframe embed (Internet Archive, YouTube, apnar host — je kothao)
video: {
  embed: 'https://archive.org/embed/night-of-the-living-dead-1968-hd',
  note: 'Source note — player-er niche chhoto caption'
},

// Option B: direct video file (mp4 / webm)
video: {
  src: 'https://your-site.com/movies/my-movie.mp4',
  type: 'video/mp4',
  poster: 'assets/img/backdrops/my-movie.jpg',
  note: '720p — self hosted'
}
```

`video` field na thakle player-e ekta placeholder dekhay ("video ekhane
boshbe"). Embed ba file — dui tai automatic handle kore, player 16:9 frame e fit hoy.

> ⚠️ **Legal note:** Notun/copyrighted movie (Bollywood, Hollywood, Bangla,
> anime jemon Naruto/One Piece) er full film link dewa ba embed kora copyright
> violation — Adsterra o Google site ban/penalty korte pare. Ei site e legally
> free (Public Domain / CC) content use kora hoyeche. Apnar nijer content hole
> hosting/payment link use korun.

**Nijer poster use korte:** `assets/img/posters/` folder e image rakhun,
tarpor `poster` field e path ta din (jpg/png/webp sob cholbe).
Placeholder SVG lagbe ki? `node tools/gen-posters.js` chalan.

**Player add korte:** `movie.html` er `#playerSlot` div er moddhe apnar
iframe / `<video>` / embed code paste korun (ekhon ekta placeholder dekhay).

---

## 🚀 Local e chalano

Kono server lagbe na (double-click index.html ew chole), kintu recomended:

```bash
# Python
python3 -m http.server 8080

# ba Node
npx serve .
```

Tarpor browser e: `http://localhost:8080`

---

## 🌐 Deploy (free)

- **GitHub Pages:** repo → Settings → Pages → branch select korun
- **Netlify / Vercel:** folder ta drag & drop korun (build command nai)
- **cPanel:** sob file `public_html` te upload korun

Deploy howar por Adsterra e site verify korauন (domain add korun),
tarpor ad code gulo config.js e paste korun.

---

## 🛠 Tech notes

- Vanilla JS, zero dependencies, ~30KB CSS
- Responsive: mobile / tablet / desktop
- Ad slots lazy-loaded inside friendly iframes
- Header/footer shared via JS (`app.js`) — ek jaygay edit, sob page e update
- SEO meta tags per page; Google JS render kore, tai content index hobe
  (boro traffic chaile static HTML pre-render korte hobe — bolun, banaye debo)

---

© MovieBazar (মুভি বাজার). Ads by Adsterra.
