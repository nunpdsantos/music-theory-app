import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Mock supabase module — default: null (no env vars)
// Tests that need a real client override via `setMockSupabase()`.
// ---------------------------------------------------------------------------
const mockGetSession = vi.fn();
const mockSignInWithOtp = vi.fn();
const mockSignOut = vi.fn();
const mockUnsubscribe = vi.fn();
let authChangeCallback: ((event: string, session: unknown) => void) | null =
  null;
const mockOnAuthStateChange = vi.fn((_cb?: unknown) => ({
  data: {
    subscription: { unsubscribe: mockUnsubscribe },
  },
}));

/** Fake supabase client wired to the mocks above. */
const fakeSupabase = {
  auth: {
    getSession: mockGetSession,
    signInWithOtp: mockSignInWithOtp,
    signOut: mockSignOut,
    onAuthStateChange: mockOnAuthStateChange,
  },
};

let mockSupabaseValue: typeof fakeSupabase | null = null;

vi.mock('../../lib/supabase', () => ({
  get supabase() {
    return mockSupabaseValue;
  },
}));

// Import *after* the mock is declared so the hook picks up our proxy.
import { useAuth } from '../useAuth';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function setMockSupabase(val: typeof fakeSupabase | null) {
  mockSupabaseValue = val;
}

const fakeSession = {
  user: { id: 'u1', email: 'test@example.com' },
  access_token: 'tok',
  refresh_token: 'ref',
} as unknown;

// ---------------------------------------------------------------------------
// Reset between tests
// ---------------------------------------------------------------------------
beforeEach(() => {
  vi.clearAllMocks();
  mockSupabaseValue = null;
  authChangeCallback = null;

  // Default: getSession resolves with null session
  mockGetSession.mockResolvedValue({ data: { session: null } });

  // Capture the auth-change listener so tests can invoke it
  mockOnAuthStateChange.mockImplementation((cb: any) => {
    authChangeCallback = cb;
    return { data: { subscription: { unsubscribe: mockUnsubscribe } } };
  });
});

// =========================================================================
// Suite 1 — supabase is null (no env vars)
// =========================================================================
describe('useAuth — supabase null', () => {
  it('loading is false when supabase is null', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.loading).toBe(false);
  });

  it('isAvailable is false when supabase is null', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAvailable).toBe(false);
  });

  it('session and user are null', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
  });

  it('isAuthenticated is false', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('signIn returns error string', async () => {
    const { result } = renderHook(() => useAuth());
    let res: { error: string | null } | undefined;
    await act(async () => {
      res = await result.current.signIn('a@b.com');
    });
    expect(res!.error).toBe('Auth not available');
  });

  it('signOut is a no-op (does not throw)', async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.signOut();
    });
    expect(mockSignOut).not.toHaveBeenCalled();
  });
});

// =========================================================================
// Suite 2 — supabase present
// =========================================================================
describe('useAuth — supabase present', () => {
  beforeEach(() => {
    setMockSupabase(fakeSupabase);
  });

  it('loading is true while getSession is pending', () => {
    // Make getSession hang indefinitely
    mockGetSession.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useAuth());
    expect(result.current.loading).toBe(true);
  });

  it('isAvailable is true', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAvailable).toBe(true);
  });

  it('resolves initial session and sets loading=false', async () => {
    mockGetSession.mockResolvedValue({ data: { session: fakeSession } });
    const { result } = renderHook(() => useAuth());
    // Wait for the getSession promise to settle
    await act(async () => {});
    expect(result.current.session).toBe(fakeSession);
    expect(result.current.user).toEqual(
      (fakeSession as any).user,
    );
    expect(result.current.loading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('sets loading=false when initial session is null', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } });
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    expect(result.current.loading).toBe(false);
    expect(result.current.session).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  // -----------------------------------------------------------------------
  // onAuthStateChange
  // -----------------------------------------------------------------------
  it('subscribes to auth state changes on mount', async () => {
    renderHook(() => useAuth());
    await act(async () => {});
    expect(mockOnAuthStateChange).toHaveBeenCalledTimes(1);
  });

  it('auth state change updates session', async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    expect(result.current.session).toBeNull();

    // Simulate an auth event
    act(() => {
      authChangeCallback!('SIGNED_IN', fakeSession);
    });

    expect(result.current.session).toBe(fakeSession);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual((fakeSession as any).user);
  });

  it('unsubscribes from auth state changes on unmount', async () => {
    const { unmount } = renderHook(() => useAuth());
    await act(async () => {});
    unmount();
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  // -----------------------------------------------------------------------
  // signIn
  // -----------------------------------------------------------------------
  it('signIn success returns { error: null }', async () => {
    mockSignInWithOtp.mockResolvedValue({ error: null });
    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    let res: { error: string | null } | undefined;
    await act(async () => {
      res = await result.current.signIn('user@example.com');
    });
    expect(mockSignInWithOtp).toHaveBeenCalledWith({
      email: 'user@example.com',
    });
    expect(res!.error).toBeNull();
  });

  it('signIn error returns the error message', async () => {
    mockSignInWithOtp.mockResolvedValue({
      error: { message: 'Rate limit exceeded' },
    });
    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    let res: { error: string | null } | undefined;
    await act(async () => {
      res = await result.current.signIn('user@example.com');
    });
    expect(res!.error).toBe('Rate limit exceeded');
  });

  // -----------------------------------------------------------------------
  // signOut
  // -----------------------------------------------------------------------
  it('signOut calls supabase.auth.signOut and clears session', async () => {
    mockGetSession.mockResolvedValue({ data: { session: fakeSession } });
    mockSignOut.mockResolvedValue({ error: null });

    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    expect(result.current.isAuthenticated).toBe(true);

    await act(async () => {
      await result.current.signOut();
    });

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(result.current.session).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
