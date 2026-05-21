(function () {
  // Loads Calendly widget ONLY after user grants marketing consent.
  // Calendly setta cookie di terze parti → consenso obbligatorio (Garante 2021).
  // Senza consenso mostriamo un placeholder con call-to-action al modal cookie.

  function findInlineWidget() {
    return document.querySelector('.calendly-inline-widget');
  }

  function hasMarketingConsent() {
    if (!window.icCookies || typeof window.icCookies.getConsent !== 'function') return false;
    var c = window.icCookies.getConsent();
    return !!(c && c.marketing);
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

  function showConsentGate(widget) {
    // Salva URL Calendly originale per reattivazione dopo consenso
    var dataUrl = widget.getAttribute('data-url');
    widget.setAttribute('data-url-pending', dataUrl);
    widget.removeAttribute('data-url');
    widget.innerHTML =
      '<div class="cal-consent-gate" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;min-height:520px;padding:2rem;text-align:center;background:rgba(15,15,15,0.5);border:1px solid rgba(255,255,255,0.1);border-radius:14px;color:#e8e8e8;">' +
        '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#00ff88" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-bottom:1rem;">' +
          '<rect x="3" y="4" width="18" height="18" rx="2" />' +
          '<line x1="16" y1="2" x2="16" y2="6" />' +
          '<line x1="8" y1="2" x2="8" y2="6" />' +
          '<line x1="3" y1="10" x2="21" y2="10" />' +
        '</svg>' +
        '<h3 style="margin:0 0 0.75rem;color:#fff;font-size:1.2rem;">Calendario di prenotazione bloccato</h3>' +
        '<p style="margin:0 0 1.5rem;color:#b8b8b8;font-size:0.95rem;line-height:1.55;max-width:420px;">Per prenotare la call usiamo Calendly, che richiede cookie di terze parti. ' +
        'Accetta i cookie di <strong>marketing</strong> per visualizzare il calendario, oppure scrivici su WhatsApp.</p>' +
        '<div style="display:flex;gap:0.625rem;flex-wrap:wrap;justify-content:center;">' +
          '<button type="button" class="cal-consent-btn" style="background:#00ff88;color:#0a0a0a;border:none;font-family:inherit;font-weight:600;padding:0.7rem 1.4rem;border-radius:999px;cursor:pointer;font-size:0.95rem;">Gestisci cookie</button>' +
          '<a href="https://wa.me/message/32WMNGGU4HGTB1" target="_blank" rel="noopener noreferrer" style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.18);text-decoration:none;font-weight:600;padding:0.7rem 1.4rem;border-radius:999px;font-size:0.95rem;">Scrivi su WhatsApp</a>' +
        '</div>' +
      '</div>';
    var btn = widget.querySelector('.cal-consent-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        if (window.icCookies && typeof window.icCookies.reopen === 'function') {
          window.icCookies.reopen();
        }
      });
    }
  }

  function activate(widget) {
    // Rimuove placeholder e ripristina URL
    var pending = widget.getAttribute('data-url-pending');
    if (pending) {
      widget.setAttribute('data-url', pending);
      widget.removeAttribute('data-url-pending');
    }
    widget.innerHTML = '';
    loadCalendlyAssets();
  }

  function init() {
    var widget = findInlineWidget();
    if (!widget) return;
    if (hasMarketingConsent()) {
      loadCalendlyAssets();
    } else {
      showConsentGate(widget);
    }
  }

  // Riattiva al cambio di consenso
  document.addEventListener('ic:consent-changed', function () {
    var widget = findInlineWidget();
    if (!widget) return;
    if (hasMarketingConsent() && widget.querySelector('.cal-consent-gate')) {
      activate(widget);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
