import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { textStyle } from "@/shared/styles/typography";

export const main = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100dvh",
  gap: vars.spacing["16"],
  padding: vars.spacing["32"],
});

export const title = style({
  ...textStyle("departureMono", "32"),
  color: vars.color.accent1["12"],
  fontWeight: vars.fontWeight.bold,
});

export const description = style({
  ...textStyle("spoqa", "16"),
  color: vars.color.gray["11"],
});

export const status = style({
  ...textStyle("spoqa", "14"),
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["8"],
  marginTop: vars.spacing["16"],
  padding: `${vars.spacing["8"]} ${vars.spacing["16"]}`,
  borderRadius: "10px",
  border: `1px solid ${vars.color.gray["6"]}`,
  backgroundColor: vars.color.gray["2"],
  color: vars.color.gray["11"],
});
