---
name: api-connection
description: ky + TanStack Query 기반 API 연결 패턴. API 함수·쿼리 정의·에러 처리·Orval 코드 생성 시 사용.
---

# API 연결 가이드

## 기술 스택

- **HTTP 클라이언트**: ky 2.x (`src/shared/api/http-client.ts`)
- **데이터 페칭**: TanStack Query v5 (조회는 `useSuspenseQuery`)
- **바운더리**: `@suspensive/react` v3 (`ErrorBoundary` / `Suspense` / `Delay`)
- **코드 생성**: Orval (OpenAPI 스펙 → 타입 + API 함수)
- **Provider**: `src/app/providers/index.tsx`

## 레이어 구조

```
src/shared/api/
├── http-client.ts          # 네트워크 레이어: ky 인스턴스
├── error.ts                # ApiError 정규화
├── query-client.ts         # QueryClient 팩토리 (서버·클라이언트 공용)
├── server-query-client.ts  # 서버 전용. 요청당 QueryClient
├── orval-mutator.ts        # Orval 생성 코드 ↔ ky 어댑터
└── generated/              # Orval 산출물 (직접 수정 금지)

src/{entities,features,views}/<slice>/
├── model/<name>.types.ts   # DTO (Orval 미사용 구간만 수기 작성)
├── api/<name>-api.ts       # API 레이어: 엔드포인트 함수
└── api/<name>-queries.ts   # 쿼리 레이어: queryOptions
```

**의존 방향**: `ui → api → shared/api`. 역방향 금지.

## 1. API 레이어 — 엔드포인트 함수

훅도, 캐시 정책도 넣지 않는다. 요청 하나에 함수 하나.

```ts
// src/entities/quiz/api/quiz-api.ts
import { httpClient } from "@/shared/api";

import type {
  Quiz,
  QuizListParams,
  QuizResult,
  SubmitAnswersRequest,
} from "../model/quiz.types";

type RequestOptions = { signal?: AbortSignal };

export function fetchQuizzes(
  params: QuizListParams,
  options?: RequestOptions,
): Promise<Quiz[]> {
  return httpClient
    .get("/quizzes", { ...options, searchParams: params })
    .json<Quiz[]>();
}

export function fetchQuiz(
  quizId: number,
  options?: RequestOptions,
): Promise<Quiz> {
  return httpClient.get(`/quizzes/${quizId}`, options).json<Quiz>();
}

export function submitAnswers(
  quizId: number,
  body: SubmitAnswersRequest,
): Promise<QuizResult> {
  return httpClient
    .post(`/quizzes/${quizId}/submissions`, { json: body })
    .json<QuizResult>();
}

export function fetchQuizResult(resultId: string): Promise<QuizResult> {
  return httpClient.get(`/results/${resultId}`).json<QuizResult>();
}

export async function deleteQuizResult(resultId: string): Promise<void> {
  // 본문을 읽지 않는 요청은 body 메서드(.json() 등)를 붙이지 않는다.
  await httpClient.delete(`/results/${resultId}`);
}
```

ky 사용 시 주의:

- **조회 함수는 `signal` 을 받아 ky 로 넘긴다.** TanStack Query 는 `queryFn` 이 `signal` 에
  접근했는지를 추적해서, 접근한 쿼리만 언마운트·키 변경·`cancelQueries()` 때 진행 중인
  요청을 실제로 끊는다. 안 넘기면 취소 기능 자체가 꺼져 버려질 응답을 끝까지 받는다.
- 본문은 `json:` 옵션으로 넘긴다. 직접 `JSON.stringify` 하지 않는다.
- 쿼리스트링은 직접 문자열로 붙이지 말고 `searchParams:` 옵션을 쓴다.
- `prefix` 가 붙으므로 경로는 `/quizzes`, `quizzes` 둘 다 된다.
- `.json()` 은 **빈 본문·204에서 던진다.** 응답 본문이 없으면 붙이지 말 것.

