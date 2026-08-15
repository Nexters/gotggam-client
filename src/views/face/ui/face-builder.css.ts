import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

// 앱바 없는 화면이라 상단 여백을 직접 확보한다. 컨트롤·CTA는 아래에 고정 간격으로
// 앵커되고, 남는 공간은 얼굴과 컨트롤 사이(auto)만 흡수한다 — 상단 패딩을 키우면
// 타이틀+얼굴 세트만 아래로 내려온다. 낮은 화면에서는 패딩을 줄여 수납한다.
export const container = style({
  position: "relative",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  padding: `72px ${vars.spacing["24"]} ${vars.spacing["24"]}`,
  "@media": {
    "(max-height: 700px)": {
      paddingTop: 32,
    },
    "(max-height: 600px)": {
      paddingTop: 16,
    },
  },
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
  marginTop: vars.spacing["4"],
  "@media": {
    "(max-height: 700px)": {
      width: 168,
    },
    "(max-height: 600px)": {
      width: 128,
    },
  },
});

// 스테퍼·CTA는 화면 아래에 고정 간격으로 앵커된다 (남는 공간은 위 auto가 전부 흡수).
export const controls = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["12"],
  marginTop: "auto",
  marginBottom: 104,
  paddingTop: vars.spacing["24"],
  "@media": {
    "(max-height: 700px)": {
      marginBottom: 64,
    },
    "(max-height: 600px)": {
      marginBottom: 40,
    },
  },
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
  color: vars.color.white,
  selectors: {
    // PixelCornerButton 리셋(background: none)보다 특이도를 올려 방출 순서와 무관하게 만든다.
    "&:not(:disabled)": {
      background: `linear-gradient(to right, ${vars.color.accent2["9"]}, ${vars.color.accent3["9"]})`,
    },
  },
});
