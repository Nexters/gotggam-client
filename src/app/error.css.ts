import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { textStyle } from "@/shared/styles/typography";

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
  ...textStyle("spoqa", "20"),
  color: vars.color.gray["12"],
  fontWeight: vars.fontWeight.bold,
});

export const message = style({
  ...textStyle("spoqa", "14"),
  color: vars.color.gray["11"],
});
