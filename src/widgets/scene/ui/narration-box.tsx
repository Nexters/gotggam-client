"use client";

import { useEffect, useRef } from "react";

import { BGM_STORAGE_KEY } from "@/shared/config";
import {
  cn,
  playAnimalese,
  useLocalStorage,
  useTypewriter,
} from "@/shared/lib";
import { IconButton, IconButtonNext, Typography } from "@/shared/ui";

import * as styles from "./narration-box.css";

type NarrationBoxProps = {
  text: string;
  onAdvance: () => void;
  className?: string;
};

export function NarrationBox({ text, onAdvance, className }: NarrationBoxProps) {
  const { words, skip, isDone } = useTypewriter(text);
  const [isSoundOn] = useLocalStorage(BGM_STORAGE_KEY, true);
  const prevLengthRef = useRef(0);

  // 타이핑으로 글자가 하나 늘었을 때만 그 음절의 말소리를 낸다.
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
