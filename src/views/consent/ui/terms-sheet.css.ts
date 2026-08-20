import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const status = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.spacing["8"],
  padding: `${vars.spacing["16"]} 0`,
  color: vars.color.gray["11"],
});
