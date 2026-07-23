# death-client

Next.js 16 기반 프론트엔드 프로젝트입니다.

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| 프레임워크 | [Next.js 16](https://nextjs.org) (App Router) |
| 언어 | TypeScript |
| 패키지 매니저 | pnpm |
| 스타일링 | [vanilla-extract](https://vanilla-extract.style) |
| 서버 상태 | [TanStack Query v5](https://tanstack.com/query) |
| 아키텍처 | [FSD (Feature-Sliced Design)](https://feature-sliced.design) |

## 시작하기

### 요구 사항

- Node.js 20.9 이상
- pnpm 10 이상

### 스크립트

```bash
pnpm install   # 의존성 설치
pnpm dev       # 개발 서버 (http://localhost:3000)
pnpm build     # 프로덕션 빌드
pnpm start     # 프로덕션 서버
pnpm lint      # ESLint 검사
```

> **번들러 참고**: vanilla-extract 플러그인이 아직 Turbopack을 지원하지 않아,
> `dev`/`build` 스크립트는 Next.js 16이 제공하는 `--webpack` 플래그로 webpack을
> 사용합니다. vanilla-extract가 Turbopack을 지원하게 되면 플래그만 제거하면 됩니다.

## 프로젝트 구조 (FSD)

[Feature-Sliced Design](https://feature-sliced.design)을 따릅니다.

```
src/
├── app/          # 앱 레이어 + Next.js App Router (라우팅, 전역 Provider, API 라우트)
│   ├── providers/    # 전역 Provider (React Query 등)
│   ├── api/          # Next.js Route Handler
│   ├── layout.tsx
│   └── page.tsx      # views 레이어의 페이지를 얇게 re-export
├── views/        # 페이지 레이어 (FSD pages — Next.js pages 라우터와 충돌을 피해 views로 명명)
├── widgets/      # 여러 기능을 조합한 독립적인 UI 블록
├── features/     # 사용자 시나리오, 비즈니스 가치가 있는 기능 단위
├── entities/     # 비즈니스 엔티티 (도메인 모델)
└── shared/       # 공용 코드 (UI 킷, API 클라이언트, 디자인 토큰, 유틸)
```

### 레이어 규칙

- 의존 방향은 항상 아래로만: `app → views → widgets → features → entities → shared`
- 같은 레이어의 다른 슬라이스는 import하지 않습니다.
- 각 슬라이스는 `index.ts`(public API)를 통해서만 외부에 노출합니다.
- 슬라이스 내부는 `ui / api / model / lib / config` 세그먼트로 구성합니다.
- Next.js 라우트 파일(`src/app/**/page.tsx`)은 라우팅만 담당하고, 실제 화면은
  `views` 레이어에 구현합니다.

## 스타일링 (vanilla-extract)

스타일은 `*.css.ts` 파일에 작성하며, 빌드 타임에 정적 CSS로 추출됩니다(제로 런타임).

- 디자인 토큰: `src/shared/styles/theme.css.ts`의 `vars`
- 전역 스타일: `src/shared/styles/global.css.ts` (루트 레이아웃에서 import)

```ts
// example.css.ts
import { style } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";

export const box = style({
  padding: vars.space.md,
  backgroundColor: vars.color.surface,
});
```

## 서버 상태 (TanStack Query)

- `QueryClient` 설정과 Provider: `src/app/providers/index.tsx`
  (서버에서는 요청마다 새 클라이언트를 생성하는 SSR 안전 구성)
- 예시 쿼리 훅: `src/views/home/api/use-health-query.ts`

## 브랜치 전략

| 브랜치 | 용도 |
| --- | --- |
| `main` | 배포(프로덕션) 브랜치 |
| `develop` | 개발 기본 브랜치. 기능 브랜치가 머지되는 대상 |

작업은 `develop`에서 분기한 `feat/*`, `fix/*` 브랜치에서 진행한 뒤 `develop`으로
PR을 보내고, 릴리스 시 `develop`을 `main`으로 머지합니다.
