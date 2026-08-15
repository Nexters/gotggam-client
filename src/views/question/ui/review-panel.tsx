"use client";

import { useFormContext } from "react-hook-form";

import type { FormValues } from "@/features/form";
import { InputPanel } from "@/shared/ui";

type ReviewPanelProps = {
  onSubmit: () => void;
  onSkip: () => void;
};

// 서버가 10~15자만 받으므로(SurveyResultRequest.todayMessage) 미달이면 진행을 막는다.
// 건너뛰면 값이 비워지고 서버 기본 문장이 카드에 실린다.
const TODAY_MESSAGE_MIN = 1;

export function ReviewPanel({ onSubmit, onSkip }: ReviewPanelProps) {
  const { setValue, watch } = useFormContext<FormValues>();
  const todayMessage = watch("todayMessage");

  const handleSkip = () => {
    setValue("todayMessage", "");
    onSkip();
  };

  return (
    <InputPanel
      title={"오늘 하루 어땠냥?"}
      value={todayMessage}
      onChange={(value) => setValue("todayMessage", value)}
      placeholder="오늘 하루에 대해 적어주세요."
      maxLength={15}
      ctaLabel="다음"
      hint="15자 이내로 표현해주세요."
      ctaDisabled={todayMessage.trim().length < TODAY_MESSAGE_MIN}
      onCtaClick={onSubmit}
      skipLabel="건너뛰기 >>"
      onSkip={handleSkip}
    />
  );
}
