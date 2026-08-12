import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const screen = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing["8"],
  minHeight: "100%",
  backgroundColor: vars.color.background,
});
