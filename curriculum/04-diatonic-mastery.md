# Level 4: Diatonic Mastery & Chromaticism Introduction

**Difficulty:** Intermediate
**Prerequisites:** Level 3 complete
**Equivalence:** ABRSM Grade 4-5, RCM Level 5-6, Kostka Ch. 11-15, Laitz Ch. 9-14, Berklee Harmony 1-2, AP Music Theory
**Estimated Modules:** 12-14

---

## 4.1 Non-Chord Tones — Complete Set

### Learning Objectives
- Identify all NCT types: suspension, retardation, appoggiatura, escape tone, pedal point, changing tones
- Understand the preparation-dissonance-resolution pattern of suspensions
- Classify NCTs by approach (step/leap) and departure (step/leap)

### Concepts

**Suspension (SUS)**
A note is HELD (tied) from the previous chord into the new chord, creating a dissonance, then resolves down by step. Three phases: preparation (consonant) → suspension (dissonant, on strong beat) → resolution (consonant, moves down by step).

**Suspension Types (named by intervals above bass)**
- 4-3 suspension: the 4th above bass resolves to a 3rd (most common)
- 7-6 suspension: the 7th resolves to a 6th
- 9-8 suspension: the 9th resolves to an octave
- 2-3 suspension (bass suspension): the bass note is suspended, 2nd above resolves to a 3rd. This is the only suspension that resolves UPWARD in the bass.

**Retardation (RET)**
Like a suspension, but resolves UPWARD by step instead of downward. Less common. The most typical: 7-8 retardation (leading tone held over, resolves up to tonic). Sounds like a suspension that goes the "wrong" way.

**Appoggiatura (APP)**
Approached by LEAP, resolved by STEP in the opposite direction. Lands on a strong beat — accented and dramatic. The word means "leaning note" — it leans heavily into the resolution. More dramatic than a passing tone because the leap makes it unexpected.

**Escape Tone / Echappee (ET)**
Approached by STEP, left by LEAP in the opposite direction. The reverse of an appoggiatura. Steps away from a chord tone, then leaps back to a different chord tone. Less common, creates a brief decorative gesture.

**Pedal Point (PED)**
A sustained or repeated note (usually in the bass) over changing harmonies. The harmony moves above it, creating dissonances and consonances in alternation. Common on tonic (beginning/end of pieces) and dominant (building tension before a return).

Types of pedal:
- Bass pedal (most common): sustained note in the lowest voice
- Inverted pedal: sustained note in the soprano
- Internal pedal: sustained note in an inner voice
- Double pedal: two sustained notes (usually tonic + dominant)

**Changing Tones (Double Neighbor)**
A pair of neighbor tones in sequence: chord tone → upper neighbor → lower neighbor → chord tone (or reverse). Also called "neighbor group." Creates a decorative orbit around a single chord tone.

**Complete NCT Classification Table**

| NCT | Approach | Departure | Beat Position |
|-----|----------|-----------|---------------|
| Passing tone | Step | Step (same direction) | Usually weak |
| Neighbor tone | Step | Step (back to start) | Usually weak |
| Suspension | Held (tie) | Step down | Strong |
| Retardation | Held (tie) | Step up | Strong |
| Appoggiatura | Leap | Step (opposite) | Strong |
| Escape tone | Step | Leap (opposite) | Weak |
| Anticipation | Step/CT | Common tone | Weak (before beat) |
| Pedal point | Held | Held | Any |
| Changing tones | Step | Step (pair) | Varies |

### Interactive Exercises
- **NCT classifier:** Given a melody with harmonic analysis → label every NCT by type
- **Suspension builder:** Given a chord progression → add suspensions (student places them, app validates)
- **Pedal point demo:** Play a progression over a tonic pedal → hear how chords float above it

### App Mapping
- No NCT detection or generation exists in the engine
- Would need melody + chord overlay visualization
- Pedal point could be demonstrated with the audio engine (sustained bass note + changing chords)

---

## 4.2 The Dominant Seventh in Depth

### Learning Objectives
- Master V7 resolution tendencies (7th resolves down, leading tone resolves up)
- Voice complete and incomplete V7 chords
- Resolve all four inversions of V7
- Handle V7 with non-chord tones

### Concepts

**V7 Resolution Rules**
The dominant seventh contains two tendency tones:
1. The leading tone (3rd of V7) → resolves UP by half step to tonic
2. The chordal 7th (7th of V7) → resolves DOWN by step to the 3rd of I

