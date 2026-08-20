export function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `환경 변수 ${name} 가 설정되지 않았습니다. .env.example 을 참고해 .env.local 에 값을 추가하세요.`,
    );
  }

  return value;
}

/** 앱 전역 환경 변수. */
export const env = {
  apiBaseUrl: requireEnv(
    "NEXT_PUBLIC_API_BASE_URL",
    process.env.NEXT_PUBLIC_API_BASE_URL,
  ),
} as const;
