import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import {
  NARRATION_BOTTOM,
  NARRATION_HEIGHT,
} from "@/widgets/scene/ui/narration-box.css";

export const emptyNotice = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100%",
  padding: vars.spacing["32"],
  textAlign: "center",
  backgroundColor: vars.color.background,
});

export const page = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: vars.color.background,
});

export const content = style({
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
});

export const characterArea = style({
  flex: 1,
  minHeight: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  paddingBottom: `${(NARRATION_BOTTOM + NARRATION_HEIGHT) / 10}rem`,
});

export const character = style({
  width: "79%",
  maxHeight: "100%",
  aspectRatio: "1 / 1",
});
