# Engine Coverage Map

Maps every curriculum topic to current engine support, identifying what can be built immediately vs. what needs new development.

---

## Coverage Legend

| Symbol | Meaning |
|--------|---------|
| FULL | Engine fully supports this topic. Can build interactive exercises immediately. |
| PARTIAL | Engine has related support. Some extension or new UI needed. |
| NONE | No engine support. Requires new development (engine + UI). |
| N/A | Topic is conceptual/listening — doesn't need engine support. |

---

## Level 1: Foundations

| Topic | Engine Coverage | Notes |
|-------|---------------|-------|
| 1.1 Staff and Clefs | NONE | Need notation display component (staff, clefs, note placement) |
| 1.2 Pitch: Half/Whole Steps | FULL | Piano shows all notes; chromatic scale defined |
| 1.2 Enharmonic Equivalents | FULL | Note system handles enharmonics |
| 1.2 Chromatic Scale | FULL | `scales.ts`: `chromatic: [0,1,2,3,4,5,6,7,8,9,10,11]` |
| 1.3 Rhythm/Duration | NONE | No rhythm/notation system exists |
| 1.4 Meter/Time Signatures | NONE | No meter system |
| 1.5 Major Scale | FULL | `scales.ts`: `major: [0,2,4,5,7,9,11]`, all keys |
| 1.5 Key Signatures | PARTIAL | Keys exist; no key signature display component |
| 1.6 Basic Intervals | FULL | `intervals.ts`: all intervals with names and semitones |
| 1.7 Major Triads | FULL | `chords.ts`: `major: [0,4,7]` |
| 1.8 Musical Terms | N/A | Reference/vocabulary — no engine support needed |

**Summary:** 5 FULL, 1 PARTIAL, 3 NONE, 1 N/A

---

## Level 2: Expanding Fundamentals

| Topic | Engine Coverage | Notes |
|-------|---------------|-------|
| 2.1 All Key Signatures | FULL | All 12 keys supported; Circle of Fifths component exists |
| 2.2 Scale Degree Names | FULL | `ScaleDegreeBar` component with functional colors |
| 2.3 Minor Scales (all forms) | FULL | `natural_minor`, `harmonic_minor`, `melodic_minor` in engine |
| 2.3 Relative/Parallel Keys | FULL | Key relationships computable from scale data |
| 2.4 Compound Meter | NONE | No meter system |
| 2.5 Syncopation/Triplets | NONE | No rhythm system |
| 2.6 Interval Quality | FULL | All interval qualities with calculation support |
| 2.7 Four Triad Types | FULL | `major`, `minor`, `diminished`, `augmented` in `chords.ts` |
| 2.7 Inversions | FULL | `chordInversion` state in store; all inversions computed |
| 2.8 Diatonic Triads | FULL | Can build triads on each degree of any scale |
| 2.9 Additional Clefs | NONE | No notation display |
| 2.10 Musical Terms | N/A | Reference/vocabulary |

**Summary:** 8 FULL, 0 PARTIAL, 3 NONE, 1 N/A

---

## Level 3: Harmony Foundations

| Topic | Engine Coverage | Notes |
|-------|---------------|-------|
| 3.1 Seventh Chord Qualities | FULL | All 7th chord types in `chords.ts` |
| 3.1 7th Chord Inversions | FULL | Inversion system handles 4 positions |
| 3.2 Diatonic 7th Chords | FULL | Can build 7ths on each scale degree |
| 3.2 V7 and Tritone | FULL | Dominant 7th with tritone content computable |
| 3.3 Voice Leading (SATB) | NONE | No SATB voicing or voice-leading validation |
| 3.4 Root Position Part Writing | NONE | No part-writing system |
| 3.5 Inversions in Context | PARTIAL | Inversions exist; no voice-leading context |
| 3.6 Cadences | PARTIAL | Progression parser handles V-I, IV-I, V-vi; no cadence classification |
| 3.7 Phrases/Periods | NONE | No phrase/form analysis |
| 3.8 Harmonic Rhythm | NONE | No rhythm/timing system |
| 3.9 Non-Chord Tones | NONE | No NCT detection or generation |
| 3.10 Transposition | FULL | All keys supported; key switching is trivial |

**Summary:** 5 FULL, 2 PARTIAL, 5 NONE

---

## Level 4: Diatonic Mastery

