'use client';
import { motion } from 'framer-motion';
import { wipe } from '@/lib/motion';

// Full-screen panel; clip-path wipe reveal when scrolled into view.
export default function PanelShell({ id, kicker, invert = false, children }) {
  return (
    <motion.section
      id={id}
      className={`panel ${invert ? 'invert' : ''}`}
      style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column',
               justifyContent: 'center', padding: 'clamp(24px, 6vw, 96px)' }}
      variants={wipe}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
    >
      {kicker ? <div className="kicker" style={{ marginBottom: 16 }}>{kicker}</div> : null}
      {children}
    </motion.section>
  );
}
