import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

const BLINK_DURATION_MS = 1400;

// 1400ms 동안 화면이 4번 암전됐다가, 마지막엔 배경만 남은 상태로 끝난다.
// steps(1, end)라 각 키프레임 값이 다음 키프레임까지 그대로 유지된다 —
// 퍼센트가 곧 "몇 ms에 켜지고 꺼지는지"를 뜻한다.
const blackout = keyframes({
  "0%": { opacity: 0 },
  "14.29%": { opacity: 1 },
  "22.86%": { opacity: 0 },
  "34.29%": { opacity: 1 },
  "42.86%": { opacity: 0 },
  "54.29%": { opacity: 1 },
  "62.86%": { opacity: 0 },
  "74.29%": { opacity: 1 },
  "82.86%": { opacity: 0 },
  "100%": { opacity: 0 },
});

// 마지막(4번째) 암전 중에 캐릭터가 사라져서, 암전이 걷히면 배경만 남는다.
const disappear = keyframes({
  "0%": { opacity: 1 },
  "74.29%": { opacity: 0 },
  "100%": { opacity: 0 },
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

export const characterDisappearing = style({
  animationName: disappear,
  animationDuration: `${BLINK_DURATION_MS}ms`,
  animationTimingFunction: "steps(1, end)",
  animationFillMode: "forwards",
});

export const blackoutOverlay = style({
  position: "absolute",
  inset: 0,
  backgroundColor: vars.color.black,
  animationName: blackout,
  animationDuration: `${BLINK_DURATION_MS}ms`,
  animationTimingFunction: "steps(1, end)",
  animationFillMode: "forwards",
});
