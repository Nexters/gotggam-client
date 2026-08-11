/**
 * /form 하위 페이지(prologue, question)들이 FormProvider를 통해 함께 채우는 값.
 * 모든 답변이 모이면 하나의 API로 한 번에 전송한다.
 */
export type FormValues = {
  name: string;
  /** YYYY-MM-DD */
  birthDate: string;
  gender: string;
};

export const FORM_DEFAULT_VALUES: FormValues = {
  name: "",
  birthDate: "",
  gender: "",
};
