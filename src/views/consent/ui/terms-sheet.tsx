"use client";

import { Markdown, TERMS_DOCUMENTS, type TermsDocumentId } from "@/entities/terms";
import { BottomSheet } from "@/shared/ui";

type TermsSheetProps = {
  termsId: TermsDocumentId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
};

export function TermsSheet({
  termsId,
  open,
  onOpenChange,
  onAgree,
}: TermsSheetProps) {
  const terms = TERMS_DOCUMENTS[termsId];

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={terms.title}
      ctaLabel="약관 동의하기"
      onCtaClick={onAgree}
    >
      <Markdown>{terms.markdown}</Markdown>
    </BottomSheet>
  );
}
