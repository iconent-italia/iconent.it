'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSceneTransform } from '@/hooks/useSceneTransform';

// Full-screen panel con transizione cinematica scroll-linked (vedi
// useSceneTransform): il contenuto deriva in scena, si rivela con un clip-path
// geometrico per-tab, una linea-luce accent lo spazza. Tutto guidato dallo
// scroll -> fluido con Lenis, mai bloccato. `tx` = up|iris|barn|diagonal|slab.
export default function PanelShell({ id, kicker, invert = false, tx = 'up', children }) {
  const ref = useRef(null);
  const t = useSceneTransform(ref, tx);
  return (
    <section
      ref={ref}
      id={id}
      className={`panel ${invert ? 'invert' : ''}`}
      style={{
        position: 'relative', zIndex: 1, overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(24px, 6vw, 96px)',
      }}
    >
      <motion.div style={t.content}>
        {kicker ? <div className="kicker" style={{ marginBottom: 16 }}>{kicker}</div> : null}
        {children}
      </motion.div>

      {/* linea-luce accent che spazza durante l'ingresso (garnish artistico) */}
      <motion.div aria-hidden className="tx-sweep" style={t.sweep} />
    </section>
  );
}
