import type { CurriculumUnit, CurriculumModule } from '../types/curriculum';

// ---------------------------------------------------------------------------
// Level 3, Unit 9: Seventh Chords and Diatonic Harmony
// ---------------------------------------------------------------------------

const l3u9m1: CurriculumModule = {
  id: 'l3u9m1',
  unitId: 'u9',
  levelId: 'l3',
  title: 'Seventh Chords: The Five Qualities',
  subtitle: 'Build and identify all five standard seventh chord types and hear their distinct characters',
  objectives: [
    'Build and identify all five standard seventh chord qualities',
    'Understand seventh chords as triads with a seventh added above the root',
    'Hear the distinct character of each quality — from warm to desperately tense',
  ],
  concepts: [
    {
      title: 'What Is a Seventh Chord?',
      explanation:
        'A seventh chord adds a fourth note — a seventh above the root — to a triad. Four notes instead of three. This extra note introduces richer color and greater harmonic tension than any triad can produce. Seventh chords are the harmonic backbone of jazz, pop, and Romantic-era classical music, and understanding them unlocks an entirely new dimension of chord vocabulary.',
      tryThisQuery: 'Cmaj7',
      tryThisLabel: 'Hear Cmaj7 — warm, lush, jazzy',
    },
    {
      title: 'The Five Standard Qualities',
      explanation:
        'Major seventh (Cmaj7): M3+m3+M3 — warm and lush. Dominant seventh (C7): M3+m3+m3 — tense and demanding resolution. Minor seventh (Cm7): m3+M3+m3 — mellow and smooth. Half-diminished (Cm7b5): m3+m3+M3 — dark and yearning. Fully diminished (Cdim7): m3+m3+m3 — extremely tense with a symmetrical structure where every note is a minor third apart.',
      tryThisQuery: 'C7',
      tryThisLabel: 'Hear C7 — the dominant seventh demands resolution',
    },
    {
      title: 'Comparing Seventh Chord Colors',
      explanation:
        'The difference between Cmaj7 and C7 is a single semitone: B natural versus Bb. That one note transforms a lush, stable sonority into a chord bursting with tension. Similarly, Cm7 and Cm7b5 differ only in the fifth (G versus Gb), but the half-diminished quality is far darker and more restless. Training your ear to these subtle distinctions is the foundation of advanced harmonic listening.',
      tryThisQuery: 'Cm7',
      tryThisLabel: 'Hear Cm7 — mellow and smooth',
    },
  ],
  tasks: [
    {
      id: 'l3u9m1t1',
      instruction:
        "Build all five C seventh chords in sequence: 'Cmaj7', 'C7', 'Cm7', 'Cm7b5', 'Cdim7'. Listen carefully to how each quality changes the chord's emotional character",
    },
    {
      id: 'l3u9m1t2',
      instruction:
        "Compare 'Cmaj7' and 'C7' back to back — the only difference is B vs. Bb. Hear how one semitone transforms warmth into tension",
    },
    {
      id: 'l3u9m1t3',
      instruction:
        "Play 'Cdim7' — all four notes are exactly 3 semitones apart. This symmetry means there are only three distinct diminished seventh chords in the entire chromatic scale. Can you figure out which three?",
      query: 'Cdim7',
    },
  ],
  prerequisites: ['l2u8m3'],
};

