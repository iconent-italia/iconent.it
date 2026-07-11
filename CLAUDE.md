# sito iconent ita — fresh-chat orientation

The Italian public site for ICONENT (iconent.it). **Static HTML** at root (`index.html`, `chi-siamo`,
`management`, `spotify`, `tiktok`, `listino-*`, funnels) + `assets/`. Deployed via `deploy.sh` /
`vercel.json`. SEO/GEO-tuned (`llms.txt`, `robots.txt`, `sitemap.xml`).

Plus a **separate Next.js app in `concept-app/`** — the artist "concept website" prototypes
(motion/3D, flagship Tony Effe) used as a web-design sales showcase, proxied under iconent.it. This
is where current WIP lives (the `panels/*.jsx` + `ConceptSite.jsx`).

## Read FIRST (don't make me re-explain)

At session start read `~/.claude/projects/-Users-kenzo-Desktop/memory/MEMORY.md`, then:

- `project_artist-concept-sites.md` — the concept-app: goals, flagship, architecture, how it's
  proxied. Read before touching `concept-app/`.
- `reference_company-identity-and-team.md` — services, listino (IT = iconent.it page), team vs
  personas.
- `feedback_design-taste.md` — minimal premium 3D, anti-cheap. Hero uses the 3D blue depth-scanner
  sweep (matches the US site).
- `reference_gemini-account.md` — concept-site logos/videos are generated on the upgraded Gemini
  account (admin@iconent-group.com).
- `reference_claude-seo-skill.md` — `/seo audit` + API-key gaps.

## Skills + agents to activate

- **SEO/GEO** → the `seo-*` agent swarm (seo-technical, seo-schema, seo-geo, seo-sitemap, …).
- **Concept-app frontend (Next.js/React/Tailwind, 3D/motion)** → UI skill if present
  (`~/.claude/skills/ui-ux-pro-max/`), else design with the `feedback_design-taste` guardrails.
- Broad exploration → **Explore**; implementation strategy → **Plan**.

## Repo facts

- Static IT pages are hand-authored HTML at root — keep `sitemap.xml`, `llms.txt`, hreflang
  **reciprocal with the US site** (`../sito iconent group`) when adding/renaming pages.
- `concept-app/` is its own Next.js project (own `.gitignore`); run/build it from inside that dir.
- Deploy via `deploy.sh` / `vercel.json`.
- ⚠️ Bash PATH minimal → `export PATH="/usr/local/bin:$HOME/.npm-global/bin:$PATH"` before `node`/`vercel`.

## Persist what we decide

Lock a decision here → save to Lorenzo's brain memory (`reference_*`/`feedback_*` + `MEMORY.md`
index); repo-specific structure/deploy notes go in `docs/` / `README.md`. The point: a new chat must
inherit the know-how, not rediscover it.
