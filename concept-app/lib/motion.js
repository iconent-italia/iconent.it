// Shared Framer Motion variants — the "house" animation language.
export const rise = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
// Clip-path wipe used by PanelShell on enter.
export const wipe = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const EASE_OUT = [0.16, 1, 0.3, 1];

// === Transizioni artistiche per-tab ========================================
// Il CONTENUTO si rivela con un clip-path geometrico; un SIPARIO in accent
// (vedi .tx-curtain) si ritrae nella direzione opposta -> doppio strato premium.
// Niente cheap: ogni tab ha la sua geometria.
export const REVEALS = {
  up: {
    hidden: { clipPath: 'inset(0 0 100% 0)' },
    show: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9, ease: EASE_OUT } },
  },
  iris: {
    hidden: { clipPath: 'circle(0% at 50% 50%)' },
    show: { clipPath: 'circle(150% at 50% 50%)', transition: { duration: 1.0, ease: EASE_OUT } },
  },
  barn: {
    hidden: { clipPath: 'inset(0 50% 0 50%)' },
    show: { clipPath: 'inset(0 0% 0 0%)', transition: { duration: 0.9, ease: EASE_OUT } },
  },
  diagonal: {
    hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
    show: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', transition: { duration: 0.9, ease: EASE_OUT } },
  },
  slab: {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    show: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.9, ease: EASE_OUT } },
  },
};

// Sipario: parte coprendo il pannello e si ritrae (scale → 0) in direzione coerente.
const CURTAIN_EASE = [0.7, 0, 0.2, 1];
export const CURTAINS = {
  up: { transformOrigin: 'center top', hidden: { scaleY: 1 }, show: { scaleY: 0, transition: { duration: 0.8, ease: CURTAIN_EASE } } },
  iris: { transformOrigin: 'center center', hidden: { scale: 1, opacity: 1 }, show: { scale: 1, opacity: 0, transition: { duration: 0.7, ease: CURTAIN_EASE } } },
  barn: { transformOrigin: 'center center', hidden: { scaleX: 1 }, show: { scaleX: 0, transition: { duration: 0.8, ease: CURTAIN_EASE } } },
  diagonal: { transformOrigin: 'left center', hidden: { scaleX: 1 }, show: { scaleX: 0, transition: { duration: 0.8, ease: CURTAIN_EASE } } },
  slab: { transformOrigin: 'center bottom', hidden: { scaleY: 1 }, show: { scaleY: 0, transition: { duration: 0.85, ease: CURTAIN_EASE } } },
};
