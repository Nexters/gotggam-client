"use client";

import { IconButton, IconButtonBack } from "@/shared/ui";

import * as styles from "./app-bar.css";

type AppBarProps = {
  /** 뒤로 가기 동작. 페이지가 플로우 되감기 등 맥락에 맞게 정한다. */
  onBack: () => void;
};

/**
 * 토스 빌드에서는 자체 뒤로가기 버튼 자리를 비워 둔다. 토스 네비게이션 바의 뒤로가기는
 * 이 컴포넌트가 아니라 화면이 `useTossBackHandler` 로 직접 등록한다.
 */
export function AppBar({ onBack }: AppBarProps) {
  return (
    <div className={styles.appBar}>
      {process.env.NEXT_PUBLIC_BUILD_TARGET === "toss" ? (
        <span className={styles.spacer} />
      ) : (
        <IconButton aria-label="뒤로 가기" onClick={onBack}>
          <IconButtonBack />
        </IconButton>
      )}
    </div>
  );
}
