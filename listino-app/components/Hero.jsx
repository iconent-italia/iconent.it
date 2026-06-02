'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { asset, EASE } from '@/lib/config';

export default function Hero({ platforms, onPick, reduce }) {
  const logos = platforms.filter((p) => p.logo);

  function go(id) {
    onPick(id);
    document.getElementById('listino')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <header className="lst-hero">
      <div
        className="lst-hero-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${asset('/img/bg-01.jpg')})` }}
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
        <GlitchWord text="Servizi di Marketing" reduce={reduce} delay={0.1} />{' '}
        <span className="accent">
          <GlitchWord text="e Comunicazione" reduce={reduce} delay={0.25} />
        </span>
      </h1>

      <motion.p
        className="lst-hero-sub"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
      >
        Premi sul servizio che desideri visualizzare — oppure scorri il listino completo.
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
              <Image src={asset(p.logo)} alt={p.name} width={190} height={190} priority />
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

/* Titolo con micro-glitch d'entrata (clip + offset), poi statico. */
function GlitchWord({ text, reduce, delay = 0 }) {
  if (reduce) return <>{text}</>;
  return (
    <motion.span
      style={{ display: 'inline-block' }}
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)', x: -6 }}
      animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)', x: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {text}
    </motion.span>
  );
}
