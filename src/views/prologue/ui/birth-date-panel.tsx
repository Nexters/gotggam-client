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

  // 서버가 미래 생일을 거부하므로 오늘 이후는 선택지에서 잘라낸다.
  // 올해를 고르면 이번 달까지, 이번 달이면 오늘까지만 보인다.
  const today = new Date();
  const isCurrentYear = Number(year) === today.getFullYear();
  const monthOptions = isCurrentYear
    ? MONTH_OPTIONS.slice(0, today.getMonth() + 1)
    : MONTH_OPTIONS;
  const safeMonth = `${Math.min(Number(month), monthOptions.length)}`;
  const isCurrentMonth =
    isCurrentYear && Number(safeMonth) === today.getMonth() + 1;

  const dayCount = getDaysInMonth(year, safeMonth);
  const maxDay = isCurrentMonth ? Math.min(dayCount, today.getDate()) : dayCount;
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
