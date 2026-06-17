'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import * as THREE from 'three';

// === PORTALE COLOSSEO (apertura cinematografica) ===========================
// Colosseo OLOGRAMMA in wireframe oro: la camera vola dentro l'arco centrale,
// "TONY EFFE" si compone, poi l'overlay sfuma e rivela il sito.
// Si auto-dismette dopo la sequenza. Skippabile. Salta su mobile/reduced-motion.
// ===========================================================================

const DUR = 5.2; // durata fly-through (s)

// punti di un arco a tutto sesto (rettangolo + semicerchio in cima)
function archPoints(w, h) {
  const r = w / 2;
  const s = new THREE.Shape();
  s.moveTo(-r, 0);
  s.lineTo(-r, h - r);
  s.absarc(0, h - r, r, Math.PI, 0, true);
  s.lineTo(r, 0);
  s.lineTo(-r, 0);
  return s.getPoints(40);
}

function useArchGeom(w, h) {
  return useMemo(() => new THREE.BufferGeometry().setFromPoints(archPoints(w, h)), [w, h]);
}

function lineGeom(pts) {
  return new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(p[0], p[1], 0)));
}

// una facciata di Colosseo (2 file di archi + cornici) come wireframe oro
function Facade({ z, accent }) {
  const big = useArchGeom(1.8, 2.5);
  const small = useArchGeom(1.3, 1.7);
  const cornice1 = useMemo(() => lineGeom([[-3.4, 2.62], [3.4, 2.62]]), []);
  const cornice2 = useMemo(() => lineGeom([[-3.4, 4.5], [3.4, 4.5]]), []);
  const cols = [-2.2, 0, 2.2];
  const mat = { transparent: true, opacity: 0.85 };
  return (
    <group position={[0, 0, z]}>
      {/* tier 1 */}
      {cols.map((x) => (
        <lineLoop key={`b${x}`} geometry={big} position={[x, 0, 0]}>
          <lineBasicMaterial color={accent} {...mat} />
        </lineLoop>
      ))}
      <line geometry={cornice1}><lineBasicMaterial color={accent} transparent opacity={0.5} /></line>
      {/* tier 2 */}
      {cols.map((x) => (
        <lineLoop key={`s${x}`} geometry={small} position={[x, 2.9, 0]}>
          <lineBasicMaterial color={accent} {...mat} />
        </lineLoop>
      ))}
      <line geometry={cornice2}><lineBasicMaterial color={accent} transparent opacity={0.35} /></line>
    </group>
  );
}

function Portal({ accent }) {
  // tunnel di facciate: la camera ci passa in mezzo (arco centrale x=0)
  const zs = [2, -3, -8, -13, -18, -23];
  return (
    <group>
      {zs.map((z) => (
        <Facade key={z} z={z} accent={accent} />
      ))}
    </group>
  );
}

function FlyCamera({ onDone }) {
  const cam = useThree((s) => s.camera);
  const t0 = useRef(null);
  const done = useRef(false);
  useFrame(({ clock }) => {
    if (t0.current === null) t0.current = clock.elapsedTime;
    const t = Math.min(1, (clock.elapsedTime - t0.current) / DUR);
    // easeInOutCubic
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    cam.position.set(Math.sin(t * 6.28) * 0.15, 1.2, 8 - e * 30); // vola dentro, micro drift
    cam.lookAt(0, 1.2, -30);
    if (t >= 1 && !done.current) { done.current = true; onDone(); }
  });
  return null;
}

export default function ColosseumIntro({ accent = '#c9a44a' }) {
  const [skip, setSkip] = useState(false); // troppo piccolo / reduced -> niente intro
  const [done, setDone] = useState(false);
  const [nameIn, setNameIn] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 768px)').matches;
    if (reduce || small) { setSkip(true); return; }
    // il nome si compone verso la fine del volo
    const t = setTimeout(() => setNameIn(true), (DUR - 1.6) * 1000);
    return () => clearTimeout(t);
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="portal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 80, background: '#050505' }}
        >
          <Canvas camera={{ position: [0, 1.2, 8], fov: 62 }} dpr={[1, 2]}>
            <fog attach="fog" args={['#050505', 6, 30]} />
            <ambientLight intensity={0.4} />
            <FlyCamera onDone={() => setDone(true)} />
            <Portal accent={accent} />
            <Sparkles count={60} scale={[14, 8, 30]} position={[0, 1, -10]} size={1.6} speed={0.5} color={accent} opacity={0.5} />
          </Canvas>

          {/* scanline olografica + vignette sopra il canvas */}
          <div aria-hidden className="portal-scan" />
          <div aria-hidden className="portal-vig" />

          {/* nome che si compone */}
          <div className="portal-name-wrap" aria-hidden>
            <motion.h1
              className="h-display portal-name"
              initial={{ opacity: 0, letterSpacing: '0.4em', filter: 'blur(14px)' }}
              animate={nameIn ? { opacity: 1, letterSpacing: '-0.02em', filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              TONY EFFE
            </motion.h1>
          </div>

          <button type="button" className="portal-skip" onClick={() => setDone(true)}>
            SALTA →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
