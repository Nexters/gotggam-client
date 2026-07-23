import { style } from "@vanilla-extract/css";

import { semantic, vars } from "@/shared/styles/theme.css";
import { textStyle } from "@/shared/styles/typography";

export const button = style({
  ...textStyle("spoqa", "14"),
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing["4"],
  padding: `${vars.spacing["8"]} ${vars.spacing["16"]}`,
  border: "none",
  borderRadius: "10px",
  backgroundColor: semantic.color.accent1,
  color: semantic.color.white,
  fontWeight: vars.fontWeight.semibold,
  lineHeight: 1,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: vars.color.accent1["10"],
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});
