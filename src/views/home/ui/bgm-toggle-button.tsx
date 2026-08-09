"use client";

import { useHasMounted, useLocalStorage } from "@/shared/lib";
import { IconButton, IconSpeaker } from "@/shared/ui";

export function BgmToggleButton() {
  const [isOn, setIsOn] = useLocalStorage("bgm-enabled", true);
  const mounted = useHasMounted();

  return (
    <IconButton
      aria-label={isOn ? "배경음악 끄기" : "배경음악 켜기"}
      aria-pressed={isOn}
      onClick={() => setIsOn((prev) => !prev)}
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {isOn ? <IconSpeaker.On /> : <IconSpeaker.Off />}
    </IconButton>
  );
}
