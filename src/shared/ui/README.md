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

## BottomPanel

화면 하단에 블러 배경(`rgba(18,18,18,0.8)` + blur 6px)으로 깔리는 패널 골격입니다.
내용(`children`)과 그라데이션 CTA 버튼 사이 배치를 책임지고, 내용 구성은 사용처가
정합니다. 부모가 `position` 기준이 되어야 합니다(패널이 `position: absolute;
bottom: 0`으로 깔림). `InputPanel`이 이 골격 위에 만들어져 있습니다.

```tsx
import { BottomPanel } from "@/shared/ui";

<BottomPanel ctaLabel="다음" ctaDisabled={!isValid} onCtaClick={handleNext}>
  {/* 제목·입력 UI 등 패널 내용 */}
</BottomPanel>
```

| Prop | 필수 | 설명 |
| --- | --- | --- |
| `children` | ✅ | 패널 내용 |
| `ctaLabel` | ✅ | CTA 버튼 텍스트 |
| `ctaDisabled` |  | CTA 비활성 여부 |
| `onCtaClick` |  | CTA 클릭 핸들러 |

## ChoicePanel

화면 하단에 블러 배경으로 깔리는 선택지 패널입니다. 제목 + 전체 폭 선택지 행으로
구성되고, 선택된 행은 보라색(`rgba(107,76,168,0.32)`)으로 강조되며 패널 하단은
배경색으로 잦아듭니다. CTA 버튼이 없으므로 다음 단계 진행은 `onSelect`에서
사용처가 처리합니다. 부모가 `position` 기준이 되어야 합니다.

```tsx
import { ChoicePanel } from "@/shared/ui";

<ChoicePanel
  title="성별을 알려달라냥."
  options={["여성", "남성"]}
  value={gender}
  onSelect={setGender}
/>
```

| Prop | 필수 | 설명 |
| --- | --- | --- |
| `title` | ✅ | 패널 상단 안내 문구 |
| `options` | ✅ | 선택지 텍스트 목록. 표시 텍스트가 곧 값 |
| `value` / `onSelect` | ✅ | 제어 선택값 (`null`이면 미선택) |

## InputPanel

`BottomPanel` 위에 만든 한 줄 입력 폼입니다. 제목 + 픽셀 코너 입력창 + 힌트로
구성되고, `ctaDisabled`를 생략하면 입력값이 비어 있을 때 CTA가 비활성화됩니다.

```tsx
import { InputPanel } from "@/shared/ui";

<InputPanel
  title="이름을 알려달라냥."
  value={name}
  onChange={setName}
  placeholder="이름을 입력해주세요."
  maxLength={4}
  hint="- 4자 이내로 작성해주세요."
  ctaLabel="다음"
  onCtaClick={handleSubmit}
/>
```

| Prop | 필수 | 설명 |
| --- | --- | --- |
| `title` | ✅ | 패널 상단 안내 문구 |
| `value` / `onChange` | ✅ | 제어 입력값. `onChange`는 문자열을 그대로 받음 |
| `ctaLabel` | ✅ | CTA 버튼 텍스트 |
| `placeholder` `maxLength` |  | 입력창에 그대로 전달 |
| `hint` |  | 입력창 아래 보조 문구 |
| `ctaDisabled` |  | CTA 비활성 조건. 생략하면 값이 비어 있을 때 비활성화 |
| `onCtaClick` |  | CTA 클릭 핸들러 |

## WheelPicker / WheelPickerGroup

iOS식 휠 피커(`@ncdai/react-wheel-picker` 래핑). 선택 행은 중앙에 흰색
Galmuri11 24px로 표시되고, 위아래 행은 마스크로 페이드됩니다. 여러 열(연/월/일
등)은 `WheelPickerGroup` 안에 `WheelPicker`를 나란히 넣어 구성합니다.

```tsx
import { WheelPicker, WheelPickerGroup, type WheelPickerOption } from "@/shared/ui";

const years: WheelPickerOption[] = [{ value: "2005", label: "2005" }, ...];

<WheelPickerGroup>
  <WheelPicker options={years} value={year} onChange={setYear} />
  <WheelPicker options={months} value={month} onChange={setMonth} />
</WheelPickerGroup>
```

| Prop | 필수 | 설명 |
| --- | --- | --- |
| `options` | ✅ | `{ value, label }` 배열 (`WheelPickerOption`) |
| `value` / `onChange` | ✅ | 제어 선택값 |

> 휠 높이는 CSS가 아니라 라이브러리가 `visibleCount`로 계산합니다(현재 8 ≈ 90px).
> 래퍼에 고정 높이를 주면 중앙 하이라이트가 잘려나가니 주의하세요.

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

같은 계단 실루엣이 필요한 다른 요소(예: 버튼 뒤에 깔리는 글로우/배경, 입력창)에는
동일한 `clip-path` 값을 만드는 `getPixelCornerClipPath(step)`를 씁니다. React 의존이
없는 순수 함수라 `@/shared/styles`에 있고, `*.css.ts`에서도 import할 수 있습니다.
(`*.css.ts`에서 `@/shared/ui`를 import하면 vanilla-extract 컴파일이 React Refresh
변환과 충돌해 dev 빌드가 깨지니 주의하세요.)

```ts
import { getPixelCornerClipPath } from "@/shared/styles/pixel-corner";

clipPath: `polygon(${getPixelCornerClipPath(4)})`,
```

> ⚠️ `filter`(예: `drop-shadow`, `blur`)를 `clip-path`가 걸린 요소에 직접 걸면
> 브라우저가 필터 적용을 위해 오프스크린으로 다시 래스터화하면서 계단 모서리의
> 각진 경계까지 같이 흐려집니다. 크리스프한 모서리를 유지하려면 필터가 필요한
> 효과(글로우 등)는 `PixelCornerButton` 위에 얹지 말고, `getPixelCornerClipPath`로
> 같은 모양을 잘라낸 **별도 레이어**에 걸어서 뒤에 깔아주세요.
