import type { CurriculumUnit, CurriculumModule } from '../types/curriculum';

// ---------------------------------------------------------------------------
// Level 4, Unit 12: Advanced Seventh Chords and Function
// ---------------------------------------------------------------------------

const l4u12m1: CurriculumModule = {
  id: 'l4u12m1',
  unitId: 'u12',
  levelId: 'l4',
  title: 'Non-Chord Tones: Complete Set',
  subtitle: 'Suspensions, retardations, appoggiaturas, escape tones, and pedal points',
  objectives: [
    'Identify all NCT types: suspension, retardation, appoggiatura, escape tone, pedal point, changing tones',
    'Understand the preparation-dissonance-resolution pattern of suspensions',
    'Classify NCTs by approach (step/leap/held) and departure (step/leap)',
  ],
  concepts: [
    {
      title: 'Suspensions and Retardations',
      explanation:
        'A suspension is a note held (tied) from the previous chord into the new chord, creating a dissonance that resolves downward by step. It has three phases: preparation (consonant), suspension (dissonant, on a strong beat), and resolution (consonant). Named by intervals above the bass: 4-3, 7-6, 9-8 are the standard types, with the 2-3 bass suspension being the only one that resolves upward. A retardation uses the same mechanism but resolves upward by step instead of down \u2014 the most typical is the 7-8 retardation where the leading tone is held over and resolves up to the tonic.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Hear the consonant resolution target',
    },
    {
      title: 'Appoggiatura and Escape Tone',
      explanation:
        'The appoggiatura is approached by leap and resolved by step in the opposite direction, landing on a strong beat. The word means "leaning note" \u2014 it leans heavily into its resolution, creating a dramatic, accented dissonance more striking than a passing tone because the leap makes it unexpected. The escape tone (echappee) is the reverse: approached by step and left by leap in the opposite direction. It steps away from a chord tone, then leaps back to a different chord tone, creating a brief decorative gesture on a weak beat.',
      tryThisQuery: 'G major scale',
      tryThisLabel: 'Hear stepwise motion that NCTs decorate',
    },
    {
      title: 'Pedal Point and Changing Tones',
      explanation:
        'A pedal point is a sustained or repeated note (usually in the bass) over changing harmonies, creating alternating dissonances and consonances as the chords move above it. Tonic pedals anchor beginnings and endings of pieces; dominant pedals build tension before a return. Pedal types include bass pedal (most common), inverted pedal (in the soprano), internal pedal (in an inner voice), and double pedal (usually tonic + dominant). Changing tones (double neighbor) are a pair of neighbor tones in sequence: chord tone, upper neighbor, lower neighbor, back to chord tone \u2014 creating a decorative orbit around a single pitch.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'C is the most common tonic pedal note',
    },
  ],
  tasks: [
    {
      id: 'l4u12m1t1',
      instruction: "Play 'C major chord' and imagine holding the note F while the chord sounds \u2014 the F is a dissonant 4th above the bass that wants to resolve down to E (a 4-3 suspension pattern)",
    },
    {
      id: 'l4u12m1t2',
      instruction: "Classify these NCTs by approach and departure: passing tone (step/step same direction), neighbor (step/step back), appoggiatura (leap/step opposite), escape tone (step/leap opposite), suspension (held/step down), retardation (held/step up)",
    },
    {
      id: 'l4u12m1t3',
      instruction: "Imagine a bass note C sustained while chords change above: C major, F major, G7, C major. The F and G7 chords create dissonance against the bass C \u2014 that is a tonic pedal point in action",
    },
  ],
  prerequisites: ['l3u11m5'],
  comingSoon: true,
};

