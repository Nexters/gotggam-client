import { style } from "@vanilla-extract/css";

// blur는 부모에, clip은 자식에 건다. 같은 요소에 걸면 blur 결과가 clip 경계에서
// 잘려 가장자리가 딱딱해진다.
export const root = style({
  position: "absolute",
  top: 0,
  left: "50%",
  width: "115%",
  height: "88%",
  transform: "translateX(-50%)",
  filter: "blur(42px)",
  pointerEvents: "none",
});

// Figma Vector 18749(609×924 사다리꼴)의 꼭짓점 비율
export const beam = style({
  width: "100%",
  height: "100%",
  clipPath: "polygon(40.7% 9.1%, 64.8% 9.1%, 86.2% 90.9%, 13.8% 90.9%)",
  backgroundColor: "rgba(153, 95, 255, 0.3)",
});
