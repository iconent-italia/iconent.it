# Artist Concept Sites — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a config-driven Next.js + React Three Fiber app that renders a premium, dark, motion 3D one-page "concept website" for a rapper, shipped first for the flagship (Tony Effe) and replicable to 5 more artists by adding one config file each.

**Architecture:** A single Next.js (App Router) app in `concept-app/` (sibling pattern to the existing `listino-app/`). One route `app/[slug]/page.js` reads a per-artist config and renders an ordered list of full-screen panels. A single persistent React Three Fiber canvas sits behind the panels and morphs a 3D object based on global scroll progress. Smooth scroll + snap via Lenis; panel enter/exit + clip-path wipes via Framer Motion. Deployed as a separate Vercel project, proxied from `iconent.it/<slug>-concept/` via a root `vercel.json` rewrite. Pages are `noindex`.

**Tech Stack:** Next.js 14 (App Router, JS), React 18, Framer Motion 11, @react-three/fiber + @react-three/drei (three.js), Lenis, Vitest + @testing-library/react (unit), Playwright (e2e/smoke).

---

## File Structure

```
concept-app/
  package.json                      # deps + scripts
  next.config.mjs                   # basePath /concept, trailingSlash, images.unoptimized
  jsconfig.json                     # @/* path alias
  vitest.config.mjs                 # unit test config (jsdom)
  playwright.config.mjs             # e2e config
  app/
    layout.js                       # root layout, global metadata (noindex), fonts
    globals.css                     # tokens, base brutalist styles, custom cursor
    [slug]/
      page.js                       # loads config by slug, renders <ConceptSite>
  config/
    artists.js                      # registry: slug -> config loader
    artists/
      tony-effe.js                  # flagship config (THE replicate unit)
    schema.js                       # validateArtistConfig()
  components/
    ConceptSite.jsx                 # top-level: providers + Stage3D + panels + controller
    ArtistContext.jsx               # context provider for the artist config
    ScrollController.jsx            # Lenis + snap + keyboard nav + active-panel index
    PanelShell.jsx                  # full-screen panel wrapper + enter/exit + clip wipe
    PanelIndex.jsx                  # minimal 00..07 indicator
    PixelPortrait.jsx               # ASCII/pixelation reveal of a portrait image
    stage/
      Stage3D.jsx                   # persistent R3F <Canvas>, reads scroll progress
      objects.js                    # registry: object3D key -> R3F component
      DiamondObject.jsx             # Tony Effe object (gold faceted gem)
    panels/
      IntroPanel.jsx
      ManifestoPanel.jsx
      MusicPanel.jsx
      TourPanel.jsx
      MerchPanel.jsx
      VisualsPanel.jsx
      FanWorldPanel.jsx
      CtaPanel.jsx
  hooks/
    usePanelProgress.js             # scroll position -> { active, progress }
    useScrollProgress.js            # global 0..1 scroll progress (shared with Stage3D)
  lib/
    motion.js                       # shared Framer variants (wipe, rise, scramble)
  public/
    artists/tony-effe/...           # assets (hero, portrait, merch/, visuals/, motion/)
  tests/
    schema.test.js
    usePanelProgress.test.js
  e2e/
    smoke.spec.js                   # routing, panel count, noindex meta

# Root of `Sito iconent italia` (existing static site):
vercel.json                         # ADD rewrite: /<slug>-concept/ -> concept-app
```

Per-artist replication = add `config/artists/<slug>.js` + `public/artists/<slug>/` + register in `config/artists.js`. No component edits.

---

## Task 1: Scaffold the concept-app

**Files:**
- Create: `concept-app/package.json`
- Create: `concept-app/next.config.mjs`
- Create: `concept-app/jsconfig.json`
- Create: `concept-app/.gitignore`

- [ ] **Step 1: Create `concept-app/package.json`**

```json
{
  "name": "iconent-concept-sites",
  "version": "1.0.0",
  "private": true,
  "description": "ICONENT artist concept sites — Next.js + Framer Motion + R3F",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test"
  },
  "dependencies": {
    "next": "^14.2.35",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "framer-motion": "^11.11.7",
    "three": "^0.169.0",
    "@react-three/fiber": "^8.17.10",
    "@react-three/drei": "^9.114.0",
    "lenis": "^1.1.13"
  },
  "devDependencies": {
    "vitest": "^2.1.4",
    "jsdom": "^25.0.1",
    "@testing-library/react": "^16.0.1",
    "@testing-library/jest-dom": "^6.6.2",
    "@playwright/test": "^1.48.2"
  }
}
```

- [ ] **Step 2: Create `concept-app/next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/concept',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
};
export default nextConfig;
```

- [ ] **Step 3: Create `concept-app/jsconfig.json`**

```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./*"] } } }
```

- [ ] **Step 4: Create `concept-app/.gitignore`**

```
node_modules/
.next/
.vercel/
test-results/
playwright-report/
```

- [ ] **Step 5: Install deps**

Run: `cd concept-app && npm install`
Expected: completes; `node_modules/` present, `next` + `three` + `lenis` installed.

- [ ] **Step 6: Commit**

```bash
git add concept-app/package.json concept-app/package-lock.json concept-app/next.config.mjs concept-app/jsconfig.json concept-app/.gitignore
git commit -m "feat(concept-app): scaffold Next.js + R3F app"
```

---

## Task 2: Artist config schema + validator (TDD)

