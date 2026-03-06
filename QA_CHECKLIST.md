# QA Testing Checklist

Manual testing checklist for the Music Theory App. Work through each section, tick off items as you verify them. If something fails, note the issue next to the checkbox.

**How to use:** Open the app at `localhost:5173` (or production URL). Follow each section in order — later sections sometimes depend on state created by earlier ones.

---

## 1. First Load and Interface

- [ ] App loads without console errors
- [ ] Default state: C Major selected, Explore view active, Piano visible at bottom
- [ ] Top bar shows: Explore / Play / Learn tabs, language selector, theme toggle, Quick Search button, account icon
- [ ] Active view tab has animated underline indicator
- [ ] Piano keyboard is visible and spans full width at bottom of screen
- [ ] Instrument selector tabs (Piano / Guitar) appear above the instrument

---

## 2. Theme System

- [ ] Click theme toggle: switches to Light mode — all surfaces, text, borders update
- [ ] Click again: switches to System mode — follows OS preference
- [ ] Click again: returns to Dark mode
- [ ] Degree colors (blue, amber, red, etc.) remain vivid in all three themes
- [ ] Staff notation (in detail panels) updates colors to match theme
- [ ] Refresh the page — theme preference is preserved

---

## 3. Key and Scale Selector

### Root Note Selection
- [ ] All 12 root buttons visible: C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, B
- [ ] Click each root — blue highlight slides to the selected note
- [ ] Instrument highlights update when root changes
- [ ] Degree bar, chord grid, and hero card update when root changes

### Scale Type Selection
- [ ] First 4 groups visible by default: Core, Minor Variants, Modes, Pentatonic/Blues
- [ ] Click "More scales..." — remaining 4 groups expand (Symmetric, Mel. Minor Modes, Bebop, World)
- [ ] Select a scale from a hidden group (e.g., Whole Tone) — list auto-expands to show it
- [ ] Select Major — 7 notes highlighted on instrument
- [ ] Select Chromatic — 12 notes highlighted
- [ ] Select Pentatonic Major — 5 notes highlighted
- [ ] Select Blues — 6 notes highlighted
- [ ] Switch between several scales rapidly — no lag, no stale highlights

---

## 4. Explore View

### Hero Card
- [ ] Shows current key name (e.g., "C Major"), note count, and note names
- [ ] **Play button** — plays scale ascending through synth, notes light up sequentially on instrument
- [ ] **Details button** — opens detail panel with scale intervals and formula
- [ ] **Copy button** — copies scale + chord summary to clipboard (paste into a text editor to verify)
- [ ] **Print button** — opens browser print dialog with print-optimized layout

### Scale Degree Bar
- [ ] 7 degree buttons visible (or fewer for non-heptatonic scales)
- [ ] Each shows: note name, interval label, pitch class number
- [ ] Colors match: 1=blue, 2=indigo/teal, 3=green/violet, 4=green/purple, 5=amber, 6=teal/pink, 7=red
- [ ] Click a degree — its note highlights on the instrument
- [ ] Click a different degree — previous highlight clears, new one activates

### Scale Comparison
- [ ] Click "Compare Scales" dropdown
- [ ] Select a second scale (e.g., C Natural Minor)
- [ ] Chromatic grid appears with 12 columns
- [ ] Green dots = shared notes, Blue = primary only, Amber = comparison only
- [ ] Counts displayed (e.g., "5 shared, 2 unique...")
- [ ] Close with X button — comparison disappears
- [ ] Change primary scale — comparison resets

### Chord Grid — Diatonic Tab
- [ ] Shows 7 diatonic chords with Roman numerals (I, ii, iii, IV, V, vi, vii)
- [ ] Chords are color-coded by degree
- [ ] Click any chord — detail panel slides open with voicing, intervals, inversion controls
- [ ] Instrument highlights the chord notes

### Chord Grid — All Chords Tab
- [ ] Shows all chord qualities grouped by category (triads, sevenths, extensions, altered, suspended)
- [ ] Click a chord — detail panel opens
- [ ] Navigate through several chord types — voicings display correctly

