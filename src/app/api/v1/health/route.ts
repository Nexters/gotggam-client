import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SIMULATE_COOKIE = "simulate-status";

/**
 * 개발 환경 전용 실패 주입. 바운더리 동작 확인용이며 프로덕션 빌드에서는 무시된다.
 * 브라우저 콘솔에서 `document.cookie = "simulate-status=404; path=/"` 로 켜고
 * `document.cookie = "simulate-status=; max-age=0; path=/"` 로 끈다.
 */
async function getSimulatedStatus(): Promise<number | null> {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const status = Number((await cookies()).get(SIMULATE_COOKIE)?.value);

  return Number.isInteger(status) && status >= 400 && status <= 599
    ? status
    : null;
}

export async function GET() {
  const simulatedStatus = await getSimulatedStatus();

  if (simulatedStatus !== null) {
    return NextResponse.json(
      { message: `실패 주입: HTTP ${simulatedStatus}` },
      { status: simulatedStatus },
    );
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
