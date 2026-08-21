import "server-only";

import { requireEnv } from "./env";

/**
 * 서버 전용 환경 변수. 브라우저 번들에 노출되면 안 되는 값만 둔다.
 */
export const serverEnv = {
  get notionApiKey() {
    return requireEnv("NOTION_API_KEY", process.env.NOTION_API_KEY);
  },
  get notionTermsDataSourceId() {
    return requireEnv(
      "NOTION_TERMS_DATA_SOURCE_ID",
      process.env.NOTION_TERMS_DATA_SOURCE_ID,
    );
  },
} as const;