These two tendencies create the gravitational pull of V7 → I. The tritone between the leading tone and the 7th contracts to an imperfect consonance (3rd or 6th).

**Complete vs. Incomplete V7**
- Complete: all four chord tones present (root, 3rd, 5th, 7th)
- Incomplete: 5th is omitted, root is doubled. Used when voice leading makes the complete form awkward. In a V7 → I resolution with complete V7, the resulting I chord is often incomplete (tripled root, no 5th) — or vice versa.

**V7 Inversions and Their Resolutions**
- V7 (root position): resolves to I. Most emphatic.
- V6/5 (1st inversion): resolves to I. Leading tone in bass → bass must step up to tonic.
- V4/3 (2nd inversion): resolves to I or I6. 5th in bass → bass can step down.
- V4/2 (3rd inversion): resolves to I6 (first inversion). 7th in bass → bass MUST step down. This is why V4/2 almost always goes to I6.

### Interactive Exercises
- **V7 resolution voice leading:** Given V7 in a specific inversion → student resolves each voice correctly
- **Tendency tone tracker:** Highlight the two tendency tones in V7 → see their resolutions
- **Try This:** "G7" → hear it unresolved, then "G7 C" → hear the resolution

### App Mapping
- Progression parser handles V7-I
- Piano can highlight tendency tones in V7 and their resolution targets
- Audio demonstrates the tension-resolution relationship

---

## 4.3 All Diatonic Seventh Chords — Function and Usage

### Learning Objectives
- Understand the function of every diatonic seventh chord
- Know typical progressions involving ii7, IV7, vi7, and iii7
- Understand I7 in blues and jazz contexts
- Master viio7 and viiø7 resolution

### Concepts

**Pre-Dominant Seventh Chords**
- **ii7 (minor 7th in major) / iiø7 (half-diminished in minor):** The most important pre-dominant chord. ii7 → V7 → I is the strongest functional progression. The 7th of ii7 is a common tone with the root of V — seamless connection.
- **IV7 / ivmaj7:** Subdominant with added color. Less common than ii7 but effective. The seventh adds pull toward the dominant.

**Mediant and Submediant Sevenths**
- **iii7:** Functions as tonic substitute (shares notes with I) or as a link between I and IV. iii7 → vi7 → ii7 → V7 → I = circle-of-fifths descent.
- **vi7:** Tonic-function substitute. vi7 → ii7 → V7 → I is extremely common. The deceptive resolution V7 → vi7 is smoother than V7 → vi because of the shared note.

**Tonic Seventh**
- **Imaj7:** In classical harmony, the 7th on I is usually a passing tone. In jazz and pop, Imaj7 is a standard voicing for the tonic chord — warm, rich, sophisticated.
- **I7 (dominant quality):** In blues, the I chord is often a dominant seventh. This creates a "wrong" but characteristic sound — every chord in a 12-bar blues can be a dominant seventh.

**Leading-Tone Sevenths**
- **viiø7 (in major):** Half-diminished. Functions like V7 without the root. Resolves to I — the 3rd and 7th resolve the same way as in V7.
- **viio7 (in minor):** Fully diminished. All four notes are tendency tones. Resolves to i. Extremely tense, extremely useful. Often used as a passing chord between i and i6.

### Interactive Exercises
- **Function labeling:** Given a progression → label each chord's function (T, PD, D)
- **Circle progression builder:** Build a descending-fifths sequence: I → IV → vii → iii → vi → ii → V → I (using seventh chords)
- **Blues I7 demo:** Play a blues progression with dominant 7th on every chord

### App Mapping
- All chord qualities exist in the engine
- `progressionPatterns.ts` has many of these progressions documented
- Chord-scale relationships in the engine map function to every chord type

---

## 4.4 Harmonic Function Theory

### Learning Objectives
- Classify every diatonic chord by function: Tonic (T), Pre-Dominant (PD), Dominant (D)
- Understand the standard progression T → PD → D → T
- Recognize retrogressions and unusual progressions
- Use harmonic function to predict and analyze chord choices

### Concepts

**The Three Functions**

| Function | Chords (Major) | Chords (Minor) | Character |
|----------|---------------|-----------------|-----------|
| Tonic (T) | I, vi, (iii) | i, VI, (III) | Stability, home, rest |
| Pre-Dominant (PD) | ii, IV | ii°, iv | Departure, motion, "wanting to go" |
| Dominant (D) | V, vii° | V, vii° | Tension, urgency, "must resolve" |

