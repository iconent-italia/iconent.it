'use client';

import { useState } from 'react';

export default function Tabs({ platforms, activeId, onChange, reduce }) {
  const [paused, setPaused] = useState(false);
  // raddoppio per il loop continuo; in reduced-motion una sola serie (scroll manuale)
  const list = reduce ? platforms : [...platforms, ...platforms];

  return (
    <nav
      className={`lst-tabs${reduce ? ' static' : ''}`}
      aria-label="Naviga tra i servizi"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
    >
      <div className={`lst-tabs-track${paused ? ' paused' : ''}`} role="tablist">
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
