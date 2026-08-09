import { style } from "@vanilla-extract/css";

export const pixelCornerButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
    },
  },
});
