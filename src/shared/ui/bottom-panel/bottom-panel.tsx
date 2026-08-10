"use client";

import type { ReactNode } from "react";

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
  return (
    <div className={styles.panel}>
      {children}
      <PixelCornerButton
        cornerSize={4}
        className={styles.ctaButton}
        disabled={ctaDisabled}
        onClick={onCtaClick}
      >
        <Typography family="galmuri11" size="18">
          {ctaLabel}
        </Typography>
      </PixelCornerButton>
    </div>
  );
}
