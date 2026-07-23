"use client";

import { Button } from "@/shared/ui";

import { useHealthQuery } from "../api/use-health-query";
import * as styles from "./home-page.css";

export function HealthStatus() {
  const { data, isPending, isError, isFetching, refetch } = useHealthQuery();

  if (isPending) {
    return <div className={styles.status}>서버 상태 확인 중...</div>;
  }

  if (isError) {
    return (
      <div className={styles.status}>
        서버 상태를 불러오지 못했어요.
        <Button onClick={() => refetch()}>다시 시도</Button>
      </div>
    );
  }

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
