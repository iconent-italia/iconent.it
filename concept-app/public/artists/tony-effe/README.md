# Tony Effe — assets

Drop files with these EXACT names (the config `config/artists/tony-effe.js` points to them):

- `hero.jpg`        — vertical hero, >=1600px tall
- `portrait.jpg`    — square, used by the pixel-reveal
- `music-cover.jpg` — square album cover
- `merch/hoodie.jpg`, `merch/tee.jpg`, `merch/cap.jpg` — 3:4
- `visuals/v1.jpg`, `visuals/v2.jpg` — 16:9 thumbs
- `motion/hero.mp4` — 6–10s loop, 1080p, muted (made with Nano Banana)

## Stato attuale (placeholder)

- `hero.jpg`, `portrait.jpg`, `music-cover.jpg` = **foto reali** (da `Desktop/foto siti/`).
- `merch/*` e `visuals/*` = **placeholder temporanei** (copie delle foto vere) finché
  Nano Banana non genera gli asset definitivi. Sostituire mantenendo gli stessi nomi.

## Workflow

Prompt pronti in `docs/concept-sites/nano-banana-prompts.md` (regola d'oro: genera prima
l'hero, poi usalo come reference per portrait/merch/visuals — "same lighting/palette/grain").
Foto sorgente in `raw/`. Immagini <=1920px, JPG/WebP.
