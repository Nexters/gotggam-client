"use client";

import { Delay, ErrorBoundary, Suspense } from "@suspensive/react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";
import { Button } from "@/shared/ui";

import { HealthStatus } from "./health-status";
import * as styles from "./home-page.css";

/** 5xx 는 잡지 않고 app/error.tsx 로 올려보낸다. 화면 일부만 대체할 수 있는 에러만 여기서 처리한다. */
function isInlineRecoverable(error: Error): error is ApiError {
  return (
    ApiError.isApiError(error) &&
    (error.status === null || error.status < 500)
  );
}

export function HealthSection() {
  const { reset: resetQueryErrors } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      shouldCatch={isInlineRecoverable}
      onReset={resetQueryErrors}
      fallback={({ error, reset }) => (
        <div className={styles.status}>
          {error.message}
          <Button onClick={reset}>다시 시도</Button>
        </div>
      )}
    >
      <Suspense
        clientOnly
        fallback={
          <Delay ms={200}>
            <div className={styles.status}>서버 상태 확인 중...</div>
          </Delay>
        }
      >
        <HealthStatus />
      </Suspense>
    </ErrorBoundary>
  );
}
