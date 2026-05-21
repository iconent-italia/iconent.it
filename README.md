# iconent.it — ICONENT AGENCY (Italia)

Sito statico ufficiale di ICONENT AGENCY. Plain HTML / CSS / vanilla JS. No build step.

> Sister site di [iconent-group.com](https://iconent-group.com/) (entità US).
> Questa codebase è l'adattamento italiano per ICONENT AGENCY (P.IVA 03930860360).

## Stack

- HTML5 statico (zero framework)
- CSS con custom properties (no preprocessor)
- Vanilla ES2020 JS, Custom Elements v1
- Calendly widget (inline solo nella pagina `/form-prenotazione/`)
- WhatsApp come canale di contatto principale
- Nessun build step, nessuna dipendenza npm

## Anteprima locale

```bash
npx serve .
# oppure
python3 -m http.server 8000
```

Apri `http://localhost:3000` (o `:8000`).

Puoi anche aprire `index.html` direttamente con `open index.html` — la maggior parte funziona, ma il server locale è consigliato (i percorsi root-absolute richiedono un server).

## Deploy

### Cloudflare Pages (consigliato)

1. Push del repo su GitHub (`iconent-italia/iconent.it`)
2. Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git
3. Build command: lasciare vuoto
4. Build output directory: `/` (root)
5. Deploy

Ogni `git push` su `main` fa deploy automatico. URL di preview: `iconent-it.pages.dev` (o nome scelto).

### Vercel

Connetti il repo. Framework preset: **Other**. Build command: vuoto. Output directory: vuoto (root).

⚠️ Nota: Vercel Hobby ToS vietano uso commerciale → considerare Cloudflare Pages per produzione.

### Netlify (drag & drop)

Trascina la cartella del progetto su <https://app.netlify.com/drop>. Publish directory = root. Nessun build command.

## Struttura pagine

| Path | Descrizione |
|---|---|
| `/` | Homepage |
| `/chi-siamo.html` | About, metodo, FAQ |
| `/servizi-project-management.html` | Servizio core (featured) |
| `/servizi-spotify.html` | Promo Spotify (listino) |
| `/servizi-youtube.html` | Promo YouTube (listino) |
| `/servizi-instagram.html` | Promo Instagram + Ufficio Stampa (listino) |
| `/servizi-tiktok.html` | Promo TikTok (listino) |
| `/contatti.html` | Contatti + WhatsApp |
| `/form-prenotazione/` | Landing privata con Calendly inline (noindex) |
| `/privacy.html` | Privacy policy (GDPR 2026) |
| `/cookie.html` | Cookie policy (Garante 2021) |

## Modificare header / footer

Header e footer sono definiti come custom element `<ic-header>` e `<ic-footer>` in [assets/js/components.js](assets/js/components.js). Modifica lì e tutte le pagine si aggiornano.

## File chiave

- [index.html](index.html) — homepage
- [assets/css/tokens.css](assets/css/tokens.css) — palette, spacing, typografia, breakpoint
- [assets/css/components.css](assets/css/components.css) — tutti gli stili UI condivisi
- [assets/css/pages/hero-holographic.css](assets/css/pages/hero-holographic.css) — sfondo hero animato
- [assets/css/pages/service-platform.css](assets/css/pages/service-platform.css) — stili service pages
- [assets/js/components.js](assets/js/components.js) — header + footer web component
- [assets/js/home.js](assets/js/home.js) — glitch trigger hero olografica
- [assets/js/shared.js](assets/js/shared.js) — CTA dropdown, FAQ accordion, count-up
- [assets/js/calendly.js](assets/js/calendly.js) — inline widget loader (solo VSL page)
- [assets/js/strategy-call.js](assets/js/strategy-call.js) — VSL page (countdown booking + count-up)

## TODO prima del go-live pubblico

- **OG image dedicata IT**: sostituire `assets/img/banner-map.jpg` (mappa USA) con un asset 1200×630 IT-neutro.
- **Cookie banner conforme Garante 2021**: implementare modulo di consenso (Iubenda / CookieYes / custom).
- **Privacy + Cookie policy reali**: i file [privacy.html](privacy.html) e [cookie.html](cookie.html) sono già impostati come template GDPR 2026, ma andrebbero validati da un legale.
- **Vimeo VSL `/form-prenotazione/`**: l'iframe Vimeo è stato rimosso, ma se viene aggiunto un video definitivo IT, aggiornare il `vimeo.com/video/{ID}`.

## Out of scope (v1)

- Build pipeline / minification (i file sono già piccoli, no necessità)
- Form di contatto server-side — v1 usa WhatsApp + email diretta
- Conversione immagini a WebP/AVIF (asset sono già compressi)
