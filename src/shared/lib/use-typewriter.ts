"use client";

import { useEffect, useState } from "react";

// 문장부호 뒤에서 잠깐 머물러 말하는 듯한 리듬을 만든다.
function getDelay(previousChar: string | undefined, speed: number) {
  if (previousChar === ",") {
    return speed * 8;
  }
  if (previousChar && [".", "?", "!", "…"].includes(previousChar)) {
    return speed * 16;
  }
  return speed;
}

/** 텍스트를 한 글자씩 드러내는 타이핑 효과. text가 바뀌면 처음부터 다시 시작한다. */
export function useTypewriter(text: string, speed = 25) {
  const [count, setCount] = useState(0);
  const [prevText, setPrevText] = useState(text);

  // effect가 아니라 렌더 중에 리셋해야 이전 대사 길이만큼 잘린 새 대사가
  // 한 프레임 그려지는 깜빡임이 없다.
  if (prevText !== text) {
    setPrevText(text);
    setCount(0);
  }

  const words = text.slice(0, count);
  const isDone = count >= text.length;

  useEffect(() => {
    if (isDone) {
      return;
    }

    const id = setTimeout(
      () => setCount((prev) => prev + 1),
      getDelay(text[count - 1], speed),
    );

    return () => clearTimeout(id);
  }, [count, speed, isDone, text]);

  const skip = () => setCount(text.length);

  return { words, skip, isDone };
}
