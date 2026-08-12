import { style, styleVariants } from "@vanilla-extract/css";

import { uiBase } from "./layers.css";
import { vars } from "./theme.css";

// Figma [디자인 작업장 > Typography] 문서 기준. 모든 스타일이 line-height 150%,
// letter-spacing 0px를 공유하므로 base에 고정하고, family/size/weight만 조합한다.
// ui-base 레이어에 둬서 사용처(레이어 없는 클래스)가 개별 속성을 항상 덮어쓸 수 있다.
export const base = style({
  "@layer": {
    [uiBase]: {
      lineHeight: vars.lineHeight.normal,
      letterSpacing: vars.letterSpacing.normal,
    },
  },
});

export const family = styleVariants(vars.font, (fontFamily) => ({
  "@layer": { [uiBase]: { fontFamily } },
}));

export const size = styleVariants(vars.fontSize, (fontSize) => ({
  "@layer": { [uiBase]: { fontSize } },
}));

export const weight = styleVariants(vars.fontWeight, (fontWeight) => ({
  "@layer": { [uiBase]: { fontWeight } },
}));

// vars.color의 12단계 스케일(accent1-5, gray)과 단일 토큰(white/black/background 등)을
// 하나의 평탄한 컬러 토큰 맵으로 만든다.
const colorTokens = {
  white: vars.color.white,
  black: vars.color.black,
  background: vars.color.background,
  opacityWhite150: vars.color.opacityWhite150,
  opacityBlack100: vars.color.opacityBlack100,
  opacityBlack500: vars.color.opacityBlack500,
  "gray-1": vars.color.gray["1"],
  "gray-2": vars.color.gray["2"],
  "gray-3": vars.color.gray["3"],
  "gray-4": vars.color.gray["4"],
  "gray-5": vars.color.gray["5"],
  "gray-6": vars.color.gray["6"],
  "gray-7": vars.color.gray["7"],
  "gray-8": vars.color.gray["8"],
  "gray-9": vars.color.gray["9"],
  "gray-10": vars.color.gray["10"],
  "gray-11": vars.color.gray["11"],
  "gray-12": vars.color.gray["12"],
  "accent1-1": vars.color.accent1["1"],
  "accent1-2": vars.color.accent1["2"],
  "accent1-3": vars.color.accent1["3"],
  "accent1-4": vars.color.accent1["4"],
  "accent1-5": vars.color.accent1["5"],
  "accent1-6": vars.color.accent1["6"],
  "accent1-7": vars.color.accent1["7"],
  "accent1-8": vars.color.accent1["8"],
  "accent1-9": vars.color.accent1["9"],
  "accent1-10": vars.color.accent1["10"],
  "accent1-11": vars.color.accent1["11"],
  "accent1-12": vars.color.accent1["12"],
  "accent2-1": vars.color.accent2["1"],
  "accent2-2": vars.color.accent2["2"],
  "accent2-3": vars.color.accent2["3"],
  "accent2-4": vars.color.accent2["4"],
  "accent2-5": vars.color.accent2["5"],
  "accent2-6": vars.color.accent2["6"],
  "accent2-7": vars.color.accent2["7"],
  "accent2-8": vars.color.accent2["8"],
  "accent2-9": vars.color.accent2["9"],
  "accent2-10": vars.color.accent2["10"],
  "accent2-11": vars.color.accent2["11"],
  "accent2-12": vars.color.accent2["12"],
  "accent3-1": vars.color.accent3["1"],
  "accent3-2": vars.color.accent3["2"],
  "accent3-3": vars.color.accent3["3"],
  "accent3-4": vars.color.accent3["4"],
  "accent3-5": vars.color.accent3["5"],
  "accent3-6": vars.color.accent3["6"],
  "accent3-7": vars.color.accent3["7"],
  "accent3-8": vars.color.accent3["8"],
  "accent3-9": vars.color.accent3["9"],
  "accent3-10": vars.color.accent3["10"],
  "accent3-11": vars.color.accent3["11"],
  "accent3-12": vars.color.accent3["12"],
  "accent4-1": vars.color.accent4["1"],
  "accent4-2": vars.color.accent4["2"],
  "accent4-3": vars.color.accent4["3"],
  "accent4-4": vars.color.accent4["4"],
  "accent4-5": vars.color.accent4["5"],
  "accent4-6": vars.color.accent4["6"],
  "accent4-7": vars.color.accent4["7"],
  "accent4-8": vars.color.accent4["8"],
  "accent4-9": vars.color.accent4["9"],
  "accent4-10": vars.color.accent4["10"],
  "accent4-11": vars.color.accent4["11"],
  "accent4-12": vars.color.accent4["12"],
  "accent5-1": vars.color.accent5["1"],
  "accent5-2": vars.color.accent5["2"],
  "accent5-3": vars.color.accent5["3"],
  "accent5-4": vars.color.accent5["4"],
  "accent5-5": vars.color.accent5["5"],
  "accent5-6": vars.color.accent5["6"],
  "accent5-7": vars.color.accent5["7"],
  "accent5-8": vars.color.accent5["8"],
  "accent5-9": vars.color.accent5["9"],
  "accent5-10": vars.color.accent5["10"],
  "accent5-11": vars.color.accent5["11"],
  "accent5-12": vars.color.accent5["12"],
} as const;

export const color = styleVariants(colorTokens, (value) => ({
  "@layer": { [uiBase]: { color: value } },
}));
