import type { CurriculumUnit, CurriculumModule } from '../types/curriculum';

// ---------------------------------------------------------------------------
// Level 6, Unit 18: Chromatic Chords
// ---------------------------------------------------------------------------

const l6u18m1: CurriculumModule = {
  id: 'l6u18m1',
  unitId: 'u18',
  levelId: 'l6',
  title: 'The Neapolitan Chord (bII)',
  subtitle: 'A dramatic chromatic pre-dominant built on the lowered second degree',
  objectives: [
    'Build the Neapolitan chord (major triad on lowered 2nd degree)',
    'Use bII6 as a chromatic pre-dominant chord replacing ii or IV',
    'Apply proper voice leading where b2 resolves downward',
    'Recognize the Neapolitan\u2019s dark, majestic emotional effect',
  ],
  concepts: [
    {
      title: 'What Is the Neapolitan?',
      explanation:
        'The Neapolitan is a major triad built on the lowered second scale degree. In C major or C minor, that chord is Db major (Db-F-Ab). Named after the Neapolitan school of opera, it functions as a dramatic chromatic replacement for the typical pre-dominant chord (ii or IV). It is almost always used in first inversion (bII6), placing the 4th scale degree in the bass for smooth connection to the dominant.',
      tryThisQuery: 'Db major chord',
      tryThisLabel: 'Play Db major \u2014 the Neapolitan in C minor',
    },
    {
      title: 'Why First Inversion (bII6)?',
      explanation:
        'In first inversion, the bass note is the 4th scale degree (F in C minor), which connects smoothly to the dominant via the bass motion 4 \u2192 5 \u2014 the same motion as IV \u2192 V. The chromatic drama lives in the upper voices, where the lowered 2nd degree (Db) resolves downward to the leading tone or tonic. Root position bII is rarer but appears in Romantic music for a more emphatic, surprising effect.',
      tryThisQuery: 'Db/F',
      tryThisLabel: 'Hear Db/F \u2014 Neapolitan in first inversion',
    },
    {
      title: 'Voice Leading and Emotional Effect',
      explanation:
        'The lowered 2nd degree is a strong tendency tone that must resolve downward \u2014 either to the leading tone when moving to V, or directly to the tonic. Never double it. The b6 (fifth of bII) also resolves down to 5. The Neapolitan sounds dark, majestic, and weighty, importing a Phrygian-mode color into the harmony. It is a signature sound of Beethoven, Schubert, and modern film scores.',
      tryThisQuery: 'C minor scale',
      tryThisLabel: 'See C minor \u2014 the Neapolitan\u2019s home context',
    },
  ],
  tasks: [
    {
      id: 'l6u18m1t1',
      instruction:
        "Type 'Db major chord' to hear the Neapolitan chord of C minor. Notice how Db-F-Ab sounds dark and dramatic compared to a standard Dm or F chord in this context",
      query: 'Db major chord',
    },
    {
      id: 'l6u18m1t2',
      instruction:
        "Type 'Db/F' to hear the first inversion Neapolitan. The bass note F connects smoothly to G (dominant). This is the standard bII6 voicing used in classical music",
      query: 'Db/F',
    },
    {
      id: 'l6u18m1t3',
      instruction:
        'Think through the Neapolitan in other minor keys: in A minor, bII is Bb major. In E minor, bII is F major. In D minor, bII is Eb major. In each case, it is a major triad one half step above the tonic',
    },
  ],
  prerequisites: ['l5u17m4'],
};

