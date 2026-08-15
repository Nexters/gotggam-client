"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { toFaceSelection } from "@/entities/character";
import { resultQueries } from "@/entities/result";
import type { FormValues } from "@/features/form";
import { AppBar, SpeechBubble, Typography } from "@/shared/ui";
import { GotggamDialogue, SpotlightBackdrop } from "@/widgets/gotggam-dialogue";

import {
  buildMockLedgerResult,
  buildSurveyResultRequest,
  pickRandomLedgerVariant,
  toLedgerResult,
  type LedgerVariant,
} from "../model/ledger";
import { LedgerCard } from "./ledger-card";
import { LedgerMenu, type LedgerMenuAction } from "./ledger-menu";
import * as styles from "./result-page.css";
import { useCardFlip } from "./use-card-flip";

const INTRO_LINES = ["흠 아직은 데려갈 때가 아닌 것 같다냥.."];

const SUBMIT_PENDING_LINES = ["명부를 확인하는 중이다냥.."];

const SUBMIT_ERROR_LINES = [
  "명부를 불러오지 못했다냥.. 다시 한번 확인해보겠냥.",
];

const CARD_LINES = [
  "대신 오늘의 기록은 명부에 남겨뒀다냥.",
  "'명부 저장하기'를 누르면 너의 명부를 확인 할 수 있다냥",
];

const ENDING_LINES = ["앞으로 어떻게 바뀔건지는 너에게 달렸으니 조심하라냥."];

type ResultStep = "intro" | "card" | "menu" | "ending";

export function ResultPage() {
  const router = useRouter();
  const { getValues } = useFormContext<FormValues>();
  const [step, setStep] = useState<ResultStep>("intro");
  const [cardLineIndex, setCardLineIndex] = useState(0);
  const [variant] = useState<LedgerVariant>(() => pickRandomLedgerVariant());

  // 폼이 완성돼 있으면 제출 요청을, 아니면(개발 중 직접 진입) 목업을 쓴다.
  const [request] = useState(() => buildSurveyResultRequest(getValues()));
  const [mockLedger] = useState(() =>
    request ? null : buildMockLedgerResult(getValues()),
  );
  const [mockFace] = useState(() => getValues("face"));

  // 인트로 대사가 나가는 동안 백그라운드로 제출된다 (resultQueries.submission 참고).
  const {
    data: surveyResult,
    isError: isSubmitError,
    refetch: retrySubmit,
  } = useQuery({
    ...resultQueries.submission(request),
    enabled: request !== null,
  });

  // TODO: 공유 기능에서 surveyResult.resultId / shareToken 을 사용한다.
  const ledger = surveyResult ? toLedgerResult(surveyResult) : mockLedger;
  const face = surveyResult
    ? toFaceSelection(surveyResult.character)
    : mockFace;

  const cardFlip = useCardFlip();
  const isCardPhase = step === "card" || step === "menu";

  const advanceCardLine = () => {
    if (cardLineIndex >= CARD_LINES.length - 1) {
      setStep("menu");
      return;
    }
    setCardLineIndex((index) => index + 1);
  };

  const handleMenuSelect = (action: LedgerMenuAction) => {
    if (action === "finish") {
      // 선택 깜빡임 연출이 끝난 뒤 엔딩으로 넘어간다.
      window.setTimeout(() => setStep("ending"), 400);
    }
    // TODO: save — 명부 앞/뒷장 이미지 2장 저장, visit-room — 곧감이의 방 (스펙 미정)
  };

  return (
    <div className={styles.page}>
      {(step === "intro" || (isCardPhase && !ledger)) && <SpotlightBackdrop />}
      {step === "ending" && (
        <div className={styles.endingBackground}>
          <Image
            src="/images/result/ending-bg.png"
            alt=""
            fill
            unoptimized
            sizes="(min-width: 480px) 480px, 100vw"
            className={styles.endingBackgroundImage}
          />
        </div>
      )}
      <AppBar onBack={() => router.back()} />
      {step === "intro" && (
        <GotggamDialogue
          lines={INTRO_LINES}
          onComplete={() => setStep("card")}
        />
      )}
      {isCardPhase &&
        !ledger &&
        (isSubmitError ? (
          <GotggamDialogue
            key="submit-error"
            lines={SUBMIT_ERROR_LINES}
            onComplete={() => retrySubmit()}
          />
        ) : (
          <GotggamDialogue key="submit-pending" lines={SUBMIT_PENDING_LINES} />
        ))}
      {isCardPhase && ledger && face && (
        <div className={styles.cardStage}>
          <LedgerCard
            result={ledger}
            face={face}
            variant={variant}
            rotation={cardFlip.rotation}
            isDragging={cardFlip.isDragging}
            interactive={step === "menu"}
            handlers={cardFlip.handlers}
            className={styles.card}
          />
          {step === "menu" && (
            <button
              type="button"
              className={styles.flipHint}
              onClick={cardFlip.flip}
            >
              <Typography family="galmuri9" size="14" color="gray-11">
                {"< 카드를 돌려서 뒷면을 확인하라냥 >"}
              </Typography>
            </button>
          )}
          {step === "card" && (
            <div className={styles.bubbleArea}>
              <SpeechBubble
                text={CARD_LINES[cardLineIndex]}
                onNext={advanceCardLine}
              />
            </div>
          )}
          {step === "menu" && <LedgerMenu onSelect={handleMenuSelect} />}
        </div>
      )}
      {step === "ending" && (
        <GotggamDialogue
          lines={ENDING_LINES}
          onComplete={() => router.push("/end-bridge")}
        />
      )}
    </div>
  );
}
