import { PRIVACY_POLICY_MARKDOWN } from "./privacy-policy";
import { TERMS_OF_SERVICE_MARKDOWN } from "./terms-of-service";

export type TermsDocumentId = "privacy-policy" | "terms-of-service";

export type TermsDocument = {
  title: string;
  markdown: string;
};

export const TERMS_DOCUMENTS: Record<TermsDocumentId, TermsDocument> = {
  "privacy-policy": {
    title: "개인정보 처리방침",
    markdown: PRIVACY_POLICY_MARKDOWN,
  },
  "terms-of-service": {
    title: "서비스 이용약관",
    markdown: TERMS_OF_SERVICE_MARKDOWN,
  },
};
