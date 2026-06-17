'use client';
import { motion } from 'framer-motion';
import { useArtist } from '@/components/ArtistContext';

export default function ManifestoPanel() {
  const a = useArtist();
  return (
    <section className="panel" style={{ display: 'flex', alignItems: 'center',
      padding: 'clamp(24px,6vw,96px)', position: 'relative', zIndex: 1 }}>
      <motion.h2 className="display" style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', maxWidth: '14ch' }}
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6 }} transition={{ duration: 0.8 }}>
        {a.manifesto}
      </motion.h2>
    </section>
  );
}
