"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { BGM_STORAGE_KEY, CLICK_SFX_SRC } from "@/shared/config";
import { playSfx, useKeyboardInset, useLocalStorage } from "@/shared/lib";

import * as styles from "./bottom-panel.css";
import { PixelCornerButton, Typography } from "..";

type BottomPanelProps = {
  children: ReactNode;
  ctaLabel: string;
  ctaDisabled?: boolean;
  onCtaClick?: () => void;
};

/** 화면 하단에 블러 배경으로 깔리는 패널 골격. 내용과 CTA 버튼 사이를 책임진다. */
export function BottomPanel({
  children,
  ctaLabel,
  ctaDisabled,
  onCtaClick,
}: BottomPanelProps) {
  const [isSoundOn] = useLocalStorage(BGM_STORAGE_KEY, true);
  const panelRef = useRef<HTMLDivElement>(null);
  const keyboardInset = useKeyboardInset();

  // 키보드가 열리는 동안 브라우저가 인풋을 보이려고 스크롤시킨 조상(.screen 등)을
  // 안정화 판정 후에 되돌린다. 패널만 키보드 위로 올라가고 씬은 제자리에 남는다.
  useEffect(() => {
    if (keyboardInset === 0) {
      return;
    }
    let node = panelRef.current?.parentElement ?? null;
    while (node) {
      if (node.scrollTop !== 0) {
        node.scrollTop = 0;
      }
      node = node.parentElement;
    }
  }, [keyboardInset]);

  return (
    <div
      ref={panelRef}
      className={styles.panel}
      style={{ transform: `translateY(-${keyboardInset}px)` }}
    >
      {children}
      <PixelCornerButton
        cornerSize={4}
        className={styles.ctaButton}
        disabled={ctaDisabled}
        onClick={() => {
          if (isSoundOn) playSfx(CLICK_SFX_SRC);
          onCtaClick?.();
        }}
      >
        <Typography family="galmuri11" size="18">
          {ctaLabel}
        </Typography>
      </PixelCornerButton>
      {keyboardInset > 0 && (
        <div
          className={styles.keyboardBackfill}
          style={{ height: keyboardInset }}
        />
      )}
    </div>
  );
}
