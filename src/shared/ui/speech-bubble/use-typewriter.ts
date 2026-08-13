"use client";

import { useEffect, useState } from "react";

// 픽셀 게임처럼 딱딱 끊기는 스타카토 리듬: 2글자씩 한 번에 찍고,
// 문장부호 뒤에서는 잠깐 멈춘다.
const CHUNK_SIZE = 2;
const TICK_MS = 70;
const PUNCTUATION_PAUSE_MS = 260;
const PUNCTUATION = /[.,!?…]/;

/** 텍스트를 타자 치듯 드러낸다. text가 바뀌면 처음부터 다시 시작한다. */
export function useTypewriter(text: string) {
  const [visibleLength, setVisibleLength] = useState(0);
  const [prevText, setPrevText] = useState(text);

  // text가 바뀌면 effect가 아니라 렌더 중에 되감는다.
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (prevText !== text) {
    setPrevText(text);
    setVisibleLength(0);
  }

  useEffect(() => {
    // 모션 최소화 환경에서는 즉시 전부 보여준다.
    const chunkSize = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? text.length
      : CHUNK_SIZE;

    let cancelled = false;
    let timerId = 0;

    const scheduleNext = (revealed: number) => {
      if (cancelled || revealed >= text.length) {
        return;
      }

      const next = Math.min(revealed + chunkSize, text.length);
      // 방금 찍은 글자가 문장부호면 다음 덩어리 전에 잠깐 쉰다.
      const pause = PUNCTUATION.test(text[next - 1] ?? "")
        ? PUNCTUATION_PAUSE_MS
        : TICK_MS;

      timerId = window.setTimeout(() => {
        // 사용자가 탭으로 스킵한 뒤에는 되돌리지 않는다.
        setVisibleLength((current) => Math.max(current, next));
        scheduleNext(next);
      }, pause);
    };

    scheduleNext(0);

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [text]);

  return {
    displayedText: text.slice(0, visibleLength),
    isTypingDone: visibleLength >= text.length,
    skipTyping: () => setVisibleLength(text.length),
  };
}
