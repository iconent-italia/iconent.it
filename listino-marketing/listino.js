(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll-reveal allo scroll (fade + rise) ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Hub sticky: evidenzia la sezione attiva (scroll-spy) ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.lst-hub a'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    var current = null;
    function setActive(id) {
      if (id === current) return;
      current = id;
      links.forEach(function (a) { a.classList.remove('active'); });
      if (map[id]) {
        map[id].classList.add('active');
        // tieni il chip attivo visibile nello scroller orizzontale
        map[id].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
      }
    }
    var io = new IntersectionObserver(function (entries) {
      // scegli la sezione più visibile vicino alla cima
      var best = null;
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (!best || e.boundingClientRect.top < best.boundingClientRect.top) best = e;
        }
      });
      if (best) setActive(best.target.id);
    }, { rootMargin: '-72px 0px -55% 0px', threshold: 0 });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ---------- Loghi 3D: parallax al movimento del puntatore ---------- */
  function initOrbitTilt() {
    if (reduce) return;
    var hero = document.querySelector('.lst-hero');
    var stage = document.getElementById('orbit');
    if (!hero || !stage || !window.matchMedia('(hover: hover)').matches) return;
    var raf = null, tx = 0, ty = 0;
    hero.addEventListener('pointermove', function (ev) {
      var r = hero.getBoundingClientRect();
      var px = (ev.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
      var py = (ev.clientY - r.top) / r.height - 0.5;
      tx = py * -16;   // tilt X dal movimento verticale
      ty = px * 18;    // tilt Y dal movimento orizzontale
      if (!raf) raf = requestAnimationFrame(apply);
    });
    hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply); });
    function apply() {
      raf = null;
      stage.style.transform = 'rotateX(' + (14 + tx) + 'deg) rotateY(' + ty + 'deg)';
    }
  }

  /* ---------- Card prezzo: tilt 3D leggero su hover ---------- */
  function initCardTilt() {
    if (reduce || !window.matchMedia('(hover: hover)').matches) return;
    document.querySelectorAll('.lst-card').forEach(function (card) {
      card.addEventListener('pointermove', function (ev) {
        var r = card.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width - 0.5;
        var py = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(700px) rotateX(' + (py * -5) + 'deg) rotateY(' + (px * 6) + 'deg) translateY(-3px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  /* ---------- Smooth scroll con offset hub per le ancore ---------- */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
        history.replaceState(null, '', '#' + id);
      });
    });
  }

  function init() {
    initReveal();
    initScrollSpy();
    initOrbitTilt();
    initCardTilt();
    initSmoothAnchors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
