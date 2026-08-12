import { loadEnvConfig } from "@next/env";
import { defineConfig } from "orval";

// orval 은 Next 런타임 밖에서 실행되므로 .env* 를 직접 로드해야 한다.
loadEnvConfig(process.cwd());

const specUrl =
  process.env.API_SPEC_URL ??
  (process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/v3/api-docs`
    : undefined);

if (!specUrl) {
  throw new Error(
    "OpenAPI 스펙 주소를 찾을 수 없습니다. .env.local 에 API_SPEC_URL 또는 NEXT_PUBLIC_API_BASE_URL 을 설정하세요.",
  );
}

export default defineConfig({
  deathClient: {
    input: {
      target: specUrl,
    },
    output: {
      target: "./src/shared/api/generated",
      schemas: "./src/shared/api/generated/models",
      client: "fetch",
      mode: "tags-split",
      override: {
        fetch: { includeHttpResponseReturnType: false },
        mutator: {
          path: "./src/shared/api/orval-mutator.ts",
          name: "orvalMutator",
        },
      },
    },
  },
});
