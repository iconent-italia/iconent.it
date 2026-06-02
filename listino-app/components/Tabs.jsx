'use client';

import { useEffect, useRef, useState } from 'react';

export default function Tabs({ platforms, activeId, onChange, reduce }) {
  const scroller = useRef(null);
  const innerRef = useRef(null);
  const [marquee, setMarquee] = useState(false);

  // duplico la serie solo in modalità marquee (mobile / quando sfora)
  const list = !reduce && marquee ? [...platforms, ...platforms] : platforms;

  // marquee solo se UNA serie sfora il contenitore; altrimenti centrata e ferma
  useEffect(() => {
    if (reduce) { setMarquee(false); return; }
    const measure = () => {
      const nav = scroller.current;
      const inner = innerRef.current;
      if (!nav || !inner) return;
      const single = inner.scrollWidth / (marquee ? 2 : 1);
      setMarquee(single > nav.clientWidth + 4);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [reduce, marquee]);

  // auto-scroll lento solo in modalità marquee; si ferma al tocco, riprende dopo 2s
  useEffect(() => {
    if (reduce || !marquee) return;
    const el = scroller.current;
    if (!el) return;
    let raf;
    let pos = el.scrollLeft;
    let lastInteract = -Infinity;
    const SPEED = 0.35;
    const IDLE = 2000;
    function tick(t) {
      if (t - lastInteract < IDLE) {
        pos = el.scrollLeft;
      } else {
        pos += SPEED;
        const half = el.scrollWidth / 2;
        if (half > 0 && pos >= half) pos -= half;
        el.scrollLeft = pos;
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
  }, [reduce, marquee]);

  return (
    <nav className="lst-tabs" ref={scroller} aria-label="Naviga tra i servizi">
      <div className="lst-tabs-inner" ref={innerRef} role="tablist">
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
