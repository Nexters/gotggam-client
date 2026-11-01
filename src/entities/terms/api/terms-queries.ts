import { queryOptions } from "@tanstack/react-query";

import { fetchTermsDocuments } from "./terms-api";

export const termsQueries = {
  all: ["terms"] as const,

  // 약관은 세션 동안 바뀌지 않는다 — 동의 화면에서 받은 것을 결과 제출까지 그대로 쓴다.
  documents: () =>
    queryOptions({
      queryKey: [...termsQueries.all, "documents"] as const,
      queryFn: ({ signal }) => fetchTermsDocuments({ signal }),
      staleTime: Infinity,
    }),
};