**Files:**
- Create: `concept-app/config/schema.js`
- Create: `concept-app/tests/schema.test.js`
- Create: `concept-app/vitest.config.mjs`

- [ ] **Step 1: Create `concept-app/vitest.config.mjs`**

```js
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: { environment: 'jsdom', globals: true, include: ['tests/**/*.test.js'] },
  resolve: { alias: { '@': new URL('.', import.meta.url).pathname } },
});
```

- [ ] **Step 2: Write the failing test `concept-app/tests/schema.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { validateArtistConfig } from '@/config/schema';

const base = {
  slug: 'tony-effe', name: 'Tony Effe', accent: '#c9a44a', theme: 'dark',
  object3D: 'diamond', manifesto: 'UNCOMPROMISING.',
  hero: { image: '/concept/artists/tony-effe/hero.jpg' },
  portrait: '/concept/artists/tony-effe/portrait.jpg',
  music: { title: 'Drop', cover: '/x.jpg', links: {} },
  tour: [{ city: 'Milano', date: '2026-09-12', status: 'onsale' }],
  merch: [{ name: 'Tee', price: '€45', image: '/x.jpg' }],
  visuals: [], fanWorld: { newsletter: true },
};

describe('validateArtistConfig', () => {
  it('accepts a valid config', () => {
    expect(() => validateArtistConfig(base)).not.toThrow();
  });
  it('throws when slug is missing', () => {
    const { slug, ...bad } = base;
    expect(() => validateArtistConfig(bad)).toThrow(/slug/);
  });
  it('throws when accent is not a hex color', () => {
    expect(() => validateArtistConfig({ ...base, accent: 'gold' })).toThrow(/accent/);
  });
  it('throws when theme is not dark or light', () => {
    expect(() => validateArtistConfig({ ...base, theme: 'blue' })).toThrow(/theme/);
  });
  it('throws when a tour item lacks a city', () => {
    expect(() => validateArtistConfig({ ...base, tour: [{ date: '2026-09-12' }] })).toThrow(/city/);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd concept-app && npx vitest run tests/schema.test.js`
Expected: FAIL — `validateArtistConfig` not found / module missing.

- [ ] **Step 4: Implement `concept-app/config/schema.js`**

```js
const HEX = /^#[0-9a-fA-F]{6}$/;

export function validateArtistConfig(c) {
  const req = (cond, msg) => { if (!cond) throw new Error(`Invalid artist config: ${msg}`); };

  req(typeof c?.slug === 'string' && c.slug.length, 'slug is required');
  req(typeof c.name === 'string' && c.name.length, 'name is required');
  req(HEX.test(c.accent || ''), 'accent must be a #rrggbb hex color');
  req(c.theme === 'dark' || c.theme === 'light', 'theme must be "dark" or "light"');
  req(typeof c.object3D === 'string' && c.object3D.length, 'object3D key is required');
  req(typeof c.manifesto === 'string' && c.manifesto.length, 'manifesto is required');
  req(c.hero && typeof c.hero.image === 'string', 'hero.image is required');
  req(typeof c.portrait === 'string', 'portrait is required');
  req(c.music && typeof c.music.title === 'string', 'music.title is required');
  req(Array.isArray(c.tour), 'tour must be an array');
  c.tour.forEach((t, i) => {
    req(typeof t.city === 'string' && t.city.length, `tour[${i}].city is required`);
    req(typeof t.date === 'string' && t.date.length, `tour[${i}].date is required`);
  });
  req(Array.isArray(c.merch), 'merch must be an array');
  req(Array.isArray(c.visuals), 'visuals must be an array');
  return c;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd concept-app && npx vitest run tests/schema.test.js`
Expected: PASS (5 passing).

- [ ] **Step 6: Commit**

```bash
git add concept-app/config/schema.js concept-app/tests/schema.test.js concept-app/vitest.config.mjs
git commit -m "feat(concept-app): artist config schema + validator"
```

---

## Task 3: Tony Effe config + artist registry (TDD)

**Files:**
- Create: `concept-app/config/artists/tony-effe.js`
- Create: `concept-app/config/artists.js`
- Modify: `concept-app/tests/schema.test.js` (append registry test)

- [ ] **Step 1: Create `concept-app/config/artists/tony-effe.js`**

```js
const tonyEffe = {
  slug: 'tony-effe',
  name: 'Tony Effe',
  accent: '#c9a44a',
  theme: 'dark',
  fonts: { display: 'Anton', body: 'Inter' },
  object3D: 'diamond',
  manifesto: 'UNCOMPROMISING. RARE. ETERNO.',
  hero: {
    image: '/concept/artists/tony-effe/hero.jpg',
    video: '/concept/artists/tony-effe/motion/hero.mp4',
  },
  portrait: '/concept/artists/tony-effe/portrait.jpg',
  music: {
    title: 'ICON',
    cover: '/concept/artists/tony-effe/music-cover.jpg',
    links: { spotify: '#', apple: '#', youtube: '#' },
    presave: '#',
  },
  tour: [
    { city: 'MILANO', venue: 'Forum', date: '2026-09-12', status: 'onsale', url: '#' },
    { city: 'ROMA', venue: 'Palazzo', date: '2026-09-18', status: 'onsale', url: '#' },
    { city: 'NAPOLI', venue: 'PalaPartenope', date: '2026-09-25', status: 'soldout', url: '#' },
  ],
  merch: [
    { name: 'ICON HOODIE', price: '€90', image: '/concept/artists/tony-effe/merch/hoodie.jpg' },
    { name: 'CHAIN TEE', price: '€45', image: '/concept/artists/tony-effe/merch/tee.jpg' },
    { name: 'CAP GOLD', price: '€35', image: '/concept/artists/tony-effe/merch/cap.jpg' },
  ],
  visuals: [
    { thumb: '/concept/artists/tony-effe/visuals/v1.jpg', video: '#' },
    { thumb: '/concept/artists/tony-effe/visuals/v2.jpg', video: '#' },
  ],
  fanWorld: { newsletter: true, discord: '#' },
};
export default tonyEffe;
```

