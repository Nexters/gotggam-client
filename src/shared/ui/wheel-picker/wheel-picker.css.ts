import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const group = style({});

// 라이브러리 기본 마스크(20/80 완만한 페이드)는 포커스 밖 행이 너무 선명하다.
// 디자인의 Bottom Fade(포커스 행 밖으로 빠르게 배경색에 잦아듦)에 맞춰,
// 가운데 포커스 행만 온전히 보이고 인접 행은 급격히 어두워지게 교체한다.
const focusMask = `linear-gradient(
  to bottom,
  transparent 0%,
  rgba(0, 0, 0, 0.15) 30%,
  black 38%,
  black 62%,
  rgba(0, 0, 0, 0.15) 70%,
  transparent 100%
)`;

globalStyle(`${group} [data-rwp]`, {
  WebkitMaskImage: focusMask,
  maskImage: focusMask,
});

// 라이브러리 기본 규칙([data-rwp-option] { font-size: .875rem })과 클래스 하나로는
// 특이도가 같아 CSS 방출 순서에 따라 밀린다. 속성 선택자를 겹쳐 항상 이기게 한다.
export const optionItem = style({
  selectors: {
    "&[data-rwp-option]": {
      fontFamily: vars.font.galmuri11,
      fontSize: vars.fontSize["24"],
      color: vars.color.white,
    },
  },
});

// 링 위의 아이템과 중앙 하이라이트 레이어가 같은 텍스트를 겹쳐 그려 이중으로
// 보이므로 하이라이트는 숨긴다. 선택 강조는 상하 페이드 마스크가 담당한다.
export const highlightWrapper = style({
  display: "none",
});
