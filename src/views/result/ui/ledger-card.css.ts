import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

// 명부 카드는 이미지 저장까지 고려한 고정 크기 아트웍이라, Figma 스크린 스펙(252×441)의
// px 좌표·크기를 그대로 쓴다. (Galmuri 9는 아직 번들에 없어 Galmuri 11로 대체)
const FRONT_LABEL_COLOR = "#d8c5ef";
const BACK_LABEL_COLOR = "#d6c0ff";

/* ── 3D 뒤집기 골격 ─────────────────────────────── */

export const scene = style({
  width: 252,
  height: 441,
  perspective: "900px",
});

export const card3d = style({
  position: "relative",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform 550ms cubic-bezier(0.24, 0.9, 0.32, 1.06)",
  willChange: "transform",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "transform 0ms",
    },
  },
});

export const card3dDragging = style({
  transition: "none",
});

export const card3dInteractive = style({
  cursor: "grab",
  // 세로 스크롤은 페이지에 남기고 가로 드래그만 카드가 가져간다.
  touchAction: "pan-y",
  userSelect: "none",
  WebkitUserSelect: "none",
  selectors: {
    "&:active": {
      cursor: "grabbing",
    },
  },
});

export const face = style({
  position: "absolute",
  inset: 0,
  fontFamily: vars.font.galmuri11,
  color: vars.color.white,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
});

export const backFace = style({
  transform: "rotateY(180deg)",
});

// 등장 직후 카드 표면을 쓸고 지나가는 반사광 (레퍼런스: 3D 카드 회전 + 반사광)
const sheenSweep = keyframes({
  "0%": { backgroundPosition: "140% 0", opacity: 0 },
  "12%": { opacity: 1 },
  "100%": { backgroundPosition: "-60% 0", opacity: 0 },
});

export const sheen = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background:
    "linear-gradient(115deg, transparent 42%, rgba(255, 255, 255, 0.45) 50%, transparent 58%)",
  backgroundSize: "260% 100%",
  backgroundRepeat: "no-repeat",
  mixBlendMode: "screen",
  opacity: 0,
  animationName: sheenSweep,
  animationDuration: "900ms",
  animationDelay: "950ms",
  animationTimingFunction: "ease-out",
  animationFillMode: "both",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
});

export const frameLayer = style({
  objectFit: "fill",
  imageRendering: "pixelated",
  pointerEvents: "none",
});

/* ── 앞면 ───────────────────────────────────────── */

export const profile = style({
  position: "absolute",
  left: 19.7,
  top: 68.9,
  width: 98.3,
  height: 110.5,
  overflow: "hidden",
  // 한 칸(2px)짜리 픽셀 코너
  clipPath:
    "polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))",
});

export const profileBackdrop = style({
  objectFit: "cover",
  objectPosition: "50% 0%",
});

export const profileFace = style({
  position: "absolute",
  left: "5.1%",
  top: 0,
  width: "89.7%",
});

export const logo = style({
  position: "absolute",
  left: "50%",
  top: 28,
  transform: "translateX(-50%)",
  fontSize: 13.4,
  lineHeight: 1.5,
  letterSpacing: "-0.15px",
  whiteSpace: "nowrap",
});

const label = style({
  position: "absolute",
  color: FRONT_LABEL_COLOR,
  fontSize: 10.1,
  whiteSpace: "nowrap",
});

export const nameLabel = style([
  label,
  {
    left: 133.5,
    top: 72,
    fontWeight: vars.fontWeight.bold,
    lineHeight: 1.5,
    letterSpacing: "-0.11px",
  },
]);

export const birthLabel = style([
  label,
  {
    left: 133.5,
    top: 139,
    fontWeight: vars.fontWeight.bold,
    lineHeight: 1.5,
    letterSpacing: "-0.11px",
  },
]);

const centeredLabel = style([
  label,
  { transform: "translateX(-50%)", lineHeight: 1.2, letterSpacing: "1.2px" },
]);

export const ageLabel = style([centeredLabel, { left: 50, top: 205 }]);

export const commentLabel = style([centeredLabel, { left: 178, top: 204 }]);

export const warningLabel = style([centeredLabel, { left: 51, top: 314 }]);

