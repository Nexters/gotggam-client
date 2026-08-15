"use client";

import { BGM_SRC } from "@/shared/config";
import {
  cn,
  setAudioPlaying,
  useBgmEnabled,
  useHasMounted,
} from "@/shared/lib";
import { IconButton, IconSpeaker, Typography } from "@/shared/ui";

import BgmSpeakerIcon from "../assets/bgm-speaker.svg";
import * as styles from "./bgm-toggle-button.css";

export function BgmToggleButton() {
  const [isOn, setIsOn] = useBgmEnabled();
  const mounted = useHasMounted();

  return (
    <span className={styles.root} style={{ opacity: mounted ? 1 : 0 }}>
      <span
        className={cn(styles.bubble, isOn && styles.bubbleHidden)}
        aria-hidden
      >
        <Typography
          as="span"
          family="galmuri11"
          size="22"
          weight="bold"
          className={styles.box}
        >
          BGM On
          <BgmSpeakerIcon className={styles.icon} />
        </Typography>
        <span className={styles.tail} />
      </span>
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
      >
        {isOn ? <IconSpeaker.On /> : <IconSpeaker.Off />}
      </IconButton>
    </span>
  );
}
