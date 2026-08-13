"use client";

import { Lottie } from "@/shared/ui";

type CharacterProps = {
  className: string;
  src?: string | null;
};

export function Character({ className, src }: CharacterProps) {
  return (
    <Lottie
      autoplay
      loop
      src={src ?? "/lottie/question_normal.lottie"}
      className={className}
    />
  );
}
