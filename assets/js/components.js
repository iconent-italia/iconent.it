(function () {
  const WHATSAPP_URL = 'https://wa.me/message/32WMNGGU4HGTB1';

  const HEADER_HTML = `
    <header class="ic-hdr" role="banner">
      <a class="ic-hdr-logo" href="/">ICONENT AGENCY</a>
      <nav class="ic-hdr-nav" aria-label="Primary">
        <div class="ic-hdr-services">
          <a href="/management/" data-path="/management">Servizi</a>
          <div class="ic-hdr-services-menu" role="menu">
            <a class="featured" href="/management/" data-path="/management" role="menuitem">Project Management</a>
            <a href="/spotify/"    data-path="/spotify"    role="menuitem">Servizi Spotify</a>
            <a href="/youtube/"    data-path="/youtube"    role="menuitem">Servizi YouTube</a>
            <a href="/instagram/"  data-path="/instagram"  role="menuitem">Servizi Instagram</a>
            <a href="/tiktok/"     data-path="/tiktok"     role="menuitem">Servizi TikTok</a>
          </div>
        </div>
        <a href="/" data-path="/">Home</a>
        <a class="ic-hdr-cta" href="/contatti/" data-path="/contatti">Contatti</a>
      </nav>
      <button class="ic-hdr-burger" type="button" aria-label="Apri menu" aria-expanded="false"></button>
      <div class="ic-hdr-mobile" role="menu">
        <p class="ic-hdr-mobile-label">Servizi</p>
        <a class="featured" href="/management/" data-path="/management">Project Management</a>
        <a href="/spotify/"    data-path="/spotify">Servizi Spotify</a>
        <a href="/youtube/"    data-path="/youtube">Servizi YouTube</a>
        <a href="/instagram/"  data-path="/instagram">Servizi Instagram</a>
        <a href="/tiktok/"     data-path="/tiktok">Servizi TikTok</a>
        <p class="ic-hdr-mobile-label">Menu</p>
        <a href="/" data-path="/">Home</a>
        <a class="ic-hdr-cta" href="/contatti/" data-path="/contatti">Contatti</a>
      </div>
    </header>`;

  const FOOTER_HTML = `
    <div class="ic-ftr-root">
      <footer class="ic-ftr-block" role="contentinfo">
        <div class="ic-ftr-block-inner">
          <div class="ic-ftr-block-social">
            <a href="https://www.instagram.com/iconentagency?igsh=aXNmanA5NWMxZTU5" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/IconentAgency/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
            <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.45 0-9.89 4.43-9.89 9.88 0 1.74.45 3.43 1.32 4.93L2.05 22l5.32-1.39a9.86 9.86 0 0 0 4.67 1.19h.01c5.45 0 9.88-4.43 9.89-9.88a9.83 9.83 0 0 0-2.89-7zm-7.01 15.21h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.16.83.84-3.08-.2-.32a8.18 8.18 0 0 1-1.26-4.36c0-4.53 3.69-8.21 8.22-8.21 2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.82c0 4.53-3.69 8.22-8.18 8.22zm4.5-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.96-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.31s-.85.83-.85 2.02c0 1.19.87 2.35.99 2.51.12.16 1.71 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.28z"/>
              </svg>
            </a>
          </div>
          <p class="ic-ftr-block-brand">ICONENT AGENCY</p>
          <p class="ic-ftr-block-tagline">Strategic Marketing for Music Industries</p>
          <p class="ic-ftr-block-address">
            <a href="tel:+393517545600">+39 351 754 5600</a> · <a href="mailto:info@iconent.it">info@iconent.it</a><br>
            P.IVA 03930860360
          </p>
          <p class="ic-ftr-block-copyright">© 2026 @iconent. Tutti i diritti riservati.</p>
          <p class="ic-ftr-block-legal" style="font-size:0.75rem; color:#888; margin-top:0.5rem;">
            <a href="/privacy/" style="color:#888;">Privacy Policy</a> ·
            <a href="/cookie/" style="color:#888;">Cookie Policy</a>
          </p>
        </div>
      </footer>
    </div>`;

  function pathMatches(linkPath, currentPath) {
    if (linkPath === '/' && currentPath === '/') return true;
    return currentPath.replace(/\.html$/, '') === linkPath;
  }

  function markActive(root) {
    const current = location.pathname.replace(/\.html$/, '').replace(/\/index$/, '/') || '/';
    root.querySelectorAll('[data-path]').forEach((a) => {
      if (pathMatches(a.dataset.path, current)) a.classList.add('is-active');
    });
  }

  class IcHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = HEADER_HTML;
      const hdr = this.querySelector('.ic-hdr');
      markActive(this);
      // Burger toggle
      const burger = this.querySelector('.ic-hdr-burger');
      burger.addEventListener('click', () => {
        const open = hdr.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
        document.body.classList.toggle('no-scroll', open);
      });
      // Close mobile on link click
      this.querySelectorAll('.ic-hdr-mobile a').forEach((a) => {
        a.addEventListener('click', () => {
          hdr.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
          burger.setAttribute('aria-label', 'Apri menu');
          document.body.classList.remove('no-scroll');
        });
      });
      // Scroll → .scrolled
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          hdr.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      // ESC closes mobile
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hdr.classList.contains('is-open')) {
          hdr.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
          burger.setAttribute('aria-label', 'Apri menu');
          document.body.classList.remove('no-scroll');
        }
      });

      // Desktop services dropdown: click toggles open/closed state.
      const services = this.querySelector('.ic-hdr-services');
      const servicesLink = services && services.querySelector(':scope > a');
      if (services && servicesLink) {
        servicesLink.addEventListener('click', (e) => {
          if (!window.matchMedia('(min-width: 901px)').matches) return;
          e.preventDefault();
          const visuallyOpen = services.classList.contains('is-open') ||
            (services.matches(':hover') && !services.classList.contains('is-closed'));
          if (visuallyOpen) {
            services.classList.remove('is-open');
            services.classList.add('is-closed');
          } else {
            services.classList.add('is-open');
            services.classList.remove('is-closed');
          }
        });
        services.addEventListener('mouseleave', () => {
          services.classList.remove('is-closed');
          services.classList.remove('is-open');
        });
        document.addEventListener('click', (e) => {
          if (!services.contains(e.target)) {
            services.classList.remove('is-open');
            services.classList.remove('is-closed');
          }
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            services.classList.remove('is-open');
            services.classList.remove('is-closed');
          }
        });
      }
    }
  }

  class IcFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = FOOTER_HTML;
    }
  }

  customElements.define('ic-header', IcHeader);
  customElements.define('ic-footer', IcFooter);
})();
