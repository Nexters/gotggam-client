import type { FormValues } from "@/features/form";

/** 명부(결과 카드) 앞면에 표시되는 값. */
export interface LedgerResult {
  name: string;
  /** YYYY-MM-DD */
  birthDate: string;
  gender: string;
  expectedAge: number;
  todayComment: string;
  warning: string;
}

const FALLBACK_LEDGER: LedgerResult = {
  name: "홍길동",
  birthDate: "2002-10-11",
  gender: "남성",
  expectedAge: 88,
  todayComment: "오늘도 최선을 다했다.",
  warning: "잠은 선택이 아니라 생존이다냥!",
};

/**
 * TODO: 제출 API 응답으로 교체한다.
 * 지금은 폼에서 채운 값을 쓰고, 서버가 계산해줄 값(예상수명, 경고문구)과
 * 폼이 비어 있는 경우(개발 중 직접 진입)는 목업으로 채운다.
 */
export function buildLedgerResult(form: FormValues): LedgerResult {
  return {
    name: form.name || FALLBACK_LEDGER.name,
    birthDate: form.birthDate || FALLBACK_LEDGER.birthDate,
    gender: form.gender || FALLBACK_LEDGER.gender,
    expectedAge: FALLBACK_LEDGER.expectedAge,
    todayComment: form.todayComment || FALLBACK_LEDGER.todayComment,
    warning: FALLBACK_LEDGER.warning,
  };
}
