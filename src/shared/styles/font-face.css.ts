import { globalFontFace } from "@vanilla-extract/css";

// public/fonts/ 아래 실제 폰트 파일과 매핑되는 @font-face 선언.
// font-family 이름은 theme.css.ts의 vars.font 스택 첫 번째 값과 일치해야 한다.

globalFontFace("Departure Mono", {
  src: `url("/fonts/departure-mono/DepartureMono-Regular.woff2") format("woff2"), url("/fonts/departure-mono/DepartureMono-Regular.woff") format("woff")`,
  fontWeight: "400",
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalFontFace("Galmuri9", {
  src: `url("/fonts/galmuri/Galmuri9.woff2") format("woff2")`,
  fontWeight: "400",
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalFontFace("Galmuri14", {
  src: `url("/fonts/galmuri/Galmuri14.woff2") format("woff2")`,
  fontWeight: "400",
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalFontFace("Galmuri11", [
  {
    src: `url("/fonts/galmuri/Galmuri11.woff2") format("woff2")`,
    fontWeight: "400",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
  {
    src: `url("/fonts/galmuri/Galmuri11-Bold.woff2") format("woff2")`,
    fontWeight: "700",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
]);

globalFontFace("Spoqa Han Sans Neo", [
  {
    src: `url("/fonts/spoqa-han-sans-neo/SpoqaHanSansNeo-Thin.woff2") format("woff2")`,
    fontWeight: "100",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
  {
    src: `url("/fonts/spoqa-han-sans-neo/SpoqaHanSansNeo-Light.woff2") format("woff2")`,
    fontWeight: "300",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
  {
    src: `url("/fonts/spoqa-han-sans-neo/SpoqaHanSansNeo-Regular.woff2") format("woff2")`,
    fontWeight: "400",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
  {
    src: `url("/fonts/spoqa-han-sans-neo/SpoqaHanSansNeo-Medium.woff2") format("woff2")`,
    fontWeight: "500",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
  {
    src: `url("/fonts/spoqa-han-sans-neo/SpoqaHanSansNeo-Bold.woff2") format("woff2")`,
    fontWeight: "700",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
]);
