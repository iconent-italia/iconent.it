# TONY EFFE — Concept Visual & 3D Storyboard (flagship)

**Mondo dell'artista (dalle sue foto/album reali):** brutalismo in **cemento grezzo** + **arte
barocca** alla Caravaggio + **diamanti / catene cubane** + **Roma** + Balenciaga.
Riferimento chiave: la sua vera cover **ICON** (stanza di cemento, dipinto barocco, sedia Eames).

**Palette:** nero/carbone + **antique gold `#c9a44a`**. Un'unica inversione → **cemento beige
`#cfc6b8`** nel pannello Merch (citazione diretta della cover ICON).

**Oggetto 3D persistente = il ciondolo "17" in diamanti** (la sua firma reale), non un gem
generico. Faccettato, oro+diamante, rifrange luce calda. Si trasforma tra i pannelli guidato
dallo scroll (un'unica scena R3F, `object3D: "diamond"` → lo rinominiamo concettualmente "ICON-17").

**Asset reali da usare** (in `/Users/kenzo/Desktop/foto siti/`, da rinominare in
`concept-app/public/artists/tony-effe/`):

| File sorgente | Uso | Nome finale |
|---|---|---|
| `tony effe.jpg` (busto, catena 17, Balenciaga) | HERO | `hero.jpg` |
| `TONY-effe-819x1024 (1).webp` (ritratto fondo bianco) | PORTRAIT / pixel-reveal | `portrait.jpg` |
| `tony-effe-ICON-cover.jpeg` (cover ICON cemento) | MUSIC cover | `music-cover.jpg` |
| (genera) hoodie/tee/cap neri | MERCH | `merch/*.jpg` |
| (genera) frame videoclip | VISUALS | `visuals/v*.jpg` |

---

## Storyboard pannello-per-pannello (3D + transizione + copy + audio)

Legenda: **3D** = stato del ciondolo 17 · **IN/OUT** = transizione d'ingresso/uscita · **Asset**.

### 00 · INTRO — "il nome si forma"
- **Visual:** void nero, foschia oro bassa. Hero (busto, catena 17) entra dal basso in
  chiaroscuro duro. Nome **TONY EFFE** in grottesco oversize che si compone lettera per lettera.
- **3D:** il ciondolo 17 si **assembla da schegge di diamante** che volano in posizione (mentre
  il nome si compone). Lento spin.
- **OUT → 01:** **scia di polvere d'oro** che attraversa lo schermo L→R + clip-path wipe verso l'alto.
- **Copy:** kicker `NUOVO ALBUM · ICON` · `↓ SCROLL`.
- **Audio:** parte muto; appare il toggle `◢ SOUND`. (vedi sez. Audio)
- **Asset:** `hero.jpg`.

### 01 · MANIFESTO — "una riga che lo definisce"
- **Visual:** schermo quasi vuoto, una sola frase enorme. Il 17 ruota piano dietro al testo,
  sfocato (bokeh oro).
- **3D:** rotazione lenta, le faccette mandano **caustiche dorate** sul testo.
- **IN:** il testo sale (rise) mentre il wipe d'oro si chiude.
- **OUT → 02:** **rifrazione diamante** → micro **RGB-split** all'istante del cambio + crepa nel marmo.
- **Copy:** `UNCOMPROMISING. RARE. ETERNO.` (oppure la tua tagline ufficiale ICON).

### 02 · MUSIC / ICON ⭐ — "ultimo drop + player"
- **Visual:** la cover **ICON** reale (cemento) a sinistra; a destra titolo `ICON` + link
  streaming + PRE-SAVE. **Barre EQ** reattive all'audio (Web Audio API) in oro.
- **3D:** il 17 si posiziona come **core dell'album**, pulsa a tempo col basso (beat-reactive).
- **IN:** crossfade dal nero; la cover si "stampa" sul cemento.
- **OUT → 03:** il 17 si **scompone in maglie di catena** che scorrono via.
- **Copy:** kicker `02 · ULTIMO DROP` · `SPOTIFY → / APPLE → / YOUTUBE → / PRE-SAVE →`.
- **Audio:** ⭐ qui l'audio ha senso pieno → se l'utente ha attivato il suono, il loop è in primo piano.
- **Asset:** `music-cover.jpg` + `audio/icon-loop.mp3`.

### 03 · TOUR / BIGLIETTI ⭐ — "Roma e le date"
- **Visual:** lista date in stile lapide/insegna. Sullo sfondo, fuori fuoco, il **Colosseo** in
  rim-light oro nella foschia. Iscrizioni latine incise.
- **3D:** il 17 ruota lento, sospeso come **medaglione/SPQR** sopra la lista.
- **IN:** **fumo/luce** che sale dal basso (anfiteatro).
- **OUT → 04:** **lastra di cemento** scorre e copre lo schermo → inversione al beige.
- **Copy:** `TOUR 2026` · MILANO/ROMA/NAPOLI · `TICKETS →` / `SOLD OUT`.

### 04 · MERCH ⭐ — "lo shop" (PANNELLO INVERTITO → cemento beige, cita ICON)
- **Visual:** fondo **cemento beige** (come la stanza ICON), prodotti neri Balenciaga-style su
  ghost mannequin, hover 3D-tilt. Testo nero su beige.
- **3D:** il 17 diventa **opaco/cemento** (materiale béton), perde l'oro: contrasto brutalista.
- **IN:** la lastra di cemento si ferma; i prodotti "cadono" in griglia (stagger).
- **OUT → 05:** la lastra **risale**, il void nero torna, il 17 **ri-accende l'oro**.
- **Copy:** `SHOP THE DROP` · ICON HOODIE €90 / CHAIN TEE €45 / CAP GOLD €35.
- **Asset:** `merch/hoodie.jpg`, `merch/tee.jpg`, `merch/cap.jpg`.

### 05 · VISUALS / VIDEO — "mostra il motion"
- **Visual:** griglia di frame da videoclip (auto notturna su sampietrini, close-up catene/diamanti).
  Hover → `▶ PLAY`.
- **3D:** il 17 si **moltiplica in rifrazioni** che incorniciano i video (caleidoscopio sobrio).
- **IN:** i frame entrano con micro-glitch.
- **OUT → 06:** le rifrazioni collassano in **un solo punto di luce** (battito).
- **Asset:** `visuals/v1.jpg`, `visuals/v2.jpg`.

### 06 · FAN WORLD — "entra nel mondo"
- **Visual:** schermo nero, una frase + form email. Il 17 al centro **pulsa come un cuore**.
- **3D:** battito lento del gem, foschia oro che respira.
- **IN:** dal punto di luce della 05 si riapre il gem.
- **OUT → 07:** il gem **si blocca**, smette di ruotare (fermo, definitivo).
- **Copy:** `ENTRA NEL MONDO` · input email · `JOIN →`.

### 07 · CTA ICONENT — "vuoi un sito così?"
- **Visual:** il 17 fermo, oro pieno, museum-lit. Claim + bottone ICONENT + disclaimer.
- **3D:** statico, leggerissimo float.
- **Copy:** `VUOI UN SITO COSÌ PER IL TUO PROGETTO?` · `ICONENT · CONTATTACI →` ·
  `CONCEPT DEMO · non affiliato · realizzato da ICONENT`.

---

## Linguaggio transizioni (riassunto, coerente Tony Effe)

Tutte = clip-path wipe + **micro RGB-split** (1 frame) + una **texture oro** in overlay
(`mix-blend: screen`, MP4 1–1.5s da Nano Banana). Varianti per stacco:
`polvere d'oro` (00→01) · `rifrazione diamante + crepa marmo` (01→02) · `maglie di catena`
(02→03) · `lastra di cemento` (03→04 e 04→05, andata/ritorno) · `glitch + collasso di luce`
(05→06) · `lock` statico (06→07). **Niente epilessia:** glitch solo all'istante del cambio.

---

## AUDIO — musica nel sito (con diritti)

**Asset:** un loop strumentale/bassline di un brano Tony Effe con diritti →
`public/artists/tony-effe/audio/icon-loop.mp3` (20–40s, loop pulito, -14 LUFS, ~128kbps).

**UX (rispetta l'autoplay-policy dei browser):**
1. La pagina parte **muta**. In basso a sinistra un toggle minimale `◢ SOUND` (oro).
2. Al **primo gesto** dell'utente (click sul toggle o sullo scroll dopo intro), l'audio parte in
   loop, fade-in 1s.
3. **Beat-reactive:** Web Audio API `AnalyserNode` → le **barre EQ** del pannello Music e il
   **pulse del 3D** seguono il basso. Premium, non invadente.
4. `prefers-reduced-motion` o mobile → audio resta opt-in, niente autoplay, niente beat-pulse pesante.
5. Volume basso di default (~0.4), ducking se l'utente apre un video nei Visuals.

**Config (per il builder):** aggiungere al config artista:

```js
music: {
  title: 'ICON',
  cover: '/concept/artists/tony-effe/music-cover.jpg',
  audioLoop: '/concept/artists/tony-effe/audio/icon-loop.mp3', // NEW
  links: { spotify: '#', apple: '#', youtube: '#' },
  presave: '#',
}
```

E nello schema (`config/schema.js`): `audioLoop` è opzionale (stringa). Nuovo componente
`SoundToggle.jsx` + hook `useAudioAnalyser.js` (single `<audio>` montato in `ConceptSite`).

---

## Prompt Nano Banana — Tony Effe (aggiornati sulle foto reali)

> Tutti finiscono col **STYLE BLOCK** del file `nano-banana-prompts.md`. Per i volti usa il
> prefisso *"Keep the exact identity and facial features of the person in the photo."*

- **hero.jpg** (EDIT da `tony effe.jpg`, 2:3): *Keep the exact identity and facial features of the
  person in the photo. Place him in an infinite matte black void, hard warm-gold chiaroscuro rim
  light raking his tattoos and the diamond Cuban chain with the "17" pendant. Behind him, faint in
  gold fog, the silhouette of the Colosseum and engraved Latin inscriptions on dark marble. Keep
  empty black space at the top for a title.* [+STYLE BLOCK]
- **portrait.jpg** (EDIT da `TONY-effe-819x1024 (1).webp`, 1:1): *Keep the exact identity and facial
  features. Remove the white background to pure matte black, light half the face with hard warm
  gold, crush the shadows for maximum micro-contrast, faint gold dust. Readable when pixelated.*
  [+STYLE BLOCK]
- **music-cover.jpg**: usa la cover **ICON** reale (`tony-effe-ICON-cover.jpeg`) così com'è, oppure
  regrada leggermente verso il nostro nero/oro mantenendo il cemento. 1:1.
- **merch/** (FROM SCRATCH, 3:4) e **visuals/** (FROM SCRATCH, 16:9): vedi prompt in
  `nano-banana-prompts.md` sez. 2 (hoodie/tee/cap ghost-mannequin; auto notturna + close-up catene).
- **motion/hero.mp4**: anima `hero.jpg` → *slow dolly-in, gold dust drifts up, chains sway 1cm,
  shimmer on the diamond, the Colosseum glow pulses faintly, seamless 8s loop.*

---

## Da decidere con te (3 punti)

1. **Manifesto:** tengo `UNCOMPROMISING. RARE. ETERNO.` o vuoi la tua frase ufficiale ICON?
2. **Oggetto 3D:** confermi il **ciondolo "17"** come hero-object (vs diamante generico)?
3. **Audio:** quale brano/loop carichi? (anche solo 20–30s di strumentale con diritti).
