import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const indicator = style({
  display: "flex",
  justifyContent: "center",
  gap: vars.spacing["20"],
});

export const dot = style({
  width: "1.2rem",
  height: "1.2rem",
  borderRadius: "50%",
  backgroundColor: vars.color.gray["8"],
  transition: "background-color 200ms ease",
});

export const dotActive = style({
  backgroundColor: vars.color.accent2["9"],
});
