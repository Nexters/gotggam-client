// TODO: 질문 데이터는 추후 질문 리스트 GET API 응답으로 대체한다.
// UI가 쓰는 필드만 정의한다 — 서버 스펙(가중치, 그룹 키 등)은 여기서 다루지 않는다.
// 답변 순서는 서버 규칙과 동일하게 항상 [긍정, 부정]이다.

export type AnswerTone = "positive" | "negative";

export type Act = 1 | 2 | 3 | 4 | 5 | 6;

export type QuestionAnswer = {
  label: string;
  tone: AnswerTone;
  feedback: string;
};

export type Question = {
  id: string;
  act: Act;
  question: string;
  answers: QuestionAnswer[];
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    act: 1,
    question: "아침을 깨우는 첫 선택이다냥.\n아침을 거르고 커피만 마시냥?",
    answers: [
      {
        label: "아니. 오늘은 뭐라도 씹는다",
        tone: "positive",
        feedback: "오, 제법이다냥. 빈속보다는 낫다는 걸 아는구냥.",
      },
      {
        label: "당연. 커피 수혈은 필수다",
        tone: "negative",
        feedback: "흥, 사람이 아니라 카페인 자판기냥? 뭐, 이해는 한다.",
      },
    ],
  },
  {
    id: "q2",
    act: 1,
    question: "잠은 제대로 잤냥?\n평균 수면 시간은 6시간 이상이냥?",
    answers: [
      {
        label: "6시간은 자야 일상생활이 가능하다",
        tone: "positive",
        feedback: "기특하다냥. 잠은 배신 안 한다는 걸 아는구냥.",
      },
      {
        label: "잠.. 그게 뭔지 기억이 안난다",
        tone: "negative",
        feedback: "저런... 잠이 부족하면 나처럼 하루종일 눕고 싶어질 뿐이다냥.",
      },
    ],
  },
  {
    id: "q3",
    act: 2,
    question: "출근길이다냥.\n2층인데도 엘리베이터를 기다리냥?",
    answers: [
      {
        label: "계단으로 간다",
        tone: "positive",
        feedback: "오호, 다리 근육은 아낄 생각이 없구냥. 박수 쳐준다냥.",
      },
      {
        label: "버튼부터 누른다",
        tone: "negative",
        feedback: "흥, 2층도 못 참냥? 나보다 게으르다냥.",
      },
    ],
  },
  {
    id: "q4",
    act: 2,
    question: "오늘 몸은 얼마나 움직였냥?\n하루 7천 보 이상 걷는 편이냥?",
    answers: [
      {
        label: "7천 보는 껌이다",
        tone: "positive",
        feedback: "제법 부지런하다냥. 나는 소파에서 안 움직이는데 말이다냥.",
      },
      {
        label: "내 다리를 지켜야한다",
        tone: "negative",
        feedback:
          "흠, 최소한의 움직임으로 최대한 버티는 전략이구냥. 나쁘지 않다냥.",
      },
    ],
  },
  {
    id: "q5",
    act: 3,
    question: "물을 얼마나 마셨냥?\n술 말고 물이다냥.",
    answers: [
      {
        label: "하루 세 잔 이상 마신다",
        tone: "positive",
        feedback: "물을 챙겨 마시다니, 제법 어른스럽다냥.",
      },
      {
        label: "물은 목마를 때만",
        tone: "negative",
        feedback:
          "흥, 몸이 보내는 신호를 무시하는 스타일이구냥. 나랑 똑같다냥.",
      },
    ],
  },
  {
    id: "q6",
    act: 4,
    question: "오늘 웃은 적 있냥?\n안 친한테 예의상 웃은 것 말고.",
    answers: [
      {
        label: "3번 이상",
        tone: "positive",
        feedback: "오, 웃을 일이 많았구냥. 부럽다냥.",
      },
      {
        label: "0번",
        tone: "negative",
        feedback: "저런... 오늘 하루 표정 관리한다고 고생했다냥.",
      },
    ],
  },
  {
    id: "q7",
    act: 4,
    question: "걱정거리를 밤새 머릿속으로 되새기냥?",
    answers: [
      {
        label: "오늘은 그냥 잔다",
        tone: "positive",
        feedback: "쿨하다냥. 걱정은 내일의 나에게 맡기는 스타일이구냥.",
      },
      {
        label: "생각은 꼬리를 문다",
        tone: "negative",
        feedback:
          "흠, 머릿속이 시끄럽겠다냥. 가끔은 그냥 눈 감아버리는 것도 방법이다냥.",
      },
    ],
  },
  {
    id: "q8",
    act: 5,
    question: "밤 11시.\n친구가 치킨 먹자고 연락했다냥.",
    answers: [
      {
        label: "아니다. 내일 먹자",
        tone: "positive",
        feedback: "이성적이다냥. 그 시간에 참는 건 쉽지 않은데 말이다냥.",
      },
      {
        label: "당연. 무슨 치킨인지부터 물어본다",
        tone: "negative",
        feedback: "흥, 역시 먹는 데는 진심이구냥. 야식 인생 인정한다냥.",
      },
    ],
  },
  {
    id: "q9",
    act: 5,
    question: "오늘도 술이 빠질 수 없냥?\n주 3회 이상 마시냥?",
    answers: [
      {
        label: "그 정도는 아니다",
        tone: "positive",
        feedback: "제법 절제할 줄 아는구냥. 박수 쳐준다냥.",
      },
      {
        label: "맞다.",
        tone: "negative",
        feedback: "흠, 술이 삶의 일부구냥. 간이 고생 좀 하겠다냥.",
      },
    ],
  },
  {
    id: "q10",
    act: 6,
    question:
      "잠들기 전 마지막 확인이다냥.\n정성껏 연락하는 친구들이 많은 편이냥?",
    answers: [
      {
        label: "맞다. 연락은 안부다",
        tone: "positive",
        feedback: "다정하다냥. 그런 마음 씀씀이 흔치 않다냥.",
      },
      {
        label: "아니다. 내가 먼저 안 한다",
        tone: "negative",
        feedback: "흥, 츤데레 기질이 있구냥. 그래도 다들 알아줄 거다냥.",
      },
    ],
  },
];
