import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const appBar = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: vars.spacing["20"],
  padding: `${vars.spacing["12"]} ${vars.spacing["16"]}`,
  opacity: 0.8,
});

export const spacer = style({
  width: vars.spacing["24"],
  height: vars.spacing["24"],
});
