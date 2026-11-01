import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

const FADE_IN_DURATION_MS = 900;
const FADE_OUT_DURATION_MS = 700;

const REDUCED_MOTION_TRANSITION = "opacity 1ms linear";

export const screen = style({
  opacity: 0,
  pointerEvents: "none",
  transition: `opacity ${FADE_OUT_DURATION_MS}ms ease-in`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: REDUCED_MOTION_TRANSITION,
    },
  },
});

// screen보다 뒤에 선언해야 같은 특이도에서 opacity를 덮어쓴다.
export const screenVisible = style({
  opacity: 1,
  pointerEvents: "auto",
  transition: `opacity ${FADE_IN_DURATION_MS}ms ease-out`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: REDUCED_MOTION_TRANSITION,
    },
  },
});

const stepBodyRise = keyframes({
  from: { transform: "translateY(0.8rem)" },
  to: { transform: "none" },
});

// 페이드는 화면 전체가 맡으므로 여기선 움직임만 얹는다. 배경·캐릭터는 단계가
// 바뀌어도 그대로라, 이 미세한 움직임이 있어야 어디가 바뀌었는지 눈에 들어온다.
export const stepBody = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  animation: `${stepBodyRise} ${FADE_IN_DURATION_MS}ms ease-out both`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const page = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  overflow: "hidden",
  background: `linear-gradient(to bottom, #29123c, ${vars.color.background})`,
});

export const content = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
  paddingTop: "11.3rem",
});

// 디자인의 Galmuri9/Pretendard 텍스트는 tracking -0.6px 를 쓴다. 기본 타이포(0px)로
// 두면 설명 문구가 한 줄 더 흘러 디자인의 두 줄 구성이 깨진다.
const DESIGN_TRACKING = "-0.06rem";

export const heading = style({
  marginTop: vars.spacing["28"],
  textAlign: "center",
  letterSpacing: DESIGN_TRACKING,
});

export const headingLine = style({
  display: "block",
});

export const description = style({
  marginTop: vars.spacing["12"],
  // 디자인 폭은 229px 이지만 본문 폰트가 Pretendard 가 아닌 Spoqa 라 첫 줄이 0.3px
  // 넘쳐 세 줄로 흐른다. 디자인의 두 줄 구성을 지키려고 3px 만 넓혔다.
  width: "23.2rem",
  textAlign: "center",
  letterSpacing: DESIGN_TRACKING,
  wordBreak: "keep-all",
});

export const character = style({
  width: "34.1rem",
  aspectRatio: "1 / 1",
  marginTop: "6.1rem",
});

export const ctaRow = style({
  position: "absolute",
  insetInline: vars.spacing["16"],
  bottom: `calc(${vars.spacing["32"]} + env(safe-area-inset-bottom, 0px))`,
  display: "flex",
  gap: "1.3rem",
});

const ctaButton = style({
  flex: 1,
  height: "5.2rem",
  color: vars.color.white,
});

export const backButton = style([
  ctaButton,
  { backgroundColor: vars.color.gray["8"] },
]);

export const confirmButton = style([
  ctaButton,
  {
    background: `linear-gradient(to right, ${vars.color.accent2["9"]}, ${vars.color.accent3["9"]})`,
  },
]);
