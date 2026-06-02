'use client';

import { motion } from 'framer-motion';

// Marquee infinito per le pagine del network (set duplicato per il loop).
export default function Marquee({ items, reduce }) {
  const doubled = [...items, ...items];
  return (
    <div className="lst-marquee">
      <motion.div
        className="lst-marquee-track"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((c, i) => (
          <span className="lst-chip" key={i} aria-hidden={i >= items.length ? 'true' : undefined}>
            {c.handle}
            <span className="n">{c.n}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
