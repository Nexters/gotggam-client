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

export const character = style({
  width: "92%",
  maxWidth: 400,
  aspectRatio: "1 / 1",
  marginBottom: -12,
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

export const bubbleArea = style({
  position: "relative",
  zIndex: 1,
  padding: "0 16px 32px",
});

// 말풍선 없이 캐릭터만 보여줄 때도 위치가 튀지 않도록 같은 높이를 차지한다.
export const bubblePlaceholder = style({
  height: 123,
});
