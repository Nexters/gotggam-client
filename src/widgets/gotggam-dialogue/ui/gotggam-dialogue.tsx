"use client";

import { useState } from "react";

import { cn } from "@/shared/lib";
import { Lottie, SpeechBubble } from "@/shared/ui";

import * as styles from "./gotggam-dialogue.css";

type GotggamDialogueProps = {
  lines: string[];
  /** 마지막 대사에서 탭했을 때 */
  onComplete: () => void;
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

  const goNext = () => {
    if (lineIndex >= lines.length - 1) {
      onComplete();
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
        <SpeechBubble text={lines[lineIndex]} onNext={goNext} />
      </div>
    </div>
  );
}
