import type { ButtonHTMLAttributes, CSSProperties } from "react";

import { cn } from "@/shared/lib";
import { getPixelCornerClipPath } from "@/shared/styles";

import * as styles from "./pixel-corner-button.css";
import { Button } from "..";

type PixelCornerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 계단형 모서리 한 칸의 크기(px). 모서리는 2칸(2 * cornerSize)만큼 잘려나간다. */
  cornerSize?: number;
};

export function PixelCornerButton({
  className,
  style,
  cornerSize = 4,
  type = "button",
  ...props
}: PixelCornerButtonProps) {
  const cornerStyle: CSSProperties = {
    clipPath: `polygon(${getPixelCornerClipPath(cornerSize)})`,
  };

  return (
    <Button
      type={type}
      className={cn(styles.pixelCornerButton, className)}
      style={{ ...cornerStyle, ...style }}
      {...props}
    />
  );
}
