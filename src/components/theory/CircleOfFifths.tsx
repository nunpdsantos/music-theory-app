import { useMemo, useState, useCallback } from 'react';
import { noteToString, type Note, type ScaleType } from '../../core/types/music.ts';
import { getPitchClass } from '../../core/constants/notes.ts';
import { useAppStore } from '../../state/store.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';
import { resumeAudio, playChordVoiced, SYNTH_PRESETS } from '../../core/services/audio.ts';

// Circle of fifths order (clockwise from top = C)
const CIRCLE_MAJOR: Note[] = [
  { natural: 'C', accidental: '' },
  { natural: 'G', accidental: '' },
  { natural: 'D', accidental: '' },
  { natural: 'A', accidental: '' },
  { natural: 'E', accidental: '' },
  { natural: 'B', accidental: '' },
  { natural: 'G', accidental: 'b' },
  { natural: 'D', accidental: 'b' },
  { natural: 'A', accidental: 'b' },
  { natural: 'E', accidental: 'b' },
  { natural: 'B', accidental: 'b' },
  { natural: 'F', accidental: '' },
];

const CIRCLE_MINOR: Note[] = [
  { natural: 'A', accidental: '' },
  { natural: 'E', accidental: '' },
  { natural: 'B', accidental: '' },
  { natural: 'F', accidental: '#' },
  { natural: 'C', accidental: '#' },
  { natural: 'G', accidental: '#' },
  { natural: 'E', accidental: 'b' },
  { natural: 'B', accidental: 'b' },
  { natural: 'F', accidental: '' },
  { natural: 'C', accidental: '' },
  { natural: 'G', accidental: '' },
  { natural: 'D', accidental: '' },
];

const KEY_SIGNATURES = ['', '1\u266F', '2\u266F', '3\u266F', '4\u266F', '5\u266F', '6\u266F/6\u266D', '5\u266D', '4\u266D', '3\u266D', '2\u266D', '1\u266D'];

const MINOR_SCALES: ScaleType[] = ['natural_minor', 'harmonic_minor', 'melodic_minor'];
const MINOR_SCALE_LABELS: Record<string, string> = {
  natural_minor: 'Natural',
  harmonic_minor: 'Harmonic',
  melodic_minor: 'Melodic',
};

const ROMAN_NUMERALS: Record<number, string> = {
  1: 'I', 2: 'ii', 3: 'iii', 4: 'IV', 5: 'V', 6: 'vi', 7: 'vii\u00B0',
};

const SIZE = 300;
const CENTER = SIZE / 2;
const MAJOR_INNER = 84;
const MAJOR_OUTER = 120;
const MINOR_INNER = 50;
const MINOR_OUTER = 80;
const KEYSIG_R = 132;
const SEG_GAP = 1.2;

// Tonic accent color used for proximity gradient
const TONIC_HUE = '#60A5FA';

// Distance-based fills for major ring (0 = selected, handled with glow)
const DIST_FILL_MAJOR = [
  TONIC_HUE,        // 0 — selected
  TONIC_HUE + '38', // 1 — nearest neighbor (share 6/7 notes)
  TONIC_HUE + '24', // 2 — share 5/7
  TONIC_HUE + '16', // 3 — share 4/7
  TONIC_HUE + '0c', // 4 — share 3/7
  'var(--card)',     // 5 — distant
  'var(--bg-raised)',// 6 — tritone
];
const DIST_STROKE_MAJOR = [
  '#fff',
  TONIC_HUE + '50',
  TONIC_HUE + '35',
  TONIC_HUE + '22',
  'var(--border)',
  'var(--border-subtle)',
  'var(--border-subtle)',
];
const DIST_TEXT_MAJOR = [
  '#000', '#e4e4e7', '#c4c4ca', 'var(--text-muted)', 'var(--text-dim)', 'var(--border-light)', 'var(--border)',
];

