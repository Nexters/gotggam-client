"use client";

import * as styles from "./input-panel.css";
import { BottomPanel, Typography } from "..";

type InputPanelProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  hint?: string;
  ctaLabel: string;
  /** CTA 비활성 조건. 생략하면 값이 비어 있을 때 비활성화된다. */
  ctaDisabled?: boolean;
  onCtaClick?: () => void;
};

/** 화면 하단 패널에 담긴 한 줄 입력 폼. */
export function InputPanel({
  title,
  value,
  onChange,
  placeholder,
  maxLength,
  hint,
  ctaLabel,
  ctaDisabled,
  onCtaClick,
}: InputPanelProps) {
  return (
    <BottomPanel
      ctaLabel={ctaLabel}
      ctaDisabled={ctaDisabled ?? value.trim().length === 0}
      onCtaClick={onCtaClick}
    >
      <div className={styles.content}>
        <Typography as="p" family="galmuri11" size="22" color="white">
          {title}
        </Typography>
        <input
          className={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        {hint && (
          <Typography
            as="p"
            family="galmuri11"
            size="14"
            className={styles.hint}
          >
            {hint}
          </Typography>
        )}
      </div>
    </BottomPanel>
  );
}
