# Level 5: Chromaticism & Modulation

**Difficulty:** Upper Intermediate
**Prerequisites:** Level 4 complete
**Equivalence:** ABRSM Grade 5-6, RCM Level 6-8, Kostka Ch. 16-20, Laitz Ch. 15-20, Berklee Harmony 2-3, AP Music Theory
**Estimated Modules:** 12-14

---

## 5.1 Secondary (Applied) Dominants

### Learning Objectives
- Understand what "V of something" means (temporarily tonicizing a diatonic chord)
- Build and resolve V/V, V/ii, V/iii, V/IV, V/vi
- Identify secondary dominants in progressions by ear and in notation
- Apply proper voice leading for secondary dominant resolutions

### Concepts

**The Core Idea**
Any diatonic chord (except diminished) can be temporarily treated as a "tonic" — and given its own dominant. V/V means "the dominant of the dominant." In C major, V = G major. V/V = the dominant of G = D major. D major contains F# — a chromatic note borrowed to create a leading tone to G.

**Why Secondary Dominants Work**
They inject chromatic tension that resolves to a diatonic chord. The listener hears a familiar V → I motion, just applied to a chord other than the real tonic. The result: stronger forward motion and richer harmonic color without leaving the key.

**Secondary Dominants in Major Keys**

| Chord | Target | Notes (in C) | Chromatic Note |
|-------|--------|-------------|----------------|
| V/V | V (G) | D-F#-A | F# |
| V/ii | ii (Dm) | A-C#-E | C# |
| V/iii | iii (Em) | B-D#-F# | D#, F# |
| V/IV | IV (F) | C-E-G | (none — same as I!) |
| V/vi | vi (Am) | E-G#-B | G# |

Note: V/IV = I in root position — identical notes. The distinction is contextual: if the C major chord is followed by F major, it functions as V/IV.

