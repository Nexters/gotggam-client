import { style } from "@vanilla-extract/css";

import { semantic, vars } from "@/shared/styles/theme.css";

export const shell = style({
  position: "relative",
  width: "100%",
  maxWidth: vars.layout.screenMaxWidth,
  margin: "0 auto",
});

export const screen = style({
  position: "relative",
  height: "100svh",
  overflowY: "auto",
  overflowX: "hidden",
  backgroundColor: semantic.color.bgCanvas,
  border: "1px solid white",

  msOverflowStyle: "none",
  scrollbarWidth: "none",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});
