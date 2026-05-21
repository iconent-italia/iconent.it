/* ============================================================
   COOKIE BANNER ICONENT AGENCY — conforme Garante 2021 + GDPR 2026
   Implementazione custom, zero dipendenze.

   Storage:    cookie tecnico `ic_cookie_consent` con scadenza 12 mesi
   Categorie:  tecnici (always-on), statistiche (opt-in), marketing (opt-in)
   API:        window.icCookies.{acceptAll, rejectAll, reopen, getConsent, hasConsent}
   ============================================================ */
(function () {
  'use strict';

  var CONSENT_COOKIE = 'ic_cookie_consent';
  var CONSENT_VERSION = '2026.1'; // bump questo se cambi le categorie
  var TTL_DAYS = 365;

  // ----- Storage helpers -----
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = name + '=' + encodeURIComponent(value) +
      ';expires=' + d.toUTCString() +
      ';path=/;SameSite=Lax' +
      (location.protocol === 'https:' ? ';Secure' : '');
  }
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }
  function loadConsent() {
    var raw = getCookie(CONSENT_COOKIE);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      // Se versione obsoleta -> tratta come non consenso, riapri banner
      if (parsed.version !== CONSENT_VERSION) return null;
      return parsed;
    } catch (e) { return null; }
  }
  function saveConsent(state) {
    var record = {
      version: CONSENT_VERSION,
      statistics: !!state.statistics,
      marketing: !!state.marketing,
      timestamp: new Date().toISOString()
    };
    setCookie(CONSENT_COOKIE, JSON.stringify(record), TTL_DAYS);
    return record;
  }

  // ----- DOM -----
  var bannerEl = null;
  var modalEl = null;

  function buildBanner() {
    var b = document.createElement('div');
    b.id = 'ic-cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-labelledby', 'ccb-title');
    b.setAttribute('aria-describedby', 'ccb-desc');
    b.innerHTML = (
      '<div class="ccb-card">' +
        '<h2 id="ccb-title">Cookie e privacy</h2>' +
        '<p id="ccb-desc">' +
          'Questo sito usa <strong>cookie tecnici</strong> necessari al funzionamento e — solo con il tuo consenso — <strong>cookie di terze parti</strong> (Calendly per la prenotazione call, Vimeo per video) per offrirti i servizi che richiedi. ' +
          'Puoi accettare, rifiutare o personalizzare il tuo consenso. ' +
          '<a href="/cookie/" target="_blank" rel="noopener">Cookie policy</a> · <a href="/privacy/" target="_blank" rel="noopener">Privacy policy</a>' +
        '</p>' +
        '<div class="ccb-actions">' +
          '<button type="button" class="ccb-btn-accept" data-action="accept-all">Accetta tutti</button>' +
          '<button type="button" class="ccb-btn-reject" data-action="reject-all">Rifiuta</button>' +
          '<button type="button" class="ccb-btn-customize" data-action="customize">Personalizza</button>' +
        '</div>' +
      '</div>'
    );
    return b;
  }

  function buildModal() {
    var current = loadConsent() || { statistics: false, marketing: false };
    var m = document.createElement('div');
    m.id = 'ic-cookie-modal';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-labelledby', 'ccm-title');
    m.setAttribute('aria-modal', 'true');
    m.innerHTML = (
      '<div class="ccm-card">' +
        '<h2 id="ccm-title">Personalizza il consenso</h2>' +
        '<p>Scegli quali categorie di cookie autorizzare. Puoi modificare la scelta in qualsiasi momento dal link <em>"Gestisci cookie"</em> nel footer.</p>' +
        // Categoria tecnici
        '<div class="ccm-category">' +
          '<div class="ccm-category-header">' +
            '<span class="ccm-category-name">Necessari (tecnici)</span>' +
            '<span class="ccm-always">Sempre attivi</span>' +
          '</div>' +
          '<p class="ccm-category-desc">Garantiscono il funzionamento del sito (sessione, preferenze di consenso, sicurezza Cloudflare). Esenti da consenso ai sensi dell\'art. 122 Codice Privacy.</p>' +
        '</div>' +
        // Statistiche
        '<div class="ccm-category">' +
          '<div class="ccm-category-header">' +
            '<span class="ccm-category-name">Statistiche</span>' +
            '<label class="ccm-switch">' +
              '<input type="checkbox" data-cat="statistics"' + (current.statistics ? ' checked' : '') + '>' +
              '<span class="ccm-slider"></span>' +
            '</label>' +
          '</div>' +
          '<p class="ccm-category-desc">Cookie di analisi anonimi che ci aiutano a capire come gli utenti usano il sito (pagine visitate, tempo di permanenza). Dati aggregati, mai personali.</p>' +
        '</div>' +
        // Marketing
        '<div class="ccm-category">' +
          '<div class="ccm-category-header">' +
            '<span class="ccm-category-name">Marketing &amp; terze parti</span>' +
            '<label class="ccm-switch">' +
              '<input type="checkbox" data-cat="marketing"' + (current.marketing ? ' checked' : '') + '>' +
              '<span class="ccm-slider"></span>' +
            '</label>' +
          '</div>' +
          '<p class="ccm-category-desc">Calendly (widget di prenotazione call) e Vimeo (player video). Senza consenso, questi widget non vengono caricati e devi contattarci via WhatsApp o email.</p>' +
        '</div>' +
        '<div class="ccm-actions">' +
          '<button type="button" class="ccm-btn-save" data-action="save">Salva preferenze</button>' +
          '<button type="button" class="ccm-btn-accept-all" data-action="accept-all">Accetta tutti</button>' +
        '</div>' +
      '</div>'
    );
    return m;
  }

  function showBanner() {
    if (!bannerEl) bannerEl = buildBanner();
    if (!bannerEl.parentNode) document.body.appendChild(bannerEl);
    requestAnimationFrame(function () { bannerEl.classList.add('is-visible'); });
  }
  function hideBanner() {
    if (bannerEl) bannerEl.classList.remove('is-visible');
  }
  function showModal() {
    // Se aperta una volta, ricreo per riflettere lo state corrente del consenso
    if (modalEl && modalEl.parentNode) modalEl.parentNode.removeChild(modalEl);
    modalEl = buildModal();
    document.body.appendChild(modalEl);
    requestAnimationFrame(function () { modalEl.classList.add('is-visible'); });
  }
  function hideModal() {
    if (modalEl) modalEl.classList.remove('is-visible');
  }

  // ----- Consent application -----
  function applyConsent(consent) {
    // Attiva/blocca trackers in base alle scelte
    // (Per ora il sito non carica trackers globali. In futuro:
    //  if (consent.statistics) loadAnalytics();
    //  if (consent.marketing)  loadMetaPixel();)
    document.documentElement.dataset.consentStatistics = consent.statistics ? '1' : '0';
    document.documentElement.dataset.consentMarketing = consent.marketing ? '1' : '0';
  }

  function acceptAll() {
    var c = saveConsent({ statistics: true, marketing: true });
    applyConsent(c);
    hideBanner();
    hideModal();
  }
  function rejectAll() {
    var c = saveConsent({ statistics: false, marketing: false });
    applyConsent(c);
    hideBanner();
    hideModal();
  }
  function saveCustom() {
    var stats = modalEl && modalEl.querySelector('input[data-cat="statistics"]');
    var mkt = modalEl && modalEl.querySelector('input[data-cat="marketing"]');
    var c = saveConsent({
      statistics: !!(stats && stats.checked),
      marketing: !!(mkt && mkt.checked)
    });
    applyConsent(c);
    hideBanner();
    hideModal();
  }
  function reopen() {
    // Chiamato dal link "Gestisci cookie" nel footer
    showModal();
  }

  // ----- Event delegation -----
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-action]');
    if (!t) return;
    var action = t.dataset.action;
    if (action === 'accept-all') acceptAll();
    else if (action === 'reject-all') rejectAll();
    else if (action === 'customize') showModal();
    else if (action === 'save') saveCustom();
  });

  // Close modal on overlay click (ma NON sul card)
  document.addEventListener('click', function (e) {
    if (e.target.id === 'ic-cookie-modal') hideModal();
  });
  // Close modal on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalEl && modalEl.classList.contains('is-visible')) hideModal();
  });

  // ----- Public API -----
  window.icCookies = {
    acceptAll: acceptAll,
    rejectAll: rejectAll,
    reopen: reopen,
    getConsent: loadConsent,
    hasConsent: function () { return !!loadConsent(); }
  };

  // ----- Init -----
  function init() {
    var existing = loadConsent();
    if (existing) {
      // L'utente ha già scelto in passato — applica le scelte e basta
      applyConsent(existing);
    } else {
      // Primo accesso o consenso scaduto — mostra banner
      // Piccolo delay per non sovrapporre al render iniziale
      setTimeout(showBanner, 700);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
