import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const errorFallback = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing["16"],
  minHeight: "100%",
  padding: vars.spacing["32"],
  textAlign: "center",
  backgroundColor: vars.color.background,
});
