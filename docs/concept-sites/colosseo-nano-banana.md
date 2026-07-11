# TONY EFFE — Portale Colosseo · Nano Banana Pack

Asset per la sequenza d'apertura (T0 in `tony-effe-transitions.md`): la camera **entra dentro il
Colosseo**, nel void compare **TONY EFFE**, poi l'**ologramma**. Palette **nero + antique gold
`#c9a44a`**, cinematografico, brutalista, premium. **No neon, no viola, no gradient cheap.**

> ## ⭐ DIREZIONE SCELTA: COLOSSEO OLOGRAMMA (non in pietra)
> Il Colosseo va reso come **ologramma oro futuristico** (wireframe + scanline luminose nel void),
> NON in pietra fotorealistica. Motivi: (1) impossibile sembrare "cheap"; (2) **coerente** con
> l'ologramma del ritratto e col gem 17 → tutto il sito è un "mondo olografico oro"; (3) si fa in
> **3D wireframe** (leggero, il fly-through si anima nativamente, flicker/scanline gratis).
>
> **Implementazione consigliata = 3D wireframe** (`ColosseumPortal.jsx`): geometria ad archi con
> material **wireframe/emissive oro** + shader scanline + bloom + particelle; la camera attraversa
> l'arco (Beat 2). Nano Banana serve per il **look di riferimento + fallback mobile**, non come asset
> obbligatorio.
>
> **Prompt still — Colosseo ologramma (riferimento/fallback):**
> > A holographic projection of the Roman Colosseum floating in an infinite black void — architecture
> > as glowing antique-gold wireframe and translucent light, fine horizontal scanlines, luminous edges,
> > volumetric haze, floating gold particles, subtle flicker. Futuristic but elegant and premium (a
> > luxury light projection, NOT neon sci-fi). Frontal three arches, central arch opening into deeper
> > black, vast black negative space, soft warm-white core glow. Palette black + antique gold (#c9a44a).
> > Negative: solid stone, photoreal walls, daylight, cyan, neon, blue, text, tourists.
>
> **Prompt motion — fly-through ologramma (carica lo still):**
> > Animate: slow cinematic dolly forward through the central arch of this holographic gold Colosseum;
> > glowing wireframe arches sweep past in parallax, scanlines and gold particles streak by, the
> > hologram flickers subtly, opening into pure black void at the end. ~5s, no cuts, premium.
>
> ---
>
> *I prompt fotorealistici qui sotto restano come ALTERNATIVA (se mai si volesse il Colosseo "vero").*

> **Strategia (versione fotorealistica, alternativa):** generare gli **still** (facciata → arco →
> interno) e poi animare lo **still facciata in un MP4 dolly-in** (image-to-video).

> **Testo "TONY EFFE":** NON generarlo dentro l'immagine (Nano Banana sbaglia le scritte). Il nome
> lo mette il layer 3D sopra. Le iscrizioni latine generale pure: fanno solo texture, illeggibili va bene.

**STYLE BLOCK** (incolla in coda a ogni prompt):
> Cinematic establishing shot, deep matte black sky and void, single warm antique-gold key light,
> heavy volumetric fog, high-contrast chiaroscuro, brutalist premium aesthetic, fine 35mm film grain,
> anamorphic, shallow depth of field, palette strictly black charcoal and antique gold (#c9a44a),
> photorealistic, NO neon, NO purple, NO cheap gradients, NO modern signage, NO text, NO watermark,
> no tourists, no daylight.

**Nomi file** → `concept-app/public/artists/tony-effe/portal/`

---

## 1) STILL — `colosseo-facade.jpg` · 16:9 (+ variante 9:16 mobile)
Avvicinamento (Beat 1) e **fallback statico** mobile.
> The Roman Colosseum at night, shot frontally and slightly low, emerging from black fog. Only the
> central arches are lit by warm antique-gold rim light; the rest dissolves into pure black. Faint
> eroded Latin inscriptions on the stone. Empty, monumental, cinematic, deep negative space of black
> sky above for a title. Photoreal, dramatic single-source gold lighting.
> [+ STYLE BLOCK]

Variante mobile: stessa scena **9:16 verticale**, l'arco centrale centrato, più cielo nero in alto.

---

## 2) STILL — `colosseo-arch-pov.jpg` · 16:9
Il momento dell'ingresso (Beat 2): in piedi davanti all'**arco centrale**, sul punto di entrare.
> First-person point of view standing right in front of one central arch of the Roman Colosseum at
> night, the stone archway framing the shot on all sides, an infinite dark void beyond the arch with
> warm gold haze spilling out toward the camera. We are about to walk through. Strong depth, the arch
> edges catch antique-gold light, everything else black. Photoreal, immersive, wide lens.
> [+ STYLE BLOCK]

---

## 3) STILL — `colosseo-interior-void.jpg` · 16:9
Dentro (Beat 3): gli archi incorniciano un **void nero infinito** dove comparirà il nome.
> Interior of the Roman Colosseum reimagined as an infinite black void: a ring of stone arches
> recedes into darkness, lit only by thin antique-gold rim light and floating gold dust. The ground
> is dark polished marble with faint engraved Latin letters catching gold, vanishing toward a black
> horizon. Centered, symmetrical, vast empty space in the middle for a 3D title. Photoreal, moody.
> [+ STYLE BLOCK]

---

## 4) STILL (opz.) — `colosseo-floor.jpg` · 16:9
Il "pavimento che fugge in prospettiva" sotto il nome.
> Low-angle perspective of a dark marble floor receding into black, engraved with eroded Latin / SPQR
> inscriptions filled with thin antique-gold leaf, faint gold dust, single warm grazing light. Empty,
> abstract, vanishing to a black horizon. Photoreal, premium.
> [+ STYLE BLOCK]

---

## 5) MOTION — `portal-flythrough.mp4` (image-to-video) ⭐ IL portale
Carica **`colosseo-facade.jpg`** come primo frame e anima il dolly-in.
> Animate this still: a slow, smooth cinematic dolly forward, the camera advances toward the central
> arch of the Colosseum and passes through it; the arches sweep past the left and right edges in
> parallax; volumetric gold dust streaks past; the scene opens into an infinite black void at the end.
> No cuts, no people, steady premium camera move, ~5 seconds, ends on near-black with gold haze.

Se il modello fatica a "entrare", spezza in due:
- **A — avvicinamento:** *slow dolly-in toward the central arch, fog drifting, gold rim flickering, ends
  with the arch filling the frame.* (primo frame: `colosseo-facade.jpg`)
- **B — attraversamento:** *push straight through the dark archway into a black void, the stone edges
  blur past, gold dust streaks, ends on black with gold haze.* (primo frame: `colosseo-arch-pov.jpg`)

Il builder concatena A+B (o A→still nome→ologramma).

---

## 6) MOTION (opz.) — `portal-idle.mp4`
Loop di sfondo dentro il void mentre c'è il nome (se non lo fa il 3D).
> Seamless 8s loop, near-static: slow drifting gold dust and faint volumetric fog over a black void,
> the distant arches barely breathing with a subtle gold light flicker. No camera cut, very subtle.

---

## 7) CHIUSURA (opz.) — `portal-exit.mp4`
Per il CTA finale (la camera **esce** dall'arco, chiude il cerchio).
> Reverse dolly: the camera pulls back out through the Colosseum arch into the night, the facade
> recedes into black fog, gold rim fading. ~4s, slow and final, ends on the full facade tiny in black.

---

## Checklist
- [ ] Genera 1 → 3 (facciata, arco POV, interno) coerenti: usa la **facciata come reference** per le altre
      (*"same Colosseum, same gold lighting, same fog"*).
- [ ] Anima la facciata → `portal-flythrough.mp4` (o A+B).
- [ ] 16:9 per desktop + **9:16** della facciata per mobile/fallback.
- [ ] Niente testo nelle immagini (il nome è 3D), niente neon/giorno/turisti.
- [ ] File in `public/artists/tony-effe/portal/`, ≤1920px le immagini, MP4 1080p muto.
