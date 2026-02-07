/**
 * Share URL utilities
 *
 * Encodes/decodes music theory queries in URL hash fragments
 * for shareable links. Uses hash (#) to avoid server round-trips.
 *
 * Format: https://domain/#q=<encoded-query>
 * Example: https://domain/#q=I%20IV%20V%20I%20in%20C
 */

const QUERY_PARAM = 'q';

/**
 * Generate a shareable URL for a query string.
 */
export function generateShareUrl(query: string): string {
  const url = new URL(window.location.href);
  url.hash = `${QUERY_PARAM}=${encodeURIComponent(query)}`;
  return url.toString();
}

/**
 * Parse a query from the current URL hash.
 * Returns null if no query is encoded.
 */
export function parseShareUrl(): string | null {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) return null;

  // Remove leading #
  const fragment = hash.slice(1);

  // Parse as key=value
  const eqIndex = fragment.indexOf('=');
  if (eqIndex === -1) return null;

  const key = fragment.slice(0, eqIndex);
  const value = fragment.slice(eqIndex + 1);

  if (key !== QUERY_PARAM || !value) return null;

  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

/**
 * Clear the query from the URL hash without triggering navigation.
 */
export function clearShareUrl(): void {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

/**
 * Copy text to clipboard. Returns true on success.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}
