import Image from "next/image";

import { cn } from "@/shared/lib";

import {
  FACE_BODY_IMAGE_SRC,
  FACE_PART_CATEGORIES,
  getFacePartImageSrc,
  type FaceSelection,
} from "../model/face";
import * as styles from "./character-face.css";

type CharacterFaceProps = {
  selection: FaceSelection;
  className?: string;
};

// 파츠 PNG들은 전부 같은 240×300 캔버스에 그려져 있어, 같은 박스에 겹치기만 하면 정렬된다.
export function CharacterFace({ selection, className }: CharacterFaceProps) {
  return (
    <div className={cn(styles.root, className)}>
      <Image src={FACE_BODY_IMAGE_SRC} alt="" fill unoptimized className={styles.layer} />
      {FACE_PART_CATEGORIES.map((category) => (
        <Image
          key={category}
          src={getFacePartImageSrc(selection[category])}
          alt=""
          fill
          unoptimized
          className={styles.layer}
        />
      ))}
    </div>
  );
}
