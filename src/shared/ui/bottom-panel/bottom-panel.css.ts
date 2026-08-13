import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const panel = style({
  position: "absolute",
  insetInline: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["32"],
  padding: `${vars.spacing["48"]} ${vars.spacing["24"]}`,
  backgroundColor: "rgba(18, 18, 18, 0.8)",
  backdropFilter: "blur(6px)",
});

export const ctaButton = style({
  width: "100%",
  height: "5.2rem",
  color: vars.color.white,
  background: `linear-gradient(to right, ${vars.color.accent2["9"]}, ${vars.color.accent3["9"]})`,
  selectors: {
    "&:disabled": {
      opacity: 1,
      background: vars.color.gray["8"],
      color: vars.color.gray["3"],
    },
  },
});
