"use client";

import { QuestionSection } from "./question-section";

// TODO: 질문 리스트 GET 스펙이 나오면 useSuspenseQuery + Suspensive 바운더리를
// 연결하고, fallback으로 LoadingScreen("질문 작성중...")을 최소 1.5초 보여준다.
export function QuestionPage() {
  return <QuestionSection />;
}
