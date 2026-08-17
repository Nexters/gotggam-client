import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";

export const markdown = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["12"],
  color: vars.color.gray["11"],
  fontFamily: vars.font.spoqa,
  fontWeight: vars.fontWeight.medium,
  fontSize: vars.fontSize["16"],
  lineHeight: vars.lineHeight.normal,
  wordBreak: "keep-all",
  overflowWrap: "anywhere",
});

globalStyle(`${markdown} > :first-child`, {
  marginTop: 0,
});

globalStyle(`${markdown} h2, ${markdown} h3`, {
  marginTop: vars.spacing["12"],
  color: vars.color.gray["11"],
  fontSize: vars.fontSize["18"],
  fontWeight: vars.fontWeight.medium,
});

globalStyle(`${markdown} h3`, {
  fontSize: vars.fontSize["16"],
  color: vars.color.gray["12"],
});

globalStyle(`${markdown} ul, ${markdown} ol`, {
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["4"],
  paddingInlineStart: vars.spacing["24"],
});

globalStyle(`${markdown} ul`, {
  listStyle: "disc",
});

globalStyle(`${markdown} ol`, {
  listStyle: "decimal",
});

globalStyle(`${markdown} strong`, {
  color: vars.color.gray["12"],
  fontWeight: vars.fontWeight.bold,
});

globalStyle(`${markdown} a`, {
  color: vars.color.accent3["11"],
  textDecoration: "underline",
});

globalStyle(`${markdown} hr`, {
  border: "none",
  borderTop: `1px solid ${vars.color.gray["6"]}`,
  margin: `${vars.spacing["12"]} 0`,
});

globalStyle(`${markdown} blockquote`, {
  paddingInlineStart: vars.spacing["12"],
  borderInlineStart: `2px solid ${vars.color.gray["7"]}`,
  color: vars.color.gray["10"],
});
