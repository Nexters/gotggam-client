"use client";

import { Lottie } from "@/shared/ui";

type CharacterProps = {
  className: string;
  src?: string | null;
  /** 로티가 첫 프레임을 그릴 수 있게 된 시점(로드 실패 포함). */
  onReady?: () => void;
};

export function Character({ className, src, onReady }: CharacterProps) {
  return (
    <Lottie
      autoplay
      loop
      src={src ?? "/lottie/question_normal.lottie"}
      className={className}
      onReady={onReady}
    />
  );
}
