import type { CurriculumUnit, CurriculumModule } from '../types/curriculum';

// ---------------------------------------------------------------------------
// Level 8, Unit 24: Fugue and Imitative Forms
// ---------------------------------------------------------------------------

const l8u24m1: CurriculumModule = {
  id: 'l8u24m1',
  unitId: 'u24',
  levelId: 'l8',
  title: 'Fugue and Imitative Counterpoint',
  subtitle: 'Fugue structure: exposition, episodes, stretto, and devices',
  objectives: [
    'Analyze fugue structure (exposition, episodes, entries, stretto, coda)',
    'Distinguish subject from answer (real vs. tonal)',
    'Identify countersubjects, stretto, and augmentation/diminution',
  ],
  concepts: [
    {
      title: 'Fugue Structure: Exposition Through Coda',
      explanation:
        'A fugue is a contrapuntal composition built from a single melodic idea (the subject). The exposition introduces each voice in turn: the first voice states the subject in the tonic, the second enters with the answer at the dominant while the first continues with a countersubject, and subsequent voices follow the same pattern. After the exposition, episodes — transitional passages built from motivic fragments, often in sequence — modulate to new keys for middle entries of the subject. The final section returns the subject to the tonic, frequently intensified by stretto (overlapping entries), and may conclude with a coda.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See the tonic key a fugue subject would inhabit',
    },
    {
      title: 'Subject, Answer, and Countersubject',
      explanation:
        'The subject is the fugue\'s main theme, stated first in the tonic. A real answer transposes the subject exactly to the dominant. A tonal answer modifies the opening interval to preserve tonal coherence — typically converting an initial tonic-to-dominant leap into a dominant-to-tonic response (a 5th becomes a 4th). The countersubject is a secondary melodic line written in invertible counterpoint so it functions correctly whether placed above or below the subject. A well-crafted countersubject complements the subject in rhythm, contour, and intervallic content.',
      tryThisQuery: 'key of G',
      tryThisLabel: 'See the dominant key where the answer enters',
    },
    {
      title: 'Stretto and Compositional Devices',
      explanation:
        'Stretto occurs when a new entry of the subject begins before the previous one has finished, creating overlapping statements that generate contrapuntal density and climactic intensity. The tighter the stretto interval, the more technically impressive the passage. Augmentation presents the subject in longer note values (effectively halving the tempo of the theme), while diminution uses shorter values (doubling the speed). Melodic inversion reverses all intervals — ascending becomes descending — and retrograde presents the subject backwards. Double and triple fugues combine two or three subjects, either introducing them simultaneously or presenting each in its own exposition before combining them in a culminating section.',
      tryThisQuery: 'Bdim',
      tryThisLabel: 'Hear the diminished chord — tension fugues build toward',
    },
  ],
  tasks: [
    {
      id: 'l8u24m1t1',
      instruction:
        'Listen to a Bach fugue (e.g., WTC Book I, C minor). Map the exposition: identify each voice\'s entry and whether the answer is real or tonal. How many voices are in the fugue?',
    },
    {
      id: 'l8u24m1t2',
      instruction:
        'In the same fugue, locate the first episode after the exposition. What motivic material does it use — fragments of the subject, the countersubject, or both? Does it modulate, and if so, to what key?',
    },
    {
      id: 'l8u24m1t3',
      instruction:
        'Find any stretto passages near the end of the fugue. How closely do the entries overlap? Does the fugue also use augmentation, diminution, or inversion of the subject?',
    },
  ],
  prerequisites: ['l7u23m2'],
  comingSoon: true,
};