const l6u18m2: CurriculumModule = {
  id: 'l6u18m2',
  unitId: 'u18',
  levelId: 'l6',
  title: 'Augmented Sixth Chords',
  subtitle: 'Italian, French, and German augmented sixth chords and their resolutions',
  objectives: [
    'Build all three types: Italian (It+6), French (Fr+6), German (Gr+6)',
    'Understand the augmented sixth interval and its outward resolution to an octave on scale degree 5',
    'Resolve each type correctly to V or through a cadential 6/4',
  ],
  concepts: [
    {
      title: 'The Augmented Sixth Interval',
      explanation:
        'All augmented sixth chords contain an augmented sixth interval between the lowered 6th degree in the bass and the raised 4th degree in an upper voice. In C: Ab (b6) up to F# (#4). This interval resolves outward by contrary motion \u2014 Ab moves down to G, F# moves up to G \u2014 producing an octave on scale degree 5, the root of the dominant chord.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See C major \u2014 the context for augmented sixths',
    },
    {
      title: 'Three National Varieties',
      explanation:
        'The Italian sixth (It+6) has three notes: b6, 1, #4 (Ab-C-F# in C) \u2014 the simplest form. The French sixth (Fr+6) adds scale degree 2: Ab-C-D-F#, producing two tritones and a distinctive whole-tone color. The German sixth (Gr+6) adds b3: Ab-C-Eb-F#, which sounds identical to an Ab dominant seventh chord. These chords are not in the app\u2019s standard chord library but understanding their construction is essential.',
      tryThisQuery: 'Ab major chord',
      tryThisLabel: 'Hear Ab major \u2014 the bass note of augmented sixths in C',
    },
    {
      title: 'Resolution and the German Sixth Problem',
      explanation:
        'All three types resolve to V. The Italian and French sixths move directly. The German sixth creates parallel fifths if it resolves directly to V, so composers insert a cadential 6/4 chord first (Gr+6 \u2192 I6/4 \u2192 V). The German sixth\u2019s enharmonic identity as a dominant seventh chord becomes the basis for enharmonic modulation to distant keys.',
      tryThisQuery: 'G major chord',
      tryThisLabel: 'Hear G major \u2014 the V chord these all resolve to in C',
    },
  ],
  tasks: [
    {
      id: 'l6u18m2t1',
      instruction:
        'Spell the Italian sixth in C: Ab-C-F#. Now spell it in G: Eb-G-C#. The pattern is always b6, 1, #4 of the target key. Practice building It+6 in D, A, and Eb',
    },
    {
      id: 'l6u18m2t2',
      instruction:
        'The German sixth in C is Ab-C-Eb-F#. Respell F# as Gb: Ab-C-Eb-Gb = Ab7. Same sound, completely different function. This enharmonic equivalence is exploited in enharmonic modulation',
    },
    {
      id: 'l6u18m2t3',
      instruction:
        "Type 'Ab major chord' and listen. Now imagine adding F# in an upper voice. The interval Ab to F# is the augmented sixth that defines this entire chord family",
      query: 'Ab major chord',
    },
  ],
  prerequisites: ['l6u18m1'],
  comingSoon: true,
};

