import { queryOptions } from "@tanstack/react-query";

import { fetchParticipantCount } from "./result-api";

export const resultQueries = {
  all: ["result"] as const,

  participantCount: () =>
    queryOptions({
      queryKey: [...resultQueries.all, "participant-count"] as const,
      queryFn: ({ signal }) => fetchParticipantCount({ signal }),
    }),
};
