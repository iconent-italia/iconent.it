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
