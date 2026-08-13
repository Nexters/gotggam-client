import type { WheelPickerOption } from "@/shared/ui";

export function getDaysInMonth(year: string, month: string) {
  return new Date(Number(year), Number(month), 0).getDate();
}

export function getDayOptions(dayCount: number): WheelPickerOption[] {
  return Array.from({ length: dayCount }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`,
  }));
}

/** 월·연도가 바뀌어 일 수가 줄면 선택된 일을 그 달의 마지막 날로 보정한다. */
export function clampDay(day: string, dayCount: number) {
  return `${Math.min(Number(day), dayCount)}`;
}

export function formatBirthDate(year: string, month: string, day: string) {
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
