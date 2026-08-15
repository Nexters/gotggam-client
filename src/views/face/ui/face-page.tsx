"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { FaceSelection } from "@/entities/character";
import type { FormValues } from "@/features/form";
import {
  GOTGGAM_WITH_CHARACTER_SRC,
  GotggamDialogue,
  SpotlightBackdrop,
} from "@/widgets/gotggam-dialogue";

import { FaceBuilder } from "./face-builder";
import * as styles from "./face-page.css";

const INTRO_LINES = [
  "꼼꼼히 다 기록했다냥. 이제 진짜 마지막 절차다냥!",
  "새 명부에 붙일 몽타주가 필요하다냥.",
  "너랑 제일 닮은 모습으로 만들어 보라냥!",
];

// 얼굴 확인부터는 디자인상 뒤로가기·홈이 없다 (커스터마이징만 뒤로가기 유지).
export function FacePage() {
  const router = useRouter();
  const { getValues, setValue } = useFormContext<FormValues>();
  const [step, setStep] = useState<"intro" | "builder">("intro");

  const submitFace = (selection: FaceSelection) => {
    setValue("face", selection);
    // 제출은 결과 화면이 인트로 대사 동안 백그라운드로 수행한다 (views/result).
    router.push("/form/result");
  };

  return (
    <div className={styles.page}>
      <SpotlightBackdrop />
      {step === "intro" ? (
        <GotggamDialogue
          lines={INTRO_LINES}
          characterSrc={GOTGGAM_WITH_CHARACTER_SRC}
          onComplete={() => setStep("builder")}
        />
      ) : (
        <FaceBuilder
          initialSelection={getValues("face")}
          onSubmit={submitFace}
        />
      )}
    </div>
  );
}
