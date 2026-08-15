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

// 디자인 프레임(393×852)에서 1rem = 10px. 뷰포트가 프레임보다 작으면 가로·세로 중
// 더 부족한 축의 비율만큼 루트 폰트가 줄어 rem 수치 전체가 함께 축소된다.
// (10px × 100 / 393 ≈ 2.5445vw, 10px × 100 / 852 ≈ 1.1737svh, 하한 8px 상한 10px)
// svh 미지원 브라우저는 clamp 선언 전체가 무효라 62.5%(=10px, 스케일 없음)로 동작한다.
globalStyle("html", {
  fontSize: ["62.5%", "clamp(8px, min(2.5445vw, 1.1737svh), 10px)"],
  // 모바일 브라우저의 자동 글자 확대(font boosting)가 고정 크기 아트웍(명부 카드)을 깨뜨리지 않게 한다.
  WebkitTextSizeAdjust: "100%",
  textSizeAdjust: "100%",
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
