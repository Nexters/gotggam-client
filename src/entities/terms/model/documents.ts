export const TERMS_DOCUMENT_IDS = [
  "privacy-policy",
  "terms-of-service",
] as const;

export type TermsDocumentId = (typeof TERMS_DOCUMENT_IDS)[number];

/** 노션에서 관리하는 약관 문서. `GET /api/v1/terms` 로 내려온다. */
export type TermsDocument = {
  /** 결과 제출 시 서버에 보내는 동의 문서 버전. 약관 내용을 고치면 노션에서 함께 올린다. */
  version: string;
  markdown: string;
};

export const TERMS_DOCUMENT_TITLES: Record<TermsDocumentId, string> = {
  "privacy-policy": "개인정보 처리방침",
  "terms-of-service": "서비스 이용약관",
};
