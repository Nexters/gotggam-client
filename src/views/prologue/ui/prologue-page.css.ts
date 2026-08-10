import { style } from "@vanilla-extract/css";

import { getPixelCornerClipPath } from "@/shared/styles/pixel-corner";
import { vars } from "@/shared/styles/theme.css";

// 디자인 기준(852px 프레임): 나레이션 박스가 하단에서 48px 떠 있고,
// 캐릭터 하단이 나레이션 위쪽 68px을 덮는다.
const NARRATION_BOTTOM = 48;
const NARRATION_HEIGHT = 123;
const CHARACTER_OVERLAP = 68;

export const page = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: vars.color.background,
});

export const backgroundLayer = style({
  position: "absolute",
  inset: 0,
});

export const backgroundImage = style({
  objectFit: "cover",
});

export const backgroundOverlay = style({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(18, 18, 18, 0.4)",
});

export const appBar = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.spacing["12"]} ${vars.spacing["16"]}`,
  opacity: 0.8,
});

export const content = style({
  position: "relative",
  flex: 1,
});

export const character = style({
  position: "absolute",
  bottom: NARRATION_BOTTOM + NARRATION_HEIGHT - CHARACTER_OVERLAP,
  left: "50%",
  transform: "translateX(-50%)",
  width: "105%",
  aspectRatio: "1 / 1",
});

export const narration = style({
  position: "absolute",
  insetInline: vars.spacing["16"],
  bottom: NARRATION_BOTTOM,
  cursor: "pointer",
  userSelect: "none",
});

export const bubble = style({
  minHeight: 110,
  padding: `${vars.spacing["24"]} ${vars.spacing["20"]}`,
  marginTop: 13,
  backgroundColor: vars.color.accent5["11"],
  clipPath: `polygon(${getPixelCornerClipPath(4)})`,
});

// 말풍선(2단 계단)과 달리 이름표 모서리는 4px 한 단만 잘려나간다.
const nameTagClipPath = [
  "0 4px",
  "4px 4px",
  "4px 0",
  "calc(100% - 4px) 0",
  "calc(100% - 4px) 4px",
  "100% 4px",
  "100% calc(100% - 4px)",
  "calc(100% - 4px) calc(100% - 4px)",
  "calc(100% - 4px) 100%",
  "4px 100%",
  "4px calc(100% - 4px)",
  "0 calc(100% - 4px)",
].join(", ");

export const nameTag = style({
  position: "absolute",
  top: 0,
  left: vars.spacing["16"],
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 26,
  padding: `0 ${vars.spacing["20"]}`,
  backgroundColor: vars.color.accent5["10"],
  clipPath: `polygon(${nameTagClipPath})`,
});

export const nextButton = style({
  position: "absolute",
  right: vars.spacing["20"],
  bottom: vars.spacing["20"],
  width: 24,
  height: 24,
});
