"use client";

import { useState } from "react";

import { CHOICE_PANEL_ADVANCE_DELAY_MS } from "@/shared/ui";

import { FEEDBACK_CHARACTER_LOTTIE_URLS } from "../model/feedback-lotties";
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

  const question = questions[questionIndex];
  const feedback =
    question.answers.find((answer) => answer.label === selectedAnswer)
      ?.feedback ?? "";

  const selectAnswer = (label: string) => {
    setSelectedAnswer(label);

    const answerIndex = question.answers.findIndex(
      (item) => item.label === label,
    );
    const lotties =
      FEEDBACK_CHARACTER_LOTTIE_URLS[
        answerIndex === 0 ? "positive" : "negative"
      ];
    const characterSrc =
      lotties[Math.floor(Math.random() * lotties.length)] ?? null;

    if (characterSrc) {
      fetch(characterSrc).catch(() => {});
    }

    setTimeout(() => {
      setPhase("feedback");
      setFeedbackCharacterSrc(characterSrc);
    }, CHOICE_PANEL_ADVANCE_DELAY_MS);
  };

  const showQuestion = () => {
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
