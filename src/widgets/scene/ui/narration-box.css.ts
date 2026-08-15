import { createVar, fallbackVar, style } from "@vanilla-extract/css";

import { pixelBlink } from "@/shared/styles/animations.css";
import { getPixelCornerClipPath } from "@/shared/styles/pixel-corner";
import { vars } from "@/shared/styles/theme.css";

// 하단 오프셋은 화면마다 다르다(프롤로그 48px, 질문 96px). 기본값은 프롤로그 시안
// 기준이고, 다른 화면은 NarrationBox의 className으로 narrationBottomVar를 덮어쓴다.
export const narrationBottomVar = createVar();
export const NARRATION_BOTTOM = 48;
export const NARRATION_HEIGHT = 123;

export const narration = style({
  position: "absolute",
  insetInline: vars.spacing["16"],
  bottom: fallbackVar(narrationBottomVar, `${NARRATION_BOTTOM / 10}rem`),
  cursor: "pointer",
  userSelect: "none",
});

export const bubble = style({
  // 110px 고정. 좁은 화면에서 대사가 3줄로 꺾여 넘치면 잘리는 대신
  // 스크롤바 없는 내부 스크롤로 넘긴다. 서버 피드백은 길이 보장이 없다.
  height: "11rem",
  overflowY: "auto",
  padding: `${vars.spacing["24"]} ${vars.spacing["20"]}`,
  marginTop: "1.3rem",
  backgroundColor: vars.color.accent5["11"],
  clipPath: `polygon(${getPixelCornerClipPath(4)})`,

  msOverflowStyle: "none",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const bubbleText = style({
  whiteSpace: "pre-line",
  lineHeight: "160%",
  letterSpacing: "-0.0242rem",
  // 우하단 다음 버튼(2.4rem, right 2rem)이 떠 있는 세로 띠를 텍스트가
  // 침범하지 않도록 비워둔다. 없으면 마지막 줄 꼬리를 아이콘이 가린다.
  paddingRight: "2.4rem",
});

// 말풍선(2단 계단)과 달리 이름표 모서리는 4px 한 단만 잘려나간다.
const nameTagClipPath = [
  "0 4px",
  "4px 4px",
  "4px 0",
  "calc(100% - 4px) 0",
  "calc(100% - 4px) 4px",
  "100% 4px",
  "100% calc(100% - 4px)",
  "calc(100% - 4px) calc(100% - 4px)",
  "calc(100% - 4px) 100%",
  "4px 100%",
  "4px calc(100% - 4px)",
  "0 calc(100% - 4px)",
].join(", ");

export const nameTag = style({
  position: "absolute",
  top: 0,
  left: vars.spacing["16"],
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "2.6rem",
  padding: `0 ${vars.spacing["20"]}`,
  backgroundColor: vars.color.accent5["10"],
  clipPath: `polygon(${nameTagClipPath})`,
});

export const nextButton = style({
  position: "absolute",
  right: vars.spacing["20"],
  bottom: vars.spacing["20"],
  width: "2.4rem",
  height: "2.4rem",
  animationName: pixelBlink,
  animationDuration: "1s",
  animationTimingFunction: "steps(1, end)",
  animationIterationCount: "infinite",
});