const l8u24m2: CurriculumModule = {
  id: 'l8u24m2',
  unitId: 'u24',
  levelId: 'l8',
  title: 'Canon and Other Imitative Forms',
  subtitle: 'Canons at various intervals and special types',
  objectives: [
    'Understand canon at various intervals (unison, octave, 5th, 4th, etc.)',
    'Recognize special canon types (inversion, retrograde, augmentation/diminution)',
    'Know the difference between strict canon and free imitation',
  ],
  concepts: [
    {
      title: 'Strict Canon and Canonic Intervals',
      explanation:
        'In a strict canon, a leader voice (dux) presents a melody and a follower (comes) replicates it exactly after a fixed time delay, transposed by some interval. Canon at the unison repeats at the same pitch; canon at the octave shifts by an octave; canon at the fifth transposes up a perfect fifth. The compositional challenge is profound: the leader must generate a melody that produces valid counterpoint against a time-delayed copy of itself. The further the canonic interval from the unison, the more constrained the melodic possibilities become.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See the scale — the melodic raw material of a canon',
    },
    {
      title: 'Special Canon Types and the Round',
      explanation:
        'Mirror canon (canon by inversion) reverses all intervals in the follower — ascending motion in the dux becomes descending in the comes. Crab canon (retrograde) plays the follower\'s melody backwards. Augmentation canon doubles note values in the follower; diminution halves them. These can be combined — retrograde inversion, for instance. The round is the simplest canon: a perpetual canon at the unison where voices enter at regular intervals and the melody loops indefinitely. The ricercar, a predecessor to the fugue, uses imitative counterpoint more freely, without the fugue\'s formal exposition-episode structure.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See C major — the simplest key for canonic writing',
    },
    {
      title: 'Free Imitation vs. Strict Canon',
      explanation:
        'Strict canon maintains exact intervallic replication throughout; free imitation uses the subject as a starting point but allows departure when strict following would produce poor counterpoint or dissonance. Most Renaissance and Baroque polyphony uses free imitation — passages begin with canonic entries (called "points of imitation") but quickly diverge into independent counterpoint. Understanding the spectrum from strict canon to free imitation illuminates virtually all polyphonic music from Josquin through Bach.',
      tryThisQuery: 'A natural minor scale',
      tryThisLabel: 'Hear minor — common in Renaissance imitative writing',
    },
  ],
  tasks: [
    {
      id: 'l8u24m2t1',
      instruction:
        'Take a simple 4-bar melody you know. Sing or play it, then imagine it entering again one bar later at the same pitch. Where would dissonances occur? This reveals why canonic writing is so constrained.',
    },
    {
      id: 'l8u24m2t2',
      instruction:
        'Listen to the canon from Bach\'s Goldberg Variations (every third variation is a canon). Compare Canon at the Unison (Var. 3), Canon at the Second (Var. 6), and Canon at the Third (Var. 9). How does the canonic interval affect the character?',
    },
    {
      id: 'l8u24m2t3',
      instruction:
        'Write the first 4 notes of a melody, then write them in retrograde (backwards) and in inversion (reverse each interval\'s direction). Could any of these serve as a canon against the original?',
    },
  ],
  prerequisites: ['l8u24m1'],
  comingSoon: true,
};

// ---------------------------------------------------------------------------
// Level 8, Unit 25: Large Form and Orchestration
// ---------------------------------------------------------------------------

