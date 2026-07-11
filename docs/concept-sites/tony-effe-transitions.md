# TONY EFFE — Architettura Transizioni (per filo e per segno)

Spec implementabile per il builder. Ogni transizione è scomposta in **layer**, con tempi,
easing, comportamento del 3D, audio e fallback. Radicata sull'iconografia reale: **Colosseo,
ciondolo "17", 777 (DPG), diamanti/catene, inversione cemento = cover ICON**.

---

## A. Grammatica comune (le 5 corsie di OGNI transizione)

Ogni stacco è composto sempre dagli stessi 5 layer. Cambia il "riempimento", non la struttura.

| Layer | Cos'è | Guidato da | Note |
|---|---|---|---|
| **L0 · Scena 3D** | il ciondolo 17 + 777 + anello Colosseo | **scroll progress (continuo)** | NON si taglia mai: morpha di continuo |
| **L1 · Reveal** | clip-path del contenuto del pannello in arrivo | in-view (Framer `whileInView`) | `REVEALS[tx]` |
| **L2 · Sipario** | foglio in accent che si ritrae | in-view | `CURTAINS[tx]` |
| **L3 · FX texture** | overlay MP4 (screen-blend) + RGB-split 1 frame | boundary progress | Nano Banana, fondo nero |
| **L4 · Tipografia** | entrata cinetica del titolo nuovo | in-view (stagger) | |

**Token di easing**
- `EASE_OUT = cubic-bezier(0.16, 1, 0.30, 1)` → reveal/tipografia (expo-out, elegante)
- `EASE_CURTAIN = cubic-bezier(0.70, 0, 0.20, 1)` → sipari (in-out deciso)
- `EASE_SNAP = cubic-bezier(0.85, 0, 0.15, 1)` → glitch/RGB istantaneo

**Regole d'oro**
- Budget per transizione **900–1100ms**. Glitch/RGB solo **60–120ms** all'istante del cambio (no epilessia).
- L0 (3D) è **continuo** sullo scroll; L1–L4 **scattano** quando il pannello entra. Questo dà il
  contrasto "morbido sotto / netto sopra" che fa sembrare tutto orchestrato.
- Palette sempre nero+oro, TRANNE l'inversione cemento del Merch (unico stacco chiaro).

**Mappa scroll → pannello** (8 pannelli, `progress = i/7`):
`00 Intro 0.00 · 01 Manifesto 0.143 · 02 Music 0.286 · 03 Tour 0.429 · 04 Merch 0.571 ·
05 Visuals 0.714 · 06 Fan 0.857 · 07 CTA 1.00`. Una transizione k è centrata a `(k+0.5)/7`.

---

## B. Timeline morph del 3D (L0) — gli "stati" del ciondolo 17

Il builder estende `IconPendant` per leggere `progress` e interpolare tra questi keyframe (lerp):

| progress | Pannello | Stato del ciondolo 17 | 777 | Anello Colosseo | Materiale |
|---|---|---|---|---|---|
| 0.00 | Intro | si assembla da schegge, scala 0→1 | fioco 0.3 | piatto → si inclina | oro lucido |
| 0.143 | Manifesto | rotazione lenta, caustiche sul testo | brillante 0.6, orbita +veloce | inclinato | oro |
| 0.286 | Music | al centro-fronte, **pulsa a battito** | recede 0.3 | arretra | oro, "17" max |
| 0.429 | Tour | sale come **medaglione/SPQR** (y +0.4) | 0.3 | **si allarga** (r 2.7→3.1) | oro |
| 0.571 | Merch | **smaterializza in cemento** | off | diventa impalcatura | **béton beige** |
| 0.714 | Visuals | facce **rifrangono** (caleidoscopio) | 0.2 | normale | oro **riacceso** |
| 0.857 | Fan | collassa in **1 punto di luce** (battito) | off | si spegne | bloom |
| 1.00 | CTA | **si blocca**, fermo, oro pieno, museum-lit | 0.15 | fermo | oro |

---

## C. Le 7 transizioni, una per una

> Formato: **idea → L0 3D → L1 reveal → L2 sipario → L3 FX → L4 tipo → audio → fallback → asset**.
> `tx` = chiave già presente in `lib/motion.js` (oppure NEW = da aggiungere).

