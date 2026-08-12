"use client";

import { cn } from "@/shared/lib";

import NextArrowIcon from "./assets/next-arrow.svg";
import * as styles from "./speech-bubble.css";
import { Typography } from "..";
import { useTypewriter } from "./use-typewriter";

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
  const { displayedText, isTypingDone, skipTyping } = useTypewriter(text);

  const handleClick = () => {
    if (!isTypingDone) {
      skipTyping();
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
          family="galmuri11"
          size="22"
          color="gray-1"
          className={styles.text}
        >
          {displayedText}
        </Typography>
      </span>
      <span className={styles.nameChip}>
        <Typography family="galmuri11" size="18" color="accent2-9">
          {speakerName}
        </Typography>
      </span>
      {isTypingDone && onNext && (
        <NextArrowIcon className={styles.nextIcon} aria-hidden />
      )}
    </button>
  );
}
