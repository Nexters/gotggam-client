"use client";

import { Lottie } from "@/shared/ui";

type HomeLottieProps = {
  className?: string;
  onReady?: () => void;
};

export function HomeLottie({ className, onReady }: HomeLottieProps) {
  return (
    <Lottie
      autoplay
      src="/lottie/home.lottie"
      className={className}
      onReady={onReady}
    />
  );
}
