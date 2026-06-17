'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Smooth scroll + arrow/space keyboard navigation between full-screen panels.
export default function ScrollController({ panelCount }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis;
    if (!reduce) {
      lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    const go = (dir) => {
      const i = Math.round(window.scrollY / window.innerHeight);
      const next = Math.max(0, Math.min(panelCount - 1, i + dir));
      const top = next * window.innerHeight;
      if (lenis) lenis.scrollTo(top); else window.scrollTo({ top, behavior: 'smooth' });
    };
    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1); }
      if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); lenis?.destroy(); };
  }, [panelCount]);
  return null;
}
