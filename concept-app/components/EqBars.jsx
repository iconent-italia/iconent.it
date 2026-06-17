'use client';
import { useEffect, useRef } from 'react';
import { useAudio } from '@/components/AudioController';

// Beat-reactive equalizer bars in the accent color. When no audio is playing
// (getBands returns null) it rests as a flat low baseline — never empty/jumpy.
export default function EqBars({ count = 24, height = 56 }) {
  const { getBands } = useAudio();
  const wrapRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = () => {
      const wrap = wrapRef.current;
      if (wrap) {
        const bands = getBands(count);
        const bars = wrap.children;
        for (let i = 0; i < bars.length; i++) {
          const v = bands ? bands[i] : 0.08;
          bars[i].style.transform = `scaleY(${Math.max(0.06, v)})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [getBands, count]);

  return (
    <div ref={wrapRef} aria-hidden style={{
      display: 'flex', alignItems: 'flex-end', gap: 3, height, marginTop: 22,
    }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{
          width: 4, height: '100%', background: 'var(--accent)',
          transformOrigin: 'bottom', transform: 'scaleY(0.06)',
          transition: 'transform 90ms linear', borderRadius: 1,
        }} />
      ))}
    </div>
  );
}
