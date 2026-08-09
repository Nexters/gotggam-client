"use client";

import { useCallback, useSyncExternalStore } from "react";

type SetValue<T> = T | ((prev: T) => T);

const CUSTOM_EVENT = "local-storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CUSTOM_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CUSTOM_EVENT, callback);
  };
}

function getServerSnapshot() {
  return null;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = useCallback(() => window.localStorage.getItem(key), [key]);

  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const value: T = stored !== null ? (JSON.parse(stored) as T) : initialValue;

  const setValue = useCallback(
    (next: SetValue<T>) => {
      const nextValue = next instanceof Function ? next(value) : next;
      window.localStorage.setItem(key, JSON.stringify(nextValue));
      window.dispatchEvent(new Event(CUSTOM_EVENT));
    },
    [key, value],
  );

  return [value, setValue] as const;
}
