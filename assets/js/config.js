/* ============================================================================
   MovieBazar — SITE CONFIGURATION  (Adsterra ads — LIVE)
   ============================================================================
   ⭐ Adsterra ad code gulo niche boshano ache ⭐

   • slots.*.code     → oi jaygar ad code (iframe er moddhe load hoy)
   • global.popunder  → popunder code (page head e inject)
   • global.socialBar → social bar code (page head e inject)
   • smartlink        → direct link (download button theke khule)

   Notun ad unit add korte: matching slot er `code` change korun.
   Kono ad bondho korte: `enabled: false` korun.
   ========================================================================== */

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

    /* ── AD UNITS ─────────────────────────────────────────────────── */
    slots: {

      /* homepage-er AKDOM UPORE (hero-r age) — 300x250 */
      homeTop: {
        label: 'Homepage Top Banner (300×250)',
        code: `<script>
  atOptions = {
    'key' : 'a177a1291e4d35df018b182af70a6885',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
<\/script>
<script src="https://www.highrevenueformat.com/a177a1291e4d35df018b182af70a6885/invoke.js"><\/script>`,
      },

      /* sob theke upore, full-width (sob page) */
      header: {
        label: 'Header Banner (728×90)',
        code: '',
      },

      /* movie grid-er majhe — Native Banner */
      native: {
        label: 'In-Grid / Native Banner (468×60)',
        code: `<script async="async" data-cfasync="false" src="https://pl31531386.profitableratecpmnetwork.com/f5050107e1df67f96dc4e68e3920382a/invoke.js"><\/script>
<div id="container-f5050107e1df67f96dc4e68e3920382a"></div>`,
      },

      /* video player-er thik upore */
      playerTop: {
        label: 'Above Player Banner (728×90)',
        code: '',
      },

      /* video player-er thik niche */
      playerBottom: {
        label: 'Below Player Banner (728×90)',
        code: '',
      },

      /* content-er moddhe */
      inContent: {
        label: 'In-Content Rectangle (336×280)',
        code: '',
      },

      /* movie page sidebar — 300x250 */
      sidebar: {
        label: 'Sidebar Rectangle (300×250)',
        code: `<script>
  atOptions = {
    'key' : 'a177a1291e4d35df018b182af70a6885',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
<\/script>
<script src="https://www.highrevenueformat.com/a177a1291e4d35df018b182af70a6885/invoke.js"><\/script>`,
      },

      /* screen-er bame floating */
      floatLeft: {
        label: 'Floating Left Skyscraper (160×600)',
        code: '',
      },

      /* screen-er dane floating */
      floatRight: {
        label: 'Floating Right Skyscraper (160×600)',
        code: '',
      },

      /* footer-er upore */
      footer: {
        label: 'Footer Banner (728×90)',
        code: '',
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
