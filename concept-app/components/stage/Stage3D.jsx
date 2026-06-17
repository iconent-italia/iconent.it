'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { getObject3D } from './objects';

export default function Stage3D({ objectKey, accent }) {
  const progress = useScrollProgress();
  const Obj = getObject3D(objectKey);
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
