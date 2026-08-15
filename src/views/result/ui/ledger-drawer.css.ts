import { style } from "@vanilla-extract/css";

/** 시트가 내려가 있을 때 화면에 남는 높이(핸들 영역) — ledger-drawer.tsx와 공유 */
export const DRAWER_PEEK = 36;

export const sheet = style({
  position: "absolute",
  insetInline: 0,
  bottom: 0,
  zIndex: 1,
  paddingBottom: "env(safe-area-inset-bottom, 0px)",
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  backgroundColor: "#252525",
  transform: `translateY(calc(100% - ${DRAWER_PEEK}px))`,
  transition: "transform 480ms cubic-bezier(0.22, 0.9, 0.3, 1)",
  touchAction: "none",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "transform 0ms",
    },
  },
});

export const sheetOpen = style({
  transform: "translateY(0)",
});

export const sheetDragging = style({
  transition: "none",
});

export const handleArea = style({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: 30,
  paddingTop: 8,
  border: "none",
  background: "none",
  cursor: "grab",
  selectors: {
    "&:active": {
      cursor: "grabbing",
    },
  },
});

export const handleBar = style({
  width: 67,
  height: 6,
  borderRadius: 3,
  backgroundColor: "#5d5d5d",
});
