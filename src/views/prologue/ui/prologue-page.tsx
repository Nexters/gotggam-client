"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { FormValues } from "@/features/form";
import { BACKGROUND_IMAGE_URLS } from "@/shared/config";
import { AppBar } from "@/widgets/app-bar";
import { Character, NarrationBox, SceneBackground } from "@/widgets/scene";

import { LAST_INPUT_SCENE_INDEX, SCENES } from "../model/constants";
import { BirthDatePanel } from "./birth-date-panel";
import { GenderPanel } from "./gender-panel";
import { NamePanel } from "./name-panel";
import * as styles from "./prologue-page.css";

export function ProloguePage() {
  const router = useRouter();
  const { getValues } = useFormContext<FormValues>();

  // 질문 페이지에서 뒤로 돌아온 경우(입력이 모두 채워져 있음) 인트로 대사를
  // 건너뛰고 마지막 입력(성별)부터 보여준다.
  const { name, birthDate, gender } = getValues();
  const hasCompletedInputs = Boolean(name && birthDate && gender);

  const [sceneIndex, setSceneIndex] = useState(
    hasCompletedInputs ? LAST_INPUT_SCENE_INDEX : 0,
  );
  const [isPanelOpen, setIsPanelOpen] = useState(hasCompletedInputs);

  const scene = SCENES[sceneIndex];

  // 대사는 앞으로 갈 때의 연출일 뿐이라 되감지 않는다. 뒤로가기는 항상 이전
  // 입력 항목의 패널로 직행하고, 앞선 입력이 없으면 페이지를 벗어난다.
  const goToPreviousScene = () => {
    for (let index = sceneIndex - 1; index >= 0; index -= 1) {
      if (SCENES[index].input) {
        setSceneIndex(index);
        setIsPanelOpen(true);
        return;
      }
    }
    router.back();
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
        <Character className={styles.character} />

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
