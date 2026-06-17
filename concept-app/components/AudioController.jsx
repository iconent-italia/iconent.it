'use client';
import { createContext, useContext, useRef, useState, useCallback } from 'react';
import { useAudioAnalyser } from '@/hooks/useAudioAnalyser';

const Ctx = createContext(null);

// Single <audio> for the whole site. Starts muted/paused (autoplay policy);
// the SoundToggle is the user gesture that starts it with a 1s fade-in.
export function AudioController({ src, children }) {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const getBands = useAudioAnalyser(audioRef, enabled);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    setEnabled((on) => {
      const next = !on;
      if (next) {
        el.volume = 0;
        el.play().then(() => {
          const target = 0.4, t0 = performance.now();
          const ramp = (t) => {
            const k = Math.min(1, (t - t0) / 1000);
            el.volume = target * k;
            if (k < 1) requestAnimationFrame(ramp);
          };
          requestAnimationFrame(ramp);
        }).catch(() => {});
      } else {
        el.pause();
      }
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ hasAudio: !!src, enabled, toggle, getBands }}>
      {src && <audio ref={audioRef} src={src} loop preload="none" />}
      {children}
    </Ctx.Provider>
  );
}

// Safe default so consumers work even without a provider (no audio configured).
export function useAudio() {
  return useContext(Ctx) || { hasAudio: false, enabled: false, toggle: () => {}, getBands: () => null };
}
