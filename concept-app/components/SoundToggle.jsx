'use client';
import { useAudio } from '@/components/AudioController';

// Minimal gold toggle, bottom-left. Hidden when no audioLoop is configured.
export default function SoundToggle() {
  const { hasAudio, enabled, toggle } = useAudio();
  if (!hasAudio) return null;
  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Mute sound' : 'Play sound'}
      style={{
        position: 'fixed', left: 24, bottom: 24, zIndex: 5,
        background: 'transparent', border: 0, cursor: 'pointer', padding: 8,
        color: 'var(--accent)', fontFamily: 'var(--font-body)', fontSize: 12,
        letterSpacing: '.25em', textTransform: 'uppercase', mixBlendMode: 'difference',
        opacity: enabled ? 1 : 0.7,
      }}
    >
      {'◢ '}{enabled ? 'SOUND ON' : 'SOUND'}
    </button>
  );
}
