"use client";

import { cn, useTypewriter } from "@/shared/lib";
import { IconButton, IconButtonNext, Typography } from "@/shared/ui";

import * as styles from "./narration-box.css";

type NarrationBoxProps = {
  text: string;
  onAdvance: () => void;
  className?: string;
};

export function NarrationBox({ text, onAdvance, className }: NarrationBoxProps) {
  const { words, skip, isDone } = useTypewriter(text);

  const handleClick = () => {
    if (!isDone) {
      skip();
      return;
    }
    onAdvance();
  };

  return (
    <div className={cn(styles.narration, className)} onClick={handleClick}>
      <div className={styles.bubble}>
        <Typography
          as="p"
          family="galmuri9"
          size="22"
          color="gray-1"
          className={styles.bubbleText}
        >
          {words}
        </Typography>
      </div>
      <div className={styles.nameTag}>
        <Typography family="galmuri9" size="18" color="accent2-9">
          곧감이
        </Typography>
      </div>
      <IconButton aria-label="다음" className={styles.nextButton}>
        <IconButtonNext />
      </IconButton>
    </div>
  );
}
