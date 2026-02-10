/**
 * VexFlow lazy loader — singleton dynamic import with module-level cache.
 * Vite auto-splits this into a separate chunk.
 */

let vexflowPromise: Promise<typeof import('vexflow')> | null = null;

export function loadVexFlow(): Promise<typeof import('vexflow')> {
  if (!vexflowPromise) {
    vexflowPromise = import('vexflow');
  }
  return vexflowPromise;
}
