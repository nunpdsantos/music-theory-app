/**
 * Concept Tracking Store — tracks per-concept accuracy with a 30-day sliding window.
 * Follows the gamificationStore.ts pattern: standalone Zustand + localStorage persist.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ConceptHistoryEntry {
  date: string; // YYYY-MM-DD
  correct: number;
  total: number;
}

export interface ConceptRecord {
  correct: number;
  total: number;
  history: ConceptHistoryEntry[];
}

export interface ConceptTrackingState {
  concepts: Record<string, ConceptRecord>;
}

interface ConceptTrackingActions {
  recordResult: (conceptIds: string[], correct: boolean, now?: number) => void;
  getAccuracy: (conceptId: string) => number;
  getWeakConcepts: (threshold?: number) => string[];
  pruneOldEntries: (now?: number) => void;
  replaceAll: (data: Record<string, ConceptRecord>) => void;
}

type ConceptStore = ConceptTrackingState & ConceptTrackingActions;

// ─── Helpers ────────────────────────────────────────────────────────────────

function toDateString(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysBetween(dateStr: string, now: number): number {
  const d = new Date(dateStr + 'T00:00:00');
  const diff = now - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getWindowedAccuracy(record: ConceptRecord, now: number): number {
  let correct = 0;
  let total = 0;
  for (const entry of record.history) {
    if (daysBetween(entry.date, now) <= 30) {
      correct += entry.correct;
      total += entry.total;
    }
  }
  return total === 0 ? 0 : correct / total;
}

function getWindowedTotal(record: ConceptRecord, now: number): number {
  let total = 0;
  for (const entry of record.history) {
    if (daysBetween(entry.date, now) <= 30) {
      total += entry.total;
    }
  }
  return total;
}

// ─── Store ──────────────────────────────────────────────────────────────────

export const useConceptStore = create<ConceptStore>()(
  persist(
    (set, get) => ({
      concepts: {},

      recordResult: (conceptIds, correct, now = Date.now()) => {
        set((state) => {
          const today = toDateString(now);
          const updated = { ...state.concepts };

          for (const id of conceptIds) {
            const existing = updated[id] ?? { correct: 0, total: 0, history: [] };
            const newRecord: ConceptRecord = {
              correct: existing.correct + (correct ? 1 : 0),
              total: existing.total + 1,
              history: [...existing.history],
            };

            // Find or create today's entry
            const todayIdx = newRecord.history.findIndex((e) => e.date === today);
            if (todayIdx >= 0) {
              newRecord.history[todayIdx] = {
                date: today,
                correct: newRecord.history[todayIdx].correct + (correct ? 1 : 0),
                total: newRecord.history[todayIdx].total + 1,
              };
            } else {
              newRecord.history.push({
                date: today,
                correct: correct ? 1 : 0,
                total: 1,
              });
            }

            updated[id] = newRecord;
          }

          return { concepts: updated };
        });
      },

      getAccuracy: (conceptId) => {
        const record = get().concepts[conceptId];
        if (!record) return 0;
        return getWindowedAccuracy(record, Date.now());
      },

      getWeakConcepts: (threshold = 0.7) => {
        const now = Date.now();
        const { concepts } = get();
        const weak: string[] = [];
        for (const [id, record] of Object.entries(concepts)) {
          if (getWindowedTotal(record, now) >= 3 && getWindowedAccuracy(record, now) < threshold) {
            weak.push(id);
          }
        }
        return weak;
      },

      pruneOldEntries: (now = Date.now()) => {
        set((state) => {
          const updated: Record<string, ConceptRecord> = {};
          for (const [id, record] of Object.entries(state.concepts)) {
            const pruned = record.history.filter((e) => daysBetween(e.date, now) <= 30);
            updated[id] = { ...record, history: pruned };
          }
          return { concepts: updated };
        });
      },

      replaceAll: (data) => {
        set({ concepts: data });
      },
    }),
    {
      name: 'music-theory-concept-tracking',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ concepts: state.concepts }),
    },
  ),
);
