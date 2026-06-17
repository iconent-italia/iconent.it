'use client';
import PanelShell from '@/components/PanelShell';
import { useArtist } from '@/components/ArtistContext';

export default function TourPanel() {
  const a = useArtist();
  return (
    <PanelShell id="tour" kicker="03 · LIVE / BIGLIETTI">
      <h2 className="display" style={{ fontSize: 'clamp(2rem,8vw,6rem)', marginBottom: 24 }}>TOUR 2026</h2>
      <ul style={{ listStyle: 'none' }}>
        {a.tour.map((t) => (
          <li key={t.city + t.date} style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', padding: '16px 0', borderTop: '1px solid #2a2a2a', gap: 16 }}>
            <span style={{ fontWeight: 700 }}>{t.city}{t.venue ? ` · ${t.venue}` : ''}</span>
            <span style={{ color: 'var(--muted)' }}>{t.date}</span>
            {t.status === 'soldout'
              ? <span style={{ color: 'var(--muted)' }}>SOLD OUT</span>
              : <a className="accent" href={t.url || '#'}>TICKETS →</a>}
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}
