"use client";

import { useEffect, useState } from "react";

/** 이 이상 뷰포트 높이가 줄면 가상 키보드가 열린 것으로 판정한다. */
const OPEN_THRESHOLD_PX = 100;
/** 뷰포트 높이가 이 프레임 수만큼 연속 불변이면 키보드 애니메이션 종료로 본다. */
const SETTLE_FRAMES = 6;
/** resize 이벤트 난사를 눌러 열림/닫힘 판정을 안정화하는 지연. */
const DEBOUNCE_MS = 100;

/**
 * 가상 키보드가 화면 하단을 덮은 높이(px). 키보드가 닫혀 있거나
 * visualViewport 미지원 환경에서는 0이다.
 *
 * 키보드 애니메이션 도중에는 브라우저의 기본 동작(인풋 노출 스크롤)에
 * 개입하지 않도록, 디바운스 후 뷰포트 높이가 안정된 시점에만 값을 반영한다.
 * iOS가 화면을 팬(pan)한 만큼은 offsetTop으로 상쇄해, 값 그대로
 * translate하면 키보드 위에 붙는다.
 */
export function useKeyboardInset() {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) {
      return;
    }

    let debounceId: ReturnType<typeof setTimeout> | null = null;
    let frameId: number | null = null;

    // 키보드 닫힘 상태에서 저장해둔 기준 높이. window.innerHeight는 환경에
    // 따라(일부 웹뷰) 키보드와 함께 줄어들어 기준으로 못 쓴다.
    let baselineHeight = viewport.height;

    const cancelPending = () => {
      if (debounceId !== null) {
        clearTimeout(debounceId);
        debounceId = null;
      }
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const applyInset = () => {
      const shrink = baselineHeight - viewport.height;
      if (shrink <= OPEN_THRESHOLD_PX) {
        // 닫힘(또는 회전·주소창 변화)으로 안정화 — 현재 높이를 새 기준으로 삼는다.
        baselineHeight = viewport.height;
        setInset(0);
        return;
      }
      // 레이아웃 뷰포트 기준으로 키보드가 실제 가린 양. 레이아웃까지 함께
      // 줄어드는 환경에서는 0에 수렴해 패널을 이중으로 올리지 않는다.
      const covered =
        document.documentElement.clientHeight -
        viewport.height -
        viewport.offsetTop;
      setInset(Math.max(0, Math.round(covered)));
    };

    const settle = () => {
      let lastHeight = viewport.height;
      let stableFrames = 0;

      const tick = () => {
        if (viewport.height === lastHeight) {
          stableFrames += 1;
          if (stableFrames >= SETTLE_FRAMES) {
            frameId = null;
            applyInset();
            return;
          }
        } else {
          lastHeight = viewport.height;
          stableFrames = 0;
        }
        frameId = requestAnimationFrame(tick);
      };

      frameId = requestAnimationFrame(tick);
    };

    const handleViewportChange = () => {
      cancelPending();
      debounceId = setTimeout(() => {
        debounceId = null;
        settle();
      }, DEBOUNCE_MS);
    };

    viewport.addEventListener("resize", handleViewportChange);
    viewport.addEventListener("scroll", handleViewportChange);
    return () => {
      cancelPending();
      viewport.removeEventListener("resize", handleViewportChange);
      viewport.removeEventListener("scroll", handleViewportChange);
    };
  }, []);

  return inset;
}