const l6u18m3: CurriculumModule = {
  id: 'l6u18m3',
  unitId: 'u18',
  levelId: 'l6',
  title: 'Enharmonic Modulation',
  subtitle: 'Pivoting between distant keys via enharmonic reinterpretation of chords',
  objectives: [
    'Modulate between distant keys using enharmonic reinterpretation',
    'Use the German sixth / dominant seventh equivalence as a modulatory pivot',
    'Use the diminished seventh chord\u2019s four-way enharmonic flexibility',
  ],
  concepts: [
    {
      title: 'Enharmonic Reinterpretation',
      explanation:
        'Enharmonic modulation exploits chords that sound identical but can be spelled and resolved differently. By respelling a chord, you pivot between keys that are far apart on the circle of fifths. The two main pivot chords are the German augmented sixth (enharmonic with a dominant seventh) and the fully diminished seventh chord (enharmonic with three other diminished sevenths).',
      tryThisQuery: 'circle of fifths',
      tryThisLabel: 'See how distant the target keys can be',
    },
    {
      title: 'German Sixth Equals Dominant Seventh',
      explanation:
        'The German sixth in C (Ab-C-Eb-F#) is enharmonically identical to Ab7 (Ab-C-Eb-Gb), which is V7 of Db. Approach the chord as Gr+6 resolving in C, then resolve it instead as V7 of Db \u2014 you have modulated from C to Db major in a single chord. The ear accepts both interpretations; the resolution determines which key the listener perceives.',
      tryThisQuery: 'Db major chord',
      tryThisLabel: 'Hear Db major \u2014 the distant arrival key',
    },
    {
      title: 'Diminished Seventh Reinterpretation',
      explanation:
        'A fully diminished seventh chord divides the octave into four equal minor thirds. Any of its four notes can serve as the root, so one diminished seventh chord can function as viio7 in four different keys. B-D-F-Ab can resolve to C, Eb, Gb, or A. This makes the diminished seventh the most versatile enharmonic pivot chord in tonal music.',
      tryThisQuery: 'Bdim7',
      tryThisLabel: 'Hear Bdim7 \u2014 four possible resolutions',
    },
  ],
  tasks: [
    {
      id: 'l6u18m3t1',
      instruction:
        'Spell the German sixth in D: Bb-D-F-G#. Now respell G# as Ab: Bb-D-F-Ab = Bb7 = V7 of Eb. You can pivot from D major to Eb major through a single chord',
    },
    {
      id: 'l6u18m3t2',
      instruction:
        "Type 'Bdim7' \u2014 this chord can resolve to C minor, Eb minor, Gb minor, or A minor. All four resolutions are equally valid. Enharmonic spelling determines the destination key",
      query: 'Bdim7',
    },
    {
      id: 'l6u18m3t3',
      instruction:
        'Map the four resolutions of Bdim7 on the circle of fifths: C, Eb, Gb, A. They are each a minor third apart \u2014 dividing the octave into four equal parts, just like the chord itself',
    },
  ],
  prerequisites: ['l6u18m2'],
  comingSoon: true,
};

// ---------------------------------------------------------------------------
// Level 6, Unit 19: Advanced Chromatic Techniques
// ---------------------------------------------------------------------------

const l6u19m1: CurriculumModule = {
  id: 'l6u19m1',
  unitId: 'u19',
  levelId: 'l6',
  title: 'Extended Chromatic Techniques',
  subtitle: 'Chromatic mediants, altered dominants, and the omnibus progression',
  objectives: [
    'Identify chromatic mediant relationships between chords whose roots are a third apart',
    'Recognize doubly-applied dominants (V/V/V) as chains of dominant resolution',
    'Understand altered dominants (V+, V7b5, V7#5) and their intensified resolution',
  ],
  concepts: [
    {
      title: 'Chromatic Mediants',
      explanation:
        'A chromatic mediant is a chord whose root is a major or minor third away from the current chord, with at least one chromatic alteration between them. From C major, Ab major and E major are chromatic mediants \u2014 each shares one common tone with C but shifts the other notes chromatically. This produces the dramatic, cinematic harmonic shifts heard in film scores and late Romantic music.',
      tryThisQuery: 'Ab major chord',
      tryThisLabel: 'Hear Ab major \u2014 chromatic mediant of C',
    },
    {
      title: 'Doubly-Applied Dominants and Altered Dominants',
      explanation:
        'A doubly-applied dominant (V/V/V) extends the secondary dominant chain one level further. In C: V=G, V/V=D, V/V/V=A. The cascade A7 \u2192 D7 \u2192 G7 \u2192 C creates powerful forward momentum through sequential dominant resolutions. Altered dominants add chromatic tension: V+ raises the fifth (resolving upward to the 3rd of I), while V7b5 lowers it. Both intensify the pull toward resolution.',
      tryThisQuery: 'E major chord',
      tryThisLabel: 'Hear E major \u2014 another chromatic mediant of C',
    },
    {
      title: 'The Omnibus Progression',
      explanation:
        'The omnibus is a chromatic voice-exchange pattern where one voice ascends chromatically while another descends, with the remaining voices holding steady. This creates a slowly evolving harmonic landscape moving through dominant seventh and augmented sixth sonorities. Common in 19th-century music, it produces a sense of harmonic wandering without clear functional direction.',
      tryThisQuery: 'C7#5',
      tryThisLabel: 'Hear C7#5 \u2014 an altered dominant sonority',
    },
  ],
  tasks: [
    {
      id: 'l6u19m1t1',
      instruction:
        "Play 'Ab major chord', then 'C major chord', then 'E major chord' \u2014 hear how each chromatic mediant shares one note with C major but shifts the other two chromatically. The effect is vivid and dramatic",
      query: 'Ab major chord',
    },
    {
      id: 'l6u19m1t2',
      instruction:
        'Think through the V/V/V chain in C: A7 resolves to D7, D7 resolves to G7, G7 resolves to C. Each link is a dominant-to-tonic resolution creating cascading forward momentum',
    },
    {
      id: 'l6u19m1t3',
      instruction:
        "Type 'C7#5' to hear an altered dominant. The raised fifth creates additional chromatic tension that intensifies the resolution to the tonic. Compare it to a plain C7",
      query: 'C7#5',
    },
  ],
  prerequisites: ['l6u18m3'],
};

