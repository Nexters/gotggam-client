import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const startButton = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing["2"],
  width: "100%",
  height: "70px",
  background: `linear-gradient(to right, ${vars.color.accent2["9"]}, ${vars.color.accent3["9"]}) lightgray 50% / cover no-repeat`,
});
