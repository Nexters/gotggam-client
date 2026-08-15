"use client";

import { useFormContext } from "react-hook-form";

import type { FormValues } from "@/features/form";
import { useDebouncedValue } from "@/shared/lib";
import { InputPanel } from "@/shared/ui";

import { KOREAN_NAME_REGEX } from "../model/constants";

// 한글 IME 조합 중에는 글자마다 유효성이 뒤집혀 힌트·CTA가 깜빡인다.
// 타이핑이 잠잠해진 뒤의 값으로 검증 UI를 갱신한다.
const VALIDATION_DEBOUNCE_MS = 300;

type NamePanelProps = {
  onSubmit: () => void;
};

export function NamePanel({ onSubmit }: NamePanelProps) {
  const { setValue, watch } = useFormContext<FormValues>();
  const name = watch("name");
  const debouncedName = useDebouncedValue(name, VALIDATION_DEBOUNCE_MS);
  const isValidName = KOREAN_NAME_REGEX.test(debouncedName);

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
