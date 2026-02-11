/**
 * ConceptRadar — hand-rolled SVG polygon chart showing mastery
 * across 6 concept category axes.
 */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useConceptStore } from '../../state/conceptStore';
import { CONCEPT_GROUPS } from '../../services/conceptTagger';

interface ConceptRadarProps {
  accentColor?: string;
}

const SIZE = 240;
const CENTER = SIZE / 2;
const RADIUS = 90;
const RINGS = [0.25, 0.5, 0.75, 1.0];
const AXES = CONCEPT_GROUPS.length; // 6

function polarToXY(angle: number, r: number): [number, number] {
  // Start from top (negative Y axis), go clockwise
  const rad = ((angle - 90) * Math.PI) / 180;
  return [CENTER + r * Math.cos(rad), CENTER + r * Math.sin(rad)];
}

function getAngle(index: number): number {
  return (360 / AXES) * index;
}

export function ConceptRadar({ accentColor = '#60A5FA' }: ConceptRadarProps) {
  const { t } = useTranslation();
  const concepts = useConceptStore((s) => s.concepts);

  // Compute mastery per group: average windowed accuracy across concepts in each group
  const mastery = useMemo(() => {
    const now = Date.now();
    return CONCEPT_GROUPS.map((group) => {
      let totalAcc = 0;
      let count = 0;
      for (const conceptId of group.concepts) {
        const record = concepts[conceptId];
        if (!record || record.history.length === 0) continue;
        // Windowed accuracy (30 days)
        let correct = 0;
        let total = 0;
        for (const entry of record.history) {
          const d = new Date(entry.date + 'T00:00:00');
          const days = Math.floor((now - d.getTime()) / (1000 * 60 * 60 * 24));
          if (days <= 30) {
            correct += entry.correct;
            total += entry.total;
          }
        }
        if (total > 0) {
          totalAcc += correct / total;
          count++;
        }
      }
      return count > 0 ? totalAcc / count : 0;
    });
  }, [concepts]);

  // Build polygon points for mastery values
  const polygonPoints = mastery
    .map((value, i) => {
      const [x, y] = polarToXY(getAngle(i), value * RADIUS);
      return `${x},${y}`;
    })
    .join(' ');

  // Check if there's any data
  const hasData = mastery.some((v) => v > 0);

  return (
    <div className="max-w-[280px] mx-auto">
      <h3
        className="text-xs font-bold uppercase tracking-widest mb-3 text-center"
        style={{ color: 'var(--text-muted)' }}
      >
        {t('concepts.radarTitle')}
      </h3>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-auto"
        role="img"
        aria-label={t('concepts.radarTitle')}
      >
        {/* Grid rings */}
        {RINGS.map((ring) => (
          <polygon
            key={ring}
            points={Array.from({ length: AXES }, (_, i) => {
              const [x, y] = polarToXY(getAngle(i), ring * RADIUS);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="var(--card-hover)"
            strokeWidth={0.5}
          />
        ))}

        {/* Axis lines */}
        {Array.from({ length: AXES }, (_, i) => {
          const [x, y] = polarToXY(getAngle(i), RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="var(--card-hover)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Mastery polygon */}
        {hasData && (
          <polygon
            points={polygonPoints}
            fill={`${accentColor}25`}
            stroke={accentColor}
            strokeWidth={1.5}
          />
        )}

        {/* Data points */}
        {hasData &&
          mastery.map((value, i) => {
            if (value === 0) return null;
            const [x, y] = polarToXY(getAngle(i), value * RADIUS);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={3}
                fill={accentColor}
              />
            );
          })}

        {/* Axis labels */}
        {CONCEPT_GROUPS.map((group, i) => {
          const labelRadius = RADIUS + 18;
          const [x, y] = polarToXY(getAngle(i), labelRadius);
          const angle = getAngle(i);
          // Adjust text-anchor based on position
          let textAnchor: 'start' | 'middle' | 'end' = 'middle';
          if (angle > 30 && angle < 150) textAnchor = 'start';
          else if (angle > 210 && angle < 330) textAnchor = 'end';

          const accuracyPct = Math.round(mastery[i] * 100);
          return (
            <text
              key={group.id}
              x={x}
              y={y}
              textAnchor={textAnchor}
              dominantBaseline="central"
              fill="var(--text-dim)"
              fontSize={9}
              fontWeight={500}
            >
              <title>
                {t(group.labelKey)}: {accuracyPct}%
              </title>
              {t(group.labelKey)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