**The Standard Progression**
T → PD → D → T is the fundamental harmonic sentence. It mirrors narrative structure: establish home → depart → create tension → resolve home. Nearly all tonal music follows this pattern at some level.

**Why This Order?**
- T → PD: departure from stability (leaving home)
- PD → D: increasing tension (the journey intensifies)
- D → T: resolution (arriving back home)
- The reverse (retrogression) feels wrong because it releases tension prematurely

**Retrogression**
Movement against the standard flow: D → PD or PD → T (without going through D). Not forbidden, but unusual. Creates a different emotional effect — deflection, avoidance of resolution, or gentle return.

**Chord Substitution Within Functions**
Chords within the same function can substitute for each other:
- vi can replace I (deceptive cadence)
- ii can replace IV (both are pre-dominant)
- viio can replace V (both are dominant)
This is why the deceptive cadence (V → vi) works — vi is a tonic-function chord.

### Interactive Exercises
- **Function color-coding:** Given a progression → color-code each chord by function
- **Progression validator:** Student writes a progression → app checks if function flow is standard
- **Substitution explorer:** Replace a chord with its functional equivalent → hear the difference

### App Mapping
- `ScaleDegreeBar` already color-codes by function (tonic=blue, dominant=amber)
- Progression patterns in the engine already categorize by function
- Functional analysis could be a natural extension of the existing chord display

---

## 4.5 Harmonic Sequences

### Learning Objectives
- Recognize sequence patterns (repeating harmonic motion at different pitch levels)
- Identify descending-fifths, ascending-seconds, and descending-thirds sequences
- Understand how sequences create directed harmonic motion
- Hear sequences in context (Baroque, Classical, pop)

### Concepts

**What Is a Harmonic Sequence?**
A pattern of chords that repeats at regular intervals, transposing up or down with each repetition. Sequences create strong directional momentum. They temporarily override normal functional progressions — the pattern itself provides the logic.

**Descending Fifths (Circle Progression)**
The most common sequence. Roots descend by fifths: I → IV → viio → iii → vi → ii → V → I. Each chord resolves to the next as if it were a local V → I. The full circle returns to the starting key. Any subset works: vi → ii → V → I.

**Ascending Seconds**
Roots ascend by step: I → ii → iii → IV → V. Less common, creates a climbing feeling. Often uses first inversions to keep the bass line smooth (5-6 technique).

**Descending Thirds**
Roots descend by thirds: I → vi → IV → ii. Creates a gentle, falling motion. Common in Romantic music. Each pair shares a common tone, making voice leading very smooth.

**Sequences with Seventh Chords**
Adding sevenths to sequence chords makes the pattern even smoother. In a descending-fifths sequence: Imaj7 → IVmaj7 → viiø7 → iii7 → vi7 → ii7 → V7 → I. The seventh of each chord resolves by step into the next chord.

### Interactive Exercises
- **Sequence detector:** Hear a progression → identify the sequence type
- **Sequence builder:** Given a starting pattern → continue the sequence through the key
- **Try This:** Play a descending-fifths sequence in C major on the piano

### App Mapping
- Progression parser could be extended to recognize sequence patterns
- Audio engine can play sequential patterns
- No sequence-specific feature exists yet

---

## 4.6 Introduction to Two-Part Counterpoint

### Learning Objectives
- Understand counterpoint as the art of combining independent melodies
- Write first species (1:1) counterpoint: note against note
- Write second species (2:1) counterpoint: two notes against one
- Apply consonance and dissonance rules

### Concepts

**What Is Counterpoint?**
The art of combining two or more independent melodic lines that are harmonically related but melodically independent. While harmony is vertical (chords), counterpoint is horizontal (interweaving melodies). The two perspectives complement each other.

**Consonance and Dissonance**
In counterpoint, intervals between voices are classified:
- Perfect consonances: P1, P5, P8 (most stable)
- Imperfect consonances: m3, M3, m6, M6 (stable but warmer)
- Dissonances: m2, M2, P4, A4/d5, m7, M7 (unstable, need resolution)

**First Species (1:1)**
One note in the counterpoint against each note in the cantus firmus (given melody):
- Begin and end on P1, P5, or P8
- Use mostly imperfect consonances (3rds and 6ths) — they provide the best balance of harmony and independence
- Perfect consonances must be approached carefully (no parallel P5 or P8)
- Avoid more than three consecutive 3rds or 6ths (variety is essential)
- The counterpoint should have its own melodic shape — mostly stepwise, leaps followed by contrary motion

