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

- 디자인 토큰: `src/shared/styles/theme.css.ts` (`vars` 원시 토큰, `semantic` 시맨틱 토큰)
- 타이포 헬퍼: `src/shared/styles/typography.ts` (`textStyle`)
- 전역 스타일: `src/shared/styles/global.css.ts` (루트 레이아웃에서 import)

```ts
// example.css.ts
import { style } from "@vanilla-extract/css";
import { semantic, vars } from "@/shared/styles/theme.css";
import { textStyle } from "@/shared/styles/typography";

export const box = style({
  ...textStyle("spoqa", "16"),
  padding: vars.spacing["16"],
  backgroundColor: semantic.color.bgSurface,
  color: vars.color.gray["12"],
});
```

### 디자인 토큰 (Figma `디자인 작업장 › Design System` 기준)

**컬러 — 12단계 스케일**: `vars.color.accent1~5`, `vars.color.gray` (다크 테마)

| 단계 | 용도 (Figma 문서 표기) |
| --- | --- |
| 1–2 | 배경 (Backgrounds) |
| 3–5 | 인터랙티브 컴포넌트 (Interactive components) |
| 6–8 | 보더·구분선 (Borders and separators) |
| 9–10 | 솔리드 컬러 (Solid colors) |
| 11–12 | 텍스트 (Accessible text) |

단일 값: `white` `black` `background(#121212)` `opacityWhite150` `opacityBlack100` `opacityBlack500`

**시맨틱 롤**: `semantic.color.bgCanvas` `bgSurface` `accent1~5`(각 스케일 9단계 참조) `black` `white`

**타이포그래피**: 사이즈 12~32(짝수 램프) × line-height 150% × letter-spacing 0px

| 패밀리 토큰 | 폰트 | 용도 |
| --- | --- | --- |
| `departureMono` | Departure Mono | 컨셉과 맞출 필요가 있는 곳 (영문) |
| `galmuri14` / `galmuri11` | Galmuri | 한글 본문 |
| `spoqa` | Spoqa Han Sans Neo | 상세 설명 등 가독성이 필요한 곳 (기본 본문) |

> 웹폰트 파일은 아직 번들에 포함하지 않았습니다. 도입 시 `next/font/local` 등으로 추가하고,
> 토큰의 폴백 스택은 유지하세요.

**스페이싱**: `vars.spacing` — 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 36 48 (px)

**레이아웃**: `vars.layout` — 기준 화면 360×780(dp), 8dp 그리드, 4컬럼 / 거터 16 / 마진 16

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
