"use client";

import { Delay, ErrorBoundary, Suspense } from "@suspensive/react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";
import { Button } from "@/shared/ui";

import { HealthStatus } from "./health-status";
import * as styles from "./health-section.css";

export function HealthSection() {
  const { reset: resetQueryErrors } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      shouldCatch={ApiError.isApiError}
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