**Second Species (2:1)**
Two notes in the counterpoint against each note of the cantus firmus:
- Strong beats: must be consonant
- Weak beats: can be dissonant IF approached and left by step (passing tones) or by step to same note (neighbor tones)
- This is where non-chord tones first enter counterpoint
- Creates more rhythmic activity and melodic interest

### Interactive Exercises
- **Consonance/dissonance checker:** Play two notes → classify the interval
- **Counterpoint validator:** Student writes a countermelody → app checks for parallel 5ths/8ths, dissonance treatment, etc.
- **Species comparison:** Hear the same cantus firmus with 1st species vs. 2nd species counterpoint

### App Mapping
- Two-voice playback possible through the audio engine
- Piano can show two melodic lines with different colors
- No counterpoint analysis/validation exists in the engine

---

## 4.7 Irregular and Asymmetric Meters

### Learning Objectives
- Count in 5/4, 5/8, 7/4, 7/8
- Understand additive meters (2+3, 3+2, 2+2+3, etc.)
- Recognize mixed meters (changing time signatures)
- Feel the difference between symmetric and asymmetric grooves

### Concepts

**Asymmetric Meters**
Meters where the beat count doesn't divide evenly:
- 5/4 or 5/8: groups as 2+3 or 3+2
- 7/4 or 7/8: groups as 2+2+3, 2+3+2, or 3+2+2
- The grouping determines the rhythmic feel

**Additive Meters**
Built by adding groups of 2 and 3:
- 5 = 2+3 or 3+2
- 7 = 2+2+3 or 2+3+2 or 3+2+2
- 8 = 3+3+2 (common in Balkan music and some rock)
- 11 = 2+2+3+2+2 (used by Dave Brubeck, Tool, etc.)

**Mixed Meters**
Time signature changes from measure to measure. One bar of 4/4, next bar of 3/4, etc. Creates unpredictable, shifting rhythmic feel. Common in 20th-century classical, progressive rock, and film scores.

**Cut Time (Alla Breve)**
2/2 or the C symbol with a vertical line through it. Two half-note beats per measure. Same notes as 4/4 but felt in 2 — faster tempo, stronger metric drive. Common in marches and fast Classical movements.

### Interactive Exercises
- **Asymmetric meter tapper:** Hear a 7/8 pattern → tap the beat grouping
- **Grouping identifier:** Same 7 beats, different groupings → identify which one
- Primarily aural/rhythmic exercises

### App Mapping
- No meter/rhythm system exists
- Conceptual/listening module

---

## 4.8 Chromatic Embellishment

### Learning Objectives
- Recognize chromatic passing tones and chromatic neighbor tones
- Understand chromaticism as embellishment vs. structural harmony
- Identify chromatic voice exchange
- Hear how chromaticism adds color without changing the key

### Concepts

**Chromatic Passing Tones**
A passing tone that uses a chromatic (non-diatonic) note. C → C# → D: the C# fills in the whole step chromatically. Adds smoothness and color. Common in bass lines and inner voices.

**Chromatic Neighbor Tones**
A neighbor tone using a chromatic note. E → E# → E or E → Eb → E. The chromatic neighbor creates a tighter orbit around the chord tone.

**Chromatic Voice Exchange**
A special technique where one voice moves chromatically up while another moves chromatically down, often with an augmented sixth interval expanding to an octave. Example: in SATB, bass goes C → C# while soprano goes E → Eb, both arriving at D.

**Embellishment vs. Structure**
At this level, chromaticism is decorative — it adds color to diatonic harmony without changing the key. Structural chromaticism (secondary dominants, modulation) comes in Level 5. The distinction matters: a chromatic passing tone between IV and V is decoration; a V/V chord is structure.

### Interactive Exercises
- **Chromatic embellishment spotter:** Hear a diatonic melody vs. a chromatically embellished version → identify the added chromatic tones
- **Chromatic bass line builder:** Add chromatic passing tones to a bass line
- **Try This:** Play a chromatic scale passage to hear the color difference

### App Mapping
- Chromatic scale exists in the engine
- Piano visualization can highlight chromatic vs. diatonic tones
- Audio engine can demonstrate embellished vs. plain melodies

---

## 4.9 Roman Numeral Analysis Practice

### Learning Objectives
- Analyze real chorale harmonizations with Roman numerals
- Identify cadences, NCTs, and inversions in context
- Label complete phrases with functional analysis
- Develop fluency in reading and writing Roman numeral analysis

### Concepts

