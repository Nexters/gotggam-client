import { keyframes } from "@vanilla-extract/css";

/** steps로 끊기게 깜빡여서 픽셀 게임 느낌을 유지한다. 진행 아이콘 등에 쓴다. */
export const pixelBlink = keyframes({
  "0%, 49%": { opacity: 1 },
  "50%, 100%": { opacity: 0.2 },
});
