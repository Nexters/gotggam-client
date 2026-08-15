import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const page = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  overflow: "hidden",
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const endingBackground = style({
  position: "absolute",
  inset: 0,
  animationName: fadeIn,
  animationDuration: "600ms",
  animationTimingFunction: "ease-out",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

export const endingBackgroundImage = style({
  objectFit: "cover",
});

export const cardStage = style({
  position: "relative",
  display: "flex",
  flex: 1,
  minHeight: 0,
  flexDirection: "column",
  alignItems: "center",
});

// 명부 등장 모션 — 여러 바퀴 돌며 내려앉고 살짝 오버슈트 후 정착한다.
// (레퍼런스: 3D 카드 회전 + 반사광. 반사광은 ledger-card의 sheen이 담당)
const cardEntry = keyframes({
  "0%": {
    transform:
      "perspective(900px) translateY(-40px) rotateY(900deg) scale(0.4)",
    opacity: 0,
  },
  "45%": {
    opacity: 1,
  },
  "80%": {
    transform: "perspective(900px) translateY(3px) rotateY(-12deg) scale(1.02)",
  },
  "100%": {
    transform: "perspective(900px) translateY(0) rotateY(0deg) scale(1)",
  },
});

export const card = style({
  marginTop: vars.spacing["32"],
  animationName: cardEntry,
  animationDuration: "1.4s",
  animationTimingFunction: "cubic-bezier(0.3, 0.75, 0.25, 1)",
  animationFillMode: "backwards",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

// 뒤집기 안내 — 은은하게 깜빡여 인터랙션을 유도한다.
const hintPulse = keyframes({
  "0%, 100%": { opacity: 0.95 },
  "50%": { opacity: 0.45 },
});

export const flipHint = style({
  marginTop: vars.spacing["12"],
  padding: `${vars.spacing["4"]} ${vars.spacing["12"]}`,
  border: "none",
  background: "none",
  cursor: "pointer",
  animationName: hintPulse,
  animationDuration: "1.8s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

export const bubbleArea = style({
  position: "absolute",
  insetInline: vars.spacing["16"],
  bottom: vars.spacing["24"],
});

// 엔딩 마무리 — 화면이 4번 깜빡이다 암전된 채 홈으로 전환된다 (end-bridge와 같은 리듬).
// steps(1, end)라 각 키프레임 값이 다음 키프레임까지 유지된다.
const blackoutBlink = keyframes({
  "0%": { opacity: 0 },
  "14.29%": { opacity: 1 },
  "22.86%": { opacity: 0 },
  "34.29%": { opacity: 1 },
  "42.86%": { opacity: 0 },
  "54.29%": { opacity: 1 },
  "62.86%": { opacity: 0 },
  "74.29%": { opacity: 1 },
  "82.86%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const blackout = style({
  position: "absolute",
  inset: 0,
  zIndex: 2,
  backgroundColor: vars.color.black,
  animationName: blackoutBlink,
  animationDuration: "1400ms",
  animationTimingFunction: "steps(1, end)",
  animationFillMode: "forwards",
});
