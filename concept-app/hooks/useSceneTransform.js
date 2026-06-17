'use client';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SCENE } from '@/lib/motion';

// Clip-path geometrico per-tab, funzione di v (0=nascosto, 1=rivelato).
// Tutto scroll-linked -> deterministico, MAI bloccato (era questo il bug del
// whileInView con Lenis).
function clipFor(tx, v) {
  const p = (n) => n.toFixed(1);
  switch (tx) {
    case 'iris': return `circle(${p(8 + v * 145)}% at 50% 50%)`;
    case 'barn': return `inset(0% ${p((1 - v) * 50)}% 0% ${p((1 - v) * 50)}%)`;
    case 'diagonal': return `polygon(0 0, ${p(v * 100)}% 0, ${p(v * 100)}% 100%, 0 100%)`;
    case 'slab': return `inset(${p((1 - v) * 100)}% 0% 0% 0%)`;
    case 'up':
    default: return `inset(0% 0% ${p((1 - v) * 100)}% 0%)`;
  }
}

// Transizione cinematica scroll-linked per un pannello a tutto schermo.
// Il contenuto deriva in scena (SCENE[tx]), si rivela con un clip-path
// geometrico, una linea-luce accent lo "spazza", poi sfuma in uscita.
export function useSceneTransform(ref, tx = 'up') {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const s = SCENE[tx] || SCENE.up;

  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [s.y, 0, -s.y * 0.6]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [s.x, 0, -s.x * 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [s.scale, 1, 1.02]);

  // reveal 0..1 durante l'ingresso del pannello (clamp -> resta rivelato)
  const reveal = useTransform(scrollYProgress, [0.05, 0.32], [0, 1], { clamp: true });
  const clipPath = useTransform(reveal, (v) => clipFor(tx, v));

  // linea-luce accent che spazza orizzontalmente durante il reveal
  const sweepX = useTransform(reveal, [0, 1], ['-3%', '103%']);
  const sweepOpacity = useTransform(reveal, [0, 0.5, 1], [0, 0.5, 0]);

  if (reduce) {
    return { content: { position: 'relative', zIndex: 1 }, sweep: { opacity: 0 } };
  }
  return {
    content: {
      x, y, scale, opacity, clipPath, WebkitClipPath: clipPath,
      position: 'relative', zIndex: 1, willChange: 'transform, opacity, clip-path',
    },
    sweep: { left: sweepX, opacity: sweepOpacity },
  };
}
