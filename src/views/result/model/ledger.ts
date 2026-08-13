import type { FormValues } from "@/features/form";

/** 명부 카드 색상 베리에이션. Figma [명부_템플릿]의 8종과 1:1 대응한다. */
export const LEDGER_VARIANTS = [
  "wine",
  "gold",
  "green",
  "indigo",
  "navy",
  "purple",
  "maroon",
  "gray",
] as const;

export type LedgerVariant = (typeof LEDGER_VARIANTS)[number];

// TODO: 카드 색상을 랜덤으로 둘지, 서버가 결과에 포함해 내려줄지 기획 확정 필요. 지금은 클라이언트 랜덤.
export function pickRandomLedgerVariant(): LedgerVariant {
  return LEDGER_VARIANTS[Math.floor(Math.random() * LEDGER_VARIANTS.length)];
}

export function getLedgerCardImageSrc(
  variant: LedgerVariant,
  side: "front" | "back",
) {
  return `/images/result/ledger/${variant}-${side}.png`;
}

/** 카드 뒷면 상세내역 한 줄 (대분류별 수명 가감). */
export interface LedgerDetail {
  category: string;
  years: number;
}

/** 명부(결과 카드)에 표시되는 값. */
export interface LedgerResult {
  name: string;
  /** YYYY-MM-DD */
  birthDate: string;
  gender: string;
  expectedAge: number;
  todayComment: string;
  warning: string;
  /** 특별준수사항. 서버가 최대 3개, 없으면 "흠, 잘 하고 있다냥"을 내려준다. */
  specialDirectives: string[];
  details: LedgerDetail[];
}

const FALLBACK_LEDGER: LedgerResult = {
  name: "홍길동",
  birthDate: "2002-10-11",
  gender: "남성",
  expectedAge: 88,
  todayComment: "오늘도 최선을 다했다.",
  warning: "잠은 선택이 아니라 생존이다냥!",
  specialDirectives: [
    "오후 10시 이후 배달앱 접속을 제한할 것",
    "주문 전 물 200ml 섭취를 명함",
  ],
  details: [
    { category: "신체", years: -30 },
    { category: "마음", years: -2 },
    { category: "태도", years: -1 },
  ],
};

/**
 * TODO: 제출 API 응답으로 교체한다.
 * 지금은 폼에서 채운 값을 쓰고, 서버가 계산해줄 값(예상수명, 경고문구, 준수사항,
 * 상세내역)과 폼이 비어 있는 경우(개발 중 직접 진입)는 목업으로 채운다.
 */
export function buildLedgerResult(form: FormValues): LedgerResult {
  return {
    name: form.name || FALLBACK_LEDGER.name,
    birthDate: form.birthDate || FALLBACK_LEDGER.birthDate,
    gender: form.gender || FALLBACK_LEDGER.gender,
    expectedAge: FALLBACK_LEDGER.expectedAge,
    todayComment: form.todayComment || FALLBACK_LEDGER.todayComment,
    warning: FALLBACK_LEDGER.warning,
    specialDirectives: FALLBACK_LEDGER.specialDirectives,
    details: FALLBACK_LEDGER.details,
  };
}
