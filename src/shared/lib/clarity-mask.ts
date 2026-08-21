/**
 * Microsoft Clarity 세션 리플레이에서 이 요소와 자식의 텍스트를 가린다.
 *
 * Clarity 기본 마스킹 모드(Balanced)는 입력창 값과 숫자·이메일만 가리므로,
 * 화면에 텍스트로 그려지는 개인정보는 이 속성을 직접 붙여야 녹화에서 제외된다.
 * 속성명을 틀려도 타입 오류가 나지 않고 조용히 새어나가므로 상수로만 쓴다.
 */
export const CLARITY_MASK = { "data-clarity-mask": "true" } as const;
