/* Meta (Facebook) Pixel — ICONENT
   ----------------------------------------------------------------------------
   Pixel ID:   1646160763491341
   Consenso:   INDIPENDENTE. PageView spara sempre, su tutte le pagine, senza
               attendere il cookie banner (scelta di prodotto esplicita).
   Caricato:   da components.js su ogni pagina (iniettato in <head>).
   Eventi:
     - PageView    → automatico al load, ovunque
     - ViewContent → automatico sulla pagina servizi principale (/management/)
     - Lead        → automatico quando una prenotazione Calendly inline va a
                     buon fine (postMessage `calendly.event_scheduled`)
   API pubblica: window.icPixel.{ trackViewContent, trackLead }
   ------------------------------------------------------------------------- */
(function () {
  var PIXEL_ID = '1646160763491341';

  // --- Snippet ufficiale Meta (base code) ---------------------------------
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  // Init + PageView immediati, senza dipendere dal consenso.
  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  // --- Helper pubblici -----------------------------------------------------
  function trackViewContent(params) {
    if (window.fbq) fbq('track', 'ViewContent', params || {});
  }
  function trackLead(params) {
    if (window.fbq) fbq('track', 'Lead', params || {});
  }

  window.icPixel = {
    trackViewContent: trackViewContent,
    trackLead: trackLead
  };

  // --- Auto-ViewContent sulla pagina servizi principale (/management/) -----
  // Match robusto su /management oppure /management/ (con o senza index.html).
  var path = location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '/');
  if (/^\/management\/?$/.test(path)) {
    trackViewContent({ content_name: 'Project Management' });
  }

  // --- Auto-Lead su prenotazione Calendly inline riuscita ------------------
  // Calendly invia un postMessage alla finestra parent quando l'utente
  // completa la prenotazione nel widget inline. Lo intercettiamo ovunque.
  var leadFired = false;
  function isCalendlyEvent(e) {
    return e && e.data && typeof e.data === 'object' &&
      e.data.event && e.data.event.indexOf('calendly') === 0;
  }
  window.addEventListener('message', function (e) {
    if (!isCalendlyEvent(e)) return;
    if (e.data.event === 'calendly.event_scheduled' && !leadFired) {
      leadFired = true; // evita doppio Lead se Calendly rimanda l'evento
      trackLead({ content_name: 'Calendly booking' });
    }
  });
})();
