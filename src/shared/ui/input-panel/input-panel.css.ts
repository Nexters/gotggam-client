import { style } from "@vanilla-extract/css";

import { getPixelCornerClipPath } from "@/shared/styles/pixel-corner";
import { vars } from "@/shared/styles/theme.css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["20"],
});

export const input = style({
  width: "100%",
  height: "4.8rem",
  padding: `0 ${vars.spacing["16"]}`,
  border: "none",
  outline: "none",
  backgroundColor: vars.color.gray["3"],
  clipPath: `polygon(${getPixelCornerClipPath(4)})`,
  fontFamily: vars.font.galmuri9,
  fontSize: vars.fontSize["16"],
  color: vars.color.white,
  "::placeholder": {
    color: vars.color.gray["7"],
  },
});

export const hint = style({
  color: "rgba(231, 227, 255, 0.5)",
});

export const hintAccent = style({
  color: vars.color.accent1["9"],
});