### T0 · PORTALE COLOSSEO (apertura cinematografica 00) ⭐⭐
- **Idea:** la camera **entra dentro il Colosseo** attraversando l'arco centrale; dentro, nel void,
  si compone **TONY EFFE**; poi **proietta la sua foto in ologramma**; infine si forma il ciondolo 17.
  È il momento "wow". Sequenza ~4.5s, guidata da un **clock d'intro** (non dallo scroll); allo
  scadere passa il controllo allo scroll-progress (handoff morbido).

**Beat-by-beat (timeline d'intro):**
- **Beat 1 — Avvicinamento (0–1.2s):** nero → dalla foschia oro emerge la **facciata del Colosseo**
  di fronte (archi su 2–3 livelli), rim-light oro, iscrizione latina incisa fioca. La camera è
  ferma e poi inizia ad avanzare (`camera.z` 8→…). Vignette stretta.
- **Beat 2 — Ingresso nell'arco (1.2–2.4s):** la camera **attraversa l'arco centrale**: gli archi
  scorrono ai lati in **parallasse** (passano oltre lo schermo), streak di **polvere d'oro** e
  leggero motion-blur radiale. Sensazione di "entrare dentro". (`camera.z` → 0, poi si stabilizza a 6.)
- **Beat 3 — Il nome (2.0–3.2s):** ora siamo in un **void nero infinito**. **TONY EFFE** si costruisce
  in 3D (extrude/scramble), oro, con i **777** fiochi dietro. Possibile incisione "latina" sul
  pavimento del void che si allontana in prospettiva.
- **Beat 4 — Ologramma (3.0–4.4s):** da un punto a terra **si proietta la foto di Tony in ologramma**
  (vedi spec sotto): si **costruisce dal basso verso l'alto** a scanline, **rim oro fresnel**,
  flicker, micro RGB-split. Fluttua accanto/dietro al nome.
- **Beat 5 — Riposo (4.4s+):** il **ciondolo 17** si forma davanti (da schegge), `Sparkles` on,
  appaiono kicker `NUOVO ALBUM · ICON` e `↓ SCROLL`. Parte il loop idle (rotazione lenta, flicker
  ologramma, polvere). **Da qui lo scroll prende il comando** → Manifesto (T1).
- **L3:** glitch solo all'attraversamento dell'arco (Beat 2, RGB ≤120ms) e all'accensione
  dell'ologramma (Beat 4).
- **Audio (se attivato):** rumble grave in avvicinamento → "boom" sub all'ingresso nell'arco →
  shimmer cristallino all'accensione dell'ologramma.
- **Fallback (reduced/mobile):** **niente fly-through**. Immagine statica della facciata Colosseo in
  oro (o solo il glow), nome in fade, ologramma sostituito dal `PixelPortrait` statico. Zero blur/RGB.

> **Nota motivo riutilizzabile:** il "portale" e l'**ologramma** non sono solo per l'intro — l'ologramma
> ritorna come trattamento del ritratto in Manifesto/Visuals, e il portale può richiudersi sul **CTA
> finale** (la camera **esce** dall'arco) per chiudere il cerchio narrativo.

### T1 · INTRO → MANIFESTO — "polvere d'oro" (`tx="up"`)
- **Idea:** una scia di polvere d'oro attraversa e svela la frase manifesto.
- **L0:** `rotation.x` eased 0→0.6·progress; 777 brillano a 0.6 e accelerano l'orbita per ~600ms.
- **L1:** contenuto manifesto `inset(0 0 100% 0)→0` (up), **900ms** EASE_OUT. *(Manifesto è
  bespoke: il builder avvolge il contenuto in un wrapper reveal.)*
- **L2:** foglio oro `scaleY 1→0` origin **top**, 800ms EASE_CURTAIN.
- **L3:** MP4 **gold-dust** L→R, screen-blend, 1200ms (picco opacità 0.5 a metà). RGB-split **90ms**
  sull'H2 (text-shadow ciano/rosso ±3px → 0).
- **L4:** parole della frase **rise+blur** stagger 60ms.
- **Audio:** swell grave 1s.
- **Asset:** `motion/tx-gold-dust.webm`.

### T2 · MANIFESTO → MUSIC — "rifrazione + iris" (`tx="iris"`) ⭐
- **Idea:** il diamante rifrange e si **apre a cerchio** (iris) sull'album ICON.
- **L0:** pendant scala 1→1.15 e va al centro-fronte; burst di caustiche; "17" al massimo.
  All'istante: **separazione cromatica** delle facce poi snap-back (EASE_SNAP, 100ms).
- **L1:** `circle(0%→150% at 50% 50%)` **iris**, 1000ms EASE_OUT.
- **L2:** radiale accent, opacity 1→0 (scala ferma), 700ms.
- **L3:** MP4 **refraction** (streaks prismatici) 600ms + **marble-crack** che spacca lo schermo
  150ms PRIMA dell'apertura iris; RGB 100ms.
- **L4:** titolo `ICON` letterspacing-in; **barre EQ** crescono da altezza 0 (stagger).
- **Audio:** se ON, il loop va in primo piano (fade 300ms) e **l'iris si apre sul primo downbeat**;
  da qui il pulse del 3D segue il basso (AnalyserNode).
- **Asset:** `motion/tx-refraction.webm`, `motion/tx-marble-crack.webm`.

### T3 · MUSIC → TOUR — "maglie di catena + barn-door" (`tx="barn"`)
- **Idea:** il 17 si **scompone in maglie di catena** che scorrono; le ante si aprono su Roma.
- **L0:** il pendant "esplode" in ~8 segmenti di catena cubana che vorticano e si **riassemblano**
  in un **medaglione** che sale (y +0.4). Anello Colosseo r 2.7→3.1 per "abbracciare" la lista.
- **L1:** barn-door `inset(0 50% 0 50%)→0`, 900ms.
- **L2:** due pannelli accent che si aprono L/R (scaleX da centro).
- **L3:** MP4 **chain** swipe (maglie oro) 700ms + **foschia oro** che sale dal basso (luce
  d'anfiteatro, radiale CSS che cresce); RGB 90ms.
- **L4:** `TOUR 2026` in barn; le righe-data **slittano da lati alternati** stagger 80ms, hairline
  che si "disegna" L→R.
- **Audio:** colpo d'impatto grave all'apertura delle ante.
- **Asset:** `motion/tx-chain.webm`.

### T4 · TOUR → MERCH — "lastra di cemento / INVERSIONE" (`tx="slab"`, `invert`) ⭐
- **Idea:** una **lastra di cemento** scivola, copre e svela il pannello **beige** (cita la cover ICON).
- **L0:** il pendant **smaterializza oro→cemento**: `metalness 1→0.1`, `roughness 0.12→0.9`,
  color oro→`#cfc6b8` in 600ms; anello → impalcatura (emissive off); rotazione rallenta.
- **L1:** slab `inset(100% 0 0 0)→0`, 900ms.
- **L2:** **sipario cemento beige** (`.invert .tx-curtain`) `scaleY 1→0` origin **bottom**, 850ms.
- **L3:** sbuffo di **polvere di cemento** sul bordo della lastra; **screen-shake 2px / 120ms**
  all'impatto ("thunk"); **niente oro** qui. Crossfade delle CSS var (`--accent/--bg/--fg`) in 500ms
  per evitare il flip secco.
- **L4:** `SHOP THE DROP` scuro su beige; card prodotto **cadono** con tilt 3D + ombra, stagger
  90ms (ease "gravità").
- **Audio:** **thud** sordo + la musica fa **ducking −3dB** nella sezione chiara.
- **Asset:** `motion/tx-concrete-slab.webm` (polvere beige).

### T5 · MERCH → VISUALS — "ritorno al void + diagonale" (`tx="diagonal"`)
- **Idea:** la lastra risale, il void nero torna, il 17 **riaccende l'oro**; reveal diagonale cinematografico.
- **L0:** cemento→oro **riacceso** (lerp inverso 600ms); le facce iniziano a rifrangere (prep caleidoscopio).
- **L1:** wipe **diagonale** `polygon`, 900ms (feel anamorfico).
- **L2:** foglio accent scuro, scaleX da **left**, 800ms.
- **L3:** una **lens-flare oro anamorfica** attraversa in orizzontale mentre passa la diagonale;
  bump di grana film; RGB 90ms.
- **L4:** `VISUALS` + thumbnail entrano con scala 1.05→1 + micro-glitch pronto all'hover.
- **Audio:** filter-sweep (low-pass che apre) 600ms col ritorno del void.
- **Asset:** `motion/tx-lens-flare.webm` (opzionale; altrimenti CSS gradient streak).

### T6 · VISUALS → FAN WORLD — "collasso di luce + iris" (`tx="iris"`)
- **Idea:** le rifrazioni **collassano in UN punto di luce** (battito), da cui rinasce il pannello.
- **L0:** le facce caleidoscopio **convergono** in un punto centrale (scala→0.2, bloom su), hold
  200ms (heartbeat), poi riespandono nel pendant.
- **L1:** **iris** dal punto esatto centrale `circle(0→150%)`, 1000ms — il pannello "nasce" dalla luce.
- **L2:** nero con micro-core accent, opacity out 700ms.
- **L3:** **bloom flash** bianco-oro 120ms alla convergenza; **due battiti** (scala 1→1.06→1) su tutta la scena.
- **L4:** `ENTRA NEL MONDO` fade-up; underline del campo email che si "disegna".
- **Audio:** due **thump** di cuore sincronizzati ai battiti, poi pad ambient.

### T7 · FAN WORLD → CTA — "lock statico" (`tx="up"`)
- **Idea:** il gem **si blocca**, smette di ruotare, oro pieno: chiusura definitiva, sobria.
- **L0:** rotazione **smorzata a 0** (~800ms damped), pendant centrato, oro pieno, museum-light su;
  777 a 0.15, anello si ferma.
- **L1:** clip `up` semplice, 900ms — calmo, nessun gimmick (è il finale).
- **L2:** foglio oro scaleY out top, lento 900ms.
- **L3:** **minimale** — la vignette si chiude un filo; ultimo deposito di polvere d'oro. **Nessun glitch.**
- **L4:** claim sale; bordo del bottone ICONENT che si disegna; disclaimer in fade per ultimo.
- **Audio:** la musica **risolve/sfuma** in 2s; chime soffuso sull'hover del bottone.

---

## D. Cosa ESISTE già vs cosa è NUOVO (per il builder)

**Già fatto (commit `0a82aa9`):**
- `REVEALS`/`CURTAINS` con `up · iris · barn · slab · diagonal` (+ `.tx-curtain` CSS, beige in `.invert`).
- `IconPendant` base: gem 17 + 777 + anello Colosseo + sparkles; `progress` → scala/inclinazione.

**Da aggiungere (NEW):**
1. **Morph materiale/posizione del 3D** per progress-range: inversione cemento (T4) e riaccensione
   (T5), assemble-da-schegge (T0), chain-explode/riassemblaggio (T3), collasso-luce (T6),
   damped-stop (T7). → estendere `IconPendant` con lerp su keyframe (tabella B).
2. **`TransitionFX.jsx`** — layer L3: monta l'MP4 giusto (screen-blend) + RGB-split quando
   `progress ∈ [boundary−0.06, boundary+0.06]`; un piccolo `useActiveBoundary(progress)`.
3. **Reveal wrapper** per i pannelli bespoke (Intro/Manifesto).
4. **Audio:** `SoundToggle` + `useAudioAnalyser` (beat → pulse 3D + EQ), ducking sul Merch.
5. **Crossfade CSS var** per l'inversione (no flip secco).
6. **Portale Colosseo + rig camera** (T0) e **shader ologramma** del ritratto → sezione D-bis.

---

## D-bis. Portale Colosseo + Ologramma (elementi nuovi pesanti)

### 1) Facciata Colosseo + fly-through (`ColosseumPortal.jsx`, dentro il Canvas)
- **Geometria:** facciata frontale ad **archi** su 2–3 file. MVP = `Instances` di archi (estrusione di
  una forma ad arco, o box con foro) disposti a griglia curva; oppure un **modello GLB** leggero di
  un colonnato (se trovi un asset CC0). Materiale oro: `meshStandardMaterial` metalness 0.9,
  roughness 0.4, emissive accent 0.04. Foschia: `fog` della scena o `<Sparkles>` radi.
- **Camera rig:** un **clock d'intro** (`useRef` + `useFrame` con `clock.elapsedTime`, NON lo scroll)
  anima `camera.position.z` 8 → 0 → 6 con easing (Beat 1→2). Gli archi sono a z∈[1,4] così
  "passano" ai lati durante l'attraversamento. A `t > ~2.4s` il portale si **smonta/fade** e il
  controllo torna a `useScrollProgress`. Flag `introDone` in state per l'handoff.
- **Performance:** il portale vive solo nell'intro; smontarlo dopo. Su mobile/reduced → non montarlo,
  usare sfondo statico.

### 2) Ologramma del ritratto (`HologramPortrait.jsx`)
- **Base:** un `mesh` con `planeGeometry` ratio del ritratto + **`shaderMaterial`** custom
  (transparent, `blending: AdditiveBlending`, `depthWrite:false`). Texture = la foto regradata.
- **Uniforms / effetti:**
  - `uReveal` 0→1 (build **dal basso verso l'alto**): scopre la texture per riga `step(uv.y, uReveal)`
    con un **bordo luminoso oro** sulla linea di costruzione.
  - **scanline:** `sin(uv.y * 800 + time*4)` modula l'alpha (righe orizzontali in movimento).
  - **fresnel rim oro:** bordo che si illumina ai margini (rim = `pow(1 - dot(normal,viewDir), 2)`),
    colorato `accent`.
  - **RGB-split:** campiona la texture 3 volte con offset ±`uGlitch` su R e B (micro, ≤2px).
  - **flicker:** `uOpacity` con rumore temporale leggero (0.8–0.92).
  - **bob:** float verticale lieve (anche via `<Float>`).
- **Sequenza intro:** `uReveal` 0→1 in ~1.2s (Beat 4) con `uGlitch` che pulsa all'accensione poi
  cala. Dopo, loop idle: scanline + flicker + bob continui, RGB a 0.
- **Riuso:** stesso componente in Manifesto/Visuals con `uReveal=1` (già acceso) e bob/scanline idle.
- **Fallback:** se WebGL ridotto → `PixelPortrait` (canvas 2D già esistente) con reveal pixelato.
- **Asset:** `portrait.jpg` (foto reale regradata nero/oro, alto contrasto — vedi nano-banana doc).

---

## E. Asset overlay da generare (Nano Banana) — L3

Tutti: **fondo NERO puro**, 1–1.5s, loop in/out morbido, **screen-blend**, `.webm` (alpha non serve,
ci pensa lo screen). Niente testo.

- `tx-gold-dust.webm` — *A trail of fine gold dust sweeps left-to-right across a pure black frame and
  dissipates, high-contrast particles only, 1.2s, seamless.*
- `tx-refraction.webm` — *Prismatic diamond refraction streaks bloom and fade over pure black, thin
  gold/white caustic lines, 0.8s.*
- `tx-marble-crack.webm` — *A hairline crack races across black marble with a faint gold edge, 0.6s.*
- `tx-chain.webm` — *Gold Cuban-link chain segments swipe across a black frame and scatter, 0.8s.*
- `tx-concrete-slab.webm` — *Beige concrete dust puffs along a horizontal edge over dark, heavy and
  matte (no gold), 0.8s.*
- `tx-lens-flare.webm` *(opz.)* — *A single horizontal anamorphic gold lens flare streak crosses pure
  black, 0.6s.*

---

## F. Accessibilità / performance

- `prefers-reduced-motion` o mobile: L0 = gem statico o glow CSS (già nel fallback `Stage3D`); L1 =
  fade semplice; **niente** L3 (MP4/RGB), niente screen-shake, niente beat-pulse. Audio sempre opt-in.
- MP4 overlay: precaricati ma montati solo nella finestra di boundary (smontati fuori) per non pesare.
- Glitch/RGB sempre ≤120ms; nessuna animazione infinita aggressiva.
