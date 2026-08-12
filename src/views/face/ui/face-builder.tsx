"use client";

import Image from "next/image";
import { useState } from "react";

import {
  CharacterFace,
  DEFAULT_FACE_SELECTION,
  FACE_PART_CATEGORIES,
  FACE_PART_IDS,
  FACE_PART_LABELS,
  type FacePartCategory,
  type FaceSelection,
} from "@/entities/character";
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

  const shiftPart = (category: FacePartCategory, direction: 1 | -1) => {
    setSelection((current) => {
      const ids = FACE_PART_IDS[category];
      const nextIndex =
        (ids.indexOf(current[category]) + direction + ids.length) % ids.length;
      return { ...current, [category]: ids[nextIndex] };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.previewPanel}>
        <Image
          src="/images/face/preview-panel.png"
          alt=""
          fill
          unoptimized
          className={styles.previewPanelBg}
        />
        <CharacterFace selection={selection} className={styles.previewFace} />
      </div>
      <div className={styles.controls}>
        {FACE_PART_CATEGORIES.map((category) => (
          <div key={category} className={styles.controlRow}>
            <IconButton
              aria-label={`이전 ${FACE_PART_LABELS[category]}`}
              onClick={() => shiftPart(category, -1)}
            >
              <Typography family="galmuri11" size="22" color="gray-12">
                {"<"}
              </Typography>
            </IconButton>
            <Typography family="galmuri11" size="22" color="white">
              {FACE_PART_LABELS[category]}
            </Typography>
            <IconButton
              aria-label={`다음 ${FACE_PART_LABELS[category]}`}
              onClick={() => shiftPart(category, 1)}
            >
              <Typography family="galmuri11" size="22" color="gray-12">
                {">"}
              </Typography>
            </IconButton>
          </div>
        ))}
      </div>
      <PixelCornerButton
        cornerSize={4}
        className={styles.submitButton}
        onClick={() => onSubmit(selection)}
      >
        <Typography family="galmuri11" size="18" color="white">
          다음
        </Typography>
      </PixelCornerButton>
    </div>
  );
}
