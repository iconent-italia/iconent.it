'use client';

import { useEffect, useRef } from 'react';

export default function Tabs({ platforms, activeId, onChange, reduce }) {
  const scroller = useRef(null);

  // auto-scroll orizzontale ping-pong (nessun clone → nessuna duplicazione).
  // Si muove solo se i tab sforano (mobile); su desktop sta fermo e centrato.
  useEffect(() => {
    if (reduce) return;
    const el = scroller.current;
    if (!el) return;
    let raf;
    let pos = el.scrollLeft;
    let dir = 1;
    let lastInteract = -Infinity;
    const SPEED = 0.35;
    const IDLE = 2000;

    function tick(t) {
      const max = el.scrollWidth - el.clientWidth;
      if (max > 1 && t - lastInteract >= IDLE) {
        pos += SPEED * dir;
        if (pos >= max) { pos = max; dir = -1; }
        else if (pos <= 0) { pos = 0; dir = 1; }
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft; // controllo manuale o nessun overflow
      }
      raf = requestAnimationFrame(tick);
    }
    const bump = () => { lastInteract = performance.now(); };
    el.addEventListener('pointerdown', bump);
    el.addEventListener('pointermove', bump);
    el.addEventListener('touchstart', bump, { passive: true });
    el.addEventListener('touchmove', bump, { passive: true });
    el.addEventListener('wheel', bump, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', bump);
      el.removeEventListener('pointermove', bump);
      el.removeEventListener('touchstart', bump);
      el.removeEventListener('touchmove', bump);
      el.removeEventListener('wheel', bump);
    };
  }, [reduce]);

  return (
    <nav className="lst-tabs" ref={scroller} aria-label="Naviga tra i servizi">
      <div className="lst-tabs-inner" role="tablist">
        {platforms.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={activeId === p.id}
            className={`lst-tab${activeId === p.id ? ' active' : ''}`}
            data-plat={p.id}
            onClick={() => onChange(p.id)}
          >
            <span className="dot" aria-hidden="true" />
            {p.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
