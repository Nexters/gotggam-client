import { internalHttpClient } from "@/shared/api";

import type { HealthResponse } from "../model/health.types";

export function fetchHealth(options?: {
  signal?: AbortSignal;
}): Promise<HealthResponse> {
  return internalHttpClient.get("/health", options).json<HealthResponse>();
}
