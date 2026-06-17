'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// === PORTALE COLOSSEO (apertura cinematografica) ===========================
// Usa il VIDEO reale del Colosseo (notturno, oro) con un push-in "dentro l'arco":
// la camera entra, "TONY EFFE" si compone, poi l'overlay sfuma e rivela il sito.
// Si auto-dismette. Skippabile. Su mobile/reduced-motion mostra solo un fade breve.
// ===========================================================================

const DUR = 4.8; // durata portale (s)

export default function ColosseumIntro({ src, poster, accent = '#c9a44a' }) {
  const [done, setDone] = useState(false);
  const [nameIn, setNameIn] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduce(r);
    const dur = r ? 1.6 : DUR;
    const tName = setTimeout(() => setNameIn(true), Math.max(0, (dur - 1.6) * 1000));
    const tEnd = setTimeout(() => setDone(true), dur * 1000);
    return () => { clearTimeout(tName); clearTimeout(tEnd); };
  }, []);

  if (!src) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="portal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 80, background: '#050505', overflow: 'hidden' }}
        >
          {/* video reale del Colosseo con push-in "dentro l'arco" */}
          <motion.video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            initial={{ scale: 1.08 }}
            animate={reduce ? { scale: 1.08 } : { scale: 1.6 }}
            transition={{ duration: DUR + 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', transformOrigin: '50% 46%' }}
          />

          {/* vignette + scurita in basso per il nome */}
          <div aria-hidden className="portal-vig" />
          <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 81, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(5,5,5,.55) 0%, rgba(5,5,5,.1) 38%, rgba(5,5,5,.8) 100%)' }} />

          {/* nome che si compone */}
          <div className="portal-name-wrap" aria-hidden>
            <motion.h1
              className="h-display portal-name"
              initial={{ opacity: 0, letterSpacing: '0.45em', filter: 'blur(16px)', y: 10 }}
              animate={nameIn ? { opacity: 1, letterSpacing: '-0.02em', filter: 'blur(0px)', y: 0 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              TONY EFFE
            </motion.h1>
          </div>

          <button type="button" className="portal-skip" onClick={() => setDone(true)}>
            SALTA →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