**Analysis Method**
1. Determine the key (look at key signature and cadence patterns)
2. At each harmonic rhythm point, identify the chord (which notes are sounding?)
3. Determine root and quality
4. Label with Roman numeral, quality symbol, and inversion figure
5. Identify NCTs (notes not in the chord)
6. Mark cadences at phrase endings

**Reading Chorale-Style Textures**
- Four voices on two staves (soprano and alto on treble, tenor and bass on bass)
- Stems up = soprano/tenor, stems down = alto/bass
- Identify the bass note first (determines inversion)
- Then identify the other chord tones
- Circle any notes that don't fit the chord = NCTs

**Common Traps**
- Suspensions and passing tones can make chords look wrong — analyze the underlying harmony, not every surface note
- Chords in inversion can be misidentified if you only look at the bass
- Some notes serve double duty (chord tone in one analysis, NCT in another) — context determines the best reading

### Interactive Exercises
- **Analysis worksheet:** Given a chorale (audio + notation) → student provides Roman numeral analysis
- **Error detection:** Given a pre-written analysis → find and correct the mistakes
- This is a capstone exercise pulling together all of Level 3-4

### App Mapping
- Would need a notation display + annotation system
- Progression parser could be extended to validate Roman numeral analysis
- This is primarily an analysis/assessment module

---

## 4.10 Minor Key Harmony in Detail

### Learning Objectives
- Understand how the three minor scale forms create different chord qualities
- Know the practical chord vocabulary of minor keys
- Recognize the subtonic VII chord in natural minor
- Identify modal borrowing between minor scale forms

### Concepts

**The Minor Key Chord Palette**
In practice, minor keys draw chords from ALL THREE minor forms:
- V and viio from harmonic minor (need the leading tone)
- i, iv, VI, III from natural minor (no raised notes)
- II and IV from melodic minor ascending (raised 6th)

**The "Fluid" Minor System**
Unlike major (one scale, one set of diatonic chords), minor is fluid — the 6th and 7th degrees are variable. This gives minor keys MORE chord options than major keys, not fewer. The composer chooses which form to use based on voice leading and desired sound.

**The Subtonic VII Chord**
In natural minor, the 7th degree is a whole step below tonic, producing a major triad (VII) instead of a diminished triad (viio). VII in natural minor functions differently from viio in harmonic minor — it often moves to III or to a Mixolydian-flavored cadence in rock/pop.

**III+ — The Augmented Problem**
Building a triad on the 3rd degree of harmonic minor (with the raised 7th) produces an augmented triad (III+). This chord is harsh and rarely used in common-practice music. In practice, composers use the natural-minor III (major triad) instead.

### Interactive Exercises
- **Minor chord palette:** Select a minor key → see ALL available chords from all three forms
- **Minor vs. major comparison:** Same root → compare diatonic chord options
- **Try This:** Explore "A natural minor", "A harmonic minor", "A melodic minor" → see how the diatonic chords change

### App Mapping
- All three minor forms are in the engine
- Diatonic chord building works for all scale types
- This topic leverages existing infrastructure fully

---

## Module Breakdown for Implementation

| Module ID | Topic | Interactive Elements |
|-----------|-------|---------------------|
| L4M01 | Suspensions (4-3, 7-6, 9-8, 2-3) (4.1) | Suspension builder |
| L4M02 | Appoggiatura, Escape Tone, Retardation (4.1) | NCT classifier |
| L4M03 | Pedal Point and Changing Tones (4.1) | Pedal point demo |
| L4M04 | The Dominant Seventh — Resolution Rules (4.2) | V7 voice leading, tendency tone tracker |
| L4M05 | V7 Inversions and Their Resolutions (4.2) | V7 inversion resolver |
| L4M06 | Pre-Dominant Seventh Chords: ii7 and IV7 (4.3) | Function labeling |
| L4M07 | Mediant, Submediant, and Tonic Sevenths (4.3) | Circle progression builder |
| L4M08 | Leading-Tone Sevenths: viiø7 and viio7 (4.3) | Resolution demo |
| L4M09 | Harmonic Function: T → PD → D → T (4.4) | Function color-coding, progression validator |
| L4M10 | Harmonic Sequences (4.5) | Sequence detector, sequence builder |
| L4M11 | First and Second Species Counterpoint (4.6) | Counterpoint validator |
| L4M12 | Asymmetric and Mixed Meters (4.7) | Meter tapper |
| L4M13 | Chromatic Embellishment (4.8) | Chromatic embellishment spotter |
| L4M14 | Roman Numeral Analysis Practice (4.9) | Analysis worksheet |
