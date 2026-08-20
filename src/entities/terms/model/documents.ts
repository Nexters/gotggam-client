import { PRIVACY_POLICY_MARKDOWN } from "./privacy-policy";
import { TERMS_OF_SERVICE_MARKDOWN } from "./terms-of-service";

export type TermsDocumentId = "privacy-policy" | "terms-of-service";

export type TermsDocument = {
  title: string;
  /** 결과 제출 시 서버에 보내는 동의 문서 버전. 약관 내용을 고치면 함께 올린다. */
  version: string;
  markdown: string;
};

export const TERMS_DOCUMENTS: Record<TermsDocumentId, TermsDocument> = {
  "privacy-policy": {
    title: "개인정보 처리방침",
    version: "v1.0.0",
    markdown: PRIVACY_POLICY_MARKDOWN,
  },
  "terms-of-service": {
    title: "서비스 이용약관",
    version: "v1.0.0",
    markdown: TERMS_OF_SERVICE_MARKDOWN,
  },
};
