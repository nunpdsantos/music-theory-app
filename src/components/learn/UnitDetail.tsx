import { m } from 'framer-motion';
import type { CurriculumUnit, CurriculumLevel } from '../../core/types/curriculum';
import { areModulePrereqsMet } from '../../data/curriculumLoader';
import type { CurriculumProgress } from '../../core/types/curriculum';
import { LearnBreadcrumb } from './LearnBreadcrumb';
import { ModuleRow } from './ModuleRow';
import { ProgressBar } from './ProgressBar';

interface UnitDetailProps {
  unit: CurriculumUnit;
  unitIndex: number;
  level: CurriculumLevel;
  progress: CurriculumProgress;
  isModuleCompleted: (moduleId: string) => boolean;
  onOpenModule: (moduleId: string) => void;
  onBack: () => void;
  onBackToLevels: () => void;
}

export function UnitDetail({
  unit,
  unitIndex,
  level,
  progress,
  isModuleCompleted,
  onOpenModule,
  onBack,
  onBackToLevels,
}: UnitDetailProps) {
  const accent = level.accentColor;
  const completedCount = unit.modules.filter((m) => isModuleCompleted(m.id)).length;
  const progressPercent = unit.modules.length > 0 ? (completedCount / unit.modules.length) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto px-5 max-sm:px-3 py-6 max-sm:py-4 pb-24">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors group"
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <LearnBreadcrumb
          accentColor={accent}
          segments={[
            { label: 'Learn', onClick: onBackToLevels },
            { label: `Level ${level.number}`, onClick: onBack },
            { label: unit.title },
          ]}
        />
      </div>

      {/* Unit header */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          Unit {unitIndex + 1}
        </span>
        <h1 className="text-2xl font-bold text-zinc-100 learn-serif mt-1 mb-1.5">
          {unit.title}
        </h1>
        <p className="text-sm text-zinc-500 mb-4">
          {unit.description}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <ProgressBar percent={progressPercent} color={accent} />
          </div>
          <span className="text-xs text-zinc-500 tabular-nums">
            {completedCount}/{unit.modules.length}
          </span>
        </div>
      </m.div>

      {/* Module list */}
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-1"
      >
        {unit.modules.map((mod, i) => {
          const completed = isModuleCompleted(mod.id);
          const locked = !mod.comingSoon && !areModulePrereqsMet(mod, progress);
          return (
            <ModuleRow
              key={mod.id}
              module={mod}
              index={i}
              isCompleted={completed}
              isLocked={locked}
              isComingSoon={mod.comingSoon}
              accentColor={accent}
              onClick={() => onOpenModule(mod.id)}
            />
          );
        })}
      </m.div>
    </div>
  );
}
