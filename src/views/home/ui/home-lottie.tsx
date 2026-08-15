"use client";

import { Lottie } from "@/shared/ui";

type HomeLottieProps = {
  className?: string;
  isPlaying?: boolean;
  onReady?: () => void;
};

export function HomeLottie({ className, isPlaying, onReady }: HomeLottieProps) {
  return (
    <Lottie
      src="/lottie/home.lottie"
      className={className}
      isPlaying={isPlaying}
      onReady={onReady}
    />
  );
}
