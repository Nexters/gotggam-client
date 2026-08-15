"use client";

import { useEffect } from "react";

import { Typography } from "@/shared/ui";

import * as styles from "./link-copied-modal.css";

type LinkCopiedModalProps = {
  onClose: () => void;
};

/** 테스트 공유하기 → 링크 복사 완료 안내 모달. Figma [card_drawer > alert] */
export function LinkCopiedModal({ onClose }: LinkCopiedModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div role="dialog" aria-modal="true" className={styles.panel}>
        <span className={styles.checkCircle} aria-hidden>
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
            <path
              d="M2 10.5L9.5 18L24 2"
              stroke="#121212"
              strokeWidth="3.4"
              strokeLinecap="square"
            />
          </svg>
        </span>
        <Typography family="galmuri9" size="16" className={styles.message}>
          링크가 복사 되었습니다
        </Typography>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <Typography family="galmuri9" size="16" color="white">
            닫기
          </Typography>
        </button>
      </div>
    </div>
  );
}
