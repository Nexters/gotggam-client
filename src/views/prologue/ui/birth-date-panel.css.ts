import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["24"],
});
