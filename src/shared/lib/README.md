# shared/lib

특정 도메인에 묶이지 않는 순수 유틸리티(날짜, 포맷팅, 공용 훅 등)를 두는 곳입니다.
모두 `@/shared/lib`에서 import합니다.

```ts
import { cn, useAudio, useHasMounted, useLocalStorage } from "@/shared/lib";
```

## cn

[clsx](https://github.com/lukeed/clsx) re-export. 조건부 클래스, 여러 `*.css.ts`
클래스 병합에 씁니다.

```ts
cn(styles.base, isActive && styles.active, className);
```

## useLocalStorage

`localStorage`에 값을 저장하는 상태 훅. `useSyncExternalStore` 기반이라 SSR에서도
안전하고(서버 스냅샷은 `null` → `initialValue` 사용), `useState`와 동일한
`[value, setValue]` 튜플을 반환합니다.

```tsx
"use client";

import { useLocalStorage } from "@/shared/lib";

const [isOn, setIsOn] = useLocalStorage("bgm-enabled", true);

setIsOn(false);
setIsOn((prev) => !prev); // 업데이터 함수도 지원
```

값은 `JSON.stringify`/`JSON.parse`로 직렬화합니다. 같은 `key`를 쓰는 다른
컴포넌트·다른 탭과 자동으로 동기화됩니다:

- **다른 탭** — 브라우저 네이티브 `storage` 이벤트로 구독
- **같은 탭** — `storage` 이벤트는 변경을 일으킨 탭 자신에게는 발생하지 않기
  때문에, `setValue`가 `localStorage.setItem` 직후 커스텀 `local-storage`
  이벤트를 직접 dispatch해서 같은 탭 안의 다른 구독자도 갱신되게 합니다.

> ⚠️ **hydration 시 값이 튀는 문제(flicker)**: 서버는 `localStorage` 값을 알 수
> 없으므로 최초 렌더는 항상 `initialValue`로 그려지고, mount 직후 실제 저장된
> 값으로 다시 렌더됩니다. 두 값이 다르면 화면이 한 번 바뀌는 게 눈에 보일 수
> 있습니다. 이 UI가 눈에 띄면 안 되는 경우 아래 `useHasMounted`로 값이 확정되기
> 전까지 숨겨두세요.

## useHasMounted

hydration이 끝났는지(= 클라이언트 전용 값을 신뢰할 수 있게 됐는지) 판단하는
훅. 서버 스냅샷은 `false`, 클라이언트 스냅샷은 `true`를 반환합니다.

`useEffect(() => setMounted(true), [])` 패턴과 목적은 같지만, effect 안에서
`setState`를 직접 호출하지 않아 이 프로젝트의 ESLint 룰
(`react-hooks/set-state-in-effect`)에 걸리지 않고 불필요한 리렌더 캐스케이드도
없습니다.

`useLocalStorage`처럼 서버가 알 수 없는 값에 의존하는 UI를 mount 전까지
숨겨서 hydration flicker를 없앨 때 씁니다 — 레이아웃 밀림을 피하려면
`display: none` 대신 `visibility`/`opacity`로 숨기세요.

```tsx
"use client";

import { useHasMounted, useLocalStorage } from "@/shared/lib";

function BgmToggleButton() {
  const [isOn, setIsOn] = useLocalStorage("bgm-enabled", true);
  const mounted = useHasMounted();

  return (
    <IconButton
      aria-label={isOn ? "배경음악 끄기" : "배경음악 켜기"}
      onClick={() => setIsOn((prev) => !prev)}
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {isOn ? <IconSpeaker.On /> : <IconSpeaker.Off />}
    </IconButton>
  );
}
```

## useAudio / setAudioPlaying

오디오를 상태에 따라 재생/일시정지하는 훅. `isPlaying`이 처음 `true`가 되는
시점에 `Audio` 인스턴스를 지연 생성해서, 꺼져 있는 동안에는 리소스를 아예
요청하지 않습니다. 인스턴스는 `src`별로 모듈 레벨에 캐시되므로 다시 켜도
리소스를 새로 불러오지 않고, 여러 곳에서 같은 오디오를 조작할 수 있습니다.

```tsx
"use client";

import { useAudio } from "@/shared/lib";

useAudio({ src: "/audio/bgm.mp3", isPlaying, loop: true });
```

전역에서 한 번만 재생해야 하는 배경음악 등은 라우트별 컴포넌트가 아니라
`app/providers`처럼 앱 전체에 마운트되는 위치에서 이 훅을 호출하세요
(예: `BgmPlayer`).

### 자동재생 정책 대응

브라우저는 사용자 제스처(클릭 등) **이벤트 핸들러 안에서 동기적으로** 호출된
`play()`만 허용합니다. `useEffect` 안의 호출은 리렌더를 거쳐 비동기로 실행되어
제스처로 인정받지 못하므로, **첫 진입 시 `isPlaying: true`로 시작하는 재생은
거의 항상 거부됩니다.**

그래서 `setAudioPlaying`은 `play()`가 거부되면 그냥 무시하지 않고, **페이지의
첫 사용자 제스처를 기다렸다가 자동으로 재생을 재시도**합니다. 덕분에 켜진 상태로
진입해도 사용자가 화면을 처음 터치/클릭하는 순간 음악이 시작됩니다.

버튼으로 직접 켜는 경우에는 effect를 거치지 않도록 클릭 핸들러 안에서
`setAudioPlaying`을 동기적으로 호출하세요:

```tsx
onClick={() => {
  const next = !isOn;
  setAudioPlaying(BGM_SRC, next, { loop: true });
  setIsOn(next);
}}
```

> 제스처 감지는 `pointerdown`이 아니라 `click`/`keydown`으로 합니다.
> React 핸들러가 document 리스너보다 먼저 실행되므로, 유저가 토글 버튼을 눌러
> **끄는** 경우 재시도 예약이 먼저 취소됩니다. `pointerdown`이면 `click`보다
> 먼저 발생해서, 껐는데도 소리가 잠깐 새어 나옵니다.
