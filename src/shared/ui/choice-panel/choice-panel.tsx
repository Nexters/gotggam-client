"use client";

import { cn } from "@/shared/lib";

import * as styles from "./choice-panel.css";
import { Typography } from "..";

type ChoicePanelProps = {
  title: string;
  options: string[];
  value: string | null;
  onSelect: (value: string) => void;
};

export function ChoicePanel({
  title,
  options,
  value,
  onSelect,
}: ChoicePanelProps) {
  return (
    <div className={styles.panel}>
      <Typography
        as="p"
        family="galmuri9"
        size="22"
        color="white"
        className={styles.title}
      >
        {title}
      </Typography>
      <div>
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
            <Typography family="galmuri9" size="24" color="gray-12">
              {"> "}
              {option}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  );
}
