"use client";

import { useEffect, useRef, useState } from "react";

import { CHOICE_PANEL_ADVANCE_DELAY_MS } from "@/shared/ui";

import { pickFeedbackLottie } from "../model/feedback-lotties";
import type { Question } from "../model/questions";

type Phase = "question" | "feedback";

type UseQuestionFlowOptions = {
  onComplete: () => void;
  onExit: () => void;
};

export function useQuestionFlow(
  questions: Question[],
  { onComplete, onExit }: UseQuestionFlowOptions,
) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedbackCharacterSrc, setFeedbackCharacterSrc] = useState<
    string | null
  >(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => clearAdvanceTimer, []);

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
    setQuestionIndex((prev) => prev + 1);
    showQuestion();
  };

  const goBack = () => {
    if (phase === "feedback") {
      showQuestion();
      return;
    }
    clearAdvanceTimer();
    if (questionIndex === 0) {
      onExit();
      return;
    }
    setQuestionIndex((prev) => prev - 1);
    setSelectedAnswer(null);
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
