/* ============================================================================
   MovieBazar — SITE CONFIGURATION  (Adsterra ads — sob slot LIVE)
   ============================================================================
   ⭐ Sob ad slot e code boshano ache — kono slot khali nai ⭐

   • slots.*.code     → oi jaygar ad code (friendly iframe e load hoy)
   • global.popunder  → popunder code (page head e inject)
   • global.socialBar → social bar code (page head e inject)
   • smartlink        → direct link (download button theke khule)

   NOTE: ekই ad code (BANNER_300x250 / NATIVE_BANNER) onek jaygay reuse kora
   hoyeche — prottek iframe alada document, tai kono problem nai.
   Adsterra-e notun unit banale nije nijer code boshate paren.
   ========================================================================== */

/* ── Ad code gulo (ek bar likhi, onek jaygay use hoi) ────────────────── */
const BANNER_300x250 = `<script>
  atOptions = {
    'key' : 'a177a1291e4d35df018b182af70a6885',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
<\/script>
<script src="https://www.highrevenueformat.com/a177a1291e4d35df018b182af70a6885/invoke.js"><\/script>`;

const NATIVE_BANNER = `<script async="async" data-cfasync="false" src="https://pl31531386.profitableratecpmnetwork.com/f5050107e1df67f96dc4e68e3920382a/invoke.js"><\/script>
<div id="container-f5050107e1df67f96dc4e68e3920382a"></div>`;

window.SITE_CONFIG = {

  site: {
    name: 'MovieBazar',
    nameBn: 'মুভি বাজার',
    tagline: 'Movies • Series • Entertainment',
    description: 'Download latest Bangla, Hindi, English movies in 480p, 720p & 1080p. Fresh posts every day.',
    email: 'admin@moviebazar.com',
    startedYear: 2025,
  },

  adsterra: {

    /* 👇 true = sob ad active */
    enabled: true,

    /* ── SOB SLOT E CODE BOSHANO (10 ta jayga) ────────────────────── */
    slots: {

      /* 1. Homepage-er AKDOM UPORE (hero-r age) — 300x250 */
      homeTop: {
        label: 'Homepage Top Banner (300×250)',
        code: BANNER_300x250,
      },

      /* 2. Sob page-er sob theke upore — Native Banner */
      header: {
        label: 'Header Banner (728×90)',
        code: NATIVE_BANNER,
      },

      /* 3. Movie grid-er majhe (8 number card er por) — Native Banner */
      native: {
        label: 'In-Grid / Native Banner (468×60)',
        code: NATIVE_BANNER,
      },

      /* 4. Video player-er thik UPORE — 300x250 */
      playerTop: {
        label: 'Above Player Banner (300×250)',
        code: BANNER_300x250,
      },

      /* 5. Video player-er thik NICHE — Native Banner */
      playerBottom: {
        label: 'Below Player Banner (728×90)',
        code: NATIVE_BANNER,
      },

      /* 6. Content-er moddhe — 300x250 */
      inContent: {
        label: 'In-Content Rectangle (336×280)',
        code: BANNER_300x250,
      },

      /* 7. Movie page sidebar (sticky) — 300x250 */
      sidebar: {
        label: 'Sidebar Rectangle (300×250)',
        code: BANNER_300x250,
      },

      /* 8. Screen-er BAME floating — Native Banner */
      floatLeft: {
        label: 'Floating Left (180×500)',
        code: NATIVE_BANNER,
      },

      /* 9. Screen-er DANE floating — Native Banner */
      floatRight: {
        label: 'Floating Right (180×500)',
        code: NATIVE_BANNER,
      },

      /* 10. Footer-er upore — Native Banner */
      footer: {
        label: 'Footer Banner (728×90)',
        code: NATIVE_BANNER,
      },
    },

    /* ── SITE-WIDE SCRIPTS (page head e inject hoy) ───────────────── */
    global: {
      popunder: `<script src="https://pl31531384.profitableratecpmnetwork.com/35/71/ac/3571ac16f1ea98c2b680b63a24aebd4a.js"><\/script>`,
      socialBar: `<script src="https://pl31531385.profitableratecpmnetwork.com/e6/3b/e6/e63be622bf736339d6315a6b7f6b7794.js"><\/script>`,
    },

    /* ── SMARTLINK (download button theke khule) ───────────────────── */
    smartlink: 'https://www.profitableratecpmnetwork.com/xys2cds8?key=280b8b199517a41973940aa006e49d25',

    /* placeholder download link ('#') e click korle smartlink khulbe */
    smartlinkOnDownload: true,
  },
};
