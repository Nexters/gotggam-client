import type { TermsDocumentId } from "@/entities/terms";

export type ConsentStep = {
  /** 이 단계의 확인 버튼이 여는 약관 문서. */
  termsId: TermsDocumentId;
  /** 줄바꿈 위치가 디자인에 고정돼 있어 한 줄씩 나눠 둔다. */
  heading: readonly string[];
  description: string;
};

export const CONSENT_STEPS: readonly ConsentStep[] = [
  {
    termsId: "privacy-policy",
    heading: ["보다 정확한 결과를 위해", "개인정보를 수집해요."],
    description:
      "개인정보 수집에 동의시 닉네임, 나이, 성별 등에 관련된 자료가 수집됩니다.",
  },
  {
    termsId: "terms-of-service",
    heading: ["안전한 서비스 이용을 위해", "이용약관을 확인해요."],
    description:
      "이용약관에 동의시 결과 제공, 면책 등에 관련된 내용이 적용됩니다.",
  },
];
