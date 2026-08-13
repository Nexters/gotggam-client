"use client";

import { Lottie } from "@/shared/ui";

type CharacterProps = {
  className: string;
  src?: string;
};

export function Character({
  className,
  src = "/lottie/question_normal.lottie",
}: CharacterProps) {
  return <Lottie autoplay loop src={src} className={className} />;
}
