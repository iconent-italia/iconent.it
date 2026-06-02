// Sorgente giroscopio CONDIVISA: un solo listener deviceorientation per
// tutta la pagina (le card vi si agganciano). Performance > N listener.
import { motionValue } from 'framer-motion';

export const gyroX = motionValue(0); // -0.5..0.5  (sinistra/destra, gamma)
export const gyroY = motionValue(0); // -0.5..0.5  (avanti/indietro, beta)

let started = false;

const clamp = (v) => Math.max(-0.5, Math.min(0.5, v));

export function startGyro() {
  if (started || typeof window === 'undefined') return;
  // solo su dispositivi touch (niente hover)
  if (!window.matchMedia('(hover: none)').matches) return;

  const handler = (e) => {
    if (e.gamma == null || e.beta == null) return;
    gyroX.set(clamp(e.gamma / 45));
    gyroY.set(clamp((e.beta - 45) / 45));
  };

  const DOE = typeof window.DeviceOrientationEvent !== 'undefined' ? window.DeviceOrientationEvent : null;
  if (DOE && typeof DOE.requestPermission === 'function') {
    // iOS 13+: richiede un gesto utente. Se negato/non chiamabile,
    // restiamo semplicemente statici (fallback elegante).
    DOE.requestPermission()
      .then((state) => {
        if (state === 'granted') window.addEventListener('deviceorientation', handler);
      })
      .catch(() => {});
  } else if (DOE) {
    window.addEventListener('deviceorientation', handler);
  }
  started = true;
}
