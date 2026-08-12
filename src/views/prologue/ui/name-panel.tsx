"use client";

import { useFormContext } from "react-hook-form";

import type { FormValues } from "@/features/form";
import { InputPanel } from "@/shared/ui";

import { KOREAN_NAME_REGEX } from "../model/constants";

type NamePanelProps = {
  onSubmit: () => void;
};

export function NamePanel({ onSubmit }: NamePanelProps) {
  const { setValue, watch } = useFormContext<FormValues>();
  const name = watch("name");
  const isValidName = KOREAN_NAME_REGEX.test(name);

  return (
    <InputPanel
      title="이름을 알려달라냥."
      value={name}
      onChange={(value) => setValue("name", value)}
      placeholder="이름을 입력해주세요."
      maxLength={4}
      hint={
        isValidName ? "- 사용할 수 있는 이름입니다." : "- 4자 이내로 작성해주세요."
      }
      hintTone={isValidName ? "accent" : "muted"}
      ctaLabel="다음"
      ctaDisabled={!isValidName}
      onCtaClick={onSubmit}
    />
  );
}
