export const FACE_PART_CATEGORIES = [
  "face",
  "hair",
  "eyes",
  "nose",
  "mouth",
] as const;

export type FacePartCategory = (typeof FACE_PART_CATEGORIES)[number];

export const FACE_PART_LABELS: Record<FacePartCategory, string> = {
  face: "얼굴형",
  hair: "헤어",
  eyes: "눈",
  nose: "코",
  mouth: "입",
};

// Figma [Web-View > 커스터마이징] 시트의 파츠 목록과 1:1 대응한다.
export const FACE_PART_IDS: Record<FacePartCategory, string[]> = {
  face: ["face01", "face02", "face03", "face04"],
  hair: ["hair01", "hair02", "hair03", "hair04", "hair05", "hair06"],
  eyes: ["eyes01", "eyes02", "eyes03", "eyes04", "eyes05"],
  nose: ["nose01", "nose02", "nose03", "nose04", "nose05"],
  mouth: ["mouth01", "mouth02", "mouth03", "mouth04", "mouth05"],
};

/** 카테고리별로 선택된 파츠 id. 제출 payload에 그대로 실린다. */
export type FaceSelection = Record<FacePartCategory, string>;

export const DEFAULT_FACE_SELECTION: FaceSelection = {
  face: "face01",
  hair: "hair01",
  eyes: "eyes01",
  nose: "nose01",
  mouth: "mouth01",
};

export const FACE_BODY_IMAGE_SRC = "/images/character/parts/body.png";

export function getFacePartImageSrc(partId: string) {
  return `/images/character/parts/${partId}.png`;
}

/** 파츠 id("face03") → 서버 타입 번호(3). */
export function getFacePartTypeNumber(partId: string) {
  return Number.parseInt(partId.slice(-2), 10);
}

/** 서버 타입 번호 → 파츠 id. 범위를 벗어나면 첫 번째 파츠로 처리한다. */
export function getFacePartIdByType(category: FacePartCategory, type: number) {
  const ids = FACE_PART_IDS[category];
  return ids[type - 1] ?? ids[0];
}

/** 서버 캐릭터 응답(타입 번호) → 파츠 선택. */
export function toFaceSelection(character: {
  faceType: number;
  hairType: number;
  eyeType: number;
  noseType: number;
  mouthType: number;
}): FaceSelection {
  return {
    face: getFacePartIdByType("face", character.faceType),
    hair: getFacePartIdByType("hair", character.hairType),
    eyes: getFacePartIdByType("eyes", character.eyeType),
    nose: getFacePartIdByType("nose", character.noseType),
    mouth: getFacePartIdByType("mouth", character.mouthType),
  };
}
