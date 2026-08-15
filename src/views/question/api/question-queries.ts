import { queryOptions } from "@tanstack/react-query";

import { getQuestionnaire } from "@/shared/api/generated/question-api/question-api";
import { delay } from "@/shared/lib";
import { LOADING_SCREEN_MIN_DURATION_MS } from "@/widgets/loading-screen";

import { toQuestions } from "../model/questions";

export const questionQueries = {
  all: ["question"] as const,
  list: () =>
    queryOptions({
      queryKey: [...questionQueries.all, "list"] as const,
      queryFn: async ({ signal }) => {
        const [response] = await Promise.all([
          getQuestionnaire({ signal }),
          delay(LOADING_SCREEN_MIN_DURATION_MS),
        ]);
        return toQuestions(response.data);
      },
      staleTime: Infinity,
    }),
};
