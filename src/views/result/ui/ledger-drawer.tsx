"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/shared/lib";

import * as styles from "./ledger-drawer.css";

const TAP_THRESHOLD_PX = 6;
const FLICK_THRESHOLD_PX = 24;

type LedgerDrawerProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  /** 드래그 중 열림 정도(0=닫힘, 1=열림). 카드 크기 보간에 쓴다. */
  onDragProgress?: (progress: number | null) => void;
  children: ReactNode;
};

/**
 * 명부 메뉴 바텀시트. 핸들을 탭하면 토글, 드래그하면 손가락을 따라 움직이고
 * 놓으면 가까운 상태(또는 튕긴 방향)로 스냅한다.
 */
export function LedgerDrawer({
  isOpen,
  onOpenChange,
  onDragProgress,
  children,
}: LedgerDrawerProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startOffsetRef = useRef(0);
  const closedOffsetRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [dragOffset, setDragOffset] = useState<number | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    const sheet = sheetRef.current;
    if (!sheet) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    closedOffsetRef.current = sheet.offsetHeight - styles.DRAWER_PEEK;
    startYRef.current = event.clientY;
    startOffsetRef.current = isOpen ? 0 : closedOffsetRef.current;
    hasMovedRef.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    const deltaY = event.clientY - startYRef.current;
    if (Math.abs(deltaY) > TAP_THRESHOLD_PX) {
      hasMovedRef.current = true;
    }
    const closedOffset = closedOffsetRef.current;
    const offset = Math.min(
      Math.max(startOffsetRef.current + deltaY, 0),
      closedOffset,
    );
    setDragOffset(offset);
    onDragProgress?.(closedOffset > 0 ? 1 - offset / closedOffset : 1);
  };

  const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);

    if (!hasMovedRef.current) {
      setDragOffset(null);
      onDragProgress?.(null);
      onOpenChange(!isOpen);
      return;
    }

    const deltaY = event.clientY - startYRef.current;
    const offset = dragOffset ?? startOffsetRef.current;
    let nextOpen = offset < closedOffsetRef.current / 2;
    // 짧고 빠른 스와이프는 방향을 우선한다.
    if (deltaY <= -FLICK_THRESHOLD_PX) {
      nextOpen = true;
    } else if (deltaY >= FLICK_THRESHOLD_PX) {
      nextOpen = false;
    }

    setDragOffset(null);
    onDragProgress?.(null);
    onOpenChange(nextOpen);
  };

  return (
    <div
      ref={sheetRef}
      className={cn(
        styles.sheet,
        isOpen && styles.sheetOpen,
        dragOffset !== null && styles.sheetDragging,
      )}
      style={
        dragOffset !== null
          ? { transform: `translateY(${dragOffset}px)` }
          : undefined
      }
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "메뉴 내리기" : "메뉴 올리기"}
        className={styles.handleArea}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className={styles.handleBar} aria-hidden />
      </button>
      {children}
    </div>
  );
}
