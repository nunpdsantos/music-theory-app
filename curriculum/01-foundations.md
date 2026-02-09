# Level 1: Foundations of Music Literacy

**Difficulty:** Absolute Beginner
**Prerequisites:** None
**Equivalence:** ABRSM Grade 1-2, RCM Preparatory-Level 2, Kostka Ch. 1-2, Laitz Ch. 1A-1B
**Estimated Modules:** 8-10

---

## 1.1 Notation and the Staff

### Learning Objectives
- Identify the five lines and four spaces of the musical staff
- Read note names in treble and bass clef
- Understand ledger lines and the grand staff
- Use octave designation (scientific pitch notation)

### Concepts

**The Staff**
Music is written on a set of five horizontal lines and four spaces. Each line and space represents a different pitch. Higher positions on the staff = higher pitches. The staff alone doesn't tell you which notes are which — you need a clef for that.

**Treble (G) Clef**
Wraps around the second line, designating it as G4. Used for higher-pitched instruments and the right hand on piano. Note names on lines: E-G-B-D-F. Note names on spaces: F-A-C-E.

**Bass (F) Clef**
Two dots surround the fourth line, designating it as F3. Used for lower-pitched instruments and the left hand on piano. Note names on lines: G-B-D-F-A. Note names on spaces: A-C-E-G.

**The Grand Staff**
Treble and bass clef connected by a brace and barline. Middle C (C4) sits on a ledger line between the two staves. The grand staff spans the full piano range.

**Ledger Lines**
Short lines above or below the staff for notes that extend beyond the five-line range. Middle C uses one ledger line below treble clef or one above bass clef. Multiple ledger lines become hard to read — that's why we have different clefs.

**Octave Designation**
Scientific pitch notation labels each octave with a number. Middle C = C4. The octave number changes at each C. Piano range: A0 to C8. This system eliminates ambiguity about which C or G you mean.

### Interactive Exercises
- **Note identification:** Display a note on the staff → student names it (piano keyboard highlights the corresponding key)
- **Note placement:** Name a note → student finds it on the piano → staff shows where it lives
- **Octave explorer:** Scroll through octaves on the piano, see where each octave sits on the grand staff

### App Mapping
- Piano component already displays all notes with labels
- "Try This" can highlight specific notes on the piano when discussing treble/bass clef
- Could add a staff visualization component above the piano

---

## 1.2 Pitch Fundamentals

### Learning Objectives
- Understand half steps and whole steps as the building blocks of all pitch relationships
- Identify sharps, flats, naturals, double sharps, and double flats
- Recognize enharmonic equivalents
- Understand the chromatic scale as the complete set of 12 pitches

### Concepts

**Half Steps (Semitones)**
The smallest distance between two notes in Western music. On the piano, a half step is the distance from any key to the very next key (white or black). E-F and B-C are natural half steps (no black key between them). All other adjacent white keys have a black key between them.

