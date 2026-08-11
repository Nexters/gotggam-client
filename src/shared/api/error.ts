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

interface ApiErrorInit {
  code: ApiErrorCode;
  status: number | null;
  message: string;
  data?: unknown;
  options?: ErrorOptions;
}

export class ApiError extends Error {
  override readonly name = "ApiError";
  readonly code: ApiErrorCode;
  readonly status: number | null;
  readonly data?: unknown;

  constructor({ code, status, message, data, options }: ApiErrorInit) {
    super(message, options);
    this.code = code;
    this.status = status;
    this.data = data;
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }
  static toApiError(error: Error): ApiError {
    if (ApiError.isApiError(error)) {
      return error;
    }

    if (isHTTPError(error)) {
      const { status } = error.response;

      return new ApiError({
        code: toErrorCode(status),
        status,
        message:
          extractMessage(error.data) ?? `요청에 실패했어요. (HTTP ${status})`,
        data: error.data,
        options: { cause: error },
      });
    }

    if (isTimeoutError(error)) {
      return new ApiError({
        code: "TIMEOUT",
        status: null,
        message: "요청 시간이 초과됐어요. 잠시 후 다시 시도해 주세요.",
        options: { cause: error },
      });
    }

    if (isNetworkError(error)) {
      return new ApiError({
        code: "NETWORK_ERROR",
        status: null,
        message: "네트워크에 연결할 수 없어요. 연결 상태를 확인해 주세요.",
        options: { cause: error },
      });
    }

    return new ApiError({
      code: "UNKNOWN",
      status: null,
      message: error.message || "알 수 없는 오류가 발생했어요.",
      options: { cause: error },
    });
  }
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
