import { useState, useMemo, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CURRICULUM_UNITS,
  getModuleById,
  getUnitByModuleId,
  getNextIncompleteModule,
} from '../core/constants/curriculum';
import type { CurriculumUnit } from '../core/types/curriculum';
import { useLearnProgress } from '../hooks/useLearnProgress';
import { ModuleView } from '../components/learn/ModuleView';

// ─── Unit accent colors (drawn from DEGREE_COLORS spectrum) ──────────────────
const UNIT_ACCENTS: Record<string, string> = {
  u1: '#60A5FA', // blue — tonic
  u2: '#34D399', // emerald — subdominant
  u3: '#FBBF24', // amber — dominant
  u4: '#A78BFA', // violet — supertonic
  u5: '#FB923C', // orange — submediant
};

// Icon paths per unit
const UNIT_ICONS: Record<string, ReactNode> = {
  u1: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 6v12M10 6v12M14 6v12M18 6v12" />
    </svg>
  ),
  u2: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  u3: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  u4: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 0 1 0 14 7 7 0 0 1 0-14" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  u5: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

type Screen =
  | { type: 'overview' }
  | { type: 'module'; moduleId: string };

// ─── Main LearnView ──────────────────────────────────────────────────────────

export function LearnView() {
  const [screen, setScreen] = useState<Screen>({ type: 'overview' });
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    progress,
    toggleTask,
    completeModule,
    isModuleCompleted,
    isTaskCompleted,
    getModuleCompletedTaskCount,
    getUnitCompletedModuleCount,
  } = useLearnProgress();

  const nextUp = useMemo(() => getNextIncompleteModule(progress), [progress]);

  const totalModules = CURRICULUM_UNITS.reduce((s, u) => s + u.modules.length, 0);
  const totalCompleted = progress.completedModules.length;

  const openModule = useCallback((moduleId: string) => {
    setScreen({ type: 'module', moduleId });
  }, []);

  const backToOverview = useCallback(() => {
    setScreen({ type: 'overview' });
  }, []);

  // Scroll to top on screen change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  // ─── Module Detail Screen ────────────────────────────────────────────────
  if (screen.type === 'module') {
    const mod = getModuleById(screen.moduleId);
    const unit = getUnitByModuleId(screen.moduleId);
    if (!mod || !unit) {
      setScreen({ type: 'overview' });
      return null;
    }
    const unitIndex = CURRICULUM_UNITS.indexOf(unit);
    const moduleIndex = unit.modules.indexOf(mod);
    return (
      <div ref={scrollRef} className="h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <ModuleView
            key={mod.id}
            module={mod}
            unit={unit}
            unitIndex={unitIndex}
            moduleIndex={moduleIndex}
            isModuleCompleted={isModuleCompleted(mod.id)}
            isTaskCompleted={isTaskCompleted}
            completedTaskCount={getModuleCompletedTaskCount(mod.id)}
            onToggleTask={toggleTask}
            onCompleteModule={completeModule}
            onBack={backToOverview}
            onNavigateModule={openModule}
          />
        </AnimatePresence>
      </div>
    );
  }

  // ─── Overview Screen ─────────────────────────────────────────────────────
  return (
    <div ref={scrollRef} className="h-full overflow-y-auto" role="region" aria-label="Learn music theory">
      <div className="max-w-2xl mx-auto px-5 max-sm:px-3 py-6 max-sm:py-4 pb-24">

        {/* ─── Header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-zinc-100 learn-serif mb-1.5">
            Learn Music Theory
          </h1>
          <p className="text-sm text-zinc-500">
            A structured path from the basics to advanced harmony
          </p>

          {/* Progress summary */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${(totalCompleted / totalModules) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <span className="text-xs text-zinc-500 tabular-nums shrink-0">
              {totalCompleted}/{totalModules}
            </span>
          </div>
        </motion.div>

        {/* ─── Continue Button ──────────────────────────────────── */}
        {nextUp && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => openModule(nextUp.module.id)}
            className="w-full mb-8 rounded-xl px-4 py-3.5 text-left transition-all duration-200 group hover:scale-[1.005]"
            style={{
              backgroundColor: `${UNIT_ACCENTS[nextUp.unit.id]}10`,
              border: `1px solid ${UNIT_ACCENTS[nextUp.unit.id]}25`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${UNIT_ACCENTS[nextUp.unit.id]}18`;
              e.currentTarget.style.borderColor = `${UNIT_ACCENTS[nextUp.unit.id]}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${UNIT_ACCENTS[nextUp.unit.id]}10`;
              e.currentTarget.style.borderColor = `${UNIT_ACCENTS[nextUp.unit.id]}25`;
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: UNIT_ACCENTS[nextUp.unit.id] }}
                >
                  Continue
                </span>
                <h3 className="text-sm font-semibold text-zinc-200 mt-0.5">
                  {nextUp.module.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {nextUp.unit.title} &middot; {nextUp.module.subtitle}
                </p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={UNIT_ACCENTS[nextUp.unit.id]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 group-hover:translate-x-0.5 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        )}

        {/* ─── Unit Cards ──────────────────────────────────────── */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[19px] max-sm:left-[15px] top-6 bottom-6 w-px"
            style={{
              background: `linear-gradient(to bottom, ${UNIT_ACCENTS.u1}30, ${UNIT_ACCENTS.u2}30, ${UNIT_ACCENTS.u3}30, ${UNIT_ACCENTS.u4}30, ${UNIT_ACCENTS.u5}30)`,
            }}
          />

          <div className="space-y-4">
            {CURRICULUM_UNITS.map((unit, unitIdx) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                unitIndex={unitIdx}
                completedCount={getUnitCompletedModuleCount(unit.modules.map((m) => m.id))}
                isModuleCompleted={isModuleCompleted}
                onOpenModule={openModule}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Unit Card ───────────────────────────────────────────────────────────────

interface UnitCardProps {
  unit: CurriculumUnit;
  unitIndex: number;
  completedCount: number;
  isModuleCompleted: (moduleId: string) => boolean;
  onOpenModule: (moduleId: string) => void;
}

function UnitCard({ unit, unitIndex, completedCount, isModuleCompleted, onOpenModule }: UnitCardProps) {
  const accent = UNIT_ACCENTS[unit.id] ?? '#60A5FA';
  const totalModules = unit.modules.length;
  const isUnitComplete = completedCount === totalModules;
  const progressPercent = (completedCount / totalModules) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: unitIndex * 0.06 }}
      className="relative pl-10 max-sm:pl-8"
    >
      {/* Node on the vertical line */}
      <div
        className={`absolute left-[11px] max-sm:left-[7px] top-5 w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center z-10 ${
          isUnitComplete ? '' : 'bg-zinc-950'
        }`}
        style={{
          borderColor: accent,
          backgroundColor: isUnitComplete ? accent : undefined,
        }}
      >
        {isUnitComplete && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#09090b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      <div
        className="rounded-xl border overflow-hidden transition-colors"
        style={{
          borderColor: `${accent}18`,
          backgroundColor: `${accent}05`,
        }}
      >
        {/* Unit header */}
        <div className="px-4 py-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${accent}15`,
                  color: accent,
                }}
              >
                {UNIT_ICONS[unit.id]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                    Unit {unitIndex + 1}
                  </span>
                  {isUnitComplete && (
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                      Complete
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-zinc-200 mt-0.5">
                  {unit.title}
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-500 mb-4">
            {unit.description}
          </p>

          {/* Module list */}
          <div className="space-y-1">
            {unit.modules.map((mod, modIdx) => {
              const done = isModuleCompleted(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => onOpenModule(mod.id)}
                  className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-150 group hover:bg-white/[0.04]"
                >
                  {/* Module status indicator */}
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                      done
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-zinc-800 text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  >
                    {done ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      modIdx + 1
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-xs font-medium block truncate transition-colors ${
                        done
                          ? 'text-zinc-500'
                          : 'text-zinc-300 group-hover:text-zinc-100'
                      }`}
                    >
                      {mod.title}
                    </span>
                    <span className="text-[11px] text-zinc-600 block truncate">
                      {mod.subtitle}
                    </span>
                  </div>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-700 group-hover:text-zinc-500 shrink-0 group-hover:translate-x-0.5 transition-all"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: accent }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: unitIndex * 0.08 }}
              />
            </div>
            <span className="text-[10px] text-zinc-600 tabular-nums">
              {completedCount}/{totalModules}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
