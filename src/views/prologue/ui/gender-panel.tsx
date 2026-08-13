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

  const handleSelect = (value: string) => {
    setValue("gender", value);
    setTimeout(onSubmit, CHOICE_PANEL_ADVANCE_DELAY_MS);
  };

  return (
    <ChoicePanel
      title="성별을 알려달라냥."
      options={GENDER_OPTIONS}
      value={gender || null}
      onSelect={handleSelect}
    />
  );
}
