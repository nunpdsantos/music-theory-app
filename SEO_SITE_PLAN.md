# Plan: SEO Content Site (Astro)

## Context

The app is a Vite + React SPA behind a single URL. Google cannot index it. The highest-leverage distribution strategy is generating hundreds of static, indexable pages from the existing music theory data in `src/core/` (~16,600 lines of pure TypeScript, framework-agnostic). Astro generates static HTML at build time with zero JS shipped by default — perfect for content pages that need to rank in search.

## Architecture

**Astro project in `site/` subdirectory.** Imports data from `../src/core/` via TypeScript path alias. No monorepo tooling. No React hydration in Phase 1 — pure static HTML + inline SVG diagrams. Interactive React islands are a separate future phase.

```
new_music_app/
├── src/              → existing SPA (unchanged)
│   ├── core/         → pure TS music theory engine (imported by site/)
│   └── data/         → songReferences.ts, curriculumLoader.ts (imported selectively)
├── site/             → NEW Astro project
│   ├── astro.config.mjs
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── layouts/
│       │   ├── Base.astro            → HTML shell, nav, footer, global CSS
│       │   └── ContentPage.astro     → Base + article wrapper, breadcrumbs, CTA
│       ├── components/
│       │   ├── SEOHead.astro         → title, meta, OG, structured data
│       │   ├── PianoDiagram.astro    → static SVG piano with highlighted notes
│       │   ├── NoteTable.astro       → scale/chord note + interval table
│       │   ├── DiatonicChordsTable.astro → Roman numerals + chord links
│       │   ├── RelatedLinks.astro    → related scales/chords/keys links
│       │   ├── Breadcrumbs.astro
│       │   └── AppCTA.astro          → "Try it interactively" button
│       ├── pages/
│       │   ├── index.astro           → landing page
│       │   ├── scales/[slug].astro   → 552 scale pages
│       │   ├── chords/[slug].astro   → 672 chord pages
│       │   ├── keys/[slug].astro     → 24 key pages
│       │   ├── intervals/[slug].astro → 13 interval pages
│       │   ├── lessons/[slug].astro  → 118 lesson pages
│       │   └── tools/
│       │       ├── circle-of-fifths.astro
│       │       └── key-signature-chart.astro
│       ├── data/
│       │   ├── slugHelpers.ts        → noteToSlug, scaleTypeToSlug, etc.
│       │   └── circleData.ts         → copied from circleOfFifthsConstants.ts (pure data only)
│       └── styles/
│           └── global.css
└── ...existing files
```

## Key Design Decisions

1. **Astro over Next.js** — Ships zero JS by default. Content pages are text + SVG, not interactive apps. Astro is purpose-built for this.

2. **Path alias, not monorepo** — `@core` alias in tsconfig + Vite resolves to `../src/core/`. One-directional, no tooling overhead. `@appdata` alias for selective imports from `../src/data/`.

3. **Static SVG diagrams, not React components** — The existing Piano, CircleOfFifths, etc. are tightly coupled to Zustand stores. Creating prop-based Astro components that generate SVG at build time is faster to build and ships zero JS. A `PianoDiagram.astro` calls `getPitchClass()` from core/ and renders inline SVG with highlighted notes.

4. **`getStaticPaths()` generates all pages** — Each page type iterates over 12 roots × N types. `buildScale()`, `buildChord()`, etc. run at build time. Output is pure HTML.

5. **Template-based educational content** — Each page type has a content template that fills in data-specific details. Not hand-written prose, but factually correct and indexable. Example: "The C Major scale consists of 7 notes: C, D, E, F, G, A, B. It follows the interval pattern W-W-H-W-W-W-H."

6. **Copy `circleOfFifthsConstants` data** — The original file is in `src/components/theory/` (not core/) and references CSS variables. Copy the 3 pure data arrays (`CIRCLE_MAJOR`, `CIRCLE_MINOR`, `KEY_SIGNATURES`) into `site/src/data/circleData.ts`. ~20 lines.

## Implementation Steps

### Step 1: Scaffold Astro project
- Create `site/` directory with `package.json`, `astro.config.mjs`, `tsconfig.json`
- Dependencies: `astro`, `@astrojs/sitemap`, `typescript`
- Configure `@core` alias → `../src/core/`, `@appdata` alias → `../src/data/`
- Add `site/node_modules`, `site/dist` to root `.gitignore`
- Add `site:dev` and `site:build` scripts to root `package.json`
- Verify: `cd site && npm install && npm run dev` starts without errors

