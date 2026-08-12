import {
  CHOICE_PANEL_BLINK_DURATION_MS,
  type WheelPickerOption,
} from "@/shared/ui";

export const KOREAN_NAME_REGEX = /^[가-힣]{1,4}$/;

export type SceneInput = "name" | "birth" | "gender";

export const SCENES: { text: string; input?: SceneInput }[] = [
  { text: "나는 저승사자 곧감이다냥!" },
  { text: "오늘도 영혼 회수 실적을 채우러 왔다냥." },
  { text: "그런데 실수로 잉크를 엎질러서 누가 누군지 모르겠다냥." },
  { text: "그러니까 잠깐만 협조해라냥." },
  {
    text: "우선 이름부터 확인하겠다냥.\n너를 뭐라고 부르면 되냥?",
    input: "name",
  },
  { text: "이번엔 나이를 알려달라냥.\n정확히 적어야 한다냥.", input: "birth" },
  { text: "마지막으로 성별은...\n어떻게 되냥?", input: "gender" },
  { text: "좋아 그럼 이제 몇가지만 더\n확인하겠다냥." },
  { text: "수면, 식습관, 운동 같은\n평범한 질문이다냥." },
  { text: "그럼 바로 시작하겠다냥." },
];

const CURRENT_YEAR = new Date().getFullYear();

export const YEAR_OPTIONS: WheelPickerOption[] = Array.from(
  { length: 100 },
  (_, i) => {
    const year = `${CURRENT_YEAR - i}`;
    return { value: year, label: year };
  },
);

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MONTH_OPTIONS: WheelPickerOption[] = MONTH_LABELS.map(
  (label, i) => ({
    value: `${i + 1}`,
    label,
  }),
);

export const GENDER_OPTIONS = ["여성", "남성"];

/** 선택 blink 애니메이션이 끝나고 잠깐 머문 뒤 다음 장면으로 넘어간다. */
export const GENDER_ADVANCE_DELAY_MS = CHOICE_PANEL_BLINK_DURATION_MS + 360;
