'use client';
import { useEffect, useState } from 'react';

export function computePanelState(scrollTop, viewportH, panelCount) {
  const raw = viewportH > 0 ? scrollTop / viewportH : 0;
  const active = Math.max(0, Math.min(panelCount - 1, Math.floor(raw)));
  const progress = Math.max(0, Math.min(1, raw - active));
  return { active, progress };
}

export function usePanelProgress(panelCount) {
  const [state, setState] = useState({ active: 0, progress: 0 });
  useEffect(() => {
    const onScroll = () =>
      setState(computePanelState(window.scrollY, window.innerHeight, panelCount));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [panelCount]);
  return state;
}
