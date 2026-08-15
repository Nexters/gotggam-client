import { keyframes, style } from "@vanilla-extract/css";

import { getPixelCornerClipPath } from "@/shared/styles/pixel-corner";
import { vars } from "@/shared/styles/theme.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const riseIn = keyframes({
  from: { transform: "translateY(16px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  backgroundColor: "rgba(18, 18, 18, 0.85)",
  animationName: fadeIn,
  animationDuration: "200ms",
  animationTimingFunction: "ease-out",
});

export const panel = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "min(34.5rem, 100%)",
  animationName: riseIn,
  animationDuration: "260ms",
  animationTimingFunction: "cubic-bezier(0.25, 0.9, 0.3, 1)",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

export const images = style({
  display: "flex",
  justifyContent: "center",
  gap: 12,
  width: "100%",
});

export const image = style({
  width: "calc(50% - 6px)",
  maxWidth: 164,
  height: "auto",
  imageRendering: "pixelated",
});

export const hint = style({
  marginTop: 16,
  textAlign: "center",
});

export const saveButton = style({
  width: "100%",
  height: 48,
  marginTop: 20,
  border: "none",
  clipPath: `polygon(${getPixelCornerClipPath(4)})`,
  backgroundColor: "#583d8e",
  cursor: "pointer",
});

export const closeButton = style({
  height: 40,
  marginTop: 4,
  padding: `0 ${vars.spacing["16"]}`,
  border: "none",
  background: "none",
  cursor: "pointer",
});