const l4u12m2: CurriculumModule = {
  id: 'l4u12m2',
  unitId: 'u12',
  levelId: 'l4',
  title: 'The Dominant Seventh in Depth',
  subtitle: 'V7 resolution tendencies, voice leading, and inversions',
  objectives: [
    'Master V7 resolution tendencies: the 7th resolves down, the leading tone resolves up',
    'Voice complete and incomplete V7 chords correctly',
    'Resolve all four inversions of V7 to their proper targets',
  ],
  concepts: [
    {
      title: 'V7 Tendency Tones',
      explanation:
        'The dominant seventh chord contains two tendency tones that create its powerful gravitational pull toward the tonic. The leading tone (the 3rd of V7) resolves up by half step to the tonic. The chordal 7th resolves down by step to the 3rd of I. Together, these two voices form a tritone that contracts to an imperfect consonance (a 3rd or 6th), generating the strongest harmonic drive in tonal music.',
      tryThisQuery: 'G7',
      tryThisLabel: 'Hear the unresolved tension of G7',
    },
    {
      title: 'Complete vs. Incomplete V7',
      explanation:
        'A complete V7 has all four tones: root, 3rd, 5th, and 7th. An incomplete V7 omits the 5th and doubles the root, used when voice leading with the complete form would be awkward. When a complete V7 resolves to I, the resulting tonic chord is often incomplete (tripled root, missing 5th) because both tendency tones must resolve correctly. This trade-off between chord completeness and voice-leading smoothness is a central concern in part-writing.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Hear the resolution target of G7',
    },
    {
      title: 'V7 Inversions',
      explanation:
        'Each V7 inversion has a specific resolution target. Root position V7 resolves to I with the most emphasis. First inversion (V6/5) places the leading tone in the bass, which must step up to the tonic. Second inversion (V4/3) has the 5th in the bass and can resolve to I or I6. Third inversion (V4/2) places the chordal 7th in the bass, which must step down \u2014 this is why V4/2 almost always resolves to I6 (first-inversion tonic). The inversion determines the bass motion, which determines the resolution.',
      tryThisQuery: 'G7',
      tryThisLabel: 'Play G7 and identify its four chord tones',
    },
  ],
  tasks: [
    {
      id: 'l4u12m2t1',
      instruction: "Type 'G7' \u2014 identify the two tendency tones: B (leading tone, resolves up to C) and F (chordal 7th, resolves down to E). Together they form the tritone that drives V7-I resolution",
      query: 'G7',
    },
    {
      id: 'l4u12m2t2',
      instruction: "Now type 'C major chord' \u2014 this is where G7 resolves. B went to C, F went to E. The tritone contracted to the consonant interval C-E",
      query: 'C major chord',
    },
    {
      id: 'l4u12m2t3',
      instruction: "Play 'G7' then 'C major chord' back to back \u2014 hear the tension-resolution cycle. The dominant seventh is the strongest chord-to-chord motion in tonal music",
    },
  ],
  prerequisites: ['l4u12m1'],
};

const l4u12m3: CurriculumModule = {
  id: 'l4u12m3',
  unitId: 'u12',
  levelId: 'l4',
  title: 'All Diatonic Seventh Chords: Function and Usage',
  subtitle: 'Every seventh chord quality in a key and how each one functions',
  objectives: [
    'Identify and build all diatonic seventh chords in major and minor keys',
    'Understand the function of pre-dominant sevenths (ii7, IV7), mediant/submediant sevenths (iii7, vi7), and leading-tone sevenths (vii\u00F87, viio7)',
    'Recognize Imaj7 in jazz/pop and I7 in blues contexts',
  ],
  concepts: [
    {
      title: 'Pre-Dominant Seventh Chords',
      explanation:
        'The ii7 (minor 7th in major, half-diminished in minor) is the most important pre-dominant chord. The progression ii7-V7-I is the strongest functional sequence in tonal harmony because the 7th of ii7 is a common tone with the root of V, creating a seamless voice-leading connection. IVmaj7 serves a similar subdominant function with added warmth; the seventh intensifies the pull toward the dominant.',
      tryThisQuery: 'Dm7',
      tryThisLabel: 'Hear ii7 in the key of C',
    },
    {
      title: 'Mediant, Submediant, and Tonic Sevenths',
      explanation:
        'The iii7 functions as a tonic substitute (sharing notes with I) or as a link in circle-of-fifths motion: iii7-vi7-ii7-V7-I. The vi7 is a tonic-function substitute; vi7-ii7-V7-I is extremely common, and the deceptive resolution V7-vi7 is smoother than V7-vi because of shared notes. Imaj7 in classical harmony treats the 7th as a passing tone, but in jazz and pop it is the standard tonic voicing \u2014 warm and sophisticated. In blues, the I chord is a dominant seventh (I7), giving every chord the characteristic "wrong but right" sound.',
      tryThisQuery: 'Cmaj7',
      tryThisLabel: 'Hear the jazz tonic: Cmaj7',
    },
    {
      title: 'Leading-Tone Seventh Chords',
      explanation:
        'The vii\u00F87 (half-diminished in major) functions like a rootless V7 \u2014 its notes are the 3rd, 5th, 7th, and 9th of V. It resolves to I with the same tendency-tone logic. The viio7 (fully diminished in minor) is even more intense: all four notes are tendency tones pulling toward resolution. The fully diminished seventh divides the octave into equal minor thirds, giving it enharmonic flexibility that becomes important in modulation at higher levels.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See all diatonic chords in C major',
    },
  ],
  tasks: [
    {
      id: 'l4u12m3t1',
      instruction: "Type 'Dm7' then 'G7' then 'Cmaj7' \u2014 this is the ii7-V7-Imaj7 progression, the most fundamental chord sequence in jazz and the strongest functional progression in tonal harmony",
    },
    {
      id: 'l4u12m3t2',
      instruction: "Type 'Cmaj7' \u2014 notice the major 7th interval (B to C). Now type 'C7' \u2014 the minor 7th (Bb) gives it a completely different character. Cmaj7 is tonic function; C7 is dominant quality (or blues tonic)",
    },
    {
      id: 'l4u12m3t3',
      instruction: "Open 'key of C' and identify all seven diatonic seventh chords: Imaj7, ii7, iii7, IVmaj7, V7, vi7, vii\u00F87. Which are pre-dominant function? Which are dominant function?",
      query: 'key of C',
    },
  ],
  prerequisites: ['l4u12m2'],
};

