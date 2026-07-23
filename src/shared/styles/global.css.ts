import { globalStyle } from "@vanilla-extract/css";

import { semantic, vars } from "./theme.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html, body", {
  height: "100%",
});

globalStyle("body", {
  backgroundColor: semantic.color.bgCanvas,
  color: vars.color.gray["12"],
  fontFamily: vars.font.spoqa,
  fontWeight: vars.fontWeight.regular,
  lineHeight: vars.lineHeight.normal,
  letterSpacing: vars.letterSpacing.normal,
  WebkitFontSmoothing: "antialiased",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("button", {
  font: "inherit",
});
