'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { asset, EASE } from '@/lib/config';

export default function Hero({ platforms, onPick, reduce }) {
  const heroRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 18 });

  function onMove(e) {
    if (reduce || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const logos = platforms.filter((p) => p.logo);

  return (
    <header
      className="lst-hero"
      ref={heroRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
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

      <nav className="lst-orbit" aria-label="Servizi">
        <motion.div
          className="lst-orbit-stage"
          style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
        >
          {logos.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              className="lst-logo3d"
              data-plat={p.id}
              aria-label={`Vai a ${p.name}`}
              onClick={() => {
                onPick(p.id);
                document.getElementById('listino')?.scrollIntoView({
                  behavior: reduce ? 'auto' : 'smooth',
                });
              }}
              initial={reduce ? false : { opacity: 0, y: 30, scale: 0.8 }}
              animate={
                reduce
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: [0, -16, 0],
                      scale: 1,
                    }
              }
              transition={
                reduce
                  ? undefined
                  : {
                      opacity: { duration: 0.5, delay: 0.3 + i * 0.12 },
                      scale: { type: 'spring', stiffness: 220, damping: 12, delay: 0.3 + i * 0.12 },
                      y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: i * 1.1 },
                    }
              }
              whileHover={reduce ? undefined : { scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={asset(p.logo)} alt={p.name} width={190} height={190} priority={i < 2} />
            </motion.button>
          ))}
        </motion.div>
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
