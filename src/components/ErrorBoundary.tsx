import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** When this value changes, the boundary resets (clears the error). */
  resetKey?: string;
  /** Custom fallback UI. If omitted, renders the default full-page error card. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const error = this.state.error ?? new Error('An unexpected error occurred.');

      if (this.props.fallback) {
        return this.props.fallback(error, this.handleReset);
      }

      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#09090b',
            color: '#fafafa',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: 420,
              padding: 32,
              borderRadius: 16,
              border: '1px solid #27272a',
              backgroundColor: '#18181b',
              textAlign: 'center',
            }}
          >
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: 14, color: '#a1a1aa', marginBottom: 20 }}>
              {error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                backgroundColor: '#3b82f6',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
