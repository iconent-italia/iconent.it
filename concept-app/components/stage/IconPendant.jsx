'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Sparkles, Text, Billboard, Instances, Instance } from '@react-three/drei';

// === Tony Effe centerpiece =================================================
// Il ciondolo "17" (gem oro faccettato) come oggetto persistente, l'anello del
// Colosseo che gli ruota attorno, e il "777" (simbolo storico DPG) in orbita.
// `progress` 0..1 (scroll globale) fa "morphare" tutto il rig tra i pannelli.
// ===========================================================================

function Gem({ accent }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.05, 0]} />
      <meshStandardMaterial
        color={accent}
        metalness={1}
        roughness={0.12}
        envMapIntensity={1.5}
        flatShading
      />
      {/* spigoli netti = look diamante inciso */}
      <Edges threshold={12} color="#fff3d0" />
    </mesh>
  );
}

// Anello di archi che evoca l'ovale del Colosseo (Roma), ruota lentissimo.
function ColosseumRing({ accent, count = 28, radius = 2.7 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        return { position: [Math.cos(a) * radius, 0, Math.sin(a) * radius], rotation: [0, -a, 0] };
      }),
    [count, radius]
  );
  const grp = useRef();
  useFrame((_, dt) => {
    if (grp.current) grp.current.rotation.y += dt * 0.04;
  });
  return (
    <group ref={grp} rotation={[Math.PI / 2.6, 0, 0]}>
      <Instances limit={count}>
        <boxGeometry args={[0.07, 0.85, 0.16]} />
        <meshStandardMaterial
          color={accent}
          metalness={0.9}
          roughness={0.4}
          emissive={accent}
          emissiveIntensity={0.04}
        />
        {items.map((it, i) => (
          <Instance key={i} position={it.position} rotation={it.rotation} />
        ))}
      </Instances>
    </group>
  );
}

// 777 — tre "7" in orbita sul piano frontale (firma dark/DPG).
function TripleSeven({ accent, radius = 1.8 }) {
  const grp = useRef();
  useFrame((_, dt) => {
    if (grp.current) grp.current.rotation.z += dt * 0.12;
  });
  const angles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
  return (
    <group ref={grp}>
      {angles.map((a, i) => (
        <Text
          key={i}
          position={[Math.cos(a) * radius, Math.sin(a) * radius, -0.5]}
          rotation={[0, 0, -a]}
          fontSize={0.46}
          color={accent}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.004}
          outlineColor="#000000"
        >
          7
        </Text>
      ))}
    </group>
  );
}

export default function IconPendant({ accent = '#c9a44a', progress = 0 }) {
  const rig = useRef();
  useFrame(() => {
    if (!rig.current) return;
    const s = 1 + progress * 0.35; // cresce scrollando
    rig.current.scale.setScalar(s);
    rig.current.rotation.x = progress * 0.6; // si inclina lungo la pagina
  });
  return (
    <group ref={rig}>
      <ColosseumRing accent={accent} />
      <TripleSeven accent={accent} />
      <Gem accent={accent} />
      {/* "17" sempre rivolto alla camera, davanti al gem */}
      <Billboard>
        <Text
          position={[0, 0, 1.25]}
          fontSize={0.82}
          color={accent}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor="#1a1407"
        >
          17
        </Text>
      </Billboard>
      {/* polvere di diamante */}
      <Sparkles count={40} scale={[6, 6, 6]} size={2} speed={0.3} color={accent} opacity={0.7} />
    </group>
  );
}
