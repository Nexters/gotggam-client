"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { FormValues } from "@/features/form";
import { ChoicePanel, Typography } from "@/shared/ui";
import { AppBar } from "@/widgets/app-bar";
import { Character, NarrationBox, SceneBackground } from "@/widgets/scene";

import { questionQueries } from "../api/question-queries";
import { useQuestionFlow } from "../lib/use-question-flow";
import { getActBackground } from "../model/act-backgrounds";
import { CLOSING_ASK, CLOSING_OUTRO } from "../model/closing";
import type { Question } from "../model/questions";
import * as styles from "./question-section.css";
import { QuestionPrompt } from "./question-prompt";
import { ReviewPanel } from "./review-panel";

/** 마지막 피드백 이후의 마무리 장면: 소감 질문 → 입력 → 마무리 대사. */
type ClosingStep = "ask" | "input" | "outro";

const CLOSING_BACK_STEP: Record<ClosingStep, ClosingStep | null> = {
  ask: null,
  input: "ask",
  outro: "input",
};

export function QuestionSection() {
  const { data: questions } = useSuspenseQuery(questionQueries.list());

  if (questions.length === 0) {
    return (
      <div className={styles.emptyNotice}>
        <Typography as="p" family="galmuri9" size="16" color="gray-11">
          아직 준비된 질문이 없다냥. 잠시 후 다시 와달라냥.
        </Typography>
      </div>
    );
  }

  return <QuestionFlow questions={questions} />;
}

function QuestionFlow({ questions }: { questions: Question[] }) {
  const { setValue, getValues } = useFormContext<FormValues>();
  const [closingStep, setClosingStep] = useState<ClosingStep | null>(null);

  const {
    question,
    questionNumber,
    phase,
    selectedAnswer,
    feedback,
    feedbackCharacterSrc,
    selectAnswer,
    advanceFeedback,
    goBack,
  } = useQuestionFlow(questions, {
    onComplete: () => setClosingStep("ask"),
  });

  // 마무리 단계 중 브라우저 뒤로가기로 질문이 바뀌면 마무리 상태를 해제한다.
  const [prevQuestionId, setPrevQuestionId] = useState(question.id);
  if (prevQuestionId !== question.id) {
    setPrevQuestionId(question.id);
    setClosingStep(null);
  }

  const handleSelectAnswer = (label: string) => {
    const answer = question.answers.find((item) => item.label === label);
    if (answer) {
      setValue("answers", {
        ...getValues("answers"),
        [question.id]: answer.id,
      });
    }
    selectAnswer(label);
  };

  const isClosing = closingStep !== null;

  const goBackFromClosing = () => {
    if (closingStep) setClosingStep(CLOSING_BACK_STEP[closingStep]);
  };

  return (
    <div className={styles.page}>
      <SceneBackground src={getActBackground(question.actCode)} dimmed />
      <AppBar
        onBack={isClosing ? goBackFromClosing : goBack}
        showHome={false}
      />

      <div className={styles.content}>
        {!isClosing && (
          <QuestionPrompt
            current={questionNumber}
            total={questions.length}
            question={question.question}
          />
        )}

        <div className={styles.characterArea}>
          <Character
            className={styles.character}
            src={isClosing ? null : feedbackCharacterSrc}
          />
        </div>

        {isClosing ? (
          <>
            {closingStep === "ask" && (
              <NarrationBox
                text={CLOSING_ASK}
                className={styles.narration}
                onAdvance={() => setClosingStep("input")}
              />
            )}
            {closingStep === "input" && (
              <ReviewPanel
                onSubmit={() => setClosingStep("outro")}
                onSkip={() => setClosingStep("outro")}
              />
            )}
            {closingStep === "outro" && (
              <NarrationBox
                text={CLOSING_OUTRO}
                className={styles.narration}
                // TODO: 답변 제출 API 연동 후 다음 페이지로 이동
                onAdvance={() => {}}
              />
            )}
          </>
        ) : phase === "question" ? (
          <ChoicePanel
            variant="spaced"
            options={question.answers.map((answer) => answer.label)}
            value={selectedAnswer}
            onSelect={handleSelectAnswer}
          />
        ) : (
          <NarrationBox
            text={feedback}
            className={styles.narration}
            onAdvance={advanceFeedback}
          />
        )}
      </div>
    </div>
  );
}
