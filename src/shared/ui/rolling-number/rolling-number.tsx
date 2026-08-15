"use client";

import { type CSSProperties, useEffect, useState } from "react";

import { cn } from "@/shared/lib";

import * as styles from "./rolling-number.css";

const CELLS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const STAGGER_MS = 70;

type Slot =
  | { kind: "digit"; key: string; place: number; order: number }
  | { kind: "separator"; key: string; char: string };

function toSlots(text: string): Slot[] {
  const digitCount = text.replace(/\D/g, "").length;
  let order = 0;

  return [...text].map((char, index) => {
    if (!/\d/.test(char)) {
      return { kind: "separator", key: `separator-${index}`, char };
    }

    const place = digitCount - 1 - order;
    const slot: Slot = { kind: "digit", key: `digit-${place}`, place, order };
    order += 1;

    return slot;
  });
}

function digitAt(value: number, place: number): number {
  return Math.floor(value / 10 ** place) % 10;
}

type RollingNumberProps = {
  /** 0 이상의 정수. 소수점과 음수는 잘라낸다. */
  value: number;
  /** false면 0에 멈춰 있다가, true로 바뀐 시점에 굴러간다. */
  isPlaying?: boolean;
  className?: string;
};

export function RollingNumber({
  value,
  isPlaying = true,
  className,
}: RollingNumberProps) {
  const targetValue = Math.max(0, Math.trunc(value));
  const [rolledValue, setRolledValue] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    let paintedFrame = 0;
    const mountedFrame = requestAnimationFrame(() => {
      paintedFrame = requestAnimationFrame(() => setRolledValue(targetValue));
    });

    return () => {
      cancelAnimationFrame(mountedFrame);
      cancelAnimationFrame(paintedFrame);
    };
  }, [targetValue, isPlaying]);

  const formatted = targetValue.toLocaleString("ko-KR");

  return (
    <span className={cn(styles.root, className)}>
      <span className={styles.srOnly}>{formatted}</span>

      <span aria-hidden>
        {toSlots(formatted).map((slot) =>
          slot.kind === "separator" ? (
            <span key={slot.key}>{slot.char}</span>
          ) : (
            <span key={slot.key} className={styles.digit}>
              <span className={styles.placeholder}>0</span>
              <span
                className={styles.strip}
                style={
                  {
                    transform: `translateY(-${digitAt(rolledValue, slot.place) * 100}%)`,
                    [styles.rollDelayVar]: `${slot.order * STAGGER_MS}ms`,
                  } as CSSProperties
                }
              >
                {CELLS.map((cell) => (
                  <span key={cell} className={styles.cell}>
                    {cell}
                  </span>
                ))}
              </span>
            </span>
          ),
        )}
      </span>
    </span>
  );
}