const l4u12m4: CurriculumModule = {
  id: 'l4u12m4',
  unitId: 'u12',
  levelId: 'l4',
  title: 'Harmonic Function Theory',
  subtitle: 'Tonic, Pre-Dominant, and Dominant \u2014 the three pillars of tonal harmony',
  objectives: [
    'Classify every diatonic chord by function: Tonic (T), Pre-Dominant (PD), Dominant (D)',
    'Understand the standard progression T \u2192 PD \u2192 D \u2192 T as the fundamental harmonic sentence',
    'Recognize retrogressions and chord substitution within functional groups',
  ],
  concepts: [
    {
      title: 'The Three Harmonic Functions',
      explanation:
        'Every diatonic chord serves one of three functions. Tonic (T) chords \u2014 I, vi, and sometimes iii \u2014 provide stability and the sense of home. Pre-Dominant (PD) chords \u2014 ii and IV \u2014 create departure and motion, signaling that the harmony is heading somewhere. Dominant (D) chords \u2014 V and vii\u00B0 \u2014 generate tension and urgency that demands resolution back to the tonic. The degree colors in this app encode these functions: blue for tonic stability, amber for dominant tension.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See function colors on the degree bar',
    },
    {
      title: 'The Standard Functional Progression',
      explanation:
        'T \u2192 PD \u2192 D \u2192 T is the fundamental harmonic sentence, mirroring narrative structure: establish home, depart, create tension, resolve. Nearly all tonal music follows this pattern at some structural level. The order matters: PD \u2192 D increases tension, D \u2192 T releases it. Reversing the flow (retrogression) feels unusual because it releases tension prematurely \u2014 D \u2192 PD or PD \u2192 T without passing through D creates deflection, avoidance of resolution, or a gentle return.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'Trace I-IV-V-I as T-PD-D-T',
    },
    {
      title: 'Chord Substitution Within Functions',
      explanation:
        'Chords within the same functional group can substitute for each other because they share scale degrees. The vi can replace I (this is why the deceptive cadence V-vi works \u2014 vi is tonic-function). The ii can replace IV (both are pre-dominant). The vii\u00B0 can replace V (both are dominant-function). Substitution explains why so many different progressions work: they follow the same T-PD-D-T functional pattern with different specific chords filling each role.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See which chords share function',
    },
  ],
  tasks: [
    {
      id: 'l4u12m4t1',
      instruction: "Open 'key of C' and classify each diatonic chord: I(T), ii(PD), iii(T), IV(PD), V(D), vi(T), vii\u00B0(D). Notice how the degree bar colors map to these functions",
      query: 'key of C',
    },
    {
      id: 'l4u12m4t2',
      instruction: "Trace the progression I-vi-ii-V-I through function labels: T-T-PD-D-T. Even with a substitution (vi standing in for I), the functional flow T \u2192 PD \u2192 D \u2192 T is maintained",
    },
    {
      id: 'l4u12m4t3',
      instruction: "Consider I-V-IV-I (T-D-PD-T). This is a retrogression \u2014 D moves to PD instead of resolving to T. It sounds unusual in classical music but is common in rock. Can you hear the difference in harmonic direction?",
    },
  ],
  prerequisites: ['l4u12m3'],
};

