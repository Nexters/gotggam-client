import type { Options } from "ky";

import { ApiError } from "./error";
import { httpClient } from "./http-client";

const BODYLESS_STATUS = new Set([204, 205, 304]);

function isJsonContentType(contentType: string | null): boolean {
  return contentType !== null && /^application\/(\w+\+)?json/.test(contentType);
}

export async function orvalMutator<T>(
  url: string,
  init: RequestInit,
): Promise<T> {
  const response = await httpClient(url, init as Options);

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
    throw new ApiError(
      "INVALID_RESPONSE",
      response.status,
      "서버 응답을 해석할 수 없어요.",
      text,
      { cause },
    );
  }
}