const l3u9m2: CurriculumModule = {
  id: 'l3u9m2',
  unitId: 'u9',
  levelId: 'l3',
  title: 'Diatonic Seventh Chords',
  subtitle: 'Seventh chords on every scale degree and the dominant seventh as harmonic engine',
  objectives: [
    'Build seventh chords on every degree of major and minor scales',
    'Identify the quality of each diatonic seventh chord using Roman numerals',
    'Understand the dominant seventh (V7) and its tritone as the engine of tonal resolution',
  ],
  concepts: [
    {
      title: 'Diatonic Seventh Chords in Major',
      explanation:
        'Stack a seventh on every degree of the major scale using only notes from that key. The quality pattern is always the same: Imaj7, ii7, iii7, IVmaj7, V7, vi7, viiø7. In C major: Cmaj7, Dm7, Em7, Fmaj7, G7, Am7, Bm7b5. The dominant seventh (V7) is the only naturally occurring dominant-quality seventh chord, and the half-diminished viiø7 functions as a dominant substitute.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See all diatonic chords in C major',
    },
    {
      title: 'The Dominant Seventh and Its Tritone',
      explanation:
        'V7 is the most structurally important seventh chord in tonal music. In C major, G7 contains the notes G-B-D-F. The tritone between B and F is the source of its tension: B (the leading tone) pulls up to C, while F (the chordal seventh) pulls down to E. This double resolution — outward in contrary motion — is the fundamental engine driving tonal harmony toward the tonic.',
      tryThisQuery: 'G7',
      tryThisLabel: 'Hear the tritone inside G7 — B and F demand resolution',
    },
    {
      title: 'Diatonic Seventh Chords in Minor',
      explanation:
        'Using harmonic minor (with its raised 7th), the seventh-chord pattern shifts. The critical chord remains V7 — the raised seventh degree ensures a dominant with a leading tone. The viio7 (fully diminished seventh) functions as an intensified dominant. The iiø7 (half-diminished on the second degree) is the characteristic pre-dominant sonority in minor, often preceding V7 in the iiø7-V7-i progression.',
      tryThisQuery: 'Dm7',
      tryThisLabel: 'Hear Dm7 — the ii7 sound in C major',
    },
  ],
  tasks: [
    {
      id: 'l3u9m2t1',
      instruction:
        "Open 'key of C' and identify the seventh chord quality on each degree: I is major seventh, ii is minor seventh, V is dominant seventh. Verify the full pattern matches Imaj7-ii7-iii7-IVmaj7-V7-vi7-viiø7",
      query: 'key of C',
    },
    {
      id: 'l3u9m2t2',
      instruction:
        "Play 'G7' then 'Cmaj7' — hear how the dominant seventh resolves to the tonic. The tritone B-F opens outward to C-E. This is the ii-V-I resolution that defines Western harmony",
    },
    {
      id: 'l3u9m2t3',
      instruction:
        "Play 'Dm7' then 'G7' — the ii-V progression is the most common two-chord motion in all of Western music. It combines pre-dominant function (ii) with dominant function (V) to create maximum forward momentum toward the tonic",
    },
  ],
  prerequisites: ['l3u9m1'],
};

// ---------------------------------------------------------------------------
// Level 3, Unit 10: Voice Leading and Part Writing
// ---------------------------------------------------------------------------

