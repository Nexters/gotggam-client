import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: "none",
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.primary,
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: 1,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: vars.color.primaryHover,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});