### Step 2: Create slug helpers and data utilities
- `site/src/data/slugHelpers.ts` — `ALL_ROOTS` (12 notes), `noteToSlug()`, `slugToNote()`, `scaleTypeToSlug()`, `chordQualityToSlug()`, `moduleIdToSlug()`
- `site/src/data/circleData.ts` — copy `CIRCLE_MAJOR`, `CIRCLE_MINOR`, `KEY_SIGNATURES` arrays

### Step 3: Create layouts
- `Base.astro` — `<html>`, `<head>` with SEOHead slot, minimal nav (logo + link to app), footer
- `ContentPage.astro` — extends Base, adds article wrapper, breadcrumbs, "Try it in the app" CTA at bottom
- `global.css` — minimal typography, table styling, responsive layout. NOT shared with SPA.

### Step 4: Create reusable Astro components
- `SEOHead.astro` — accepts title, description, canonicalUrl, structuredData, breadcrumbs. Renders `<title>`, meta, OG tags, JSON-LD.
- `PianoDiagram.astro` — accepts `notes: Note[]`. Generates 2-octave SVG piano with highlighted notes (degree-colored). Pure build-time SVG, zero JS.
- `NoteTable.astro` — accepts notes + intervals. Renders HTML table: degree number, note name, interval name, semitones.
- `DiatonicChordsTable.astro` — accepts diatonic chords array. Renders table with Roman numerals, chord names, links to chord pages.
- `RelatedLinks.astro` — accepts list of {label, href} pairs. Renders as a link grid for related scales/chords/keys.
- `Breadcrumbs.astro`, `AppCTA.astro`

### Step 5: Build scale page template (MVP — 24 pages)
- `site/src/pages/scales/[slug].astro`
- `getStaticPaths()` generates 12 major + 12 natural minor = 24 pages initially
- Each page: H1, note table, piano SVG, interval formula, diatonic chords table, related scales links, CTA
- Content template fills in data-specific educational text
- SEO: structured data (`DefinedTerm`), breadcrumbs (`BreadcrumbList`)
- Verify: `npm run build` generates 24 HTML files, inspect output

### Step 6: Build chord page template (24 pages)
- `site/src/pages/chords/[slug].astro`
- 12 major + 12 minor chords initially
- Each page: H1, notes, intervals, piano SVG, inversions display, compatible scales, CTA
- Cross-links to scale pages via `CHORD_SCALE_MAP`

### Step 7: Build key page template (24 pages)
- `site/src/pages/keys/[slug].astro`
- 12 major + 12 minor keys
- Each page: key signature (sharps/flats count + names), scale notes, diatonic triads table, diatonic seventh chords table, circle of fifths position, related keys (relative, parallel, dominant, subdominant), CTA

### Step 8: Build landing page
- `site/src/pages/index.astro`
- Hero section: headline, app description, screenshot/diagram, "Start Learning" CTA
- Feature grid: 6-8 key features with descriptions
- Curriculum overview: 9-level table from LEVEL_METADATA
- Scale/chord quick links: links to the 24 most common scales and chords
- Footer: links to tools, lessons, privacy policy placeholder

### Step 9: Build tool pages
- `circle-of-fifths.astro` — static SVG circle using data from `circleData.ts`, labels for all 12 major and minor keys, links to each key page
- `key-signature-chart.astro` — table of all 12 major keys with their sharps/flats, ordered by circle of fifths

### Step 10: Add sitemap, robots.txt, verify SEO
- `@astrojs/sitemap` auto-generates sitemap from all routes
- `site/public/robots.txt` with sitemap URL
- Verify: inspect generated HTML for proper `<title>`, meta description, OG tags, JSON-LD
- Verify: all internal links resolve, no broken hrefs

### Step 11: Expand to full catalog
- Unlock all 46 scale types in `getStaticPaths()` → 552 pages
- Unlock all 56 chord qualities → 672 pages
- Add 13 interval pages
- Add 118 lesson pages (import curriculum data from `@appdata`)
- Total: ~1,380 pages

## Page Counts by Phase

| Phase | Scale Pages | Chord Pages | Key Pages | Other | Total |
|-------|-------------|-------------|-----------|-------|-------|
| MVP (Steps 5-9) | 24 | 24 | 24 | ~5 | ~77 |
| Expand (Step 11) | 552 | 672 | 24 | ~131 | ~1,380 |

