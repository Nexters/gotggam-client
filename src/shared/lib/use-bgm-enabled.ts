"use client";

import { BGM_STORAGE_KEY } from "@/shared/config";

import { useLocalStorage } from "./use-local-storage";

const BGM_SESSION_ID_KEY = "bgm-session-id";

let sessionScopedKey: string | null = null;

// 새로고침에서는 살아남고 재방문에서는 사라지는 저장소를 만들기 위해, 탭 세션마다
// 새로 발급되는 ID를 BGM 키에 합성한다. sessionStorage의 ID는 새로고침 시 그대로
// 유지되므로 같은 키를 다시 바라보고(= 직전 on/off 유지), 새 탭·재방문에서는 ID가
// 새로 발급돼 저장된 값이 없는 키를 바라본다(= initialValue인 false로 시작).
function getSessionScopedKey() {
  if (typeof window === "undefined") return BGM_STORAGE_KEY;
  if (sessionScopedKey !== null) return sessionScopedKey;

  let sessionId = window.sessionStorage.getItem(BGM_SESSION_ID_KEY);
  if (sessionId === null) {
    sessionId = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(BGM_SESSION_ID_KEY, sessionId);
  }

  sessionScopedKey = `${BGM_STORAGE_KEY}:${sessionId}`;
  return sessionScopedKey;
}

/**
 * BGM on/off 상태를 구독한다. `useLocalStorage`와 동일한 `[value, setValue]`
 * 튜플을 반환하며, 이 훅을 쓰는 모든 컴포넌트가 같은 상태를 공유한다.
 *
 * 새로고침하면 직전 상태가 유지되고, 재방문(새 탭 세션)하면 항상 `false`로 시작한다.
 */
export function useBgmEnabled() {
  return useLocalStorage(getSessionScopedKey(), false);
}
