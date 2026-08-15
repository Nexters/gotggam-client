import { getFacePartTypeNumber } from "@/entities/character";
import type { FormValues } from "@/features/form";
import type {
  SurveyResultRequest,
  SurveyResultResponse,
} from "@/shared/api/generated/models";

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
  todayMessage: string;
  warning: string;
  /** 특별준수사항. 서버가 최대 3개, 없으면 기본 문장을 내려준다. */
  specialDirectives: string[];
  details: LedgerDetail[];
}

// 서버가 10~15자 검증을 하므로, 조건에 맞을 때만 실어 보낸다 (미입력 시 기본 문장 제공).
const TODAY_MESSAGE_MIN = 10;
const TODAY_MESSAGE_MAX = 15;

/**
 * 폼 값 → 설문 결과 제출 요청. 필수 값(이름·생년월일·성별·답변)이 비어 있으면
 * null을 반환한다 — 개발 중 결과 화면에 직접 진입한 경우로 보고 목업으로 그린다.
 */
export function buildSurveyResultRequest(
  form: FormValues,
): SurveyResultRequest | null {
  const answers = Object.entries(form.answers ?? {}).map(
    ([questionId, optionId]) => ({
      questionId: Number(questionId),
      optionId,
    }),
  );

  if (!form.name || !form.birthDate || !form.gender || answers.length === 0) {
    return null;
  }

  const todayMessage = form.todayMessage?.trim();
  const isValidTodayMessage =
    !!todayMessage &&
    todayMessage.length >= TODAY_MESSAGE_MIN &&
    todayMessage.length <= TODAY_MESSAGE_MAX;

  return {
    name: form.name,
    birthDate: form.birthDate,
    gender: form.gender,
    ...(isValidTodayMessage ? { todayMessage } : {}),
    answers,
    character: {
      faceType: getFacePartTypeNumber(form.face.face),
      hairType: getFacePartTypeNumber(form.face.hair),
      eyeType: getFacePartTypeNumber(form.face.eyes),
      noseType: getFacePartTypeNumber(form.face.nose),
      mouthType: getFacePartTypeNumber(form.face.mouth),
    },
  };
}

/** 설문 결과 응답 → 명부 카드 표시 모델. */
export function toLedgerResult(response: SurveyResultResponse): LedgerResult {
  return {
    name: response.name,
    birthDate: response.birthDate,
    gender: response.gender,
    expectedAge: response.expectedLife,
    todayMessage: response.todayMessage,
    warning: response.warningMessage,
    specialDirectives: response.specialRules,
    // penalty는 차감량(양수)로 내려온다 — 카드에는 -n년으로 표기한다.
    details: response.categoryPenalties.map((penalty) => ({
      category: penalty.categoryName,
      years: -penalty.penalty,
    })),
  };
}

const FALLBACK_LEDGER: LedgerResult = {
  name: "홍길동",
  birthDate: "2002-10-11",
  gender: "MALE",
  expectedAge: 88,
  todayMessage: "오늘도 최선을 다했다.",
  // 디자인 확정 스펙: 경고 25자 이내, 특별준수사항 항목당 30자 이내.
  // 두 최대 길이 모두 FitText·저장 렌더에서 수납 검증 완료.
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

/** 개발 중 직접 진입(폼 미완성) 시 화면 확인용 목업. */
export function buildMockLedgerResult(form: FormValues): LedgerResult {
  return {
    ...FALLBACK_LEDGER,
    name: form.name || FALLBACK_LEDGER.name,
    birthDate: form.birthDate || FALLBACK_LEDGER.birthDate,
    gender: form.gender || FALLBACK_LEDGER.gender,
    todayMessage: form.todayMessage || FALLBACK_LEDGER.todayMessage,
  };
}
