'use client';

import { motion } from 'framer-motion';
import { asset, EASE } from '@/lib/config';

export default function Hero({ platforms, onPick, reduce }) {
  const logos = platforms.filter((p) => p.logo);

  function go(id) {
    onPick(id); // selectPlatform: cambia servizio + scroll con offset nav
  }

  return (
    <header className="lst-hero">
      <div
        className="lst-hero-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${asset('/img/bg-01.webp')})` }}
      />

      <motion.p
        className="lst-eyebrow"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        Powered by ICONENT Agency
      </motion.p>

      <h1>
        Servizi di Marketing <span className="accent">e Comunicazione</span>
      </h1>

      <motion.p
        className="lst-hero-sub"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
      >
        Premi sul servizio che desideri visualizzare
        <br />
        oppure scorri il listino completo.
      </motion.p>

      {/* Loghi statici: scorciatoie alle piattaforme (nessuno scroll). */}
      <nav className="lst-orbit" aria-label="Servizi">
        <div className="lst-orbit-stage">
          {logos.map((p) => (
            <button
              key={p.id}
              type="button"
              className="lst-logo3d"
              data-plat={p.id}
              aria-label={`Vai a ${p.name}`}
              onClick={() => go(p.id)}
            >
              <span className="holo-wrap">
                <WireLogo id={p.id} />
                <WireLogo id={p.id} glitch />
              </span>
            </button>
          ))}
        </div>
      </nav>

      <div className="lst-scrollcue" aria-hidden="true">
        <span>Scorri</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 18 }}
        >
          ⌄
        </motion.span>
      </div>
    </header>
  );
}

/* Loghi ridisegnati a WIREFRAME (solo linee, vuoti dentro): proiezione olografica. */
function WireLogo({ id, glitch }) {
  const c = {
    className: glitch ? 'holo-glitch' : 'holo-svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.1,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  // riempimento traslucido = superficie volumetrica su cui scorrono le scanline
  const surf = 'rgba(77, 208, 225, 0.16)';
  if (id === 'instagram') {
    return (
      <svg {...c}>
        <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="5" fill={surf} />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (id === 'spotify') {
    return (
      <svg {...c}>
        <circle cx="12" cy="12" r="9.2" fill={surf} />
        <path d="M7.1 9.7c3.5-1 7.7-0.6 10 1.1" />
        <path d="M7.7 12.7c2.8-0.8 6.1-0.5 8.2 0.9" />
        <path d="M8.4 15.5c2-0.6 4.4-0.3 6 0.7" />
      </svg>
    );
  }
  if (id === 'youtube') {
    return (
      <svg {...c}>
        <rect x="2.5" y="6" width="19" height="12" rx="3.6" fill={surf} />
        <path d="M10.2 9.2v5.6l4.8-2.8z" fill="rgba(77, 208, 225, 0.55)" stroke="none" />
      </svg>
    );
  }
  if (id === 'tiktok') {
    return (
      <svg {...c}>
        <path d="M13.7 3.6v10.7a3.7 3.7 0 1 1-3.7-3.7" />
        <path d="M13.7 3.6c0.5 2.6 2.4 4.2 4.7 4.4" />
      </svg>
    );
  }
  return null;
}
