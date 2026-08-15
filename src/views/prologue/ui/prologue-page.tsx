"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { BACKGROUND_IMAGE_URLS } from "@/shared/config";
import { AppBar } from "@/widgets/app-bar";
import { Character, NarrationBox, SceneBackground } from "@/widgets/scene";

import { SCENES, type SceneInput } from "../model/constants";
import { BirthDatePanel } from "./birth-date-panel";
import { GenderPanel } from "./gender-panel";
import { NamePanel } from "./name-panel";
import * as styles from "./prologue-page.css";

const FIRST_INPUT_SCENE_INDEX = SCENES.findIndex((scene) => scene.input);

function findSceneIndexByInput(input: string | null) {
  return input === null
    ? -1
    : SCENES.findIndex((scene) => scene.input === input);
}

export function ProloguePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 마지막으로 열린 입력 패널이 ?panel= 로 URL에 남아 히스토리 체크포인트가 된다.
  // 질문 페이지 등에서 뒤로 돌아오면 이 체크포인트 패널부터 다시 보여준다.
  const checkpointIndex = findSceneIndexByInput(searchParams.get("panel"));

  const [sceneIndex, setSceneIndex] = useState(Math.max(checkpointIndex, 0));
  const [isPanelOpen, setIsPanelOpen] = useState(checkpointIndex !== -1);
  const [prevCheckpointIndex, setPrevCheckpointIndex] =
    useState(checkpointIndex);

  // 브라우저 뒤로/앞으로 가기로 체크포인트가 바뀌면 해당 패널로 동기화한다.
  // effect가 아니라 렌더 중에 조정해야 이전 장면이 한 프레임 그려지는 깜빡임이 없다.
  if (prevCheckpointIndex !== checkpointIndex) {
    setPrevCheckpointIndex(checkpointIndex);
    if (checkpointIndex !== -1) {
      setSceneIndex(checkpointIndex);
      setIsPanelOpen(true);
    }
  }

  const scene = SCENES[sceneIndex];

  // 패널이 열리는 순간을 히스토리에 쌓는다. 첫 입력(이름)은 인트로 대사와 한
  // 엔트리로 묶어(replace) 그 패널에서 뒤로가면 페이지를 벗어나게 한다.
  const openPanel = (input: SceneInput) => {
    setIsPanelOpen(true);
    if (sceneIndex === FIRST_INPUT_SCENE_INDEX) {
      router.replace(`?panel=${input}`);
      return;
    }
    router.push(`?panel=${input}`);
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
      openPanel(scene.input);
      return;
    }
    goToNextScene();
  };

  // 대사는 앞으로 갈 때의 연출일 뿐이라 되감지 않는다. 패널 제출 후 대사를 보던
  // 중이면 체크포인트 패널로 복귀하고, 패널 위에서는 히스토리를 되돌린다
  // (이전 패널, 없으면 페이지 이탈).
  const goBack = () => {
    const isAtCheckpoint = isPanelOpen && sceneIndex === checkpointIndex;
    if (checkpointIndex !== -1 && !isAtCheckpoint) {
      setSceneIndex(checkpointIndex);
      setIsPanelOpen(true);
      return;
    }
    router.back();
  };

  return (
    <div className={styles.page}>
      <SceneBackground src={BACKGROUND_IMAGE_URLS.landing} />
      <AppBar onBack={goBack} />

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
