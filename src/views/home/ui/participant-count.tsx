"use client";

import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { resultQueries } from "@/entities/result";
import { RollingNumber, Typography } from "@/shared/ui";

type ParticipantCountProps = {
  isPlaying?: boolean;
};

function ParticipantCountText({
  count,
  isPlaying,
}: ParticipantCountProps & { count: number }) {
  return (
    <Typography family="spoqa" size="12" color="gray-12">
      지금까지 <RollingNumber value={count} isPlaying={isPlaying} />
      명이 참여했어요.
    </Typography>
  );
}

function ParticipantCount({ isPlaying }: ParticipantCountProps) {
  const { data: participantCount } = useSuspenseQuery(
    resultQueries.participantCount(),
  );

  return <ParticipantCountText count={participantCount} isPlaying={isPlaying} />;
}

export function ParticipantCountSection({ isPlaying }: ParticipantCountProps) {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense clientOnly fallback={<ParticipantCountText count={0} />}>
        <ParticipantCount isPlaying={isPlaying} />
      </Suspense>
    </ErrorBoundary>
  );
}
