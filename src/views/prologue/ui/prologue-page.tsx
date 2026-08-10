"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useTypewriter } from "@/shared/lib";
import {
  IconButton,
  IconButtonBack,
  IconButtonHome,
  IconButtonNext,
  Lottie,
  Typography,
} from "@/shared/ui";

import * as styles from "./prologue-page.css";

const DIALOGUES = [
  "나는 저승사자 곧감이다냥!",
  "오늘도 영혼 회수 실적을 채우러 왔다냥.",
  "그런데 실수로 잉크를 엎질러서 누가 누군지 모르겠다냥.",
  "그러니까 잠깐만 협조해라냥. 우선 이름부터 확인하겠다냥.",
  "너를 뭐라고 부르면 되냥?",
];

export function ProloguePage() {
  const router = useRouter();
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const { words, skip, isDone } = useTypewriter(DIALOGUES[dialogueIndex]);

  const advanceDialogue = () => {
    if (!isDone) {
      skip();
      return;
    }
    if (dialogueIndex < DIALOGUES.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.backgroundLayer}>
        <Image
          src="/images/landing/background.png"
          alt=""
          fill
          priority
          sizes="(min-width: 480px) 480px, 100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundOverlay} />
      </div>

      <div className={styles.appBar}>
        <IconButton aria-label="뒤로 가기" onClick={() => router.back()}>
          <IconButtonBack />
        </IconButton>
        <IconButton aria-label="홈으로 가기" onClick={() => router.push("/")}>
          <IconButtonHome />
        </IconButton>
      </div>

      <div className={styles.content}>
        <Lottie
          autoplay
          loop
          src="/lottie/question_normal.lottie"
          className={styles.character}
        />

        {/* 버튼 클릭도 여기로 버블링되므로 핸들러는 이 컨테이너 한 곳에만 둔다. */}
        <div className={styles.narration} onClick={advanceDialogue}>
          <div className={styles.bubble}>
            <Typography as="p" family="galmuri11" size="22" color="gray-1">
              {words}
            </Typography>
          </div>
          <div className={styles.nameTag}>
            <Typography family="galmuri11" size="18" color="accent2-9">
              곧감이
            </Typography>
          </div>
          <IconButton aria-label="다음" className={styles.nextButton}>
            <IconButtonNext />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
