import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 10,
  backgroundColor: "rgba(18, 18, 18, 0.6)",
});

export const content = style({
  position: "fixed",
  insetInline: 0,
  bottom: 0,
  zIndex: 11,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: vars.layout.screenMaxWidth,
  height: "53.4rem",
  maxHeight: "85svh",
  margin: "0 auto",
  paddingBottom: `calc(${vars.spacing["24"]} + env(safe-area-inset-bottom, 0px))`,
  borderRadius: "1.6rem 1.6rem 0 0",
  backgroundColor: "rgba(18, 18, 18, 0.8)",
  backdropFilter: "blur(6px)",
  outline: "none",
});

// vaul이 head에 주입하는 [data-vaul-handle] 기본 스킨(32×5, #e2e2e4)과 특이도가
// 같아 주입 순서에 따라 밀린다. 속성 선택자를 겹쳐 항상 이기게 한다.
export const handle = style({
  selectors: {
    "&[data-vaul-handle]": {
      flexShrink: 0,
      width: "6.7rem",
      height: "0.6rem",
      marginTop: vars.spacing["8"],
      borderRadius: vars.spacing["4"],
      backgroundColor: "#5d5d5d",
      opacity: 1,
    },
  },
});

export const header = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: `${vars.spacing["14"]} ${vars.spacing["24"]}`,
});

export const closeButton = style({
  position: "absolute",
  right: vars.spacing["24"],
  width: "2rem",
  height: "2rem",
});

export const closeIcon = style({
  width: "100%",
  height: "100%",
});

export const body = style({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overscrollBehavior: "contain",
  padding: `${vars.spacing["6"]} ${vars.spacing["24"]} ${vars.spacing["24"]}`,
});

export const footer = style({
  flexShrink: 0,
  padding: `${vars.spacing["12"]} ${vars.spacing["18"]} 0`,
});

export const ctaButton = style({
  width: "100%",
  height: "5.2rem",
  color: vars.color.white,
  background: `linear-gradient(to right, ${vars.color.accent2["9"]}, ${vars.color.accent3["9"]})`,
  selectors: {
    "&:disabled": {
      opacity: 1,
      background: vars.color.gray["8"],
      color: vars.color.gray["3"],
    },
  },
});
