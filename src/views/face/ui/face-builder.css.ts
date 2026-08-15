import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const container = style({
  position: "relative",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  padding: `${vars.spacing["16"]} ${vars.spacing["24"]} ${vars.spacing["24"]}`,
});

// Figma [customize]: 상단 안내 문구(y121) + 몸까지 보이는 캐릭터(210×262)
export const title = style({
  alignSelf: "center",
  textAlign: "center",
});

// 낮은 화면에서는 프리뷰를 줄여 파츠 선택·CTA가 잘리지 않게 한다.
export const preview = style({
  alignSelf: "center",
  width: 210,
  maxWidth: "70%",
  marginTop: vars.spacing["8"],
  "@media": {
    "(max-height: 700px)": {
      width: 168,
    },
    "(max-height: 600px)": {
      width: 128,
    },
  },
});

// 패널·스테퍼·CTA 사이 남는 공간을 위아래로 나눠, 스테퍼가 디자인처럼 화면 중단에 온다.
export const controls = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["12"],
  marginTop: "auto",
  paddingTop: vars.spacing["24"],
});

export const controlRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 35,
});

// 24px 아이콘보다 넓은 터치 영역을 확보한다.
export const arrowButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 35,
});

export const submitButton = style({
  width: "100%",
  height: 52,
  marginTop: "auto",
  color: vars.color.white,
  selectors: {
    // PixelCornerButton 리셋(background: none)보다 특이도를 올려 방출 순서와 무관하게 만든다.
    "&:not(:disabled)": {
      background: `linear-gradient(to right, ${vars.color.accent2["9"]}, ${vars.color.accent3["9"]})`,
    },
  },
});
