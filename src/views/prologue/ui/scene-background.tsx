import Image from "next/image";

import * as styles from "./scene-background.css";

type SceneBackgroundProps = {
  src: string;
};

export function SceneBackground({ src }: SceneBackgroundProps) {
  return (
    <div className={styles.backgroundLayer}>
      <Image
        src={src}
        alt="배경 이미지"
        fill
        priority
        sizes="(min-width: 480px) 480px, 100vw"
        className={styles.backgroundImage}
      />
      <div className={styles.backgroundOverlay} />
    </div>
  );
}
