import { style } from "@vanilla-extract/css";

export const appBar = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  opacity: 0.8,
});

export const spacer = style({
  width: 24,
  height: 24,
});

export const homeLink = style({
  display: "inline-flex",
});
