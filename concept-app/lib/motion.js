// Shared Framer Motion variants — the "house" animation language.
export const rise = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

// === Transizioni cinematiche scroll-linked ===================================
// Niente clip-path (si incastravano) né sipari accent. Ogni pannello è una
// "scena": il contenuto entra alla deriva, si assesta al centro a piena
// opacità, e sfuma ai bordi. Tutto guidato dalla posizione di scroll (vedi
// hooks/useSceneTransform) -> fluido con Lenis, mai bloccato.
//
// Ogni tab ha un vettore d'ingresso diverso (identità per-scena):
//   x/y = drift iniziale (px) · scale = zoom iniziale che si assesta a 1.
export const SCENE = {
  up: { x: 0, y: 150, scale: 1.07 },
  iris: { x: 0, y: 0, scale: 1.22 }, // zoom cinematico puro
  barn: { x: 0, y: 90, scale: 1.08 },
  diagonal: { x: -140, y: 90, scale: 1.08 },
  slab: { x: 0, y: 190, scale: 1.06 },
};
