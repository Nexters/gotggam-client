import { globalStyle } from "@vanilla-extract/css";

import "./font-face.css";

import { reset } from "./layers.css";
import { semantic, vars } from "./theme.css";

// 전역 리셋은 reset 레이어에 둔다. 레이어 없는 규칙은 레이어 규칙을 항상
// 이기므로, 리셋을 레이어 밖에 두면 ui-base/ui-variant의 컴포넌트 스킨을 덮어버린다.
globalStyle("*, *::before, *::after", {
  "@layer": {
    [reset]: {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
    },
  },
});

globalStyle("html, body", {
  height: "100%",
  maxWidth: "100vw",
  overflowX: "hidden",
});

globalStyle("body", {
  backgroundColor: semantic.color.bgCanvas,
  overscrollBehavior: "none",
  color: vars.color.gray["12"],
  fontFamily: vars.font.spoqa,
  fontWeight: vars.fontWeight.regular,
  lineHeight: vars.lineHeight.normal,
  letterSpacing: vars.letterSpacing.normal,
  WebkitFontSmoothing: "antialiased",
});

globalStyle("a", {
  "@layer": {
    [reset]: {
      color: "inherit",
      textDecoration: "none",
    },
  },
});

globalStyle("button", {
  "@layer": {
    [reset]: {
      font: "inherit",
    },
  },
});
