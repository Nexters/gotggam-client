import { useEffect } from "react";

let screenBackHandler: (() => void) | null = null;

/**
 * 토스 네비게이션 바·시스템 뒤로가기(`backEvent`)를 받을 화면별 뒤로가기 동작을
 * 등록한다. 화면이 마운트된 동안만 유효하다.
 * 웹 빌드에서는 아무것도 하지 않는다.
 */
export function useTossBackHandler(onBack: () => void) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BUILD_TARGET !== "toss") {
      return;
    }
    screenBackHandler = onBack;
    return () => {
      if (screenBackHandler === onBack) {
        screenBackHandler = null;
      }
    };
  }, [onBack]);
}

/** 지금 화면이 등록한 토스 뒤로가기 동작. 없으면 `null`. */
export function getTossBackHandler() {
  return screenBackHandler;
}