const l8u25m1: CurriculumModule = {
  id: 'l8u25m1',
  unitId: 'u25',
  levelId: 'l8',
  title: 'Large Form Analysis',
  subtitle: 'Sonata form in depth, concerto form, and variation forms',
  objectives: [
    'Analyze sonata form in depth (with all sub-sections)',
    'Understand concerto form (double exposition)',
    'Analyze variation forms (theme and variations, chaconne, passacaglia)',
  ],
  concepts: [
    {
      title: 'Sonata Form: Full Sectional Analysis',
      explanation:
        'The exposition contains a first theme group (FTG) in the tonic, a modulatory transition (TR) leading to a medial caesura, a second theme group (STG) in the secondary key (typically V in major, III in minor), and closing material (CT) reinforcing the new key. The development fragments themes into motives, deploys them in sequences across remote keys, may stage a false recapitulation, and builds a retransition on the dominant to prepare the return. The recapitulation restates all material in the tonic — critically, the STG now resolves the exposition\'s tonal tension. Beethoven\'s codas often function as second developments, substantially extending the form.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See the tonic key — home base of sonata form',
    },
    {
      title: 'Concerto Form and Variation Structures',
      explanation:
        'Concerto form adapts sonata principles with a double exposition: the orchestral exposition presents both themes in the tonic, then the soloist\'s exposition restates the first theme in tonic and the second in the dominant, following standard sonata tonal logic. A cadenza — the soloist\'s unaccompanied virtuosic passage — typically precedes the final coda. Variation forms include the sectional theme and variations (each variation is self-contained), the chaconne (continuous variations over a repeating harmonic pattern), and the passacaglia (continuous variations over a repeating bass line). The distinction between chaconne and passacaglia is historically blurred, but the ground bass is the passacaglia\'s defining feature.',
      tryThisQuery: 'G7',
      tryThisLabel: 'Hear the dominant seventh — the chord that drives recapitulation',
    },
    {
      title: 'Rondo, Sonata-Rondo, and Ritornello',
      explanation:
        'Rondo form features a recurring refrain (A) alternating with contrasting episodes: five-part rondo (A-B-A-C-A), seven-part (A-B-A-C-A-B-A or A-B-A-C-A-D-A). Sonata-rondo hybridizes the two — A-B-A-development-A-B-A — combining rondo\'s structural clarity with sonata\'s developmental ambition. Baroque ritornello form alternates a recurring orchestral passage (the ritornello) with solo episodes; the ritornello returns in different keys, creating a tonal journey conceptually similar to rondo but more fluid. Recognizing these formal archetypes transforms passive listening into active structural comprehension.',
      tryThisQuery: 'circle of fifths',
      tryThisLabel: 'See the key relationships that large forms traverse',
    },
  ],
  tasks: [
    {
      id: 'l8u25m1t1',
      instruction:
        'Choose a Classical-era sonata movement (e.g., Mozart K.545, first movement). Create a formal timeline: label the FTG, TR, medial caesura, STG, CT, development, and recapitulation. At what measure does the STG appear in the tonic?',
    },
    {
      id: 'l8u25m1t2',
      instruction:
        'Compare a chaconne (e.g., Bach\'s Chaconne in D minor for solo violin) with a theme-and-variations (e.g., Beethoven\'s "Diabelli" Variations). How does the continuous vs. sectional structure change the listening experience?',
    },
    {
      id: 'l8u25m1t3',
      instruction:
        'Listen to a sonata-rondo finale (e.g., Beethoven\'s "Pathetique" Sonata, third movement). Identify each return of the refrain (A) and label the episodes. Where does the "development" section occur within the rondo structure?',
    },
  ],
  prerequisites: ['l8u24m2'],
  comingSoon: true,
};

const l8u25m2: CurriculumModule = {
  id: 'l8u25m2',
  unitId: 'u25',
  levelId: 'l8',
  title: 'Orchestration and Instrumentation Awareness',
  subtitle: 'Orchestral families, ranges, timbres, and transposition',
  objectives: [
    'Know the four orchestral families and their characteristics',
    'Identify instrument ranges and timbres',
    'Understand transposing instruments in orchestral context',
  ],
  concepts: [
    {
      title: 'The Four Orchestral Families',
      explanation:
        'Strings (violin, viola, cello, double bass) form the orchestra\'s backbone — they sustain, articulate, and span the widest dynamic range through techniques like pizzicato, tremolo, harmonics, and col legno. Woodwinds (flute, oboe, clarinet, bassoon and their auxiliaries) contribute distinct timbral colors and excel in melodic writing. Brass (horn, trumpet, trombone, tuba) deliver power and brilliance, dominating climaxes. Percussion divides into pitched (timpani, xylophone, glockenspiel, vibraphone, marimba, celesta) and unpitched (snare drum, bass drum, cymbals, triangle), providing rhythmic definition, color, and structural punctuation.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See the range — strings span nearly this entire keyboard',
    },
    {
      title: 'Transposing Instruments and Score Reading',
      explanation:
        'A transposing instrument\'s written C sounds as a different pitch. Clarinet in Bb sounds a major second lower than written; horn in F sounds a perfect fifth lower; trumpet in Bb sounds a major second lower. To read a transposing score at concert pitch, reverse the transposition: for a Bb clarinet, transpose the written part down a major second (or read it a second lower). Standard orchestral score order from top to bottom: flutes, oboes, clarinets, bassoons, horns, trumpets, trombones, tuba, timpani, percussion, harp, violins I & II, violas, cellos, double basses.',
      tryThisQuery: 'key of Bb',
      tryThisLabel: 'See Bb — the concert pitch when a Bb clarinet reads C',
    },
    {
      title: 'Orchestral Texture and Doubling',
      explanation:
        'Orchestration is the art of distributing musical ideas across the ensemble for maximum effect. Octave doubling (e.g., flute and violin an octave apart) thickens a melody without changing its character. Unison doubling (e.g., oboe and violin at the same pitch) blends timbres to create a composite color unavailable from either instrument alone. Choir scoring assigns a complete chord to one family (a brass chorale or woodwind choir). The choice of which instrument carries the melody, which provides harmonic fill, and which supplies rhythmic energy defines the character of every orchestral passage.',
      tryThisQuery: 'key of F',
      tryThisLabel: 'See F major — the sounding key of a horn reading in C',
    },
  ],
  tasks: [
    {
      id: 'l8u25m2t1',
      instruction:
        'Examine an orchestral score page (e.g., Beethoven Symphony No. 5, first page). Identify the score order — which instruments are at the top, which at the bottom? Which instruments are transposing?',
    },
    {
      id: 'l8u25m2t2',
      instruction:
        'A clarinet in Bb plays a written D. What pitch sounds at concert? (Answer: C — a major 2nd lower.) Now: a horn in F plays a written G. What concert pitch sounds? (Answer: C — a perfect 5th lower.)',
    },
    {
      id: 'l8u25m2t3',
      instruction:
        'Listen to the opening of Ravel\'s "Bolero." Each repetition of the theme uses a different instrument or combination. List the timbral changes across the first five statements. How does Ravel use doubling to build intensity?',
    },
  ],
  prerequisites: ['l8u25m1'],
  comingSoon: true,
};

