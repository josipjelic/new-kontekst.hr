import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { usePointerMotion } from './usePointerMotion.js';

function MotionHost() {
  usePointerMotion();
  return null;
}

function stubMatchMedia(rules) {
  return (query) => ({
    matches: Boolean(rules[query]),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

describe('usePointerMotion', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('does not attach pointermove when prefers-reduced-motion is reduce', () => {
    window.matchMedia = stubMatchMedia({
      '(prefers-reduced-motion: reduce)': true,
      '(pointer: fine)': true,
      '(hover: hover)': true,
    });
    const add = vi.spyOn(document, 'addEventListener');
    render(<MotionHost />);
    expect(add).not.toHaveBeenCalledWith('pointermove', expect.any(Function), { passive: true });
  });

  it('does not attach pointermove when pointer is coarse', () => {
    window.matchMedia = stubMatchMedia({
      '(prefers-reduced-motion: reduce)': false,
      '(pointer: fine)': false,
      '(hover: hover)': true,
    });
    const add = vi.spyOn(document, 'addEventListener');
    render(<MotionHost />);
    expect(add).not.toHaveBeenCalledWith('pointermove', expect.any(Function), { passive: true });
  });

  it('attaches pointermove when fine pointer, hover, and motion allowed', () => {
    window.matchMedia = stubMatchMedia({
      '(prefers-reduced-motion: reduce)': false,
      '(pointer: fine)': true,
      '(hover: hover)': true,
    });
    const add = vi.spyOn(document, 'addEventListener');
    render(<MotionHost />);
    expect(add).toHaveBeenCalledWith('pointermove', expect.any(Function), { passive: true });
  });
});
