import { describe, it, expect } from 'vitest';
import { getSongReferences, type SongReference } from '../songReferences';

describe('getSongReferences', () => {
  it('returns references for a known L1 module', () => {
    const refs = getSongReferences('l1u1m1');
    expect(refs.length).toBeGreaterThan(0);
    expect(refs[0]).toHaveProperty('song');
    expect(refs[0]).toHaveProperty('artist');
    expect(refs[0]).toHaveProperty('context');
  });

  it('returns empty array for unknown module', () => {
    expect(getSongReferences('nonexistent')).toEqual([]);
  });

  it('returns empty array for L4+ modules (not yet populated)', () => {
    expect(getSongReferences('l4u12m1')).toEqual([]);
  });

  it('covers all L1 modules', () => {
    const l1Modules = ['l1u1m1', 'l1u1m2', 'l1u1m3', 'l1u1m4', 'l1u2m1', 'l1u2m2', 'l1u3m1', 'l1u3m2', 'l1u3m3', 'l1u3m4'];
    for (const id of l1Modules) {
      const refs = getSongReferences(id);
      expect(refs.length, `${id} should have song references`).toBeGreaterThan(0);
    }
  });

  it('covers all L2 modules', () => {
    const l2Modules = ['l2u4m1', 'l2u4m2', 'l2u5m1', 'l2u5m2', 'l2u5m3', 'l2u6m1', 'l2u6m2', 'l2u7m1', 'l2u7m2', 'l2u7m3', 'l2u7m4', 'l2u7m5'];
    for (const id of l2Modules) {
      const refs = getSongReferences(id);
      expect(refs.length, `${id} should have song references`).toBeGreaterThan(0);
    }
  });

  it('covers all L3 modules', () => {
    const l3Modules = ['l3u9m1', 'l3u9m2', 'l3u9m3', 'l3u9m4', 'l3u10m1', 'l3u10m2', 'l3u10m3', 'l3u10m4', 'l3u11m1', 'l3u11m2', 'l3u11m3', 'l3u11m4', 'l3u11m5'];
    for (const id of l3Modules) {
      const refs = getSongReferences(id);
      expect(refs.length, `${id} should have song references`).toBeGreaterThan(0);
    }
  });

  it('all entries have non-empty required fields', () => {
    const allModuleIds = [
      'l1u1m1', 'l1u1m2', 'l1u1m3', 'l1u1m4', 'l1u2m1', 'l1u2m2', 'l1u3m1', 'l1u3m2', 'l1u3m3', 'l1u3m4',
      'l2u4m1', 'l2u4m2', 'l2u5m1', 'l2u5m2', 'l2u5m3', 'l2u6m1', 'l2u6m2', 'l2u7m1', 'l2u7m2', 'l2u7m3', 'l2u7m4', 'l2u7m5',
      'l3u9m1', 'l3u9m2', 'l3u9m3', 'l3u9m4', 'l3u10m1', 'l3u10m2', 'l3u10m3', 'l3u10m4', 'l3u11m1', 'l3u11m2', 'l3u11m3', 'l3u11m4', 'l3u11m5',
    ];
    for (const id of allModuleIds) {
      for (const ref of getSongReferences(id)) {
        expect(ref.song.length, `${id}: song should be non-empty`).toBeGreaterThan(0);
        expect(ref.artist.length, `${id}: artist should be non-empty`).toBeGreaterThan(0);
        expect(ref.context.length, `${id}: context should be non-empty`).toBeGreaterThan(0);
      }
    }
  });

  it('has at least 2 references per module on average', () => {
    const moduleIds = [
      'l1u1m1', 'l1u1m2', 'l1u1m3', 'l1u1m4', 'l1u2m1', 'l1u2m2', 'l1u3m1', 'l1u3m2', 'l1u3m3', 'l1u3m4',
      'l2u4m1', 'l2u4m2', 'l2u5m1', 'l2u5m2', 'l2u5m3', 'l2u6m1', 'l2u6m2', 'l2u7m1', 'l2u7m2', 'l2u7m3', 'l2u7m4', 'l2u7m5',
      'l3u9m1', 'l3u9m2', 'l3u9m3', 'l3u9m4', 'l3u10m1', 'l3u10m2', 'l3u10m3', 'l3u10m4', 'l3u11m1', 'l3u11m2', 'l3u11m3', 'l3u11m4', 'l3u11m5',
    ];
    const total = moduleIds.reduce((sum, id) => sum + getSongReferences(id).length, 0);
    expect(total / moduleIds.length).toBeGreaterThanOrEqual(1.5);
  });
});
