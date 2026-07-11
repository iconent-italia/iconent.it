# TONY EFFE — Motion / Video Production List (Nano Banana)

Tutti i video del sito, in **ordine di priorità**. Modalità = **image-to-video** (carichi uno still
e lo animi). Specifiche default: **1080p, muto, no testo, no cut**. Palette nero + antique gold.
Cartella: `concept-app/public/artists/tony-effe/`.

Regola loop: gli **ambient/overlay** devono essere **seamless** (primo frame = ultimo). I **one-shot**
(portale, hero) possono non loopare.

---

## ⭐ PRIORITÀ 1 — i due momenti firma

### 1. `portal/portal-flythrough.mp4` — apertura (Colosseo ologramma)
Carica lo still del **Colosseo ologramma**. One-shot ~5s.
> Animate: slow cinematic dolly forward through the central arch of this holographic gold Colosseum;
> the glowing wireframe arches sweep past in parallax, scanlines and gold particles streak by, the
> hologram flickers subtly, opening into pure black void at the end. ~5s, no cuts, premium camera move,
> ends near-black with gold haze.

### 2. `motion/hero.mp4` — hero (busto, catena "17")
Carica `hero.jpg` (la sua foto regradata nel void). Loop ~8s, sottile (sembra "vivo").
> Animate this still into a seamless 8s loop: very slow cinematic dolly-in, drifting volumetric gold
> fog, the heavy gold chain and the "17" pendant sway about 1 cm and catch a shimmer of light, faint
> gold dust floats up, the figure breathes almost imperceptibly. No camera cut, loopable, keep the exact
> identity, palette and grain.

---

## ⭐ PRIORITÀ 2 — overlay transizioni (L3)
**Fondo NERO puro**, particelle/luce soltanto, **screen-blend**, 0.6–1.2s, `.webm`. Cartella `motion/`.
(Questi sono i "texture FX" che scattano all'istante del cambio tab — vedi `tony-effe-transitions.md`.)

| File | Tab dove serve | Prompt (image-to-video da uno still nero o text-to-video) |
|---|---|---|
| `tx-gold-dust.webm` | Intro→Manifesto | *A trail of fine gold dust sweeps left-to-right across a pure black frame and dissipates, high-contrast particles only, 1.2s, seamless.* |
| `tx-refraction.webm` | Manifesto→Music | *Prismatic diamond refraction streaks bloom and fade over pure black, thin gold/white caustic lines, 0.8s.* |
| `tx-marble-crack.webm` | Manifesto→Music | *A hairline crack races across black marble with a faint gold edge, 0.6s.* |
| `tx-chain.webm` | Music→Tour | *Gold Cuban-link chain segments swipe across a black frame and scatter, 0.8s.* |
| `tx-concrete-slab.webm` | Tour→Merch | *Beige concrete dust puffs along a horizontal edge over dark, heavy and matte, no gold, 0.8s.* |
| `tx-lens-flare.webm` (opz.) | Merch→Visuals | *A single horizontal anamorphic gold lens-flare streak crosses pure black, 0.6s.* |

---

## PRIORITÀ 3 — ambient / extra (opzionali, alzano la qualità)

### `motion/portrait-holo.webm` — ologramma del ritratto (Beat 4 apertura)
*Se il builder NON lo fa via shader*, generalo come video. Carica `portrait.jpg`. Loop ~6s.
> Animate this portrait as a holographic projection: it builds up from the bottom in horizontal
> scanlines, glowing antique-gold rim light on the edges, subtle flicker and micro RGB-split, faint
> floating gold particles, the figure gently bobs. Pure black background, seamless loop. Keep the identity.

### `portal/portal-idle.webm` — fondo dentro il void (mentre c'è il nome)
Loop 8s near-static.
> Seamless 8s loop, near-static: slow drifting gold dust and faint volumetric fog over a black void,
> distant holographic arches breathing with a subtle gold flicker. No camera cut, very subtle.

### `portal/portal-exit.mp4` — chiusura sul CTA (la camera esce)
One-shot ~4s.
> Reverse dolly: the camera pulls back out through the holographic Colosseum arch into the black void,
> the gold wireframe facade recedes and fades. ~4s, slow and final.

### `music/cover-loop.webm` (opz.) — cover ICON che "respira"
Carica `music-cover.jpg`. Loop 6s.
> Very subtle seamless loop: faint gold light shifts across the concrete album cover, soft dust,
> almost-static, premium. No camera move beyond a 1% slow zoom.

---

## Specifiche tecniche & consegna
- **Risoluzione:** 1080p (portal/hero anche più alto se possibile). **Muto.** **No testo.**
- **Durata:** overlay 0.6–1.2s · hero/ambient 6–8s loop · portale 4–5s one-shot.
- **Loop seamless** per hero, portrait-holo, idle, cover (primo frame = ultimo). Portale/exit no.
- **Overlay = fondo nero** (vanno in `mix-blend: screen`, il nero sparisce).
- **Formato:** `.webm` (VP9) per gli overlay/loop (leggeri); `.mp4` (H.264) per portale/hero.
- **Peso:** punta < 2–3 MB per gli overlay, < 6–8 MB per portale/hero (sono concept, niente 4K pesante).
- **Coerenza:** stessa luce oro e grana ovunque; usa l'hero come riferimento di grading.

## Ordine consigliato di produzione
1. `portal-flythrough` (apertura) → 2. `hero.mp4` → 3. i 5 `tx-*` overlay → 4. opzionali.
Genera 1 e 2, mandameli: controllo grana/loop/nero prima di procedere col resto.
