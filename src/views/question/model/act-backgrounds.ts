import { BACKGROUND_IMAGE_URLS } from "@/shared/config";

// Act 코드별 배경: 아침 → 1, 출근 → 2, 점심·오후 → 3, 저녁·하루 마무리 → 4.
const ACT_BACKGROUND_URLS: Record<string, string> = {
  MORNING: BACKGROUND_IMAGE_URLS.questionAct1,
  COMMUTE: BACKGROUND_IMAGE_URLS.questionAct2,
  LUNCH: BACKGROUND_IMAGE_URLS.questionAct3,
  AFTERNOON: BACKGROUND_IMAGE_URLS.questionAct3,
  EVENING: BACKGROUND_IMAGE_URLS.questionAct4,
  DAILY_END: BACKGROUND_IMAGE_URLS.questionAct4,
};

/** 매핑에 없는 act 코드는 아침 배경으로 폴백한다. */
export function getActBackground(actCode: string): string {
  return ACT_BACKGROUND_URLS[actCode] ?? BACKGROUND_IMAGE_URLS.questionAct1;
}
