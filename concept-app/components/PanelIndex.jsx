'use client';
import { usePanelProgress } from '@/hooks/usePanelProgress';

export default function PanelIndex({ labels }) {
  const { active } = usePanelProgress(labels.length);
  return (
    <nav style={{ position: 'fixed', top: '50%', right: 18, transform: 'translateY(-50%)',
                  zIndex: 5, display: 'flex', flexDirection: 'column', gap: 10, mixBlendMode: 'difference' }}>
      {labels.map((l, i) => (
        <span key={l} title={l} style={{
          fontSize: 10, letterSpacing: '.15em',
          color: i === active ? 'var(--accent)' : '#888',
          opacity: i === active ? 1 : 0.5,
        }}>{String(i).padStart(2, '0')}</span>
      ))}
    </nav>
  );
}
