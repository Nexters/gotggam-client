# app

FSD의 `app` 레이어이자 Next.js App Router 디렉토리입니다.

- 라우트 파일(`page.tsx`, `layout.tsx`, `api/**/route.ts`)은 라우팅만 담당합니다.
- 실제 화면은 `views` 레이어에 구현하고, 라우트 파일에서 re-export 합니다.
- `providers/` — 전역 Provider (React Query 등)
