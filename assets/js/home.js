(function () {
  /* ============ HERO HOLOGRAPHIC GLITCH TRIGGERS ============
     The static layers (glow, grid, scanlines, sweep) are pure CSS.
     This file fires the three irregular glitch events:
       1. Chromatic split        — one-shot animation restart
       2. Horizontal glitch bars — spawned + cleared
       3. Screen tear            — wide horizontal flash
  */
  function initHeroGlitch() {
    const chroma = document.getElementById('chroma');
    const bars   = document.getElementById('glitchBars');
    const tear   = document.getElementById('tear');
    if (!chroma || !bars || !tear) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let active = true;
    document.addEventListener('visibilitychange', () => {
      active = !document.hidden;
    });

    function triggerChroma() {
      if (active) {
        chroma.classList.remove('glitching');
        void chroma.offsetWidth; /* force reflow to restart the keyframe */
        chroma.classList.add('glitching');
      }
      setTimeout(triggerChroma, 2500 + Math.random() * 5000);
    }

    function spawnBars() {
      if (active) {
        bars.innerHTML = '';
        const count = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          const bar = document.createElement('div');
          bar.className = 'glitch-bar';
          bar.style.top = (Math.random() * 100) + '%';
          bar.style.height = (1 + Math.random() * 3) + 'px';
          bar.style.opacity = 0.4 + Math.random() * 0.5;
          bars.appendChild(bar);
        }
        bars.style.opacity = '1';
        setTimeout(() => { bars.style.opacity = '0'; }, 90 + Math.random() * 120);
      }
      setTimeout(spawnBars, 3500 + Math.random() * 6500);
    }

    function tearFlash() {
      if (active) {
        tear.style.top = (10 + Math.random() * 80) + '%';
        tear.style.height = (10 + Math.random() * 45) + 'px';
        tear.style.opacity = String(0.55 + Math.random() * 0.4);
        setTimeout(() => { tear.style.opacity = '0'; }, 70);
      }
      setTimeout(tearFlash, 5500 + Math.random() * 9000);
    }

    /* Earlier triggers so the viewer sees motion within the first second */
    setTimeout(triggerChroma, 350);
    /* spawnBars (3 horizontal blue bars) disabled per design preference */
    setTimeout(tearFlash,     1400);
  }

  function init() {
    initHeroGlitch();
    /* Count-up metrics (data-count) are handled by shared.js — no need to duplicate. */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
