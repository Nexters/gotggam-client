import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const appBar = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.spacing["12"]} ${vars.spacing["16"]}`,
  opacity: 0.8,
});