// Minor ring — slightly subtler
const DIST_FILL_MINOR = [
  TONIC_HUE,        // 0
  TONIC_HUE + '28', // 1
  TONIC_HUE + '18', // 2
  TONIC_HUE + '0e', // 3
  'var(--bg-raised)',// 4
  'var(--bg)',       // 5
  'var(--bg)',       // 6
];
const DIST_STROKE_MINOR = [
  '#fff',
  TONIC_HUE + '40',
  TONIC_HUE + '28',
  TONIC_HUE + '18',
  'var(--border-subtle)',
  'var(--border-subtle)',
  'var(--card)',
];
const DIST_TEXT_MINOR = [
  '#000', '#c4c4ca', 'var(--text-muted)', 'var(--text-dim)', 'var(--border-light)', 'var(--border)', 'var(--border)',
];

const DISTANCE_LABELS = [
  'Current key',
  'Closely related · 6 shared notes',
  'Related · 5 shared notes',
  '4 shared notes',
  '3 shared notes',
  '2 shared notes',
  'Tritone · 1 shared note',
];

function isMinorScale(scale: ScaleType): boolean {
  return MINOR_SCALES.includes(scale);
}

function fifthsDistance(a: number, b: number): number {
  const d = Math.abs(a - b);
  return Math.min(d, 12 - d);
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number, cy: number,
  innerR: number, outerR: number,
  startDeg: number, endDeg: number,
): string {
  const os = polarToCartesian(cx, cy, outerR, startDeg);
  const oe = polarToCartesian(cx, cy, outerR, endDeg);
  const ie = polarToCartesian(cx, cy, innerR, endDeg);
  const is_ = polarToCartesian(cx, cy, innerR, startDeg);
  const la = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${os.x} ${os.y}`,
    `A ${outerR} ${outerR} 0 ${la} 1 ${oe.x} ${oe.y}`,
    `L ${ie.x} ${ie.y}`,
    `A ${innerR} ${innerR} 0 ${la} 0 ${is_.x} ${is_.y}`,
    'Z',
  ].join(' ');
}

export function CircleOfFifths() {
  const selectedKey = useAppStore((s) => s.selectedKey);
  const selectedScale = useAppStore((s) => s.selectedScale);
  const synthPreset = useAppStore((s) => s.synthPreset);
  const { getNoteDegree } = useKeyContext();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoveredRing, setHoveredRing] = useState<'major' | 'minor' | null>(null);

  const selectedPc = getPitchClass(selectedKey);
  const isMinorSel = isMinorScale(selectedScale);

  // Find the circle position of the selected key
  const selectedIdx = useMemo(() => {
    const arr = isMinorSel ? CIRCLE_MINOR : CIRCLE_MAJOR;
    const idx = arr.findIndex((n) => getPitchClass(n) === selectedPc);
    return idx >= 0 ? idx : 0;
  }, [selectedPc, isMinorSel]);

  const handleKeyClick = useCallback(
    async (note: Note, isMajor: boolean) => {
      useAppStore.setState({
        selectedKey: note,
        selectedScale: isMajor ? 'major' : 'natural_minor',
        selectedChord: null,
        selectedDegree: null,
      });
      await resumeAudio();
      const config = SYNTH_PRESETS[synthPreset] ?? {};
      playChordVoiced([note], 4, 0.5, config);
    },
    [synthPreset],
  );

  const handleMinorVariant = (scaleType: ScaleType) => {
    useAppStore.setState({
      selectedScale: scaleType,
      selectedChord: null,
      selectedDegree: null,
    });
  };

  // Build segment data — coloring based on harmonic distance from selected key
  const majorSegs = useMemo(() => {
    return CIRCLE_MAJOR.map((note, i) => {
      const start = i * 30 - 15 + SEG_GAP;
      const end = i * 30 + 15 - SEG_GAP;
      const pc = getPitchClass(note);
      const selected = pc === selectedPc && !isMinorSel;
      const dist = fifthsDistance(i, selectedIdx);
      const degree = getNoteDegree(note);
      const namePos = polarToCartesian(CENTER, CENTER, 95, i * 30);
      const degreePos = polarToCartesian(CENTER, CENTER, 113, i * 30);

      return {
        note, i, pc, selected, dist, degree, namePos, degreePos,
        path: arcPath(CENTER, CENTER, MAJOR_INNER, MAJOR_OUTER, start, end),
        fill: DIST_FILL_MAJOR[dist],
        stroke: DIST_STROKE_MAJOR[dist],
        textFill: DIST_TEXT_MAJOR[dist],
        hoverFill: dist === 0 ? TONIC_HUE : TONIC_HUE + (dist <= 2 ? '50' : '25'),
      };
    });
  }, [selectedPc, isMinorSel, selectedIdx, getNoteDegree]);

  const minorSegs = useMemo(() => {
    return CIRCLE_MINOR.map((note, i) => {
      const start = i * 30 - 15 + SEG_GAP;
      const end = i * 30 + 15 - SEG_GAP;
      const pc = getPitchClass(note);
      const selected = pc === selectedPc && isMinorSel;
      const dist = fifthsDistance(i, selectedIdx);
      const degree = getNoteDegree(note);
      const mid = polarToCartesian(CENTER, CENTER, (MINOR_INNER + MINOR_OUTER) / 2, i * 30);

      return {
        note, i, pc, selected, dist, degree, mid,
        path: arcPath(CENTER, CENTER, MINOR_INNER, MINOR_OUTER, start, end),
        fill: DIST_FILL_MINOR[dist],
        stroke: DIST_STROKE_MINOR[dist],
        textFill: DIST_TEXT_MINOR[dist],
        hoverFill: dist === 0 ? TONIC_HUE : TONIC_HUE + (dist <= 2 ? '40' : '1a'),
      };
    });
  }, [selectedPc, isMinorSel, selectedIdx, getNoteDegree]);

  // Relative key connection line on hover
  const connLine = useMemo(() => {
    if (hoveredIdx === null) return null;
    const mj = polarToCartesian(CENTER, CENTER, (MAJOR_INNER + MAJOR_OUTER) / 2, hoveredIdx * 30);
    const mn = polarToCartesian(CENTER, CENTER, (MINOR_INNER + MINOR_OUTER) / 2, hoveredIdx * 30);
    return { x1: mj.x, y1: mj.y, x2: mn.x, y2: mn.y };
  }, [hoveredIdx]);

  // Hover tooltip data
  const hoverInfo = useMemo(() => {
    if (hoveredIdx === null) return null;
    const majorNote = CIRCLE_MAJOR[hoveredIdx];
    const minorNote = CIRCLE_MINOR[hoveredIdx];
    const dist = fifthsDistance(hoveredIdx, selectedIdx);
    const majorDeg = getNoteDegree(majorNote);
    const minorDeg = getNoteDegree(minorNote);
    return {
      major: noteToString(majorNote),
      minor: noteToString(minorNote) + 'm',
      keySig: KEY_SIGNATURES[hoveredIdx],
      dist,
      distLabel: DISTANCE_LABELS[dist],
      majorDegree: majorDeg ? ROMAN_NUMERALS[majorDeg] : undefined,
      minorDegree: minorDeg ? ROMAN_NUMERALS[minorDeg] : undefined,
    };
  }, [hoveredIdx, selectedIdx, getNoteDegree]);

  // Find selected position index for center display
  const selectedMajorIdx = CIRCLE_MAJOR.findIndex((n) => getPitchClass(n) === selectedPc);

  const svgContent = (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[300px] mx-auto">
      <defs>
        <filter id="cof-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Key signature labels — outermost ring */}
      {KEY_SIGNATURES.map((sig, i) => {
        if (!sig) return null;
        const pos = polarToCartesian(CENTER, CENTER, KEYSIG_R, i * 30);
        return (
          <text
            key={`sig-${i}`}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-[7px] select-none pointer-events-none"
            fill="var(--border-light)"
          >
            {sig}
          </text>
        );
      })}

      {/* Major ring */}
      {majorSegs.map((s) => (
        <g
          key={`maj-${s.i}`}
          onClick={() => handleKeyClick(s.note, true)}
          onMouseEnter={() => { setHoveredIdx(s.i); setHoveredRing('major'); }}
          onMouseLeave={() => { setHoveredIdx(null); setHoveredRing(null); }}
          className="cursor-pointer"
          style={{ filter: s.selected ? 'url(#cof-glow)' : 'none' }}
        >
          <path
            d={s.path}
            fill={hoveredIdx === s.i ? s.hoverFill : s.fill}
            stroke={s.stroke}
            strokeWidth={s.selected ? 2 : 1}
            style={{ transition: 'fill 0.15s, stroke 0.15s' }}
          />
          <text
            x={s.namePos.x}
            y={s.namePos.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-[11px] font-semibold select-none pointer-events-none"
            fill={s.textFill}
          >
            {noteToString(s.note)}
          </text>
          {s.degree && (
            <text
              x={s.degreePos.x}
              y={s.degreePos.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[6px] select-none pointer-events-none"
              fill={DIST_TEXT_MAJOR[Math.min(s.dist, 3)] + '88'}
            >
              {ROMAN_NUMERALS[s.degree]}
            </text>
          )}
        </g>
      ))}

      {/* Minor ring */}
      {minorSegs.map((s) => (
        <g
          key={`min-${s.i}`}
          onClick={() => handleKeyClick(s.note, false)}
          onMouseEnter={() => { setHoveredIdx(s.i); setHoveredRing('minor'); }}
          onMouseLeave={() => { setHoveredIdx(null); setHoveredRing(null); }}
          className="cursor-pointer"
          style={{ filter: s.selected ? 'url(#cof-glow)' : 'none' }}
        >
          <path
            d={s.path}
            fill={hoveredIdx === s.i ? s.hoverFill : s.fill}
            stroke={s.stroke}
            strokeWidth={s.selected ? 2 : 1}
            style={{ transition: 'fill 0.15s, stroke 0.15s' }}
          />
          <text
            x={s.mid.x}
            y={s.mid.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-[8px] font-medium select-none pointer-events-none"
            fill={s.textFill}
          >
            {noteToString(s.note)}m
          </text>
        </g>
      ))}

      {/* Relative key connection line on hover */}
      {connLine && (
        <line
          x1={connLine.x1} y1={connLine.y1}
          x2={connLine.x2} y2={connLine.y2}
          stroke="var(--text)"
          strokeWidth={1}
          strokeDasharray="3 2"
          opacity={0.35}
          className="pointer-events-none"
        />
      )}

      {/* Center content — always key name + key sig (hover overrides) */}
      {hoveredIdx !== null && hoverInfo ? (
        <>
          <text
            x={CENTER} y={CENTER - 18}
            textAnchor="middle" dominantBaseline="central"
            className="text-[13px] font-bold select-none pointer-events-none"
            fill="var(--text)"
          >
            {hoveredRing === 'minor' ? hoverInfo.minor : hoverInfo.major}
          </text>
          <text
            x={CENTER} y={CENTER - 2}
            textAnchor="middle" dominantBaseline="central"
            className="text-[7px] select-none pointer-events-none"
            fill={hoverInfo.dist <= 2 ? 'var(--text-muted)' : 'var(--text-dim)'}
          >
            {hoverInfo.distLabel}
          </text>
          <text
            x={CENTER} y={CENTER + 12}
            textAnchor="middle" dominantBaseline="central"
            className="text-[7px] select-none pointer-events-none"
            fill="var(--border-light)"
          >
            {hoverInfo.keySig || 'no \u266F/\u266D'} · {hoveredRing === 'minor' ? `rel: ${hoverInfo.major}` : `rel: ${hoverInfo.minor}`}
          </text>
        </>
      ) : (
        <>
          <text
            x={CENTER} y={CENTER - 8}
            textAnchor="middle" dominantBaseline="central"
            className="text-[15px] font-bold select-none"
            fill="var(--text)"
          >
            {noteToString(selectedKey)}{isMinorSel ? 'm' : ''}
          </text>
          <text
            x={CENTER} y={CENTER + 10}
            textAnchor="middle" dominantBaseline="central"
            className="text-[8px] select-none"
            fill="var(--text-dim)"
          >
            {selectedMajorIdx >= 0 ? KEY_SIGNATURES[selectedMajorIdx] || 'no \u266F/\u266D' : ''}
          </text>
        </>
      )}
    </svg>
  );

  return (
    <div>
      {svgContent}
      {isMinorSel && (
        <div className="flex items-center justify-center gap-1 mt-2">
          {MINOR_SCALES.map((st) => {
            const active = selectedScale === st;
            return (
              <button
                key={st}
                onClick={() => handleMinorVariant(st)}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors"
                style={{
                  backgroundColor: active ? TONIC_HUE : 'var(--card)',
                  color: active ? '#000' : 'var(--text-muted)',
                  border: `1px solid ${active ? TONIC_HUE : 'var(--card-hover)'}`,
                }}
              >
                {MINOR_SCALE_LABELS[st]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
