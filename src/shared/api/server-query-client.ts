import "server-only";

import { cache } from "react";

import { makeQueryClient } from "./query-client";

/**
 * 서버 렌더링 1회당 하나의 QueryClient. 같은 요청 안에서는 여러 서버 컴포넌트가
 * 같은 인스턴스를 공유하고, 요청 간에는 캐시가 섞이지 않는다.
 */
export const getServerQueryClient = cache(makeQueryClient);
