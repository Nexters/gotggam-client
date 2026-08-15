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

// 엔딩 마무리 — end-bridge와 동일한 "빰 - 빠밤 - 빰" 리듬으로 깜빡이다
// 암전된 채 홈으로 전환된다. 마지막 암전은 걷지 않는다: 홈의 페이드인이
// 곧 걷히는 연출이라, 여기서 걷으면 깜빡임이 한 번 더 있어 보인다.
// (수치 변경 시 end-bridge-page.css.ts와 함께 맞출 것)
const BLACKOUT_DURATION_MS = 1160;

const at = (ms: number) => `${(ms / BLACKOUT_DURATION_MS) * 100}%`;

const blackoutBlink = keyframes({
  "0%": { opacity: 0 },
  [at(200)]: { opacity: 1 },
  [at(320)]: { opacity: 0 },
  [at(560)]: { opacity: 1 },
  [at(640)]: { opacity: 0 },
  [at(740)]: { opacity: 1 },
  [at(860)]: { opacity: 0 },
  "100%": { opacity: 1 },
});

export const blackout = style({
  position: "absolute",
  inset: 0,
  zIndex: 2,
  backgroundColor: vars.color.background,
  animationName: blackoutBlink,
  animationDuration: `${BLACKOUT_DURATION_MS}ms`,
  animationTimingFunction: "steps(1, end)",
  animationFillMode: "forwards",
});
