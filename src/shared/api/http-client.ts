import ky, { type InitHook, type Options } from "ky";

import { env } from "@/shared/config/env";

import { ApiError, toApiError } from "./error";

const TIMEOUT = 10_000;
const API_PREFIX = "/api/v1";

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch (cause) {
    throw new ApiError(
      "INVALID_RESPONSE",
      null,
      "서버 응답을 해석할 수 없어요.",
      text,
      { cause },
    );
  }
}

const baseOptions: Options = {
  timeout: TIMEOUT,
  retry: 0,
  parseJson,
  hooks: {
    beforeError: [({ error }) => toApiError(error)],
  },
};

export const httpClient = ky.create({
  ...baseOptions,
  prefix: `${env.apiBaseUrl}${API_PREFIX}`,
});

const browserOnly: InitHook = () => {
  if (typeof window === "undefined") {
    throw new ApiError(
      "UNSUPPORTED_ENVIRONMENT",
      null,
      "internalHttpClient 는 브라우저에서만 사용할 수 있어요. 서버에서는 Route Handler 를 거치지 말고 해당 로직을 직접 호출하세요.",
    );
  }
};

/** 같은 오리진의 Next Route Handler(`src/app/api/*`) 전용. 브라우저에서만 동작한다. */
export const internalHttpClient = ky.create({
  ...baseOptions,
  prefix: API_PREFIX,
  hooks: { ...baseOptions.hooks, init: [browserOnly] },
});
