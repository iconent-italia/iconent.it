'use client';
import PanelShell from '@/components/PanelShell';
import { useArtist } from '@/components/ArtistContext';

export default function FanWorldPanel() {
  const a = useArtist();
  if (!a.fanWorld?.newsletter && !a.fanWorld?.discord) return null;
  return (
    <PanelShell id="fanworld" kicker="06 · FAN WORLD">
      <h2 className="display" style={{ fontSize: 'clamp(2rem,7vw,5rem)', maxWidth: '16ch' }}>
        ENTRA NEL MONDO
      </h2>
      {a.fanWorld.newsletter && (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 8, marginTop: 24, maxWidth: 420 }}>
          <input type="email" placeholder="la tua email" required
            style={{ flex: 1, padding: '12px 14px', background: 'transparent', border: '1px solid #333', color: 'var(--fg)' }} />
          <button className="accent" style={{ border: '1px solid var(--accent)', padding: '12px 18px', background: 'transparent' }}>
            JOIN →
          </button>
        </form>
      )}
    </PanelShell>
  );
}
