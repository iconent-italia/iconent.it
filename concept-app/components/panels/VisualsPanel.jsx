'use client';
import PanelShell from '@/components/PanelShell';
import { useArtist } from '@/components/ArtistContext';

export default function VisualsPanel() {
  const a = useArtist();
  if (!a.visuals.length) return null;
  return (
    <PanelShell id="visuals" kicker="05 · VISUALS" tx="diagonal">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        {a.visuals.map((v, i) => (
          <a key={i} href={v.video || '#'} style={{ position: 'relative', display: 'block' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.thumb} alt={`visual ${i}`} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
            <span className="accent" style={{ position: 'absolute', bottom: 8, left: 8 }}>▶ PLAY</span>
          </a>
        ))}
      </div>
    </PanelShell>
  );
}