// ---------------------------------------------------------------------------
// Level 4, Unit 13: Sequences, Counterpoint, and Meter
// ---------------------------------------------------------------------------

const l4u13m1: CurriculumModule = {
  id: 'l4u13m1',
  unitId: 'u13',
  levelId: 'l4',
  title: 'Harmonic Sequences',
  subtitle: 'Repeating harmonic patterns that create directed motion through a key',
  objectives: [
    'Recognize descending-fifths, ascending-seconds, and descending-thirds sequence patterns',
    'Understand how sequences create directional harmonic momentum that overrides normal functional logic',
    'Hear sequences in context across Baroque, Classical, and pop styles',
  ],
  concepts: [
    {
      title: 'What Is a Harmonic Sequence?',
      explanation:
        'A harmonic sequence is a pattern of chords that repeats at regular intervals, transposing up or down with each repetition. Sequences create strong directional momentum \u2014 the listener hears the pattern and anticipates its continuation. They temporarily override normal functional progressions because the repeating pattern itself provides the harmonic logic. Any deviation from the established pattern is immediately noticeable, which makes sequences both predictable and compelling.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See all diatonic chords for sequence building',
    },
    {
      title: 'The Descending Fifths Sequence',
      explanation:
        'The most common harmonic sequence. Roots descend by fifths: I-IV-vii\u00B0-iii-vi-ii-V-I. Each chord resolves to the next as if it were a local V-I motion. The full circle returns to the starting key. Any subset works as a usable progression: vi-ii-V-I is a descending-fifths fragment used constantly in tonal music. Adding seventh chords makes the voice leading even smoother because the 7th of each chord resolves by step into the next chord.',
      tryThisQuery: 'Am7',
      tryThisLabel: 'vi7 starts a common fifths descent',
    },
    {
      title: 'Ascending Seconds and Descending Thirds',
      explanation:
        'In an ascending-seconds sequence, roots move up by step: I-ii-iii-IV-V, creating a climbing sensation. First inversions are often used to keep the bass line smooth (the 5-6 technique). In a descending-thirds sequence, roots fall by thirds: I-vi-IV-ii, producing a gentle, falling motion common in Romantic music. Each pair in a thirds sequence shares a common tone, making the voice leading exceptionally smooth.',
      tryThisQuery: 'Dm7',
      tryThisLabel: 'ii7 sits at the center of many sequences',
    },
  ],
  tasks: [
    {
      id: 'l4u13m1t1',
      instruction: "Map the descending fifths in C major: C-F-Bdim-Em-Am-Dm-G-C (I-IV-vii\u00B0-iii-vi-ii-V-I). Open 'key of C' and play each chord \u2014 hear how each root drops a fifth to the next",
      query: 'key of C',
    },
    {
      id: 'l4u13m1t2',
      instruction: "Play 'Am7' then 'Dm7' then 'G7' then 'Cmaj7' \u2014 this is a descending-fifths fragment (vi7-ii7-V7-Imaj7), the most common chord progression in jazz",
    },
    {
      id: 'l4u13m1t3',
      instruction: "Identify the sequence type in I-vi-IV-ii: each root drops a third (C-A-F-D). This is a descending-thirds sequence. Notice how each adjacent pair shares a common tone, keeping the voice leading smooth",
    },
  ],
  prerequisites: ['l4u12m4'],
  comingSoon: true,
};

