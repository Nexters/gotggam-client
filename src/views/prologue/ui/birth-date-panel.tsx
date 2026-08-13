"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { FormValues } from "@/features/form";
import {
  BottomPanel,
  Typography,
  WheelPicker,
  WheelPickerGroup,
} from "@/shared/ui";

import {
  clampDay,
  formatBirthDate,
  getDayOptions,
  getDaysInMonth,
} from "../lib/birth-date";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "../model/constants";
import * as styles from "./birth-date-panel.css";

type BirthDatePanelProps = {
  onSubmit: () => void;
};

export function BirthDatePanel({ onSubmit }: BirthDatePanelProps) {
  const { setValue } = useFormContext<FormValues>();
  const [year, setYear] = useState("2000");
  const [month, setMonth] = useState("1");
  const [day, setDay] = useState("1");

  const dayCount = getDaysInMonth(year, month);
  const dayOptions = getDayOptions(dayCount);
  const safeDay = clampDay(day, dayCount);

  const submit = () => {
    setValue("birthDate", formatBirthDate(year, month, safeDay));
    onSubmit();
  };

  return (
    <BottomPanel ctaLabel="다음" onCtaClick={submit}>
      <div className={styles.content}>
        <Typography as="p" family="galmuri9" size="22" color="white">
          생년월일을 알려달라냥.
        </Typography>
        <WheelPickerGroup>
          <WheelPicker options={YEAR_OPTIONS} value={year} onChange={setYear} />
          <WheelPicker
            options={MONTH_OPTIONS}
            value={month}
            onChange={setMonth}
          />
          <WheelPicker options={dayOptions} value={safeDay} onChange={setDay} />
        </WheelPickerGroup>
      </div>
    </BottomPanel>
  );
}
