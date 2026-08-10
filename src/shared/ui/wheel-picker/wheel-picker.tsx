"use client";

import {
  WheelPicker as BaseWheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@ncdai/react-wheel-picker";
import "@ncdai/react-wheel-picker/style.css";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

import * as styles from "./wheel-picker.css";

type WheelPickerProps = {
  options: WheelPickerOption[];
  value: string;
  onChange: (value: string) => void;
};

/** 한 열(컬럼)의 휠. 반드시 WheelPickerGroup 안에서 사용한다. */
export function WheelPicker({ options, value, onChange }: WheelPickerProps) {
  return (
    <BaseWheelPicker
      options={options}
      value={value}
      onValueChange={onChange}
      // 3D 링에서 인접 아이템의 투영 간격 = h·sin45° − 12(중앙 텍스트 절반)
      // − 8.5(45° 기울어진 인접 텍스트 절반). 30px 간격이 되는 h = 71.
      optionItemHeight={71}
      visibleCount={8}
      classNames={{
        optionItem: styles.optionItem,
        highlightWrapper: styles.highlightWrapper,
      }}
    />
  );
}

type WheelPickerGroupProps = {
  children: ReactNode;
  className?: string;
};

/** 여러 WheelPicker 열을 나란히 배치하는 컨테이너. */
export function WheelPickerGroup({
  children,
  className,
}: WheelPickerGroupProps) {
  return (
    <WheelPickerWrapper className={cn(styles.group, className)}>
      {children}
    </WheelPickerWrapper>
  );
}