const l4u13m2: CurriculumModule = {
  id: 'l4u13m2',
  unitId: 'u13',
  levelId: 'l4',
  title: 'Introduction to Two-Part Counterpoint',
  subtitle: 'Combining independent melodies with consonance and dissonance rules',
  objectives: [
    'Understand counterpoint as the art of combining independent melodic lines',
    'Apply consonance and dissonance classification to two-voice textures',
    'Write first species (1:1) and second species (2:1) counterpoint following voice-leading rules',
  ],
  concepts: [
    {
      title: 'What Is Counterpoint?',
      explanation:
        'Counterpoint is the art of combining two or more independent melodic lines that are harmonically related but melodically independent. While harmony is a vertical perspective (chords stacked at a moment in time), counterpoint is horizontal (melodies unfolding over time and interweaving). The two perspectives complement each other \u2014 good harmony usually implies good counterpoint, and vice versa. Counterpoint was the dominant compositional technique from the Renaissance through the Baroque era.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'A scale is the simplest melodic line',
    },
    {
      title: 'Consonance and Dissonance in Counterpoint',
      explanation:
        'In two-part counterpoint, every vertical interval between the voices is classified. Perfect consonances (P1, P5, P8) are the most stable but sound hollow if overused. Imperfect consonances (m3, M3, m6, M6) are stable and warm \u2014 they form the backbone of good counterpoint, providing the best balance of harmony and independence. Dissonances (m2, M2, P4, tritone, m7, M7) are unstable and must resolve by step to a consonance.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'C-E is an imperfect consonance (M3)',
    },
    {
      title: 'First and Second Species',
      explanation:
        'First species (1:1) places one counterpoint note against each note in the cantus firmus (given melody). Every interval must be consonant. Begin and end on P1, P5, or P8, use mostly imperfect consonances, and never approach perfect consonances in parallel motion. Second species (2:1) adds two notes against each cantus firmus note. Strong beats must be consonant; weak beats may be dissonant if they are passing tones or neighbor tones approached and left by step. This is where non-chord tones first enter counterpoint.',
      tryThisQuery: 'G major scale',
      tryThisLabel: 'Imagine a second voice against this line',
    },
  ],
  tasks: [
    {
      id: 'l4u13m2t1',
      instruction: "Classify these intervals for counterpoint: C-E (imperfect consonance, M3), C-G (perfect consonance, P5), C-F (dissonance, P4 in two-voice texture), C-B (dissonance, M7)",
    },
    {
      id: 'l4u13m2t2',
      instruction: "Play 'C major scale' ascending and imagine a second voice a third above (E-F-G-A-B-C-D-E). This parallel-thirds motion is imperfect consonance throughout \u2014 stable and warm, the ideal counterpoint texture",
      query: 'C major scale',
    },
    {
      id: 'l4u13m2t3',
      instruction: "Why are parallel perfect fifths forbidden? Because two voices moving in parallel P5s lose their melodic independence \u2014 they begin to sound like one doubled voice, not two individual lines. Imperfect consonances maintain independence better",
    },
  ],
  prerequisites: ['l4u13m1'],
  comingSoon: true,
};

const l4u13m3: CurriculumModule = {
  id: 'l4u13m3',
  unitId: 'u13',
  levelId: 'l4',
  title: 'Irregular and Asymmetric Meters',
  subtitle: 'Counting in 5, 7, and beyond \u2014 additive and mixed meters',
  objectives: [
    'Count and feel asymmetric meters: 5/4, 5/8, 7/4, 7/8',
    'Understand additive meter groupings (2+3, 3+2, 2+2+3) as the building blocks of irregular rhythm',
    'Recognize mixed meters where the time signature changes from measure to measure',
  ],
  concepts: [
    {
      title: 'Asymmetric Meters',
      explanation:
        'Asymmetric meters have beat counts that do not divide evenly into equal groups. 5/4 or 5/8 groups as either 2+3 or 3+2 \u2014 the grouping determines the rhythmic feel entirely. 7/4 or 7/8 groups as 2+2+3, 2+3+2, or 3+2+2. The unequal grouping creates a lopsided groove that is characteristic of Balkan folk music, progressive rock, and much 20th-century concert music.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'Count 7 scale tones in groups of 2+2+3',
    },
    {
      title: 'Additive Meters',
      explanation:
        'Additive meters are built by combining groups of 2 and 3 beats. 5 = 2+3 or 3+2. 7 = 2+2+3 or 2+3+2 or 3+2+2. 8 = 3+3+2, common in Balkan music and some rock. 11 = 2+2+3+2+2, used by Dave Brubeck and others. The internal grouping pattern is what gives each meter its distinctive character \u2014 the same total number of beats with different groupings creates entirely different rhythmic feels.',
      tryThisQuery: 'G major scale',
      tryThisLabel: 'Count 5 tones in groups of 3+2',
    },
    {
      title: 'Mixed Meters and Cut Time',
      explanation:
        'Mixed meter changes the time signature from measure to measure: one bar of 4/4, the next of 3/4, then 5/4. This creates an unpredictable, shifting rhythmic surface common in film scores and progressive rock. Cut time (alla breve, 2/2) uses two half-note beats per measure \u2014 the same written notes as 4/4 but felt in 2, giving a faster tempo feel with stronger metric drive. Cut time is standard in marches and fast Classical movements.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Tap along in cut time: 2 beats per bar',
    },
  ],
  tasks: [
    {
      id: 'l4u13m3t1',
      instruction: "Tap a 7/8 pattern grouped as 2+2+3: count '1-2, 1-2, 1-2-3' with emphasis on each group's first beat. Then regroup as 3+2+2: '1-2-3, 1-2, 1-2'. The feel changes completely even though the total beats are the same",
    },
    {
      id: 'l4u13m3t2',
      instruction: "Clap a 5/4 pattern: try 2+3 ('1-2, 1-2-3') then 3+2 ('1-2-3, 1-2'). The first feels like a march with an extra stumble; the second feels like a waltz with extra momentum",
    },
    {
      id: 'l4u13m3t3',
      instruction: "Alternate a 4/4 bar with a 3/4 bar and repeat the cycle several times \u2014 this is the simplest mixed meter. Notice how the shifting bar length creates an unpredictable, asymmetric rhythmic feel even from two symmetric meters",
    },
  ],
  prerequisites: ['l4u13m2'],
  comingSoon: true,
};

