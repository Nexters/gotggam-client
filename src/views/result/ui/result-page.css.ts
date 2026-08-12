import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const page = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  overflow: "hidden",
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const endingBackground = style({
  position: "absolute",
  inset: 0,
  animationName: fadeIn,
  animationDuration: "600ms",
  animationTimingFunction: "ease-out",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

export const endingBackgroundImage = style({
  objectFit: "cover",
});

export const cardStage = style({
  position: "relative",
  display: "flex",
  flex: 1,
  minHeight: 0,
  flexDirection: "column",
  alignItems: "center",
});

// 명부 등장 시 카드가 돌아가며 나타나는 모션 (회의록: 카드 돌아가는 모션)
const cardSpinIn = keyframes({
  from: {
    transform: "perspective(700px) rotateY(540deg) scale(0.5)",
    opacity: 0,
  },
  to: {
    transform: "perspective(700px) rotateY(0deg) scale(1)",
    opacity: 1,
  },
});

export const card = style({
  marginTop: vars.spacing["32"],
  animationName: cardSpinIn,
  animationDuration: "1.2s",
  animationTimingFunction: "cubic-bezier(0.2, 0.8, 0.25, 1)",
  animationFillMode: "backwards",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

export const bubbleArea = style({
  position: "absolute",
  insetInline: vars.spacing["16"],
  bottom: vars.spacing["24"],
});
