import type { Options } from "ky";

import { ApiError } from "./error";
import { API_PREFIX, httpClient } from "./http-client";

const BODYLESS_STATUS = new Set([204, 205, 304]);

function isJsonContentType(contentType: string | null): boolean {
  return contentType !== null && /^application\/(\w+\+)?json/.test(contentType);
}

export async function orvalMutator<T>(
  url: string,
  init: RequestInit,
): Promise<T> {
  // 스펙 경로에 이미 /api/v1 이 있어 httpClient 의 prefix 와 중복되므로 벗긴다.
  const path = url.startsWith(API_PREFIX) ? url.slice(API_PREFIX.length) : url;
  const response = await httpClient(path, init as Options);

  if (BODYLESS_STATUS.has(response.status)) {
    return undefined as T;
  }

  if (!isJsonContentType(response.headers.get("content-type"))) {
    return (await response.text()) as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch (cause) {
    throw new ApiError({
      code: "INVALID_RESPONSE",
      status: response.status,
      message: "서버 응답을 해석할 수 없어요.",
      data: text,
      options: { cause },
    });
  }
}
