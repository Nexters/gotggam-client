"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

import { BgmPlayer } from "./bgm-player";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // 서버에서는 요청 간 캐시가 섞이지 않도록 항상 새 클라이언트를 만든다.
    return makeQueryClient();
  }

  // 브라우저에서는 Suspense 리렌더링에도 클라이언트가 유지되도록 싱글턴으로 관리한다.
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <BgmPlayer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
