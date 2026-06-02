'use client';

import { useEffect, useRef } from 'react';

export default function Tabs({ platforms, activeId, onChange, reduce }) {
  const scroller = useRef(null);
  // serie duplicata per il loop continuo; in reduced-motion una sola serie
  const list = reduce ? platforms : [...platforms, ...platforms];

  useEffect(() => {
    if (reduce) return;
    const el = scroller.current;
    if (!el) return;
    let raf;
    let paused = false;
    let resumeT;
    const SPEED = 0.35; // px/frame ≈ 21px/s, molto lento

    function tick() {
      if (!paused) {
        el.scrollLeft += SPEED;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half; // loop senza salti (lista duplicata)
      }
      raf = requestAnimationFrame(tick);
    }
    const pause = () => {
      paused = true;
      clearTimeout(resumeT);
    };
    const resumeSoon = () => {
      clearTimeout(resumeT);
      resumeT = setTimeout(() => {
        paused = false;
      }, 2000);
    };

    el.addEventListener('pointerdown', pause);
    el.addEventListener('pointerup', resumeSoon);
    el.addEventListener('pointercancel', resumeSoon);
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resumeSoon);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resumeSoon, { passive: true });
    el.addEventListener('wheel', () => { pause(); resumeSoon(); }, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeT);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('pointerup', resumeSoon);
      el.removeEventListener('pointercancel', resumeSoon);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resumeSoon);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resumeSoon);
    };
  }, [reduce]);

  return (
    // scroll nativo: sempre scorribile lateralmente, anche dopo un tap
    <nav className="lst-tabs" ref={scroller} aria-label="Naviga tra i servizi">
      <div className="lst-tabs-inner" role="tablist">
        {list.map((p, i) => {
          const clone = i >= platforms.length;
          return (
            <button
              key={i}
              type="button"
              role={clone ? undefined : 'tab'}
              aria-hidden={clone ? 'true' : undefined}
              tabIndex={clone ? -1 : 0}
              aria-selected={!clone && activeId === p.id}
              className={`lst-tab${activeId === p.id ? ' active' : ''}`}
              data-plat={p.id}
              onClick={() => onChange(p.id)}
            >
              <span className="dot" aria-hidden="true" />
              {p.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