// ---------------------------------------------------------------------------
// Level 8, Unit 26: Post-Tonal and Contemporary
// ---------------------------------------------------------------------------

const l8u26m1: CurriculumModule = {
  id: 'l8u26m1',
  unitId: 'u26',
  levelId: 'l8',
  title: 'Post-Tonal Theory Introduction',
  subtitle: 'Pitch-class set theory, interval vectors, and twelve-tone rows',
  objectives: [
    'Understand pitch class and the integer notation system (0-11)',
    'Calculate interval class vectors',
    'Find prime form and normal order of pitch-class sets',
  ],
  concepts: [
    {
      title: 'Pitch Class, Integer Notation, and Interval Class',
      explanation:
        'Post-tonal theory collapses all octave-equivalent pitches into 12 pitch classes numbered 0 through 11 (C=0, C#/Db=1, D=2, ... B=11). Enharmonic spellings become irrelevant — F# and Gb are both pitch class 6. Interval class (IC) measures the shortest distance between two pitch classes on the mod-12 clock: the interval between PC 0 and PC 4 is IC 4 (not 8, because we take the smaller complement). IC values range from 1 to 6, since any interval larger than 6 semitones has a smaller complement. This stripping away of octave, spelling, and directional distinctions reveals the abstract intervallic skeleton of any sonority.',
      tryThisQuery: 'C chromatic scale',
      tryThisLabel: 'See all 12 pitch classes laid out chromatically',
    },
    {
      title: 'Pitch-Class Sets: Normal Order and Prime Form',
      explanation:
        'A pitch-class set is an unordered collection of distinct pitch classes — the post-tonal equivalent of a chord. Normal order is the most compact ascending arrangement: rotate the set until the span from first to last element is smallest (using left-packing to break ties). Prime form transposes the normal order to start on 0, then compares with the inversion to select whichever is more tightly packed to the left. Prime form is the canonical label: {C, E, G} and {D, F, A} both reduce to prime form [0, 3, 7]. Allen Forte\'s catalog assigns each prime form a number — 3-11 for [0, 3, 7] — creating a universal classification system for post-tonal sonorities.',
      tryThisQuery: 'Cm',
      tryThisLabel: 'See C minor — Forte set 3-11, prime form [0,3,7]',
    },
    {
      title: 'Interval Vector and Twelve-Tone Technique',
      explanation:
        'The interval class vector (ICV) is a six-digit fingerprint counting every IC present in a set. For [0, 4, 7] (major triad), the ICV is <0,0,1,1,1,0>: one IC3, one IC4, one IC5. Two sets with identical ICVs are Z-related — different structure, same interval content. In twelve-tone (serial) composition, all 12 pitch classes are ordered into a row. Four transformations — Prime (P), Retrograde (R), Inversion (I), Retrograde-Inversion (RI) — each transposable to 12 starting points, yield 48 row forms displayed in a 12x12 matrix. Combinatoriality ensures that combining specific row forms produces aggregate completion (all 12 PCs) across hexachords.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'See the major triad — ICV <0,0,1,1,1,0>',
    },
  ],
  tasks: [
    {
      id: 'l8u26m1t1',
      instruction:
        'Convert the following notes to pitch-class integers: E, Bb, F#, C. (Answers: 4, 10, 6, 0.) Now find the interval class between each adjacent pair. What is the IC between 4 and 10? (Answer: 6 — the tritone.)',
    },
    {
      id: 'l8u26m1t2',
      instruction:
        'Take the set {C, Db, E} = {0, 1, 4}. Find the normal order by trying all rotations: [0,1,4] (span 4), [1,4,0]=[1,4,12] (span 11), [4,0,1]=[4,12,13] (span 9). Normal order is [0,1,4]. Is this also the prime form? Compare with the inversion: [0,11,8] normalized to [0,3,4] — which is more left-packed?',
    },
    {
      id: 'l8u26m1t3',
      instruction:
        'Compute the interval class vector for set [0, 1, 4]: pairs are (0,1)=IC1, (0,4)=IC4, (1,4)=IC3. ICV = <1,0,1,1,0,0>. Now do the same for [0, 3, 4]. Are they the same? What does this tell you about the two sets?',
    },
  ],
  prerequisites: ['l8u25m2'],
  comingSoon: true,
};