### Chord Detail Panel
- [ ] Shows full chord voicing (all note names)
- [ ] Shows interval structure
- [ ] **Root position** selected by default
- [ ] Click **1st inversion** — bass note changes, instrument highlights update
- [ ] Click **2nd inversion** — same
- [ ] For seventh chords: click **3rd inversion** — available and correct
- [ ] Staff notation renders the chord correctly
- [ ] Close panel with X or Escape

### Scale Detail Panel
- [ ] Opens from hero card Details button
- [ ] Shows scale on treble clef staff with key signature
- [ ] Shows interval formula
- [ ] Correct accidentals for the key

### Circle of Fifths
- [ ] Visible in Explore view
- [ ] All 12 keys arranged in circle
- [ ] Current key is highlighted
- [ ] Relative major/minor pairs visible
- [ ] Click a different key on the circle — app updates to that key

### Chord Browser
- [ ] Accessible from Explore view
- [ ] Browse and search chord types
- [ ] Selecting a chord shows it on the instrument

---

## 5. Play View

- [ ] Switch to Play view via top bar tab
- [ ] Key/scale selector still visible and functional

### Sound Presets
- [ ] Five preset buttons visible: Piano, Classic, Organ, Strings, Pluck
- [ ] Select each preset and play a note — each has distinct sound character
- [ ] Piano: percussive attack
- [ ] Classic: warm analog triangle wave
- [ ] Organ: sustained sine harmonics
- [ ] Strings: slow attack, lush filtered sawtooth
- [ ] Pluck: quick decay, bright

### Active Notes Display
- [ ] Play a note — note name appears in real-time display
- [ ] Shows scale degree function (Tonic, Dominant, etc.) with color coding
- [ ] Play multiple notes — all shown
- [ ] Release notes — display clears

### Volume and Octave
- [ ] Volume slider: drag to 0% — no sound; drag to 100% — loud
- [ ] Volume slider does NOT affect metronome volume
- [ ] Octave selector: change to octave 2 — notes play lower
- [ ] Change to octave 6 — notes play higher
- [ ] Instrument display shifts to match selected octave

### Metronome
- [ ] Play/Stop toggle starts and stops the click
- [ ] BPM slider: move to 60 — slow clicks; move to 200 — fast clicks
- [ ] Time signature: try 2/4, 3/4, 4/4, 6/8 — beat groupings change
- [ ] Beat indicator dots animate with the click, accent on beat 1
- [ ] Volume slider: independent from synth volume
- [ ] Play notes while metronome runs — both are audible simultaneously
- [ ] Stop metronome — silence (no lingering audio)

### Chord Progression Builder
- [ ] Diatonic chord palette visible, color-coded by degree
- [ ] Click chords to append: e.g., I → V → vi → IV
- [ ] Sequence appears as row of chord pills
- [ ] Click a pill to remove that chord
- [ ] **Clear** button removes all chords
- [ ] **Play** — progression plays sequentially through current synth preset (~1s per chord)
- [ ] **Stop** — halts playback mid-progression
- [ ] Change key — palette updates to new key's diatonic chords

### Audio Recording
- [ ] Click **Record** — recording indicator active
- [ ] Play several notes on instrument
- [ ] Click **Stop** — a numbered "Take" appears with duration
- [ ] Click play on the take — notes replay with original timing
- [ ] Record a second take — appears as Take 2
- [ ] Delete a take — it disappears
- [ ] Refresh page — recordings are gone (session-only, expected)

### MIDI Output
- [ ] Toggle "Enable MIDI output" on (requires MIDI device or virtual MIDI)
- [ ] Device dropdown appears — select a device
- [ ] Play notes — MIDI messages sent to device (verify in MIDI monitor or external synth)
- [ ] Disconnect MIDI device — list refreshes automatically
- [ ] Reconnect device — reappears in list (hot-plug)
- [ ] Toggle off — MIDI output stops

