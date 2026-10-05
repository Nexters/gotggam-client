"use client";

import { graniteEvent, Screen } from "@apps-in-toss/web-framework";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { getTossBackHandler } from "@/shared/lib";

/**
 * 토스 뒤로가기(`backEvent`)를 구독한다. 구독하면 토스의 기본 뒤로가기가 막히므로
 * 화면이 등록한 동작을 먼저 실행하고, 없으면 랜딩에서는 미니앱을 닫고 그 밖에서는
 * 히스토리를 되돌린다.
 */
export function TossBackEvent() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(
    () =>
      graniteEvent.addEventListener("backEvent", {
        onEvent: () => {
          const screenBackHandler = getTossBackHandler();
          if (screenBackHandler) {
            screenBackHandler();
            return;
          }
          if (pathnameRef.current === "/") {
            void Screen.close();
            return;
          }
          router.back();
        },
        onError: (error) => console.error("토스 뒤로가기 이벤트 오류:", error),
      }),
    [router],
  );

  return null;
}
