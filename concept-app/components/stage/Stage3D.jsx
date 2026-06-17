'use client';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { getObject3D } from './objects';

export default function Stage3D({ objectKey, accent }) {
  const progress = useScrollProgress();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 768px)').matches;
    setEnabled(!reduce && !small);
  }, []);
  const Obj = getObject3D(objectKey);
  if (!enabled) {
    // Lightweight CSS fallback: a soft accent glow, no WebGL.
    return <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: `radial-gradient(circle at 50% 35%, ${accent}22, transparent 60%)` }} />;
  }
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6.5], fov: 42 }} dpr={[1, 2]}>
        {/* nebbia = profondità, il void respira invece di essere piatto */}
        <fog attach="fog" args={['#070707', 5, 16]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[3, 4, 5]} intensity={1.0} />
        {/* key light caldo = oro che brilla nel void */}
        <pointLight position={[-3, 1, 3]} intensity={1.3} color={accent} />
        <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.45}>
          <Obj accent={accent} progress={progress} />
        </Float>
        <Environment preset="city" />
      </Canvas>
      {/* vignette: scurisce i bordi -> i contenuti restano leggibili, il centro brilla */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(125% 125% at 50% 42%, transparent 52%, rgba(5,5,5,0.85) 100%)' }} />
    </div>
  );
}