### MIDI Input
- [ ] Toggle "Enable MIDI input" on (requires MIDI controller)
- [ ] Device dropdown appears — select your controller
- [ ] Play notes on MIDI controller — app receives them, instrument highlights
- [ ] In exercise mode: MIDI badge visible on instrument input
- [ ] Answer exercises by playing on MIDI controller
- [ ] Disconnect controller — list refreshes
- [ ] Reconnect — reappears (hot-plug)
- [ ] Both MIDI input and output active simultaneously — plays note on controller, hear through synth, sent to output device

---

## 6. Piano Instrument

- [ ] Click/tap white keys — notes play with correct pitch
- [ ] Click/tap black keys — sharps/flats play correctly
- [ ] Scale notes highlighted with degree colors
- [ ] Root note has accent/emphasis
- [ ] Hold click — note sustains; release — stops
- [ ] Scroll horizontally to reach all octaves (C2–C6)
- [ ] Octave selector buttons shift visible range
- [ ] Select a chord — chord notes appear bolded/highlighted

### Computer Keyboard Piano
- [ ] A=C, S=D, D=E, F=F, G=G, H=A, J=B (white keys)
- [ ] W=C#, E=D#, T=F#, Y=G#, U=A# (black keys)
- [ ] K=C, O=C#, L=D, P=D#, ;=E (extended range)
- [ ] Hold key — sustains; release — stops
- [ ] Modifier keys (Shift, Ctrl, Alt, Cmd) do NOT trigger notes
- [ ] Typing in an input field does NOT trigger notes

---

## 7. Guitar Fretboard

- [ ] Switch to Guitar via instrument selector
- [ ] 6 strings, 22 frets visible with standard fret markers (3, 5, 7, 9, 12, 15, 17, 19, 21)
- [ ] Double dot at fret 12
- [ ] Click/tap any fret intersection — note plays
- [ ] Scale notes highlighted with degree colors
- [ ] Root notes accented

