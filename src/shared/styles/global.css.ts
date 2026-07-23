import { globalStyle } from "@vanilla-extract/css";

import { vars } from "./theme.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html, body", {
  height: "100%",
});

globalStyle("body", {
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.body,
  WebkitFontSmoothing: "antialiased",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("button", {
  font: "inherit",
});
