"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { FaceSelection } from "@/entities/character";
import type { FormValues } from "@/features/form";
import { AppBar } from "@/shared/ui";
import { GotggamDialogue, SpotlightBackdrop } from "@/widgets/gotggam-dialogue";

import { FaceBuilder } from "./face-builder";
import * as styles from "./face-page.css";

const INTRO_LINES = [
  "좋아. 이제 마지막 절차만 남았다냥.",
  "명부를 만들려면 얼굴 확인이 필요하다냥.",
  "엉뚱한 사람을 데려가면 큰일이니 조심하라냥.",
];

export function FacePage() {
  const router = useRouter();
  const { getValues, setValue } = useFormContext<FormValues>();
  const [step, setStep] = useState<"intro" | "builder">("intro");

  const submitFace = (selection: FaceSelection) => {
    setValue("face", selection);
    // TODO: 여기서 폼 전체 payload(이름·생년월일·성별·답변·얼굴)를 제출 API로 보내고,
    //  응답을 결과 화면에 넘긴다. API 연동 전까지는 결과 화면이 폼 값 + 목업으로 그린다.
    router.push("/form/result");
  };

  return (
    <div className={styles.page}>
      <SpotlightBackdrop />
      <AppBar
        onBack={
          step === "builder" ? () => setStep("intro") : () => router.back()
        }
      />
      {step === "intro" ? (
        <GotggamDialogue
          lines={INTRO_LINES}
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
