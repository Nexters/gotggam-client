import { style } from "@vanilla-extract/css";

/** 자릿수마다 다른 값을 넣어야 해서 인라인 스타일로 주입한다. */
export const rollDelayVar = "--rolling-number-roll-delay";

export const root = style({
  position: "relative",
  display: "inline-block",
  whiteSpace: "nowrap",
  fontVariantNumeric: "tabular-nums",
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
});

export const digit = style({
  position: "relative",
  display: "inline-block",
  overflow: "hidden",
  textAlign: "center",
  verticalAlign: "bottom",
});

export const placeholder = style({
  visibility: "hidden",
});

export const strip = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  transitionProperty: "transform",
  transitionDuration: "700ms",
  transitionTimingFunction: "cubic-bezier(0.34, 1.3, 0.5, 1)",
  transitionDelay: `var(${rollDelayVar}, 0ms)`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transitionDuration: "0ms",
      transitionDelay: "0ms",
    },
  },
});

export const cell = style({
  flex: "none",
  height: "100%",
});
