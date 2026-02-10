/**
 * Hook managing VexFlow loading + rendering lifecycle.
 * Handles dynamic import, ResizeObserver, theme reactivity.
 */
import { useRef, useState, useEffect, useCallback } from 'react';
import { loadVexFlow } from '../../utils/vexflowLoader';
import { pitchedNoteToVexKey, getVexAccidental } from '../../utils/notationHelpers';
import { useAppStore } from '../../state/store';
import type { PitchedNote } from '../../core/types/music';

interface UseStaffNotationOptions {
  notes: PitchedNote[];
  clef?: 'treble' | 'bass';
  keySignature?: string;
  width?: number;
  height?: number;
  noteColors?: Record<number, string>;
  duration?: string;
}

export function useStaffNotation(options: UseStaffNotationOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const vfRef = useRef<typeof import('vexflow') | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const themeMode = useAppStore((s) => s.themeMode);

  // Load VexFlow
  useEffect(() => {
    let cancelled = false;
    loadVexFlow().then((vf) => {
      if (!cancelled) {
        vfRef.current = vf;
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  // ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Render function
  const render = useCallback(() => {
    const container = containerRef.current;
    const vf = vfRef.current;
    if (!container || !vf || loading) return;

    const w = options.width ?? containerWidth;
    if (w < 50) return; // too small

    const h = options.height ?? 150;
    const clef = options.clef ?? 'treble';
    const duration = options.duration ?? 'q';

    // Clear previous render
    container.innerHTML = '';

    const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = vf;

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(w, h);
    const context = renderer.getContext();

    // Read CSS custom properties for theme colors
    const computedStyle = getComputedStyle(document.documentElement);
    const textColor = computedStyle.getPropertyValue('--text').trim() || '#e4e4e7';

    context.setFont('Arial', 10);
    (context as any).setStrokeStyle?.(textColor);
    (context as any).setFillStyle?.(textColor);

    // Build stave
    const staveX = 10;
    const staveY = Math.max(0, (h - 80) / 2);
    const staveWidth = w - 20;
    const stave = new Stave(staveX, staveY, staveWidth);
    stave.addClef(clef);

    if (options.keySignature) {
      stave.addKeySignature(options.keySignature);
    }

    stave.setContext(context).draw();

    // Build notes
    if (options.notes.length === 0) return;

    const staveNotes = options.notes.map((note, i) => {
      const key = pitchedNoteToVexKey(note);
      const sn = new StaveNote({ keys: [key], duration, clef });

      const acc = getVexAccidental(note);
      if (acc) {
        sn.addModifier(new Accidental(acc), 0);
      }

      // Apply degree color if provided
      if (options.noteColors?.[i]) {
        sn.setStyle({
          fillStyle: options.noteColors[i],
          strokeStyle: options.noteColors[i],
        });
      }

      return sn;
    });

    const voice = new Voice({ numBeats: staveNotes.length, beatValue: 1 })
      .setMode(Voice.Mode.SOFT);
    voice.addTickables(staveNotes);

    new Formatter().joinVoices([voice]).format([voice], staveWidth - 80);
    voice.draw(context, stave);

    // Apply theme colors to SVG elements
    const svg = container.querySelector('svg');
    if (svg) {
      svg.querySelectorAll('line, path').forEach((el) => {
        const elem = el as SVGElement;
        // Only override elements that don't have degree colors set
        if (!elem.style.fill || elem.style.fill === 'none' || elem.style.fill === 'black' || elem.style.fill === '#000000') {
          elem.style.fill = textColor;
        }
        if (!elem.style.stroke || elem.style.stroke === 'none' || elem.style.stroke === 'black' || elem.style.stroke === '#000000') {
          elem.style.stroke = textColor;
        }
      });
      svg.querySelectorAll('text').forEach((el) => {
        if (!el.style.fill || el.style.fill === 'black' || el.style.fill === '#000000') {
          el.style.fill = textColor;
        }
      });
    }
  }, [loading, containerWidth, options.notes, options.clef, options.keySignature, options.width, options.height, options.noteColors, options.duration, themeMode]);

  // Trigger render when dependencies change
  useEffect(() => {
    render();
  }, [render]);

  return { containerRef, loading };
}
