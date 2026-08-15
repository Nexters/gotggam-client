import { Suspense } from "react";

import { ProloguePage } from "@/views/prologue";

// useSearchParams(패널 체크포인트)를 쓰는 클라이언트 트리는 Suspense로 감싸야
// 프리렌더에서 CSR bailout이 페이지 전체로 번지지 않는다.
export default function Page() {
  return (
    <Suspense>
      <ProloguePage />
    </Suspense>
  );
}
