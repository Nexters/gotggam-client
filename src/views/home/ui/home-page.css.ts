import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

// 배경이 먼저 떠오르고, lottie가 준비되면 나머지 요소가 한 번에 서서히
// 나타난다. keyframes가 아니라 transition을 쓰는 이유는 등장 시점이 "첫
// 페인트"가 아니라 리소스 로드 완료라서 상태 변화에 묶여야 하기 때문이다.
function hidden(durationMs: number, delayMs = 0) {
  return style({
    opacity: 0,
    transition: `opacity ${durationMs}ms ease-out ${delayMs}ms`,
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  });
}

// 로고·캐릭터·CTA가 등장하기까지 배경만 떠 있는 시간. CSS transition-delay가
// 아니라 상태로 잡는다 — lottie 재생을 등장과 같은 시점에 시작해야 해서
// 컴포넌트도 이 값을 알아야 하기 때문이다.
export const REVEAL_DELAY_MS = 1400;

export const reveal = hidden(300);

// 배경과 로고·캐릭터·CTA가 같은 페이드를 쓴다. 늦게 얹히는 건 딜레이 덕이다.
export const revealSlow = hidden(1200);

// reveal/revealSlow보다 뒤에 선언해야 같은 특이도에서 opacity를 덮어쓴다.
export const revealed = style({
  opacity: 1,
});

// topBar는 원래 0.8로 흐리게 두는 곳이라 등장 후 도달점도 0.8이다.
export const revealedDimmed = style({
  opacity: 0.8,
});

export const page = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  maxHeight: "100%",
  overflow: "hidden",
  color: vars.color.white,
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

// 로고·캐릭터·CTA를 한 레이어로 묶어서 배경처럼 한 번에 떠오르게 한다.
export const revealArea = style({
  position: "relative",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  minHeight: 0,
});

export const topBar = style({
  display: "flex",
  justifyContent: "flex-end",
  padding: vars.spacing["16"],
});

export const content = style({
  position: "relative",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const logo = style({
  width: "60%",
  height: "auto",
});

export const character = style({
  width: "115%",
  aspectRatio: "1 / 1",
  marginTop: vars.spacing["30"],
});

export const footer = style({
  position: 'absolute',
  bottom: 0,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: `0 ${vars.spacing["20"]} ${vars.spacing["36"]}`,
});