// ---------------------------------------------------------------------------
// Level 4, Unit 14: Chromatic Embellishment and Analysis
// ---------------------------------------------------------------------------

const l4u14m1: CurriculumModule = {
  id: 'l4u14m1',
  unitId: 'u14',
  levelId: 'l4',
  title: 'Chromatic Embellishment',
  subtitle: 'Adding chromatic color to diatonic harmony without changing the key',
  objectives: [
    'Recognize chromatic passing tones and chromatic neighbor tones',
    'Distinguish chromatic embellishment (decorative) from structural chromaticism (secondary dominants, modulation)',
    'Hear how chromatic motion adds smoothness and color to voice leading',
  ],
  concepts: [
    {
      title: 'Chromatic Passing and Neighbor Tones',
      explanation:
        'A chromatic passing tone fills in a whole step with a non-diatonic note: C-C\u266F-D uses the chromatic C\u266F to connect two diatonic tones smoothly. A chromatic neighbor tone orbits a chord tone using a chromatic half step: E-E\u266D-E creates a tighter orbit than a diatonic neighbor. Both add smoothness and color to otherwise plain diatonic lines. They are especially common in bass lines and inner voices, where the added chromaticism enriches the texture without disrupting the melody.',
      tryThisQuery: 'chromatic scale',
      tryThisLabel: 'Hear all 12 chromatic steps',
    },
    {
      title: 'Embellishment vs. Structural Chromaticism',
      explanation:
        'At this level, chromaticism is decorative \u2014 it adds color to diatonic harmony without changing the key. A chromatic passing tone between scale degrees 4 and 5 is decoration. A V/V chord (secondary dominant) is structural chromaticism that briefly points to a new tonal center. The distinction matters: embellishment ornaments the surface while structure alters the harmonic direction. Structural chromaticism including secondary dominants and modulation comes in Level 5.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'The diatonic framework chromaticism decorates',
    },
  ],
  tasks: [
    {
      id: 'l4u14m1t1',
      instruction: "Type 'chromatic scale' and play through it \u2014 every note is a half step apart. Now play 'C major scale' \u2014 notice the whole steps (C-D, D-E, F-G, G-A, A-B) that chromaticism could fill in",
      query: 'chromatic scale',
    },
    {
      id: 'l4u14m1t2',
      instruction: "Imagine the bass line C-C\u266F-D under a chord change from I to ii in C major. The C\u266F is a chromatic passing tone \u2014 it does not change the key, it simply smooths the whole-step motion from C to D",
    },
    {
      id: 'l4u14m1t3',
      instruction: "Compare 'C major scale' (7 notes per octave) with 'chromatic scale' (12 notes per octave). The 5 additional chromatic notes are the raw material for chromatic embellishment within a diatonic key",
      query: 'C major scale',
    },
  ],
  prerequisites: ['l4u13m3'],
};

