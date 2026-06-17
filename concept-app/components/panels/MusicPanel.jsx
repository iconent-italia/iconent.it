'use client';
import PanelShell from '@/components/PanelShell';
import { useArtist } from '@/components/ArtistContext';
import EqBars from '@/components/EqBars';

export default function MusicPanel() {
  const a = useArtist();
  const m = a.music;
  return (
    <PanelShell id="music" kicker="02 · ULTIMO DROP" tx="iris">
      <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={m.cover} alt={m.title} style={{ width: 220, height: 220, objectFit: 'cover', borderRadius: 6 }} />
        <div>
          <h2 className="display" style={{ fontSize: 'clamp(2rem,7vw,5rem)' }}>{m.title}</h2>
          <div style={{ display: 'flex', gap: 14, marginTop: 18, flexWrap: 'wrap' }}>
            {m.links.spotify && <a className="accent" href={m.links.spotify}>SPOTIFY →</a>}
            {m.links.apple && <a className="accent" href={m.links.apple}>APPLE →</a>}
            {m.links.youtube && <a className="accent" href={m.links.youtube}>YOUTUBE →</a>}
            {m.presave && <a className="accent" href={m.presave}>PRE-SAVE →</a>}
          </div>
          {m.audioLoop && <EqBars />}
        </div>
      </div>
    </PanelShell>
  );
}
