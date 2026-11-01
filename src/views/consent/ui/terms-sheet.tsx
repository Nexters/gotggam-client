"use client";

import { Delay, ErrorBoundary, Suspense } from "@suspensive/react";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";

import {
  Markdown,
  TERMS_DOCUMENT_TITLES,
  termsQueries,
  type TermsDocumentId,
} from "@/entities/terms";
import { ApiError } from "@/shared/api";
import { BottomSheet, Button } from "@/shared/ui";

import * as styles from "./terms-sheet.css";

type TermsSheetProps = {
  termsId: TermsDocumentId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
};

function TermsContent({ termsId }: { termsId: TermsDocumentId }) {
  const { data: termsDocuments } = useSuspenseQuery(termsQueries.documents());

  return <Markdown>{termsDocuments[termsId].markdown}</Markdown>;
}

export function TermsSheet({
  termsId,
  open,
  onOpenChange,
  onAgree,
}: TermsSheetProps) {
  const { reset: resetQueryErrors } = useQueryErrorResetBoundary();

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={TERMS_DOCUMENT_TITLES[termsId]}
      ctaLabel="약관 동의하기"
      onCtaClick={onAgree}
    >
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
              <div className={styles.status}>약관을 불러오는 중...</div>
            </Delay>
          }
        >
          <TermsContent termsId={termsId} />
        </Suspense>
      </ErrorBoundary>
    </BottomSheet>
  );
}
