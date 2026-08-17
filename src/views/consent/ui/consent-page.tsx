"use client";

import { useRouter } from "next/navigation";
import { type TransitionEvent, useState } from "react";

import { BACKGROUND_IMAGE_URLS, CLICK_SFX_SRC } from "@/shared/config";
import { cn, playSfx, useBgmEnabled } from "@/shared/lib";
import { PixelCornerButton, Typography } from "@/shared/ui";
import { Character, SceneBackground } from "@/widgets/scene";

import { CONSENT_STEPS } from "../model/steps";
import * as styles from "./consent-page.css";
import { StepIndicator } from "./step-indicator";
import { TermsSheet } from "./terms-sheet";

const CHARACTER_SRC = "/lottie/loading_02.lottie";

export function ConsentPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetTermsId, setSheetTermsId] = useState(CONSENT_STEPS[0].termsId);
  const [isBackgroundReady, setIsBackgroundReady] = useState(false);
  const [isCharacterReady, setIsCharacterReady] = useState(false);
  const [pendingStepIndex, setPendingStepIndex] = useState<number | null>(null);
  const [isSoundOn] = useBgmEnabled();

  const step = CONSENT_STEPS[stepIndex];
  const isLastStep = stepIndex === CONSENT_STEPS.length - 1;
  const isVisible =
    isBackgroundReady && isCharacterReady && pendingStepIndex === null;

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "opacity") return;
    if (pendingStepIndex === null) return;

    setStepIndex(pendingStepIndex);
    setPendingStepIndex(null);
  };

  const playClick = () => {
    if (isSoundOn) {
      playSfx(CLICK_SFX_SRC);
    }
  };

  const goBack = () => {
    playClick();
    if (stepIndex === 0) {
      router.back();
      return;
    }
    setPendingStepIndex(stepIndex - 1);
  };

  const openTermsSheet = () => {
    playClick();
    setSheetTermsId(step.termsId);
    setIsSheetOpen(true);
  };

  // 각 단계는 자기 약관에 동의해야 넘어간다. 마지막 약관까지 동의하면 본 퍼널로.
  const agreeToTerms = () => {
    setIsSheetOpen(false);
    if (isLastStep) {
      router.push("/form/prologue");
      return;
    }
    setPendingStepIndex(stepIndex + 1);
  };

  return (
    <div
      className={cn(
        styles.page,
        styles.screen,
        isVisible && styles.screenVisible,
      )}
      onTransitionEnd={handleTransitionEnd}
    >
      <SceneBackground
        src={BACKGROUND_IMAGE_URLS.landing}
        onReady={() => setIsBackgroundReady(true)}
      />

      <div className={styles.content}>
        {/* key로 다시 마운트해야 단계마다 등장 애니메이션이 처음부터 재생된다. */}
        <div key={stepIndex} className={styles.stepBody}>
          <StepIndicator total={CONSENT_STEPS.length} current={stepIndex} />
          <Typography
            as="h1"
            family="galmuri9"
            size="24"
            color="white"
            className={styles.heading}
          >
            {step.heading.map((line) => (
              <span key={line} className={styles.headingLine}>
                {line}
              </span>
            ))}
          </Typography>

          <Typography
            as="p"
            family="spoqa"
            weight="medium"
            size="16"
            color="gray-11"
            className={styles.description}
          >
            {step.description}
          </Typography>
        </div>

        <Character
          src={CHARACTER_SRC}
          className={styles.character}
          onReady={() => setIsCharacterReady(true)}
        />
      </div>

      <div className={styles.ctaRow}>
        <PixelCornerButton
          cornerSize={4}
          className={styles.backButton}
          onClick={goBack}
        >
          <Typography family="galmuri11" size="18" color="white">
            이전
          </Typography>
        </PixelCornerButton>
        <PixelCornerButton
          cornerSize={4}
          className={styles.confirmButton}
          onClick={openTermsSheet}
        >
          <Typography family="galmuri11" size="18" color="white">
            확인
          </Typography>
        </PixelCornerButton>
      </div>

      <TermsSheet
        termsId={sheetTermsId}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onAgree={agreeToTerms}
      />
    </div>
  );
}
