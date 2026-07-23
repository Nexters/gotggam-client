import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const main = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100dvh",
  gap: vars.space.md,
  padding: vars.space.xl,
});

export const title = style({
  fontSize: "clamp(32px, 6vw, 48px)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
});

export const description = style({
  color: vars.color.textMuted,
  fontSize: "16px",
});

export const status = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  marginTop: vars.space.md,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  color: vars.color.textMuted,
  fontSize: "14px",
});
