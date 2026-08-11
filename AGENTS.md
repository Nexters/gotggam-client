<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# API 연결

ky + TanStack Query + Suspensive 를 씁니다. **API 함수·쿼리·에러 처리 코드를 쓰기 전에
`.claude/skills/api-connection/SKILL.md` 를 읽으세요.**

요약:

- 네트워크 레이어는 `src/shared/api/` 에만 둔다. 컴포넌트에서 `fetch` 를 직접 호출하지 않는다.
- ky 2.x 는 v1 과 다르다 — `prefixUrl` 은 제거됐고(`prefix`/`baseUrl`), 훅은 `({ request, options, retryCount })` 단일 객체를 받는다.
- 쿼리는 커스텀 훅으로 감싸지 않고 `queryOptions` 객체로 정의한다. 조회는 `useSuspenseQuery` 로 한다.
- 로딩·에러 분기는 컴포넌트가 아니라 섹션 바운더리(`@suspensive/react` 의
  `ErrorBoundary` + `Suspense` + `Delay`)가 맡는다. v3 에 `AsyncBoundary` 는 없다.
- 어떤 에러를 어디서 잡을지는 `ErrorBoundary` 의 `shouldCatch` 로만 정한다.
  `useSuspenseQuery` 는 `throwOnError` 를 하드코딩해서 `QueryClient` 설정이 먹지 않는다.
- HTTP·네트워크·타임아웃 에러와 JSON 파싱 실패는 `ApiError` 로 정규화된다.
  예외는 본문이 빈 응답에 `.json()` 을 붙인 경우뿐이니, 그럴 땐 붙이지 말 것.
- 조회 함수는 `signal` 을 받아 ky 로 넘긴다. 안 넘기면 요청 취소가 아예 동작하지 않는다.
- 재시도 정책과 전역 에러 훅은 `shared/api/query-client.ts` 한 곳에만 둔다.
- 서버 프리페치는 `shared/api/server-query-client.ts` + `HydrationBoundary` 를 쓴다.
- 백엔드 OpenAPI 스펙이 나오면 `pnpm generate:api` 로 타입·API 함수를 생성한다.

# 주석 규칙

- 자명한 코드 우선, 주석 최소화. 웬만해선 주석을 작성하지 않음.
- 코드에 대한 설명은 절대 주석으로 달지 않음.
- 허용: TODO 주석, 공개 API 또는 함수 문서화(JSDoc), 복잡한 비즈니스 로직 설명
- 금지: 중복 설명, 주석 처리된 코드, 저자 표시

# 커밋 컨벤션

- 형식: `<type>: <설명>` (예: `feat: 랜딩 페이지 구현`)
- 타입: `feat`, `fix`, `refactor`, `docs`, `design`, `style`, `misc`, `chore`, `deps`, `test`, `hotfix` — 첫 글자 대문자(`Feat:` 등)도 허용
- `commit-msg` 훅(commitlint)이 타입을 강제함 — `commitlint.config.mjs`
- 브랜치명: `<type>/<subject>` (예: `feat/landing-page`) — `pre-push` 훅이 검증함
