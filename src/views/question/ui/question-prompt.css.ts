import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const prompt = style({
  marginTop: "4.6rem",
  paddingInline: vars.spacing["16"],
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2.5rem",
  textAlign: "center",
});

export const question = style({
  whiteSpace: "pre-line",
  wordBreak: "keep-all",
});
