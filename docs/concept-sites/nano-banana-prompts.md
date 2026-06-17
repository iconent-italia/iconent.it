# ICONENT — Artist Concept Sites · Nano Banana Prompt Pack

**Scopo:** generare in parallelo gli asset (still + MP4 loop) per i concept site rapper.
Stile casa = **Brutalist 3D Void** (nero profondo, un solo accent, type grottesco oversize,
nebbia/profondità cinematografica). **No neon, no viola, no gradient cheap.**

> **Diritti OK** → usiamo la **likeness reale** dell'artista: workflow primario =
> *edit da foto press* (Nano Banana regrada la foto vera nel void oro-su-nero mantenendo
> l'identità). I prompt "from scratch" restano per oggetti/merch/astratti o quando serve un
> volto ricostruito. Ogni sito è **fortemente personalizzato** sull'iconografia/territorio
> dell'artista. (I siti restano `noindex` + label "CONCEPT DEMO".)

---

## 0. Come usare Nano Banana per asset COERENTI

**Due modalità:**

- **EDIT da foto press** (primario per i volti): carichi 1–3 foto reali dell'artista e Nano
  Banana le regrada nel void oro-su-nero + aggiunge l'iconografia territoriale, **mantenendo
  l'identità**. Usa il prefisso *"Keep the exact identity and facial features of the person in
  the photo. Do not change the face."* prima del prompt.
- **FROM SCRATCH**: per oggetti, merch, cover astratte, transizioni (nessuna persona reale).

**Passi:**

1. **Definisci prima l'HERO** dell'artista (edit della miglior foto press). È l'ancora visiva.
2. Per gli altri asset con la stessa persona, **allega l'hero (o le stesse foto) come reference**
   + *"same person, same lighting, same palette, same film grain as the reference"*. È così che
   hero/portrait/visuals sembrano un'unica campagna.
3. **Aspect ratio**: dichiaralo sempre nel prompt E nell'impostazione della piattaforma.
4. **STILL → MP4**: genera lo still, poi caricalo nella modalità image-to-video con il
   prompt "Motion loop" (sez. 4). Loop 6–10s, 1080p, muto.
5. Ogni prompt finisce con il **STYLE BLOCK** (sez. 1): incollalo SEMPRE in coda.

**Nomi file** (devono combaciare con la config, vedi `concept-app/public/artists/<slug>/`):
`hero.jpg` · `portrait.jpg` · `music-cover.jpg` · `merch/hoodie.jpg` `merch/tee.jpg`
`merch/cap.jpg` · `visuals/v1.jpg` `visuals/v2.jpg` · `motion/hero.mp4`

---

## 1. STYLE BLOCK riutilizzabile (incolla in coda a OGNI prompt)

> Cinematic editorial photograph, deep matte black void background, single warm key light,
> volumetric fog, high-contrast chiaroscuro, premium luxury fashion-campaign aesthetic,
> brutalist minimalism, fine 35mm film grain, shot on 85mm f1.4, shallow depth of field,
> lots of negative space, NO text, NO logos, NO watermark, NO neon, NO purple, NO cheap
> gradients, not cartoon, not oversaturated, no plastic skin.

Per cambiare artista, sostituisci **"warm gold"** con l'accent dell'artista (tabella sez. 5)
e l'iconografia territoriale.

---

## 2. TONY EFFE — flagship (Roma · oro su nero · diamante)

**Iconografia:** Colosseo notturno, marmo + foglia d'oro, iscrizioni latine incise (stile SPQR),
catene e diamanti, lusso romano, eterno. Accent `#c9a44a`.

### hero.jpg — `2:3 vertical, >=1600px tall` · **EDIT da foto press**
> Keep the exact identity and facial features of the person in the photo. Do not change the face.
> Place him in an infinite matte black void wearing all-black tailored streetwear, heavy gold
> chains catching a single warm beam of light. Behind him, barely emerging from black fog, the
> silhouette of the **Colosseum of Rome** in antique gold rim-light; faint engraved Roman/Latin
> inscriptions etched in dark marble. Re-light him with hard gold chiaroscuro, full body, empty
> black space at the top for a title. Strictly black, charcoal and antique gold (#c9a44a).
> [+ STYLE BLOCK]

### portrait.jpg — `1:1 square` · **EDIT da foto press** (per il pixel/ASCII reveal → alto contrasto)
> Keep the exact identity and facial features of the person in the photo. Do not change the face.
> Tight three-quarter portrait, half the face lit by a hard warm gold light, the other half
> swallowed by pure black. Strong tonal contrast, sculptural shadows, a single diamond stud
> catching light, faint gold dust, pure matte black background. Maximize micro-contrast so the
> face stays readable when heavily pixelated.
> [+ STYLE BLOCK]

### music-cover.jpg — `1:1 square` (oggetto = il diamante della scena 3D)
> A single hyper-detailed faceted gold octahedron gem floating dead-center in an infinite black
> void, sharp caustic reflections, a thin engraved Latin inscription wrapping the base of the gem
> in gold leaf, volumetric fog, museum-lit. Album-cover composition, perfectly centered, generous
> black margins. No text.
> [+ STYLE BLOCK]

### merch/hoodie.jpg · merch/tee.jpg · merch/cap.jpg — `3:4 each`
Stile e-commerce "ghost mannequin" ma cinematografico-dark.
> **(hoodie)** A heavyweight pitch-black hoodie on an invisible ghost mannequin, subtle tone-on-tone
> gold embroidery of a small Roman eagle on the chest, studio shot, matte black void background,
> single soft key light, premium streetwear lookbook. 3:4 vertical, centered. [+ STYLE BLOCK]
> **(tee)** A black oversized tee on an invisible ghost mannequin, a faint engraved Latin numeral
> printed tone-on-tone, same studio lighting and black void. 3:4 vertical, centered. [+ STYLE BLOCK]
> **(cap)** A black structured cap with a tiny antique-gold metal pin, floating product shot on
> matte black void, same key light. 3:4 vertical, centered. [+ STYLE BLOCK]

### visuals/v1.jpg · visuals/v2.jpg — `16:9 each` (frame da videoclip)
> **(v1)** Cinematic film still: a black luxury car parked under a single gold streetlight on an
> empty cobblestone Roman street at night, gold fog, the Colosseum out of focus in the deep
> background. Anamorphic, moody. 16:9. [+ STYLE BLOCK]
> **(v2)** Extreme close-up film still of gold chains and a diamond pendant swinging in slow
> motion against a black-clad chest, shallow focus, gold light glints, black void. 16:9.
> [+ STYLE BLOCK]

---

## 3. Gli altri 5 — concept seed (stesso schema, cambia iconografia + accent)

Per ciascuno: rigenera **hero / portrait / music-cover / merch / visuals** col template di sez. 2,
sostituendo iconografia, accent e oggetto 3D. Idee chiave:

- **Geolier** (Napoli · blu profondo `#1b3a6b`): Stadio Maradona di notte con bagliore di
  bengala blu, **maglia azzurra del Napoli** appesa come reliquia luminosa, Vesuvio in lontananza,
  Spaccanapoli, vicoli. Oggetto 3D: cristallo blu. Hero: figura di spalle nel tunnel dello stadio,
  luce blu. Visuals: curva/tifo stilizzato, golfo di Napoli al buio.
- **Sfera Ebbasta** (trap king · magenta sobrio `#b5179e`): **collane e charms stratificati**,
  diamanti, la rosa "Rockstar", lacrime tatuate ricostruite, Milano notte. Oggetto 3D: rosa di
  cristallo / gem. Hero: figura coperta di collane, volto in ombra, una rosa che cattura luce.
- **Travis Scott** (Astroworld · ruggine/ocra `#b5651d`): deserto, polvere, **silhouette di
  rollercoaster** distorta, cactus (Cactus Jack), atmosfera distopica e calda. Oggetto 3D: forma
  che si scioglie/distorce. Hero: figura nella tempesta di sabbia ocra.
- **Drake** (OVO · oro caldo `#d4af37`): **gufo** OVO, skyline di Toronto con la CN Tower,
  oro su nero notturno, eleganza. Oggetto 3D: gufo dorato stilizzato. Hero: figura sotto pioggia
  dorata, skyline fuori fuoco.
- **Kanye West** (Yeezy · cemento/beige `#cfc6b8`): **monolite di cemento grezzo**, architettura
  brutalista, montagne del Wyoming, polvere beige, minimalismo gospel. Oggetto 3D: monolite di
  cemento. Hero: figura minuscola davanti a un monolite gigante, palette desaturata sabbia.

---

## 4. MOTION LOOP (still → MP4, sez. asset `motion/hero.mp4`)

Carica lo still **hero** dell'artista in image-to-video. Loop 6–10s, seamless, muto.

**Base (tutti):**
> Animate this still into a seamless 8-second loop: very slow cinematic dolly-in, drifting
> volumetric fog, subtle flicker of the key light, the figure breathes almost imperceptibly,
> tiny dust particles floating. No camera cut, loopable start-to-end, no new objects, keep the
> exact palette and grain of the still.

**Tocco per artista (aggiungi una riga):**
- Tony Effe: *"gold dust drifts upward, the chains sway 1cm, faint shimmer on the diamond."*
- Geolier: *"a soft blue flare glows and fades in the background like a stadium bengala."*
- Sfera: *"the layered necklaces sway gently, one magenta light leak crosses the frame once."*
- Travis: *"heat-haze distortion ripples, ocra sand blows across the lower third."*
- Drake: *"slow golden rain falls, a single light pulse like a heartbeat."*
- Kanye: *"only the beige dust moves, the monolith stays dead still, near-static and austere."*

---

## 5. TRANSIZIONI tra i pannelli (coerenti per artista)

Il movimento base è codice (clip-path wipe + leggero RGB-split all'istante del cambio).
La **texture** della transizione la fornisci con un MP4 overlay generato da Nano Banana
(fondo nero, 1–1.5s, usato in `mix-blend: screen`):

- **Tony Effe:** scia di **polvere d'oro** / crepa nel marmo che attraversa lo schermo.
- **Geolier:** sbuffo di **fumo blu / flare da stadio** che entra e svanisce.
- **Sfera:** swipe a forma di **maglia di catena** + light leak magenta.
- **Travis:** **tempesta di sabbia** ocra / distorsione da calore.
- **Drake:** **ali di gufo** / lampo dorato.
- **Kanye:** **lastra di cemento** che scorre + polvere beige.

Prompt overlay (esempio Tony Effe, adattabile):
> A trail of fine gold dust sweeps left-to-right across a pure black frame and dissipates, 1.2
> seconds, high contrast, particles only, black background for screen-blend compositing, seamless
> in/out. No text.

---

## 6. Checklist export

- [ ] Hero generato per primo, riusato come reference per gli altri asset dello stesso artista.
- [ ] Aspect ratio rispettati (hero 2:3, portrait/cover 1:1, merch 3:4, visuals 16:9).
- [ ] Palette = nero/carbone + UN accent dell'artista. Niente neon/viola/gradient.
- [ ] Portrait ad alto contrasto (per il pixel-reveal).
- [ ] Immagini ≤1920px, JPG/WebP. MP4 6–10s, 1080p, muto, loop.
- [ ] File rinominati esattamente come la config (`hero.jpg`, `merch/hoodie.jpg`, …).
