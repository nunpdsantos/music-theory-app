import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ChromaticStrip } from '../ChromaticStrip';
import type { Note } from '../../../core/types/music';

afterEach(cleanup);

const C: Note = { natural: 'C', accidental: '' };
const SHARP_NOTES: Note[] = [
  { natural: 'C', accidental: '' },
  { natural: 'C', accidental: '#' },
  { natural: 'D', accidental: '' },
  { natural: 'D', accidental: '#' },
  { natural: 'E', accidental: '' },
  { natural: 'F', accidental: '' },
  { natural: 'F', accidental: '#' },
  { natural: 'G', accidental: '' },
  { natural: 'G', accidental: '#' },
  { natural: 'A', accidental: '' },
  { natural: 'A', accidental: '#' },
  { natural: 'B', accidental: '' },
  { natural: 'C', accidental: '' }, // step 12 = octave
];

function makeProps(activeSteps: Set<number>, onToggleStep = vi.fn()) {
  return {
    rootNote: C,
    noteAtStep: (step: number) => SHARP_NOTES[step],
    activeSteps,
    onToggleStep,
  };
}

describe('ChromaticStrip', () => {
  it('renders 13 blocks (root + 12 chromatic steps)', () => {
    render(<ChromaticStrip {...makeProps(new Set([0]))} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(13);
  });

  it('locks the root block (block 0) — disabled, click does nothing', () => {
    const onToggleStep = vi.fn();
    render(<ChromaticStrip {...makeProps(new Set([0]), onToggleStep)} />);
    const root = screen.getAllByRole('button')[0] as HTMLButtonElement;
    expect(root.disabled).toBe(true);
    fireEvent.click(root);
    expect(onToggleStep).not.toHaveBeenCalled();
  });

  it('clicking a non-root block calls onToggleStep with that step', () => {
    const onToggleStep = vi.fn();
    render(<ChromaticStrip {...makeProps(new Set([0]), onToggleStep)} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[4]); // M3 → E
    expect(onToggleStep).toHaveBeenCalledWith(4);
  });

  it('marks active blocks via aria-pressed', () => {
    render(<ChromaticStrip {...makeProps(new Set([0, 4, 7]))} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[4].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[7].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[5].getAttribute('aria-pressed')).toBe('false');
  });

  it('shows scale-degree number on in-key blocks when given a key context', () => {
    // C major scale: pitch classes {0, 2, 4, 5, 7, 9, 11}
    const inKeyPCs = new Set([0, 2, 4, 5, 7, 9, 11]);
    const pcToDeg = (pc: number) => {
      const map: Record<number, number> = { 0: 1, 2: 2, 4: 3, 5: 4, 7: 5, 9: 6, 11: 7 };
      return map[pc];
    };
    render(
      <ChromaticStrip
        {...makeProps(new Set([0]))}
        inKeyPitchClasses={inKeyPCs}
        pitchClassAtStep={(step) => step % 12}
        pitchClassToDegree={pcToDeg}
      />
    );
    const buttons = screen.getAllByRole('button');
    // Block 4 = E = scale degree 3 in C major; the degree label "3" should be in the block.
    expect(buttons[4].textContent).toContain('3');
    // Block 1 = C# = not in C major scale; no degree label.
    expect(buttons[1].textContent).not.toMatch(/\b[1-7]\b/);
  });

  it('keyboard shortcut "1" toggles step 1', () => {
    const onToggleStep = vi.fn();
    render(<ChromaticStrip {...makeProps(new Set([0]), onToggleStep)} />);
    fireEvent.keyDown(window, { key: '1' });
    expect(onToggleStep).toHaveBeenCalledWith(1);
  });
});
