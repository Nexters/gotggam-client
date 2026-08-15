"use client";

import { useState } from "react";

import {
  CharacterFace,
  DEFAULT_FACE_SELECTION,
  FACE_PART_CATEGORIES,
  FACE_PART_IDS,
  FACE_PART_LABELS,
  FACE_PART_NAMES,
  type FacePartCategory,
  type FaceSelection,
} from "@/entities/character";
import { BGM_STORAGE_KEY, CLICK_SFX_SRC } from "@/shared/config";
import { playSfx, useLocalStorage } from "@/shared/lib";
import { IconButton, PixelCornerButton, Typography } from "@/shared/ui";

import * as styles from "./face-builder.css";

type FaceBuilderProps = {
  initialSelection?: FaceSelection;
  onSubmit: (selection: FaceSelection) => void;
};

export function FaceBuilder({
  initialSelection = DEFAULT_FACE_SELECTION,
  onSubmit,
}: FaceBuilderProps) {
  const [selection, setSelection] = useState(initialSelection);
  const [isSoundOn] = useLocalStorage(BGM_STORAGE_KEY, true);

  const playClick = () => {
    if (isSoundOn) {
      playSfx(CLICK_SFX_SRC);
    }
  };

  const shiftPart = (category: FacePartCategory, direction: 1 | -1) => {
    playClick();
    setSelection((current) => {
      const ids = FACE_PART_IDS[category];
      const nextIndex =
        (ids.indexOf(current[category]) + direction + ids.length) % ids.length;
      return { ...current, [category]: ids[nextIndex] };
    });
  };

  return (
    <div className={styles.container}>
      <Typography
        family="galmuri9"
        size="16"
        color="gray-11"
        className={styles.title}
      >
        너의 모습을 알려달라냥
      </Typography>
      <CharacterFace selection={selection} className={styles.preview} />
      <div className={styles.controls}>
        {FACE_PART_CATEGORIES.map((category) => (
          <div key={category} className={styles.controlRow}>
            <IconButton
              aria-label={`이전 ${FACE_PART_LABELS[category]}`}
              className={styles.arrowButton}
              onClick={() => shiftPart(category, -1)}
            >
              <Typography family="galmuri9" size="22" color="gray-12">
                {"<"}
              </Typography>
            </IconButton>
            <Typography family="galmuri9" size="22" color="white">
              {FACE_PART_NAMES[selection[category]] ??
                FACE_PART_LABELS[category]}
            </Typography>
            <IconButton
              aria-label={`다음 ${FACE_PART_LABELS[category]}`}
              className={styles.arrowButton}
              onClick={() => shiftPart(category, 1)}
            >
              <Typography family="galmuri9" size="22" color="gray-12">
                {">"}
              </Typography>
            </IconButton>
          </div>
        ))}
      </div>
      <PixelCornerButton
        cornerSize={4}
        className={styles.submitButton}
        onClick={() => {
          playClick();
          onSubmit(selection);
        }}
      >
        <Typography family="galmuri11" size="18" color="white">
          다음
        </Typography>
      </PixelCornerButton>
    </div>
  );
}
