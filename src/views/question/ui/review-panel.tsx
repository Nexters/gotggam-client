"use client";

import { useFormContext } from "react-hook-form";

import type { FormValues } from "@/features/form";
import { InputPanel } from "@/shared/ui";

type ReviewPanelProps = {
  onSubmit: () => void;
  onSkip: () => void;
};

export function ReviewPanel({ onSubmit, onSkip }: ReviewPanelProps) {
  const { setValue, watch } = useFormContext<FormValues>();
  const review = watch("review");
  const handleSkip = () => {
    setValue("review", "");
    onSkip();
  };

  return (
    <InputPanel
      title={"오늘 하루 어땠냥?"}
      value={review}
      onChange={(value) => setValue("review", value)}
      placeholder="오늘 하루에 대해 적어주세요."
      maxLength={15}
      ctaLabel="다음"
      hint="10-15자 이내로 표현해주세요."
      onCtaClick={onSubmit}
      skipLabel="건너뛰기 >>"
      onSkip={handleSkip}
    />
  );
}
