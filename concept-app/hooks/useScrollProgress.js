'use client';
import { useEffect, useRef, useState } from 'react';

// Global 0..1 progress across the whole scrollable document.
export function useScrollProgress() {
  const [p, setP] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? window.scrollY / max : 0;
      setP(ref.current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return p;
}
