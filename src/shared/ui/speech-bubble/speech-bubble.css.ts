import { keyframes, style } from "@vanilla-extract/css";

import { getPixelCornerClipPath } from "@/shared/styles/pixel-corner";
import { vars } from "@/shared/styles/theme.css";

const NAME_CHIP_HEIGHT = 26;
const NAME_CHIP_OVERLAP = 13;

export const root = style({
  position: "relative",
  display: "block",
  width: "100%",
  height: 110 + NAME_CHIP_OVERLAP,
  padding: 0,
  border: "none",
  background: "none",
  textAlign: "left",
  cursor: "pointer",
});

export const box = style({
  position: "absolute",
  insetInline: 0,
  top: NAME_CHIP_OVERLAP,
  bottom: 0,
  padding: `${vars.spacing["24"]} ${vars.spacing["20"]}`,
  clipPath: `polygon(${getPixelCornerClipPath(4)})`,
  backgroundColor: vars.color.accent5["11"],
});

export const text = style({
  display: "block",
  maxHeight: 70,
  overflow: "hidden",
});

export const nameChip = style({
  position: "absolute",
  top: 0,
  left: 17,
  zIndex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 100,
  height: NAME_CHIP_HEIGHT,
  clipPath: `polygon(${getPixelCornerClipPath(4)})`,
  backgroundColor: vars.color.accent5["10"],
});

// steps로 끊기게 깜빡여서 픽셀 게임 느낌을 유지한다.
const blink = keyframes({
  "0%, 49%": { opacity: 1 },
  "50%, 100%": { opacity: 0.2 },
});

export const nextIcon = style({
  position: "absolute",
  right: 20,
  bottom: 20,
  animationName: blink,
  animationDuration: "1s",
  animationTimingFunction: "steps(1, end)",
  animationIterationCount: "infinite",
});
