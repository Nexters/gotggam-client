import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

// GotggamDialogue(결과·얼굴 화면)의 말풍선 하단 여백과 동일하다.
export const NARRATION_BOTTOM = 32;
// SpeechBubble 높이(말풍선 110 + 이름표 겹침 13)
export const NARRATION_HEIGHT = 123;

export const narration = style({
  position: "absolute",
  insetInline: vars.spacing["16"],
  width: "auto",
  bottom: NARRATION_BOTTOM,
  userSelect: "none",
});
