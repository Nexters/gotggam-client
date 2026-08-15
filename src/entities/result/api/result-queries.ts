import { queryOptions } from "@tanstack/react-query";

import type { SurveyResultRequest } from "@/shared/api/generated/models";

import { fetchParticipantCount, submitSurveyResult } from "./result-api";

export const resultQueries = {
  all: ["result"] as const,

  participantCount: () =>
    queryOptions({
      queryKey: [...resultQueries.all, "participant-count"] as const,
      queryFn: ({ signal }) => fetchParticipantCount({ signal }),
    }),

  /**
   * 설문 제출 + 결과 수신. POST지만 쿼리로 다루는 이유:
   * - 같은 답변(request)으로 재진입해도 캐시가 있어 중복 제출되지 않는다.
   * - 마운트 시점 자동 실행이 StrictMode 이중 마운트에도 안전하다.
   */
  submission: (request: SurveyResultRequest | null) =>
    queryOptions({
      queryKey: [...resultQueries.all, "submission", request] as const,
      queryFn: () => {
        if (!request) {
          throw new Error("제출할 설문 데이터가 없습니다.");
        }
        return submitSurveyResult(request);
      },
      // 비멱등 제출 — 자동 재시도가 중복 생성을 만들 수 있어 끈다. 재시도는 사용자 탭으로만.
      retry: false,
      staleTime: Infinity,
      gcTime: Infinity,
    }),
};
