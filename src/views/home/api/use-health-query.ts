"use client";

import { useQuery } from "@tanstack/react-query";

import { getJson } from "@/shared/api";

interface HealthResponse {
  status: "ok";
  timestamp: string;
}

export function useHealthQuery() {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => getJson<HealthResponse>("/api/health"),
  });
}
