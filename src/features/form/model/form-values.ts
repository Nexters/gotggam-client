import type { DefaultValues } from "react-hook-form";

import {
  DEFAULT_FACE_SELECTION,
  type FaceSelection,
} from "@/entities/character";

/**
 * /form 하위 페이지(prologue, question, face 등)들이 FormProvider를 통해 함께 채우는 값.
 * 모든 답변이 모이면 하나의 API로 한 번에 전송한다.
 */
export type Gender = "FEMALE" | "MALE";

export type FormValues = {
  name: string;
  /** YYYY-MM-DD */
  birthDate: string;
  gender: Gender;
  /** 질의응답 마지막의 오늘의 한 마디 (10~15자) */
  todayMessage: string;
  answers: Record<number, number>;
  /** 얼굴 커스터마이징 결과. /form/face 에서 채운다 */
  face: FaceSelection;
};

export const FORM_DEFAULT_VALUES: DefaultValues<FormValues> = {
  name: "",
  birthDate: "",
  todayMessage: "",
  answers: {},
  face: DEFAULT_FACE_SELECTION,
};
