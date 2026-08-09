import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const page = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  overflow: "hidden",
  color: vars.color.white,
});

export const backgroundLayer = style({
  position: "absolute",
  inset: 0,
});

export const backgroundImage = style({
  objectFit: "cover",
});

export const backgroundOverlay = style({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(18, 18, 18, 0.4)",
});

export const topBar = style({
  display: "flex",
  justifyContent: "flex-end",
  padding: vars.spacing["16"],
  opacity: 0.8,
});

export const content = style({
  position: "relative",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const logo = style({
  width: "60%",
  height: "auto",
});

export const character = style({
  width: "115%",
  aspectRatio: "1 / 1",
  marginTop: vars.spacing["30"],
});

export const footer = style({
  display: "flex",
  justifyContent: "center",
  padding: `0 ${vars.spacing["20"]} ${vars.spacing["36"]}`,
});
