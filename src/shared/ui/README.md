# shared/ui

공용 UI 컴포넌트(디자인 시스템)를 두는 곳입니다. 모두 `@/shared/ui`에서 import합니다.

```ts
import { Button, IconButton, IconSpeaker, PixelCornerButton, Typography } from "@/shared/ui";
```

## Typography

토큰 기반으로 폰트 패밀리/사이즈/굵기/색상을 조합해 렌더링합니다. `*.css.ts`에 직접
`fontFamily`/`fontSize` 등을 하드코딩하는 대신 이 컴포넌트(또는 `getTypographyClassName`)를
씁니다.

```tsx
import { Typography } from "@/shared/ui";

<Typography family="spoqa" size="16" weight="semibold" color="gray-12">
  안내 문구
</Typography>

// as로 렌더링 태그 변경 (기본값 span)
<Typography as="h1" family="departureMono" size="32" color="accent1-12">
  제목
</Typography>
```

| Prop | 필수 | 값 |
| --- | --- | --- |
| `family` | ✅ | `vars.font`의 키 (`departureMono` `galmuri14` `galmuri11` `spoqa`) |
| `size` | ✅ | `vars.fontSize`의 키 (`12`~`32`) |
| `weight` |  | `vars.fontWeight`의 키. 기본값 `regular` |
| `color` |  | `gray-1~12`, `accent1~5-1~12`, `white` `black` `background` `opacity*` |
| `as` |  | 렌더링할 엘리먼트/컴포넌트. 기본값 `span` |

`*.css.ts`처럼 컴포넌트가 아니라 클래스명 문자열이 필요한 곳(예: 다른 컴포넌트의 기본
스타일에 타이포를 얹을 때 — `Button`이 이렇게 씁니다)은 같은 옵션을 받는
`getTypographyClassName`을 `@/shared/styles`에서 바로 씁니다.

```ts
import { getTypographyClassName } from "@/shared/styles";

className: getTypographyClassName({ family: "spoqa", size: "14", weight: "semibold" });
```

실제 폰트 파일은 `public/fonts/`에 있고 `src/shared/styles/font-face.css.ts`의
`@font-face` 선언과 매핑됩니다. 새 폰트를 추가하면 `theme.css.ts`의 `vars.font`와
`font-face.css.ts` 양쪽에 등록하세요.

## Button

가장 기본적인 버튼 프리미티브입니다. 타이포(`spoqa` `14` `semibold`) + 배경색
(`semantic.color.accent1`) + 패딩 + `border-radius: 10px`가 기본으로 들어가 있고,
hover 시 배경색이 `vars.color.accent1["10"]`으로, disabled 시 `opacity: 0.5`로
바뀝니다.

```tsx
import { Button } from "@/shared/ui";

<Button onClick={handleClick}>확인</Button>
<Button disabled>비활성</Button>
```

`PixelCornerButton`은 이 hover/disabled 효과를 공유하려고 내부적으로 `Button`을
감싸는 방식으로 만듭니다. `IconButton`은 배경/패딩 없이 완전히 독립적인 리셋
스타일만 갖습니다.

## Icon

`icon/assets/*.svg`를 SVGR로 불러온 아이콘 컴포넌트 모음입니다.

| Export | 설명 |
| --- | --- |
| `IconSpeaker.On` / `IconSpeaker.Off` | on/off 상태를 각자 컴포넌트로 분리한 스피커 아이콘 |
| `IconButtonArrow.Left` / `IconButtonArrow.Right` | 화살표 아이콘. 원본이 왼쪽 방향이라 `.Right`는 CSS로 좌우 반전한 버전 |
| `IconButtonBack` / `IconButtonHome` / `IconButtonNext` | 내비게이션 아이콘 |

모두 `SVGProps<SVGSVGElement>`를 그대로 받는 컴포넌트라 `className`, `width`,
`height` 등을 바로 넘길 수 있습니다.

## IconButton

아이콘만 있는 버튼. 배경/패딩/보더 없이 리셋만 되어 있습니다. 스크린리더가 읽을
텍스트가 없기 때문에 `aria-label`을 **타입 레벨에서 필수**로 강제합니다.

```tsx
import { IconButton, IconSpeaker } from "@/shared/ui";

<IconButton aria-label="배경음악 켜기" onClick={toggle}>
  <IconSpeaker.Off />
</IconButton>
```

## PixelCornerButton

계단형(픽셀아트) 모서리를 가진 버튼. `Button`을 감싸서 hover/disabled/타이포는
그대로 상속받고, **모서리를 계단형으로 잘라내는 것 하나만** 책임집니다. 배경색,
그라디언트, 크기, 패딩 등은 전부 `className`으로 사용처에서 정합니다.

```tsx
import { PixelCornerButton } from "@/shared/ui";

<PixelCornerButton cornerSize={4} className={styles.myButton}>
  시작하기
</PixelCornerButton>
```

| Prop | 설명 |
| --- | --- |
| `cornerSize` | 계단 한 칸의 크기(px). 기본값 `4`. 모서리는 `2 * cornerSize`만큼 잘려나간다 |
| 그 외 | `ButtonHTMLAttributes` 전부 그대로 전달 (`className` `style` 포함, `style`은 내부 `clip-path`와 병합됨) |

같은 계단 실루엣이 필요한 별도 레이어(예: 버튼 뒤에 깔리는 글로우/배경)를 만들 때는
버튼과 똑같은 `clip-path` 값을 재사용할 수 있게 `getPixelCornerClipPath(step)`도
같이 export합니다.

```ts
import { getPixelCornerClipPath } from "@/shared/ui";

style={{ clipPath: `polygon(${getPixelCornerClipPath(4)})` }}
```

> ⚠️ `filter`(예: `drop-shadow`, `blur`)를 `clip-path`가 걸린 요소에 직접 걸면
> 브라우저가 필터 적용을 위해 오프스크린으로 다시 래스터화하면서 계단 모서리의
> 각진 경계까지 같이 흐려집니다. 크리스프한 모서리를 유지하려면 필터가 필요한
> 효과(글로우 등)는 `PixelCornerButton` 위에 얹지 말고, `getPixelCornerClipPath`로
> 같은 모양을 잘라낸 **별도 레이어**에 걸어서 뒤에 깔아주세요.
