'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Sparkles, Text, Billboard } from '@react-three/drei';

// === Tony Effe centerpiece (raffinato) =====================================
// Il ciondolo "17": gem oro faccettato + due anelli olografici sottili (halo)
// + 777 discreto. NIENTE travi/box (sembravano legna). Fondale premium che
// resta DIETRO ai contenuti: piccolo, sobrio, con nebbia/vignette nello Stage.
// `progress` 0..1 = scroll globale: morph leggero, mai invadente.
// ===========================================================================

function Gem({ accent }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color={accent}
        metalness={1}
        roughness={0.05}
        envMapIntensity={1.6}
        flatShading
      />
      {/* spigoli oro discreti (non bianco sparato) */}
      <Edges threshold={15} color="#e8c87a" />
    </mesh>
  );
}

// Due anelli sottili = halo olografico (evoca l'arena senza travi).
function HoloRings({ accent }) {
  const a = useRef();
  const b = useRef();
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.06;
    if (b.current) b.current.rotation.z -= dt * 0.045;
  });
  return (
    <group>
      <mesh ref={a} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[1.9, 0.01, 8, 120]} />
        <meshBasicMaterial color={accent} transparent opacity={0.5} />
      </mesh>
      <mesh ref={b} rotation={[-0.6, 0.5, 0]}>
        <torusGeometry args={[2.25, 0.008, 8, 120]} />
        <meshBasicMaterial color={accent} transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

// 777 — tre "7" molto discreti in orbita (firma DPG), dietro il gem.
function TripleSeven({ accent, radius = 1.35 }) {
  const grp = useRef();
  useFrame((_, dt) => {
    if (grp.current) grp.current.rotation.z += dt * 0.08;
  });
  const angles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
  return (
    <group ref={grp} position={[0, 0, -0.8]}>
      {angles.map((a, i) => (
        <Text
          key={i}
          position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}
          rotation={[0, 0, -a]}
          fontSize={0.3}
          color={accent}
          fillOpacity={0.35}
          anchorX="center"
          anchorY="middle"
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
    // morph leggerissimo: respira appena scrollando, niente scatti
    const s = 0.68 + progress * 0.1;
    rig.current.scale.setScalar(s);
    rig.current.rotation.x = progress * 0.35;
  });
  // gioiello spostato in ALTO a DESTRA: lo spazio dei contenuti (sinistra/centro)
  // resta libero, il 3D fa da accento e non litiga col testo.
  return (
    <group ref={rig} position={[2.35, 1.45, -0.4]}>
      <HoloRings accent={accent} />
      <TripleSeven accent={accent} />
      <Gem accent={accent} />
      {/* "17" discreto, davanti al gem */}
      <Billboard>
        <Text
          position={[0, 0, 1.0]}
          fontSize={0.46}
          color={accent}
          fillOpacity={0.9}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.008}
          outlineColor="#1a1407"
        >
          17
        </Text>
      </Billboard>
      <Sparkles count={22} scale={[4, 4, 4]} size={1.2} speed={0.25} color={accent} opacity={0.4} />
    </group>
  );
}
