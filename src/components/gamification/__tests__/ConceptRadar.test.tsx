import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConceptRadar } from '../ConceptRadar';
import { useConceptStore } from '../../../state/conceptStore';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'concepts.radarTitle': 'Concept Mastery',
        'concepts.noteReading': 'Notes',
        'concepts.intervals': 'Intervals',
        'concepts.scales': 'Scales',
        'concepts.chords': 'Chords',
        'concepts.scaleDegrees': 'Degrees',
        'concepts.earTraining': 'Ear',
      };
      return map[key] ?? key;
    },
  }),
}));

beforeEach(() => {
  useConceptStore.setState({ concepts: {} });
});

describe('ConceptRadar', () => {
  it('renders without crashing with no data', () => {
    const { container } = render(<ConceptRadar />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders the title', () => {
    render(<ConceptRadar />);
    expect(screen.getAllByText('Concept Mastery').length).toBeGreaterThan(0);
  });

  it('renders grid rings', () => {
    const { container } = render(<ConceptRadar />);
    const polygons = container.querySelectorAll('polygon');
    // 4 rings + 0 mastery polygon (no data) = 4
    expect(polygons.length).toBe(4);
  });

  it('renders axis labels', () => {
    render(<ConceptRadar />);
    expect(screen.getAllByText('Notes').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Intervals').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Scales').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Chords').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Degrees').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Ear').length).toBeGreaterThan(0);
  });

  it('renders mastery polygon when data exists', () => {
    useConceptStore.setState({
      concepts: {
        intervals: {
          correct: 8,
          total: 10,
          history: [{ date: '2026-02-10', correct: 8, total: 10 }],
        },
        chords: {
          correct: 5,
          total: 10,
          history: [{ date: '2026-02-10', correct: 5, total: 10 }],
        },
      },
    });

    const { container } = render(<ConceptRadar />);
    const polygons = container.querySelectorAll('polygon');
    // 4 rings + 1 mastery polygon = 5
    expect(polygons.length).toBe(5);
  });

  it('renders data point circles when data exists', () => {
    useConceptStore.setState({
      concepts: {
        intervals: {
          correct: 8,
          total: 10,
          history: [{ date: '2026-02-10', correct: 8, total: 10 }],
        },
      },
    });

    const { container } = render(<ConceptRadar />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);
  });

  it('accepts custom accent color', () => {
    useConceptStore.setState({
      concepts: {
        intervals: {
          correct: 5,
          total: 5,
          history: [{ date: '2026-02-10', correct: 5, total: 5 }],
        },
      },
    });

    const { container } = render(<ConceptRadar accentColor="#F59E0B" />);
    const masteryPolygon = container.querySelectorAll('polygon')[4]; // 5th polygon
    expect(masteryPolygon?.getAttribute('stroke')).toBe('#F59E0B');
  });
});
