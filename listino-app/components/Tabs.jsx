'use client';

import { useRef } from 'react';

export default function Tabs({ platforms, activeId, onChange }) {
  const ref = useRef(null);

  function pick(id, el) {
    onChange(id);
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }

  return (
    <nav className="lst-tabs" ref={ref} aria-label="Naviga tra i servizi" role="tablist">
      {platforms.map((p) => (
        <button
          key={p.id}
          type="button"
          role="tab"
          aria-selected={activeId === p.id}
          className={`lst-tab${activeId === p.id ? ' active' : ''}`}
          data-plat={p.id}
          onClick={(e) => pick(p.id, e.currentTarget)}
        >
          <span className="dot" aria-hidden="true" />
          {p.name}
        </button>
      ))}
    </nav>
  );
}
