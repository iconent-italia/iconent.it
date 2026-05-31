(function () {
  // Carica il widget Calendly inline SEMPRE, indipendentemente dal consenso
  // cookie. Scelta di prodotto: la prenotazione è la conversione principale e
  // va tracciata (evento Lead via Meta Pixel) per tutti gli utenti.
  // Il banner cookie resta puramente informativo e non blocca Calendly.

  function findInlineWidget() {
    return document.querySelector('.calendly-inline-widget');
  }

  function loadCalendlyAssets() {
    // CSS
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }
    // Script
    if (window.Calendly) return;
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) return;
    var s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.head.appendChild(s);
  }

  function init() {
    if (!findInlineWidget()) return;
    loadCalendlyAssets();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
