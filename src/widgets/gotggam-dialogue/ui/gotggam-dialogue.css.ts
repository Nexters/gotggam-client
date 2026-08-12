import { style } from "@vanilla-extract/css";

export const scene = style({
  position: "relative",
  display: "flex",
  flex: 1,
  minHeight: 0,
  flexDirection: "column",
});

export const characterArea = style({
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

export const character = style({
  width: "100%",
  maxWidth: 420,
  aspectRatio: "1 / 1",
  opacity: 0,
  transition: "opacity 400ms ease-out",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});

export const characterVisible = style({
  opacity: 1,
});

export const bubbleArea = style({
  padding: "0 16px 24px",
});
