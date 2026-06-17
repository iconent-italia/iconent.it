'use client';
import { motion } from 'framer-motion';
import { REVEALS, CURTAINS } from '@/lib/motion';

// Full-screen panel con transizione artistica per-tab:
//  - il contenuto si rivela con un clip-path geometrico (REVEALS[tx])
//  - un sipario in accent si ritrae nella direzione opposta (CURTAINS[tx])
// `tx` = up | iris | barn | diagonal | slab (default: up).
export default function PanelShell({ id, kicker, invert = false, tx = 'up', children }) {
  const reveal = REVEALS[tx] || REVEALS.up;
  const curtain = CURTAINS[tx] || CURTAINS.up;
  return (
    <motion.section
      id={id}
      className={`panel ${invert ? 'invert' : ''}`}
      style={{
        position: 'relative', zIndex: 1, overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(24px, 6vw, 96px)',
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
    >
      <motion.div variants={reveal} style={{ position: 'relative', zIndex: 1 }}>
        {kicker ? <div className="kicker" style={{ marginBottom: 16 }}>{kicker}</div> : null}
        {children}
      </motion.div>

      {/* sipario artistico (accent) che si ritrae rivelando il pannello */}
      <motion.div
        aria-hidden
        className="tx-curtain"
        variants={curtain}
        style={{ transformOrigin: curtain.transformOrigin }}
      />
    </motion.section>
  );
}