- [ ] **Step 2: Create `concept-app/config/artists.js`**

```js
import tonyEffe from './artists/tony-effe';
import { validateArtistConfig } from './schema';

const REGISTRY = { 'tony-effe': tonyEffe };

export function getArtist(slug) {
  const c = REGISTRY[slug];
  if (!c) return null;
  return validateArtistConfig(c);
}
export function allArtistSlugs() {
  return Object.keys(REGISTRY);
}
```

- [ ] **Step 3: Append failing test to `concept-app/tests/schema.test.js`**

```js
import { getArtist, allArtistSlugs } from '@/config/artists';

describe('artist registry', () => {
  it('returns a valid Tony Effe config', () => {
    const c = getArtist('tony-effe');
    expect(c).not.toBeNull();
    expect(c.name).toBe('Tony Effe');
  });
  it('returns null for unknown slug', () => {
    expect(getArtist('nobody')).toBeNull();
  });
  it('lists slugs', () => {
    expect(allArtistSlugs()).toContain('tony-effe');
  });
});
```

- [ ] **Step 4: Run tests**

Run: `cd concept-app && npx vitest run tests/schema.test.js`
Expected: PASS (8 passing) — Tony Effe config passes validation.

- [ ] **Step 5: Commit**

```bash
git add concept-app/config/artists.js concept-app/config/artists/tony-effe.js concept-app/tests/schema.test.js
git commit -m "feat(concept-app): Tony Effe flagship config + registry"
```

---

## Task 4: Root layout, design tokens, global noindex

**Files:**
- Create: `concept-app/app/layout.js`
- Create: `concept-app/app/globals.css`

- [ ] **Step 1: Create `concept-app/app/layout.js`**

```js
import './globals.css';

export const metadata = {
  title: 'ICONENT · Concept',
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Create `concept-app/app/globals.css`**

```css
:root {
  --bg: #070707; --fg: #f4efe3; --muted: #8a8a8a; --accent: #c9a44a;
  --panel-light: #e7e4dd; --panel-light-fg: #111;
  --font-display: 'Anton', Impact, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { background: var(--bg); color: var(--fg); font-family: var(--font-body); }
body { overflow-x: hidden; }
.panel { width: 100vw; min-height: 100svh; position: relative; }
.display { font-family: var(--font-display); text-transform: uppercase; line-height: .85; letter-spacing: -.02em; }
.kicker { font-size: .7rem; letter-spacing: .25em; color: var(--accent); text-transform: uppercase; }
.accent { color: var(--accent); }
.invert { background: var(--panel-light); color: var(--panel-light-fg); }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 3: Verify lint/build compiles**

Run: `cd concept-app && npx next build`
Expected: build fails ONLY because `app/[slug]/page.js` does not exist yet (no static params). That's fine — proceed; the route is added next. If build complains about other errors, fix them.

- [ ] **Step 4: Commit**

```bash
git add concept-app/app/layout.js concept-app/app/globals.css
git commit -m "feat(concept-app): root layout, tokens, global noindex"
```

---

## Task 5: usePanelProgress hook (TDD)

**Files:**
- Create: `concept-app/hooks/usePanelProgress.js`
- Create: `concept-app/tests/usePanelProgress.test.js`

- [ ] **Step 1: Write failing test `concept-app/tests/usePanelProgress.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { computePanelState } from '@/hooks/usePanelProgress';

// computePanelState(scrollTop, viewportH, panelCount) -> { active, progress }
describe('computePanelState', () => {
  it('is panel 0 at the top', () => {
    expect(computePanelState(0, 1000, 8)).toEqual({ active: 0, progress: 0 });
  });
  it('is panel 1 at one viewport down', () => {
    const s = computePanelState(1000, 1000, 8);
    expect(s.active).toBe(1);
    expect(s.progress).toBeCloseTo(0, 5);
  });
  it('reports mid-panel progress', () => {
    const s = computePanelState(1500, 1000, 8);
    expect(s.active).toBe(1);
    expect(s.progress).toBeCloseTo(0.5, 5);
  });
  it('clamps to the last panel', () => {
    expect(computePanelState(99999, 1000, 8).active).toBe(7);
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `cd concept-app && npx vitest run tests/usePanelProgress.test.js`
Expected: FAIL — `computePanelState` not exported.

- [ ] **Step 3: Implement `concept-app/hooks/usePanelProgress.js`**

```js
'use client';
import { useEffect, useState } from 'react';

export function computePanelState(scrollTop, viewportH, panelCount) {
  const raw = viewportH > 0 ? scrollTop / viewportH : 0;
  const active = Math.max(0, Math.min(panelCount - 1, Math.floor(raw)));
  const progress = Math.max(0, Math.min(1, raw - active));
  return { active, progress };
}

export function usePanelProgress(panelCount) {
  const [state, setState] = useState({ active: 0, progress: 0 });
  useEffect(() => {
    const onScroll = () =>
      setState(computePanelState(window.scrollY, window.innerHeight, panelCount));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [panelCount]);
  return state;
}
```

- [ ] **Step 4: Run to verify pass**

Run: `cd concept-app && npx vitest run tests/usePanelProgress.test.js`
Expected: PASS (4 passing).

- [ ] **Step 5: Commit**

```bash
git add concept-app/hooks/usePanelProgress.js concept-app/tests/usePanelProgress.test.js
git commit -m "feat(concept-app): panel progress hook"
```

---

## Task 6: useScrollProgress + shared motion variants

**Files:**
- Create: `concept-app/hooks/useScrollProgress.js`
- Create: `concept-app/lib/motion.js`

- [ ] **Step 1: Create `concept-app/hooks/useScrollProgress.js`**

```js
'use client';
import { useEffect, useRef, useState } from 'react';

// Global 0..1 progress across the whole scrollable document.
export function useScrollProgress() {
  const [p, setP] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? window.scrollY / max : 0;
      setP(ref.current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return p;
}
```

- [ ] **Step 2: Create `concept-app/lib/motion.js`**

```js
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
```

- [ ] **Step 3: Verify import resolves (typecheck via build later). Commit**

```bash
git add concept-app/hooks/useScrollProgress.js concept-app/lib/motion.js
git commit -m "feat(concept-app): scroll progress + shared motion variants"
```

---

## Task 7: Stage3D persistent canvas + object registry + Diamond

**Files:**
- Create: `concept-app/components/stage/Stage3D.jsx`
- Create: `concept-app/components/stage/objects.js`
- Create: `concept-app/components/stage/DiamondObject.jsx`

- [ ] **Step 1: Create `concept-app/components/stage/DiamondObject.jsx`**

```jsx
'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// A faceted gold gem. `progress` (0..1) drives rotation/scale across the page.
export default function DiamondObject({ accent = '#c9a44a', progress = 0 }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.3;
    ref.current.rotation.x = progress * Math.PI;
    const s = 1 + progress * 0.6;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.1, 0]} />
      <meshStandardMaterial color={accent} metalness={1} roughness={0.15} envMapIntensity={1.2} />
    </mesh>
  );
}
```

- [ ] **Step 2: Create `concept-app/components/stage/objects.js`**

```js
import DiamondObject from './DiamondObject';

