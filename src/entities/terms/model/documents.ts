export const TERMS_DOCUMENT_IDS = [
  "privacy-policy",
  "terms-of-service",
] as const;

export type TermsDocumentId = (typeof TERMS_DOCUMENT_IDS)[number];

/** 백엔드 약관을 화면에서 사용하는 형식으로 변환한 문서. */
export type TermsDocument = {
  /** 결과 제출 시 서버에 보내는 동의 문서 버전. 백엔드에서 받은 값을 그대로 사용한다. */
  version: string;
  markdown: string;
};

export const TERMS_DOCUMENT_TITLES: Record<TermsDocumentId, string> = {
  "privacy-policy": "개인정보 처리방침",
  "terms-of-service": "서비스 이용약관",
};