| Topic | Engine Coverage | Notes |
|-------|---------------|-------|
| 4.1 Complete NCT Set | NONE | No NCT system |
| 4.2 V7 in Depth | PARTIAL | V7 chord exists; no resolution validation |
| 4.3 All Diatonic 7ths | FULL | All qualities available |
| 4.4 Harmonic Function | PARTIAL | Degree colors encode function; no explicit function labeling |
| 4.5 Sequences | NONE | No sequence detection or generation |
| 4.6 Two-Part Counterpoint | NONE | No counterpoint system |
| 4.7 Irregular Meters | NONE | No meter system |
| 4.8 Chromatic Embellishment | PARTIAL | Chromatic scale exists; no embellishment detection |
| 4.9 Roman Numeral Analysis | PARTIAL | Progression parser handles RN; no analysis validation |
| 4.10 Minor Key Harmony | FULL | All minor forms and their diatonic chords |

**Summary:** 2 FULL, 4 PARTIAL, 4 NONE

---

## Level 5: Chromaticism & Modulation

| Topic | Engine Coverage | Notes |
|-------|---------------|-------|
| 5.1 Secondary Dominants | PARTIAL | Any chord can be built; no automatic secondary dominant identification |
| 5.2 Secondary LT Chords | PARTIAL | Diminished chords exist; no automatic context |
| 5.3 Tonicization | NONE | No tonicization detection |
| 5.4 Pivot Chord Modulation | NONE | No modulation analysis |
| 5.5 Other Modulation Types | NONE | No modulation system |
| 5.6 Mode Mixture | PARTIAL | All chords buildable; no borrowed-chord detection |
| 5.7 Small Forms | NONE | No form analysis |
| 5.8 Large Forms | NONE | No form analysis |
| 5.9 Texture | N/A | Listening/conceptual |
| 5.10 Guide Tone Lines | PARTIAL | Chord notes available; no guide-tone extraction |

**Summary:** 0 FULL, 5 PARTIAL, 4 NONE, 1 N/A

---

## Level 6: Chromatic Harmony

| Topic | Engine Coverage | Notes |
|-------|---------------|-------|
| 6.1 Neapolitan Chord | PARTIAL | Db major chord buildable; no contextual recognition |
| 6.2 Augmented Sixth Chords | NONE | Not in standard chord definitions |
| 6.3 Enharmonic Modulation | NONE | No modulation system |
| 6.4 Chromatic Mediants | PARTIAL | Chords buildable; no relationship detection |
| 6.5 Late Romantic Techniques | PARTIAL | Whole-tone, diminished scales exist |
| 6.6 Species Counterpoint | NONE | No counterpoint system |
| 6.7 3/4-Part Counterpoint | NONE | No counterpoint system |
| 6.8 Advanced Part Writing | NONE | No part-writing system |

**Summary:** 0 FULL, 4 PARTIAL, 4 NONE

---

## Level 7: Jazz, Pop, Modal

| Topic | Engine Coverage | Notes |
|-------|---------------|-------|
| 7.1 Jazz Chord Symbols | FULL | `chordParser.ts` handles all jazz symbols |
| 7.1 Extensions/Alterations | FULL | 9ths, 11ths, 13ths, b9, #9, #11 all in engine |
| 7.2 ii-V-I | FULL | `progressionPatterns.ts` has ii-V-I documented |
| 7.2 Tritone Substitution | PARTIAL | Chords exist; no automatic sub detection |
| 7.2 Blues Form | FULL | Blues progressions in engine |
| 7.2 Turnarounds | PARTIAL | Some patterns exist; not comprehensive |
| 7.3 Chord-Scale Theory | FULL | `chordScaleRelationships.ts` — comprehensive mapping |
| 7.3 Upper Structures | PARTIAL | Chords buildable; no upper-structure voicing system |
| 7.3 Coltrane Changes | NONE | Not in engine |
| 7.4 Modal Harmony | FULL | All modes with characteristics in `modes.ts` |
| 7.4 Quartal Voicings | NONE | No quartal chord definitions |
| 7.5 Pop Progressions | FULL | Many patterns in `progressionPatterns.ts` |
| 7.5 Nashville Numbers | NONE | No Nashville number system |
| 7.6 Scale Taxonomy | FULL | 46 scales in engine |
| 7.7 Chord Taxonomy | FULL | 42 chords in engine |

**Summary:** 8 FULL, 3 PARTIAL, 4 NONE

---

## Level 8: Advanced Analysis

