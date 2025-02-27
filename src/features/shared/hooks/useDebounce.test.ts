import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

// Mock implementation for testing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Initial value
    expect(result.current).toBe('initial');

    // Change the value
    rerender({ value: 'changed', delay: 500 });

    // Value should still be initial (not debounced yet)
    expect(result.current).toBe('initial');

    // Fast-forward time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should now be updated
    expect(result.current).toBe('changed');
  });

  it('should reset timer when value changes during delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Change the value
    rerender({ value: 'changed', delay: 500 });

    // Fast-forward time by 200ms (not enough time)
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Value should still be initial
    expect(result.current).toBe('initial');

    // Change the value again, which should reset the timer
    rerender({ value: 'changed again', delay: 500 });

    // Fast-forward time by 300ms (still not enough for the new timeout)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Value should still be initial
    expect(result.current).toBe('initial');

    // Fast-forward time by 200ms more (full 500ms for second change)
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Now the value should be updated to the latest
    expect(result.current).toBe('changed again');
  });
});
