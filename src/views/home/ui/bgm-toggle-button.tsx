"use client";

import { BGM_SRC, BGM_STORAGE_KEY } from "@/shared/config";
import { setAudioPlaying, useHasMounted, useLocalStorage } from "@/shared/lib";
import { IconButton, IconSpeaker } from "@/shared/ui";

export function BgmToggleButton() {
  const [isOn, setIsOn] = useLocalStorage(BGM_STORAGE_KEY, true);
  const mounted = useHasMounted();

  return (
    <IconButton
      aria-label={isOn ? "배경음악 끄기" : "배경음악 켜기"}
      aria-pressed={isOn}
      onClick={() => {
        const next = !isOn;
        // 브라우저 자동재생 정책 때문에 최초 재생은 반드시 클릭 이벤트
        // 핸들러 안에서 동기적으로 트리거해야 한다(BgmPlayer의 useEffect만
        // 믿으면 배포 환경에서 첫 재생이 막힐 수 있다).
        setAudioPlaying(BGM_SRC, next, { loop: true });
        setIsOn(next);
      }}
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {isOn ? <IconSpeaker.On /> : <IconSpeaker.Off />}
    </IconButton>
  );
}
