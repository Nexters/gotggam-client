"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BACKGROUND_IMAGE_URLS, CLICK_SFX_SRC } from "@/shared/config";
import { playSfx, useBgmEnabled } from "@/shared/lib";
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
  // 시트는 닫히는 애니메이션 동안에도 마운트된 채라, 열 때 고정한 문서를 계속
  // 보여준다. step.termsId 를 그대로 쓰면 동의 직후 다음 약관으로 내용이 바뀐다.
  const [sheetTermsId, setSheetTermsId] = useState(CONSENT_STEPS[0].termsId);
  const [isSoundOn] = useBgmEnabled();

  const step = CONSENT_STEPS[stepIndex];
  const isLastStep = stepIndex === CONSENT_STEPS.length - 1;

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
    setStepIndex((index) => index - 1);
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
    setStepIndex((index) => index + 1);
  };

  return (
    <div className={styles.page}>
      <SceneBackground src={BACKGROUND_IMAGE_URLS.landing} />

      <div className={styles.content}>
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

        <Character src={CHARACTER_SRC} className={styles.character} />
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
