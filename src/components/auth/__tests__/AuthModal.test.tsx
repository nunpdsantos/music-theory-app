import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { AuthModal } from '../AuthModal';
import { AccountMenu } from '../AccountMenu';
import { useSyncStore } from '../../../state/syncStore';

afterEach(cleanup);

// ---------------------------------------------------------------------------
// Mock framer-motion — reuse project pattern from KeySelector tests
// ---------------------------------------------------------------------------
vi.mock('framer-motion', async () => {
  const React = await import('react');
  const MOTION_RE =
    /^(while|initial|animate|exit|transition|layout|variants|drag|onDrag)/;
  function makeMotion(tag: string) {
    return function MotionProxy(props: Record<string, any>) {
      const clean: Record<string, any> = {};
      for (const [k, v] of Object.entries(props)) {
        if (k === 'children' || !MOTION_RE.test(k)) clean[k] = v;
      }
      return React.createElement(tag, clean);
    };
  }
  const proxy = new Proxy(
    {},
    { get: (_t: unknown, prop: string) => makeMotion(prop) },
  );
  return {
    motion: proxy,
    m: proxy,
    AnimatePresence: (p: any) => p.children,
    LazyMotion: (p: any) => p.children,
    domAnimation: {},
  };
});

// =========================================================================
// AuthModal
// =========================================================================
describe('AuthModal', () => {
  const onClose = vi.fn();
  const onSignIn = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    onSignIn.mockResolvedValue({ error: null });
  });

  // -----------------------------------------------------------------------
  // Visibility
  // -----------------------------------------------------------------------
  it('renders title and subtitle when open=true', () => {
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);
    expect(screen.getByText('Sign In')).toBeDefined();
    expect(
      screen.getByText(
        'Enter your email to receive a magic link. No password needed.',
      ),
    ).toBeDefined();
  });

  it('renders nothing when open=false', () => {
    const { container } = render(
      <AuthModal open={false} onClose={onClose} onSignIn={onSignIn} />,
    );
    expect(container.innerHTML).toBe('');
  });

  // -----------------------------------------------------------------------
  // Form rendering
  // -----------------------------------------------------------------------
  it('renders email input with label', () => {
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);
    expect(screen.getByLabelText('Email address')).toBeDefined();
    expect(screen.getByPlaceholderText('you@example.com')).toBeDefined();
  });

  it('renders cancel and send-link buttons', () => {
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);
    expect(screen.getByText('Cancel')).toBeDefined();
    expect(screen.getByText('Send Magic Link')).toBeDefined();
  });

  // -----------------------------------------------------------------------
  // Submit — success path
  // -----------------------------------------------------------------------
  it('calls onSignIn with trimmed email on submit and shows success', async () => {
    onSignIn.mockResolvedValue({ error: null });
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);

    const input = screen.getByLabelText('Email address') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'user@test.com' } });
    fireEvent.click(screen.getByText('Send Magic Link'));

    await waitFor(() => {
      expect(onSignIn).toHaveBeenCalledWith('user@test.com');
    });

    // Success state shows check-email message
    await waitFor(() => {
      expect(screen.getByText('Check your email')).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // Submit — error path
  // -----------------------------------------------------------------------
  it('shows error message when onSignIn returns an error', async () => {
    onSignIn.mockResolvedValue({ error: 'Invalid email' });
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);

    const input = screen.getByLabelText('Email address');
    fireEvent.change(input, { target: { value: 'bad@email.com' } });
    fireEvent.click(screen.getByText('Send Magic Link'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeDefined();
    });

    // Form should still be visible (not success state)
    expect(screen.getByLabelText('Email address')).toBeDefined();
  });

  // -----------------------------------------------------------------------
  // Submit button disabled states
  // -----------------------------------------------------------------------
  it('submit button is disabled when email is empty', () => {
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);
    const submitButton = screen.getByText('Send Magic Link');
    expect(submitButton).toHaveProperty('disabled', true);
  });

  it('submit button is enabled when email is non-empty', () => {
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);
    const input = screen.getByLabelText('Email address');
    fireEvent.change(input, { target: { value: 'a@b.com' } });
    const submitButton = screen.getByText('Send Magic Link');
    expect(submitButton).toHaveProperty('disabled', false);
  });

  it('does not submit when email is only whitespace', () => {
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);
    const input = screen.getByLabelText('Email address');
    fireEvent.change(input, { target: { value: '   ' } });
    // Submit button should be disabled for whitespace-only input
    const submitButton = screen.getByText('Send Magic Link');
    expect(submitButton).toHaveProperty('disabled', true);
  });

  // -----------------------------------------------------------------------
  // Close / reset
  // -----------------------------------------------------------------------
  it('cancel button calls onClose and resets state', async () => {
    onSignIn.mockResolvedValue({ error: 'fail' });
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);

    const input = screen.getByLabelText('Email address');
    fireEvent.change(input, { target: { value: 'x@y.com' } });
    fireEvent.click(screen.getByText('Send Magic Link'));
    await waitFor(() => expect(screen.getByText('fail')).toBeDefined());

    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('backdrop click triggers close', () => {
    const { container } = render(
      <AuthModal open onClose={onClose} onSignIn={onSignIn} />,
    );
    // The outermost m.div is the backdrop area
    const backdrop = container.firstChild as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('clicking modal content does NOT close (stopPropagation)', () => {
    render(<AuthModal open onClose={onClose} onSignIn={onSignIn} />);
    const form = screen.getByLabelText('Email address').closest('form')!;
    fireEvent.click(form);
    expect(onClose).not.toHaveBeenCalled();
  });
});

// =========================================================================
// AccountMenu
// =========================================================================
describe('AccountMenu', () => {
  const onSignOut = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    onSignOut.mockResolvedValue(undefined);
    useSyncStore.setState({
      status: 'idle',
      lastSyncedAt: null,
      error: null,
    });
  });

  it('renders account button with aria-label', () => {
    render(<AccountMenu email="test@x.com" onSignOut={onSignOut} />);
    expect(screen.getByLabelText('Account menu')).toBeDefined();
  });

  it('dropdown is closed by default', () => {
    render(<AccountMenu email="test@x.com" onSignOut={onSignOut} />);
    expect(screen.queryByText('test@x.com')).toBeNull();
  });

  it('click toggles dropdown open', () => {
    render(<AccountMenu email="test@x.com" onSignOut={onSignOut} />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(screen.getByText('test@x.com')).toBeDefined();
    expect(screen.getByText('Sign Out')).toBeDefined();
  });

  it('click toggles dropdown closed', () => {
    render(<AccountMenu email="test@x.com" onSignOut={onSignOut} />);
    const btn = screen.getByLabelText('Account menu');
    fireEvent.click(btn); // open
    fireEvent.click(btn); // close
    expect(screen.queryByText('test@x.com')).toBeNull();
  });

  it('shows email in dropdown', () => {
    render(<AccountMenu email="me@app.dev" onSignOut={onSignOut} />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(screen.getByText('me@app.dev')).toBeDefined();
  });

  it('aria-expanded reflects dropdown state', () => {
    render(<AccountMenu email="a@b.com" onSignOut={onSignOut} />);
    const btn = screen.getByLabelText('Account menu');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  // -----------------------------------------------------------------------
  // Sync status labels
  // -----------------------------------------------------------------------
  it('shows syncing label when status is syncing', () => {
    useSyncStore.setState({ status: 'syncing' });
    render(<AccountMenu email="a@b.com" onSignOut={onSignOut} />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(screen.getByText(/Syncing/)).toBeDefined();
  });

  it('shows error label when status is error', () => {
    useSyncStore.setState({ status: 'error', error: 'Network' });
    render(<AccountMenu email="a@b.com" onSignOut={onSignOut} />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(screen.getByText('Sync error')).toBeDefined();
  });

  it('shows offline label when status is offline', () => {
    useSyncStore.setState({ status: 'offline' });
    render(<AccountMenu email="a@b.com" onSignOut={onSignOut} />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(screen.getByText('Offline')).toBeDefined();
  });

  it('shows synced label when status is idle', () => {
    useSyncStore.setState({ status: 'idle', lastSyncedAt: Date.now() });
    render(<AccountMenu email="a@b.com" onSignOut={onSignOut} />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(screen.getByText('Synced')).toBeDefined();
  });

  // -----------------------------------------------------------------------
  // Sign out
  // -----------------------------------------------------------------------
  it('sign out button calls onSignOut and closes dropdown', async () => {
    render(<AccountMenu email="a@b.com" onSignOut={onSignOut} />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    fireEvent.click(screen.getByText('Sign Out'));

    await waitFor(() => {
      expect(onSignOut).toHaveBeenCalledTimes(1);
    });
    // Dropdown should close (setOpen(false) is called before onSignOut)
    expect(screen.queryByText('a@b.com')).toBeNull();
  });

  // -----------------------------------------------------------------------
  // Outside click closes dropdown
  // -----------------------------------------------------------------------
  it('mousedown outside closes dropdown', () => {
    render(<AccountMenu email="a@b.com" onSignOut={onSignOut} />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(screen.getByText('a@b.com')).toBeDefined();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('a@b.com')).toBeNull();
  });
});
