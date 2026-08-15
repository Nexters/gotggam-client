import { keyframes, style } from "@vanilla-extract/css";

import { getPixelNotchClipPath } from "@/shared/styles/pixel-corner";
import { vars } from "@/shared/styles/theme.css";

const CORNER_NOTCH = 3;
const TAIL_WIDTH = 9;
const TAIL_HEIGHT = 12;

// 오른쪽으로 뾰족해지는 3단 계단 꼬리. 한 단마다 3px 나가고 위아래로 2px씩 좁아진다.
const TAIL_CLIP_PATH = [
  "0 0",
  "3px 0",
  "3px 2px",
  "6px 2px",
  "6px 4px",
  "9px 4px",
  "9px 8px",
  "6px 8px",
  "6px 10px",
  "3px 10px",
  "3px 12px",
  "0 12px",
].join(", ");

export const root = style({
  position: "relative",
  display: "inline-flex",
});

/** 2px 단위로 끊어 올라갔다 내려오는 상하 튐. steps 타이밍과 함께 써야 픽셀 느낌이 산다. */
const pixelBounce = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "25%": { transform: "translateY(-2px)" },
  "50%": { transform: "translateY(-4px)" },
  "75%": { transform: "translateY(-2px)" },
});

export const bubble = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: `calc(100% + ${vars.spacing["16"]})`,
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  color: vars.color.accent2["6"],
  transition: "opacity 400ms ease-out",
  animationName: pixelBounce,
  animationDuration: "0.8s",
  animationTimingFunction: "steps(1, end)",
  animationIterationCount: "infinite",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

// bubble보다 뒤에 선언해야 같은 특이도에서 opacity를 덮어쓴다.
export const bubbleHidden = style({
  opacity: 0,
});

export const box = style({
  display: "flex",
  alignItems: "flex-end",
  gap: vars.spacing["4"],
  padding: `${vars.spacing["6"]} ${vars.spacing["10"]}`,
  clipPath: `polygon(${getPixelNotchClipPath(CORNER_NOTCH)})`,
  backgroundColor: vars.color.gray["12"],
  lineHeight: 1,
  whiteSpace: "nowrap",
});

export const icon = style({
  flexShrink: 0,
  width: 19,
  height: 19,
});

export const tail = style({
  flexShrink: 0,
  width: TAIL_WIDTH,
  height: TAIL_HEIGHT,
  clipPath: `polygon(${TAIL_CLIP_PATH})`,
  backgroundColor: vars.color.gray["12"],
});
