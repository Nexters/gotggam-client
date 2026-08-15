import { style } from "@vanilla-extract/css";

import { uiBase } from "@/shared/styles/layers.css";
import { getPixelCornerClipPath } from "@/shared/styles/pixel-corner";
import { vars } from "@/shared/styles/theme.css";

export const input = style({
  "@layer": {
    [uiBase]: {
      width: "100%",
      height: "4.8rem",
      padding: `0 ${vars.spacing["16"]}`,
      border: "none",
      outline: "none",
      backgroundColor: vars.color.gray["3"],
      clipPath: `polygon(${getPixelCornerClipPath(4)})`,
      fontFamily: vars.font.galmuri9,
      // iOS 사파리는 포커스된 인풋 폰트가 16px 미만이면 강제 줌인한다.
      // 루트 폰트 축소로 rem 값이 줄어도 하한이 지켜지도록 px로 고정한다.
      fontSize: "16px",
      color: vars.color.white,
      "::placeholder": {
        color: vars.color.gray["7"],
      },
    },
  },
});
