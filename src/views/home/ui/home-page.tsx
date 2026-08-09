"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/shared/lib";

import Logo from "../assets/logo.svg";
import { BgmToggleButton } from "./bgm-toggle-button";
import { HomeLottie } from "./home-lottie";
import * as styles from "./home-page.css";
import { StartButton } from "./start-button";

export function HomePage() {
  // 마운트가 아니라 lottie 로드 완료를 기준으로 연다. 마운트 시점엔 캔버스가
  // 아직 비어 있어서, 로고·버튼만 먼저 뜨고 캐릭터가 뒤늦게 튀어나온다.
  const [isReady, setIsReady] = useState(false);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  const revealClassName = cn(styles.reveal, isReady && styles.revealed);

  return (
    <div className={styles.page}>
      <div
        className={cn(
          styles.backgroundLayer,
          styles.revealSlow,
          isBackgroundLoaded && styles.revealed,
        )}
      >
        <Image
          src="/images/landing/background.png"
          alt=""
          fill
          priority
          sizes="(min-width: 480px) 480px, 100vw"
          className={styles.backgroundImage}
          // next/image는 ref 콜백에서 img.complete를 확인하므로, 하이드레이션
          // 전에 이미 캐시로 로드가 끝난 경우에도 onLoad가 호출된다.
          onLoad={() => setIsBackgroundLoaded(true)}
        />
        <div className={styles.backgroundOverlay} />
      </div>

      <div
        className={cn(
          styles.topBar,
          styles.reveal,
          isReady && styles.revealedDimmed,
        )}
      >
        <BgmToggleButton />
      </div>

      <div className={styles.content}>
        <Logo className={cn(styles.logo, revealClassName)} role="img" />
        <HomeLottie
          className={cn(styles.character, revealClassName)}
          onReady={() => setIsReady(true)}
        />
      </div>

      <div className={cn(styles.footer, revealClassName)}>
        <StartButton participantCount={19089} />
      </div>
    </div>
  );
}