**Secondary Dominant Sevenths**
Even more common than plain secondary dominant triads. V7/V, V7/ii, V7/vi, etc. The seventh adds the tritone that creates the pulling power. V7/V in C major = D7 (D-F#-A-C). The tritone F#-C resolves to G-B.

**Resolution Patterns**
- Regular resolution: secondary dominant → target chord (V/V → V)
- Irregular/deceptive resolution: secondary dominant → something other than the target (V/vi → IV, for example). Rarer but effective.

**Voice Leading**
Apply the same rules as for V7 → I:
- The "leading tone" of the secondary dominant resolves up by half step
- The "seventh" (if present) resolves down by step
- Chromatic notes almost always resolve in the direction they were altered (sharps up, flats down)

### Interactive Exercises
- **Secondary dominant builder:** Given a target diatonic chord → student builds its secondary dominant on the piano
- **Secondary dominant spotter:** Hear a progression with a chromatic chord → identify the secondary dominant and its target
- **Resolution practice:** Given V7/X → resolve correctly
- **Try This:** "D7" in the key of C = V7/V. Play D7 → G → see the resolution.

### App Mapping
- Chord parser can handle any chord symbol (D7, A7, E7, etc.)
- Progression parser handles Roman numeral input including secondary dominants
- "Try This" can demonstrate any secondary dominant → target pair
- `chordScaleRelationships.ts` maps dominant 7ths to Mixolydian and other scales

---

## 5.2 Secondary Leading-Tone Chords

### Learning Objectives
- Build viio/X and viio7/X for each diatonic target chord
- Understand the choice between half-diminished and fully-diminished secondary LT chords
- Resolve secondary leading-tone chords properly
- Hear the difference between V/X and viio/X approaches

### Concepts

**What Are Secondary Leading-Tone Chords?**
Just as V can be "applied" to diatonic chords, so can viio. The leading-tone chord (a diminished triad or seventh chord built on the note a half step below the target root) functions as a dominant substitute.

**Secondary Leading-Tone Chords in Major**

| Chord | Target | Notes (in C) |
|-------|--------|-------------|
| viio/V | V (G) | F#-A-C |
| viio/ii | ii (Dm) | C#-E-G |
| viio/iii | iii (Em) | D#-F#-A |
| viio/IV | IV (F) | E-G-Bb |
| viio/vi | vi (Am) | G#-B-D |

**Fully Diminished vs. Half-Diminished**
- viio7/X (fully diminished): more intense, more common in minor keys
- viiø7/X (half-diminished): less intense, more common in major keys
- The fully diminished seventh is symmetrical (all minor thirds) — any note can function as the root, enabling enharmonic reinterpretation (Level 6)

**Resolution**
The root of the secondary LT chord (the temporary leading tone) resolves up by half step to the root of the target. All other voices resolve by step or common tone, following standard diminished-chord resolution patterns.

### Interactive Exercises
- **LT chord builder:** Given a target → build viio7/X
- **V/X vs viio/X comparison:** Hear both approaches to the same target → compare
- **Resolution practice:** Resolve viio7 chords in various contexts

### App Mapping
- Diminished chord qualities exist in the engine
- Can be demonstrated via chord symbols and "Try This"

---

## 5.3 Tonicization

### Learning Objectives
- Distinguish tonicization from modulation (brief vs. permanent key change)
- Recognize tonicization as a secondary dominant resolving to its target
- Identify chains of secondary dominants (extended tonicization)
- Analyze tonicizations in real music

### Concepts

**Tonicization vs. Modulation**
- Tonicization: a brief, momentary emphasis on a non-tonic chord. One or two chords "point to" the target, then the music returns to the home key. No key signature change.
- Modulation: an actual change of key that persists for a significant time. Confirmed by a cadence in the new key.

The line is blurry. Rule of thumb: if there's a cadence in the new key, it's a modulation. If it's just a secondary dominant → target, it's a tonicization.

**Brief Tonicization**
A single secondary dominant (or secondary LT chord) followed by its target. V7/V → V tonicizes V momentarily. The music continues in the original key. This is the most common form.

**Extended Tonicization**
Multiple chords that function in the "temporary key." Example: ii/V → V7/V → V creates a mini ii-V-I in the key of V. The temporary key has its own pre-dominant and dominant. Still returns to the home key.

**Chains of Secondary Dominants**
A sequence of dominants, each resolving to the next: V7/vi → V7/ii → V7/V → V7 → I. Each chord is the dominant of the next. Creates intense chromatic momentum. Sometimes called "extended dominants" or "dominant chains."

**Sequential Tonicization**
A harmonic sequence where each step tonicizes the next diatonic chord. Descending fifths with secondary dominants: V7/IV → IV → V7/iii → iii → V7/ii → ii → V7 → I. Each pair is a miniature V → I in the temporary key.

### Interactive Exercises
- **Tonicization vs modulation:** Hear short passages → classify as tonicization or modulation
- **Dominant chain:** Build a chain of secondary dominants descending by fifths
- **Extended tonicization:** Build a ii/V → V7/V → V sequence

### App Mapping
- Progression parser can handle sequences of chords
- This is primarily analytical — best taught through audio examples + progression playback

---

## 5.4 Modulation — Diatonic (Pivot Chord)

### Learning Objectives
- Identify closely related keys (differ by 0 or 1 accidental)
- Find pivot chords (chords that exist in both keys)
- Analyze the modulatory process: establish key 1 → pivot → confirm key 2
- Modulate from any key to its dominant, subdominant, or relative major/minor

### Concepts

**Closely Related Keys**
Keys that share most of their notes (differ by 0 or 1 accidental in their key signatures). For C major, closely related keys are:
- G major (dominant) — 1 sharp
- F major (subdominant) — 1 flat
- A minor (relative minor)
- D minor (ii becomes tonic)
- E minor (iii becomes tonic)

These are the easiest modulations because many chords are shared between the keys.

**The Pivot Chord**
A chord that has a valid Roman numeral analysis in BOTH the old key and the new key. It's the "hinge" — the listener's ear reinterprets it. Example: in C major, the chord A minor (Am) is vi. In G major, it's ii. If the music pivots through Am, the ear transitions from hearing vi in C to ii in G.

**The Modulatory Process**
1. **Establish key 1:** Clear cadence or progression in the home key
2. **Approach the pivot:** Move toward a chord that exists in both keys
3. **The pivot chord:** The last chord that makes sense in the old key AND the first chord that makes sense in the new key
4. **Confirm key 2:** Follow the pivot with dominant function in the new key (V or V7 in new key)
5. **Cadence in key 2:** A clear cadence (PAC, ideally) confirms the modulation

**Analysis Notation**
At the pivot chord, write Roman numerals for both keys:
```
C: I    IV    vi → ii    V7    I  :G
                   pivot
```

**Most Common Modulations**
- I to V (tonic to dominant): the most natural and common modulation in major keys
- i to III (tonic minor to relative major): the most natural modulation in minor keys
- I to vi (tonic to relative minor): common in major keys

### Interactive Exercises
- **Pivot chord finder:** Given two keys → list all chords that exist in both (potential pivots)
- **Modulation listener:** Hear a passage → identify where the modulation occurs and the new key
- **Modulation builder:** Given start and end keys → construct a pivot chord modulation

### App Mapping
- Circle of Fifths component shows key relationships visually
- The engine handles all keys — switching selectedKey in the store demonstrates modulation
- Progression parser could be extended to handle multi-key progressions

---

## 5.5 Other Modulation Types

### Learning Objectives
- Execute direct (phrase) modulation
- Understand common-tone modulation
- Recognize chromatic modulation (chromatic pivot)
- Know sequential modulation and enharmonic modulation (preview)

### Concepts

**Direct (Phrase) Modulation**
No pivot chord at all. One phrase ends in key 1, the next phrase begins in key 2. The key change happens between phrases, often with a breath or pause. Common in pop music (the "truck driver" modulation — up a half step for the final chorus).

**Common-Tone Modulation**
One note (common tone) is sustained or repeated while the harmony shifts to a new key. The held note serves as the thread connecting the two key areas. Example: a sustained G connects C major to Eb major (G is the 5th of C and the 3rd of Eb).

**Chromatic Modulation**
A chord is altered chromatically to create a pivot. The altered chord has no diatonic function in the original key — the chromatic change itself signals the shift. More abrupt than diatonic pivot chord modulation.

**Sequential Modulation**
A harmonic sequence carries the music into a new key. The pattern's internal logic overrides the need for a traditional pivot. Sequences can modulate gradually (one step at a time) or dramatically.

**Enharmonic Modulation (Preview)**
Uses the enharmonic reinterpretation of a chord (same sound, different spelling) to pivot between distant keys. Full treatment in Level 6.

### Interactive Exercises
- **Modulation type identifier:** Hear examples of each type → classify
- **Direct modulation demo:** Hear a pop song key change (up a half step)
- **Common-tone finder:** Given two distant keys → find shared notes

### App Mapping
- Direct modulation = simply changing the key in the app
- Common tones could be highlighted between two key selections

---

## 5.6 Mode Mixture (Modal Borrowing)

### Learning Objectives
- Borrow chords from the parallel minor into a major-key context
- Identify the most common borrowed chords: bVI, bIII, bVII, iv, iio
- Understand the Picardy third (major I in a minor-key ending)
- Hear the emotional effect of mode mixture (darkness/melancholy in major)

### Concepts

**What Is Mode Mixture?**
Borrowing chords from the parallel key. In C major, the parallel key is C minor. Mode mixture brings Cm-family chords into a C major context. The result: unexpected darkness, wistfulness, or emotional depth.

**Most Common Borrowed Chords (in Major)**

| Borrowed Chord | Source | Notes (in C) | Effect |
|---------------|--------|-------------|--------|
| iv | Parallel minor | F-Ab-C | Dark subdominant (replaces IV) |
| bVI | Parallel minor | Ab-C-Eb | Dramatic, cinematic |
| bVII | Parallel minor | Bb-D-F | Rock cadence, modal feel |
| bIII | Parallel minor | Eb-G-Bb | Surprising brightness (despite the flat) |
| iio | Parallel minor | D-F-Ab | Dark pre-dominant |

**Picardy Third**
In a minor key, ending the final cadence on a MAJOR tonic (I instead of i). The raised third creates an unexpected brightness — a ray of light at the end. Common in Baroque and Renaissance music.

**Mode Mixture in Minor**
Borrowing from parallel major. Less common but exists. Example: using IV (major) instead of iv (minor) in a minor key.

**Voice Leading with Borrowed Chords**
Chromatic notes from borrowed chords follow their natural tendencies: lowered notes (b3, b6, b7) resolve downward. The smooth chromatic voice leading between diatonic and borrowed chords is part of what makes mode mixture so effective.

### Interactive Exercises
- **Borrowed chord identifier:** Hear a progression in a major key with a borrowed chord → identify it
- **Emotional comparison:** Same progression with IV vs iv → compare the emotional effect
- **Try This:** Play "C minor chord" in the context of C major → hear the mode mixture effect
- **Picardy third demo:** Minor progression ending with major I

### App Mapping
- All chord types exist in the engine
- Mode mixture can be demonstrated by switching between parallel major/minor scale selections
- `chordScaleRelationships.ts` maps borrowed chords to their source scales

---

## 5.7 Musical Form — Small Forms

### Learning Objectives
- Analyze binary form (simple, rounded, balanced)
- Analyze ternary form (ABA, composite)
- Recognize song forms (verse-chorus, AABA, strophic)
- Distinguish sectional from continuous forms

### Concepts

**What Is Musical Form?**
The large-scale organization of a piece — how sections relate to each other. Form is to a piece what paragraph structure is to an essay. We use letters (A, B, C...) to label sections: same material = same letter, different material = different letter.

**Binary Form (Two Parts)**
- **Simple binary (AB):** Two sections, each usually repeated. The first section moves away from tonic (modulates or ends on V), the second returns. Common in Baroque dances.
- **Rounded binary (ABA'):** The A material returns at the end of the B section. A → B → A'. The return of A provides closure. Extremely common — the basis of sonata form.
- **Balanced binary:** Both sections end with the same material, even if they begin differently.

**Ternary Form (Three Parts)**
- **Simple ternary (ABA):** Three sections. A = statement. B = contrast (different key, mood, or theme). A = return (usually in the original key). Each section is self-contained with its own cadences.
- **Composite ternary:** Each section is itself a binary or ternary form. Common in Minuet and Trio, Scherzo and Trio.

**Song Forms**
- **Strophic:** Same music for each verse. Simple and repetitive (hymns, folk songs).
- **Verse-chorus:** Alternating verses (changing lyrics) and choruses (same lyrics). The most common pop form.
- **AABA (32-bar form):** 4 eight-bar sections: A (theme) → A (repeat) → B (bridge/contrast) → A (return). Standard in jazz standards and Tin Pan Alley.
- **Through-composed:** No repeated sections. Each part is new. Less common, used for narrative songs.

**Sectional vs. Continuous**
- Sectional: each section ends with a strong cadence in its own key (independent sections)
- Continuous: sections flow into each other without strong internal cadences

### Interactive Exercises
- **Form labeling:** Listen to a piece → label sections with letters (A, B, A', etc.)
- **Form type identification:** Given the letter structure → name the form
- **Song form analysis:** Listen to a pop song → identify verse, chorus, bridge, etc.

### App Mapping
- This is analytical/listening — less interactive instrument engagement
- Could use audio examples (played through the app's synth or external audio)
- Form analysis is a new category not in the current engine

---

## 5.8 Musical Form — Large Forms (Introduction)

### Learning Objectives
- Understand sonata form (exposition, development, recapitulation)
- Recognize rondo form (ABACA or ABACABA)
- Know theme and variations structure
- Identify compound and nested forms

### Concepts

**Sonata Form**
The crown jewel of Classical form. Three large sections:
1. **Exposition:** Two theme groups in contrasting keys. First theme in tonic, transition, second theme in dominant (or relative major). Usually repeated.
2. **Development:** Themes from the exposition are fragmented, recombined, sequenced, and modulated through various keys. The most harmonically adventurous section.
3. **Recapitulation:** The exposition returns, but now BOTH themes are in the tonic. The tonal conflict is resolved.
Optional: slow introduction before the exposition and coda after the recapitulation.

**Rondo Form**
A main theme (A) alternates with contrasting episodes:
- Five-part rondo: A-B-A-C-A
- Seven-part rondo: A-B-A-C-A-B-A
The recurring A section provides familiarity; the episodes provide variety. Common in Classical finales.

**Theme and Variations**
A theme is stated, then repeated multiple times with changes:
- Melodic variation (ornament the melody)
- Harmonic variation (change the chords)
- Rhythmic variation (change the rhythm)
- Timbral variation (change the instrumentation)
- Modal variation (switch major/minor)
- Character variation (change tempo, meter, mood)

**Compound Forms**
Forms within forms. A Minuet and Trio is a compound ternary: the Minuet itself is a rounded binary, the Trio is another rounded binary, then the Minuet returns. M(aba) → T(cdc) → M(aba).

### Interactive Exercises
- **Form mapping:** Listen to a movement → create a section map
- **Sonata form identification:** Hear exposition, development, recapitulation → identify each
- Primarily analytical/listening

### App Mapping
- Beyond current app capabilities
- Best taught through guided listening with annotated timelines
- Possible future feature: form analysis player that highlights sections

---

## 5.9 Texture

### Learning Objectives
- Identify the five texture types by ear
- Understand how texture choice affects musical character
- Recognize texture changes within a piece

### Concepts

**Monophony**
A single melodic line with no accompaniment. Everyone plays/sings the same melody (possibly in octaves). Gregorian chant, unaccompanied solo melodies. Pure, focused, exposed.

**Homophony**
One melody with chordal accompaniment. The melody dominates; other voices support. This is the most common texture in Western music (pop, hymns, Classical piano, orchestral melody+accompaniment).

**Polyphony / Counterpoint**
Two or more independent melodies sounding simultaneously. Each voice has melodic interest. Fugues, inventions, Renaissance motets. Complex, intellectually engaging.

**Homorhythm**
All voices move in the same rhythm but with different pitches. Chorale-style writing. A specific type of homophony where the rhythmic texture is uniform.

**Heterophony**
Multiple performers play the same melody simultaneously but with individual variations. Common in folk music traditions (Gamelan, Middle Eastern music). Rare in Western classical music.

### Interactive Exercises
- **Texture identifier:** Hear musical examples → classify the texture
- **Texture comparison:** Same melody presented in different textures → compare

### App Mapping
- Could demonstrate homophony vs polyphony through multi-voice audio playback
- Primarily a listening/recognition module

---

## 5.10 Guide Tone Lines

### Learning Objectives
- Define guide tones as the 3rds and 7ths of chords
- Trace guide tone lines through progressions
- Use guide tone voice leading as a composition tool
- Understand guide tones as the Berklee approach to smooth voice leading

### Concepts

**What Are Guide Tones?**
The 3rd and 7th of each chord — the notes that define its quality. The root tells you the chord name; the 3rd tells you major/minor; the 7th tells you the chord type (major 7th, dominant 7th, minor 7th). Guide tones ARE the chord's identity.

**Guide Tone Lines**
If you trace the 3rds and 7ths through a progression, they form smooth voice-leading lines (often moving by step or common tone). In ii7 → V7 → Imaj7 in C major:
- 3rds: F → B → E (each moves by step or half step)
- 7ths: C → F → B (each moves by step or common tone)

**Why Guide Tones Matter**
1. They're the minimum information needed to define the harmony (bass + guide tones = complete harmonic picture)
2. They provide the smoothest voice leading through progressions
3. For improvisers: targeting guide tones guarantees you're hitting the essential chord tones
4. For arrangers: guide tone lines are the skeleton of inner voice parts

### Interactive Exercises
- **Guide tone tracer:** Given a chord progression → highlight the 3rds and 7ths of each chord → see the voice-leading lines
- **Guide tone improvisation:** Play only the guide tones of a progression → hear how they outline the harmony
- **Try This:** Play a ii-V-I → highlight the guide tone movement

### App Mapping
- Chord notes are already available in the engine
- Could add a "guide tones" highlight mode to the piano visualization
- This maps directly to the chord-scale relationship system

---

## Module Breakdown for Implementation

| Module ID | Topic | Interactive Elements |
|-----------|-------|---------------------|
| L5M01 | Secondary Dominants: V/V and V7/V (5.1) | Secondary dominant builder |
| L5M02 | Secondary Dominants of ii, iii, IV, vi (5.1) | Secondary dominant spotter |
| L5M03 | Secondary Leading-Tone Chords (5.2) | LT chord builder, V/X vs viio/X comparison |
| L5M04 | Tonicization vs. Modulation (5.3) | Classification listener |
| L5M05 | Dominant Chains and Sequential Tonicization (5.3) | Dominant chain builder |
| L5M06 | Pivot Chord Modulation (5.4) | Pivot chord finder, modulation builder |
| L5M07 | Modulation to Closely Related Keys (5.4) | Modulation listener |
| L5M08 | Direct, Common-Tone, and Chromatic Modulation (5.5) | Modulation type identifier |
| L5M09 | Mode Mixture — Borrowed Chords (5.6) | Borrowed chord identifier, IV vs iv comparison |
| L5M10 | Picardy Third and Mode Mixture in Minor (5.6) | Picardy third demo |
| L5M11 | Binary and Ternary Forms (5.7) | Form labeling |
| L5M12 | Song Forms and Large Forms Introduction (5.7-5.8) | Song form analysis |
| L5M13 | Texture (5.9) | Texture identifier |
| L5M14 | Guide Tone Lines (5.10) | Guide tone tracer |
