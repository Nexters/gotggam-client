"use client";

import { useEffect, useState } from "react";

/** value가 ms 동안 잠잠해진 뒤의 값을 돌려준다. 잦은 입력의 파생 UI 안정화용. */
export function useDebouncedValue<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);

  return debounced;
}
