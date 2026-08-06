import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { ApiError } from "./error";

const RETRY_LIMIT = 1;

function reportError(error: unknown) {
  // TODO: 에러 리포팅 도구 연동
  console.error(error);
}

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({ onError: reportError }),
    mutationCache: new MutationCache({ onError: reportError }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (
            ApiError.isApiError(error) &&
            error.status !== null &&
            error.status < 500
          ) {
            return false;
          }

          return failureCount < RETRY_LIMIT;
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
