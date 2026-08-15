"use client";

import { useEffect, useState } from "react";

import { Typography } from "@/shared/ui";

import * as styles from "./ledger-preview-modal.css";

type LedgerPreviewModalProps = {
  /** [앞장, 뒷장] object URL */
  imageUrls: string[];
  onSave: () => void;
  onClose: () => void;
};

/** 명부 저장 전 미리보기. 모바일은 이미지를 길게 눌러 바로 저장할 수도 있다. */
export function LedgerPreviewModal({
  imageUrls,
  onSave,
  onClose,
}: LedgerPreviewModalProps) {
  const [isTouchDevice] = useState(
    () => window.matchMedia("(pointer: coarse)").matches,
  );

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
        <div className={styles.images}>
          {imageUrls.map((url, index) => (
            // 캔버스로 만든 blob URL이라 next/image 최적화 대상이 아니다.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={index === 0 ? "명부 앞장 미리보기" : "명부 뒷장 미리보기"}
              className={styles.image}
            />
          ))}
        </div>
        <Typography
          family="galmuri9"
          size="14"
          color="gray-11"
          className={styles.hint}
        >
          {isTouchDevice
            ? "이미지를 꾹 눌러 바로 저장할 수도 있다냥"
            : "명부 앞장과 뒷장이 함께 저장된다냥"}
        </Typography>
        <button type="button" className={styles.saveButton} onClick={onSave}>
          <Typography family="galmuri9" size="16" color="white">
            이미지 저장
          </Typography>
        </button>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <Typography family="galmuri9" size="14" color="gray-11">
            닫기
          </Typography>
        </button>
      </div>
    </div>
  );
}
