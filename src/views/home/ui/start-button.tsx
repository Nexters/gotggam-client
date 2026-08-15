import type { ButtonHTMLAttributes, ReactNode } from "react";

import { PixelCornerButton, Typography } from "@/shared/ui";
import { cn } from "@/shared/lib";

import * as styles from "./start-button.css";

type StartButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  description?: ReactNode;
};

export function StartButton({
  className,
  description,
  ...props
}: StartButtonProps) {
  return (
    <PixelCornerButton
      cornerSize={4}
      className={cn(styles.startButton, className)}
      {...props}
    >
      <Typography family="galmuri9" size="22" color="white">
        시작하기
      </Typography>
      {description}
    </PixelCornerButton>
  );
}
