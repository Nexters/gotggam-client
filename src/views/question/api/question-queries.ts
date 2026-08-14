import { queryOptions } from "@tanstack/react-query";

import { getQuestionnaire } from "@/shared/api/generated/question-api/question-api";
import { delay } from "@/shared/lib";

import { toQuestions } from "../model/questions";

/** 질문지를 받는 동안 로딩 연출("질문 작성중...")을 보여줄 최소 시간. */
const MIN_LOADING_MS = 1500;

export const questionQueries = {
  all: ["question"] as const,
  list: () =>
    queryOptions({
      queryKey: [...questionQueries.all, "list"] as const,
      queryFn: async ({ signal }) => {
        const [response] = await Promise.all([
          getQuestionnaire({ signal }),
          delay(MIN_LOADING_MS),
        ]);
        return toQuestions(response.data);
      },
      staleTime: Infinity,
    }),
};