### Tunings
- [ ] Standard (E A D G B E) — default, verify open strings
- [ ] Drop D (D A D G B E) — low string changes
- [ ] Half Step Down (Eb Ab Db Gb Bb Eb)
- [ ] Open G (D G D G B D)
- [ ] Open D (D A D F# A D)
- [ ] DADGAD (D A D G A D)
- [ ] Chord shapes available in Standard tuning
- [ ] Chord shapes hidden in non-standard tunings
- [ ] Changing tuning resets active scale position

### Fretboard Position Selector
- [ ] Position selector visible above fretboard
- [ ] Select different positions — fretboard scrolls/highlights that region
- [ ] CAGED positions available in Standard tuning

### Keyboard Navigation
- [ ] Tab to fretboard to give it focus
- [ ] Arrow keys move between frets and strings
- [ ] Enter/Space plays the focused note
- [ ] Escape clears focus
- [ ] Screen reader announces focused note (name, fret, string)

---

## 8. Learn View

- [ ] Switch to Learn view

### Levels Overview
- [ ] All 9 levels displayed as cards
- [ ] Each card shows: level number, title, difficulty label, module count, progress bar
- [ ] L1–L8 sequential (lock icons on levels where prerequisites not met)
- [ ] L9 (Ear Training) available independently — no lock
- [ ] Progress bars reflect actual completion state

### Level Detail
- [ ] Click an unlocked level — drills down to show units
- [ ] Breadcrumb trail appears at top (Learn > Level name)
- [ ] All units for the level are listed
- [ ] Each unit shows its modules

### Unit Detail
- [ ] Click a unit — shows modules within it
- [ ] Breadcrumb updates (Learn > Level > Unit)
- [ ] Each module shows: title, completion status, exercise count

### Module View
- [ ] Click a module — full module view opens
- [ ] Breadcrumb updates (Learn > Level > Unit > Module)
- [ ] **Learning objectives** section visible
- [ ] **Key concepts** listed
- [ ] **Practice tasks** listed
- [ ] **Song references** (L1–L3 modules only): "Songs That Use This" card with song title, artist, educational context
- [ ] **Exercises** section below

### Continue Banner
- [ ] If a module is in progress, continue banner appears at top of Learn view
- [ ] Clicking it jumps to the in-progress module

### Review Queue
- [ ] Complete a module (or have previously completed ones)
- [ ] If a module is due for review, it appears in the Review Queue at top of Learn view
- [ ] Click to enter review — exercises load for that module

---

## 9. Exercises (All 7 Types)

### Note Identification
- [ ] See a note displayed (on staff or described)
- [ ] Choose its name from 4 options
- [ ] Correct answer on 1st try = 1 point
- [ ] Wrong on 1st try — get a second attempt
- [ ] Correct on 2nd try = 0.5 points
- [ ] Wrong on both = 0 points
- [ ] Hint available after first wrong attempt

### Interval Identification
- [ ] Two notes shown
- [ ] Identify the interval between them
- [ ] Scoring works as above

### Scale Construction
- [ ] Given root + scale type (e.g., "Build G Major")
- [ ] Select notes on the instrument (piano or fretboard)
- [ ] Correct notes accepted, wrong notes rejected
- [ ] Can use MIDI input if enabled

### Chord Construction
- [ ] Given a chord symbol (e.g., "Build C Major triad")
- [ ] Select notes on the instrument
- [ ] Correct voicing validated

### Multiple Choice
- [ ] Theory question with 4 options
- [ ] Select an answer
- [ ] Feedback shown (correct/incorrect with explanation)

### Ear Training
- [ ] Play button to hear a note/interval/chord
- [ ] Identify what you heard
- [ ] Can replay the audio

### Scale Degree Identification
- [ ] Note shown within a scale context
- [ ] Identify its degree number (1–7)

### Exercise Flow
- [ ] Exercise progress bar visible (e.g., "3/8")
- [ ] After each answer, feedback animation (correct = green, incorrect = red)
- [ ] After all exercises: score summary shown
- [ ] Score >= 80%: module marked complete with celebration (confetti + sound)
- [ ] Score < 80%: option to retry
- [ ] Level completion: level achievement overlay with XP bonus

---

## 10. Quick Search

- [ ] Press Cmd+K (Mac) or Ctrl+K — search modal opens
- [ ] Type a scale name: "D harmonic minor" — result appears instantly
- [ ] Type a chord: "Cmaj7" — chord result with badge
- [ ] Type a note: "Ab" — sets root key
- [ ] Type an alias: "ionian" — finds Major
- [ ] Type "aeolian" — finds Natural Minor
- [ ] Up to 8 results shown
- [ ] Arrow keys navigate results
- [ ] Enter selects highlighted result
- [ ] Click a result selects it
- [ ] Selecting a scale sets root + scale type
- [ ] Selecting a chord opens chord detail panel
- [ ] Escape closes search
- [ ] Tab/Shift+Tab: focus wraps within modal
- [ ] Complex chord: "G7b9#11" — parses correctly

---

## 11. Staff Notation

- [ ] Open a scale detail panel — staff notation renders with correct key signature
- [ ] Open a chord detail panel — chord voicing shown on staff
- [ ] Change theme — notation colors update
- [ ] In exercises: notes displayed on staff for identification
- [ ] Notation renders as crisp SVG at any zoom level
- [ ] No visual artifacts or overlapping elements

---

## 12. Gamification

### Streaks
- [ ] After completing a module, streak count appears/increments
- [ ] Streak badge visible in Learn view or dashboard

### XP
- [ ] After completing a module: XP awarded (10–20)
- [ ] After answering exercises: XP awarded (1–2 per correct)
- [ ] After completing a review: XP awarded (5)
- [ ] After completing an entire level: bonus XP (50)
- [ ] XP display updates in real time

### Achievements
- [ ] Open Progress Dashboard
- [ ] Achievement grid shows all 20 achievements
- [ ] Completed achievements are highlighted with progress indicators
- [ ] Uncompleted achievements show progress toward unlock

### Progress Dashboard
- [ ] Accessible from Learn view
- [ ] **Activity heatmap** — shows daily activity
- [ ] **Weekly chart** — XP earned per day
- [ ] **Stat cards** — total XP, current streak, modules completed, exercises answered
- [ ] **Concept radar** — 6-axis radar chart showing concept mastery
- [ ] **Achievement grid** — all 20 achievements

---

## 13. Adaptive Difficulty

- [ ] Complete several exercises across different concept areas
- [ ] Open Progress Dashboard — concept radar reflects your performance
- [ ] Enter review mode — exercises are weighted toward weaker concepts
- [ ] Improve on a weak concept — radar chart updates accordingly

---

## 14. Song References

- [ ] Navigate to any L1 module — "Songs That Use This" card visible
- [ ] Navigate to any L2 module — song references present
- [ ] Navigate to any L3 module — song references present
- [ ] Each reference shows: song title, artist name, educational context
- [ ] Navigate to an L4+ module — no song references section (expected, coverage is L1–L3 only)

---

## 15. Authentication and Cloud Sync

### Sign In
- [ ] Click account icon in top bar — auth modal opens
- [ ] Enter email address
- [ ] Click submit — magic link sent to email
- [ ] Click magic link in email — app signs you in
- [ ] Account menu now shows your email and sign-out option
- [ ] Sync status indicator appears

### Cloud Sync
- [ ] Make changes while signed in (complete a module, change theme)
- [ ] Open the app on a different browser/device and sign in with the same account
- [ ] Verify preferences synced (theme, instrument, volume)
- [ ] Verify progress synced (completed modules)
- [ ] Verify gamification synced (streaks, XP, achievements)

### Offline Behavior
- [ ] While signed in, go offline (disconnect internet)
- [ ] Make changes (complete exercises, change settings)
- [ ] Go back online — changes push to server automatically
- [ ] Verify changes appear on other device after re-sync

### Sign Out
- [ ] Click account menu — click Sign Out
- [ ] Confirm you're signed out (account icon returns to sign-in state)
- [ ] Local data still intact after sign out

---

## 16. Language Switching

### English (default)
- [ ] All UI labels in English
- [ ] Exercise prompts, hints, choices in English

### Portuguese
- [ ] Switch to Portuguese via top bar dropdown
- [ ] All UI labels translate (buttons, navigation, labels, tooltips)
- [ ] Navigate to a Learn module — curriculum content (unit titles, module titles, descriptions) in Portuguese
- [ ] Start exercises — prompts, hints, and choices in Portuguese
- [ ] Note names remain in international notation (C, D, E, not Do, Re, Mi)
- [ ] Music terms translated in exercise text (e.g., "clave de sol", "seminima", "triade")

### Spanish
- [ ] Switch to Spanish via top bar dropdown
- [ ] All UI labels translate to Spanish
- [ ] Level metadata (titles, descriptions, difficulty labels) in Spanish
- [ ] Note: educational content overlays may be partially available (in progress)

### Persistence
- [ ] Refresh the page — language preference preserved
- [ ] Switch back to English — everything reverts cleanly

---

## 17. Themes and Appearance (Detail Pass)

- [ ] Dark mode: dark backgrounds, light text, all components readable
- [ ] Light mode: light backgrounds, dark text, no invisible elements
- [ ] System mode: follows OS preference; toggle OS dark/light to verify
- [ ] Toast notifications styled correctly in all themes
- [ ] Modals (auth, quick search) styled correctly in all themes
- [ ] Staff notation legible in all themes
- [ ] Guided tour tooltips visible in all themes

---

## 18. PWA and Offline

### Install
- [ ] Visit the app in Chrome — install prompt appears (or use browser install button)
- [ ] Install — app opens as standalone window with no browser chrome
- [ ] App icon appears on home screen / app launcher

### Offline
- [ ] Disconnect from internet
- [ ] Reload the app — loads from cache
- [ ] Navigate all three views — everything works
- [ ] Play notes on instruments — synth audio works
- [ ] Start metronome — works
- [ ] Navigate curriculum — levels and exercises load
- [ ] Complete an exercise — scores saved locally

### Update
- [ ] Deploy a new version
- [ ] Open the app — update notification appears
- [ ] Click Reload — app updates to new version

---

## 19. Print and Export

- [ ] In Explore view, click Copy — verify clipboard contains scale + chord summary
- [ ] Click Print — print dialog opens
- [ ] Print preview: navigation bar and instrument hidden
- [ ] Print preview: light colors for readability
- [ ] Print preview: scale and chord information fully visible

---

## 20. Accessibility

### Skip Navigation
- [ ] Load the app, press Tab once — "Skip to content" link appears
- [ ] Press Enter — focus jumps past navigation to main content

### Focus Management
- [ ] Tab through the entire app — focus ring visible on every interactive element
- [ ] No focus traps (except in modals, which should trap correctly)
- [ ] Escape closes modals and returns focus to trigger element

### ARIA
- [ ] Inspect instrument selector: `role="tablist"` and `role="tab"` on tabs
- [ ] Inspect chord buttons: `aria-pressed` indicates selected state
- [ ] Inspect fretboard: live region announces focused note
- [ ] Inspect exercise inputs: properly labeled

### Color
- [ ] Degree colors encode function with labels, not color alone
- [ ] All text meets WCAG contrast ratios (verify with browser dev tools)

---

## 21. Responsive / Mobile

### Phone Size (~375px wide)
- [ ] Resize browser to 375px width (or use phone)
- [ ] All three views render without horizontal overflow
- [ ] Piano: compact keys (36px), 2-octave visible range, horizontal scroll works
- [ ] Fretboard: compact cells (36px), native touch scroll, no drag-to-scroll
- [ ] Top bar: compacted, all elements accessible
- [ ] Learn view: level cards stack vertically
- [ ] Exercises: all inputs reachable, touch targets >= 44px
- [ ] Modals (auth, quick search): full-width, usable on small screen
- [ ] Chord grid: wraps correctly
- [ ] Detail panel: full-width slide

### Tablet Size (~768px wide)
- [ ] Resize to 768px
- [ ] Layout adjusts gracefully between phone and desktop
- [ ] Piano: medium keys, more octaves visible
- [ ] All views functional

### Touch Interactions
- [ ] Piano: touch and drag across keys — notes play (not scroll)
- [ ] Fretboard: touch scroll horizontally to see more frets
- [ ] Fretboard: tap fret intersections — notes play
- [ ] Exercise instrument input: tap to select notes
- [ ] All buttons and links have >= 44px touch targets

---

## 22. Guided Tour (First Run)

- [ ] Clear localStorage and reload app
- [ ] 4-step guided tour appears with spotlight/tooltip
- [ ] Step 1: highlights the key selector area
- [ ] Step 2: highlights the instrument
- [ ] Step 3: highlights the view tabs
- [ ] Step 4: prompts to play a note — auto-advances when note played
- [ ] Can skip tour at any step (Skip button or Escape)
- [ ] Tour does not appear on subsequent visits

---

## 23. Settings Persistence (Full Cycle)

- [ ] Set root to F#, scale to Dorian, instrument to Guitar, tuning to Drop D, octave to 3, volume to 40%, preset to Strings, theme to Light, language to Portuguese, metronome BPM to 80, metronome 3/4, metronome volume to 50%
- [ ] Refresh the page
- [ ] Verify ALL settings restored: F# Dorian, Guitar, Drop D, octave 3, 40% volume, Strings preset, Light theme, Portuguese language, metronome 80 BPM / 3/4 / 50% volume

---

## 24. Error Handling

- [ ] Navigate to a non-existent level/module (if possible via URL) — error boundary catches gracefully
- [ ] Simulate network error while syncing (disconnect mid-push) — app continues working, no crash
- [ ] Open browser console — no unhandled promise rejections or errors during normal use

---

## Notes / Issues Found

Use this space to record any issues discovered during testing:

| # | Section | Description | Severity |
|---|---------|-------------|----------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
