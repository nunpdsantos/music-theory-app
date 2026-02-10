import { m } from 'framer-motion';
import type { CurriculumUnit } from '../../core/types/curriculum';
import { ProgressBar } from './ProgressBar';

interface UnitCardProps {
  unit: CurriculumUnit;
  index: number;
  completedCount: number;
  accentColor: string;
  isComplete: boolean;
  onClick: () => void;
}

export function UnitCard({ unit, index, completedCount, accentColor, isComplete, onClick }: UnitCardProps) {
  const totalModules = unit.modules.length;
  const progressPercent = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="relative pl-10 max-sm:pl-8"
    >
      {/* Node on the vertical line */}
      <div
        className={`absolute left-[11px] max-sm:left-[7px] top-5 w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center z-10 ${
          isComplete ? '' : 'bg-zinc-950'
        }`}
        style={{
          borderColor: accentColor,
          backgroundColor: isComplete ? accentColor : undefined,
        }}
      >
        {isComplete && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#09090b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      <button
        onClick={onClick}
        className="w-full text-left rounded-xl border overflow-hidden transition-colors group hover:scale-[1.002]"
        style={{
          borderColor: `${accentColor}18`,
          backgroundColor: `${accentColor}05`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${accentColor}30`;
          e.currentTarget.style.backgroundColor = `${accentColor}08`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${accentColor}18`;
          e.currentTarget.style.backgroundColor = `${accentColor}05`;
        }}
      >
        <div className="px-4 py-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Unit {index + 1}
                </span>
                {isComplete && (
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                    Complete
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-zinc-200 mt-0.5">
                {unit.title}
              </h3>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-700 group-hover:text-zinc-500 shrink-0 mt-1 group-hover:translate-x-0.5 transition-all"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>

          <p className="text-xs text-zinc-500 mb-3">
            {unit.description}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] text-zinc-500">
              {totalModules} modules
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar percent={progressPercent} color={accentColor} height={4} delay={index * 0.08} />
            </div>
            <span className="text-[10px] text-zinc-500 tabular-nums">
              {completedCount}/{totalModules}
            </span>
          </div>
        </div>
      </button>
    </m.div>
  );
}
