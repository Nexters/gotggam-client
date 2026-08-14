"use client";

import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { resultQueries } from "@/entities/result";
import { RollingNumber, Typography } from "@/shared/ui";

function ParticipantCountText({ count }: { count: number }) {
  return (
    <Typography family="spoqa" size="12" color="gray-12">
      지금까지 <RollingNumber value={count} />
      명이 참여했어요.
    </Typography>
  );
}

function ParticipantCount() {
  const { data: participantCount } = useSuspenseQuery(
    resultQueries.participantCount(),
  );

  return <ParticipantCountText count={participantCount} />;
}

export function ParticipantCountSection() {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense clientOnly fallback={<ParticipantCountText count={0} />}>
        <ParticipantCount />
      </Suspense>
    </ErrorBoundary>
  );
}
