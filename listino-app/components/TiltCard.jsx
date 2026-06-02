'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { gyroX, gyroY, startGyro } from '@/lib/gyro';

export default function TiltCard({ children, className = '', reduce, max = 14, ...rest }) {
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const isTouch = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  // Su touch: aggancia il giroscopio condiviso. Su desktop: pointer (sotto).
  useEffect(() => {
    if (reduce || !isTouch()) return;
    startGyro();
    const ux = gyroX.on('change', (v) => px.set(v));
    const uy = gyroY.on('change', (v) => py.set(v));
    return () => {
      ux();
      uy();
    };
  }, [reduce, px, py]);

  const rX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 16 });
  const rY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 16 });
  const shadowY = useTransform(py, [-0.5, 0.5], [30, 12]);
  const boxShadow = useMotionTemplate`0 ${shadowY}px 46px -22px color-mix(in srgb, var(--accent) 55%, transparent)`;

  function onMove(e) {
    if (reduce || isTouch() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    if (isTouch()) return;
    px.set(0);
    py.set(0);
  }

  return (
    <motion.article
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        reduce
          ? undefined
          : { rotateX: rX, rotateY: rY, boxShadow, transformPerspective: 800 }
      }
      {...rest}
    >
      {children}
    </motion.article>
  );
}
