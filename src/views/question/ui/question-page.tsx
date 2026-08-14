"use client";

import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";
import { Button, Typography } from "@/shared/ui";
import { LoadingScreen } from "@/widgets/loading-screen";

import * as styles from "./question-page.css";
import { QuestionSection } from "./question-section";

export function QuestionPage() {
  const { reset: resetQueryErrors } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      shouldCatch={ApiError.isApiError}
      onReset={resetQueryErrors}
      fallback={({ error, reset }) => (
        <div className={styles.errorFallback}>
          <Typography as="p" family="galmuri9" size="16" color="gray-11">
            {error.message}
          </Typography>
          <Button onClick={reset}>다시 시도</Button>
        </div>
      )}
    >
      <Suspense
        clientOnly
        fallback={<LoadingScreen text="질문 작성중..." />}
      >
        <QuestionSection />
      </Suspense>
    </ErrorBoundary>
  );
}