const l8u26m2: CurriculumModule = {
  id: 'l8u26m2',
  unitId: 'u26',
  levelId: 'l8',
  title: 'Twentieth-Century and Contemporary Techniques',
  subtitle: 'Quartal harmony, planing, polytonality, and minimalism',
  objectives: [
    'Identify quartal/quintal harmony, planing, polytonality',
    'Understand pandiatonicism and extended techniques',
    'Recognize minimalist patterns and metric modulation',
  ],
  concepts: [
    {
      title: 'Quartal/Quintal Harmony and Planing',
      explanation:
        'Quartal harmony builds chords from stacked perfect fourths rather than thirds, producing sonorities that are neither major nor minor — open, ambiguous, and characteristic of Hindemith, Bartok, and Copland. Quintal harmony uses stacked fifths (inversionally equivalent to fourths). Planing moves an entire chord structure in parallel: chromatic planing transposes every note by the same number of semitones (preserving exact chord quality), while diatonic planing moves within a scale (changing quality to fit the key). Debussy\'s parallel ninth chords and Ravel\'s parallel triads exemplify planing as a structural harmonic technique, not merely a coloristic device.',
      tryThisQuery: 'whole tone scale',
      tryThisLabel: 'Hear the whole tone scale — pure quartal/symmetric territory',
    },
    {
      title: 'Polytonality, Polymodality, and Pandiatonicism',
      explanation:
        'Polytonality layers two or more keys simultaneously — Milhaud\'s bitonality might place C major in the right hand against F# major in the left, creating a dense, shimmering sonority that is neither tonal nor atonal. Polymodality superimposes different modes on the same tonic: C Lydian in the melody with C Mixolydian in the accompaniment produces all seven diatonic pitches but with conflicting modal inflections across voices. Pandiatonicism uses all notes of a diatonic scale freely, discarding functional harmonic rules — any combination is valid, producing music that sounds tonal but resists resolution. Stravinsky\'s neoclassical works epitomize this technique.',
      tryThisQuery: 'C augmented chord',
      tryThisLabel: 'Hear C augmented — the whole-tone triad, no tonal center',
    },
    {
      title: 'Minimalism, Aleatory, and Extended Techniques',
      explanation:
        'Minimalism employs repetitive structures that evolve gradually: Steve Reich\'s phase shifting starts two identical patterns in sync, then nudges one slightly ahead until they realign; Philip Glass\'s additive process expands patterns by adding notes incrementally. Aleatory (chance music) introduces indeterminacy — Cage used I Ching operations to determine pitches; Lutoslawski gave performers controlled choices within defined boundaries. Extended techniques transform instruments beyond their conventional sound: prepared piano (objects between strings), multiphonics (multiple simultaneous pitches on wind instruments), and sprechstimme (half-sung, half-spoken vocal delivery). These techniques redefined what constitutes musical material itself.',
      tryThisQuery: 'C diminished scale',
      tryThisLabel: 'Hear the octatonic scale — Bartok and Stravinsky\'s resource',
    },
  ],
  tasks: [
    {
      id: 'l8u26m2t1',
      instruction:
        'Build a quartal chord on C: stack fourths (C-F-Bb-Eb). Compare its sound to a C major triad. The quartal chord has no clear major or minor quality — describe its character in your own words.',
    },
    {
      id: 'l8u26m2t2',
      instruction:
        'Play a C whole tone scale, then a C diminished (octatonic) scale. Both are symmetric — the whole tone divides the octave into 6 equal steps, the octatonic alternates whole and half steps. Neither has a dominant or leading tone. How does this affect the sense of tonal gravity?',
    },
    {
      id: 'l8u26m2t3',
      instruction:
        'Imagine playing a C major triad in the right hand and an F# major triad in the left hand simultaneously. List all six pitch classes that would sound. Is there any overlap? What is the total number of distinct pitch classes? (This is Petrushka\'s famous bitonal chord.)',
    },
  ],
  prerequisites: ['l8u26m1'],
};

