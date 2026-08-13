import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["20"],
});

export const titleRow = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.spacing["16"],
});

export const skipButton = style({
  flexShrink: 0,
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
  textDecorationColor: vars.color.gray["11"],
});


export const hint = style({
  color: "rgba(231, 227, 255, 0.5)",
});

export const hintAccent = style({
  color: vars.color.accent1["9"],
});
