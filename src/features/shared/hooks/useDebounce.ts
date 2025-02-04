import { useCallback } from 'react';

export function useDebounce<T extends (...args: Parameters<T>) => void>(fn: T, delay: number) {
  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      const handler = setTimeout(() => fn(...args), delay);

      return () => clearTimeout(handler);
    },
    [fn, delay],
  );

  return debouncedFn;
}
