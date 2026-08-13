import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import {
  NARRATION_BOTTOM,
  NARRATION_HEIGHT,
} from "@/widgets/scene/ui/narration-box.css";

// 디자인 기준(852px 프레임): 캐릭터 하단이 나레이션 위쪽 68px을 덮는다.
const CHARACTER_OVERLAP = 68;

export const page = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: vars.color.background,
});

export const content = style({
  position: "relative",
  flex: 1,
});

export const character = style({
  position: "absolute",
  bottom: NARRATION_BOTTOM + NARRATION_HEIGHT - CHARACTER_OVERLAP,
  left: "50%",
  transform: "translateX(-50%)",
  width: "105%",
  aspectRatio: "1 / 1",
});
