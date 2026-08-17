"use client";

import type { ReactNode } from "react";
import { Drawer } from "vaul";

import { CLICK_SFX_SRC } from "@/shared/config";
import { playSfx, useBgmEnabled } from "@/shared/lib";
import { getTypographyClassName } from "@/shared/styles";

import * as styles from "./bottom-sheet.css";
import { IconButton, IconButtonClose, PixelCornerButton, Typography } from "..";

type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

/** 손잡이를 끌어 내리거나 닫기 버튼으로 닫는 하단 시트. 본문은 시트 안에서 스크롤된다. */
export function BottomSheet({
  open,
  onOpenChange,
  title,
  children,
  ctaLabel,
  onCtaClick,
}: BottomSheetProps) {
  const [isSoundOn] = useBgmEnabled();

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content} aria-describedby={undefined}>
          <Drawer.Handle className={styles.handle} />

          <div className={styles.header}>
            <Drawer.Title
              className={getTypographyClassName({
                family: "spoqa",
                weight: "medium",
                size: "20",
                color: "gray-11",
              })}
            >
              {title}
            </Drawer.Title>
            <Drawer.Close asChild>
              <IconButton aria-label="닫기" className={styles.closeButton}>
                <IconButtonClose className={styles.closeIcon} />
              </IconButton>
            </Drawer.Close>
          </div>

          <div className={styles.body}>{children}</div>

          {ctaLabel && (
            <div className={styles.footer}>
              <PixelCornerButton
                cornerSize={4}
                className={styles.ctaButton}
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
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
