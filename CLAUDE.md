# CLAUDE.md

## Project

**Name:** Music Theory App
**Domain:** Music theory education / interactive instrument
**Stack:** React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS v4 + Zustand 5 + Framer Motion 12

### Commands

- `npm run dev` — start dev server (localhost:5173)
- `npm run build` — production build to `dist/`
- `npx tsc -b` — type-check (no emit)

### Gotchas

- `src/core/` is copied from the original app at `~/Desktop/studio/projects/Music AI/src/`. Do not modify these files — they're framework-agnostic shared logic.
- TypeScript strictness is relaxed (`noUnusedLocals: false`, `noUnusedParameters: false`) to accommodate copied core files.
- Three core files were removed (queryProcessor, parserRegistry, queryOptionHandler) because they had unresolvable imports to UI components from the old app.
- `visual.ts` has `SynthPresetName` inlined (was imported from a hook in the old app).
- Tailwind v4 uses CSS-first config (`@import "tailwindcss"` in index.css) + `@tailwindcss/vite` plugin.

### Architecture

```
src/
  core/           ~40 files, framework-agnostic music theory engine (types, constants, utils, services)
  design/tokens/  Color system (functional degree colors, surface colors) + motion tokens
  state/store.ts  Single Zustand store with music, instrument, audio, navigation, preferences slices
  components/
    instruments/  Piano, PianoKey, Fretboard, InstrumentSelector
    theory/       ScaleDegreeBar, ChordGrid, CircleOfFifths
    panels/       DetailPanel, ChordDetail, ScaleDetail
    navigation/   KeySelector, QuickSearch (Cmd+K)
    layout/       AppShell, TopBar
  views/          ExploreView, PlayView, LearnView
  hooks/          useAudio, useMidi, useKeyContext
```

**Interaction model:** Instrument-first. Piano/fretboard always visible at bottom. Three views: Explore (theory), Play (performance), Learn (curriculum). Cmd+K for power-user search. Color encodes scale degree function (tonic=blue, dominant=amber, leading=red).
