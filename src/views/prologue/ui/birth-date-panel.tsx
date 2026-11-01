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
  getMaxBirthDate,
} from "../lib/birth-date";
import { MIN_AGE, MONTH_OPTIONS, YEAR_OPTIONS } from "../model/constants";
import * as styles from "./birth-date-panel.css";

type BirthDatePanelProps = {
  onSubmit: () => void;
};

export function BirthDatePanel({ onSubmit }: BirthDatePanelProps) {
  const { setValue } = useFormContext<FormValues>();
  const [year, setYear] = useState("2000");
  const [month, setMonth] = useState("1");
  const [day, setDay] = useState("1");

  // 만 MIN_AGE 미만이 되는 생일(과 미래 날짜)은 선택지에서 잘라낸다.
  // 마지막 해를 고르면 그 달까지, 그 달을 고르면 그 날까지만 보인다.
  const maxBirthDate = getMaxBirthDate(MIN_AGE);
  const isMaxYear = Number(year) === maxBirthDate.getFullYear();
  const monthOptions = isMaxYear
    ? MONTH_OPTIONS.slice(0, maxBirthDate.getMonth() + 1)
    : MONTH_OPTIONS;
  const safeMonth = `${Math.min(Number(month), monthOptions.length)}`;
  const isMaxMonth =
    isMaxYear && Number(safeMonth) === maxBirthDate.getMonth() + 1;

  const dayCount = getDaysInMonth(year, safeMonth);
  const maxDay = isMaxMonth
    ? Math.min(dayCount, maxBirthDate.getDate())
    : dayCount;
  const dayOptions = getDayOptions(maxDay);
  const safeDay = clampDay(day, maxDay);

  const submit = () => {
    setValue("birthDate", formatBirthDate(year, safeMonth, safeDay));
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
            options={monthOptions}
            value={safeMonth}
            onChange={setMonth}
          />
          <WheelPicker options={dayOptions} value={safeDay} onChange={setDay} />
        </WheelPickerGroup>
      </div>
    </BottomPanel>
  );
}
