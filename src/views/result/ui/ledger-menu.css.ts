import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

const SELECTED_BACKGROUND = "rgba(107, 76, 168, 0.32)";

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

// Figma 레이어 순서상 페이드는 메뉴 텍스트 아래(배경 쪽)에 깔린다.
export const bottomFade = style({
  position: "absolute",
  insetInline: 0,
  bottom: 0,
  height: 79,
  background:
    "linear-gradient(to bottom, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 0.85) 22%, #121212 100%)",
  pointerEvents: "none",
});
