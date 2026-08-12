import { style } from "@vanilla-extract/css";

import { uiVariant } from "@/shared/styles/layers.css";

// Button의 기본 스킨(ui-base)을 걷어내는 리셋이므로 한 단계 위인 ui-variant 레이어에
// 둔다. 배경·크기 등은 사용처(레이어 없는 스타일)가 정하며, 언제나 이 리셋을 이긴다.
export const pixelCornerButton = style({
  "@layer": {
    [uiVariant]: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      border: "none",
      borderRadius: 0,
      background: "none",
      cursor: "pointer",
      selectors: {
        "&:disabled": {
          cursor: "not-allowed",
        },
      },
    },
  },
});
