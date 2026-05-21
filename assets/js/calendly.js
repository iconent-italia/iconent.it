(function () {
  // Loads Calendly widget script when an inline widget is present on the page.
  // The site uses WhatsApp for all "Book a Call" CTAs; Calendly is reserved for
  // the inline scheduler on /form-prenotazione/.
  function findInlineWidget() {
    return document.querySelector('.calendly-inline-widget');
  }

  function loadCalendlyScript() {
    if (window.Calendly) return;
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (findInlineWidget()) loadCalendlyScript();
    });
  } else {
    if (findInlineWidget()) loadCalendlyScript();
  }
})();
