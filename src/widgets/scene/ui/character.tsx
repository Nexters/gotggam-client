"use client";

import { Lottie } from "@/shared/ui";

type CharacterProps = {
  /** 배치·크기는 화면마다 달라 사용처가 정한다. */
  className: string;
};

export function Character({ className }: CharacterProps) {
  return (
    <Lottie
      autoplay
      loop
      src="/lottie/question_normal.lottie"
      className={className}
    />
  );
}
