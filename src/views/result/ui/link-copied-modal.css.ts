import { keyframes, style } from "@vanilla-extract/css";

import { getPixelCornerClipPath } from "@/shared/styles/pixel-corner";

// Figma [card_drawer > alert] 팔레트 — 명부 팔레트와 별개인 모달 전용 색
const PANEL_BACKGROUND = "#bdadce";
const CIRCLE_BACKGROUND = "#cab3e3";
const BUTTON_BACKGROUND = "#583d8e";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const popIn = keyframes({
  "0%": { transform: "scale(0.9)", opacity: 0 },
  "70%": { transform: "scale(1.03)", opacity: 1 },
  "100%": { transform: "scale(1)", opacity: 1 },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  backgroundColor: "rgba(18, 18, 18, 0.75)",
  animationName: fadeIn,
  animationDuration: "200ms",
  animationTimingFunction: "ease-out",
});

export const panel = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "min(34.5rem, 100%)",
  padding: 24,
  clipPath: `polygon(${getPixelCornerClipPath(4)})`,
  backgroundColor: PANEL_BACKGROUND,
  animationName: popIn,
  animationDuration: "260ms",
  animationTimingFunction: "cubic-bezier(0.3, 1.2, 0.4, 1)",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

export const checkCircle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 56,
  height: 56,
  borderRadius: "50%",
  backgroundColor: CIRCLE_BACKGROUND,
});

export const message = style({
  marginTop: 16,
  color: "#121212",
});

export const closeButton = style({
  width: "100%",
  height: 42,
  marginTop: 24,
  border: "none",
  clipPath: `polygon(${getPixelCornerClipPath(4)})`,
  backgroundColor: BUTTON_BACKGROUND,
  cursor: "pointer",
});
