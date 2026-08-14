"use client";

import { useFormContext } from "react-hook-form";

import type { FormValues } from "@/features/form";
import { CHOICE_PANEL_ADVANCE_DELAY_MS, ChoicePanel } from "@/shared/ui";

import { GENDER_OPTIONS } from "../model/constants";

type GenderPanelProps = {
  onSubmit: () => void;
};

export function GenderPanel({ onSubmit }: GenderPanelProps) {
  const { setValue, watch } = useFormContext<FormValues>();
  const gender = watch("gender");
  const selectedLabel =
    GENDER_OPTIONS.find((option) => option.code === gender)?.label ?? null;

  const handleSelect = (label: string) => {
    const option = GENDER_OPTIONS.find((item) => item.label === label);
    if (!option) return;
    setValue("gender", option.code);
    setTimeout(onSubmit, CHOICE_PANEL_ADVANCE_DELAY_MS);
  };

  return (
    <ChoicePanel
      title="성별을 알려달라냥."
      options={GENDER_OPTIONS.map((option) => option.label)}
      value={selectedLabel}
      onSelect={handleSelect}
    />
  );
}