const l4u14m2: CurriculumModule = {
  id: 'l4u14m2',
  unitId: 'u14',
  levelId: 'l4',
  title: 'Roman Numeral Analysis Practice',
  subtitle: 'Analyzing real harmonic progressions with full Roman numeral notation',
  objectives: [
    'Analyze chord progressions with complete Roman numeral notation including quality and inversion',
    'Identify cadences, non-chord tones, and inversions in context',
    'Develop fluency in reading chorale-style textures and labeling harmonic function',
  ],
  concepts: [
    {
      title: 'The Analysis Method',
      explanation:
        'Roman numeral analysis follows a systematic process: (1) determine the key from the key signature and cadence patterns, (2) at each harmonic rhythm point, identify the chord \u2014 which notes are sounding, (3) determine root and quality, (4) label with Roman numeral, quality symbol, and inversion figure, (5) identify NCTs as notes that do not belong to the chord, (6) mark cadences at phrase endings. This method transforms intuitive listening into structured understanding.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See all chords available for analysis in C',
    },
    {
      title: 'Reading Chorale Textures',
      explanation:
        'Four-voice chorale texture places soprano and alto on the treble staff (stems up and down respectively), tenor and bass on the bass staff. Start analysis by identifying the bass note \u2014 it determines the inversion. Then identify the remaining chord tones above. Circle any notes that do not fit the chord \u2014 these are non-chord tones. Suspensions and passing tones can make chords look wrong on the surface; always analyze the underlying harmony at the point of resolution.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'A simple chord to practice identifying',
    },
    {
      title: 'Common Analysis Traps',
      explanation:
        'The most common mistake is misidentifying chords in inversion by looking only at the bass note. A chord with E in the bass, G above, and C above is not E minor \u2014 it is C major in first inversion (I6). Another trap: suspensions make the chord look "wrong" at the moment of dissonance. Always analyze through to the resolution to determine the actual harmony. Context determines the best reading when a note could serve as either a chord tone or a non-chord tone.',
      tryThisQuery: 'C/E',
      tryThisLabel: 'C/E is I6, not an E chord',
    },
  ],
  tasks: [
    {
      id: 'l4u14m2t1',
      instruction: "Type 'C/E' \u2014 this is C major in first inversion (I6 in C major). The bass note is E, but the chord is still C major. Practice identifying the root, not just the lowest note",
      query: 'C/E',
    },
    {
      id: 'l4u14m2t2',
      instruction: "Analyze this progression in C major: C-Dm-G-C. In Roman numerals: I-ii-V-I. Function labels: T-PD-D-T. This is the fundamental harmonic sentence in its simplest form",
    },
    {
      id: 'l4u14m2t3',
      instruction: "Add an inversion: C-Dm/F-G7-C becomes I-ii6-V7-I. The ii chord in first inversion puts F in the bass, creating a smooth stepwise bass line: C-F-G-C. Inversions are a tool for controlling bass voice leading",
    },
  ],
  prerequisites: ['l4u14m1'],
  comingSoon: true,
};

const l4u14m3: CurriculumModule = {
  id: 'l4u14m3',
  unitId: 'u14',
  levelId: 'l4',
  title: 'Minor Key Harmony in Detail',
  subtitle: 'How three minor scale forms create a fluid, expanded chord vocabulary',
  objectives: [
    'Understand how the three minor scale forms produce different diatonic chord qualities',
    'Know the practical chord vocabulary of minor keys drawn from all three forms',
    'Recognize the subtonic VII chord in natural minor and the augmented III+ problem in harmonic minor',
  ],
  concepts: [
    {
      title: 'The Minor Key Chord Palette',
      explanation:
        'In practice, minor keys draw chords from all three minor forms: V and vii\u00B0 from harmonic minor (because the leading tone is needed for strong cadences), i, iv, VI, and III from natural minor (using the unaltered 6th and 7th), and II and IV from melodic minor ascending (which raises the 6th degree). This gives minor keys more chord options than major keys, not fewer. The composer chooses which form to use based on voice leading needs and the desired harmonic color.',
      tryThisQuery: 'A natural minor scale',
      tryThisLabel: 'See the natural minor foundation',
    },
    {
      title: 'The Subtonic VII and the Augmented III+',
      explanation:
        'In natural minor, the 7th degree is a whole step below the tonic, producing a major triad VII instead of the diminished vii\u00B0 found in harmonic minor. The VII often moves to III or creates a Mixolydian-flavored cadence common in rock and pop. Building a triad on the 3rd degree of harmonic minor produces an augmented triad (III+) because the raised 7th becomes the 5th of that triad. III+ is harsh and rarely used; composers almost always use the natural-minor III (a plain major triad) instead.',
      tryThisQuery: 'A harmonic minor scale',
      tryThisLabel: 'See the raised 7th that creates V and vii\u00B0',
    },
    {
      title: 'The Fluid Minor System',
      explanation:
        'Unlike major (one scale, one fixed set of diatonic chords), minor is fluid \u2014 the 6th and 7th degrees are variable. This variability is a feature, not a flaw. A minor-key passage might use a natural-minor III-VII cadence in one phrase and a harmonic-minor V-i cadence in the next, drawing freely from the full palette. Understanding this fluidity is essential for analyzing real music, where minor-key harmony rarely stays within a single scale form throughout.',
      tryThisQuery: 'A harmonic minor scale',
      tryThisLabel: 'Compare with natural minor above',
    },
  ],
  tasks: [
    {
      id: 'l4u14m3t1',
      instruction: "Type 'A natural minor scale' then 'A harmonic minor scale' \u2014 the only difference is G vs. G\u266F. That single raised note changes the v chord to V and the VII chord to vii\u00B0, transforming the harmonic possibilities",
      query: 'A natural minor scale',
    },
    {
      id: 'l4u14m3t2',
      instruction: "Play 'Am' then 'E major chord' (V-i with harmonic minor's leading tone G\u266F). Now play 'Am' then 'Em' (v-i with natural minor's G natural). Hear how the major V creates a much stronger resolution to the tonic",
    },
    {
      id: 'l4u14m3t3',
      instruction: "In A minor, the subtonic VII chord is G major (G-B-D). Play 'G major chord' then 'C major chord' (VII-III in A minor). This natural-minor progression is heard constantly in rock and pop music as bVII-bIII",
    },
  ],
  prerequisites: ['l4u14m2'],
};