## 2. 쿼리 레이어 — `queryOptions`

커스텀 훅(`useXxxQuery`)으로 감싸지 **않는다.** `queryOptions` 객체만 정의한다.

```ts
// src/entities/quiz/api/quiz-queries.ts
import { queryOptions } from "@tanstack/react-query";

import type { QuizListParams } from "../model/quiz.types";
import { fetchQuiz, fetchQuizResult, fetchQuizzes } from "./quiz-api";

export const quizQueries = {
  all: ["quiz"] as const,

  list: (params: QuizListParams) =>
    queryOptions({
      queryKey: [...quizQueries.all, "list", params] as const,
      queryFn: ({ signal }) => fetchQuizzes(params, { signal }),
    }),

  // 문항은 거의 바뀌지 않으므로 세션 동안 다시 받지 않는다.
  detail: (quizId: number) =>
    queryOptions({
      queryKey: [...quizQueries.all, "detail", quizId] as const,
      queryFn: ({ signal }) => fetchQuiz(quizId, { signal }),
      enabled: quizId > 0,
      staleTime: Infinity,
    }),

  result: (resultId: string) =>
    queryOptions({
      queryKey: [...quizQueries.all, "result", resultId] as const,
      queryFn: ({ signal }) => fetchQuizResult(resultId, { signal }),
      enabled: Boolean(resultId),
    }),
};
```

훅이 아니라 **서버 컴포넌트에서도 그대로 쓸 수 있는 것**이 핵심이다. 결과 공유
페이지처럼 SSR 이 필요한 화면은 서버에서 프리페치하고, 클라이언트는 같은 객체로 이어받는다.

```tsx
// app/results/[resultId]/page.tsx — 서버 컴포넌트
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { quizQueries } from "@/entities/quiz/api/quiz-queries";
import { getServerQueryClient } from "@/shared/api/server-query-client";

export default async function Page({ params }) {
  const { resultId } = await params;
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery(quizQueries.result(resultId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuizResultView resultId={resultId} />
    </HydrationBoundary>
  );
}
```

```tsx
// 클라이언트 컴포넌트 — 같은 객체를 그대로 넘긴다. 추가 요청이 나가지 않는다.
const { data } = useQuery(quizQueries.result(resultId));
```

`getServerQueryClient` 는 `server-only` 로 막혀 있어 클라이언트 컴포넌트에서 import 하면
빌드가 실패한다. 프리페치 대상 쿼리는 `httpClient`(외부 API)를 써야 한다 —
`internalHttpClient` 는 서버에서 동작하지 않는다.

`useSuspenseQuery`, `useQueries`, `invalidateQueries`, `setQueryData` 에도 동일하게 넘긴다.

쿼리 키는 `all → 세부` 계층을 유지해 invalidate 범위를 제어한다. 문자열 배열을
컴포넌트에서 직접 만들지 않는다.

## 3. 컴포넌트에서 사용

조회는 `useSuspenseQuery` 로 한다. 로딩·에러 분기는 컴포넌트에 두지 않고 바깥
바운더리(5번)가 맡는다. 구조분해 시 변수명을 구체적으로 리네이밍한다.

```tsx
"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import type { SubmitAnswersRequest } from "../model/quiz.types";
import { submitAnswers } from "../api/quiz-api";
import { quizQueries } from "../api/quiz-queries";

export function QuizPlayer({ quizId }: { quizId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: quiz } = useSuspenseQuery(quizQueries.detail(quizId));

  const { mutate: submitQuiz, isPending: isSubmitPending } = useMutation({
    mutationFn: (body: SubmitAnswersRequest) => submitAnswers(quizId, body),
    onSuccess: (result) => {
      // queryOptions 의 queryKey 는 DataTag 로 브랜딩돼 있어 값 타입까지 검증된다.
      queryClient.setQueryData(quizQueries.result(result.id).queryKey, result);
      router.push(`/results/${result.id}`);
    },
  });

  return (
    <QuestionForm
      questions={quiz.questions}
      disabled={isSubmitPending}
      onSubmit={submitQuiz}
    />
  );
}
```

