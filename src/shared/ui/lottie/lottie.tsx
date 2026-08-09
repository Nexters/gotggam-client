"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { ComponentProps } from "react";

type LottieProps = Omit<
  ComponentProps<typeof DotLottieReact>,
  "dotLottieRefCallback"
> & {
  /**
   * 더 이상 로드를 기다릴 필요가 없어진 시점에 호출된다. 로드 성공(`load`)뿐
   * 아니라 실패(`loadError`)도 포함하므로, 이 콜백으로 UI를 여는 쪽은 파일을
   * 받지 못해도 영원히 가려지지 않는다.
   *
   * lottie는 wasm과 애니메이션 파일을 모두 받아야 첫 프레임을 그리기 때문에,
   * 마운트 직후엔 캔버스가 비어 있다. 등장 애니메이션을 lottie와 맞추려면
   * 마운트가 아니라 이 시점을 기준으로 삼아야 한다.
   */
  onReady?: () => void;
};

export function Lottie({ onReady, ...props }: LottieProps) {
  return (
    <DotLottieReact
      {...props}
      // dotLottieRefCallback은 canvas ref가 바뀔 때(마운트/언마운트)만 호출된다.
      // 리렌더마다 다시 불리지 않으므로 인라인 함수를 넘겨도 리스너가 중복
      // 등록되지 않는다.
      dotLottieRefCallback={(dotLottie) => {
        if (!dotLottie) return;

        const handleReady = () => onReady?.();

        dotLottie.addEventListener("load", handleReady);
        dotLottie.addEventListener("loadError", handleReady);
      }}
    />
  );
}
