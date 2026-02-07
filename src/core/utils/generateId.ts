/**
 * Shared ID Generator
 *
 * Provides unique ID generation for visual components across the application.
 * Combines a timestamp with a monotonically increasing counter to prevent
 * collisions even when multiple IDs are generated in the same millisecond.
 */

let counter = 0;

/** Generate a unique ID with the given prefix (e.g., "chord", "scale", "query") */
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${++counter}`;
}

/** Reset the counter (for testing purposes) */
export function resetIdCounter(): void {
  counter = 0;
}
