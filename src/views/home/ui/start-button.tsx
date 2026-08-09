import type { ButtonHTMLAttributes } from "react";

import { PixelCornerButton, Typography } from "@/shared/ui";
import { cn } from "@/shared/lib";

import * as styles from "./start-button.css";

type StartButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  participantCount: number;
};

export function StartButton({
  className,
  participantCount,
  ...props
}: StartButtonProps) {
  return (
    <PixelCornerButton
      cornerSize={4}
      className={cn(styles.startButton, className)}
      {...props}
    >
      <Typography family="galmuri11" size="22" color="white">
        시작하기
      </Typography>
      <Typography family="spoqa" size="12" color="gray-12">
        지금까지 {participantCount.toLocaleString()}명이 참여했어요.
      </Typography>
    </PixelCornerButton>
  );
}
