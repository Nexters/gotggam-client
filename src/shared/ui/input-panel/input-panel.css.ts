import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["20"],
});


export const hint = style({
  color: "rgba(231, 227, 255, 0.5)",
});

export const hintAccent = style({
  color: vars.color.accent1["9"],
});
