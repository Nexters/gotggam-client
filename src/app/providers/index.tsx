"use client";

import {
  isServer,
  type QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

import { makeQueryClient } from "@/shared/api/query-client";

import { BgmPlayer } from "./bgm-player";

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
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