const l6u19m2: CurriculumModule = {
  id: 'l6u19m2',
  unitId: 'u19',
  levelId: 'l6',
  title: 'Late Romantic Harmonic Techniques',
  subtitle: 'Nonfunctional harmony, chromatic planing, and the dissolution of tonality',
  objectives: [
    'Recognize equal division of the octave (whole-tone, diminished patterns)',
    'Identify nonfunctional chord successions that abandon T-PD-D-T logic',
    'Understand chromatic planing as parallel harmonic motion',
  ],
  concepts: [
    {
      title: 'Equal Division of the Octave',
      explanation:
        'Symmetric patterns that divide the 12 semitones equally create tonal ambiguity because no single note feels like home. Division by 2 yields the whole-tone scale (6 notes, only 2 transpositions possible). Division by 3 yields the diminished seventh chord (4 notes). Division by 4 yields the augmented triad (3 notes). These structures were exploited by Debussy, Ravel, Liszt, and Wagner to blur or dissolve key centers.',
      tryThisQuery: 'whole tone scale',
      tryThisLabel: 'Hear the whole-tone scale \u2014 division by 2',
    },
    {
      title: 'Nonfunctional Chord Successions',
      explanation:
        'In late Romantic music, chord progressions increasingly abandon functional logic (T-PD-D-T). Instead, chords connect through voice-leading proximity (each voice moves minimally), common-tone persistence (a pitch sustains across chord changes), or pure sonority logic (chords chosen for color, not function). This marks the beginning of tonality\u2019s dissolution and the road toward atonality.',
      tryThisQuery: 'C diminished scale',
      tryThisLabel: 'Hear the diminished scale \u2014 symmetric division by 3',
    },
    {
      title: 'Chromatic Planing',
      explanation:
        'Planing moves a chord shape in parallel by step or half step, ignoring key constraints. Every note moves by the same interval. Chromatic planing (all half steps) produces a wash of pure color with no functional direction. Diatonic planing (steps within a key) adjusts interval quality to stay diatonic. Debussy\u2019s hallmark technique, it treats harmony as texture and color rather than function.',
      tryThisQuery: 'whole tone scale',
      tryThisLabel: 'Explore the whole-tone world \u2014 Debussy\u2019s palette',
    },
  ],
  tasks: [
    {
      id: 'l6u19m2t1',
      instruction:
        "Type 'whole tone scale' \u2014 every adjacent interval is a whole step. No half steps, no leading tones, no dominant pull. This is pure tonal ambiguity, the foundation of Debussy\u2019s harmonic language",
      query: 'whole tone scale',
    },
    {
      id: 'l6u19m2t2',
      instruction:
        "Type 'C diminished scale' \u2014 this alternating whole-half pattern creates a symmetric eight-note scale containing four tritones and four minor thirds, dividing the octave into equal parts",
      query: 'C diminished scale',
    },
    {
      id: 'l6u19m2t3',
      instruction:
        'Imagine moving a C major triad up by half step repeatedly: C-Db-D-Eb... Each chord is a parallel transposition. No voice leads functionally \u2014 every note shifts by the same amount. This is chromatic planing in its purest form',
    },
  ],
  prerequisites: ['l6u19m1'],
};

// ---------------------------------------------------------------------------
// Level 6, Unit 20: Advanced Counterpoint and Part Writing
// ---------------------------------------------------------------------------

