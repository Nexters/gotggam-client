import Image from "next/image";

import { cn } from "@/shared/lib";

import * as styles from "./scene-background.css";

type SceneBackgroundProps = {
  src: string;
  /** 배경을 무대 뒤로 밀어내는 어두운 변형 (질문 화면 등). */
  dimmed?: boolean;
};

export function SceneBackground({ src, dimmed = false }: SceneBackgroundProps) {
  return (
    <div className={styles.backgroundLayer}>
      <Image
        src={src}
        alt="배경 이미지"
        fill
        priority
        sizes="(min-width: 480px) 480px, 100vw"
        className={cn(
          styles.backgroundImage,
          dimmed && styles.backgroundImageDimmed,
        )}
      />
      <div
        className={cn(
          styles.backgroundOverlay,
          dimmed && styles.backgroundOverlayDimmed,
        )}
      />
    </div>
  );
}
