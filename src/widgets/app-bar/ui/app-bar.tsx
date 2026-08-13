"use client";

import { useRouter } from "next/navigation";

import { IconButton, IconButtonBack, IconButtonHome } from "@/shared/ui";

import * as styles from "./app-bar.css";

type AppBarProps = {
  /** 뒤로 가기 동작. 페이지가 플로우 되감기 등 맥락에 맞게 정한다. */
  onBack: () => void;
  showHome?: boolean;
};

export function AppBar({ onBack, showHome = true }: AppBarProps) {
  const router = useRouter();

  return (
    <div className={styles.appBar}>
      <IconButton aria-label="뒤로 가기" onClick={onBack}>
        <IconButtonBack />
      </IconButton>
      {showHome && (
        <IconButton aria-label="홈으로 가기" onClick={() => router.push("/")}>
          <IconButtonHome />
        </IconButton>
      )}
    </div>
  );
}
