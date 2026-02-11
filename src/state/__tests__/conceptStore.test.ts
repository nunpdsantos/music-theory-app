import { describe, it, expect, beforeEach } from 'vitest';
import { useConceptStore } from '../conceptStore';

// Reset store between tests
beforeEach(() => {
  useConceptStore.setState({ concepts: {} });
});

describe('conceptStore', () => {
  describe('recordResult', () => {
    it('records a correct result for a single concept', () => {
      useConceptStore.getState().recordResult(['intervals'], true);
      const record = useConceptStore.getState().concepts.intervals;
      expect(record).toBeDefined();
      expect(record.correct).toBe(1);
      expect(record.total).toBe(1);
      expect(record.history).toHaveLength(1);
      expect(record.history[0].correct).toBe(1);
      expect(record.history[0].total).toBe(1);
    });

    it('records an incorrect result', () => {
      useConceptStore.getState().recordResult(['intervals'], false);
      const record = useConceptStore.getState().concepts.intervals;
      expect(record.correct).toBe(0);
      expect(record.total).toBe(1);
      expect(record.history[0].correct).toBe(0);
      expect(record.history[0].total).toBe(1);
    });

    it('records results for multiple concepts simultaneously', () => {
      useConceptStore.getState().recordResult(['intervals', 'interval_perfect_5th'], true);
      const { concepts } = useConceptStore.getState();
      expect(concepts.intervals.correct).toBe(1);
      expect(concepts.interval_perfect_5th.correct).toBe(1);
    });

    it('accumulates results on the same day', () => {
      const now = Date.now();
      useConceptStore.getState().recordResult(['chords'], true, now);
      useConceptStore.getState().recordResult(['chords'], false, now);
      useConceptStore.getState().recordResult(['chords'], true, now);

      const record = useConceptStore.getState().concepts.chords;
      expect(record.correct).toBe(2);
      expect(record.total).toBe(3);
      expect(record.history).toHaveLength(1); // same day = one entry
      expect(record.history[0].correct).toBe(2);
      expect(record.history[0].total).toBe(3);
    });

    it('creates separate entries for different days', () => {
      const day1 = new Date('2026-01-10T12:00:00').getTime();
      const day2 = new Date('2026-01-11T12:00:00').getTime();

      useConceptStore.getState().recordResult(['scales'], true, day1);
      useConceptStore.getState().recordResult(['scales'], false, day2);

      const record = useConceptStore.getState().concepts.scales;
      expect(record.history).toHaveLength(2);
      expect(record.correct).toBe(1);
      expect(record.total).toBe(2);
    });
  });

  describe('getAccuracy', () => {
    it('returns 0 for unknown concept', () => {
      expect(useConceptStore.getState().getAccuracy('unknown')).toBe(0);
    });

    it('returns correct accuracy for recorded concept', () => {
      const now = Date.now();
      useConceptStore.getState().recordResult(['intervals'], true, now);
      useConceptStore.getState().recordResult(['intervals'], true, now);
      useConceptStore.getState().recordResult(['intervals'], false, now);

      const accuracy = useConceptStore.getState().getAccuracy('intervals');
      expect(accuracy).toBeCloseTo(2 / 3);
    });

    it('ignores entries older than 30 days in accuracy calculation', () => {
      const oldDay = new Date('2025-12-01T12:00:00').getTime();
      const recentDay = Date.now();

      useConceptStore.getState().recordResult(['chords'], false, oldDay);
      useConceptStore.getState().recordResult(['chords'], true, recentDay);

      // Only recent entry counts (1 correct / 1 total)
      const accuracy = useConceptStore.getState().getAccuracy('chords');
      expect(accuracy).toBe(1);
    });
  });

  describe('getWeakConcepts', () => {
    it('returns empty array when no concepts tracked', () => {
      expect(useConceptStore.getState().getWeakConcepts()).toEqual([]);
    });

    it('returns concepts below threshold with enough data', () => {
      const now = Date.now();
      // intervals: 1/4 = 25% accuracy
      useConceptStore.getState().recordResult(['intervals'], true, now);
      useConceptStore.getState().recordResult(['intervals'], false, now);
      useConceptStore.getState().recordResult(['intervals'], false, now);
      useConceptStore.getState().recordResult(['intervals'], false, now);

      // chords: 3/3 = 100% accuracy
      useConceptStore.getState().recordResult(['chords'], true, now);
      useConceptStore.getState().recordResult(['chords'], true, now);
      useConceptStore.getState().recordResult(['chords'], true, now);

      const weak = useConceptStore.getState().getWeakConcepts(0.7);
      expect(weak).toContain('intervals');
      expect(weak).not.toContain('chords');
    });

    it('ignores concepts with fewer than 3 attempts', () => {
      const now = Date.now();
      useConceptStore.getState().recordResult(['scales'], false, now);
      useConceptStore.getState().recordResult(['scales'], false, now);
      // Only 2 attempts — should not be considered weak
      expect(useConceptStore.getState().getWeakConcepts()).toEqual([]);
    });

    it('uses custom threshold', () => {
      const now = Date.now();
      // 2/4 = 50%
      useConceptStore.getState().recordResult(['scales'], true, now);
      useConceptStore.getState().recordResult(['scales'], true, now);
      useConceptStore.getState().recordResult(['scales'], false, now);
      useConceptStore.getState().recordResult(['scales'], false, now);

      expect(useConceptStore.getState().getWeakConcepts(0.4)).toEqual([]);
      expect(useConceptStore.getState().getWeakConcepts(0.6)).toEqual(['scales']);
    });
  });

  describe('pruneOldEntries', () => {
    it('removes entries older than 30 days', () => {
      const oldDay = new Date('2025-12-01T12:00:00').getTime();
      const now = new Date('2026-02-10T12:00:00').getTime();

      useConceptStore.getState().recordResult(['intervals'], true, oldDay);
      useConceptStore.getState().recordResult(['intervals'], true, now);

      useConceptStore.getState().pruneOldEntries(now);

      const record = useConceptStore.getState().concepts.intervals;
      expect(record.history).toHaveLength(1);
      // Lifetime totals preserved
      expect(record.correct).toBe(2);
      expect(record.total).toBe(2);
    });

    it('keeps entries within 30-day window', () => {
      const recent = new Date('2026-02-08T12:00:00').getTime();
      const now = new Date('2026-02-10T12:00:00').getTime();

      useConceptStore.getState().recordResult(['chords'], true, recent);
      useConceptStore.getState().pruneOldEntries(now);

      expect(useConceptStore.getState().concepts.chords.history).toHaveLength(1);
    });
  });

  describe('replaceAll', () => {
    it('replaces all concept data', () => {
      useConceptStore.getState().recordResult(['intervals'], true);

      useConceptStore.getState().replaceAll({
        chords: { correct: 5, total: 10, history: [] },
      });

      const { concepts } = useConceptStore.getState();
      expect(concepts.intervals).toBeUndefined();
      expect(concepts.chords.correct).toBe(5);
    });
  });
});
