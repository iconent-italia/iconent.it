'use client';
import { motion } from 'framer-motion';
import { useArtist } from '@/components/ArtistContext';
import { rise, stagger } from '@/lib/motion';

export default function IntroPanel() {
  const a = useArtist();
  const words = a.name.toUpperCase().split(' ');
  return (
    <section className="panel" style={{ display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', padding: 'clamp(24px,6vw,96px)', position: 'relative', zIndex: 1 }}>
      <div className="kicker">NUOVO ALBUM · FUORI ORA</div>
      <motion.h1 className="display" style={{ fontSize: 'clamp(3rem, 16vw, 12rem)' }}
        variants={stagger} initial="hidden" animate="show">
        {words.map((w) => (
          <motion.span key={w} variants={rise} style={{ display: 'block' }}>{w}</motion.span>
        ))}
      </motion.h1>
      <motion.div className="accent" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1.2 }}
        style={{ marginTop: 24, fontSize: 12, letterSpacing: '.3em' }}>
        ↓ SCROLL
      </motion.div>
    </section>
  );
}