const l6u20m1: CurriculumModule = {
  id: 'l6u20m1',
  unitId: 'u20',
  levelId: 'l6',
  title: 'Species Counterpoint: Complete',
  subtitle: 'All five species from cantus firmus through florid counterpoint',
  objectives: [
    'Write a cantus firmus following established rules',
    'Master all five species of counterpoint',
    'Understand how species counterpoint builds systematically to free counterpoint',
  ],
  concepts: [
    {
      title: 'Cantus Firmus and First/Second Species',
      explanation:
        'The cantus firmus (CF) is a simple melody of 8\u201312 whole notes, beginning and ending on the tonic, mostly stepwise with one climax point. First species (1:1) places one note against each CF note using only consonances \u2014 begin on P1, P5, or P8, end on P1 or P8 approached by step, favor imperfect consonances (3rds and 6ths), and prohibit parallel perfect intervals. Second species (2:1) adds a note per beat, introducing dissonance on weak beats as passing or neighbor tones.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See the notes available for a CF in C major',
    },
    {
      title: 'Third and Fourth Species',
      explanation:
        'Third species (4:1) places four notes against each CF note, allowing passing tones, neighbors, and the cambiata figure (step to dissonance, leap of a third, step back). Fourth species introduces syncopation \u2014 notes tied across the barline create suspensions that resolve downward by step. Standard dissonant suspensions are 7-6, 4-3, and 9-8. The suspension (preparation-dissonance-resolution) is one of music\u2019s most powerful expressive devices.',
      tryThisQuery: 'G major scale',
      tryThisLabel: 'See G major \u2014 another common CF key',
    },
    {
      title: 'Fifth Species and the Path to Free Counterpoint',
      explanation:
        'Fifth species (florid) combines all previous species freely: whole notes, half notes, quarter notes, and syncopation coexist in a single line. All the rules from earlier species apply to their respective note values. Florid counterpoint is the closest species exercise gets to real musical composition, demonstrating how strict rules produce genuinely musical results and form the bridge to free counterpoint.',
      tryThisQuery: 'D major scale',
      tryThisLabel: 'See D major \u2014 try tracing a cantus firmus',
    },
  ],
  tasks: [
    {
      id: 'l6u20m1t1',
      instruction:
        'Rules for a cantus firmus: begins and ends on tonic, mostly stepwise, one climax approached and left by step, no repeated notes, range within an octave. Try mentally composing one in C major using only C-D-E-F-G-A-B-C',
    },
    {
      id: 'l6u20m1t2',
      instruction:
        'In first species, begin on a perfect unison, fifth, or octave. Use mostly imperfect consonances (3rds and 6ths). Prohibit parallel perfect fifths and octaves. End on a unison or octave approached by step',
    },
    {
      id: 'l6u20m1t3',
      instruction:
        'Fourth species suspensions: 7-6 and 4-3 are the standard dissonant suspensions. The dissonance occurs on the strong beat (the tied note) and resolves down by step on the weak beat. This pattern is the origin of all suspension usage in tonal music',
    },
  ],
  prerequisites: ['l6u19m2'],
  comingSoon: true,
};

