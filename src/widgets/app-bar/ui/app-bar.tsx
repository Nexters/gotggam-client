"use client";

import { IconButton, IconButtonBack } from "@/shared/ui";

import * as styles from "./app-bar.css";

type AppBarProps = {
  /** 뒤로 가기 동작. 페이지가 플로우 되감기 등 맥락에 맞게 정한다. */
  onBack: () => void;
};

export function AppBar({ onBack }: AppBarProps) {
  return (
    <div className={styles.appBar}>
      <IconButton aria-label="뒤로 가기" onClick={onBack}>
        <IconButtonBack />
      </IconButton>
    </div>
  );
}
