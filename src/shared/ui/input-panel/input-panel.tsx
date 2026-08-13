"use client";

import * as styles from "./input-panel.css";
import { BottomPanel, Input, Typography } from "..";

type InputPanelProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  hint?: string;
  hintTone?: "muted" | "accent";
  ctaLabel: string;
  ctaDisabled?: boolean;
  onCtaClick?: () => void;
  skipLabel?: string;
  onSkip?: () => void;
};
export function InputPanel({
  title,
  value,
  onChange,
  placeholder,
  maxLength,
  hint,
  hintTone = "muted",
  ctaLabel,
  ctaDisabled,
  onCtaClick,
  skipLabel,
  onSkip,
}: InputPanelProps) {
  return (
    <BottomPanel
      ctaLabel={ctaLabel}
      ctaDisabled={ctaDisabled ?? value.trim().length === 0}
      onCtaClick={onCtaClick}
    >
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <Typography as="p" family="galmuri9" size="22" color="white">
            {title}
          </Typography>
          {skipLabel && onSkip && (
            <button
              type="button"
              className={styles.skipButton}
              onClick={onSkip}
            >
              <Typography family="galmuri9" size="14" color="gray-11">
                {skipLabel}
              </Typography>
            </button>
          )}
        </div>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        {hint && (
          <Typography
            as="p"
            family="galmuri9"
            size="14"
            className={hintTone === "accent" ? styles.hintAccent : styles.hint}
          >
            {hint}
          </Typography>
        )}
      </div>
    </BottomPanel>
  );
}
