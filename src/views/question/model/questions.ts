import type { ActQuestionsResponse } from "@/shared/api/generated/models";

export type AnswerTone = "positive" | "negative";

export type QuestionAnswer = {
  id: number;
  label: string;
  tone: AnswerTone;
  feedback: string;
};

export type Question = {
  id: number;
  actCode: string;
  question: string;
  answers: QuestionAnswer[];
};

/** act 그룹으로 내려오는 문항을 진행 순서대로 평탄화한다. */
export function toQuestions(groups: ActQuestionsResponse[]): Question[] {
  return groups.flatMap((group) =>
    group.questions.map((question) => ({
      id: question.id,
      actCode: group.act.code,
      question: question.question,
      // 답변 순서는 서버 규칙상 항상 [긍정, 부정]이다.
      answers: question.answers.map(
        (answer, index): QuestionAnswer => ({
          id: answer.id,
          label: answer.answer,
          tone: index === 0 ? "positive" : "negative",
          feedback: answer.feedback,
        }),
      ),
    })),
  );
}
