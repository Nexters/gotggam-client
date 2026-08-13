import { BACKGROUND_IMAGE_URLS } from "@/shared/config";

// Act 단위로 배경이 바뀐다: act1(아침) → 1, act2(출근) → 2, act3·4(점심·오후) → 3,
// act5(저녁) → 4. act6(하루 마무리)은 별도 이미지가 없어 저녁 배경을 유지한다.
export const ACT_BACKGROUND_URLS: Record<number, string> = {
  1: BACKGROUND_IMAGE_URLS.questionAct1,
  2: BACKGROUND_IMAGE_URLS.questionAct2,
  3: BACKGROUND_IMAGE_URLS.questionAct3,
  4: BACKGROUND_IMAGE_URLS.questionAct3,
  5: BACKGROUND_IMAGE_URLS.questionAct4,
  6: BACKGROUND_IMAGE_URLS.questionAct4,
};
