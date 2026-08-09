"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type HomeLottieProps = {
  className?: string;
};

export function HomeLottie({ className }: HomeLottieProps) {
  return (
    <DotLottieReact autoplay src="/lottie/home.lottie" className={className} />
  );
}
