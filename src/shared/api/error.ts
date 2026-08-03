import { isHTTPError, isNetworkError, isTimeoutError } from "ky";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "TOO_MANY_REQUESTS"
  | "INTERNAL_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "INVALID_RESPONSE"
  | "UNSUPPORTED_ENVIRONMENT"
  | "UNKNOWN";

export class ApiError extends Error {
  override readonly name = "ApiError";

  constructor(
    readonly code: ApiErrorCode,
    readonly status: number | null,
    message: string,
    readonly data?: unknown,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

const STATUS_TO_ERROR_CODE: Record<number, ApiErrorCode> = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  429: "TOO_MANY_REQUESTS",
};

function toErrorCode(status: number): ApiErrorCode {
  if (STATUS_TO_ERROR_CODE[status]) {
    return STATUS_TO_ERROR_CODE[status];
  }

  return status >= 500 ? "INTERNAL_ERROR" : "UNKNOWN";
}

// TODO: 에러 응답 스펙 확정 시 키 목록을 좁힌다.
function extractMessage(data: unknown): string | undefined {
  if (typeof data === "string") {
    return data.trim() || undefined;
  }

  if (typeof data !== "object" || data === null) {
    return undefined;
  }

  const record = data as Record<string, unknown>;

  for (const key of ["message", "error", "detail"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return undefined;
}

export function toApiError(error: Error): ApiError {
  if (isApiError(error)) {
    return error;
  }

  if (isHTTPError(error)) {
    const { status } = error.response;

    return new ApiError(
      toErrorCode(status),
      status,
      extractMessage(error.data) ?? `요청에 실패했어요. (HTTP ${status})`,
      error.data,
      { cause: error },
    );
  }

  if (isTimeoutError(error)) {
    return new ApiError(
      "TIMEOUT",
      null,
      "요청 시간이 초과됐어요. 잠시 후 다시 시도해 주세요.",
      undefined,
      { cause: error },
    );
  }

  if (isNetworkError(error)) {
    return new ApiError(
      "NETWORK_ERROR",
      null,
      "네트워크에 연결할 수 없어요. 연결 상태를 확인해 주세요.",
      undefined,
      { cause: error },
    );
  }

  return new ApiError(
    "UNKNOWN",
    null,
    error.message || "알 수 없는 오류가 발생했어요.",
    undefined,
    { cause: error },
  );
}
