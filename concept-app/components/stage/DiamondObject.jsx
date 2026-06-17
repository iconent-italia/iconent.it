'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// A faceted gold gem. `progress` (0..1) drives rotation/scale across the page.
export default function DiamondObject({ accent = '#c9a44a', progress = 0 }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.3;
    ref.current.rotation.x = progress * Math.PI;
    const s = 1 + progress * 0.6;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.1, 0]} />
      <meshStandardMaterial color={accent} metalness={1} roughness={0.15} envMapIntensity={1.2} />
    </mesh>
  );
}
