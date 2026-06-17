'use client';
import { useEffect, useRef, useCallback } from 'react';

// Lazily wires a Web Audio AnalyserNode to an <audio> element once `enabled`
// turns true (autoplay policy: an AudioContext may only start after a gesture).
// Returns getBands(n) -> array of n normalized (0..1) frequency magnitudes,
// or null when audio isn't running yet (callers should render an idle state).
export function useAudioAnalyser(audioRef, enabled) {
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataRef = useRef(null);

  useEffect(() => {
    if (!enabled || !audioRef.current) return;
    if (analyserRef.current) { ctxRef.current?.resume?.(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const src = ctx.createMediaElementSource(audioRef.current);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.8;
    src.connect(analyser);
    analyser.connect(ctx.destination);
    ctxRef.current = ctx;
    analyserRef.current = analyser;
    dataRef.current = new Uint8Array(analyser.frequencyBinCount);
  }, [enabled, audioRef]);

  const getBands = useCallback((n = 16) => {
    const analyser = analyserRef.current, data = dataRef.current;
    if (!analyser || !data) return null;
    analyser.getByteFrequencyData(data);
    const bands = new Array(n);
    const step = Math.floor(data.length / n) || 1;
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < step; j++) sum += data[i * step + j] || 0;
      bands[i] = sum / step / 255;
    }
    return bands;
  }, []);

  return getBands;
}
