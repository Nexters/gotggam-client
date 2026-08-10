import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100dvh",
  gap: vars.spacing["16"],
  padding: vars.spacing["32"],
  textAlign: "center",
});

export const title = style({
  color: vars.color.gray["12"],
});

export const message = style({
  color: vars.color.gray["11"],
});
