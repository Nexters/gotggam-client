"use client";

import { useEffect } from "react";

type AudioOptions = {
  loop?: boolean;
};

// src별로 Audio 인스턴스를 하나만 만들어 공유한다. useAudio를 호출하는
// 컴포넌트(BgmPlayer)와 setAudioPlaying을 직접 호출하는 곳(BgmToggleButton의
// 클릭 핸들러)이 같은 인스턴스를 다루게 하기 위함이다.
const audioCache = new Map<string, HTMLAudioElement>();

function getAudio(src: string, { loop = false }: AudioOptions = {}) {
  let audio = audioCache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.loop = loop;
    audioCache.set(src, audio);
  }
  return audio;
}

// pointerdown/touchstart가 아니라 click을 쓰는 이유: React 핸들러(root에 위임)가
// document 리스너보다 먼저 실행되므로, 유저가 토글 버튼을 눌러 "끄는" 경우
// 아래 setAudioPlaying(false)의 cancelPendingPlay가 먼저 돌아 이 리스너를
// 제거한다. pointerdown이면 click보다 먼저 터져서 껐는데도 소리가 잠깐 나온다.
const GESTURE_EVENTS = ["click", "keydown"] as const;

const pendingPlays = new Map<string, () => void>();

function cancelPendingPlay(src: string) {
  pendingPlays.get(src)?.();
}

// 자동재생이 막혔을 때 첫 사용자 제스처에 재생을 다시 시도한다.
function playOnNextGesture(src: string, audio: HTMLAudioElement) {
  cancelPendingPlay(src);

  const cleanup = () => {
    for (const event of GESTURE_EVENTS) {
      document.removeEventListener(event, handleGesture);
    }
    pendingPlays.delete(src);
  };

  const handleGesture = () => {
    cleanup();
    // 제스처 핸들러 안이라 이번엔 정책상 허용된다.
    audio.play().catch(() => {});
  };

  for (const event of GESTURE_EVENTS) {
    document.addEventListener(event, handleGesture);
  }
  pendingPlays.set(src, cleanup);
}

// 브라우저 자동재생 정책상 play()는 사용자 제스처(클릭 등) 이벤트 핸들러
// 안에서 "동기적으로" 호출해야 허용된다. useEffect 안에서의 호출은 리렌더를
// 거쳐 비동기로 실행돼 제스처로 인정받지 못하므로, 최초 진입 시점의 재생은
// 대부분 거부된다. 그래서 거부되면 첫 제스처를 기다렸다가 자동으로 재시도한다.
export function setAudioPlaying(
  src: string,
  isPlaying: boolean,
  options: AudioOptions = {},
) {
  const audio = getAudio(src, options);

  // 이전에 예약해 둔 재시도는 항상 무효화한다. 끄는 경우엔 물론이고, 켜는
  // 경우에도 아래에서 다시 예약되므로 리스너가 중복 등록되지 않는다.
  cancelPendingPlay(src);

  if (!isPlaying) {
    audio.pause();
    return;
  }

  audio.play().catch(() => {
    playOnNextGesture(src, audio);
  });
}

/** 짧은 효과음을 처음부터 재생한다. 연타하면 이전 재생을 끊고 되감는다. */
export function playSfx(src: string) {
  const audio = getAudio(src);
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

type UseAudioOptions = AudioOptions & {
  src: string;
  isPlaying: boolean;
};

// 상태(isOn 등)에 따라 재생/정지를 동기화하는 선언적 훅.
export function useAudio({ src, isPlaying, loop = false }: UseAudioOptions) {
  useEffect(() => {
    setAudioPlaying(src, isPlaying, { loop });
  }, [src, isPlaying, loop]);
}
