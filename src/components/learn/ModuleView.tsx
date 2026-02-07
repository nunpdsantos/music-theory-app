import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CurriculumModule, CurriculumUnit } from '../../core/types/curriculum';
import { getNextModule, getPreviousModule } from '../../core/constants/curriculum';
import { executeTheoryQuery } from '../../utils/queryExecutor';

// ─── Unit accent colors (maps to DEGREE_COLORS) ─────────────────────────────
const UNIT_ACCENTS: Record<string, string> = {
  u1: '#60A5FA',
  u2: '#34D399',
  u3: '#FBBF24',
  u4: '#A78BFA',
  u5: '#FB923C',
};

interface ModuleViewProps {
  module: CurriculumModule;
  unit: CurriculumUnit;
  unitIndex: number;
  moduleIndex: number;
  isModuleCompleted: boolean;
  isTaskCompleted: (moduleId: string, taskId: string) => boolean;
  completedTaskCount: number;
  onToggleTask: (moduleId: string, taskId: string) => void;
  onCompleteModule: (moduleId: string) => void;
  onBack: () => void;
  onNavigateModule: (moduleId: string) => void;
}

export function ModuleView({
  module,
  unit,
  unitIndex,
  moduleIndex,
  isModuleCompleted,
  isTaskCompleted,
  completedTaskCount,
  onToggleTask,
  onCompleteModule,
  onBack,
  onNavigateModule,
}: ModuleViewProps) {
  const accent = UNIT_ACCENTS[unit.id] ?? '#60A5FA';
  const prevModule = getPreviousModule(module.id);
  const nextModule = getNextModule(module.id);
  const allTasksDone = completedTaskCount >= module.tasks.length;

  const handleTryThis = useCallback((query: string) => {
    executeTheoryQuery(query);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      className="h-full overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto px-5 py-6 pb-32">
        {/* ─── Breadcrumb + Back ──────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors group"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-0.5 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Units
          </button>
          <span className="text-zinc-700 text-xs">/</span>
          <span className="text-xs text-zinc-600">
            Unit {unitIndex + 1}
          </span>
          <span className="text-zinc-700 text-xs">/</span>
          <span className="text-xs" style={{ color: accent }}>
            Module {moduleIndex + 1}
          </span>
        </div>

        {/* ─── Module Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{
                color: accent,
                backgroundColor: `${accent}18`,
              }}
            >
              {unit.title}
            </span>
            {isModuleCompleted && (
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                Completed
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-1.5 learn-serif">
            {module.title}
          </h1>
          <p className="text-sm text-zinc-500">
            {module.subtitle}
          </p>
        </motion.div>

        {/* ─── Objectives ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 rounded-xl p-4"
          style={{
            backgroundColor: `${accent}08`,
            border: `1px solid ${accent}15`,
          }}
        >
          <h2
            className="text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ color: accent }}
          >
            Learning Objectives
          </h2>
          <ul className="space-y-2">
            {module.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: accent }}
                />
                {obj}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ─── Concepts ──────────────────────────────────────────── */}
        <div className="space-y-8 mb-12">
          {module.concepts.map((concept, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              {/* Concept number + title */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    color: accent,
                    backgroundColor: `${accent}15`,
                  }}
                >
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-zinc-200">
                  {concept.title}
                </h3>
              </div>

              {/* Explanation */}
              <div className="ml-10 space-y-4">
                <p className="learn-concept-text text-zinc-300/90">
                  {concept.explanation}
                </p>

                {/* Try This callout */}
                <button
                  onClick={() => handleTryThis(concept.tryThisQuery)}
                  className="group w-full text-left rounded-xl px-4 py-3.5 transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    backgroundColor: `${accent}0a`,
                    border: `1px solid ${accent}20`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${accent}15`;
                    e.currentTarget.style.borderColor = `${accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${accent}0a`;
                    e.currentTarget.style.borderColor = `${accent}20`;
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                        style={{
                          backgroundColor: `${accent}20`,
                          color: accent,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest block mb-0.5" style={{ color: accent }}>
                          Try This
                        </span>
                        <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">
                          {concept.tryThisLabel}
                        </span>
                      </div>
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
                      className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Divider between concepts (not after last) */}
              {i < module.concepts.length - 1 && (
                <div className="ml-10 mt-8 h-px bg-zinc-800/60" />
              )}
            </motion.div>
          ))}
        </div>

        {/* ─── Practice Tasks ────────────────────────────────────── */}
        {module.tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10 rounded-xl border border-zinc-800 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Practice Tasks
              </h2>
              <span className="text-[10px] text-zinc-600">
                {completedTaskCount}/{module.tasks.length}
              </span>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {module.tasks.map((task) => {
                const done = isTaskCompleted(module.id, task.id);
                return (
                  <button
                    key={task.id}
                    onClick={() => onToggleTask(module.id, task.id)}
                    className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-zinc-800/30 transition-colors group"
                  >
                    <span
                      className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200 ${
                        done
                          ? 'border-emerald-500 bg-emerald-500/20'
                          : 'border-zinc-700 group-hover:border-zinc-500'
                      }`}
                    >
                      <AnimatePresence>
                        {done && (
                          <motion.svg
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#34D399"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`text-sm transition-colors ${
                        done
                          ? 'text-zinc-500 line-through'
                          : 'text-zinc-300 group-hover:text-zinc-100'
                      }`}
                    >
                      {task.instruction}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── Complete Module Button ────────────────────────────── */}
        {!isModuleCompleted && allTasksDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <button
              onClick={() => onCompleteModule(module.id)}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01]"
              style={{
                backgroundColor: `${accent}20`,
                color: accent,
                border: `1px solid ${accent}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${accent}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${accent}20`;
              }}
            >
              Mark Module Complete
            </button>
          </motion.div>
        )}

        {/* ─── Navigation Footer ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex items-center justify-between pt-6 border-t border-zinc-800"
        >
          {prevModule ? (
            <button
              onClick={() => onNavigateModule(prevModule.id)}
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors group"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-x-0.5 transition-transform"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <div className="text-left">
                <span className="block text-[10px] text-zinc-600">Previous</span>
                <span>{prevModule.title}</span>
              </div>
            </button>
          ) : (
            <div />
          )}
          {nextModule ? (
            <button
              onClick={() => onNavigateModule(nextModule.id)}
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors group text-right"
            >
              <div>
                <span className="block text-[10px] text-zinc-600">Next</span>
                <span>{nextModule.title}</span>
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
                className="group-hover:translate-x-0.5 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
