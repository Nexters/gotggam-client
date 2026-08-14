import { style } from "@vanilla-extract/css";

import { uiBase } from "@/shared/styles/layers.css";
import { semantic, vars } from "@/shared/styles/theme.css";

export const button = style({
  "@layer": {
    [uiBase]: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: vars.spacing["4"],
      padding: `${vars.spacing["8"]} ${vars.spacing["16"]}`,
      border: "none",
      borderRadius: "1rem",
      backgroundColor: semantic.color.accent1,
      color: semantic.color.white,
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
    },
  },
});
