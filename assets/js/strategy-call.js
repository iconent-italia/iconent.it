/* Strategy Call landing — booking lock countdown + count-up stats + smooth scroll */
(function () {
  const LOCK_DURATION_SECONDS = 30;
  const STORAGE_KEY = 'ic_strategy_call_unlocked';

  function setupLock() {
    const lockEl = document.getElementById('sc-calendar-lock');
    const countdownEl = document.getElementById('sc-countdown');
    if (!lockEl || !countdownEl) return;

    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      lockEl.classList.add('is-unlocked');
      return;
    }

    let remaining = LOCK_DURATION_SECONDS;
    countdownEl.textContent = String(remaining);

    const interval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(interval);
        countdownEl.textContent = '0';
        lockEl.classList.add('is-unlocked');
        try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
      } else {
        countdownEl.textContent = String(remaining);
      }
    }, 1000);
  }

  /* Count-up animation on stats — fires when element scrolls into view.
     Mirrors the IICY counter in home.js so the visual rhythm is identical. */
  function setupCountUps() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        if (!isNaN(target)) el.textContent = target.toLocaleString('it-IT');
      });
      return;
    }

    const easeOutQuad = (t) => t * (2 - t);
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const value = Math.floor(easeOutQuad(t) * target);
        el.textContent = value.toLocaleString('it-IT');
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    els.forEach((el) => observer.observe(el));
  }

  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* Facciata del player, come sul sito USA. Il video sta su Vercel, non su
     Vimeo: niente player di terzi, niente cookie. Finché non si clicca Play
     non parte nessun download — l'mp4 pesa 29 MB e scaricarlo a chi apre la
     pagina e non guarda affosserebbe il caricamento su mobile. Il file e'
     faststart, quindi la riproduzione parte mentre il resto sta ancora
     arrivando. */
  function setupVideoFacade() {
    document.querySelectorAll('[data-video-facade]').forEach((wrap) => {
      const playBtn = wrap.querySelector('.sc-video-play');
      const src = wrap.getAttribute('data-video-src');
      if (!playBtn || !src) return;

      const swap = () => {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;   // iOS: riproduce nella pagina, non a schermo intero
        video.preload = 'auto';
        video.setAttribute('title', 'ICONENT AGENCY — Come si arriva in major');
        tracciaAvanzamento(video);
        wrap.replaceChildren(video);
      };

      playBtn.addEventListener('click', swap);
      // anche il poster: su touch, toccare l'immagine vuol dire "parti"
      const poster = wrap.querySelector('.sc-video-poster');
      if (poster) poster.addEventListener('click', swap);
    });
  }

  /* I quarti di visione: e' l'unica cosa che un player ospitato darebbe
     gratis. Ogni soglia scatta una volta sola, cosi' sappiamo dove la gente
     smette di guardare. */
  function tracciaAvanzamento(video) {
    const soglie = [25, 50, 75, 100];
    const fatte = new Set();
    video.addEventListener('timeupdate', () => {
      if (!video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      soglie.forEach((s) => {
        if (pct >= s && !fatte.has(s)) {
          fatte.add(s);
          if (typeof window.fbq === 'function') {
            window.fbq('trackCustom', 'VideoProgress', { percent: s, video: 'vsl-ita' });
          }
        }
      });
    });
  }

  function init() {
    setupLock();
    setupCountUps();
    setupSmoothScroll();
    setupVideoFacade();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
