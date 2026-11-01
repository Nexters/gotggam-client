"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/shared/lib";

import * as styles from "./scene-background.css";

type SceneBackgroundProps = {
  src: string;
  /** 배경을 무대 뒤로 밀어내는 어두운 변형 (질문 화면 등). */
  dimmed?: boolean;
  /**
   * 현재 배경 이미지가 그려진 시점. 배경과 다른 리소스를 한 번에 등장시키려는
   * 화면이 쓴다. next/image는 ref 콜백에서 `img.complete`를 확인하므로 캐시로
   * 이미 로드가 끝난 경우에도 호출된다.
   */
  onReady?: () => void;
};

type CrossFade = {
  current: string;
  next: string | null;
};

export function SceneBackground({
  src,
  dimmed = false,
  onReady,
}: SceneBackgroundProps) {
  const [fade, setFade] = useState<CrossFade>({ current: src, next: null });
  const [isNextLoaded, setIsNextLoaded] = useState(false);

  // src가 바뀌면 이전 배경을 유지한 채 새 배경을 위에 겹쳐 크로스페이드한다.
  if (src !== (fade.next ?? fade.current)) {
    setFade((prev) =>
      src === prev.current
        ? { current: src, next: null }
        : { ...prev, next: src },
    );
    setIsNextLoaded(false);
  }

  const completeFade = () => {
    setFade((prev) => (prev.next ? { current: prev.next, next: null } : prev));
    setIsNextLoaded(false);
  };

  const imageClassName = cn(
    styles.backgroundImage,
    dimmed && styles.backgroundImageDimmed,
  );

  return (
    <div className={styles.backgroundLayer}>
      <Image
        src={fade.current}
        alt="배경 이미지"
        fill
        priority
        sizes="(min-width: 480px) 480px, 100vw"
        className={imageClassName}
        onLoad={onReady}
      />
      {fade.next && (
        <Image
          src={fade.next}
          alt="배경 이미지"
          fill
          sizes="(min-width: 480px) 480px, 100vw"
          className={cn(
            imageClassName,
            styles.backgroundImageIncoming,
            isNextLoaded && styles.backgroundImageIncomingVisible,
          )}
          onLoad={() => setIsNextLoaded(true)}
          onTransitionEnd={completeFade}
        />
      )}
      <div
        className={cn(
          styles.backgroundOverlay,
          dimmed && styles.backgroundOverlayDimmed,
        )}
      />
    </div>
  );
}