const l6u20m2: CurriculumModule = {
  id: 'l6u20m2',
  unitId: 'u20',
  levelId: 'l6',
  title: 'Three-Part and Four-Part Counterpoint',
  subtitle: 'Multi-voice counterpoint and invertible techniques',
  objectives: [
    'Extend species counterpoint to three and four voices',
    'Understand invertible counterpoint at the octave, tenth, and twelfth',
    'Apply triple counterpoint techniques where three melodies work in any vertical arrangement',
  ],
  concepts: [
    {
      title: 'Adding Voices and Invertible Counterpoint at the Octave',
      explanation:
        'When a third voice enters, it must form valid intervals with both existing voices simultaneously, multiplying the constraints. Three-part writing produces complete triads, adding harmonic richness. Invertible counterpoint at the octave means two melodies work correctly with either voice on top. When inverted, 3rds become 6ths (acceptable), but 5ths become 4ths (dissonant above the bass), so invertible counterpoint at the octave avoids 5ths.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Hear a three-note triad \u2014 the simplest 3-voice sonority',
    },
    {
      title: 'Triple Counterpoint and Inversion at Other Intervals',
      explanation:
        'Triple counterpoint requires three melodies that work in all six vertical permutations (ABC, ACB, BAC, BCA, CAB, CBA) \u2014 extraordinarily demanding to write. Inversion at the tenth transforms 3rds into octaves and 6ths into 5ths; inversion at the twelfth transforms 3rds into 10ths and 5ths into octaves. J.S. Bach used inversion at the twelfth extensively in his fugues, demonstrating the pinnacle of contrapuntal craft.',
      tryThisQuery: 'C/E',
      tryThisLabel: 'Hear C/E \u2014 inverting the bass changes the texture',
    },
  ],
  tasks: [
    {
      id: 'l6u20m2t1',
      instruction:
        'In three-part writing, check every pair of voices for parallel fifths and octaves. With voices A, B, and C, you must verify A-B, A-C, and B-C \u2014 three pairs instead of one',
    },
    {
      id: 'l6u20m2t2',
      instruction:
        'For invertible counterpoint at the octave: intervals transform as follows \u2014 unison becomes octave, 2nd becomes 7th, 3rd becomes 6th, 4th becomes 5th, 5th becomes 4th. Since 4ths are dissonant above the bass, 5ths must be avoided in the original',
    },
    {
      id: 'l6u20m2t3',
      instruction:
        'Triple counterpoint has six permutations. If melody A is above B and B is above C in the original, all five other orderings must also produce valid counterpoint. Bach achieved this routinely in his fugues',
    },
  ],
  prerequisites: ['l6u20m1'],
  comingSoon: true,
};

const l6u20m3: CurriculumModule = {
  id: 'l6u20m3',
  unitId: 'u20',
  levelId: 'l6',
  title: 'Advanced Part Writing and Score Reading',
  subtitle: 'SATB harmonization, figured bass realization, and orchestral score reading',
  objectives: [
    'Harmonize soprano and bass melodies in four-part SATB texture',
    'Realize figured bass by filling in upper voices from bass figures',
    'Read and reduce full orchestral scores to essential harmonic content',
  ],
  concepts: [
    {
      title: 'Soprano Harmonization',
      explanation:
        'Given a soprano melody, the task is to choose chords and fill in alto, tenor, and bass. The process: determine the key and locate cadence points, choose a bass line and chord progression that supports the melody functionally, fill in inner voices following voice-leading rules, then check for errors (parallel fifths/octaves, spacing violations, doubling mistakes, voice crossing).',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See C major diatonic chords \u2014 the harmonization palette',
    },
    {
      title: 'Figured Bass Realization',
      explanation:
        'Figured bass notation provides a bass line with numbers indicating intervals above each note. No figures means root position (5/3), 6 means first inversion, 6/4 means second inversion, 7 means a root-position seventh chord. Accidentals modify specific intervals. Realizing figured bass \u2014 filling in the upper three voices in real time \u2014 was the everyday skill of every Baroque keyboardist.',
      tryThisQuery: 'key of G',
      tryThisLabel: 'See G major \u2014 practice figured bass mentally',
    },
    {
      title: 'Orchestral Score Reading',
      explanation:
        'A full orchestral score arranges instruments top to bottom: woodwinds, brass, percussion, strings. Transposing instruments (clarinet in Bb, horn in F) are written at a different pitch than they sound. Reading a score requires mentally transposing these parts to concert pitch, reading C clefs (alto for viola, tenor for cello), and reducing multiple voices to their essential harmonic content.',
      tryThisQuery: 'Bb major scale',
      tryThisLabel: 'See Bb major \u2014 the key a Bb clarinet reads in',
    },
  ],
  tasks: [
    {
      id: 'l6u20m3t1',
      instruction:
        'To harmonize a soprano melody: first identify cadence points (they determine harmonic goals), then work backward from each cadence to fill in the chord progression. Inner voices follow the shortest path between chord tones',
    },
    {
      id: 'l6u20m3t2',
      instruction:
        'Figured bass shorthand: no figures = root position (5/3), 6 = first inversion, 6/4 = second inversion, 7 = root-position seventh, 6/5 = first inversion seventh, 4/3 = second inversion seventh, 4/2 = third inversion seventh',
    },
    {
      id: 'l6u20m3t3',
      instruction:
        'Transposing instruments: a Bb clarinet sounds a whole step lower than written (reads C, audience hears Bb). A horn in F sounds a perfect fifth lower than written. Score readers must transpose mentally to hear actual pitches',
    },
  ],
  prerequisites: ['l6u20m2'],
  comingSoon: true,
};

