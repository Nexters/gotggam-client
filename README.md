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
- 타이포 헬퍼: `src/shared/styles/typography.ts` (`getTypographyClassName`) — 컴포넌트에서는
  이걸 감싼 `Typography`(`@/shared/ui`)를 씁니다. 자세한 내용은
  [`src/shared/ui/README.md`](src/shared/ui/README.md) 참고
- 전역 스타일: `src/shared/styles/global.css.ts` (루트 레이아웃에서 import)
- 폰트: `src/shared/styles/font-face.css.ts`의 `@font-face` 선언 + `public/fonts/`

```ts
// example.css.ts
import { style } from "@vanilla-extract/css";
import { semantic, vars } from "@/shared/styles/theme.css";

export const box = style({
  padding: vars.spacing["16"],
  backgroundColor: semantic.color.bgSurface,
});
```

```tsx
// example.tsx — 텍스트는 css.ts에서 직접 스타일링하지 않고 Typography로 렌더링
import { Typography } from "@/shared/ui";

<div className={styles.box}>
  <Typography family="spoqa" size="16" color="gray-12">
    안내 문구
  </Typography>
</div>
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

**스페이싱**: `vars.spacing` — 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 36 48 (px)

**레이아웃**: `vars.layout` — 기준 화면 360×780(dp), 8dp 그리드, 4컬럼 / 거터 16 / 마진 16

## 공용 UI / 유틸리티

`@/shared/ui`, `@/shared/lib`에 지금까지 만든 공용 모듈입니다. 자세한 사용법은
각 README를 참고하세요.

| 모듈 | 위치 | 설명 |
| --- | --- | --- |
| `Button` | [`shared/ui`](src/shared/ui/README.md) | 기본 버튼(배경색 + hover/disabled) |
| `IconButton` | [`shared/ui`](src/shared/ui/README.md) | 아이콘 전용 버튼. `aria-label` 필수 |
| `PixelCornerButton` | [`shared/ui`](src/shared/ui/README.md) | 계단형(픽셀아트) 모서리 버튼. `cornerSize`로 크기 조절 |
| `Typography` | [`shared/ui`](src/shared/ui/README.md) | 토큰 기반 텍스트 컴포넌트 (`family`/`size`/`weight`/`color`) |
| `IconSpeaker`, `IconButtonArrow` 등 | [`shared/ui`](src/shared/ui/README.md) | SVGR 아이콘 컴포넌트 |
| `cn` | [`shared/lib`](src/shared/lib/README.md) | `clsx` re-export |
| `useLocalStorage` | [`shared/lib`](src/shared/lib/README.md) | SSR 안전 `localStorage` 상태 훅 (`useSyncExternalStore`) |
| `useHasMounted` | [`shared/lib`](src/shared/lib/README.md) | hydration 완료 여부. 클라이언트 전용 값의 flicker 방지용 |

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
