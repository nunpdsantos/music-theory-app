import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useToastStore, toast } from '../toastStore';

describe('toastStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useToastStore.setState({ toasts: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds a toast', () => {
    toast('Hello', 'info');
    expect(useToastStore.getState().toasts).toHaveLength(1);
    expect(useToastStore.getState().toasts[0].message).toBe('Hello');
    expect(useToastStore.getState().toasts[0].type).toBe('info');
  });

  it('auto-removes toast after duration', () => {
    toast('Temp', 'success', 2000);
    expect(useToastStore.getState().toasts).toHaveLength(1);
    vi.advanceTimersByTime(2000);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('manually removes a toast', () => {
    toast('Remove me', 'warning');
    const id = useToastStore.getState().toasts[0].id;
    useToastStore.getState().removeToast(id);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('limits to 5 visible toasts', () => {
    for (let i = 0; i < 7; i++) {
      toast(`Toast ${i}`, 'info', 0);
    }
    expect(useToastStore.getState().toasts.length).toBeLessThanOrEqual(5);
  });

  it('defaults to info type and 3s duration', () => {
    toast('Default');
    const t = useToastStore.getState().toasts[0];
    expect(t.type).toBe('info');
    expect(t.duration).toBe(3000);
    vi.advanceTimersByTime(3000);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});
