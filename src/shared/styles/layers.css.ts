import { globalLayer } from "@vanilla-extract/css";

// 선언 순서가 곧 캐스케이드 우선순위다: reset < ui-base < ui-variant < (레이어 없는 스타일).
// 공용 컴포넌트의 기본 스킨·리셋을 레이어에 넣어두면, 사용처(레이어 없음)가
// CSS 주입 순서·특이도와 무관하게 언제나 덮어쓸 수 있다.
export const reset = globalLayer("reset");

/** 공용 컴포넌트의 기본 스킨 (예: Button의 배경·패딩·hover) */
export const uiBase = globalLayer("ui-base");

/** 기본 스킨을 걷어내는 변형 (예: PixelCornerButton의 리셋) */
export const uiVariant = globalLayer("ui-variant");