제출 결과를 `setQueryData` 로 미리 심어두면 결과 페이지에서 재요청이 일어나지 않는다.

## 4. 뮤테이션

`mutationFn` 은 `api/*-api.ts` 함수를 그대로 쓴다. 인자는 하나만 받으므로 값이
여럿이면 객체로 묶거나 클로저로 잡는다. 캐시 갱신에 `queryClient` 가 필요하니
컴포넌트에 둔다.

```tsx
const queryClient = useQueryClient();

const { mutate: removeResult, isPending: isRemovePending } = useMutation({
  mutationFn: deleteQuizResult,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: quizQueries.all });
  },
});
```

- 캐시 갱신은 `invalidateQueries` 가 기본. 응답에 갱신된 리소스가 그대로 담겨 오면
  `setQueryData` 로 재요청을 생략한다 (3번 예시).
- 뮤테이션은 `retry: 0` 이다 (`shared/api/query-client.ts`). 비멱등 요청을 자동 재시도하면 중복
  제출이 생긴다.
- 콜백 3번째 인자는 `onMutate` 의 반환값이다. 예전 이름이 `context` 였고 지금은
  4번째에 별개의 `context` 가 붙었으니, 구버전 예제를 그대로 옮기지 말 것.

## 5. 에러 처리

ky 의 `HTTPError` / `NetworkError` / `TimeoutError` 는 `http-client` 의 `beforeError`
훅에서 전부 `ApiError` 로 변환된다. **호출 측은 `ApiError` 하나만 알면 된다.**

```ts
class ApiError {
  code: ApiErrorCode; // "NOT_FOUND" | "NETWORK_ERROR" | ...
  status: number | null; // 응답을 못 받았으면 null
  message: string; // 서버 메시지가 있으면 그것을 사용
  data: unknown; // 서버 에러 응답 본문 원본
}
```

책임 분담:

| 상황 | 처리 위치 |
| --- | --- |
| 첫 로드 pending | 섹션의 `<Suspense>` + `<Delay ms={200}>` |
| API 에러 (`ApiError`) | 섹션의 `<ErrorBoundary>` fallback — 인라인 재시도 |
| 그 외 렌더 에러 | `shouldCatch` 를 통과해 `app/error.tsx` 로 올라감 |
| 데이터를 이미 들고 있을 때 | 아무 일도 안 일어난다. 화면을 날리지 않는다 |

### 섹션 바운더리

`@suspensive/react` 의 `ErrorBoundary` + `Suspense` + `Delay` 를 합성한다. v3 에는
`AsyncBoundary` 가 없다(v2 에서 제거). Suspensive 컴포넌트는 전부 `'use client'` 라
서버 컴포넌트 안에서 직접 못 쓴다 — 섹션 컴포넌트를 하나 두고 그 안에서 합성한다.

```tsx
// src/views/home/ui/health-section.tsx
"use client";

import { Delay, ErrorBoundary, Suspense } from "@suspensive/react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";

export function HealthSection() {
  const { reset: resetQueryErrors } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      shouldCatch={ApiError.isApiError}
      onReset={resetQueryErrors}
      fallback={({ error, reset }) => (
        <div>
          {error.message}
          <Button onClick={reset}>다시 시도</Button>
        </div>
      )}
    >
      <Suspense clientOnly fallback={<Delay ms={200}>로딩 중...</Delay>}>
        <HealthStatus />
      </Suspense>
    </ErrorBoundary>
  );
}
```

`shouldCatch` 에 타입 가드를 넘기면 `fallback` 의 `error` 타입이 좁혀진다. 여기서
안 잡은 에러는 다시 던져져 상위 바운더리로 올라간다.

