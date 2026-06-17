'use client';
import { motion } from 'framer-motion';
import { useArtist } from '@/components/ArtistContext';
import PixelPortrait from '@/components/PixelPortrait';

export default function ManifestoPanel() {
  const a = useArtist();
  return (
    <section className="panel split" style={{ alignItems: 'center', gap: 'clamp(24px,5vw,80px)',
      padding: 'clamp(24px,6vw,96px)', position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.5 }} transition={{ duration: 0.9 }}
        style={{ display: 'flex', justifyContent: 'center' }}>
        <PixelPortrait src={a.portrait} size={460} />
      </motion.div>
      <motion.h2 className="display" style={{ fontSize: 'clamp(2rem, 7vw, 5.5rem)', maxWidth: '12ch' }}
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6 }} transition={{ duration: 0.8 }}>
        {a.manifesto}
      </motion.h2>
    </section>
  );
}
