import { vars } from "./theme.css";

type FontFamilyToken = keyof typeof vars.font;
type FontSizeToken = keyof typeof vars.fontSize;

// 모든 타이포 토큰은 line-height 150%, letter-spacing 0px를 공유한다 (Figma Typography 문서).
export function textStyle(family: FontFamilyToken, size: FontSizeToken) {
  return {
    fontFamily: vars.font[family],
    fontSize: vars.fontSize[size],
    lineHeight: vars.lineHeight.normal,
    letterSpacing: vars.letterSpacing.normal,
  } as const;
}
