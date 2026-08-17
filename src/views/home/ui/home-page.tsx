"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/shared/lib";

import Logo from "../assets/logo.svg";
import { BgmToggleButton } from "./bgm-toggle-button";
import { HomeLottie } from "./home-lottie";
import * as styles from "./home-page.css";
import { ParticipantCountSection } from "./participant-count";
import { StartButton } from "./start-button";

export function HomePage() {
  const router = useRouter();
  // 마운트가 아니라 lottie 로드 완료를 기준으로 연다. 마운트 시점엔 캔버스가
  // 아직 비어 있어서, 로고·버튼만 먼저 뜨고 캐릭터가 뒤늦게 튀어나온다.
  const [isReady, setIsReady] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  // 페이드인과 lottie 재생을 같은 시점에 시작한다. autoplay로 두면 로드 직후
  // 안 보이는 채로 재생이 흘러서, 등장할 땐 이미 애니메이션이 지나가 있다.
  useEffect(() => {
    if (!isReady) return;

    const timer = setTimeout(
      () => setIsRevealing(true),
      styles.REVEAL_DELAY_MS,
    );

    return () => clearTimeout(timer);
  }, [isReady]);

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
          isRevealing && styles.revealedDimmed,
        )}
      >
        <BgmToggleButton />
      </div>

      <div
        className={cn(
          styles.revealArea,
          styles.revealSlow,
          isRevealing && styles.revealed,
        )}
      >
        <div className={styles.content}>
          <Logo className={styles.logo} role="img" />
          <HomeLottie
            className={styles.character}
            isPlaying={isRevealing}
            onReady={() => setIsReady(true)}
          />
        </div>

        <div className={styles.footer}>
          <StartButton
            description={<ParticipantCountSection isPlaying={isRevealing} />}
            onClick={() => router.push("/form/consent")}
          />
        </div>
      </div>
    </div>
  );
}