export const nameValue = style({
  position: "absolute",
  left: 133.5,
  top: 83.5,
  // 이름은 4자 고정 스펙이라 잘릴 일은 없지만 안전망으로 둔다.
  maxWidth: 112,
  fontSize: 25.6,
  lineHeight: 1.6,
  letterSpacing: "-0.28px",
  whiteSpace: "nowrap",
  overflow: "hidden",
});

export const birthValue = style({
  position: "absolute",
  left: 133.5,
  top: 158.3,
  fontSize: 13.9,
  lineHeight: 1.6,
  letterSpacing: "-0.15px",
  whiteSpace: "nowrap",
});

export const ageValue = style({
  position: "absolute",
  left: 30.2,
  top: 225.5,
  fontSize: 30.2,
  lineHeight: 1.2,
  letterSpacing: "3px",
  whiteSpace: "nowrap",
});

export const ageNumber = style({
  fontWeight: vars.fontWeight.bold,
});

// AI 생성 문구라 길이가 가변 — FitText가 이 박스에 맞춰 폰트를 줄인다.
export const commentValue = style({
  position: "absolute",
  left: 180.8,
  top: 224.7,
  width: 100,
  height: 62,
  transform: "translateX(-50%)",
  overflow: "hidden",
  fontSize: 13.4,
  lineHeight: 1.6,
  letterSpacing: "-0.15px",
  textAlign: "center",
});

export const warningValue = style({
  position: "absolute",
  left: 26.9,
  top: 330.5,
  width: 198,
  height: 58,
  overflow: "hidden",
  fontSize: 16.8,
  lineHeight: 1.6,
  letterSpacing: "-0.18px",
});

export const footer = style({
  position: "absolute",
  right: 93.9,
  top: 403.6,
  fontSize: 8,
  lineHeight: 1.6,
  letterSpacing: "-0.09px",
  whiteSpace: "nowrap",
});

/* ── 뒷면 ───────────────────────────────────────── */

export const detailsLabel = style({
  position: "absolute",
  left: 52.3,
  top: 60.5,
  transform: "translateX(-50%)",
  color: BACK_LABEL_COLOR,
  fontSize: 10.1,
  lineHeight: 1.2,
  letterSpacing: "1.2px",
  whiteSpace: "nowrap",
});

export const detailRows = style({
  position: "absolute",
  left: 28.6,
  top: 84.4,
  display: "flex",
  flexDirection: "column",
  gap: 15.1,
  width: 199,
});

export const detailRow = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
});

export const detailCategory = style({
  flexShrink: 0,
  fontSize: 10.1,
  lineHeight: 1.2,
  letterSpacing: "1.2px",
  whiteSpace: "nowrap",
});

export const gauge = style({
  position: "relative",
  flexShrink: 0,
  width: 112,
  height: 16.8,
});

export const gaugeFill = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  overflow: "hidden",
});

export const gaugeBarImage = style({
  width: 112,
  height: 16.8,
  maxWidth: "none",
  imageRendering: "pixelated",
});

export const detailYears = style({
  marginLeft: "auto",
  fontSize: 10.1,
  lineHeight: 1.2,
  letterSpacing: "1.2px",
  whiteSpace: "nowrap",
});

export const directivesLabel = style({
  position: "absolute",
  left: 62.4,
  top: 212.2,
  transform: "translateX(-50%)",
  color: BACK_LABEL_COLOR,
  fontSize: 11.8,
  lineHeight: 1.2,
  letterSpacing: "1.4px",
  whiteSpace: "nowrap",
});

// AI 생성 문구(최대 3개, 줄바꿈 가능) — FitText가 박스에 맞춰 폰트를 줄인다.
export const directives = style({
  position: "absolute",
  left: 19.7,
  top: 232,
  width: 213,
  height: 150,
  overflow: "hidden",
  fontSize: 13.4,
  lineHeight: 1.6,
  letterSpacing: "-0.15px",
});

export const directiveList = style({
  margin: 0,
  paddingLeft: 20,
});

export const directiveItem = style({
  marginBottom: 6,
  selectors: {
    "&:last-child": {
      marginBottom: 0,
    },
  },
});
