"use client";

import type { ReactNode } from "react";

import { BGM_STORAGE_KEY, CLICK_SFX_SRC } from "@/shared/config";
import { playSfx, useLocalStorage } from "@/shared/lib";

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

  return (
    <div className={styles.panel}>
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
    </div>
  );
}
