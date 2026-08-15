import { style } from "@vanilla-extract/css";

export const scene = style({
  position: "relative",
  display: "flex",
  flex: 1,
  minHeight: 0,
  flexDirection: "column",
});

// 디자인상 캐릭터는 말풍선 바로 위에 붙는다 (스포트라이트 하단부).
export const characterArea = style({
  display: "flex",
  flex: 1,
  alignItems: "flex-end",
  justifyContent: "center",
  overflow: "hidden",
});

// 캐릭터(로티/이미지)와 오버레이(이름 배지 등)의 공통 기준 박스
export const characterBox = style({
  position: "relative",
  width: "92%",
  maxWidth: 400,
  aspectRatio: "1 / 1",
  marginBottom: -12,
});

export const character = style({
  width: "100%",
  height: "100%",
  opacity: 0,
  transition: "opacity 400ms ease-out",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});

export const characterVisible = style({
  opacity: 1,
});

export const characterImage = style({
  objectFit: "contain",
  imageRendering: "pixelated",
});

export const bubbleArea = style({
  position: "relative",
  zIndex: 1,
  padding: "0 16px 32px",
});

// 말풍선 없이 캐릭터만 보여줄 때도 위치가 튀지 않도록 같은 높이를 차지한다.
export const bubblePlaceholder = style({
  height: 123,
});
