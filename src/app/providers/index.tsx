"use client";

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

import { makeQueryClient } from "@/shared/api/query-client";

import { BgmPlayer } from "./bgm-player";

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (environmentManager.isServer()) {
    // 서버에서는 요청 간 캐시가 섞이지 않도록 항상 새 클라이언트를 만든다.
    return makeQueryClient();
  }

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
