"use client";

import { useEffect, useState } from "react";

const TYPING_INTERVAL_MS = 40;

/** 텍스트를 타자 치듯 한 글자씩 드러낸다. text가 바뀌면 처음부터 다시 시작한다. */
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
    const intervalId = window.setInterval(() => {
      setVisibleLength((length) => {
        if (length >= text.length) {
          window.clearInterval(intervalId);
          return length;
        }
        return length + 1;
      });
    }, TYPING_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [text]);

  return {
    displayedText: text.slice(0, visibleLength),
    isTypingDone: visibleLength >= text.length,
    skipTyping: () => setVisibleLength(text.length),
  };
}
