import { cn } from "@/shared/lib";

import * as styles from "./step-indicator.css";

type StepIndicatorProps = {
  total: number;
  current: number;
  className?: string;
};

export function StepIndicator({
  total,
  current,
  className,
}: StepIndicatorProps) {
  return (
    <div
      className={cn(styles.indicator, className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`${total}단계 중 ${current + 1}단계`}
    >
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cn(styles.dot, index === current && styles.dotActive)}
        />
      ))}
    </div>
  );
}
