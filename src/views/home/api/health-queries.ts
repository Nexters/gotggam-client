import { queryOptions } from "@tanstack/react-query";

import { fetchHealth } from "./health-api";

/** Next Route Handler 를 호출하므로 클라이언트 전용. 서버 프리페치 불가. */
export const healthQueries = {
  all: ["health"] as const,

  status: () =>
    queryOptions({
      queryKey: [...healthQueries.all, "status"] as const,
      queryFn: ({ signal }) => fetchHealth({ signal }),
      staleTime: 0,
    }),
};
