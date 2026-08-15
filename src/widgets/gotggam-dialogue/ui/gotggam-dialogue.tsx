"use client";

import { useState } from "react";

import { cn } from "@/shared/lib";
import { Lottie, SpeechBubble } from "@/shared/ui";

import * as styles from "./gotggam-dialogue.css";

type GotggamDialogueProps = {
  /** 대사 목록. 생략하면 말풍선 없이 곧감이만 보여준다(캐릭터 위치는 동일하게 유지). */
  lines?: string[];
  /** 마지막 대사에서 탭했을 때. 생략하면 마지막 대사에서 진행 표시(▼) 없이 머문다. */
  onComplete?: () => void;
  className?: string;
};

/** 곧감이(로티)가 대사를 순서대로 말하는 씬. 배경은 사용처가 깐다. */
export function GotggamDialogue({
  lines,
  onComplete,
  className,
}: GotggamDialogueProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [isCharacterReady, setIsCharacterReady] = useState(false);

  const hasLines = !!lines && lines.length > 0;
  const isLastLine = !hasLines || lineIndex >= lines.length - 1;

  const goNext = () => {
    if (isLastLine) {
      onComplete?.();
      return;
    }
    setLineIndex((index) => index + 1);
  };

  return (
    <div className={cn(styles.scene, className)}>
      <div className={styles.characterArea}>
        <Lottie
          autoplay
          loop
          src="/lottie/question_normal.lottie"
          className={cn(
            styles.character,
            isCharacterReady && styles.characterVisible,
          )}
          onReady={() => setIsCharacterReady(true)}
        />
      </div>
      <div className={styles.bubbleArea}>
        {hasLines ? (
          <SpeechBubble
            text={lines[lineIndex]}
            onNext={isLastLine && !onComplete ? undefined : goNext}
          />
        ) : (
          <div className={styles.bubblePlaceholder} aria-hidden />
        )}
      </div>
    </div>
  );
}
