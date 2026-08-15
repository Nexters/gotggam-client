"use client";

import { BGM_SRC } from "@/shared/config";
import { useAudio, useBgmEnabled, useHasMounted } from "@/shared/lib";

// 라우트가 바뀌어도 배경음악이 끊기지 않도록 root(Providers)에서 한 번만 재생한다.
// 켜고 끄는 조작은 BgmToggleButton이 같은 useBgmEnabled 상태를 통해 수행한다.
export function BgmPlayer() {
  const [isOn] = useBgmEnabled();
  const mounted = useHasMounted();

  useAudio({ src: BGM_SRC, isPlaying: mounted && isOn, loop: true });

  return null;
}
