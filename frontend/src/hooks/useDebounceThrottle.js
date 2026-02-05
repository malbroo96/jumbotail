import { useEffect, useRef } from "react";

/**
 * Debounce hook: delays execution until after delay ms of no invocations
 */
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedCallback = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Throttle hook: executes at most once per delay ms
 */
export function useThrottle(callback, delay) {
  const lastRunRef = useRef(Date.now());

  const throttledCallback = (...args) => {
    const now = Date.now();
    if (now - lastRunRef.current >= delay) {
      callback(...args);
      lastRunRef.current = now;
    }
  };

  return throttledCallback;
}
