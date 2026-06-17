import { describe, it, expect } from 'vitest';
import { computePanelState } from '@/hooks/usePanelProgress';

// computePanelState(scrollTop, viewportH, panelCount) -> { active, progress }
describe('computePanelState', () => {
  it('is panel 0 at the top', () => {
    expect(computePanelState(0, 1000, 8)).toEqual({ active: 0, progress: 0 });
  });
  it('is panel 1 at one viewport down', () => {
    const s = computePanelState(1000, 1000, 8);
    expect(s.active).toBe(1);
    expect(s.progress).toBeCloseTo(0, 5);
  });
  it('reports mid-panel progress', () => {
    const s = computePanelState(1500, 1000, 8);
    expect(s.active).toBe(1);
    expect(s.progress).toBeCloseTo(0.5, 5);
  });
  it('clamps to the last panel', () => {
    expect(computePanelState(99999, 1000, 8).active).toBe(7);
  });
});
