# ICONENT — Artist Concept Sites — Design Spec

**Date:** 2026-06-17
**Owner:** Lorenzo (ICONENT)
**Status:** Approved design → ready for implementation plan

## 1. Purpose

Showcase prototypes ("concept websites") for famous rappers, used as a sales/portfolio
asset to sell ICONENT's premium web-design service. Each prototype is a single,
non-navigable one-page motion experience that imagines the artist's official homepage.

The "hero product" of each page is the **artist** (the way a Lamborghini site makes the
car the hero), rendered in a dark, brutalist, cinematic 3D style.

**6 artists total:** 3 IT (Tony Effe, Sfera Ebbasta, Geolier) + 3 US (Travis Scott,
Drake, Kanye West). **Flagship (built first): Tony Effe.**

## 2. Goals / Non-goals

**Goals**
- One flagship page (Tony Effe) built to a high, "Awwwards-tier" finish.
- A reusable template so the other 5 are produced by swapping a per-artist config
  (accent color, display font, 3D object, photos/videos, copy, tour dates, merch).
- Max visual impact (3D + motion) with a restrained, premium, minimal aesthetic.
- Deploy live under `iconent.it/<slug>-concept/`.

**Non-goals**
- Not a real, fully navigable website. No multi-page nav, no real e-commerce/checkout,
  no real ticketing integration (buttons are visual / link out at most).
- Not an official artist site. Clearly marked as a concept demo.
- No CMS. Content lives in per-artist config files in the repo.

## 3. Visual direction

**House style = "Brutalist 3D Void"** (combination of the two user references):
- From *Brutalist Mono*: oversized grotesque display type, raw grid, monochrome + a
  single accent color, hard/snappy motion.
- From *Cinematic 3D Void* (ref: ORYZO + Lamborghini Huracán STO sites): deep dark
  background, a floating 3D object, fog/depth, thin glass, cinematic full-bleed hero.

**Hard constraint:** minimal & premium. **No neon, no cheap gradients, no gimmicks.**
(See memory: `feedback_design-taste.md`.)

Per-artist the style is re-skinned via: accent color, display font, 3D object, photos.
Example accents — Tony Effe: gold on black. Drake: warm gold/OVO. Kanye: concrete/beige.
Travis: rust/ocra. Sfera: restrained magenta (kept tasteful, not neon). Geolier: deep blue.

## 4. Experience model

One-page experience made of **full-screen panels ("tabs") that animate in sequence**.
The page opens on the artist name; advancing (scroll or arrow keys / on-screen control)
transitions to the next panel. A minimal index (00–07) is shown.

### Tabs (approved)
- **00 · Intro** — name composes itself; the 3D object forms.
- **01 · Manifesto** — one oversized statement line that defines the artist.
- **02 · Latest Drop / Music** ⭐ — latest single/album, player + streaming links + "pre-save".
- **03 · Tour / Tickets** ⭐ — city, date, status (SOLD OUT / TICKETS →).
- **04 · Merch** ⭐ — product drop, hover-3D-tilt cards, name + price.
- **05 · Visuals / Video** — gallery of music videos / behind-the-scenes (shows off motion).
- **06 · Fan World / Newsletter** — email / Discord capture ("enter the world").
- **07 · CTA ICONENT** — "want a site like this?" + concept-demo disclaimer.

⭐ = core commercial sections (merch / tickets / events).
Tabs can be added/removed per artist via config.

### Animation language ("house")
One coherent, premium language reused everywhere:
- **Persistent 3D object** that morphs between tabs (e.g. diamond → particles → 3D tee),
  via a single continuous R3F scene driven by scroll progress.
- **Clip-path geometric wipe** between panels.
- **Pixelated / ASCII portrait reveal** (ORYZO signature) on intro/identity.
- **Kinetic typography** for the name (letters fly / scramble into place).
- **Dark↔light color inversion** between panels (brutalist contrast; merch is light).
- **Lenis smooth-scroll + scroll-snap** per panel; custom cursor; magnetic buttons.
- **Subtle RGB-split / glitch** only at the transition instant (refined, non-epileptic).

## 5. Tech & architecture

**Stack:** Next.js 14 (App Router) + Framer Motion + React Three Fiber (@react-three/fiber,
@react-three/drei) + Lenis smooth scroll. GSAP optional for fine scroll timelines.

**Mirrors the existing `listino-app` pattern** (Next.js + Framer Motion deployed as a
separate Vercel project and proxied from the static site):
- New app lives in repo subfolder `concept-app/` (separate `package.json`, own Vercel project).
- `next.config.mjs`: `basePath` (e.g. `/concept`), `trailingSlash: true`, `images.unoptimized: true`.
- Routes: one route per artist — `app/[slug]/page.js` (or `/concept/[slug]`).
- `iconent.it` proxies via a `rewrites` entry in the root `vercel.json` (same mechanism as
  `/servizi-marketing`). Public URL: `iconent.it/<slug>-concept/` → app route.
