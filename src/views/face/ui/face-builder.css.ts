import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const container = style({
  position: "relative",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  padding: `${vars.spacing["16"]} ${vars.spacing["24"]} ${vars.spacing["24"]}`,
});

export const previewPanel = style({
  position: "relative",
  width: "100%",
  aspectRatio: "355 / 310",
});

export const previewPanelBg = style({
  objectFit: "fill",
  imageRendering: "pixelated",
});

// Figma 기준 패널(355×310) 안 얼굴(210×263)의 위치 비율
export const previewFace = style({
  position: "absolute",
  left: "20.5%",
  top: "7.7%",
  width: "59.2%",
});

export const controls = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["12"],
  marginTop: vars.spacing["36"],
});

export const controlRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 35,
});

export const submitButton = style({
  width: "100%",
  height: 52,
  marginTop: "auto",
  color: vars.color.white,
  selectors: {
    // PixelCornerButton 리셋(background: none)보다 특이도를 올려 방출 순서와 무관하게 만든다.
    "&:not(:disabled)": {
      background: `linear-gradient(to right, ${vars.color.accent2["9"]}, ${vars.color.accent3["9"]})`,
    },
  },
});
