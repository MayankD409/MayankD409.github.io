# mayankd.me — full redesign spec

Decisions locked 2026-08-07. This document is the single source of truth for the
rebuild. The current Gatsby site keeps deploying untouched until Phase 4 swap.

## Locked decisions

| Decision | Choice |
|---|---|
| Framework | Astro 5 + React islands, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui primitives inside islands |
| Theme | Dual theme, **dark default**. Direction: eddyhdzg dark + Maxime Heckel blues. Cream/terracotta retired. |
| Homepage | Single dense page, anchor nav + ⌘K command palette (`cmdk`) |
| Content | MDX, typed content collections (zod) ported from `content/` |
| Motion | Motion (framer-motion successor) + Astro View Transitions |
| Hosting | GitHub Pages, same CNAME/DNS. Revisit (Cloudflare Pages) only when a lab needs a Worker. |
| Labs | React islands; heavy demos as standalone Vite bundles under `/labs/<slug>` |

## Design tokens v0

Values are ours, in the family of the references (their exact tokens are
JS-rendered and weren't scrapable — and copying hexes verbatim isn't the goal).
Tune in one file: `src/styles/tokens.css` via Tailwind v4 `@theme`.

### Dark (default)

| Token | Value | Use |
|---|---|---|
| `--background` | `#0B0E14` | page (blue-tinted near-black) |
| `--card` | `#111520` | raised surfaces, cards |
| `--border` | `#1E2433` | hairlines, dividers |
| `--foreground` | `#E6EAF2` | primary text |
| `--muted-foreground` | `#8A93A6` | secondary text |
| `--faint` | `#5C6575` | timestamps, tertiary |
| `--accent` | `#5B8DF5` | links, focus, the one accent (Maxime-family azure) |
| `--accent-hover` | `#7DA5F8` | |
| `--glow` | `radial-gradient(#5B8DF5 → transparent)` at ~8% opacity | hero backdrop only |

### Light

| Token | Value | Use |
|---|---|---|
| `--background` | `#FBFBFC` | |
| `--card` | `#F3F4F7` | |
| `--border` | `#E3E6EC` | |
| `--foreground` | `#171B26` | |
| `--muted-foreground` | `#5A6372` | |
| `--accent` | `#3B6EE0` | darker for contrast on light |

### Rules

- Contrast floor: 4.5:1 body text, 3:1 large text/UI — checked in review, not
  assumed. (The old site shipped 1.08:1 text twice; never again.)
- One accent color. No gradients except the single hero glow.
- Radius 8px. Shadows subtle, two levels max.
- Motion: 150–250ms, ease-out. Everything honors `prefers-reduced-motion`.
- Theme via `data-theme` on `<html>`, inline script pre-paint (no flash), stored
  in `localStorage`, defaults dark, respects a system-preference first visit.

### Typography

- **Geist Sans** (UI + body), **Geist Mono** (code, labels, metadata) — both
  free/open, self-hosted woff2, `font-display: swap`.
- Scale: 13 / 14 / 16 (body) / 18 / 22 / 28 / 40 / 56. Line-height 1.6 body,
  1.15 headings. Max measure ~68ch for prose.

### Brand motif

Point clouds — it is literally the job. Hero gets a subtle animated point-drift
canvas (plain 2D canvas, no three.js in the shell), static SVG fallback for
`prefers-reduced-motion` and no-JS. three.js loads only inside labs.

## Information architecture

```
/                 single page: hero → selected work → labs grid → writing → about → contact
/labs             labs index (rauno.me/craft equivalent)
/labs/<slug>      individual interactive demos (islands / Vite bundles)
/blog             writing index
/blog/<slug>      MDX posts w/ inline interactive widgets (Maxime pattern)
/archive          full project table (kept)
/resume.pdf       kept, same path (linked from resume header + nav)
```

### Route/anchor parity (SEO + inbound links)

| Old | New |
|---|---|
| `/#about` | `/#about` (same id) |
| `/#jobs` | `/#experience` **and keep `id="jobs"` alias anchor** |
| `/#projects` | `/#projects` |
| `/#publications` | `/#publications` (small section, 1 IEEE paper) |
| `/#contact` | `/#contact` |
| `/blog`, `/blog/<slug>` | identical — slugs preserved exactly |
| `/archive` | identical |
| `/pensieve/*` | redirect (meta-refresh + canonical) → `/blog` |

## Components (island annotations)

