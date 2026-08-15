"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CHOICE_PANEL_ADVANCE_DELAY_MS } from "@/shared/ui";

import { pickFeedbackLottie } from "../model/feedback-lotties";
import type { Question } from "../model/questions";

type Phase = "question" | "feedback";

type UseQuestionFlowOptions = {
  onComplete: () => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * 질문 진행 상태 기계. 질문 순서는 ?q= 쿼리 파라미터가 소유해 브라우저
 * 뒤로가기가 질문 항목 단위로 움직이고, 피드백 대사 같은 연출은 로컬 상태로 둔다.
 */
export function useQuestionFlow(
  questions: Question[],
  { onComplete }: UseQuestionFlowOptions,
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const questionIndex = clamp(
    (Number(searchParams.get("q")) || 1) - 1,
    0,
    questions.length - 1,
  );

  const [phase, setPhase] = useState<Phase>("question");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedbackCharacterSrc, setFeedbackCharacterSrc] = useState<
    string | null
  >(null);
  const [prevQuestionIndex, setPrevQuestionIndex] = useState(questionIndex);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 진입 시 ?q= 가 없으면 붙인다. replace라 히스토리 엔트리는 늘지 않는다.
  useEffect(() => {
    if (searchParams.get("q") === null) {
      router.replace(`?q=${questionIndex + 1}`);
    }
  }, [searchParams, router, questionIndex]);

  // 어느 방향이든 질문이 바뀌면 연출 상태를 초기화한다. effect가 아니라 렌더
  // 중에 조정해야 이전 질문의 피드백이 한 프레임 그려지는 깜빡임이 없다.
  if (prevQuestionIndex !== questionIndex) {
    setPrevQuestionIndex(questionIndex);
    setPhase("question");
    setSelectedAnswer(null);
    setFeedbackCharacterSrc(null);
  }

  const question = questions[questionIndex];
  const feedback =
    question.answers.find((answer) => answer.label === selectedAnswer)
      ?.feedback ?? "";

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current !== null) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  // 질문이 바뀌거나 언마운트되면 진행 대기 중인 타이머를 정리한다.
  useEffect(() => clearAdvanceTimer, [questionIndex]);

  const selectAnswer = (label: string) => {
    setSelectedAnswer(label);

    const answer = question.answers.find((item) => item.label === label);
    const characterSrc = answer ? pickFeedbackLottie(answer.tone) : null;

    clearAdvanceTimer();
    advanceTimerRef.current = setTimeout(() => {
      advanceTimerRef.current = null;
      setPhase("feedback");
      setFeedbackCharacterSrc(characterSrc);
    }, CHOICE_PANEL_ADVANCE_DELAY_MS);
  };

  const showQuestion = () => {
    clearAdvanceTimer();
    setPhase("question");
    setSelectedAnswer(null);
    setFeedbackCharacterSrc(null);
  };

  const advanceFeedback = () => {
    if (questionIndex === questions.length - 1) {
      onComplete();
      return;
    }
    router.push(`?q=${questionIndex + 2}`);
  };

  // 피드백에서는 같은 질문의 선택지로, 질문에서는 히스토리로 되돌아간다
  // (이전 질문 엔트리, 첫 질문이면 페이지 이탈).
  const goBack = () => {
    if (phase === "feedback") {
      showQuestion();
      return;
    }
    router.back();
  };

  return {
    question,
    questionNumber: questionIndex + 1,
    phase,
    selectedAnswer,
    feedback,
    feedbackCharacterSrc,
    selectAnswer,
    advanceFeedback,
    goBack,
  };
}
