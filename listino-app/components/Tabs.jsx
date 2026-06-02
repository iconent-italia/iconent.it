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
    let pos = el.scrollLeft; // accumulatore float (scrollLeft può arrotondare a intero)
    let lastInteract = -Infinity;
    const SPEED = 0.35; // px/frame ≈ 21px/s, molto lento
    const IDLE = 2000; // riprende 2s dopo l'ultima interazione

    function tick(t) {
      if (t - lastInteract < IDLE) {
        pos = el.scrollLeft; // controllo manuale: l'utente comanda
      } else {
        pos += SPEED;
        const half = el.scrollWidth / 2;
        if (half > 0 && pos >= half) pos -= half; // loop senza salti (lista duplicata)
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    }
    const bump = () => { lastInteract = performance.now(); };

    // solo gesti utente (lo scroll programmatico NON rifà bump → riparte da solo)
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
