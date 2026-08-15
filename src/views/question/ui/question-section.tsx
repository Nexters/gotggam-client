"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
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

/**
 * 마지막 피드백 이후의 마무리 대사 연출. 오늘의 한마디 입력 패널은 대사가
 * 아니라 체크포인트라 ?panel=review 쿼리 파라미터가 소유한다.
 */
type ClosingStep = "ask" | "outro";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setValue, getValues } = useFormContext<FormValues>();
  const [closingStep, setClosingStep] = useState<ClosingStep | null>(null);

  const isReviewPanelOpen = searchParams.get("panel") === "review";

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

  // 브라우저 뒤로/앞으로 가기로 질문이나 패널 체크포인트가 바뀌면 대사 연출을
  // 해제한다. effect가 아니라 렌더 중에 조정해야 이전 화면 깜빡임이 없다.
  const [prevQuestionId, setPrevQuestionId] = useState(question.id);
  const [prevReviewPanelOpen, setPrevReviewPanelOpen] =
    useState(isReviewPanelOpen);
  if (
    prevQuestionId !== question.id ||
    prevReviewPanelOpen !== isReviewPanelOpen
  ) {
    setPrevQuestionId(question.id);
    setPrevReviewPanelOpen(isReviewPanelOpen);
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

  const isClosing = closingStep !== null || isReviewPanelOpen;

  // 마무리 대사는 연출이라 되감지 않는다: ask는 마지막 피드백으로, outro는
  // 오늘의 한마디 패널로 로컬 복귀하고, 패널 위에서는 히스토리를 되돌린다.
  const goBackFromClosing = () => {
    if (closingStep !== null) {
      setClosingStep(null);
      return;
    }
    router.back();
  };

  const openReviewPanel = () => {
    router.push(`?q=${questionNumber}&panel=review`);
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
                onAdvance={openReviewPanel}
              />
            )}
            {closingStep === null && isReviewPanelOpen && (
              <ReviewPanel
                onSubmit={() => setClosingStep("outro")}
                onSkip={() => setClosingStep("outro")}
              />
            )}
            {closingStep === "outro" && (
              <NarrationBox
                text={CLOSING_OUTRO}
                className={styles.narration}
                onAdvance={() => router.push("/form/face")}
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
