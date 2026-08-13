"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BACKGROUND_IMAGE_URLS } from "@/shared/config";

import { SCENES } from "../model/constants";
import { AppBar } from "./app-bar";
import { BirthDatePanel } from "./birth-date-panel";
import { Character } from "./character";
import { GenderPanel } from "./gender-panel";
import { NamePanel } from "./name-panel";
import { NarrationBox } from "./narration-box";
import * as styles from "./prologue-page.css";
import { SceneBackground } from "./scene-background";

export function ProloguePage() {
  const router = useRouter();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const scene = SCENES[sceneIndex];

  // 진행의 역순으로 되감는다: 패널 → 그 장면의 대사, 대사 → 이전 장면
  // (이전 장면이 입력 장면이었다면 패널부터). 첫 장면에서는 페이지를 벗어난다.
  const goToPreviousScene = () => {
    if (isPanelOpen) {
      setIsPanelOpen(false);
      return;
    }
    if (sceneIndex === 0) {
      router.back();
      return;
    }
    const previousIndex = sceneIndex - 1;
    setSceneIndex(previousIndex);
    setIsPanelOpen(Boolean(SCENES[previousIndex].input));
  };

  const goToNextScene = () => {
    setIsPanelOpen(false);
    if (sceneIndex < SCENES.length - 1) {
      setSceneIndex((prev) => prev + 1);
      return;
    }
    router.push("/form/question");
  };

  const handleAdvance = () => {
    if (scene.input) {
      setIsPanelOpen(true);
      return;
    }
    goToNextScene();
  };

  return (
    <div className={styles.page}>
      <SceneBackground src={BACKGROUND_IMAGE_URLS.landing} />
      <AppBar onBack={goToPreviousScene} />

      <div className={styles.content}>
        <Character />

        {!isPanelOpen && (
          <NarrationBox text={scene.text} onAdvance={handleAdvance} />
        )}

        {isPanelOpen && scene.input === "name" && (
          <NamePanel onSubmit={goToNextScene} />
        )}

        {isPanelOpen && scene.input === "birth" && (
          <BirthDatePanel onSubmit={goToNextScene} />
        )}

        {isPanelOpen && scene.input === "gender" && (
          <GenderPanel onSubmit={goToNextScene} />
        )}
      </div>
    </div>
  );
}
