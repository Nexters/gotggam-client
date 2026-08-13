import { style } from "@vanilla-extract/css";

import { NARRATION_BOTTOM, NARRATION_HEIGHT } from "./narration-box.css";

const CHARACTER_OVERLAP = 68;

export const character = style({
  position: "absolute",
  bottom: NARRATION_BOTTOM + NARRATION_HEIGHT - CHARACTER_OVERLAP,
  left: "50%",
  transform: "translateX(-50%)",
  width: "105%",
  aspectRatio: "1 / 1",
});
