"use client";

import { cn } from "@/shared/lib";

import * as styles from "./choice-panel.css";
import { Typography } from "..";

type ChoicePanelVariant = "grouped" | "spaced";

type ChoicePanelProps = {
  title?: string;
  variant?: ChoicePanelVariant;
  options: string[];
  value: string | null;
  onSelect: (value: string) => void;
};

export function ChoicePanel({
  title,
  variant = "grouped",
  options,
  value,
  onSelect,
}: ChoicePanelProps) {
  const isSpaced = variant === "spaced";

  return (
    <div className={cn(styles.panel, isSpaced && styles.panelSpaced)}>
      {title && (
        <Typography
          as="p"
          family="galmuri9"
          size="22"
          color="white"
          className={styles.title}
        >
          {title}
        </Typography>
      )}
      <div className={cn(isSpaced && styles.optionGroupSpaced)}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={option === value}
            className={cn(
              styles.option,
              option === value && styles.optionSelected,
            )}
            onClick={() => onSelect(option)}
          >
            <Typography
              family="galmuri9"
              size={isSpaced ? "22" : "24"}
              color="gray-12"
            >
              {"> "}
              {option}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  );
}
