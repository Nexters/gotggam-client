import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

const SELECTED_BACKGROUND = "#3b314f";

// 선택 순간 선택색↔투명을 깜빡이고 정착한다 (choice-panel과 같은 픽셀 게임 연출).
const selectBlink = keyframes({
  "0%": { backgroundColor: SELECTED_BACKGROUND },
  "25%": { backgroundColor: "transparent" },
  "50%": { backgroundColor: SELECTED_BACKGROUND },
  "75%": { backgroundColor: "transparent" },
  "100%": { backgroundColor: SELECTED_BACKGROUND },
});

// 배경(어두운 패널 + 블러)은 바텀시트(ledger-drawer)가 깐다.
export const panel = style({
  position: "relative",
  paddingTop: vars.spacing["8"],
  paddingBottom: vars.spacing["24"],
});

export const item = style({
  position: "relative",
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

export const itemSelected = style({
  backgroundColor: SELECTED_BACKGROUND,
  animationName: selectBlink,
  animationDuration: "240ms",
  animationTimingFunction: "steps(1, end)",
});

