"use client";

import { LoadingTransition } from "@/widgets/loading-screen";

import { QuestionSection } from "./question-section";

export function QuestionPage() {
  return (
    <LoadingTransition text="질문 작성중...">
      <QuestionSection />
    </LoadingTransition>
  );
}