const l8u26m3: CurriculumModule = {
  id: 'l8u26m3',
  unitId: 'u26',
  levelId: 'l8',
  title: 'Advanced Rhythm and Meter',
  subtitle: 'Complex tuplets, cross-rhythms, polyrhythm, and metric modulation',
  objectives: [
    'Execute and hear complex tuplets and cross-rhythms',
    'Understand polyrhythm vs. polymeter',
    'Recognize hemiola and metric modulation',
  ],
  concepts: [
    {
      title: 'Complex Tuplets and Cross-Rhythms',
      explanation:
        'Beyond simple triplets, complex tuplets subdivide beats into quintuplets (5 in the space of 4), septuplets (7:4 or 7:6), and nested tuplets (triplets within triplets, yielding 9 subdivisions). Cross-rhythms layer different groupings simultaneously: 3-against-2 (three even notes in one voice against two in another), 4-against-3, or 5-against-4. The key perceptual insight is that cross-rhythms create rhythmic dissonance analogous to harmonic dissonance — the conflicting pulse streams generate tension that resolves when they realign on a shared downbeat. This principle underlies much of Chopin\'s rubato, Brahms\'s rhythmic complexity, and virtually all sub-Saharan African drumming.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'Play the scale — try grouping notes in 3s then 2s',
    },
    {
      title: 'Polyrhythm vs. Polymeter and Hemiola',
      explanation:
        'Polyrhythm and polymeter are often confused but structurally distinct. Polyrhythm layers different rhythmic groupings within a shared meter — the downbeats still align (3-against-2 within a single bar of 6/8). Polymeter layers different meters simultaneously — one voice in 3/4 against another in 4/4 — so downbeats diverge and realign only at the lowest common multiple (every 12 beats). Hemiola is a specific and historically ubiquitous cross-rhythm: two bars of triple meter (3+3) reinterpreted as three groups of duple (2+2+2), or vice versa in compound time. Hemiola pervades Handel, Brahms, and Latin American music, creating a momentary metric ambiguity that energizes cadential and transitional passages.',
      tryThisQuery: 'A harmonic minor scale',
      tryThisLabel: 'Play in groups of 2, then 3 — feel the cross-rhythm',
    },
    {
      title: 'Metric Modulation and Additive Rhythm',
      explanation:
        'Metric modulation (Elliott Carter\'s signature technique) uses a shared rhythmic value to pivot between tempos with mathematical precision. If triplet eighth notes in the old tempo become regular eighth notes in the new tempo, the new tempo is exactly 3/2 of the old. Quintuplet-based modulations yield 5:4 ratios; the technique chains to traverse multiple tempos. Additive rhythms build patterns from unequal groupings — 2+2+3, 3+2+2+3 — producing asymmetric meters central to Balkan music (aksak), Bartok, Stravinsky, and progressive rock. Irrational time signatures (e.g., 4/3, 5/6) extend this logic further, specifying tempo relationships rather than traditional beat divisions.',
      tryThisQuery: 'D dorian scale',
      tryThisLabel: 'Play the Dorian mode — try accenting every 5th note',
    },
  ],
  tasks: [
    {
      id: 'l8u26m3t1',
      instruction:
        'Clap a steady pulse of 4 beats. Now try fitting 3 evenly-spaced claps into the same span with your other hand. Where do the hands coincide? (Only on beat 1.) This is the fundamental 3-against-2 cross-rhythm — the basis of all polyrhythmic complexity.',
    },
    {
      id: 'l8u26m3t2',
      instruction:
        'Take a passage in 3/4 time and count 6 beats across two bars (1-2-3-1-2-3). Now regroup those same 6 beats as 2+2+2. The melody that was in triple meter is now perceived in duple — you have created a hemiola. Where does this appear in music you know?',
    },
    {
      id: 'l8u26m3t3',
      instruction:
        'Calculate a metric modulation: if the current tempo is quarter note = 120 BPM and triplet eighth notes become the new eighth note, what is the new tempo? (The triplet eighth = 1/3 of a quarter = 360 per minute. As the new eighth, two of them = one new quarter, so the new quarter = 180 BPM. Ratio: 3:2.)',
    },
  ],
  prerequisites: ['l8u26m2'],
  comingSoon: true,
};