재시도 정책은 **`shared/api/query-client.ts` 한 곳에만** 둔다. ky 는 `retry: 0` 이다. 두 계층에서
재시도하면 실제 요청 수가 곱해진다.

모든 실패는 `query-client.ts` 의 `QueryCache` / `MutationCache` `onError` 를 거친다.
리포팅 도구는 그 한 곳에만 연결한다. 컴포넌트의 개별 처리와는 별개로 항상 호출된다.

### 건드리면 깨지는 것들

- `useSuspenseQuery` 는 `throwOnError` 를 내부에서 하드코딩한다. `QueryClient` 의
  `defaultOptions` 로 못 바꾼다. **에러를 어디서 잡을지는 `shouldCatch` 로만 정한다.**
- 재시도는 `useQueryErrorResetBoundary().reset()` 을 먼저 부른다. suspense 쿼리는
  `retryOnMount` 가 꺼져 있어 reset 없이 재시도하면 리페치가 일어나지 않고 같은
  에러로 되돌아온다. 섹션 바운더리는 `onReset`, `app/error.tsx` 는 재시도 핸들러에서 부른다.
- 서버에서 못 도는 쿼리(`internalHttpClient` 사용)는 반드시 `<Suspense clientOnly/>`
  안에 둔다. `useSuspenseQuery` 는 `useQuery` 와 달리 프리렌더 중 서버에서 `queryFn` 을
  실행하므로, 빼먹으면 **런타임이 아니라 빌드가 깨진다.**
- suspense 쿼리는 `staleTime` 하한이 1000ms 다. 그보다 작게 줘도 1000ms 로 올라간다.
- `app/error.tsx` 와 `app/providers` 는 `@/shared/api` barrel 이 아니라
  `@/shared/api/error` 에서 직접 import 한다. barrel 을 타면 `http-client → env` 가
  딸려와, 환경 변수가 없을 때 에러 페이지조차 렌더되지 않는다.
- `internalHttpClient` 는 브라우저 전용이다. 서버에서 부르면 `ApiError` 로 막힌다.
- `.json()` 은 본문이 빈 응답에서 raw `SyntaxError` 를 던진다 (정규화 대상 밖).
  본문 없는 요청에는 붙이지 말 것.

## 6. Orval 코드 생성

백엔드 OpenAPI 스펙에서 타입과 API 함수를 생성한다. TanStack Query 훅은
생성하지 않는다 — 캐시 정책은 우리가 통제한다.

```bash
pnpm generate:api        # 1회 생성
pnpm generate:api:watch  # 워치 모드
```

- 스펙 주소: `.env.local` 의 `API_SPEC_URL`, 없으면 `${NEXT_PUBLIC_API_BASE_URL}/v3/api-docs`
- 산출물: `src/shared/api/generated/` — **직접 수정하지 않는다.** eslint 대상에서 제외돼 있다.
- 생성된 함수는 `orval-mutator.ts` 를 거쳐 ky 를 타므로 타임아웃·`ApiError` 정규화가
  그대로 적용된다.
- 생성된 함수 위에 `queryOptions` 를 **수기로** 얹는다. 위 2번 패턴 그대로.
- 산출물은 커밋한다. CI 빌드가 백엔드 가동에 의존하면 안 된다.

## 새 엔드포인트 추가 체크리스트

- [ ] DTO 타입이 있는가? (Orval 생성분 우선, 없으면 `model/*.types.ts`)
- [ ] `api/*-api.ts` 에 엔드포인트 함수를 만들었는가?
- [ ] `api/*-queries.ts` 에 `queryOptions` 를 정의했는가? (훅으로 감싸지 않았는가?)
- [ ] 쿼리 키가 `all` 계층 아래에 있는가?
- [ ] mutation 이면 `invalidateQueries` 나 `setQueryData` 로 캐시를 갱신했는가?
- [ ] 에러 UX 분기를 넣었는가?
