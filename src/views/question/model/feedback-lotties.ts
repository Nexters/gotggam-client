import type { AnswerTone } from "./questions";

const FEEDBACK_CHARACTER_LOTTIE_URLS: Record<AnswerTone, string[]> = {
  positive: ["/lottie/positive_01.lottie", "/lottie/positive_02.lottie"],
  negative: ["/lottie/negative_01.lottie", "/lottie/negative_02.lottie"],
};

export function pickFeedbackLottie(tone: AnswerTone): string {
  const lotties = FEEDBACK_CHARACTER_LOTTIE_URLS[tone];
  return lotties[Math.floor(Math.random() * lotties.length)];
}