// ---------------------------------------------------------------------------
// Exported units
// ---------------------------------------------------------------------------

export const L4_UNITS: CurriculumUnit[] = [
  {
    id: 'u12',
    levelId: 'l4',
    title: 'Advanced Seventh Chords and Function',
    description: 'Non-chord tones, dominant seventh mastery, all diatonic seventh chords, and harmonic function theory',
    icon: 'harmony',
    modules: [l4u12m1, l4u12m2, l4u12m3, l4u12m4],
    milestone: {
      skillsSummary: [
        'Identify all non-chord tone types by their approach, departure, and beat position',
        'Resolve V7 in all inversions with correct voice leading and tendency tone treatment',
        'Classify every diatonic chord by harmonic function: Tonic, Pre-Dominant, or Dominant',
      ],
      bridgeText:
        'You now understand how every chord in a key functions and how seventh chords create directed harmonic motion. Next you will explore the larger patterns that organize chords into sequences, the principles of combining melodies in counterpoint, and the rhythmic complexity of asymmetric meters.',
      tryThisQuery: 'G7',
      tryThisLabel: 'Play G7 and resolve to C major',
      tryThisPrompt: 'Can you name the two tendency tones and where each one resolves?',
    },
  },
  {
    id: 'u13',
    levelId: 'l4',
    title: 'Sequences, Counterpoint, and Meter',
    description: 'Harmonic sequences, two-part counterpoint fundamentals, and irregular and asymmetric meters',
    icon: 'scales',
    modules: [l4u13m1, l4u13m2, l4u13m3],
    milestone: {
      skillsSummary: [
        'Recognize descending-fifths, ascending-seconds, and descending-thirds harmonic sequences',
        'Apply consonance and dissonance rules in first and second species counterpoint',
        'Count and feel asymmetric meters including 5/4, 7/8, and mixed meter patterns',
      ],
      bridgeText:
        'You can now hear how chords move in sequential patterns, how independent melodies combine, and how rhythm extends beyond simple meters. The final unit applies all of this knowledge to chromatic embellishment, formal analysis, and the rich harmonic world of minor keys.',
      tryThisQuery: 'Am7',
      tryThisLabel: 'Start a vi7-ii7-V7-I circle progression',
      tryThisPrompt: 'Can you continue the descending-fifths sequence from Am7 through to Cmaj7?',
    },
  },
  {
    id: 'u14',
    levelId: 'l4',
    title: 'Chromatic Embellishment and Analysis',
    description: 'Chromatic passing and neighbor tones, Roman numeral analysis practice, and the complete minor key chord system',
    icon: 'chords',
    modules: [l4u14m1, l4u14m2, l4u14m3],
    milestone: {
      skillsSummary: [
        'Distinguish chromatic embellishment from structural chromaticism',
        'Perform complete Roman numeral analysis including inversions, NCTs, and cadences',
        'Navigate the fluid minor key chord palette drawn from all three minor scale forms',
      ],
      bridgeText: '',
      tryThisQuery: 'A harmonic minor scale',
      tryThisLabel: 'Explore the harmonic minor chord palette',
      tryThisPrompt: 'Which chords come from harmonic minor and which from natural minor?',
    },
  },
];
