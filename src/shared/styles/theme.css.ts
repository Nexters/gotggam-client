import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    background: "#0a0a0a",
    surface: "#171717",
    border: "#262626",
    text: "#ededed",
    textMuted: "#a1a1a1",
    primary: "#6366f1",
    primaryHover: "#818cf8",
  },
  font: {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
  },
  radius: {
    sm: "6px",
    md: "10px",
    full: "9999px",
  },
});