**Whole Steps (Tones)**
Two half steps combined. C to D is a whole step (skip the C#/Db between them). E to F# is a whole step. Any two keys with exactly one key between them form a whole step.

**Accidentals**
- Sharp (#): raises a note by one half step
- Flat (b): lowers a note by one half step
- Natural: cancels a previous sharp or flat
- Double sharp (x): raises by two half steps
- Double flat (bb): lowers by two half steps

**Enharmonic Equivalents**
Two note names for the same pitch. C# = Db. F# = Gb. G# = Ab. Even naturals: B = Cb, E = Fb, C = B#, F = E#. Context (key signature, voice leading direction) determines which spelling is correct.

**The Chromatic Scale**
All 12 pitches in order by half steps: C-C#-D-D#-E-F-F#-G-G#-A-A#-B (ascending with sharps) or C-Db-D-Eb-E-F-Gb-G-Ab-A-Bb-B (ascending with flats). This is the raw material from which all other scales are built.

### Interactive Exercises
- **Half step / whole step explorer:** Click a key on the piano, see the half step and whole step above/below highlighted in different colors
- **Enharmonic quiz:** Given a note name, find its enharmonic equivalent on the piano
- **Chromatic scale playthrough:** Play the chromatic scale ascending/descending, see every key light up in sequence

### App Mapping
- Piano already handles sharps/flats visually
- `core/constants/scales.ts` has chromatic scale definition: `[0,1,2,3,4,5,6,7,8,9,10,11]`
- "Try This: C chromatic" already works via the query system

---

## 1.3 Rhythm and Note Duration

### Learning Objectives
- Identify whole, half, quarter, eighth, and sixteenth notes and their rests
- Understand relative duration relationships
- Use dots and ties to modify duration
- Read beamed groups of notes

### Concepts

**Note Values**
Each note shape represents a specific duration relative to others:
- Whole note (semibreve): 4 beats in 4/4 time
- Half note (minim): 2 beats — half of a whole note
- Quarter note (crotchet): 1 beat — half of a half note
- Eighth note (quaver): 1/2 beat — half of a quarter note
- Sixteenth note (semiquaver): 1/4 beat — half of an eighth note

**Rest Values**
Every note value has a corresponding rest (silence) of equal duration. Whole rest (hangs from line 4), half rest (sits on line 3), quarter rest (zigzag), eighth rest (flag), sixteenth rest (double flag).

**Relative Relationships**
Each level doubles: 1 whole = 2 halves = 4 quarters = 8 eighths = 16 sixteenths. This binary subdivision is fundamental to Western rhythm.

**Dots**
A dot after a note adds half its value. Dotted half note = 3 beats (2 + 1). Dotted quarter = 1.5 beats (1 + 0.5). Double dot adds half of the dot: double-dotted half = 3.5 beats (2 + 1 + 0.5).

**Ties**
A curved line connecting two notes of the same pitch — their durations combine into one. Ties allow durations that cross barlines or create values not available with a single note shape.

**Beaming**
Eighth notes and shorter are connected by beams instead of individual flags. Beaming groups notes by beat, making rhythmic structure visible. In 4/4: beam in groups of one beat. In 6/8: beam in groups of three eighth notes (one dotted-quarter beat).

### Interactive Exercises
- **Rhythm builder:** Tap a rhythm, see it notated in real time
- **Duration calculator:** Given a note with dots/ties, calculate total beat value
- **Beat counter:** A metronome plays, student taps note durations in time

### App Mapping
- No rhythm/notation system currently exists in the app
- Would need a notation display component (could use VexFlow, abcjs, or custom SVG)
- Audio engine can play rhythmic patterns with the existing synth

---

## 1.4 Meter and Time Signatures

### Learning Objectives
- Feel and identify a steady pulse
- Understand measures, barlines, and time signatures
- Count in 2/4, 3/4, and 4/4 (simple meters)
- Identify strong and weak beats
- Recognize anacrusis (pickup notes)

### Concepts

**Pulse and Tempo**
Music has a steady underlying beat (pulse). Tempo is the speed of that pulse, measured in BPM (beats per minute). 60 BPM = one beat per second. 120 BPM = two beats per second.

**Measures and Barlines**
Vertical lines (barlines) divide the staff into measures (bars). Each measure contains a specific number of beats determined by the time signature. Double barlines mark section boundaries. Final barlines (thin + thick) mark the end.

**Simple Time Signatures**
Written as a fraction: top number = beats per measure, bottom number = which note value gets one beat.
- 4/4 (Common time, C): 4 quarter-note beats per measure. Most common meter in Western music.
- 3/4: 3 quarter-note beats per measure. Waltz feel.
- 2/4: 2 quarter-note beats per measure. March feel.

**Metric Accent (Strong and Weak Beats)**
Not all beats are equal. In 4/4: beat 1 is strongest, beat 3 is secondary strong, beats 2 and 4 are weak. In 3/4: beat 1 strong, beats 2-3 weak. This accent pattern creates the "feel" of the meter.

**Counting**
In 4/4: "1 - 2 - 3 - 4". With eighth notes: "1-and-2-and-3-and-4-and". With sixteenths: "1-e-and-a-2-e-and-a..." Counting aloud builds internal rhythm.

**Anacrusis (Pickup/Upbeat)**
When a piece starts before the first full measure. The pickup and the final measure together equal one complete measure. Common in many familiar melodies.

**Repeat Signs**
Two dots before a double barline = go back to the matching double barline (or the beginning). First and second endings (volta brackets) allow different material on repeats.

### Interactive Exercises
- **Beat tapper:** Metronome plays a meter, student taps on the downbeat
- **Time signature identifier:** Hear a pattern, identify 2/4 vs 3/4 vs 4/4
- **Rhythm reader:** Simple rhythm displayed, student claps/taps along with metronome

### App Mapping
- Audio engine can provide metronome/click track
- No meter/rhythm visualization exists yet
- This section is more about listening and feeling than instrument interaction

---

## 1.5 Major Scales

### Learning Objectives
- Build a major scale from any starting note using the W-W-H-W-W-W-H formula
- Understand scale degrees by number (1 through 7)
- Read key signatures for C, G, D, F major
- Recognize the tetrachord structure

### Concepts

**The Major Scale Formula**
Seven notes following the pattern: Whole-Whole-Half-Whole-Whole-Whole-Half (W-W-H-W-W-W-H). Starting from C: C-D-E-F-G-A-B (all white keys). This specific pattern of whole and half steps creates the "major" sound — bright, stable, resolved.

**Building from Any Note**
Apply W-W-H-W-W-W-H from any starting pitch. G major: G-A-B-C-D-E-F#. Why F#? Because G to A is W, A to B is W, B to C is H, C to D is W, D to E is W, E to F is only H (need W), so raise F to F#. The formula forces accidentals.

**Scale Degrees**
Each note in a scale has a number (degree): 1-2-3-4-5-6-7. The 1st degree (tonic) is "home." The 8th degree is the octave of the 1st. These numbers stay the same regardless of key — degree 5 is always the fifth note of the scale.

**Key Signatures**
Instead of writing accidentals on every note, a key signature places them at the start of each staff line. C major: no sharps or flats. G major: 1 sharp (F#). D major: 2 sharps (F#, C#). F major: 1 flat (Bb).

**Order of Sharps and Flats**
Sharps appear in order: F-C-G-D-A-E-B (mnemonic: Father Charles Goes Down And Ends Battle). Flats are the reverse: B-E-A-D-G-C-F. Each new sharp or flat follows the circle of fifths.

**Tetrachords**
A major scale splits into two identical four-note patterns (tetrachords): W-W-H. The first tetrachord of one scale becomes the second tetrachord of the scale a fifth below (and vice versa). This explains why scales are related by fifths.

### Interactive Exercises
- **Scale builder:** Given a root note, student selects piano keys to build the major scale. App validates W-W-H-W-W-W-H.
- **Key signature quiz:** Show a key signature → student identifies the major key. Show a key name → student identifies the accidentals.
- **Try This:** "C major scale", "G major scale", "D major scale", "F major scale" — piano highlights the notes, fretboard shows the pattern.

### App Mapping
- `core/constants/scales.ts`: `major: [0, 2, 4, 5, 7, 9, 11]` — fully supported
- Scale display on piano and fretboard already works
- Existing Unit 2 covers this well — refine rather than rewrite

---

## 1.6 Basic Intervals

### Learning Objectives
- Name intervals by number (2nd through octave)
- Distinguish melodic from harmonic intervals
- Hear and identify ascending vs. descending intervals
- Find intervals within the major scale

### Concepts

**What Is an Interval?**
The distance between two pitches. Intervals are the DNA of melody and harmony — every scale, chord, and progression is built from intervals.

**Naming by Number**
Count from the lower note to the upper note, inclusive. C to E = 3rd (C-D-E: three letter names). C to G = 5th (C-D-E-F-G: five letter names). Same note = unison (1st). C to next C = octave (8th).

**Melodic vs. Harmonic**
- Melodic interval: two notes played one after the other (in a melody)
- Harmonic interval: two notes played simultaneously (in a chord)

**Ascending vs. Descending**
C up to G = ascending 5th. G down to C = descending 5th. Same interval, different direction. Ear training at this stage focuses on recognizing interval size regardless of direction.

**Intervals in the Major Scale**
Every interval from the tonic of a major scale has a specific quality:
- Unison: C-C
- 2nd: C-D
- 3rd: C-E
- 4th: C-F
- 5th: C-G
- 6th: C-A
- 7th: C-B
- Octave: C-C

At this level, we only identify intervals by number (not quality). Quality (major, minor, perfect, etc.) comes in Level 2.

### Interactive Exercises
- **Interval finder:** Click two keys on the piano → app names the interval number
- **Interval builder:** Given a note and an interval number → student finds the target note
- **Interval listener:** Play two notes → student identifies the interval by number (ear training preview)

### App Mapping
- `core/constants/intervals.ts`: All intervals defined with semitone values and names
- Piano can highlight two notes and show the interval between them
- "Try This" can demonstrate specific intervals

---

## 1.7 First Chords

### Learning Objectives
- Understand that a chord is three or more notes sounded together
- Hear and play a major triad (root position)
- Identify the root, third, and fifth of a major triad
- Recognize the major triad sound (bright, stable)

### Concepts

**What Is a Chord?**
Three or more pitches sounding simultaneously. Chords are the vertical dimension of music — while melodies move horizontally through time, chords stack notes on top of each other. A two-note combination is technically a "dyad" or "interval," not a chord.

**The Major Triad**
The most fundamental chord: root + major third + perfect fifth. In C: C-E-G. The root is the note the chord is named after. The third (4 half steps above root) gives the chord its major quality. The fifth (7 half steps above root) adds stability and fullness.

**Building Major Triads**
From any root: go up 4 half steps (major third), then up 3 more half steps (minor third). Or: root + 4 semitones + 7 semitones. G major triad: G-B-D. F major triad: F-A-C. Every major scale has a major triad built on its first degree.

**Recognizing the Sound**
The major triad sounds bright, open, and resolved. It's the sound of a happy ending, a bugle call, a power chord with the third added. Compare it to a minor triad (which we'll learn next level) — minor sounds darker, sadder, more introspective.

### Interactive Exercises
- **Triad builder:** Given a root, student selects piano keys to build a major triad. App validates.
- **Triad identifier:** Play a major triad → student finds the root on the piano
- **Try This:** "C major chord", "G major chord", "F major chord" — piano and fretboard show the voicing

### App Mapping
- `core/constants/chords.ts`: `major: [0, 4, 7]` — fully supported
- Chord display on piano and fretboard already works
- Existing Unit 1 Module 4 covers major/minor thirds — build on that

---

## 1.8 Basic Musical Terms and Symbols

### Learning Objectives
- Recognize and use standard dynamic markings (pp through ff)
- Identify common tempo markings
- Understand crescendo, diminuendo, and fermata
- Recognize basic articulation marks

### Concepts

**Dynamic Markings**
How loud or soft to play:
- pp (pianissimo): very soft
- p (piano): soft
- mp (mezzo-piano): medium soft
- mf (mezzo-forte): medium loud
- f (forte): loud
- ff (fortissimo): very loud

**Tempo Markings**
How fast to play (all Italian):
- Largo: very slow (~40-60 BPM)
- Adagio: slow (~60-80 BPM)
- Andante: walking pace (~80-100 BPM)
- Moderato: moderate (~100-120 BPM)
- Allegro: fast (~120-160 BPM)
- Presto: very fast (~160-200 BPM)

**Gradual Changes**
- Crescendo (cresc. or hairpin opening): gradually louder
- Diminuendo / Decrescendo (dim. or hairpin closing): gradually softer
- These create drama and shape in music

**Fermata**
A dot with an arc above a note — hold it longer than its written value (typically 1.5-2x). The performer or conductor decides exactly how long. Creates a moment of pause or emphasis.

**Basic Articulation**
- Staccato (dot above/below note): short, detached
- Legato (slur line connecting notes): smooth, connected
- Accent (> above/below note): emphasize this note
- Tenuto (line above/below note): hold for full value

### Interactive Exercises
- **Dynamic listening:** Play the same passage at different dynamics → student identifies the level
- **Tempo feel:** Metronome plays at different tempos → student matches the Italian term
- **Articulation demo:** Play notes with different articulations on the piano

### App Mapping
- Audio engine can demonstrate dynamics (volume) and articulations (note duration/attack)
- No notation display for these symbols yet
- These are reference/vocabulary modules — less interactive, more knowledge-based

---

## Module Breakdown for Implementation

| Module ID | Topic | Interactive Elements |
|-----------|-------|---------------------|
| L1M01 | The Staff and Clefs (1.1) | Note identification on piano/staff |
| L1M02 | Ledger Lines and the Grand Staff (1.1) | Octave explorer |
| L1M03 | Half Steps, Whole Steps, and Accidentals (1.2) | Piano step explorer, enharmonic quiz |
| L1M04 | The Chromatic Scale (1.2) | Chromatic playthrough |
| L1M05 | Note Values and Rests (1.3) | Duration calculator |
| L1M06 | Meter and Time Signatures (1.4) | Beat tapper |
| L1M07 | The Major Scale (1.5) | Scale builder, "Try This" |
| L1M08 | Key Signatures — First Four Keys (1.5) | Key signature quiz |
| L1M09 | Intervals by Number (1.6) | Interval finder on piano |
| L1M10 | Your First Chords — Major Triads (1.7) | Triad builder, "Try This" |
