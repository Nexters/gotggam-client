import type {
  SurveyResultRequest,
  SurveyResultResponse,
} from "@/shared/api/generated/models";
import {
  createResult,
  getParticipantCount,
} from "@/shared/api/generated/result-api/result-api";

type RequestOptions = { signal?: AbortSignal };

export async function fetchParticipantCount(
  options?: RequestOptions,
): Promise<number> {
  const { data } = await getParticipantCount(options);

  return data.totalParticipants;
}

/** 설문 답변을 제출하고 계산된 결과(명부 데이터)를 받는다. */
export async function submitSurveyResult(
  request: SurveyResultRequest,
): Promise<SurveyResultResponse> {
  const { data } = await createResult(request);

  return data;
}
