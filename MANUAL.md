# Music Theory App — Manual

A comprehensive interactive music theory application for learning scales, chords, harmony, and ear training. Runs entirely in the browser with no server required.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Interface Overview](#interface-overview)
3. [Key and Scale Selector](#key-and-scale-selector)
4. [Explore View](#explore-view)
5. [Play View](#play-view)
6. [Learn View](#learn-view)
7. [Instruments](#instruments)
8. [Keyboard Shortcuts](#keyboard-shortcuts)
9. [Quick Search](#quick-search)
10. [Scales Reference](#scales-reference)
11. [Chord System](#chord-system)
12. [Metronome](#metronome)
13. [Chord Progression Builder](#chord-progression-builder)
14. [Audio Recording](#audio-recording)
15. [MIDI Output](#midi-output)
16. [Scale Comparison](#scale-comparison)
17. [Print and Export](#print-and-export)
18. [Themes and Appearance](#themes-and-appearance)
19. [Language](#language)
20. [Offline Use (PWA)](#offline-use-pwa)
21. [Settings and Persistence](#settings-and-persistence)
22. [Accessibility](#accessibility)
23. [Running the App](#running-the-app)

---

## Getting Started

Open the app in a modern browser (Chrome, Firefox, Safari, Edge). The interface loads with C Major selected by default and the Explore view active. A piano keyboard sits at the bottom of the screen at all times — click or tap keys to hear notes.

The app has three views accessible from the top navigation bar:

- **Explore** — browse scales, chords, degrees, and the circle of fifths
- **Play** — perform with synth presets, metronome, recording, and MIDI
- **Learn** — work through a 9-level structured curriculum with exercises

All your preferences (selected key, scale, instrument, volume, theme, language) are saved automatically to your browser and restored on your next visit.

---

## Interface Overview

### Top Bar

The header contains:

- **View tabs** (Explore, Play, Learn) with an animated indicator showing the active view
- **Language selector** dropdown (English, Portuguese)
- **Theme toggle** button cycling through Dark, Light, and System modes
- **Quick Search** button (or press Cmd+K / Ctrl+K)

### Instrument Bar

The bottom of the screen always shows one of two instruments:

- **Piano** — 5 octaves (C2 through C6), playable with mouse/touch or computer keyboard
- **Guitar fretboard** — 6 strings, 22 frets, with optional chord shapes and scale positions

Switch between them using the instrument selector tabs above the instrument.

---

## Key and Scale Selector

Visible in both Explore and Play views. Two rows of controls:

### Root Note

A strip of 12 buttons for every chromatic pitch: C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, B. Click one to set the root. The selected root shows a blue highlight that slides between notes.

### Scale Type

46 scales organized into 8 groups. The first 4 groups are always visible:

| Group | Scales |
|-------|--------|
| Core | Major, Minor |
| Minor Variants | Harmonic Minor, Melodic Minor |
| Modes | Dorian, Phrygian, Lydian, Mixolydian, Locrian |
| Pentatonic / Blues | Pentatonic Major, Pentatonic Minor, Blues, Major Blues |

Click **"More scales..."** to expand the remaining 4 groups:

| Group | Scales |
|-------|--------|
| Symmetric | Whole Tone, Diminished W-H, Diminished H-W, Chromatic |
| Mel. Minor Modes | Altered, Lydian Dominant, Phrygian Dominant, Locrian nat.2, Dorian b2, Lydian Augmented, Mixolydian b6 |
| Bebop | Bebop Dominant, Bebop Major, Bebop Dorian |
| World | Hungarian Minor, Hungarian Major, Double Harmonic, Persian, Neapolitan Minor, Neapolitan Major, Hirajoshi, In Sen, Iwato, Egyptian |

If your currently selected scale is in a hidden group, the list auto-expands to show it.

---

## Explore View

The theory browser. Shows everything about the current key and scale.

### Hero Card

Displays the current key name (e.g., "C Major"), the number of notes, and the note names. Action buttons:

- **Play** — plays the scale ascending through the synth
- **Details** — opens the detail panel with scale intervals and formula
- **Copy** — copies a plain-text scale and chord summary to clipboard
- **Print** — opens the browser print dialog with a print-optimized layout

### Scale Degree Bar

A row of 7 buttons (one per scale degree) showing:

- The note name
- The interval label (P1, M2, M3, P4, P5, M6, M7, etc.)
- The pitch class number

Each degree is color-coded:

| Degree | Name | Color |
|--------|------|-------|
| 1 | Tonic | Blue |
| 2 | Supertonic | Teal |
| 3 | Mediant | Green |
| 4 | Subdominant | Purple |
| 5 | Dominant | Amber |
| 6 | Submediant | Pink |
| 7 | Leading Tone | Red |

Click a degree to highlight its note on the instrument.

### Scale Comparison

An optional section for comparing two scales side by side. Select a second scale from the dropdown. A chromatic 12-slot grid appears showing:

- **Green dots** — notes shared by both scales
- **Blue dots** — notes unique to the first scale
- **Amber dots** — notes unique to the second scale

Counts are displayed (e.g., "5 shared, 2 unique to A, 1 unique to B"). Close the comparison with the X button. The comparison resets when you change the primary scale.

### Chord Grid

Two modes toggled by Diatonic / All Chords tabs:

- **Diatonic** — the 7 chords built from the scale (I, ii, iii, IV, V, vi, vii), color-coded by degree
- **All Chords** — every chord quality available on the root note, grouped by category (triads, sevenths, extensions, altered, suspended)

Click any chord to open the **Detail Panel**, a slide-out sidebar showing:

- Full chord voicing (all notes)
- Interval structure
- Inversion controls (root position, 1st, 2nd, 3rd inversion)
- Highlighted notes on the instrument below

### Circle of Fifths

A visual diagram of all 12 keys arranged by fifths. The current key is highlighted. Use it as a reference for key relationships, modulation targets, and relative major/minor pairs.

---

## Play View

Performance mode for playing the instrument with audio features.

### Sound Presets

Five synth voices:

| Preset | Character |
|--------|-----------|
| Piano | FM synthesis, percussive attack |
| Classic | Triangle wave, warm analog tone |
| Organ | Sustained sine, harmonic overtones |
| Strings | Filtered sawtooth, slow attack, lush |
| Pluck | Quick decay, bright transient |

### Active Notes Display

A real-time readout of notes currently being played, showing note names and their scale degree function (Tonic, Dominant, etc.) with color coding.

### Scale Reference

For 7-note scales, shows a strip of all scale degrees with Roman numerals. The currently sounding degree lights up during play.

### Volume and Octave

- **Volume slider** — 0 to 100%, controls synth output (not metronome)
- **Octave selector** — sets the base octave (2 through 6) for keyboard playback and instrument display

---

## Learn View

A structured 9-level music theory curriculum with interactive exercises.

### Navigation

The Learn view is a drill-down hierarchy:

1. **Levels Overview** — all 9 levels with progress bars
2. **Level Detail** — units within the selected level
3. **Unit Detail** — modules within the selected unit
4. **Module View** — content, objectives, tasks, and exercises

Use the breadcrumb trail at the top to navigate back up.

### Curriculum Levels

| Level | Title | Difficulty | Modules |
|-------|-------|-----------|---------|
| 1 | Foundations of Music Literacy | Beginner | 10 |
| 2 | Expanding Fundamentals | Beginner | 12 |
| 3 | Harmony Foundations | Upper Beginner | 13 |
| 4 | Diatonic Mastery | Intermediate | 15 |
| 5 | Chromaticism and Modulation | Upper Intermediate | 14 |
| 6 | Chromatic Harmony | Advanced Intermediate | 12 |
| 7 | Jazz, Pop, and Modal Harmony | Advanced | 16 |
| 8 | Analysis, Counterpoint, Post-Tonal | Advanced | 11 |
| 9 | Ear Training and Aural Skills | All Levels | 15 |

Levels 1 through 8 are sequential — each requires the previous level to be completed. Level 9 (Ear Training) runs as a parallel track with no prerequisites.

### Modules

Each module contains:

- **Learning Objectives** — what you'll understand after completing it
- **Practice Tasks** — activities to work through (reading, practice, exploration)
- **Exercises** — interactive questions and instrument-based challenges

Mark a module complete when you've finished all tasks and passed the exercises (80% or higher).

### Exercise Types

Seven kinds of exercises appear throughout the curriculum:

| Type | What You Do |
|------|-------------|
| Note Identification | See a note, choose its name from 4 options |
| Interval Identification | See two notes, identify the interval between them |
| Scale Construction | Given a root and scale type, select all correct notes on the instrument |
| Chord Construction | Given a chord symbol, select all correct notes on the instrument |
| Multiple Choice | Answer a theory question from 4 options |
| Ear Training | Listen to a note, interval, or chord and identify it by ear |
| Scale Degree ID | Given a note within a scale context, identify its degree number |

### Scoring

- **First attempt correct**: 1 point
- **Second attempt correct**: 0.5 points
- **Failed**: 0 points
- **Pass threshold**: 80% average across all exercises in a module

Your scores are saved to your browser. You can replay exercises to improve your score.

---

## Instruments

### Piano

A full 5-octave piano keyboard (C2 through C6) at the bottom of the screen.

- **Click/tap** any key to play a note
- **Scale notes** are highlighted with their degree color
- **Chord voicing notes** appear bolded when a chord is selected
- **Active notes** glow while held
- **Octave selector** buttons above the keyboard let you shift the visible range

The piano is responsive: keys are wider on desktop (46px), medium on tablet (36px), and compact on mobile (30px). Scroll horizontally to reach all octaves.

### Guitar Fretboard

A 6-string, 22-fret guitar fretboard with standard fret markers (3, 5, 7, 9, 12, 15, 17, 19, 21; double dots at fret 12).

- **Click/tap** any fret intersection to play a note
- **Scale notes** are highlighted with their degree color
- **Root notes** are accented
- **Drag horizontally** to scroll across frets

#### Tunings

Six tunings are available (select from the pill buttons above the fretboard):

| Tuning | Strings (low to high) |
|--------|----------------------|
| Standard | E A D G B E |
| Drop D | D A D G B E |
| Half Step Down | Eb Ab Db Gb Bb Eb |
| Open G | D G D G B D |
| Open D | D A D F# A D |
| DADGAD | D A D G A D |

Chord shapes and CAGED scale positions are only available in standard tuning. Scale note highlighting works in all tunings. Changing tuning resets any active scale position.

#### Keyboard Navigation

When the fretboard has focus:

- **Arrow keys** — move between frets and strings
- **Enter / Space** — play the focused note
- **Escape** — clear focus

A screen reader announcement describes the focused note (name, fret number, string number).

---

## Keyboard Shortcuts

### Computer Keyboard Piano

Play notes using your computer keyboard. The mapping follows a piano-like layout:

**White keys (bottom row):**

| Key | Note |
|-----|------|
| A | C |
| S | D |
| D | E |
| F | F |
| G | G |
| H | A |
| J | B |

**Black keys (top row):**

| Key | Note |
|-----|------|
| W | C# |
| E | D# |
| T | F# |
| Y | G# |
| U | A# |

**Extended range (next octave):**

| Key | Note |
|-----|------|
| K | C |
| O | C# |
| L | D |
| P | D# |
| ; | E |

Notes play in the currently selected base octave. Holding a key sustains the note; releasing it stops playback. Modifier keys (Shift, Ctrl, Alt, Cmd) and typing in input fields do not trigger notes.

### Application Shortcuts

| Shortcut | Action |
|----------|--------|
| Cmd+K (Mac) / Ctrl+K | Open Quick Search |
| Escape | Close Quick Search, detail panel, or clear fretboard focus |

---

## Quick Search

Press **Cmd+K** (Mac) or **Ctrl+K** (Windows/Linux) to open the search modal.

Type any of the following:

- **Scale name** — "D harmonic minor", "C dorian", "Bb lydian"
- **Chord symbol** — "Cmaj7", "G7b9#11", "Am/G", "Fdim7"
- **Note name** — "Ab", "F#" (sets the root key)
- **Aliases** — "ionian" (finds Major), "aeolian" (finds Natural Minor)

Results appear instantly as you type, up to 8 matches. Each result shows a colored badge (Scale, Chord, or Key). Navigate results with arrow keys, press Enter to select, or click a result. Escape closes the search.

Selecting a scale result sets both the root and scale type. Selecting a chord result opens the chord detail panel.

---

## Scales Reference

The app includes 46 scale types across 8 categories.

### Core (2)
Major, Natural Minor

### Minor Variants (2)
Harmonic Minor, Melodic Minor

### Modes of the Major Scale (5)
Dorian, Phrygian, Lydian, Mixolydian, Locrian

### Pentatonic and Blues (4)
Pentatonic Major (5 notes), Pentatonic Minor (5 notes), Blues (6 notes), Major Blues (6 notes)

### Symmetric (4)
Whole Tone (6 notes), Diminished Whole-Half (8 notes), Diminished Half-Whole (8 notes), Chromatic (12 notes)

### Melodic Minor Modes (7)
Altered (Super Locrian), Lydian Dominant, Phrygian Dominant, Locrian nat.2, Dorian b2, Lydian Augmented, Mixolydian b6

### Bebop (3)
Bebop Dominant (8 notes), Bebop Major (8 notes), Bebop Dorian (8 notes)

### World (10)
Hungarian Minor, Hungarian Major, Double Harmonic (Byzantine/Arabic), Persian, Neapolitan Minor, Neapolitan Major, Hirajoshi (5 notes), In Sen (5 notes), Iwato (5 notes), Egyptian (5 notes)

Each scale can be applied to any of the 12 root notes, giving 552 possible key/scale combinations.

---

## Chord System

### Chord Qualities

The app supports 42+ chord qualities including:

- **Triads** — major, minor, diminished, augmented
- **Seventh chords** — maj7, min7, dom7, dim7, half-dim7, aug7, min/maj7
- **Suspensions** — sus2, sus4, 7sus4, 9sus4
- **Extensions** — add9, add11, 6/9, min6/9
- **Extended** — maj9, min9, dom9, maj11, min11, dom11, maj13, min13, dom13
- **Altered dominants** — 7b9, 7#9, 7b5, 7#5, 7alt, 9#11, 13b9

### Diatonic Chords

For any 7-note scale, the app builds 7 diatonic chords (one rooted on each scale degree) using only notes from the scale. These are labeled with Roman numerals:

- Uppercase for major (I, IV, V)
- Lowercase for minor (ii, iii, vi)
- Superscript symbols for diminished (vii) and augmented

### Inversions

When viewing a chord in the detail panel, cycle through inversions:

- **Root position** — root note in bass
- **1st inversion** — 3rd in bass
- **2nd inversion** — 5th in bass
- **3rd inversion** — 7th in bass (seventh chords only)

The instrument highlights update to show the inverted voicing.

### Algorithmic Parsing

Quick Search understands complex chord symbols like Cmaj7#11, G7b9#11, Dm7b5/A (slash chords with bass note), parsing them into correct note sets on the fly.

---

## Metronome

Located in the Play view. Provides a click track for practice.

### Controls

- **Play/Stop toggle** — starts or stops the metronome
- **BPM slider** — tempo from 30 to 300 beats per minute
- **Time signature selector** — 2/4, 3/4, 4/4, or 6/8
- **Volume slider** — independent from the synth volume
- **Beat indicator** — animated dots showing the current beat (accent on beat 1)

The metronome uses a Web Audio look-ahead scheduler for sample-accurate timing. It runs independently from synth playback — you can play notes over the click.

---

## Chord Progression Builder

Located in the Play view. Build and play back chord sequences.

### How to Use

1. The palette shows all diatonic chords from the current key, color-coded by degree
2. Click a chord to append it to your progression
3. The sequence appears as a row of chord pills
4. Click any chord in the sequence to remove it
5. Use **Clear** to remove all chords

### Playback

Click **Play** to hear the progression played sequentially through the current synth preset. Each chord sounds for about 1 second. Click **Stop** to halt playback. The progression uses the current base octave setting.

---

## Audio Recording

Located in the Play view. Record your performances and play them back.

### How to Use

1. Click **Record** to start capturing
2. Play notes on the piano or fretboard — every note-on and note-off event is recorded with its timestamp
3. Click **Stop** to finish recording
4. Your recording appears as a numbered "Take" with its duration

### Playback

Click the play button on any take to hear it replayed with the original timing through the current synth preset. Each take is stored for the duration of your session (recordings are not persisted across page reloads).

### Delete

Click the delete button to remove a take.

---

## MIDI Output

Located in the Play view. Send MIDI note data to external hardware or software.

### Setup

1. Connect a MIDI device to your computer
2. Toggle **Enable MIDI output** on
3. Select your device from the dropdown

### How It Works

When enabled, every note you play (via mouse, touch, or keyboard) sends MIDI note-on and note-off messages to the selected device simultaneously with the synth audio. Hot-plug is supported — connect or disconnect devices and the list refreshes automatically.

MIDI output requires a browser that supports the Web MIDI API (Chrome and Edge; Firefox and Safari have limited or no support).

---

## Scale Comparison

Located in the Explore view, below the Scale Degree Bar.

### How to Use

1. Click the **Compare Scales** dropdown
2. Select a second scale to compare against the current one
3. A chromatic grid appears with 12 columns (one per semitone from the root)

### Reading the Grid

- **Top row** — notes from the current (primary) scale with degree colors
- **Middle row** — colored dots indicating shared/unique status
- **Bottom row** — notes from the comparison scale
- **Legend** — green = shared, blue = primary only, amber = comparison only

Counts show how many notes are shared versus unique to each scale. Change the comparison scale via the dropdown, or close it with the X button. The comparison resets whenever you change the primary scale.

---

## Print and Export

### Copy to Clipboard

In the Explore view hero card, click the **Copy** button. A plain-text summary of the current scale and its diatonic chords is copied to your clipboard. The format includes the key name, all scale notes, and the diatonic chord sequence.

### Print

Click the **Print** button (or use Ctrl+P / Cmd+P). The app applies a print-optimized stylesheet that:

- Hides the navigation bar and instrument
- Forces light colors for readability
- Shows the full scale and chord information

---

## Themes and Appearance

Three theme modes, toggled from the button in the top bar:

| Mode | Behavior |
|------|----------|
| Dark | Dark backgrounds, light text (default) |
| Light | Light backgrounds, dark text |
| System | Follows your operating system's dark/light preference |

The theme affects all surfaces, text, borders, and input fields through CSS custom properties. Degree colors (blue, teal, green, purple, amber, pink, red) remain consistent across themes.

Your theme preference is saved and restored on your next visit.

---

## Language

The app supports multiple languages. Currently available:

- **English** (default)
- **Portuguese**

Switch languages from the dropdown in the top bar. The language preference is saved.

Musical nomenclature (scale type names, chord symbols, interval labels, note names) is not translated — these are universal in music education and remain in English across all languages.

---

## Offline Use (PWA)

The app is a Progressive Web App and works fully offline after the first visit.

### Install

When visiting in a supported browser, you may see an "Install Music Theory?" prompt. Installing adds the app to your home screen or app launcher for quick access without the browser chrome.

### Updates

When a new version is available, a notification appears offering to reload. Click **Reload** to update.

### What Works Offline

Everything. All scales, chords, curriculum content, exercises, synth audio, and the metronome run locally in the browser with no server calls.

---

## Settings and Persistence

The following settings are automatically saved to your browser (localStorage) and restored on each visit:

| Setting | Default |
|---------|---------|
| Root note | C |
| Scale type | Major |
| Instrument | Piano |
| Guitar tuning | Standard |
| Base octave | 4 |
| Color mode | Functional (degree-colored) |
| Scale octaves | 1 |
| Synth volume | 70% |
| Synth preset | Piano |
| Theme | Dark |
| Metronome BPM | 120 |
| Metronome time signature | 4/4 |
| Metronome volume | 70% |
| MIDI output enabled | Off |
| MIDI output device | None |
| Language | English |

The following state resets on page reload or view switch:

- Selected chord and degree (reset on view change)
- Detail panel open/closed (closes on view change)
- Active notes (cleared on reload)
- Guitar scale position (resets on scale or tuning change)
- Scale comparison (resets on scale change)
- Audio recordings (session only, not persisted)

Curriculum progress (completed modules, exercise scores) is persisted separately and survives page reloads.

---

## Accessibility

### Keyboard Navigation

- Full computer keyboard piano mapping (see [Keyboard Shortcuts](#keyboard-shortcuts))
- Arrow key navigation on the guitar fretboard (2D grid movement)
- Tab/Shift+Tab focus wrapping in the Quick Search dialog
- Skip-to-content link (visible on focus) bypasses navigation

### Screen Readers

- All interactive elements have descriptive `aria-label` attributes
- Fretboard announces the focused note (name, fret, string) via a live region
- Chord buttons indicate pressed state with `aria-pressed`
- Instrument and octave selectors use proper `role="tablist"` and `role="tab"` patterns
- Exercise inputs are labeled and announced

### Visual

- Color contrast meets WCAG guidelines (zinc-500 on dark backgrounds)
- Focus rings visible on all interactive elements
- Degree colors encode function redundantly with labels (not color-only)

---

## Running the App

### Requirements

- Node.js 18+
- npm

### Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:5173)
npm run dev

# Production build
npm run build

# Type-check
npx tsc -b

# Run tests (345 tests)
npm test
```

### Browser Support

Requires a modern browser with Web Audio API support. Chrome, Firefox, Safari, and Edge are all supported. MIDI output requires Web MIDI API (Chrome/Edge only).
