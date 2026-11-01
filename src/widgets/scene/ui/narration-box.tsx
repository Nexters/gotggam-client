"use client";

import { cn } from "@/shared/lib";
import { SpeechBubble } from "@/shared/ui";

import * as styles from "./narration-box.css";

type NarrationBoxProps = {
  text: string;
  onAdvance: () => void;
  className?: string;
};

/** 장면 하단에 고정된 곧감이 말풍선. 모양·타이핑은 SpeechBubble과 동일하다. */
export function NarrationBox({
  text,
  onAdvance,
  className,
}: NarrationBoxProps) {
  return (
    <SpeechBubble
      text={text}
      onNext={onAdvance}
      className={cn(styles.narration, className)}
    />
  );
}