// object3D key (from artist config) -> R3F component.
const OBJECTS = { diamond: DiamondObject };

export function getObject3D(key) {
  return OBJECTS[key] || DiamondObject;
}
```

- [ ] **Step 3: Create `concept-app/components/stage/Stage3D.jsx`**

```jsx
'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { getObject3D } from './objects';

export default function Stage3D({ objectKey, accent }) {
  const progress = useScrollProgress();
  const Obj = getObject3D(objectKey);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <Obj accent={accent} progress={progress} />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add concept-app/components/stage/
git commit -m "feat(concept-app): persistent R3F stage + diamond object"
```

---

## Task 8: PanelShell, PanelIndex, ArtistContext

**Files:**
- Create: `concept-app/components/ArtistContext.jsx`
- Create: `concept-app/components/PanelShell.jsx`
- Create: `concept-app/components/PanelIndex.jsx`

- [ ] **Step 1: Create `concept-app/components/ArtistContext.jsx`**

```jsx
'use client';
import { createContext, useContext } from 'react';
const Ctx = createContext(null);
export function ArtistProvider({ value, children }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useArtist() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useArtist must be used within ArtistProvider');
  return v;
}
```

- [ ] **Step 2: Create `concept-app/components/PanelShell.jsx`**

```jsx
'use client';
import { motion } from 'framer-motion';
import { wipe } from '@/lib/motion';

// Full-screen panel; clip-path wipe reveal when scrolled into view.
export default function PanelShell({ id, kicker, invert = false, children }) {
  return (
    <motion.section
      id={id}
      className={`panel ${invert ? 'invert' : ''}`}
      style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column',
               justifyContent: 'center', padding: 'clamp(24px, 6vw, 96px)' }}
      variants={wipe}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
    >
      {kicker ? <div className="kicker" style={{ marginBottom: 16 }}>{kicker}</div> : null}
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 3: Create `concept-app/components/PanelIndex.jsx`**

```jsx
'use client';
import { usePanelProgress } from '@/hooks/usePanelProgress';

export default function PanelIndex({ labels }) {
  const { active } = usePanelProgress(labels.length);
  return (
    <nav style={{ position: 'fixed', top: '50%', right: 18, transform: 'translateY(-50%)',
                  zIndex: 5, display: 'flex', flexDirection: 'column', gap: 10, mixBlendMode: 'difference' }}>
      {labels.map((l, i) => (
        <span key={l} title={l} style={{
          fontSize: 10, letterSpacing: '.15em',
          color: i === active ? 'var(--accent)' : '#888',
          opacity: i === active ? 1 : 0.5,
        }}>{String(i).padStart(2, '0')}</span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add concept-app/components/ArtistContext.jsx concept-app/components/PanelShell.jsx concept-app/components/PanelIndex.jsx
git commit -m "feat(concept-app): panel shell, index, artist context"
```

---

## Task 9: ScrollController (Lenis smooth scroll + keyboard nav)

**Files:**
- Create: `concept-app/components/ScrollController.jsx`

- [ ] **Step 1: Create `concept-app/components/ScrollController.jsx`**

```jsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Smooth scroll + arrow/space keyboard navigation between full-screen panels.
export default function ScrollController({ panelCount }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis;
    if (!reduce) {
      lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    const go = (dir) => {
      const i = Math.round(window.scrollY / window.innerHeight);
      const next = Math.max(0, Math.min(panelCount - 1, i + dir));
      const top = next * window.innerHeight;
      if (lenis) lenis.scrollTo(top); else window.scrollTo({ top, behavior: 'smooth' });
    };
    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1); }
      if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); lenis?.destroy(); };
  }, [panelCount]);
  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add concept-app/components/ScrollController.jsx
git commit -m "feat(concept-app): Lenis smooth scroll + keyboard nav"
```

---

## Task 10: PixelPortrait reveal

**Files:**
- Create: `concept-app/components/PixelPortrait.jsx`

- [ ] **Step 1: Create `concept-app/components/PixelPortrait.jsx`**

```jsx
'use client';
import { useEffect, useRef } from 'react';

// Renders an image to canvas, starts pixelated, sharpens to full-res on view.
export default function PixelPortrait({ src, size = 420 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    let raf, steps = 0;
    const maxSteps = 36;
    img.onload = () => {
      const draw = () => {
        const t = Math.min(1, steps / maxSteps);
        const px = Math.max(1, Math.floor((1 - t) * 60) + 1); // 60px blocks -> 1px
        const w = Math.max(1, Math.floor(size / px));
        const h = Math.max(1, Math.floor(size / px));
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, w, h);
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, size, size);
        if (steps++ < maxSteps) raf = requestAnimationFrame(draw);
      };
      const io = new IntersectionObserver((es) => {
        if (es[0].isIntersecting) { steps = 0; draw(); }
      }, { threshold: 0.5 });
      io.observe(canvas);
    };
    return () => cancelAnimationFrame(raf);
  }, [src, size]);
  return <canvas ref={canvasRef} width={size} height={size}
    style={{ width: '100%', maxWidth: size, aspectRatio: '1', filter: 'contrast(1.05)' }} />;
}
```

- [ ] **Step 2: Commit**

```bash
git add concept-app/components/PixelPortrait.jsx
git commit -m "feat(concept-app): pixelated portrait reveal"
```

---

## Task 11: The 8 panels

Each panel reads from `useArtist()`. Create all eight files, then commit once.

**Files:**
- Create: `concept-app/components/panels/IntroPanel.jsx`
- Create: `concept-app/components/panels/ManifestoPanel.jsx`
- Create: `concept-app/components/panels/MusicPanel.jsx`
- Create: `concept-app/components/panels/TourPanel.jsx`
- Create: `concept-app/components/panels/MerchPanel.jsx`
- Create: `concept-app/components/panels/VisualsPanel.jsx`
- Create: `concept-app/components/panels/FanWorldPanel.jsx`
- Create: `concept-app/components/panels/CtaPanel.jsx`

- [ ] **Step 1: `IntroPanel.jsx`**

```jsx
'use client';
import { motion } from 'framer-motion';
import { useArtist } from '@/components/ArtistContext';
import { rise, stagger } from '@/lib/motion';

export default function IntroPanel() {
  const a = useArtist();
  const words = a.name.toUpperCase().split(' ');
  return (
    <section className="panel" style={{ display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', padding: 'clamp(24px,6vw,96px)', position: 'relative', zIndex: 1 }}>
      <div className="kicker">NUOVO ALBUM · FUORI ORA</div>
      <motion.h1 className="display" style={{ fontSize: 'clamp(3rem, 16vw, 12rem)' }}
        variants={stagger} initial="hidden" animate="show">
        {words.map((w) => (
          <motion.span key={w} variants={rise} style={{ display: 'block' }}>{w}</motion.span>
        ))}
      </motion.h1>
      <motion.div className="accent" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1.2 }}
        style={{ marginTop: 24, fontSize: 12, letterSpacing: '.3em' }}>
        ↓ SCROLL
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: `ManifestoPanel.jsx`**

```jsx
'use client';
import { motion } from 'framer-motion';
import { useArtist } from '@/components/ArtistContext';

export default function ManifestoPanel() {
  const a = useArtist();
  return (
    <section className="panel" style={{ display: 'flex', alignItems: 'center',
      padding: 'clamp(24px,6vw,96px)', position: 'relative', zIndex: 1 }}>
      <motion.h2 className="display" style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', maxWidth: '14ch' }}
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6 }} transition={{ duration: 0.8 }}>
        {a.manifesto}
      </motion.h2>
    </section>
  );
}
```

- [ ] **Step 3: `MusicPanel.jsx`**

```jsx
'use client';
import PanelShell from '@/components/PanelShell';
import { useArtist } from '@/components/ArtistContext';