| Component | Hydration |
|---|---|
| Nav (name + 3 links + theme toggle + ⌘K hint) | static + tiny island for toggle |
| CommandPalette (`cmdk`: sections, posts, labs, resume, socials, theme) | `client:idle` |
| PointCloudHero | `client:visible`, <15KB, canvas 2D |
| ExperienceTimeline (Brittany-v5 style: role progression, tag chips) | static |
| WorkCard / LabCard (metadata discipline: stack badges, "runs in browser", size) | static |
| SpotlightHover (v5-style cursor glow on cards) | CSS-only where possible |
| PostList, Prose (MDX styles) | static |
| ContributionHeatmap (GitHub GraphQL **at build time** — no client API calls) | static |
| Footer (design credit: inspired-by list) | static |
| OG images | build-time generation (satori) per page, new brand |

## Content collections (zod sketch)

- `jobs`: { company, title, location, range, url, order } + body (port `content/jobs/*` incl. Contoro)
- `projects`: { title, tech[], github?, external?, date, featured?, showInProjects? }
- `posts`: { title, description, date, slug, tags[], draft } — MDX
- `labs`: { title, summary, stack[], status: live|wip, sizeKB?, wow: one-liner }

## SEO carry-over checklist (all currently working — must not regress)

- [ ] JSON-LD Person (jobTitle "Robotics Perception Engineer", worksFor Contoro
      Robotics `https://contoro.com/`, sameAs: GitHub / X / LinkedIn
      `msdeshpande04` / Medium) — port from `src/components/head.js`
- [ ] `google-site-verification` meta (value in head.js)
- [ ] Google Analytics tag (id in `gatsby-config.js`)
- [ ] `static/CNAME` → Astro `public/CNAME` (`mayankd.me`) — **the build must emit it**
- [ ] robots.txt, sitemap (Astro `@astrojs/sitemap`), canonical URLs
- [ ] og.png regenerated in new brand (satori), same path referenced in metas
- [ ] human.txt, llms.txt (new — eddyhdzg touch)
- [ ] 404 page

## Phases

Hard cap on shell: **4 weekends**. The labs are the differentiator; the shell is
table stakes. If the cap hits, ship what exists.

- **Phase 0 — freeze** (30 min): branch `legacy-gatsby` from `dev`; new work on
  `redesign`. Current site keeps deploying from `dev` until swap.
- **Phase 1 — spec** ✅ this document.
- **Phase 2 — scaffold** (~1 weekend): Astro 5 + Tailwind v4 + MDX + React;
  tokens file; content collections ported; CI workflow (Node 20, `npm ci`,
  lockfile from day one) building to Pages artifact on `redesign` pushes to a
  preview path. DoD: `astro build` green, content typed, both themes render.
- **Phase 3 — core build** (~2 weekends): all components above, single page,
  blog + archive parity, ⌘K, SEO checklist complete. DoD: Lighthouse ≥95
  perf/a11y/SEO mobile + desktop, route parity table verified.
- **Phase 4 — swap** (1 evening): point the deploy workflow at the new build on
  `dev` (merge), verify live domain, CNAME, resume.pdf, JSON-LD on production.
  Tag `legacy-gatsby` for posterity.
- **Phase 5 — labs**: C1 Fund-of-One first (the Actions agent is
  shell-independent — start its cron even before Phase 4), then A1 Live Sensor
  Lab, then B1 Mini Unloader. Per the labs plan already agreed.

## Risks / rules

1. **No Contoro data, models, meshes, or parameters anywhere.** Synthetic +
   public datasets only. Personal time and hardware.
2. Shell-polishing trap: the 4-weekend cap is real.
3. Contrast bugs were the old site's chronic disease — every color pair gets
   checked at review time.
4. Voice: site copy is Mayank's casual site voice (rhetorical questions, asides),
   not resume voice, not PR voice. No AI-slop tells.
5. Homepage JS budget: <100KB total hydrated. three.js never loads on `/`.

## Inspiration ledger (what we took from whom)

- eddyhdzg.com — ⌘K spine, card metadata discipline, Geist, llms.txt, heatmap
- rauno.me — /labs as craft page, restraint, copy-email micro-interaction
- blog.maximeheckel.com — blue-family palette direction, MDX interactive posts
- brittanychiang.com v5 — single-page IA, timeline, spotlight hover, tag chips
- joshwcomeau.com — post-as-playground, theming rigor
- emilkowal.ski — text-forward hierarchy, writing as first-class
- antfu.me — restraint, motif kept subtle
- bruno-simon.com — the boundary: 3D lives in labs, never the shell
