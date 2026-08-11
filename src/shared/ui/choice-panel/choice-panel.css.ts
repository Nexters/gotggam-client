import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

const SELECTED_BACKGROUND = "rgba(107, 76, 168, 0.32)";

// 답변을 고르는 순간 선택색↔투명을 두 번 깜빡이고 선택색으로 정착한다.
// steps(1, end)라 각 값이 다음 키프레임까지 그대로 유지되어 픽셀 게임처럼 끊겨 보인다.
const selectBlink = keyframes({
  "0%": { backgroundColor: SELECTED_BACKGROUND },
  "25%": { backgroundColor: "transparent" },
  "50%": { backgroundColor: SELECTED_BACKGROUND },
  "75%": { backgroundColor: "transparent" },
  "100%": { backgroundColor: SELECTED_BACKGROUND },
});

export const panel = style({
  position: "absolute",
  insetInline: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["20"],
  paddingTop: vars.spacing["48"],
  paddingBottom: vars.spacing["32"],
  backgroundColor: "rgba(18, 18, 18, 0.8)",
  backdropFilter: "blur(6px)",
});

export const title = style({
  marginInline: vars.spacing["24"],
});

export const option = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: 52,
  padding: `0 ${vars.spacing["24"]}`,
  border: "none",
  backgroundColor: "transparent",
  textAlign: "left",
  cursor: "pointer",
});

export const optionSelected = style({
  backgroundColor: SELECTED_BACKGROUND,
  animationName: selectBlink,
  animationDuration: "240ms",
  animationTimingFunction: "steps(1, end)",
});
