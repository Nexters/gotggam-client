import { getParticipantCount } from "@/shared/api/generated/result-api/result-api";

type RequestOptions = { signal?: AbortSignal };

export async function fetchParticipantCount(
  options?: RequestOptions,
): Promise<number> {
  const { data } = await getParticipantCount(options);

  return data.totalParticipants;
}