// ---------------------------------------------------------------------------
// Exported units
// ---------------------------------------------------------------------------

export const L8_UNITS: CurriculumUnit[] = [
  {
    id: 'u24',
    levelId: 'l8',
    title: 'Fugue and Imitative Forms',
    description: 'Fugue analysis, canon types, and imitative compositional techniques',
    icon: 'harmony',
    modules: [l8u24m1, l8u24m2],
    milestone: {
      skillsSummary: [
        'Analyze fugue structure: exposition, episodes, middle entries, stretto, and coda',
        'Distinguish real from tonal answers and identify countersubjects',
        'Classify canons by interval, transformation type, and degree of strictness',
      ],
      bridgeText:
        'You can now dissect the most sophisticated contrapuntal forms in Western music. Next: large-scale formal analysis and the orchestral palette.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See C major — the key of Bach\'s first WTC fugue',
      tryThisPrompt: 'How many voices does the C major fugue from WTC Book I use?',
    },
  },
  {
    id: 'u25',
    levelId: 'l8',
    title: 'Large Form and Orchestration',
    description: 'Advanced formal analysis, orchestral families, and instrumentation',
    icon: 'scales',
    modules: [l8u25m1, l8u25m2],
    milestone: {
      skillsSummary: [
        'Analyze sonata form in full detail: FTG, TR, STG, CT, development, and recapitulation',
        'Distinguish variation structures: theme-and-variations, chaconne, passacaglia, rondo, and sonata-rondo',
        'Identify orchestral families, instrument ranges, and transposing instruments',
      ],
      bridgeText:
        'You now command the analytical vocabulary for the largest forms and the full orchestra. The final unit crosses the boundary from tonal to post-tonal music.',
      tryThisQuery: 'G7',
      tryThisLabel: 'Hear G7 — the dominant that launches a recapitulation',
      tryThisPrompt: 'In a sonata in C major, what key does the STG typically appear in during the exposition?',
    },
  },
  {
    id: 'u26',
    levelId: 'l8',
    title: 'Post-Tonal and Contemporary',
    description: 'Set theory, twelve-tone technique, and twentieth-century compositional methods',
    icon: 'chords',
    modules: [l8u26m1, l8u26m2, l8u26m3],
    milestone: {
      skillsSummary: [
        'Analyze pitch-class sets using integer notation, normal order, prime form, and interval vectors',
        'Identify quartal harmony, planing, polytonality, pandiatonicism, and minimalist processes',
        'Distinguish polyrhythm from polymeter, recognize hemiola, and calculate metric modulations',
      ],
      bridgeText: '',
      tryThisQuery: 'C whole tone scale',
      tryThisLabel: 'Hear the whole tone scale — beyond tonality',
      tryThisPrompt: 'How many transpositions of the whole tone scale exist? (Answer: only 2.)',
    },
  },
];
