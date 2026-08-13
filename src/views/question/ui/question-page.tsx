"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ChoicePanel } from "@/shared/ui";
import { AppBar } from "@/widgets/app-bar";
import { Character, NarrationBox, SceneBackground } from "@/widgets/scene";

import { useQuestionFlow } from "../lib/use-question-flow";
import { ACT_BACKGROUND_URLS } from "../model/act-backgrounds";
import { CLOSING_ASK, CLOSING_OUTRO } from "../model/closing";
import { QUESTIONS } from "../model/questions";
import * as styles from "./question-page.css";
import { QuestionPrompt } from "./question-prompt";
import { ReviewPanel } from "./review-panel";

type ClosingStep = "ask" | "input" | "outro";

const CLOSING_BACK_STEP: Record<ClosingStep, ClosingStep | null> = {
  ask: null,
  input: "ask",
  outro: "input",
};

export function QuestionPage() {
  const router = useRouter();
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
  } = useQuestionFlow(QUESTIONS, {
    onComplete: () => setClosingStep("ask"),
    onExit: () => router.back(),
  });

  const isClosing = closingStep !== null;

  const goBackFromClosing = () => {
    if (closingStep) setClosingStep(CLOSING_BACK_STEP[closingStep]);
  };

  return (
    <div className={styles.page}>
      <SceneBackground src={ACT_BACKGROUND_URLS[question.act]} dimmed />
      <AppBar
        onBack={isClosing ? goBackFromClosing : goBack}
        showHome={false}
      />

      <div className={styles.content}>
        {!isClosing && (
          <QuestionPrompt
            current={questionNumber}
            total={QUESTIONS.length}
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
            onSelect={selectAnswer}
          />
        ) : (
          <NarrationBox text={feedback} onAdvance={advanceFeedback} />
        )}
      </div>
    </div>
  );
}