## Page Content Templates

**Scale page title:** `{Root} {Type} Scale — Notes, Intervals & Chords | Music Theory App`
**Scale page description:** `The {Root} {Type} scale: {noteList}. Interval formula, piano diagram, diatonic chords, and related scales.`

**Chord page title:** `{Root}{Symbol} Chord — Notes, Inversions & Scales | Music Theory App`
**Chord page description:** `{Root} {QualityName} chord: {noteList}. Intervals, piano diagram, all inversions, and compatible scales.`

**Key page title:** `Key of {Root} {Mode} — Chords & Key Signature | Music Theory App`
**Key page description:** `{Root} {Mode}: {sharpOrFlatCount}. Diatonic triads, seventh chords, related keys, and circle of fifths position.`

## Critical Source Files

| File | What it provides | Used by |
|------|-----------------|---------|
| `src/core/constants/scales.ts` | `SCALE_FORMULAS`, `SCALE_TYPE_NAMES`, `buildScale()` | Scale pages |
| `src/core/constants/chords.ts` | `CHORD_FORMULAS`, `CHORD_QUALITY_NAMES`, `buildChord()`, `getDiatonicTriads()`, `getDiatonicChordsForScale()`, `invertChord()`, `INTERVAL_LABELS`, `getChordIntervalLabels()` | Chord, key, scale pages |
| `src/core/constants/intervals.ts` | `SEMITONES_TO_INTERVAL`, `buildInterval()` | Interval pages |
| `src/core/utils/keyRelationships.ts` | `getRelativeMinor()`, `getRelativeMajor()`, `getRelatedKeys()` | Key pages, scale pages |
| `src/core/constants/chordScaleRelationships.ts` | `CHORD_SCALE_MAP` | Cross-links on chord/scale pages |
| `src/core/constants/modes.ts` | `MODE_INFO`, `buildMode()` | Scale pages for modal scales |
| `src/core/types/music.ts` | All type definitions, `noteToString()` | Everything |
| `src/core/constants/notes.ts` | `getPitchClass()`, `PITCH_CLASS_SPELLINGS` | PianoDiagram SVG |
| `src/components/theory/circleOfFifthsConstants.ts` | `CIRCLE_MAJOR`, `CIRCLE_MINOR`, `KEY_SIGNATURES` | Copied to `site/src/data/circleData.ts` |
| `src/data/songReferences.ts` | `SONG_REFERENCES` | Lesson pages |
| `src/core/constants/curriculumL1-L9.ts` | `L1_UNITS` through `L9_UNITS` | Lesson pages |
| `src/data/curriculumLoader.ts` | `LEVEL_METADATA` | Landing page, lesson pages |

## Risks and Mitigations

1. **Core imports pulling unexpected deps** — Mitigated: core/ is pure TS with zero React/Zustand imports. Verified by 841 existing tests.
2. **`circleOfFifthsConstants.ts` has CSS var refs** — Mitigated: copy only the 3 data arrays, not the full file.
3. **`songReferences.ts` import chain** — Mitigated: file has zero deps beyond its own interface type. Direct import safe.
4. **Build time with 1,350 pages** — Mitigated: Astro 5.x handles thousands of pages in <30s. All computation is O(1) per page.

## Verification Checklist

- [ ] `cd site && npm install` — no errors
- [ ] `npm run dev` — dev server starts, landing page renders
- [ ] `npm run build` — generates static HTML for all pages
- [ ] Inspect a generated scale page HTML: has `<title>`, `<meta>`, OG tags, JSON-LD, piano SVG, note table, internal links
- [ ] Open in browser: all links work, no broken images, readable layout
- [ ] Run Lighthouse on a generated page: aim for 95+ Performance, 100 SEO, 100 Accessibility
- [ ] Validate sitemap: `site/dist/sitemap-index.xml` contains all page URLs

## Prerequisites Before Deployment

- [ ] Choose a domain name (Astro config `site` property and all canonical URLs depend on it)
- [ ] Decide deployment topology: `domain.com` for Astro site + `app.domain.com` for SPA, or both under one domain with path-based routing

## To Execute This Plan

Open a new session and say: "Implement the SEO content site. Plan is in `SEO_SITE_PLAN.md`."