| Topic | Engine Coverage | Notes |
|-------|---------------|-------|
| 8.1 Fugue | NONE | No contrapuntal analysis |
| 8.2 Canon | NONE | No imitative form analysis |
| 8.3 Large Forms | NONE | No form analysis |
| 8.4 Orchestration | N/A | Knowledge-based |
| 8.5 Post-Tonal Theory | NONE | No pitch-class set system |
| 8.6 20th-Century Techniques | PARTIAL | Some scales/chords relevant |
| 8.7 Advanced Rhythm | NONE | No rhythm system |

**Summary:** 0 FULL, 1 PARTIAL, 5 NONE, 1 N/A

---

## Level 9: Ear Training

| Topic | Engine Coverage | Notes |
|-------|---------------|-------|
| 9.1 Pitch Matching | PARTIAL | Audio engine plays notes; `earTrainingGenerator.ts` exists |
| 9.2 Interval Recognition | PARTIAL | Intervals defined; generator exists; needs quiz UI |
| 9.3 Scale Recognition | PARTIAL | All scales in engine; needs quiz UI |
| 9.4 Chord Recognition | PARTIAL | All chords in engine; `reverseChordParser` validates; needs quiz UI |
| 9.5 Melodic Dictation | NONE | No melody input system |
| 9.6 Harmonic Dictation | NONE | No harmonic analysis input |
| 9.7 Sight Singing | NONE | No microphone input or notation display |
| 9.8 Contextual Listening | NONE | No audio library or analysis system |

**Summary:** 0 FULL, 4 PARTIAL, 4 NONE

---

## Overall Coverage Summary

| Level | FULL | PARTIAL | NONE | N/A | Buildable Now? |
|-------|------|---------|------|-----|---------------|
| 1 | 5 | 1 | 3 | 1 | Mostly (except rhythm/notation) |
| 2 | 8 | 0 | 3 | 1 | Mostly (except rhythm/clefs) |
| 3 | 5 | 2 | 5 | 0 | Partially (chords yes, voice leading no) |
| 4 | 2 | 4 | 4 | 0 | Partially |
| 5 | 0 | 5 | 4 | 1 | Limited (needs modulation engine) |
| 6 | 0 | 4 | 4 | 0 | Limited |
| 7 | 8 | 3 | 4 | 0 | Mostly (jazz/scales strength) |
| 8 | 0 | 1 | 5 | 1 | Minimal |
| 9 | 0 | 4 | 4 | 0 | Partially (needs quiz UI) |
| **Total** | **28** | **24** | **36** | **4** | |

---

## Development Priority Matrix

### Phase 1: Immediate (Engine Fully Supports)
Content that can be built with no new engine work — only new curriculum data and minor UI additions:
- Levels 1-2 (minus rhythm/notation topics)
- Level 7 scales, chords, chord-scale theory, modal harmony, pop/jazz progressions
- Complete the existing 5 units → expand to the full Level 1-2 scope

### Phase 2: Quiz System (Moderate Development)
Build a generic quiz/exercise UI that enables:
- Ear training levels 9.1-9.4 (interval, scale, chord recognition)
- Theory knowledge quizzes for all levels
- "Build this chord/scale" exercises
- Requirements: play audio → present multiple-choice → validate → track score

### Phase 3: Notation Display (Significant Development)
Add a staff/notation display component (consider VexFlow, abcjs, or custom SVG):
- Enables rhythm/meter topics (Levels 1-2)
- Enables Roman numeral analysis exercises (Level 4)
- Enables melodic dictation (Level 9)
- Enables key signature display

### Phase 4: Voice Leading / Harmony Engine (Major Development)
Add harmonic analysis capabilities:
- SATB voicing and validation
- NCT detection
- Cadence classification
- Secondary dominant identification
- Modulation analysis
- This unlocks Levels 3-6 interactive exercises

### Phase 5: Advanced Interactive Features (Long-term)
- Counterpoint validation system
- Post-tonal pitch-class set calculator
- Form analysis player (section labeling over audio)
- Microphone input for sight singing validation
- Audio example library for contextual listening

---

## Key Insight

The app's existing engine is **strongest for Level 7 content** (jazz, scales, chords, chord-scale theory) because the original app was built for exploring music theory concepts, not structured learning. The beginner curriculum (Levels 1-2) is also well-supported because the fundamental pitch/interval/scale/chord data is comprehensive.

The **gap** is in Levels 3-6 (harmony, voice leading, modulation, form) — the traditional "music theory class" content that requires analytical tools the engine wasn't designed for. Filling this gap is what transforms the app from a reference tool into a genuine education platform.
