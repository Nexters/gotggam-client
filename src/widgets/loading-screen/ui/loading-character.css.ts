import { style } from "@vanilla-extract/css";

// 디자인 기준(393px 프레임): 캐릭터가 화면 폭의 약 89%(350px)를 차지한다.
export const character = style({
  width: "89%",
  aspectRatio: "1 / 1",
});
