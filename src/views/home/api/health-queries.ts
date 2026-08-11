import { queryOptions } from "@tanstack/react-query";

import { fetchHealth } from "./health-api";

/**
 * Next Route Handler 를 호출하므로 클라이언트 전용. 서버 프리페치 불가.
 * suspense 로 쓸 때는 `<Suspense clientOnly/>` 안에 둬야 한다. 아니면 프리렌더 중 서버에서 queryFn 이 돈다.
 */
export const healthQueries = {
  all: ["health"] as const,

  status: () =>
    queryOptions({
      queryKey: [...healthQueries.all, "status"] as const,
      queryFn: ({ signal }) => fetchHealth({ signal }),
      // suspense 쿼리는 staleTime 이 1000ms 로 하한 처리되므로 그 아래는 의미가 없다.
      staleTime: 1000,
    }),
};