const l3u10m1: CurriculumModule = {
  id: 'l3u10m1',
  unitId: 'u10',
  levelId: 'l3',
  title: 'Voice Leading Fundamentals',
  subtitle: 'SATB voicing, spacing rules, doubling, and the four types of voice motion',
  objectives: [
    'Understand SATB voicing with correct ranges, spacing, and doubling',
    'Identify the four types of voice motion: contrary, oblique, similar, parallel',
    'Recognize and avoid forbidden parallel fifths and octaves',
  ],
  concepts: [
    {
      title: 'SATB — The Four Voices',
      explanation:
        'Traditional harmony distributes notes across four voices with defined ranges: Soprano (C4-G5), Alto (F3-C5), Tenor (C3-G4), Bass (E2-C4). The soprano carries the melody and the bass defines the harmonic foundation. Adjacent upper voices must stay within an octave of each other, though the gap between tenor and bass may exceed an octave. Voices must never cross — soprano stays above alto, alto above tenor.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'Doubling and Spacing Rules',
      explanation:
        'When four voices play a three-note triad, one note must be doubled. In root position, double the root — it is the strongest, most stable choice. In first inversion, double the soprano note for flexibility. Never double the leading tone: it has a mandatory resolution to the tonic, and doubling it creates unavoidable parallel octaves. In diminished triads, double the third (the most stable note in an unstable chord).',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'Four Types of Voice Motion and Forbidden Parallels',
      explanation:
        'Between any two voices moving from one chord to the next: contrary motion (opposite directions) produces the strongest independence. Oblique motion (one stays, one moves) is smooth. Similar motion (same direction, different intervals) is acceptable. Parallel motion (same direction, same interval) is restricted — parallel fifths and octaves are forbidden because the voices fuse acoustically and lose independence. Parallel thirds and sixths, by contrast, are encouraged.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
  ],
  tasks: [
    {
      id: 'l3u10m1t1',
      instruction:
        'On paper, write a C major triad in SATB: Bass C2, Tenor G3, Alto E4, Soprano C5. Verify all spacing rules: soprano-alto gap (a minor 6th — under an octave), alto-tenor gap (a major 3rd — under an octave), tenor-bass gap (a perfect 5th). All valid.',
    },
    {
      id: 'l3u10m1t2',
      instruction:
        'Explain why doubling the leading tone (B in C major) is forbidden: both B notes must resolve upward to C, producing parallel octaves — one of the most serious voice-leading errors',
    },
    {
      id: 'l3u10m1t3',
      instruction:
        'Given two chords, C major (C-E-G) moving to F major (F-A-C), identify the motion type between each voice pair. If bass moves C down to F while soprano moves G up to A, that is contrary motion — the strongest and most desirable type',
    },
  ],
  prerequisites: ['l3u9m2'],
  comingSoon: true,
};

const l3u10m2: CurriculumModule = {
  id: 'l3u10m2',
  unitId: 'u10',
  levelId: 'l3',
  title: 'Root Position Part Writing',
  subtitle: 'Connecting root-position triads with smooth voice leading by root motion type',
  objectives: [
    'Connect triads in root position following voice leading rules',
    'Apply different strategies based on whether roots move by fifth, third, or second',
    'Write smooth inner voices while maintaining proper doubling and avoiding parallels',
  ],
  concepts: [
    {
      title: 'The Goal of Part Writing',
      explanation:
        'Part writing produces four independent melodic lines that, taken together, create correct harmony. Each voice should be individually singable. The bass defines the chord. The soprano carries the melody. Alto and tenor fill the harmony. The challenge is moving all four voices smoothly from chord to chord while obeying spacing, doubling, and voice-motion rules simultaneously.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'Root Movement by Fifth — Keep the Common Tone',
      explanation:
        'When chord roots are a fifth apart (I-V, I-IV, ii-V), one common tone exists between the two chords. Keep that common tone in the same voice and move the other two upper voices to the nearest available chord tones. This is the most common root motion in tonal music and consistently produces the smoothest, most economical voice leading.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'Root Movement by Third and by Second',
      explanation:
        'Roots a third apart (I-vi, I-iii, IV-ii) share two common tones — keep both in the same voices and move only the remaining voice. Roots a second apart (IV-V, V-vi, I-ii) share zero common tones — all three upper voices must move. For stepwise bass movement, move all upper voices in contrary motion to the bass to prevent the parallel fifths and octaves that easily creep in.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
  ],
  tasks: [
    {
      id: 'l3u10m2t1',
      instruction:
        'Write I-V-I in C major in SATB on paper. Between I and V, the common tone is G — keep it in the same voice. Between V and I, keep G again. Move the remaining voices to the nearest chord tones',
    },
    {
      id: 'l3u10m2t2',
      instruction:
        'Write IV-V in C major. The roots F and G are a second apart — zero common tones. Move all upper voices in contrary motion to the bass (bass rises F to G, upper voices descend). Check every voice pair for parallel fifths and octaves',
    },
    {
      id: 'l3u10m2t3',
      instruction:
        'Write I-vi in C major. The roots C and A are a third apart — two common tones (C and E). Keep both in the same voices and move only the remaining voice from G to A. This produces the smoothest possible voice leading with minimal motion',
    },
  ],
  prerequisites: ['l3u10m1'],
  comingSoon: true,
};

const l3u10m3: CurriculumModule = {
  id: 'l3u10m3',
  unitId: 'u10',
  levelId: 'l3',
  title: 'First and Second Inversion Triads',
  subtitle: 'When and why to use inverted triads — including the restricted second inversion',
  objectives: [
    'Understand when and why to use first inversion (6/3) triads for smoother bass lines',
    'Know the four sanctioned uses of second inversion (6/4) triads',
    'Apply proper doubling rules for inverted triads',
  ],
  concepts: [
    {
      title: 'First Inversion — Versatile and Smooth',
      explanation:
        'First inversion places the third in the bass, creating a lighter, less emphatic version of the chord. Its primary purpose is creating a smooth, stepwise bass line — the most common reason composers invert triads. Any root-position triad can be placed in first inversion for variety. Double the soprano note; avoid doubling the bass if it is a leading tone or tendency tone.',
      tryThisQuery: 'C/E',
      tryThisLabel: 'Hear C major in first inversion — E in the bass',
    },
    {
      title: 'Second Inversion — Restricted Usage',
      explanation:
        'Second inversion places the fifth in the bass, creating an interval of a perfect fourth above the bass — historically treated as dissonant. In common-practice harmony, second inversion triads are not freely used. Four sanctioned patterns exist: the cadential 6/4 (I6/4 decorating V at a cadence), the passing 6/4 (stepwise bass between inversions), the pedal 6/4 (upper voices move over a sustained bass), and the arpeggiated 6/4 in accompaniment figures.',
      tryThisQuery: 'C/G',
      tryThisLabel: 'Hear C major in second inversion — G in the bass',
    },
    {
      title: 'The Cadential 6/4',
      explanation:
        'The most important second-inversion pattern: I6/4 resolving to V at a cadence. The 6th and 4th above the bass act as double appoggiaturas that resolve stepwise down to the 5th and 3rd of V. Many theorists analyze this not as a tonic chord but as a decorated dominant — V with suspensions. This distinction matters: the cadential 6/4 functions as dominant, not tonic, despite its spelling.',
      tryThisQuery: 'F/A',
      tryThisLabel: 'Hear F in first inversion — smooth bass line building block',
    },
  ],
  tasks: [
    {
      id: 'l3u10m3t1',
      instruction:
        "Play 'C/E' then 'C/G' — same three notes, different bass note. First inversion sounds lighter and smoother; second inversion sounds unstable and wants to resolve downward",
    },
    {
      id: 'l3u10m3t2',
      instruction:
        "Play 'C/G' then 'G7' — this demonstrates the cadential 6/4 pattern. The C/G functions as a decoration of the dominant, not as a real tonic chord. Hear how it flows naturally into G7",
    },
    {
      id: 'l3u10m3t3',
      instruction:
        "Play 'F/A' — F major in first inversion. The bass note A creates a smooth stepwise connection from G (a dominant chord) through A to Bb, enabling a walking bass line that root-position chords cannot achieve",
      query: 'F/A',
    },
  ],
  prerequisites: ['l3u10m2'],
};

// ---------------------------------------------------------------------------
// Level 3, Unit 11: Cadences, Phrases, and Embellishment
// ---------------------------------------------------------------------------

const l3u11m1: CurriculumModule = {
  id: 'l3u11m1',
  unitId: 'u11',
  levelId: 'l3',
  title: 'Cadences: The Complete Set',
  subtitle: 'All six standard cadence types — the harmonic punctuation that shapes musical phrases',
  objectives: [
    'Identify and hear all six standard cadence types',
    'Understand cadences as harmonic punctuation defining phrase boundaries',
    'Distinguish strong cadences (PAC) from weak ones (HC, IAC) and deceptive resolutions',
  ],
  concepts: [
    {
      title: 'Authentic Cadences — Perfect and Imperfect',
      explanation:
        'The perfect authentic cadence (PAC) is V(7) to I, both in root position, with the soprano landing on scale degree 1. It is the strongest harmonic arrival — a full stop. The imperfect authentic cadence (IAC) also moves V to I but weakens the closure: one chord may be inverted, or the soprano lands on the 3rd or 5th of I instead of the root. An IAC functions like a comma rather than a period.',
      tryThisQuery: 'G7',
      tryThisLabel: 'Hear V7 in C major — the departure point of authentic cadences',
    },
    {
      title: 'Half, Plagal, and Deceptive Cadences',
      explanation:
        'A half cadence ends on V — any chord moving to the dominant. It sounds like an unanswered question, creating suspense at phrase boundaries. The plagal cadence (IV to I) is the gentle "Amen" cadence, softer than authentic. The deceptive cadence (V to vi) subverts the expected resolution: vi shares two tones with I (in C major, Am shares C and E with the C chord), producing a near-miss that surprises the listener and extends the phrase.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Hear the tonic — the destination of authentic and plagal cadences',
    },
    {
      title: 'The Phrygian Half Cadence',
      explanation:
        'Unique to minor keys: iv6 resolving to V, with the bass descending by half step from scale degree b6 to 5. This half-step descent in the bass gives the cadence its name — it resembles the characteristic falling half step of the Phrygian mode. Common in Baroque music, the Phrygian half cadence has a distinctively dark, archaic quality that no other cadence replicates.',
      tryThisQuery: 'Am',
      tryThisLabel: 'Hear vi — the surprise resolution target of a deceptive cadence',
    },
  ],
  tasks: [
    {
      id: 'l3u11m1t1',
      instruction:
        "Play 'G7' then 'C major chord' — this is a perfect authentic cadence (V7-I) in C major. The strongest possible harmonic conclusion. Hear the complete sense of resolution",
      query: 'G7',
    },
    {
      id: 'l3u11m1t2',
      instruction:
        "Play 'G7' then 'Am' — this is a deceptive cadence (V7-vi). You expected C major but got A minor instead. Notice how it extends the phrase rather than concluding it",
    },
    {
      id: 'l3u11m1t3',
      instruction:
        "Play 'F major chord' then 'C major chord' — this is a plagal cadence (IV-I). Gentler and more devotional than the authentic cadence. Often heard as a final 'Amen' after the real cadence",
    },
  ],
  prerequisites: ['l3u10m3'],
};

const l3u11m2: CurriculumModule = {
  id: 'l3u11m2',
  unitId: 'u11',
  levelId: 'l3',
  title: 'Phrases and Periods',
  subtitle: 'Musical sentences, antecedent-consequent pairs, and the sentence (Satz) structure',
  objectives: [
    'Hear a phrase as a musical sentence with a beginning, middle, and cadence',
    'Understand the period as antecedent (question) paired with consequent (answer)',
    'Distinguish parallel periods, contrasting periods, and the sentence (Satz) structure',
  ],
  concepts: [
    {
      title: 'The Musical Phrase',
      explanation:
        'A phrase is the fundamental unit of musical form — typically 4 or 8 measures long. It has a beginning that establishes the key, a middle that develops harmonic motion, and an end marked by a cadence. Every cadence signals a phrase boundary. Think of a phrase as a complete musical thought, comparable to a sentence in spoken language — it makes a self-contained statement.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'Periods: Antecedent and Consequent',
      explanation:
        'A period pairs two phrases into a question-and-answer structure. The antecedent (first phrase) ends with a weak cadence — usually a half cadence or IAC — posing a musical question. The consequent (second phrase) ends with a strong cadence — usually a PAC — providing the answer. In a parallel period, both phrases share similar opening material. In a contrasting period, the openings differ.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'The Sentence (Satz)',
      explanation:
        'An alternative 8-measure phrase structure common in Classical music: a 2-measure basic idea is stated, then repeated (often varied) in measures 3-4, followed by a 2-measure continuation that fragments the idea and builds momentum, concluding with a 2-measure cadential gesture. The sentence creates forward drive through repetition, fragmentation, and rhythmic acceleration — a fundamentally different architecture from the balanced period.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
  ],
  tasks: [
    {
      id: 'l3u11m2t1',
      instruction:
        'Listen to any well-known melody and identify where each phrase ends — each resting point or moment of arrival marks a cadence and a phrase boundary. Count the measures between cadences',
    },
    {
      id: 'l3u11m2t2',
      instruction:
        'Think of a parallel period as a question and answer that begin the same way but end differently. The antecedent asks (ending on a half cadence), and the consequent answers (ending on a PAC)',
    },
    {
      id: 'l3u11m2t3',
      instruction:
        'Identify the sentence structure in a Classical melody: find the 2-bar basic idea, its repetition, the fragmentation that follows, and the final cadence. Mozart and Beethoven use this form constantly',
    },
  ],
  prerequisites: ['l3u11m1'],
  comingSoon: true,
};

const l3u11m3: CurriculumModule = {
  id: 'l3u11m3',
  unitId: 'u11',
  levelId: 'l3',
  title: 'Harmonic Rhythm',
  subtitle: 'How the rate of chord change shapes musical momentum and phrase structure',
  objectives: [
    'Define harmonic rhythm as the rate of chord change independent of melodic rhythm',
    'Hear how harmonic rhythm interacts with meter — strong beats vs. weak beats',
    'Recognize the universal pattern of harmonic rhythm accelerating toward cadences',
  ],
  concepts: [
    {
      title: 'What Is Harmonic Rhythm?',
      explanation:
        'Harmonic rhythm is the pattern of chord changes over time. One chord per measure is slow harmonic rhythm. One chord per beat is moderate. Two chords per beat is fast. Crucially, harmonic rhythm is independent of melodic rhythm — the melody can race over slow chord changes or sustain long notes over rapidly shifting harmony. It is one of the primary tools composers use to control tension and pacing.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'Harmonic Rhythm, Meter, and Cadential Acceleration',
      explanation:
        'Chord changes are strongest on strong beats. In 4/4, changing chords on beats 1 and 3 feels grounded and natural; changing on beats 2 and 4 creates syncopated harmonic rhythm that feels unstable. A universal pattern across styles: harmonic rhythm accelerates toward cadences. A phrase might hold one chord for two bars, then change every bar, then every beat at the cadence — building momentum into the moment of arrival.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'Harmonic Rhythm as an Expressive Tool',
      explanation:
        'Different harmonic rhythms create fundamentally different characters. A hymn with one chord per beat feels measured and stately. A jazz standard with two or more chords per bar feels harmonically dense and kinetic. A film score holding a single chord for eight bars creates vast, open space. Composers choose harmonic rhythm as deliberately as they choose chords — it shapes the listener experience at the deepest structural level.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
  ],
  tasks: [
    {
      id: 'l3u11m3t1',
      instruction:
        'Listen to any piece and tap each time the chord changes. Is the harmonic rhythm slow (one chord per bar), moderate (two per bar), or fast (every beat)? Most phrases accelerate toward their cadences',
    },
    {
      id: 'l3u11m3t2',
      instruction:
        'Compare a hymn (slow harmonic rhythm — one chord per beat or per bar) to a bebop jazz standard (fast harmonic rhythm — two or more chords per bar). The rate of harmonic change directly shapes the music\'s character and energy',
    },
    {
      id: 'l3u11m3t3',
      instruction:
        'Pick a familiar song and map its harmonic rhythm across the verse and chorus. Does the chorus change chords faster or slower than the verse? How does that affect the emotional impact?',
    },
  ],
  prerequisites: ['l3u11m2'],
  comingSoon: true,
};

const l3u11m4: CurriculumModule = {
  id: 'l3u11m4',
  unitId: 'u11',
  levelId: 'l3',
  title: 'Non-Chord Tones (Part 1)',
  subtitle: 'Passing tones, neighbor tones, and anticipations — the seasoning of melody',
  objectives: [
    'Identify passing tones, neighbor tones, and anticipations in a melodic line',
    'Distinguish accented from unaccented non-chord tones',
    'Understand NCTs as stepwise embellishments that animate otherwise static chord tones',
  ],
  concepts: [
    {
      title: 'What Are Non-Chord Tones?',
      explanation:
        'Non-chord tones (NCTs) are melody notes that do not belong to the underlying chord. They create melodic interest, tension, and stepwise motion between chord tones. Without them, melodies would consist only of arpeggiated chord tones — mechanical and lifeless. NCTs are classified by how they are approached and left: by step, by leap, or by common tone. They are the melodic seasoning that brings harmony to life.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'Passing Tones and Neighbor Tones',
      explanation:
        'A passing tone fills the gap between two different chord tones, approached and left by step in the same direction (C-D-E over a C chord, where D is a passing tone between C and E). A neighbor tone decorates a single chord tone — it departs by step and returns to its starting note (C-D-C, where D is an upper neighbor). Both types come in accented (on a strong beat, more dramatic) and unaccented (on a weak beat, more common) varieties.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
    {
      title: 'Anticipations and Incomplete Neighbors',
      explanation:
        'An anticipation arrives early — a note belonging to the next chord sounds at the end of the current chord, then sustains as the harmony catches up. It creates forward momentum by jumping ahead of the harmonic change. An incomplete neighbor is approached by step but left by leap (or vice versa), having only one stepwise connection. Incomplete neighbors are more dramatic and angular than their complete, symmetrical counterparts.',
      tryThisQuery: '',
      tryThisLabel: '',
    },
  ],
  tasks: [
    {
      id: 'l3u11m4t1',
      instruction:
        'Sing or play C-D-E over a C major chord. D does not belong to C-E-G — it is a passing tone connecting the root to the third by step in one direction',
    },
    {
      id: 'l3u11m4t2',
      instruction:
        'Sing or play E-F-E over a C major chord. F is an upper neighbor tone — it departs from E by step and returns to E, decorating the chord tone without changing harmony',
    },
    {
      id: 'l3u11m4t3',
      instruction:
        'Identify NCTs in a simple melody you know: play each note against the underlying chord and ask whether it belongs. Notes that do not belong are non-chord tones. Classify each as passing, neighbor, or anticipation based on its approach and departure',
    },
  ],
  prerequisites: ['l3u11m3'],
  comingSoon: true,
};

const l3u11m5: CurriculumModule = {
  id: 'l3u11m5',
  unitId: 'u11',
  levelId: 'l3',
  title: 'Transposition',
  subtitle: 'Moving music to any key while preserving all interval relationships',
  objectives: [
    'Transpose a melody or passage to a different key using interval or key-signature methods',
    'Understand concert pitch vs. written pitch for transposing instruments',
    'Use the app to verify transpositions by comparing scales in different keys',
  ],
  concepts: [
    {
      title: 'What Is Transposition?',
      explanation:
        'Transposition moves an entire passage to a different key while preserving all interval relationships. Every note shifts by the same interval. The melody sounds identical — just higher or lower. Transposition serves both practical purposes (fitting a singer\'s range, matching instrument keys) and theoretical ones (understanding that the same harmonic logic operates in every key).',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See C major — your starting key for transposition',
    },
    {
      title: 'Two Transposition Methods',
      explanation:
        'The interval method: determine the interval between the original key and the target key, then shift every note by that exact interval. C major to Eb major is up a minor third, so every note goes up a minor third. The key signature method: change the key signature to the target key and adjust any accidentals to match. Both produce the same result; the interval method is more reliable for short passages.',
      tryThisQuery: 'Eb major scale',
      tryThisLabel: 'See Eb major — C major transposed up a minor third',
    },
    {
      title: 'Transposing Instruments and Concert Pitch',
      explanation:
        'Some instruments sound a different pitch than they read. Bb instruments (trumpet, clarinet, tenor sax) sound a major second lower than written — to hear concert C, they read D. Eb instruments (alto sax) sound a major sixth lower. F instruments (French horn) sound a perfect fifth lower. Concert pitch is the actual sounding pitch; all instruments align to it when the orchestra tunes to A440.',
      tryThisQuery: 'A major scale',
      tryThisLabel: 'See A major — what a Bb trumpet sounds reading C major',
    },
  ],
  tasks: [
    {
      id: 'l3u11m5t1',
      instruction:
        "Compare 'C major scale' and 'G major scale' — every note has moved up a perfect fifth. The interval pattern W-W-H-W-W-W-H is preserved exactly; only the letter names change",
      query: 'G major scale',
    },
    {
      id: 'l3u11m5t2',
      instruction:
        "Open 'C major scale' then 'Eb major scale' — you have transposed up a minor third. Verify: C becomes Eb, D becomes F, E becomes G, and so on. Every interval is maintained",
      query: 'Eb major scale',
    },
    {
      id: 'l3u11m5t3',
      instruction:
        "A Bb trumpet reads 'C major scale' but produces the sound of 'Bb major scale'. Open both and verify: every sounding note is a major second lower than the written note. This is why trumpet parts are written a whole step higher than concert pitch",
    },
  ],
  prerequisites: ['l3u11m4'],
};

// ---------------------------------------------------------------------------
// Exported units
// ---------------------------------------------------------------------------

export const L3_UNITS: CurriculumUnit[] = [
  {
    id: 'u9',
    levelId: 'l3',
    title: 'Seventh Chords and Diatonic Harmony',
    description:
      'The five seventh chord qualities, diatonic seventh chords in major and minor, and the dominant seventh as harmonic engine',
    icon: 'chords',
    modules: [l3u9m1, l3u9m2],
    milestone: {
      skillsSummary: [
        'Build and identify all five seventh chord qualities by sound and structure',
        'Map diatonic seventh chords in any major or minor key using Roman numerals',
        'Hear the tritone inside V7 and understand its resolution as the engine of tonal music',
      ],
      bridgeText:
        'You can now build and analyze every standard seventh chord and locate them within a key. Next, you\u2019ll learn how to connect these chords smoothly through voice leading — the art of making each voice sing its own melodic line.',
      tryThisQuery: 'Bm7b5',
      tryThisLabel: 'Build the half-diminished viiø7 in C major',
      tryThisPrompt:
        'This is the viiø7 chord in C major. Can you name its four notes and explain why it functions as a dominant substitute?',
    },
  },
  {
    id: 'u10',
    levelId: 'l3',
    title: 'Voice Leading and Part Writing',
    description:
      'SATB voicing, spacing rules, connecting chords with smooth voice motion, and the role of inversions',
    icon: 'harmony',
    modules: [l3u10m1, l3u10m2, l3u10m3],
    milestone: {
      skillsSummary: [
        'Apply SATB spacing, doubling, and voice-crossing rules correctly',
        'Connect root-position triads using common-tone and contrary-motion strategies',
        'Use first and second inversion triads to create smooth bass lines and cadential patterns',
      ],
      bridgeText:
        'You can now write and connect chords following the rules of voice leading. The final unit applies these skills to cadences, phrase structure, embellishment, and transposition — completing your harmony foundations.',
      tryThisQuery: 'C/E',
      tryThisLabel: 'Hear C major in first inversion',
      tryThisPrompt:
        'First inversion puts E in the bass. How does this create a smoother bass line when moving from a D chord to a C chord?',
    },
  },
  {
    id: 'u11',
    levelId: 'l3',
    title: 'Cadences, Phrases, and Embellishment',
    description:
      'All six cadence types, phrase and period structure, harmonic rhythm, non-chord tones, and transposition to any key',
    icon: 'scales',
    modules: [l3u11m1, l3u11m2, l3u11m3, l3u11m4, l3u11m5],
    milestone: {
      skillsSummary: [
        'Identify all six cadence types and their relative strength as harmonic punctuation',
        'Analyze phrase structures as periods (antecedent-consequent) or sentences (Satz)',
        'Transpose any passage to a new key using interval or key-signature methods',
      ],
      bridgeText: '',
      tryThisQuery: 'Ab major scale',
      tryThisLabel: 'Transpose C major up a minor sixth to Ab',
      tryThisPrompt:
        'Every note of C major shifted up a minor sixth produces Ab major. Can you name all the notes before looking?',
    },
  },
];
