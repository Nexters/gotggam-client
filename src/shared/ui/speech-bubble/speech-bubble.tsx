"use client";

import { useEffect, useRef } from "react";

import { cn, playAnimalese, useBgmEnabled, useTypewriter } from "@/shared/lib";

import NextArrowIcon from "./assets/next-arrow.svg";
import * as styles from "./speech-bubble.css";
import { Typography } from "..";

type SpeechBubbleProps = {
  text: string;
  speakerName?: string;
  /** 대사가 끝난 뒤 탭했을 때. 타이핑 중 탭은 타이핑 완료로 처리된다. */
  onNext?: () => void;
  className?: string;
};

export function SpeechBubble({
  text,
  speakerName = "곧감이",
  onNext,
  className,
}: SpeechBubbleProps) {
  const { words, skip, isDone } = useTypewriter(text);
  const [isSoundOn] = useBgmEnabled();
  const prevLengthRef = useRef(0);

  // 타이핑으로 글자가 하나 늘었을 때만 그 음절의 말소리(Animalese)를 낸다.
  // skip(한 번에 전체 공개)이나 대사 교체 시에는 소리를 내지 않는다.
  useEffect(() => {
    const prevLength = prevLengthRef.current;
    prevLengthRef.current = words.length;
    if (isSoundOn && words.length === prevLength + 1) {
      playAnimalese(words[words.length - 1]);
    }
  }, [words, isSoundOn]);

  const handleClick = () => {
    if (!isDone) {
      skip();
      return;
    }
    onNext?.();
  };

  return (
    <button
      type="button"
      className={cn(styles.root, className)}
      onClick={handleClick}
    >
      <span className={styles.box}>
        <Typography
          as="span"
          family="galmuri9"
          size="22"
          color="gray-1"
          className={styles.text}
        >
          {words}
        </Typography>
      </span>
      <span className={styles.nameChip}>
        <Typography family="galmuri9" size="18" color="accent2-9">
          {speakerName}
        </Typography>
      </span>
      {isDone && onNext && (
        <NextArrowIcon className={styles.nextIcon} aria-hidden />
      )}
    </button>
  );
}
