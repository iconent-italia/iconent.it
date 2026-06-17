'use client';
import PanelShell from '@/components/PanelShell';
import { motion } from 'framer-motion';
import { useArtist } from '@/components/ArtistContext';

export default function MerchPanel() {
  const a = useArtist();
  return (
    <PanelShell id="merch" kicker="04 · MERCH" invert tx="slab">
      <h2 className="display" style={{ fontSize: 'clamp(2rem,8vw,6rem)', marginBottom: 24 }}>SHOP THE DROP</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
        {a.merch.map((p) => (
          <motion.div key={p.name} whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
            style={{ transformStyle: 'preserve-3d' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 }}>
              <span>{p.name}</span><span>{p.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </PanelShell>
  );
}
