"use client";

import { useEffect, useState, type ReactNode } from "react";

import { LoadingScreen } from "./loading-screen";

type LoadingTransitionProps = {
  text: string;
  /** 연출로 로딩 화면을 유지할 시간 */
  durationMs?: number;
  children: ReactNode;
};

/**
 * 페이지 전환 연출용 로딩. 실제 대기(API)가 없어도 durationMs 동안
 * LoadingScreen을 보여준 뒤 내용을 공개한다.
 */
export function LoadingTransition({
  text,
  durationMs = 1500,
  children,
}: LoadingTransitionProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setIsDone(true), durationMs);
    return () => clearTimeout(id);
  }, [durationMs]);

  if (!isDone) {
    return <LoadingScreen text={text} />;
  }

  return children;
}
