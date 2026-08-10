import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const panel = style({
  position: "absolute",
  insetInline: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["32"],
  padding: `${vars.spacing["48"]} ${vars.spacing["24"]}`,
  backgroundColor: "rgba(18, 18, 18, 0.8)",
  backdropFilter: "blur(6px)",
});

export const ctaButton = style({
  width: "100%",
  height: 52,
  color: vars.color.white,
  selectors: {
    // 이 파일은 pixel-corner-button.css보다 먼저 방출되므로, 같은 특이도로 두면
    // PixelCornerButton 리셋(background: none)에 배경이 밀린다. :not(:disabled)로
    // 특이도를 올려 방출 순서와 무관하게 만든다.
    "&:not(:disabled)": {
      background: `linear-gradient(to right, ${vars.color.accent2["9"]}, ${vars.color.accent3["9"]})`,
    },
    "&:disabled": {
      opacity: 1,
      background: vars.color.gray["8"],
      color: vars.color.gray["3"],
    },
  },
});
