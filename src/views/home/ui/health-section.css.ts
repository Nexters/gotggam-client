import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const status = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["8"],
  marginTop: vars.spacing["16"],
  padding: `${vars.spacing["8"]} ${vars.spacing["16"]}`,
  borderRadius: "1rem",
  border: `1px solid ${vars.color.gray["6"]}`,
  backgroundColor: vars.color.gray["2"],
  color: vars.color.gray["11"],
});