- The heavy `node_modules` / `.next` stay out of the static site (gitignored as today).

**Component boundaries (each one thing, testable in isolation):**
- `ArtistProvider` — loads the per-artist config, exposes it via context.
- `Stage3D` — the single persistent R3F canvas; renders the artist's 3D object; reads a
  global scroll-progress value to morph/transform.
- `PanelShell` — full-screen panel wrapper: handles enter/exit animation + clip-path wipe.
- One component per tab: `IntroPanel`, `ManifestoPanel`, `MusicPanel`, `TourPanel`,
  `MerchPanel`, `VisualsPanel`, `FanWorldPanel`, `CtaPanel`. Each consumes config, no
  hard-coded content.
- `ScrollController` — Lenis + scroll-snap + keyboard/arrow navigation + panel index.
- `PixelPortrait` — the ASCII/pixelation reveal effect (reusable).
- `usePanelProgress` — hook mapping scroll position → active panel + 0..1 progress.

### Per-artist config (the replicate mechanism)
A typed config object per artist, e.g. `config/artists/tony-effe.ts`:
```
{
  slug: "tonyeffe",
  name: "Tony Effe",
  accent: "#c9a44a",
  theme: "dark",
  fonts: { display: "...", body: "..." },
  object3D: "diamond",            // key into a registry of R3F objects
  manifesto: "UNCOMPROMISING. RARE.",
  hero: { image: "...", video: "..." },
  music: { title, cover, links: { spotify, apple, youtube }, presave },
  tour: [ { city, date, status, url } ],
  merch: [ { name, price, image } ],
  visuals: [ { thumb, video } ],
  fanWorld: { newsletter: bool, discord?: url },
}
```
Adding an artist = add one config file + drop assets. No code changes.

## 6. Asset pipeline

Per-artist assets live under `concept-app/public/artists/<slug>/`:
```
public/artists/tony-effe/
  raw/            # downloaded source photos (reference, not shipped if heavy)
  hero.jpg        # 1 vertical hero (>=1600px tall)
  portrait.jpg    # square-ish, for the pixel/ASCII reveal
  merch/          # product photos (3:4)
  visuals/        # video thumbs
  motion/         # nano-banana mp4 loops (hero bg, transitions)
```
**Sourcing flow:** photos pulled from Canva (bulk if possible) or downloaded from the web
locally → choose the best → animate selected stills into short MP4 loops with nano banana →
place in `motion/`. Naming is lowercase-kebab, documented per slug.
**Format targets:** images max ~1920px, JPG/WebP; MP4 loops 6–10s, 1080p, muted, `loop`.

## 7. Legal / safety

These depict real artists and real trademarks (OVO, Yeezy, Astroworld). Therefore:
- All concept pages are **`noindex, nofollow`** (not in sitemap, robots-excluded).
- Visible label on each: **"CONCEPT DEMO · non affiliato · realizzato da ICONENT"**.
- Treated as portfolio/spec work, not official sites.
- For any publicly promoted/sold version, prefer AI-generated likeness or licensed press
  photos rather than scraped web images. (Flagged, not blocking the prototype.)

## 8. Success criteria

- Tony Effe flagship loads under `iconent.it/tonyeffe-concept/`, runs ~60fps on a modern
  laptop, mobile-friendly fallback (reduced 3D), `noindex` confirmed.
- A second artist can be produced by adding one config file + assets, with zero code edits.
- Reads as premium/minimal (no neon), visually in the league of the reference videos.

## 9. Decisions (resolved 2026-06-17, approved by Lorenzo)

- **Routing:** Next app uses `basePath: "/concept"` with `app/[slug]/page.js` routes. Each
  artist also gets a clean public URL via one root-`vercel.json` rewrite:
  `/<slug>-concept/ → /concept/<slug>/`. So `iconent.it/tonyeffe-concept/` works as desired.
- **Mobile:** full 3D on desktop; on mobile a lighter fallback — reduced/disabled R3F,
  static hero image + CSS/Framer motion, same layout and content. Detected via capability
  + viewport, honoring `prefers-reduced-motion`.
- **Buttons:** pre-save/streaming link to the artist's real public links when readily
  available; tickets/shop are visual or fall back to the ICONENT contact CTA. No fake
  checkout/ticketing.
- **Fonts:** use web-licensed fonts only (Google Fonts / open licenses) chosen per artist
  to approximate their brand; no unlicensed foundry fonts shipped.
