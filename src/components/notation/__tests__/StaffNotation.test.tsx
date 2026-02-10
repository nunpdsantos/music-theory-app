import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StaffNotationSkeleton } from '../StaffNotationSkeleton';

// Mock VexFlow since it requires full DOM/SVG rendering
vi.mock('../../../utils/vexflowLoader', () => ({
  loadVexFlow: vi.fn(() => new Promise(() => {})), // never resolves in test
}));

describe('StaffNotationSkeleton', () => {
  it('renders with default height', () => {
    const { container } = render(<StaffNotationSkeleton />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.height).toBe('150px');
  });

  it('renders with custom height', () => {
    const { container } = render(<StaffNotationSkeleton height={100} />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.height).toBe('100px');
  });

  it('renders 5 staff lines', () => {
    const { container } = render(<StaffNotationSkeleton />);
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBe(5);
  });

  it('has pulse animation class', () => {
    const { container } = render(<StaffNotationSkeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('animate-pulse');
  });
});
