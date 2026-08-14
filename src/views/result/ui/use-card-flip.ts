"use client";

import { useRef, useState, type PointerEvent } from "react";

import { BGM_STORAGE_KEY, CLICK_SFX_SRC } from "@/shared/config";
import { playSfx, useLocalStorage } from "@/shared/lib";

const DRAG_DEG_PER_PX = 0.7;
const TAP_THRESHOLD_PX = 6;

function snapToFace(rotation: number) {
  return Math.round(rotation / 180) * 180;
}

export type CardFlipHandlers = {
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLDivElement>) => void;
};

/**
 * 카드 드래그 회전 상태. Pointer Events 기반이라 마우스·터치가 동일하게 동작한다.
 * 드래그를 놓으면 가까운 면(180° 배수)으로 스냅하고, 탭(이동 없음)은 뒤집기로 처리한다.
 */
export function useCardFlip() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSoundOn] = useLocalStorage(BGM_STORAGE_KEY, true);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const hasMovedRef = useRef(false);

  const flip = () => {
    if (isSoundOn) {
      playSfx(CLICK_SFX_SRC);
    }
    setRotation((current) => snapToFace(current) + 180);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    startXRef.current = event.clientX;
    startRotationRef.current = rotation;
    hasMovedRef.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }
    const deltaX = event.clientX - startXRef.current;
    if (Math.abs(deltaX) > TAP_THRESHOLD_PX) {
      hasMovedRef.current = true;
    }
    setRotation(startRotationRef.current + deltaX * DRAG_DEG_PER_PX);
  };

  const endDrag = () => {
    if (!isDragging) {
      return;
    }
    setIsDragging(false);
    if (hasMovedRef.current) {
      setRotation(snapToFace);
      return;
    }
    flip();
  };

  const handlers: CardFlipHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  };

  return { rotation, isDragging, flip, handlers };
}
