'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/config';
import Hero from './Hero';
import Tabs from './Tabs';
import PlatformPanel from './PlatformPanel';
import CTA from './CTA';

export default function Listino({ content }) {
  const { platforms, cta } = content;
  const [activeId, setActiveId] = useState(platforms[0].id);
  const reduce = useReducedMotion();

  const active = platforms.find((p) => p.id === activeId) ?? platforms[0];

  return (
    // --accent guida tutti i glow derivati (color-mix). @property lo fa "fluire".
    <div className="lst-root" style={{ '--accent': active.accent }}>
      <div className="lst-ambient" aria-hidden="true" />
      <div className="lst-grid-bg" aria-hidden="true" />
      <div className="lst-grain" aria-hidden="true" />
      <div className="lst-scanlines" aria-hidden="true" />

      <a className="skip-link" href="#listino">Vai al listino</a>

      <Hero platforms={platforms} onPick={setActiveId} reduce={reduce} />

      <Tabs platforms={platforms} activeId={activeId} onChange={setActiveId} reduce={reduce} />

      <main id="listino">
        {/* FLOOD: la nuova palette invade lo schermo dall'alto al cambio tab */}
        {!reduce && (
          <motion.div
            key={activeId}
            className="lst-flood"
            aria-hidden="true"
            initial={{ opacity: 0.5, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={reduce ? false : { opacity: 0, y: 44, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -28, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <PlatformPanel platform={active} reduce={reduce} />
          </motion.div>
        </AnimatePresence>
      </main>

      <CTA cta={cta} calculator={content.calculator} />
    </div>
  );
}
