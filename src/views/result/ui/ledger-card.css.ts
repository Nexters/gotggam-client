import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

// 명부 카드는 이미지 저장까지 고려한 고정 크기 아트웍이라, Figma 스크린 스펙(252×441)의
// px 좌표·크기를 그대로 쓴다. (Galmuri 9는 아직 번들에 없어 Galmuri 11로 대체)
const LABEL_COLOR = "#d8c5ef";

export const card = style({
  position: "relative",
  width: 252,
  height: 441,
  fontFamily: vars.font.galmuri11,
  color: vars.color.white,
});

export const frameLayer = style({
  objectFit: "fill",
  imageRendering: "pixelated",
  pointerEvents: "none",
});

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
  color: LABEL_COLOR,
  fontSize: 10.1,
  whiteSpace: "nowrap",
});

export const nameLabel = style([
  label,
  { left: 133.5, top: 72, fontWeight: vars.fontWeight.bold, lineHeight: 1.5, letterSpacing: "-0.11px" },
]);

export const birthLabel = style([
  label,
  { left: 133.5, top: 139, fontWeight: vars.fontWeight.bold, lineHeight: 1.5, letterSpacing: "-0.11px" },
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

export const commentValue = style({
  position: "absolute",
  left: 180.8,
  top: 224.7,
  width: 100,
  transform: "translateX(-50%)",
  fontSize: 13.4,
  lineHeight: 1.6,
  letterSpacing: "-0.15px",
  textAlign: "center",
});

export const warningValue = style({
  position: "absolute",
  left: 26.9,
  top: 330.5,
  maxWidth: 200,
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
