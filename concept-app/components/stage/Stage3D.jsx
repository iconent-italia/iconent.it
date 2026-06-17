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
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <Obj accent={accent} progress={progress} />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
