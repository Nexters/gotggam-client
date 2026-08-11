"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/shared/ui";

import { healthQueries } from "../api/health-queries";
import * as styles from "./health-section.css";

export function HealthStatus() {
  const { data, isFetching, refetch } = useSuspenseQuery(
    healthQueries.status(),
  );

  return (
    <div className={styles.status}>
      서버 상태: {data.status} ·{" "}
      {new Date(data.timestamp).toLocaleTimeString("ko-KR")}
      <Button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "확인 중..." : "다시 확인"}
      </Button>
    </div>
  );
}
