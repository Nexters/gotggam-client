"use client";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useEffect } from "react";

import { ApiError } from "@/shared/api/error";
import { Button } from "@/shared/ui";

import * as styles from "./error.css";

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function GlobalErrorBoundary({
  error,
  unstable_retry,
}: ErrorProps) {
  const { reset: resetQueryErrors } = useQueryErrorResetBoundary();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    resetQueryErrors();
    unstable_retry();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>문제가 발생했어요</h2>
      <p className={styles.message}>
        {ApiError.isApiError(error)
          ? error.message
          : "잠시 후 다시 시도해 주세요. 문제가 계속되면 관리자에게 문의해 주세요."}
      </p>
      <Button onClick={handleRetry}>다시 시도</Button>
    </div>
  );
}
