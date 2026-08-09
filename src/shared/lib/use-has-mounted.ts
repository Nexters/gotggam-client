"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

// 서버 렌더링 시점엔 알 수 없는(localStorage 등) 클라이언트 전용 값을 그리기 전에
// hydration이 끝났는지 판단하기 위한 훅. effect에서 setState하지 않아도 되므로
// 불필요한 리렌더 캐스케이드가 없다.
export function useHasMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