export default function MusicPanel() {
  const a = useArtist();
  const m = a.music;
  return (
    <PanelShell id="music" kicker="02 · ULTIMO DROP">
      <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={m.cover} alt={m.title} style={{ width: 220, height: 220, objectFit: 'cover', borderRadius: 6 }} />
        <div>
          <h2 className="display" style={{ fontSize: 'clamp(2rem,7vw,5rem)' }}>{m.title}</h2>
          <div style={{ display: 'flex', gap: 14, marginTop: 18, flexWrap: 'wrap' }}>
            {m.links.spotify && <a className="accent" href={m.links.spotify}>SPOTIFY →</a>}
            {m.links.apple && <a className="accent" href={m.links.apple}>APPLE →</a>}
            {m.links.youtube && <a className="accent" href={m.links.youtube}>YOUTUBE →</a>}
            {m.presave && <a className="accent" href={m.presave}>PRE-SAVE →</a>}
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
```

- [ ] **Step 4: `TourPanel.jsx`**

```jsx
'use client';
import PanelShell from '@/components/PanelShell';
import { useArtist } from '@/components/ArtistContext';

export default function TourPanel() {
  const a = useArtist();
  return (
    <PanelShell id="tour" kicker="03 · LIVE / BIGLIETTI">
      <h2 className="display" style={{ fontSize: 'clamp(2rem,8vw,6rem)', marginBottom: 24 }}>TOUR 2026</h2>
      <ul style={{ listStyle: 'none' }}>
        {a.tour.map((t) => (
          <li key={t.city + t.date} style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', padding: '16px 0', borderTop: '1px solid #2a2a2a', gap: 16 }}>
            <span style={{ fontWeight: 700 }}>{t.city}{t.venue ? ` · ${t.venue}` : ''}</span>
            <span style={{ color: 'var(--muted)' }}>{t.date}</span>
            {t.status === 'soldout'
              ? <span style={{ color: 'var(--muted)' }}>SOLD OUT</span>
              : <a className="accent" href={t.url || '#'}>TICKETS →</a>}
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}
```

- [ ] **Step 5: `MerchPanel.jsx`** (light/inverted panel)

```jsx
'use client';
import PanelShell from '@/components/PanelShell';
import { motion } from 'framer-motion';
import { useArtist } from '@/components/ArtistContext';

export default function MerchPanel() {
  const a = useArtist();
  return (
    <PanelShell id="merch" kicker="04 · MERCH" invert>
      <h2 className="display" style={{ fontSize: 'clamp(2rem,8vw,6rem)', marginBottom: 24 }}>SHOP THE DROP</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
        {a.merch.map((p) => (
          <motion.div key={p.name} whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
            style={{ transformStyle: 'preserve-3d' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 }}>
              <span>{p.name}</span><span>{p.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </PanelShell>
  );
}
```

- [ ] **Step 6: `VisualsPanel.jsx`**

```jsx
'use client';
import PanelShell from '@/components/PanelShell';
import { useArtist } from '@/components/ArtistContext';

export default function VisualsPanel() {
  const a = useArtist();
  if (!a.visuals.length) return null;
  return (
    <PanelShell id="visuals" kicker="05 · VISUALS">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        {a.visuals.map((v, i) => (
          <a key={i} href={v.video || '#'} style={{ position: 'relative', display: 'block' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.thumb} alt={`visual ${i}`} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
            <span className="accent" style={{ position: 'absolute', bottom: 8, left: 8 }}>▶ PLAY</span>
          </a>
        ))}
      </div>
    </PanelShell>
  );
}
```

- [ ] **Step 7: `FanWorldPanel.jsx`**

```jsx
'use client';
import PanelShell from '@/components/PanelShell';
import { useArtist } from '@/components/ArtistContext';

export default function FanWorldPanel() {
  const a = useArtist();
  if (!a.fanWorld?.newsletter && !a.fanWorld?.discord) return null;
  return (
    <PanelShell id="fanworld" kicker="06 · FAN WORLD">
      <h2 className="display" style={{ fontSize: 'clamp(2rem,7vw,5rem)', maxWidth: '16ch' }}>
        ENTRA NEL MONDO
      </h2>
      {a.fanWorld.newsletter && (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 8, marginTop: 24, maxWidth: 420 }}>
          <input type="email" placeholder="la tua email" required
            style={{ flex: 1, padding: '12px 14px', background: 'transparent', border: '1px solid #333', color: 'var(--fg)' }} />
          <button className="accent" style={{ border: '1px solid var(--accent)', padding: '12px 18px', background: 'transparent' }}>
            JOIN →
          </button>
        </form>
      )}
    </PanelShell>
  );
}
```

- [ ] **Step 8: `CtaPanel.jsx`**

```jsx
'use client';
import PanelShell from '@/components/PanelShell';

export default function CtaPanel() {
  return (
    <PanelShell id="cta" kicker="07 · ICONENT">
      <h2 className="display" style={{ fontSize: 'clamp(1.6rem,6vw,4rem)', maxWidth: '18ch' }}>
        VUOI UN SITO COSÌ PER IL TUO PROGETTO?
      </h2>
      <a href="https://iconent.it/contatti/" className="accent"
        style={{ marginTop: 24, border: '1px solid var(--accent)', padding: '14px 22px', alignSelf: 'flex-start' }}>
        ICONENT · CONTATTACI →
      </a>
      <p style={{ marginTop: 40, fontSize: 11, color: 'var(--muted)' }}>
        CONCEPT DEMO · non affiliato · realizzato da ICONENT
      </p>
    </PanelShell>
  );
}
```

- [ ] **Step 9: Commit**

```bash
git add concept-app/components/panels/
git commit -m "feat(concept-app): all 8 panels (config-driven)"
```

---

## Task 12: ConceptSite assembly + [slug] route

**Files:**
- Create: `concept-app/components/ConceptSite.jsx`
- Create: `concept-app/app/[slug]/page.js`

- [ ] **Step 1: Create `concept-app/components/ConceptSite.jsx`**

```jsx
'use client';
import { ArtistProvider } from '@/components/ArtistContext';
import Stage3D from '@/components/stage/Stage3D';
import ScrollController from '@/components/ScrollController';
import PanelIndex from '@/components/PanelIndex';
import IntroPanel from '@/components/panels/IntroPanel';
import ManifestoPanel from '@/components/panels/ManifestoPanel';
import MusicPanel from '@/components/panels/MusicPanel';
import TourPanel from '@/components/panels/TourPanel';
import MerchPanel from '@/components/panels/MerchPanel';
import VisualsPanel from '@/components/panels/VisualsPanel';
import FanWorldPanel from '@/components/panels/FanWorldPanel';
import CtaPanel from '@/components/panels/CtaPanel';

const LABELS = ['INTRO', 'MANIFESTO', 'MUSIC', 'TOUR', 'MERCH', 'VISUALS', 'FAN', 'ICONENT'];

export default function ConceptSite({ artist }) {
  return (
    <ArtistProvider value={artist}>
      <main style={{ '--accent': artist.accent }}>
        <Stage3D objectKey={artist.object3D} accent={artist.accent} />
        <ScrollController panelCount={LABELS.length} />
        <PanelIndex labels={LABELS} />
        <IntroPanel />
        <ManifestoPanel />
        <MusicPanel />
        <TourPanel />
        <MerchPanel />
        <VisualsPanel />
        <FanWorldPanel />
        <CtaPanel />
      </main>
    </ArtistProvider>
  );
}
```

- [ ] **Step 2: Create `concept-app/app/[slug]/page.js`**

```js
import { notFound } from 'next/navigation';
import { getArtist, allArtistSlugs } from '@/config/artists';
import ConceptSite from '@/components/ConceptSite';

export function generateStaticParams() {
  return allArtistSlugs().map((slug) => ({ slug }));
}

export const metadata = { robots: { index: false, follow: false } };

export default function Page({ params }) {
  const artist = getArtist(params.slug);
  if (!artist) notFound();
  return <ConceptSite artist={artist} />;
}
```

- [ ] **Step 3: Run dev server and verify the flagship renders**

Run: `cd concept-app && npm run dev` then open `http://localhost:3000/concept/tony-effe/`
Expected: page loads, name animates in, 3D diamond floats behind, panels scroll with wipes, panel index visible. (Images 404 until assets added — acceptable now.)

- [ ] **Step 4: Build to verify it compiles**

Run: `cd concept-app && npx next build`
Expected: build succeeds; `/concept/[slug]` is generated for `tony-effe`.

- [ ] **Step 5: Commit**

```bash
git add concept-app/components/ConceptSite.jsx concept-app/app/[slug]/page.js
git commit -m "feat(concept-app): assemble ConceptSite + [slug] route"
```

---

## Task 13: Mobile fallback (disable heavy 3D)

**Files:**
- Modify: `concept-app/components/stage/Stage3D.jsx`

- [ ] **Step 1: Add capability guard to `Stage3D.jsx`** — replace the component body with:

```jsx
'use client';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { getObject3D } from './objects';

export default function Stage3D({ objectKey, accent }) {
  const progress = useScrollProgress();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 768px)').matches;
    setEnabled(!reduce && !small);
  }, []);
  const Obj = getObject3D(objectKey);
  if (!enabled) {
    // Lightweight CSS fallback: a soft accent glow, no WebGL.
    return <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: `radial-gradient(circle at 50% 35%, ${accent}22, transparent 60%)` }} />;
  }
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <Obj accent={accent} progress={progress} />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Verify** — resize browser < 768px on the dev server; confirm WebGL canvas is replaced by the glow and the page still scrolls/reads well.

- [ ] **Step 3: Commit**

```bash
git add concept-app/components/stage/Stage3D.jsx
git commit -m "feat(concept-app): mobile/reduced-motion 3D fallback"
```

---

## Task 14: e2e smoke test (routing + noindex + panels)

**Files:**
- Create: `concept-app/playwright.config.mjs`
- Create: `concept-app/e2e/smoke.spec.js`

- [ ] **Step 1: Create `concept-app/playwright.config.mjs`**

```js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  webServer: { command: 'npm run dev', url: 'http://localhost:3000/concept/tony-effe/', reuseExistingServer: true, timeout: 120000 },
  use: { baseURL: 'http://localhost:3000' },
});
```

- [ ] **Step 2: Create `concept-app/e2e/smoke.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('flagship renders with name and noindex', async ({ page }) => {
  await page.goto('/concept/tony-effe/');
  await expect(page.locator('h1')).toContainText('TONY');
  const robots = await page.locator('meta[name="robots"]').getAttribute('content');
  expect(robots).toMatch(/noindex/);
});

test('unknown artist 404s', async ({ page }) => {
  const res = await page.goto('/concept/nobody/');
  expect(res?.status()).toBe(404);
});
```

- [ ] **Step 3: Install Playwright browser + run**

Run: `cd concept-app && npx playwright install chromium && npm run e2e`
Expected: 2 passing.

- [ ] **Step 4: Commit**

```bash
git add concept-app/playwright.config.mjs concept-app/e2e/smoke.spec.js
git commit -m "test(concept-app): e2e smoke (routing + noindex)"
```

---

## Task 15: Asset folders + placeholders + nano-banana README

**Files:**
- Create: `concept-app/public/artists/tony-effe/.gitkeep` and placeholder images
- Create: `concept-app/public/artists/tony-effe/README.md`

- [ ] **Step 1: Create the asset folder structure**

Run:
```bash
cd concept-app/public/artists/tony-effe
mkdir -p merch visuals motion raw
```

- [ ] **Step 2: Create `concept-app/public/artists/tony-effe/README.md`**

```markdown
# Tony Effe — assets

Drop files with these EXACT names (the config points to them):

- `hero.jpg`        — vertical hero, >=1600px tall
- `portrait.jpg`    — square, used by the pixel-reveal
- `music-cover.jpg` — square album cover
- `merch/hoodie.jpg`, `merch/tee.jpg`, `merch/cap.jpg` — 3:4
- `visuals/v1.jpg`, `visuals/v2.jpg` — 16:9 thumbs
- `motion/hero.mp4` — 6–10s loop, 1080p, muted (made with nano banana)

Workflow: gather photos (Canva/web) -> `raw/` -> pick best -> animate stills to MP4
loops with nano banana -> place in `motion/`. Keep images <=1920px, JPG/WebP.
```

- [ ] **Step 3: Add temporary placeholder images so the page has no 404s during review**

Use any solid-color placeholder (e.g. export from the design companion, or a 1x1 you scale). The engineer should drop real exports later. Verify the page shows imagery, not broken icons.

- [ ] **Step 4: Commit (folder + README only; real assets added by Lorenzo)**

```bash
git add concept-app/public/artists/tony-effe/README.md
git commit -m "chore(concept-app): asset folder structure + nano-banana guide"
```

---

## Task 16: Wire iconent.it proxy + clean URL

**Files:**
- Modify: `vercel.json` (root of `Sito iconent italia`)

- [ ] **Step 1: Deploy `concept-app` as its own Vercel project** (manual, Lorenzo/floor: this is a deploy action — confirm before running).

Run (when authorized): `cd concept-app && npx vercel --prod`
Note the production URL, e.g. `https://iconent-concept.vercel.app`.

- [ ] **Step 2: Add a rewrite + clean-URL redirect to root `vercel.json`** — inside `rewrites`, add:

```json
{ "source": "/tonyeffe-concept", "destination": "https://iconent-concept.vercel.app/concept/tony-effe" },
{ "source": "/tonyeffe-concept/", "destination": "https://iconent-concept.vercel.app/concept/tony-effe/" },
{ "source": "/tonyeffe-concept/:path*", "destination": "https://iconent-concept.vercel.app/concept/tony-effe/:path*" }
```

- [ ] **Step 3: Confirm `robots.txt` / `sitemap.xml` do NOT list the concept slugs** (they must stay out of search).

- [ ] **Step 4: Verify live** — `https://iconent.it/tonyeffe-concept/` serves the concept; `view-source` shows `noindex`.

- [ ] **Step 5: Commit (root site repo)**

```bash
git add vercel.json
git commit -m "feat(site): proxy /tonyeffe-concept to concept app"
```

---

## Task 17: Prove replication — add a second artist (config-only)

**Files:**
- Create: `concept-app/config/artists/sfera-ebbasta.js`
- Modify: `concept-app/config/artists.js` (register)
- Create: `concept-app/public/artists/sfera-ebbasta/` (assets folder + README)

- [ ] **Step 1: Copy `tony-effe.js` to `sfera-ebbasta.js`**, change `slug`, `name`,
  `accent` (tasteful magenta e.g. `#b5179e`), `manifesto`, asset paths, tour, merch.
  Keep `object3D` as `diamond` for now (or add a new object later).

- [ ] **Step 2: Register in `config/artists.js`**

```js
import sfera from './artists/sfera-ebbasta';
// REGISTRY:
const REGISTRY = { 'tony-effe': tonyEffe, 'sfera-ebbasta': sfera };
```

- [ ] **Step 3: Verify** — `http://localhost:3000/concept/sfera-ebbasta/` renders with the new
  accent and copy, **no component edits**. This validates the template→replicate design.

- [ ] **Step 4: Run unit + e2e**

Run: `cd concept-app && npm test && npm run e2e`
Expected: all green.

- [ ] **Step 5: Commit**

```bash
git add concept-app/config/artists/sfera-ebbasta.js concept-app/config/artists.js concept-app/public/artists/sfera-ebbasta/README.md
git commit -m "feat(concept-app): add Sfera Ebbasta (config-only) — proves replication"
```

---

## Self-Review notes

- **Spec coverage:** intro/manifesto/music/tour/merch/visuals/fanworld/cta panels → Task 11;
  persistent morphing 3D → Tasks 7/13; clip wipes + house motion → Tasks 6/8; Lenis + keyboard
  → Task 9; pixel portrait → Task 10; config-driven replication → Tasks 2/3/17; Next.js +
  separate Vercel project + proxy mirroring listino-app → Tasks 1/16; noindex + concept label →
  Tasks 4/11/12/14; mobile fallback → Task 13; asset pipeline/folders → Task 15.
- **Deferred (future plans):** remaining 4 artists (repeat Task 17 pattern); bespoke 3D object
  per artist (extend `objects.js`); the object-morph-between-panels can be deepened once assets
  exist (currently a single scroll-driven transform — sufficient for the flagship).
- **Type consistency:** `getArtist`/`allArtistSlugs`, `getObject3D`, `useArtist`,
  `computePanelState`/`usePanelProgress`, `useScrollProgress`, `wipe`/`rise`/`stagger`
  used consistently across tasks.
- **Floor/safety:** Task 16 deploy is a publish action — requires Lorenzo's go per the
  founder floor; everything else is local and autonomous.
```
