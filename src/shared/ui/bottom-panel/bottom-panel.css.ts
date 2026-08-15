import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

const PANEL_BACKGROUND = "rgba(18, 18, 18, 0.8)";
const PANEL_BLUR = "blur(6px)";

export const panel = style({
  position: "absolute",
  insetInline: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["32"],
  padding: `${vars.spacing["48"]} ${vars.spacing["24"]}`,
  backgroundColor: PANEL_BACKGROUND,
  backdropFilter: PANEL_BLUR,
  transition: "transform 100ms ease-in-out",
});
export const keyboardBackfill = style({
  position: "absolute",
  top: "100%",
  insetInline: 0,
  backgroundColor: PANEL_BACKGROUND,
  backdropFilter: PANEL_BLUR,
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
