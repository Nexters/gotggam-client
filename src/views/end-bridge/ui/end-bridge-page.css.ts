import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

// 4번째 암전은 여기서 걷지 않고, 검은 화면 그대로 홈으로 넘긴다.
// 홈의 페이드인이 곧 4번째 암전이 걷히는 연출이라, 여기서 한 번 더 걷으면
// 깜빡임이 5번으로 보인다.
const BLINK_DURATION_MS = 1160;

const at = (ms: number) => `${(ms / BLINK_DURATION_MS) * 100}%`;

// "빰 - 빠밤 - 빰" 리듬. 2·3번째가 붙어서 한 박처럼 들리고, 앞뒤로 쉼이 있다.
// steps(1, end)라 각 키프레임 값이 다음 키프레임까지 그대로 유지된다 —
// 퍼센트가 곧 "몇 ms에 켜지고 꺼지는지"를 뜻한다.
const blackout = keyframes({
  "0%": { opacity: 0 },
  [at(200)]: { opacity: 1 },
  [at(320)]: { opacity: 0 },
  [at(560)]: { opacity: 1 },
  [at(640)]: { opacity: 0 },
  [at(740)]: { opacity: 1 },
  [at(860)]: { opacity: 0 },
  "100%": { opacity: 1 },
});

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

export const content = style({
  position: "relative",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const character = style({
  width: "115%",
  aspectRatio: "1 / 1",
});

export const blackoutOverlay = style({
  position: "absolute",
  inset: 0,
  backgroundColor: vars.color.background,
  animationName: blackout,
  animationDuration: `${BLINK_DURATION_MS}ms`,
  animationTimingFunction: "steps(1, end)",
  animationFillMode: "forwards",
});
