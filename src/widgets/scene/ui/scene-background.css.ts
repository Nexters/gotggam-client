import { style } from "@vanilla-extract/css";

export const backgroundLayer = style({
  position: "absolute",
  inset: 0,
});

export const backgroundImage = style({
  objectFit: "cover",
});

// 디자인의 bg_dark 변형: 이미지가 20%만 비치도록 살짝 블러를 더해 어둡게 깔린다.
export const backgroundImageDimmed = style({
  filter: "blur(2px)",
});

export const backgroundOverlay = style({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(18, 18, 18, 0.4)",
});

export const backgroundOverlayDimmed = style({
  backgroundColor: "rgba(18, 18, 18, 0.8)",
});