// ---------------------------------------------------------------------------
// Exported units
// ---------------------------------------------------------------------------

export const L6_UNITS: CurriculumUnit[] = [
  {
    id: 'u18',
    levelId: 'l6',
    title: 'Chromatic Chords',
    description:
      'Neapolitan chord, augmented sixth chords, and enharmonic modulation',
    icon: 'chords',
    modules: [l6u18m1, l6u18m2, l6u18m3],
    milestone: {
      skillsSummary: [
        'Build and resolve the Neapolitan chord (bII6) as a chromatic pre-dominant',
        'Construct Italian, French, and German augmented sixth chords and understand their resolutions',
        'Use enharmonic reinterpretation of Gr+6 and dim7 to modulate between distant keys',
      ],
      bridgeText:
        'You can now deploy the most dramatic chromatic chords in tonal music. Next you\u2019ll explore the broader chromatic landscape \u2014 chromatic mediants, altered dominants, and the techniques that pushed tonality to its limits.',
      tryThisQuery: 'Db major chord',
      tryThisLabel: 'Play the Neapolitan of C',
      tryThisPrompt:
        'Can you spell the Neapolitan chord in three other minor keys before checking?',
    },
  },
  {
    id: 'u19',
    levelId: 'l6',
    title: 'Advanced Chromatic Techniques',
    description:
      'Chromatic mediants, altered dominants, late Romantic harmony, and tonal dissolution',
    icon: 'harmony',
    modules: [l6u19m1, l6u19m2],
    milestone: {
      skillsSummary: [
        'Identify chromatic mediant relationships and altered dominant sonorities',
        'Recognize symmetric scale structures (whole-tone, diminished) and their tonal ambiguity',
        'Understand nonfunctional harmony and chromatic planing as alternatives to functional tonality',
      ],
      bridgeText:
        'You\u2019ve traced chromaticism from individual chords through the dissolution of functional tonality itself. Now you\u2019ll build the contrapuntal skills that underpin all part writing \u2014 from strict species counterpoint to full orchestral score reading.',
      tryThisQuery: 'whole tone scale',
      tryThisLabel: 'Explore the whole-tone scale',
      tryThisPrompt:
        'Play it and notice: no half steps, no leading tones, no sense of key. How does that feel compared to a major scale?',
    },
  },
  {
    id: 'u20',
    levelId: 'l6',
    title: 'Advanced Counterpoint and Part Writing',
    description:
      'Complete species counterpoint, invertible counterpoint, SATB harmonization, and score reading',
    icon: 'scales',
    modules: [l6u20m1, l6u20m2, l6u20m3],
    milestone: {
      skillsSummary: [
        'Apply all five species of counterpoint from cantus firmus through florid writing',
        'Understand invertible and triple counterpoint techniques used by Bach',
        'Harmonize melodies in SATB, realize figured bass, and read orchestral scores',
      ],
      bridgeText:
        'You\u2019ve completed the full arc of chromatic harmony and contrapuntal technique. These skills \u2014 chromatic chords, enharmonic modulation, species counterpoint, and part writing \u2014 form the toolkit of advanced tonal composition and analysis.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See C major \u2014 compose a cantus firmus',
      tryThisPrompt:
        'Try writing an 8-note cantus firmus in C major: start on C, end on C, mostly stepwise, one high point. Can you follow all the rules?',
    },
  },
];
