/* ============================================================================
   MovieBazar — SITE CONFIGURATION
   ============================================================================
   ⭐ ADSTERRA ADS — এখানে আপনার ৫টি Adsterra ad unit code পেস্ট করবেন ⭐

   Steps:
   1. Adsterra dashboard → ekta ad unit create korun (Banner/Native)
   2. Code copy kore niche matching slot er `code: ''` er moddhe paste korun
      (single quote er moddhe — multiple line hole backtick ` ` use korun)
   3. `enabled: false` → `true` korun
   4. Save. Site e ad automatic chole jabe.

   Slots (5 unit — different jaygay):
   • header    → 728×90 leaderboard, header-er niche (sob page)
   • native    → 468×60 / native banner, movie grid-er majhe (homepage)
   • inContent → 336×280 rectangle, movie page content-er moddhe
   • sidebar   → 300×250 rectangle, movie page sidebar (sticky)
   • footer    → 728×90 banner, footer-er upore (sob page)

   Optional (Adsterra site-wide codes):
   • popunder → Adsterra Popunder code (head e inject hobe)
   • socialBar → Adsterra Social Bar code (head e inject hobe)
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

    /* 👇 true korle sob ad active hobe (code paste korar por) */
    enabled: false,

    /* ── 9 AD UNITS ─────────────────────────────────────────────── */
    slots: {

      header: {
        label: 'Header Banner (728×90)',
        code: '',
        // paste your Adsterra banner code above ↑
      },

      native: {
        label: 'In-Grid / Native Banner (468×60)',
        code: '',
      },

      inContent: {
        label: 'In-Content Rectangle (336×280)',
        code: '',
      },

      sidebar: {
        label: 'Sidebar Rectangle (300×250)',
        code: '',
      },

      footer: {
        label: 'Footer Banner (728×90)',
        code: '',
      },

      /* ── video-er kachakachi (movie page) ─────────────────────── */
      playerTop: {
        label: 'Above Player Banner (728×90)',
        code: '',
      },

      playerBottom: {
        label: 'Below Player Banner (728×90)',
        code: '',
      },

      /* ── screen-er dane-bame floating (sticky) ────────────────── */
      floatLeft: {
        label: 'Floating Left Skyscraper (160×600)',
        code: '',
      },

      floatRight: {
        label: 'Floating Right Skyscraper (160×600)',
        code: '',
      },
    },

    /* ── OPTIONAL: site-wide Adsterra scripts ────────────────────── */
    global: {
      popunder: '',   // e.g. '<script src="//pl000.../..." ...></script>'
      socialBar: '',
    },
  },
};
