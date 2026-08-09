import type { ButtonHTMLAttributes, CSSProperties } from "react";

import { cn } from "@/shared/lib";

import * as styles from "./pixel-corner-button.css";
import { Button } from "..";

type PixelCornerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 계단형 모서리 한 칸의 크기(px). 모서리는 2칸(2 * cornerSize)만큼 잘려나간다. */
  cornerSize?: number;
};

export function getPixelCornerClipPath(step: number) {
  const s1 = `${step}px`;
  const s2 = `${step * 2}px`;

  return [
    `0 ${s2}`,
    `${s1} ${s2}`,
    `${s1} ${s1}`,
    `${s2} ${s1}`,
    `${s2} 0`,
    `calc(100% - ${s2}) 0`,
    `calc(100% - ${s2}) ${s1}`,
    `calc(100% - ${s1}) ${s1}`,
    `calc(100% - ${s1}) ${s2}`,
    `100% ${s2}`,
    `100% calc(100% - ${s2})`,
    `calc(100% - ${s1}) calc(100% - ${s2})`,
    `calc(100% - ${s1}) calc(100% - ${s1})`,
    `calc(100% - ${s2}) calc(100% - ${s1})`,
    `calc(100% - ${s2}) 100%`,
    `${s2} 100%`,
    `${s2} calc(100% - ${s1})`,
    `${s1} calc(100% - ${s1})`,
    `${s1} calc(100% - ${s2})`,
    `0 calc(100% - ${s2})`,
  ].join(", ");
}

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
