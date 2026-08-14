import { style } from "@vanilla-extract/css";

export const root = style({
  position: "relative",
  // 모든 파츠 원본이 공유하는 240×300 캔버스 비율
  aspectRatio: "240 / 300",
});

export const layer = style({
  imageRendering: "pixelated",
});
