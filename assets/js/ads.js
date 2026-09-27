/* ============================================================================
   MovieBazar — AD ENGINE (Adsterra)
   ============================================================================
   Ki kore ei engine ta kaj kore:
   • Page er sob `[data-ad]` container khuje ber kore
   • Jodi config e oi slot-er code thake → ad load kore (lazy, scroll-e dhukle)
   • Jodi code NA thake → ekta placeholder dekhay (kothay ad boshbe seta bujha jay)
   • Ad gulo "friendly iframe" er moddhe load hoy — adsterra-er document.write
     code safe vabe chole, page-er onno kichu nosto hoy na
   • URL e `?ads=off` dile sob ad off (testing/screenshot er jonno)

   HTML te use:
     <div class="ad-slot" data-ad="header"></div>
     <div class="ad-slot ad-sidebar" data-ad="sidebar"></div>
   ========================================================================== */

window.Ads = (function () {
  'use strict';

  const cfg = (window.SITE_CONFIG && window.SITE_CONFIG.adsterra) || {};

  /* Slot → recommended ad size (wrapper iframe er jonno) */
  const SLOT_SIZES = {
    header:    { w: 728, h: 90  },
    native:    { w: 468, h: 60  },
    inContent: { w: 336, h: 280 },
    sidebar:   { w: 300, h: 250 },
    footer:    { w: 728, h: 90  },
  };

  const rendered = new Set();
  let observer = null;

  function adsOff() {
    return new URLSearchParams(location.search).get('ads') === 'off';
  }

  function getSlotCode(name) {
    if (!cfg.slots) return '';
    const slot = cfg.slots[name] || {};
    return (slot.code || '').trim();
  }

  /* ── Ad ke friendly iframe er moddhe load kora ─────────────────── */
  function renderRealAd(container, name, code) {
    const size = SLOT_SIZES[name] || { w: 300, h: 250 };
    const slotCfg = (cfg.slots && cfg.slots[name]) || {};
    const w = slotCfg.width || size.w;
    const h = slotCfg.height || size.h;

    container.classList.add('ad-slot--live');
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.className = 'ad-iframe';
    iframe.title = 'Advertisement';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('loading', 'lazy');
    iframe.style.width = '100%';
    iframe.style.maxWidth = w + 'px';
    iframe.style.height = h + 'px';
    iframe.style.border = '0';
    iframe.style.display = 'block';
    iframe.style.margin = '0 auto';
    iframe.style.overflow = 'hidden';
    container.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(
      '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<style>html,body{margin:0;padding:0;background:transparent;' +
      'display:flex;align-items:center;justify-content:center;overflow:hidden}' +
      'img{max-width:100%}</style></head><body>' +
      code +
      '</body></html>'
    );
    doc.close();
  }

  /* ── Code na thakle placeholder (kothay ad boshbe dekhabe) ─────── */
  function renderPlaceholder(container, name) {
    const slotCfg = (cfg.slots && cfg.slots[name]) || {};
    const label = slotCfg.label || name;
    container.classList.add('ad-slot--empty');
    container.innerHTML =
      '<div class="ad-placeholder">' +
        '<span class="ad-placeholder__tag">ADVERTISEMENT</span>' +
        '<span class="ad-placeholder__label">' + label + '</span>' +
        '<span class="ad-placeholder__hint">Adsterra code paste korun &rarr; <code>assets/js/config.js</code> &rarr; <code>slots.' + name + '</code></span>' +
      '</div>';
  }

  function renderSlot(container) {
    const name = container.getAttribute('data-ad');
    if (!name || rendered.has(container)) return;
    rendered.add(container);

    if (adsOff()) { container.style.display = 'none'; return; }

    const code = getSlotCode(name);
    if (code && cfg.enabled !== false) {
      renderRealAd(container, name, code);
    } else {
      renderPlaceholder(container, name);
    }
  }

  /* ── Lazy: scroll er kache ashle render ───────────────────────── */
  function observeAll() {
    const els = document.querySelectorAll('[data-ad]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(renderSlot);
      return;
    }
    els.forEach(function (el) {
      if (rendered.has(el) || el._adObserved) return;
      el._adObserved = true;
      observer.observe(el);
    });
  }

  /* Page-er bhitor dynamically add howa notun slot gulo observe kora */
  function scan() {
    if (!observer) {           // prothom bar — observer toiri kora
      setupObserver();
      return;
    }
    observeAll();
  }

  function setupObserver() {
    if (!('IntersectionObserver' in window)) {
      observeAll();
      return;
    }
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          renderSlot(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '300px 0px' });
    observeAll();
  }

  /* ── Site-wide scripts (popunder / social bar) ────────────────── */
  function injectGlobalScripts() {
    if (adsOff() || !cfg.global) return;
    ['popunder', 'socialBar'].forEach(function (key) {
      const code = (cfg.global[key] || '').trim();
      if (!code) return;
      const holder = document.createElement('div');
      holder.innerHTML = code;
      Array.prototype.forEach.call(holder.querySelectorAll('script'), function (old) {
        const s = document.createElement('script');
        Array.prototype.forEach.call(old.attributes, function (attr) {
          s.setAttribute(attr.name, attr.value);
        });
        s.text = old.text;
        document.head.appendChild(s);
      });
    });
  }

  function init() {
    injectGlobalScripts();
    setupObserver();
  }

  /* Page jokhon ready hobe */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init: init, renderSlot: renderSlot, scan: scan };
})();
