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

// 명부 등장 모션 — 아래에서 떠오르며 정착한다. transform(2D)+opacity만 써서
// 저사양 모바일에서도 합성기만으로 돌게 한다. (3D 회전은 실기기에서 프레임 드랍)
// 반사광은 ledger-card의 sheen이 등장 직후 이어받는다.
const cardEntry = keyframes({
  "0%": {
    transform: "translateY(26px) scale(0.94)",
    opacity: 0,
  },
  "100%": {
    transform: "translateY(0) scale(1)",
    opacity: 1,
  },
});

export const card = style({
  animationName: cardEntry,
  animationDuration: "550ms",
  animationTimingFunction: "cubic-bezier(0.25, 0.9, 0.3, 1)",
  animationFillMode: "backwards",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

// 바텀시트 상태에 맞춰 카드가 커지고 작아진다. 스케일 값은 result-page.tsx가
// Figma [card_drawer] 기준(닫힘 300 / 열림 220, 카드 원본 252)으로 계산한다.
export const cardScaleBox = style({
  marginTop: vars.spacing["20"],
  transformOrigin: "top center",
  transition: "transform 480ms cubic-bezier(0.22, 0.9, 0.3, 1)",
  willChange: "transform",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "transform 0ms",
    },
  },
});

export const cardScaleBoxDragging = style({
  transition: "none",
});

// 뒤집기 안내 — 카드 위에서 은은하게 깜빡여 인터랙션을 유도한다.
const hintPulse = keyframes({
  "0%, 100%": { opacity: 0.95 },
  "50%": { opacity: 0.45 },
});

// 앱바가 없는 화면이라 상단 여백을 직접 확보한다 (Figma hint y85, 상태바 제외 ≈ 31)
export const flipHint = style({
  marginTop: vars.spacing["32"],
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
