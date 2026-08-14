"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { FaceSelection } from "@/entities/character";
import type { FormValues } from "@/features/form";
import { AppBar, SpeechBubble, Typography } from "@/shared/ui";
import { GotggamDialogue, SpotlightBackdrop } from "@/widgets/gotggam-dialogue";

import {
  buildLedgerResult,
  pickRandomLedgerVariant,
  type LedgerResult,
  type LedgerVariant,
} from "../model/ledger";
import { LedgerCard } from "./ledger-card";
import { LedgerMenu, type LedgerMenuAction } from "./ledger-menu";
import * as styles from "./result-page.css";
import { useCardFlip } from "./use-card-flip";

const INTRO_LINES = ["흠 아직은 데려갈 때가 아닌 것 같다냥.."];

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

  // TODO: 제출 API 응답으로 교체한다 (views/result/model/ledger.ts 참고).
  const [ledger] = useState<LedgerResult>(() => buildLedgerResult(getValues()));
  const [face] = useState<FaceSelection>(() => getValues("face"));
  const [variant] = useState<LedgerVariant>(() => pickRandomLedgerVariant());

  const cardFlip = useCardFlip();

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
      {step === "intro" && <SpotlightBackdrop />}
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
      {(step === "card" || step === "menu") && (
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
