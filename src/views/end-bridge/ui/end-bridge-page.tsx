"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Lottie } from "@/shared/ui";

import * as styles from "./end-bridge-page.css";

export function EndBridgePage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.backgroundLayer}>
        <Image
          src="/images/landing/background.png"
          alt=""
          fill
          priority
          sizes="(min-width: 480px) 480px, 100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundOverlay} />
      </div>

      <div className={styles.content}>
        <Lottie
          autoplay
          loop
          src="/lottie/question_normal.lottie"
          className={styles.character}
          onReady={() => setIsReady(true)}
        />
      </div>

      {isReady && (
        <div
          className={styles.blackoutOverlay}
          onAnimationEnd={() => router.replace("/")}
        />
      )}
    </div>
  );
}
